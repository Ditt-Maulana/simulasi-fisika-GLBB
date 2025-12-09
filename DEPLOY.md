# Panduan Deploy ke Vercel

Aplikasi Trajectory Challenge siap untuk di-deploy ke Vercel. Berikut beberapa cara untuk melakukan deploy:

## Metode 1: Menggunakan Vercel CLI (Paling Mudah)

### Langkah 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Langkah 2: Login ke Vercel
```bash
vercel login
```

### Langkah 3: Deploy
```bash
vercel
```

Ikuti instruksi di terminal:
- Set up and deploy? **Y**
- Which scope? Pilih akun Anda
- Link to existing project? **N** (untuk project baru)
- What's your project's name? **trajectory-react** (atau nama lain)
- In which directory is your code located? **./** (tekan Enter)

### Langkah 4: Deploy ke Production
Setelah deploy pertama berhasil, deploy ke production:
```bash
vercel --prod
```

## Metode 2: Deploy via GitHub Integration

### Langkah 1: Push ke GitHub
```bash
git init
git add .
git commit -m "Initial commit: Trajectory Challenge app"
git branch -M main
git remote add origin <URL_REPOSITORY_GITHUB_ANDA>
git push -u origin main
```

### Langkah 2: Deploy via Vercel Dashboard
1. Buka https://vercel.com
2. Login dengan akun GitHub/GitLab/Bitbucket
3. Klik **"Add New Project"**
4. Import repository GitHub Anda
5. Vercel akan otomatis mendeteksi:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Klik **"Deploy"**

## Metode 3: Deploy via Drag & Drop

1. Build aplikasi terlebih dahulu:
```bash
npm run build
```

2. Buka https://vercel.com
3. Login ke akun Vercel
4. Drag folder `dist` ke dashboard Vercel
5. Deploy akan otomatis dimulai

## Konfigurasi

File `vercel.json` sudah dibuat dengan konfigurasi yang tepat:
- Build Command: `npm run build`
- Output Directory: `dist`
- Framework: Vite
- SPA Routing: Semua route diarahkan ke `index.html`

## Setelah Deploy

Setelah deploy berhasil, Anda akan mendapatkan URL seperti:
- Preview: `https://trajectory-react-xxx.vercel.app`
- Production: `https://trajectory-react.vercel.app` (atau custom domain)

## Update Deployment

Setiap kali Anda melakukan perubahan:

**Via CLI:**
```bash
vercel --prod
```

**Via GitHub:**
- Push perubahan ke GitHub
- Vercel akan otomatis rebuild dan deploy

## Troubleshooting

### Build Error
Pastikan semua dependencies terinstall:
```bash
npm install
```

### Routing Error
File `vercel.json` sudah dikonfigurasi untuk SPA routing. Pastikan file tersebut ada di root project.

### Environment Variables
Jika perlu environment variables, tambahkan di Vercel Dashboard:
1. Project Settings → Environment Variables
2. Tambahkan variable yang diperlukan
3. Redeploy project

## Catatan Penting

- ✅ Build sudah diuji dan berhasil
- ✅ Konfigurasi Vercel sudah dibuat (`vercel.json`)
- ✅ Aplikasi menggunakan React + Vite + TypeScript
- ✅ Tidak memerlukan environment variables khusus

