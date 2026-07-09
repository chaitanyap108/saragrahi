import { UPCOMING_SANGAS } from "@/app/lib/site-config";
import Link from "next/link";

const EVENT_TYPE_STYLES = {
  "Sat Sanga": "border-[#8b7355]/40 text-[#8b7355]",
  "Community Event": "border-[#64748b]/40 text-[#64748b]",
  Workshop: "border-[#334155]/40 text-[#334155]",
  "Study Group": "border-[#c4b89a] text-[#8b7355]",
} as const;

export default function SangasPage() {
  return (
    <>
      <section className="py-20 px-6 lg:px-10 text-center bg-[#fcfbf9] border-b border-[#e8e4de]">
        <p className="text-[10px] tracking-[0.5em] uppercase text-[#8b7355] mb-4 font-medium">
          Community &amp; Practice
        </p>
        <h1 className="text-4xl md:text-5xl font-light text-[#334155] tracking-tight">
          Sat Sangas &amp; Events
        </h1>
        <div className="w-10 h-px bg-[#8b7355] mx-auto mt-6 mb-6" />
        <p className="text-base text-[#64748b] font-light leading-relaxed max-w-xl mx-auto">
          Sacred gatherings, study circles, and community events — spaces to
          practice, reflect, and connect with fellow seekers on the path.
        </p>
      </section>

      <section className="py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {UPCOMING_SANGAS.map((event) => (
              <article
                key={event.id}
                className="border border-[#e8e4de] bg-[#fcfbf9] p-8 md:p-10 hover:border-[#c4b89a] hover:shadow-[0_4px_24px_rgba(51,65,85,0.06)] transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                  <div>
                    <span
                      className={`inline-block text-[9px] tracking-[0.15em] uppercase border px-2.5 py-1 font-medium mb-3 ${EVENT_TYPE_STYLES[event.type]}`}
                    >
                      {event.type}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-light text-[#334155] tracking-wide">
                      {event.title}
                    </h2>
                  </div>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[#8b7355] font-medium whitespace-nowrap">
                    Hosted by {event.host}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-6 text-sm text-[#64748b] font-light">
                  <p>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#8b7355] font-medium block mb-1">
                      When
                    </span>
                    {event.date}
                  </p>
                  <p>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#8b7355] font-medium block mb-1">
                      Where
                    </span>
                    {event.location}
                  </p>
                </div>

                <p className="text-[#64748b] font-light leading-relaxed text-sm mb-8">
                  {event.description}
                </p>

                <a
                  href={event.cta.href}
                  {...("external" in event.cta && event.cta.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="inline-block px-9 py-3.5 bg-[#334155] text-[#fcfbf9] text-[11px] tracking-[0.2em] uppercase hover:bg-[#475569] transition-colors duration-300"
                >
                  {event.cta.label}
                  {"external" in event.cta && event.cta.external
                    ? "\u00a0↗"
                    : ""}
                </a>
              </article>
            ))}
          </div>

          <div className="mt-16 border border-[#c4b89a] bg-white p-10 text-center">
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#8b7355] mb-3 font-medium">
              Stay Connected
            </p>
            <h2 className="text-xl md:text-2xl font-light text-[#334155] tracking-wide mb-4">
              Want to hear about future gatherings?
            </h2>
            <p className="text-sm text-[#64748b] font-light leading-relaxed max-w-md mx-auto mb-8">
              Follow us on social media or explore our services to find the right
              door into the Saragrahi community.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/services"
                className="inline-block px-9 py-3.5 bg-[#334155] text-[#fcfbf9] text-[11px] tracking-[0.2em] uppercase hover:bg-[#475569] transition-colors duration-300"
              >
                Explore Services
              </Link>
              <Link
                href="/about"
                className="inline-block px-9 py-3.5 border border-[#334155] text-[#334155] text-[11px] tracking-[0.2em] uppercase hover:bg-[#334155] hover:text-[#fcfbf9] transition-colors duration-300"
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
