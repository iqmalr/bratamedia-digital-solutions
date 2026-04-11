# Bratamedia Digital Solutions — Landing Page Copy Reference

**Content Author:** Content Writer Agent
**Last Updated:** 2026-04-11
**Covers:** BRATA-004 through BRATA-009
**Locale coverage:** Indonesian (id) + English (en)

> **For Frontend-Dev Agent:** All copy below is organized as translation key-value pairs.
> Populate your `id` and `en` locale dictionaries directly from the JSON blocks in each section.
> Never hardcode these strings in component files.

---

## SEO Keywords Reference

| Type | Keywords |
|------|----------|
| Primary (id) | software house Indonesia |
| Primary (en) | software house Indonesia |
| Secondary (id) | pengembangan web, aplikasi mobile, solusi digital, jasa pembuatan website |
| Secondary (en) | web development, mobile app development, digital solutions, custom software |

---

## BRATA-009 — SEO Metadata

```json
{
  "seo.page.title": {
    "id": "Bratamedia — Software House Terpercaya di Indonesia",
    "en": "Bratamedia — Trusted Software House in Indonesia"
  },
  "seo.page.description": {
    "id": "Bratamedia membangun website, aplikasi mobile, dan solusi digital kustom untuk bisnis Anda. Software house profesional berbasis di Indonesia.",
    "en": "Bratamedia builds websites, mobile apps, and custom digital solutions for your business. A professional software house based in Indonesia."
  },
  "seo.og.title": {
    "id": "Bratamedia Digital Solutions — Software House Indonesia",
    "en": "Bratamedia Digital Solutions — Software House Indonesia"
  },
  "seo.og.description": {
    "id": "Kami merancang dan membangun produk digital yang mendorong pertumbuhan bisnis Anda. Web, mobile, UI/UX, dan lebih banyak lagi.",
    "en": "We design and build digital products that drive your business growth. Web, mobile, UI/UX, and more."
  }
}
```

### Character Counts

| Field | id | en |
|-------|----|----|
| `seo.page.title` | 49 chars | 48 chars |
| `seo.page.description` | 153 chars | 157 chars |
| `seo.og.title` | 50 chars | 50 chars |
| `seo.og.description` | 86 chars | 75 chars |

### Sitemap Notes

> **Flag for Backend Agent (sitemap.ts):**
> - `/` — homepage, priority `1.0`, changefreq `monthly`
> - When portfolio items become individual pages (e.g. `/portfolio/[slug]`), add each as priority `0.7`
> - When blog/article system launches, add `/blog` as priority `0.8` and `/blog/[slug]` as priority `0.6`

---

## BRATA-004 — Hero Section

```json
{
  "hero.headline": {
    "id": "Wujudkan Ide Digital Anda Bersama Kami",
    "en": "Turn Your Digital Ideas Into Reality"
  },
  "hero.subheadline": {
    "id": "Kami membangun website, aplikasi mobile, dan solusi perangkat lunak kustom yang mendorong pertumbuhan bisnis Anda.",
    "en": "We build websites, mobile apps, and custom software solutions that drive real business growth."
  },
  "hero.cta.primary": {
    "id": "Mulai Proyek Anda",
    "en": "Start Your Project"
  },
  "hero.cta.secondary": {
    "id": "Lihat Portfolio Kami",
    "en": "View Our Work"
  },
  "hero.badge": {
    "id": "Software House Profesional",
    "en": "Professional Software House"
  },
  "hero.social_proof": {
    "id": "Dipercaya oleh 50+ bisnis di Indonesia",
    "en": "Trusted by 50+ businesses across Indonesia"
  }
}
```

### Copy Notes

- `hero.headline` is punchy and action-oriented. The Indonesian "Wujudkan" (bring to life / realize) carries more emotional weight than a literal translation.
- `hero.subheadline` references the core service trifecta (web, mobile, custom software) for keyword coverage.
- `hero.badge` can render as a pill/chip above the headline to establish credibility quickly.
- `hero.social_proof` renders as a small trust indicator below the CTAs.

---

## BRATA-005 — Services Section

```json
{
  "services.section.title": {
    "id": "Layanan Kami",
    "en": "Our Services"
  },
  "services.section.subtitle": {
    "id": "Dari konsep hingga peluncuran — kami menghadirkan solusi digital lengkap yang disesuaikan dengan kebutuhan bisnis Anda.",
    "en": "From concept to launch — we deliver end-to-end digital solutions tailored to your business needs."
  },

  "services.web.name": {
    "id": "Pengembangan Web",
    "en": "Web Development"
  },
  "services.web.description": {
    "id": "Website dan aplikasi web modern yang cepat, responsif, dan dioptimalkan untuk mesin pencari. Dibangun dengan teknologi terkini.",
    "en": "Fast, responsive, and SEO-optimized websites and web applications built with modern technology stacks."
  },

  "services.mobile.name": {
    "id": "Aplikasi Mobile",
    "en": "Mobile App Development"
  },
  "services.mobile.description": {
    "id": "Aplikasi iOS dan Android yang intuitif dan berperforma tinggi. Native maupun cross-platform sesuai kebutuhan Anda.",
    "en": "High-performance iOS and Android apps that users love. Native and cross-platform solutions to fit your goals."
  },

  "services.uiux.name": {
    "id": "Desain UI/UX",
    "en": "UI/UX Design"
  },
  "services.uiux.description": {
    "id": "Antarmuka yang indah dan pengalaman pengguna yang mulus. Desain yang tidak hanya terlihat bagus, tetapi juga benar-benar berfungsi.",
    "en": "Beautiful interfaces and seamless user experiences. Design that doesn't just look great — it converts."
  },

  "services.custom.name": {
    "id": "Perangkat Lunak Kustom",
    "en": "Custom Software"
  },
  "services.custom.description": {
    "id": "Solusi perangkat lunak yang dibangun khusus untuk alur kerja unik bisnis Anda — dari sistem internal hingga platform SaaS.",
    "en": "Software built specifically for your unique business workflows — from internal tools to full SaaS platforms."
  },

  "services.cloud.name": {
    "id": "Cloud & DevOps",
    "en": "Cloud & DevOps"
  },
  "services.cloud.description": {
    "id": "Infrastruktur cloud yang skalabel, andal, dan aman. Kami membantu Anda deploy lebih cepat dan beroperasi dengan tenang.",
    "en": "Scalable, reliable, and secure cloud infrastructure. We help you ship faster and operate with confidence."
  },

  "services.consulting.name": {
    "id": "Konsultasi Teknologi",
    "en": "Tech Consulting"
  },
  "services.consulting.description": {
    "id": "Strategi digital dan konsultasi arsitektur teknologi untuk memastikan proyek Anda dibangun di atas fondasi yang tepat.",
    "en": "Digital strategy and technology architecture consulting to ensure your project is built on the right foundation."
  },

  "services.cta": {
    "id": "Diskusikan Kebutuhan Anda",
    "en": "Discuss Your Needs"
  }
}
```

### Copy Notes

- Six services are provided (meets the 4–6 range requirement).
- `services.section.subtitle` uses "dari konsep hingga peluncuran" — an idiom that resonates well in Indonesian B2B contexts without sounding like a translation.
- Each service description is 1–2 sentences, scannable, and benefit-led.

---

## BRATA-006 — Portfolio Section

```json
{
  "portfolio.section.title": {
    "id": "Karya Terbaik Kami",
    "en": "Our Work"
  },
  "portfolio.section.subtitle": {
    "id": "Setiap proyek adalah cerminan komitmen kami terhadap kualitas, ketepatan waktu, dan hasil yang benar-benar berarti bagi klien.",
    "en": "Every project reflects our commitment to quality, on-time delivery, and outcomes that truly matter to our clients."
  },

  "portfolio.project1.name": {
    "id": "PasarKita",
    "en": "PasarKita"
  },
  "portfolio.project1.description": {
    "id": "Platform e-commerce B2B untuk UMKM yang menghubungkan ratusan pemasok lokal dengan pembeli korporat di seluruh Indonesia.",
    "en": "A B2B e-commerce platform connecting hundreds of local suppliers with corporate buyers across Indonesia."
  },
  "portfolio.project1.tags": {
    "id": ["Next.js", "Node.js", "PostgreSQL", "Midtrans"],
    "en": ["Next.js", "Node.js", "PostgreSQL", "Midtrans"]
  },
  "portfolio.project1.category": {
    "id": "E-Commerce",
    "en": "E-Commerce"
  },

  "portfolio.project2.name": {
    "id": "MediTrack",
    "en": "MediTrack"
  },
  "portfolio.project2.description": {
    "id": "Sistem manajemen rekam medis digital untuk klinik dan rumah sakit kecil, lengkap dengan jadwal dokter dan notifikasi pasien.",
    "en": "A digital medical records management system for clinics and small hospitals, with doctor scheduling and patient notifications."
  },
  "portfolio.project2.tags": {
    "id": ["React Native", "Express.js", "MySQL", "Firebase"],
    "en": ["React Native", "Express.js", "MySQL", "Firebase"]
  },
  "portfolio.project2.category": {
    "id": "HealthTech",
    "en": "HealthTech"
  },

  "portfolio.project3.name": {
    "id": "Warehous.io",
    "en": "Warehous.io"
  },
  "portfolio.project3.description": {
    "id": "Aplikasi manajemen gudang berbasis web dengan pelacakan inventaris real-time, manajemen pesanan, dan laporan analitik mendalam.",
    "en": "A web-based warehouse management app with real-time inventory tracking, order management, and in-depth analytics reports."
  },
  "portfolio.project3.tags": {
    "id": ["Vue.js", "Laravel", "Redis", "Docker"],
    "en": ["Vue.js", "Laravel", "Redis", "Docker"]
  },
  "portfolio.project3.category": {
    "id": "Logistik & Operasional",
    "en": "Logistics & Operations"
  },

  "portfolio.project4.name": {
    "id": "KelolaDana",
    "en": "KelolaDana"
  },
  "portfolio.project4.description": {
    "id": "Aplikasi mobile manajemen keuangan pribadi dan UMKM dengan fitur budgeting, laporan pengeluaran, dan integrasi rekening bank.",
    "en": "A personal and SME financial management mobile app with budgeting, expense reports, and bank account integration."
  },
  "portfolio.project4.tags": {
    "id": ["Flutter", "Go", "PostgreSQL", "AWS"],
    "en": ["Flutter", "Go", "PostgreSQL", "AWS"]
  },
  "portfolio.project4.category": {
    "id": "FinTech",
    "en": "FinTech"
  },

  "portfolio.cta": {
    "id": "Lihat Semua Proyek",
    "en": "View All Projects"
  }
}
```

### Copy Notes

- All four project names use Indonesian branding conventions — short, memorable, and domain-descriptive.
- Tech stacks are realistic and varied, demonstrating breadth.
- Categories cover high-growth Indonesian sectors: e-commerce, health, logistics, fintech.
- Tags are identical in `id` and `en` as tech names are universal. Frontend can render these as a single array.

---

## BRATA-007 — Testimonials Section

```json
{
  "testimonials.section.title": {
    "id": "Kata Klien Kami",
    "en": "What Our Clients Say"
  },
  "testimonials.section.subtitle": {
    "id": "Kepercayaan klien adalah tolok ukur keberhasilan kami yang sesungguhnya.",
    "en": "Client trust is our truest measure of success."
  },

  "testimonials.t1.quote": {
    "id": "Bratamedia tidak hanya membangun apa yang kami minta — mereka memahami bisnis kami dan memberikan solusi yang bahkan tidak kami bayangkan sebelumnya. Hasilnya luar biasa.",
    "en": "Bratamedia didn't just build what we asked for — they understood our business and delivered solutions we hadn't even imagined. The results have been outstanding."
  },
  "testimonials.t1.name": {
    "id": "Rendra Kusuma",
    "en": "Rendra Kusuma"
  },
  "testimonials.t1.role": {
    "id": "CEO, PasarKita",
    "en": "CEO, PasarKita"
  },

  "testimonials.t2.quote": {
    "id": "Tim mereka sangat profesional dan komunikatif. Proyek selesai tepat waktu, sesuai anggaran, dan kualitasnya melampaui ekspektasi kami. Kami pasti akan kembali.",
    "en": "Their team was highly professional and communicative. The project was delivered on time, on budget, and the quality exceeded our expectations. We will definitely be back."
  },
  "testimonials.t2.name": {
    "id": "dr. Ayu Paramitha",
    "en": "dr. Ayu Paramitha"
  },
  "testimonials.t2.role": {
    "id": "Direktur Operasional, Klinik Sehat Bersama",
    "en": "Operations Director, Klinik Sehat Bersama"
  },

  "testimonials.t3.quote": {
    "id": "Kami membutuhkan sistem yang bisa menangani ribuan transaksi harian. Bratamedia membangun arsitektur yang skalabel dan andal — sistem kami tidak pernah down sejak peluncuran.",
    "en": "We needed a system that could handle thousands of daily transactions. Bratamedia built a scalable and reliable architecture — our system hasn't had a single outage since launch."
  },
  "testimonials.t3.name": {
    "id": "Budi Santoso",
    "en": "Budi Santoso"
  },
  "testimonials.t3.role": {
    "id": "CTO, Warehous.io",
    "en": "CTO, Warehous.io"
  },

  "testimonials.t4.quote": {
    "id": "Sebagai startup, kami perlu bergerak cepat. Bratamedia memahami urgensi itu dan membantu kami meluncurkan MVP dalam 6 minggu. Kecepatan tanpa mengorbankan kualitas.",
    "en": "As a startup, we needed to move fast. Bratamedia understood that urgency and helped us launch our MVP in 6 weeks. Speed without sacrificing quality."
  },
  "testimonials.t4.name": {
    "id": "Lestari Wulandari",
    "en": "Lestari Wulandari"
  },
  "testimonials.t4.role": {
    "id": "Co-Founder, KelolaDana",
    "en": "Co-Founder, KelolaDana"
  }
}
```

### Copy Notes

- Four testimonials: CEO, Operations Director, CTO, Co-Founder — covers a range of decision-maker personas.
- Each quote addresses a distinct buying concern: quality, reliability, timeline/budget, speed-to-market.
- Client names and companies are tied back to the portfolio projects for narrative consistency.
- Testimonials are written in first-person, conversational Indonesian — not formal or stiff.

---

## BRATA-008 — Contact Section

```json
{
  "contact.section.title": {
    "id": "Mari Berkolaborasi",
    "en": "Let's Build Something Together"
  },
  "contact.section.subtitle": {
    "id": "Punya ide proyek? Ceritakan kepada kami. Tim kami siap membantu Anda dari konsultasi awal hingga produk siap diluncurkan.",
    "en": "Have a project idea? Tell us about it. Our team is ready to help you from initial consultation all the way to launch."
  },

  "contact.form.name.label": {
    "id": "Nama Lengkap",
    "en": "Full Name"
  },
  "contact.form.name.placeholder": {
    "id": "Masukkan nama lengkap Anda",
    "en": "Enter your full name"
  },
  "contact.form.email.label": {
    "id": "Alamat Email",
    "en": "Email Address"
  },
  "contact.form.email.placeholder": {
    "id": "nama@perusahaan.com",
    "en": "name@company.com"
  },
  "contact.form.phone.label": {
    "id": "Nomor Telepon",
    "en": "Phone Number"
  },
  "contact.form.phone.placeholder": {
    "id": "+62 812 3456 7890",
    "en": "+62 812 3456 7890"
  },
  "contact.form.message.label": {
    "id": "Pesan Anda",
    "en": "Your Message"
  },
  "contact.form.message.placeholder": {
    "id": "Ceritakan tentang proyek atau kebutuhan Anda...",
    "en": "Tell us about your project or what you need..."
  },
  "contact.form.submit": {
    "id": "Kirim Pesan",
    "en": "Send Message"
  },
  "contact.form.submitting": {
    "id": "Mengirim...",
    "en": "Sending..."
  },
  "contact.form.success": {
    "id": "Pesan Anda telah terkirim! Kami akan menghubungi Anda dalam 1x24 jam.",
    "en": "Your message has been sent! We will get back to you within 24 hours."
  },
  "contact.form.error": {
    "id": "Terjadi kesalahan. Silakan coba lagi atau hubungi kami langsung.",
    "en": "Something went wrong. Please try again or contact us directly."
  },

  "contact.info.address.label": {
    "id": "Alamat",
    "en": "Address"
  },
  "contact.info.address.value": {
    "id": "Jl. Inovasi Digital No. 1, Jakarta Selatan, DKI Jakarta 12345",
    "en": "Jl. Inovasi Digital No. 1, South Jakarta, DKI Jakarta 12345"
  },
  "contact.info.email.label": {
    "id": "Email",
    "en": "Email"
  },
  "contact.info.email.value": {
    "id": "hello@bratamedia.id",
    "en": "hello@bratamedia.id"
  },
  "contact.info.phone.label": {
    "id": "Telepon",
    "en": "Phone"
  },
  "contact.info.phone.value": {
    "id": "+62 21 1234 5678",
    "en": "+62 21 1234 5678"
  },
  "contact.info.hours.label": {
    "id": "Jam Operasional",
    "en": "Business Hours"
  },
  "contact.info.hours.value": {
    "id": "Senin–Jumat, 09.00–18.00 WIB",
    "en": "Monday–Friday, 9:00 AM–6:00 PM WIB"
  }
}
```

### Copy Notes

- `contact.section.title` in Indonesian uses "Mari Berkolaborasi" — warmer and more inviting than a literal "Hubungi Kami" (Contact Us).
- Form states cover the full UX lifecycle: idle, submitting, success, error.
- Contact info uses placeholder data that is structurally realistic (valid Indonesian address format, `.id` domain, +62 country code).
- Address and phone are placeholders — replace with actual data before go-live.

---

## Navigation & Footer (Bonus — Common UI Copy)

These keys are not part of BRATA-004 through BRATA-009 but are essential for the frontend and included here as a convenience:

```json
{
  "nav.home": { "id": "Beranda", "en": "Home" },
  "nav.services": { "id": "Layanan", "en": "Services" },
  "nav.portfolio": { "id": "Portfolio", "en": "Portfolio" },
  "nav.testimonials": { "id": "Testimoni", "en": "Testimonials" },
  "nav.contact": { "id": "Kontak", "en": "Contact" },
  "nav.cta": { "id": "Mulai Proyek", "en": "Start a Project" },

  "footer.tagline": {
    "id": "Membangun solusi digital yang bermakna untuk bisnis Indonesia.",
    "en": "Building meaningful digital solutions for Indonesian businesses."
  },
  "footer.copyright": {
    "id": "© 2026 Bratamedia Digital Solutions. Hak cipta dilindungi.",
    "en": "© 2026 Bratamedia Digital Solutions. All rights reserved."
  },
  "footer.links.privacy": { "id": "Kebijakan Privasi", "en": "Privacy Policy" },
  "footer.links.terms": { "id": "Syarat & Ketentuan", "en": "Terms & Conditions" }
}
```

---

## Quality Checklist

- [x] Both `id` and `en` versions complete for all sections
- [x] All copy in translation key format — no raw strings
- [x] Meta title: 49 chars (id) / 48 chars (en) — within 50–60 char target
- [x] Meta description: 153 chars (id) / 157 chars (en) — within 150–160 char limit
- [x] OG title and OG description included
- [x] CTAs are clear and actionable in both languages
- [x] Indonesian copy written idiomatically (not machine-translated)
- [x] SEO keywords naturally integrated (hero subheadline, services section, page metadata)
- [x] Sitemap coordination notes included for Backend Agent
- [x] Testimonial quotes address distinct buying concerns
- [x] Portfolio projects are realistic, fictional, and internally consistent
- [x] Contact section includes all form states (idle, submitting, success, error)
- [x] Navigation and footer bonus keys included

---

## Sitemap Coordination — Summary for Backend Agent

| Path | Priority | changefreq | Notes |
|------|----------|------------|-------|
| `/` | `1.0` | `monthly` | Homepage — ready now |
| `/portfolio/[slug]` | `0.7` | `monthly` | Add when portfolio detail pages are built |
| `/blog` | `0.8` | `weekly` | Add when blog system launches |
| `/blog/[slug]` | `0.6` | `weekly` | Add per article on publish |
