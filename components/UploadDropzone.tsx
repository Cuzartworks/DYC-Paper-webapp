"use client";

import { useRef, useState } from "react";

export function UploadDropzone({ onFileChange }: { onFileChange?: (file: File) => void }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (nextFile?: File) => {
    if (!nextFile) return;

    const isValidType = ["image/jpeg", "image/png"].includes(nextFile.type);
    const isWithinSize = nextFile.size <= 3 * 1024 * 1024;

    if (!isValidType) {
      setError("Only JPG or PNG files are allowed.");
      return;
    }

    if (!isWithinSize) {
      setError("File must be 3MB or smaller.");
      return;
    }

    setError(null);
    setFile(nextFile);
    onFileChange?.(nextFile);
  };

  return (
    <div>
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          handleFile(event.dataTransfer.files?.[0]);
        }}
        className={`flex min-h-[200px] cursor-pointer flex-col items-center justify-center border border-dashed border-[#E6E6E6] bg-[#F6F6F6] px-6 py-8 text-center transition-colors ${isDragging ? "border-[#0D0D0D] bg-[#f0f0f0]" : ""}`}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        aria-label="Upload drawing"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg"
          className="hidden"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />

        <p className="text-lg font-light text-[#0D0D0D]">JPG・PNG upload</p>
        <p className="mt-2 text-sm text-[#737373]">Drag and drop or click to select</p>
        {file && <p className="mt-4 text-sm text-[#0D0D0D]">Selected: {file.name}</p>}
      </div>

      {error && <p className="mt-3 text-sm text-[#A40000]">{error}</p>}
    </div>
  );
}
