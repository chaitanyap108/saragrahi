"use client";

import { useTina } from "tinacms/dist/react";
import type {
  PalmistryIntakeQuery,
  PalmistryIntakeQueryVariables,
} from "@/tina/__generated__/types";
import PalmistryUploadForm from "./PalmistryUploadForm";
import BrushStrokeDivider from "./BrushStrokeDivider";

type PalmistryIntakePageProps = {
  data: PalmistryIntakeQuery;
  query: string;
  variables: PalmistryIntakeQueryVariables;
};

// ─── Photo quality examples ───────────────────────────────────────────────────
function PhotoExampleCard({
  type,
  imageLabel,
  imageHint,
  captionTitle,
  captionText,
  image,
}: {
  type: "good" | "bad";
  imageLabel?: string | null;
  imageHint?: string | null;
  captionTitle?: string | null;
  captionText?: string | null;
  image?: string | null;
}) {
  const isGood = type === "good";

  return (
    <div className="overflow-hidden shadow-manuscript">
      {/* Placeholder image area */}
      <div
        className={`aspect-[4/3] flex items-center justify-center ${
          isGood ? "bg-surface" : "bg-foreground/8"
        }`}
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={captionTitle || imageLabel || ""}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center px-6">
            <svg
              className={`w-12 h-12 mx-auto mb-3 ${
                isGood ? "text-accent" : "text-placeholder"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p
              className={`text-xs tracking-[0.2em] uppercase font-medium ${
                isGood ? "text-accent" : "text-placeholder"
              }`}
            >
              {imageLabel}
            </p>
            <p
              className={`text-[11px] mt-1 font-light ${
                isGood ? "text-muted" : "text-placeholder"
              }`}
            >
              {imageHint}
            </p>
          </div>
        )}
      </div>

      {/* Caption */}
      <div className="bg-card border-t border-border/30 px-5 py-4 flex items-start gap-3">
        {/* Status icon */}
        {isGood ? (
          <span className="mt-0.5 w-4 h-4 flex-shrink-0 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
            <svg
              className="w-2.5 h-2.5 text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </span>
        ) : (
          <span className="mt-0.5 w-4 h-4 flex-shrink-0 rounded-full bg-red-50 border border-red-200 flex items-center justify-center">
            <svg
              className="w-2.5 h-2.5 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        )}
        <div>
          <p className="text-sm font-medium text-foreground mb-1">
            {captionTitle}
          </p>
          <p className="text-xs text-muted font-light leading-relaxed">
            {captionText}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PalmistryIntakePage(props: PalmistryIntakePageProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const page = data.palmistryIntake;
  const requirements = page.requirements?.filter(Boolean) ?? [];
  const goodExample = page.goodExample;
  const badExample = page.badExample;

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-10 text-center bg-background">
        <p className="text-xs tracking-[0.5em] uppercase text-accent mb-4 font-medium">
          {page.sectionLabel}
        </p>
        <h1 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-6">
          {page.heading}
        </h1>
        <div className="divider-brush divider-brush-center mb-6" />
        <p className="text-base text-muted font-light leading-relaxed max-w-xl mx-auto">
          {page.description}
          <strong className="font-medium text-muted">
            {page.descriptionEmphasis}
          </strong>
        </p>
      </section>

      <BrushStrokeDivider tone="accent" size="md" surface="background" />

      {/* ── Instructions + visual guide + form ──────────────────────────── */}
      <section className="pt-2 md:pt-3 pb-0 px-6 lg:px-10 bg-card">
        <div className="max-w-3xl mx-auto pb-16 md:pb-20">
          {/* Requirements */}
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.45em] uppercase text-accent mb-3 font-medium">
              {page.requirementsLabel}
            </p>
            <h2 className="text-2xl font-light text-foreground">
              {page.requirementsHeading}
            </h2>
          </div>

          <ol className="space-y-3 mb-16" aria-label="Photo requirements">
            {requirements.map((req) => {
              if (!req) return null;
              return (
                <li
                  key={req.n}
                  className="flex gap-5 items-start px-6 py-4 bg-background shadow-manuscript"
                >
                  <span className="text-sm tracking-[0.3em] text-accent font-semibold flex-shrink-0 mt-0.5">
                    {req.n}
                  </span>
                  <p className="text-base text-muted font-light leading-relaxed">
                    {req.text}
                  </p>
                </li>
              );
            })}
          </ol>

          {/* Visual guide */}
          <div className="mb-16">
            <h3 className="text-center text-lg font-light text-foreground mb-2">
              {page.visualGuideHeading}
            </h3>
            <p className="text-center text-base text-placeholder font-light mb-8">
              {page.visualGuideNoteBefore}
              <code className="text-xs bg-surface px-1.5 py-0.5">
                {page.visualGuideNoteCode}
              </code>
              {page.visualGuideNoteAfter}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <PhotoExampleCard
                type="good"
                imageLabel={goodExample?.imageLabel}
                imageHint={goodExample?.imageHint}
                captionTitle={goodExample?.captionTitle}
                captionText={goodExample?.captionText}
                image={goodExample?.image}
              />
              <PhotoExampleCard
                type="bad"
                imageLabel={badExample?.imageLabel}
                imageHint={badExample?.imageHint}
                captionTitle={badExample?.captionTitle}
                captionText={badExample?.captionText}
                image={badExample?.image}
              />
            </div>
          </div>

          {/* Upload form card */}
          <div className="bg-background p-8 shadow-manuscript">
            <p className="text-xs tracking-[0.4em] uppercase text-accent mb-2 font-medium">
              {page.formLabel}
            </p>
            <h3 className="text-xl font-light text-foreground mb-1">
              {page.formHeading}
            </h3>
            <p className="text-base text-muted font-light leading-relaxed mb-8">
              {page.formDescription}
            </p>
            <PalmistryUploadForm />
          </div>
        </div>
        <BrushStrokeDivider tone="ink" size="md" surface="card" />
      </section>
    </>
  );
}
