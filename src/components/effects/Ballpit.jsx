"use client";

import { useEffect, useRef } from "react";
import {
  ACESFilmicToneMapping,
  AmbientLight,
  Color,
  InstancedMesh,
  MathUtils,
  MeshPhysicalMaterial,
  Object3D,
  PerspectiveCamera,
  Plane,
  PointLight,
  Raycaster,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  Timer,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";

const { randFloat, randFloatSpread } = MathUtils;

class ThreeApp {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.canvas.style.display = "block";
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(50, 1, 0.1, 100);
    this.camera.position.set(0, 0, 20);
    this.camera.lookAt(0, 0, 0);
    this.cameraFov = this.camera.fov;
    this.cameraMaxAspect = 1.5;

    this.renderer = new WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.setClearColor(0x000000, 0);

    this.size = { width: 0, height: 0, wWidth: 0, wHeight: 0 };
    this.timer = new Timer();
    this.raf = 0;
    this.running = false;
    this.onBeforeRender = () => {};
    this.onAfterResize = () => {};

    this.boundResize = () => {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => this.resize(), 80);
    };

    this.resizeObserver = new ResizeObserver(this.boundResize);
    if (canvas.parentNode) this.resizeObserver.observe(canvas.parentNode);

    this.intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) this.start();
        else this.stop();
      },
      { threshold: 0 },
    );
    this.intersectionObserver.observe(canvas);

    document.addEventListener("visibilitychange", this.onVisibility);

    this.resize();
    // Kick-start if already visible
    requestAnimationFrame(() => this.start());
  }

  onVisibility = () => {
    if (document.hidden) this.stop();
    else this.start();
  };

  resize() {
    const parent = this.canvas.parentNode;
    if (!parent) return;
    const width = parent.clientWidth || 1;
    const height = parent.clientHeight || 1;
    this.size.width = width;
    this.size.height = height;

    this.camera.aspect = width / height;
    if (this.camera.aspect > this.cameraMaxAspect) {
      const t =
        Math.tan(MathUtils.degToRad(this.cameraFov / 2)) /
        (this.camera.aspect / this.cameraMaxAspect);
      this.camera.fov = 2 * MathUtils.radToDeg(Math.atan(t));
    } else {
      this.camera.fov = this.cameraFov;
    }
    this.camera.updateProjectionMatrix();

    const fovRad = (this.camera.fov * Math.PI) / 180;
    this.size.wHeight =
      2 * Math.tan(fovRad / 2) * this.camera.position.length();
    this.size.wWidth = this.size.wHeight * this.camera.aspect;

    this.renderer.setSize(width, height, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.onAfterResize(this.size);
  }

  start() {
    if (this.running || document.hidden) return;
    this.running = true;
    this.timer.reset();
    const tick = () => {
      this.raf = requestAnimationFrame(tick);
      this.timer.update();
      const delta = this.timer.getDelta();
      this.onBeforeRender({ delta, elapsed: 0 });
      this.renderer.render(this.scene, this.camera);
    };
    tick();
  }

  stop() {
    if (!this.running) return;
    cancelAnimationFrame(this.raf);
    this.running = false;
  }

  clear() {
    this.scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.geometry?.dispose?.();
        if (Array.isArray(obj.material))
          obj.material.forEach((m) => m.dispose?.());
        else obj.material?.dispose?.();
      }
    });
    this.scene.clear();
  }

  dispose() {
    this.stop();
    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();
    document.removeEventListener("visibilitychange", this.onVisibility);
    clearTimeout(this.resizeTimer);
    this.clear();
    this.renderer.dispose();
  }
}

class Physics {
  constructor(config) {
    this.config = config;
    this.positionData = new Float32Array(3 * config.count).fill(0);
    this.velocityData = new Float32Array(3 * config.count).fill(0);
    this.sizeData = new Float32Array(config.count).fill(1);
    this.center = new Vector3();
    this.#initPositions();
    this.setSizes();
  }

  #initPositions() {
    const { config, positionData } = this;
    this.center.toArray(positionData, 0);
    for (let i = 1; i < config.count; i++) {
      const s = 3 * i;
      positionData[s] = randFloatSpread(2 * config.maxX);
      positionData[s + 1] = randFloatSpread(2 * config.maxY);
      positionData[s + 2] = randFloatSpread(2 * config.maxZ);
    }
  }

  setSizes() {
    const { config, sizeData } = this;
    sizeData[0] = config.size0;
    for (let i = 1; i < config.count; i++) {
      sizeData[i] = randFloat(config.minSize, config.maxSize);
    }
  }

  update({ delta }) {
    const { config, center, positionData, sizeData, velocityData } = this;
    const F = new Vector3();
    const I = new Vector3();
    const O = new Vector3();
    const B = new Vector3();
    const N = new Vector3();
    const _ = new Vector3();
    const j = new Vector3();
    const H = new Vector3();
    const T = new Vector3();
    const V = new Vector3();

    let start = 0;
    if (config.controlSphere0) {
      start = 1;
      F.fromArray(positionData, 0);
      F.lerp(center, 0.1).toArray(positionData, 0);
      V.set(0, 0, 0).toArray(velocityData, 0);
    }

    for (let idx = start; idx < config.count; idx++) {
      const base = 3 * idx;
      I.fromArray(positionData, base);
      B.fromArray(velocityData, base);
      B.y -= delta * config.gravity * sizeData[idx];
      B.multiplyScalar(config.friction);
      B.clampLength(0, config.maxVelocity);
      I.add(B);
      I.toArray(positionData, base);
      B.toArray(velocityData, base);
    }

    for (let idx = start; idx < config.count; idx++) {
      const base = 3 * idx;
      I.fromArray(positionData, base);
      B.fromArray(velocityData, base);
      const radius = sizeData[idx];

      for (let jdx = idx + 1; jdx < config.count; jdx++) {
        const otherBase = 3 * jdx;
        O.fromArray(positionData, otherBase);
        N.fromArray(velocityData, otherBase);
        const otherRadius = sizeData[jdx];
        _.copy(O).sub(I);
        const dist = _.length();
        const sumRadius = radius + otherRadius;
        if (dist < sumRadius && dist > 0) {
          const overlap = sumRadius - dist;
          j.copy(_).normalize().multiplyScalar(0.5 * overlap);
          H.copy(j).multiplyScalar(Math.max(B.length(), 1));
          T.copy(j).multiplyScalar(Math.max(N.length(), 1));
          I.sub(j);
          B.sub(H);
          I.toArray(positionData, base);
          B.toArray(velocityData, base);
          O.add(j);
          N.add(T);
          O.toArray(positionData, otherBase);
          N.toArray(velocityData, otherBase);
        }
      }

      if (config.controlSphere0) {
        _.copy(F).sub(I);
        const dist = _.length();
        const sumRadius0 = radius + sizeData[0];
        if (dist < sumRadius0 && dist > 0) {
          const diff = sumRadius0 - dist;
          j.copy(_.normalize()).multiplyScalar(diff);
          H.copy(j).multiplyScalar(Math.max(B.length(), 2));
          I.sub(j);
          B.sub(H);
        }
      }

      if (Math.abs(I.x) + radius > config.maxX) {
        I.x = Math.sign(I.x) * (config.maxX - radius);
        B.x = -B.x * config.wallBounce;
      }
      if (config.gravity === 0) {
        if (Math.abs(I.y) + radius > config.maxY) {
          I.y = Math.sign(I.y) * (config.maxY - radius);
          B.y = -B.y * config.wallBounce;
        }
      } else if (I.y - radius < -config.maxY) {
        I.y = -config.maxY + radius;
        B.y = -B.y * config.wallBounce;
      }
      const maxBoundary = Math.max(config.maxZ, config.maxSize);
      if (Math.abs(I.z) + radius > maxBoundary) {
        I.z = Math.sign(I.z) * (config.maxZ - radius);
        B.z = -B.z * config.wallBounce;
      }
      I.toArray(positionData, base);
      B.toArray(velocityData, base);
    }
  }
}

const DEFAULTS = {
  count: 100,
  colors: [0xffffff, 0x1e3a6e, 0xe4483c, 0x5fae3e],
  ambientColor: 0xffffff,
  ambientIntensity: 1.2,
  lightIntensity: 80,
  materialParams: {
    metalness: 0.2,
    roughness: 0.35,
    clearcoat: 0.8,
    clearcoatRoughness: 0.2,
  },
  minSize: 0.4,
  maxSize: 0.9,
  size0: 1,
  gravity: 0.08,
  friction: 0.9975,
  wallBounce: 0.95,
  maxVelocity: 0.15,
  maxX: 5,
  maxY: 5,
  maxZ: 2,
  controlSphere0: false,
  followCursor: false,
};

const tmpObj = new Object3D();

class Spheres extends InstancedMesh {
  constructor(config = {}) {
    const cfg = { ...DEFAULTS, ...config };
    const geo = new SphereGeometry(1, 32, 32);
    const mat = new MeshPhysicalMaterial({ ...cfg.materialParams });
    super(geo, mat, cfg.count);
    this.config = cfg;
    this.physics = new Physics(cfg);
    this.frustumCulled = false;

    this.ambientLight = new AmbientLight(
      cfg.ambientColor,
      cfg.ambientIntensity,
    );
    this.add(this.ambientLight);
    this.light = new PointLight(cfg.colors[0] ?? 0xffffff, cfg.lightIntensity);
    this.add(this.light);

    this.setColors(cfg.colors);
    this.update({ delta: 0 });
  }

  setColors(colors) {
    if (!Array.isArray(colors) || colors.length < 1) return;
    const palette = colors.map((c) => new Color(c));
    for (let i = 0; i < this.count; i++) {
      const t = i / Math.max(this.count - 1, 1);
      const scaled = t * (palette.length - 1);
      const idx = Math.floor(scaled);
      const alpha = scaled - idx;
      const out = palette[idx].clone();
      if (idx < palette.length - 1) {
        out.lerp(palette[idx + 1], alpha);
      }
      this.setColorAt(i, out);
      if (i === 0) this.light.color.copy(out);
    }
    if (this.instanceColor) this.instanceColor.needsUpdate = true;
  }

  update(state) {
    this.physics.update(state);
    for (let i = 0; i < this.count; i++) {
      tmpObj.position.fromArray(this.physics.positionData, 3 * i);
      if (i === 0 && this.config.followCursor === false) {
        tmpObj.scale.setScalar(0);
      } else {
        tmpObj.scale.setScalar(this.physics.sizeData[i]);
      }
      tmpObj.updateMatrix();
      this.setMatrixAt(i, tmpObj.matrix);
      if (i === 0) this.light.position.copy(tmpObj.position);
    }
    this.instanceMatrix.needsUpdate = true;
  }
}

function createBallpit(canvas, config = {}) {
  const app = new ThreeApp({ canvas });
  let spheres = new Spheres(config);
  app.scene.add(spheres);

  const syncBounds = (size) => {
    spheres.config.maxX = size.wWidth / 2;
    spheres.config.maxY = size.wHeight / 2;
  };
  syncBounds(app.size);
  app.onAfterResize = syncBounds;

  app.onBeforeRender = (state) => spheres.update(state);

  // Optional cursor follow
  const raycaster = new Raycaster();
  const plane = new Plane(new Vector3(0, 0, 1), 0);
  const hit = new Vector3();
  const pointer = new Vector2();

  const onPointerMove = (e) => {
    if (config.followCursor === false) return;
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, app.camera);
    app.camera.getWorldDirection(plane.normal);
    if (raycaster.ray.intersectPlane(plane, hit)) {
      spheres.physics.center.copy(hit);
      spheres.config.controlSphere0 = true;
    }
  };
  const onPointerLeave = () => {
    spheres.config.controlSphere0 = false;
  };
  if (config.followCursor !== false) {
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
  }

  return {
    dispose() {
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      app.dispose();
    },
  };
}

export default function Ballpit({
  className = "",
  followCursor = false,
  ...props
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    let instance = null;
    try {
      instance = createBallpit(canvas, { followCursor, ...props });
    } catch (err) {
      console.error("Ballpit init failed:", err);
    }

    return () => {
      instance?.dispose();
      canvas.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
