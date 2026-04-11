/**
 * Mock data for Bratamedia Digital Solutions landing page.
 *
 * Used by frontend components as placeholder data before Supabase integration.
 * All data matches the LocalizedService, LocalizedPortfolioItem, and
 * LocalizedTestimonial shapes returned by the server actions.
 *
 * Replace usages with real server action calls once the database is seeded.
 */

import type { LocalizedService } from '@/lib/actions/services'
import type { LocalizedPortfolioItem } from '@/lib/actions/portfolio'
import type { LocalizedTestimonial } from '@/lib/actions/testimonials'

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

export const mockServicesId: LocalizedService[] = [
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    name: 'Pengembangan Web',
    description:
      'Membangun website modern, cepat, dan responsif menggunakan teknologi terkini. Dari landing page hingga platform web kompleks, kami pastikan setiap produk tampil sempurna di semua perangkat.',
    icon: 'globe',
    sort_order: 1,
  },
  {
    id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    name: 'Aplikasi Mobile',
    description:
      'Mengembangkan aplikasi iOS dan Android yang intuitif dan berperforma tinggi. Kami merancang pengalaman mobile yang memudahkan pengguna dan memperkuat loyalitas pelanggan bisnis Anda.',
    icon: 'smartphone',
    sort_order: 2,
  },
  {
    id: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
    name: 'Desain UI/UX',
    description:
      'Merancang antarmuka yang menarik dan pengalaman pengguna yang menyenangkan. Desain kami bukan sekadar estetika — setiap elemen dirancang untuk memandu pengguna mencapai tujuan mereka dengan mudah.',
    icon: 'palette',
    sort_order: 3,
  },
  {
    id: 'd4e5f6a7-b8c9-0123-defa-234567890123',
    name: 'Pemasaran Digital',
    description:
      'Strategi pemasaran digital yang efektif untuk meningkatkan visibilitas dan konversi bisnis Anda. Dari SEO hingga iklan berbayar, kami bantu brand Anda menjangkau audiens yang tepat.',
    icon: 'megaphone',
    sort_order: 4,
  },
  {
    id: 'e5f6a7b8-c9d0-1234-efab-345678901234',
    name: 'Infrastruktur Cloud',
    description:
      'Solusi cloud yang skalabel dan aman untuk mendukung pertumbuhan bisnis Anda. Kami mengelola infrastruktur Anda agar tetap andal, efisien, dan siap menghadapi lonjakan trafik kapan pun.',
    icon: 'cloud',
    sort_order: 5,
  },
  {
    id: 'f6a7b8c9-d0e1-2345-fabc-456789012345',
    name: 'Konsultasi IT',
    description:
      'Konsultasi teknologi yang komprehensif untuk transformasi digital bisnis Anda. Kami membantu Anda memilih solusi yang tepat, menyusun roadmap teknologi, dan memastikan investasi IT memberikan hasil nyata.',
    icon: 'headphones',
    sort_order: 6,
  },
]

export const mockServicesEn: LocalizedService[] = [
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    name: 'Web Development',
    description:
      'Building modern, fast, and responsive websites using the latest technologies. From landing pages to complex web platforms, we ensure every product looks and performs flawlessly across all devices.',
    icon: 'globe',
    sort_order: 1,
  },
  {
    id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    name: 'Mobile Applications',
    description:
      'Developing intuitive, high-performance iOS and Android applications. We craft mobile experiences that delight users and strengthen customer loyalty for your business.',
    icon: 'smartphone',
    sort_order: 2,
  },
  {
    id: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
    name: 'UI/UX Design',
    description:
      'Crafting visually appealing interfaces and delightful user experiences. Our designs go beyond aesthetics — every element is purposefully built to guide users toward their goals with ease.',
    icon: 'palette',
    sort_order: 3,
  },
  {
    id: 'd4e5f6a7-b8c9-0123-defa-234567890123',
    name: 'Digital Marketing',
    description:
      'Effective digital marketing strategies to increase your business visibility and conversions. From SEO to paid advertising, we help your brand reach the right audience at the right time.',
    icon: 'megaphone',
    sort_order: 4,
  },
  {
    id: 'e5f6a7b8-c9d0-1234-efab-345678901234',
    name: 'Cloud Infrastructure',
    description:
      'Scalable and secure cloud solutions to support your business growth. We manage your infrastructure to keep it reliable, cost-efficient, and ready to handle traffic spikes at any time.',
    icon: 'cloud',
    sort_order: 5,
  },
  {
    id: 'f6a7b8c9-d0e1-2345-fabc-456789012345',
    name: 'IT Consulting',
    description:
      'Comprehensive technology consulting for your business digital transformation. We help you choose the right solutions, build a technology roadmap, and ensure your IT investments deliver measurable results.',
    icon: 'headphones',
    sort_order: 6,
  },
]

export function getMockServices(locale: 'id' | 'en'): LocalizedService[] {
  return locale === 'id' ? mockServicesId : mockServicesEn
}

// ---------------------------------------------------------------------------
// Portfolio
// ---------------------------------------------------------------------------

export const mockPortfolioId: LocalizedPortfolioItem[] = [
  {
    id: '11111111-aaaa-4bbb-8ccc-dddddddddddd',
    title: 'Platform E-Commerce Nusantara Retail',
    description:
      'Platform belanja online end-to-end untuk jaringan ritel nasional dengan lebih dari 500 SKU produk. Dilengkapi fitur manajemen inventaris real-time, integrasi payment gateway lokal, dan dashboard analitik penjualan. Berhasil meningkatkan konversi online sebesar 340% dalam tiga bulan pertama peluncuran.',
    image_url: null,
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Supabase', 'Midtrans'],
    category: 'E-Commerce',
    sort_order: 1,
  },
  {
    id: '22222222-aaaa-4bbb-8ccc-dddddddddddd',
    title: 'Sistem Manajemen Rumah Sakit Medika Prima',
    description:
      'Sistem informasi rumah sakit terintegrasi yang mencakup modul rekam medis elektronik, penjadwalan dokter, manajemen apotek, dan billing pasien. Digunakan oleh lebih dari 200 tenaga medis dan menangani ribuan transaksi harian. Sistem ini memangkas waktu administrasi rata-rata 60% dibandingkan proses manual sebelumnya.',
    image_url: null,
    tags: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    category: 'Healthcare',
    sort_order: 2,
  },
  {
    id: '33333333-aaaa-4bbb-8ccc-dddddddddddd',
    title: 'Aplikasi Mobile Warung Makan Padang Jaya',
    description:
      'Aplikasi pemesanan makanan mobile untuk jaringan restoran Padang dengan 12 cabang di Jabodetabek. Fitur unggulan meliputi pemesanan meja, pre-order menu harian, loyalty points, dan notifikasi real-time status pesanan. Aplikasi ini mendapatkan rating 4.8 di Google Play Store dalam tiga bulan pertama.',
    image_url: null,
    tags: ['React Native', 'Expo', 'Firebase', 'Node.js'],
    category: 'Mobile App',
    sort_order: 3,
  },
  {
    id: '44444444-aaaa-4bbb-8ccc-dddddddddddd',
    title: 'Portal Layanan Publik Kabupaten Sukabumi',
    description:
      'Redesain portal web pemerintah daerah yang mempermudah akses masyarakat ke 40+ layanan publik secara online. Meliputi pengajuan dokumen kependudukan, perizinan usaha, dan pengaduan masyarakat berbasis tiket. Portal baru ini berhasil meningkatkan kepuasan pengguna dari 52% menjadi 91% berdasarkan survei pasca-peluncuran.',
    image_url: null,
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    category: 'Government',
    sort_order: 4,
  },
  {
    id: '55555555-aaaa-4bbb-8ccc-dddddddddddd',
    title: 'Dashboard Fintech Koperasi Digital Sejahtera',
    description:
      'Platform manajemen keuangan digital untuk koperasi simpan pinjam dengan fitur pengajuan pinjaman online, simulasi cicilan, monitoring portofolio anggota, dan laporan keuangan otomatis. Dibangun dengan standar keamanan perbankan dan telah memenuhi regulasi OJK. Saat ini melayani lebih dari 8.000 anggota aktif.',
    image_url: null,
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis'],
    category: 'Fintech',
    sort_order: 5,
  },
  {
    id: '66666666-aaaa-4bbb-8ccc-dddddddddddd',
    title: 'Platform Belajar Online BrightClass',
    description:
      'Platform e-learning interaktif untuk lembaga bimbingan belajar dengan fitur kelas live streaming, bank soal adaptif, dan analitik progres belajar siswa. Mendukung hingga 5.000 pengguna serentak dengan latensi rendah. Berhasil membantu lembaga mitra memperluas jangkauan siswa ke seluruh Indonesia tanpa tambahan biaya operasional signifikan.',
    image_url: null,
    tags: ['Next.js', 'WebRTC', 'AWS', 'Supabase', 'Tailwind CSS'],
    category: 'EdTech',
    sort_order: 6,
  },
]

export const mockPortfolioEn: LocalizedPortfolioItem[] = [
  {
    id: '11111111-aaaa-4bbb-8ccc-dddddddddddd',
    title: 'Nusantara Retail E-Commerce Platform',
    description:
      'A full end-to-end online shopping platform for a national retail chain with over 500 product SKUs. Features include real-time inventory management, local payment gateway integrations, and a sales analytics dashboard. Achieved a 340% increase in online conversions within the first three months of launch.',
    image_url: null,
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Supabase', 'Midtrans'],
    category: 'E-Commerce',
    sort_order: 1,
  },
  {
    id: '22222222-aaaa-4bbb-8ccc-dddddddddddd',
    title: 'Medika Prima Hospital Management System',
    description:
      'An integrated hospital information system covering electronic medical records, doctor scheduling, pharmacy management, and patient billing. Used by over 200 medical staff and processing thousands of daily transactions. The system reduced average administrative time by 60% compared to the previous manual workflow.',
    image_url: null,
    tags: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    category: 'Healthcare',
    sort_order: 2,
  },
  {
    id: '33333333-aaaa-4bbb-8ccc-dddddddddddd',
    title: 'Padang Jaya Restaurant Mobile App',
    description:
      'A mobile food ordering app for a Padang restaurant chain with 12 branches across Greater Jakarta. Key features include table reservations, daily menu pre-orders, loyalty points, and real-time order status notifications. The app achieved a 4.8-star rating on Google Play Store within three months of launch.',
    image_url: null,
    tags: ['React Native', 'Expo', 'Firebase', 'Node.js'],
    category: 'Mobile App',
    sort_order: 3,
  },
  {
    id: '44444444-aaaa-4bbb-8ccc-dddddddddddd',
    title: 'Sukabumi Regency Public Services Portal',
    description:
      'A redesigned regional government web portal giving citizens easy online access to 40+ public services. Covers civil document submissions, business licensing, and a ticket-based public complaint system. The new portal increased user satisfaction from 52% to 91% based on a post-launch survey.',
    image_url: null,
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    category: 'Government',
    sort_order: 4,
  },
  {
    id: '55555555-aaaa-4bbb-8ccc-dddddddddddd',
    title: 'Koperasi Digital Sejahtera Fintech Dashboard',
    description:
      'A digital financial management platform for a savings and loan cooperative, featuring online loan applications, installment simulations, member portfolio monitoring, and automated financial reports. Built to banking-grade security standards and compliant with OJK regulations. Currently serving over 8,000 active members.',
    image_url: null,
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis'],
    category: 'Fintech',
    sort_order: 5,
  },
  {
    id: '66666666-aaaa-4bbb-8ccc-dddddddddddd',
    title: 'BrightClass Online Learning Platform',
    description:
      'An interactive e-learning platform for a tutoring institution featuring live streaming classes, an adaptive question bank, and student progress analytics. Supports up to 5,000 concurrent users with low latency. Helped partner institutions expand their student reach across Indonesia without significant additional operating costs.',
    image_url: null,
    tags: ['Next.js', 'WebRTC', 'AWS', 'Supabase', 'Tailwind CSS'],
    category: 'EdTech',
    sort_order: 6,
  },
]

export function getMockPortfolio(
  locale: 'id' | 'en'
): LocalizedPortfolioItem[] {
  return locale === 'id' ? mockPortfolioId : mockPortfolioEn
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export const mockTestimonialsId: LocalizedTestimonial[] = [
  {
    id: 'ttt11111-aaaa-4bbb-8ccc-dddddddddddd',
    quote:
      'Bratamedia benar-benar memahami kebutuhan bisnis kami, bukan hanya kebutuhan teknisnya. Mereka tidak sekadar membangun apa yang kami minta — mereka mengusulkan solusi yang lebih baik dari yang kami bayangkan. Platform e-commerce kami kini berjalan lancar dan tim kami pun mudah mengelolanya sendiri.',
    client_name: 'Budi Santoso',
    client_role: 'CEO',
    client_company: 'Nusantara Retail Group',
    avatar_url: null,
    sort_order: 1,
  },
  {
    id: 'ttt22222-aaaa-4bbb-8ccc-dddddddddddd',
    quote:
      'Kami sangat terkesan dengan kecepatan dan kualitas kerja tim Bratamedia. Sistem manajemen rumah sakit kami harus selesai dalam waktu ketat demi kebutuhan akreditasi, dan mereka berhasil memenuhi tenggat tanpa mengorbankan kualitas sedikit pun. Komunikasinya juga sangat transparan dari awal hingga akhir proyek.',
    client_name: 'dr. Ratna Kusuma',
    client_role: 'Direktur Operasional',
    client_company: 'RS Medika Prima',
    avatar_url: null,
    sort_order: 2,
  },
  {
    id: 'ttt33333-aaaa-4bbb-8ccc-dddddddddddd',
    quote:
      'Aplikasi mobile yang mereka bangun melampaui ekspektasi kami. Rating 4.8 di Play Store dalam tiga bulan pertama berbicara sendiri. Yang paling kami hargai adalah tim Bratamedia mau mendengar masukan pelanggan kami dan menerjemahkannya menjadi fitur yang benar-benar berguna — bukan fitur demi fitur.',
    client_name: 'Hendra Wijaya',
    client_role: 'Direktur Pemasaran',
    client_company: 'Padang Jaya Culinary Group',
    avatar_url: null,
    sort_order: 3,
  },
  {
    id: 'ttt44444-aaaa-4bbb-8ccc-dddddddddddd',
    quote:
      'Sebagai product manager, saya sangat menghargai cara Bratamedia bekerja secara terstruktur. Sprint planning jelas, progress transparan, dan tidak ada kejutan di akhir. Mereka juga proaktif memberi tahu kami jika ada risiko teknis lebih awal. Mitra yang bisa diandalkan untuk proyek jangka panjang.',
    client_name: 'Sari Dewi Pratiwi',
    client_role: 'Product Manager',
    client_company: 'BrightClass Edu',
    avatar_url: null,
    sort_order: 4,
  },
]

export const mockTestimonialsEn: LocalizedTestimonial[] = [
  {
    id: 'ttt11111-aaaa-4bbb-8ccc-dddddddddddd',
    quote:
      'Bratamedia truly understood our business needs, not just the technical requirements. They did not simply build what we asked for — they proposed solutions better than anything we had envisioned. Our e-commerce platform now runs smoothly and our team can manage it independently without any hassle.',
    client_name: 'Budi Santoso',
    client_role: 'CEO',
    client_company: 'Nusantara Retail Group',
    avatar_url: null,
    sort_order: 1,
  },
  {
    id: 'ttt22222-aaaa-4bbb-8ccc-dddddddddddd',
    quote:
      'We were incredibly impressed by the speed and quality of the Bratamedia team. Our hospital management system had a tight deadline for accreditation purposes, and they delivered on time without compromising quality at all. Their communication was fully transparent from start to finish.',
    client_name: 'dr. Ratna Kusuma',
    client_role: 'Operations Director',
    client_company: 'Medika Prima Hospital',
    avatar_url: null,
    sort_order: 2,
  },
  {
    id: 'ttt33333-aaaa-4bbb-8ccc-dddddddddddd',
    quote:
      'The mobile app they built exceeded our expectations. A 4.8-star rating on the Play Store within the first three months says it all. What we valued most was the team\'s ability to listen to our customers\' feedback and translate it into features that are genuinely useful — not just feature for feature\'s sake.',
    client_name: 'Hendra Wijaya',
    client_role: 'Marketing Director',
    client_company: 'Padang Jaya Culinary Group',
    avatar_url: null,
    sort_order: 3,
  },
  {
    id: 'ttt44444-aaaa-4bbb-8ccc-dddddddddddd',
    quote:
      'As a product manager, I deeply appreciate the structured way Bratamedia operates. Sprint planning is clear, progress is transparent, and there are no surprises at the end. They also proactively flag technical risks early. A reliable long-term partner for any serious product team.',
    client_name: 'Sari Dewi Pratiwi',
    client_role: 'Product Manager',
    client_company: 'BrightClass Edu',
    avatar_url: null,
    sort_order: 4,
  },
]

export function getMockTestimonials(
  locale: 'id' | 'en'
): LocalizedTestimonial[] {
  return locale === 'id' ? mockTestimonialsId : mockTestimonialsEn
}
