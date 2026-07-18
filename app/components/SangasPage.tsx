"use client";

import Link from "next/link";
import { useTina } from "tinacms/dist/react";
import type { SangasQuery, SangasQueryVariables } from "@/tina/__generated__/types";
import BrushStrokeDivider from "./BrushStrokeDivider";

type SangasPageProps = {
  data: SangasQuery;
  query: string;
  variables: SangasQueryVariables;
};

const EVENT_TYPE_STYLES = {
  "Sat Sanga": "border-gold/50 text-gold-deep",
  "Community Event": "border-muted/40 text-muted",
  Workshop: "border-foreground/40 text-foreground",
} as const;

export default function SangasPage(props: SangasPageProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const page = data.sangas;
  const events = page.events?.filter(Boolean) ?? [];
  const ctaSection = page.ctaSection;

  return (
    <>
      <section className="py-20 px-6 lg:px-10 text-center bg-background">
        <p className="label-inscription mb-4">{page.sectionLabel}</p>
        <h1 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-6">
          {page.heading}
        </h1>
        <p className="text-lg text-muted leading-relaxed max-w-xl mx-auto">
          {page.description}
        </p>
      </section>

      <BrushStrokeDivider tone="accent" size="md" surface="background" />

      <section className="pt-2 md:pt-3 pb-0 px-6 lg:px-10 bg-card">
        <div className="max-w-4xl mx-auto pb-16 md:pb-20">
          <div className="space-y-6">
            {events.map((event, index) => {
              if (!event) return null;
              const eventType =
                (event.type as keyof typeof EVENT_TYPE_STYLES) in EVENT_TYPE_STYLES
                  ? (event.type as keyof typeof EVENT_TYPE_STYLES)
                  : "Sat Sanga";
              return (
                <article
                  key={`${event.title}-${index}`}
                  className="bg-background p-8 md:p-10 shadow-manuscript hover:shadow-manuscript-lift transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                    <div>
                      <span
                        className={`inline-block text-[11px] tracking-[0.15em] uppercase border px-2.5 py-1 font-medium mb-3 ${EVENT_TYPE_STYLES[eventType]}`}
                      >
                        {event.type}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-light text-foreground tracking-wide">
                        {event.title}
                      </h2>
                    </div>
                    <p className="text-xs tracking-[0.15em] uppercase text-accent font-medium whitespace-nowrap">
                      Hosted by {event.host}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-6 text-base text-muted font-light">
                    <p>
                      <span className="text-xs tracking-[0.2em] uppercase text-accent font-medium block mb-1">
                        When
                      </span>
                      {event.date}
                    </p>
                    <p>
                      <span className="text-xs tracking-[0.2em] uppercase text-accent font-medium block mb-1">
                        Where
                      </span>
                      {event.location}
                    </p>
                  </div>

                  <p className="text-muted font-light leading-relaxed text-base mb-8">
                    {event.description}
                  </p>

                  <a
                    href={event.ctaHref || "#"}
                    {...(event.ctaExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="inline-block px-9 py-3.5 bg-accent text-on-dark text-xs tracking-[0.2em] uppercase hover:bg-accent-hover transition-colors duration-300"
                  >
                    {event.ctaLabel}
                  </a>
                </article>
              );
            })}
          </div>

          <BrushStrokeDivider tone="ink" size="sm" surface="card" className="!pt-4" />

          <div className="bg-card p-10 text-center shadow-manuscript">
            <p className="text-xs tracking-[0.45em] uppercase text-accent mb-3 font-medium">
              {ctaSection?.sectionLabel}
            </p>
            <h2 className="text-xl md:text-2xl font-light text-foreground tracking-wide mb-4">
              {ctaSection?.heading}
            </h2>
            <p className="text-base text-muted font-light leading-relaxed max-w-md mx-auto mb-8">
              {ctaSection?.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={ctaSection?.primaryCta?.href || "/services"}
                className="inline-block px-9 py-3.5 bg-accent text-on-dark text-xs tracking-[0.2em] uppercase hover:bg-accent-hover transition-colors duration-300"
              >
                {ctaSection?.primaryCta?.label}
              </Link>
              <Link
                href={ctaSection?.secondaryCta?.href || "/about"}
                className="inline-block px-9 py-3.5 border border-accent text-accent text-xs tracking-[0.2em] uppercase hover:bg-accent hover:text-on-dark transition-colors duration-300"
              >
                {ctaSection?.secondaryCta?.label}
              </Link>
            </div>
          </div>
        </div>
        <BrushStrokeDivider tone="ink" size="md" surface="card" />
      </section>
    </>
  );
}
