"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SERVICE_NAV_ITEMS } from "@/app/lib/site-config";

const NAV_LINKS = [
  { label: "Home", href: "/", external: false },
  { label: "About", href: "/about", external: false },
  { label: "Sangas", href: "/sangas", external: false },
  { label: "Contact Us", href: "/contact", external: false },
] as const;

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const closeMobile = () => {
    setIsOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <header className="sticky top-0 z-[60] bg-background edge-brush">
      <nav className="max-w-6xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between gap-10 md:gap-16 lg:gap-20">
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <Image
            src="/navbarlogonotext.png"
            alt="Saragrahi logo"
            width={96}
            height={96}
            priority
            className="nav-logo object-contain transition-opacity duration-200 group-hover:opacity-85"
          />
          <span className="font-inscription text-sm font-medium tracking-[0.32em] text-foreground uppercase">
            Sāragrāhi
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-7 shrink-0">
          <Link
            href="/"
            className="text-xs tracking-[0.25em] uppercase text-muted hover:text-foreground transition-colors duration-200 font-medium"
          >
            Home
          </Link>

          {NAV_LINKS.slice(1, 2).map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs tracking-[0.25em] uppercase text-muted hover:text-foreground transition-colors duration-200 font-medium"
            >
              {link.label}
            </Link>
          ))}

          {/* Services: label links to page, chevron opens anchored submenu */}
          <div
            className="relative flex items-center"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              href="/services"
              className="text-xs tracking-[0.25em] uppercase text-muted hover:text-foreground transition-colors duration-200 font-medium"
            >
              Services
            </Link>
            <button
              type="button"
              className="ml-1 p-0.5 text-muted hover:text-foreground transition-colors duration-200"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              aria-label="Show service links"
              onClick={() => setServicesOpen((prev) => !prev)}
            >
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>

            {servicesOpen && (
              <div className="absolute top-full right-0 pt-3">
                <div className="min-w-[480px] bg-card shadow-manuscript-lift py-2 grid grid-cols-2 divide-x divide-border/50">
                  {/* Bhima-Karma column */}
                  <div>
                    <div className="px-5 pt-2 pb-1 text-xs tracking-[0.18em] uppercase text-foreground font-semibold border-b border-border/50">
                      Bhima-Karma
                    </div>
                    <Link href="/services#palmistry" className="block px-5 py-2.5 text-xs tracking-[0.18em] uppercase text-muted hover:text-foreground hover:bg-surface transition-colors duration-200 font-medium" onClick={() => setServicesOpen(false)}>Palmistry</Link>
                    <Link href="/services#trauma" className="block px-5 py-2.5 text-xs tracking-[0.18em] uppercase text-muted hover:text-foreground hover:bg-surface transition-colors duration-200 font-medium" onClick={() => setServicesOpen(false)}>Trauma Therapy</Link>
                    <a href="https://mridanga.com" target="_blank" rel="noopener noreferrer" className="block px-5 py-2.5 text-xs tracking-[0.18em] uppercase text-muted hover:text-foreground hover:bg-surface transition-colors duration-200 font-medium" onClick={() => setServicesOpen(false)}>Traditional Mṛdaṅga Learning</a>
                    <Link href="/sangas" className="block px-5 py-2.5 text-xs tracking-[0.18em] uppercase text-muted hover:text-foreground hover:bg-surface transition-colors duration-200 font-medium" onClick={() => setServicesOpen(false)}>Sat Saṅgas & Events</Link>
                  </div>

                  {/* Chaitanya Lila column */}
                  <div>
                    <div className="px-5 pt-2 pb-1 text-xs tracking-[0.18em] uppercase text-foreground font-semibold border-b border-border/50">
                      Chaitanya Lila
                    </div>
                    <Link href="/services#psychotherapy" className="block px-5 py-2.5 text-xs tracking-[0.18em] uppercase text-muted hover:text-foreground hover:bg-surface transition-colors duration-200 font-medium" onClick={() => setServicesOpen(false)}>Integrative Psychotherapy</Link>
                    <Link href="/services#vedic-astrology" className="block px-5 py-2.5 text-xs tracking-[0.18em] uppercase text-muted hover:text-foreground hover:bg-surface transition-colors duration-200 font-medium" onClick={() => setServicesOpen(false)}>Vedic Astrology Consultation</Link>
                    <Link href="/services#past-life-regressions" className="block px-5 py-2.5 text-xs tracking-[0.18em] uppercase text-muted hover:text-foreground hover:bg-surface transition-colors duration-200 font-medium" onClick={() => setServicesOpen(false)}>Past Life Regressions</Link>
                    <Link href="/sangas" className="block px-5 py-2.5 text-xs tracking-[0.18em] uppercase text-muted hover:text-foreground hover:bg-surface transition-colors duration-200 font-medium" onClick={() => setServicesOpen(false)}>Sat Saṅgas & Events</Link>
                    <a href="https://trikayapsychology.com" target="_blank" rel="noopener noreferrer" className="block px-5 py-2.5 text-xs tracking-[0.18em] uppercase text-muted hover:text-foreground hover:bg-surface transition-colors duration-200 font-medium" onClick={() => setServicesOpen(false)}>Trikaya Psychology Website</a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {NAV_LINKS.slice(2).map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs tracking-[0.25em] uppercase text-muted hover:text-foreground transition-colors duration-200 font-medium"
            >
              {link.label}
            </Link>
          ))}

          <a
            href="https://mridanga.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.25em] uppercase text-muted hover:text-foreground transition-colors duration-200 font-medium"
          >
            Mridanga Sampradaya
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-foreground p-1 hover:opacity-70 transition-opacity"
          aria-label={
            isOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border/50 px-6 py-4 flex flex-col gap-4">
          <Link
            href="/"
            onClick={closeMobile}
            className="text-xs tracking-[0.25em] uppercase text-muted hover:text-foreground transition-colors duration-200 font-medium"
          >
            Home
          </Link>

          <div className="flex items-center justify-between w-full">
            <Link
              href="/services"
              onClick={closeMobile}
              className="text-xs tracking-[0.25em] uppercase text-muted hover:text-foreground transition-colors duration-200 font-medium"
            >
              Services
            </Link>
            <button
              type="button"
              className="p-1 text-muted hover:text-foreground transition-colors duration-200"
              aria-expanded={mobileServicesOpen}
              aria-label="Show service links"
              onClick={() => setMobileServicesOpen((prev) => !prev)}
            >
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>
          {mobileServicesOpen && (
            <div className="ml-4 flex flex-col gap-3 border-l border-accent-light/50 pl-4 -mt-2">
              <div className="text-xs tracking-[0.18em] uppercase text-foreground font-semibold">Bhima-Karma</div>
              <Link href="/services#palmistry" onClick={closeMobile} className="text-xs tracking-[0.18em] uppercase text-muted hover:text-foreground transition-colors duration-200 font-medium">Palmistry</Link>
              <Link href="/services#trauma" onClick={closeMobile} className="text-xs tracking-[0.18em] uppercase text-muted hover:text-foreground transition-colors duration-200 font-medium">Trauma Therapy</Link>
              <a href="https://mridanga.com" target="_blank" rel="noopener noreferrer" onClick={closeMobile} className="text-xs tracking-[0.18em] uppercase text-muted hover:text-foreground transition-colors duration-200 font-medium">Traditional Mṛdaṅga Learning</a>
              <Link href="/sangas" onClick={closeMobile} className="text-xs tracking-[0.18em] uppercase text-muted hover:text-foreground transition-colors duration-200 font-medium">Sat Saṅgas & Events</Link>

              <div className="text-xs tracking-[0.18em] uppercase text-foreground font-semibold mt-2">Chaitanya Lila</div>
              <Link href="/services#psychotherapy" onClick={closeMobile} className="text-xs tracking-[0.18em] uppercase text-muted hover:text-foreground transition-colors duration-200 font-medium">Integrative Psychotherapy</Link>
              <Link href="/services#vedic-astrology" onClick={closeMobile} className="text-xs tracking-[0.18em] uppercase text-muted hover:text-foreground transition-colors duration-200 font-medium">Vedic Astrology Consultation</Link>
              <Link href="/services#past-life-regressions" onClick={closeMobile} className="text-xs tracking-[0.18em] uppercase text-muted hover:text-foreground transition-colors duration-200 font-medium">Past Life Regressions</Link>
              <Link href="/sangas" onClick={closeMobile} className="text-xs tracking-[0.18em] uppercase text-muted hover:text-foreground transition-colors duration-200 font-medium">Sat Saṅgas & Events</Link>
              <a href="https://trikayapsychology.com" target="_blank" rel="noopener noreferrer" onClick={closeMobile} className="text-xs tracking-[0.18em] uppercase text-muted hover:text-foreground transition-colors duration-200 font-medium">Trikaya Psychology Website</a>
            </div>
          )}

          {NAV_LINKS.slice(1).map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={closeMobile}
              className="text-xs tracking-[0.25em] uppercase text-muted hover:text-foreground transition-colors duration-200 font-medium"
            >
              {link.label}
            </Link>
          ))}

          <a
            href="https://mridanga.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobile}
            className="text-xs tracking-[0.25em] uppercase text-muted hover:text-foreground transition-colors duration-200 font-medium"
          >
            Mridanga Sampradaya
          </a>
        </div>
      )}
    </header>
  );
}
