"use client";

import { useEffect, useRef, useState } from "react";
import { CodeXml, Paperclip, SendHorizontal } from "lucide-react";

import ImageUpload from "../upload/image-upload";
import ImagePreview from "../upload/image-priview";
import CodeInput from "@/components/code/code-input";
import { SelectedImage } from "../../types/vision";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChatInputProps = {
  onSend: (message: string, image?: File, sourceCode?: string) => void;
};

const ChatInput = ({ onSend }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(
    null,
  );
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [sourceCode, setSourceCode] = useState("");

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!message.trim() && !selectedImage) return;

    onSend(message, selectedImage?.file, sourceCode);

    setMessage("");
    setSourceCode("");
    setShowCodeInput(false);

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
    <div className="fixed bottom-6 left-1/2 z-50 w-full max-w-4xl -translate-x-1/2 px-3 sm:px-4">
      <div className="mx-auto w-full max-w-4xl">
        {/* Image Preview */}
        {selectedImage && (
          <div className="mb-3">
            <ImagePreview
              imageUrl={selectedImage.preview}
              onRemove={handleRemoveImage}
            />
          </div>
        )}

        {/* Code Input */}
        {showCodeInput && (
          <CodeInput value={sourceCode} onChange={setSourceCode} />
        )}

        <div className="rounded-xl p-2 border border-zinc-200 bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 focus-within:shadow-[0_12px_40px_rgb(0,0,0,0.12)]">
          <div className="flex items-center gap-3">
            <Input
              className="h-10 sm:h-11 text-sm sm:text-base"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask About React, Next.js, TypeScript, Tailwind CSS..."
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
              className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Paperclip className="h-5 w-5" />
            </Button>

            {/* Hidden Input */}
            <ImageUpload ref={inputFileRef} onSelect={handleSelectImage} />

            <Button
              type="button"
              size="icon"
              variant={showCodeInput ? "destructive" : "outline"}
              onClick={() => setShowCodeInput((prev) => !prev)}
              className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <CodeXml size={20} />
            </Button>

            {/* Send Button */}
            <Button
              type="button"
              size="icon"
              onClick={handleSubmit}
              className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <SendHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
