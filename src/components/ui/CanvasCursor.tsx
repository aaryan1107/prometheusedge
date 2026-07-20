import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

type Trail = {
  nodes: Point[];
  spring: number;
  friction: number;
  color: string;
};

const CURSOR_PALETTE = [
  "rgba(196, 111, 82, 0.24)",
  "rgba(211, 157, 70, 0.2)",
  "rgba(82, 106, 112, 0.2)",
  "rgba(47, 85, 114, 0.17)",
];

const TRAIL_COUNT = 10;
const NODE_COUNT = 32;
const IDLE_FADE_MS = 720;
const IDLE_STOP_MS = 1100;

export function CanvasCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const pointerQuery = window.matchMedia("(pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!pointerQuery.matches || motionQuery.matches) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let trails: Trail[] = [];
    let initialized = false;
    let running = false;
    let frame = 0;
    let lastMove = 0;
    let cssWidth = window.innerWidth;
    let cssHeight = window.innerHeight;

    const buildTrails = () => {
      trails = Array.from({ length: TRAIL_COUNT }, (_, trailIndex) => ({
        spring: 0.34 + (trailIndex / TRAIL_COUNT) * 0.035,
        friction: 0.48 + (trailIndex % 3) * 0.008,
        color: CURSOR_PALETTE[trailIndex % CURSOR_PALETTE.length],
        nodes: Array.from({ length: NODE_COUNT }, () => ({
          x: pointer.x,
          y: pointer.y,
          vx: 0,
          vy: 0,
        })),
      }));
      initialized = true;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssWidth = window.innerWidth;
      cssHeight = window.innerHeight;
      canvas.width = Math.max(1, Math.round(cssWidth * dpr));
      canvas.height = Math.max(1, Math.round(cssHeight * dpr));
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const updateTrail = (trail: Trail) => {
      let spring = trail.spring;
      let previous = trail.nodes[0];
      previous.vx += (pointer.x - previous.x) * spring;
      previous.vy += (pointer.y - previous.y) * spring;

      trail.nodes.forEach((node, index) => {
        if (index > 0) {
          previous = trail.nodes[index - 1];
          node.vx += (previous.x - node.x) * spring;
          node.vy += (previous.y - node.y) * spring;
          node.vx += previous.vx * 0.24;
          node.vy += previous.vy * 0.24;
        }
        node.vx *= trail.friction;
        node.vy *= trail.friction;
        node.x += node.vx;
        node.y += node.vy;
        spring *= 0.975;
      });
    };

    const drawTrail = (trail: Trail, index: number) => {
      const nodes = trail.nodes;
      if (nodes.length < 3) return;

      context.beginPath();
      context.moveTo(nodes[0].x, nodes[0].y);
      for (let nodeIndex = 1; nodeIndex < nodes.length - 2; nodeIndex++) {
        const node = nodes[nodeIndex];
        const next = nodes[nodeIndex + 1];
        context.quadraticCurveTo(node.x, node.y, (node.x + next.x) * 0.5, (node.y + next.y) * 0.5);
      }
      const penultimate = nodes[nodes.length - 2];
      const last = nodes[nodes.length - 1];
      context.quadraticCurveTo(penultimate.x, penultimate.y, last.x, last.y);
      context.strokeStyle = trail.color;
      context.lineWidth = 0.65 + index * 0.055;
      context.stroke();
      context.closePath();
    };

    const render = (time: number) => {
      context.clearRect(0, 0, cssWidth, cssHeight);
      trails.forEach((trail, index) => {
        updateTrail(trail);
        drawTrail(trail, index);
      });

      const idleFor = time - lastMove;
      if (idleFor > IDLE_FADE_MS) canvas.style.opacity = "0";
      if (idleFor > IDLE_STOP_MS) {
        running = false;
        frame = 0;
        context.clearRect(0, 0, cssWidth, cssHeight);
        return;
      }
      frame = window.requestAnimationFrame(render);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = window.requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      lastMove = performance.now();
      if (!initialized) buildTrails();
      canvas.style.opacity = "0.86";
      start();
    };

    const onPointerLeave = () => {
      lastMove = performance.now() - IDLE_FADE_MS;
      canvas.style.opacity = "0";
    };

    const onVisibilityChange = () => {
      if (document.hidden) onPointerLeave();
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      running = false;
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-canvas-cursor="true"
      aria-hidden="true"
      className="tw:pointer-events-none tw:fixed tw:inset-0 tw:z-[55] tw:opacity-0 tw:transition-opacity tw:duration-300"
      style={{ contain: "strict" }}
    />
  );
}
