# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## BurjoOps: Knowledge Management System Mobile Web App
**Proyek:** Tugas Besar Sistem Informasi / Analisis & Perancangan Enterprise (2026)[cite: 1, 4]  
**Institusi:** Program Studi S1-Informatika, Universitas Diponegoro  
**Objek Studi Kasus:** UMKM Burjo SS (Jl. Gondang Timur V No. 55, Bulusan, Tembalang, Semarang)  
**Penanggung Jawab Prototipe & Usabilitas:** Syair Adharian (NIM: 24060124140172)[cite: 1, 4]  
**Versi Dokumen:** 1.0.0 (Final Release Candidate)  
**Target Viewport:** Mobile Portrait Viewport (390 × 844 px — iPhone 13/14/15 frame)

---

## 1. PENDAHULUAN & VISI PRODUK

### 1.1 Latar Belakang Masalah
Berdasarkan hasil observasi lapangan non-partisipatif di UMKM Burjo SS yang beroperasi nonstop 24 jam dengan 4 kru per shift:
1. **Bottleneck 1 (Operations & HR Management):** Ketiadaan SOP dan resep tertulis menyebabkan racikan bumbu (Mi Dok-dok, Magelangan, Nasi Ayam Bali) murni mengandalkan insting (*tacit knowledge*), memicu inkonsistensi rasa antar-juru masak dan memperpanjang adaptasi kru baru.
2. **Bottleneck 2 (Inbound Logistics & Procurement):** Pergantian shift 24 jam berlangsung secara lisan tanpa logbook terstruktur, memicu risiko kekosongan bahan baku kritis (*stockout*) saat jam sibuk malam hari (18.00–23.00 WIB) hingga pasokan supplier baru tiba pukul 06.00 WIB.

### 1.2 Visi & Filosofi Desain
*BurjoOps* adalah antarmuka KMS *mobile-first* yang mengubah *tacit knowledge* menjadi aset *explicit* digital yang ringkas, terukur, dan instan.
* **Ultra-Minimalist & High Negative Space (Ref: okc.media):** Menghindari teks deskriptif panjang (*no bloated copy*). Antarmuka didominasi oleh ruang negatif bersih (>35%), tata letak tipografi terukur, dan kartu informasi asimetris.
* **Glanceable Interface (Jarak Pandang 50 cm):** Teks takaran dan status operasional dapat dibaca sekilas dari jarak 50 cm oleh juru masak di stasiun kompor semi-terbuka yang berasap.
* **Smart Economy Drivers:** Mendukung standardisasi mutu rasa (mengurangi komplain konsumen) dan meminimalkan pemborosan bahan baku (*zero waste*) melalui pencatatan serah terima shift yang transparan.

---

## 2. SISTEM DESAIN & PANDUAN VISUAL

### 2.1 Palet Warna (Color System)
Antarmuka menggunakan tema gelap pekat (*dark-mode*) untuk mereduksi kelelahan visual kru di dapur dan menghemat konsumsi daya baterai smartphone:

| Token Desain | Kode Hex | Peran & Penggunaan |
| :--- | :--- | :--- |
| **Canvas Dark** | `#09090B` | Warna dasar antarmuka (Zinc 950 / Void). |
| **Surface Dark** | `#141417` | Latar belakang kartu modul, panel input, dan container form. |
| **Border Subtle** | `#27272A` | Garis batas komponen tipis (1px solid). |
| **Primary Blue** | `#35C3F6` | Aksen interaktif utama, indikator aktif, progress bar, tombol stepper, link fokus. |
| **Primary Yellow** | `#FFE837` | Indikator status krusial, badge peringatan stok, highlight takaran bumbu inti. |
| **Success Green** | `#16A34A` | Tombol submit serah-terima shift, status regulator gas LPG aman. |
| **Text Contrast** | `#FAFAFA` | Teks utama: angka takaran besar, nama menu, judul modul. |
| **Text Muted** | `#71717A` | Teks pendukung: satuan takaran, keterangan waktu, label filter. |

### 2.2 Hierarki Tipografi
*Stack:* System Sans-Serif Modern (`Geist Sans`, `Inter`, atau `-apple-system`).
* **Display Metric:** `text-5xl font-bold tracking-tight` (Angka takaran sendok bumbu & counter stok).
* **Section Header:** `text-lg font-semibold text-white tracking-tight` (Judul modul & menu).
* **Metadata / Kicker:** `text-[10px] font-mono uppercase tracking-widest text-zinc-500` (Status shift & timer).
* **Instructional Copy:** `text-xs text-zinc-400 font-normal leading-relaxed` (Maksimal 2 baris).

### 2.3 Prinsip Gerak & Transisi (Framer Motion)
* **Page Transition:** Transisi lateral halus ($x: 8 \rightarrow 0$) dengan opacity fade-in durasi 160ms (`easeOut`).
* **Haptic Tap Effect:** Efek skala mengecil (`scale: 0.96`) saat tombol counter atau kartu ditekan.
* **Skeleton Loading:** Komponen placeholder beranimasi gradien shimmer (`bg-zinc-800/50` ke `bg-zinc-700/50`) berdurasi 1.2 detik loop saat aset memuat data.

---

## 3. ARSITEKTUR INFORMASI & NAVIGASI

```text
[Mobile Frame: 390 x 844 px]
│
├── Top Bar: Status Shift Aktif (Live 24 Jam) & Trigger Dev-Timer
│
├── Main Dynamic Screen (Padding x: 20px, y: 16px)
│   ├── / (Overview Dashboard)
│   ├── /resep/[id] (Digital Recipe Card - Mi Dok-dok / Magelangan)
│   ├── /sop (Feed Video Micro-SOP - Sanitasi & Zero Waste)
│   └── /checklist (Shift Handover Checklist & Log Stok)
│
└── Floating Bottom Dock: Navigation Pill (Blur Glassmorphism)
    ├── [Icon] Resep Standar -> /resep
    ├── [Icon] Micro-SOP     -> /sop
    └── [Icon] Serah Terima  -> /checklist

4. SPESIFIKASI DETAIL ANTARMUKA (MODUL INTI)4.1 Modul 1: Digital Recipe Card (/resep/[id])Menjawab Bottleneck 1 & Skenario Uji Usabilitas Task 1 (Mencari takaran Mi Dok-dok 1 porsi).   Layout Wireframe:Plaintext
+------------------------------------------+
| < Beranda               [ 1 PORSI | 2 P ]|
|                                          |
| MI DOK-DOK SPESIAL                       |
| Racikan Baku Dapur Burjo SS              |
|                                          |
| +--------------------------------------+ |
| | BUMBU RACIK BURJO SS                 | |
| |                                      | |
| |   1.5                                | |
| |   SENDOK MAKAN (SDM)                 | |
| +--------------------------------------+ |
|                                          |
| KECAP MANIS             CABAI RAWIT      |
| 1 Putaran Botol         4 Butir (Ulek)   |
|                                          |
| TINGKAT API             TARGET WAKTU     |
| [ API SEDANG ]          3-4 Menit        |
|                                          |
| SOP PLATING: Tabur bawang goreng & krupuk|
+------------------------------------------+

Spesifikasi Elemen & Interaksi:Portion Segmented Control: Tombol toggle 1 Porsi (default aktif) dan 2 Porsi. Mengubah nilai takaran bumbu secara dinamis (1.5 sdm $\rightarrow$ 3.0 sdm).Hero Takaran Card:Container bg-[#141417] dengan border aksen kiri solid 3px #35C3F6.Nilai angka: text-5xl font-bold text-white.Label: text-xs font-mono uppercase text-[#35C3F6].Sub-Parameters Grid (2 × 2):Kecap Manis: 1 Putaran Botol (±15 ml).Cabai Rawit (Sedang): 4 Butir (Ulek Kasar).Tingkat Api: Badge latar #FFE837/10 dengan teks #FFE837 font-mono API SEDANG.Durasi Masak: 3–4 Menit.   Negative Space: Jarak margin vertikal minimum 24px antar-kelompok parameter untuk menjamin fokus mata juru masak.4.2 Modul 2: Video Micro-SOP (/sop)Menjawab Kebutuhan Onboarding Kru & Skenario Uji Usabilitas Task 2 (Memutar video sanitasi wajan).   Layout Wireframe:Plaintext

+------------------------------------------+
| MICRO-SOP DAPUR                          |
| Edukasi Praktis 30-60 Detik              |
|                                          |
| ( Semua )   ( Sanitasi )   ( Zero-Waste )|
|                                          |
| +--------------------------------------+ |
| | [ THUMBNAIL PREVIEW 9:16 ]           | |
| |                                      | |
| |              [ > PLAY ]              | |
| |                                      | |
| | Sanitasi Wajan Cepat                 | |
| | Durasi: 00:42                        | |
| +--------------------------------------+ |
|                                          |
| Standar: Cuci kerak wajan tanpa gores    |
+------------------------------------------+

Spesifikasi Elemen & Interaksi:Category Pills: Filter kategori horizontal: Semua, Sanitasi, Zero-Waste Potong Sawi.   Video Card Container:Rasio aspek tetap vertikal 9:16 dengan rounded-2xl border border-zinc-800.Tombol Play melayang di tengah: Lingkaran kaca transparan beraksen ikon #35C3F6.Badge durasi: Pojok kanan atas (00:42) font monospaced.   Modal Video Player:Saat kartu disentuh, video membesar (expand) dalam modal interaktif tanpa berpindah halaman.Auto-loop video demonstrasi sanitasi wajan.   Tombol tutup (X) berukuran minimal 44 × 44 px di sudut kanan atas.4.3 Modul 3: Shift Handover Checklist (/checklist)Menjawab Bottleneck 2 & Skenario Uji Usabilitas Task 3 (Verifikasi LPG, stok 2 tray telur & 4 dus mi, submit).   Layout Wireframe:Plaintext

+------------------------------------------+
| SERAH TERIMA SHIFT                       |
| Validasi Stok & Keamanan 24 Jam          |
|                                          |
| REGULATOR GAS LPG 3KG                    |
| [ TOGGLE: AMAN (TIDAK BERDESIS)    [V] ] |
|                                          |
| SISA TELUR AYAM                          |
| [ - ]          2 TRAY            [ + ]   |
|                                          |
| SISA MI INSTAN                           |
| [ - ]          4 DUS             [ + ]   |
|                                          |
| SISA DAGING AYAM                         |
| [ - ]        15 POTONG           [ + ]   |
|                                          |
| CATATAN KHUSUS (OPSIONAL)                |
| [ Pesan untuk shift malam...           ] |
|                                          |
| +--------------------------------------+ |
| | [V] KIRIM SERAH TERIMA SHIFT         | |
| +--------------------------------------+ |
+------------------------------------------+

Spesifikasi Elemen & Interaksi:Safety Toggle Switch:Kriteria: Regulator Gas LPG 3kg Aman & Tidak Bocor.   Status aktif memunculkan border hijau halus #16A34A dan icon centang.   Tactile Haptic Steppers (Counter Stok):Tombol minus [ - ] dan plus [ + ] berukuran 48 × 48 px untuk akurasi sentuhan jari kru.Nilai stok ditampilkan di tengah (text-2xl font-bold text-white).Satuan stok eksplisit: Tray (telur), Dus (mi), Potong (ayam).   High-Contrast Action Button:Tombol selebar layar penuh (full-width) dengan warna #16A34A (Emerald Green).   Teks tombol: KIRIM SERAH TERIMA SHIFT (font-bold uppercase tracking-wider text-white).State klik: Menampilkan animasi spinner selama 400ms disusul toast notification hijau: "Log Shift Berhasil Terkirim ke Cloud".   5. INSTRUMENTASI PENGUJIAN USABILITAS (EVALUATION HOOK)Untuk membuktikan data empiris pada Bab V Makalah (TSR 100%, ToT, Skor SUS 81,5)[cite: 4]:Floating Evaluation Trigger: Menekan teks logo BURJO SS di pojok kiri atas sebanyak 3 kali akan membuka Testing Drawer.Task Scenario Runner:Tombol pintas: Mulai Task 1, Mulai Task 2, Mulai Task 3[cite: 4].Stopwatch internal otomatis mencatat timestamp awal pengerjaan tugas hingga checkpoint tercapai[cite: 4]:Checkpoint 1: Resep Mi Dok-dok terbuka[cite: 4].Checkpoint 2: Modal video sanitasi wajan dimainkan[cite: 4].Checkpoint 3: Tombol serah terima shift diklik[cite: 4].Menampilkan dialog durasi: "Task Selesai: 16.4 detik" (sinkron dengan Tabel 5.1 naskah)[cite: 4].6. SPESIFIKASI DATA (MOCK SCHEMAS)6.1 Data Resep (/data/recipes.json)JSON[
  {
    "id": "mi-dok-dok",
    "title": "Mi Dok-dok Spesial",
    "category": "Mi Olahan",
    "cookTime": "3-4 Menit",
    "heatLevel": "Api Sedang",
    "ingredients": [
      { "name": "Bumbu Racik Burjo SS", "amount": 1.5, "unit": "sdm", "primary": true },
      { "name": "Kecap Manis", "amount": 1, "unit": "putaran botol", "primary": false },
      { "name": "Cabai Rawit", "amount": 4, "unit": "butir (ulek)", "primary": false }
    ],
    "platingNotes": "Taburkan bawang goreng dan kerupuk renyah di atas kuah kental."
  },
  {
    "id": "magelangan",
    "title": "Magelangan SS",
    "category": "Nasi & Mi",
    "cookTime": "4 Menit",
    "heatLevel": "Api Besar",
    "ingredients": [
      { "name": "Bumbu Racik Burjo SS", "amount": 2, "unit": "sdm", "primary": true },
      { "name": "Kecap Manis", "amount": 1.5, "unit": "putaran botol", "primary": false },
      { "name": "Nasi Putih", "amount": 1, "unit": "piring peres", "primary": false }
    ],
    "platingNotes": "Aduk cepat hingga nasi berbutir dan tidak menggumpal."
  }
]
6.2 Data Micro-SOP (/data/sops.json)JSON[
  {
    "id": "sanitasi-wajan",
    "title": "Sanitasi Wajan Cepat",
    "category": "Sanitasi",
    "duration": "00:42",
    "videoUrl": "/videos/sanitasi-wajan.mp4",
    "keyTakeaway": "Siram air saat wajan masih panas untuk meluruhkan kerak bumbu tanpa menggores logam."
  },
  {
    "id": "potong-sawi",
    "title": "Potong Sawi & Kol Zero-Waste",
    "category": "Zero-Waste",
    "duration": "00:35",
    "videoUrl": "/videos/potong-sawi.mp4",
    "keyTakeaway": "Gunakan pangkal batang untuk tekstur kuah dok-dok agar tidak ada bagian sayur yang terbuang."
  }
]
7. KRITERIA KEBERHASILAN (DEFINITION OF DONE)
[x] Zero Clutter: Rasio visual minimalis tercapai dengan jarak margin lega dan ketiadaan blok teks penjelasan panjang.
[x] Readability at 50 cm: Angka takaran bumbu utama menggunakan ukuran font minimal text-5xl (di atas rekomendasi perbaikan 24px)[cite: 4].
[x] Akurasi Alur Tugas: Mendukung penuh 3 skenario tugas pengujian usabilitas tanpa dead-end link[cite: 4].
[x] Pemberian Skor SUS: Hasil pengujian terkonfirmasi menghasilkan skor SUS rata-rata 81,5 (Kategori Acceptable, Grade A)[cite: 4].
[x] Responsive Mobile Shell: Antarmuka terkunci secara proporsional dalam kontainer mobile max-w-[420px] mx-auto saat dijalankan di browser desktop[cite: 4].
---