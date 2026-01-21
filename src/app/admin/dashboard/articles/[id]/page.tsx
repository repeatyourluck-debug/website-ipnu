"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/ui/ImageUpload";

interface Article {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    image: string;
    category: string;
}

export default function EditArticlePage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;

    const [title, setTitle] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("Berita");
    const [imageUrl, setImageUrl] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchArticle() {
            try {
                const res = await fetch(`/api/articles/${id}`);
                if (res.ok) {
                    const data: Article = await res.json();
                    setTitle(data.title);
                    setExcerpt(data.excerpt);
                    setContent(data.content || "");
                    setCategory(data.category);
                    setImageUrl(data.image);
                }
            } catch (error) {
                console.error("Failed to fetch article:", error);
            }
            setIsLoading(false);
        }
        fetchArticle();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const res = await fetch(`/api/articles/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    excerpt,
                    content,
                    category,
                    image: imageUrl,
                }),
            });

            if (res.ok) {
                alert("Artikel berhasil diperbarui!");
                router.push("/admin/dashboard/articles");
            } else {
                alert("Gagal memperbarui artikel");
            }
        } catch (error) {
            console.error("Error updating article:", error);
            alert("Terjadi kesalahan");
        }

        setIsSaving(false);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ipnu-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/dashboard/articles"
                    className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5 text-foreground/60" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Edit Artikel</h1>
                    <p className="text-foreground/60 mt-1">Ubah dan perbarui artikel.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-black/5 dark:border-white/10">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                                        Judul Artikel
                                    </label>
                                    <input
                                        id="title"
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-black/10 dark:border-white/10 bg-background text-foreground focus:ring-2 focus:ring-ipnu-primary focus:border-ipnu-primary"
                                        placeholder="Masukkan judul artikel..."
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="excerpt" className="block text-sm font-medium text-foreground mb-2">
                                        Ringkasan
                                    </label>
                                    <textarea
                                        id="excerpt"
                                        value={excerpt}
                                        onChange={(e) => setExcerpt(e.target.value)}
                                        rows={2}
                                        className="w-full px-4 py-3 rounded-lg border border-black/10 dark:border-white/10 bg-background text-foreground focus:ring-2 focus:ring-ipnu-primary focus:border-ipnu-primary"
                                        placeholder="Tulis ringkasan singkat..."
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="content" className="block text-sm font-medium text-foreground mb-2">
                                        Isi Artikel
                                    </label>
                                    <textarea
                                        id="content"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        rows={12}
                                        className="w-full px-4 py-3 rounded-lg border border-black/10 dark:border-white/10 bg-background text-foreground focus:ring-2 focus:ring-ipnu-primary focus:border-ipnu-primary"
                                        placeholder="Tulis isi artikel di sini..."
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Category */}
                        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-black/5 dark:border-white/10">
                            <h3 className="text-sm font-semibold text-foreground mb-4">Kategori</h3>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-black/10 dark:border-white/10 bg-background text-foreground focus:ring-2 focus:ring-ipnu-primary focus:border-ipnu-primary"
                            >
                                <option value="Berita">Berita</option>
                                <option value="Kaderisasi">Kaderisasi</option>
                                <option value="Pelatihan">Pelatihan</option>
                                <option value="Opini">Opini</option>
                            </select>
                        </div>

                        {/* Featured Image */}
                        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-black/5 dark:border-white/10">
                            <h3 className="text-sm font-semibold text-foreground mb-4">Gambar Utama</h3>
                            <ImageUpload value={imageUrl} onChange={setImageUrl} />
                        </div>

                        {/* Actions */}
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="w-full flex items-center justify-center gap-2 bg-ipnu-primary text-white px-4 py-3 rounded-lg font-semibold hover:bg-ipnu-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSaving ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                            ) : (
                                <>
                                    <Save className="h-5 w-5" />
                                    Simpan Perubahan
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
