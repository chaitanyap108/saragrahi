"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Services", href: "/services", external: false },
  { label: "About", href: "/about", external: false },
] as const;

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#fcfbf9]/90 backdrop-blur-md border-b border-[#e8e4de]">
      <nav className="max-w-6xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/saragrahi-logo.jpg"
            alt="Saragrahi logo"
            width={36}
            height={36}
            priority
            className="rounded-sm object-contain transition-opacity duration-200 group-hover:opacity-70"
          />
          <span className="text-[11px] font-semibold tracking-[0.35em] text-[#334155] uppercase">
            Saragrahi
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[10px] tracking-[0.25em] uppercase text-[#64748b] hover:text-[#334155] transition-colors duration-200 font-medium"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://mridangaacademy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-[0.25em] uppercase text-[#64748b] hover:text-[#334155] transition-colors duration-200 font-medium"
          >
            Academy&nbsp;↗
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#334155] p-1 hover:opacity-70 transition-opacity"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#fcfbf9] border-t border-[#e8e4de] px-6 py-4 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-[10px] tracking-[0.25em] uppercase text-[#64748b] hover:text-[#334155] transition-colors duration-200 font-medium"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://mridangaacademy.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="text-[10px] tracking-[0.25em] uppercase text-[#64748b] hover:text-[#334155] transition-colors duration-200 font-medium"
          >
            Academy&nbsp;↗
          </a>
        </div>
      )}
    </header>
  );
}
