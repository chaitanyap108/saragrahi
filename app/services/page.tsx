import Script from "next/script";

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
      <div className="w-full relative h-[280px] max-h-[280px] overflow-y-auto overflow-x-hidden border border-[#e8e4de] bg-white overscroll-contain">
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
    <div className="w-full max-h-[500px] h-[500px] overflow-y-auto border border-[#e8e4de] bg-white">
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
          className="text-[9px] tracking-[0.15em] uppercase border border-[#e8e4de] text-[#64748b] px-3 py-1.5"
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
      <section className="py-20 px-6 lg:px-10 text-center bg-[#fcfbf9] border-b border-[#e8e4de]">
        <p className="text-[10px] tracking-[0.5em] uppercase text-[#8b7355] mb-4 font-medium">
          Services &amp; Bookings
        </p>
        <h1 className="text-4xl md:text-5xl font-light text-[#334155] tracking-tight">
          Work With Us
        </h1>
        <div className="w-10 h-px bg-[#8b7355] mx-auto mt-6 mb-6" />
        <p className="text-base text-[#64748b] font-light leading-relaxed max-w-xl mx-auto">
          Two practitioners, one sanctuary. Explore clinical therapy, Vedic
          sciences, and sacred readings — each offering a different door to the
          same wholeness.
        </p>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          BLOCK 1 — Bhima-Karma · Palmistry
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#8b7355] mb-3 font-medium">
              Practitioner · 01
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-[#334155] tracking-wide mb-2">
              Bhima-Karma
            </h2>
            <p className="text-sm tracking-[0.2em] uppercase text-[#64748b] mb-6 font-medium">
              Palmistry &amp; Vedic Hand Analysis
            </p>
            <div className="w-10 h-px bg-[#8b7355] mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#64748b] font-light leading-relaxed text-sm mb-8">
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

          <div className="border border-[#c4b89a] bg-[#fcfbf9] p-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <p className="text-[10px] tracking-[0.45em] uppercase text-[#8b7355] mb-2 font-medium">
                  Sacred Reading
                </p>
                <h3 className="text-2xl font-light text-[#334155] mb-1">
                  Book a Palmistry Reading
                </h3>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#64748b] font-medium">
                  Vedic Hand Analysis · Direct Booking
                </p>
              </div>
              <span className="text-[9px] tracking-[0.2em] uppercase border border-[#8b7355]/60 text-[#8b7355] px-3 py-1.5 font-medium self-start whitespace-nowrap">
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

      <div className="h-px bg-[#e8e4de]" />
      <div className="h-3 bg-[#f0ece6]" />
      <div className="h-px bg-[#e8e4de]" />

      {/* ══════════════════════════════════════════════════════════════════
          BLOCK 2 — Therapy & Next Steps
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#8b7355] mb-3 font-medium">
              Therapy &amp; Next Steps
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-[#334155] tracking-wide mb-2">
              Trauma Consulting
            </h2>
            <p className="text-sm tracking-[0.2em] uppercase text-[#64748b] mb-6 font-medium">
              Somatic Therapy · Clinical Support
            </p>
            <div className="w-10 h-px bg-[#8b7355] mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#64748b] font-light leading-relaxed text-sm mb-8">
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

          <div className="border border-[#e8e4de] bg-[#fcfbf9] p-8">
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#8b7355] mb-2 font-medium">
              Book with Bhima-Karma
            </p>
            <h3 className="text-2xl font-light text-[#334155] mb-2">
              Trauma Consulting Session
            </h3>
            <p className="text-sm text-[#64748b] font-light leading-relaxed max-w-lg mb-8">
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

      <div className="h-px bg-[#e8e4de]" />
      <div className="h-3 bg-[#f0ece6]" />
      <div className="h-px bg-[#e8e4de]" />

      {/* ══════════════════════════════════════════════════════════════════
          BLOCK 3 — Mridanga
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 lg:px-10 bg-[#fcfbf9]">
        <div className="max-w-4xl mx-auto">
          <div className="border border-[#c4b89a] bg-white p-10 md:p-12 text-center">
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#8b7355] mb-3 font-medium">
              The Sacred Arts
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-[#334155] tracking-wide mb-4">
              Traditional Mridanga &amp; Sanskrit
            </h2>
            <div className="w-10 h-px bg-[#8b7355] mx-auto mb-6" />
            <p className="text-sm text-[#64748b] font-light leading-relaxed max-w-lg mx-auto mb-8">
              Bhima-Karma holds a living lineage in traditional mridanga and
              foundational Sanskrit — offering rare, authentic transmission to
              sincere students through sacred sound and rhythm.
            </p>
            <a
              href="https://mridanga.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-9 py-3.5 bg-[#334155] text-[#fcfbf9] text-[11px] tracking-[0.2em] uppercase hover:bg-[#475569] transition-colors duration-300"
            >
              Visit Mridanga&nbsp;↗
            </a>
          </div>
        </div>
      </section>

      <div className="h-px bg-[#e8e4de]" />
      <div className="h-3 bg-[#f0ece6]" />
      <div className="h-px bg-[#e8e4de]" />

      {/* ══════════════════════════════════════════════════════════════════
          BLOCK 4 — Caitanya Lila
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#8b7355] mb-3 font-medium">
              Practitioner · 02
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-[#334155] tracking-wide mb-2">
              Caitanya Lila
            </h2>
            <p className="text-sm tracking-[0.2em] uppercase text-[#64748b] mb-6 font-medium">
              Vedic Psychotherapy &amp; Jyotish Astrology
            </p>
            <div className="w-10 h-px bg-[#8b7355] mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#64748b] font-light leading-relaxed text-sm mb-8">
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
                  As a Jyotish practitioner, she offers Vedic astrology
                  consultations that illuminate the deeper architecture of your
                  life — your dharma, your cycles, and the subtle currents
                  shaping your path.
                </p>
                <p>
                  Whether you seek clinical support, astrological guidance, or
                  an integration of both, her sessions hold space for the whole
                  person.
                </p>
              </div>
            </div>

            <TagStrip
              tags={[
                "UKCP Psychotherapy",
                "Trauma Therapy",
                "Vedic Astrology",
                "Jyotish",
                "Somatic Work",
                "Life Guidance",
              ]}
            />
          </div>

          <div className="border border-[#e8e4de] bg-[#fcfbf9] p-8 text-center">
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#8b7355] mb-2 font-medium">
              Work with Caitanya Lila
            </p>
            <h3 className="text-2xl font-light text-[#334155] mb-4">
              Psychotherapy &amp; Jyotish Consultations
            </h3>
            <p className="text-sm text-[#64748b] font-light leading-relaxed max-w-lg mx-auto mb-8">
              Explore clinical therapy and Vedic astrology through Caitanya
              Lila&rsquo;s dedicated practice — booking and enquiries are
              handled directly on her website.
            </p>
            <a
              href="https://trikayapsychology.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-9 py-3.5 bg-[#334155] text-[#fcfbf9] text-[11px] tracking-[0.2em] uppercase hover:bg-[#475569] transition-colors duration-300"
            >
              Visit Trikaya Psychology&nbsp;↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
