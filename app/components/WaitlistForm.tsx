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
      <div className="bg-card/60 p-6 shadow-manuscript">
        <p className="text-sm text-foreground leading-relaxed font-light tracking-wide">
          Thank you. We will be in touch when Mridanga Sampradaya opens its doors.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block text-xs tracking-[0.25em] uppercase text-muted font-medium">
        Join the Waitlist
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          className="flex-1 px-4 py-3.5 border border-input-border bg-card text-sm text-foreground placeholder:text-placeholder focus:outline-none focus:border-accent transition-colors duration-200 font-light"
        />
        <button
          type="submit"
          className="px-6 py-3.5 bg-accent text-on-dark text-xs tracking-[0.2em] uppercase hover:bg-accent-hover transition-colors duration-200 font-medium whitespace-nowrap cursor-pointer"
        >
          Join Waitlist
        </button>
      </div>
      <p className="text-xs text-placeholder font-light leading-relaxed">
        Be the first to know when courses open. No spam, ever.
      </p>
    </form>
  );
}
