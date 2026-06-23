import Script from "next/script";

// ─── Reusable iframe placeholder ─────────────────────────────────────────────
function AcuityPlaceholder({ label }: { label: string }) {
  return (
    <div className="w-full min-h-[420px] bg-white border border-[#e8e4de] flex items-center justify-center">
      <div className="text-center px-6">
        <div className="w-8 h-px bg-[#c4b89a] mx-auto mb-5" />
        <p className="text-xs tracking-[0.3em] uppercase text-[#94a3b8] font-medium mb-2">
          Acuity Scheduling
        </p>
        <p className="text-sm text-[#64748b] font-light">{label}</p>
        <p className="text-[10px] text-[#94a3b8] mt-2 font-light tracking-wide">
          Calendar iframe will appear here
        </p>
      </div>
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
          PRACTITIONER 01 — Caitanya Lila
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Bio header */}
          <div className="mb-10">
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#8b7355] mb-3 font-medium">
              Practitioner · 01
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

          {/* Booking block */}
          <div className="border border-[#e8e4de] bg-[#fcfbf9] p-8 mt-10">
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#8b7355] mb-2 font-medium">
              Book with Caitanya Lila
            </p>
            <h3 className="text-2xl font-light text-[#334155] mb-2">
              Free 30-Minute Discovery Call
            </h3>
            <p className="text-sm text-[#64748b] font-light leading-relaxed max-w-lg mb-8">
              Begin with a complimentary discovery call to explore whether
              working together is the right fit. No commitment required — simply
              an open conversation.
            </p>
            <AcuityPlaceholder label="Caitanya Lila — Discovery Call" />
          </div>
        </div>
      </section>

      {/* Decorative section divider */}
      <div className="h-px bg-[#e8e4de]" />
      <div className="h-3 bg-[#f0ece6]" />
      <div className="h-px bg-[#e8e4de]" />

      {/* ══════════════════════════════════════════════════════════════════
          PRACTITIONER 02 — Bhima-Karma
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Bio header */}
          <div className="mb-10">
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#8b7355] mb-3 font-medium">
              Practitioner · 02
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-[#334155] tracking-wide mb-2">
              Bhima-Karma
            </h2>
            <p className="text-sm tracking-[0.2em] uppercase text-[#64748b] mb-6 font-medium">
              Trauma Consulting &amp; Palmistry
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
                <p>
                  His consulting sessions offer a focused, practical container
                  for working through what cannot easily be spoken — drawing on
                  the body&rsquo;s intelligence as much as the mind&rsquo;s.
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  Beyond clinical work, Bhima-Karma is a senior teacher of the
                  sacred arts, holding lineage in traditional mridanga and
                  Sanskrit — an embodied transmission rarely available outside
                  ashram environments.
                </p>
                <p>
                  His palmistry practice draws on decades of study in Vedic
                  hand analysis — reading not just the lines of the hand, but
                  the living architecture of a person&rsquo;s life and
                  character.
                </p>
              </div>
            </div>

            <TagStrip
              tags={[
                "Trauma Consulting",
                "Somatic Therapy",
                "Palmistry",
                "Vedic Hand Analysis",
                "Sacred Arts",
                "Mridanga",
              ]}
            />
          </div>

          {/* Therapy booking block */}
          <div className="border border-[#e8e4de] bg-[#fcfbf9] p-8 mb-8">
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#8b7355] mb-2 font-medium">
              Book with Bhima-Karma
            </p>
            <h3 className="text-2xl font-light text-[#334155] mb-2">
              Trauma Consulting Session
            </h3>
            <p className="text-sm text-[#64748b] font-light leading-relaxed max-w-lg mb-8">
              Begin with an initial consultation to explore your situation and
              what support might look like. All enquiries are held with full
              confidentiality and care.
            </p>
            {/* Acuity embed — Trauma Consulting Session */}
            <iframe
              src="https://app.acuityscheduling.com/schedule.php?owner=14259136&appointmentType=94852568"
              width="100%"
              height="800"
              frameBorder="0"
              allow="payment"
            />
            <Script
              src="https://embed.acuityscheduling.com/js/embed.js"
              strategy="afterInteractive"
            />
          </div>

          {/* ── Palmistry card ──────────────────────────────────────────── */}
          <div className="border border-[#c4b89a] bg-[#fcfbf9] p-8">
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <p className="text-[10px] tracking-[0.45em] uppercase text-[#8b7355] mb-2 font-medium">
                  Sacred Reading
                </p>
                <h3 className="text-2xl font-light text-[#334155] mb-1">
                  Palmistry Reading
                </h3>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#64748b] font-medium">
                  Vedic Hand Analysis · Direct Booking
                </p>
              </div>
              <span className="text-[9px] tracking-[0.2em] uppercase border border-[#8b7355]/60 text-[#8b7355] px-3 py-1.5 font-medium self-start whitespace-nowrap">
                No Discovery Call Required
              </span>
            </div>

            <p className="text-sm text-[#64748b] font-light leading-relaxed mb-3 max-w-2xl">
              A palmistry reading with Bhima-Karma is a direct, standalone
              service. Through the ancient Vedic science of hand analysis, he
              reads the lines, mounts, and formation of the hand to reveal the
              subtle currents of your character, life cycles, and deeper path.
            </p>
            <p className="text-sm text-[#64748b] font-light leading-relaxed italic mb-8 max-w-xl">
              This service is booked directly — payment confirms your booking
              and you will be guided immediately through the photo submission
              process.
            </p>

            {/* Horizontal rule */}
            <div className="w-full h-px bg-[#e8e4de] mb-8" />

            {/* Acuity embed — Sacred Palmistry Reading */}
            <iframe
              src="https://app.acuityscheduling.com/schedule.php?owner=14259136&appointmentType=28700185"
              width="100%"
              height="800"
              frameBorder="0"
              allow="payment"
            />
            <Script
              src="https://embed.acuityscheduling.com/js/embed.js"
              strategy="afterInteractive"
            />
          </div>
        </div>
      </section>
    </>
  );
}
