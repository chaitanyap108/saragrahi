import {
  PRACTITIONERS,
  SOCIAL_LINKS,
  YOUTUBE_VIDEOS,
} from "@/app/lib/site-config";
import Image from "next/image";

// ─── Social icons ─────────────────────────────────────────────────────────────
function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function SocialLinks({ prominent = false }: { prominent?: boolean }) {
  const baseClass = prominent
    ? "flex items-center gap-3 px-5 py-2.5 border border-[#e8e4de] hover:border-[#c4b89a] hover:bg-white transition-all duration-300"
    : "flex items-center gap-2 text-[#64748b] hover:text-[#334155] transition-colors duration-200";

  const iconClass = prominent ? "w-5 h-5 text-[#8b7355]" : "w-4 h-4";
  const labelClass = prominent
    ? "text-[10px] tracking-[0.2em] uppercase font-medium text-[#334155]"
    : "text-[10px] tracking-[0.2em] uppercase font-medium";

  return (
    <div className={`flex items-center ${prominent ? "gap-4" : "gap-6"}`}>
      <a
        href={SOCIAL_LINKS.youtube}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
        aria-label="Visit Saragrahi on YouTube"
      >
        <YouTubeIcon className={iconClass} />
        <span className={labelClass}>YouTube</span>
      </a>
      <a
        href={SOCIAL_LINKS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
        aria-label="Visit Saragrahi on Instagram"
      >
        <InstagramIcon className={iconClass} />
        <span className={labelClass}>Instagram</span>
      </a>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="min-h-[85vh] flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <Image
          src="/saragrahi-logo.jpg"
          alt="Saragrahi"
          width={200}
          height={200}
          priority
          className="mb-10 object-contain opacity-90 mix-blend-multiply"
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

        <p className="text-base md:text-lg text-[#64748b] leading-relaxed max-w-xl mb-10 font-light">
          A sanctuary bridging clinical trauma recovery, Vedic sciences, and the
          sacred arts — offering a whole-person path toward restoration and depth.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <a
            href="/services"
            className="px-9 py-3.5 bg-[#334155] text-[#fcfbf9] text-[11px] tracking-[0.2em] uppercase hover:bg-[#475569] transition-colors duration-300"
          >
            Explore Services
          </a>
          <a
            href="/sangas"
            className="px-9 py-3.5 border border-[#334155] text-[#334155] text-[11px] tracking-[0.2em] uppercase hover:bg-[#334155] hover:text-[#fcfbf9] transition-colors duration-300"
          >
            Upcoming Sangas
          </a>
        </div>

        <SocialLinks prominent />
      </div>
    </section>
  );
}

// ─── Practitioner introduction ──────────────────────────────────────────────────
function PractitionerIntro() {
  return (
    <section className="py-24 px-6 lg:px-10 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.45em] uppercase text-[#8b7355] mb-4 font-medium">
            Our Practitioners
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-[#334155] tracking-wide">
            Two Paths, One Sanctuary
          </h2>
          <div className="w-10 h-px bg-[#8b7355] mx-auto mt-6" />
        </div>

        <div className="space-y-16">
          {PRACTITIONERS.map((person, index) => (
            <article
              key={person.id}
              id={person.id}
              className={`grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-start ${
                index < PRACTITIONERS.length - 1
                  ? "pb-16 border-b border-[#e8e4de]"
                  : ""
              }`}
            >
              <div>
                <p className="text-[10px] tracking-[0.45em] uppercase text-[#8b7355] mb-2 font-medium">
                  Practitioner · {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="text-3xl md:text-4xl font-light text-[#334155] tracking-wide mb-2">
                  {person.name}
                </h3>
                <p className="text-sm tracking-[0.15em] uppercase text-[#64748b] font-medium">
                  {person.title}
                </p>
                <div className="w-10 h-px bg-[#8b7355] mt-6" />
              </div>

              <div>
                <p className="text-[#64748b] leading-relaxed text-sm font-light mb-8">
                  {person.description}
                </p>

                <div className="mb-8">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#8b7355] mb-3 font-medium">
                    Services
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {person.services.map((service) => (
                      <span
                        key={service}
                        className="text-[9px] tracking-[0.15em] uppercase border border-[#e8e4de] text-[#64748b] px-2.5 py-1"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#8b7355] mb-3 font-medium">
                    Upcoming Sangas
                  </p>
                  <div className="space-y-3">
                    {person.upcomingSangas.map((sanga) => (
                      <div
                        key={sanga.title}
                        className="border border-[#e8e4de] bg-[#fcfbf9] px-5 py-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                          <p className="text-sm text-[#334155] font-normal">
                            {sanga.title}
                          </p>
                          <p className="text-[10px] tracking-[0.15em] uppercase text-[#8b7355] font-medium whitespace-nowrap">
                            {sanga.date}
                          </p>
                        </div>
                        <p className="text-xs text-[#64748b] font-light">
                          {sanga.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                  <a
                    href={person.cta.href}
                    {...("external" in person.cta && person.cta.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="inline-block px-9 py-3.5 bg-[#334155] text-[#fcfbf9] text-[11px] tracking-[0.2em] uppercase hover:bg-[#475569] transition-colors duration-300 text-center"
                  >
                    {person.cta.label}
                    {"external" in person.cta && person.cta.external
                      ? "\u00a0↗"
                      : ""}
                  </a>
                  {"secondaryCta" in person && person.secondaryCta && (
                    <a
                      href={person.secondaryCta.href}
                      {...("external" in person.secondaryCta &&
                      person.secondaryCta.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="inline-block px-9 py-3.5 border border-[#334155] text-[#334155] text-[11px] tracking-[0.2em] uppercase hover:bg-[#334155] hover:text-[#fcfbf9] transition-colors duration-300 text-center"
                    >
                      {person.secondaryCta.label}
                      {"external" in person.secondaryCta &&
                      person.secondaryCta.external
                        ? "\u00a0↗"
                        : ""}
                    </a>
                  )}
                  {"tertiaryCta" in person && person.tertiaryCta && (
                    <a
                      href={person.tertiaryCta.href}
                      {...("external" in person.tertiaryCta &&
                      person.tertiaryCta.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="inline-block px-9 py-3.5 border border-[#334155] text-[#334155] text-[11px] tracking-[0.2em] uppercase hover:bg-[#334155] hover:text-[#fcfbf9] transition-colors duration-300 text-center"
                    >
                      {person.tertiaryCta.label}
                      {"external" in person.tertiaryCta &&
                      person.tertiaryCta.external
                        ? "\u00a0↗"
                        : ""}
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Latest YouTube content ───────────────────────────────────────────────────
function LatestContent() {
  return (
    <section className="py-24 px-6 lg:px-10 bg-[#fcfbf9] border-t border-[#e8e4de]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#8b7355] mb-4 font-medium">
              From Our Channel
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-[#334155] tracking-wide">
              Latest Content
            </h2>
            <div className="w-10 h-px bg-[#8b7355] mt-6" />
          </div>
          <a
            href={SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#8b7355] border-b border-[#c4b89a] pb-0.5 hover:text-[#334155] hover:border-[#334155] transition-colors duration-200 font-medium self-start"
          >
            <YouTubeIcon className="w-4 h-4" />
            Subscribe on YouTube →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {YOUTUBE_VIDEOS.map((video) => (
            <article
              key={video.title}
              className="group border border-[#e8e4de] bg-white overflow-hidden hover:border-[#c4b89a] hover:shadow-[0_4px_24px_rgba(51,65,85,0.06)] transition-all duration-300"
            >
              <div className="relative aspect-video bg-[#f0ece6]">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-base font-normal text-[#334155] mb-2 leading-snug">
                  {video.title}
                </h3>
                <p className="text-sm text-[#64748b] font-light leading-relaxed">
                  {video.description}
                </p>
              </div>
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
      <PractitionerIntro />
      <LatestContent />
    </>
  );
}
