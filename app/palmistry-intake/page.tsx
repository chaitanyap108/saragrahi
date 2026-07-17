import PalmistryUploadForm from "../components/PalmistryUploadForm";
import BrushStrokeDivider from "../components/BrushStrokeDivider";

// ─── Photo quality examples ───────────────────────────────────────────────────
function PhotoExampleCard({
  type,
}: {
  type: "good" | "bad";
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
            {isGood ? "Example photo" : "Example photo"}
          </p>
          <p
            className={`text-[11px] mt-1 font-light ${
              isGood ? "text-muted" : "text-placeholder"
            }`}
          >
            {isGood
              ? "Well-lit, flat, clear lines"
              : "Dark, blurry, angled shot"}
          </p>
        </div>
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
            {isGood ? "Perfect Submission" : "Rejected Submission"}
          </p>
          <p className="text-xs text-muted font-light leading-relaxed">
            {isGood
              ? "Bright, even light — palm flat and relaxed, all lines clearly defined, shot from directly above."
              : "Dark, blurry, or taken at an angle. Lines are obscured, shadows cross the palm. Will be returned."}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PalmistryIntakePage() {
  const REQUIREMENTS = [
    {
      n: "01",
      text: "Photograph both hands — right and left — with the palm facing upward toward the camera.",
    },
    {
      n: "02",
      text: "Use natural daylight or bright, even artificial light. Avoid shadows crossing the palm.",
    },
    {
      n: "03",
      text: "Hold the camera directly above the palm, parallel to the hand — no angle.",
    },
    {
      n: "04",
      text: "Keep the hand relaxed and flat. All fingers should be gently extended, not splayed or bent.",
    },
    {
      n: "05",
      text: "Capture at minimum 10 megapixels. Zoom so the hand fills approximately 80% of the frame.",
    },
  ];

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-10 text-center bg-background">
        <p className="text-xs tracking-[0.5em] uppercase text-accent mb-4 font-medium">
          Palmistry Reading
        </p>
        <h1 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-6">
          Submit Your Palm Photos
        </h1>
        <div className="divider-brush divider-brush-center mb-6" />
        <p className="text-base text-muted font-light leading-relaxed max-w-xl mx-auto">
          Thank you for booking a palmistry reading with Bhima-Karma. Please
          read the instructions below carefully —{" "}
          <strong className="font-medium text-muted">
            the depth of your reading depends entirely on the clarity of your
            photographs.
          </strong>
        </p>
      </section>

      <BrushStrokeDivider tone="accent" size="md" />

      {/* ── Instructions + visual guide + form ──────────────────────────── */}
      <section className="py-20 px-6 lg:px-10 bg-card">
        <div className="max-w-3xl mx-auto">
          {/* Requirements */}
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.45em] uppercase text-accent mb-3 font-medium">
              Before You Upload
            </p>
            <h2 className="text-2xl font-light text-foreground">
              Photo Requirements
            </h2>
          </div>

          <ol className="space-y-3 mb-16" aria-label="Photo requirements">
            {REQUIREMENTS.map(({ n, text }) => (
              <li
                key={n}
                className="flex gap-5 items-start px-6 py-4 bg-background shadow-manuscript"
              >
                <span className="text-sm tracking-[0.3em] text-accent font-semibold flex-shrink-0 mt-0.5">
                  {n}
                </span>
                <p className="text-base text-muted font-light leading-relaxed">
                  {text}
                </p>
              </li>
            ))}
          </ol>

          {/* Visual guide */}
          <div className="mb-16">
            <h3 className="text-center text-lg font-light text-foreground mb-2">
              Visual Guide
            </h3>
            <p className="text-center text-base text-placeholder font-light mb-8">
              Add your own example images to the{" "}
              <code className="text-xs bg-surface px-1.5 py-0.5">
                public/
              </code>{" "}
              folder and replace the placeholders below.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <PhotoExampleCard type="good" />
              <PhotoExampleCard type="bad" />
            </div>
          </div>

          {/* Upload form card */}
          <div className="bg-background p-8 shadow-manuscript">
            <p className="text-xs tracking-[0.4em] uppercase text-accent mb-2 font-medium">
              Photo Submission
            </p>
            <h3 className="text-xl font-light text-foreground mb-1">
              Upload Your Photos
            </h3>
            <p className="text-base text-muted font-light leading-relaxed mb-8">
              Both palms are required. Ensure you have read the requirements
              above before submitting.
            </p>
            <PalmistryUploadForm />
          </div>
        </div>
      </section>
    </>
  );
}
