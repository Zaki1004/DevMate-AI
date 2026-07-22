"use client";

import { ChangeEvent, forwardRef } from "react";

interface ImageUploadProps {
  onSelect: (file: File) => void;
}

const ImageUpload = forwardRef<HTMLInputElement, ImageUploadProps>(
  ({ onSelect }, ref) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (!file) return;

      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed.");
        return;
      }

      if (file.size > 20 * 1024 * 1024) {
        alert("Maximum image size is 20 MB.");
        return;
      }

      onSelect(file);
    };

    return (
      <input
        ref={ref}
        type="file"
        accept="image/*"
        hidden
        onChange={handleChange}
      />
    );
  },
);

ImageUpload.displayName = "ImageUpload";

export default ImageUpload;
