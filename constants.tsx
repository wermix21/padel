
import React from 'react';
import { Racket } from './types';
import { Shield, Clock, AlertCircle, RefreshCcw, MapPin, Truck, Wallet, FileText } from 'lucide-react';

export const WHATSAPP_NUMBER = "628131767727";
export const INSTAGRAM_HANDLE = "@arceapadel";
export const DEPOSIT_AMOUNT = 300000;

export const RACKETS: Racket[] = [
  // TACTICAL - 180k
  {
    id: 'tactical-el-jefe',
    brand: 'Tactical Padel',
    price: 180000,
    category: 'Control',
    image: 'https://justpadel.com/cdn/shop/files/tactical-el-jefe-master-edition-1525781.png?v=1760089494&width=1500',
    description: 'Master Edition 2025: Senjata utama untuk kontrol bedah dan penguasaan lapangan elit dengan material carbon fiber tercanggih.',
    models: ['Tactical Padel El Jefe Master Edition 2025']
  },
  // ADIDAS - 125k (2026 Edition)
  {
    id: 'adidas-metalbone',
    brand: 'Adidas',
    price: 125000,
    category: 'Power',
    image: 'https://padelracket.id/cdn/shop/files/adidas-metalbone-carbon-2026-padel-racket.jpg?v=1765251650&width=1000',
    description: 'Power eksplosif dengan teknologi Weight & Balance terbaru edisi 2026.',
    models: ['Adidas Metalbone 3.3 2026 Edition']
  },
  {
    id: 'adidas-adipower',
    brand: 'Adidas',
    price: 125000,
    category: 'Control',
    image: 'https://padelracket.id/cdn/shop/files/padel-shop-Adidas-Cross-It-Light-2026-Padel-Racket-by-Martita-Ortega.jpg?v=1765259355',
    description: 'Maneuverability tinggi edisi 2026 untuk pemain taktis yang mencari kecepatan.',
    models: ['Adidas Cross It Light Martita Ortega 3.5 2026']
  },
  // NOX - 95k
  {
    id: 'nox-ml10',
    brand: 'NOX',
    price: 95000,
    category: 'Control',
    image: 'https://padelracket.id/cdn/shop/files/NOX-AT10-Genius-attack-18K-2025-Padel-Racket-by-Agustin-Tapia.jpg?v=1737909846',
    description: 'Legendaris ML10 Pro Cup yang terlahir kembali dalam balutan Luxury 2025.',
    models: ['Nox AT10 Genius Attack Alum 18k 2025']
  },
  {
    id: 'nox-tempo',
    brand: 'NOX',
    price: 95000,
    category: 'Hybrid',
    image: 'https://padelracket.id/cdn/shop/files/Nox-Padel-at10-luxury-genius-18k-alum-2025-by-agustin-tapia_c1fd8b4a-9023-4370-95ac-f52446ec9382.png?v=1737307251',
    description: 'Gear Resmi World Padel Tour 2025 untuk ritme permainan yang seimbang.',
    models: ['NOX AT10 Genius 18K Alum 2025 Padel Racket by Agustin Tapia']
  },
  // BABOLAT - 100k
  {
    id: 'babolat-technical',
    brand: 'Babolat',
    price: 100000,
    category: 'Power',
    image: 'https://padelracket.id/cdn/shop/files/Babolat-Technical-Viper-2.5-2025-Padel-Racket.jpg?v=1739121046',
    description: '2025 Technical Viper: Power besar untuk pemukul teknis yang agresif.',
    models: ['Babolat Technical Viper 2.5 2025 Padel Racket']
  },
  {
    id: 'babolat-air',
    brand: 'Babolat',
    price: 100000,
    category: 'Power',
    image: 'https://padelracket.id/cdn/shop/files/Babolat-Air-Viper-2.5-2025-Padel-Racket.jpg?v=1739120774',
    description: 'Cepat dan eksplosif: Air Viper 2025 untuk dominasi serangan udara.',
    models: ['Babolat Air Viper 2.5 2025 Padel Racket']
  },
  {
    id: 'babolat-counter',
    brand: 'Babolat',
    price: 100000,
    category: 'Control',
    image: 'https://padelracket.id/cdn/shop/files/Babolat-Counter-Viper-2.5-2025-Padel-Racket-by-Coki-Nieto.jpg?v=1739120505',
    description: 'Toleransi tinggi edisi 2025 untuk pemain dengan pertahanan kokoh.',
    models: ['Babolat Counter Viper 2025']
  },
  // BULLPADEL - 100k
  {
    id: 'bullpadel-vertex',
    brand: 'Bullpadel',
    price: 100000,
    category: 'Power',
    image: 'https://padelracket.id/cdn/shop/files/bullpadel-vertex-04-2025-padel-racket.jpg?v=1732327529',
    description: 'Vertex 04 ikonik 2025, dibuat untuk spin ekstrem dan performa eksplosif.',
    models: ['Bullpadel Vertex 04 2025 Padel Racket by Juan Tello']
  },
  {
    id: 'bullpadel-hack',
    brand: 'Bullpadel',
    price: 100000,
    category: 'Power',
    image: 'https://padelracket.id/cdn/shop/files/bullpadel-hack-04-2025-padel-racket.jpg?v=1732326175',
    description: 'Frame kaku untuk power maksimal, signature 2025 dari Paquito Navarro.',
    models: ['Bullpadel Hack 04 2025 Padel Racket by Paquito Navarro']
  },
  {
    id: 'bullpadel-comfort',
    brand: 'Bullpadel',
    price: 100000,
    category: 'Hybrid',
    image: 'https://padelracket.id/cdn/shop/files/bullpadel-xplo-25-padel-racket.jpg?v=1730167865',
    description: '2025 Comfort Edition: Performa punch tinggi dengan sentuhan lebih lembut.',
    models: ['Bullpadel XPLO 2025 Padel Racket by Martin di Nenno']
  },
  {
    id: 'bullpadel-flow',
    brand: 'Bullpadel',
    price: 100000,
    category: 'Hybrid',
    image: 'https://www.zonadepadel.com/23191-zdp_customer/bullpadel-xplo-premier-2025.jpg',
    description: 'Flow ringan untuk kekuatan feminin di sirkuit 2025.',
    models: ['Bullpadel XPLO Premier 2025']
  },
  {
    id: 'bullpadel-elite',
    brand: 'Bullpadel',
    price: 100000,
    category: 'Control',
    image: 'https://www.bullpadel.com/16223-large_default/racket-bullpadel-hack-04-premier.jpg',
    description: 'Kontrol elegan 2025, signature masterpiece dari Gemma Triay.',
    models: ['BULLPADEL HACK 04 PREMIER']
  }
];

export const RULES_GROUPS = [
  {
    title: "Area Layanan & Pengantaran",
    rules: [
      {
        icon: <MapPin className="w-5 h-5 text-emerald-600" />,
        text: "Layanan penyewaan hanya berlaku untuk wilayah Jabodetabek."
      },
      {
        icon: <Truck className="w-5 h-5 text-blue-600" />,
        text: "Pengantaran dan pengembalian wajib menggunakan jasa instan/same day (Biaya ditanggung penyewa)."
      },
      {
        icon: <Clock className="w-5 h-5 text-amber-600" />,
        text: "Proses penjemputan dan pengembalian dilakukan pukul 07.00 - 22.00."
      }
    ]
  },
  {
    title: "Ketentuan Penyewaan",
    rules: [
      {
        icon: <FileText className="w-5 h-5 text-purple-600" />,
        text: "Minimal masa sewa adalah 1 hari (1 x 24 jam)."
      },
      {
        icon: <Clock className="w-5 h-5 text-emerald-600" />,
        text: "Toleransi keterlambatan pengembalian maksimal hingga 1 hari setelah masa sewa berakhir (Sesuai kesepakatan)."
      },
      {
        icon: <RefreshCcw className="w-5 h-5 text-blue-600" />,
        text: "Perpanjangan wajib diajukan H-1 sebelum masa sewa berakhir (Tergantung ketersediaan)."
      }
    ]
  },
  {
    title: "Pembayaran & Jaminan",
    rules: [
      {
        icon: <Wallet className="w-5 h-5 text-emerald-600" />,
        text: "Pembayaran sewa dilakukan di awal secara penuh."
      },
      {
        icon: <Shield className="w-5 h-5 text-orange-600" />,
        text: "Wajib deposit Rp300.000 per raket (Kembali 100% jika raket aman & tepat waktu)."
      }
    ]
  }
];

export const RULES = [];
