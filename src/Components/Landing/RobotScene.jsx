"use client";
import { useEffect, useRef, useState } from "react";

// Animated robot: "RobotExpressive" by Tomás Laulhé (Quaternius), CC0 1.0,
// via the three.js examples. File: /public/models/RobotExpressive.glb
const ACTIONS = [
  { clip: "Wave", label: "Wave" },
  { clip: "ThumbsUp", label: "Thumbs up" },
  { clip: "Jump", label: "Jump" },
  { clip: "Yes", label: "Nod" },
  { clip: "Dance", label: "Dance" },
  { clip: "Punch", label: "Punch" },
  { clip: "WalkJump", label: "Walk jump" },
];

export default function RobotScene() {
  const mount = useRef(null);
  const api = useRef(null);
  const [ready, setReady] = useState(false);
  const [, setActive] = useState(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      if (
        typeof window !== "undefined" &&
        (window.innerWidth < 768 ||
          window.matchMedia("(max-width: 767px)").matches)
      ) {
        return;
      }
      const THREE = await import("three");
      const { GLTFLoader } = await import(
        "three/examples/jsm/loaders/GLTFLoader.js"
      );
      if (disposed || !mount.current) return;

      const el = mount.current;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
      camera.position.set(0, 3.2, 11.5);
      camera.lookAt(0, 2.3, 0);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      el.appendChild(renderer.domElement);

      scene.add(new THREE.HemisphereLight(0xffffff, 0x1b2550, 2.2));
      const key = new THREE.DirectionalLight(0xffffff, 2.4);
      key.position.set(4, 8, 6);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xbfd4ff, 0.9);
      rim.position.set(-6, 4, -4);
      scene.add(rim);

      // flat floor disc
      const floor = new THREE.Mesh(
        new THREE.CircleGeometry(2.6, 64),
        new THREE.MeshBasicMaterial({ color: 0x15214a })
      );
      floor.rotation.x = -Math.PI / 2;
      scene.add(floor);

      const resize = () => {
        const w = el.clientWidth;
        const h = el.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      const gltf = await new GLTFLoader().loadAsync(
        "/models/RobotExpressive.glb"
      );
      if (disposed) return;
      const model = gltf.scene;
      // blue head/torso, white-silver arms and legs, metal joints
      const BODY = "#2a7de1";
      const LIMBS = "#e4e8ef"; // white-silver robot limbs
      const LIMB = /^(Shoulder|Arm|Hand|Leg|LowerLeg|Foot)/;
      model.traverse((o) => {
        if (!o.isMesh) return;
        const limb = LIMB.test(o.name) || LIMB.test(o.parent?.name || "");
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        const next = mats.map((m) => {
          if (!m) return m;
          if (m.name === "Grey") {
            m.color.set("#8d95a6"); // darker metal joints, so they read against the white limbs
            m.metalness = 0.35;
            m.roughness = 0.45;
            return m;
          }
          if (m.name !== "Main") return m;
          const c = m.clone();
          c.color.set(limb ? LIMBS : BODY);
          c.metalness = limb ? 0.3 : 0.15;
          c.roughness = limb ? 0.35 : 0.4;
          return c;
        });
        o.material = Array.isArray(o.material) ? next : next[0];
      });
      let headBone = null;
      let neckBone = null;
      model.traverse((o) => {
        if (o.isBone && o.name === "Head") headBone = o;
        if (o.isBone && o.name === "Neck") neckBone = o;
      });
      scene.add(model);

      const mixer = new THREE.AnimationMixer(model);
      const clips = Object.fromEntries(
        gltf.animations.map((c) => [c.name, mixer.clipAction(c)])
      );
      Object.values(clips).forEach((c) => (c.timeScale = 0.8)); // relaxed pace
      const FADE = 0.7;
      let current = clips.Idle;
      current.play();

      const play = (name) => {
        const next = clips[name];
        if (!next) return;
        next.reset();
        next.setLoop(THREE.LoopOnce, 1);
        next.clampWhenFinished = true;
        next.fadeIn(FADE).play();
        if (current && current !== next) {
          current.fadeOut(FADE);
        }
        current = next;
        setActive(name);
      };
      const idle = () => {
        if (current === clips.Idle) return;
        clips.Idle.reset().fadeIn(FADE).play();
        current.fadeOut(FADE);
        current = clips.Idle;
        setActive(null);
      };
      mixer.addEventListener("finished", idle);

      // Look at the cursor. The raw target can jump (cursor leaves and re-enters from
      // another side), so the gaze follows through a rate limiter: it always sweeps there.
      const target = { x: 0, y: 0 };
      const gaze = { x: 0, y: 0 };
      let trackWeight = 0; // 0 while emoting, eases to 1 when idle
      let resumeAt = 0; // time (s) when tracking may restart after an animation
      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        const dx =
          (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2);
        const dy =
          (e.clientY - (r.top + r.height * 0.3)) / (window.innerHeight / 2);
        target.y = Math.max(-1, Math.min(1, dx));
        target.x = Math.max(-1, Math.min(1, dy));
      };
      const recentre = () => {
        target.x = 0;
        target.y = 0;
      };
      window.addEventListener("pointermove", onMove);
      document.documentElement.addEventListener("mouseleave", recentre);
      window.addEventListener("blur", recentre);

      const qHead = new THREE.Quaternion();
      const qNeck = new THREE.Quaternion();
      const prevHead = new THREE.Quaternion(); // last frame's offsets, removed before the mixer runs
      const prevNeck = new THREE.Quaternion();
      const eul = new THREE.Euler();
      const MAX_SPEED = 1.6; // gaze units per second
      const approach = (cur, tgt, dt) => {
        const want = (tgt - cur) * Math.min(1, dt * 3.5); // lazy ease
        const cap = MAX_SPEED * dt;
        return cur + Math.max(-cap, Math.min(cap, want));
      };

      // only render while visible
      let visible = true;
      const io = new IntersectionObserver(
        ([e]) => (visible = e.isIntersecting)
      );
      io.observe(el);

      const clock = new THREE.Clock();
      let raf;
      const tick = () => {
        raf = requestAnimationFrame(tick);
        const dt = clock.getDelta();
        if (!visible) return;
        // remove last frame's look offset so it can never accumulate
        if (headBone) headBone.quaternion.multiply(prevHead.clone().invert());
        if (neckBone) neckBone.quaternion.multiply(prevNeck.clone().invert());
        mixer.update(dt);

        // Tracking is paused while an animation moves the head. When the move ends,
        // wait for it to blend back to idle, then sweep from centre to the cursor.
        const now = clock.elapsedTime;
        if (current !== clips.Idle) {
          resumeAt = Infinity;
          trackWeight += (0 - trackWeight) * Math.min(1, dt * 10); // let go quickly
          gaze.x += (0 - gaze.x) * Math.min(1, dt * 10);
          gaze.y += (0 - gaze.y) * Math.min(1, dt * 10);
        } else {
          if (resumeAt === Infinity) resumeAt = now + FADE + 0.25;
          if (now >= resumeAt) {
            trackWeight += (1 - trackWeight) * Math.min(1, dt * 2.5);
            gaze.x = approach(gaze.x, target.x, dt);
            gaze.y = approach(gaze.y, target.y, dt);
          }
        }

        // additive on top of the animated pose, so it never overwrites the animation
        const w = trackWeight;
        if (neckBone) {
          eul.set(gaze.x * 0.08 * w, gaze.y * 0.14 * w, 0);
          neckBone.quaternion.multiply(qNeck.setFromEuler(eul));
          prevNeck.copy(qNeck);
        }
        if (headBone) {
          eul.set(gaze.x * 0.22 * w, gaze.y * 0.32 * w, 0);
          headBone.quaternion.multiply(qHead.setFromEuler(eul));
          prevHead.copy(qHead);
        }
        model.rotation.y = gaze.y * 0.16 * w;
        renderer.render(scene, camera);
      };
      tick();

      let actionIndex = 0;
      const playNext = () => {
        if (disposed) return;
        const nextAction = ACTIONS[actionIndex];
        actionIndex = (actionIndex + 1) % ACTIONS.length;
        play(nextAction.clip);
      };

      api.current = {
        play,
        playNext,
        idle,
      };
      setReady(true);
      setTimeout(() => !disposed && playNext(), 400);

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      let auto;
      const schedule = () => {
        auto = setTimeout(
          () => {
            if (disposed) return;
            if (visible && !reduce && current === clips.Idle) {
              playNext();
            }
            schedule();
          },
          5000 + Math.random() * 2000
        );
      };
      schedule();

      // the cat has come to say hi: react
      const greet = () => {
        if (current !== clips.Idle) return;
        const friendly = ["Wave", "ThumbsUp", "Jump"];
        play(friendly[Math.floor(Math.random() * friendly.length)], false);
      };
      window.addEventListener("robot-cat-nearby", greet);

      cleanup = () => {
        window.removeEventListener("robot-cat-nearby", greet);
        cancelAnimationFrame(raf);
        clearTimeout(auto);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("mouseleave", recentre);
        window.removeEventListener("blur", recentre);
        mixer.stopAllAction();
        renderer.dispose();
        scene.traverse((o) => {
          o.geometry?.dispose();
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) =>
            m?.dispose()
          );
        });
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div className="hidden flex-col items-center md:flex">
      <div
        id="robot-scene"
        title="Click me"
        ref={mount}
        className="relative h-[340px] w-full max-w-[460px] cursor-pointer md:h-[440px]"
        onClick={() => api.current?.playNext()}
        role="img"
        aria-label="An animated 3D robot that waves, dances and reacts when clicked"
      >
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-[#9aa3b8]">
            booting robot…
          </div>
        )}
      </div>
    </div>
  );
}
