import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-10 px-6 lg:px-10 bg-[#334155]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Image
            src="/saragrahi-logo.jpg"
            alt="Saragrahi logo"
            width={28}
            height={28}
            className="rounded-sm object-contain opacity-50"
          />
          <span className="text-[11px] tracking-[0.35em] text-[#fcfbf9]/70 uppercase font-medium">
            Saragrahi
          </span>
        </div>

        {/* Nav links */}
        <nav className="flex items-center gap-7">
          <Link
            href="/services"
            className="text-[10px] tracking-[0.25em] uppercase text-[#fcfbf9]/50 hover:text-[#fcfbf9]/80 transition-colors duration-200 font-medium"
          >
            Services
          </Link>
          <Link
            href="/about"
            className="text-[10px] tracking-[0.25em] uppercase text-[#fcfbf9]/50 hover:text-[#fcfbf9]/80 transition-colors duration-200 font-medium"
          >
            About
          </Link>
          <a
            href="https://mridangaacademy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-[0.25em] uppercase text-[#fcfbf9]/50 hover:text-[#fcfbf9]/80 transition-colors duration-200 font-medium"
          >
            Academy&nbsp;↗
          </a>
        </nav>

        {/* Tagline + copyright */}
        <div className="flex flex-col items-center md:items-end gap-1.5">
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#fcfbf9]/40 font-light">
            Healing &nbsp;·&nbsp; Wisdom &nbsp;·&nbsp; Practice
          </p>
          <p className="text-[10px] text-[#fcfbf9]/30 font-light">
            &copy; {new Date().getFullYear()} Saragrahi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
