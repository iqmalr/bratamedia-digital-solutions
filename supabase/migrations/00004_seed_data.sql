-- =============================================================================
-- Migration: 00004_seed_data
-- Description: Seed initial data for services, portfolio, and testimonials.
--              Matches the mock data used during Phase 1 development.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Services (6 items)
-- ---------------------------------------------------------------------------
INSERT INTO public.services (name_id, name_en, description_id, description_en, icon, sort_order, is_active)
VALUES
  (
    'Pengembangan Web',
    'Web Development',
    'Membangun website modern, cepat, dan responsif menggunakan teknologi terkini. Dari landing page hingga platform web kompleks, kami pastikan setiap produk tampil sempurna di semua perangkat.',
    'Building modern, fast, and responsive websites using the latest technologies. From landing pages to complex web platforms, we ensure every product looks and performs flawlessly across all devices.',
    'globe',
    1,
    true
  ),
  (
    'Aplikasi Mobile',
    'Mobile Applications',
    'Mengembangkan aplikasi iOS dan Android yang intuitif dan berperforma tinggi. Kami merancang pengalaman mobile yang memudahkan pengguna dan memperkuat loyalitas pelanggan bisnis Anda.',
    'Developing intuitive, high-performance iOS and Android applications. We craft mobile experiences that delight users and strengthen customer loyalty for your business.',
    'smartphone',
    2,
    true
  ),
  (
    'Desain UI/UX',
    'UI/UX Design',
    'Merancang antarmuka yang menarik dan pengalaman pengguna yang menyenangkan. Desain kami bukan sekadar estetika — setiap elemen dirancang untuk memandu pengguna mencapai tujuan mereka dengan mudah.',
    'Crafting visually appealing interfaces and delightful user experiences. Our designs go beyond aesthetics — every element is purposefully built to guide users toward their goals with ease.',
    'palette',
    3,
    true
  ),
  (
    'Pemasaran Digital',
    'Digital Marketing',
    'Strategi pemasaran digital yang efektif untuk meningkatkan visibilitas dan konversi bisnis Anda. Dari SEO hingga iklan berbayar, kami bantu brand Anda menjangkau audiens yang tepat.',
    'Effective digital marketing strategies to increase your business visibility and conversions. From SEO to paid advertising, we help your brand reach the right audience at the right time.',
    'megaphone',
    4,
    true
  ),
  (
    'Infrastruktur Cloud',
    'Cloud Infrastructure',
    'Solusi cloud yang skalabel dan aman untuk mendukung pertumbuhan bisnis Anda. Kami mengelola infrastruktur Anda agar tetap andal, efisien, dan siap menghadapi lonjakan trafik kapan pun.',
    'Scalable and secure cloud solutions to support your business growth. We manage your infrastructure to keep it reliable, cost-efficient, and ready to handle traffic spikes at any time.',
    'cloud',
    5,
    true
  ),
  (
    'Konsultasi IT',
    'IT Consulting',
    'Konsultasi teknologi yang komprehensif untuk transformasi digital bisnis Anda. Kami membantu Anda memilih solusi yang tepat, menyusun roadmap teknologi, dan memastikan investasi IT memberikan hasil nyata.',
    'Comprehensive technology consulting for your business digital transformation. We help you choose the right solutions, build a technology roadmap, and ensure your IT investments deliver measurable results.',
    'headphones',
    6,
    true
  );

-- ---------------------------------------------------------------------------
-- Portfolio (6 items)
-- ---------------------------------------------------------------------------
INSERT INTO public.portfolio (title_id, title_en, description_id, description_en, image_url, tags, category, sort_order, is_active)
VALUES
  (
    'Platform E-Commerce Nusantara Retail',
    'Nusantara Retail E-Commerce Platform',
    'Platform belanja online end-to-end untuk jaringan ritel nasional dengan lebih dari 500 SKU produk. Dilengkapi fitur manajemen inventaris real-time, integrasi payment gateway lokal, dan dashboard analitik penjualan. Berhasil meningkatkan konversi online sebesar 340% dalam tiga bulan pertama peluncuran.',
    'A full end-to-end online shopping platform for a national retail chain with over 500 product SKUs. Features include real-time inventory management, local payment gateway integrations, and a sales analytics dashboard. Achieved a 340% increase in online conversions within the first three months of launch.',
    null,
    ARRAY['Next.js', 'React', 'Tailwind CSS', 'Supabase', 'Midtrans'],
    'E-Commerce',
    1,
    true
  ),
  (
    'Sistem Manajemen Rumah Sakit Medika Prima',
    'Medika Prima Hospital Management System',
    'Sistem informasi rumah sakit terintegrasi yang mencakup modul rekam medis elektronik, penjadwalan dokter, manajemen apotek, dan billing pasien. Digunakan oleh lebih dari 200 tenaga medis dan menangani ribuan transaksi harian. Sistem ini memangkas waktu administrasi rata-rata 60% dibandingkan proses manual sebelumnya.',
    'An integrated hospital information system covering electronic medical records, doctor scheduling, pharmacy management, and patient billing. Used by over 200 medical staff and processing thousands of daily transactions. The system reduced average administrative time by 60% compared to the previous manual workflow.',
    null,
    ARRAY['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    'Healthcare',
    2,
    true
  ),
  (
    'Aplikasi Mobile Warung Makan Padang Jaya',
    'Padang Jaya Restaurant Mobile App',
    'Aplikasi pemesanan makanan mobile untuk jaringan restoran Padang dengan 12 cabang di Jabodetabek. Fitur unggulan meliputi pemesanan meja, pre-order menu harian, loyalty points, dan notifikasi real-time status pesanan. Aplikasi ini mendapatkan rating 4.8 di Google Play Store dalam tiga bulan pertama.',
    'A mobile food ordering app for a Padang restaurant chain with 12 branches across Greater Jakarta. Key features include table reservations, daily menu pre-orders, loyalty points, and real-time order status notifications. The app achieved a 4.8-star rating on Google Play Store within three months of launch.',
    null,
    ARRAY['React Native', 'Expo', 'Firebase', 'Node.js'],
    'Mobile App',
    3,
    true
  ),
  (
    'Portal Layanan Publik Kabupaten Sukabumi',
    'Sukabumi Regency Public Services Portal',
    'Redesain portal web pemerintah daerah yang mempermudah akses masyarakat ke 40+ layanan publik secara online. Meliputi pengajuan dokumen kependudukan, perizinan usaha, dan pengaduan masyarakat berbasis tiket. Portal baru ini berhasil meningkatkan kepuasan pengguna dari 52% menjadi 91% berdasarkan survei pasca-peluncuran.',
    'A redesigned regional government web portal giving citizens easy online access to 40+ public services. Covers civil document submissions, business licensing, and a ticket-based public complaint system. The new portal increased user satisfaction from 52% to 91% based on a post-launch survey.',
    null,
    ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    'Government',
    4,
    true
  ),
  (
    'Dashboard Fintech Koperasi Digital Sejahtera',
    'Koperasi Digital Sejahtera Fintech Dashboard',
    'Platform manajemen keuangan digital untuk koperasi simpan pinjam dengan fitur pengajuan pinjaman online, simulasi cicilan, monitoring portofolio anggota, dan laporan keuangan otomatis. Dibangun dengan standar keamanan perbankan dan telah memenuhi regulasi OJK. Saat ini melayani lebih dari 8.000 anggota aktif.',
    'A digital financial management platform for a savings and loan cooperative, featuring online loan applications, installment simulations, member portfolio monitoring, and automated financial reports. Built to banking-grade security standards and compliant with OJK regulations. Currently serving over 8,000 active members.',
    null,
    ARRAY['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis'],
    'Fintech',
    5,
    true
  ),
  (
    'Platform Belajar Online BrightClass',
    'BrightClass Online Learning Platform',
    'Platform e-learning interaktif untuk lembaga bimbingan belajar dengan fitur kelas live streaming, bank soal adaptif, dan analitik progres belajar siswa. Mendukung hingga 5.000 pengguna serentak dengan latensi rendah. Berhasil membantu lembaga mitra memperluas jangkauan siswa ke seluruh Indonesia tanpa tambahan biaya operasional signifikan.',
    'An interactive e-learning platform for a tutoring institution featuring live streaming classes, an adaptive question bank, and student progress analytics. Supports up to 5,000 concurrent users with low latency. Helped partner institutions expand their student reach across Indonesia without significant additional operating costs.',
    null,
    ARRAY['Next.js', 'WebRTC', 'AWS', 'Supabase', 'Tailwind CSS'],
    'EdTech',
    6,
    true
  );

-- ---------------------------------------------------------------------------
-- Testimonials (4 items)
-- ---------------------------------------------------------------------------
INSERT INTO public.testimonials (quote_id, quote_en, client_name, client_role, client_company, avatar_url, sort_order, is_active)
VALUES
  (
    'Bratamedia benar-benar memahami kebutuhan bisnis kami, bukan hanya kebutuhan teknisnya. Mereka tidak sekadar membangun apa yang kami minta — mereka mengusulkan solusi yang lebih baik dari yang kami bayangkan. Platform e-commerce kami kini berjalan lancar dan tim kami pun mudah mengelolanya sendiri.',
    'Bratamedia truly understood our business needs, not just the technical requirements. They did not simply build what we asked for — they proposed solutions better than anything we had envisioned. Our e-commerce platform now runs smoothly and our team can manage it independently without any hassle.',
    'Budi Santoso',
    'CEO',
    'Nusantara Retail Group',
    null,
    1,
    true
  ),
  (
    'Kami sangat terkesan dengan kecepatan dan kualitas kerja tim Bratamedia. Sistem manajemen rumah sakit kami harus selesai dalam waktu ketat demi kebutuhan akreditasi, dan mereka berhasil memenuhi tenggat tanpa mengorbankan kualitas sedikit pun. Komunikasinya juga sangat transparan dari awal hingga akhir proyek.',
    'We were incredibly impressed by the speed and quality of the Bratamedia team. Our hospital management system had a tight deadline for accreditation purposes, and they delivered on time without compromising quality at all. Their communication was fully transparent from start to finish.',
    'dr. Ratna Kusuma',
    'Operations Director',
    'RS Medika Prima',
    null,
    2,
    true
  ),
  (
    'Aplikasi mobile yang mereka bangun melampaui ekspektasi kami. Rating 4.8 di Play Store dalam tiga bulan pertama berbicara sendiri. Yang paling kami hargai adalah tim Bratamedia mau mendengar masukan pelanggan kami dan menerjemahkannya menjadi fitur yang benar-benar berguna — bukan fitur demi fitur.',
    'The mobile app they built exceeded our expectations. A 4.8-star rating on the Play Store within the first three months says it all. What we valued most was the team''s ability to listen to our customers'' feedback and translate it into features that are genuinely useful — not just feature for feature''s sake.',
    'Hendra Wijaya',
    'Marketing Director',
    'Padang Jaya Culinary Group',
    null,
    3,
    true
  ),
  (
    'Sebagai product manager, saya sangat menghargai cara Bratamedia bekerja secara terstruktur. Sprint planning jelas, progress transparan, dan tidak ada kejutan di akhir. Mereka juga proaktif memberi tahu kami jika ada risiko teknis lebih awal. Mitra yang bisa diandalkan untuk proyek jangka panjang.',
    'As a product manager, I deeply appreciate the structured way Bratamedia operates. Sprint planning is clear, progress is transparent, and there are no surprises at the end. They also proactively flag technical risks early. A reliable long-term partner for any serious product team.',
    'Sari Dewi Pratiwi',
    'Product Manager',
    'BrightClass Edu',
    null,
    4,
    true
  );
