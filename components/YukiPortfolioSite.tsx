'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';

// ---- config ----
const ACCENT = '#c9bba5';
const ALTERNATE_ROWS = true;
const STATUS_TEXT_OVERRIDE = ''; // set to override the "Available for work" status line

const TEXT = {
  en: {
    hireMe: 'Hire me',
    heroTitle: 'Understanding. Clear. Solution-oriented.',
    heroSubtitle: "Full-stack developer who listens closely, thinks clearly, and builds solutions that fit the real problem. Obsessed with developer experience, clean architecture, and pixel-perfect UIs.",
    cta1: 'Get in touch',
    heroLocation: 'Bandung, Indonesia · Available for work',
    statusDefault: 'Available for work',
    aboutEyebrow: 'How I work',
    aboutTitle: 'Understand first, then build the right thing',
    aboutSubtitle: 'Currently building production-grade apps at scale.',
    projectsEyebrow: 'Projects',
    projectsTitle: 'Public work',
    projectsSubtitle: '21 repositories on GitHub. A few of the ones I built from scratch.',
    projectsSeeAll: 'See all 21 repositories ↗',
    stackEyebrow: 'Stack',
    stackTitle: 'What I build with',
    stackSubtitle: 'Laravel and the JavaScript side of the stack, kept close together so a feature ships end to end.',
    contactTitle: 'Available for work',
    contactSubtitle: "Based in Bandung, Indonesia. Send a note and I'll get back to you.",
    palettePlaceholder: 'Jump to a section…',
    liveLabel: 'Live projects',
    githubLabel: 'Open source (GitHub)',
    navLabels: { about: 'About', projects: 'Projects', stack: 'Stack', contact: 'Contact' },
    sectionLabels: { top: 'Overview', about: 'How I work', projects: 'Public work', stack: 'Stack', contact: 'Get in touch' },
    factLabels: { name: 'name', role: 'role', location: 'location', email: 'email' },
    roleValue: 'Full Stack Developer',
    terminal: [
      ['yuki@portfolio ~ % whoami', 0], ['Full Stack Developer', 1], ['', 2],
      ['yuki@portfolio ~ % currently', 0], ['Building production-grade apps at scale.', 3], ['', 2],
      ['yuki@portfolio ~ % location', 0], ['Bandung, Indonesia', 3]
    ] as [string, number][],
    pillars: [
      { tag: 'Architecture', title: 'Clean architecture',
        body: 'Structure first: clear boundaries between domain, application, and delivery, so a codebase stays readable long after the first release.',
        bullets: ['Predictable folder structure', 'Thin controllers, real services', 'Code that survives handover'] },
      { tag: 'DX', title: 'Developer experience',
        body: 'A project should be easy to start, easy to run, and easy to debug. Tooling is set up once so nobody loses a morning to environment drift.',
        bullets: ['One-command local setup', 'Formatting and linting on save', 'Meaningful errors, not guesswork'] },
      { tag: 'Interface', title: 'Pixel-perfect UIs',
        body: 'The interface is where the work gets judged. Spacing, states, and motion get the same attention as the query behind them.',
        bullets: ['Design carried through to the last state', 'Loading, empty, and error covered', 'Responsive from the first pass'] }
    ],
    githubProjects: [
      { name: 'kasir_real', blurb: 'Kasir POS v.1 — point-of-sale application.', tags: ['JavaScript'], url: 'https://github.com/yukiwicaksono03/kasir_real' },
      { name: 'kelas_online', blurb: 'Aplikasi Kelas Online — online classroom application.', tags: ['JavaScript'], url: 'https://github.com/yukiwicaksono03/kelas_online' },
      { name: 'nextjs-boilerplate', blurb: 'Starting point for new Next.js projects.', tags: ['TypeScript', 'Next.js'], url: 'https://github.com/yukiwicaksono03/nextjs-boilerplate' }
    ],
    liveProjects: [
      { name: 'Lilsala', blurb: 'E-commerce platform for a company in Bandung, built with full Shopee-style features: product management, shopping cart, payment system, order management, and a seller dashboard. Designed for a fast, comfortable shopping experience.', tags: ['E-commerce Platform'], url: 'https://lilsala.com/' },
      { name: 'Cat Vision Center', blurb: 'Online exam application for Bina Karya Cendekia. Features include question management, exam timer, anti-cheat, automatic scoring, and per-participant result reports. Supports multiple question types including multiple choice and essay.', tags: ['Exam Platform'], url: 'https://cat.binakaryacendekia.id/' },
      { name: 'Berma Yuniar', blurb: 'Company profile website for PT. Berkah Maju Yuniar. Presents company information, services, project portfolio, and contact details. Designed with a professional, responsive look to build client trust.', tags: ['Company Profile'], url: 'https://www.bermayuniar.com/' },
      { name: 'JKIE Global Indonesia', blurb: 'Company profile website for JKIE Global Indonesia. Presents vision and mission, business services, team, and company contact information. Built for high performance and a modern design that represents the brand strongly.', tags: ['Company Profile'], url: 'https://jkieglobal.com/' }
    ]
  },
  id: {
    hireMe: 'Hubungi saya',
    heroTitle: 'Memahami. Jelas. Berorientasi solusi.',
    heroSubtitle: 'Full-stack developer yang mendengarkan dengan teliti, berpikir jelas, dan membangun solusi yang sesuai dengan masalah sebenarnya. Fokus pada developer experience, clean architecture, dan UI yang pixel-perfect.',
    cta1: 'Hubungi saya',
    heroLocation: 'Bandung, Indonesia · Tersedia untuk bekerja',
    statusDefault: 'Tersedia untuk bekerja',
    aboutEyebrow: 'Cara saya bekerja',
    aboutTitle: 'Memahami dulu, baru membangun yang tepat',
    aboutSubtitle: 'Saat ini membangun aplikasi production-grade dalam skala besar.',
    projectsEyebrow: 'Proyek',
    projectsTitle: 'Karya publik',
    projectsSubtitle: '21 repositori di GitHub. Beberapa yang saya bangun dari nol.',
    projectsSeeAll: 'Lihat semua 21 repositori ↗',
    stackEyebrow: 'Stack',
    stackTitle: 'Yang saya gunakan untuk membangun',
    stackSubtitle: 'Laravel dan sisi JavaScript dari stack, disatukan agar satu fitur bisa selesai end-to-end.',
    contactTitle: 'Tersedia untuk bekerja',
    contactSubtitle: 'Berbasis di Bandung, Indonesia. Kirim pesan dan saya akan membalas.',
    palettePlaceholder: 'Lompat ke bagian…',
    liveLabel: 'Proyek yang sudah live',
    githubLabel: 'Open source (GitHub)',
    navLabels: { about: 'Tentang', projects: 'Proyek', stack: 'Stack', contact: 'Kontak' },
    sectionLabels: { top: 'Overview', about: 'Cara saya bekerja', projects: 'Karya publik', stack: 'Stack', contact: 'Hubungi' },
    factLabels: { name: 'nama', role: 'peran', location: 'lokasi', email: 'email' },
    roleValue: 'Pengembang Full Stack',
    terminal: [
      ['yuki@portfolio ~ % whoami', 0], ['Pengembang Full Stack', 1], ['', 2],
      ['yuki@portfolio ~ % currently', 0], ['Membangun aplikasi production-grade dalam skala besar.', 3], ['', 2],
      ['yuki@portfolio ~ % location', 0], ['Bandung, Indonesia', 3]
    ] as [string, number][],
    pillars: [
      { tag: 'Arsitektur', title: 'Arsitektur yang bersih',
        body: 'Struktur dulu: batasan yang jelas antara domain, aplikasi, dan delivery, agar codebase tetap mudah dibaca lama setelah rilis pertama.',
        bullets: ['Struktur folder yang mudah diprediksi', 'Controller ringkas, service yang nyata', 'Kode yang tetap jelas saat handover'] },
      { tag: 'DX', title: 'Developer experience',
        body: 'Sebuah project harus mudah dimulai, mudah dijalankan, dan mudah di-debug. Tooling disiapkan sekali agar tidak ada yang kehilangan waktu karena environment yang berbeda-beda.',
        bullets: ['Setup lokal dengan satu perintah', 'Formatting dan linting otomatis saat save', 'Error yang jelas, bukan tebak-tebakan'] },
      { tag: 'Interface', title: 'UI yang pixel-perfect',
        body: 'Interface adalah bagian yang paling dinilai. Spacing, state, dan motion mendapat perhatian yang sama seperti query di baliknya.',
        bullets: ['Desain konsisten sampai state terakhir', 'Loading, empty, dan error tercover', 'Responsive dari awal'] }
    ],
    githubProjects: [
      { name: 'kasir_real', blurb: 'Kasir POS v.1 — aplikasi point-of-sale.', tags: ['JavaScript'], url: 'https://github.com/yukiwicaksono03/kasir_real' },
      { name: 'kelas_online', blurb: 'Aplikasi Kelas Online — aplikasi kelas belajar online.', tags: ['JavaScript'], url: 'https://github.com/yukiwicaksono03/kelas_online' },
      { name: 'nextjs-boilerplate', blurb: 'Titik awal untuk proyek Next.js baru.', tags: ['TypeScript', 'Next.js'], url: 'https://github.com/yukiwicaksono03/nextjs-boilerplate' }
    ],
    liveProjects: [
      { name: 'Lilsala', blurb: 'Platform ecommerce milik sebuah perusahaan di Bandung yang dibangun dengan fitur-fitur lengkap seperti Shopee: manajemen produk, keranjang belanja, sistem pembayaran, manajemen pesanan, dan dashboard seller. Didesain untuk pengalaman belanja yang cepat dan nyaman.', tags: ['Platform E-commerce'], url: 'https://lilsala.com/' },
      { name: 'Cat Vision Center', blurb: 'Aplikasi ujian online untuk lembaga Bina Karya Cendekia. Fitur meliputi manajemen soal, timer ujian, anti-cheat, penilaian otomatis, dan laporan hasil ujian per peserta. Mendukung berbagai tipe soal seperti pilihan ganda dan esai.', tags: ['Platform Ujian'], url: 'https://cat.binakaryacendekia.id/' },
      { name: 'Berma Yuniar', blurb: 'Website profil perusahaan untuk PT. Berkah Maju Yuniar. Menampilkan informasi perusahaan, layanan, portofolio proyek, dan kontak. Didesain dengan tampilan profesional dan responsif untuk meningkatkan kepercayaan klien.', tags: ['Profil Perusahaan'], url: 'https://www.bermayuniar.com/' },
      { name: 'JKIE Global Indonesia', blurb: 'Website profil perusahaan untuk JKIE Global Indonesia. Menampilkan visi misi, layanan bisnis, tim, dan informasi kontak perusahaan. Dibangun dengan performa tinggi dan desain modern untuk representasi brand yang kuat.', tags: ['Profil Perusahaan'], url: 'https://jkieglobal.com/' }
    ]
  }
} as const;

type Lang = keyof typeof TEXT;

const SECTION_IDS = ['top', 'about', 'projects', 'stack', 'contact'];

const FONT_SANS = 'var(--font-instrument), system-ui, sans-serif';
const FONT_MONO = 'var(--font-mono), monospace';

export default function YukiPortfolioSite() {
  const [active, setActive] = useState('top');
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [lang, setLang] = useState<Lang>('en');
  const sweepRef = useRef<() => void>(() => {});

  const jump = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: Math.max(0, el.offsetTop - 80), behavior: 'smooth' });
    setPaletteOpen(false);
    setQuery('');
  }, []);

  useEffect(() => {
    const onScroll = () => {
      let cur = 'top';
      SECTION_IDS.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) cur = id;
      });
      setActive(prev => (prev === cur ? prev : cur));
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen(p => !p);
        setQuery('');
      } else if (e.key === 'Escape') setPaletteOpen(false);
    };

    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sweep = () => {
      if (reduce) return;
      const h = window.innerHeight || 800;
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)').forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top >= h * 0.94) return;
        const sibs = el.parentElement ? Array.from(el.parentElement.children).filter(c => c.hasAttribute && c.hasAttribute('data-reveal')) : [];
        el.style.transitionDelay = Math.min(Math.max(0, sibs.indexOf(el)), 6) * 90 + 'ms';
        el.classList.add('is-in');
      });
    };
    sweepRef.current = sweep;

    if (!reduce) document.documentElement.setAttribute('data-reveal-ready', '');

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onScroll);
    window.addEventListener('load', onScroll);
    window.addEventListener('scroll', sweep, { passive: true });
    window.addEventListener('resize', sweep);
    onScroll();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => { onScroll(); sweep(); });
      ro.observe(document.body);
    }

    const revealTimeout = setTimeout(() => {
      document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-in'));
    }, 4000);

    requestAnimationFrame(() => requestAnimationFrame(sweep));

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('load', onScroll);
      window.removeEventListener('scroll', sweep);
      window.removeEventListener('resize', sweep);
      window.removeEventListener('keydown', onKey);
      if (ro) ro.disconnect();
      clearTimeout(revealTimeout);
    };
  }, []);

  const t = TEXT[lang];
  const termColors = ['#7a746b', ACCENT, '#a29d95', '#c7c2b7'];
  const panelTitles = ['app/', 'Makefile', 'ui/states'];
  const rowSets = [
    [{ k: 'Domain', v: 'entities, rules' }, { k: 'Application', v: 'use cases' }, { k: 'Http', v: 'controllers' }, { k: 'Infra', v: 'db, queues' }],
    [{ k: 'make up', v: 'start stack' }, { k: 'make seed', v: 'demo data' }, { k: 'make test', v: 'run suite' }, { k: 'make fmt', v: 'format all' }],
    [{ k: 'default', v: 'idle' }, { k: 'loading', v: 'skeleton' }, { k: 'empty', v: 'guided' }, { k: 'error', v: 'recoverable' }]
  ];
  const statusText = STATUS_TEXT_OVERRIDE || t.statusDefault;
  const q = query.trim().toLowerCase();
  const sectionDefs = [
    { id: 'top', label: t.sectionLabels.top, hint: 'top' },
    { id: 'about', label: t.sectionLabels.about, hint: 'about' },
    { id: 'projects', label: t.sectionLabels.projects, hint: 'projects' },
    { id: 'stack', label: t.sectionLabels.stack, hint: 'stack' },
    { id: 'contact', label: t.sectionLabels.contact, hint: 'contact' }
  ];
  const results = sectionDefs.filter(s => !q || s.label.toLowerCase().includes(q));

  const navDefs = [['about', t.navLabels.about], ['projects', t.navLabels.projects], ['stack', t.navLabels.stack], ['contact', t.navLabels.contact]] as [string, string][];

  const accentEyebrow: React.CSSProperties = { display: 'block', fontSize: 12.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7c8a75', fontFamily: FONT_MONO };
  const accentBtnStyle: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', height: 50, padding: '0 28px', borderRadius: 6, background: ACCENT, color: '#242220', fontSize: 15, fontWeight: 600 };
  const outlineBtnStyle: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', height: 50, padding: '0 24px', borderRadius: 999, border: '1px solid rgba(171,161,150,0.2)', color: '#e7e2d9', fontSize: 15, fontWeight: 500 };

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#0a0a09', color: '#e7e2d9', fontFamily: FONT_SANS, WebkitFontSmoothing: 'antialiased', overflowX: 'hidden' }}>

      {/* nav */}
      <div style={{ position: 'fixed', top: 16, left: 0, right: 0, zIndex: 900, display: 'flex', justifyContent: 'center', padding: '0 16px', pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'auto', width: '100%', maxWidth: 980, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, padding: '8px 8px 8px 14px', borderRadius: 999, border: '1px solid rgba(171,161,150,0.16)', background: 'rgba(13,17,13,0.8)', backdropFilter: 'blur(18px)', boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}>
          <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em', color: '#f1ede4' }}>
            <Image src="/logo.png" alt="Yuki Wicaksono" width={96} height={96} priority style={{ width: 24, height: 24, borderRadius: 6, display: 'block', flex: 'none' }} />
            <span className="brand-name" style={{ whiteSpace: 'nowrap' }}>Yuki Wicaksono</span>
          </a>
          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {navDefs.map(([id, label]) => (
              <a key={id} href={`#${id}`} style={{
                padding: '9px 15px', borderRadius: 999, fontSize: 13.5, fontWeight: 500,
                color: active === id ? '#f1ede4' : '#a29d95',
                background: active === id ? 'rgba(171,161,150,0.12)' : 'transparent'
              }}>{label}</a>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: 3, borderRadius: 999, background: 'rgba(171,161,150,0.08)', border: '1px solid rgba(171,161,150,0.14)' }}>
              <button type="button" onClick={() => setLang('en')} style={{ border: 'none', cursor: 'pointer', height: 30, padding: '0 12px', borderRadius: 999, fontSize: 12, fontWeight: 600, fontFamily: FONT_MONO, background: lang === 'en' ? ACCENT : 'transparent', color: lang === 'en' ? '#242220' : '#a29d95' }}>EN</button>
              <button type="button" onClick={() => setLang('id')} style={{ border: 'none', cursor: 'pointer', height: 30, padding: '0 12px', borderRadius: 999, fontSize: 12, fontWeight: 600, fontFamily: FONT_MONO, background: lang === 'id' ? ACCENT : 'transparent', color: lang === 'id' ? '#242220' : '#a29d95' }}>ID</button>
            </div>
            <a href="mailto:yukiwicaksono03@gmail.com" className="btn-hire" style={{ height: 38, display: 'flex', alignItems: 'center', padding: '0 20px', borderRadius: 999, background: '#f1ede4', color: '#242220', fontSize: 13.5, fontWeight: 600, whiteSpace: 'nowrap' }}>{t.hireMe}</a>
          </div>
        </div>
      </div>

      {/* hero */}
      <section id="top" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', maxWidth: 1080, margin: '0 auto', padding: '150px 24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

          <div data-reveal="" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: ACCENT, display: 'block' }}></span>
            <span style={{ fontSize: 12.5, color: '#a8a39a', letterSpacing: '0.02em' }}>{statusText}</span>
          </div>

          <h1 data-reveal="" style={{ margin: '32px 0 0', maxWidth: '15ch', fontSize: 'clamp(40px, 14px + 6.5vw, 86px)', lineHeight: 0.98, letterSpacing: '-0.055em', fontWeight: 600, color: '#f1ede4', textWrap: 'balance' }}>{t.heroTitle}</h1>
          <p data-reveal="" style={{ margin: '22px 0 0', maxWidth: '50ch', fontSize: 19, lineHeight: 1.55, color: '#a29d95', textWrap: 'pretty' }}>{t.heroSubtitle}</p>

          <div data-reveal="" style={{ marginTop: 30, fontSize: 12.5, color: '#7a746b' }}>{t.heroLocation}</div>

          <div data-reveal="" style={{ position: 'relative', width: '100%', maxWidth: 900, marginTop: 64 }}>
            <div style={{ position: 'relative', border: '1px solid rgba(171,161,150,0.17)', borderTopLeftRadius: 26, borderTopRightRadius: 26, background: 'linear-gradient(180deg,#242220,#1c1a17)', boxShadow: '0 40px 90px rgba(0,0,0,0.65)', overflow: 'hidden', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '15px 20px', borderBottom: '1px solid rgba(171,161,150,0.12)' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#5c5750', display: 'block' }}></span>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#5c5750', display: 'block' }}></span>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#5c5750', display: 'block' }}></span>
                <span style={{ marginLeft: 8, fontFamily: FONT_MONO, fontSize: 11.5, color: '#857f74' }}>yuki@portfolio ~ %</span>
              </div>
              <div className="hero-term-grid" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr' }}>
                <div style={{ padding: '26px 28px 40px', fontFamily: FONT_MONO, fontSize: 13, lineHeight: 1.9, borderRight: '1px solid rgba(171,161,150,0.12)' }}>
                  {t.terminal.map(([text, colorIdx], i) => (
                    <div key={i} style={{ color: termColors[colorIdx] || '#a29d95', whiteSpace: 'pre' }}>{text || ' '}</div>
                  ))}
                  <span style={{ fontFamily: FONT_MONO, fontSize: 13, color: ACCENT, animation: 'blink 1.1s step-end infinite' }}>_</span>
                </div>
                <div style={{ padding: '26px 28px 40px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { label: t.factLabels.name, value: 'Yuki Wicaksono' },
                    { label: t.factLabels.role, value: t.roleValue },
                    { label: t.factLabels.location, value: 'Bandung, Indonesia' },
                    { label: t.factLabels.email, value: 'yukiwicaksono03@gmail.com' }
                  ].map((f, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '14px 16px', borderRadius: 14, border: '1px solid rgba(171,161,150,0.12)', background: 'rgba(171,161,150,0.05)' }}>
                      <div style={{ fontFamily: FONT_MONO, fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7a746b' }}>{f.label}</div>
                      <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: '-0.01em', color: '#f1ede4' }}>{f.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* about */}
      <section id="about">
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '110px 24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <span data-reveal="" style={accentEyebrow}>{t.aboutEyebrow}</span>
          <h2 data-reveal="" style={{ margin: '18px 0 0', maxWidth: '18ch', fontSize: 'clamp(30px, 10px + 3.9vw, 52px)', lineHeight: 1.04, letterSpacing: '-0.045em', fontWeight: 600, color: '#f1ede4', textWrap: 'balance' }}>{t.aboutTitle}</h2>
          <p data-reveal="" style={{ margin: '20px 0 0', maxWidth: '52ch', fontSize: 17, lineHeight: 1.6, color: '#a29d95', textWrap: 'pretty' }}>{t.aboutSubtitle}</p>
        </div>

        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '56px 24px 0', display: 'flex', flexDirection: 'column', gap: 22 }}>
          {t.pillars.map((c, i) => {
            const flip = ALTERNATE_ROWS && i % 2 === 1;
            return (
              <div key={i} data-reveal="" className="pillar-row" style={{
                position: 'relative', display: 'grid',
                gridTemplateColumns: flip ? '0.85fr 1fr' : '1fr 0.85fr',
                border: '1px solid rgba(171,161,150,0.14)', borderRadius: 20,
                background: '#1c1a17', overflow: 'hidden'
              }}>
                <div className="pillar-text" style={{ position: 'relative', gridRow: 1, gridColumn: flip ? 2 : 1, padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span style={{ alignSelf: 'flex-start', fontSize: 12.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: ACCENT, fontFamily: FONT_MONO }}>{c.tag}</span>
                  <h3 style={{ margin: '16px 0 0', fontSize: 'clamp(24px, 10px + 2vw, 32px)', lineHeight: 1.1, letterSpacing: '-0.035em', fontWeight: 600, color: '#f1ede4', textWrap: 'balance' }}>{c.title}</h3>
                  <p style={{ margin: '15px 0 0', maxWidth: '42ch', fontSize: 15.5, lineHeight: 1.65, color: '#a29d95', textWrap: 'pretty' }}>{c.body}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 26 }}>
                    {c.bullets.map((b, bi) => (
                      <div key={bi} style={{ display: 'flex', alignItems: 'baseline', gap: 11, fontSize: 14.5, color: '#c7c2b7' }}>
                        <span style={{ width: 10, height: 1, background: ACCENT, flex: 'none', display: 'block', marginBottom: 7 }}></span>
                        {b}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pillar-visual" style={{
                  position: 'relative', gridRow: 1, gridColumn: flip ? 1 : 2,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 44,
                  borderLeft: flip ? 'none' : '1px solid rgba(171,161,150,0.12)',
                  borderRight: flip ? '1px solid rgba(171,161,150,0.12)' : 'none'
                }}>
                  <div style={{ width: '100%', maxWidth: 330, border: '1px solid rgba(171,161,150,0.16)', borderRadius: 20, background: '#1c1a17', overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
                    <div style={{ padding: '13px 16px', borderBottom: '1px solid rgba(171,161,150,0.12)', fontFamily: FONT_MONO, fontSize: 11, color: '#857f74' }}>{panelTitles[i]}</div>
                    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 9 }}>
                      {rowSets[i].map((r, ri) => (
                        <div key={ri} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '12px 14px', borderRadius: 12, background: 'rgba(171,161,150,0.06)', fontFamily: FONT_MONO, fontSize: 12, color: '#c7c2b7' }}>
                          <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: ACCENT }}>{r.k}</span>
                          {r.v}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* projects */}
      <section id="projects">
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '110px 24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <span data-reveal="" style={accentEyebrow}>{t.projectsEyebrow}</span>
          <h2 data-reveal="" style={{ margin: '18px 0 0', fontSize: 'clamp(28px, 9px + 3.4vw, 46px)', lineHeight: 1.06, letterSpacing: '-0.045em', fontWeight: 600, color: '#f1ede4' }}>{t.projectsTitle}</h2>
          <p data-reveal="" style={{ margin: '18px 0 0', maxWidth: '48ch', fontSize: 16.5, lineHeight: 1.6, color: '#a29d95', textWrap: 'pretty' }}>{t.projectsSubtitle}</p>

          <div style={{ width: '100%', marginTop: 44, textAlign: 'left' }}>
            <div data-reveal="" style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#e7e2d9' }}>{t.liveLabel}</span>
              <span style={{ flex: 1, height: 1, background: 'rgba(171,161,150,0.14)', display: 'block' }}></span>
            </div>
            <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16, marginTop: 18 }}>
              {t.liveProjects.map((p, i) => (
                <a key={i} data-reveal="" href={p.url} target="_blank" rel="noreferrer" className="project-card" style={{ display: 'flex', flexDirection: 'column', padding: 26, border: '1px solid rgba(171,161,150,0.14)', borderRadius: 22, background: 'linear-gradient(180deg,#1c1a17,#1c1a17)' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ fontFamily: FONT_MONO, fontSize: 15, fontWeight: 500, color: '#f1ede4' }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: '#857f74' }}>↗</div>
                  </div>
                  <p style={{ margin: '12px 0 0', fontSize: 14, lineHeight: 1.6, color: '#a29d95', textWrap: 'pretty' }}>{p.blurb}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto', paddingTop: 22 }}>
                    {p.tags.map((tag, ti) => (
                      <span key={ti} style={{ fontFamily: FONT_MONO, fontSize: 10.5, padding: '4px 9px', borderRadius: 999, background: 'rgba(171,161,150,0.09)', color: '#a8a39a' }}>{tag}</span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div style={{ width: '100%', marginTop: 40, textAlign: 'left' }}>
            <div data-reveal="" style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#e7e2d9' }}>{t.githubLabel}</span>
              <span style={{ flex: 1, height: 1, background: 'rgba(171,161,150,0.14)', display: 'block' }}></span>
            </div>
            <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16, marginTop: 18 }}>
              {t.githubProjects.map((p, i) => (
                <a key={i} data-reveal="" href={p.url} target="_blank" rel="noreferrer" className="project-card" style={{ display: 'flex', flexDirection: 'column', padding: 26, border: '1px solid rgba(171,161,150,0.14)', borderRadius: 22, background: 'linear-gradient(180deg,#1c1a17,#1c1a17)' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ fontFamily: FONT_MONO, fontSize: 15, fontWeight: 500, color: '#f1ede4' }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: '#857f74' }}>↗</div>
                  </div>
                  <p style={{ margin: '12px 0 0', fontSize: 14, lineHeight: 1.6, color: '#a29d95', textWrap: 'pretty' }}>{p.blurb}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto', paddingTop: 22 }}>
                    {p.tags.map((tag, ti) => (
                      <span key={ti} style={{ fontFamily: FONT_MONO, fontSize: 10.5, padding: '4px 9px', borderRadius: 999, background: 'rgba(171,161,150,0.09)', color: '#a8a39a' }}>{tag}</span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>

          <a href="https://github.com/yukiwicaksono03?tab=repositories" target="_blank" rel="noreferrer" className="see-all-link" style={{ marginTop: 24, display: 'inline-flex', alignItems: 'center', height: 44, padding: '0 22px', borderRadius: 999, border: '1px solid rgba(171,161,150,0.2)', color: '#c7c2b7', fontSize: 14 }}>{t.projectsSeeAll}</a>
        </div>
      </section>

      {/* stack */}
      <section id="stack">
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '110px 24px 0' }}>
          <div data-reveal="" style={{ border: '1px solid rgba(171,161,150,0.14)', borderRadius: 20, background: '#1c1a17', padding: 52, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 44 }}>
            <div>
              <span style={accentEyebrow}>{t.stackEyebrow}</span>
              <h2 style={{ margin: '16px 0 0', fontSize: 'clamp(26px, 10px + 2.4vw, 36px)', lineHeight: 1.08, letterSpacing: '-0.04em', fontWeight: 600, color: '#f1ede4' }}>{t.stackTitle}</h2>
              <p style={{ margin: '16px 0 0', maxWidth: '40ch', fontSize: 15.5, lineHeight: 1.65, color: '#a29d95', textWrap: 'pretty' }}>{t.stackSubtitle}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
              {[
                { name: 'Backend', items: ['Laravel', 'PHP', 'Livewire', 'REST APIs'] },
                { name: 'Frontend', items: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS'] },
                { name: 'Data', items: ['MySQL', 'Eloquent', 'Schema design'] },
                { name: 'Tooling', items: ['Git', 'GitHub', 'Vite', 'Docker'] }
              ].map((g, gi) => (
                <div key={gi}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                    <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#e7e2d9' }}>{g.name}</span>
                    <span style={{ flex: 1, height: 1, background: 'rgba(171,161,150,0.14)', display: 'block' }}></span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 13 }}>
                    {g.items.map((it, ii) => (
                      <span key={ii} style={{ padding: '7px 13px', borderRadius: 999, border: '1px solid rgba(171,161,150,0.14)', background: 'rgba(171,161,150,0.05)', fontSize: 13, color: '#c7c2b7' }}>{it}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* contact */}
      <section id="contact">
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '120px 24px 0' }}>
          <div data-reveal="" style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(171,161,150,0.16)', borderRadius: 20, background: '#1c1a17', padding: '76px 40px', textAlign: 'center' }}>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 style={{ margin: 0, maxWidth: '16ch', fontSize: 'clamp(29px, 10px + 3.7vw, 50px)', lineHeight: 1.04, letterSpacing: '-0.05em', fontWeight: 600, color: '#f1ede4', textWrap: 'balance' }}>{t.contactTitle}</h2>
              <p style={{ margin: '18px 0 0', maxWidth: '44ch', fontSize: 16.5, lineHeight: 1.6, color: '#a29d95', textWrap: 'pretty' }}>{t.contactSubtitle}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginTop: 32 }}>
                <a href="mailto:yukiwicaksono03@gmail.com" className="btn-accent" style={accentBtnStyle}>{t.cta1}</a>
                <a href="https://github.com/yukiwicaksono03" target="_blank" rel="noreferrer" className="btn-outline" style={outlineBtnStyle}>GitHub ↗</a>
                <a href="https://linkedin.com/in/yukiwicaksono" target="_blank" rel="noreferrer" className="btn-outline" style={outlineBtnStyle}>LinkedIn ↗</a>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginTop: 52, padding: '32px 4px 44px', borderTop: '1px solid rgba(171,161,150,0.12)', fontSize: 13, color: '#857f74' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Image src="/logo.png" alt="" width={96} height={96} style={{ width: 20, height: 20, borderRadius: 5, display: 'block', flex: 'none' }} />
              <span>© 2026 Yuki Wicaksono</span>
            </div>
            <div style={{ display: 'flex', gap: 20 }}>
              <a href="mailto:yukiwicaksono03@gmail.com" className="footer-link" style={{ color: '#a29d95', fontSize: 13 }}>Email</a>
              <a href="https://github.com/yukiwicaksono03" target="_blank" rel="noreferrer" className="footer-link" style={{ color: '#a29d95', fontSize: 13 }}>GitHub</a>
              <a href="https://linkedin.com/in/yukiwicaksono" target="_blank" rel="noreferrer" className="footer-link" style={{ color: '#a29d95', fontSize: 13 }}>LinkedIn</a>
            </div>
          </div>
        </div>
      </section>

      {/* command palette */}
      <div
        onClick={() => setPaletteOpen(false)}
        style={{
          display: paletteOpen ? 'flex' : 'none', position: 'fixed', inset: 0, zIndex: 2000,
          alignItems: 'flex-start', justifyContent: 'center', paddingTop: '14vh',
          background: 'rgba(4,6,4,0.66)', backdropFilter: 'blur(6px)'
        }}
      >
        <div onClick={e => e.stopPropagation()} style={{ width: 'min(520px,92vw)', border: '1px solid rgba(171,161,150,0.2)', borderRadius: 18, background: '#1c1a17', boxShadow: '0 32px 80px rgba(0,0,0,0.6)', overflow: 'hidden' }}>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t.palettePlaceholder}
            style={{ width: '100%', height: 50, padding: '0 20px', border: 'none', borderBottom: '1px solid rgba(171,161,150,0.14)', background: 'transparent', color: '#f1ede4', fontSize: 15, fontFamily: FONT_SANS, outline: 'none' }}
          />
          <div style={{ maxHeight: 300, overflow: 'auto', padding: 8 }}>
            {results.map((r, i) => (
              <button
                key={i}
                type="button"
                onClick={() => jump(r.id)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: 12, padding: '12px 13px', borderRadius: 10, border: 'none', cursor: 'pointer',
                  background: 'transparent', color: '#e7e2d9', fontSize: 14, textAlign: 'left',
                  fontFamily: FONT_SANS
                }}
              >
                <span>{r.label}</span>
                <span style={{ fontFamily: FONT_MONO, fontSize: 10.5, color: '#857f74' }}>{r.hint}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
