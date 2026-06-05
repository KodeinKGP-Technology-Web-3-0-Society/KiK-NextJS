"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

const VOID = "#020408";
const TEAL = "#00FFFF";
const TEAL_DARK = "#00B8D9";
const AMBER = "#3B82F6";
const CRIMSON = "#6366F1";
const OFF_WHITE = "#f4f6f6";
const DEEP_BLUE = "#040D18";

const TYPE_TEXT = "> DECRYPTING... SIGNAL ";
const PHASE = {
  HOLOGRAM: 0,
  MORPH_HIERO: 1,
  MORPH_CIRCUIT: 2,
  CONSTRUCT: 3,
  BREACH: 4,
  GRID: 5,
};

// Chromatic aberration shader
const ChromaticAberrationShader = {
  uniforms: {
    tDiffuse: { value: null },
    amount: { value: 0.002 },
    time: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float amount;
    uniform float time;
    varying vec2 vUv;
    void main() {
      vec2 center = vec2(0.5);
      vec2 dir = vUv - center;
      float dist = length(dir);
      float aberration = amount * dist * dist;
      vec2 offset = normalize(dir) * aberration;
      float r = texture2D(tDiffuse, vUv + offset * 1.8).r;
      float g = texture2D(tDiffuse, vUv).g;
      float b = texture2D(tDiffuse, vUv - offset * 1.2).b;
      // Scanline
      float scan = sin(vUv.y * 900.0 + time * 3.0) * 0.012;
      // Vignette
      float vig = 1.0 - dist * dist * 0.55;
      gl_FragColor = vec4((vec3(r, g, b) + scan) * vig, 1.0);
    }
  `,
};

// Noise shader for film grain
const FilmGrainShader = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0 },
    intensity: { value: 0.045 },
  },
  vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float time;
    uniform float intensity;
    varying vec2 vUv;
    float rand(vec2 co) { return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453 + time * 0.001); }
    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      float grain = (rand(vUv) - 0.5) * intensity;
      gl_FragColor = vec4(color.rgb + grain, color.a);
    }
  `,
};

function sampleTextPixels(text, width = 2048, height = 512, skip = 5) {
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 104px monospace";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 80, height * 0.5);
  const img = ctx.getImageData(0, 0, width, height).data;
  const pts = [];
  for (let y = 0; y < height; y += skip) {
    for (let x = 0; x < width; x += skip) {
      const a = img[(y * width + x) * 4 + 3];
      if (a > 80) {
        const nx = x / width - 0.5;
        const ny = y / height - 0.5;
        const warp =
          Math.sin(nx * 16.2) * 0.22 +
          Math.cos(ny * 14.7) * 0.18 +
          (Math.random() - 0.5) * 0.25;
        pts.push({ x: nx * 17.5, y: (0.5 - y / height) * 3.9, z: warp });
      }
    }
  }
  return pts;
}

function generateHieroglyphTargets(count) {
  const strokes = [
    [[-3.6, -1.4], [-3.6, 1.4], [-2.4, 1.4], [-2.4, -1.4], [-3.6, -1.4]],
    [[-1.7, -1.8], [-1.7, 1.8], [-0.5, 1.8], [-0.5, -1.8], [-1.7, -1.8]],
    [[0.2, -1.2], [1.8, -1.2], [1.8, 1.2], [0.2, 1.2], [0.2, -1.2]],
    [[2.4, -1.6], [3.7, 0], [2.4, 1.6], [3.4, 1.6], [4.6, 0], [3.4, -1.6], [2.4, -1.6]],
    // Added more glyph strokes for richer hiero phase
    [[-4.8, 0], [-3.8, 1.2], [-2.8, 0], [-3.8, -1.2], [-4.8, 0]],
    [[5.0, -1.4], [5.0, 1.4], [5.0, 0], [6.2, 0]],
  ];
  const pts = new Array(count);
  for (let i = 0; i < count; i++) {
    const stroke = strokes[i % strokes.length];
    const idx = Math.floor(Math.random() * (stroke.length - 1));
    const a = stroke[idx];
    const b = stroke[idx + 1];
    const t = Math.random();
    pts[i] = {
      x: THREE.MathUtils.lerp(a[0], b[0], t) + (Math.random() - 0.5) * 0.08,
      y: THREE.MathUtils.lerp(a[1], b[1], t) + (Math.random() - 0.5) * 0.08,
      z: (Math.random() - 0.5) * 0.55,
    };
  }
  return pts;
}

function generateCircuitTargets(count) {
  const pts = new Array(count);
  const nodeCount = 360;
  const nodes = Array.from({ length: nodeCount }, () => ({
    x: (Math.floor(Math.random() * 22) - 11) * 0.44,
    z: (Math.floor(Math.random() * 22) - 11) * 0.44,
  }));
  for (let i = 0; i < count; i++) {
    const a = nodes[(Math.random() * nodes.length) | 0];
    const b = nodes[(Math.random() * nodes.length) | 0];
    const t = Math.random();
    const snap = Math.random() > 0.6 ? 1 : 0;
    pts[i] = {
      x: (snap ? Math.round(a.x / 0.11) * 0.11 : THREE.MathUtils.lerp(a.x, b.x, t)) + (Math.random() - 0.5) * 0.018,
      y: -2.1 + (Math.random() - 0.5) * 0.018,
      z: (snap ? Math.round(a.z / 0.11) * 0.11 : THREE.MathUtils.lerp(a.z, b.z, t)) + (Math.random() - 0.5) * 0.018,
    };
  }
  return pts;
}

function generatePyramidTargets(count) {
  const apex = new THREE.Vector3(0, 2.9, 0);
  const base = [
    new THREE.Vector3(-4.4, -2.1, -4.4),
    new THREE.Vector3(4.4, -2.1, -4.4),
    new THREE.Vector3(4.4, -2.1, 4.4),
    new THREE.Vector3(-4.4, -2.1, 4.4),
  ];
  const edges = [
    [base[0], base[1]], [base[1], base[2]],
    [base[2], base[3]], [base[3], base[0]],
    [base[0], apex], [base[1], apex],
    [base[2], apex], [base[3], apex],
  ];
  const pts = new Array(count);
  for (let i = 0; i < count; i++) {
    if (Math.random() < 0.22) {
      pts[i] = {
        x: (Math.random() - 0.5) * 8.8,
        y: -2.1 + (Math.random() - 0.5) * 0.04,
        z: (Math.random() - 0.5) * 8.8,
      };
    } else {
      const e = edges[(Math.random() * edges.length) | 0];
      const t = Math.random();
      const p = new THREE.Vector3().lerpVectors(e[0], e[1], t);
      const yPulse = Math.max(0, (p.y + 2.1) / 5) * 0.1;
      pts[i] = {
        x: p.x + (Math.random() - 0.5) * 0.04,
        y: p.y + (Math.random() - 0.5) * 0.04 + yPulse,
        z: p.z + (Math.random() - 0.5) * 0.04,
      };
    }
  }
  return pts;
}

function makeTerminalTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1536;
  canvas.height = 768;
  const ctx = canvas.getContext("2d");
  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = false;
  tex.colorSpace = THREE.SRGBColorSpace;
  return { canvas, ctx, texture: tex };
}

export default function DekodeXLoading({ onComplete, lockToScreen = true, className = "" }) {
  const wrapRef = useRef(null);
  const [terminalText, setTerminalText] = useState("");
  const [showInit, setShowInit] = useState(false);
  const [showGranted, setShowGranted] = useState(false);
  const [inBreach, setInBreach] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const completeRef = useRef(false);
  const phaseRef = useRef(PHASE.HOLOGRAM);
  const phaseTimeRef = useRef(0);
  const typedCountRef = useRef(0);
  const speedRef = useRef(1);
  const shouldResolveRef = useRef(Boolean(onComplete));
  const texturesRef = useRef({ terminalTexture: null, terminalCtx: null });
  const worldRef = useRef(null);

  const cn = useMemo(() => {
    const base = lockToScreen
      ? "fixed inset-0 z-[120] overflow-hidden bg-[var(--void)]"
      : "relative h-screen w-full overflow-hidden bg-[var(--void)]";
    return `${base} ${className}`.trim();
  }, [className, lockToScreen]);

  useEffect(() => { shouldResolveRef.current = Boolean(onComplete); }, [onComplete]);

  useEffect(() => {
    let frame = 0;
    let disposed = false;
    let mounted = true;
    const host = wrapRef.current;
    if (!host) return () => {};

    const scene = new THREE.Scene();
    // Richer, deeper fog with a hint of teal
    scene.fog = new THREE.FogExp2(0x030810, 0.038);
    scene.background = new THREE.Color(0x020408);

    const camera = new THREE.PerspectiveCamera(58, host.clientWidth / host.clientHeight, 0.1, 450);
    camera.position.set(0.3, 0.7, 12.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);

    // Post-processing stack: bloom → glitch → chromatic aberration → film grain
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloom = new UnrealBloomPass(
      new THREE.Vector2(host.clientWidth, host.clientHeight),
      1.22, 1.1, 0.14,
    );
    composer.addPass(bloom);

    const glitch = new GlitchPass();
    glitch.enabled = true;
    glitch.goWild = false;
    glitch.curF = 0.03;
    composer.addPass(glitch);

    const chromaPass = new ShaderPass(ChromaticAberrationShader);
    chromaPass.uniforms.amount.value = 0.003;
    composer.addPass(chromaPass);

    const grainPass = new ShaderPass(FilmGrainShader);
    grainPass.uniforms.intensity.value = 0.04;
    composer.addPass(grainPass);

    // Richer lighting: 3-point + rim with colored fills
    const ambient = new THREE.AmbientLight(0x0a1628, 0.4);
    scene.add(ambient);

    const tealRim = new THREE.PointLight(0x00ffff, 28, 65, 1.4);
    tealRim.position.set(-6, 6, 10);
    scene.add(tealRim);

    const amberKey = new THREE.PointLight(0x3b82f6, 18, 52, 1.7);
    amberKey.position.set(8, -3, 8);
    scene.add(amberKey);

    const crimsonFill = new THREE.PointLight(0x6366f1, 10, 40, 2.0);
    crimsonFill.position.set(0, -8, -5);
    scene.add(crimsonFill);

    const topLight = new THREE.PointLight(0xffffff, 8, 30, 2.2);
    topLight.position.set(0, 15, 0);
    scene.add(topLight);

    // Terminal plane
    const terminal = makeTerminalTexture();
    terminal.texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    texturesRef.current.terminalTexture = terminal.texture;
    texturesRef.current.terminalCtx = terminal.ctx;

    const terminalPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(13.6, 6.2, 1, 1),
      new THREE.MeshBasicMaterial({
        map: terminal.texture,
        transparent: true,
        opacity: 0.98,
        blending: THREE.NormalBlending,
      }),
    );
    terminalPlane.position.set(-0.4, 0.38, 0);
    terminalPlane.rotation.set(-0.08, -0.37, -0.025);
    scene.add(terminalPlane);

    // Holographic overlay plates — layered for depth
    const volPlate = new THREE.Mesh(
      new THREE.PlaneGeometry(14.5, 7.3),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(TEAL), transparent: true, opacity: 0.06 }),
    );
    volPlate.position.copy(terminalPlane.position).add(new THREE.Vector3(0, 0, -0.28));
    volPlate.rotation.copy(terminalPlane.rotation);
    scene.add(volPlate);

    const volPlate2 = new THREE.Mesh(
      new THREE.PlaneGeometry(15.2, 7.9),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(DEEP_BLUE), transparent: true, opacity: 0.12 }),
    );
    volPlate2.position.copy(terminalPlane.position).add(new THREE.Vector3(0, 0, -0.55));
    volPlate2.rotation.copy(terminalPlane.rotation);
    scene.add(volPlate2);

    // Particles: increased count, two layers (main + secondary fine)
    const particleCount = 5200;
    const fineCount = 2400; // secondary fine layer

    const pos = new Float32Array(particleCount * 3);
    const start = new Float32Array(particleCount * 3);
    const targetA = new Float32Array(particleCount * 3);
    const targetB = new Float32Array(particleCount * 3);
    const targetC = new Float32Array(particleCount * 3);
    const velocity = new Float32Array(particleCount * 3);
    const burst = new Float32Array(particleCount * 3);
    const particleColor = new Float32Array(particleCount * 3); // per-particle color

    const textCloud = sampleTextPixels(TYPE_TEXT, 2048, 512, 5);
    const hiero = generateHieroglyphTargets(particleCount);
    const circuit = generateCircuitTargets(particleCount);
    const pyramid = generatePyramidTargets(particleCount);

    const tealCol = new THREE.Color(TEAL);
    const amberCol = new THREE.Color(AMBER);
    const crimsonCol = new THREE.Color(CRIMSON);
    const whiteCol = new THREE.Color(OFF_WHITE);

    for (let i = 0; i < particleCount; i++) {
      const t = textCloud[i % textCloud.length];
      const rx = (Math.random() - 0.5) * 0.9;
      const ry = (Math.random() - 0.5) * 0.8;
      const rz = (Math.random() - 0.5) * 1.9;
      start[i * 3] = t.x + rx;
      start[i * 3 + 1] = t.y + ry;
      start[i * 3 + 2] = t.z + rz;

      const dir = new THREE.Vector3(start[i * 3], start[i * 3 + 1] * 0.8, start[i * 3 + 2])
        .normalize().multiplyScalar(0.06 + Math.random() * 0.14);
      burst[i * 3] = dir.x;
      burst[i * 3 + 1] = dir.y;
      burst[i * 3 + 2] = dir.z;

      targetA[i * 3] = hiero[i].x; targetA[i * 3 + 1] = hiero[i].y; targetA[i * 3 + 2] = hiero[i].z;
      targetB[i * 3] = circuit[i].x; targetB[i * 3 + 1] = circuit[i].y; targetB[i * 3 + 2] = circuit[i].z;
      targetC[i * 3] = pyramid[i].x; targetC[i * 3 + 1] = pyramid[i].y; targetC[i * 3 + 2] = pyramid[i].z;

      pos[i * 3] = start[i * 3];
      pos[i * 3 + 1] = start[i * 3 + 1];
      pos[i * 3 + 2] = start[i * 3 + 2];

      // Assign varied colors: mostly teal, some amber/crimson accents
      const rand = Math.random();
      let col;
      if (rand < 0.72) col = tealCol;
      else if (rand < 0.88) col = amberCol;
      else if (rand < 0.96) col = crimsonCol;
      else col = whiteCol;
      particleColor[i * 3] = col.r;
      particleColor[i * 3 + 1] = col.g;
      particleColor[i * 3 + 2] = col.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColor, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const swarm = new THREE.Points(particleGeo, particleMat);
    scene.add(swarm);

    // Secondary fine particle layer — tiny scattered ambient glow
    const finePos = new Float32Array(fineCount * 3);
    const fineColor = new Float32Array(fineCount * 3);
    for (let i = 0; i < fineCount; i++) {
      finePos[i * 3] = (Math.random() - 0.5) * 22;
      finePos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      finePos[i * 3 + 2] = (Math.random() - 0.5) * 16;
      const r = Math.random();
      const c = r < 0.6 ? tealCol : r < 0.85 ? amberCol : whiteCol;
      fineColor[i * 3] = c.r; fineColor[i * 3 + 1] = c.g; fineColor[i * 3 + 2] = c.b;
    }
    const fineGeo = new THREE.BufferGeometry();
    fineGeo.setAttribute("position", new THREE.BufferAttribute(finePos, 3));
    fineGeo.setAttribute("color", new THREE.BufferAttribute(fineColor, 3));
    const finePoints = new THREE.Points(fineGeo, new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }));
    scene.add(finePoints);

    // Volumetric dust — larger, slower, atmospheric
    const dustCount = 1600;
    const dust = new Float32Array(dustCount * 3);
    const dustVel = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dust[i * 3] = (Math.random() - 0.5) * 45;
      dust[i * 3 + 1] = (Math.random() - 0.5) * 30;
      dust[i * 3 + 2] = (Math.random() - 0.5) * 38;
      dustVel[i * 3] = (Math.random() - 0.5) * 0.015;
      dustVel[i * 3 + 1] = 0.04 + Math.random() * 0.06;
      dustVel[i * 3 + 2] = (Math.random() - 0.5) * 0.012;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dust, 3));
    const dustPoints = new THREE.Points(dustGeo, new THREE.PointsMaterial({
      size: 0.09,
      color: OFF_WHITE,
      transparent: true,
      opacity: 0.15,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }));
    scene.add(dustPoints);

    // Pyramid wireframe
    const pyramidApex = new THREE.Vector3(0, 2.9, 0);
    const pyramidBase = [
      new THREE.Vector3(-4.4, -2.1, -4.4),
      new THREE.Vector3(4.4, -2.1, -4.4),
      new THREE.Vector3(4.4, -2.1, 4.4),
      new THREE.Vector3(-4.4, -2.1, 4.4),
    ];
    const pyramidLinePos = [];
    const pushEdge = (a, b) => pyramidLinePos.push(a.x, a.y, a.z, b.x, b.y, b.z);
    pushEdge(pyramidBase[0], pyramidBase[1]); pushEdge(pyramidBase[1], pyramidBase[2]);
    pushEdge(pyramidBase[2], pyramidBase[3]); pushEdge(pyramidBase[3], pyramidBase[0]);
    pushEdge(pyramidBase[0], pyramidApex); pushEdge(pyramidBase[1], pyramidApex);
    pushEdge(pyramidBase[2], pyramidApex); pushEdge(pyramidBase[3], pyramidApex);
    const pyramidLineGeo = new THREE.BufferGeometry();
    pyramidLineGeo.setAttribute("position", new THREE.Float32BufferAttribute(pyramidLinePos, 3));
    const pyramidMesh = new THREE.LineSegments(pyramidLineGeo, new THREE.LineBasicMaterial({
      color: TEAL, transparent: true, opacity: 0,
    }));
    scene.add(pyramidMesh);

    // Inner glow pyramid (slightly smaller, amber tint)
    const innerPyramidLinePos = [];
    const s = 0.82;
    const iApex = pyramidApex.clone().multiplyScalar(s);
    const iBase = pyramidBase.map(v => v.clone().multiplyScalar(s));
    const pushEdgeI = (a, b) => innerPyramidLinePos.push(a.x, a.y, a.z, b.x, b.y, b.z);
    pushEdgeI(iBase[0], iBase[1]); pushEdgeI(iBase[1], iBase[2]);
    pushEdgeI(iBase[2], iBase[3]); pushEdgeI(iBase[3], iBase[0]);
    pushEdgeI(iBase[0], iApex); pushEdgeI(iBase[1], iApex);
    pushEdgeI(iBase[2], iApex); pushEdgeI(iBase[3], iApex);
    const innerPyramidGeo = new THREE.BufferGeometry();
    innerPyramidGeo.setAttribute("position", new THREE.Float32BufferAttribute(innerPyramidLinePos, 3));
    const innerPyramidMesh = new THREE.LineSegments(innerPyramidGeo, new THREE.LineBasicMaterial({
      color: AMBER, transparent: true, opacity: 0,
    }));
    scene.add(innerPyramidMesh);

    // Beam system — outer shell, core, super-core, halo ring
    const beam = new THREE.Mesh(
      new THREE.ConeGeometry(1.8, 64, 36, 1, true),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(TEAL), transparent: true, opacity: 0,
        blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
      }),
    );
    beam.geometry.translate(0, 32, 0);
    beam.position.copy(pyramidApex);

    const beamCore = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.55, 64, 32, 1, false),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(OFF_WHITE), transparent: true, opacity: 0,
        blending: THREE.AdditiveBlending, depthWrite: false,
      }),
    );
    beamCore.geometry.translate(0, 32, 0);
    beamCore.position.copy(pyramidApex);

    const superCore = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 64, 12, 1, false),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xffffff), transparent: true, opacity: 0, depthWrite: false,
      }),
    );
    superCore.geometry.translate(0, 32, 0);
    superCore.position.copy(pyramidApex);

    // Halo ring at apex base
    const haloRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.2, 0.06, 8, 64),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(TEAL), transparent: true, opacity: 0,
        blending: THREE.AdditiveBlending, depthWrite: false,
      }),
    );
    haloRing.position.copy(pyramidApex);
    haloRing.rotation.x = Math.PI / 2;

    // Second halo (amber, counter-rotating)
    const haloRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.8, 0.04, 8, 64),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(AMBER), transparent: true, opacity: 0,
        blending: THREE.AdditiveBlending, depthWrite: false,
      }),
    );
    haloRing2.position.copy(pyramidApex);
    haloRing2.rotation.x = Math.PI / 2;

    scene.add(beam, beamCore, superCore, haloRing, haloRing2);

    // Pulse orbs along edges
    const pulses = Array.from({ length: 12 }, (_, i) =>
      new THREE.Mesh(
        new THREE.SphereGeometry(0.07 + (i % 3) * 0.025, 8, 8),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(i % 3 === 0 ? TEAL : i % 3 === 1 ? AMBER : CRIMSON),
          transparent: true, opacity: 0,
        }),
      )
    );
    pulses.forEach(p => scene.add(p));
    const pulseEdges = [
      [new THREE.Vector3(-4.4, -2.1, -4.4), pyramidApex],
      [new THREE.Vector3(4.4, -2.1, -4.4), pyramidApex],
      [new THREE.Vector3(4.4, -2.1, 4.4), pyramidApex],
      [new THREE.Vector3(-4.4, -2.1, 4.4), pyramidApex],
      [new THREE.Vector3(-4.4, -2.1, -4.4), new THREE.Vector3(4.4, -2.1, -4.4)],
      [new THREE.Vector3(4.4, -2.1, -4.4), new THREE.Vector3(4.4, -2.1, 4.4)],
      [new THREE.Vector3(4.4, -2.1, 4.4), new THREE.Vector3(-4.4, -2.1, 4.4)],
      [new THREE.Vector3(-4.4, -2.1, 4.4), new THREE.Vector3(-4.4, -2.1, -4.4)],
      // Extra mid-edge pulses
      [new THREE.Vector3(-2.2, -2.1, -4.4), new THREE.Vector3(-2.2, 0.4, -2.2)],
      [new THREE.Vector3(2.2, -2.1, 4.4), new THREE.Vector3(2.2, 0.4, 2.2)],
      [new THREE.Vector3(4.4, -2.1, -2.2), new THREE.Vector3(2.2, 0.4, -2.2)],
      [new THREE.Vector3(-4.4, -2.1, 2.2), new THREE.Vector3(-2.2, 0.4, 2.2)],
    ];

    // Enhanced grid — two overlapping grids for depth
    const grid = new THREE.GridHelper(260, 140, new THREE.Color(TEAL), new THREE.Color(0x0d2d45));
    grid.material.transparent = true;
    grid.material.opacity = 0;
    grid.position.y = -6;
    scene.add(grid);

    const grid2 = new THREE.GridHelper(120, 60, new THREE.Color(AMBER), new THREE.Color(0x08142d));
    grid2.material.transparent = true;
    grid2.material.opacity = 0;
    grid2.position.y = -6;
    scene.add(grid2);

    // Horizon fog plane
    const fogPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(300, 80),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(TEAL), transparent: true, opacity: 0,
        blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
      }),
    );
    fogPlane.position.set(0, -6, -80);
    scene.add(fogPlane);

    worldRef.current = {
      scene, camera, renderer, composer, particleGeo, swarm, particleMat,
      terminalPlane, volPlate, volPlate2, dustPoints, finePoints,
      pyramidMesh, innerPyramidMesh, beam, beamCore, superCore, haloRing, haloRing2,
      grid, grid2, fogPlane, pulses, pulseEdges,
      pos, start, targetA, targetB, targetC, velocity, burst,
    };

    const clock = new THREE.Clock();
    const tmp = new THREE.Vector3();
    const camLow = new THREE.Vector3(-7.8, -2.7, 16.5);
    const camMid = new THREE.Vector3(-2.6, 1.8, 12.8);
    const camHigh = new THREE.Vector3(0.5, 1.8, 11.5);
    const camGrid = new THREE.Vector3(0, 6.6, 7.2);
    const camTarget = new THREE.Vector3();

    const markComplete = () => {
      if (completeRef.current || !mounted) return;
      completeRef.current = true;
      setFadingOut(true);
      gsap.delayedCall(0.78, () => { if (mounted && onComplete) onComplete(); });
    };

    const updateTerminalTexture = (fullText, phase) => {
      const ctx = terminal.ctx;
      if (!ctx) return;
      const { width, height } = terminal.canvas;
      ctx.clearRect(0, 0, width, height);

      // Richer background: layered gradient
      const bg = ctx.createLinearGradient(0, 0, 0, height);
      bg.addColorStop(0, "rgba(2,4,12,0.92)");
      bg.addColorStop(0.5, "rgba(4,10,24,0.85)");
      bg.addColorStop(1, "rgba(2,4,12,0.92)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // Scanlines
      ctx.strokeStyle = "rgba(0,255,255,0.08)";
      ctx.lineWidth = 1;
      for (let y = 0; y < height; y += 20) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Vertical subtle lines
      ctx.strokeStyle = "rgba(0,255,255,0.04)";
      for (let x = 0; x < width; x += 80) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }

      const x = 120;
      const y = height * 0.5;
      ctx.font = "700 96px monospace";
      ctx.textBaseline = "middle";
      const cursor = Math.floor(performance.now() / 430) % 2 ? "|" : " ";
      const line = `${fullText}${cursor}`;

      // Multi-layer glow text rendering
      // Outer glow (teal, wide)
      ctx.shadowColor = "rgba(0,255,255,0.9)";
      ctx.shadowBlur = 38;
      ctx.fillStyle = "rgba(0,255,255,0.18)";
      ctx.fillText(line, x, y);

      // Mid glow
      ctx.shadowBlur = 16;
      ctx.fillStyle = "rgba(0,255,255,0.45)";
      ctx.fillText(line, x, y);

      // Chromatic split
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(245,166,35,0.18)";
      ctx.fillText(line, x + 1.2, y + 0.8);
      ctx.fillStyle = "rgba(99,102,241,0.1)";
      ctx.fillText(line, x - 0.8, y - 0.4);

      // Crisp main text
      ctx.shadowColor = "rgba(0,255,255,0.5)";
      ctx.shadowBlur = 8;
      ctx.fillStyle = "rgba(244,246,246,0.96)";
      ctx.fillText(line, x, y);
      ctx.shadowBlur = 0;

      // Cursor block
      if (Math.floor(performance.now() / 430) % 2 === 1) {
        const m = ctx.measureText(fullText);
        const cx = x + m.width + 5;
        const ch = 90;
        const cy = y - ch * 0.5;
        const cursorGrad = ctx.createLinearGradient(cx, cy, cx, cy + ch);
        cursorGrad.addColorStop(0, "rgba(0,255,255,0.2)");
        cursorGrad.addColorStop(0.5, "rgba(244,246,246,1.0)");
        cursorGrad.addColorStop(1, "rgba(0,255,255,0.2)");
        ctx.fillStyle = cursorGrad;
        ctx.fillRect(cx, cy, 5, ch);
      }

      // Border: double-line frame
      ctx.strokeStyle = "rgba(0,255,255,0.7)";
      ctx.lineWidth = 3;
      ctx.strokeRect(18, 18, width - 36, height - 36);
      ctx.strokeStyle = "rgba(0,255,255,0.2)";
      ctx.lineWidth = 1;
      ctx.strokeRect(26, 26, width - 52, height - 52);

      // Corner accents
      const accentLen = 42;
      ctx.strokeStyle = "rgba(245,166,35,0.75)";
      ctx.lineWidth = 2;
      const corners = [[18, 18], [width - 18, 18], [18, height - 18], [width - 18, height - 18]];
      corners.forEach(([cx2, cy2], idx) => {
        const dx = idx % 2 === 0 ? 1 : -1;
        const dy = idx < 2 ? 1 : -1;
        ctx.beginPath(); ctx.moveTo(cx2, cy2 + dy * accentLen); ctx.lineTo(cx2, cy2); ctx.lineTo(cx2 + dx * accentLen, cy2); ctx.stroke();
      });

      terminal.texture.needsUpdate = true;
    };

    const phaseTransition = (toPhase) => {
      phaseRef.current = toPhase;
      phaseTimeRef.current = 0;
    };

    const updatePhase = (dt, fpsFactor) => {
      const world = worldRef.current;
      if (!world) return;
      phaseTimeRef.current += dt;
      const phase = phaseRef.current;
      const t = performance.now();
      const dynamicStep = THREE.MathUtils.clamp((fpsFactor + 0.8) * 0.78, 0.32, 1.3);

      // Animate rim light flicker every frame
      tealRim.intensity = 18 + Math.sin(t * 0.003) * 4 + Math.sin(t * 0.0071) * 2;
      amberKey.intensity = 16 + Math.sin(t * 0.004 + 1.2) * 4;

      // Chromatic aberration and grain update
      chromaPass.uniforms.time.value = t * 0.001;
      grainPass.uniforms.time.value = t;

      if (phase === PHASE.HOLOGRAM) {
        if (typedCountRef.current < TYPE_TEXT.length) {
          typedCountRef.current += dt * dynamicStep * 13;
          const visible = TYPE_TEXT.slice(0, Math.floor(typedCountRef.current));
          setTerminalText(visible);
          updateTerminalTexture(visible, phase);
        } else {
          updateTerminalTexture(TYPE_TEXT, phase);
        }
        world.terminalPlane.material.opacity = THREE.MathUtils.lerp(world.terminalPlane.material.opacity, 0.95, 0.07);
        world.volPlate.material.opacity = 0.05 + Math.sin(t * 0.0022) * 0.02;
        world.volPlate2.material.opacity = 0.08 + Math.sin(t * 0.0017 + 1) * 0.03;
        world.particleMat.opacity = Math.max(0, world.particleMat.opacity - 0.02);
        chromaPass.uniforms.amount.value = 0.003 + Math.sin(t * 0.002) * 0.001;
        glitch.curF = 0.02 + Math.sin(t * 0.0014) * 0.01;

        if (typedCountRef.current >= TYPE_TEXT.length && phaseTimeRef.current > 1.5 / speedRef.current) {
          setTerminalText("");
          phaseTransition(PHASE.CONSTRUCT);
        }
        return;
      }

      if (phase === PHASE.MORPH_HIERO) {
        updateTerminalTexture(TYPE_TEXT, phase);
        world.terminalPlane.material.opacity = Math.max(0, world.terminalPlane.material.opacity - 0.012);
        world.volPlate.material.opacity = Math.max(0, world.volPlate.material.opacity - 0.009);
        world.volPlate2.material.opacity = Math.max(0, world.volPlate2.material.opacity - 0.007);
        if (world.terminalPlane.material.opacity <= 0.01) world.terminalPlane.visible = false;
        if (world.volPlate.material.opacity <= 0.01) world.volPlate.visible = false;
        if (world.volPlate2.material.opacity <= 0.01) world.volPlate2.visible = false;

        world.particleMat.opacity = THREE.MathUtils.lerp(world.particleMat.opacity, 0.95, 0.06);
        chromaPass.uniforms.amount.value = THREE.MathUtils.lerp(chromaPass.uniforms.amount.value, 0.006, 0.04);
        glitch.curF = 0.05;

        const pull = 0.035 * dynamicStep;
        const shatterT = Math.max(0, 1 - phaseTimeRef.current / 1.15);
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          const tx = world.targetA[i3], ty = world.targetA[i3 + 1], tz = world.targetA[i3 + 2];
          const swirl = 0.025 * shatterT;
          const px = world.pos[i3], py = world.pos[i3 + 1];
          world.velocity[i3] += (tx - world.pos[i3]) * pull + world.burst[i3] * shatterT + -py * swirl;
          world.velocity[i3 + 1] += (ty - world.pos[i3 + 1]) * pull + world.burst[i3 + 1] * shatterT * 0.7;
          world.velocity[i3 + 2] += (tz - world.pos[i3 + 2]) * pull + world.burst[i3 + 2] * shatterT + px * swirl;
          world.velocity[i3] *= 0.86; world.velocity[i3 + 1] *= 0.86; world.velocity[i3 + 2] *= 0.86;
          world.pos[i3] += world.velocity[i3];
          world.pos[i3 + 1] += world.velocity[i3 + 1];
          world.pos[i3 + 2] += world.velocity[i3 + 2];
        }
        world.particleGeo.attributes.position.needsUpdate = true;
        camera.position.x = Math.sin(t * 0.00031) * 2.8;
        camera.position.z = 9.4 + Math.cos(t * 0.00031) * 1.5;
        camera.lookAt(0, 0, 0);
        if (phaseTimeRef.current > 3.3 / speedRef.current) phaseTransition(PHASE.MORPH_CIRCUIT);
        return;
      }

      if (phase === PHASE.MORPH_CIRCUIT) {
        world.particleMat.opacity = THREE.MathUtils.lerp(world.particleMat.opacity, 1, 0.05);
        world.particleMat.size = 0.05;
        const pull = 0.035 * dynamicStep;
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          const tx = world.targetB[i3], ty = world.targetB[i3 + 1], tz = world.targetB[i3 + 2];
          world.velocity[i3] += (tx - world.pos[i3]) * pull;
          world.velocity[i3 + 1] += (ty - world.pos[i3 + 1]) * pull;
          world.velocity[i3 + 2] += (tz - world.pos[i3 + 2]) * pull;
          world.velocity[i3] *= 0.86; world.velocity[i3 + 1] *= 0.86; world.velocity[i3 + 2] *= 0.86;
          world.pos[i3] += world.velocity[i3];
          world.pos[i3 + 1] += world.velocity[i3 + 1];
          world.pos[i3 + 2] += world.velocity[i3 + 2];
        }
        world.particleGeo.attributes.position.needsUpdate = true;
        camera.position.x = Math.sin(t * 0.0004) * 5.8;
        camera.position.z = 8.5 + Math.cos(t * 0.0003) * 3.8;
        camera.position.y = 2.5 + Math.sin(t * 0.0005) * 1.6;
        camera.lookAt(0, -2.1, 0);
        if (phaseTimeRef.current > 2.9 / speedRef.current) phaseTransition(PHASE.CONSTRUCT);
        return;
      }

      if (phase === PHASE.CONSTRUCT) {
        const constructT = Math.min(1, phaseTimeRef.current / (4.0 / speedRef.current));
        const constructEase = THREE.MathUtils.smoothstep(constructT, 0, 1);

        // Fade out the holographic terminal board and overlay plates
        world.terminalPlane.material.opacity = Math.max(0, world.terminalPlane.material.opacity - 0.055);
        world.volPlate.material.opacity = Math.max(0, world.volPlate.material.opacity - 0.045);
        world.volPlate2.material.opacity = Math.max(0, world.volPlate2.material.opacity - 0.038);
        if (world.terminalPlane.material.opacity <= 0.01) world.terminalPlane.visible = false;
        if (world.volPlate.material.opacity <= 0.01) world.volPlate.visible = false;
        if (world.volPlate2.material.opacity <= 0.01) world.volPlate2.visible = false;

        // Bring back the particles opacity so they charge up the pyramid
        world.particleMat.opacity = THREE.MathUtils.lerp(world.particleMat.opacity, 0.78, 0.05);
        world.particleMat.size = 0.045 + constructEase * 0.025;

        world.pyramidMesh.material.opacity = THREE.MathUtils.lerp(world.pyramidMesh.material.opacity, 0.24 + constructEase * 0.42, 0.07);
        world.innerPyramidMesh.material.opacity = THREE.MathUtils.lerp(world.innerPyramidMesh.material.opacity, constructEase * 0.30, 0.06);
        world.haloRing.material.opacity = THREE.MathUtils.lerp(world.haloRing.material.opacity, constructEase * 0.6, 0.05);
        world.haloRing2.material.opacity = THREE.MathUtils.lerp(world.haloRing2.material.opacity, constructEase * 0.35, 0.05);
        world.haloRing.rotation.z = t * 0.001;
        world.haloRing2.rotation.z = -t * 0.0008;
        world.haloRing.scale.setScalar(1 + Math.sin(t * 0.005) * 0.08 * constructEase);
        world.haloRing2.scale.setScalar(1 + Math.cos(t * 0.006) * 0.06 * constructEase);

        const pull = 0.032 * dynamicStep;
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          const tx = world.targetC[i3], ty = world.targetC[i3 + 1], tz = world.targetC[i3 + 2];
          const layer = THREE.MathUtils.clamp((ty + 2.1) / 5, 0, 1);
          const gate = THREE.MathUtils.smoothstep(constructEase, Math.max(0, layer * 0.8 - 0.2), Math.min(1, layer * 0.8 + 0.2));
          world.velocity[i3] += (tx - world.pos[i3]) * pull;
          world.velocity[i3 + 1] += (THREE.MathUtils.lerp(-2.1, ty, gate) - world.pos[i3 + 1]) * pull * 1.5;
          world.velocity[i3 + 2] += (tz - world.pos[i3 + 2]) * pull;
          world.velocity[i3] *= 0.87; world.velocity[i3 + 1] *= 0.87; world.velocity[i3 + 2] *= 0.87;
          world.pos[i3] += world.velocity[i3];
          world.pos[i3 + 1] += world.velocity[i3 + 1];
          world.pos[i3 + 2] += world.velocity[i3 + 2];
        }
        world.particleGeo.attributes.position.needsUpdate = true;

        const pulseT = (t * (0.00025 + constructEase * 0.00024)) % 1;
        for (let i = 0; i < world.pulses.length; i++) {
          const edge = world.pulseEdges[i % world.pulseEdges.length];
          const edgePulse = (pulseT + i * 0.085 + constructEase * 0.2) % 1;
          tmp.lerpVectors(edge[0], edge[1], edgePulse);
          world.pulses[i].position.copy(tmp);
          world.pulses[i].material.opacity = 0.15 + constructEase * 0.7 + Math.sin(t * 0.01 + i * 0.8) * 0.2;
        }

        if (constructEase < 0.58) camTarget.lerpVectors(camLow, camMid, constructEase / 0.58);
        else camTarget.lerpVectors(camMid, camHigh, (constructEase - 0.58) / 0.42);
        camTarget.x += Math.sin(t * 0.00042) * 0.4;
        camTarget.z += Math.cos(t * 0.00035) * 0.32;
        camera.position.lerp(camTarget, 0.014 + constructEase * 0.02);
        camera.lookAt(0, -0.2 + constructEase * 1.15, 0);

        bloom.strength = THREE.MathUtils.lerp(bloom.strength, 1.1 + constructEase * 0.22, 0.04);
        chromaPass.uniforms.amount.value = THREE.MathUtils.lerp(chromaPass.uniforms.amount.value, 0.004 + constructEase * 0.003, 0.03);
        glitch.curF = 0.03 + constructEase * 0.04;

        if (phaseTimeRef.current > 4.0 / speedRef.current) {
          phaseTransition(PHASE.BREACH);
          setInBreach(true);
        }
        return;
      }

      if (phase === PHASE.BREACH) {
        const breachT = Math.min(1, phaseTimeRef.current / (1.7 / speedRef.current));
        const thinRelease = THREE.MathUtils.smoothstep(breachT, 0.0, 0.1);
        const charge = THREE.MathUtils.smoothstep(breachT, 0.15, 0.6);
        const launch = THREE.MathUtils.smoothstep(breachT, 0.65, 0.96);

        world.beam.material.opacity = THREE.MathUtils.lerp(world.beam.material.opacity, 0.18 + thinRelease * 0.18 + charge * 0.3 + launch * 0.16, 0.08);
        world.beam.scale.x = 0.18 + thinRelease * 0.32 + charge * 0.95 + launch * 2.1 + Math.sin(t * 0.013) * 0.06;
        world.beam.scale.z = 0.18 + thinRelease * 0.28 + charge * 0.82 + launch * 1.8 + Math.sin(t * 0.011) * 0.05;
        world.beamCore.material.opacity = THREE.MathUtils.lerp(world.beamCore.material.opacity, 0.24 + thinRelease * 0.2 + charge * 0.4 + launch * 0.12, 0.1);
        world.beamCore.scale.x = 0.2 + thinRelease * 0.26 + charge * 0.52 + launch * 0.86 + Math.sin(t * 0.018) * 0.04;
        world.beamCore.scale.z = 0.2 + thinRelease * 0.26 + charge * 0.52 + launch * 0.86 + Math.sin(t * 0.018) * 0.04;
        world.superCore.material.opacity = THREE.MathUtils.lerp(world.superCore.material.opacity, 0.28 + thinRelease * 0.3 + charge * 0.32 + launch * 0.2, 0.14);

        world.haloRing.material.opacity = THREE.MathUtils.lerp(world.haloRing.material.opacity, 0.56 - launch * 0.52, 0.1);
        world.haloRing2.material.opacity = THREE.MathUtils.lerp(world.haloRing2.material.opacity, 0.38 - launch * 0.34, 0.08);
        world.haloRing.scale.setScalar(1 + charge * 0.35 + launch * 1.3);
        world.haloRing2.scale.setScalar(1 + charge * 0.24 + launch * 0.92);

        world.pyramidMesh.material.opacity = THREE.MathUtils.lerp(world.pyramidMesh.material.opacity, 0.52 - launch * 0.42, 0.08);
        world.innerPyramidMesh.material.opacity = THREE.MathUtils.lerp(world.innerPyramidMesh.material.opacity, 0.36 - launch * 0.3, 0.08);
        world.swarm.material.opacity = THREE.MathUtils.lerp(world.swarm.material.opacity, 0.72 - launch * 0.66, 0.08);

        bloom.strength = THREE.MathUtils.lerp(bloom.strength, 1.74 + launch * 0.82, 0.07);
        chromaPass.uniforms.amount.value = THREE.MathUtils.lerp(chromaPass.uniforms.amount.value, 0.01 + launch * 0.014, 0.06);
        glitch.curF = 0.03 + launch * 0.1;

        world.grid.material.opacity = THREE.MathUtils.lerp(world.grid.material.opacity, 0.18 + launch * 0.48, 0.08);
        world.grid2.material.opacity = THREE.MathUtils.lerp(world.grid2.material.opacity, 0.08 + launch * 0.24, 0.06);
        world.fogPlane.material.opacity = THREE.MathUtils.lerp(world.fogPlane.material.opacity, launch * 0.06, 0.06);

        camera.position.y += dt * (0.7 + launch * 8.2);
        camera.position.z -= dt * (0.8 + launch * 11.2);
        const breachLookY = THREE.MathUtils.lerp(-0.2, 7.5, launch);
        const breachLookZ = -launch * 15;
        camera.lookAt(0, breachLookY, breachLookZ);

        if (phaseTimeRef.current > 1.6 / speedRef.current) {
          phaseTransition(PHASE.GRID);
          setShowInit(true);
          gsap.delayedCall(0.5, () => { if (!mounted) return; setShowGranted(true); });
          if (shouldResolveRef.current) gsap.delayedCall(1.2, markComplete);
        }
        return;
      }

      if (phase === PHASE.GRID) {
        const gridT = Math.min(1, phaseTimeRef.current / (1.5 / speedRef.current));
        world.swarm.material.opacity = THREE.MathUtils.lerp(world.swarm.material.opacity, 0.02, 0.05);
        world.pyramidMesh.material.opacity = THREE.MathUtils.lerp(world.pyramidMesh.material.opacity, 0.01, 0.05);
        world.innerPyramidMesh.material.opacity = THREE.MathUtils.lerp(world.innerPyramidMesh.material.opacity, 0, 0.06);
        world.beam.material.opacity = THREE.MathUtils.lerp(world.beam.material.opacity, 0, 0.2);
        world.beamCore.material.opacity = THREE.MathUtils.lerp(world.beamCore.material.opacity, 0, 0.22);
        world.superCore.material.opacity = THREE.MathUtils.lerp(world.superCore.material.opacity, 0.02, 0.05);
        world.haloRing.material.opacity = THREE.MathUtils.lerp(world.haloRing.material.opacity, 0, 0.08);
        world.haloRing2.material.opacity = THREE.MathUtils.lerp(world.haloRing2.material.opacity, 0, 0.08);
        world.grid.material.opacity = THREE.MathUtils.lerp(world.grid.material.opacity, 0.9, 0.05);
        world.grid2.material.opacity = THREE.MathUtils.lerp(world.grid2.material.opacity, 0.38, 0.04);
        world.fogPlane.material.opacity = THREE.MathUtils.lerp(world.fogPlane.material.opacity, 0.12, 0.04);

        bloom.strength = THREE.MathUtils.lerp(bloom.strength, 1.32, 0.04);
        chromaPass.uniforms.amount.value = THREE.MathUtils.lerp(chromaPass.uniforms.amount.value, 0.002, 0.04);
        glitch.curF = THREE.MathUtils.lerp(glitch.curF, 0.012, 0.05);

        world.grid.rotation.y += dt * 0.062;
        world.grid2.rotation.y -= dt * 0.041;
        world.grid.position.y = -6 - gridT * 1.3;
        world.grid2.position.y = -6.5 - gridT * 0.9;

        camera.position.lerp(camGrid, 0.015 + gridT * 0.022);
        camera.position.z -= dt * (0.28 + gridT * 0.95);
        if (camera.position.z < 5.2) camera.position.z = 5.2;
        camera.lookAt(0, -7.5, -32);
      }
    };

    const onResize = () => {
      if (!mounted) return;
      const w = host.clientWidth, h = host.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
      bloom.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    const loop = () => {
      if (disposed) return;
      const dt = Math.min(clock.getDelta(), 0.033);
      const fpsFactor = THREE.MathUtils.clamp(1 / (dt * 60), 0.65, 1.35);
      speedRef.current = THREE.MathUtils.lerp(speedRef.current, fpsFactor, 0.08);
      updatePhase(dt, fpsFactor);

      // Dust: natural drift with independent velocity
      const dustPos = worldRef.current.dustPoints.geometry.attributes.position.array;
      for (let i = 0; i < dustCount; i++) {
        const i3 = i * 3;
        dustPos[i3] += dustVel[i3];
        dustPos[i3 + 1] += dustVel[i3 + 1] * dt * 60;
        dustPos[i3 + 2] += dustVel[i3 + 2];
        if (dustPos[i3 + 1] > 14) dustPos[i3 + 1] = -14;
        if (Math.abs(dustPos[i3]) > 22) dustVel[i3] *= -1;
        if (Math.abs(dustPos[i3 + 2]) > 19) dustVel[i3 + 2] *= -1;
      }
      worldRef.current.dustPoints.geometry.attributes.position.needsUpdate = true;

      // Fine particles: slow float
      const fineArr = fineGeo.attributes.position.array;
      const ft = performance.now() * 0.0003;
      for (let i = 0; i < fineCount; i++) {
        const i3 = i * 3;
        fineArr[i3 + 1] += Math.sin(ft + i * 0.37) * 0.004;
        fineArr[i3] += Math.cos(ft * 0.7 + i * 0.21) * 0.003;
      }
      fineGeo.attributes.position.needsUpdate = true;

      composer.render();
      frame = requestAnimationFrame(loop);
    };

    updateTerminalTexture("", PHASE.HOLOGRAM);
    loop();

    return () => {
      mounted = false;
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      composer.dispose();
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      });
      terminal.texture.dispose();
      host.removeChild(renderer.domElement);
    };
  }, [onComplete]);

  return (
    <div className={cn} style={{ "--void": VOID }}>
      <div ref={wrapRef} className="h-full w-full" />

      {/* Breach flash — subtler, teal-tinted instead of harsh white */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-500`}
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,255,255,0.18) 0%, rgba(0,0,0,0) 70%)",
          opacity: inBreach ? 1 : 0,
        }}
      />

      {/* HUD layer */}
      <div className="pointer-events-none absolute inset-0">
        {/* Corner HUD brackets */}
        <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-[#00FFFF]/50" />
        <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-[#00FFFF]/50" />
        <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-[#00FFFF]/50" />
        <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-[#00FFFF]/50" />

        {/* Top status bar */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00FFFF] shadow-[0_0_6px_#00FFFF] animate-pulse" />
          <span className="font-mono text-[10px] tracking-[0.35em] text-[#00FFFF]/55 uppercase">Signal Active</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shadow-[0_0_6px_#3B82F6] animate-pulse" style={{ animationDelay: "0.5s" }} />
        </div>

        {/* AXIOM text */}
        <div
          className={`absolute top-[18%] left-1/2 -translate-x-1/2 text-center font-mono transition-all duration-700 ${showInit ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          <div className="axiom-init tracking-[0.38em] text-[clamp(0.9rem,2vw,1.9rem)] text-[#f4f6f6]">
            AXIOM INITIALIZING
          </div>
          <div
            className={`mt-2 tracking-[0.22em] text-[clamp(0.55rem,1vw,0.8rem)] text-[#00FFFF]/50 font-mono transition-opacity duration-1000 ${showGranted ? "opacity-100" : "opacity-0"}`}
          >
            NEURAL LATTICE ONLINE — SECTOR 7G VERIFIED
          </div>
        </div>

        {/* ACCESS GRANTED */}
        <div
          className={`absolute top-[32%] left-1/2 -translate-x-1/2 text-center font-mono text-[clamp(1rem,2.6vw,2.2rem)] font-bold tracking-[0.26em] transition-all duration-500 ${showGranted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          style={{ color: "#6366F1", textShadow: "0 0 12px rgba(99,102,241,0.8), 0 0 30px rgba(99,102,241,0.4)" }}
        >
          ACCESS GRANTED
        </div>

        {/* Terminal text bottom */}
        <div className="absolute right-5 bottom-8 left-5 flex items-center justify-center gap-2">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#00FFFF]/20" />
          <span className="font-mono text-[10px] tracking-[0.18em] text-[#00ffff]/65 sm:text-xs">
            {terminalText}
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#00FFFF]/20" />
        </div>
      </div>

      {/* Fade out */}
      <div
        className={`pointer-events-none absolute inset-0 bg-black transition-opacity duration-700 ${fadingOut ? "opacity-100" : "opacity-0"}`}
      />

      <style jsx>{`
        .axiom-init {
          text-shadow:
            0 0 4px rgba(244,246,246,0.9),
            0 0 14px rgba(0,255,255,0.6),
            0 0 32px rgba(0,255,255,0.35),
            0 0 60px rgba(0,255,255,0.18);
        }
      `}</style>
    </div>
  );
}