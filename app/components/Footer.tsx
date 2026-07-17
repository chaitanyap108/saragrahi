import Image from "next/image";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/app/lib/site-config";

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="py-10 px-6 lg:px-10 bg-foreground">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/saragrahi-logo.png"
              alt="Saragrahi logo"
              width={28}
              height={28}
              className="object-contain opacity-50"
            />
            <span className="font-inscription text-base tracking-[0.32em] text-on-dark/70 uppercase font-medium">
              Saragrahi
            </span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-7">
            <Link
              href="/services"
              className="text-xs tracking-[0.25em] uppercase text-on-dark/50 hover:text-on-dark/80 transition-colors duration-200 font-medium"
            >
              Services
            </Link>
            <Link
              href="/sangas"
              className="text-xs tracking-[0.25em] uppercase text-on-dark/50 hover:text-on-dark/80 transition-colors duration-200 font-medium"
            >
              Sangas
            </Link>
            <Link
              href="/about"
              className="text-xs tracking-[0.25em] uppercase text-on-dark/50 hover:text-on-dark/80 transition-colors duration-200 font-medium"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-xs tracking-[0.25em] uppercase text-on-dark/50 hover:text-on-dark/80 transition-colors duration-200 font-medium"
            >
              Contact Us
            </Link>
            <a
              href="https://mridanga.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-[0.25em] uppercase text-on-dark/50 hover:text-on-dark/80 transition-colors duration-200 font-medium"
            >
              Academy&nbsp;↗
            </a>
          </nav>

          <div className="flex items-center gap-5">
            <a
              href={SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-dark/50 hover:text-on-dark/80 transition-colors duration-200"
              aria-label="YouTube"
            >
              <YouTubeIcon className="w-4 h-4" />
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-dark/50 hover:text-on-dark/80 transition-colors duration-200"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-1.5 border-t border-on-dark/10 pt-6">
          <p className="text-xs tracking-[0.25em] uppercase text-on-dark/40 font-light text-center md:text-right w-full">
            Healing &nbsp;·&nbsp; Wisdom &nbsp;·&nbsp; Practice
          </p>
          <p className="text-xs text-on-dark/30 font-light text-center md:text-right w-full">
            &copy; {new Date().getFullYear()} Saragrahi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
