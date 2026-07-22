"use client";

import Image from "next/image";

interface ImagePreviewProps {
  imageUrl: string;
  onRemove: () => void;
}

export default function ImagePreview({
  imageUrl,
  onRemove,
}: ImagePreviewProps) {
  return (
    <div className="relative w-fit">
      <Image
        src={imageUrl}
        alt="Preview"
        width={180}
        height={180}
        className="rounded-lg border object-cover"
      />

      <button
        onClick={onRemove}
        className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white transition hover:bg-red-600"
      >
        ✕
      </button>
    </div>
  );
}
