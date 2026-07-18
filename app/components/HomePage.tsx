"use client";

import Image from "next/image";
import type homeContent from "@/content/pages/home.json";
import BrushStrokeDivider from "./BrushStrokeDivider";

type HomePageProps = {
  data: typeof homeContent;
};

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

function SocialLinks({
  prominent = false,
  youtubeUrl,
  instagramUrl,
}: {
  prominent?: boolean;
  youtubeUrl?: string | null;
  instagramUrl?: string | null;
}) {
  const baseClass = prominent
    ? "flex items-center gap-3 px-5 py-2.5 bg-card/70 shadow-manuscript hover:bg-card hover:shadow-manuscript-lift transition-all duration-300"
    : "flex items-center gap-2 text-muted hover:text-foreground transition-colors duration-200";

  const iconClass = prominent ? "w-5 h-5 text-accent" : "w-4 h-4";
  const labelClass = prominent
    ? "text-xs tracking-[0.2em] uppercase font-medium text-foreground"
    : "text-xs tracking-[0.2em] uppercase font-medium";

  return (
    <div className={`flex items-center ${prominent ? "gap-4" : "gap-6"}`}>
      <a
        href={youtubeUrl || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
        aria-label="Visit Saragrahi on YouTube"
      >
        <YouTubeIcon className={iconClass} />
        <span className={labelClass}>YouTube</span>
      </a>
      <a
        href={instagramUrl || "#"}
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

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage({ data }: HomePageProps) {
  const hero = data.hero;
  const practitionersSection = data.practitionersSection;
  const latestContent = data.latestContent;
  const practitioners = practitionersSection?.practitioners?.filter(Boolean) ?? [];
  const videos = latestContent?.videos?.filter(Boolean) ?? [];

  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 py-24 text-center relative overflow-hidden bg-background">
        {/* Soft gold vignette behind logo */}
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 50% 28%, rgba(195, 228, 233, 0.45), transparent 70%)",
          }}
        />

        <div className="max-w-3xl mx-auto flex flex-col items-center relative">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12] mb-6">
            {hero?.headline}
            <br />
            <em className="font-display italic font-semibold text-gold-deep/90">
              {hero?.headlineAccent}
            </em>
          </h1>

          <Image
            src={hero?.logo || "/saragrahi-logo.png"}
            alt={hero?.logoAlt || "Saragrahi"}
            width={340}
            height={340}
            priority
            className="mb-2 w-[240px] h-[240px] md:w-[300px] md:h-[300px] lg:w-[340px] lg:h-[340px] object-contain"
          />

          <p className="label-inscription mb-5">{hero?.tagline}</p>

          <p className="text-lg md:text-xl text-muted leading-relaxed max-w-xl mb-10">
            {hero?.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <a
              href={hero?.primaryCta?.href || "#"}
              className="px-9 py-3.5 bg-accent text-on-dark text-xs tracking-[0.2em] uppercase hover:bg-accent-hover transition-colors duration-300 font-inscription"
            >
              {hero?.primaryCta?.label}
            </a>
            <a
              href={hero?.secondaryCta?.href || "#"}
              className="px-9 py-3.5 border border-gold text-gold-deep text-xs tracking-[0.2em] uppercase hover:bg-gold hover:text-on-dark transition-colors duration-300 font-inscription"
            >
              {hero?.secondaryCta?.label}
            </a>
          </div>

          <SocialLinks
            prominent
            youtubeUrl={hero?.socialLinks?.youtubeUrl}
            instagramUrl={hero?.socialLinks?.instagramUrl}
          />
        </div>
      </section>

      <BrushStrokeDivider tone="accent" size="md" surface="background" />

      {/* ─── Practitioner sections ─────────────────────────────────────────── */}
      <section className="pt-2 md:pt-3 pb-24 px-6 lg:px-10 bg-card">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="label-inscription mb-4">
              {practitionersSection?.sectionLabel}
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-foreground tracking-wide">
              {practitionersSection?.heading}
            </h2>
          </div>

          <div className="space-y-20">
            {practitioners.map((person, index) => {
              if (!person) return null;
              const serviceOfferings =
                person.serviceOfferings?.filter(Boolean) ?? [];
              const upcomingSangas =
                person.upcomingSangas?.filter(Boolean) ?? [];

              return (
                <article
                  key={person.name}
                  id={slugify(person.name)}
                  className={
                    index < practitioners.length - 1
                      ? "pb-20 border-b border-border/60"
                      : ""
                  }
                >
                  <p className="label-inscription mb-3">
                    Practitioner · {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-light text-foreground tracking-wide mb-2">
                    {person.name}
                  </h3>
                  <p className="text-base tracking-[0.15em] uppercase text-gold-deep/80 font-inscription font-medium mb-6">
                    {person.title}
                  </p>
                  <p className="text-muted leading-relaxed text-base font-light mb-12 max-w-xl">
                    {person.description}
                  </p>

                  {/* Services */}
                  <div className="mb-12">
                    <p className="label-inscription mb-6">Services</p>
                    <div className="space-y-0">
                      {serviceOfferings.map((offering, serviceIndex) => {
                        if (!offering) return null;
                        return (
                          <div
                            key={`${offering.service}-${serviceIndex}`}
                            className={`py-8 ${
                              serviceIndex < serviceOfferings.length - 1
                                ? "border-b border-border/40"
                                : ""
                            }`}
                          >
                            <h4 className="text-xl md:text-2xl font-light text-foreground tracking-wide mb-3">
                              {offering.service}
                            </h4>
                            <p className="text-muted leading-relaxed text-base font-light mb-6 max-w-xl">
                              {offering.blurb}
                            </p>
                            <a
                              href={offering.ctaHref || "#"}
                              {...(offering.ctaExternal
                                ? {
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                  }
                                : {})}
                              className="inline-block px-9 py-3.5 bg-accent text-on-dark text-xs tracking-[0.2em] uppercase hover:bg-accent-hover transition-colors duration-300"
                            >
                              {offering.ctaLabel}
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Practitioner sangas */}
                  <div>
                    <p className="label-inscription mb-6">Upcoming Sangas</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {upcomingSangas.map((sanga, sangaIndex) => {
                        if (!sanga) return null;
                        return (
                          <div
                            key={`${sanga.title}-${sangaIndex}`}
                            className="bg-background overflow-hidden shadow-manuscript hover:shadow-manuscript-lift transition-all duration-300 flex flex-col"
                          >
                            <div
                              className="aspect-[4/3] bg-surface flex items-center justify-center border-b border-border/40"
                              aria-hidden="true"
                            >
                              {"posterImage" in sanga && sanga.posterImage ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={String(sanga.posterImage)}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="text-center px-6">
                                  <p className="text-[11px] tracking-[0.25em] uppercase text-accent/70 font-medium mb-2">
                                    Event Poster
                                  </p>
                                  <p className="text-sm text-muted/60 font-light">
                                    Thumbnail placeholder
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                              <p className="text-[11px] tracking-[0.2em] uppercase text-accent font-medium mb-2">
                                {sanga.date}
                              </p>
                              <h4 className="text-base font-normal text-foreground mb-2 leading-snug">
                                {sanga.title}
                              </h4>
                              <p className="text-sm text-muted font-light mb-5 leading-relaxed">
                                {sanga.detail}
                              </p>
                              <a
                                href={sanga.ctaHref || "#"}
                                {...(sanga.ctaExternal
                                  ? {
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                    }
                                  : {})}
                                className="mt-auto inline-block w-full text-center px-6 py-3 bg-accent text-on-dark text-xs tracking-[0.2em] uppercase hover:bg-accent-hover transition-colors duration-300"
                              >
                                {sanga.ctaLabel}
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <BrushStrokeDivider tone="ink" size="lg" mirrored surface="card" />

      {/* ─── Latest YouTube content ────────────────────────────────────────── */}
      <section className="pt-2 md:pt-3 pb-0 px-6 lg:px-10 bg-background">
        <div className="max-w-6xl mx-auto pb-16 md:pb-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="label-inscription mb-4">
                {latestContent?.sectionLabel}
              </p>
              <h2 className="text-3xl md:text-4xl font-light text-foreground tracking-wide">
                {latestContent?.heading}
              </h2>
            </div>
            <a
              href={latestContent?.subscribeUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-accent border-b border-accent-light pb-0.5 hover:text-foreground hover:border-accent transition-colors duration-200 font-medium self-start"
            >
              <YouTubeIcon className="w-4 h-4" />
              {latestContent?.subscribeLabel}
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {videos.map((video) => {
              if (!video) return null;
              return (
                <article
                  key={video.youtubeId || video.title}
                  className="group bg-card overflow-hidden shadow-manuscript hover:shadow-manuscript-lift transition-all duration-300"
                >
                  <div className="relative aspect-video bg-surface">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
                      title={video.title || "YouTube video"}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-base font-normal text-foreground mb-2 leading-snug">
                      {video.title}
                    </h3>
                    <p className="text-base text-muted font-light leading-relaxed">
                      {video.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <BrushStrokeDivider tone="ink" size="md" surface="background" />
      </section>
    </>
  );
}
