/**
 * SCRIPT.JS
 * Informatika Snakes & Ladders - Game Engine
 * 
 * Arsitektur:
 *  - GAME_CONFIG     : Konfigurasi global permainan
 *  - BOARD_CONFIG    : Definisi papan (ular, tangga, petak khusus)
 *  - POWERUP_CONFIG  : Definisi semua power-up
 *  - GameState       : State management terpusat
 *  - BoardManager    : Logika papan permainan
 *  - PlayerManager   : Manajemen pemain
 *  - DiceManager     : Logika dadu & animasi
 *  - QuestionManager : Pemilihan & evaluasi soal
 *  - PowerUpManager  : Sistem power-up
 *  - TurnManager     : Alur giliran
 *  - ScoreManager    : Sistem poin
 *  - AudioManager    : Efek suara
 *  - UIManager       : Render & interaksi UI
 *  - GameController  : Orkestrasi utama
 */

'use strict';

// ============================================================
//  GAME_CONFIG — ubah aturan di sini tanpa menyentuh logika
// ============================================================
const GAME_CONFIG = {
  boardSize: 64,          // Jumlah petak (1-64, finish di 64)
  questionTime: 25,       // Detik batas waktu menjawab soal
  minPlayers: 1,
  maxPlayers: 6,
  correctPoints: {        // Poin untuk jawaban benar
    easy: 5,
    medium: 10,
    hard: 15
  },
  wrongPenalty: -5,       // Penalti jawaban salah
  bonusCellPoints: 20,    // Poin untuk petak BONUS
  finishBonusPoints: 30,  // Bonus poin untuk finisher pertama
  diceAnimDuration: 800,  // ms animasi dadu berputar
  moveAnimDelay: 180,     // ms jeda antar langkah bidak
  feedbackDelay: 2200,    // ms sebelum feedback otomatis hilang
  winCondition: 'most_points', // Pemenang = total poin tertinggi setelah ronde selesai
  boardCols: 8,           // Kolom papan (64 / 8 = 8 baris)
};

// ============================================================
//  BOARD_CONFIG — layout papan permainan
// ============================================================
const BOARD_CONFIG = {
  // Tangga: key=petak bawah, value=petak atas
  ladders: {
    4:  14,
    12: 27,
    21: 39,
    33: 48,
    42: 58,
  },
  // Ular: key=kepala, value=ekor
  snakes: {
    18: 8,
    31: 17,
    45: 29,
    53: 37,
    62: 44,
  },
  // Petak khusus: tipe petak
  specialCells: {
    7:  'power-up',
    15: 'bonus',
    20: 'challenge',
    22: 'power-up',
    25: 'power-up',
    30: 'trap',
    35: 'bonus',
    38: 'power-up',
    44: 'challenge',   // kepala ular juga bisa punya efek
    47: 'power-up',
    50: 'bonus',
    55: 'power-up',
    60: 'challenge',
  },
  // Semua petak lainnya otomatis menjadi 'question'
};

// ============================================================
//  POWERUP_CONFIG — definisi semua power-up
// ============================================================

// ── puIconHTML(id, size) ─────────────────────────────────────
// Render sprite SVG pixel 16x16 untuk setiap power-up.
// id: string id power-up. size: ukuran render px (default 24).
// ─────────────────────────────────────────────────────────────
function puIconHTML(id, size) {
  const s = size || 24;
  // Setiap entry: SVG string lengkap viewBox 16x16
  const SPRITES = {
    // BOOST — roket pixel biru-oranye
    'boost': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${s}" height="${s}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:inline-block;vertical-align:middle">
      <rect x="7" y="1" width="2" height="2" fill="#2b2d42"/>
      <rect x="6" y="3" width="4" height="1" fill="#2b2d42"/>
      <rect x="5" y="4" width="6" height="1" fill="#2b2d42"/>
      <rect x="4" y="5" width="8" height="5" fill="#2b2d42"/>
      <rect x="5" y="10" width="6" height="1" fill="#2b2d42"/>
      <rect x="4" y="11" width="3" height="2" fill="#2b2d42"/>
      <rect x="9" y="11" width="3" height="2" fill="#2b2d42"/>
      <rect x="7" y="2" width="2" height="1" fill="#3498db"/>
      <rect x="6" y="4" width="4" height="1" fill="#3498db"/>
      <rect x="5" y="5" width="6" height="5" fill="#3498db"/>
      <rect x="5" y="10" width="2" height="1" fill="#fff8e7"/>
      <rect x="9" y="10" width="2" height="1" fill="#fff8e7"/>
      <rect x="5" y="11" width="2" height="1" fill="#ff9f45"/>
      <rect x="9" y="11" width="2" height="1" fill="#ff9f45"/>
      <rect x="6" y="12" width="1" height="2" fill="#ffd93d"/>
      <rect x="9" y="12" width="1" height="2" fill="#ffd93d"/>
      <rect x="7" y="6" width="2" height="3" fill="#fff8e7"/>
    </svg>`,
    // SHIELD — tameng pixel kuning
    'shield': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${s}" height="${s}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:inline-block;vertical-align:middle">
      <rect x="3" y="1" width="10" height="1" fill="#2b2d42"/>
      <rect x="2" y="2" width="1" height="7" fill="#2b2d42"/>
      <rect x="13" y="2" width="1" height="7" fill="#2b2d42"/>
      <rect x="3" y="9" width="3" height="1" fill="#2b2d42"/>
      <rect x="10" y="9" width="3" height="1" fill="#2b2d42"/>
      <rect x="4" y="10" width="3" height="1" fill="#2b2d42"/>
      <rect x="9" y="10" width="3" height="1" fill="#2b2d42"/>
      <rect x="5" y="11" width="6" height="1" fill="#2b2d42"/>
      <rect x="6" y="12" width="4" height="1" fill="#2b2d42"/>
      <rect x="7" y="13" width="2" height="1" fill="#2b2d42"/>
      <rect x="3" y="2" width="10" height="7" fill="#ffd93d"/>
      <rect x="4" y="9" width="2" height="1" fill="#ffd93d"/>
      <rect x="10" y="9" width="2" height="1" fill="#ffd93d"/>
      <rect x="4" y="2" width="2" height="2" fill="#fff8e7"/>
    </svg>`,
    // DOUBLE-DICE — dua dadu pixel
    'double-dice': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${s}" height="${s}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:inline-block;vertical-align:middle">
      <rect x="1" y="1" width="7" height="7" fill="#fff8e7"/>
      <rect x="1" y="1" width="7" height="1" fill="#2b2d42"/>
      <rect x="1" y="7" width="7" height="1" fill="#2b2d42"/>
      <rect x="1" y="1" width="1" height="7" fill="#2b2d42"/>
      <rect x="7" y="1" width="1" height="7" fill="#2b2d42"/>
      <rect x="2" y="2" width="2" height="2" fill="#2b2d42"/>
      <rect x="5" y="5" width="2" height="2" fill="#2b2d42"/>
      <rect x="8" y="8" width="7" height="7" fill="#fff8e7"/>
      <rect x="8" y="8" width="7" height="1" fill="#2b2d42"/>
      <rect x="8" y="14" width="7" height="1" fill="#2b2d42"/>
      <rect x="8" y="8" width="1" height="7" fill="#2b2d42"/>
      <rect x="14" y="8" width="1" height="7" fill="#2b2d42"/>
      <rect x="9" y="9" width="2" height="2" fill="#2b2d42"/>
      <rect x="12" y="9" width="2" height="2" fill="#2b2d42"/>
      <rect x="11" y="11" width="2" height="2" fill="#2b2d42"/>
      <rect x="9" y="12" width="2" height="2" fill="#2b2d42"/>
      <rect x="12" y="12" width="2" height="2" fill="#2b2d42"/>
    </svg>`,
    // SWAP — dua panah melingkar
    'swap': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${s}" height="${s}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:inline-block;vertical-align:middle">
      <rect x="2" y="3" width="8" height="2" fill="#2b2d42"/>
      <rect x="1" y="4" width="2" height="1" fill="#2b2d42"/>
      <rect x="9" y="2" width="1" height="3" fill="#2b2d42"/>
      <rect x="2" y="4" width="8" height="1" fill="#2ec4b6"/>
      <rect x="1" y="5" width="3" height="1" fill="#2ec4b6"/>
      <rect x="9" y="3" width="3" height="1" fill="#2ec4b6"/>
      <rect x="6" y="9" width="8" height="2" fill="#2b2d42"/>
      <rect x="13" y="10" width="2" height="1" fill="#2b2d42"/>
      <rect x="5" y="9" width="1" height="3" fill="#2b2d42"/>
      <rect x="6" y="10" width="8" height="1" fill="#ff6b9d"/>
      <rect x="12" y="11" width="3" height="1" fill="#ff6b9d"/>
      <rect x="4" y="10" width="3" height="1" fill="#ff6b9d"/>
    </svg>`,
    // MINI-LADDER — tangga kecil hijau
    'mini-ladder': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${s}" height="${s}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:inline-block;vertical-align:middle">
      <rect x="3" y="0" width="3" height="16" fill="#2b2d42"/>
      <rect x="4" y="0" width="2" height="16" fill="#a0673c"/>
      <rect x="10" y="0" width="3" height="16" fill="#2b2d42"/>
      <rect x="11" y="0" width="2" height="16" fill="#a0673c"/>
      <rect x="3" y="3" width="10" height="2" fill="#2b2d42"/>
      <rect x="4" y="4" width="8" height="1" fill="#d9a066"/>
      <rect x="3" y="7" width="10" height="2" fill="#2b2d42"/>
      <rect x="4" y="8" width="8" height="1" fill="#d9a066"/>
      <rect x="3" y="11" width="10" height="2" fill="#2b2d42"/>
      <rect x="4" y="12" width="8" height="1" fill="#d9a066"/>
      <rect x="6" y="1" width="1" height="3" fill="#8be37f"/>
    </svg>`,
    // POISON — labu ungu berduri
    'poison': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${s}" height="${s}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:inline-block;vertical-align:middle">
      <rect x="6" y="0" width="4" height="1" fill="#5dbb63"/>
      <rect x="7" y="1" width="2" height="2" fill="#5dbb63"/>
      <rect x="5" y="2" width="6" height="1" fill="#2b2d42"/>
      <rect x="4" y="3" width="8" height="1" fill="#2b2d42"/>
      <rect x="3" y="4" width="10" height="7" fill="#2b2d42"/>
      <rect x="4" y="11" width="8" height="1" fill="#2b2d42"/>
      <rect x="5" y="12" width="6" height="1" fill="#2b2d42"/>
      <rect x="5" y="3" width="6" height="1" fill="#9b59b6"/>
      <rect x="4" y="4" width="8" height="7" fill="#9b59b6"/>
      <rect x="5" y="11" width="6" height="1" fill="#9b59b6"/>
      <rect x="5" y="5" width="2" height="2" fill="#fff8e7"/>
      <rect x="2" y="6" width="2" height="1" fill="#2b2d42"/>
      <rect x="12" y="6" width="2" height="1" fill="#2b2d42"/>
      <rect x="7" y="8" width="3" height="2" fill="#2b2d42"/>
    </svg>`,
    // SKIP — jam pasir
    'skip': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${s}" height="${s}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:inline-block;vertical-align:middle">
      <rect x="3" y="1" width="10" height="1" fill="#2b2d42"/>
      <rect x="3" y="14" width="10" height="1" fill="#2b2d42"/>
      <rect x="3" y="2" width="10" height="3" fill="#d9a066"/>
      <rect x="3" y="11" width="10" height="3" fill="#d9a066"/>
      <rect x="3" y="2" width="2" height="2" fill="#fff8e7"/>
      <rect x="5" y="5" width="6" height="1" fill="#2b2d42"/>
      <rect x="5" y="10" width="6" height="1" fill="#2b2d42"/>
      <rect x="6" y="6" width="4" height="1" fill="#e74c3c"/>
      <rect x="7" y="7" width="2" height="3" fill="#e74c3c"/>
    </svg>`,
    // MAGNET — magnet tapal kuda merah
    'magnet': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${s}" height="${s}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:inline-block;vertical-align:middle">
      <rect x="2" y="5" width="4" height="8" fill="#2b2d42"/>
      <rect x="10" y="5" width="4" height="8" fill="#2b2d42"/>
      <rect x="2" y="2" width="4" height="4" fill="#2b2d42"/>
      <rect x="10" y="2" width="4" height="4" fill="#2b2d42"/>
      <rect x="6" y="1" width="4" height="2" fill="#2b2d42"/>
      <rect x="3" y="3" width="2" height="2" fill="#e74c3c"/>
      <rect x="3" y="5" width="2" height="7" fill="#e74c3c"/>
      <rect x="11" y="3" width="2" height="2" fill="#3498db"/>
      <rect x="11" y="5" width="2" height="7" fill="#3498db"/>
      <rect x="6" y="2" width="4" height="1" fill="#d9a066"/>
      <rect x="5" y="12" width="2" height="2" fill="#e74c3c"/>
      <rect x="9" y="12" width="2" height="2" fill="#3498db"/>
    </svg>`,
    // RANDOM-TELEPORT — portal spiral ungu
    'random-teleport': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${s}" height="${s}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:inline-block;vertical-align:middle">
      <rect x="4" y="1" width="8" height="1" fill="#2b2d42"/>
      <rect x="2" y="2" width="2" height="1" fill="#2b2d42"/>
      <rect x="12" y="2" width="2" height="1" fill="#2b2d42"/>
      <rect x="1" y="3" width="2" height="5" fill="#2b2d42"/>
      <rect x="13" y="3" width="2" height="5" fill="#2b2d42"/>
      <rect x="2" y="8" width="2" height="1" fill="#2b2d42"/>
      <rect x="12" y="8" width="2" height="1" fill="#2b2d42"/>
      <rect x="4" y="9" width="3" height="1" fill="#2b2d42"/>
      <rect x="9" y="9" width="3" height="1" fill="#2b2d42"/>
      <rect x="5" y="10" width="6" height="1" fill="#2b2d42"/>
      <rect x="4" y="2" width="8" height="1" fill="#9b59b6"/>
      <rect x="3" y="3" width="10" height="5" fill="#9b59b6"/>
      <rect x="3" y="8" width="3" height="1" fill="#9b59b6"/>
      <rect x="10" y="8" width="3" height="1" fill="#9b59b6"/>
      <rect x="6" y="10" width="4" height="1" fill="#9b59b6"/>
      <rect x="6" y="4" width="4" height="3" fill="#fff8e7"/>
      <rect x="7" y="3" width="2" height="5" fill="#fff8e7"/>
      <rect x="5" y="5" width="6" height="1" fill="#fff8e7"/>
      <rect x="6" y="12" width="4" height="2" fill="#ffd93d"/>
      <rect x="5" y="13" width="6" height="1" fill="#2b2d42"/>
    </svg>`,
    // SECOND-CHANCE — hati merah pixel
    'second-chance': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${s}" height="${s}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:inline-block;vertical-align:middle">
      <rect x="1" y="3" width="5" height="1" fill="#2b2d42"/>
      <rect x="10" y="3" width="5" height="1" fill="#2b2d42"/>
      <rect x="0" y="4" width="1" height="5" fill="#2b2d42"/>
      <rect x="6" y="4" width="1" height="1" fill="#2b2d42"/>
      <rect x="9" y="4" width="1" height="1" fill="#2b2d42"/>
      <rect x="15" y="4" width="1" height="5" fill="#2b2d42"/>
      <rect x="0" y="9" width="4" height="1" fill="#2b2d42"/>
      <rect x="12" y="9" width="4" height="1" fill="#2b2d42"/>
      <rect x="4" y="10" width="4" height="1" fill="#2b2d42"/>
      <rect x="8" y="10" width="4" height="1" fill="#2b2d42"/>
      <rect x="5" y="11" width="6" height="1" fill="#2b2d42"/>
      <rect x="6" y="12" width="4" height="1" fill="#2b2d42"/>
      <rect x="7" y="13" width="2" height="1" fill="#2b2d42"/>
      <rect x="1" y="4" width="5" height="5" fill="#e74c3c"/>
      <rect x="10" y="4" width="5" height="5" fill="#e74c3c"/>
      <rect x="6" y="5" width="4" height="5" fill="#e74c3c"/>
      <rect x="1" y="3" width="2" height="2" fill="#ff6b9d"/>
    </svg>`,
    // KNOWLEDGE-BOOST — buku terbuka hijau
    'knowledge-boost': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${s}" height="${s}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:inline-block;vertical-align:middle">
      <rect x="1" y="3" width="14" height="10" fill="#2b2d42"/>
      <rect x="2" y="4" width="6" height="8" fill="#2ecc71"/>
      <rect x="8" y="4" width="6" height="8" fill="#3498db"/>
      <rect x="7" y="3" width="2" height="10" fill="#2b2d42"/>
      <rect x="8" y="4" width="1" height="8" fill="#2b2d42"/>
      <rect x="3" y="6" width="4" height="1" fill="#fff8e7"/>
      <rect x="3" y="8" width="4" height="1" fill="#fff8e7"/>
      <rect x="3" y="10" width="3" height="1" fill="#fff8e7"/>
      <rect x="9" y="6" width="4" height="1" fill="#fff8e7"/>
      <rect x="9" y="8" width="4" height="1" fill="#fff8e7"/>
      <rect x="9" y="10" width="3" height="1" fill="#fff8e7"/>
      <rect x="6" y="2" width="4" height="2" fill="#a0673c"/>
      <rect x="6" y="1" width="4" height="1" fill="#2b2d42"/>
    </svg>`,
    // TARGET — lingkaran target merah-putih
    'target': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${s}" height="${s}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:inline-block;vertical-align:middle">
      <rect x="4" y="1" width="8" height="1" fill="#2b2d42"/>
      <rect x="2" y="2" width="2" height="1" fill="#2b2d42"/>
      <rect x="12" y="2" width="2" height="1" fill="#2b2d42"/>
      <rect x="1" y="3" width="2" height="8" fill="#2b2d42"/>
      <rect x="13" y="3" width="2" height="8" fill="#2b2d42"/>
      <rect x="2" y="11" width="2" height="1" fill="#2b2d42"/>
      <rect x="12" y="11" width="2" height="1" fill="#2b2d42"/>
      <rect x="4" y="12" width="8" height="1" fill="#2b2d42"/>
      <rect x="3" y="2" width="10" height="10" fill="#e74c3c"/>
      <rect x="5" y="4" width="6" height="6" fill="#fff8e7"/>
      <rect x="6" y="5" width="4" height="4" fill="#e74c3c"/>
      <rect x="7" y="6" width="2" height="2" fill="#2b2d42"/>
    </svg>`,
    // TRAP — bom hitam (sama dengan ikon petak jebakan)
    'trap': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${s}" height="${s}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:inline-block;vertical-align:middle">
      <rect x="6" y="0" width="1" height="1" fill="#ffd93d"/>
      <rect x="7" y="0" width="1" height="1" fill="#ff9f45"/>
      <rect x="5" y="1" width="2" height="1" fill="#ff9f45"/>
      <rect x="7" y="1" width="1" height="1" fill="#ffd93d"/>
      <rect x="7" y="2" width="1" height="1" fill="#a0673c"/>
      <rect x="7" y="3" width="2" height="1" fill="#a0673c"/>
      <rect x="8" y="4" width="1" height="1" fill="#a0673c"/>
      <rect x="4" y="4" width="8" height="1" fill="#2b2d42"/>
      <rect x="2" y="5" width="2" height="1" fill="#2b2d42"/>
      <rect x="12" y="5" width="2" height="1" fill="#2b2d42"/>
      <rect x="1" y="6" width="2" height="1" fill="#2b2d42"/>
      <rect x="13" y="6" width="2" height="1" fill="#2b2d42"/>
      <rect x="1" y="7" width="1" height="4" fill="#2b2d42"/>
      <rect x="14" y="7" width="1" height="4" fill="#2b2d42"/>
      <rect x="2" y="11" width="2" height="1" fill="#2b2d42"/>
      <rect x="12" y="11" width="2" height="1" fill="#2b2d42"/>
      <rect x="3" y="12" width="2" height="1" fill="#2b2d42"/>
      <rect x="11" y="12" width="2" height="1" fill="#2b2d42"/>
      <rect x="4" y="13" width="8" height="1" fill="#2b2d42"/>
      <rect x="2" y="6" width="12" height="7" fill="#2b2d42"/>
      <rect x="3" y="6" width="1" height="1" fill="#fff8e7"/>
      <rect x="3" y="7" width="1" height="2" fill="#fff8e7"/>
      <rect x="4" y="7" width="2" height="2" fill="#fff8e7"/>
      <rect x="5" y="8" width="1" height="1" fill="#2b2d42"/>
    </svg>`,
    // STEAL-POINTS — tangan mencuri koin kuning
    'steal-points': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${s}" height="${s}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:inline-block;vertical-align:middle">
      <rect x="5" y="1" width="6" height="1" fill="#2b2d42"/>
      <rect x="4" y="2" width="1" height="4" fill="#2b2d42"/>
      <rect x="11" y="2" width="1" height="4" fill="#2b2d42"/>
      <rect x="4" y="6" width="8" height="1" fill="#2b2d42"/>
      <rect x="5" y="2" width="6" height="4" fill="#ffd93d"/>
      <rect x="6" y="3" width="4" height="2" fill="#ff9f45"/>
      <rect x="2" y="8" width="12" height="1" fill="#2b2d42"/>
      <rect x="1" y="9" width="3" height="5" fill="#2b2d42"/>
      <rect x="12" y="9" width="3" height="5" fill="#2b2d42"/>
      <rect x="2" y="9" width="2" height="4" fill="#e74c3c"/>
      <rect x="12" y="9" width="2" height="4" fill="#e74c3c"/>
      <rect x="4" y="10" width="8" height="4" fill="#2b2d42"/>
      <rect x="5" y="11" width="6" height="2" fill="#e74c3c"/>
      <rect x="7" y="13" width="2" height="1" fill="#e74c3c"/>
      <rect x="6" y="9" width="4" height="1" fill="#ffd93d"/>
    </svg>`,
    // DOUBLE-POINTS — tanda bintang ganda
    'double-points': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${s}" height="${s}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:inline-block;vertical-align:middle">
      <rect x="3" y="1" width="2" height="1" fill="#2b2d42"/>
      <rect x="2" y="2" width="4" height="3" fill="#2b2d42"/>
      <rect x="1" y="3" width="6" height="1" fill="#2b2d42"/>
      <rect x="2" y="4" width="2" height="3" fill="#2b2d42"/>
      <rect x="4" y="5" width="2" height="2" fill="#2b2d42"/>
      <rect x="3" y="2" width="2" height="1" fill="#ffd93d"/>
      <rect x="2" y="3" width="4" height="1" fill="#ffd93d"/>
      <rect x="3" y="4" width="1" height="2" fill="#ffd93d"/>
      <rect x="5" y="4" width="1" height="2" fill="#ffd93d"/>
      <rect x="4" y="5" width="1" height="1" fill="#ffd93d"/>
      <rect x="9" y="5" width="2" height="1" fill="#2b2d42"/>
      <rect x="8" y="6" width="4" height="3" fill="#2b2d42"/>
      <rect x="7" y="7" width="6" height="1" fill="#2b2d42"/>
      <rect x="8" y="8" width="2" height="3" fill="#2b2d42"/>
      <rect x="10" y="9" width="2" height="2" fill="#2b2d42"/>
      <rect x="9" y="6" width="2" height="1" fill="#ff9f45"/>
      <rect x="8" y="7" width="4" height="1" fill="#ff9f45"/>
      <rect x="9" y="8" width="1" height="2" fill="#ff9f45"/>
      <rect x="11" y="8" width="1" height="2" fill="#ff9f45"/>
      <rect x="10" y="9" width="1" height="1" fill="#ff9f45"/>
      <rect x="7" y="3" width="2" height="1" fill="#2b2d42"/>
      <rect x="13" y="3" width="2" height="1" fill="#2b2d42"/>
      <rect x="7" y="4" width="1" height="1" fill="#2b2d42"/>
      <rect x="14" y="4" width="1" height="1" fill="#2b2d42"/>
      <rect x="9" y="2" width="1" height="2" fill="#2b2d42"/>
      <rect x="13" y="2" width="1" height="2" fill="#2b2d42"/>
    </svg>`,
  };
  const svg = SPRITES[id];
  if (!svg) return `<span style="display:inline-block;width:${s}px;height:${s}px;background:#ffd93d;border:2px solid #2b2d42;vertical-align:middle;font-size:${Math.floor(s*0.6)}px;line-height:${s}px;text-align:center;font-family:monospace">?</span>`;
  return svg;
}

// ── EFFECT_ICON — peta kunci bracket ke sprite HTML ───────────
// Kunci: string bracket tanpa tanda kurung siku (ex: 'TANGGA').
// Value: fungsi(size) → HTML string.
// ─────────────────────────────────────────────────────────────
function effectIconHTML(key, size) {
  const s = size || 64;
  const MAP = {
    // Board sprites — pakai ulang SVG ikon papan
    'TANGGA':  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="${s}" height="${s}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:block;margin:0 auto"><rect x='0' y='0' width='1' height='20' fill='%232b2d42'/><rect x='19' y='0' width='1' height='20' fill='%232b2d42'/><rect x='1' y='0' width='4' height='20' fill='%23a0673c'/><rect x='2' y='1' width='1' height='18' fill='%23c8864a'/><rect x='15' y='0' width='4' height='20' fill='%23a0673c'/><rect x='16' y='1' width='1' height='18' fill='%23c8864a'/><rect x='5' y='3' width='10' height='1' fill='%232b2d42'/><rect x='5' y='6' width='10' height='1' fill='%232b2d42'/><rect x='5' y='4' width='10' height='2' fill='%23d9a066'/><rect x='5' y='9' width='10' height='1' fill='%232b2d42'/><rect x='5' y='12' width='10' height='1' fill='%232b2d42'/><rect x='5' y='10' width='10' height='2' fill='%23d9a066'/><rect x='5' y='15' width='10' height='1' fill='%232b2d42'/><rect x='5' y='18' width='10' height='1' fill='%232b2d42'/><rect x='5' y='16' width='10' height='2' fill='%23d9a066'/></svg>`,
    'ULAR':    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="${s}" height="${s}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:block;margin:0 auto"><rect x='3' y='0' width='14' height='1' fill='%232b2d42'/><rect x='2' y='1' width='1' height='10' fill='%232b2d42'/><rect x='17' y='1' width='1' height='10' fill='%232b2d42'/><rect x='3' y='11' width='14' height='1' fill='%232b2d42'/><rect x='3' y='1' width='14' height='10' fill='%238be37f'/><rect x='5' y='2' width='4' height='4' fill='%23fff8e7'/><rect x='6' y='3' width='2' height='2' fill='%232b2d42'/><rect x='11' y='2' width='4' height='4' fill='%23fff8e7'/><rect x='12' y='3' width='2' height='2' fill='%232b2d42'/><rect x='3' y='7' width='3' height='2' fill='%23ff9f45'/><rect x='14' y='7' width='3' height='2' fill='%23ff9f45'/><rect x='6' y='12' width='12' height='1' fill='%232b2d42'/><rect x='18' y='12' width='1' height='4' fill='%232b2d42'/><rect x='6' y='15' width='12' height='1' fill='%232b2d42'/><rect x='5' y='12' width='1' height='4' fill='%232b2d42'/><rect x='6' y='12' width='12' height='4' fill='%235dbb63'/></svg>`,
    'JEBAKAN': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${s}" height="${s}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:block;margin:0 auto"><rect x='6' y='0' width='1' height='1' fill='%23ffd93d'/><rect x='7' y='0' width='1' height='1' fill='%23ff9f45'/><rect x='5' y='1' width='2' height='1' fill='%23ff9f45'/><rect x='7' y='1' width='1' height='1' fill='%23ffd93d'/><rect x='7' y='2' width='1' height='1' fill='%23a0673c'/><rect x='7' y='3' width='2' height='1' fill='%23a0673c'/><rect x='8' y='4' width='1' height='1' fill='%23a0673c'/><rect x='4' y='4' width='8' height='1' fill='%232b2d42'/><rect x='2' y='5' width='2' height='1' fill='%232b2d42'/><rect x='12' y='5' width='2' height='1' fill='%232b2d42'/><rect x='1' y='6' width='2' height='1' fill='%232b2d42'/><rect x='13' y='6' width='2' height='1' fill='%232b2d42'/><rect x='1' y='7' width='1' height='4' fill='%232b2d42'/><rect x='14' y='7' width='1' height='4' fill='%232b2d42'/><rect x='2' y='11' width='2' height='1' fill='%232b2d42'/><rect x='12' y='11' width='2' height='1' fill='%232b2d42'/><rect x='3' y='12' width='2' height='1' fill='%232b2d42'/><rect x='11' y='12' width='2' height='1' fill='%232b2d42'/><rect x='4' y='13' width='8' height='1' fill='%232b2d42'/><rect x='2' y='6' width='12' height='7' fill='%232b2d42'/><rect x='3' y='6' width='2' height='1' fill='%23fff8e7'/><rect x='3' y='7' width='1' height='2' fill='%23fff8e7'/><rect x='4' y='7' width='2' height='2' fill='%23fff8e7'/><rect x='5' y='8' width='1' height='1' fill='%232b2d42'/></svg>`,
    'RAMBU':   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${s}" height="${s}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:block;margin:0 auto"><rect x='7' y='0' width='2' height='3' fill='%23a0673c'/><rect x='3' y='3' width='10' height='1' fill='%232b2d42'/><rect x='2' y='4' width='12' height='7' fill='%232b2d42'/><rect x='3' y='11' width='10' height='1' fill='%232b2d42'/><rect x='4' y='3' width='8' height='8' fill='%23e74c3c'/><rect x='3' y='4' width='10' height='6' fill='%23e74c3c'/><rect x='4' y='10' width='8' height='1' fill='%23e74c3c'/><rect x='6' y='5' width='4' height='2' fill='%23fff8e7'/><rect x='7' y='12' width='2' height='4' fill='%23a0673c'/></svg>`,
    'BINTANG': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${s}" height="${s}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:block;margin:0 auto"><rect x='7' y='1' width='2' height='2' fill='%23ffd93d'/><rect x='5' y='3' width='6' height='2' fill='%23ffd93d'/><rect x='1' y='5' width='14' height='3' fill='%23ffd93d'/><rect x='3' y='8' width='10' height='2' fill='%23ffd93d'/><rect x='4' y='10' width='3' height='4' fill='%23ffd93d'/><rect x='9' y='10' width='3' height='4' fill='%23ffd93d'/><rect x='7' y='1' width='2' height='1' fill='%23ff9f45'/><rect x='5' y='3' width='1' height='1' fill='%23fff8e7'/><rect x='1' y='5' width='2' height='1' fill='%23fff8e7'/></svg>`,
    'PETIR':   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${s}" height="${s}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:block;margin:0 auto"><rect x='9' y='1' width='4' height='1' fill='%232b2d42'/><rect x='6' y='2' width='7' height='1' fill='%232b2d42'/><rect x='5' y='3' width='6' height='5' fill='%232b2d42'/><rect x='3' y='7' width='8' height='1' fill='%232b2d42'/><rect x='4' y='8' width='7' height='1' fill='%232b2d42'/><rect x='5' y='9' width='5' height='5' fill='%232b2d42'/><rect x='7' y='14' width='3' height='1' fill='%232b2d42'/><rect x='9" y='2' width='3' height='1' fill='%23ffd93d'/><rect x='7' y='3' width='4' height='5' fill='%23ffd93d'/><rect x='5' y='8' width='5' height='1' fill='%23ffd93d'/><rect x='6' y='9' width='3' height='4' fill='%23ffd93d'/><rect x='8' y='13' width='2' height='1' fill='%23ffd93d'/><rect x='9' y='3' width='2' height='1' fill='%23fff8e7'/></svg>`,
    // Power-up sprites reuse — panggil puIconHTML
    'POWERUP': puIconHTML('boost', s),
    'PENUH':   puIconHTML('skip', s),
    'SHIELD':  puIconHTML('shield', s),
    'JANTUNG': puIconHTML('second-chance', s),
    'DADU':    puIconHTML('double-dice', s),
    'SWAP':    puIconHTML('swap', s),
    'SKIP':    puIconHTML('skip', s),
    'BUKU':    puIconHTML('knowledge-boost', s),
    'TARGET':  puIconHTML('target', s),
    'BOM':     puIconHTML('trap', s),
    'TROFI': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${s}" height="${s}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:block;margin:0 auto"><rect x='1' y='0' width='14' height='8' fill='%23ffd93d'/><rect x='0' y='2' width='2' height='5' fill='%23ffd93d'/><rect x='14' y='2' width='2' height='5' fill='%23ffd93d'/><rect x='1' y='0' width='14' height='1' fill='%232b2d42'/><rect x='0' y='2' width='1' height='1' fill='%232b2d42'/><rect x='15' y='2' width='1' height='1' fill='%232b2d42'/><rect x='0' y='7' width='2' height='1' fill='%232b2d42'/><rect x='14' y='7' width='2' height='1' fill='%232b2d42'/><rect x='1' y='8' width='14' height='1' fill='%232b2d42'/><rect x='6' y='9' width='4' height='3' fill='%23a0673c'/><rect x='4' y='12" width='8' height='2' fill='%23a0673c'/><rect x='4' y='11' width='8' height='1' fill='%232b2d42'/><rect x='3' y='14" width='10' height='1' fill='%232b2d42'/><rect x='2' y='2' width='3' height='2' fill='%23fff8e7'/></svg>`,
    'SELESAI': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${s}" height="${s}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:block;margin:0 auto"><rect x='3' y='0' width='1' height='14' fill='%232b2d42'/><rect x='4' y='0' width='7' height='1' fill='%232b2d42'/><rect x='4' y='0' width='4' height='1' fill='%23fff8e7'/><rect x='8' y='0" width='3' height='1' fill='%232b2d42'/><rect x='4' y='1' width='4' height='1' fill='%232b2d42'/><rect x='8' y='1' width='3' height='1' fill='%23fff8e7'/><rect x='4' y='2' width='4' height='1' fill='%23fff8e7'/><rect x='8' y='2' width='3' height='1' fill='%232b2d42'/><rect x='4' y='3' width='4' height='1' fill='%232b2d42'/><rect x='8' y='3' width='3' height='1' fill='%23fff8e7'/><rect x='4' y='4' width='7' height='1' fill='%232b2d42'/></svg>`,
  };
  const html = MAP[key];
  if (!html) return `<span style="font-size:${s}px;display:block;text-align:center">${key}</span>`;
  return html;
}

const POWERUP_CONFIG = [
  {
    id: 'boost',
    name: 'BOOST',
    icon: 'boost',
    description: 'Maju 3 petak',
    rarity: 'common',
    targetSelf: true,
    effect(state, actor) {
      const newPos = Math.min(actor.position + 3, GAME_CONFIG.boardSize);
      return { type: 'move', playerId: actor.id, position: newPos, message: `${actor.name} maju 3 petak!` };
    }
  },
  {
    id: 'shield',
    name: 'SHIELD',
    icon: 'shield',
    description: 'Melindungi dari 1 efek negatif',
    rarity: 'uncommon',
    targetSelf: true,
    effect(state, actor) {
      return { type: 'shield', playerId: actor.id, message: `${actor.name} mendapat perlindungan!` };
    }
  },
  {
    id: 'double-dice',
    name: 'DOUBLE DICE',
    icon: 'double-dice',
    description: 'Lempar dadu 2x, pilih yang terbaik',
    rarity: 'uncommon',
    targetSelf: true,
    effect(state, actor) {
      return { type: 'double-dice', playerId: actor.id, message: `${actor.name} akan lempar dadu 2x!` };
    }
  },
  {
    id: 'swap',
    name: 'SWAP',
    icon: 'swap',
    description: 'Tukar posisi dengan pemain lain',
    rarity: 'rare',
    targetSelf: false,
    maxUse: 1,
    effect(state, actor, target) {
      return { type: 'swap', playerId: actor.id, targetId: target.id, message: `${actor.name} tukar posisi dengan ${target.name}!` };
    }
  },
  {
    id: 'mini-ladder',
    name: 'MINI LADDER',
    icon: 'mini-ladder',
    description: 'Naik 5 petak',
    rarity: 'uncommon',
    targetSelf: true,
    effect(state, actor) {
      const newPos = Math.min(actor.position + 5, GAME_CONFIG.boardSize);
      return { type: 'move', playerId: actor.id, position: newPos, message: `${actor.name} naik 5 petak!` };
    }
  },
  {
    id: 'poison',
    name: 'POISON',
    icon: 'poison',
    description: 'Paksa pemain lain mundur 3 petak',
    rarity: 'uncommon',
    targetSelf: false,
    effect(state, actor, target) {
      const newPos = Math.max(target.position - 3, 1);
      return { type: 'move', playerId: target.id, position: newPos, message: `${target.name} terkena racun, mundur 3 petak!` };
    }
  },
  {
    id: 'skip',
    name: 'SKIP',
    icon: 'skip',
    description: 'Pemain lain kehilangan 1 giliran',
    rarity: 'uncommon',
    targetSelf: false,
    effect(state, actor, target) {
      return { type: 'skip', playerId: target.id, message: `${target.name} kehilangan 1 giliran!` };
    }
  },
  {
    id: 'magnet',
    name: 'MAGNET',
    icon: 'magnet',
    description: 'Ambil 5 poin dari pemain terdepan dalam poin',
    rarity: 'rare',
    targetSelf: true,
    effect(state, actor) {
      // Cari pemain aktif (belum finish) dengan poin terbanyak selain aktor
      const others = state.players.filter(p => p.id !== actor.id && !p.finished);
      if (others.length === 0) return { type: 'none', returnPowerUpId: 'magnet', message: 'Tidak ada pemain lain yang aktif!' };
      const richest = others.reduce((prev, cur) => cur.score > prev.score ? cur : prev);
      if (richest.score <= 0) return { type: 'none-magnet', returnPowerUpId: 'magnet', message: 'Tidak ada poin yang bisa ditarik!' };
      const stolen = Math.min(5, richest.score);
      return { type: 'steal-score', fromId: richest.id, toId: actor.id, amount: stolen,
               message: `${actor.name} menyedot ${stolen} poin dari ${richest.name}!` };
    }
  },
  {
    id: 'random-teleport',
    name: 'TELEPORT',
    icon: 'random-teleport',
    description: 'Maju acak 4-10 petak. Petak tujuan tidak memicu efek.',
    rarity: 'rare',
    targetSelf: true,
    effect(state, actor) {
      const steps = Math.floor(Math.random() * 7) + 4; // 4–10
      const newPos = Math.min(actor.position + steps, GAME_CONFIG.boardSize);
      return { type: 'move', playerId: actor.id, position: newPos,
               message: `${actor.name} teleport maju ${steps} petak ke petak ${newPos}!` };
    }
  },
  {
    id: 'second-chance',
    name: 'SECOND CHANCE',
    icon: 'second-chance',
    description: 'Jika salah jawab, dapat 1 kesempatan lagi',
    rarity: 'uncommon',
    targetSelf: true,
    effect(state, actor) {
      return { type: 'second-chance', playerId: actor.id, message: `${actor.name} punya kesempatan kedua untuk menjawab!` };
    }
  },
  {
    id: 'knowledge-boost',
    name: 'KNOWLEDGE BOOST',
    icon: 'knowledge-boost',
    description: 'Jika jawab benar berikutnya, bonus +10 poin',
    rarity: 'common',
    targetSelf: true,
    effect(state, actor) {
      return { type: 'knowledge-boost', playerId: actor.id, message: `${actor.name} mendapat Knowledge Boost! +10 poin jika jawab benar.` };
    }
  },
  {
    id: 'target',
    name: 'TARGET',
    icon: 'target',
    description: 'Paksa pemain lain jawab soal: salah/timeout, -10 poin untuk mereka',
    rarity: 'epic',
    targetSelf: false,
    effect(state, actor, target) {
      return { type: 'target-question', playerId: target.id, message: `${target.name} harus menjawab soal tambahan!` };
    }
  },
  {
    id: 'trap',
    name: 'TRAP',
    icon: 'trap',
    description: 'Pasang jebakan di petak tertentu',
    rarity: 'rare',
    targetSelf: true,
    effect(state, actor) {
      // Pasang jebakan di petak acak di depan
      const trapPos = Math.min(actor.position + Math.floor(Math.random() * 10) + 3, GAME_CONFIG.boardSize - 1);
      return { type: 'trap', trapPosition: trapPos, ownerId: actor.id, message: `${actor.name} memasang jebakan di petak ${trapPos}!` };
    }
  },
  {
    id: 'steal-points',
    name: 'CURI POIN',
    icon: 'steal-points',
    description: 'Ambil 10 poin dari pemain target',
    rarity: 'rare',
    targetSelf: false,
    effect(state, actor, target) {
      const amount = Math.min(10, target.score);
      if (amount <= 0) return { type: 'none', returnPowerUpId: 'steal-points', message: `${target.name} tidak punya poin untuk dicuri!` };
      return { type: 'steal-score', fromId: target.id, toId: actor.id, amount,
               message: `${actor.name} mencuri ${amount} poin dari ${target.name}!` };
    }
  },
  {
    id: 'double-points',
    name: 'POIN GANDA',
    icon: 'double-points',
    description: 'Poin jawaban benar berikutnya dikali 2 (berlaku sekali)',
    rarity: 'uncommon',
    targetSelf: true,
    effect(state, actor) {
      return { type: 'double-points', playerId: actor.id, message: `${actor.name} mendapat Poin Ganda! Jawaban benar berikutnya x2.` };
    }
  },
];

// Bobot kemunculan berdasarkan rarity
const RARITY_WEIGHT = { common: 40, uncommon: 30, rare: 20, epic: 10 };

// ============================================================
//  GameState — satu sumber kebenaran
// ============================================================
const GameState = {
  status: 'menu',          // menu | setup | playing | question | result
  players: [],
  currentPlayerIndex: 0,
  turnNumber: 0,
  diceValue: 0,
  diceRolled: false,
  isAnimating: false,
  currentQuestion: null,
  questionAnswered: false,
  traps: [],               // [{ position, ownerId }]
  gameLog: [],
  winner: null,
  audioEnabled: true,
  pendingEffect: null,     // Efek yang menunggu (double-dice, second-chance, dll)
  doubleDiceMode: false,
  doubleDiceRolls: [],
  firstFinisherId: null,   // id pemain pertama yang mencapai finish
  roundEndTurnCount: null, // turnsTaken finisher pertama → semua pemain harus mencapai angka ini

  reset() {
    this.status = 'menu';
    this.players = [];
    this.currentPlayerIndex = 0;
    this.turnNumber = 0;
    this.diceValue = 0;
    this.diceRolled = false;
    this.isAnimating = false;
    this.currentQuestion = null;
    this.questionAnswered = false;
    this.traps = [];
    this.gameLog = [];
    this.winner = null;
    this.pendingEffect = null;
    this.doubleDiceMode = false;
    this.doubleDiceRolls = [];
    this.firstFinisherId = null;
    this.roundEndTurnCount = null;
  },

  get currentPlayer() {
    return this.players[this.currentPlayerIndex] || null;
  },

  addLog(msg, type = 'info') {
    this.gameLog.unshift({ msg, type, turn: this.turnNumber });
    if (this.gameLog.length > 50) this.gameLog.pop();
  },
};

// ============================================================
//  avatarHTML — render sprite pixel SVG per avatar index
//  Dipanggil di mana pun emoji hewan dulu dipakai.
//  Param: idx 0-5, size px (number), extraStyle string opsional
// ============================================================
function avatarHTML(idx, size) {
  const s = size || 32;
  // Setiap avatar: [warna_kepala, warna_telinga/detail, warna_pipi, label_debug]
  const DEFS = [
    // 0 Rubah oranye
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${s}" height="${s}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:inline-block;vertical-align:middle">
      <!-- telinga -->
      <rect x="1" y="0" width="3" height="4" fill="#e74c3c"/>
      <rect x="12" y="0" width="3" height="4" fill="#e74c3c"/>
      <rect x="2" y="1" width="1" height="2" fill="#2b2d42"/>
      <rect x="13" y="1" width="1" height="2" fill="#2b2d42"/>
      <!-- kepala -->
      <rect x="2" y="3" width="12" height="8" fill="#e74c3c"/>
      <!-- wajah putih krem -->
      <rect x="4" y="7" width="8" height="4" fill="#fff8e7"/>
      <!-- outline kepala -->
      <rect x="2" y="3" width="12" height="1" fill="#2b2d42"/>
      <rect x="2" y="10" width="12" height="1" fill="#2b2d42"/>
      <rect x="2" y="3" width="1" height="8" fill="#2b2d42"/>
      <rect x="13" y="3" width="1" height="8" fill="#2b2d42"/>
      <!-- mata kiri -->
      <rect x="4" y="5" width="3" height="3" fill="#fff8e7"/>
      <rect x="5" y="6" width="2" height="2" fill="#2b2d42"/>
      <rect x="5" y="6" width="1" height="1" fill="#fff8e7"/>
      <!-- mata kanan -->
      <rect x="9" y="5" width="3" height="3" fill="#fff8e7"/>
      <rect x="9" y="6" width="2" height="2" fill="#2b2d42"/>
      <rect x="10" y="6" width="1" height="1" fill="#fff8e7"/>
      <!-- hidung -->
      <rect x="7" y="9" width="2" height="1" fill="#2b2d42"/>
      <!-- badan -->
      <rect x="4" y="11" width="8" height="4" fill="#e74c3c"/>
      <rect x="4" y="11" width="8" height="1" fill="#2b2d42"/>
      <rect x="4" y="14" width="8" height="1" fill="#2b2d42"/>
      <rect x="4" y="11" width="1" height="4" fill="#2b2d42"/>
      <rect x="11" y="11" width="1" height="4" fill="#2b2d42"/>
      <!-- ekor -->
      <rect x="12" y="12" width="3" height="2" fill="#fff8e7"/>
      <rect x="12" y="12" width="3" height="1" fill="#2b2d42"/>
    </svg>`,
    // 1 Harimau kuning belang
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${s}" height="${s}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:inline-block;vertical-align:middle">
      <!-- telinga -->
      <rect x="1" y="0" width="3" height="4" fill="#f39c12"/>
      <rect x="12" y="0" width="3" height="4" fill="#f39c12"/>
      <rect x="2" y="1" width="1" height="2" fill="#2b2d42"/>
      <rect x="13" y="1" width="1" height="2" fill="#2b2d42"/>
      <!-- kepala kuning -->
      <rect x="2" y="3" width="12" height="8" fill="#f39c12"/>
      <!-- belang hitam -->
      <rect x="5" y="3" width="2" height="2" fill="#2b2d42"/>
      <rect x="9" y="3" width="2" height="2" fill="#2b2d42"/>
      <!-- wajah krem -->
      <rect x="4" y="7" width="8" height="4" fill="#fff8e7"/>
      <!-- outline -->
      <rect x="2" y="3" width="12" height="1" fill="#2b2d42"/>
      <rect x="2" y="10" width="12" height="1" fill="#2b2d42"/>
      <rect x="2" y="3" width="1" height="8" fill="#2b2d42"/>
      <rect x="13" y="3" width="1" height="8" fill="#2b2d42"/>
      <!-- mata -->
      <rect x="4" y="5" width="3" height="3" fill="#fff8e7"/>
      <rect x="5" y="6" width="2" height="2" fill="#2b2d42"/>
      <rect x="5" y="6" width="1" height="1" fill="#fff8e7"/>
      <rect x="9" y="5" width="3" height="3" fill="#fff8e7"/>
      <rect x="9" y="6" width="2" height="2" fill="#2b2d42"/>
      <rect x="10" y="6" width="1" height="1" fill="#fff8e7"/>
      <!-- hidung -->
      <rect x="7" y="9" width="2" height="1" fill="#e74c3c"/>
      <!-- belang pipi -->
      <rect x="4" y="8" width="1" height="2" fill="#2b2d42"/>
      <rect x="11" y="8" width="1" height="2" fill="#2b2d42"/>
      <!-- badan -->
      <rect x="4" y="11" width="8" height="4" fill="#f39c12"/>
      <rect x="4" y="11" width="8" height="1" fill="#2b2d42"/>
      <rect x="4" y="14" width="8" height="1" fill="#2b2d42"/>
      <rect x="4" y="11" width="1" height="4" fill="#2b2d42"/>
      <rect x="11" y="11" width="1" height="4" fill="#2b2d42"/>
      <!-- belang badan -->
      <rect x="7" y="12" width="2" height="2" fill="#2b2d42"/>
    </svg>`,
    // 2 Katak hijau
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${s}" height="${s}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:inline-block;vertical-align:middle">
      <!-- mata menonjol di atas kepala -->
      <rect x="2" y="1" width="4" height="4" fill="#2ecc71"/>
      <rect x="10" y="1" width="4" height="4" fill="#2ecc71"/>
      <rect x="2" y="1" width="4" height="1" fill="#2b2d42"/>
      <rect x="2" y="4" width="4" height="1" fill="#2b2d42"/>
      <rect x="2" y="1" width="1" height="4" fill="#2b2d42"/>
      <rect x="5" y="1" width="1" height="4" fill="#2b2d42"/>
      <rect x="10" y="1" width="4" height="1" fill="#2b2d42"/>
      <rect x="10" y="4" width="4" height="1" fill="#2b2d42"/>
      <rect x="10" y="1" width="1" height="4" fill="#2b2d42"/>
      <rect x="13" y="1" width="1" height="4" fill="#2b2d42"/>
      <!-- pupil -->
      <rect x="3" y="2" width="2" height="2" fill="#2b2d42"/>
      <rect x="3" y="2" width="1" height="1" fill="#fff8e7"/>
      <rect x="11" y="2" width="2" height="2" fill="#2b2d42"/>
      <rect x="12" y="2" width="1" height="1" fill="#fff8e7"/>
      <!-- kepala -->
      <rect x="2" y="4" width="12" height="7" fill="#2ecc71"/>
      <!-- outline kepala -->
      <rect x="2" y="4" width="12" height="1" fill="#2b2d42"/>
      <rect x="2" y="10" width="12" height="1" fill="#2b2d42"/>
      <rect x="2" y="4" width="1" height="7" fill="#2b2d42"/>
      <rect x="13" y="4" width="1" height="7" fill="#2b2d42"/>
      <!-- mulut lebar -->
      <rect x="4" y="8" width="8" height="1" fill="#2b2d42"/>
      <rect x="4" y="9" width="2" height="1" fill="#2b2d42"/>
      <rect x="10" y="9" width="2" height="1" fill="#2b2d42"/>
      <!-- badan -->
      <rect x="3" y="11" width="10" height="4" fill="#2ecc71"/>
      <rect x="3" y="11" width="10" height="1" fill="#2b2d42"/>
      <rect x="3" y="14" width="10" height="1" fill="#2b2d42"/>
      <rect x="3" y="11" width="1" height="4" fill="#2b2d42"/>
      <rect x="12" y="11" width="1" height="4" fill="#2b2d42"/>
    </svg>`,
    // 3 Singa cokelat emas
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${s}" height="${s}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:inline-block;vertical-align:middle">
      <!-- surai -->
      <rect x="0" y="2" width="16" height="9" fill="#e67e22"/>
      <rect x="1" y="1" width="14" height="1" fill="#e67e22"/>
      <rect x="2" y="0" width="12" height="1" fill="#e67e22"/>
      <!-- outline surai -->
      <rect x="0" y="2" width="16" height="1" fill="#2b2d42"/>
      <rect x="0" y="10" width="16" height="1" fill="#2b2d42"/>
      <rect x="0" y="2" width="1" height="9" fill="#2b2d42"/>
      <rect x="15" y="2" width="1" height="9" fill="#2b2d42"/>
      <!-- wajah emas -->
      <rect x="3" y="3" width="10" height="7" fill="#f39c12"/>
      <!-- outline wajah -->
      <rect x="3" y="3" width="10" height="1" fill="#2b2d42"/>
      <rect x="3" y="9" width="10" height="1" fill="#2b2d42"/>
      <rect x="3" y="3" width="1" height="7" fill="#2b2d42"/>
      <rect x="12" y="3" width="1" height="7" fill="#2b2d42"/>
      <!-- mata -->
      <rect x="4" y="4" width="3" height="3" fill="#fff8e7"/>
      <rect x="5" y="5" width="2" height="2" fill="#2b2d42"/>
      <rect x="5" y="5" width="1" height="1" fill="#fff8e7"/>
      <rect x="9" y="4" width="3" height="3" fill="#fff8e7"/>
      <rect x="9" y="5" width="2" height="2" fill="#2b2d42"/>
      <rect x="10" y="5" width="1" height="1" fill="#fff8e7"/>
      <!-- hidung -->
      <rect x="6" y="7" width="4" height="2" fill="#fff8e7"/>
      <rect x="7" y="8" width="2" height="1" fill="#e74c3c"/>
      <!-- badan -->
      <rect x="4" y="11" width="8" height="4" fill="#f39c12"/>
      <rect x="4" y="11" width="8" height="1" fill="#2b2d42"/>
      <rect x="4" y="14" width="8" height="1" fill="#2b2d42"/>
      <rect x="4" y="11" width="1" height="4" fill="#2b2d42"/>
      <rect x="11" y="11" width="1" height="4" fill="#2b2d42"/>
    </svg>`,
    // 4 Panda putih hitam
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${s}" height="${s}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:inline-block;vertical-align:middle">
      <!-- telinga hitam -->
      <rect x="1" y="0" width="4" height="4" fill="#2b2d42"/>
      <rect x="11" y="0" width="4" height="4" fill="#2b2d42"/>
      <!-- kepala putih -->
      <rect x="2" y="3" width="12" height="8" fill="#fff8e7"/>
      <!-- outline -->
      <rect x="2" y="3" width="12" height="1" fill="#2b2d42"/>
      <rect x="2" y="10" width="12" height="1" fill="#2b2d42"/>
      <rect x="2" y="3" width="1" height="8" fill="#2b2d42"/>
      <rect x="13" y="3" width="1" height="8" fill="#2b2d42"/>
      <!-- patch mata hitam besar (ciri panda) -->
      <rect x="3" y="4" width="4" height="4" fill="#2b2d42"/>
      <rect x="9" y="4" width="4" height="4" fill="#2b2d42"/>
      <!-- putih mata (pupil) -->
      <rect x="4" y="5" width="2" height="2" fill="#fff8e7"/>
      <rect x="10" y="5" width="2" height="2" fill="#fff8e7"/>
      <!-- pupil hitam -->
      <rect x="4" y="6" width="1" height="1" fill="#2b2d42"/>
      <rect x="11" y="6" width="1" height="1" fill="#2b2d42"/>
      <!-- kilap -->
      <rect x="5" y="5" width="1" height="1" fill="#fff8e7"/>
      <rect x="11" y="5" width="1" height="1" fill="#fff8e7"/>
      <!-- hidung -->
      <rect x="6" y="8" width="4" height="1" fill="#2b2d42"/>
      <rect x="7" y="9" width="2" height="1" fill="#2b2d42"/>
      <!-- badan hitam putih -->
      <rect x="3" y="11" width="10" height="4" fill="#fff8e7"/>
      <rect x="3" y="11" width="10" height="1" fill="#2b2d42"/>
      <rect x="3" y="14" width="10" height="1" fill="#2b2d42"/>
      <rect x="3" y="11" width="1" height="4" fill="#2b2d42"/>
      <rect x="12" y="11" width="1" height="4" fill="#2b2d42"/>
      <rect x="5" y="12" width="6" height="2" fill="#2b2d42"/>
    </svg>`,
    // 5 Unicorn pink ungu
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${s}" height="${s}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:inline-block;vertical-align:middle">
      <!-- tanduk -->
      <rect x="7" y="0" width="2" height="1" fill="#ffd93d"/>
      <rect x="7" y="1" width="2" height="1" fill="#ffd93d"/>
      <rect x="6" y="2" width="4" height="1" fill="#ffd93d"/>
      <rect x="7" y="0" width="2" height="1" fill="#2b2d42"/>
      <!-- telinga -->
      <rect x="2" y="2" width="3" height="3" fill="#ff6b9d"/>
      <rect x="11" y="2" width="3" height="3" fill="#ff6b9d"/>
      <rect x="2" y="2" width="3" height="1" fill="#2b2d42"/>
      <rect x="11" y="2" width="3" height="1" fill="#2b2d42"/>
      <!-- kepala pink -->
      <rect x="2" y="4" width="12" height="7" fill="#ff6b9d"/>
      <!-- outline -->
      <rect x="2" y="4" width="12" height="1" fill="#2b2d42"/>
      <rect x="2" y="10" width="12" height="1" fill="#2b2d42"/>
      <rect x="2" y="4" width="1" height="7" fill="#2b2d42"/>
      <rect x="13" y="4" width="1" height="7" fill="#2b2d42"/>
      <!-- mata ungu besar -->
      <rect x="3" y="5" width="4" height="3" fill="#fff8e7"/>
      <rect x="4" y="6" width="3" height="2" fill="#9b59b6"/>
      <rect x="4" y="6" width="1" height="1" fill="#fff8e7"/>
      <rect x="9" y="5" width="4" height="3" fill="#fff8e7"/>
      <rect x="9" y="6" width="3" height="2" fill="#9b59b6"/>
      <rect x="10" y="6" width="1" height="1" fill="#fff8e7"/>
      <!-- hidung -->
      <rect x="6" y="9" width="4" height="1" fill="#ff9f45"/>
      <!-- surai pelangi -->
      <rect x="1" y="4" width="2" height="2" fill="#ff6b9d"/>
      <rect x="1" y="6" width="2" height="2" fill="#9b59b6"/>
      <rect x="1" y="8" width="2" height="2" fill="#3498db"/>
      <!-- badan -->
      <rect x="3" y="11" width="10" height="4" fill="#ff6b9d"/>
      <rect x="3" y="11" width="10" height="1" fill="#2b2d42"/>
      <rect x="3" y="14" width="10" height="1" fill="#2b2d42"/>
      <rect x="3" y="11" width="1" height="4" fill="#2b2d42"/>
      <rect x="12" y="11" width="1" height="4" fill="#2b2d42"/>
    </svg>`,
  ];
  return DEFS[idx] || DEFS[0];
}

// ============================================================
//  PlayerManager
// ============================================================
const PlayerManager = {
  COLORS: ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'],
  TOKENS: ['♟', '★', '●', '▲', '♦', '✿'],
  // Avatar disimpan sebagai index; SVG dirender oleh avatarHTML()
  AVATARS: [0, 1, 2, 3, 4, 5],

  create(names) {
    return names.map((name, i) => ({
      id: i,
      name: name.trim() || `Pemain ${i + 1}`,
      position: 0,         // 0 = belum mulai, 1-64 = di papan
      color: this.COLORS[i],
      token: this.TOKENS[i],
      avatar: this.AVATARS[i],
      score: 0,
      inventory: [],       // power-up yang dimiliki (max 3)
      usedPowerUps: [],    // id power-up yang sudah digunakan (untuk maxUse)
      skippedTurns: 0,
      hasShield: false,
      hasSecondChance: false,
      hasKnowledgeBoost: false,
      hasDoublePoints: false,
      usedQuestions: [],   // ID soal yang sudah dijawab
      finished: false,
      finishOrder: null,
      turnsTaken: 0,       // jumlah giliran yang sudah diambil pemain ini
      stats: {
        correct: 0,
        wrong: 0,
        ladders: 0,
        snakes: 0,
        powerUpsUsed: 0,
        steps: 0,
      }
    }));
  },

  getById(id) {
    return GameState.players.find(p => p.id === id);
  },

  addToInventory(player, powerUpId) {
    if (player.inventory.length < 3) {
      player.inventory.push(powerUpId);
      return true;
    }
    return false; // Inventori penuh
  },

  removeFromInventory(player, powerUpId) {
    const idx = player.inventory.indexOf(powerUpId);
    if (idx !== -1) {
      player.inventory.splice(idx, 1);
      return true;
    }
    return false;
  },

  getActivePlayers() {
    return GameState.players.filter(p => !p.finished);
  },

  getOtherPlayers(currentPlayer) {
    return GameState.players.filter(p => p.id !== currentPlayer.id && !p.finished);
  },
};

// ============================================================
//  BoardManager
// ============================================================
const BoardManager = {
  getCellType(pos) {
    if (pos <= 0 || pos > GAME_CONFIG.boardSize) return 'invalid';
    if (pos === GAME_CONFIG.boardSize) return 'finish';
    if (BOARD_CONFIG.ladders[pos]) return 'ladder';
    if (BOARD_CONFIG.snakes[pos]) return 'snake';
    if (BOARD_CONFIG.specialCells[pos]) return BOARD_CONFIG.specialCells[pos];
    return 'question';
  },

  getLadderDestination(pos) {
    return BOARD_CONFIG.ladders[pos] || null;
  },

  getSnakeDestination(pos) {
    return BOARD_CONFIG.snakes[pos] || null;
  },

  checkTrap(pos, currentPlayerId) {
    return GameState.traps.find(t => t.position === pos && t.ownerId !== currentPlayerId) || null;
  },

  removeTrap(pos) {
    GameState.traps = GameState.traps.filter(t => t.position !== pos);
  },

  /**
   * Hasilkan koordinat grid [row, col] untuk posisi papan.
   * Papan 8 kolom, baris genap kanan-ke-kiri, baris ganjil kiri-ke-kanan.
   */
  getGridCoords(pos) {
    const cols = GAME_CONFIG.boardCols;
    const rows = Math.ceil(GAME_CONFIG.boardSize / cols);
    const zeroIdx = pos - 1;
    const row = Math.floor(zeroIdx / cols);
    const col = zeroIdx % cols;
    const actualRow = rows - 1 - row;           // balik urutan (1 di bawah)
    const actualCol = row % 2 === 0 ? col : cols - 1 - col; // zig-zag
    return { row: actualRow, col: actualCol };
  },

  getAllSnakeLadderPairs() {
    return {
      ladders: Object.entries(BOARD_CONFIG.ladders).map(([from, to]) => ({ from: +from, to: +to })),
      snakes: Object.entries(BOARD_CONFIG.snakes).map(([from, to]) => ({ from: +from, to: +to })),
    };
  },
};

// ============================================================
//  DiceManager
// ============================================================

/**
 * diceHTML(value, size) — render sisi dadu sebagai SVG pixel 3×3 grid titik.
 * Kotak krem #fff8e7, titik #2b2d42, outline #2b2d42.
 * Layout titik (koordinat kolom 1-3, baris 1-3, 1=kiri/atas):
 *   1  ·  ·    2  ·  ·    3  ·  ·
 *   ·  ·  ·    ·  ·  ·    ·  ·  ·
 *   ·  ·  1    1  ·  ·    ·  ·  1
 */
function diceHTML(value, size) {
  const sz = size || 52;
  // dot positions [col 0-2, row 0-2] untuk setiap nilai 1-6
  const DOTS = {
    1: [[1,1]],
    2: [[0,0],[2,2]],
    3: [[0,0],[1,1],[2,2]],
    4: [[0,0],[2,0],[0,2],[2,2]],
    5: [[0,0],[2,0],[1,1],[0,2],[2,2]],
    6: [[0,0],[2,0],[0,1],[2,1],[0,2],[2,2]],
  };
  const dots = DOTS[value] || DOTS[1];
  // Setiap sel grid: viewBox 16px, padding 2px, grid 12px, cell 4px
  const dotSvg = dots.map(([c, r]) => {
    const x = 2 + c * 4 + 1;  // 1px margin dalam cell
    const y = 2 + r * 4 + 1;
    return `<rect x="${x}" y="${y}" width="2" height="2" fill="#2b2d42"/>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${sz}" height="${sz}" shape-rendering="crispEdges" style="image-rendering:pixelated;display:inline-block;vertical-align:middle">
    <rect x="0" y="0" width="16" height="16" fill="#fff8e7"/>
    <rect x="0" y="0" width="16" height="1" fill="#2b2d42"/>
    <rect x="0" y="15" width="16" height="1" fill="#2b2d42"/>
    <rect x="0" y="0" width="1" height="16" fill="#2b2d42"/>
    <rect x="15" y="0" width="1" height="16" fill="#2b2d42"/>
    ${dotSvg}
  </svg>`;
}

const DiceManager = {
  // FACES tetap untuk kompatibilitas kode lama yang belum dimigrasi
  FACES: [1, 2, 3, 4, 5, 6],

  roll() {
    return Math.floor(Math.random() * 6) + 1;
  },

  rollMultiple(count) {
    return Array.from({ length: count }, () => this.roll());
  },

  getFace(value) {
    return value; // mengembalikan angka; diceHTML() dipakai untuk render
  },
};

// ============================================================
//  QuestionManager
// ============================================================
const QuestionManager = {
  currentTimer: null,
  timerCallback: null,
  remainingTime: 0,

  getQuestion(player, preferDifficulty = null) {
    return QuestionDB.getRandom(player.usedQuestions, preferDifficulty);
  },

  getHardQuestion(player) {
    return QuestionDB.getRandom(player.usedQuestions, 'hard');
  },

  markUsed(player, questionId) {
    if (!player.usedQuestions.includes(questionId)) {
      player.usedQuestions.push(questionId);
    }
  },

  startTimer(seconds, onTick, onExpire) {
    this.clearTimer();
    this.remainingTime = seconds;
    onTick(this.remainingTime);
    this.currentTimer = setInterval(() => {
      this.remainingTime--;
      onTick(this.remainingTime);
      if (this.remainingTime <= 0) {
        this.clearTimer();
        onExpire();
      }
    }, 1000);
  },

  clearTimer() {
    if (this.currentTimer) {
      clearInterval(this.currentTimer);
      this.currentTimer = null;
    }
  },

  /**
   * Normalisasi string jawaban untuk perbandingan yang toleran:
   * - Huruf kecil semua
   * - Trim spasi di awal/akhir, rapikan spasi ganda
   * - Hapus tanda baca di awal/akhir (. , ! ? " ' : ;)
   * - Hapus kata sambung pengantar umum di depan
   *   (itu, adalah, yaitu, yakni, merupakan, disebut, namanya)
   */
  normalizeAnswer(str) {
    if (typeof str !== 'string') return '';
    let s = str.toLowerCase().trim();
    // Rapikan spasi ganda
    s = s.replace(/\s+/g, ' ');
    // Hapus tanda baca di awal dan akhir
    s = s.replace(/^[.,!?;:"']+/, '').replace(/[.,!?;:"']+$/, '').trim();
    // Hapus kata sambung pengantar di depan (jika ada, ulangi sekali)
    const prefixes = /^(itu|adalah|yaitu|yakni|merupakan|disebut(?:\s+(?:juga|dengan))?|namanya)\s+/;
    s = s.replace(prefixes, '').trim();
    return s;
  },

  /**
   * Evaluasi jawaban pemain.
   * @returns {{ correct: boolean, points: number }}
   */
  evaluate(question, playerAnswer) {
    let correct = false;
    switch (question.type) {
      case 'multiple-choice':
      case 'true-false':
      case 'situation':
        correct = playerAnswer === question.answer;
        break;
      case 'multi-select':
        // Jawaban harus persis sama (urutan tidak masalah)
        if (Array.isArray(playerAnswer) && Array.isArray(question.answer)) {
          const sorted1 = [...playerAnswer].sort().join(',');
          const sorted2 = [...question.answer].sort().join(',');
          correct = sorted1 === sorted2;
        }
        break;
      case 'ordering':
        if (Array.isArray(playerAnswer)) {
          correct = playerAnswer.every((v, i) => v === question.answer[i]);
        }
        break;
      case 'concept-guess':
        if (typeof playerAnswer === 'string') {
          const normPlayer = QuestionManager.normalizeAnswer(playerAnswer);
          const normKey    = QuestionManager.normalizeAnswer(question.answer);
          correct = normPlayer === normKey;
          // Cek acceptedAnswers jika jawaban utama tidak cocok
          if (!correct && Array.isArray(question.acceptedAnswers)) {
            correct = question.acceptedAnswers.some(
              alt => QuestionManager.normalizeAnswer(alt) === normPlayer
            );
          }
        }
        break;
    }
    const base = QuestionDB.getPoints(question.difficulty);
    const points = correct ? base : GAME_CONFIG.wrongPenalty;
    return { correct, points };
  },
};

// ============================================================
//  PowerUpManager
// ============================================================
const PowerUpManager = {
  getById(id) {
    return POWERUP_CONFIG.find(p => p.id === id);
  },

  /**
   * Pilih power-up acak berdasarkan bobot rarity.
   * Jika tidak ada pemain lain (mode 1 pemain atau semua lain finish),
   * power-up yang butuh target (targetSelf: false) dikecualikan dari undian.
   */
  getRandomPowerUp() {
    const hasOtherPlayers = GameState.players.filter(p => !p.finished).length > 1;
    // Jika tidak ada pemain lain: singkirkan semua yang butuh target (targetSelf:false)
    // PLUS magnet dan steal-points yang butuh pemain lain meski targetSelf:true
    const IDS_NEED_OTHERS = new Set(['magnet', 'steal-points']);
    const pool = hasOtherPlayers
      ? POWERUP_CONFIG
      : POWERUP_CONFIG.filter(p => p.targetSelf !== false && !IDS_NEED_OTHERS.has(p.id));
    // Fallback ke pool penuh jika filter mengosongkan pool (tidak mungkin, tapi aman)
    const activePool = pool.length > 0 ? pool : POWERUP_CONFIG;

    const totalWeight = activePool.reduce((sum, p) => sum + (RARITY_WEIGHT[p.rarity] || 10), 0);
    let rand = Math.random() * totalWeight;
    for (const pu of activePool) {
      rand -= (RARITY_WEIGHT[pu.rarity] || 10);
      if (rand <= 0) return pu;
    }
    return activePool[0];
  },

  canUse(player, powerUpId) {
    if (!player.inventory.includes(powerUpId)) return false;
    const pu = this.getById(powerUpId);
    if (!pu) return false;
    if (pu.maxUse && player.usedPowerUps.filter(id => id === powerUpId).length >= pu.maxUse) return false;
    return true;
  },

  apply(powerUpId, actor, target = null) {
    const pu = this.getById(powerUpId);
    if (!pu) return null;
    const result = pu.effect(GameState, actor, target);
    PlayerManager.removeFromInventory(actor, powerUpId);
    actor.usedPowerUps.push(powerUpId);
    actor.stats.powerUpsUsed++;
    return result;
  },

  getRarityLabel(rarity) {
    const map = { common: 'Biasa', uncommon: 'Tidak Biasa', rare: 'Langka', epic: 'Epik' };
    return map[rarity] || rarity;
  },

  getRarityColor(rarity) {
    const map = { common: '#95a5a6', uncommon: '#2ecc71', rare: '#3498db', epic: '#9b59b6' };
    return map[rarity] || '#ccc';
  },
};

// ============================================================
//  ScoreManager
// ============================================================
const ScoreManager = {
  addPoints(player, points) {
    player.score = Math.max(0, player.score + points);
  },

  getRankings() {
    // Pemenang = total poin tertinggi; tiebreaker: posisi petak, lalu urutan finish
    return [...GameState.players].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.position !== a.position) return b.position - a.position;
      // Keduanya finish → yang lebih dulu finish menang
      if (a.finishOrder !== null && b.finishOrder !== null) return a.finishOrder - b.finishOrder;
      if (a.finishOrder !== null) return -1;
      if (b.finishOrder !== null) return 1;
      return 0;
    });
  },
};

// ============================================================
//  TurnManager
// ============================================================
const TurnManager = {
  nextPlayer() {
    const total = GameState.players.length;
    // Increment turnsTaken untuk pemain yang baru selesai gilirannya
    const justPlayed = GameState.players[GameState.currentPlayerIndex];
    if (justPlayed) {
      justPlayed.turnsTaken++;
    }

    // Cari pemain aktif berikutnya (tidak finished, tidak di-skip)
    // Safety cap: maks total*2 iterasi untuk mencegah infinite loop
    let tries = 0;
    const maxTries = total * 2;
    do {
      GameState.currentPlayerIndex = (GameState.currentPlayerIndex + 1) % total;
      tries++;
      if (tries > maxTries) break; // Safety: semua pemain finished atau semua di-skip

      const candidate = GameState.players[GameState.currentPlayerIndex];
      // Jika di-skip: turnsTaken++ agar _isRoundComplete bisa terpenuhi,
      // kurangi skippedTurns, reset freeze, lanjut cari pemain berikutnya
      if (!candidate.finished && candidate.skippedTurns > 0) {
        candidate.turnsTaken++;
        candidate.skippedTurns--;
        continue;
      }
    } while (
      GameState.players[GameState.currentPlayerIndex].finished ||
      GameState.players[GameState.currentPlayerIndex].skippedTurns > 0
    );

    GameState.turnNumber++;
    GameState.diceRolled = false;
    GameState.doubleDiceMode = false;
    GameState.doubleDiceRolls = [];
  },

  checkWin() {
    const active = PlayerManager.getActivePlayers();
    return active.length === 0 || GameState.players.some(p => p.finished);
  },

  getFinishOrder() {
    return GameState.players
      .filter(p => p.finished)
      .sort((a, b) => a.finishOrder - b.finishOrder);
  },
};

// ============================================================
//  AudioManager
// ============================================================
const AudioManager = {
  ctx: null,

  init() {
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      this.ctx = null;
    }
  },

  _beep(freq, dur, type = 'sine', vol = 0.3) {
    if (!GameState.audioEnabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur);
      osc.start();
      osc.stop(this.ctx.currentTime + dur);
    } catch (e) { /* silent fail */ }
  },

  dice()    { this._beep(300, 0.1); setTimeout(() => this._beep(500, 0.1), 100); setTimeout(() => this._beep(700, 0.15), 200); },
  step()    { this._beep(440, 0.06, 'square', 0.15); },
  correct() { this._beep(523, 0.15); setTimeout(() => this._beep(659, 0.15), 150); setTimeout(() => this._beep(784, 0.3), 300); },
  wrong()   { this._beep(220, 0.2, 'sawtooth'); setTimeout(() => this._beep(196, 0.3, 'sawtooth'), 200); },
  powerup() { this._beep(880, 0.1); setTimeout(() => this._beep(1047, 0.1), 100); setTimeout(() => this._beep(1319, 0.2), 200); },
  snake()   { this._beep(200, 0.4, 'sawtooth', 0.4); },
  ladder()  { this._beep(600, 0.15); setTimeout(() => this._beep(800, 0.15), 150); setTimeout(() => this._beep(1000, 0.25), 300); },
  win()     {
    const notes = [523, 659, 784, 1047];
    notes.forEach((n, i) => setTimeout(() => this._beep(n, 0.2), i * 200));
    setTimeout(() => this._beep(1319, 0.5), 800);
  },

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }
};

// ============================================================
//  BGMManager — Background Music (menu & game)
// ============================================================
const BGMManager = (() => {
  const VOL_NORMAL = 0.3;
  const FADE_MS    = 500;
  const LS_KEY     = 'snl_muted';

  // Buat elemen Audio dengan silent-fail jika file tidak ada
  function makeAudio(src) {
    const a = new Audio();
    a.preload = 'auto';
    a.loop = true;
    a.volume = 0;
    a.addEventListener('error', () => { /* file tidak ditemukan — abaikan */ });
    a.src = src;
    return a;
  }

  const tracks = {
    menu: makeAudio('assets/audio/bgm-menu.mp3'),
    game: makeAudio('assets/audio/bgm-game.mp3'),
  };

  let _current   = null;   // track yang sedang aktif ('menu' | 'game' | null)
  let _muted     = false;
  let _unlocked  = false;  // true setelah play() pernah berhasil resolve
  let _fadeTimer = null;

  const _dbg = () => new URLSearchParams(window.location.search).get('debug') === '1';

  // Baca status mute dari localStorage
  function _loadMute() {
    try { return localStorage.getItem(LS_KEY) === '1'; } catch (e) { return false; }
  }
  function _saveMute(val) {
    try { localStorage.setItem(LS_KEY, val ? '1' : '0'); } catch (e) { /* tidak tersedia */ }
  }

  // Fade volume track ke target dalam FADE_MS ms.
  // Batalkan fade aktif sebelum memulai yang baru agar tidak tumpang tindih.
  function _fadeTo(audio, target, cb) {
    if (_fadeTimer) { clearInterval(_fadeTimer); _fadeTimer = null; }
    const steps = 20;
    const interval = FADE_MS / steps;
    const start = audio.volume;
    const delta = (target - start) / steps;
    let step = 0;
    _fadeTimer = setInterval(() => {
      step++;
      audio.volume = Math.min(1, Math.max(0, start + delta * step));
      if (step >= steps) {
        clearInterval(_fadeTimer);
        _fadeTimer = null;
        audio.volume = target; // pastikan tepat di target akhir
        if (cb) cb();
      }
    }, interval);
  }

  // Tentukan key track berdasarkan nama halaman
  function _keyFor(pageKey) {
    return pageKey === 'game' ? 'game' : 'menu';
  }

  // Handler listener unlock — dipasang untuk pointerdown, click, keydown, touchend
  // Listener TIDAK dihapus sebelum play() resolve supaya klik berikutnya bisa
  // mencoba lagi jika play() gagal.
  const _unlockHandlers = {};
  function _attachUnlockListeners() {
    ['pointerdown', 'click', 'keydown', 'touchend'].forEach(type => {
      const handler = () => _tryUnlock();
      _unlockHandlers[type] = handler;
      document.addEventListener(type, handler);
    });
  }
  function _removeUnlockListeners() {
    ['pointerdown', 'click', 'keydown', 'touchend'].forEach(type => {
      if (_unlockHandlers[type]) {
        document.removeEventListener(type, _unlockHandlers[type]);
        delete _unlockHandlers[type];
      }
    });
  }

  // Coba play() audio — dipanggil langsung dalam event handler (user gesture).
  // Jika file belum siap, tunggu canplay lalu coba lagi.
  function _tryUnlock() {
    if (_unlocked) return; // sudah berhasil, tidak perlu lagi
    const key   = _current || 'menu'; // gunakan layar aktif saat ini
    const audio = tracks[key];

    const doPlay = () => {
      // play() harus dipanggil sinkron di dalam user gesture (tidak di .then / setTimeout)
      const p = audio.play();
      if (!p || typeof p.then !== 'function') {
        // Browser lama tanpa Promise — anggap berhasil
        _onUnlockSuccess(key, audio);
        return;
      }
      p.then(() => {
        _onUnlockSuccess(key, audio);
        if (_dbg()) console.log('BGM unlock attempt: berhasil');
      }).catch((err) => {
        // Biarkan listener tetap aktif — klik berikutnya akan coba lagi
        if (_dbg()) console.log('BGM unlock attempt: gagal (' + err.message + ')');
      });
    };

    if (audio.readyState >= 2) { // HAVE_CURRENT_DATA atau lebih
      doPlay();
    } else {
      // File belum cukup dimuat — tunggu canplay, lalu play di dalam handler-nya
      // (canplay masih dihitung sebagai konteks interaksi di beberapa browser)
      audio.addEventListener('canplay', doPlay, { once: true });
    }
  }

  function _onUnlockSuccess(key, audio) {
    _unlocked = true;
    _current  = key;
    _removeUnlockListeners();
    // Fade in ke target volume
    const targetVol = _muted ? 0 : VOL_NORMAL;
    _fadeTo(audio, targetVol);
  }

  // --- API publik ---

  function init() {
    _muted = _loadMute();

    // visibilitychange: jeda/lanjutkan BGM saat tab tidak aktif
    document.addEventListener('visibilitychange', () => {
      if (!_current) return;
      const audio = tracks[_current];
      if (document.hidden) {
        audio.pause();
      } else {
        if (!_muted && _unlocked) {
          audio.play().catch(() => {});
        }
      }
    });

    // Pasang listener unlock — akan bersih sendiri setelah berhasil
    _attachUnlockListeners();
  }

  // Dipanggil saat pindah halaman (showPage) atau interaksi pertama
  function switchTo(pageKey) {
    const nextKey  = _keyFor(pageKey);

    // Catat halaman aktif agar _tryUnlock pakai lagu yang benar
    // bahkan jika belum unlocked
    if (!_unlocked) {
      _current = nextKey; // update preferensi, play belum terjadi
      return;
    }

    if (nextKey === _current) return; // track sama, tidak perlu ganti

    const next      = tracks[nextKey];
    const targetVol = _muted ? 0 : VOL_NORMAL;

    if (_current && !tracks[_current].paused) {
      // Fade out track lama, lalu fade in track baru
      const prev = tracks[_current];
      _fadeTo(prev, 0, () => {
        prev.pause();
        prev.currentTime = 0;
        _current = nextKey;
        next.volume = 0;
        next.play().then(() => {
          _fadeTo(next, targetVol);
        }).catch(() => {});
      });
    } else {
      // Track lama sudah berhenti — langsung putar yang baru
      _current = nextKey;
      next.volume = 0;
      next.play().then(() => {
        _fadeTo(next, targetVol);
      }).catch(() => {});
    }
  }

  // Mute/unmute semua BGM, simpan ke localStorage
  function setMute(muted) {
    _muted = muted;
    _saveMute(muted);
    if (_current) {
      const audio = tracks[_current];
      if (muted) {
        if (_fadeTimer) { clearInterval(_fadeTimer); _fadeTimer = null; }
        audio.volume = 0;
      } else {
        if (audio.paused && !document.hidden) {
          audio.play().catch(() => {});
        }
        audio.volume = VOL_NORMAL;
      }
    }
  }

  function isMuted() { return _muted; }

  return { init, switchTo, setMute, isMuted };
})();

// ============================================================
//  UIManager — Semua operasi DOM
// ============================================================
const UIManager = {
  // ---- Elemen cache ----
  el: {},

  init() {
    this.el = {
      pages: {
        menu: document.getElementById('page-menu'),
        setup: document.getElementById('page-setup'),
        howto: document.getElementById('page-howto'),
        game: document.getElementById('page-game'),
        result: document.getElementById('page-result'),
        bank: document.getElementById('page-bank'),
      },
      board: document.getElementById('game-board'),
      diceDisplay: document.getElementById('dice-display'),
      diceBtn: document.getElementById('btn-roll-dice'),
      currentPlayerName: document.getElementById('current-player-name'),
      currentPlayerAvatar: document.getElementById('current-player-avatar'),
      playerList: document.getElementById('player-list'),
      logContainer: document.getElementById('game-log'),
      questionModal: document.getElementById('question-modal'),
      powerupModal: document.getElementById('powerup-modal'),
      effectModal: document.getElementById('effect-modal'),
      powerupBtn: document.getElementById('btn-use-powerup'),
      timerEl: document.getElementById('question-timer'),
      timerBar: document.getElementById('timer-bar'),
      setupForm: document.getElementById('player-setup-form'),
      playerCountBtns: document.querySelectorAll('.player-count-btn'),
    };
  },

  // ---- Navigasi halaman ----
  showPage(pageKey) {
    Object.values(this.el.pages).forEach(p => {
      if (p) p.classList.remove('active');
    });
    if (this.el.pages[pageKey]) {
      this.el.pages[pageKey].classList.add('active');
    }
    // Scroll ke atas setiap pindah halaman
    window.scrollTo(0, 0);
    // Ganti BGM sesuai halaman (menu BGM untuk semua kecuali papan permainan)
    BGMManager.switchTo(pageKey);
  },

  // ---- Setup form ----
  buildSetupForm(count) {
    const form = this.el.setupForm;
    if (!form) return;
    form.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const color = PlayerManager.COLORS[i];
      const avatar = PlayerManager.AVATARS[i];
      form.innerHTML += `
        <div class="player-input-row" style="--player-color:${color}">
          <span class="player-input-avatar">${avatarHTML(avatar, 32)}</span>
          <label>Pemain ${i + 1}</label>
          <input type="text" id="player-name-${i}" placeholder="Nama pemain ${i + 1}" maxlength="16" autocomplete="off" />
        </div>`;
    }
  },

  getPlayerNames(count) {
    return Array.from({ length: count }, (_, i) => {
      const el = document.getElementById(`player-name-${i}`);
      return el ? el.value.trim() || `Pemain ${i + 1}` : `Pemain ${i + 1}`;
    });
  },

  // ---- Papan permainan ----
  renderBoard() {
    const board = this.el.board;
    if (!board) return;
    board.innerHTML = '';
    const size = GAME_CONFIG.boardSize;
    const cols = GAME_CONFIG.boardCols;
    const rows = Math.ceil(size / cols);

    // Buat sel papan
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const pos = this._gridToPos(r, c, rows, cols);
        if (pos < 1 || pos > size) continue;
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = `cell-${pos}`;
        cell.dataset.pos = pos;

        const cellType = BoardManager.getCellType(pos);
        cell.classList.add(`cell-${cellType}`);

        // Label isi sel — petak soal biasa sengaja dikosongkan,
        // hanya petak khusus yang diberi simbol agar papan tidak terlalu ramai
        let icon = '';
        if      (cellType === 'ladder')    icon = '<span class="ladder-icon"></span>';
        else if (cellType === 'snake')     icon = '<span class="snake-icon"></span>';
        else if (cellType === 'power-up')  icon = '<span class="powerup-icon"></span>';
        else if (cellType === 'bonus')     icon = '<span class="bonus-icon"></span>';
        else if (cellType === 'challenge') icon = '<span class="challenge-icon"></span>';
        else if (cellType === 'trap')      icon = '<span class="trap-icon"></span>';
        else if (cellType === 'finish')    icon = '<span class="finish-icon"></span>';
        // 'question' → tidak ada icon, tampil bersih

        cell.innerHTML = `
          <span class="cell-number">${pos}</span>
          <span class="cell-icon">${icon}</span>
          <div class="cell-tokens" id="tokens-${pos}"></div>`;
        board.appendChild(cell);
      }
    }

    this._drawSnakesLadders();
    this.renderAllTokens();
  },

  _gridToPos(row, col, rows, cols) {
    const invertedRow = rows - 1 - row;
    const actualCol = invertedRow % 2 === 0 ? col : cols - 1 - col;
    return invertedRow * cols + actualCol + 1;
  },

  _drawSnakesLadders() {
    // Visual snake/ladder digambar via CSS class & label saja
    // SVG overlay terlalu berat untuk inline; warna cell sudah cukup informatif
  },

  renderAllTokens() {
    // Hapus semua token dulu
    document.querySelectorAll('.cell-tokens').forEach(el => (el.innerHTML = ''));

    for (const player of GameState.players) {
      if (player.position <= 0 || player.finished) continue;
      const tokenContainer = document.getElementById(`tokens-${player.position}`);
      if (tokenContainer) {
        const tok = document.createElement('span');
        tok.className = 'player-token';
        tok.innerHTML = avatarHTML(player.avatar, 28);
        tok.style.setProperty('--token-color', player.color);
        tok.title = player.name;
        tok.id = `token-${player.id}`;
        tokenContainer.appendChild(tok);
      }
    }
  },

  highlightCell(pos, className, duration = 600) {
    const cell = document.getElementById(`cell-${pos}`);
    if (!cell) return;
    cell.classList.add(className);
    setTimeout(() => cell.classList.remove(className), duration);
  },

  scrollToCell(pos) {
    const cell = document.getElementById(`cell-${pos}`);
    if (cell) cell.scrollIntoView({ behavior: 'smooth', block: 'center' });
  },

  // ---- Panel pemain ----
  renderPlayerList() {
    const list = this.el.playerList;
    if (!list) return;
    const rankings = ScoreManager.getRankings();
    list.innerHTML = rankings.map(p => {
      const isActive = p.id === GameState.currentPlayer?.id;
      const invHtml = p.inventory.map(puId => {
        const pu = PowerUpManager.getById(puId);
        return pu ? `<span class="inv-badge" title="${pu.name}">${puIconHTML(pu.icon, 16)}</span>` : '';
      }).join('');
      return `
        <div class="player-card ${isActive ? 'active' : ''} ${p.finished ? 'finished' : ''}"
             style="--player-color:${p.color}">
          <span class="player-card-avatar">${avatarHTML(p.avatar, 32)}</span>
          <div class="player-card-info">
            <div class="player-card-name">${p.name} ${p.finished ? '<span class="pixel-trophy-sm" title="Selesai"></span>' : ''}</div>
            <div class="player-card-pos">Petak: ${p.position || '-'}</div>
            <div class="player-card-inv">${invHtml}</div>
          </div>
          <div class="player-card-score">${p.score}</div>
        </div>`;
    }).join('');
  },

  // ---- Status giliran ----
  updateTurnInfo(player) {
    if (this.el.currentPlayerName) this.el.currentPlayerName.textContent = player.name;
    if (this.el.currentPlayerAvatar) {
      this.el.currentPlayerAvatar.innerHTML = avatarHTML(player.avatar, 48);
      this.el.currentPlayerAvatar.style.setProperty('--player-color', player.color);
    }
  },

  setDiceEnabled(enabled) {
    if (this.el.diceBtn) {
      this.el.diceBtn.disabled = !enabled;
      this.el.diceBtn.classList.toggle('disabled', !enabled);
    }
  },

  setPowerUpEnabled(enabled) {
    if (this.el.powerupBtn) {
      this.el.powerupBtn.disabled = !enabled;
    }
  },

  animateDice(finalValue, callback) {
    const el = this.el.diceDisplay;
    if (!el) { callback(); return; }
    // Tambah class rolling → hanya goyangan CSS, kotak tidak berputar
    el.classList.add('rolling');
    let count = 0;
    const totalFrames = Math.round(GAME_CONFIG.diceAnimDuration / 80); // ~10 frame @ 80ms
    const interval = setInterval(() => {
      // Ganti isi (titik dadu) setiap 80ms — angka acak
      el.innerHTML = diceHTML(Math.floor(Math.random() * 6) + 1, 52);
      count++;
      if (count >= totalFrames) {
        clearInterval(interval);
        el.innerHTML = diceHTML(finalValue, 52);
        el.classList.remove('rolling');
        callback();
      }
    }, 80);
  },

  // ---- Log permainan ----
  addLog(msg, type = 'info') {
    const logEl = this.el.logContainer;
    if (!logEl) return;
    const entry = document.createElement('div');
    entry.className = `log-entry log-${type}`;
    entry.textContent = msg;
    logEl.prepend(entry);
    if (logEl.children.length > 30) logEl.lastChild.remove();
  },

  // ---- Modal Soal ----
  showQuestion(question, player, onAnswer) {
    const modal = this.el.questionModal;
    if (!modal) return;

    const diffLabel = {
      easy:   '<span class="diff-dot diff-easy"></span> Mudah',
      medium: '<span class="diff-dot diff-medium"></span> Sedang',
      hard:   '<span class="diff-dot diff-hard"></span> Sulit',
    };
    const typeLabel = {
      'multiple-choice': 'Pilihan Ganda',
      'true-false': 'Benar / Salah',
      'multi-select': 'Pilih Lebih dari Satu',
      'situation': 'Soal Situasi',
      'ordering': 'Urutkan',
      'concept-guess': 'Tebak Konsep',
    };

    document.getElementById('q-category').textContent  = question.category;
    document.getElementById('q-difficulty').innerHTML  = diffLabel[question.difficulty] || question.difficulty;
    document.getElementById('q-type').textContent      = typeLabel[question.type] || question.type;
    document.getElementById('q-text').textContent = question.question;
    document.getElementById('q-player').textContent = player.name;
    document.getElementById('q-avatar').innerHTML = avatarHTML(player.avatar, 32);
    document.getElementById('q-avatar').style.setProperty('--player-color', player.color);

    const answerArea = document.getElementById('q-answer-area');
    answerArea.innerHTML = '';

    let selectedAnswer = null;
    let selectedMulti = [];
    let orderItems = [];

    switch (question.type) {
      case 'multiple-choice':
      case 'true-false':
      case 'situation': {
        question.options.forEach((opt, i) => {
          const btn = document.createElement('button');
          btn.className = 'answer-btn';
          btn.textContent = `${['A', 'B', 'C', 'D'][i] || i}. ${opt}`;
          btn.onclick = () => {
            answerArea.querySelectorAll('.answer-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedAnswer = i;
          };
          answerArea.appendChild(btn);
        });
        break;
      }

      case 'multi-select': {
        const hint = document.createElement('p');
        hint.className = 'multi-hint';
        hint.innerHTML = '<span class="pixel-bulb"></span> Pilih semua jawaban yang benar:';
        answerArea.appendChild(hint);
        question.options.forEach((opt, i) => {
          const btn = document.createElement('button');
          btn.className = 'answer-btn multi-btn';
          btn.textContent = `${['A', 'B', 'C', 'D', 'E'][i] || i}. ${opt}`;
          btn.onclick = () => {
            btn.classList.toggle('selected');
            const idx = selectedMulti.indexOf(i);
            if (idx === -1) selectedMulti.push(i);
            else selectedMulti.splice(idx, 1);
          };
          answerArea.appendChild(btn);
        });
        selectedAnswer = () => [...selectedMulti].sort((a, b) => a - b);
        break;
      }

      case 'ordering': {
        const orderHint = document.createElement('p');
        orderHint.className = 'multi-hint';
        orderHint.innerHTML = '<span class="pixel-bulb"></span> Klik item sesuai urutan yang benar (dari pertama ke terakhir):';
        answerArea.appendChild(orderHint);

        orderItems = [...question.items];
        // Acak tampilan
        const shuffled = [...orderItems.map((item, i) => ({ item, origIdx: i }))].sort(() => Math.random() - 0.5);
        const orderSelected = [];
        const orderContainer = document.createElement('div');
        orderContainer.className = 'order-container';

        const selectedContainer = document.createElement('div');
        selectedContainer.className = 'order-selected';
        selectedContainer.innerHTML = '<p class="order-label">Urutan pilihanmu:</p>';

        shuffled.forEach(({ item, origIdx }) => {
          const btn = document.createElement('button');
          btn.className = 'answer-btn order-btn';
          btn.textContent = item;
          btn.dataset.origIdx = origIdx;
          btn.onclick = () => {
            if (btn.disabled) return;
            orderSelected.push(origIdx);
            btn.classList.add('selected');
            btn.disabled = true;
            const badge = document.createElement('span');
            badge.className = 'order-badge';
            badge.textContent = `${orderSelected.length}. ${item.substring(0, 30)}${item.length > 30 ? '...' : ''}`;
            selectedContainer.appendChild(badge);
          };
          orderContainer.appendChild(btn);
        });

        answerArea.appendChild(orderContainer);
        answerArea.appendChild(selectedContainer);
        selectedAnswer = () => [...orderSelected];
        break;
      }

      case 'concept-guess': {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'concept-input';
        input.placeholder = 'Ketik jawabanmu di sini...';
        input.maxLength = 50;
        input.addEventListener('input', () => { selectedAnswer = input.value; });
        answerArea.appendChild(input);
        setTimeout(() => input.focus(), 100);
        break;
      }
    }

    // Tombol submit
    const submitBtn = document.createElement('button');
    submitBtn.className = 'btn-submit-answer';
    submitBtn.textContent = 'JAWAB';
    submitBtn.onclick = () => {
      let ans = typeof selectedAnswer === 'function' ? selectedAnswer() : selectedAnswer;
      if (ans === null || ans === undefined || (Array.isArray(ans) && ans.length === 0)) {
        submitBtn.classList.add('shake');
        setTimeout(() => submitBtn.classList.remove('shake'), 500);
        UIManager.showToast('Pilih jawaban terlebih dahulu!', 'warning');
        return;
      }
      QuestionManager.clearTimer();
      modal.classList.remove('active');
      onAnswer(ans);
    };
    answerArea.appendChild(submitBtn);

    modal.classList.add('active');
  },

  hideQuestion() {
    QuestionManager.clearTimer();
    if (this.el.questionModal) this.el.questionModal.classList.remove('active');
  },

  updateTimer(seconds) {
    if (this.el.timerEl) {
      this.el.timerEl.textContent = seconds;
      // 3 state: normal (>10), warn kuning (≤10), urgent pink (≤5)
      if (seconds <= 5)       this.el.timerEl.className = 'timer-number urgent';
      else if (seconds <= 10) this.el.timerEl.className = 'timer-number warn';
      else                    this.el.timerEl.className = 'timer-number';
    }
    if (this.el.timerBar) {
      const pct = (seconds / GAME_CONFIG.questionTime) * 100;
      this.el.timerBar.style.width = `${pct}%`;
      let barClass = 'timer-fill';
      if (pct < 20)       barClass += ' urgent';
      else if (pct < 40)  barClass += ' warn';
      this.el.timerBar.className = barClass;
    }
  },

  // ---- Modal Feedback ----
  showFeedback(correct, question, pointsDelta, callback, overrideTitle = null) {
    const modal = document.getElementById('feedback-modal');
    if (!modal) { callback(); return; }

    const fbIcon = document.getElementById('fb-icon');
    if (fbIcon) {
      fbIcon.textContent = '';
      fbIcon.className = correct ? 'fb-icon-big correct-char' : 'fb-icon-big wrong-char';
    }

    const titleEl = document.getElementById('fb-title');
    if (overrideTitle) {
      titleEl.textContent = overrideTitle;
      titleEl.className = correct ? 'fb-title correct' : 'fb-title wrong';
    } else {
      titleEl.textContent = correct ? 'BENAR!' : 'SALAH!';
      titleEl.className   = correct ? 'fb-title correct' : 'fb-title wrong';
    }

    document.getElementById('fb-points').textContent = (pointsDelta >= 0 ? '+' : '') + pointsDelta + ' Poin';
    document.getElementById('fb-points').className = pointsDelta >= 0 ? 'fb-points positive' : 'fb-points negative';

    if (!correct) {
      let correctAnsText = '';
      switch (question.type) {
        case 'multiple-choice':
        case 'true-false':
        case 'situation':
          correctAnsText = question.options[question.answer];
          break;
        case 'multi-select':
          correctAnsText = question.answer.map(i => question.options[i]).join(', ');
          break;
        case 'ordering':
          correctAnsText = question.answer.map(i => question.items[i]).join(' → ');
          break;
        case 'concept-guess':
          correctAnsText = question.answer;
          break;
      }
      document.getElementById('fb-correct-ans').style.display = 'block';
      document.getElementById('fb-correct-ans').textContent = `Jawaban benar: ${correctAnsText}`;
    } else {
      document.getElementById('fb-correct-ans').style.display = 'none';
    }
    document.getElementById('fb-explanation').textContent = question.explanation;

    modal.classList.add('active');

    const nextBtn = document.getElementById('fb-next-btn');
    nextBtn.onclick = () => {
      modal.classList.remove('active');
      callback();
    };

    // Tidak ada auto-close — user yang menutup sendiri dengan klik Lanjut
  },

  // ---- Modal Efek ----
  showEffect(iconKey, title, message, callback, duration = 2500) {
    const modal = this.el.effectModal;
    if (!modal) { setTimeout(callback, 300); return; }
    // iconKey berupa '[TANGGA]' atau serupa — strip tanda kurung siku
    const key = String(iconKey).replace(/^\[|\]$/g, '');
    document.getElementById('effect-icon').innerHTML = effectIconHTML(key, 64);
    document.getElementById('effect-title').textContent = title;
    document.getElementById('effect-message').textContent = message;
    modal.classList.add('active');
    setTimeout(() => {
      modal.classList.remove('active');
      callback();
    }, duration);
  },

  // ---- Modal Power-Up ----
  showPowerUpSelection(player, callback) {
    const modal = this.el.powerupModal;
    if (!modal) return;

    document.getElementById('pu-player-name').textContent = player.name;
    document.getElementById('pu-player-avatar').innerHTML = avatarHTML(player.avatar, 32);

    const list = document.getElementById('pu-list');
    list.innerHTML = '';

    if (player.inventory.length === 0) {
      list.innerHTML = '<p class="empty-inv">Inventori kosong. Cari power-up di papan!</p>';
    } else {
      player.inventory.forEach(puId => {
        const pu = PowerUpManager.getById(puId);
        if (!pu) return;
        const canUse = PowerUpManager.canUse(player, puId);
        const card = document.createElement('div');
        card.className = `pu-card rarity-${pu.rarity} ${!canUse ? 'disabled' : ''}`;
        card.innerHTML = `
          <div class="pu-icon">${puIconHTML(pu.icon, 36)}</div>
          <div class="pu-info">
            <div class="pu-name">${pu.name}</div>
            <div class="pu-desc">${pu.description}</div>
            <div class="pu-rarity" style="color:${PowerUpManager.getRarityColor(pu.rarity)}">${PowerUpManager.getRarityLabel(pu.rarity)}</div>
          </div>
          <button class="btn-use-pu" ${!canUse ? 'disabled' : ''}>PAKAI</button>`;
        card.querySelector('.btn-use-pu').onclick = () => {
          if (!canUse) return;
          modal.classList.remove('active');
          callback(puId);
        };
        list.appendChild(card);
      });
    }

    const closeBtn = document.getElementById('pu-close-btn');
    closeBtn.onclick = () => {
      modal.classList.remove('active');
      callback(null);
    };

    modal.classList.add('active');
  },

  // ---- Modal Double Dice ----
  showDoubleDiceChoice(roll1, roll2, callback) {
    const modal = document.getElementById('double-dice-modal');
    if (!modal) { callback(Math.max(roll1, roll2)); return; }
    document.getElementById('dd-roll1').innerHTML = diceHTML(roll1, 48);
    document.getElementById('dd-roll2').innerHTML = diceHTML(roll2, 48);
    document.getElementById('dd-val1').textContent = roll1;
    document.getElementById('dd-val2').textContent = roll2;
    document.getElementById('dd-pick1').onclick = () => { modal.classList.remove('active'); callback(roll1); };
    document.getElementById('dd-pick2').onclick = () => { modal.classList.remove('active'); callback(roll2); };
    modal.classList.add('active');
  },

  // ---- Modal Target (pilih pemain) ----
  showTargetSelection(currentPlayer, title, callback) {
    const modal = document.getElementById('target-modal');
    if (!modal) { callback(null); return; }
    document.getElementById('target-title').textContent = title;
    const list = document.getElementById('target-list');
    list.innerHTML = '';
    const others = PlayerManager.getOtherPlayers(currentPlayer);
    if (others.length === 0) {
      list.innerHTML = '<p>Tidak ada pemain lain.</p>';
      setTimeout(() => { modal.classList.remove('active'); callback(null); }, 1500);
      modal.classList.add('active');
      return;
    }
    others.forEach(p => {
      const btn = document.createElement('button');
      btn.className = 'target-player-btn';
      btn.style.setProperty('--player-color', p.color);
      btn.innerHTML = `<span style="display:inline-block;vertical-align:middle">${avatarHTML(p.avatar, 24)}</span> ${p.name} <small>(Petak ${p.position})</small>`;
      btn.onclick = () => { modal.classList.remove('active'); callback(p); };
      list.appendChild(btn);
    });
    const cancelBtn = document.getElementById('target-cancel');
    cancelBtn.onclick = () => { modal.classList.remove('active'); callback(null); };
    modal.classList.add('active');
  },

  // ---- Toast notifikasi ----
  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 2500);
  },

  // ---- Halaman Hasil ----
  showResult() {
    // Sembunyikan panel debug saat masuk layar hasil
    if (DebugManager.isEnabled()) {
      const panel = document.getElementById('debug-panel');
      if (panel) panel.style.display = 'none';
    }

    const rankings = ScoreManager.getRankings();
    // Tentukan pemenang = peringkat pertama berdasarkan total poin
    const winner = rankings[0];
    GameState.winner = winner;

    // Label peringkat — teks bukan emoji agar tidak jadi kotak
    const medalLabels = ['#1', '#2', '#3'];

    document.getElementById('result-winner-name').textContent = winner?.name || '-';
    // result-winner-avatar menggunakan CSS background-image (trofi SVG), tidak perlu textContent

    const rankList = document.getElementById('result-rankings');
    rankList.innerHTML = rankings.map((p, i) => {
      const isFirstFinisher = p.id === GameState.firstFinisherId;
      const finishBadge = isFirstFinisher
        ? `<span class="finish-first-badge" title="Pemain pertama mencapai FINISH"><span class="pixel-flag"></span> Finish Pertama</span>`
        : '';
      return `
      <div class="result-rank-row" style="--player-color:${p.color}">
        <span class="result-medal">${medalLabels[i] || `${i + 1}.`}</span>
        <span class="result-rank-avatar">${avatarHTML(p.avatar, 32)}</span>
        <span class="result-rank-name">${p.name}${finishBadge}</span>
        <span class="result-rank-score">${p.score} poin</span>
      </div>`;
    }).join('');

    const statsEl = document.getElementById('result-stats');
    statsEl.innerHTML = rankings.map(p => `
      <div class="stat-card" style="border-color:${p.color}">
        <div class="stat-header">${avatarHTML(p.avatar, 24)} ${p.name}</div>
        <div class="stat-row"><span>Jawaban Benar</span><span>${p.stats.correct}</span></div>
        <div class="stat-row"><span>Jawaban Salah</span><span>${p.stats.wrong}</span></div>
        <div class="stat-row"><span>Total Poin</span><span>${p.score}</span></div>
        <div class="stat-row"><span>Tangga digunakan</span><span>${p.stats.ladders}</span></div>
        <div class="stat-row"><span>Kena ular</span><span>${p.stats.snakes}</span></div>
        <div class="stat-row"><span>Power-up dipakai</span><span>${p.stats.powerUpsUsed}</span></div>
        <div class="stat-row"><span>Total langkah</span><span>${p.stats.steps}</span></div>
      </div>`).join('');

    // Confetti!
    this._launchConfetti();
    this.showPage('result');
  },

  _launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block';

    const pieces = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: Math.random() * 12 + 5,
      h: Math.random() * 6 + 3,
      color: ['#ffd93d','#ff9f45','#5dbb63','#2ec4b6','#9b7bff','#ff6b9d','#87ceeb','#d9a066'][Math.floor(Math.random()*8)],
      vx: (Math.random() - 0.5) * 3,
      vy: Math.random() * 4 + 2,
      angle: Math.random() * 360,
      spin: (Math.random() - 0.5) * 5,
    }));

    let frame = 0;
    const maxFrames = 180;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spin;
        if (p.y > canvas.height) { p.y = -10; p.x = Math.random() * canvas.width; }
      });
      frame++;
      if (frame < maxFrames) requestAnimationFrame(draw);
      else { ctx.clearRect(0, 0, canvas.width, canvas.height); canvas.style.display = 'none'; }
    }
    requestAnimationFrame(draw);
  },

  // ---- Bank Soal ----
  renderQuestionBank(filter = {}) {
    let questions = QuestionDB.getAll();
    if (filter.category)   questions = questions.filter(q => q.category === filter.category);
    if (filter.difficulty) questions = questions.filter(q => q.difficulty === filter.difficulty);
    if (filter.type)       questions = questions.filter(q => q.type === filter.type);
    if (filter.search) {
      const s = filter.search.toLowerCase();
      questions = questions.filter(q => q.question.toLowerCase().includes(s));
    }

    const isGuru = BankMode.isGuru();

    // Selalu update jumlah soal
    document.getElementById('bank-total').textContent = `Total: ${questions.length} soal`;

    if (isGuru) {
      // ── MODE GURU: tabel penuh dengan kolom Aksi ──
      document.getElementById('bank-table-wrapper').style.display = '';
      document.getElementById('bank-cards').style.display = 'none';
      const tbody = document.getElementById('bank-tbody');
      if (!tbody) return;
      tbody.innerHTML = questions.map(q => `
        <tr>
          <td>${q.id}</td>
          <td><span class="badge">${q.category}</span></td>
          <td><span class="badge badge-${q.difficulty}">${q.difficulty}</span></td>
          <td>${q.type}</td>
          <td class="q-text-cell" title="${q.question}">${q.question.substring(0, 60)}${q.question.length > 60 ? '...' : ''}</td>
          <td>
            <button class="btn-edit-q" onclick="GameController.editQuestion(${q.id})">Edit</button>
            <button class="btn-del-q" onclick="GameController.deleteQuestion(${q.id})">Hapus</button>
          </td>
        </tr>`).join('');
    } else {
      // ── MODE MURID: kartu dengan pertanyaan lengkap, tanpa jawaban ──
      document.getElementById('bank-table-wrapper').style.display = 'none';
      const cardsEl = document.getElementById('bank-cards');
      if (!cardsEl) return;
      cardsEl.style.display = '';
      const diffLabel = { easy: 'Mudah', medium: 'Sedang', hard: 'Sulit' };
      const typeLabel = {
        'multiple-choice': 'Pilihan Ganda', 'true-false': 'Benar/Salah',
        'multi-select': 'Pilih Banyak', 'situation': 'Situasi',
        'ordering': 'Urutkan', 'concept-guess': 'Tebak Konsep',
      };
      cardsEl.innerHTML = questions.length === 0
        ? '<p class="bank-empty">Tidak ada soal yang sesuai filter.</p>'
        : questions.map(q => `
          <div class="kisi-card">
            <div class="kisi-card-meta">
              <span class="badge">${q.category}</span>
              <span class="badge badge-${q.difficulty}">${diffLabel[q.difficulty] || q.difficulty}</span>
              <span class="kisi-type-badge">${typeLabel[q.type] || q.type}</span>
              <span class="kisi-id">#${q.id}</span>
            </div>
            <p class="kisi-card-q">${q.question}</p>
          </div>`).join('');
    }
  },
};

// ============================================================
//  BankMode — Mode murid (default) vs guru (?guru=1)
//  Menerapkan perbedaan tampilan tanpa mengubah logika soal.
// ============================================================
const BankMode = (() => {
  // Mode guru: HANYA aktif jika URL mengandung ?guru=1 persis.
  // Tidak bisa diaktifkan lewat console, hash, atau cara lain.
  const GURU = new URLSearchParams(window.location.search).get('guru') === '1';

  function isGuru() { return GURU; }

  /**
   * Terapkan UI yang sesuai mode ke halaman bank.
   * Dipanggil setiap kali halaman bank dibuka.
   */
  function apply() {
    // ── Judul halaman ──
    const title = document.getElementById('bank-page-title');
    if (title) title.textContent = GURU ? 'Bank Soal Guru' : 'Kisi-kisi Materi';

    // ── Pesan murid ──
    const msg = document.getElementById('bank-student-msg');
    if (msg) msg.style.display = GURU ? 'none' : '';

    // ── Ringkasan statistik (hanya murid) ──
    const summary = document.getElementById('bank-summary');
    if (summary) {
      if (GURU) {
        summary.style.display = 'none';
      } else {
        summary.style.display = '';
        _renderSummary(summary);
      }
    }

    // ── Tombol Tambah Soal ──
    const addBtn = document.getElementById('btn-add-question');
    if (addBtn) addBtn.style.display = GURU ? '' : 'none';

    // ── Kolom Aksi di thead ──
    const thAksi = document.getElementById('bank-th-aksi');
    if (thAksi) thAksi.style.display = GURU ? '' : 'none';

    // ── Catatan penyimpanan guru ──
    document.getElementById('bank-guru-storage-note')?.style && (
      document.getElementById('bank-guru-storage-note').style.display = GURU ? '' : 'none'
    );
    document.getElementById('bank-guru-storage-text')?.style && (
      document.getElementById('bank-guru-storage-text').style.display = GURU ? '' : 'none'
    );

    // ── Tombol menu: label berbeda ──
    const btnBank = document.getElementById('btn-bank');
    if (btnBank) btnBank.textContent = GURU ? 'BANK SOAL (GURU)' : 'KISI-KISI MATERI';
  }

  /**
   * Render kotak-kotak ringkasan statistik soal.
   */
  function _renderSummary(container) {
    const all = QuestionDB.getAll();
    const total = all.length;

    // Per kategori
    const byCat = {};
    all.forEach(q => { byCat[q.category] = (byCat[q.category] || 0) + 1; });

    // Per kesulitan
    const easy   = all.filter(q => q.difficulty === 'easy').length;
    const medium = all.filter(q => q.difficulty === 'medium').length;
    const hard   = all.filter(q => q.difficulty === 'hard').length;

    const catBadges = Object.entries(byCat)
      .sort((a, b) => b[1] - a[1])
      .map(([cat, n]) => `<span class="kisi-stat-badge">${cat}<em>${n}</em></span>`)
      .join('');

    container.innerHTML = `
      <div class="kisi-summary-row">
        <span class="kisi-stat-total">
          <svg class="kisi-icon-book" viewBox="0 0 16 16" width="18" height="18"
               xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"
               aria-hidden="true" focusable="false">
            <rect x="0" y="1" width="3" height="14" fill="#3a1a8a"/>
            <rect x="3" y="1" width="10" height="14" fill="#9b7bff"/>
            <rect x="5" y="3" width="6" height="10" fill="#fff8e7"/>
            <rect x="6" y="5"  width="4" height="1" fill="#94b0c2"/>
            <rect x="6" y="7"  width="4" height="1" fill="#94b0c2"/>
            <rect x="6" y="9"  width="3" height="1" fill="#94b0c2"/>
            <rect x="6" y="11" width="4" height="1" fill="#94b0c2"/>
            <rect x="0" y="0"  width="13" height="1"  fill="#2b2d42"/>
            <rect x="0" y="15" width="13" height="1"  fill="#2b2d42"/>
            <rect x="0" y="0"  width="1"  height="16" fill="#2b2d42"/>
            <rect x="13" y="0" width="1"  height="16" fill="#2b2d42"/>
            <rect x="3" y="1" width="1" height="14" fill="#2b2d42"/>
          </svg>
          ${total} Soal
        </span>
        <span class="kisi-stat-badge diff-easy">Mudah <em>${easy}</em></span>
        <span class="kisi-stat-badge diff-medium">Sedang <em>${medium}</em></span>
        <span class="kisi-stat-badge diff-hard">Sulit <em>${hard}</em></span>
      </div>
      <div class="kisi-summary-cats">${catBadges}</div>`;
  }

  return { isGuru, apply };
})();

// ============================================================
//  DebugManager — Mode debug (aktif hanya jika URL mengandung ?debug=1)
// ============================================================
const DebugManager = (() => {
  const ENABLED = new URLSearchParams(window.location.search).get('debug') === '1';

  // State debug
  let forcedDice = 0;     // 0 = acak, 1-6 = paksa angka ini
  let autoCorrect = false; // soal otomatis dianggap benar

  /** Kembalikan true jika mode debug aktif */
  function isEnabled() { return ENABLED; }

  /** Baca nilai forcedDice (dipanggil dari handleRollDice) */
  function getForcedDice() { return forcedDice; }

  /** Reset forcedDice ke acak setelah dipakai sekali */
  function consumeForcedDice() {
    const v = forcedDice;
    forcedDice = 0;
    // Sinkronkan dropdown
    const sel = document.getElementById('dbg-dice-sel');
    if (sel) sel.value = '0';
    return v;
  }

  /** Kembalikan true jika soal harus otomatis dianggap benar */
  function isAutoCorrect() { return autoCorrect; }

  /**
   * Pindahkan pion pemain ke petak tertentu secara langsung.
   * Tidak ada soal, tidak ada efek petak, tidak ganti giliran.
   */
  function teleportPlayer(playerId, targetCell) {
    if (!ENABLED) return;
    const player = GameState.players.find(p => p.id === parseInt(playerId));
    if (!player) return;
    const pos = Math.max(1, Math.min(parseInt(targetCell) || 1, GAME_CONFIG.boardSize));
    player.position = pos;
    UIManager.renderAllTokens();
    UIManager.renderPlayerList();
    UIManager.showToast(`[DEBUG] ${player.name} dipindah ke petak ${pos}`, 'info');
    UIManager.addLog(`[DEBUG] ${player.name} teleport ke petak ${pos}`, 'info');
  }

  /**
   * Isi dropdown pemain di panel debug.
   * Dipanggil dari GameController.startGame() setelah pemain dibuat.
   */
  function refreshPlayerDropdown() {
    if (!ENABLED) return;
    const sel = document.getElementById('dbg-player-sel');
    if (!sel) return;
    sel.innerHTML = GameState.players
      .map(p => `<option value="${p.id}">${p.avatar} ${p.name}</option>`)
      .join('');
  }

  /**
   * Tampilkan atau sembunyikan panel debug.
   * Panel hanya muncul saat halaman 'game' aktif.
   */
  function syncPanelVisibility() {
    if (!ENABLED) return;
    const panel = document.getElementById('debug-panel');
    if (!panel) return;
    const gamePage = document.getElementById('page-game');
    const isGameActive = gamePage && gamePage.classList.contains('active');
    panel.style.display = isGameActive ? '' : 'none';
  }

  /** Inisialisasi: buat panel & bind event */
  function init() {
    if (!ENABLED) return;

    const panel = document.getElementById('debug-panel');
    if (!panel) return;

    // Tandai body dengan atribut agar CSS bisa memfilter
    document.body.setAttribute('data-debug', '1');

    // ── Tombol lipat/buka ──
    const toggleBtn = document.getElementById('dbg-toggle');
    const body = document.getElementById('dbg-body');
    if (toggleBtn && body) {
      toggleBtn.addEventListener('click', () => {
        const collapsed = body.classList.toggle('dbg-collapsed');
        toggleBtn.textContent = collapsed ? '▲' : '▼';
        toggleBtn.setAttribute('aria-expanded', String(!collapsed));
      });
    }

    // ── Tombol Pindahkan ──
    document.getElementById('dbg-move-btn')?.addEventListener('click', () => {
      const pid = document.getElementById('dbg-player-sel')?.value;
      const cell = document.getElementById('dbg-cell-input')?.value;
      teleportPlayer(pid, cell);
    });

    // ── Tombol Dekatkan ke finish (petak 60) ──
    document.getElementById('dbg-near-finish-btn')?.addEventListener('click', () => {
      const pid = document.getElementById('dbg-player-sel')?.value;
      teleportPlayer(pid, 60);
    });

    // ── Dropdown dadu ──
    document.getElementById('dbg-dice-sel')?.addEventListener('change', (e) => {
      forcedDice = parseInt(e.target.value) || 0;
    });

    // ── Checkbox auto-benar ──
    document.getElementById('dbg-auto-correct')?.addEventListener('change', (e) => {
      autoCorrect = e.target.checked;
    });

    // ── Dropdown beri power-up ──
    const puSel = document.getElementById('dbg-pu-sel');
    if (puSel) {
      puSel.innerHTML = POWERUP_CONFIG
        .map(pu => `<option value="${pu.id}">${pu.name}</option>`)
        .join('');
    }
    document.getElementById('dbg-give-pu-btn')?.addEventListener('click', () => {
      const pid  = document.getElementById('dbg-player-sel')?.value;
      const puId = document.getElementById('dbg-pu-sel')?.value;
      if (!pid || !puId) return;
      const player = GameState.players.find(p => p.id === parseInt(pid));
      if (!player) return;
      const added = PlayerManager.addToInventory(player, puId);
      const pu = PowerUpManager.getById(puId);
      if (added) {
        UIManager.renderPlayerList();
        UIManager.showToast(`[DEBUG] ${pu?.name || puId} → ${player.name}`, 'info');
      } else {
        UIManager.showToast(`Inventori ${player.name} penuh!`, 'warning');
      }
    });

    // Sembunyikan di awal (game belum dimulai)
    panel.style.display = 'none';
  }

  return { isEnabled, init, getForcedDice, consumeForcedDice, isAutoCorrect, refreshPlayerDropdown, syncPanelVisibility };
})();

// ============================================================
//  GameController — Orkestrasi utama
// ============================================================
const GameController = {
  selectedPlayerCount: 2,

  init() {
    AudioManager.init();
    BGMManager.init();
    // Sinkronkan status mute awal dari localStorage
    if (BGMManager.isMuted()) {
      GameState.audioEnabled = false;
      const btn = document.getElementById('btn-audio');
      if (btn) btn.classList.add('is-muted');
    }
    UIManager.init();
    this._bindMenuEvents();
    this._bindGameEvents();
    this._bindBankEvents();
    UIManager.showPage('menu');
  },

  // ---- Binding Events ----
  _bindMenuEvents() {
    // Tombol menu utama
    document.getElementById('btn-start')?.addEventListener('click', () => {
      AudioManager.resume();
      UIManager.showPage('setup');
      this._buildSetup(this.selectedPlayerCount);
    });
    document.getElementById('btn-howto')?.addEventListener('click', () => UIManager.showPage('howto'));
    document.getElementById('btn-bank')?.addEventListener('click', () => {
      UIManager.showPage('bank');
      BankMode.apply();
      UIManager.renderQuestionBank();
      this._populateBankFilters();
    });
    document.getElementById('btn-settings')?.addEventListener('click', () => UIManager.showPage('setup'));

    // Kembali ke menu
    document.querySelectorAll('.btn-back-menu').forEach(btn =>
      btn.addEventListener('click', () => UIManager.showPage('menu'))
    );

    // Toggle audio (efek suara + BGM sekaligus)
    document.getElementById('btn-audio')?.addEventListener('click', () => {
      GameState.audioEnabled = !GameState.audioEnabled;
      BGMManager.setMute(!GameState.audioEnabled);
      const btn = document.getElementById('btn-audio');
      btn.classList.toggle('is-muted', !GameState.audioEnabled);
      UIManager.showToast(GameState.audioEnabled ? 'Suara Aktif' : 'Suara Mati', 'info');
    });
  },

  _buildSetup(count) {
    this.selectedPlayerCount = count;
    UIManager.buildSetupForm(count);
    // Highlight tombol jumlah pemain
    document.querySelectorAll('.player-count-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.count) === count);
    });
  },

  _bindGameEvents() {
    // Pilih jumlah pemain
    document.querySelectorAll('.player-count-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const count = parseInt(btn.dataset.count);
        this._buildSetup(count);
      });
    });

    // Mulai game
    document.getElementById('btn-start-game')?.addEventListener('click', () => {
      const names = UIManager.getPlayerNames(this.selectedPlayerCount);
      this.startGame(names);
    });

    // Lempar dadu
    document.getElementById('btn-roll-dice')?.addEventListener('click', () => {
      AudioManager.resume();
      this.handleRollDice();
    });

    // Gunakan power-up
    document.getElementById('btn-use-powerup')?.addEventListener('click', () => {
      const player = GameState.currentPlayer;
      if (!player || GameState.diceRolled || GameState.isAnimating) return;
      UIManager.showPowerUpSelection(player, (puId) => {
        if (puId) this.handleUsePowerUp(puId);
      });
    });

    // Hasil permainan
    document.getElementById('btn-play-again')?.addEventListener('click', () => {
      GameState.reset();
      UIManager.showPage('setup');
      DebugManager.syncPanelVisibility(); // sembunyikan panel debug (kembali ke setup)
      this._buildSetup(this.selectedPlayerCount);
    });
    document.getElementById('btn-back-menu-result')?.addEventListener('click', () => {
      GameState.reset();
      UIManager.showPage('menu');
      DebugManager.syncPanelVisibility(); // sembunyikan panel debug
    });

    // Tombol keluar dari game (header)
    document.getElementById('btn-exit-game')?.addEventListener('click', () => {
      // Pause: blokir interaksi sementara modal konfirmasi muncul
      const modal = document.getElementById('exit-modal');
      if (modal) modal.classList.add('active');
    });

    document.getElementById('exit-cancel-btn')?.addEventListener('click', () => {
      const modal = document.getElementById('exit-modal');
      if (modal) modal.classList.remove('active');
    });

    document.getElementById('exit-confirm-btn')?.addEventListener('click', () => {
      const modal = document.getElementById('exit-modal');
      if (modal) modal.classList.remove('active');
      // Hentikan timer soal jika sedang berjalan
      QuestionManager.clearTimer();
      GameState.reset();
      UIManager.showPage('menu');
      DebugManager.syncPanelVisibility(); // sembunyikan panel debug
    });
  },

  _bindBankEvents() {
    document.getElementById('btn-add-question')?.addEventListener('click', () => {
      this.showAddQuestionForm();
    });

    const filterEls = ['bank-filter-cat', 'bank-filter-diff', 'bank-filter-type'];
    filterEls.forEach(id => {
      document.getElementById(id)?.addEventListener('change', () => this._applyBankFilters());
    });
    document.getElementById('bank-search')?.addEventListener('input', () => this._applyBankFilters());
  },

  _populateBankFilters() {
    const catSel = document.getElementById('bank-filter-cat');
    if (!catSel) return;
    catSel.innerHTML = '<option value="">Semua Kategori</option>';
    QuestionDB.getCategories().forEach(cat => {
      catSel.innerHTML += `<option value="${cat}">${cat}</option>`;
    });
  },

  _applyBankFilters() {
    UIManager.renderQuestionBank({
      category: document.getElementById('bank-filter-cat')?.value || '',
      difficulty: document.getElementById('bank-filter-diff')?.value || '',
      type: document.getElementById('bank-filter-type')?.value || '',
      search: document.getElementById('bank-search')?.value || '',
    });
  },

  // ---- Memulai Game ----
  startGame(playerNames) {
    GameState.reset();
    GameState.players = PlayerManager.create(playerNames);
    GameState.status = 'playing';
    GameState.turnNumber = 1;

    UIManager.showPage('game');
    UIManager.renderBoard();
    // Tampilkan sisi dadu 1 sebagai default saat game mulai
    if (UIManager.el.diceDisplay) UIManager.el.diceDisplay.innerHTML = diceHTML(1, 52);
    UIManager.renderPlayerList();
    // Hook debug: isi dropdown pemain dan tampilkan panel
    DebugManager.refreshPlayerDropdown();
    DebugManager.syncPanelVisibility();
    this._startTurn();
  },

  // ---- Mulai giliran ----
  _startTurn() {
    // Guard: jika semua pemain sudah finish, langsung ke hasil
    if (GameState.players.length > 0 && GameState.players.every(p => p.finished)) {
      setTimeout(() => UIManager.showResult(), 300);
      return;
    }

    const player = GameState.currentPlayer;
    if (!player) return;

    // Skip pemain yang sudah finish (safety, nextPlayer seharusnya sudah handle)
    if (player.finished) {
      // Safety cap: cari pemain aktif manual tanpa rekursi tak terbatas
      let found = false;
      const total = GameState.players.length;
      for (let i = 0; i < total; i++) {
        GameState.currentPlayerIndex = (GameState.currentPlayerIndex + 1) % total;
        if (!GameState.players[GameState.currentPlayerIndex].finished) {
          found = true;
          break;
        }
      }
      if (!found) {
        // Semua selesai
        setTimeout(() => UIManager.showResult(), 300);
        return;
      }
      this._startTurn();
      return;
    }

    // FIX #4: Safety reset semua flag proses di awal setiap giliran aktif
    // Ini memastikan state bersih apapun jalur yang menyebabkan _startTurn dipanggil
    GameState.isAnimating = false;
    GameState.diceRolled = false;
    GameState.status = 'playing';

    UIManager.updateTurnInfo(player);
    UIManager.renderPlayerList();
    UIManager.setDiceEnabled(true);
    UIManager.setPowerUpEnabled(player.inventory.length > 0);
    UIManager.addLog(`--- Giliran ${player.name} (Petak ${player.position || 'START'}) ---`, 'turn');

    // Highlight petak pemain saat ini
    if (player.position > 0) UIManager.highlightCell(player.position, 'cell-active');
  },

  // ---- Roll Dadu ----
  handleRollDice() {
    const player = GameState.currentPlayer;
    if (!player || GameState.diceRolled || GameState.isAnimating || GameState.status !== 'playing') return;

    GameState.isAnimating = true;
    GameState.diceRolled = true;
    UIManager.setDiceEnabled(false);
    UIManager.setPowerUpEnabled(false);
    AudioManager.dice();

    if (GameState.doubleDiceMode) {
      // Double dice: lempar 2x
      const roll1 = DiceManager.roll();
      const roll2 = DiceManager.roll();
      UIManager.animateDice(Math.max(roll1, roll2), () => {
        UIManager.showDoubleDiceChoice(roll1, roll2, (chosen) => {
          GameState.isAnimating = false;
          GameState.diceValue = chosen;
          GameState.doubleDiceMode = false;
          this._processMove(player, chosen);
        });
      });
      return;
    }

    // Hook debug: gunakan nilai dadu yang dipaksakan jika ada
    const rolled = DiceManager.roll();
    const value = (DebugManager.isEnabled() && DebugManager.getForcedDice() > 0)
      ? DebugManager.consumeForcedDice()
      : rolled;
    GameState.diceValue = value;
    UIManager.animateDice(value, () => {
      GameState.isAnimating = false;
      UIManager.addLog(`[DADU] ${player.name} melempar dadu: ${value}`, 'dice');
      UIManager.showToast(`${player.name} mendapat angka ${value}`, 'dice');
      this._processMove(player, value);
    });
  },

  // ---- Proses gerakan ----
  async _processMove(player, steps) {
    GameState.isAnimating = true;
    const from = player.position;
    const rawTarget = from + steps;
    const target = Math.min(rawTarget, GAME_CONFIG.boardSize);

    UIManager.addLog(`[JALAN] ${player.name} bergerak dari ${from || 'START'} ke ${target}`, 'move');

    // Animasi langkah satu per satu
    await this._animateMove(player, from, target);
    player.stats.steps += steps;

    // Cek apakah finish — beri jeda agar bidak terlihat dulu
    if (target >= GAME_CONFIG.boardSize) {
      GameState.isAnimating = false;  // FIX #1: reset flag sebelum masuk finish flow
      UIManager.highlightCell(target, 'cell-active', 900);
      setTimeout(() => this._handleFinish(player), 900);
      return;
    }

    // Cek jebakan
    const trap = BoardManager.checkTrap(target, player.id);
    if (trap) {
      if (player.hasShield) {
        player.hasShield = false;
        UIManager.showEffect('[SHIELD]', 'SHIELD AKTIF!', 'Jebakan berhasil diblokir oleh shield!', () => {
          BoardManager.removeTrap(target);
          this._applyCellEffect(player, target);
        });
        return;
      }
      BoardManager.removeTrap(target);
      const newPos = Math.max(target - 5, 1);
      UIManager.addLog(`[BOM] ${player.name} terkena jebakan! Mundur ke petak ${newPos}`, 'trap');
      UIManager.showEffect('[JEBAKAN]', 'JEBAKAN!', `${player.name} terkena jebakan dan mundur 5 petak!`, async () => {
        await this._animateMove(player, target, newPos);
        this._applyCellEffect(player, newPos);
      }, 2000);
      return;
    }

    this._applyCellEffect(player, target);
  },

  // ---- Animasi gerakan ----
  _animateMove(player, from, to) {
    return new Promise(resolve => {
      // Normalisasi posisi awal: posisi 0 berarti belum mulai, anggap dari petak 1
      const startPos = from <= 0 ? 1 : from;
      let current = startPos;
      player.position = current;
      UIManager.renderAllTokens();

      const steps = Math.abs(to - startPos);
      if (steps === 0) { resolve(); return; }

      const direction = to > startPos ? 1 : -1;
      let stepCount = 0;

      const interval = setInterval(() => {
        current += direction;
        player.position = current;
        UIManager.renderAllTokens();
        UIManager.highlightCell(current, 'cell-step');
        AudioManager.step();
        stepCount++;
        if (stepCount >= steps) {
          clearInterval(interval);
          resolve();
        }
      }, GAME_CONFIG.moveAnimDelay);
    });
  },

  // ---- Efek petak ----
  // Diberi jeda 900ms setelah bidak berhenti agar pemain sempat
  // melihat posisi bidak sebelum popup/soal muncul.
  _applyCellEffect(player, pos) {
    const cellType = BoardManager.getCellType(pos);
    GameState.isAnimating = false;

    // Highlight petak yang diinjak sebentar
    UIManager.highlightCell(pos, 'cell-active', 900);

    // Jeda sebelum efek muncul
    const LAND_DELAY = 900; // ms

    setTimeout(() => {
      switch (cellType) {
        case 'finish':
          this._handleFinish(player);
          break;
        case 'ladder':
          this._handleLadder(player, pos);
          break;
        case 'snake':
          this._handleSnake(player, pos);
          break;
        case 'power-up':
          this._handlePowerUpCell(player);
          break;
        case 'bonus':
          this._handleBonusCell(player);
          break;
        case 'challenge':
          this._handleChallengeCell(player);
          break;
        case 'trap':
          this._handleTrapCell(player);
          break;
        default:
          // Petak soal biasa
          this._handleQuestionCell(player);
          break;
      }
    }, LAND_DELAY);
  },

  _handleLadder(player, pos) {
    const dest = BoardManager.getLadderDestination(pos);
    AudioManager.ladder();
    GameState.addLog(`${player.name} naik tangga dari ${pos} ke ${dest}!`);
    UIManager.addLog(`[TANGGA] ${player.name} naik tangga dari ${pos} ke ${dest}!`, 'ladder');
    player.stats.ladders++;
    UIManager.showEffect('[TANGGA]', 'NAIK TANGGA!', `${player.name} naik dari petak ${pos} ke petak ${dest}!`, async () => {
      GameState.isAnimating = true;
      await this._animateMove(player, pos, dest);
      player.position = dest;
      UIManager.renderAllTokens();
      GameState.isAnimating = false;
      // FIX #2: tangga yang membawa ke petak 64 harus masuk alur finish
      if (dest >= GAME_CONFIG.boardSize) {
        this._handleFinish(player);
      } else {
        this._endTurn();
      }
    }, 2000);
  },

  _handleSnake(player, pos) {
    if (player.hasShield) {
      player.hasShield = false;
      UIManager.showEffect('[SHIELD]', 'SHIELD AKTIF!', 'Ular diblokir oleh shield!', () => {
        UIManager.addLog(`[SHIELD] ${player.name} dilindungi shield dari ular!`, 'shield');
        this._endTurn();
      });
      return;
    }
    const dest = BoardManager.getSnakeDestination(pos);
    AudioManager.snake();
    GameState.addLog(`${player.name} kena ular dari ${pos} ke ${dest}!`);
    UIManager.addLog(`[ULAR] ${player.name} terkena ular dari ${pos} → ${dest}!`, 'snake');
    player.stats.snakes++;
    UIManager.showEffect('[ULAR]', 'KENA ULAR!', `${player.name} turun dari petak ${pos} ke petak ${dest}!`, async () => {
      GameState.isAnimating = true;
      await this._animateMove(player, pos, dest);
      player.position = dest;
      UIManager.renderAllTokens();
      GameState.isAnimating = false;
      this._endTurn();
    }, 2000);
  },

  _handlePowerUpCell(player) {
    const pu = PowerUpManager.getRandomPowerUp();
    const added = PlayerManager.addToInventory(player, pu.id);
    AudioManager.powerup();
    if (added) {
      UIManager.addLog(`[PETI] ${player.name} mendapat power-up: ${pu.name}!`, 'powerup');
      UIManager.showEffect('[POWERUP]', 'POWER-UP!', `${player.name} mendapat ${pu.name}!`, () => {
        UIManager.showToast(`${pu.name} ditambahkan ke inventori!`, 'powerup');
        this._endTurn();
      }, 2000);
    } else {
      UIManager.showEffect('[PENUH]', 'INVENTORI PENUH!', `${player.name} tidak bisa menyimpan lebih dari 3 power-up. Inventori penuh!`, () => {
        this._endTurn();
      }, 2000);
    }
  },

  _handleBonusCell(player) {
    const pts = GAME_CONFIG.bonusCellPoints;
    ScoreManager.addPoints(player, pts);
    UIManager.addLog(`[KOIN] ${player.name} mendapat bonus +${pts} poin!`, 'bonus');
    UIManager.showEffect('[BINTANG]', 'BONUS POIN!', `${player.name} mendapat +${pts} poin bonus!`, () => {
      UIManager.renderPlayerList();
      this._endTurn();
    }, 2000);
  },

  _handleChallengeCell(player) {
    UIManager.showEffect('[PETIR]', 'CHALLENGE!', 'Soal SULIT! Reward lebih besar jika benar!', () => {
      this._askQuestion(player, 'hard', () => this._endTurn());
    }, 1800);
  },

  _handleTrapCell(player) {
    if (player.hasShield) {
      player.hasShield = false;
      UIManager.showEffect('[SHIELD]', 'SHIELD AKTIF!', 'Jebakan diblokir oleh shield!', () => this._endTurn());
      return;
    }
    const penalty = -5;
    ScoreManager.addPoints(player, penalty);
    UIManager.showEffect('[RAMBU]', 'JEBAKAN!', `${player.name} terkena jebakan! ${penalty} poin!`, () => {
      UIManager.renderPlayerList();
      this._endTurn();
    }, 2000);
  },

  _handleQuestionCell(player) {
    this._askQuestion(player, null, () => this._endTurn());
  },

  // ---- Tanya soal ----
  _askQuestion(player, forceDifficulty = null, afterCallback, resultCallback = null, penaltyOnly = false) {
    const q = QuestionManager.getQuestion(player, forceDifficulty);
    if (!q) {
      UIManager.showToast('Semua soal sudah digunakan! Melanjutkan...', 'info');
      afterCallback();
      return;
    }

    QuestionManager.markUsed(player, q.id);
    GameState.currentQuestion = q;
    GameState.questionAnswered = false;
    GameState.status = 'question';

    UIManager.showQuestion(q, player, (answer) => {
      this._handleAnswer(player, q, answer, afterCallback, resultCallback, penaltyOnly);
    });

    // Mulai timer
    QuestionManager.startTimer(
      GAME_CONFIG.questionTime,
      (t) => UIManager.updateTimer(t),
      () => {
        // Waktu habis
        UIManager.hideQuestion();
        UIManager.showToast('Waktu Habis!', 'warning');
        this._handleAnswer(player, q, null, afterCallback, resultCallback, penaltyOnly);
      }
    );
  },

  _handleAnswer(player, q, playerAnswer, afterCallback, resultCallback = null, penaltyOnly = false) {
    if (GameState.questionAnswered) return;
    GameState.questionAnswered = true;
    QuestionManager.clearTimer();

    // Hook debug: paksa jawaban benar jika autoCorrect aktif
    const effectiveAnswer = (DebugManager.isEnabled() && DebugManager.isAutoCorrect())
      ? q.answer
      : playerAnswer;

    const { correct } = QuestionManager.evaluate(q, effectiveAnswer);

    if (penaltyOnly) {
      // Mode TARGET: hadiah tidak berlaku, penalti tetap
      // Power-up Knowledge Boost, Double Points, Second Chance tidak ikut berlaku
      let finalPoints;
      let feedbackTitle;
      if (correct) {
        finalPoints = 0;
        feedbackTitle = 'Target selamat, poin tidak berubah';
      } else {
        const penalty = Math.min(10, player.score);
        finalPoints = -penalty;
        feedbackTitle = penalty > 0 ? `-${penalty} Poin` : 'Poin sudah 0, tidak berubah';
        if (penalty > 0) {
          ScoreManager.addPoints(player, finalPoints);
          AudioManager.wrong();
          UIManager.addLog(`[TARGET] ${player.name} salah! ${finalPoints} poin`, 'wrong');
          UIManager.renderPlayerList();
        }
      }
      GameState.status = 'playing';
      if (resultCallback) resultCallback(correct, finalPoints);
      UIManager.showFeedback(correct, q, finalPoints, afterCallback, feedbackTitle);
      return;
    }

    const { points } = QuestionManager.evaluate(q, effectiveAnswer);
    let finalPoints = points;

    // Knowledge boost
    if (correct && player.hasKnowledgeBoost) {
      finalPoints += 10;
      player.hasKnowledgeBoost = false;
      UIManager.showToast('Knowledge Boost! +10 bonus poin!', 'powerup');
    }

    // Double points
    if (correct && player.hasDoublePoints) {
      finalPoints *= 2;
      player.hasDoublePoints = false;
      UIManager.showToast('Poin Ganda! Poin x2!', 'powerup');
    }

    // Second Chance
    if (!correct && player.hasSecondChance && playerAnswer !== null) {
      player.hasSecondChance = false;
      UIManager.addLog(`[JANTUNG] ${player.name} menggunakan Second Chance!`, 'powerup');
      UIManager.showEffect('[JANTUNG]', 'SECOND CHANCE!', 'Kesempatan kedua! Jawab lagi!', () => {
        this._askQuestion(player, q.difficulty, afterCallback);
      }, 1500);
      return;
    }

    ScoreManager.addPoints(player, finalPoints);
    if (correct) {
      player.stats.correct++;
      AudioManager.correct();
      UIManager.addLog(`[BENAR] ${player.name} menjawab BENAR! +${finalPoints} poin`, 'correct');
    } else {
      player.stats.wrong++;
      AudioManager.wrong();
      UIManager.addLog(`[SALAH] ${player.name} menjawab SALAH! ${finalPoints} poin`, 'wrong');
    }

    GameState.status = 'playing';
    UIManager.renderPlayerList();

    // Notifikasi hasil ke caller yang membutuhkan
    if (resultCallback) resultCallback(correct, finalPoints);

    UIManager.showFeedback(correct, q, finalPoints, afterCallback);
  },

  // ---- Handle Power-Up ----
  handleUsePowerUp(puId) {
    const player = GameState.currentPlayer;
    if (!player) return;
    const pu = PowerUpManager.getById(puId);
    if (!pu) return;

    if (!pu.targetSelf && PlayerManager.getOtherPlayers(player).length === 0) {
      UIManager.showToast('Tidak ada pemain lain untuk ditarget!', 'warning');
      return;
    }

    if (!pu.targetSelf) {
      // Pilih target pemain
      UIManager.showTargetSelection(player, `Pilih target untuk ${pu.name}`, (target) => {
        if (!target) return;
        const result = PowerUpManager.apply(puId, player, target);
        if (result) this._applyPowerUpEffect(result, player);
      });
    } else {
      const result = PowerUpManager.apply(puId, player, null);
      if (result) this._applyPowerUpEffect(result, player);
    }
  },

  _applyPowerUpEffect(result, actor) {
    AudioManager.powerup();
    UIManager.addLog(`[EFEK] ${actor.name} menggunakan power-up: ${result.message}`, 'powerup');

    switch (result.type) {
      case 'move': {
        const target = PlayerManager.getById(result.playerId);
        if (!target) break;
        const from = target.position;
        UIManager.showEffect('[BINTANG]', 'POWER-UP!', result.message, async () => {
          GameState.isAnimating = true;
          await this._animateMove(target, from, result.position);
          target.position = result.position;
          UIManager.renderAllTokens();
          UIManager.renderPlayerList();
          GameState.isAnimating = false;
          // Cek finish setelah move power-up
          if (target.position >= GAME_CONFIG.boardSize && !target.finished) {
            this._handleFinish(target);
          }
        }, 1800);
        break;
      }
      case 'shield': {
        const target = PlayerManager.getById(result.playerId);
        if (target) target.hasShield = true;
        UIManager.showEffect('[SHIELD]', 'SHIELD!', result.message, () => UIManager.renderPlayerList(), 1800);
        break;
      }
      case 'double-dice': {
        GameState.doubleDiceMode = true;
        GameState.diceRolled = false;
        UIManager.setDiceEnabled(true);
        UIManager.showEffect('[DADU]', 'DOUBLE DICE!', result.message, () => {}, 1800);
        break;
      }
      case 'swap': {
        const p1 = PlayerManager.getById(result.playerId);
        const p2 = PlayerManager.getById(result.targetId);
        if (p1 && p2) {
          [p1.position, p2.position] = [p2.position, p1.position];
          UIManager.renderAllTokens();
          UIManager.renderPlayerList();
        }
        UIManager.showEffect('[SWAP]', 'SWAP!', result.message, () => {}, 2000);
        break;
      }
      case 'skip': {
        const target = PlayerManager.getById(result.playerId);
        if (target) target.skippedTurns += 1;
        UIManager.showEffect('[SKIP]', 'SKIP!', result.message, () => UIManager.renderPlayerList(), 1800);
        break;
      }
      case 'second-chance': {
        const target = PlayerManager.getById(result.playerId);
        if (target) target.hasSecondChance = true;
        UIManager.showEffect('[JANTUNG]', 'SECOND CHANCE!', result.message, () => {}, 1800);
        break;
      }
      case 'knowledge-boost': {
        const target = PlayerManager.getById(result.playerId);
        if (target) target.hasKnowledgeBoost = true;
        UIManager.showEffect('[BUKU]', 'KNOWLEDGE BOOST!', result.message, () => {}, 1800);
        break;
      }
      case 'double-points': {
        const target = PlayerManager.getById(result.playerId);
        if (target) target.hasDoublePoints = true;
        UIManager.showEffect('[BINTANG]', 'POIN GANDA!', result.message, () => {}, 1800);
        break;
      }
      case 'steal-score': {
        const from = PlayerManager.getById(result.fromId);
        const to   = PlayerManager.getById(result.toId);
        if (from && to) {
          ScoreManager.addPoints(from, -result.amount);
          ScoreManager.addPoints(to,   result.amount);
          UIManager.renderPlayerList();
        }
        UIManager.showEffect('[BINTANG]', 'CURI POIN!', result.message, () => {}, 1800);
        break;
      }
      case 'none-magnet': {
        // Magnet gagal karena semua pemain poin 0 — kembalikan power-up ke inventori
        const actor = GameState.players.find(p => p.id === GameState.currentPlayerIndex) || GameState.currentPlayer;
        if (actor) {
          PlayerManager.addToInventory(actor, 'magnet');
          UIManager.renderPlayerList();
        }
        UIManager.showToast(result.message, 'warning');
        break;
      }
      case 'none': {
        // Power-up gagal (tidak ada target / poin 0) — kembalikan ke inventori pemakai
        const puToReturn = result.returnPowerUpId;
        if (puToReturn) {
          const actorNone = GameState.currentPlayer;
          if (actorNone) {
            PlayerManager.addToInventory(actorNone, puToReturn);
            UIManager.renderPlayerList();
          }
        }
        UIManager.showToast(result.message, 'warning');
        break;
      }
      case 'target-question': {
        const target = PlayerManager.getById(result.playerId);
        if (target) {
          UIManager.showEffect('[TARGET]', 'TARGET!', result.message, () => {
            // penaltyOnly=true: benar→+0 poin & tidak ubah stats, salah/timeout→-10 poin (min 0)
            // Knowledge Boost, Double Points, Second Chance tidak berlaku
            this._askQuestion(target, null, () => UIManager.renderPlayerList(),
              null, true /* penaltyOnly */);
          }, 1800);
        }
        break;
      }
      case 'trap': {
        GameState.traps.push({ position: result.trapPosition, ownerId: result.ownerId });
        UIManager.showEffect('[BOM]', 'JEBAKAN DIPASANG!', result.message, () => {}, 1800);
        break;
      }
      default:
        UIManager.showEffect('[BINTANG]', 'POWER-UP!', result.message, () => {}, 1800);
    }
  },

  // ---- Finish ----
  _handleFinish(player) {
    if (player.finished) return; // Jaga-jaga agar tidak dipanggil dua kali
    const finishOrder = TurnManager.getFinishOrder().length + 1;
    player.finished = true;
    player.position = GAME_CONFIG.boardSize;
    player.finishOrder = finishOrder;
    AudioManager.win();
    UIManager.renderAllTokens();
    UIManager.renderPlayerList();

    if (finishOrder === 1) {
      // Finisher pertama: beri bonus +30 poin dan catat state untuk akhir ronde
      GameState.firstFinisherId = player.id;
      // roundEndTurnCount = turnsTaken finisher pertama + 1 (giliran ini belum diincrement)
      // Semua pemain harus mencapai turnsTaken ini agar ronde dianggap selesai
      GameState.roundEndTurnCount = player.turnsTaken + 1;

      const bonus = GAME_CONFIG.finishBonusPoints;
      ScoreManager.addPoints(player, bonus);
      UIManager.renderPlayerList();

      UIManager.addLog(`[MENANG] ${player.name} pertama FINISH! Bonus +${bonus} poin!`, 'win');
      UIManager.showEffect('[TROFI]', `${player.name} FINISH PERTAMA!`,
        `Selamat! Bonus +${bonus} poin! Game terus berjalan sampai semua mendapat giliran yang sama.`, () => {
          // Cek apakah ronde sudah selesai (semua lain sudah dapat giliran sama)
          if (this._isRoundComplete()) {
            setTimeout(() => UIManager.showResult(), 500);
          } else {
            this._endTurn();
          }
        }, 3500);
    } else {
      const medals = ['', '[1]', '[2]', '[3]'];
      UIManager.addLog(`${medals[finishOrder] || ''} ${player.name} finish di posisi ${finishOrder}!`, 'finish');
      UIManager.showEffect('[SELESAI]', `${player.name} FINISH!`, `Posisi ke-${finishOrder}!`, () => {
        if (this._isRoundComplete()) {
          setTimeout(() => UIManager.showResult(), 500);
        } else {
          this._endTurn();
        }
      }, 2000);
    }
  },

  /**
   * Ronde selesai jika:
   * - Ada finisher pertama (roundEndTurnCount di-set), DAN
   * - Semua pemain yang bukan finisher pertama sudah turnsTaken >= roundEndTurnCount
   *   (artinya mereka sudah mendapat jumlah giliran yang sama dengan finisher)
   */
  _isRoundComplete() {
    if (GameState.roundEndTurnCount === null) return false;
    const target = GameState.roundEndTurnCount;
    // Cek semua pemain yang bukan finisher pertama
    for (const p of GameState.players) {
      if (p.id === GameState.firstFinisherId) continue;
      if (p.turnsTaken < target) return false;
    }
    return true;
  },

  // ---- Akhir giliran ----
  _endTurn() {
    UIManager.renderPlayerList();
    TurnManager.nextPlayer();

    // Cek apakah ronde sudah selesai setelah increment turnsTaken
    if (this._isRoundComplete()) {
      setTimeout(() => UIManager.showResult(), 300);
      return;
    }

    // Cek apakah semua pemain sudah finish (kasus semua masuk finish)
    const notFinished = GameState.players.filter(p => !p.finished);
    if (notFinished.length === 0) {
      setTimeout(() => UIManager.showResult(), 300);
      return;
    }

    this._startTurn();
  },

  // ---- Bank Soal Guru (hanya mode guru) ----
  editQuestion(id) {
    if (!BankMode.isGuru()) return; // blok akses di mode murid (termasuk dari console)
    const q = QuestionDB.getById(id);
    if (!q) return;
    const modal = document.getElementById('add-q-modal');
    if (!modal) return;
    document.getElementById('aq-modal-title').textContent = 'Edit Soal';
    document.getElementById('aq-id').value = q.id;
    document.getElementById('aq-category').value = q.category;
    document.getElementById('aq-difficulty').value = q.difficulty;
    document.getElementById('aq-type').value = q.type;
    document.getElementById('aq-question').value = q.question;
    document.getElementById('aq-explanation').value = q.explanation;
    // Untuk simplisitas, jawaban ditampilkan sebagai JSON
    document.getElementById('aq-answer-raw').value = JSON.stringify(q.answer);
    if (q.options) document.getElementById('aq-options-raw').value = JSON.stringify(q.options);
    // acceptedAnswers — tampilkan sebagai teks dipisah koma (hanya concept-guess)
    const acceptedEl = document.getElementById('aq-accepted-raw');
    if (acceptedEl) {
      acceptedEl.value = Array.isArray(q.acceptedAnswers) ? q.acceptedAnswers.join(', ') : '';
    }
    // Sinkronkan tampilan field jawaban alternatif
    const acceptedGroup = document.getElementById('aq-accepted-group');
    if (acceptedGroup) acceptedGroup.style.display = q.type === 'concept-guess' ? '' : 'none';
    modal.classList.add('active');
  },

  deleteQuestion(id) {
    if (!BankMode.isGuru()) return; // blok akses di mode murid
    if (confirm(`Hapus soal ID ${id}? Tindakan ini tidak dapat dibatalkan.`)) {
      QuestionDB.delete(id);
      UIManager.renderQuestionBank();
      UIManager.showToast('Soal berhasil dihapus', 'info');
    }
  },

  showAddQuestionForm() {
    if (!BankMode.isGuru()) return; // blok akses di mode murid
    const modal = document.getElementById('add-q-modal');
    if (!modal) return;
    document.getElementById('aq-modal-title').textContent = 'Tambah Soal Baru';
    document.getElementById('aq-id').value = '';
    document.getElementById('aq-category').value = '';
    document.getElementById('aq-difficulty').value = 'medium';
    document.getElementById('aq-type').value = 'multiple-choice';
    document.getElementById('aq-question').value = '';
    document.getElementById('aq-explanation').value = '';
    document.getElementById('aq-answer-raw').value = '0';
    document.getElementById('aq-options-raw').value = '["Opsi A","Opsi B","Opsi C","Opsi D"]';
    // Reset acceptedAnswers dan sembunyikan (tipe default bukan concept-guess)
    const acceptedEl = document.getElementById('aq-accepted-raw');
    if (acceptedEl) acceptedEl.value = '';
    const acceptedGroup = document.getElementById('aq-accepted-group');
    if (acceptedGroup) acceptedGroup.style.display = 'none';
    modal.classList.add('active');
  },

  saveQuestion() {
    if (!BankMode.isGuru()) return; // blok akses di mode murid
    const id = document.getElementById('aq-id').value;
    const data = {
      category: document.getElementById('aq-category').value,
      difficulty: document.getElementById('aq-difficulty').value,
      type: document.getElementById('aq-type').value,
      question: document.getElementById('aq-question').value,
      explanation: document.getElementById('aq-explanation').value,
      answer: JSON.parse(document.getElementById('aq-answer-raw').value),
    };
    try {
      const opts = JSON.parse(document.getElementById('aq-options-raw').value);
      if (Array.isArray(opts)) data.options = opts;
    } catch (e) { /* no options */ }

    // Simpan acceptedAnswers jika tipe concept-guess dan field tidak kosong
    if (data.type === 'concept-guess') {
      const rawAccepted = (document.getElementById('aq-accepted-raw')?.value || '').trim();
      if (rawAccepted) {
        data.acceptedAnswers = rawAccepted
          .split(',')
          .map(s => s.trim())
          .filter(s => s.length > 0);
      }
    }

    if (!data.question.trim()) { UIManager.showToast('Pertanyaan tidak boleh kosong!', 'warning'); return; }

    if (id) {
      QuestionDB.update(parseInt(id), data);
      UIManager.showToast('Soal berhasil diperbarui!', 'success');
    } else {
      QuestionDB.add(data);
      UIManager.showToast('Soal baru berhasil ditambahkan!', 'success');
    }
    document.getElementById('add-q-modal').classList.remove('active');
    UIManager.renderQuestionBank();
  },
};

// ============================================================
//  Bootstrap — jalankan setelah DOM siap
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  GameController.init();
  DebugManager.init();  // Mode debug — hanya aktif jika URL mengandung ?debug=1

  // ── Render daftar power-up otomatis di layar Cara Bermain ──
  (function renderHowtoPowerUps() {
    const container = document.getElementById('howto-pu-list');
    if (!container) return;
    const rarityLabel = { common: 'Biasa', uncommon: 'Tidak Biasa', rare: 'Langka', epic: 'Epik' };
    const rarityColor = { common: '#95a5a6', uncommon: '#2ecc71', rare: '#3498db', epic: '#9b59b6' };
    container.innerHTML = POWERUP_CONFIG.map(pu => `
      <div class="howto-pu-item">
        <span class="howto-pu-icon">${puIconHTML(pu.icon, 24)}</span>
        <div class="howto-pu-info">
          <span class="howto-pu-name">${pu.name}</span>
          <span class="howto-pu-rarity" style="color:${rarityColor[pu.rarity] || '#aaa'}">${rarityLabel[pu.rarity] || pu.rarity}</span>
          <span class="howto-pu-desc">${pu.description}</span>
        </div>
      </div>`).join('');
  })();

  // ── Perbarui jumlah power-up di badge statistik menu ──
  const statBadge = document.getElementById('stat-powerup-count');
  if (statBadge) statBadge.textContent = POWERUP_CONFIG.length;

  // Bind tombol save soal di modal
  document.getElementById('aq-save-btn')?.addEventListener('click', () => GameController.saveQuestion());
  document.getElementById('aq-cancel-btn')?.addEventListener('click', () => {
    document.getElementById('add-q-modal')?.classList.remove('active');
  });
});
