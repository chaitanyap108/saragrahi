"use client";

import Script from "next/script";
import { useTina } from "tinacms/dist/react";
import type servicesContent from "@/content/services/services.json";
import BrushStrokeDivider from "./BrushStrokeDivider";

type ServicesPageProps = {
  data: { services: typeof servicesContent };
  query: string;
  variables: { relativePath: string };
};

// ─── Compact Acuity embed ─────────────────────────────────────────────────────
function CompactAcuityEmbed({
  src,
  clipped = false,
}: {
  src: string;
  clipped?: boolean;
}) {
  if (clipped) {
    return (
      <div className="w-full relative h-[280px] max-h-[280px] overflow-y-auto overflow-x-hidden bg-card shadow-manuscript overscroll-contain">
          <iframe
            src={src}
            className="w-full block -mt-[140px]"
            height={500}
            frameBorder="0"
            allow="payment"
          />
        <Script
          src="https://embed.acuityscheduling.com/js/embed.js"
          strategy="afterInteractive"
        />
      </div>
    );
  }

  return (
    <div className="w-full max-h-[500px] h-[500px] overflow-y-auto bg-card shadow-manuscript">
      <iframe
        src={src}
        className="w-full"
        height="800"
        frameBorder="0"
        allow="payment"
      />
      <Script
        src="https://embed.acuityscheduling.com/js/embed.js"
        strategy="afterInteractive"
      />
    </div>
  );
}

// ─── Tag strip ────────────────────────────────────────────────────────────────
function TagStrip({ tags }: { tags: readonly string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-[11px] tracking-[0.15em] uppercase text-muted px-3 py-1.5 bg-surface/80"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

// ─── Services page ────────────────────────────────────────────────────────────
export default function ServicesPage(props: ServicesPageProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const page = data.services;
  const palmistry = page.palmistry;
  const therapy = page.therapy;
  const mridanga = page.mridanga;
  const caitanya = page.caitanya;
  const sangasCta = page.sangasCta;

  const palmistryLeft = palmistry?.leftParagraphs?.filter(Boolean) ?? [];
  const palmistryRight = palmistry?.rightParagraphs?.filter(Boolean) ?? [];
  const palmistryTags = (palmistry?.tags?.filter(Boolean) ?? []) as string[];

  const therapyLeft = therapy?.leftParagraphs?.filter(Boolean) ?? [];
  const therapyRight = therapy?.rightParagraphs?.filter(Boolean) ?? [];
  const therapyTags = (therapy?.tags?.filter(Boolean) ?? []) as string[];

  const caitanyaLeft = caitanya?.leftParagraphs?.filter(Boolean) ?? [];
  const caitanyaRight = caitanya?.rightParagraphs?.filter(Boolean) ?? [];
  const caitanyaTags = (caitanya?.tags?.filter(Boolean) ?? []) as string[];

  return (
    <>
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-10 text-center bg-background">
        <p className="label-inscription mb-4">{page.sectionLabel}</p>
        <h1 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-6">
          {page.heading}
        </h1>
        <p className="text-lg text-muted leading-relaxed max-w-xl mx-auto">
          {page.description}
        </p>
      </section>

      <BrushStrokeDivider tone="accent" size="sm" surface="background" />

      {/* ══════════════════════════════════════════════════════════════════
          BLOCK 1 — Bhima-Karma · Palmistry
      ══════════════════════════════════════════════════════════════════ */}
      <section id={palmistry?.id || "palmistry"} className="pt-2 md:pt-3 pb-20 px-6 lg:px-10 bg-card scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <p className="text-xs tracking-[0.45em] uppercase text-accent mb-3 font-medium">
              {palmistry?.practitionerLabel}
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-foreground tracking-wide mb-2">
              {palmistry?.name}
            </h2>
            <p className="text-base tracking-[0.2em] uppercase text-muted mb-6 font-medium">
              {palmistry?.subtitle}
            </p>
            <div className="divider-brush mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-muted font-light leading-relaxed text-base mb-8">
              <div className="space-y-4">
                {palmistryLeft.map((paragraph, index) => (
                  <p key={`palmistry-left-${index}`}>{paragraph}</p>
                ))}
              </div>
              <div className="space-y-4">
                {palmistryRight.map((paragraph, index) => (
                  <p key={`palmistry-right-${index}`}>{paragraph}</p>
                ))}
              </div>
            </div>

            <TagStrip tags={palmistryTags} />
          </div>

          <div className="bg-background p-8 shadow-manuscript">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <p className="text-xs tracking-[0.45em] uppercase text-accent mb-2 font-medium">
                  {palmistry?.bookingLabel}
                </p>
                <h3 className="text-2xl font-light text-foreground mb-1">
                  {palmistry?.bookingHeading}
                </h3>
                <p className="text-xs tracking-[0.2em] uppercase text-muted font-medium">
                  {palmistry?.bookingSubtitle}
                </p>
              </div>
              <span className="text-[11px] tracking-[0.2em] uppercase border border-accent/60 text-accent px-3 py-1.5 font-medium self-start whitespace-nowrap">
                {palmistry?.bookingBadge}
              </span>
            </div>

            <CompactAcuityEmbed
              clipped={palmistry?.acuityClipped ?? true}
              src={palmistry?.acuitySrc || ""}
            />
          </div>
        </div>
      </section>

      <BrushStrokeDivider tone="accent" size="md" surface="card" />

      {/* ══════════════════════════════════════════════════════════════════
          BLOCK 2 — Therapy & Next Steps
      ══════════════════════════════════════════════════════════════════ */}
      <section id={therapy?.id || "therapy"} className="pt-2 md:pt-3 pb-20 px-6 lg:px-10 bg-card scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <p className="text-xs tracking-[0.45em] uppercase text-accent mb-3 font-medium">
              {therapy?.practitionerLabel}
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-foreground tracking-wide mb-2">
              {therapy?.name}
            </h2>
            <p className="text-base tracking-[0.2em] uppercase text-muted mb-6 font-medium">
              {therapy?.subtitle}
            </p>
            <div className="divider-brush mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-muted font-light leading-relaxed text-base mb-8">
              <div className="space-y-4">
                {therapyLeft.map((paragraph, index) => (
                  <p key={`therapy-left-${index}`}>{paragraph}</p>
                ))}
              </div>
              <div className="space-y-4">
                {therapyRight.map((paragraph, index) => (
                  <p key={`therapy-right-${index}`}>{paragraph}</p>
                ))}
              </div>
            </div>

            <TagStrip tags={therapyTags} />
          </div>

          <div className="bg-background p-8 shadow-manuscript">
            <p className="text-xs tracking-[0.35em] uppercase text-accent mb-2 font-medium">
              {therapy?.bookingLabel}
            </p>
            <h3 className="text-2xl font-light text-foreground mb-2">
              {therapy?.bookingHeading}
            </h3>
            <p className="text-base text-muted font-light leading-relaxed max-w-lg mb-8">
              {therapy?.bookingDescription}
            </p>
            <CompactAcuityEmbed
              clipped={therapy?.acuityClipped ?? true}
              src={therapy?.acuitySrc || ""}
            />
          </div>
        </div>
      </section>

      <BrushStrokeDivider tone="ink" size="md" mirrored surface="card" />

      {/* ══════════════════════════════════════════════════════════════════
          BLOCK 3 — Mridanga
      ══════════════════════════════════════════════════════════════════ */}
      <section id={mridanga?.id || "mridanga"} className="pt-2 md:pt-3 pb-16 px-6 lg:px-10 bg-background scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card p-10 md:p-12 text-center shadow-manuscript">
            <p className="text-xs tracking-[0.45em] uppercase text-accent mb-3 font-medium">
              {mridanga?.practitionerLabel}
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-foreground tracking-wide mb-4">
              {mridanga?.heading}
            </h2>
            <div className="divider-brush divider-brush-center mb-6" />
            <p className="text-base text-muted font-light leading-relaxed max-w-lg mx-auto mb-8">
              {mridanga?.description}
            </p>
            <a
              href={mridanga?.ctaHref || "#"}
              {...(mridanga?.ctaExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="inline-block px-9 py-3.5 bg-accent text-on-dark text-xs tracking-[0.2em] uppercase hover:bg-accent-hover transition-colors duration-300"
            >
              {mridanga?.ctaLabel}
            </a>
          </div>
        </div>
      </section>

      <BrushStrokeDivider tone="accent" size="md" surface="background" />

      {/* ══════════════════════════════════════════════════════════════════
          BLOCK 4 — Caitanya Lila
      ══════════════════════════════════════════════════════════════════ */}
      <section id={caitanya?.id || "caitanya"} className="pt-2 md:pt-3 pb-20 px-6 lg:px-10 bg-card scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <p className="text-xs tracking-[0.45em] uppercase text-accent mb-3 font-medium">
              {caitanya?.practitionerLabel}
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-foreground tracking-wide mb-2">
              {caitanya?.name}
            </h2>
            <p className="text-base tracking-[0.2em] uppercase text-muted mb-6 font-medium">
              {caitanya?.subtitle}
            </p>
            <div className="divider-brush mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-muted font-light leading-relaxed text-base mb-8">
              <div className="space-y-4">
                {caitanyaLeft.map((paragraph, index) => (
                  <p key={`caitanya-left-${index}`}>{paragraph}</p>
                ))}
              </div>
              <div className="space-y-4">
                {caitanyaRight.map((paragraph, index) => (
                  <p key={`caitanya-right-${index}`}>{paragraph}</p>
                ))}
              </div>
            </div>

            <TagStrip tags={caitanyaTags} />
          </div>

          <div className="bg-background p-8 text-center shadow-manuscript">
            <p className="text-xs tracking-[0.35em] uppercase text-accent mb-2 font-medium">
              {caitanya?.bookingLabel}
            </p>
            <h3 className="text-2xl font-light text-foreground mb-4">
              {caitanya?.bookingHeading}
            </h3>
            <p className="text-base text-muted font-light leading-relaxed max-w-lg mx-auto mb-8">
              {caitanya?.bookingDescription}
            </p>
            <a
              href={caitanya?.ctaHref || "#"}
              {...(caitanya?.ctaExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="inline-block px-9 py-3.5 bg-accent text-on-dark text-xs tracking-[0.2em] uppercase hover:bg-accent-hover transition-colors duration-300"
            >
              {caitanya?.ctaLabel}
            </a>
          </div>
        </div>
      </section>

      <BrushStrokeDivider tone="ink" size="lg" mirrored surface="card" />

      {/* ══════════════════════════════════════════════════════════════════
          Sangas & Community Events
      ══════════════════════════════════════════════════════════════════ */}
      <section id={sangasCta?.id || "sangas"} className="pt-2 md:pt-3 pb-0 px-6 lg:px-10 bg-background scroll-mt-20">
        <div className="max-w-4xl mx-auto pb-12 md:pb-14">
          <div className="bg-card p-10 md:p-12 text-center shadow-manuscript">
            <p className="text-xs tracking-[0.45em] uppercase text-accent mb-3 font-medium">
              {sangasCta?.sectionLabel}
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-foreground tracking-wide mb-4">
              {sangasCta?.heading}
            </h2>
            <div className="divider-brush divider-brush-center mb-6" />
            <p className="text-base text-muted font-light leading-relaxed max-w-lg mx-auto mb-8">
              {sangasCta?.description}
            </p>
            <a
              href={sangasCta?.ctaHref || "/sangas"}
              {...(sangasCta?.ctaExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="inline-block px-9 py-3.5 bg-accent text-on-dark text-xs tracking-[0.2em] uppercase hover:bg-accent-hover transition-colors duration-300"
            >
              {sangasCta?.ctaLabel}
            </a>
          </div>
        </div>
        <BrushStrokeDivider tone="ink" size="md" surface="background" />
      </section>
    </>
  );
}
