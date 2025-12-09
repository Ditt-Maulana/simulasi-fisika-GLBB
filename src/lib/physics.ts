export type Point = { x: number; y: number };

export type Vector2D = {
  x: number;
  y: number;
};

export type LaunchParams = {
  angle: number;
  speed: number;
  gravity: number;
};

export type TheoryResult = {
  vx: number;
  vy: number;
  totalTime: number;
  range: number;
  hMax: number;
  initialVelocity: Vector2D;
};

export type Target = {
  x: number;
  width: number;
  height: number;
};

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const degToRad = (degree: number) => (degree * Math.PI) / 180;

/**
 * Vektor: Dekomposisi vektor kecepatan awal menjadi komponen x dan y
 * v⃗₀ = v₀ₓî + v₀ᵧĵ
 * v₀ₓ = v₀ cos(θ)
 * v₀ᵧ = v₀ sin(θ)
 */
export const decomposeVelocityVector = (
  speed: number,
  angle: number,
): Vector2D => {
  const angleRad = degToRad(angle);
  return {
    x: speed * Math.cos(angleRad),
    y: speed * Math.sin(angleRad),
  };
};

/**
 * Kinematika: Menghitung waktu terbang total menggunakan persamaan gerak vertikal
 * Persamaan: v = v₀ + at
 * Di titik tertinggi: vᵧ = 0 = v₀ᵧ - gt
 * Waktu naik: t_up = v₀ᵧ / g
 * Waktu total: t_total = 2 × t_up = 2v₀ᵧ / g
 */
const calculateFlightTime = (vy: number, gravity: number): number => {
  return (2 * vy) / gravity;
};

/**
 * Parabola: Menghitung jarak horizontal maksimum (range)
 * Rumus: R = (v₀² sin(2θ)) / g
 * Turunan dari persamaan parabola: x = v₀ₓt, y = v₀ᵧt - ½gt²
 */
const calculateRange = (
  speed: number,
  angle: number,
  gravity: number,
): number => {
  const angleRad = degToRad(angle);
  return (speed ** 2 * Math.sin(2 * angleRad)) / gravity;
};

/**
 * Parabola: Menghitung tinggi maksimum menggunakan persamaan kinematika
 * Rumus: h_max = v₀ᵧ² / (2g)
 * Turunan dari: v² = v₀² + 2as, dimana v = 0 di titik tertinggi
 * 0 = v₀ᵧ² - 2gh_max
 * h_max = v₀ᵧ² / (2g)
 */
const calculateMaxHeight = (vy: number, gravity: number): number => {
  return (vy ** 2) / (2 * gravity);
};

/**
 * Hukum Newton II: F = ma
 * Untuk gerak parabola dengan gravitasi:
 * F_y = -mg (gaya gravitasi ke bawah)
 * a_y = F_y / m = -g
 * a_x = 0 (tidak ada gaya horizontal)
 */
export const computeTheory = ({
  angle,
  speed,
  gravity,
}: LaunchParams): TheoryResult | null => {
  if (gravity <= 0 || speed <= 0) return null;

  // Dekomposisi vektor kecepatan awal
  const initialVelocity = decomposeVelocityVector(speed, angle);
  const { x: vx, y: vy } = initialVelocity;

  // Kinematika: waktu terbang total
  const totalTime = calculateFlightTime(vy, gravity);

  // Parabola: jarak horizontal maksimum
  const range = calculateRange(speed, angle, gravity);

  // Parabola: tinggi maksimum
  const hMax = calculateMaxHeight(vy, gravity);

  if (!Number.isFinite(totalTime) || totalTime <= 0) return null;

  return {
    vx,
    vy,
    totalTime,
    range: Math.max(range, 0),
    hMax: Math.max(hMax, 0),
    initialVelocity,
  };
};

/**
 * Kinematika: Persamaan posisi untuk gerak parabola
 * Persamaan SUVAT:
 * x(t) = x₀ + v₀ₓt + ½aₓt² = v₀ₓt (karena aₓ = 0)
 * y(t) = y₀ + v₀ᵧt + ½aᵧt² = v₀ᵧt - ½gt²
 * 
 * Persamaan parabola: y = x tan(θ) - (gx²)/(2v₀²cos²(θ))
 */
export const buildPrediction = (
  theory: TheoryResult,
  gravity: number,
  sampleCount = 60,
): Point[] => {
  const points: Point[] = [];
  const { vx, vy } = theory;

  for (let i = 0; i <= sampleCount; i++) {
    const t = (i / sampleCount) * theory.totalTime;
    
    // Kinematika: posisi horizontal (gerak lurus beraturan)
    const x = vx * t;
    
    // Kinematika: posisi vertikal (gerak lurus berubah beraturan)
    // y = v₀ᵧt - ½gt²
    const y = vy * t - 0.5 * gravity * t * t;
    
    if (y < 0) break;
    points.push({ x, y });
  }
  return points;
};

/**
 * Kinematika: Menghitung kecepatan pada waktu tertentu
 * Persamaan: v = v₀ + at
 * vₓ(t) = v₀ₓ (konstan, tidak ada percepatan horizontal)
 * vᵧ(t) = v₀ᵧ - gt
 */
export const calculateVelocityAtTime = (
  initialVelocity: Vector2D,
  time: number,
  gravity: number,
): Vector2D => {
  return {
    x: initialVelocity.x, // Kecepatan horizontal konstan
    y: initialVelocity.y - gravity * time, // Kecepatan vertikal berubah
  };
};

/**
 * Vektor: Menghitung magnitudo vektor kecepatan
 * |v⃗| = √(vₓ² + vᵧ²)
 */
export const calculateSpeedMagnitude = (velocity: Vector2D): number => {
  return Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
};

/**
 * Utility: Menghitung skala untuk visualisasi canvas
 */
export const deriveScale = (
  range: number,
  hMax: number,
  canvasWidth: number,
  canvasHeight: number,
  groundOffset: number,
  padding = 120,
) => {
  const usableWidth = canvasWidth - padding;
  const usableHeight = canvasHeight - groundOffset - padding / 2;
  const scaleX = usableWidth / Math.max(range, 10);
  const scaleY = usableHeight / Math.max(hMax, 5);
  return clamp(Math.min(scaleX, scaleY), 4, 20);
};

export const generateTarget = (): Target => {
  const x = 25 + Math.random() * 30;
  const width = 5 + Math.random() * 5;
  const height = 6 + Math.random() * 6;
  return {
    x: +x.toFixed(1),
    width: +width.toFixed(1),
    height: +height.toFixed(1),
  };
};

export const isPointInsideTarget = (point: Point, target: Target) => {
  const withinX = point.x >= target.x && point.x <= target.x + target.width;
  const withinY = point.y >= 0 && point.y <= target.height;
  return withinX && withinY;
};

