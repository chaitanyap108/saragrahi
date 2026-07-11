import { UPCOMING_SANGAS } from "@/app/lib/site-config";
import Link from "next/link";
import BrushStrokeDivider from "../components/BrushStrokeDivider";
import GoldOrnament from "../components/GoldOrnament";

const EVENT_TYPE_STYLES = {
  "Sat Sanga": "border-gold/50 text-gold-deep",
  "Community Event": "border-muted/40 text-muted",
  Workshop: "border-foreground/40 text-foreground",
} as const;

export default function SangasPage() {
  return (
    <>
      <section className="py-20 px-6 lg:px-10 text-center bg-background">
        <p className="label-inscription mb-4">Community &amp; Practice</p>
        <h1 className="text-4xl md:text-5xl font-light text-foreground tracking-tight">
          Sat Sangas &amp; Events
        </h1>
        <GoldOrnament className="mt-6 mb-6" size="sm" />
        <p className="text-base text-muted font-light leading-relaxed max-w-xl mx-auto">
          Sacred gatherings, study circles, and community events — spaces to
          practice, reflect, and connect with fellow seekers on the path.
        </p>
      </section>

      <BrushStrokeDivider tone="accent" size="md" />

      <section className="py-20 px-6 lg:px-10 bg-card">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {UPCOMING_SANGAS.map((event) => (
              <article
                key={event.id}
                className="bg-background p-8 md:p-10 shadow-manuscript hover:shadow-manuscript-lift transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                  <div>
                    <span
                      className={`inline-block text-[9px] tracking-[0.15em] uppercase border px-2.5 py-1 font-medium mb-3 ${EVENT_TYPE_STYLES[event.type]}`}
                    >
                      {event.type}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-light text-foreground tracking-wide">
                      {event.title}
                    </h2>
                  </div>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-accent font-medium whitespace-nowrap">
                    Hosted by {event.host}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-6 text-sm text-muted font-light">
                  <p>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-accent font-medium block mb-1">
                      When
                    </span>
                    {event.date}
                  </p>
                  <p>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-accent font-medium block mb-1">
                      Where
                    </span>
                    {event.location}
                  </p>
                </div>

                <p className="text-muted font-light leading-relaxed text-sm mb-8">
                  {event.description}
                </p>

                <a
                  href={event.cta.href}
                  {...("external" in event.cta && event.cta.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="inline-block px-9 py-3.5 bg-accent text-on-dark text-[11px] tracking-[0.2em] uppercase hover:bg-accent-hover transition-colors duration-300"
                >
                  {event.cta.label}
                  {"external" in event.cta && event.cta.external
                    ? "\u00a0↗"
                    : ""}
                </a>
              </article>
            ))}
          </div>

          <BrushStrokeDivider tone="ink" size="sm" className="!py-12" />

          <div className="bg-card p-10 text-center shadow-manuscript">
            <p className="text-[10px] tracking-[0.45em] uppercase text-accent mb-3 font-medium">
              Stay Connected
            </p>
            <h2 className="text-xl md:text-2xl font-light text-foreground tracking-wide mb-4">
              Want to hear about future gatherings?
            </h2>
            <p className="text-sm text-muted font-light leading-relaxed max-w-md mx-auto mb-8">
              Follow us on social media or explore our services to find the right
              door into the Saragrahi community.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/services"
                className="inline-block px-9 py-3.5 bg-accent text-on-dark text-[11px] tracking-[0.2em] uppercase hover:bg-accent-hover transition-colors duration-300"
              >
                Explore Services
              </Link>
              <Link
                href="/about"
                className="inline-block px-9 py-3.5 border border-accent text-accent text-[11px] tracking-[0.2em] uppercase hover:bg-accent hover:text-on-dark transition-colors duration-300"
              >
                Meet the Practitioners
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
