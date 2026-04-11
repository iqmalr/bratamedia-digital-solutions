-- =============================================================================
-- Seed: Bratamedia Digital Solutions — initial data
-- Tables: services, portfolio, testimonials
-- Run after migrations. Safe to re-run if tables are empty (no upsert logic).
-- =============================================================================

-- ---------------------------------------------------------------------------
-- services
-- Descriptions match src/i18n/dictionaries/id.ts and en.ts exactly.
-- ---------------------------------------------------------------------------
insert into public.services (id, name_id, name_en, description_id, description_en, icon, sort_order, is_active)
values
  (
    gen_random_uuid(),
    'Pengembangan Web',
    'Web Development',
    'Membangun website modern, cepat, dan responsif menggunakan teknologi terkini.',
    'Building modern, fast, and responsive websites using the latest technologies.',
    'globe',
    1,
    true
  ),
  (
    gen_random_uuid(),
    'Aplikasi Mobile',
    'Mobile Applications',
    'Mengembangkan aplikasi iOS dan Android yang intuitif dan berperforma tinggi.',
    'Developing intuitive, high-performance iOS and Android applications.',
    'smartphone',
    2,
    true
  ),
  (
    gen_random_uuid(),
    'Desain UI/UX',
    'UI/UX Design',
    'Merancang antarmuka yang menarik dan pengalaman pengguna yang menyenangkan.',
    'Crafting visually appealing interfaces and delightful user experiences.',
    'palette',
    3,
    true
  ),
  (
    gen_random_uuid(),
    'Pemasaran Digital',
    'Digital Marketing',
    'Strategi pemasaran digital yang efektif untuk meningkatkan visibilitas dan konversi bisnis Anda.',
    'Effective digital marketing strategies to increase your business visibility and conversions.',
    'megaphone',
    4,
    true
  ),
  (
    gen_random_uuid(),
    'Infrastruktur Cloud',
    'Cloud Infrastructure',
    'Solusi cloud yang skalabel dan aman untuk mendukung pertumbuhan bisnis Anda.',
    'Scalable and secure cloud solutions to support your business growth.',
    'cloud',
    5,
    true
  ),
  (
    gen_random_uuid(),
    'Konsultasi IT',
    'IT Consulting',
    'Konsultasi teknologi yang komprehensif untuk transformasi digital bisnis Anda.',
    'Comprehensive technology consulting for your business digital transformation.',
    'headphones',
    6,
    true
  );

-- ---------------------------------------------------------------------------
-- portfolio
-- Realistic projects for an Indonesian software house.
-- image_url intentionally null — assets will be uploaded via Supabase Storage.
-- ---------------------------------------------------------------------------
insert into public.portfolio (id, title_id, title_en, description_id, description_en, image_url, tags, category, sort_order, is_active)
values
  (
    gen_random_uuid(),
    'Platform E-Commerce',
    'E-Commerce Platform',
    'Platform belanja online lengkap untuk jaringan ritel nasional dengan lebih dari 500 merchant aktif. Dilengkapi fitur manajemen produk, pembayaran terintegrasi, dan dasbor analitik real-time. Performa tinggi dengan load time di bawah dua detik bahkan saat traffic puncak.',
    'A full-featured online shopping platform built for a national retail network with over 500 active merchants. Includes product management, integrated payments, and a real-time analytics dashboard. Engineered for high performance with sub-two-second load times even at peak traffic.',
    null,
    ARRAY['Next.js', 'React', 'Supabase'],
    'E-Commerce',
    1,
    true
  ),
  (
    gen_random_uuid(),
    'Sistem Manajemen Rumah Sakit',
    'Hospital Management System',
    'Sistem informasi rumah sakit terpadu yang mencakup pendaftaran pasien, penjadwalan dokter, rekam medis elektronik, dan manajemen stok farmasi. Dibangun untuk jaringan tiga rumah sakit swasta di Jawa Tengah. Mempersingkat waktu pendaftaran pasien dari 15 menit menjadi kurang dari 3 menit.',
    'An integrated hospital information system covering patient registration, doctor scheduling, electronic medical records, and pharmacy stock management. Built for a network of three private hospitals in Central Java. Reduced patient registration time from 15 minutes to under 3 minutes.',
    null,
    ARRAY['React', 'Node.js', 'PostgreSQL'],
    'Healthcare',
    2,
    true
  ),
  (
    gen_random_uuid(),
    'Aplikasi Mobile Restoran',
    'Restaurant Mobile App',
    'Aplikasi pemesanan makanan untuk jaringan restoran lokal dengan fitur menu digital, pemesanan meja, dan program loyalitas pelanggan. Tersedia di iOS dan Android dengan pengalaman pengguna yang konsisten di kedua platform. Meningkatkan repeat order sebesar 40% dalam tiga bulan pertama peluncuran.',
    'A food ordering app for a local restaurant chain featuring a digital menu, table reservations, and a customer loyalty program. Available on iOS and Android with a consistent user experience across both platforms. Increased repeat orders by 40% within the first three months of launch.',
    null,
    ARRAY['React Native', 'Firebase'],
    'Mobile App',
    3,
    true
  ),
  (
    gen_random_uuid(),
    'Portal Layanan Pemerintah',
    'Government Service Portal',
    'Portal layanan publik untuk pemerintah daerah yang menyederhanakan proses pengajuan izin usaha, administrasi kependudukan, dan pengaduan masyarakat. Dibangun sesuai standar aksesibilitas WCAG 2.1 dan regulasi keamanan data pemerintah Indonesia. Melayani lebih dari 50.000 warga per bulan.',
    'A public service portal for a regional government that streamlines business permit applications, population administration, and citizen complaints. Built to WCAG 2.1 accessibility standards and Indonesian government data security regulations. Serves over 50,000 citizens per month.',
    null,
    ARRAY['Next.js', 'TypeScript', 'Tailwind'],
    'Web App',
    4,
    true
  ),
  (
    gen_random_uuid(),
    'Dasbor Analitik Fintech',
    'Fintech Analytics Dashboard',
    'Dasbor analitik data keuangan real-time untuk perusahaan fintech dengan visualisasi portofolio investasi, pemantauan risiko, dan laporan regulatori otomatis. Mengolah lebih dari satu juta transaksi per hari dengan latensi tampilan di bawah 500 milidetik. Membantu tim analis mengurangi waktu pelaporan harian hingga 70%.',
    'A real-time financial analytics dashboard for a fintech company featuring investment portfolio visualizations, risk monitoring, and automated regulatory reporting. Processes over one million transactions per day with display latency under 500 milliseconds. Helped the analyst team cut daily reporting time by 70%.',
    null,
    ARRAY['React', 'D3.js', 'Node.js'],
    'Fintech',
    5,
    true
  ),
  (
    gen_random_uuid(),
    'Platform Pendidikan Online',
    'Online Education Platform',
    'Platform e-learning untuk lembaga kursus bahasa Inggris dengan fitur kelas video interaktif, kuis adaptif, dan sistem sertifikasi digital. Mendukung hingga 10.000 pelajar aktif secara bersamaan dengan infrastruktur yang sepenuhnya terkelola di cloud. Meraih rating kepuasan pengguna 4,8 dari 5 berdasarkan lebih dari 2.000 ulasan.',
    'An e-learning platform for an English language course institution featuring interactive video classes, adaptive quizzes, and a digital certification system. Supports up to 10,000 concurrent active learners on a fully cloud-managed infrastructure. Achieved a 4.8 out of 5 user satisfaction rating from over 2,000 reviews.',
    null,
    ARRAY['Next.js', 'Supabase', 'Tailwind'],
    'Education',
    6,
    true
  );

-- ---------------------------------------------------------------------------
-- testimonials
-- Bilingual quotes — Indonesian natural, English professional.
-- ---------------------------------------------------------------------------
insert into public.testimonials (id, quote_id, quote_en, client_name, client_role, client_company, avatar_url, sort_order, is_active)
values
  (
    gen_random_uuid(),
    'Bratamedia benar-benar melampaui ekspektasi kami. Kualitas kode yang mereka hasilkan sangat bersih dan terdokumentasi dengan baik sehingga tim internal kami bisa langsung meneruskannya. Investasi terbaik yang pernah kami lakukan untuk infrastruktur digital perusahaan.',
    'Bratamedia truly exceeded our expectations. The code quality they delivered is exceptionally clean and well-documented — our internal team could pick it right up. It is the best investment we have ever made in our company''s digital infrastructure.',
    'Budi Santoso',
    'CEO',
    'PT Maju Bersama',
    null,
    1,
    true
  ),
  (
    gen_random_uuid(),
    'Kecepatan pengerjaan tim Bratamedia luar biasa. Mereka berhasil meluncurkan platform kami tepat waktu tanpa mengorbankan kualitas sedikit pun. Responsif, profesional, dan selalu proaktif memberikan solusi sebelum masalah sempat muncul.',
    'The speed at which the Bratamedia team works is remarkable. They launched our platform on schedule without compromising quality in the slightest. Responsive, professional, and always proactive with solutions before problems even arise.',
    'Siti Rahayu',
    'CTO',
    'TokoBesar.id',
    null,
    2,
    true
  ),
  (
    gen_random_uuid(),
    'Komunikasi dengan Bratamedia sangat lancar dari awal hingga akhir proyek. Mereka sabar menjelaskan setiap tahapan teknis kepada tim kami yang tidak berlatar belakang IT dan selalu memastikan kami memahami progres yang berjalan. Hasilnya pun memuaskan dan sesuai kebutuhan rumah sakit kami.',
    'Communication with Bratamedia was seamless from the very start to the end of the project. They patiently explained every technical stage to our non-IT team and always ensured we understood the progress being made. The result perfectly met our hospital''s operational needs.',
    'Ahmad Wijaya',
    'Marketing Director',
    'Sehat Selalu Hospital',
    null,
    3,
    true
  ),
  (
    gen_random_uuid(),
    'Hasil kerja Bratamedia berbicara sendiri. Setelah platform baru diluncurkan, jumlah pelajar aktif kami meningkat dua kali lipat dalam waktu tiga bulan. Mereka tidak hanya membangun produk, tapi benar-benar memahami tujuan bisnis kami dan menterjemahkannya ke dalam fitur yang tepat sasaran.',
    'The results Bratamedia delivered speak for themselves. After the new platform launched, our active learner count doubled within three months. They did not just build a product — they genuinely understood our business goals and translated them into features that hit the mark.',
    'Dewi Kartika',
    'Product Manager',
    'EduNusantara',
    null,
    4,
    true
  );
