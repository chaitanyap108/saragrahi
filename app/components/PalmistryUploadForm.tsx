"use client";

import { useState, useRef } from "react";

export default function PalmistryUploadForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "submitted">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length > 0) {
      setStatus("submitted");
    }
  };

  if (status === "submitted") {
    return (
      <div className="bg-card p-10 text-center shadow-manuscript">
        <div className="divider-brush divider-brush-center mb-6" />
        <h3 className="text-xl font-light text-foreground mb-3">
          Photos Received
        </h3>
        <p className="text-base text-muted leading-relaxed font-light max-w-sm mx-auto">
          Thank you. Bhima-Karma will review your submission and your reading
          will commence once the photos are approved.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Drop zone */}
      <div>
        <label className="block text-sm tracking-[0.25em] uppercase text-muted font-medium mb-3">
          Upload Your Palm Photos
        </label>
        <div className="relative">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            required
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
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
                {/* Upload icon */}
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

      {/* Submit */}
      <button
        type="submit"
        disabled={files.length === 0}
        className="w-full py-4 bg-accent text-on-dark text-xs tracking-[0.2em] uppercase hover:bg-accent-hover transition-colors duration-300 font-medium disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Submit to Bhima-Karma
      </button>

      <p className="text-sm text-placeholder font-light leading-relaxed text-center italic">
        Your reading will commence once photos are reviewed and approved.
      </p>
    </form>
  );
}
