"use client";
import { useEffect, useRef, useState } from "react";

// Pixel cat that chases the cursor, wanders when you're idle and naps.
// Sprite + behaviour adapted from oneko.js by adryd (MIT): https://github.com/adryd325/oneko.js
const SPRITES = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [
    [-5, 0],
    [-6, 0],
    [-7, 0],
  ],
  scratchWallN: [
    [0, 0],
    [0, -1],
  ],
  scratchWallS: [
    [-7, -1],
    [-6, -2],
  ],
  scratchWallE: [
    [-2, -2],
    [-2, -3],
  ],
  scratchWallW: [
    [-4, 0],
    [-4, -1],
  ],
  tired: [[-3, -2]],
  sleeping: [
    [-2, 0],
    [-2, -1],
  ],
  N: [
    [-1, -2],
    [-1, -3],
  ],
  NE: [
    [0, -2],
    [0, -3],
  ],
  E: [
    [-3, 0],
    [-3, -1],
  ],
  SE: [
    [-5, -1],
    [-5, -2],
  ],
  S: [
    [-6, -3],
    [-7, -2],
  ],
  SW: [
    [-5, -3],
    [-6, -1],
  ],
  W: [
    [-4, -2],
    [-4, -3],
  ],
  NW: [
    [-1, 0],
    [-1, -1],
  ],
};
const SPEED = 22;

// A real recorded meow: "Meow of a pleading cat" (Wikimedia Commons, public domain),
// trimmed to a single meow. File: /public/pet/meow.mp3
let meowAudio;
function playMeow() {
  try {
    meowAudio = meowAudio || new Audio("/pet/meow.mp3");
    meowAudio.volume = 0.5;
    meowAudio.currentTime = 0;
    meowAudio.play().catch(() => {});
  } catch {
    /* audio not available */
  }
}

export default function PetCat() {
  const el = useRef(null);
  const [meow, setMeow] = useState(false);
  const [friend, setFriend] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (
      window.innerWidth < 768 ||
      window.matchMedia("(max-width: 767px)").matches
    )
      return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cat = el.current;
    if (!cat) return;
    const W = () => window.innerWidth;
    const H = () => window.innerHeight;

    let x = W() - 80,
      y = H() - 80;
    let tx = x,
      ty = y;
    let frame = 0,
      idleTime = 0,
      idleAnim = null,
      idleFrame = 0;
    let lastMouse = 0;
    let lastGreet = 0;

    const sprite = (name, f) => {
      const s = SPRITES[name][f % SPRITES[name].length];
      cat.style.backgroundPosition = `${s[0] * 32}px ${s[1] * 32}px`;
    };

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      lastMouse = performance.now();
    };
    window.addEventListener("mousemove", onMove);

    // wander to random spots when nobody is moving the mouse (and on touch screens)
    const wander = () => {
      if (performance.now() - lastMouse > 6000 && Math.random() < 0.5) {
        tx = 40 + Math.random() * (W() - 80);
        ty = 80 + Math.random() * (H() - 120);
      }
    };
    const wanderTimer = setInterval(wander, 7000);

    const idle = () => {
      idleTime++;
      if (idleTime > 10 && Math.random() < 0.005 && !idleAnim) {
        const opts = ["sleeping", "scratchSelf"];
        if (x < 32) opts.push("scratchWallW");
        if (y < 32) opts.push("scratchWallN");
        if (x > W() - 32) opts.push("scratchWallE");
        if (y > H() - 32) opts.push("scratchWallS");
        idleAnim = opts[Math.floor(Math.random() * opts.length)];
      }
      switch (idleAnim) {
        case "sleeping":
          if (idleFrame < 8) {
            sprite("tired", 0);
            break;
          }
          sprite("sleeping", Math.floor(idleFrame / 4));
          if (idleFrame > 192) (idleAnim = null), (idleFrame = 0);
          break;
        case "scratchWallN":
        case "scratchWallS":
        case "scratchWallE":
        case "scratchWallW":
        case "scratchSelf":
          sprite(idleAnim, idleFrame);
          if (idleFrame > 9) (idleAnim = null), (idleFrame = 0);
          break;
        default:
          sprite("idle", 0);
          return;
      }
      idleFrame++;
    };

    const step = () => {
      frame++;

      // When the cursor is over the robot, the cat trots over to sit by its feet.
      // Once there, the robot notices and reacts (wave / thumbs up / jump).
      let gx = tx;
      let gy = ty;
      let visiting = false;
      const robotEl = document.getElementById("robot-scene");
      if (robotEl) {
        const r = robotEl.getBoundingClientRect();
        const onScreen = r.width > 0 && r.bottom > 0 && r.top < H();
        const cursorOver = tx >= r.left && tx <= r.right && ty >= r.top && ty <= r.bottom;
        if (onScreen && cursorOver) {
          visiting = true;
          gx = r.left + r.width * 0.68;
          gy = r.top + r.height * 0.84;
        }
      }

      const dx = x - gx;
      const dy = y - gy;
      const dist = Math.hypot(dx, dy);

      if (visiting && dist < 40) {
        // arrived: sit and say hi (once every few seconds)
        const now = performance.now();
        if (now - lastGreet > 7000) {
          lastGreet = now;
          setFriend(true);
          setTimeout(() => setFriend(false), 1800);
          window.dispatchEvent(new CustomEvent("robot-cat-nearby"));
        }
        sprite("idle", 0);
        idleAnim = null;
        return;
      }
      if (dist < SPEED || dist < 48) return idle();
      idleAnim = null;
      idleFrame = 0;
      if (idleTime > 1) {
        sprite("alert", 0);
        idleTime = Math.min(idleTime, 7) - 1;
        return;
      }
      let dir = dy / dist > 0.5 ? "N" : "";
      dir += dy / dist < -0.5 ? "S" : "";
      dir += dx / dist > 0.5 ? "W" : "";
      dir += dx / dist < -0.5 ? "E" : "";
      sprite(dir, frame);
      x -= (dx / dist) * SPEED;
      y -= (dy / dist) * SPEED;
      x = Math.min(Math.max(16, x), W() - 16);
      y = Math.min(Math.max(16, y), H() - 16);
      cat.style.transform = `translate(${x - 16}px, ${y - 16}px)`;
    };

    cat.style.transition = "transform 100ms linear";
    cat.style.transform = `translate(${x - 16}px, ${y - 16}px)`;
    sprite("idle", 0);
    const timer = setInterval(step, 100);
    return () => {
      clearInterval(timer);
      clearInterval(wanderTimer);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={el}
      onClick={() => {
        playMeow();
        setMeow(true);
        setTimeout(() => setMeow(false), 1100);
      }}
      title="Pet me"
      className="fixed top-0 left-0 z-[60] hidden h-8 w-8 cursor-pointer motion-reduce:hidden md:block"
      style={{
        backgroundImage: "url(/pet/oneko.gif)",
        imageRendering: "pixelated",
      }}
    >
      {meow && (
        <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-[#f8fafc] px-1.5 py-0.5 font-mono text-[10px] whitespace-nowrap text-[#08090d]">
          meow
        </span>
      )}
      {friend && !meow && (
        <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-[#f8fafc] px-1.5 py-0.5 font-mono text-[10px] whitespace-nowrap text-[#08090d]">
          hi robot!
        </span>
      )}
    </div>
  );
}
