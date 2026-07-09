// ─── Social & external links ──────────────────────────────────────────────────
export const SOCIAL_LINKS = {
  youtube: "https://www.youtube.com/@saragrahi",
  instagram: "https://www.instagram.com/saragrahi",
} as const;

// ─── Navbar service dropdown ──────────────────────────────────────────────────
export const SERVICE_NAV_ITEMS = [
  { label: "Palmistry", href: "/services#palmistry" },
  { label: "Trauma Consulting", href: "/services#therapy" },
  { label: "Mridanga & Sanskrit", href: "/services#mridanga" },
  {
    label: "Vedic Psychotherapy & Jyotish",
    href: "/services#caitanya",
  },
  { label: "Sat Sangas & Events", href: "/sangas" },
] as const;

// ─── Practitioner profiles (home page) ────────────────────────────────────────
export const PRACTITIONERS = [
  {
    id: "bhima-karma",
    name: "Bhima-Karma",
    title: "Palmist · Trauma Consultant · Teacher of the Sacred Arts",
    description:
      "Over two decades at the intersection of somatic therapy, trauma consulting, Vedic palmistry, and traditional practice. Bhima-Karma offers palmistry readings, embodied trauma support, and rare transmission in mridanga and Sanskrit — each a distinct doorway into wholeness.",
    services: [
      "Palmistry",
      "Vedic Hand Analysis",
      "Trauma Consulting",
      "Somatic Therapy",
      "Traditional Mridanga",
      "Foundational Sanskrit",
    ],
    upcomingSangas: [
      {
        title: "Monthly Sat Sanga",
        date: "First Sunday of each month",
        detail: "Community gathering — sacred sound, reflection, and shared practice.",
      },
      {
        title: "Palmistry Open Evening",
        date: "Quarterly · Next: September 2026",
        detail: "An informal evening of hand reading demonstrations and Q&A.",
      },
      {
        title: "Mridanga Immersion Weekend",
        date: "Coming Autumn 2026",
        detail: "A rare weekend of traditional mridanga instruction and Sanskrit foundations.",
      },
    ],
    cta: { label: "Book a Palmistry Reading", href: "/services#palmistry" },
    secondaryCta: { label: "View All Services", href: "/services" },
    tertiaryCta: {
      label: "Visit Mridanga",
      href: "https://mridanga.com",
      external: true,
    },
  },
  {
    id: "caitanya-lila",
    name: "Caitanya Lila",
    title: "Vedic Psychotherapist · Jyotish Practitioner",
    description:
      "UKCP-registered psychotherapist weaving clinical depth with Vedic psychology and Jyotish astrology. Caitanya Lila holds space for trauma recovery, relational depth, and the soul's deeper intelligence.",
    services: [
      "UKCP Psychotherapy",
      "Trauma Therapy",
      "Jyotish Astrology",
      "Vedic Psychology",
    ],
    upcomingSangas: [
      {
        title: "Women's Healing Circle",
        date: "Monthly · Last Saturday",
        detail: "A held space for women navigating trauma, transition, and spiritual awakening.",
      },
      {
        title: "Jyotish Study Group",
        date: "Bi-monthly",
        detail: "Exploring Vedic astrology through lived experience and sacred text.",
      },
    ],
    cta: {
      label: "Visit Trikaya Psychology",
      href: "https://trikayapsychology.com",
      external: true,
    },
    secondaryCta: { label: "View Services", href: "/services#caitanya" },
  },
] as const;

// ─── YouTube featured videos ──────────────────────────────────────────────────
// Replace `id` values with real YouTube video IDs from the Saragrahi channel.
export const YOUTUBE_VIDEOS = [
  {
    id: "VIDEO_ID_1",
    title: "Introduction to Saragrahi",
    description:
      "An overview of our practice — healing, wisdom, and the sacred arts.",
  },
  {
    id: "VIDEO_ID_2",
    title: "The Art of Vedic Palmistry",
    description:
      "Bhima-Karma explores the ancient discipline of sacred hand reading.",
  },
  {
    id: "VIDEO_ID_3",
    title: "Sat Sanga — Sacred Sound & Community",
    description:
      "Highlights from a recent community gathering with mridanga and reflection.",
  },
] as const;

// ─── Upcoming Sangas & community events ───────────────────────────────────────
export const UPCOMING_SANGAS = [
  {
    id: "monthly-sat-sanga",
    title: "Monthly Sat Sanga",
    host: "Bhima-Karma",
    date: "First Sunday of each month · 10:00 AM",
    location: "Saragrahi Sanctuary",
    description:
      "A monthly community gathering centred on sacred sound, shared reflection, and the living practice of presence. Open to all sincere seekers.",
    type: "Sat Sanga" as const,
    cta: { label: "Learn More", href: "/sangas" },
  },
  {
    id: "palmistry-open-evening",
    title: "Palmistry Open Evening",
    host: "Bhima-Karma",
    date: "September 2026 · Date TBC",
    location: "Saragrahi Sanctuary",
    description:
      "An informal evening of hand reading demonstrations, Q&A, and the chance to experience Vedic palmistry in a warm community setting.",
    type: "Community Event" as const,
    cta: { label: "Express Interest", href: "/sangas" },
  },
  {
    id: "womens-healing-circle",
    title: "Women's Healing Circle",
    host: "Caitanya Lila",
    date: "Last Saturday of each month · 2:00 PM",
    location: "Online & In-Person",
    description:
      "A held space for women navigating trauma, transition, and spiritual awakening — weaving clinical depth with sacred feminine wisdom.",
    type: "Sat Sanga" as const,
    cta: {
      label: "Book via Trikaya",
      href: "https://trikayapsychology.com",
      external: true,
    },
  },
  {
    id: "mridanga-immersion",
    title: "Mridanga Immersion Weekend",
    host: "Bhima-Karma",
    date: "Autumn 2026 · Dates TBC",
    location: "Saragrahi Sanctuary",
    description:
      "A rare weekend of traditional mridanga instruction and Sanskrit foundations — authentic transmission for sincere students.",
    type: "Workshop" as const,
    cta: {
      label: "Visit Mridanga",
      href: "https://mridanga.com",
      external: true,
    },
  },
  {
    id: "jyotish-study-group",
    title: "Jyotish Study Group",
    host: "Caitanya Lila",
    date: "Bi-monthly · Next: August 2026",
    location: "Online",
    description:
      "Exploring Vedic astrology through lived experience, chart study, and the philosophical foundations of Jyotish.",
    type: "Study Group" as const,
    cta: {
      label: "Enquire",
      href: "https://trikayapsychology.com",
      external: true,
    },
  },
] as const;
