// ─── Social & external links ──────────────────────────────────────────────────
export const SOCIAL_LINKS = {
  youtube:
    "https://youtube.com/@saragrahi-seekingtheessence?si=hrkxsolwKop9t3NK",
  instagram:
    "https://www.instagram.com/saragrahi_?igsh=MWgxcm53N2Jpdm11aw==",
} as const;

// ─── Navbar service dropdown ──────────────────────────────────────────────────
export const SERVICE_NAV_ITEMS = [
  { label: "Palmistry", href: "/services#palmistry" },
  { label: "Trauma Consulting", href: "/services#therapy" },
  { label: "Mridanga & Sanskrit", href: "/services#mridanga" },
  {
    label: "Vedic Psychotherapy",
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
    serviceOfferings: [
      {
        id: "palmistry",
        service: "Palmistry",
        blurb:
          "Sacred Vedic hand analysis that reads the living architecture of your life, character, and dharmic potential — with precision, care, and rare depth of insight.",
        cta: { label: "Book a Palmistry Reading", href: "/services#palmistry" },
      },
      {
        id: "therapy",
        service: "Trauma Consulting",
        blurb:
          "Direct, embodied trauma consulting and somatic therapy for complex trauma, life transitions, and the intersection of psychological and spiritual crisis.",
        cta: { label: "Book a Consultation", href: "/services#therapy" },
      },
      {
        id: "mridanga",
        service: "Traditional Mridanga & Sanskrit",
        blurb:
          "Living lineage transmission in traditional mridanga and foundational Sanskrit — rare, authentic instruction for sincere students of sacred sound and rhythm.",
        cta: {
          label: "Visit Mridanga",
          href: "https://mridanga.com",
          external: true,
        },
      },
    ],
    upcomingSangas: [
      {
        id: "monthly-sat-sanga",
        title: "Monthly Sat Sanga",
        date: "First Sunday of each month",
        detail:
          "Community gathering — sacred sound, reflection, and shared practice.",
        cta: { label: "Register", href: "/sangas" },
      },
      {
        id: "palmistry-open-evening",
        title: "Palmistry Open Evening",
        date: "Quarterly · Next: September 2026",
        detail:
          "An informal evening of hand reading demonstrations and Q&A.",
        cta: { label: "Register", href: "/sangas" },
      },
      {
        id: "mridanga-immersion",
        title: "Mridanga Immersion Weekend",
        date: "Coming Autumn 2026",
        detail:
          "A rare weekend of traditional mridanga instruction and Sanskrit foundations.",
        cta: {
          label: "Register",
          href: "https://mridanga.com",
          external: true,
        },
      },
    ],
  },
  {
    id: "caitanya-lila",
    name: "Caitanya Lila",
    title: "Vedic Psychotherapist",
    description:
      "UKCP-registered psychotherapist weaving clinical depth with Vedic psychology. Caitanya Lila holds space for trauma recovery, relational depth, and the soul's deeper intelligence.",
    serviceOfferings: [
      {
        id: "caitanya",
        service: "Vedic Psychotherapy",
        blurb:
          "UKCP-registered psychotherapy woven with Vedic psychology — holding space for trauma recovery, relational depth, and the soul's deeper intelligence.",
        cta: {
          label: "Visit Trikaya Psychology",
          href: "https://trikayapsychology.com",
          external: true,
        },
      },
    ],
    upcomingSangas: [
      {
        id: "womens-healing-circle",
        title: "Women's Healing Circle",
        date: "Monthly · Last Saturday",
        detail:
          "A held space for women navigating trauma, transition, and spiritual awakening.",
        cta: {
          label: "Register",
          href: "https://trikayapsychology.com",
          external: true,
        },
      },
    ],
  },
] as const;

// ─── YouTube featured videos ──────────────────────────────────────────────────
// From @saragrahi-seekingtheessence — update as new videos are published.
export const YOUTUBE_VIDEOS = [
  {
    id: "SyCS1e-OsGE",
    title: "Blake Lively Personality Analysis | Palm Reading",
    description:
      "A Vedic palmistry reading exploring temperament, character, and the deeper patterns revealed in the hand.",
  },
  {
    id: "VWBPl7I-atM",
    title: "Justin Baldoni | It Ends With Us | Blind Palm Reading",
    description:
      "A blind palm reading of Justin Baldoni — insight into personality and life patterns through sacred hand analysis.",
  },
  {
    id: "kBx9w0UWda8",
    title: "Prince Andrew’s Arrest | Predicted",
    description:
      "Reflecting on a palmistry prediction and what the lines of the hand can reveal about timing and destiny.",
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
] as const;
