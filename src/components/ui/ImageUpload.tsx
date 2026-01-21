"use client";

import { useState, useRef } from "react";
import { Image as ImageIcon, Upload, X } from "lucide-react";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [useUrl, setUseUrl] = useState(value.startsWith("http"));
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            alert("File harus berupa gambar!");
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("Ukuran file maksimal 5MB!");
            return;
        }

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                onChange(data.url);
            } else {
                alert("Gagal upload gambar");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Terjadi kesalahan saat upload");
        }
        setIsUploading(false);
    };

    return (
        <div className="space-y-4">
            {/* Toggle between URL and Upload */}
            <div className="flex rounded-lg border border-black/10 dark:border-white/10 overflow-hidden">
                <button
                    type="button"
                    onClick={() => setUseUrl(false)}
                    className={`flex-1 py-2 text-sm font-medium transition-colors ${!useUrl
                        ? "bg-ipnu-primary text-white"
                        : "bg-transparent text-foreground/60 hover:bg-black/5 dark:hover:bg-white/5"
                        }`}
                >
                    <Upload className="h-4 w-4 inline-block mr-1" />
                    Upload File
                </button>
                <button
                    type="button"
                    onClick={() => setUseUrl(true)}
                    className={`flex-1 py-2 text-sm font-medium transition-colors ${useUrl
                        ? "bg-ipnu-primary text-white"
                        : "bg-transparent text-foreground/60 hover:bg-black/5 dark:hover:bg-white/5"
                        }`}
                >
                    🔗 URL
                </button>
            </div>

            {useUrl ? (
                /* URL Input */
                <input
                    type="url"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-black/10 dark:border-white/10 bg-background text-foreground focus:ring-2 focus:ring-ipnu-primary focus:border-ipnu-primary text-sm"
                    placeholder="https://example.com/gambar.jpg"
                />
            ) : (
                /* File Upload */
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-black/20 dark:border-white/20 rounded-lg p-6 text-center cursor-pointer hover:border-ipnu-primary hover:bg-ipnu-primary/5 transition-colors"
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    {isUploading ? (
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-ipnu-primary mx-auto"></div>
                    ) : (
                        <>
                            <Upload className="h-8 w-8 mx-auto text-foreground/40 mb-2" />
                            <p className="text-sm text-foreground/60">
                                Klik untuk pilih gambar
                            </p>
                            <p className="text-xs text-foreground/40 mt-1">
                                JPG, PNG, GIF (max 5MB)
                            </p>
                        </>
                    )}
                </div>
            )}

            {/* Preview */}
            {value ? (
                <div className="relative">
                    <img
                        src={value}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                        type="button"
                        onClick={() => onChange("")}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-50 cursor-pointer shadow-md"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            ) : (
                <div className="w-full h-32 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-foreground/30" />
                </div>
            )}
        </div>
    );
}
