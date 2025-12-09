import { create } from 'zustand';
import {
  buildPrediction,
  clamp,
  computeTheory,
  generateTarget,
  isPointInsideTarget,
  calculateVelocityAtTime,
} from '../lib/physics';
import type { Point, Target, TheoryResult } from '../lib/physics';

const INITIAL_MESSAGE =
  'Masukkan sudut, kecepatan, dan gravitasi lalu tekan "Luncurkan".';

type SimulationState = {
  angle: number;
  speed: number;
  gravity: number;
  level: number;
  success: number;
  target: Target;
  launched: boolean;
  velocity: Point;
  time: number;
  theory?: TheoryResult | null;
  prediction: Point[];
  trail: Point[];
  projectile: Point;
  resultText: string;
  setAngle: (value: number) => void;
  setSpeed: (value: number) => void;
  setGravity: (value: number) => void;
  launch: () => void;
  reset: () => void;
  stepSimulation: (delta: number) => void;
};

const initialTarget = generateTarget();

export const useSimulationStore = create<SimulationState>((set, get) => ({
  angle: 45,
  speed: 30,
  gravity: 9.8,
  level: 1,
  success: 0,
  target: initialTarget,
  launched: false,
  velocity: { x: 0, y: 0 },
  time: 0,
  theory: null,
  prediction: [],
  trail: [],
  projectile: { x: 0, y: 0 },
  resultText: INITIAL_MESSAGE,

  setAngle: (value) => set({ angle: clamp(value, 5, 85) }),
  setSpeed: (value) => set({ speed: clamp(value, 5, 90) }),
  setGravity: (value) => set({ gravity: clamp(value, 1, 25) }),

  launch: () => {
    const { angle, speed, gravity } = get();
    const theory = computeTheory({ angle, speed, gravity });

    if (!theory) {
      set({
        launched: false,
        resultText:
          'Parameter tidak valid. Pastikan nilai positif dan sudut realistis.',
      });
      return;
    }

    const prediction = buildPrediction(theory, gravity);

    set({
      theory,
      prediction,
      launched: true,
      time: 0,
      velocity: { x: theory.vx, y: theory.vy },
      trail: [],
      projectile: { x: 0, y: 0 },
      resultText: 'Simulasi berjalan... amati lintasannya!',
    });
  },

  reset: () =>
    set({
      launched: false,
      time: 0,
      theory: null,
      prediction: [],
      trail: [],
      projectile: { x: 0, y: 0 },
      resultText: INITIAL_MESSAGE,
    }),

  /**
   * Kinematika: Simulasi langkah demi langkah menggunakan persamaan gerak
   * Menggunakan persamaan SUVAT untuk menghitung posisi dan kecepatan
   * 
   * Persamaan posisi:
   * x(t) = v₀ₓt (gerak lurus beraturan)
   * y(t) = v₀ᵧt - ½gt² (gerak lurus berubah beraturan)
   * 
   * Persamaan kecepatan:
   * vₓ(t) = v₀ₓ (konstan)
   * vᵧ(t) = v₀ᵧ - gt
   */
  stepSimulation: (delta) =>
    set((state) => {
      if (!state.launched || !state.theory) return state;

      // Batasi delta time untuk stabilitas numerik
      const dt = Math.min(delta, 0.04);
      const nextTime = state.time + dt;

      // Kinematika: Hitung posisi menggunakan persamaan gerak parabola
      // x(t) = v₀ₓt
      const x = state.theory.vx * nextTime;
      
      // y(t) = v₀ᵧt - ½gt²
      const rawY = state.theory.vy * nextTime - 0.5 * state.gravity * nextTime * nextTime;
      const clampedY = Math.max(rawY, 0);
      
      const point = { x, y: clampedY };
      
      // Simpan trail hanya jika masih di udara
      const trail =
        rawY >= 0 ? [...state.trail, { x, y: rawY }] : state.trail;

      // Hitung kecepatan saat ini menggunakan persamaan kinematika
      const currentVelocity = calculateVelocityAtTime(
        state.theory.initialVelocity,
        nextTime,
        state.gravity
      );

      let launched: boolean = state.launched;
      let level = state.level;
      let success = state.success;
      let target = state.target;
      let resultText = state.resultText;
      let prediction = state.prediction;
      let theory = state.theory;
      let projectile = point;
      let time = nextTime;
      let velocity = currentVelocity;

      const midAirHit = rawY >= 0 && isPointInsideTarget(point, state.target);
      const landed = rawY <= 0 && nextTime > 0;

      if (midAirHit || landed) {
        const hit =
          midAirHit || isPointInsideTarget({ x, y: 0 }, state.target);
        launched = false;
        time = 0;
        prediction = hit ? [] : prediction;
        theory = state.theory;
        projectile = { x, y: clampedY };
        velocity = { x: 0, y: 0 };
        if (hit) {
          target = generateTarget();
          level += 1;
          success += 1;
          resultText = 'Target kena! Kombinasi parameter kamu tepat 🎯';
        } else {
          resultText = 'Belum kena. Coba ubah sudut atau kecepatan.';
        }
      }

      return {
        projectile,
        trail,
        launched,
        level,
        success,
        target,
        resultText,
        prediction,
        theory,
        time,
        velocity,
      };
    }),
}));

