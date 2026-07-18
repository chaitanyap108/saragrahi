import Script from "next/script";
import BrushStrokeDivider from "../components/BrushStrokeDivider";

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
export default function ServicesPage() {
  return (
    <>
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-10 text-center bg-background">
        <p className="label-inscription mb-4">Services &amp; Bookings</p>
        <h1 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-6">
          Work With Us
        </h1>
        <p className="text-lg text-muted leading-relaxed max-w-xl mx-auto">
          Two practitioners, one sanctuary. Explore clinical therapy, Vedic
          sciences, and sacred readings — each offering a different door to the
          same wholeness.
        </p>
      </section>

      <BrushStrokeDivider tone="accent" size="sm" surface="background" />

      {/* ══════════════════════════════════════════════════════════════════
          BLOCK 1 — Bhima-Karma · Palmistry
      ══════════════════════════════════════════════════════════════════ */}
      <section id="palmistry" className="pt-2 md:pt-3 pb-20 px-6 lg:px-10 bg-card scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <p className="text-xs tracking-[0.45em] uppercase text-accent mb-3 font-medium">
              Practitioner · Bhima-Karma
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-foreground tracking-wide mb-2">
              Bhima-Karma
            </h2>
            <p className="text-base tracking-[0.2em] uppercase text-muted mb-6 font-medium">
              Palmistry &amp; Vedic Hand Analysis
            </p>
            <div className="divider-brush mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-muted font-light leading-relaxed text-base mb-8">
              <div className="space-y-4">
                <p>
                  Bhima-Karma&rsquo;s palmistry practice draws on decades of
                  study in the Vedic science of hand analysis — reading not just
                  the lines of the hand, but the living architecture of a
                  person&rsquo;s life, character, and dharmic potential.
                </p>
                <p>
                  Through the ancient discipline of sacred hand reading, he
                  illuminates temperament, life cycles, and the subtle currents
                  shaping your path — offering clarity grounded in embodied
                  wisdom.
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  A palmistry reading is a direct, standalone service. Through
                  careful analysis of the lines, mounts, and formation of the
                  hand, Bhima-Karma reveals the deeper patterns at work in your
                  life — with precision, care, and rare depth of insight.
                </p>
                <p>
                  Payment confirms your booking and you will be guided
                  immediately through the photo submission process. No discovery
                  call required.
                </p>
              </div>
            </div>

            <TagStrip
              tags={[
                "Palmistry",
                "Vedic Hand Analysis",
                "Sacred Reading",
                "Direct Booking",
              ]}
            />
          </div>

          <div className="bg-background p-8 shadow-manuscript">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <p className="text-xs tracking-[0.45em] uppercase text-accent mb-2 font-medium">
                  Sacred Reading
                </p>
                <h3 className="text-2xl font-light text-foreground mb-1">
                  Book a Palmistry Reading
                </h3>
                <p className="text-xs tracking-[0.2em] uppercase text-muted font-medium">
                  Vedic Hand Analysis · Direct Booking
                </p>
              </div>
              <span className="text-[11px] tracking-[0.2em] uppercase border border-accent/60 text-accent px-3 py-1.5 font-medium self-start whitespace-nowrap">
                No Discovery Call Required
              </span>
            </div>

            <CompactAcuityEmbed
              clipped
              src="https://app.acuityscheduling.com/schedule.php?owner=14259136&appointmentType=28700185"
            />
          </div>
        </div>
      </section>

      <BrushStrokeDivider tone="accent" size="md" surface="card" />

      {/* ══════════════════════════════════════════════════════════════════
          BLOCK 2 — Therapy & Next Steps
      ══════════════════════════════════════════════════════════════════ */}
      <section id="therapy" className="pt-2 md:pt-3 pb-20 px-6 lg:px-10 bg-card scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <p className="text-xs tracking-[0.45em] uppercase text-accent mb-3 font-medium">
              Practitioner · Bhima-Karma
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-foreground tracking-wide mb-2">
              Bhima-Karma
            </h2>
            <p className="text-base tracking-[0.2em] uppercase text-muted mb-6 font-medium">
              Trauma Consulting · Somatic Therapy
            </p>
            <div className="divider-brush mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-muted font-light leading-relaxed text-base mb-8">
              <div className="space-y-4">
                <p>
                  Bhima-Karma brings a deep background in trauma-informed
                  consulting and somatic therapy. His approach is direct,
                  embodied, and grounded — designed for those navigating complex
                  trauma, life transitions, or the intersection of psychological
                  and spiritual crisis.
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  His consulting sessions offer a focused, practical container
                  for working through what cannot easily be spoken — drawing on
                  the body&rsquo;s intelligence as much as the mind&rsquo;s.
                  All enquiries are held with full confidentiality and care.
                </p>
              </div>
            </div>

            <TagStrip
              tags={[
                "Trauma Consulting",
                "Somatic Therapy",
                "Complex PTSD",
                "Life Transitions",
              ]}
            />
          </div>

          <div className="bg-background p-8 shadow-manuscript">
            <p className="text-xs tracking-[0.35em] uppercase text-accent mb-2 font-medium">
              Book with Bhima-Karma
            </p>
            <h3 className="text-2xl font-light text-foreground mb-2">
              Trauma Consulting Session
            </h3>
            <p className="text-base text-muted font-light leading-relaxed max-w-lg mb-8">
              Begin with an initial consultation to explore your situation and
              what support might look like.
            </p>
            <CompactAcuityEmbed
              clipped
              src="https://app.acuityscheduling.com/schedule.php?owner=14259136&appointmentType=94852568"
            />
          </div>
        </div>
      </section>

      <BrushStrokeDivider tone="ink" size="md" mirrored surface="card" />

      {/* ══════════════════════════════════════════════════════════════════
          BLOCK 3 — Mridanga
      ══════════════════════════════════════════════════════════════════ */}
      <section id="mridanga" className="pt-2 md:pt-3 pb-16 px-6 lg:px-10 bg-background scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card p-10 md:p-12 text-center shadow-manuscript">
            <p className="text-xs tracking-[0.45em] uppercase text-accent mb-3 font-medium">
              Practitioner · Bhima-Karma
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-foreground tracking-wide mb-4">
              Traditional Mridanga &amp; Sanskrit
            </h2>
            <div className="divider-brush divider-brush-center mb-6" />
            <p className="text-base text-muted font-light leading-relaxed max-w-lg mx-auto mb-8">
              Bhima-Karma holds a living lineage in traditional mridanga and
              foundational Sanskrit — offering rare, authentic transmission to
              sincere students through sacred sound and rhythm.
            </p>
            <a
              href="https://mridanga.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-9 py-3.5 bg-accent text-on-dark text-xs tracking-[0.2em] uppercase hover:bg-accent-hover transition-colors duration-300"
            >
              Visit Mridanga
            </a>
          </div>
        </div>
      </section>

      <BrushStrokeDivider tone="accent" size="md" surface="background" />

      {/* ══════════════════════════════════════════════════════════════════
          BLOCK 4 — Caitanya Lila
      ══════════════════════════════════════════════════════════════════ */}
      <section id="caitanya" className="pt-2 md:pt-3 pb-20 px-6 lg:px-10 bg-card scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <p className="text-xs tracking-[0.45em] uppercase text-accent mb-3 font-medium">
              Practitioner · Caitanya Lila
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-foreground tracking-wide mb-2">
              Caitanya Lila
            </h2>
            <p className="text-base tracking-[0.2em] uppercase text-muted mb-6 font-medium">
              Vedic Psychotherapy
            </p>
            <div className="divider-brush mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-muted font-light leading-relaxed text-base mb-8">
              <div className="space-y-4">
                <p>
                  Caitanya Lila is a UKCP-registered psychotherapist whose
                  practice weaves clinical depth with the ancient wisdom of
                  Vedic psychology. Her approach meets the modern mind with
                  clinical precision while honouring the soul&rsquo;s deeper
                  intelligence.
                </p>
                <p>
                  Her work draws on somatic awareness, trauma-informed
                  frameworks, and a profound understanding of how the inner
                  landscape mirrors the outer life — creating space for genuine
                  transformation.
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  Sessions offer a held space for trauma recovery, relational
                  depth, and the exploration of self through both clinical and
                  Vedic psychological frameworks.
                </p>
                <p>
                  Whether you seek clinical support or an integration of
                  Western and Vedic approaches, her practice holds space for the
                  whole person.
                </p>
              </div>
            </div>

            <TagStrip
              tags={[
                "UKCP Psychotherapy",
                "Trauma Therapy",
                "Vedic Psychology",
                "Somatic Work",
                "Life Guidance",
              ]}
            />
          </div>

          <div className="bg-background p-8 text-center shadow-manuscript">
            <p className="text-xs tracking-[0.35em] uppercase text-accent mb-2 font-medium">
              Work with Caitanya Lila
            </p>
            <h3 className="text-2xl font-light text-foreground mb-4">
              Psychotherapy Consultations
            </h3>
            <p className="text-base text-muted font-light leading-relaxed max-w-lg mx-auto mb-8">
              Explore clinical therapy and Vedic psychology through Caitanya
              Lila&rsquo;s dedicated practice — booking and enquiries are
              handled directly on her website.
            </p>
            <a
              href="https://trikayapsychology.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-9 py-3.5 bg-accent text-on-dark text-xs tracking-[0.2em] uppercase hover:bg-accent-hover transition-colors duration-300"
            >
              Visit Trikaya Psychology
            </a>
          </div>
        </div>
      </section>

      <BrushStrokeDivider tone="ink" size="lg" mirrored surface="card" />

      {/* ══════════════════════════════════════════════════════════════════
          Sangas & Community Events
      ══════════════════════════════════════════════════════════════════ */}
      <section id="sangas" className="pt-2 md:pt-3 pb-0 px-6 lg:px-10 bg-background scroll-mt-20">
        <div className="max-w-4xl mx-auto pb-12 md:pb-14">
          <div className="bg-card p-10 md:p-12 text-center shadow-manuscript">
            <p className="text-xs tracking-[0.45em] uppercase text-accent mb-3 font-medium">
              Community &amp; Practice
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-foreground tracking-wide mb-4">
              Sat Sangas &amp; Events
            </h2>
            <div className="divider-brush divider-brush-center mb-6" />
            <p className="text-base text-muted font-light leading-relaxed max-w-lg mx-auto mb-8">
              Monthly gatherings, study circles, and community events hosted by
              Bhima-Karma and Caitanya Lila — spaces to practice, reflect, and
              connect.
            </p>
            <a
              href="/sangas"
              className="inline-block px-9 py-3.5 bg-accent text-on-dark text-xs tracking-[0.2em] uppercase hover:bg-accent-hover transition-colors duration-300"
            >
              View Upcoming Sangas
            </a>
          </div>
        </div>
        <BrushStrokeDivider tone="ink" size="md" surface="background" />
      </section>
    </>
  );
}
