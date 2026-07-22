"use client";

import { useEffect, useRef, useState } from "react";
import { Paperclip, SendHorizontal } from "lucide-react";

import ImageUpload from "../upload/image-upload";
import ImagePreview from "../upload/image-priview";

import { SelectedImage } from "../../types/vision";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChatInputProps = {
  onSend: (message: string, image?: File) => void;
};

const ChatInput = ({ onSend }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(
    null,
  );

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!message.trim() && !selectedImage) return;

    // Sprint 5.1
    // Untuk sementara hanya mengirim text.
    // Image akan diproses di Sprint 5.2
    onSend(message, selectedImage?.file);

    setMessage("");

    if (selectedImage) {
      URL.revokeObjectURL(selectedImage.preview);
      setSelectedImage(null);
    }
  };

  const handleSelectImage = (file: File) => {
    setSelectedImage({
      file,
      preview: URL.createObjectURL(file),
    });
  };

  const handleRemoveImage = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage.preview);
    }

    setSelectedImage(null);
  };

  const openFilePicker = () => {
    inputFileRef.current?.click();
  };

  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage.preview);
      }
    };
  }, [selectedImage]);

  return (
    <div className="border-t bg-background p-4">
      <div className="mx-auto max-w-5xl">
        {/* Image Preview */}
        {selectedImage && (
          <div className="mb-3">
            <ImagePreview
              imageUrl={selectedImage.preview}
              onRemove={handleRemoveImage}
            />
          </div>
        )}

        <div className="flex items-center gap-3">
          <Input
            className="h-12 flex-1"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask DevMate AI..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />

          {/* Upload Button */}
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={openFilePicker}
            className="h-12 w-12"
          >
            <Paperclip className="h-5 w-5" />
          </Button>

          {/* Hidden Input */}
          <ImageUpload ref={inputFileRef} onSelect={handleSelectImage} />

          {/* Send Button */}
          <Button
            type="button"
            size="icon"
            onClick={handleSubmit}
            className="h-12 w-12"
          >
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
