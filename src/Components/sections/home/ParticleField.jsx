"use client";

import { useEffect, useRef } from "react";

const COUNT = 52;
const CONNECT_DIST = 130;
const C = { r: 17, g: 227, b: 251 }; // brand cyan

function mkNode(w, h) {
  return {
    ox: Math.random() * w,
    oy: Math.random() * h,
    x: 0,
    y: 0,
    r: Math.random() > 0.85 ? 3.2 : Math.random() > 0.55 ? 1.8 : 1.0,
    phase: Math.random() * Math.PI * 2,
    ampX: 14 + Math.random() * 18,
    ampY: 8  + Math.random() * 12,
    spd:  0.003 + Math.random() * 0.004,
  };
}

export default function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let w = 0, h = 0;
    let nodes = [];
    let t = 0;

    /* Lerp mouse — no jump on first entry */
    let mouseTarget = { x: 0, y: 0 };
    let mouseLerp   = { x: 0, y: 0 };

    /* ── Resize — also re-seeds nodes ── */
    function resize() {
      const dpr  = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = Array.from({ length: COUNT }, () => mkNode(w, h));
      /* Init lerp to center so first frame has no offset */
      mouseTarget = { x: w / 2, y: h / 2 };
      mouseLerp   = { x: w / 2, y: h / 2 };
    }

    /* ── Draw loop ── */
    function draw() {
      ctx.clearRect(0, 0, w, h);
      t++;

      /* Smoothly chase mouse target — 0.06 lerp factor */
      mouseLerp.x += (mouseTarget.x - mouseLerp.x) * 0.06;
      mouseLerp.y += (mouseTarget.y - mouseLerp.y) * 0.06;

      /* Gentle parallax offset from lerped mouse position */
      const dx = (mouseLerp.x / (w || 1) - 0.5) * 16;
      const dy = (mouseLerp.y / (h || 1) - 0.5) * 10;

      for (const n of nodes) {
        n.x = n.ox + Math.sin(t * n.spd + n.phase)        * n.ampX + dx * 0.18;
        n.y = n.oy + Math.cos(t * n.spd * 0.65 + n.phase) * n.ampY + dy * 0.18;
      }

      /* Connections */
      ctx.lineWidth = 0.7;
      for (let i = 0; i < COUNT - 1; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < CONNECT_DIST) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${C.r},${C.g},${C.b},${((1 - d / CONNECT_DIST) * 0.38).toFixed(3)})`;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      /* Nodes */
      for (const n of nodes) {
        /* Soft glow halo */
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4.5);
        grad.addColorStop(0,   `rgba(${C.r},${C.g},${C.b},0.55)`);
        grad.addColorStop(0.5, `rgba(${C.r},${C.g},${C.b},0.12)`);
        grad.addColorStop(1,   `rgba(${C.r},${C.g},${C.b},0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 4.5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        /* Hard core */
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${C.r},${C.g},${C.b},0.92)`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouseTarget.x = e.clientX - rect.left;
      mouseTarget.y = e.clientY - rect.top;
    }
    function onMouseLeave() {
      /* Smooth return to center */
      mouseTarget.x = w / 2;
      mouseTarget.y = h / 2;
    }

    resize();
    window.addEventListener("resize",     resize,       { passive: true });
    canvas.addEventListener("mousemove",  onMouseMove,  { passive: true });
    canvas.addEventListener("mouseleave", onMouseLeave, { passive: true });
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove",  onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="block h-full w-full"
      aria-hidden="true"
    />
  );
}
