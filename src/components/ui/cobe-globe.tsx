"use client";

import { useCallback, useEffect, useRef, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import createGlobe from "cobe";

import { cn } from "@/lib/utils";

export interface GlobeMarker {
  id: string;
  location: [number, number];
  label: string;
  sticker?: string;
  size?: number;
}

export interface GlobeArc {
  id: string;
  from: [number, number];
  to: [number, number];
  label?: string;
}

interface GlobeProps {
  markers?: GlobeMarker[];
  arcs?: GlobeArc[];
  className?: string;
  markerColor?: [number, number, number];
  baseColor?: [number, number, number];
  arcColor?: [number, number, number];
  glowColor?: [number, number, number];
  dark?: number;
  mapBrightness?: number;
  markerSize?: number;
  markerElevation?: number;
  arcWidth?: number;
  arcHeight?: number;
  speed?: number;
  theta?: number;
  focusLocation?: [number, number];
  diffuse?: number;
  mapSamples?: number;
}

export function Globe({
  markers = [],
  arcs = [],
  className,
  markerColor = [181 / 255, 80 / 255, 42 / 255],
  baseColor = [0.95, 0.89, 0.78],
  arcColor = [184 / 255, 134 / 255, 63 / 255],
  glowColor = [0.98, 0.94, 0.86],
  dark = 0.92,
  mapBrightness = 1.45,
  markerSize = 0.045,
  markerElevation = 0.03,
  arcWidth = 1.1,
  arcHeight = 0.42,
  speed = 0.004,
  theta = 0.18,
  focusLocation,
  diffuse = 1.15,
  mapSamples = 18000,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const lastPointer = useRef<{ x: number; y: number; t: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const velocity = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isPausedRef = useRef(false);

  const focusPhiRef = useRef(0);
  const focusThetaRef = useRef(theta);

  const handlePointerDown = useCallback((event: ReactPointerEvent) => {
    pointerInteracting.current = { x: event.clientX, y: event.clientY };
    lastPointer.current = { x: event.clientX, y: event.clientY, t: Date.now() };
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    isPausedRef.current = true;
  }, []);

  const handlePointerMove = useCallback((event: PointerEvent) => {
    if (!pointerInteracting.current) return;
    const deltaX = event.clientX - pointerInteracting.current.x;
    const deltaY = event.clientY - pointerInteracting.current.y;
    dragOffset.current = { phi: deltaX / 300, theta: deltaY / 1000 };

    const now = Date.now();
    if (lastPointer.current) {
      const dt = Math.max(now - lastPointer.current.t, 1);
      const maxVelocity = 0.12;
      velocity.current = {
        phi: Math.max(-maxVelocity, Math.min(maxVelocity, ((event.clientX - lastPointer.current.x) / dt) * 0.24)),
        theta: Math.max(-maxVelocity, Math.min(maxVelocity, ((event.clientY - lastPointer.current.y) / dt) * 0.06)),
      };
    }
    lastPointer.current = { x: event.clientX, y: event.clientY, t: now };
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
      lastPointer.current = null;
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    isPausedRef.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  useEffect(() => {
    if (!focusLocation) return;
    const [lat, lon] = focusLocation;
    focusPhiRef.current = (-lon * Math.PI) / 180;
    focusThetaRef.current = Math.max(-0.34, Math.min(0.36, theta + (lat * Math.PI) / 720));
  }, [focusLocation, theta]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let globe: ReturnType<typeof createGlobe> | null = null;
    let animationId = 0;
    let phi = 0;
    let resizeObserver: ResizeObserver | null = null;

    const markerPayload = () =>
      markers.map((marker) => ({
        location: marker.location,
        size: marker.size ?? markerSize,
        id: marker.id,
      }));

    const arcPayload = () =>
      arcs.map((arc) => ({
        from: arc.from,
        to: arc.to,
        id: arc.id,
      }));

    const init = () => {
      const width = canvas.offsetWidth;
      if (width === 0 || globe) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: width * dpr,
        height: width * dpr,
        phi: 0,
        theta,
        dark,
        diffuse,
        mapSamples,
        mapBrightness,
        baseColor,
        markerColor,
        glowColor,
        markerElevation,
        markers: markerPayload(),
        arcs: arcPayload(),
        arcColor,
        arcWidth,
        arcHeight,
        opacity: 0.88,
      });

      const animate = () => {
        if (!globe) return;
        if (!isPausedRef.current) {
          phi += speed;
          phiOffsetRef.current += (focusPhiRef.current - phiOffsetRef.current) * 0.025;
          thetaOffsetRef.current += (focusThetaRef.current - theta - thetaOffsetRef.current) * 0.025;
          if (Math.abs(velocity.current.phi) > 0.0001 || Math.abs(velocity.current.theta) > 0.0001) {
            phiOffsetRef.current += velocity.current.phi;
            thetaOffsetRef.current += velocity.current.theta;
            velocity.current.phi *= 0.94;
            velocity.current.theta *= 0.94;
          }
          const thetaMin = -0.34;
          const thetaMax = 0.36;
          if (thetaOffsetRef.current < thetaMin) {
            thetaOffsetRef.current += (thetaMin - thetaOffsetRef.current) * 0.1;
          } else if (thetaOffsetRef.current > thetaMax) {
            thetaOffsetRef.current += (thetaMax - thetaOffsetRef.current) * 0.1;
          }
        }

        globe.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: theta + thetaOffsetRef.current + dragOffset.current.theta,
          dark,
          mapBrightness,
          markerColor,
          baseColor,
          arcColor,
          markerElevation,
          markers: markerPayload(),
          arcs: arcPayload(),
        });
        animationId = requestAnimationFrame(animate);
      };

      animate();
      window.setTimeout(() => {
        if (canvas) canvas.style.opacity = "1";
      }, 120);
    };

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      resizeObserver = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width && entries[0].contentRect.width > 0) {
          resizeObserver?.disconnect();
          resizeObserver = null;
          init();
        }
      });
      resizeObserver.observe(canvas);
    }

    return () => {
      resizeObserver?.disconnect();
      if (animationId) cancelAnimationFrame(animationId);
      globe?.destroy();
    };
  }, [
    markers,
    arcs,
    markerColor,
    baseColor,
    arcColor,
    glowColor,
    dark,
    mapBrightness,
    markerSize,
    markerElevation,
    arcWidth,
    arcHeight,
    speed,
    theta,
    diffuse,
    mapSamples,
  ]);

  return (
    <div className={cn("tw:relative tw:aspect-square tw:select-none", className)}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        className="tw:h-full tw:w-full tw:rounded-full"
        style={{
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1.2s ease",
          touchAction: "none",
          contain: "layout paint size",
        }}
      />
      {markers.map((marker) => (
        <div
          key={marker.id}
          style={{
            position: "absolute",
            positionAnchor: `--cobe-${marker.id}`,
            bottom: "anchor(top)",
            left: "anchor(center)",
            translate: "-50% 0",
            marginBottom: 8,
            padding: "3px 7px",
            background: "#23180f",
            color: "#fbf6ee",
            fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif",
            fontSize: "0.62rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            opacity: `var(--cobe-visible-${marker.id}, 0)`,
            filter: `blur(calc((1 - var(--cobe-visible-${marker.id}, 0)) * 8px))`,
            transition: "opacity 0.8s, filter 0.8s",
            borderRadius: 999,
            boxShadow: "0 12px 32px -18px rgba(0,0,0,0.55)",
          } as CSSProperties}
        >
          {marker.sticker ? (
            <span
              style={{
                display: "inline-block",
                marginRight: 4,
                filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.24))",
              }}
            >
              {marker.sticker}
            </span>
          ) : null}
          {marker.label}
        </div>
      ))}
    </div>
  );
}
