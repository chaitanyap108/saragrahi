import Image from "next/image";

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="min-h-[92vh] flex flex-col items-center justify-center px-6 py-28 text-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Logo — large, meditative centrepiece */}
        <Image
          src="/saragrahi-logo.jpg"
          alt="Saragrahi"
          width={200}
          height={200}
          priority
          className="mb-12 object-contain opacity-90 mix-blend-multiply"
        />

        <p className="text-[10px] tracking-[0.5em] uppercase text-[#8b7355] mb-7 font-medium">
          Healing &nbsp;·&nbsp; Wisdom &nbsp;·&nbsp; Practice
        </p>

        <h1 className="text-4xl md:text-[3.25rem] lg:text-6xl font-light tracking-tight text-[#334155] leading-[1.15] mb-7">
          Where Ancient Wisdom
          <br />
          <em className="font-normal not-italic text-[#475569]">
            Meets Modern Healing
          </em>
        </h1>

        <p className="text-base md:text-lg text-[#64748b] leading-relaxed max-w-xl mb-12 font-light">
          A sanctuary bridging clinical trauma recovery, Vedic sciences, and the
          sacred arts — offering a whole-person path toward restoration and depth.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/services"
            className="px-9 py-3.5 bg-[#334155] text-[#fcfbf9] text-[11px] tracking-[0.2em] uppercase hover:bg-[#475569] transition-colors duration-300"
          >
            Explore Services
          </a>
          <a
            href="/about"
            className="px-9 py-3.5 border border-[#334155] text-[#334155] text-[11px] tracking-[0.2em] uppercase hover:bg-[#334155] hover:text-[#fcfbf9] transition-colors duration-300"
          >
            Meet the Practitioners
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Three Core Pillars ───────────────────────────────────────────────────────
const PILLARS = [
  {
    number: "01",
    title: "Clinical & Trauma Therapy",
    subtitle: "Psychotherapy · Somatic Work",
    description:
      "UKCP-registered psychotherapy and somatic trauma therapy, offering compassionate clinical support for deep healing and recovery. Led by Bhima & Caitanya Lila.",
    tags: ["UKCP Registered", "Trauma Recovery", "Somatic Therapy", "Consulting"],
    cta: { label: "Book a Consultation", href: "/services", external: false },
  },
  {
    number: "02",
    title: "Vedic Astrology & Palmistry",
    subtitle: "Jyotish · Sacred Sciences",
    description:
      "Jyotish — the ancient Vedic science of light — and the sacred art of palmistry, revealing the subtle architecture of life's deeper rhythms and your path forward.",
    tags: ["Jyotish", "Palmistry", "Vedic Astrology", "Life Guidance"],
    cta: { label: "Explore Readings", href: "/services", external: false },
  },
  {
    number: "03",
    title: "The Sacred Arts",
    subtitle: "Mridanga · Sanskrit · Sound",
    description:
      "Immersion in the living tradition of traditional mridanga and Sanskrit — ancient pathways of presence, devotion, and healing through sacred sound and rhythm.",
    tags: ["Mridanga", "Sanskrit", "Sacred Sound", "Vedic Arts"],
    cta: {
      label: "Visit Mridanga Academy",
      href: "https://mridangaacademy.com",
      external: true,
    },
  },
] as const;

function Pillars() {
  return (
    <section className="py-24 px-6 lg:px-10 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.45em] uppercase text-[#8b7355] mb-4 font-medium">
            Our Offerings
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-[#334155] tracking-wide">
            Three Pillars of Practice
          </h2>
          <div className="w-10 h-px bg-[#8b7355] mx-auto mt-6" />
        </div>

        {/* Responsive 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PILLARS.map((pillar) => (
            <article
              key={pillar.number}
              className="group border border-[#e8e4de] bg-[#fcfbf9] p-8 hover:border-[#c4b89a] hover:shadow-[0_4px_24px_rgba(51,65,85,0.06)] transition-all duration-300 flex flex-col"
            >
              <span className="text-xs tracking-[0.3em] text-[#8b7355] font-semibold">
                {pillar.number}
              </span>

              <h3 className="text-lg font-normal text-[#334155] mt-4 mb-1.5 leading-snug">
                {pillar.title}
              </h3>

              <p className="text-[10px] tracking-[0.22em] uppercase text-[#64748b] mb-5 font-medium">
                {pillar.subtitle}
              </p>

              <p className="text-[#64748b] leading-relaxed text-sm mb-7 font-light flex-1">
                {pillar.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-7">
                {pillar.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] tracking-[0.15em] uppercase border border-[#e8e4de] text-[#64748b] px-2.5 py-1 group-hover:border-[#c4b89a] transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={pillar.cta.href}
                {...(pillar.cta.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="text-[10px] tracking-[0.2em] uppercase text-[#8b7355] border-b border-[#c4b89a] pb-0.5 hover:text-[#334155] hover:border-[#334155] transition-colors duration-200 self-start font-medium"
              >
                {pillar.cta.label} →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Hero />
      <Pillars />
    </>
  );
}
