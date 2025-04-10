import React, { useState, useRef } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Camera, X } from "lucide-react";

interface ImageUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onImageChange: (imageData: string | null) => void;
  currentImage: string | null;
  className?: string;
}

export function ImageUpload({
  onImageChange,
  currentImage,
  className,
  ...props
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageChange(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        {...props}
      />

      {currentImage ? (
        <div className="relative">
          <img
            src={currentImage}
            alt="Uploaded"
            className="w-32 h-32 object-cover rounded-full border-2 border-primary"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
            aria-label="Remove image"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onClick={handleClick}
          className="w-32 h-32 rounded-full bg-muted flex items-center justify-center cursor-pointer border-2 border-dashed border-muted-foreground hover:border-primary transition-colors"
        >
          <Camera size={32} className="text-muted-foreground" />
        </div>
      )}

      <Button type="button" variant="outline" size="sm" onClick={handleClick}>
        {currentImage ? "Change Photo" : "Upload Photo"}
      </Button>
    </div>
  );
}
