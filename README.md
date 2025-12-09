# 🎯 Trajectory Challenge - Simulasi Fisika Gerak Parabola

Aplikasi simulasi interaktif untuk mempelajari gerak parabola (projectile motion) menggunakan rumus fisika yang akurat. Aplikasi ini mengimplementasikan konsep-konsep fisika dasar seperti parabola, vektor, kinematika, kecepatan, dan hukum Newton.

## 🌐 Live Demo

**Aplikasi dapat diakses di:** [https://simulasi-fisika-glbb.vercel.app/](https://simulasi-fisika-glbb.vercel.app/)

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://simulasi-fisika-glbb.vercel.app/)

## 📚 Rumus Fisika yang Digunakan

### 1. **Vektor (Vector Mathematics)**

Aplikasi menggunakan dekomposisi vektor untuk memecah kecepatan awal menjadi komponen horizontal dan vertikal:

```
v⃗₀ = v₀ₓî + v₀ᵧĵ

dimana:
v₀ₓ = v₀ cos(θ)  (komponen horizontal)
v₀ᵧ = v₀ sin(θ)  (komponen vertikal)
```

**Magnitudo vektor kecepatan:**
```
|v⃗| = √(vₓ² + vᵧ²)
```

### 2. **Kinematika (Kinematics Equations)**

Aplikasi menggunakan persamaan SUVAT (displacement, velocity, acceleration, time) untuk menghitung posisi dan kecepatan:

**Persamaan Posisi:**
```
x(t) = v₀ₓt                    (gerak lurus beraturan)
y(t) = v₀ᵧt - ½gt²            (gerak lurus berubah beraturan)
```

**Persamaan Kecepatan:**
```
vₓ(t) = v₀ₓ                    (kecepatan horizontal konstan)
vᵧ(t) = v₀ᵧ - gt              (kecepatan vertikal berubah)
```

**Waktu Terbang Total:**
```
t_total = 2v₀ᵧ / g
```

### 3. **Parabola (Parabolic Motion)**

**Jarak Horizontal Maksimum (Range):**
```
R = (v₀² sin(2θ)) / g
```

**Tinggi Maksimum:**
```
h_max = v₀ᵧ² / (2g)
```

**Persamaan Lintasan Parabola:**
```
y = x tan(θ) - (gx²) / (2v₀²cos²(θ))
```

### 4. **Hukum Newton (Newton's Laws)**

**Hukum Newton II: F = ma**

Untuk gerak parabola dengan gravitasi:
```
F_y = -mg                     (gaya gravitasi ke bawah)
a_y = F_y / m = -g            (percepatan vertikal)
a_x = 0                        (tidak ada gaya horizontal)
```

### 5. **Kecepatan (Velocity)**

Kecepatan dihitung pada setiap waktu menggunakan persamaan kinematika:

**Kecepatan pada waktu t:**
```
vₓ(t) = v₀ₓ                    (konstan)
vᵧ(t) = v₀ᵧ - gt              (berubah linier)
```

**Kecepatan di titik tertinggi:**
```
vₓ = v₀ₓ
vᵧ = 0                         (kecepatan vertikal nol)
```

## ✨ Fitur Aplikasi

### 🎮 **Kontrol Simulasi**
- **Sudut Awal (θ)**: Atur sudut peluncuran dari 5° hingga 85°
- **Kecepatan Awal (v₀)**: Atur kecepatan awal dari 5 m/s hingga 90 m/s
- **Gravitasi (g)**: Atur percepatan gravitasi dari 1 m/s² hingga 25 m/s²
- **Tombol Luncurkan**: Memulai simulasi dengan parameter yang ditentukan
- **Tombol Reset**: Menghentikan simulasi dan mengembalikan ke kondisi awal

### 📊 **Panel Informasi Teori**
Menampilkan hasil perhitungan teoritis berdasarkan rumus fisika:
- **Waktu Terbang Total**: Waktu yang dibutuhkan proyektil untuk kembali ke tanah
- **Jarak Maksimum (Range)**: Jarak horizontal terjauh yang dicapai proyektil
- **Tinggi Maksimum**: Titik tertinggi yang dicapai proyektil
- **Kecepatan Awal**: Komponen vektor kecepatan awal (vₓ dan vᵧ)
- **Kecepatan Saat Ini**: Kecepatan real-time selama simulasi berjalan
- **Magnitudo Kecepatan**: Besar kecepatan total pada setiap saat
- **Waktu Simulasi**: Waktu yang telah berlalu sejak peluncuran

### 🎯 **Sistem Target & Level**
- **Target Dinamis**: Target dengan posisi, lebar, dan tinggi acak
- **Sistem Level**: Level meningkat setiap kali target berhasil dikenai
- **Counter Kemenangan**: Menghitung jumlah target yang berhasil dikenai
- **Visualisasi Target**: Target ditampilkan sebagai blok hijau di canvas

### 🖼️ **Visualisasi Canvas**
- **Lintasan Teori**: Garis biru menunjukkan lintasan yang dihitung secara teoritis
- **Lintasan Aktual**: Garis oranye menunjukkan lintasan aktual selama simulasi
- **Trail Proyektil**: Jejak pergerakan proyektil ditampilkan secara real-time
- **Proyektil**: Lingkaran oranye menunjukkan posisi proyektil saat ini
- **Ground**: Garis hijau menunjukkan permukaan tanah

### 📈 **Real-time Simulation**
- Simulasi berjalan dengan frame rate yang halus menggunakan `requestAnimationFrame`
- Perhitungan fisika dilakukan setiap frame menggunakan delta time
- Kecepatan dan posisi diperbarui secara real-time berdasarkan rumus kinematika

## 🚀 Cara Menggunakan

1. **Atur Parameter**:
   - Pilih sudut peluncuran (5° - 85°)
   - Tentukan kecepatan awal (5 - 90 m/s)
   - Atur nilai gravitasi (1 - 25 m/s²)

2. **Luncurkan Simulasi**:
   - Klik tombol "Luncurkan"
   - Amati lintasan proyektil di canvas
   - Lihat informasi kecepatan dan waktu di panel informasi

3. **Kenai Target**:
   - Sesuaikan sudut dan kecepatan untuk mengarahkan proyektil ke target hijau
   - Setelah target kena, level akan naik dan target baru akan muncul

4. **Reset**:
   - Gunakan tombol "Reset" untuk menghentikan simulasi dan memulai dari awal

## 🛠️ Teknologi yang Digunakan

- **React 19** - Framework UI
- **TypeScript** - Type safety
- **Vite** - Build tool dan dev server
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **Canvas API** - Visualisasi grafis

## 📐 Asumsi Fisika

- **Hambatan udara diabaikan**: Gerak mengikuti GLBB murni
- **Gravitasi konstan**: Percepatan gravitasi seragam di seluruh lintasan
- **Proyektil dimulai dari tanah**: Posisi awal y = 0
- **Tidak ada rotasi**: Proyektil dianggap sebagai partikel titik
- **Medan gravitasi seragam**: Tidak ada variasi gravitasi berdasarkan ketinggian

## 🎓 Konsep Fisika yang Dipelajari

1. **Gerak Parabola**: Memahami lintasan proyektil yang membentuk parabola
2. **Dekomposisi Vektor**: Memecah vektor kecepatan menjadi komponen horizontal dan vertikal
3. **Kinematika 2D**: Menerapkan persamaan gerak dalam dua dimensi
4. **Hukum Newton**: Memahami hubungan antara gaya, massa, dan percepatan
5. **Energi Mekanik**: Mengamati transformasi energi kinetik dan potensial
6. **Optimasi Sudut**: Menemukan sudut optimal untuk jarak maksimum (45°)

## 📝 Catatan Penting

- Semua perhitungan menggunakan satuan SI (meter, detik, m/s, m/s²)
- Sudut optimal untuk jarak maksimum adalah 45° (ketika hambatan udara diabaikan)
- Waktu naik sama dengan waktu turun dalam gerak parabola simetris
- Kecepatan horizontal selalu konstan karena tidak ada gaya horizontal

## 🔗 Deploy

Aplikasi dapat di-deploy ke Vercel. Lihat file `DEPLOY.md` untuk panduan lengkap.

---

**Dibuat oleh Ditt Maulana dengan ❤️ untuk project remidial fisika**
