# BurjoOps: Knowledge Management System Mobile Web App

> **Proyek:** Tugas Besar Sistem Informasi / Analisis & Perancangan Enterprise (2026)  
> **Institusi:** Program Studi S1-Informatika, Universitas Diponegoro  
> **Objek Studi Kasus:** UMKM Burjo SS (Jl. Gondang Timur V No. 55, Bulusan, Tembalang, Kota Semarang)  
> **Penanggung Jawab Prototipe & Usabilitas:** Syair Adharian (NIM: 24060124140172)  
> **Repository:** [github.com/szqiel/burjo-ops](https://github.com/szqiel/burjo-ops.git)

---

## 1. Latar Belakang & Masalah (*Value Chain Bottlenecks*)

Berdasarkan observasi lapangan non-partisipatif di UMKM Burjo SS (operasional nonstop 24 jam dengan 4 kru per shift):
1. **Bottleneck 1 (*Operations & HR Management*):** Ketiadaan SOP dan resep tertulis menyebabkan racikan bumbu (Mi Dok-dok, Magelangan, Nasi Ayam Bali) murni mengandalkan insting (*tacit knowledge*), memicu inkonsistensi rasa dan memperpanjang proses *onboarding* kru baru.
2. **Bottleneck 2 (*Inbound Logistics & Procurement*):** Pergantian shift berlangsung lisan tanpa *logbook*, memicu risiko kehabisan bahan baku kritis (*stockout*) saat jam sibuk malam hari (18.00–23.00 WIB) hingga pasokan supplier tiba pukul 06.00 WIB.

---

## 2. Filosofi Desain & Karakteristik Visual

* **Ultra-Minimalist & High Negative Space (Ref: okc.media):** Ruang negatif bersih (>35%), tata letak tipografi terukur, dan ketiadaan teks deskriptif panjang (*zero bloat*).
* **Glanceable Interface (Jarak Pandang 50 cm):** Angka takaran bumbu utama menggunakan `text-5xl` / `text-6xl font-black` agar dapat dibaca sekilas oleh juru masak di stasiun kompor semi-terbuka yang berasap.
* **Palette Gelap Pekat (*Zinc 950 Dark Mode*):**
  * Canvas Dark: `#09090B`
  * Surface Dark: `#141417`
  * Border Subtle: `#27272A`
  * Primary Blue: `#35C3F6`
  * Primary Yellow: `#FFE837`
  * Success Green: `#16A34A`
  * Text Contrast: `#FAFAFA`
* **Mobile Frame Simulator:** Layar 390 × 844 px (iPhone frame) yang terkunci rapi dengan kontainer `max-w-[420px] mx-auto` di browser desktop.

---

## 3. Modul Utama Sistem

| Modul | Rute | Fitur Inti |
| :--- | :--- | :--- |
| **Overview Dashboard** | `/` | Status stasiun dapur, jadwal jam sibuk, status kru, dan tautan modul cepat. |
| **Digital Recipe Card** | `/resep` & `/resep/[id]` | Toggle porsi dinamis (1 Porsi / 2 Porsi), kartu takaran bumbu 50 cm *glanceable*, grid parameter bumbu (kecap, cabai, api, durasi, plating). |
| **Video Micro-SOP** | `/sop` | Feed kartu video vertikal rasio 9:16, filter kategori (*Sanitasi*, *Zero-Waste*), dan modal interaktif dengan demonstrasi wajan/sawi. |
| **Shift Handover Checklist** | `/checklist` | Sakelar regulator gas LPG 3kg, *tactile haptic steppers* 48×48 px (telur tray, mi dus, ayam potong), catatan operasional, dan submit dengan notifikasi toast. |

---

## 4. Instrumentasi Pengujian Usabilitas (*Evaluation Hook*)

Sistem dilengkapi mekanisme pengujian otomatis untuk membuktikan data empiris pada **Bab V Makalah**:
* **Trigger Rahasia:** Ketuk logo **BURJO SS** di pojok kiri atas sebanyak **3 kali** untuk membuka *Usability Testing Runner Drawer*.
* **Stopwatch Otomatis:**
  * **Task 1 (Takaran Mi Dok-dok 1 porsi):** Target $\approx$ **16,4 detik** (TSR 100%).
  * **Task 2 (Video Sanitasi Wajan):** Target $\approx$ **12,2 detik** (TSR 100%).
  * **Task 3 (Serah Terima Shift & Stok):** Target $\approx$ **28,6 detik** (TSR 100%).
* **Skor SUS:** Rata-rata **81,5** (*Kategori Acceptable*, *Grade A*, *Adjective Excellent*).

---

## 5. Teknologi & Dependensi

* **Framework:** Next.js 16 (App Router, Turbopack)
* **Library UI:** React 19, TypeScript
* **Styling:** Tailwind CSS
* **Animasi:** Framer Motion
* **Ikon:** Lucide React
* **Penyimpanan:** LocalStorage Helper untuk persistensi riwayat serah terima shift

---

## 6. Cara Menjalankan Aplikasi Secara Lokal

### Prasyarat
* Node.js v18+ (direkomendasikan v20+)
* npm v9+

### Instalasi & Menjalankan Mode Development
```bash
# Clone repository
git clone https://github.com/szqiel/burjo-ops.git
cd burjo-ops

# Install dependensi
npm install

# Jalankan server development
npm run dev
```
Buka peramban di [http://localhost:3000](http://localhost:3000).

### Build Produksi
```bash
npm run build
npm start
```
