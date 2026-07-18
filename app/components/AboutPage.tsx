"use client";

import { Fragment } from "react";
import { useTina } from "tinacms/dist/react";
import type { AboutQuery, AboutQueryVariables } from "@/tina/__generated__/types";
import BrushStrokeDivider from "./BrushStrokeDivider";

type AboutPageProps = {
  data: AboutQuery;
  query: string;
  variables: AboutQueryVariables;
};

// ─── Credential row ───────────────────────────────────────────────────────────
function Credential({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4 border-b border-border-soft/70 pb-3 last:border-0 last:pb-0">
      <span className="text-xs tracking-[0.25em] uppercase text-accent font-medium flex-shrink-0 sm:w-36 mb-0.5 sm:mb-0">
        {label}
      </span>
      <span className="text-base text-muted font-light">{value}</span>
    </div>
  );
}

// ─── Portrait placeholder ─────────────────────────────────────────────────────
function PortraitPlaceholder({ name }: { name: string }) {
  return (
    <div className="w-full max-w-[280px] aspect-[3/4] bg-surface shadow-manuscript flex items-center justify-center">
      <div className="text-center">
        <div className="divider-brush divider-brush-center mb-4 opacity-60" />
        <p className="text-xs tracking-[0.25em] uppercase text-placeholder font-medium">
          Portrait
        </p>
        <p className="text-[11px] text-placeholder mt-1.5 font-light">{name}</p>
      </div>
    </div>
  );
}

const ctaAccentClass =
  "inline-block px-9 py-3.5 bg-accent text-on-dark text-xs tracking-[0.2em] uppercase hover:bg-accent-hover transition-colors duration-300";
const ctaOutlineClass =
  "inline-block px-9 py-3.5 border border-accent text-accent text-xs tracking-[0.2em] uppercase hover:bg-accent hover:text-on-dark transition-colors duration-300";

// ─── About page ───────────────────────────────────────────────────────────────
export default function AboutPage(props: AboutPageProps) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  const page = data.about;
  const founders = page?.founders?.filter(Boolean) ?? [];

  return (
    <>
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-10 text-center bg-background">
        <p className="label-inscription mb-4">{page?.sectionLabel}</p>
        <h1 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-6">
          {page?.heading}
        </h1>
        <p className="text-lg text-muted leading-relaxed max-w-xl mx-auto">
          {page?.description}
        </p>
      </section>

      <BrushStrokeDivider tone="accent" size="md" surface="background" />

      {founders.map((founder, index) => {
        const bio = founder?.bio?.filter(Boolean) ?? [];
        const credentials = founder?.credentials?.filter(Boolean) ?? [];
        const ctas = founder?.ctas?.filter(Boolean) ?? [];
        const isFirst = index === 0;

        const renderCta = (
          cta: (typeof ctas)[number],
          key?: string | number
        ) => {
          if (!cta) return null;
          const className =
            cta.variant === "outline" ? ctaOutlineClass : ctaAccentClass;
          return (
            <a
              key={key}
              href={cta.href || "#"}
              className={className}
              {...(cta.ctaExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {cta.label}
            </a>
          );
        };

        return (
          <Fragment key={founder?.name || index}>
            <section
              className={
                isFirst
                  ? "pt-2 md:pt-3 pb-20 px-6 lg:px-10 bg-card"
                  : "pt-2 md:pt-3 pb-20 px-6 lg:px-10 bg-background"
              }
            >
              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-16 items-start">
                  {/* Left — label + portrait */}
                  <div className="flex flex-col items-start gap-6">
                    <div>
                      <p className="label-inscription mb-2">
                        {founder?.founderLabel}
                      </p>
                      <h2 className="text-3xl md:text-4xl font-light text-foreground tracking-wide">
                        {founder?.name}
                      </h2>
                    </div>
                    {founder?.portraitImage ? (
                      <img
                        src={founder.portraitImage}
                        alt={founder.portraitName || founder.name || ""}
                        className="w-full max-w-[280px] aspect-[3/4] bg-surface shadow-manuscript object-cover"
                      />
                    ) : (
                      <PortraitPlaceholder
                        name={founder?.portraitName || founder?.name || ""}
                      />
                    )}
                  </div>

                  {/* Right — bio, credentials, CTAs */}
                  <div className="lg:pt-8">
                    <p className="text-base tracking-[0.2em] uppercase text-muted mb-6 font-medium">
                      {founder?.roles}
                    </p>
                    <div className="divider-brush mb-8" />

                    <div className="space-y-5 text-muted font-light leading-relaxed text-base mb-10">
                      {bio.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>

                    {/* Credentials */}
                    <div className="space-y-3 mb-10">
                      {credentials.map((credential, i) => (
                        <Credential
                          key={i}
                          label={credential?.label || ""}
                          value={credential?.value || ""}
                        />
                      ))}
                    </div>

                    {ctas.length > 1 ? (
                      <div className="flex flex-col sm:flex-row gap-3">
                        {ctas.map((cta, i) => renderCta(cta, i))}
                      </div>
                    ) : ctas.length === 1 ? (
                      renderCta(ctas[0])
                    ) : null}
                  </div>
                </div>
              </div>
            </section>

            {isFirst ? (
              <BrushStrokeDivider
                tone="ink"
                size="md"
                mirrored
                surface="card"
              />
            ) : (
              <BrushStrokeDivider
                tone="accent"
                size="sm"
                surface="background"
              />
            )}
          </Fragment>
        );
      })}

      {/* ── Closing quote ───────────────────────────────────────────────── */}
      <section className="pt-2 md:pt-3 pb-0 px-6 lg:px-10 bg-card">
        <div className="max-w-2xl mx-auto text-center pb-12 md:pb-14">
          <blockquote className="text-lg md:text-xl font-light text-muted leading-relaxed italic">
            &ldquo;{page?.closingQuote}&rdquo;
          </blockquote>
          <p className="text-xs tracking-[0.35em] uppercase text-accent mt-6 font-medium">
            {page?.closingAttribution}
          </p>
        </div>
        <BrushStrokeDivider tone="ink" size="md" surface="card" />
      </section>
    </>
  );
}
