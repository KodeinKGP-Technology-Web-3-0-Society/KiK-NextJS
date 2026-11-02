// Runs one compiled program. A fresh worker is created for every run so that a program that
// never ends can simply be terminated by the page, without touching the compiler worker.
// Implements the small part of WASI (preview1) that a stdin/stdout program needs.
const enc = new TextEncoder();
const dec = new TextDecoder();
const MAX_OUTPUT = 1_000_000; // characters; stops runaway printing loops

class ExitSignal {
  constructor(code) {
    this.code = code;
  }
}

self.onmessage = (e) => {
  const { wasm, stdin } = e.data;
  const input = enc.encode(stdin || "");
  let inPos = 0;
  let outChars = 0;
  let memory;
  let pending = "";
  let pendingErr = "";
  let lastFlush = performance.now();

  let writes = 0;
  const flush = (force) => {
    const now = performance.now();
    // The first few thousand writes go out immediately, so output from a program that then
    // hangs is still shown. Programs that print a lot are batched to keep the page responsive.
    writes++;
    if (!force && writes > 2000 && now - lastFlush < 40 && pending.length + pendingErr.length < 4096) return;
    if (pending) self.postMessage({ type: "stdout", text: pending });
    if (pendingErr) self.postMessage({ type: "stderr", text: pendingErr });
    pending = "";
    pendingErr = "";
    lastFlush = now;
  };

  const view = () => new DataView(memory.buffer);
  const bytes = () => new Uint8Array(memory.buffer);
  const ESUCCESS = 0;
  const EBADF = 8;
  const ENOENT = 44;
  const ENOSYS = 52;
  const ESPIPE = 70;

  const wasi = {
    args_sizes_get(argc, bufSize) {
      const v = view();
      v.setUint32(argc, 1, true);
      v.setUint32(bufSize, 5, true); // "main\0"
      return ESUCCESS;
    },
    args_get(argv, buf) {
      view().setUint32(argv, buf, true);
      bytes().set(enc.encode("main\0"), buf);
      return ESUCCESS;
    },
    environ_sizes_get(count, size) {
      const v = view();
      v.setUint32(count, 0, true);
      v.setUint32(size, 0, true);
      return ESUCCESS;
    },
    environ_get() {
      return ESUCCESS;
    },
    clock_res_get(_id, out) {
      view().setBigUint64(out, 1000n, true);
      return ESUCCESS;
    },
    clock_time_get(id, _precision, out) {
      const ns = id === 0 ? BigInt(Date.now()) * 1000000n : BigInt(Math.round(performance.now() * 1e6));
      view().setBigUint64(out, ns, true);
      return ESUCCESS;
    },
    random_get(buf, len) {
      const out = bytes().subarray(buf, buf + len);
      for (let i = 0; i < out.length; i += 65536) crypto.getRandomValues(out.subarray(i, i + 65536));
      return ESUCCESS;
    },
    sched_yield() {
      return ESUCCESS;
    },
    proc_exit(code) {
      throw new ExitSignal(code);
    },
    fd_write(fd, iovs, iovsLen, nwritten) {
      if (fd !== 1 && fd !== 2) return EBADF;
      const v = view();
      const mem = bytes();
      let total = 0;
      let text = "";
      for (let i = 0; i < iovsLen; i++) {
        const ptr = v.getUint32(iovs + i * 8, true);
        const len = v.getUint32(iovs + i * 8 + 4, true);
        text += dec.decode(mem.subarray(ptr, ptr + len), { stream: true });
        total += len;
      }
      v.setUint32(nwritten, total, true);
      outChars += text.length;
      if (fd === 1) pending += text;
      else pendingErr += text;
      if (outChars > MAX_OUTPUT) {
        flush(true);
        self.postMessage({ type: "stderr", text: "\n[output limit reached: program stopped]\n" });
        throw new ExitSignal(1);
      }
      flush(false);
      return ESUCCESS;
    },
    fd_read(fd, iovs, iovsLen, nread) {
      if (fd !== 0) return EBADF;
      const v = view();
      const mem = bytes();
      let total = 0;
      for (let i = 0; i < iovsLen; i++) {
        const ptr = v.getUint32(iovs + i * 8, true);
        const len = v.getUint32(iovs + i * 8 + 4, true);
        const n = Math.min(len, input.length - inPos);
        mem.set(input.subarray(inPos, inPos + n), ptr);
        inPos += n;
        total += n;
        if (n < len) break;
      }
      v.setUint32(nread, total, true);
      return ESUCCESS; // 0 bytes = end of input
    },
    fd_fdstat_get(fd, buf) {
      if (fd > 2) return EBADF;
      const v = view();
      v.setUint8(buf, 2); // character device => the C library treats it as a terminal
      v.setUint16(buf + 2, 0, true);
      v.setBigUint64(buf + 8, 66n, true); // FD_READ | FD_WRITE (no seek/tell)
      v.setBigUint64(buf + 16, 0n, true);
      return ESUCCESS;
    },
    fd_fdstat_set_flags() {
      return ESUCCESS;
    },
    fd_close() {
      return ESUCCESS;
    },
    fd_seek() {
      return ESPIPE;
    },
    fd_tell() {
      return ESPIPE;
    },
    fd_prestat_get() {
      return EBADF; // no pre-opened directories
    },
    fd_prestat_dir_name() {
      return EBADF;
    },
    fd_filestat_get() {
      return EBADF;
    },
    path_open() {
      return ENOENT;
    },
  };

  try {
    const module = new WebAssembly.Module(wasm);
    // anything the program imports that we did not implement answers "not supported"
    const imports = { wasi_snapshot_preview1: {} };
    for (const imp of WebAssembly.Module.imports(module)) {
      if (imp.module !== "wasi_snapshot_preview1") continue;
      imports.wasi_snapshot_preview1[imp.name] = wasi[imp.name] || (() => ENOSYS);
    }
    const instance = new WebAssembly.Instance(module, imports);
    memory = instance.exports.memory;
    const t0 = performance.now();
    let code = 0;
    try {
      instance.exports._start();
    } catch (err) {
      if (err instanceof ExitSignal) code = err.code;
      else throw err;
    }
    flush(true);
    self.postMessage({ type: "done", code, ms: Math.round(performance.now() - t0) });
  } catch (err) {
    flush(true);
    let msg = String(err && err.message ? err.message : err);
    if (err instanceof RangeError) msg = "Stack overflow (infinite or too deep recursion)";
    else if (/out of bounds/i.test(msg)) msg = "Segmentation fault (invalid memory access)";
    else if (/unreachable/i.test(msg)) msg = "Program aborted (abort(), failed assert, or undefined behaviour)";
    else if (/divide by zero|integer overflow/i.test(msg)) msg = "Arithmetic error: " + msg;
    self.postMessage({ type: "crash", message: msg });
  }
};
