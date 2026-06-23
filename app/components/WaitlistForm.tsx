"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim()) {
      setStatus("submitted");
    }
  };

  if (status === "submitted") {
    return (
      <div className="border border-[#8b7355] bg-white/60 p-6">
        <p className="text-sm text-[#334155] leading-relaxed font-light tracking-wide">
          Thank you. We will be in touch when the Academy opens its doors.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block text-xs tracking-[0.25em] uppercase text-[#64748b] font-medium">
        Join the Waitlist
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          className="flex-1 px-4 py-3.5 border border-[#d6cfc4] bg-white text-sm text-[#334155] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#8b7355] transition-colors duration-200 font-light"
        />
        <button
          type="submit"
          className="px-6 py-3.5 bg-[#8b7355] text-white text-xs tracking-[0.2em] uppercase hover:bg-[#7a6349] transition-colors duration-200 font-medium whitespace-nowrap cursor-pointer"
        >
          Join Waitlist
        </button>
      </div>
      <p className="text-xs text-[#94a3b8] font-light leading-relaxed">
        Be the first to know when courses open. No spam, ever.
      </p>
    </form>
  );
}
