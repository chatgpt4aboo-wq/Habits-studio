import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * The cover's ground: flowing colour, drawn rather than filmed.
 *
 * Two layers of noise are used to bend a third, which is what gives the
 * liquid, folded look instead of the clouds a single layer produces. It is
 * drawn in the house palette, the void underneath, the signal through the
 * folds and a little bone at the peaks, so it reads as this brand's colour
 * rather than as a screensaver.
 *
 * It is written to be cheap. Noise is fill-rate bound, so the buffer is drawn
 * at a fraction of the screen and scaled up, which nobody can see through
 * something this soft, and the pixel ratio is capped. It stops entirely when
 * it scrolls off, when the tab is hidden, and when the machine has asked for
 * less motion, in which case it paints one frame and stops.
 *
 * Where WebGL is unavailable the frame keeps a still gradient of the same
 * colours, so the cover is never empty.
 */
const VERTEX = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const FRAGMENT = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;

vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float noise(vec2 p) {
  const float K1 = 0.366025404;
  const float K2 = 0.211324865;
  vec2 i = floor(p + (p.x + p.y) * K1);
  vec2 a = p - i + (i.x + i.y) * K2;
  float m = step(a.y, a.x);
  vec2 o = vec2(m, 1.0 - m);
  vec2 b = a - o + K2;
  vec2 c = a - 1.0 + 2.0 * K2;
  vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
  vec3 n = h * h * h * h * vec3(dot(a, hash(i)), dot(b, hash(i + o)), dot(c, hash(i + 1.0)));
  return dot(n, vec3(70.0));
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    sum += amp * noise(p);
    p *= 2.02;
    amp *= 0.5;
  }
  return sum;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  float t = u_time * 0.04;

  // Noise bending noise: the folds come from here, not from the octaves.
  vec2 q = vec2(fbm(uv * 1.5 + vec2(0.0, t)), fbm(uv * 1.5 + vec2(3.2, -t)));
  vec2 r = vec2(
    fbm(uv * 1.5 + 2.3 * q + vec2(1.7, 9.2) + 0.14 * t),
    fbm(uv * 1.5 + 2.3 * q + vec2(8.3, 2.8) - 0.11 * t)
  );
  float f = fbm(uv * 1.5 + 2.0 * r);

  vec3 ground = vec3(0.047, 0.059, 0.094);
  vec3 deep = vec3(0.090, 0.145, 0.330);
  vec3 signal = vec3(0.365, 0.588, 0.973);
  // The lilac the chrome wordmark was finished in. It is what stops this
  // reading as one blue, and it is already part of the identity.
  vec3 iris = vec3(0.640, 0.560, 0.880);
  vec3 bone = vec3(0.910, 0.902, 0.890);

  float fold = smoothstep(0.18, 0.95, length(r));
  vec3 col = mix(ground, deep, smoothstep(-0.50, 0.60, f));
  col = mix(col, signal, fold * 0.80);
  col = mix(col, iris, smoothstep(0.30, 1.00, abs(q.x - q.y)) * 0.40);
  col = mix(col, bone, smoothstep(0.70, 1.10, f) * 0.22);

  // Held down at the edges, so the writing over it always has its ground.
  col *= 1.0 - 0.30 * smoothstep(0.25, 1.35, length(uv * vec2(0.75, 1.0)));

  // Grain, which also breaks the banding a smooth ramp leaves on dark screens.
  float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  col += (grain - 0.5) * 0.022;

  gl_FragColor = vec4(col, 1.0);
}
`;

/** Noise is fill-rate bound, so it is drawn small and scaled up. */
const SCALE = 0.55;
const MAX_DPR = 1.5;

export function ShaderField({ className }: { className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [unsupported, setUnsupported] = useState(false);

  useEffect(() => {
    const node = canvas.current;
    if (!node) return;

    const gl = node.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) {
      setUnsupported(true);
      return;
    }

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
    };

    const vertex = compile(gl.VERTEX_SHADER, VERTEX);
    const fragment = compile(gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vertex || !fragment) {
      setUnsupported(true);
      return;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setUnsupported(true);
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR) * SCALE;
      const w = Math.max(1, Math.round(node.clientWidth * dpr));
      const h = Math.max(1, Math.round(node.clientHeight * dpr));
      if (node.width !== w || node.height !== h) {
        node.width = w;
        node.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, node.width, node.height);
    };

    const paint = (seconds: number) => {
      size();
      gl.uniform1f(uTime, seconds);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const still = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (still) {
      paint(12);
      return;
    }

    let frame = 0;
    let onScreen = true;
    let started = performance.now();
    let elapsed = 0;

    const loop = (now: number) => {
      elapsed += (now - started) / 1000;
      started = now;
      paint(elapsed);
      frame = requestAnimationFrame(loop);
    };

    const run = () => {
      if (frame || !onScreen || document.hidden) return;
      started = performance.now();
      frame = requestAnimationFrame(loop);
    };

    const halt = () => {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const watch = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) run();
      else halt();
    });
    watch.observe(node);

    const visibility = () => (document.hidden ? halt() : run());
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("resize", size);
    run();

    return () => {
      halt();
      watch.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("resize", size);
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
    };
  }, []);

  if (unsupported) {
    return (
      <div
        aria-hidden
        className={cn(
          "bg-[radial-gradient(120%_90%_at_30%_20%,hsl(224_40%_18%),hsl(224_32%_7%)_70%)]",
          className,
        )}
      />
    );
  }

  return <canvas ref={canvas} aria-hidden className={cn("block h-full w-full", className)} />;
}
