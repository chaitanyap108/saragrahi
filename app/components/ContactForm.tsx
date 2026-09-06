"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("https://formspree.io/f/xvkobnoo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ form: "General Contact", name, email, message }),
      });

      if (response.ok) {
        setStatus("submitted");
      } else {
        setStatus("error");
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  if (status === "submitted") {
    return (
      <div className="bg-card p-8 md:p-10 shadow-manuscript text-center">
        <p className="text-xs tracking-[0.45em] uppercase text-accent mb-3 font-medium">
          Message Received
        </p>
        <p className="text-base text-foreground leading-relaxed font-light">
          Thank you for reaching out. We will be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="contact-name"
          className="block text-xs tracking-[0.25em] uppercase text-muted font-medium mb-2"
        >
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          className="w-full px-4 py-3.5 border border-input-border bg-card text-base text-foreground placeholder:text-placeholder focus:outline-none focus:border-accent transition-colors duration-200 font-light"
        />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="block text-xs tracking-[0.25em] uppercase text-muted font-medium mb-2"
        >
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          className="w-full px-4 py-3.5 border border-input-border bg-card text-base text-foreground placeholder:text-placeholder focus:outline-none focus:border-accent transition-colors duration-200 font-light"
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-xs tracking-[0.25em] uppercase text-muted font-medium mb-2"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can we help?"
          required
          rows={6}
          className="w-full px-4 py-3.5 border border-input-border bg-card text-base text-foreground placeholder:text-placeholder focus:outline-none focus:border-accent transition-colors duration-200 font-light resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto px-9 py-3.5 bg-accent text-on-dark text-xs tracking-[0.2em] uppercase hover:bg-accent-hover transition-colors duration-300 font-medium cursor-pointer disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </form>
  );
}
