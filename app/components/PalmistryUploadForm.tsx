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
      <div className="border border-[#8b7355] bg-white p-10 text-center">
        <div className="w-8 h-px bg-[#8b7355] mx-auto mb-6" />
        <h3 className="text-xl font-light text-[#334155] mb-3">
          Photos Received
        </h3>
        <p className="text-sm text-[#64748b] leading-relaxed font-light max-w-sm mx-auto">
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
        <label className="block text-xs tracking-[0.25em] uppercase text-[#64748b] font-medium mb-3">
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
                ? "border-[#8b7355] bg-[#8b7355]/[0.03]"
                : "border-[#d6cfc4] bg-white hover:border-[#c4b89a]"
            }`}
          >
            {files.length > 0 ? (
              <div>
                <div className="w-6 h-px bg-[#8b7355] mx-auto mb-3" />
                <p className="text-sm text-[#334155] font-medium">
                  {files.length} {files.length === 1 ? "photo" : "photos"}{" "}
                  selected
                </p>
                <p className="text-xs text-[#64748b] mt-2 font-light break-all leading-relaxed">
                  {files.map((f) => f.name).join(", ")}
                </p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#8b7355] mt-4 font-medium">
                  Click to change selection
                </p>
              </div>
            ) : (
              <div>
                {/* Upload icon */}
                <svg
                  className="w-9 h-9 text-[#c4b89a] mx-auto mb-4"
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
                <p className="text-sm text-[#64748b] font-light mb-1">
                  Click or drag photos here
                </p>
                <p className="text-xs text-[#94a3b8] font-light">
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
        className="w-full py-4 bg-[#334155] text-[#fcfbf9] text-[11px] tracking-[0.2em] uppercase hover:bg-[#475569] transition-colors duration-300 font-medium disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Submit to Bhima
      </button>

      <p className="text-xs text-[#94a3b8] font-light leading-relaxed text-center italic">
        Your reading will commence once photos are reviewed and approved.
      </p>
    </form>
  );
}
