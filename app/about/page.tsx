// ─── Credential row ───────────────────────────────────────────────────────────
function Credential({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4 border-b border-[#f0ece6] pb-3 last:border-0 last:pb-0">
      <span className="text-[10px] tracking-[0.25em] uppercase text-[#8b7355] font-medium flex-shrink-0 sm:w-36 mb-0.5 sm:mb-0">
        {label}
      </span>
      <span className="text-sm text-[#64748b] font-light">{value}</span>
    </div>
  );
}

// ─── Portrait placeholder ─────────────────────────────────────────────────────
function PortraitPlaceholder({ name }: { name: string }) {
  return (
    <div className="w-full max-w-[280px] aspect-[3/4] bg-[#f0ece6] border border-[#e8e4de] flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-px bg-[#c4b89a] mx-auto mb-4" />
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#94a3b8] font-medium">
          Portrait
        </p>
        <p className="text-[9px] text-[#94a3b8] mt-1.5 font-light">{name}</p>
      </div>
    </div>
  );
}

// ─── About page ───────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-10 text-center bg-[#fcfbf9] border-b border-[#e8e4de]">
        <p className="text-[10px] tracking-[0.5em] uppercase text-[#8b7355] mb-4 font-medium">
          The Practitioners
        </p>
        <h1 className="text-4xl md:text-5xl font-light text-[#334155] tracking-tight">
          Who We Are
        </h1>
        <div className="w-10 h-px bg-[#8b7355] mx-auto mt-6 mb-6" />
        <p className="text-base text-[#64748b] font-light leading-relaxed max-w-xl mx-auto">
          Saragrahi was founded by two practitioners whose paths converged at
          the meeting point of ancient wisdom and contemporary healing.
        </p>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FOUNDER 01 — Bhima-Karma
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 lg:px-10 bg-white border-b border-[#e8e4de]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-16 items-start">
            {/* Left — label + portrait */}
            <div className="flex flex-col items-start gap-6">
              <div>
                <p className="text-[10px] tracking-[0.45em] uppercase text-[#8b7355] mb-2 font-medium">
                  Founder · 01
                </p>
                <h2 className="text-3xl md:text-4xl font-light text-[#334155] tracking-wide">
                  Bhima-Karma
                </h2>
              </div>
              <PortraitPlaceholder name="Bhima-Karma" />
            </div>

            {/* Right — bio, credentials, CTAs */}
            <div className="lg:pt-8">
              <p className="text-sm tracking-[0.2em] uppercase text-[#64748b] mb-6 font-medium">
                Trauma Consultant · Palmist · Teacher of the Sacred Arts
              </p>
              <div className="w-10 h-px bg-[#8b7355] mb-8" />

              <div className="space-y-5 text-[#64748b] font-light leading-relaxed text-sm mb-10">
                <p>
                  Bhima-Karma has spent over two decades working at the
                  intersection of somatic therapy, trauma consulting, and
                  traditional Vedic practice. His therapeutic approach is
                  grounded, embodied, and direct — shaped by years of working
                  with complex trauma, crisis, and the deeper architecture of
                  human suffering.
                </p>
                <p>
                  His palmistry practice draws on extensive study in the Vedic
                  science of hand analysis — a discipline in which the hand is
                  understood not simply as a record of life events, but as an
                  expression of one&rsquo;s entire constitutional nature:
                  temperament, timing, and dharmic potential.
                </p>
                <p>
                  As a senior teacher of the sacred arts, Bhima-Karma holds a
                  living lineage in traditional mridanga and foundational
                  Sanskrit — offering rare, authentic transmission to sincere
                  students. His teaching is not academic but deeply
                  experiential, shaped by the rhythms of genuine sadhana.
                </p>
              </div>

              {/* Credentials */}
              <div className="space-y-3 mb-10">
                <Credential
                  label="Specialisation"
                  value="Somatic Trauma Therapy · Complex PTSD Consulting"
                />
                <Credential
                  label="Vedic Sciences"
                  value="Palmistry — Vedic Hand Analysis"
                />
                <Credential
                  label="Sacred Arts"
                  value="Traditional Mridanga · Foundational Sanskrit"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/services"
                  className="inline-block px-9 py-3.5 bg-[#334155] text-[#fcfbf9] text-[11px] tracking-[0.2em] uppercase hover:bg-[#475569] transition-colors duration-300"
                >
                  Book with Bhima-Karma
                </a>
                <a
                  href="https://mridanga.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-9 py-3.5 border border-[#334155] text-[#334155] text-[11px] tracking-[0.2em] uppercase hover:bg-[#334155] hover:text-[#fcfbf9] transition-colors duration-300"
                >
                  Mridanga&nbsp;↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FOUNDER 02 — Caitanya Lila
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 lg:px-10 bg-[#fcfbf9]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-16 items-start">
            {/* Left — label + portrait */}
            <div className="flex flex-col items-start gap-6">
              <div>
                <p className="text-[10px] tracking-[0.45em] uppercase text-[#8b7355] mb-2 font-medium">
                  Founder · 02
                </p>
                <h2 className="text-3xl md:text-4xl font-light text-[#334155] tracking-wide">
                  Caitanya Lila
                </h2>
              </div>
              <PortraitPlaceholder name="Caitanya Lila" />
            </div>

            {/* Right — bio, credentials, CTA */}
            <div className="lg:pt-8">
              <p className="text-sm tracking-[0.2em] uppercase text-[#64748b] mb-6 font-medium">
                Vedic Psychotherapist &amp; Jyotish Practitioner
              </p>
              <div className="w-10 h-px bg-[#8b7355] mb-8" />

              <div className="space-y-5 text-[#64748b] font-light leading-relaxed text-sm mb-10">
                <p>
                  Caitanya Lila is a UKCP-registered psychotherapist with a
                  clinical practice rooted in trauma recovery, relational depth,
                  and somatic awareness. Her training spans integrative
                  psychotherapy, body-based modalities, and the philosophical
                  foundations of Vedic psychology.
                </p>
                <p>
                  Her work is distinguished by a rare capacity to hold both
                  clinical precision and a broader spiritual intelligence —
                  creating a therapeutic field where the Western psychological
                  framework and the Vedic understanding of the self are not in
                  conflict, but in dialogue.
                </p>
                <p>
                  As a Jyotish practitioner, Caitanya offers Vedic astrology
                  consultations that read the deeper architecture of a
                  person&rsquo;s life — dharma, karma, the turning of cycles —
                  with care and specificity. Her readings are sought for their
                  depth, accuracy, and compassionate clarity.
                </p>
              </div>

              {/* Credentials */}
              <div className="space-y-3 mb-10">
                <Credential
                  label="Registration"
                  value="UKCP — United Kingdom Council for Psychotherapy"
                />
                <Credential
                  label="Modalities"
                  value="Integrative Psychotherapy · Somatic Trauma Therapy"
                />
                <Credential
                  label="Vedic Sciences"
                  value="Jyotish (Vedic Astrology) · Vedic Psychology"
                />
              </div>

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
        </div>
      </section>

      {/* ── Closing quote ───────────────────────────────────────────────── */}
      <section className="py-16 px-6 lg:px-10 bg-white border-t border-[#e8e4de]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-10 h-px bg-[#8b7355] mx-auto mb-8" />
          <blockquote className="text-lg md:text-xl font-light text-[#475569] leading-relaxed italic">
            &ldquo;The aim is not to fix what is broken, but to restore what is
            whole.&rdquo;
          </blockquote>
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#8b7355] mt-6 font-medium">
            Saragrahi
          </p>
        </div>
      </section>
    </>
  );
}
