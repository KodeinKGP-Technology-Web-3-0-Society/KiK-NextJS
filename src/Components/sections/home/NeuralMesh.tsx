/**
 * NeuralMesh.tsx
 * ════════════════════════════════════════════════════════════════
 * Pure React Three Fiber scene — NO external Spline dependency.
 * Fully controlled, fully owned, zero iframe.
 *
 * Scene contents:
 *   1. Point cloud  — 1 800 particles on a Fibonacci sphere
 *   2. Neural edges — 200 pre-computed line segments between
 *                     nearest-neighbour pairs
 *   3. Ghost sphere — ultra-faint wireframe at sphere surface
 *
 * Motion:
 *   • Auto-rotation on Y  (delta-based, frame-rate independent)
 *   • Mouse tilt on X & Z (lerp, smooth easing)
 *
 * Performance:
 *   • dpr capped at [1, 2]
 *   • depthWrite: false on points (avoids z-fighting)
 *   • geometry computed once in useMemo
 *   • alpha: true canvas (transparent, shows CSS background)
 * ════════════════════════════════════════════════════════════════
 */

"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── Config ──────────────────────────────────────────────────────── */
const POINT_COUNT = 1_800;
const SPHERE_R = 2.4;
const LINE_DIST = 0.7; // max edge length (world units)
const LINE_BUDGET = 200; // max connection segments
const CONNECTION_N = 450; // how many points to check for neighbours

/* ── Fibonacci sphere distribution ─────────────────────────────────
   Even spread on sphere surface, slight radial noise for volume feel */
function buildCloud(count: number, r: number): Float32Array {
  const pos = new Float32Array(count * 3);
  const phi = Math.PI * (1 + Math.sqrt(5)); // golden angle

  for (let i = 0; i < count; i++) {
    const t = i / (count - 1); // 0 → 1
    const incl = Math.acos(1 - 2 * t); // inclination
    const azim = phi * i; // azimuth
    const noise = 0.88 + Math.random() * 0.14; // 88% → 102% radius
    const rad = r * noise;

    pos[i * 3] = rad * Math.sin(incl) * Math.cos(azim);
    pos[i * 3 + 1] = rad * Math.sin(incl) * Math.sin(azim);
    pos[i * 3 + 2] = rad * Math.cos(incl);
  }
  return pos;
}

/* ── Pre-compute nearest-neighbour edges ────────────────────────────
   O(N_sub²) where N_sub = CONNECTION_N (≪ POINT_COUNT).
   Early-axis rejection prunes the inner loop fast. */
function buildEdges(
  pos: Float32Array,
  maxDist: number,
  budget: number,
  nSub: number
): Float32Array {
  const lines: number[] = [];
  const sub = Math.min(nSub, pos.length / 3);

  outer: for (let i = 0; i < sub; i++) {
    const ax = pos[i * 3],
      ay = pos[i * 3 + 1],
      az = pos[i * 3 + 2];
    for (let j = i + 1; j < sub; j++) {
      if (lines.length / 6 >= budget) break outer;
      const dx = ax - pos[j * 3];
      if (Math.abs(dx) > maxDist) continue;
      const dy = ay - pos[j * 3 + 1];
      if (Math.abs(dy) > maxDist) continue;
      const dz = az - pos[j * 3 + 2];
      if (Math.abs(dz) > maxDist) continue;
      if (dx * dx + dy * dy + dz * dz < maxDist * maxDist) {
        lines.push(ax, ay, az, pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]);
      }
    }
  }
  return new Float32Array(lines);
}

/* ── Inner Three.js scene ───────────────────────────────────────── */
function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  /* Geometry — computed once */
  const cloudPos = useMemo(() => buildCloud(POINT_COUNT, SPHERE_R), []);
  const edgePos = useMemo(
    () => buildEdges(cloudPos, LINE_DIST, LINE_BUDGET, CONNECTION_N),
    [cloudPos]
  );

  /* Global mouse listener — canvas uses pointer-events: none */
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    /* Continuous Y-axis spin (frame-rate independent) */
    groupRef.current.rotation.y += delta * 0.14;

    /* Smooth mouse tilt — lerp toward target */
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.current.y * -0.38,
      0.04
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      mouse.current.x * 0.14,
      0.04
    );
  });

  return (
    <group ref={groupRef}>
      {/* ── 1. Point cloud ──────────────────────────────────────── */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[cloudPos, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.022}
          color="#00E5FF"
          transparent
          opacity={0.75}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* ── 2. Neural connection lines ───────────────────────────── */}
      {edgePos.length > 0 && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[edgePos, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#00E5FF" transparent opacity={0.09} />
        </lineSegments>
      )}

      {/* ── 3. Ghost wireframe sphere ────────────────────────────── */}
      <mesh>
        <sphereGeometry args={[SPHERE_R * 1.01, 30, 20]} />
        <meshBasicMaterial
          color="#007BFF"
          wireframe
          transparent
          opacity={0.028}
        />
      </mesh>
    </group>
  );
}

/* ── Exported canvas wrapper ────────────────────────────────────── */
export default function NeuralMesh() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 52 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: false,
      }}
      style={{ background: "transparent", width: "100%", height: "100%" }}
    >
      {/* No lighting needed for point/line materials */}
      <Scene />
    </Canvas>
  );
}
