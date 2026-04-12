"use client";

import { useTransition, useRef, useState } from "react";
import { uploadImage } from "@/lib/actions/admin/upload";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ImageUploadProps {
  bucket: "portfolio-images" | "avatars";
  currentUrl: string | null;
  onUploadComplete: (url: string) => void;
  onRemove: () => void;
  label?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Reusable image upload widget for admin forms.
 *
 * On file selection the upload fires immediately (not on form submit). The
 * parent form should hold the resulting URL in state and pass it to a hidden
 * `<input>` so it is included when the form submits.
 *
 * @param bucket           - Supabase Storage bucket to upload into.
 * @param currentUrl       - Currently stored URL, or null if none.
 * @param onUploadComplete - Callback fired with the new public URL after a
 *                           successful upload.
 * @param onRemove         - Callback fired when the admin clicks "Remove".
 * @param label            - Optional label text (default: "Cover Image").
 */
export function ImageUpload({
  bucket,
  currentUrl,
  onUploadComplete,
  onRemove,
  label = "Cover Image",
}: ImageUploadProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    startTransition(async () => {
      const result = await uploadImage(formData, bucket);

      if (result.success) {
        onUploadComplete(result.url);
      } else {
        setError(result.error);
        // Reset the file input so the same file can be re-selected after fixing
        // the error (e.g. compressing and re-uploading).
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    });
  }

  function handleRemove() {
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onRemove();
  }

  return (
    <div className="space-y-3">
      {/* Label */}
      <p className="block text-sm font-medium text-foreground">{label}</p>

      {/* Preview area — shown when an image URL is set */}
      {currentUrl && (
        <div className="relative w-full overflow-hidden rounded-lg border border-border bg-muted">
          <img
            src={currentUrl}
            alt="Upload preview"
            className="h-48 w-full object-cover"
          />
          {/* Remove button overlaid on the image */}
          <button
            type="button"
            onClick={handleRemove}
            disabled={isPending}
            className="absolute right-2 top-2 inline-flex items-center gap-1.5 rounded-md bg-background/80 px-2.5 py-1 text-xs font-medium text-destructive backdrop-blur-sm transition-colors hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destructive disabled:pointer-events-none disabled:opacity-50"
          >
            Remove
          </button>
        </div>
      )}

      {/* File input trigger area */}
      <div className="relative">
        <label
          htmlFor={`image-upload-${bucket}`}
          className={[
            "flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/40 px-4 py-6 text-center transition-colors",
            "hover:border-brand/50 hover:bg-brand-subtle/30",
            isPending ? "pointer-events-none opacity-60" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {isPending ? (
            <>
              {/* Spinner */}
              <svg
                aria-hidden="true"
                className="h-6 w-6 animate-spin text-brand"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              <span className="text-sm text-muted-foreground">Uploading…</span>
            </>
          ) : (
            <>
              {/* Upload icon */}
              <svg
                aria-hidden="true"
                className="h-6 w-6 text-muted-foreground"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              <span className="text-sm text-muted-foreground">
                {currentUrl ? "Replace image" : "Click to upload"}
              </span>
              <span className="text-xs text-muted-foreground/70">
                JPG, PNG, or WebP — max 2 MB
              </span>
            </>
          )}
        </label>

        <input
          ref={fileInputRef}
          id={`image-upload-${bucket}`}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={isPending}
          onChange={handleFileChange}
          className="sr-only"
        />
      </div>

      {/* Validation / upload error */}
      {error && (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
