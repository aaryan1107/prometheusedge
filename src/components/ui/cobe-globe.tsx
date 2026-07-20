"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import createGlobe from "cobe";
import { MapPin } from "lucide-react";

import type { GlobeCamera } from "@/data/destinations";
import { cn } from "@/lib/utils";

export type GlobeTravelState = "idle" | "travelling" | "arrived" | "manual";

export interface GlobeMarker {
  id: string;
  location: [number, number];
  label: string;
  sticker?: string;
  size?: number;
  destination?: boolean;
  origin?: boolean;
  interactive?: boolean;
  pinOffset?: { x: number; y: number };
}

export interface GlobeArc {
  id: string;
  from: [number, number];
  to: [number, number];
  label?: string;
}

interface GlobeProps {
  children?: ReactNode;
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
  idleSpeed?: number;
  initialCamera: GlobeCamera;
  targetCamera: GlobeCamera;
  journeyKey: string;
  travelDuration?: number;
  onTravelStateChange?: (state: GlobeTravelState) => void;
  onMarkerSelect?: (marker: GlobeMarker) => void;
  diffuse?: number;
  mapSamples?: number;
}

type Travel = {
  startedAt: number;
  duration: number;
  fromPhi: number;
  fromTheta: number;
  toPhi: number;
  toTheta: number;
};

const TAU = Math.PI * 2;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function shortestAngle(from: number, to: number) {
  return from + ((((to - from) % TAU) + Math.PI * 3) % TAU) - Math.PI;
}

function easeJourney(value: number) {
  return 1 - Math.pow(1 - value, 4);
}

function offsetLength(base: string, offset: number) {
  if (!offset) return base;
  return `calc(${base} ${offset > 0 ? "+" : "-"} ${Math.abs(offset)}px)`;
}

function toVector([lat, lon]: [number, number]) {
  const latRad = (lat * Math.PI) / 180;
  const lonRad = (lon * Math.PI) / 180;
  const cosLat = Math.cos(latRad);
  return [cosLat * Math.cos(lonRad), cosLat * Math.sin(lonRad), Math.sin(latRad)] as const;
}

function fromVector([x, y, z]: readonly number[]): [number, number] {
  const length = Math.hypot(x, y, z) || 1;
  return [
    (Math.asin(z / length) * 180) / Math.PI,
    (Math.atan2(y, x) * 180) / Math.PI,
  ];
}

function routePoint(from: [number, number], to: [number, number], progress: number) {
  const a = toVector(from);
  const b = toVector(to);
  const dot = clamp(a[0] * b[0] + a[1] * b[1] + a[2] * b[2], -1, 1);
  const angle = Math.acos(dot);
  if (angle < 0.0001) return to;
  const sinAngle = Math.sin(angle);
  const fromWeight = Math.sin((1 - progress) * angle) / sinAngle;
  const toWeight = Math.sin(progress * angle) / sinAngle;
  return fromVector([
    a[0] * fromWeight + b[0] * toWeight,
    a[1] * fromWeight + b[1] * toWeight,
    a[2] * fromWeight + b[2] * toWeight,
  ]);
}

export function Globe({
  children,
  markers = [],
  arcs = [],
  className,
  markerColor = [47 / 255, 85 / 255, 114 / 255],
  baseColor = [0.91, 0.93, 0.91],
  arcColor = [211 / 255, 157 / 255, 70 / 255],
  glowColor = [0.98, 0.98, 0.96],
  dark = 0.18,
  mapBrightness = 4.8,
  markerSize = 0.045,
  markerElevation = 0.025,
  arcWidth = 1.05,
  arcHeight = 0.38,
  idleSpeed = 0.00035,
  initialCamera,
  targetCamera,
  journeyKey,
  travelDuration = 1800,
  onTravelStateChange,
  onMarkerSelect,
  diffuse = 1.2,
  mapSamples = 18000,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const lastPointer = useRef<{ x: number; y: number; t: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const velocity = useRef({ phi: 0, theta: 0 });
  const camera = useRef({ ...initialCamera });
  const mode = useRef<GlobeTravelState>("idle");
  const travel = useRef<Travel | null>(null);
  const routeProgress = useRef(0);
  const reducedMotion = useRef(false);
  const size = useRef(0);
  const renderedSize = useRef(0);

  const markersRef = useRef(markers);
  const arcsRef = useRef(arcs);
  const styleRef = useRef({ markerColor, baseColor, arcColor, glowColor, dark, mapBrightness, markerElevation });
  const callbackRef = useRef(onTravelStateChange);

  useEffect(() => {
    markersRef.current = markers;
    arcsRef.current = arcs;
  }, [arcs, markers]);

  useEffect(() => {
    styleRef.current = { markerColor, baseColor, arcColor, glowColor, dark, mapBrightness, markerElevation };
  }, [arcColor, baseColor, dark, glowColor, mapBrightness, markerColor, markerElevation]);

  useEffect(() => {
    callbackRef.current = onTravelStateChange;
  }, [onTravelStateChange]);

  const setMode = useCallback((next: GlobeTravelState) => {
    if (mode.current === next) return;
    mode.current = next;
    callbackRef.current?.(next);
  }, []);

  const handlePointerDown = useCallback((event: ReactPointerEvent) => {
    pointerStart.current = { x: event.clientX, y: event.clientY };
    lastPointer.current = { x: event.clientX, y: event.clientY, t: performance.now() };
    travel.current = null;
    routeProgress.current = 1;
    velocity.current = { phi: 0, theta: 0 };
    setMode("manual");
    event.currentTarget.setPointerCapture(event.pointerId);
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
  }, [setMode]);

  const handlePointerMove = useCallback((event: ReactPointerEvent) => {
    if (!pointerStart.current) return;
    dragOffset.current = {
      phi: (event.clientX - pointerStart.current.x) / 250,
      theta: (event.clientY - pointerStart.current.y) / 520,
    };

    const now = performance.now();
    if (lastPointer.current) {
      const dt = Math.max(now - lastPointer.current.t, 1);
      velocity.current = {
        phi: clamp(((event.clientX - lastPointer.current.x) / dt) * 0.11, -0.035, 0.035),
        theta: clamp(((event.clientY - lastPointer.current.y) / dt) * 0.045, -0.012, 0.012),
      };
    }
    lastPointer.current = { x: event.clientX, y: event.clientY, t: now };
  }, []);

  const handlePointerUp = useCallback((event: ReactPointerEvent) => {
    if (pointerStart.current) {
      camera.current.phi += dragOffset.current.phi;
      camera.current.theta = clamp(camera.current.theta + dragOffset.current.theta, -0.58, 0.58);
    }
    pointerStart.current = null;
    lastPointer.current = null;
    dragOffset.current = { phi: 0, theta: 0 };
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      reducedMotion.current = media.matches;
    };
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    velocity.current = { phi: 0, theta: 0 };
    dragOffset.current = { phi: 0, theta: 0 };
    pointerStart.current = null;

    const toPhi = shortestAngle(camera.current.phi, targetCamera.phi);
    if (reducedMotion.current) {
      camera.current = { phi: toPhi, theta: targetCamera.theta };
      routeProgress.current = 1;
      travel.current = null;
      setMode("arrived");
      return;
    }

    routeProgress.current = 0;
    travel.current = {
      startedAt: performance.now(),
      duration: travelDuration,
      fromPhi: camera.current.phi,
      fromTheta: camera.current.theta,
      toPhi,
      toTheta: targetCamera.theta,
    };
    setMode("travelling");
  }, [journeyKey, setMode, targetCamera.phi, targetCamera.theta, travelDuration]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let globe: ReturnType<typeof createGlobe> | null = null;
    let animationId = 0;
    let resizeObserver: ResizeObserver | null = null;

    const markerPayload = () => {
      const arrival = mode.current === "arrived" ? 1 : routeProgress.current;
      return markersRef.current.map((marker) => ({
        location: marker.location,
        size: marker.destination
          ? (marker.size ?? markerSize) * (0.62 + arrival * 0.38)
          : marker.size ?? markerSize,
        id: marker.id,
      }));
    };

    const arcPayload = () =>
      arcsRef.current.map((arc) => ({
        from: arc.from,
        to: routeProgress.current >= 0.999 ? arc.to : routePoint(arc.from, arc.to, routeProgress.current),
        id: arc.id,
      }));

    const render = (now: number) => {
      if (!globe) return;

      if (travel.current) {
        const progress = clamp((now - travel.current.startedAt) / travel.current.duration, 0, 1);
        const eased = easeJourney(progress);
        camera.current.phi = travel.current.fromPhi + (travel.current.toPhi - travel.current.fromPhi) * eased;
        camera.current.theta = travel.current.fromTheta + (travel.current.toTheta - travel.current.fromTheta) * eased;
        routeProgress.current = clamp((progress - 0.08) / 0.84, 0, 1);
        if (progress >= 1) {
          travel.current = null;
          routeProgress.current = 1;
          setMode("arrived");
        }
      } else if (mode.current === "manual" && !pointerStart.current) {
        camera.current.phi += velocity.current.phi;
        camera.current.theta = clamp(camera.current.theta + velocity.current.theta, -0.58, 0.58);
        velocity.current.phi *= 0.935;
        velocity.current.theta *= 0.91;
      } else if (mode.current === "idle") {
        camera.current.phi += idleSpeed;
      }

      const currentStyle = styleRef.current;
      const nextSize = size.current;
      const renderedPhi = camera.current.phi + dragOffset.current.phi;
      const renderedTheta = clamp(camera.current.theta + dragOffset.current.theta, -0.58, 0.58);
      canvas.dataset.globePhi = renderedPhi.toFixed(4);
      canvas.dataset.globeTheta = renderedTheta.toFixed(4);
      canvas.dataset.globeState = mode.current;
      canvas.dataset.routeProgress = routeProgress.current.toFixed(3);
      globe.update({
        phi: renderedPhi,
        theta: renderedTheta,
        width: nextSize !== renderedSize.current ? nextSize : undefined,
        height: nextSize !== renderedSize.current ? nextSize : undefined,
        dark: currentStyle.dark,
        mapBrightness: currentStyle.mapBrightness,
        markerColor: currentStyle.markerColor,
        baseColor: currentStyle.baseColor,
        glowColor: currentStyle.glowColor,
        arcColor: currentStyle.arcColor,
        markerElevation: currentStyle.markerElevation,
        markers: markerPayload(),
        arcs: arcPayload(),
      });
      renderedSize.current = nextSize;
      animationId = requestAnimationFrame(render);
    };

    const init = () => {
      const width = canvas.offsetWidth;
      if (!width || globe) return;
      size.current = width;
      renderedSize.current = width;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const currentStyle = styleRef.current;

      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width,
        height: width,
        phi: camera.current.phi,
        theta: camera.current.theta,
        dark: currentStyle.dark,
        diffuse,
        mapSamples,
        mapBrightness: currentStyle.mapBrightness,
        baseColor: currentStyle.baseColor,
        markerColor: currentStyle.markerColor,
        glowColor: currentStyle.glowColor,
        markerElevation: currentStyle.markerElevation,
        markers: markerPayload(),
        arcs: arcPayload(),
        arcColor: currentStyle.arcColor,
        arcWidth,
        arcHeight,
        opacity: 0.9,
      });
      animationId = requestAnimationFrame(render);
      window.setTimeout(() => {
        canvas.style.opacity = "1";
      }, 100);
    };

    resizeObserver = new ResizeObserver(([entry]) => {
      const width = Math.round(entry.contentRect.width);
      if (!width) return;
      size.current = width;
      init();
    });
    resizeObserver.observe(canvas);
    init();

    return () => {
      resizeObserver?.disconnect();
      if (animationId) cancelAnimationFrame(animationId);
      globe?.destroy();
    };
  }, [arcHeight, arcWidth, diffuse, idleSpeed, mapSamples, markerSize, setMode]);

  return (
    <div className={cn("tw:relative tw:aspect-square tw:select-none", className)}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="tw:h-full tw:w-full tw:rounded-full"
        style={{
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1)",
          touchAction: "none",
          contain: "layout paint size",
        }}
      />
      {markers.map((marker) => (
        marker.interactive && onMarkerSelect && !marker.destination && !marker.origin ? (
          <button
            key={`pin-${marker.id}`}
            type="button"
            aria-label={`Explore ${marker.label}`}
            title={marker.label}
            onClick={() => onMarkerSelect(marker)}
            className="tw:group tw:absolute tw:z-30 tw:flex tw:h-9 tw:w-9 tw:items-center tw:justify-center tw:rounded-full tw:bg-parchment tw:shadow-[0_12px_26px_-12px_rgba(36,51,58,0.68)] tw:ring-1 tw:ring-espresso/15 tw:transition-[background,box-shadow] tw:duration-300 tw:hover:bg-clay-soft tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-gold"
            style={{
              positionAnchor: `--cobe-${marker.id}`,
              bottom: "anchor(top)",
              left: "anchor(center)",
              translate: `${offsetLength("-50%", marker.pinOffset?.x ?? 0)} ${offsetLength("7px", marker.pinOffset?.y ?? 0)}`,
              scale: `var(--cobe-visible-${marker.id}, 0)`,
              opacity: `var(--cobe-visible-${marker.id}, 0)`,
              filter: `blur(calc((1 - var(--cobe-visible-${marker.id}, 0)) * 6px))`,
              background: marker.destination ? "#c46f52" : marker.origin ? "#24333a" : "#fbfaf6",
              color: marker.destination || marker.origin ? "#fbfaf6" : "#c46f52",
              transition: "opacity 0.35s, filter 0.35s, scale 0.35s, background 0.25s",
            } as CSSProperties}
          >
            <MapPin className="tw:h-5 tw:w-5" strokeWidth={1.8} aria-hidden="true" />
            <span className="tw:absolute tw:left-1/2 tw:top-[7px] tw:-translate-x-1/2 tw:text-[8px] tw:leading-none" aria-hidden="true">
              {marker.sticker}
            </span>
            <span className="tw:pointer-events-none tw:absolute tw:bottom-full tw:left-1/2 tw:mb-2 tw:-translate-x-1/2 tw:whitespace-nowrap tw:rounded-md tw:bg-espresso tw:px-2 tw:py-1 tw:font-sans tw:text-[9px] tw:font-semibold tw:text-parchment tw:opacity-0 tw:shadow-lg tw:transition-opacity tw:group-hover:opacity-100 tw:group-focus-visible:opacity-100">
              {marker.label}
            </span>
          </button>
        ) : null
      ))}
      {markers.filter((marker) => marker.destination || marker.origin).map((marker) => (
        <button
          key={`label-${marker.id}`}
          type="button"
          disabled={!marker.interactive || !onMarkerSelect}
          aria-label={`Explore ${marker.label}`}
          onClick={() => onMarkerSelect?.(marker)}
          style={{
            position: "absolute",
            positionAnchor: `--cobe-${marker.id}`,
            bottom: "anchor(top)",
            left: "anchor(center)",
            translate: "-50% 0",
            marginBottom: 8,
            padding: "3px 8px",
            background: marker.destination ? "#c46f52" : "#24333a",
            color: "#fbfaf6",
            fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif",
            fontSize: "0.62rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            pointerEvents: marker.interactive && onMarkerSelect ? "auto" : "none",
            opacity: `var(--cobe-visible-${marker.id}, 0)`,
            filter: `blur(calc((1 - var(--cobe-visible-${marker.id}, 0)) * 8px))`,
            transition: "opacity 0.5s, filter 0.5s",
            borderRadius: 999,
            boxShadow: "0 12px 30px -18px rgba(36,51,58,0.48)",
            cursor: marker.interactive && onMarkerSelect ? "pointer" : "default",
          } as CSSProperties}
          className="tw:z-30 tw:outline-none tw:transition-[filter,box-shadow] tw:focus-visible:ring-2 tw:focus-visible:ring-gold"
        >
          {marker.sticker ? <span style={{ marginRight: 4 }}>{marker.sticker}</span> : null}
          {marker.label}
        </button>
      ))}
      {children}
    </div>
  );
}
