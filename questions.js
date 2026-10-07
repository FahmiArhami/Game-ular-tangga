/**
 * QUESTIONS.JS
 * Database soal Informatika SMP Kelas 8-9
 * Guru dapat menambah/mengedit soal di sini tanpa mengubah logika game.
 *
 * Struktur soal:
 * {
 *   id: number,
 *   category: string,
 *   difficulty: "easy" | "medium" | "hard",
 *   type: "multiple-choice" | "true-false" | "multi-select" | "situation" | "ordering" | "concept-guess",
 *   question: string,
 *   options: array (untuk multiple-choice, true-false, multi-select, situation),
 *   answer: number | number[] | string (index untuk MC, array index untuk multi-select, string untuk concept-guess),
 *   items: array (untuk ordering - urutan yang benar adalah index 0,1,2,...),
 *   explanation: string,
 *   points: number (otomatis dari difficulty: easy=5, medium=10, hard=15)
 * }
 */

const QUESTIONS_DB = [

  // =============================================
  // BERPIKIR KOMPUTASIONAL
  // =============================================
  {
    id: 1,
    category: "Berpikir Komputasional",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Apa yang dimaksud dengan dekomposisi dalam berpikir komputasional?",
    options: [
      "Memecah masalah besar menjadi bagian-bagian kecil",
      "Mencari pola yang sama dalam suatu masalah",
      "Membuat algoritma untuk menyelesaikan masalah",
      "Mengabaikan detail yang tidak penting"
    ],
    answer: 0,
    explanation: "Dekomposisi adalah proses memecah masalah yang kompleks menjadi bagian-bagian lebih kecil yang lebih mudah diselesaikan."
  },
  {
    id: 2,
    category: "Berpikir Komputasional",
    difficulty: "easy",
    type: "true-false",
    question: "Abstraksi dalam berpikir komputasional berarti menyederhanakan masalah dengan fokus pada informasi yang penting dan mengabaikan detail yang tidak perlu.",
    options: ["Benar", "Salah"],
    answer: 0,
    explanation: "Benar! Abstraksi adalah proses menyederhanakan dengan memfokuskan pada hal-hal penting dan mengabaikan detail yang tidak relevan."
  },
  {
    id: 3,
    category: "Berpikir Komputasional",
    difficulty: "medium",
    type: "ordering",
    question: "Urutkan langkah-langkah berpikir komputasional yang benar untuk menyelesaikan masalah:",
    items: [
      "Dekomposisi — pecah masalah menjadi bagian kecil",
      "Pengenalan pola — temukan kesamaan antar masalah",
      "Abstraksi — fokus pada hal penting saja",
      "Algoritma — buat langkah penyelesaian"
    ],
    answer: [0, 1, 2, 3],
    explanation: "Urutan berpikir komputasional: Dekomposisi → Pengenalan Pola → Abstraksi → Algoritma."
  },
  {
    id: 4,
    category: "Berpikir Komputasional",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Dita ingin membuat program untuk menghitung nilai rata-rata siswa. Langkah pertama yang tepat dalam berpikir komputasional adalah...",
    options: [
      "Langsung menulis kode program",
      "Memecah masalah: input nilai, jumlah nilai, hitung rata-rata, tampilkan hasil",
      "Mencari aplikasi yang sudah ada",
      "Mengabaikan masalah karena terlalu sulit"
    ],
    answer: 1,
    explanation: "Langkah pertama adalah dekomposisi — memecah masalah menjadi bagian kecil: input → proses → output."
  },
  {
    id: 5,
    category: "Berpikir Komputasional",
    difficulty: "hard",
    type: "concept-guess",
    question: "Saya adalah kemampuan menemukan kesamaan atau keberulangan pola dalam data atau masalah. Dengan saya, programmer tidak perlu membuat solusi dari nol jika sudah pernah menemukan masalah serupa. Siapa saya?",
    answer: "pengenalan pola",
    acceptedAnswers: ["pattern recognition", "pengenalan pola dalam data"],
    explanation: "Pengenalan Pola (Pattern Recognition) adalah kemampuan menemukan kesamaan dan keberulangan dalam masalah atau data."
  },
  {
    id: 6,
    category: "Berpikir Komputasional",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Flowchart digunakan untuk...",
    options: [
      "Menyimpan data secara permanen",
      "Menggambarkan alur logika program secara visual",
      "Menghubungkan komputer ke internet",
      "Membuat desain tampilan website"
    ],
    answer: 1,
    explanation: "Flowchart adalah diagram yang menggambarkan alur logika atau proses dalam bentuk visual menggunakan simbol-simbol khusus."
  },
  {
    id: 7,
    category: "Berpikir Komputasional",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Simbol berbentuk belah ketupat (diamond) dalam flowchart melambangkan...",
    options: [
      "Proses/perhitungan",
      "Input atau Output",
      "Keputusan (percabangan kondisi)",
      "Awal atau Akhir program"
    ],
    answer: 2,
    explanation: "Simbol belah ketupat dalam flowchart digunakan untuk percabangan atau keputusan (decision), biasanya berisi pertanyaan Ya/Tidak."
  },

  // =============================================
  // ALGORITMA DAN PEMROGRAMAN
  // =============================================
  {
    id: 8,
    category: "Algoritma dan Pemrograman",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Apa yang dimaksud dengan variabel dalam pemrograman?",
    options: [
      "Sebuah rumus matematika",
      "Tempat penyimpanan data yang nilainya dapat berubah",
      "Nama sebuah program",
      "Perintah untuk mencetak teks"
    ],
    answer: 1,
    explanation: "Variabel adalah tempat penyimpanan data sementara dalam memori yang nilainya dapat berubah selama program berjalan."
  },
  {
    id: 9,
    category: "Algoritma dan Pemrograman",
    difficulty: "easy",
    type: "true-false",
    question: "Tipe data String digunakan untuk menyimpan angka yang dapat dihitung secara matematika.",
    options: ["Benar", "Salah"],
    answer: 1,
    explanation: "Salah! String digunakan untuk menyimpan teks/karakter. Untuk angka yang bisa dihitung digunakan tipe data Integer atau Float."
  },
  {
    id: 10,
    category: "Algoritma dan Pemrograman",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Perhatikan pseudocode berikut:\nx = 5\ny = 3\nz = x + y\ncetak(z)\n\nBerapakah nilai yang dicetak?",
    options: ["5", "3", "8", "53"],
    answer: 2,
    explanation: "x = 5 dan y = 3, maka z = x + y = 5 + 3 = 8. Program mencetak nilai z yaitu 8."
  },
  {
    id: 11,
    category: "Algoritma dan Pemrograman",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Struktur perulangan yang digunakan ketika kita sudah tahu berapa kali perulangan akan dilakukan adalah...",
    options: ["while loop", "do-while loop", "for loop", "if-else"],
    answer: 2,
    explanation: "For loop digunakan ketika jumlah perulangan sudah diketahui di awal. While loop digunakan ketika perulangan bergantung pada kondisi."
  },
  {
    id: 12,
    category: "Algoritma dan Pemrograman",
    difficulty: "hard",
    type: "multiple-choice",
    question: "Perhatikan algoritma berikut:\nx = 10\nif x > 5:\n  cetak('Besar')\nelse:\n  cetak('Kecil')\n\nApa yang akan dicetak?",
    options: ["Kecil", "Besar", "10", "Tidak ada output"],
    answer: 1,
    explanation: "Nilai x = 10, kondisi x > 5 adalah 10 > 5 = True, maka program masuk ke blok if dan mencetak 'Besar'."
  },
  {
    id: 13,
    category: "Algoritma dan Pemrograman",
    difficulty: "medium",
    type: "situation",
    question: "Rani membuat program yang seharusnya mencetak angka 1 sampai 10, tetapi programnya malah berjalan terus tanpa berhenti. Kemungkinan besar kesalahan yang terjadi adalah...",
    options: [
      "Variabel tidak didefinisikan",
      "Kondisi berhenti perulangan tidak pernah terpenuhi (infinite loop)",
      "Tipe data salah",
      "Nama fungsi salah"
    ],
    answer: 1,
    explanation: "Program yang berjalan terus tanpa berhenti disebut infinite loop. Ini terjadi ketika kondisi berhenti (stopping condition) tidak pernah menjadi False."
  },
  {
    id: 14,
    category: "Algoritma dan Pemrograman",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Proses menemukan dan memperbaiki kesalahan dalam program disebut...",
    options: ["Coding", "Debugging", "Compiling", "Testing"],
    answer: 1,
    explanation: "Debugging adalah proses mencari, menemukan, dan memperbaiki kesalahan (bug) dalam kode program."
  },
  {
    id: 15,
    category: "Algoritma dan Pemrograman",
    difficulty: "hard",
    type: "multi-select",
    question: "Pilih SEMUA yang termasuk tipe data dasar dalam pemrograman! (pilih lebih dari satu)",
    options: ["Integer (bilangan bulat)", "Float (bilangan desimal)", "Boolean (benar/salah)", "Flowchart", "String (teks)"],
    answer: [0, 1, 2, 4],
    explanation: "Tipe data dasar: Integer, Float, Boolean, dan String. Flowchart bukan tipe data, melainkan alat visualisasi algoritma."
  },
  {
    id: 16,
    category: "Algoritma dan Pemrograman",
    difficulty: "medium",
    type: "concept-guess",
    question: "Saya adalah blok kode yang dapat dipanggil berkali-kali dengan nama tertentu. Saya membantu programmer agar tidak menulis kode yang sama berulang-ulang. Siapa saya?",
    answer: "fungsi",
    acceptedAnswers: ["function", "prosedur", "subroutine", "subprogram", "procedure"],
    explanation: "Fungsi (function) adalah blok kode yang memiliki nama dan dapat dipanggil kapan saja dibutuhkan, sehingga kode lebih efisien dan terorganisir."
  },
  {
    id: 17,
    category: "Algoritma dan Pemrograman",
    difficulty: "hard",
    type: "ordering",
    question: "Urutkan tahapan dalam membuat program yang benar:",
    items: [
      "Analisis masalah",
      "Membuat algoritma/pseudocode",
      "Menulis kode program",
      "Testing dan debugging",
      "Dokumentasi"
    ],
    answer: [0, 1, 2, 3, 4],
    explanation: "Tahapan pembuatan program: Analisis → Algoritma → Koding → Testing/Debugging → Dokumentasi."
  },

  // =============================================
  // SISTEM KOMPUTER
  // =============================================
  {
    id: 18,
    category: "Sistem Komputer",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Fungsi utama dari sistem operasi adalah...",
    options: [
      "Mengedit gambar dan video",
      "Mengelola sumber daya perangkat keras dan perangkat lunak",
      "Menghubungkan komputer ke internet",
      "Membuat dokumen dan presentasi"
    ],
    answer: 1,
    explanation: "Sistem operasi (OS) bertugas mengelola sumber daya komputer seperti CPU, memori, penyimpanan, dan menjadi perantara antara pengguna dengan perangkat keras."
  },
  {
    id: 19,
    category: "Sistem Komputer",
    difficulty: "easy",
    type: "true-false",
    question: "RAM (Random Access Memory) menyimpan data secara permanen meskipun komputer dimatikan.",
    options: ["Benar", "Salah"],
    answer: 1,
    explanation: "Salah! RAM bersifat sementara (volatile). Data di RAM akan hilang ketika komputer dimatikan. Penyimpanan permanen menggunakan HDD atau SSD."
  },
  {
    id: 20,
    category: "Sistem Komputer",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Komponen utama komputer yang berfungsi sebagai 'otak' untuk memproses semua instruksi adalah...",
    options: ["RAM", "HDD", "CPU", "GPU"],
    answer: 2,
    explanation: "CPU (Central Processing Unit) adalah komponen utama yang memproses semua instruksi dan perhitungan dalam komputer."
  },
  {
    id: 21,
    category: "Sistem Komputer",
    difficulty: "medium",
    type: "multi-select",
    question: "Pilih SEMUA yang termasuk perangkat OUTPUT komputer! (pilih lebih dari satu)",
    options: ["Monitor", "Keyboard", "Printer", "Speaker", "Mouse"],
    answer: [0, 2, 3],
    explanation: "Perangkat output: Monitor (menampilkan gambar), Printer (mencetak), Speaker (mengeluarkan suara). Keyboard dan Mouse adalah perangkat input."
  },
  {
    id: 22,
    category: "Sistem Komputer",
    difficulty: "hard",
    type: "multiple-choice",
    question: "Apa perbedaan utama antara HDD dan SSD?",
    options: [
      "HDD lebih cepat dari SSD",
      "SSD menggunakan piringan magnetik, HDD menggunakan chip memori",
      "SSD lebih cepat dan tidak memiliki bagian bergerak, HDD menggunakan piringan magnetik",
      "HDD dan SSD adalah hal yang sama"
    ],
    answer: 2,
    explanation: "SSD (Solid State Drive) menggunakan chip memori flash sehingga lebih cepat dan tahan banting. HDD (Hard Disk Drive) menggunakan piringan magnetik yang berputar."
  },
  {
    id: 23,
    category: "Sistem Komputer",
    difficulty: "easy",
    type: "concept-guess",
    question: "Saya adalah jenis perangkat lunak yang tidak dapat dilihat atau disentuh. Saya adalah program yang memberikan instruksi kepada perangkat keras agar dapat bekerja. Siapa saya?",
    answer: "perangkat lunak",
    acceptedAnswers: ["software"],
    explanation: "Perangkat lunak (software) adalah program atau instruksi yang mengatur cara kerja perangkat keras komputer."
  },
  {
    id: 24,
    category: "Sistem Komputer",
    difficulty: "medium",
    type: "situation",
    question: "Komputer Budi sering terasa lambat ketika membuka banyak aplikasi sekaligus. Komponen apa yang kemungkinan besar perlu ditingkatkan?",
    options: [
      "Monitor",
      "Keyboard",
      "RAM",
      "Printer"
    ],
    answer: 2,
    explanation: "RAM yang kecil menyebabkan komputer lambat ketika membuka banyak aplikasi. Menambah RAM akan meningkatkan kemampuan multitasking komputer."
  },

  // =============================================
  // JARINGAN KOMPUTER
  // =============================================
  {
    id: 25,
    category: "Jaringan Komputer",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Jaringan komputer yang menghubungkan perangkat dalam area terbatas seperti satu ruangan atau satu gedung disebut...",
    options: ["WAN", "LAN", "MAN", "Internet"],
    answer: 1,
    explanation: "LAN (Local Area Network) adalah jaringan yang menghubungkan komputer dalam area terbatas seperti rumah, sekolah, atau satu gedung."
  },
  {
    id: 26,
    category: "Jaringan Komputer",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Perangkat yang digunakan untuk menghubungkan beberapa jaringan yang berbeda dan mengarahkan paket data adalah...",
    options: ["Switch", "Hub", "Router", "Modem"],
    answer: 2,
    explanation: "Router adalah perangkat yang menghubungkan beberapa jaringan berbeda dan menentukan jalur terbaik untuk mengirimkan paket data."
  },
  {
    id: 27,
    category: "Jaringan Komputer",
    difficulty: "medium",
    type: "true-false",
    question: "IP Address adalah alamat unik yang diberikan kepada setiap perangkat yang terhubung dalam jaringan.",
    options: ["Benar", "Salah"],
    answer: 0,
    explanation: "Benar! IP Address (Internet Protocol Address) adalah identitas unik setiap perangkat dalam jaringan, seperti alamat rumah di dunia nyata."
  },
  {
    id: 28,
    category: "Jaringan Komputer",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Perangkat yang mengubah sinyal digital dari komputer menjadi sinyal analog untuk dikirim melalui kabel telepon adalah...",
    options: ["Router", "Switch", "Hub", "Modem"],
    answer: 3,
    explanation: "Modem (Modulator-Demodulator) mengubah sinyal digital menjadi analog (modulasi) dan sebaliknya (demodulasi) untuk transmisi data."
  },
  {
    id: 29,
    category: "Jaringan Komputer",
    difficulty: "hard",
    type: "multiple-choice",
    question: "Bandwidth 100 Mbps berarti...",
    options: [
      "Kecepatan transfer data maksimum 100 Megabyte per detik",
      "Kecepatan transfer data maksimum 100 Megabit per detik",
      "Kapasitas penyimpanan 100 Megabyte",
      "Frekuensi sinyal 100 Megahertz"
    ],
    answer: 1,
    explanation: "Bandwidth 100 Mbps = 100 Megabit per detik (bukan Megabyte). 1 Byte = 8 bit, jadi 100 Mbps ≈ 12.5 MB/s kecepatan transfer nyata."
  },
  {
    id: 30,
    category: "Jaringan Komputer",
    difficulty: "medium",
    type: "concept-guess",
    question: "Saya adalah jaringan global yang menghubungkan jutaan komputer dan perangkat di seluruh dunia menggunakan protokol TCP/IP. Hampir semua orang menggunakan saya setiap hari untuk mengakses informasi. Siapa saya?",
    answer: "internet",
    acceptedAnswers: ["internet global", "jaringan internet", "the internet"],
    explanation: "Internet adalah jaringan komputer global yang menghubungkan miliaran perangkat menggunakan protokol standar TCP/IP."
  },
  {
    id: 31,
    category: "Jaringan Komputer",
    difficulty: "hard",
    type: "multi-select",
    question: "Pilih SEMUA yang merupakan perangkat jaringan komputer! (pilih lebih dari satu)",
    options: ["Router", "Switch", "RAM", "Access Point", "Modem"],
    answer: [0, 1, 3, 4],
    explanation: "Perangkat jaringan: Router, Switch, Access Point, Modem. RAM adalah komponen internal komputer, bukan perangkat jaringan."
  },

  // =============================================
  // INTERNET DAN KEAMANAN DIGITAL
  // =============================================
  {
    id: 32,
    category: "Internet dan Keamanan Digital",
    difficulty: "easy",
    type: "situation",
    question: "Kamu menerima email yang mengaku dari bank, meminta kamu mengklik link dan memasukkan password akun. Email ini terlihat resmi. Tindakan yang paling aman adalah...",
    options: [
      "Langsung klik link dan masukkan password",
      "Forward email ke teman",
      "Abaikan email, hubungi bank langsung melalui nomor resmi untuk konfirmasi",
      "Balas email dengan password kamu"
    ],
    answer: 2,
    explanation: "Ini adalah serangan phishing! Jangan pernah mengklik link mencurigakan. Selalu hubungi bank atau lembaga resmi melalui saluran resmi yang kamu ketahui sebelumnya."
  },
  {
    id: 33,
    category: "Internet dan Keamanan Digital",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Apa yang dimaksud dengan phishing?",
    options: [
      "Cara memancing ikan menggunakan internet",
      "Serangan siber dengan cara mengelabui korban untuk memberikan informasi sensitif",
      "Program untuk mempercepat internet",
      "Teknik pemrograman web"
    ],
    answer: 1,
    explanation: "Phishing adalah serangan siber di mana penyerang berpura-pura menjadi pihak terpercaya untuk mencuri informasi sensitif seperti password atau data kartu kredit."
  },
  {
    id: 34,
    category: "Internet dan Keamanan Digital",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Password yang paling kuat di antara pilihan berikut adalah...",
    options: [
      "123456",
      "namakamu",
      "K3am@nan#2024!",
      "password"
    ],
    answer: 2,
    explanation: "Password kuat harus mengandung huruf besar, huruf kecil, angka, dan karakter khusus, serta minimal 8 karakter. K3am@nan#2024! memenuhi semua kriteria tersebut."
  },
  {
    id: 35,
    category: "Internet dan Keamanan Digital",
    difficulty: "medium",
    type: "true-false",
    question: "Menggunakan Wi-Fi publik tanpa VPN untuk melakukan transaksi perbankan online adalah hal yang aman.",
    options: ["Benar", "Salah"],
    answer: 1,
    explanation: "Salah! Wi-Fi publik rentan terhadap serangan man-in-the-middle. Hindari transaksi sensitif di jaringan publik, atau gunakan VPN jika terpaksa."
  },
  {
    id: 36,
    category: "Internet dan Keamanan Digital",
    difficulty: "hard",
    type: "multiple-choice",
    question: "Malware jenis apa yang mengenkripsi file korban dan meminta tebusan untuk mendekripsinya?",
    options: ["Virus", "Spyware", "Ransomware", "Adware"],
    answer: 2,
    explanation: "Ransomware adalah malware yang mengenkripsi data korban dan meminta pembayaran tebusan (ransom) untuk memulihkan akses ke data tersebut."
  },
  {
    id: 37,
    category: "Internet dan Keamanan Digital",
    difficulty: "easy",
    type: "concept-guess",
    question: "Saya adalah lapisan keamanan tambahan yang meminta verifikasi kedua selain password, misalnya kode OTP yang dikirim ke HP. Siapa saya?",
    answer: "autentikasi dua faktor",
    acceptedAnswers: ["2fa", "two-factor authentication", "two factor authentication", "autentikasi 2 faktor", "verifikasi dua langkah", "verifikasi dua faktor", "two factor auth"],
    explanation: "Autentikasi Dua Faktor (2FA/Two-Factor Authentication) adalah lapisan keamanan tambahan yang membutuhkan dua bentuk verifikasi sebelum akses diberikan."
  },
  {
    id: 38,
    category: "Internet dan Keamanan Digital",
    difficulty: "medium",
    type: "situation",
    question: "Seseorang mengaku sebagai teknisi IT sekolah dan menelepon Andi, meminta username dan password akun sekolah Andi 'untuk keperluan maintenance'. Ini kemungkinan adalah serangan...",
    options: [
      "DDoS Attack",
      "Social Engineering",
      "SQL Injection",
      "Ransomware"
    ],
    answer: 1,
    explanation: "Social Engineering adalah manipulasi psikologis untuk mengelabui orang agar memberikan informasi rahasia. Teknisi IT yang sah tidak pernah meminta password pengguna."
  },
  {
    id: 39,
    category: "Internet dan Keamanan Digital",
    difficulty: "medium",
    type: "multi-select",
    question: "Pilih SEMUA praktik keamanan digital yang BAIK! (pilih lebih dari satu)",
    options: [
      "Menggunakan password yang sama untuk semua akun",
      "Memperbarui software secara rutin",
      "Tidak mengklik link mencurigakan",
      "Mengaktifkan autentikasi dua faktor",
      "Membagikan password kepada teman baik"
    ],
    answer: [1, 2, 3],
    explanation: "Praktik keamanan yang baik: update software rutin, tidak klik link mencurigakan, aktifkan 2FA. Menggunakan password sama dan berbagi password adalah praktik berbahaya."
  },

  // =============================================
  // ANALISIS DATA
  // =============================================
  {
    id: 40,
    category: "Analisis Data",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Apa perbedaan antara data dan informasi?",
    options: [
      "Data dan informasi adalah hal yang sama",
      "Data adalah fakta mentah/belum diolah, informasi adalah data yang sudah diolah dan bermakna",
      "Informasi adalah fakta mentah, data adalah hasil olahan",
      "Data hanya berupa angka, informasi hanya berupa teks"
    ],
    answer: 1,
    explanation: "Data adalah fakta mentah yang belum diolah (misal: angka 85, 70, 90). Informasi adalah data yang sudah diolah sehingga bermakna (misal: nilai rata-rata kelas adalah 81.67)."
  },
  {
    id: 41,
    category: "Analisis Data",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Jenis grafik yang paling tepat untuk menampilkan perubahan data dari waktu ke waktu adalah...",
    options: [
      "Grafik Batang",
      "Grafik Pie/Lingkaran",
      "Grafik Garis",
      "Tabel"
    ],
    answer: 2,
    explanation: "Grafik Garis (Line Chart) paling cocok untuk menampilkan tren atau perubahan data sepanjang waktu karena memperlihatkan kesinambungan antar titik data."
  },
  {
    id: 42,
    category: "Analisis Data",
    difficulty: "medium",
    type: "situation",
    question: "Guru ingin menampilkan persentase nilai A, B, C, D, dan E dari total siswa. Jenis visualisasi yang paling tepat adalah...",
    options: [
      "Grafik Garis",
      "Grafik Pie/Lingkaran",
      "Scatter Plot",
      "Histogram"
    ],
    answer: 1,
    explanation: "Grafik Pie (Lingkaran) paling tepat untuk menampilkan proporsi atau persentase dari keseluruhan data karena setiap bagian mewakili porsi dari total 100%."
  },
  {
    id: 43,
    category: "Analisis Data",
    difficulty: "hard",
    type: "multiple-choice",
    question: "Data nilai ulangan 5 siswa: 70, 80, 85, 90, 75. Berapakah nilai rata-rata (mean)?",
    options: ["80", "82", "85", "80"],
    answer: 0,
    explanation: "Rata-rata = (70+80+85+90+75) ÷ 5 = 400 ÷ 5 = 80."
  },
  {
    id: 44,
    category: "Analisis Data",
    difficulty: "easy",
    type: "true-false",
    question: "Spreadsheet seperti Microsoft Excel dapat digunakan untuk menganalisis dan memvisualisasikan data.",
    options: ["Benar", "Salah"],
    answer: 0,
    explanation: "Benar! Spreadsheet seperti Excel memiliki fitur lengkap untuk analisis data termasuk rumus, pivot table, dan pembuatan berbagai jenis grafik."
  },

  // =============================================
  // DAMPAK SOSIAL INFORMATIKA
  // =============================================
  {
    id: 45,
    category: "Dampak Sosial Informatika",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Cyberbullying adalah...",
    options: [
      "Permainan game online yang menyenangkan",
      "Intimidasi, pelecehan, atau perundungan yang terjadi melalui media digital",
      "Cara belajar menggunakan komputer",
      "Program antivirus"
    ],
    answer: 1,
    explanation: "Cyberbullying adalah perilaku perundungan, intimidasi, atau pelecehan yang dilakukan melalui media digital seperti media sosial, pesan teks, atau forum online."
  },
  {
    id: 46,
    category: "Dampak Sosial Informatika",
    difficulty: "medium",
    type: "situation",
    question: "Kamu melihat postingan berita mengejutkan di media sosial. Sebelum membagikan (share) berita tersebut, hal yang paling tepat untuk dilakukan adalah...",
    options: [
      "Langsung share agar teman-teman tahu",
      "Verifikasi kebenaran berita melalui sumber terpercaya terlebih dahulu",
      "Like dan comment dulu baru share",
      "Tidak perlu dicek karena sudah viral"
    ],
    answer: 1,
    explanation: "Sebelum membagikan berita, selalu verifikasi kebenarannya melalui sumber terpercaya. Menyebarkan hoaks dapat merugikan banyak pihak dan melanggar hukum."
  },
  {
    id: 47,
    category: "Dampak Sosial Informatika",
    difficulty: "easy",
    type: "true-false",
    question: "Mengunduh film atau musik berbayar secara ilegal tanpa izin dari pembuatnya melanggar hak cipta.",
    options: ["Benar", "Salah"],
    answer: 0,
    explanation: "Benar! Mengunduh konten berbayar tanpa izin adalah pelanggaran hak cipta (copyright) yang dapat dikenakan sanksi hukum."
  },
  {
    id: 48,
    category: "Dampak Sosial Informatika",
    difficulty: "medium",
    type: "concept-guess",
    question: "Saya adalah informasi yang tidak benar atau menyesatkan yang disebarkan, seringkali secara sengaja, melalui internet dan media sosial. Saya dapat menyebabkan kepanikan dan perpecahan di masyarakat. Siapa saya?",
    answer: "hoaks",
    acceptedAnswers: ["hoax", "berita hoaks", "berita hoax", "informasi hoaks", "disinformasi"],
    explanation: "Hoaks (hoax) adalah informasi palsu atau menyesatkan yang sengaja disebarkan. Di era digital, hoaks dapat menyebar sangat cepat melalui media sosial."
  },
  {
    id: 49,
    category: "Dampak Sosial Informatika",
    difficulty: "hard",
    type: "multiple-choice",
    question: "Apa yang dimaksud dengan 'jejak digital'?",
    options: [
      "Bekas kaki yang tersimpan di komputer",
      "Data yang tersimpan tentang aktivitas online seseorang",
      "Tanda tangan elektronik",
      "Rekam jejak criminal di internet"
    ],
    answer: 1,
    explanation: "Jejak digital adalah kumpulan data yang tersimpan tentang aktivitas online seseorang, seperti riwayat browsing, postingan media sosial, dan data transaksi online."
  },
  {
    id: 50,
    category: "Dampak Sosial Informatika",
    difficulty: "medium",
    type: "multi-select",
    question: "Pilih SEMUA yang termasuk etika digital yang baik! (pilih lebih dari satu)",
    options: [
      "Menghormati privasi orang lain",
      "Menyebarkan informasi tanpa verifikasi",
      "Tidak melakukan plagiarisme",
      "Menggunakan kata-kata sopan di internet",
      "Membuat akun palsu untuk memata-matai"
    ],
    answer: [0, 2, 3],
    explanation: "Etika digital yang baik: menghormati privasi, tidak plagiarisme, berkomunikasi dengan sopan. Menyebarkan info tak terverifikasi dan membuat akun palsu adalah pelanggaran etika digital."
  },

  // =============================================
  // REPRESENTASI DATA
  // =============================================
  {
    id: 51,
    category: "Representasi Data",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Satuan terkecil dalam penyimpanan data komputer adalah...",
    options: ["Byte", "Kilobyte", "Bit", "Megabyte"],
    answer: 2,
    explanation: "Bit (binary digit) adalah satuan terkecil data komputer. 1 bit hanya bernilai 0 atau 1. 8 bit = 1 Byte."
  },
  {
    id: 52,
    category: "Representasi Data",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Berapa bit dalam 1 Byte?",
    options: ["4 bit", "8 bit", "16 bit", "32 bit"],
    answer: 1,
    explanation: "1 Byte = 8 bit. Ini adalah standar yang digunakan secara universal dalam penyimpanan dan pemrosesan data digital."
  },
  {
    id: 53,
    category: "Representasi Data",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Bilangan biner 1010 jika dikonversi ke desimal adalah...",
    options: ["8", "10", "12", "15"],
    answer: 1,
    explanation: "1010 dalam biner = (1×8) + (0×4) + (1×2) + (0×1) = 8 + 0 + 2 + 0 = 10 dalam desimal."
  },
  {
    id: 54,
    category: "Representasi Data",
    difficulty: "hard",
    type: "multiple-choice",
    question: "Angka desimal 13 dalam bilangan biner adalah...",
    options: ["1011", "1100", "1101", "1110"],
    answer: 2,
    explanation: "13 dalam biner: 13 = 8+4+1 = 1101. (1×8) + (1×4) + (0×2) + (1×1) = 8+4+0+1 = 13."
  },
  {
    id: 55,
    category: "Representasi Data",
    difficulty: "medium",
    type: "true-false",
    question: "1 Kilobyte (KB) sama dengan 1000 Byte.",
    options: ["Benar", "Salah"],
    answer: 1,
    explanation: "Secara teknis komputer, 1 KB = 1024 Byte (bukan 1000). Ini karena komputer menggunakan sistem biner (basis 2), dan 2^10 = 1024."
  },
  {
    id: 56,
    category: "Representasi Data",
    difficulty: "easy",
    type: "concept-guess",
    question: "Saya adalah sistem bilangan yang hanya menggunakan dua angka: 0 dan 1. Komputer menggunakan saya karena transistor hanya memiliki dua keadaan: hidup dan mati. Siapa saya?",
    answer: "biner",
    acceptedAnswers: ["binary", "sistem biner", "bilangan biner", "sistem bilangan biner", "sistem bilangan binary"],
    explanation: "Sistem bilangan biner (binary) menggunakan basis 2 dengan digit 0 dan 1. Semua data dalam komputer pada dasarnya direpresentasikan dalam bentuk biner."
  },

  // =============================================
  // AI DAN TEKNOLOGI MODERN
  // =============================================
  {
    id: 57,
    category: "AI dan Teknologi Modern",
    difficulty: "easy",
    type: "multiple-choice",
    question: "AI (Artificial Intelligence) atau Kecerdasan Buatan adalah...",
    options: [
      "Robot yang dapat berjalan",
      "Kemampuan mesin untuk meniru kecerdasan manusia",
      "Program antivirus canggih",
      "Jaringan internet yang sangat cepat"
    ],
    answer: 1,
    explanation: "AI adalah bidang ilmu komputer yang bertujuan membuat mesin mampu melakukan tugas yang membutuhkan kecerdasan manusia, seperti pengenalan gambar, pemrosesan bahasa alami, dan pengambilan keputusan."
  },
  {
    id: 58,
    category: "AI dan Teknologi Modern",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Machine Learning adalah teknik AI di mana komputer...",
    options: [
      "Diprogram secara manual untuk setiap kemungkinan situasi",
      "Belajar dari data untuk meningkatkan kinerjanya tanpa diprogram secara eksplisit",
      "Menggunakan internet untuk mencari jawaban",
      "Meniru gerakan manusia"
    ],
    answer: 1,
    explanation: "Machine Learning memungkinkan komputer belajar dari data secara otomatis dan meningkatkan performanya seiring waktu tanpa harus diprogram ulang untuk setiap kasus baru."
  },
  {
    id: 59,
    category: "AI dan Teknologi Modern",
    difficulty: "medium",
    type: "situation",
    question: "Adi menggunakan AI untuk mengerjakan tugas esainya dan mengumpulkannya sebagai hasil karyanya sendiri tanpa menyebutkan penggunaan AI. Dari sudut pandang etika digital, tindakan ini...",
    options: [
      "Diperbolehkan karena menggunakan teknologi modern",
      "Bermasalah karena termasuk kecurangan akademik dan tidak jujur",
      "Tidak masalah selama tidak ketahuan",
      "Sangat dianjurkan agar menghemat waktu"
    ],
    answer: 1,
    explanation: "Menggunakan AI untuk tugas tanpa pengungkapan adalah kecurangan akademik. Penggunaan AI yang etis mengharuskan transparansi dan tetap mengembangkan kemampuan diri sendiri."
  },
  {
    id: 60,
    category: "AI dan Teknologi Modern",
    difficulty: "hard",
    type: "multiple-choice",
    question: "Generative AI seperti ChatGPT atau Gemini dapat membuat konten baru berdasarkan pelatihan data yang ada. Salah satu risiko penggunaannya adalah...",
    options: [
      "Koneksi internet menjadi lambat",
      "Dapat menghasilkan informasi yang salah (hallucination) yang terlihat meyakinkan",
      "Menghemat banyak waktu",
      "Membuat program komputer lebih cepat"
    ],
    answer: 1,
    explanation: "AI Generatif dapat mengalami 'hallucination' — menghasilkan informasi yang salah namun terdengar meyakinkan. Pengguna harus selalu memverifikasi output AI dari sumber terpercaya."
  },
  {
    id: 61,
    category: "AI dan Teknologi Modern",
    difficulty: "easy",
    type: "true-false",
    question: "Asisten virtual seperti Siri, Google Assistant, dan Alexa adalah contoh penerapan AI dalam kehidupan sehari-hari.",
    options: ["Benar", "Salah"],
    answer: 0,
    explanation: "Benar! Asisten virtual menggunakan AI, khususnya Natural Language Processing (NLP), untuk memahami perintah suara dan memberikan respons yang relevan."
  },
  {
    id: 62,
    category: "AI dan Teknologi Modern",
    difficulty: "medium",
    type: "multi-select",
    question: "Pilih SEMUA yang merupakan contoh penerapan AI dalam kehidupan sehari-hari! (pilih lebih dari satu)",
    options: [
      "Rekomendasi video di YouTube",
      "Filter spam email",
      "Saklar lampu biasa",
      "Pengenalan wajah di smartphone",
      "Navigasi GPS"
    ],
    answer: [0, 1, 3, 4],
    explanation: "Penerapan AI: rekomendasi YouTube (recommendation system), filter spam (classification), pengenalan wajah (computer vision), GPS/navigasi (routing algorithm). Saklar lampu biasa tidak menggunakan AI."
  },

  // =============================================
  // SOAL TAMBAHAN - BERPIKIR KOMPUTASIONAL
  // =============================================
  {
    id: 63,
    category: "Berpikir Komputasional",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Pseudocode adalah...",
    options: [
      "Kode program yang tidak bisa dijalankan karena ada error",
      "Bahasa pemrograman khusus untuk pemula",
      "Penulisan algoritma menggunakan bahasa manusia yang menyerupai kode program",
      "Kode rahasia untuk melindungi program"
    ],
    answer: 2,
    explanation: "Pseudocode adalah cara penulisan algoritma menggunakan bahasa sehari-hari yang terstruktur seperti kode program. Digunakan untuk merencanakan logika sebelum menulis kode sebenarnya."
  },
  {
    id: 64,
    category: "Berpikir Komputasional",
    difficulty: "hard",
    type: "situation",
    question: "Seorang programmer harus membuat program untuk menghitung gaji 1000 karyawan dengan rumus yang sama. Konsep berpikir komputasional yang paling tepat diterapkan adalah...",
    options: [
      "Abstraksi: Fokus hanya pada satu karyawan, buat rumus umum, terapkan ke semua",
      "Membuat 1000 program berbeda untuk setiap karyawan",
      "Mengabaikan detail dan menebak hasilnya",
      "Meminta orang lain menghitung secara manual"
    ],
    answer: 0,
    explanation: "Abstraksi dan pengenalan pola membantu programmer membuat satu rumus umum yang dapat diterapkan ke semua karyawan. Dikombinasikan dengan perulangan (loop), solusi menjadi efisien."
  },

  // =============================================
  // SOAL TAMBAHAN - ALGORITMA DAN PEMROGRAMAN
  // =============================================
  {
    id: 65,
    category: "Algoritma dan Pemrograman",
    difficulty: "medium",
    type: "ordering",
    question: "Urutkan langkah membuat program 'Hitung Rata-rata 3 Angka' yang benar:",
    items: [
      "Mulai",
      "Input 3 angka (a, b, c)",
      "Hitung rata = (a + b + c) / 3",
      "Tampilkan rata",
      "Selesai"
    ],
    answer: [0, 1, 2, 3, 4],
    explanation: "Algoritma selalu dimulai dari Mulai, lalu Input data, Proses (perhitungan), Output (tampilkan), dan diakhiri Selesai."
  },
  {
    id: 66,
    category: "Algoritma dan Pemrograman",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Manakah yang merupakan contoh struktur percabangan (conditional)?",
    options: [
      "for i in range(10):",
      "while x > 0:",
      "if nilai >= 75: cetak('Lulus')",
      "def hitung_rata():"
    ],
    answer: 2,
    explanation: "Percabangan (conditional) menggunakan kata kunci if/else untuk mengeksekusi kode berdasarkan kondisi tertentu. 'if nilai >= 75' adalah contoh percabangan."
  },
  {
    id: 67,
    category: "Algoritma dan Pemrograman",
    difficulty: "hard",
    type: "multiple-choice",
    question: "Apa output dari algoritma berikut?\nx = 1\nwhile x <= 5:\n  cetak(x)\n  x = x + 2",
    options: ["1 2 3 4 5", "1 3 5", "2 4", "1 3 5 7"],
    answer: 1,
    explanation: "x dimulai dari 1. Setiap iterasi x ditambah 2. Jadi x berurutan: 1 → 3 → 5 → 7 (berhenti karena 7>5). Output: 1, 3, 5."
  },

  // =============================================
  // SOAL TAMBAHAN - SISTEM KOMPUTER
  // =============================================
  {
    id: 68,
    category: "Sistem Komputer",
    difficulty: "medium",
    type: "ordering",
    question: "Urutkan hierarki penyimpanan dari yang tercepat ke terlambat:",
    items: [
      "Register CPU",
      "Cache Memory",
      "RAM",
      "SSD/HDD"
    ],
    answer: [0, 1, 2, 3],
    explanation: "Hierarki penyimpanan: Register (tercepat) → Cache → RAM → SSD/HDD (terlambat). Semakin cepat, semakin kecil kapasitasnya dan semakin mahal harganya."
  },
  {
    id: 69,
    category: "Sistem Komputer",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Contoh sistem operasi yang banyak digunakan pada komputer adalah...",
    options: [
      "Microsoft Word, Excel, PowerPoint",
      "Windows, macOS, Linux",
      "Chrome, Firefox, Safari",
      "Photoshop, CorelDraw, Illustrator"
    ],
    answer: 1,
    explanation: "Windows, macOS, dan Linux adalah sistem operasi. Microsoft Office adalah aplikasi produktivitas, browser adalah aplikasi internet, dan yang terakhir adalah aplikasi desain grafis."
  },
  {
    id: 70,
    category: "Sistem Komputer",
    difficulty: "hard",
    type: "concept-guess",
    question: "Saya adalah program kecil yang berjalan di latar belakang sistem operasi dan menghubungkan perangkat keras dengan sistem operasi. Tanpa saya, sistem operasi tidak bisa berkomunikasi dengan perangkat keras seperti printer atau kartu grafis. Siapa saya?",
    answer: "driver",
    acceptedAnswers: ["device driver", "driver perangkat", "driver perangkat keras", "driver hardware"],
    explanation: "Driver (device driver) adalah program yang menjadi penghubung antara sistem operasi dengan perangkat keras. Setiap perangkat keras membutuhkan driver agar dapat berfungsi."
  },

  // =============================================
  // SOAL TAMBAHAN - JARINGAN KOMPUTER
  // =============================================
  {
    id: 71,
    category: "Jaringan Komputer",
    difficulty: "medium",
    type: "situation",
    question: "Sekolah ingin menghubungkan 30 komputer di laboratorium agar bisa berbagi file dan printer. Jenis jaringan yang paling tepat adalah...",
    options: ["WAN", "LAN", "Internet", "MAN"],
    answer: 1,
    explanation: "LAN (Local Area Network) adalah solusi tepat untuk menghubungkan perangkat dalam area terbatas seperti laboratorium komputer sekolah."
  },
  {
    id: 72,
    category: "Jaringan Komputer",
    difficulty: "hard",
    type: "multiple-choice",
    question: "Protocol HTTP dan HTTPS memiliki perbedaan utama yaitu...",
    options: [
      "HTTP lebih cepat dari HTTPS",
      "HTTPS mengenkripsi data yang dikirim sehingga lebih aman",
      "HTTP hanya untuk gambar, HTTPS untuk teks",
      "HTTPS membutuhkan koneksi internet lebih cepat"
    ],
    answer: 1,
    explanation: "HTTPS (Hypertext Transfer Protocol Secure) menggunakan enkripsi SSL/TLS untuk mengamankan data yang dikirim antara browser dan server, mencegah penyadapan."
  },
  {
    id: 73,
    category: "Jaringan Komputer",
    difficulty: "easy",
    type: "true-false",
    question: "Wi-Fi adalah teknologi jaringan nirkabel (tanpa kabel) yang menggunakan gelombang radio untuk menghubungkan perangkat.",
    options: ["Benar", "Salah"],
    answer: 0,
    explanation: "Benar! Wi-Fi (Wireless Fidelity) adalah teknologi jaringan nirkabel yang menggunakan gelombang radio pada frekuensi 2.4 GHz atau 5 GHz."
  },

  // =============================================
  // SOAL TAMBAHAN - INTERNET DAN KEAMANAN DIGITAL
  // =============================================
  {
    id: 74,
    category: "Internet dan Keamanan Digital",
    difficulty: "hard",
    type: "multiple-choice",
    question: "Apa yang dimaksud dengan enkripsi data?",
    options: [
      "Menghapus data secara permanen",
      "Mengubah data menjadi format yang tidak dapat dibaca tanpa kunci khusus",
      "Menyalin data ke cloud",
      "Mempercepat transfer data"
    ],
    answer: 1,
    explanation: "Enkripsi adalah proses mengubah data menjadi format tersandi (ciphertext) yang hanya dapat dibaca kembali dengan kunci dekripsi yang tepat."
  },
  {
    id: 75,
    category: "Internet dan Keamanan Digital",
    difficulty: "medium",
    type: "ordering",
    question: "Urutkan tindakan yang benar ketika menemukan konten cyberbullying di media sosial:",
    items: [
      "Jangan ikut berkomentar atau meneruskan konten",
      "Screenshot sebagai bukti",
      "Laporkan konten ke platform",
      "Ceritakan kepada orang dewasa/guru yang dipercaya"
    ],
    answer: [0, 1, 2, 3],
    explanation: "Langkah menghadapi cyberbullying: Tidak ikut terlibat → Kumpulkan bukti → Laporkan ke platform → Minta bantuan orang dewasa."
  },

  // =============================================
  // SOAL TAMBAHAN - ANALISIS DATA
  // =============================================
  {
    id: 76,
    category: "Analisis Data",
    difficulty: "hard",
    type: "multiple-choice",
    question: "Proses mengumpulkan, membersihkan, menganalisis, dan menafsirkan data untuk pengambilan keputusan disebut...",
    options: [
      "Data Mining",
      "Data Science",
      "Database",
      "Data Analisis"
    ],
    answer: 3,
    explanation: "Analisis Data adalah proses sistematis mengumpulkan, membersihkan, menganalisis, dan menginterpretasikan data untuk menemukan pola dan mendukung pengambilan keputusan."
  },
  {
    id: 77,
    category: "Analisis Data",
    difficulty: "medium",
    type: "true-false",
    question: "Semakin besar sampel data yang digunakan dalam analisis, semakin akurat kesimpulan yang dapat diambil.",
    options: ["Benar", "Salah"],
    answer: 0,
    explanation: "Umumnya benar! Sampel yang lebih besar memberikan hasil yang lebih representatif dan mengurangi margin of error dalam analisis statistik."
  },

  // =============================================
  // SOAL TAMBAHAN - REPRESENTASI DATA
  // =============================================
  {
    id: 78,
    category: "Representasi Data",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Warna pada layar komputer direpresentasikan menggunakan sistem RGB. 'R', 'G', 'B' singkatan dari...",
    options: [
      "Red, Green, Blue",
      "Round, Graph, Binary",
      "Resolution, Grade, Brightness",
      "Red, Grey, Black"
    ],
    answer: 0,
    explanation: "RGB adalah sistem warna yang terdiri dari Red (Merah), Green (Hijau), dan Blue (Biru). Setiap warna dapat memiliki nilai 0-255, menghasilkan lebih dari 16 juta kombinasi warna."
  },
  {
    id: 79,
    category: "Representasi Data",
    difficulty: "hard",
    type: "multiple-choice",
    question: "Format file gambar yang menggunakan kompresi tanpa kehilangan kualitas (lossless) adalah...",
    options: ["JPEG", "PNG", "MP4", "MP3"],
    answer: 1,
    explanation: "PNG (Portable Network Graphics) menggunakan kompresi lossless sehingga kualitas gambar tidak berkurang. JPEG menggunakan kompresi lossy yang dapat mengurangi kualitas gambar."
  },

  // =============================================
  // SOAL TAMBAHAN CAMPURAN
  // =============================================
  {
    id: 80,
    category: "Sistem Komputer",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Ketika kamu menyimpan file dengan menekan Ctrl+S, file tersebut disimpan di...",
    options: [
      "RAM (hilang jika komputer mati)",
      "CPU (diproses lagi)",
      "Storage/penyimpanan permanen (HDD/SSD)",
      "Cache memory"
    ],
    answer: 2,
    explanation: "Ctrl+S menyimpan file ke storage permanen (HDD/SSD). Sebelum disimpan, file hanya ada di RAM dan akan hilang jika listrik padam atau komputer dimatikan."
  },
  {
    id: 81,
    category: "Algoritma dan Pemrograman",
    difficulty: "easy",
    type: "true-false",
    question: "Komentar dalam kode program (dimulai dengan // atau #) akan dieksekusi oleh komputer sebagai perintah.",
    options: ["Benar", "Salah"],
    answer: 1,
    explanation: "Salah! Komentar diabaikan oleh compiler/interpreter. Komentar hanya untuk membantu programmer memahami kode, bukan instruksi untuk komputer."
  },
  {
    id: 82,
    category: "Jaringan Komputer",
    difficulty: "medium",
    type: "concept-guess",
    question: "Saya adalah aturan atau standar yang mengatur bagaimana data dikirim dan diterima melalui jaringan komputer. Tanpa saya, komputer dari merek berbeda tidak bisa berkomunikasi satu sama lain. Siapa saya?",
    answer: "protokol",
    acceptedAnswers: ["protocol", "protokol jaringan", "protokol komunikasi", "network protocol"],
    explanation: "Protokol jaringan adalah aturan standar komunikasi data antar perangkat. Contoh: TCP/IP, HTTP, FTP, SMTP."
  },
  {
    id: 83,
    category: "AI dan Teknologi Modern",
    difficulty: "hard",
    type: "situation",
    question: "Sebuah sistem AI dilatih untuk mengenali wajah kriminal, tetapi data pelatihannya sebagian besar berasal dari satu kelompok etnis. Masalah yang mungkin terjadi adalah...",
    options: [
      "Sistem akan bekerja lebih cepat",
      "Sistem bisa bersifat bias dan tidak akurat untuk kelompok etnis lain",
      "Sistem akan lebih hemat energi",
      "Tidak ada masalah"
    ],
    answer: 1,
    explanation: "AI bias terjadi ketika data pelatihan tidak representatif. Sistem AI yang dilatih pada data tidak seimbang dapat menghasilkan keputusan yang diskriminatif terhadap kelompok yang kurang terwakili."
  },
  {
    id: 84,
    category: "Dampak Sosial Informatika",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Plagiarisme digital adalah...",
    options: [
      "Menyalin karya orang lain secara digital dan mengaku sebagai karyamu sendiri tanpa izin",
      "Membuat salinan backup file penting",
      "Menggunakan komputer untuk belajar",
      "Berbagi file dengan teman"
    ],
    answer: 0,
    explanation: "Plagiarisme digital adalah mengambil karya orang lain (teks, gambar, kode, dll) dari internet dan mengaku sebagai karya sendiri tanpa izin atau atribusi yang tepat."
  },
  {
    id: 85,
    category: "Berpikir Komputasional",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Manakah yang merupakan contoh penerapan algoritma dalam kehidupan sehari-hari?",
    options: [
      "Melihat pemandangan alam",
      "Resep memasak yang ditulis langkah per langkah",
      "Menonton film",
      "Tidur siang"
    ],
    answer: 1,
    explanation: "Resep masakan adalah algoritma! Ia memiliki input (bahan-bahan), langkah-langkah terurut (proses), dan output (makanan jadi). Ini adalah contoh nyata algoritma dalam kehidupan sehari-hari."
  },
  {
    id: 86,
    category: "Internet dan Keamanan Digital",
    difficulty: "easy",
    type: "true-false",
    question: "Menggunakan password yang sama untuk semua akun online adalah praktik yang disarankan untuk kemudahan mengingat.",
    options: ["Benar", "Salah"],
    answer: 1,
    explanation: "Salah! Menggunakan password yang sama untuk semua akun sangat berbahaya. Jika satu akun diretas, semua akun lain ikut terancam. Gunakan password unik untuk setiap akun."
  },
  {
    id: 87,
    category: "Analisis Data",
    difficulty: "medium",
    type: "concept-guess",
    question: "Saya adalah representasi visual dari data menggunakan batang-batang vertikal atau horizontal. Saya digunakan untuk membandingkan nilai dari beberapa kategori atau kelompok. Siapa saya?",
    answer: "grafik batang",
    acceptedAnswers: ["bar chart", "diagram batang", "chart batang", "bar graph", "grafik bar"],
    explanation: "Grafik Batang (Bar Chart) menggunakan batang untuk membandingkan nilai antar kategori. Sangat efektif untuk perbandingan visual yang mudah dipahami."
  },
  {
    id: 88,
    category: "Representasi Data",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Urutan satuan penyimpanan data dari terkecil ke terbesar adalah...",
    options: [
      "Bit → Byte → KB → MB → GB → TB",
      "Byte → Bit → KB → MB → GB → TB",
      "Bit → Byte → MB → KB → GB → TB",
      "KB → MB → GB → TB → Bit → Byte"
    ],
    answer: 0,
    explanation: "Urutan benar: Bit → Byte (8 bit) → Kilobyte/KB (1024B) → Megabyte/MB → Gigabyte/GB → Terabyte/TB."
  },
  {
    id: 89,
    category: "AI dan Teknologi Modern",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Deep Learning adalah bagian dari Machine Learning yang menggunakan struktur berlapis menyerupai otak manusia. Struktur ini disebut...",
    options: [
      "Binary Tree",
      "Neural Network (Jaringan Saraf Tiruan)",
      "Decision Tree",
      "Linked List"
    ],
    answer: 1,
    explanation: "Deep Learning menggunakan Artificial Neural Network (Jaringan Saraf Tiruan) yang terinspirasi dari cara kerja neuron di otak manusia, tersusun dalam banyak lapisan (deep layers)."
  },
  {
    id: 90,
    category: "Dampak Sosial Informatika",
    difficulty: "hard",
    type: "situation",
    question: "Perusahaan teknologi mengumpulkan data lokasi pengguna tanpa memberitahu atau meminta persetujuan. Hal ini melanggar prinsip...",
    options: [
      "Bandwidth management",
      "Privasi dan persetujuan pengguna (informed consent)",
      "Open source software",
      "Cloud computing"
    ],
    answer: 1,
    explanation: "Mengumpulkan data tanpa persetujuan pengguna melanggar privasi dan prinsip informed consent. Pengguna berhak mengetahui data apa yang dikumpulkan dan memberikan persetujuan eksplisit."
  },

  // =============================================
  // QUIZ 1 - BERPIKIR KOMPUTASIONAL & TIK (MUDAH)
  // =============================================
  {
    id: 91,
    category: "Berpikir Komputasional",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Memecah masalah besar menjadi bagian-bagian kecil agar lebih mudah diselesaikan disebut ...",
    options: [
      "Dekomposisi",
      "Abstraksi",
      "Algoritma",
      "Pengenalan Pola"
    ],
    answer: 0,
    explanation: "Dekomposisi adalah fondasi berpikir komputasional yang memecah masalah besar menjadi bagian-bagian kecil agar lebih mudah diselesaikan."
  },
  {
    id: 92,
    category: "Berpikir Komputasional",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Kamu menyadari bahwa tiga soal matematika punya rumus dan langkah yang sama. Kegiatan ini termasuk fondasi ...",
    options: [
      "Abstraksi",
      "Algoritma",
      "Pengenalan Pola",
      "Dekomposisi"
    ],
    answer: 2,
    explanation: "Menyadari kesamaan pola pada beberapa masalah adalah penerapan Pengenalan Pola (Pattern Recognition), yaitu menemukan keberulangan agar solusi bisa dipakai ulang."
  },
  {
    id: 93,
    category: "Berpikir Komputasional",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Fondasi yang berfokus pada informasi penting dan membuang detail yang tidak relevan adalah ...",
    options: [
      "Dekomposisi",
      "Abstraksi",
      "Algoritma",
      "Pengenalan Pola"
    ],
    answer: 1,
    explanation: "Abstraksi adalah fondasi berpikir komputasional yang menyederhanakan masalah dengan hanya fokus pada informasi yang penting dan mengabaikan detail yang tidak relevan."
  },
  {
    id: 94,
    category: "Berpikir Komputasional",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Langkah-langkah yang runtut dan berurutan untuk menyelesaikan suatu masalah disebut ...",
    options: [
      "Abstraksi",
      "Dekomposisi",
      "Pengenalan Pola",
      "Algoritma"
    ],
    answer: 3,
    explanation: "Algoritma adalah serangkaian langkah yang runtut, jelas, dan berurutan untuk menyelesaikan suatu masalah atau mencapai tujuan tertentu."
  },
  {
    id: 95,
    category: "Berpikir Komputasional",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Pada struktur data Tree, bagian paling atas yang tidak punya parent disebut ...",
    options: [
      "Leaf",
      "Root",
      "Sibling",
      "Edge"
    ],
    answer: 1,
    explanation: "Root adalah node paling atas dalam struktur Tree. Root tidak memiliki parent dan menjadi titik awal dari seluruh hierarki."
  },
  {
    id: 96,
    category: "Berpikir Komputasional",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Pada Tree, node paling bawah yang tidak punya child lagi disebut ...",
    options: [
      "Leaf",
      "Root",
      "Parent",
      "Edge"
    ],
    answer: 0,
    explanation: "Leaf (daun) adalah node yang berada di posisi paling bawah dalam Tree dan tidak memiliki child (anak) apapun."
  },
  {
    id: 97,
    category: "Berpikir Komputasional",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Pada Graph, garis yang menghubungkan antar vertex disebut ...",
    options: [
      "Node",
      "Root",
      "Edge",
      "Leaf"
    ],
    answer: 2,
    explanation: "Edge adalah garis atau panah yang menghubungkan dua vertex (simpul) dalam struktur Graph. Edge bisa memiliki bobot (jarak, biaya, dll) atau tidak."
  },
  {
    id: 98,
    category: "Berpikir Komputasional",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Ekspresi logika hanya menghasilkan nilai ...",
    options: [
      "angka 0 sampai 9",
      "huruf A sampai Z",
      "kalimat bebas",
      "True atau False"
    ],
    answer: 3,
    explanation: "Ekspresi logika (boolean expression) selalu menghasilkan salah satu dari dua nilai: True (benar) atau False (salah)."
  },
  {
    id: 99,
    category: "Berpikir Komputasional",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Operator != dalam ekspresi logika berarti ...",
    options: [
      "sama dengan",
      "tidak sama dengan",
      "lebih besar dari",
      "lebih kecil atau sama dengan"
    ],
    answer: 1,
    explanation: "Operator != (not equal) berarti 'tidak sama dengan'. Contoh: 5 != 3 menghasilkan True karena 5 memang tidak sama dengan 3."
  },
  {
    id: 100,
    category: "Berpikir Komputasional",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Tabel yang memetakan seluruh kemungkinan hasil dari suatu ekspresi logika disebut ...",
    options: [
      "Tabel kebenaran",
      "Tabel perkalian",
      "Tabel data",
      "Tabel jadwal"
    ],
    answer: 0,
    explanation: "Tabel kebenaran (truth table) adalah tabel yang memuat semua kemungkinan kombinasi nilai input dan output dari suatu ekspresi logika."
  },
  {
    id: 101,
    category: "Dampak Sosial Informatika",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Pasangan aplikasi yang sama-sama termasuk pengolah kata adalah ...",
    options: [
      "Excel dan Google Sheets",
      "PowerPoint dan Google Slides",
      "Word dan Google Docs",
      "Paint dan Canva"
    ],
    answer: 2,
    explanation: "Microsoft Word dan Google Docs keduanya adalah aplikasi pengolah kata (word processor) yang digunakan untuk membuat dan mengedit dokumen teks."
  },
  {
    id: 102,
    category: "Dampak Sosial Informatika",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Vlog adalah blog yang dikemas dalam bentuk ...",
    options: [
      "tulisan",
      "gambar",
      "suara",
      "video"
    ],
    answer: 3,
    explanation: "Vlog (video blog) adalah blog yang menyajikan konten dalam format video, biasanya diunggah ke platform seperti YouTube."
  },
  {
    id: 103,
    category: "Dampak Sosial Informatika",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Dua platform gratis untuk membuat blog adalah ...",
    options: [
      "Blogger dan WordPress",
      "YouTube dan Canva",
      "Excel dan Word",
      "OpenShot dan Paint"
    ],
    answer: 0,
    explanation: "Blogger (milik Google) dan WordPress adalah dua platform blog gratis yang populer dan banyak digunakan untuk membuat blog pribadi maupun profesional."
  },
  {
    id: 104,
    category: "Dampak Sosial Informatika",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Modal utama untuk membuat vlog adalah ...",
    options: [
      "printer, scanner, dan flashdisk",
      "kamera smartphone, aplikasi edit video, dan tempat unggah seperti YouTube",
      "proyektor, speaker, dan papan tulis",
      "mouse, keyboard, dan monitor"
    ],
    answer: 1,
    explanation: "Modal dasar membuat vlog adalah kamera (bisa smartphone), aplikasi edit video untuk menyunting, dan platform unggah seperti YouTube untuk mempublikasikannya."
  },
  {
    id: 105,
    category: "Dampak Sosial Informatika",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Cara menyatukan data (tulisan, tabel, grafik, foto) dari satu aplikasi ke aplikasi lain menjadi satu dokumen utuh disebut ...",
    options: [
      "integrasi jaringan",
      "instalasi aplikasi",
      "integrasi konten",
      "format ulang"
    ],
    answer: 2,
    explanation: "Integrasi konten adalah proses menggabungkan berbagai jenis data dari beberapa aplikasi (misalnya grafik dari Excel dimasukkan ke Word atau PowerPoint) menjadi satu dokumen yang utuh."
  },

  // =============================================
  // QUIZ 2A - BERPIKIR KOMPUTASIONAL & TIK (SEDANG)
  // =============================================
  {
    id: 106,
    category: "Berpikir Komputasional",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Peta jalur MRT hanya menampilkan stasiun dan jalur, tanpa bentuk jalan yang asli. Ini adalah contoh fondasi ...",
    options: [
      "Dekomposisi",
      "Abstraksi",
      "Algoritma",
      "Pengenalan Pola"
    ],
    answer: 1,
    explanation: "Peta MRT menyederhanakan realita dengan hanya menampilkan informasi penting (stasiun dan jalur) dan membuang detail yang tidak relevan (bentuk jalan asli). Ini adalah Abstraksi."
  },
  {
    id: 107,
    category: "Berpikir Komputasional",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Ani mengerjakan 10 soal penjumlahan pecahan dan sadar bahwa semuanya diawali dengan menyamakan penyebut. Ani sedang menerapkan fondasi ...",
    options: [
      "Dekomposisi",
      "Abstraksi",
      "Pengenalan Pola",
      "Algoritma"
    ],
    answer: 2,
    explanation: "Menyadari bahwa semua soal penjumlahan pecahan diawali dengan langkah yang sama (menyamakan penyebut) adalah penerapan Pengenalan Pola."
  },
  {
    id: 108,
    category: "Berpikir Komputasional",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Langkah memasak mi instan (didihkan air, masukkan mi, masak 3 menit, tiriskan, campur bumbu) tidak boleh diacak urutannya. Hal ini menunjukkan sifat fondasi ...",
    options: [
      "Abstraksi",
      "Dekomposisi",
      "Pengenalan Pola",
      "Algoritma"
    ],
    answer: 3,
    explanation: "Algoritma memiliki sifat urutan yang runtut dan tidak boleh diacak. Resep memasak adalah contoh algoritma karena setiap langkah harus dilakukan dalam urutan yang benar."
  },
  {
    id: 109,
    category: "Berpikir Komputasional",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Kakek punya dua anak yaitu Ayah dan Paman. Ayah punya dua anak yaitu Aku dan Adik. Jika digambar sebagai Tree, sibling dari Ayah adalah ...",
    options: [
      "Paman",
      "Adik",
      "Kakek",
      "Aku"
    ],
    answer: 0,
    explanation: "Sibling adalah node yang memiliki parent yang sama. Ayah dan Paman sama-sama child dari Kakek, sehingga mereka adalah sibling satu sama lain."
  },
  {
    id: 110,
    category: "Berpikir Komputasional",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Struktur folder di laptop: Local Disk C > Dokumen > Tugas. Posisi node 'Tugas' adalah ...",
    options: [
      "root",
      "parent dari Dokumen",
      "child dari Dokumen",
      "sibling dari Local Disk C"
    ],
    answer: 2,
    explanation: "'Tugas' berada di bawah 'Dokumen', sehingga 'Tugas' adalah child dari 'Dokumen'. Dalam Tree, child adalah node yang berada satu tingkat di bawah parent-nya."
  },
  {
    id: 111,
    category: "Berpikir Komputasional",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Jalan antar empat kota digambar dengan angka jarak (km) di setiap jalannya. Struktur data yang paling tepat adalah ...",
    options: [
      "Tree",
      "Graph tanpa bobot",
      "Tree berbobot",
      "Graph berbobot (weighted graph)"
    ],
    answer: 3,
    explanation: "Hubungan antar kota (bisa membentuk siklus/jalur memutar) dengan angka jarak paling tepat direpresentasikan sebagai Graph berbobot (weighted graph), karena ada nilai (bobot) di setiap edge."
  },
  {
    id: 112,
    category: "Berpikir Komputasional",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Perbedaan utama Tree dan Graph yang benar adalah ...",
    options: [
      "Tree punya satu root dan tidak membentuk siklus, sedangkan Graph boleh membentuk siklus",
      "Tree boleh membentuk siklus, sedangkan Graph tidak boleh",
      "Tree tidak punya node, sedangkan Graph punya node",
      "Tree dan Graph sama persis"
    ],
    answer: 0,
    explanation: "Tree adalah Graph khusus yang memiliki tepat satu root, tidak membentuk siklus (acyclic), dan setiap node hanya memiliki satu parent. Graph lebih bebas dan boleh membentuk siklus."
  },
  {
    id: 113,
    category: "Berpikir Komputasional",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Jika umur = 14, maka hasil ekspresi (umur >= 13) AND (umur < 15) adalah ...",
    options: [
      "False",
      "Error",
      "True",
      "14"
    ],
    answer: 2,
    explanation: "(umur >= 13) → (14 >= 13) = True. (umur < 15) → (14 < 15) = True. True AND True = True."
  },
  {
    id: 114,
    category: "Berpikir Komputasional",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Hasil dari NOT (5 > 3) adalah ...",
    options: [
      "False",
      "True",
      "5",
      "3"
    ],
    answer: 0,
    explanation: "(5 > 3) = True. NOT True = False. Operator NOT membalik nilai boolean."
  },
  {
    id: 115,
    category: "Berpikir Komputasional",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Taman bermain membuat aturan: boleh masuk jika punya tiket ATAU membawa kartu member. Doni tidak punya tiket, tetapi membawa kartu member. Hasil ekspresi dan keputusannya adalah ...",
    options: [
      "False, tidak boleh masuk",
      "True, tidak boleh masuk",
      "False, boleh masuk",
      "True, boleh masuk"
    ],
    answer: 3,
    explanation: "punya tiket = False, kartu member = True. False OR True = True. Karena hasilnya True, Doni boleh masuk."
  },
  {
    id: 116,
    category: "Dampak Sosial Informatika",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Bendahara kelas mencatat uang kas, lalu hasilnya akan dipresentasikan pada rapat orang tua. Rangkaian aplikasi yang paling tepat adalah ...",
    options: [
      "Word lalu Paint",
      "Spreadsheet lalu aplikasi presentasi",
      "Presentasi lalu Word",
      "Paint lalu Word"
    ],
    answer: 1,
    explanation: "Data keuangan paling efisien diolah di spreadsheet (Excel/Google Sheets). Hasilnya lalu dipindahkan ke aplikasi presentasi (PowerPoint/Google Slides) untuk ditampilkan di rapat."
  },
  {
    id: 117,
    category: "Dampak Sosial Informatika",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Pertanyaan berikut adalah pertanyaan panduan memilih aplikasi perkantoran, KECUALI ...",
    options: [
      "Apa tujuan dokumennya?",
      "Siapa target pembacanya?",
      "Aplikasi mana yang paling mahal?",
      "Jenis konten apa yang dibutuhkan?"
    ],
    answer: 2,
    explanation: "Saat memilih aplikasi perkantoran, yang dipertimbangkan adalah tujuan, target pembaca, dan jenis konten. Harga aplikasi bukan panduan utama dalam memilih alat yang tepat untuk pekerjaan."
  },
  {
    id: 118,
    category: "Dampak Sosial Informatika",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Setelah memasukkan nama blog dan mengklik Berikutnya di Blogger, langkah selanjutnya adalah ...",
    options: [
      "memilih URL blog",
      "login dengan akun Gmail",
      "mengklik Blog Baru",
      "mengunggah video"
    ],
    answer: 0,
    explanation: "Alur membuat blog di Blogger: login Gmail → klik Blog Baru → masukkan nama blog → pilih URL blog → pilih tema. Setelah memasukkan nama, langkah berikutnya adalah memilih URL blog."
  },
  {
    id: 119,
    category: "Dampak Sosial Informatika",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Salah satu tips merekam vlog yang benar adalah ...",
    options: [
      "sering memakai zoom digital",
      "merekam membelakangi cahaya",
      "menutup mic dengan tangan",
      "memegang kamera dengan dua tangan agar stabil"
    ],
    answer: 3,
    explanation: "Memegang kamera dengan dua tangan membuat rekaman lebih stabil dan tidak goyang. Zoom digital, merekam membelakangi cahaya, dan menutupi mic adalah kesalahan umum dalam membuat vlog."
  },
  {
    id: 120,
    category: "Dampak Sosial Informatika",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Pernyataan yang benar tentang Blogger dan WordPress adalah ...",
    options: [
      "WordPress terhubung akun Gmail dan cocok untuk pemula",
      "Blogger terhubung akun Google dan cocok untuk pemula, WordPress lebih fleksibel",
      "Keduanya platform berbayar",
      "Blogger khusus video, WordPress khusus foto"
    ],
    answer: 1,
    explanation: "Blogger terhubung dengan akun Google/Gmail dan sangat mudah digunakan oleh pemula. WordPress menawarkan lebih banyak fitur dan fleksibilitas, cocok untuk pengguna yang lebih mahir."
  },

  // =============================================
  // QUIZ 2B - LOGIKA (SEDANG)
  // =============================================
  {
    id: 121,
    category: "Berpikir Komputasional",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Panitia memecah acara menjadi seksi konsumsi, dokumentasi, dan acara. Lalu mereka tidak memikirkan warna taplak karena tidak penting. Pernyataan yang benar adalah ...",
    options: [
      "Dekomposisi membuang detail yang tidak penting, Abstraksi memecah masalah",
      "Keduanya sama-sama menyusun urutan langkah",
      "Dekomposisi memecah masalah menjadi bagian kecil, Abstraksi membuang detail yang tidak penting",
      "Dekomposisi mencari kesamaan, Abstraksi memecah masalah"
    ],
    answer: 2,
    explanation: "Memecah acara menjadi seksi-seksi adalah Dekomposisi. Tidak memikirkan detail yang tidak penting (warna taplak) adalah Abstraksi. Keduanya adalah fondasi yang berbeda."
  },
  {
    id: 122,
    category: "Berpikir Komputasional",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Aplikasi peta hanya menampilkan jalan utama dan nama tempat, tanpa menggambar setiap pohon dan rumah. Ini penerapan ...",
    options: [
      "Dekomposisi",
      "Algoritma",
      "Abstraksi",
      "Pengenalan Pola"
    ],
    answer: 2,
    explanation: "Aplikasi peta menyederhanakan dunia nyata dengan hanya menampilkan informasi relevan (jalan, nama tempat) dan mengabaikan detail tidak penting (pohon, rumah). Ini adalah Abstraksi."
  },
  {
    id: 123,
    category: "Berpikir Komputasional",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Operator AND menghasilkan nilai True hanya jika ...",
    options: [
      "salah satu syarat bernilai True",
      "semua syarat bernilai False",
      "syarat pertama saja yang True",
      "kedua syarat bernilai True"
    ],
    answer: 3,
    explanation: "Operator AND (DAN) hanya menghasilkan True jika semua syarat bernilai True. Jika salah satu saja False, hasilnya langsung False."
  },
  {
    id: 124,
    category: "Berpikir Komputasional",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Operator OR menghasilkan nilai True jika ...",
    options: [
      "minimal satu syarat bernilai True",
      "kedua syarat harus False",
      "kedua syarat harus True",
      "tidak ada syarat yang True"
    ],
    answer: 0,
    explanation: "Operator OR (ATAU) menghasilkan True jika minimal satu dari syarat-syaratnya bernilai True. Hanya menghasilkan False jika semua syarat False."
  },
  {
    id: 125,
    category: "Berpikir Komputasional",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Fungsi operator NOT adalah ...",
    options: [
      "menggabungkan dua syarat",
      "memilih salah satu dari dua syarat",
      "membalik nilai: True menjadi False, dan False menjadi True",
      "membandingkan dua angka"
    ],
    answer: 2,
    explanation: "Operator NOT (TIDAK) berfungsi membalik nilai boolean. NOT True = False, dan NOT False = True."
  },
  {
    id: 126,
    category: "Berpikir Komputasional",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Sebuah gerbang punya dua kunci, dan baru bisa terbuka jika kedua kunci dibuka. Cara kerja ini mirip operator ...",
    options: [
      "OR",
      "AND",
      "NOT",
      "=="
    ],
    answer: 1,
    explanation: "Gerbang yang butuh kedua kunci aktif mencerminkan AND: semua kondisi harus True agar hasilnya True."
  },
  {
    id: 127,
    category: "Berpikir Komputasional",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Sebuah gedung punya dua pintu masuk, dan kamu bisa masuk lewat salah satunya. Cara kerja ini mirip operator ...",
    options: [
      "AND",
      "NOT",
      "!=",
      "OR"
    ],
    answer: 3,
    explanation: "Dua pintu alternatif (cukup salah satu yang terbuka untuk bisa masuk) mencerminkan OR: cukup satu kondisi True untuk menghasilkan True."
  },
  {
    id: 128,
    category: "Berpikir Komputasional",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Lampu taman menyala jika TIDAK ada cahaya matahari. Sekarang siang hari dan ada cahaya (True). Keadaan lampu adalah ...",
    options: [
      "mati, karena NOT True menghasilkan False",
      "menyala, karena ada cahaya",
      "menyala, karena NOT True menghasilkan True",
      "tidak bisa ditentukan"
    ],
    answer: 0,
    explanation: "Ada cahaya = True. Kondisi menyala = NOT ada_cahaya = NOT True = False. Jadi lampu mati."
  },
  {
    id: 129,
    category: "Berpikir Komputasional",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Aturan lomba: peserta boleh ikut jika punya kartu pelajar DAN sudah membayar pendaftaran. Dani punya kartu pelajar tetapi belum membayar. Kesimpulannya ...",
    options: [
      "Dani boleh ikut, karena satu syarat sudah terpenuhi",
      "Dani boleh ikut, karena kartu pelajar lebih penting",
      "Dani belum boleh ikut, karena kedua syarat harus terpenuhi",
      "Dani tidak boleh ikut, karena kartu pelajarnya salah"
    ],
    answer: 2,
    explanation: "kartu pelajar = True, sudah bayar = False. True AND False = False. Dani belum boleh ikut karena operator AND mengharuskan semua syarat terpenuhi."
  },
  {
    id: 130,
    category: "Berpikir Komputasional",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Aturan pulang: siswa boleh pulang lebih awal jika dijemput ATAU membawa surat izin. Rudi tidak dijemput tetapi membawa surat izin. Kesimpulannya ...",
    options: [
      "Rudi tidak boleh pulang, karena tidak dijemput",
      "Rudi boleh pulang, karena salah satu syarat sudah terpenuhi",
      "Rudi boleh pulang hanya jika dijemput juga",
      "Rudi harus menunggu bel"
    ],
    answer: 1,
    explanation: "dijemput = False, bawa surat izin = True. False OR True = True. Rudi boleh pulang karena salah satu syarat sudah terpenuhi."
  },
  {
    id: 131,
    category: "Berpikir Komputasional",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Hasil dari True AND False adalah ...",
    options: [
      "False",
      "True",
      "1",
      "Error"
    ],
    answer: 0,
    explanation: "True AND False = False. Operator AND membutuhkan semua kondisi True untuk menghasilkan True. Satu saja yang False, hasilnya False."
  },
  {
    id: 132,
    category: "Berpikir Komputasional",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Hasil dari False OR True adalah ...",
    options: [
      "False",
      "Error",
      "0",
      "True"
    ],
    answer: 3,
    explanation: "False OR True = True. Operator OR cukup butuh satu kondisi yang True untuk menghasilkan True."
  },
  {
    id: 133,
    category: "Berpikir Komputasional",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Hasil dari NOT False adalah ...",
    options: [
      "False",
      "True",
      "0",
      "Error"
    ],
    answer: 1,
    explanation: "NOT False = True. Operator NOT membalik nilai boolean: False menjadi True, True menjadi False."
  },
  {
    id: 134,
    category: "Berpikir Komputasional",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Wahana boleh dinaiki jika tinggi >= 120 DAN usia >= 8. Rani tingginya 125 dan usianya 7. Kesimpulan yang tepat adalah ...",
    options: [
      "Boleh, karena tinggi sudah cukup",
      "Tidak boleh, karena syarat usia bernilai False sehingga hasil AND menjadi False",
      "Boleh, karena salah satu syarat terpenuhi",
      "Tidak boleh, karena tinggi terlalu rendah"
    ],
    answer: 1,
    explanation: "(125 >= 120) = True, (7 >= 8) = False. True AND False = False. Rani tidak boleh naik wahana karena syarat usia tidak terpenuhi."
  },
  {
    id: 135,
    category: "Dampak Sosial Informatika",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Pak Guru punya data hasil survei berupa angka dan ingin menampilkannya di rapat dalam bentuk grafik dan poin penting. Alur paling efisien adalah ...",
    options: [
      "Mengetik semua data di pengolah kata lalu dicetak",
      "Menghitung di PowerPoint lalu menyalinnya ke Excel",
      "Mengolah data dan membuat grafik di spreadsheet, lalu memasukkannya ke slide presentasi",
      "Menggambar grafik manual di Paint tanpa memakai data"
    ],
    answer: 2,
    explanation: "Alur yang benar: data diolah dan divisualisasikan di spreadsheet (Excel) karena mudah membuat grafik, lalu hasilnya disematkan ke slide presentasi untuk ditampilkan di rapat."
  },
  {
    id: 136,
    category: "Dampak Sosial Informatika",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Hal yang TIDAK perlu dipertimbangkan saat memilih aplikasi perkantoran adalah ...",
    options: [
      "Tujuan dokumen",
      "Target pembaca",
      "Jenis konten",
      "Warna casing laptop"
    ],
    answer: 3,
    explanation: "Warna casing laptop sama sekali tidak relevan dalam memilih aplikasi perkantoran. Yang perlu dipertimbangkan adalah tujuan dokumen, target pembaca, dan jenis konten."
  },
  {
    id: 137,
    category: "Dampak Sosial Informatika",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Panitia bazar ingin membuat poster promosi yang menarik dan penuh gambar. Aplikasi yang paling tepat adalah ...",
    options: [
      "Canva",
      "Excel",
      "Notepad",
      "Kalkulator"
    ],
    answer: 0,
    explanation: "Canva adalah aplikasi desain grafis berbasis web yang tepat untuk membuat poster promosi yang visual dan menarik. Excel, Notepad, dan Kalkulator bukan alat desain."
  },
  {
    id: 138,
    category: "Dampak Sosial Informatika",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Pernyataan yang tepat tentang perbedaan blog dan chat adalah ...",
    options: [
      "Blog hanya bisa dibaca oleh pemiliknya",
      "Blog dipakai untuk menulis cerita atau informasi yang bisa dibaca siapa saja di internet, chat untuk percakapan singkat",
      "Blog dan chat sama persis fungsinya",
      "Blog hanya boleh berisi video"
    ],
    answer: 1,
    explanation: "Blog adalah platform menulis konten yang dapat diakses publik di internet dan tersimpan permanen. Chat adalah percakapan dua arah yang bersifat sementara dan pribadi."
  },
  {
    id: 139,
    category: "Dampak Sosial Informatika",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Ayu ingin membuat blog gratis memakai akun Gmail miliknya. Platform yang paling cocok adalah ...",
    options: [
      "Microsoft Excel",
      "Paint",
      "Blogger",
      "Kalkulator"
    ],
    answer: 2,
    explanation: "Blogger adalah platform blog gratis milik Google yang login menggunakan akun Gmail. Cocok untuk pemula yang ingin membuat blog dengan mudah."
  },
  {
    id: 140,
    category: "Dampak Sosial Informatika",
    difficulty: "medium",
    type: "multiple-choice",
    question: "Hasil vlog terlihat buram dan pecah setelah objek yang jauh diperbesar saat merekam. Penyebab yang paling mungkin adalah ...",
    options: [
      "Posisi mic salah",
      "Cahaya terlalu terang",
      "Merekam memakai dua tangan",
      "Penggunaan zoom digital"
    ],
    answer: 3,
    explanation: "Zoom digital memperbesar gambar secara artifisial (dengan memotong dan meregangkan piksel), bukan secara optik. Hasilnya gambar menjadi buram dan pecah (pixelated)."
  },

  // =============================================
  // QUIZ 3 - BERPIKIR KOMPUTASIONAL & TIK (SULIT)
  // =============================================
  {
    id: 141,
    category: "Berpikir Komputasional",
    difficulty: "hard",
    type: "multiple-choice",
    question: "Dinda menyiapkan pesta ulang tahun. (1) memecah acara menjadi undangan, dekorasi, dan makanan; (2) sadar bahwa pesta tahun lalu punya daftar tugas mirip, jadi dipakai lagi; (3) tidak memikirkan warna balon karena fokus pada anggaran; (4) menulis urutan kerja dari H-7 sampai hari H. Urutan fondasi pada langkah (1), (2), (3), (4) adalah ...",
    options: [
      "Dekomposisi, Pengenalan Pola, Abstraksi, Algoritma",
      "Abstraksi, Dekomposisi, Pengenalan Pola, Algoritma",
      "Dekomposisi, Abstraksi, Pengenalan Pola, Algoritma",
      "Pengenalan Pola, Dekomposisi, Algoritma, Abstraksi"
    ],
    answer: 0,
    explanation: "(1) Memecah acara = Dekomposisi. (2) Memakai pola dari pesta sebelumnya = Pengenalan Pola. (3) Tidak memikirkan detail yang tidak penting = Abstraksi. (4) Menulis urutan kerja = Algoritma."
  },
  {
    id: 142,
    category: "Berpikir Komputasional",
    difficulty: "hard",
    type: "multiple-choice",
    question: "Rani membagi tugas kelompok menjadi 4 bagian kecil dan menyebutnya 'abstraksi'. Tanggapan yang paling tepat adalah ...",
    options: [
      "Benar, karena abstraksi berarti membagi tugas",
      "Kurang tepat, itu dekomposisi; abstraksi adalah memfokuskan pada informasi penting dan membuang detail yang tidak perlu",
      "Kurang tepat, itu algoritma karena ada urutan",
      "Benar, karena dekomposisi berarti membuang detail"
    ],
    answer: 1,
    explanation: "Membagi tugas menjadi bagian-bagian kecil adalah Dekomposisi, bukan Abstraksi. Abstraksi adalah tentang menyederhanakan dengan membuang detail yang tidak relevan."
  },
  {
    id: 143,
    category: "Berpikir Komputasional",
    difficulty: "hard",
    type: "multiple-choice",
    question: "Di media sosial, Ani berteman dengan Budi, Budi berteman dengan Citra, dan Citra berteman dengan Ani. Struktur data yang paling tepat dan alasannya adalah ...",
    options: [
      "Tree, karena ada satu root yaitu Ani",
      "Tree, karena setiap orang punya parent",
      "Graph, karena hubungannya bebas dan membentuk lingkaran (siklus)",
      "Graph, karena hanya boleh ada satu titik awal"
    ],
    answer: 2,
    explanation: "Hubungan Ani-Budi-Citra membentuk siklus (lingkaran). Tree tidak boleh membentuk siklus, sehingga struktur ini harus menggunakan Graph."
  },
  {
    id: 144,
    category: "Berpikir Komputasional",
    difficulty: "hard",
    type: "multiple-choice",
    question: "Perhatikan Tree berikut: A adalah root, B dan C adalah child dari A, D dan E adalah child dari B, F adalah child dari C. Pernyataan yang benar adalah ...",
    options: [
      "B adalah leaf",
      "D dan F adalah sibling",
      "C adalah parent dari E",
      "Leaf pada Tree ini adalah D, E, dan F"
    ],
    answer: 3,
    explanation: "D, E, dan F tidak memiliki child apapun, sehingga ketiganya adalah leaf. B bukan leaf karena punya child (D dan E). D dan F bukan sibling karena parent mereka berbeda (B dan C). C bukan parent dari E."
  },
  {
    id: 145,
    category: "Berpikir Komputasional",
    difficulty: "hard",
    type: "multiple-choice",
    question: "Di sebuah aplikasi, Ani mengikuti Budi, tetapi Budi tidak mengikuti Ani. Hubungan satu arah ini paling tepat digambarkan dengan ...",
    options: [
      "Directed graph",
      "Undirected graph",
      "Tree",
      "Leaf"
    ],
    answer: 0,
    explanation: "Directed graph (graph berarah) memiliki edge dengan arah tertentu, cocok untuk hubungan satu arah seperti follow di media sosial. Undirected graph adalah untuk hubungan dua arah yang setara."
  },
  {
    id: 146,
    category: "Berpikir Komputasional",
    difficulty: "hard",
    type: "multiple-choice",
    question: "Struktur berikut yang TIDAK bisa disebut Tree adalah ...",
    options: [
      "Folder dengan satu root dan subfolder bertingkat",
      "Struktur di mana satu node bisa dicapai lewat dua jalur berbeda dan membentuk lingkaran",
      "Silsilah keluarga",
      "Bagan organisasi sekolah"
    ],
    answer: 1,
    explanation: "Tree tidak boleh memiliki siklus (cycle) dan setiap node hanya boleh memiliki satu parent. Struktur yang bisa dicapai lewat dua jalur dan membentuk lingkaran melanggar aturan Tree."
  },
  {
    id: 147,
    category: "Berpikir Komputasional",
    difficulty: "hard",
    type: "multiple-choice",
    question: "Ekspresi A AND (NOT B) bernilai True hanya jika ...",
    options: [
      "A False dan B True",
      "A dan B sama-sama True",
      "A dan B sama-sama False",
      "A True dan B False"
    ],
    answer: 3,
    explanation: "NOT B bernilai True hanya jika B = False. Lalu A AND True = True hanya jika A juga True. Jadi ekspresi bernilai True hanya jika A = True dan B = False."
  },
  {
    id: 148,
    category: "Berpikir Komputasional",
    difficulty: "hard",
    type: "multiple-choice",
    question: "Aturan: siswa LULUS jika (nilai >= 75 AND kehadiran >= 80) OR ikut remedial. Budi: nilai 70, kehadiran 90, tidak ikut remedial. Sari: nilai 80, kehadiran 75, ikut remedial. Hasilnya adalah ...",
    options: [
      "Budi lulus, Sari tidak lulus",
      "Budi dan Sari sama-sama lulus",
      "Budi tidak lulus, Sari lulus",
      "Budi dan Sari sama-sama tidak lulus"
    ],
    answer: 2,
    explanation: "Budi: (70>=75 AND 90>=80) OR False = (False AND True) OR False = False OR False = False → tidak lulus. Sari: (80>=75 AND 75>=80) OR True = (True AND False) OR True = False OR True = True → lulus."
  },
  {
    id: 149,
    category: "Berpikir Komputasional",
    difficulty: "hard",
    type: "multiple-choice",
    question: "Urutan prioritas operator logika adalah NOT, lalu AND, lalu OR. Hasil dari True OR False AND False adalah ...",
    options: [
      "True",
      "False",
      "Error",
      "Tidak dapat ditentukan"
    ],
    answer: 0,
    explanation: "Dengan prioritas AND lebih tinggi dari OR: (False AND False) dievaluasi dulu = False. Lalu True OR False = True."
  },
  {
    id: 150,
    category: "Berpikir Komputasional",
    difficulty: "hard",
    type: "multiple-choice",
    question: "Jika skor = 80 dan hadir = 70, hasil yang ditampilkan dari algoritma berikut adalah ...\nJIKA skor >= 75 DAN hadir >= 80 → tampilkan 'Lulus'\nJIKA TIDAK, JIKA skor >= 75 ATAU hadir >= 80 → tampilkan 'Remedial'\nSELAIN ITU → tampilkan 'Mengulang'",
    options: [
      "Lulus",
      "Mengulang",
      "Remedial",
      "Tidak ada yang ditampilkan"
    ],
    answer: 2,
    explanation: "Kondisi 1: (80>=75 AND 70>=80) = True AND False = False → tidak Lulus. Kondisi 2: (80>=75 OR 70>=80) = True OR False = True → tampilkan 'Remedial'."
  },
  {
    id: 151,
    category: "Dampak Sosial Informatika",
    difficulty: "hard",
    type: "multiple-choice",
    question: "Panitia bazar perlu: (i) menghitung laba dan membuat grafik penjualan, (ii) menulis laporan untuk kepala sekolah, (iii) mempresentasikan hasilnya di rapat. Rangkaian aplikasi yang paling efisien adalah ...",
    options: [
      "Semua dikerjakan di pengolah kata saja",
      "Hitung di PowerPoint, laporan di Excel, presentasi di Word",
      "Hitung dan grafik di Excel, laporan di Word, presentasi di PowerPoint dengan grafik dari Excel",
      "Hitung di Paint, laporan di Excel, presentasi di Word"
    ],
    answer: 2,
    explanation: "Setiap aplikasi punya keunggulan: Excel untuk hitung dan grafik, Word untuk laporan naratif, PowerPoint untuk presentasi visual. Integrasi ketiganya adalah alur kerja paling efisien."
  },
  {
    id: 152,
    category: "Dampak Sosial Informatika",
    difficulty: "hard",
    type: "multiple-choice",
    question: "Urutan alur kerja integrasi konten dari data mentah sampai presentasi yang utuh adalah ...",
    options: [
      "Buat slide, olah data di spreadsheet, buat grafik, presentasikan",
      "Olah data mentah di spreadsheet, buat tabel dan grafik, sematkan ke slide presentasi, presentasikan",
      "Sematkan ke slide, buat grafik, olah data di spreadsheet, presentasikan",
      "Presentasikan, buat slide, olah data, buat grafik"
    ],
    answer: 1,
    explanation: "Alur integrasi konten yang benar: olah data dulu di spreadsheet → visualisasikan dengan tabel/grafik → sematkan ke slide → presentasikan. Tidak bisa dibalik urutannya."
  },
  {
    id: 153,
    category: "Dampak Sosial Informatika",
    difficulty: "hard",
    type: "multiple-choice",
    question: "Story media sosial hilang dalam 24 jam dan chat hanya dibaca lawan bicara. Ciri yang membuat blog berbeda dari keduanya adalah ...",
    options: [
      "Blog hanya bisa dibaca oleh pembuatnya",
      "Blog selalu berupa video",
      "Blog tidak bisa berisi foto",
      "Blog seperti diary online yang tersimpan dan bisa dibaca semua orang"
    ],
    answer: 3,
    explanation: "Blog bersifat permanen dan dapat diakses oleh siapa saja di internet, berbeda dari story yang menghilang dalam 24 jam atau chat yang bersifat pribadi."
  },
  {
    id: 154,
    category: "Dampak Sosial Informatika",
    difficulty: "hard",
    type: "multiple-choice",
    question: "Kamu diminta membuat surat undangan resmi rapat untuk orang tua murid. Isinya teks naratif yang formal dan akan dicetak. Aplikasi yang paling tepat beserta alasannya adalah ...",
    options: [
      "Pengolah kata, karena isinya teks naratif resmi",
      "Spreadsheet, karena ada banyak angka",
      "Pengolah presentasi, karena perlu poin visual",
      "Pengolah gambar, karena harus penuh warna"
    ],
    answer: 0,
    explanation: "Surat resmi berisi teks naratif formal yang akan dicetak. Pengolah kata (Word/Google Docs) adalah pilihan tepat karena dirancang untuk membuat dokumen teks yang terstruktur dan rapi."
  },
  {
    id: 155,
    category: "Dampak Sosial Informatika",
    difficulty: "hard",
    type: "multiple-choice",
    question: "Vlog kelompokmu punya masalah: suara terdengar pelan, gambar pecah, dan ada bagian video yang salah ucap. Tindakan yang paling tepat adalah ...",
    options: [
      "Perbesar gambar dengan zoom digital, lalu unggah apa adanya",
      "Cek posisi mic, hindari zoom digital saat merekam, lalu potong bagian salah dengan cutting/trimming",
      "Rekam ulang di tempat gelap agar suara jelas",
      "Hapus semua video dan ganti dengan tulisan blog"
    ],
    answer: 1,
    explanation: "Tiga masalah butuh tiga solusi: suara pelan → cek posisi mic, gambar pecah → hindari zoom digital, salah ucap → potong dengan fitur cutting/trimming di editor video."
  },

];

/**
 * Fungsi helper untuk database soal
 * Digunakan oleh QuestionManager di script.js
 */
const QuestionDB = {
  /**
   * Ambil semua soal
   */
  getAll() {
    return [...QUESTIONS_DB];
  },

  /**
   * Ambil soal berdasarkan ID
   */
  getById(id) {
    return QUESTIONS_DB.find(q => q.id === id) || null;
  },

  /**
   * Ambil soal berdasarkan kategori
   */
  getByCategory(category) {
    return QUESTIONS_DB.filter(q => q.category === category);
  },

  /**
   * Ambil soal berdasarkan tingkat kesulitan
   */
  getByDifficulty(difficulty) {
    return QUESTIONS_DB.filter(q => q.difficulty === difficulty);
  },

  /**
   * Ambil soal berdasarkan tipe
   */
  getByType(type) {
    return QUESTIONS_DB.filter(q => q.type === type);
  },

  /**
   * Ambil poin berdasarkan tingkat kesulitan
   */
  getPoints(difficulty) {
    const pointMap = { easy: 5, medium: 10, hard: 15 };
    return pointMap[difficulty] || 10;
  },

  /**
   * Ambil soal acak yang belum digunakan oleh pemain tertentu.
   * Soal baru (ID >= 91) mendapat bobot 3x lebih tinggi agar lebih sering muncul.
   * @param {number[]} usedIds - Array ID soal yang sudah digunakan
   * @param {string} [difficulty] - Filter berdasarkan kesulitan (opsional)
   */
  getRandom(usedIds = [], difficulty = null) {
    let pool = QUESTIONS_DB.filter(q => !usedIds.includes(q.id));
    if (difficulty) pool = pool.filter(q => q.difficulty === difficulty);
    if (pool.length === 0) {
      // Reset jika semua soal sudah digunakan
      pool = difficulty
        ? QUESTIONS_DB.filter(q => q.difficulty === difficulty)
        : [...QUESTIONS_DB];
    }
    // Soal baru (ID >= 91) dimasukkan 3x ke weighted pool agar lebih diprioritaskan
    const weightedPool = [];
    pool.forEach(q => {
      const weight = q.id >= 91 ? 3 : 1;
      for (let i = 0; i < weight; i++) weightedPool.push(q);
    });
    return weightedPool[Math.floor(Math.random() * weightedPool.length)];
  },

  /**
   * Tambah soal baru (untuk fitur Bank Soal Guru)
   */
  add(question) {
    const newId = Math.max(...QUESTIONS_DB.map(q => q.id)) + 1;
    const newQuestion = { ...question, id: newId };
    QUESTIONS_DB.push(newQuestion);
    return newQuestion;
  },

  /**
   * Edit soal yang ada (untuk fitur Bank Soal Guru)
   */
  update(id, updatedData) {
    const index = QUESTIONS_DB.findIndex(q => q.id === id);
    if (index !== -1) {
      QUESTIONS_DB[index] = { ...QUESTIONS_DB[index], ...updatedData };
      return QUESTIONS_DB[index];
    }
    return null;
  },

  /**
   * Hapus soal (untuk fitur Bank Soal Guru)
   */
  delete(id) {
    const index = QUESTIONS_DB.findIndex(q => q.id === id);
    if (index !== -1) {
      QUESTIONS_DB.splice(index, 1);
      return true;
    }
    return false;
  },

  /**
   * Ambil daftar kategori unik
   */
  getCategories() {
    return [...new Set(QUESTIONS_DB.map(q => q.category))];
  },

  /**
   * Ambil statistik database soal
   */
  getStats() {
    return {
      total: QUESTIONS_DB.length,
      easy: QUESTIONS_DB.filter(q => q.difficulty === 'easy').length,
      medium: QUESTIONS_DB.filter(q => q.difficulty === 'medium').length,
      hard: QUESTIONS_DB.filter(q => q.difficulty === 'hard').length,
      byCategory: QuestionDB.getCategories().reduce((acc, cat) => {
        acc[cat] = QUESTIONS_DB.filter(q => q.category === cat).length;
        return acc;
      }, {})
    };
  }
};
