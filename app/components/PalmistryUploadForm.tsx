"use client";

import { useRef, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function PalmistryUploadForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length === 0 || status === "submitting") return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Ensure selected files are attached even if the native input was re-used
    formData.delete("images");
    for (const file of files) {
      formData.append("images", file);
    }

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/submit-intake", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json().catch(() => null)) as {
        error?: string;
        message?: string;
      } | null;

      if (!response.ok) {
        throw new Error(
          payload?.error || "Something went wrong while submitting. Please try again.",
        );
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting. Please try again.",
      );
    }
  };

  if (status === "success") {
    return (
      <div className="bg-card p-10 text-center shadow-manuscript">
        <div className="divider-brush divider-brush-center mb-6" />
        <h3 className="text-xl font-light text-foreground mb-3">
          Photos Received
        </h3>
        <p className="text-base text-muted leading-relaxed font-light max-w-sm mx-auto">
          Thank you. Your photos have been forwarded to Kamala and are currently
          under review. You will receive an approval or a resubmission request
          within 24–48 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="intake-name"
            className="block text-sm tracking-[0.25em] uppercase text-muted font-medium mb-3"
          >
            Full Name
          </label>
          <input
            id="intake-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            disabled={status === "submitting"}
            className="w-full border border-input-border bg-card px-4 py-3 text-base text-foreground font-light outline-none transition-colors focus:border-accent"
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="intake-email"
            className="block text-sm tracking-[0.25em] uppercase text-muted font-medium mb-3"
          >
            Email
          </label>
          <input
            id="intake-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            disabled={status === "submitting"}
            className="w-full border border-input-border bg-card px-4 py-3 text-base text-foreground font-light outline-none transition-colors focus:border-accent"
            placeholder="you@example.com"
          />
        </div>
      </div>

      {/* Drop zone */}
      <div>
        <label className="block text-sm tracking-[0.25em] uppercase text-muted font-medium mb-3">
          Upload Your Palm Photos
        </label>
        <div className="relative">
          <input
            ref={inputRef}
            type="file"
            name="images"
            accept="image/*"
            multiple
            required
            disabled={status === "submitting"}
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
            aria-label="Select palm photos"
          />
          <div
            className={`border-2 border-dashed p-10 text-center transition-colors duration-200 ${
              files.length > 0
                ? "border-accent bg-accent/[0.03]"
                : "border-input-border bg-card hover:border-accent-light"
            }`}
          >
            {files.length > 0 ? (
              <div>
                <div className="divider-brush divider-brush-center mb-3" />
                <p className="text-base text-foreground font-medium">
                  {files.length} {files.length === 1 ? "photo" : "photos"}{" "}
                  selected
                </p>
                <p className="text-sm text-muted mt-2 font-light break-all leading-relaxed">
                  {files.map((f) => f.name).join(", ")}
                </p>
                <p className="text-xs tracking-[0.2em] uppercase text-accent mt-4 font-medium">
                  Click to change selection
                </p>
              </div>
            ) : (
              <div>
                <svg
                  className="w-9 h-9 text-accent-light mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-base text-muted font-light mb-1">
                  Click or drag photos here
                </p>
                <p className="text-sm text-placeholder font-light">
                  Both hands — palm facing upward. JPEG or PNG accepted.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {errorMessage ? (
        <p className="text-sm text-red-700 font-light leading-relaxed text-center">
          {errorMessage}
        </p>
      ) : null}

      {/* Submit */}
      <button
        type="submit"
        disabled={files.length === 0 || status === "submitting"}
        className="w-full py-4 bg-accent text-on-dark text-xs tracking-[0.2em] uppercase hover:bg-accent-hover transition-colors duration-300 font-medium disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Submitting…" : "Submit to Bhima-Karma"}
      </button>

      <p className="text-sm text-placeholder font-light leading-relaxed text-center italic">
        Your reading will commence once photos are reviewed and approved.
      </p>
    </form>
  );
}
