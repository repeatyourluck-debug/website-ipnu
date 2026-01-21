"use client";

import { useState, useEffect } from "react";
import { Trash2, Plus, RefreshCw, Image as ImageIcon } from "lucide-react";
import ImageUpload from "@/components/ui/ImageUpload";

interface GalleryItem {
    id: number;
    title: string;
    image: string;
    date: string;
}

export default function GalleryAdminPage() {
    const [gallery, setGallery] = useState<GalleryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        title: "",
        image: "",
    });

    const [deleteId, setDeleteId] = useState<number | null>(null);

    const fetchGallery = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/gallery", { cache: "no-store" });
            const data = await res.json();
            setGallery(data);
        } catch (error) {
            console.error("Failed to fetch gallery:", error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchGallery();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.image) {
            alert("Mohon upload gambar terlebih dahulu");
            return;
        }

        try {
            await fetch("/api/gallery", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            setShowModal(false);
            setForm({ title: "", image: "" });
            fetchGallery();
        } catch (error) {
            console.error("Error saving:", error);
        }
    };

    const confirmDelete = (id: number) => {
        setDeleteId(id);
    };

    const handleDelete = async () => {
        if (!deleteId) return;

        console.log("Deleting item:", deleteId);
        try {
            const res = await fetch(`/api/gallery/${deleteId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });

            if (!res.ok) {
                const err = await res.json();
                console.error("Delete failed:", err);
                alert("Gagal menghapus: " + (err.error || "Unknown error"));
                setDeleteId(null);
                return;
            }

            console.log("Delete success");
            setDeleteId(null);
            await fetchGallery(); // Refresh list
        } catch (error) {
            console.error("Error executing delete:", error);
            alert("Terjadi kesalahan saat menghapus");
            setDeleteId(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Kelola Galeri</h1>
                    <p className="text-foreground/60 mt-1">Upload foto kegiatan untuk halaman Galeri.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={fetchGallery}
                        className="inline-flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-foreground px-4 py-2.5 rounded-lg font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                    >
                        <RefreshCw className="h-5 w-5" />
                        Refresh
                    </button>
                    <button
                        onClick={() => setShowModal(true)}
                        className="inline-flex items-center gap-2 bg-ipnu-primary text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-ipnu-secondary transition-colors"
                    >
                        <Plus className="h-5 w-5" />
                        Upload Foto
                    </button>
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-black/5 dark:border-white/10">
                {isLoading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-ipnu-primary mx-auto"></div>
                    </div>
                ) : gallery.length === 0 ? (
                    <div className="p-12 text-center text-foreground/50">
                        <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Belum ada foto di galeri.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {gallery.map((item) => (
                            <div key={item.id} className="group relative bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="aspect-square relative overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-2 right-2 z-50">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                confirmDelete(item.id);
                                            }}
                                            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                            title="Hapus Foto"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-3">
                                    <h3 className="font-semibold text-sm truncate">{item.title}</h3>
                                    <p className="text-xs text-foreground/60">{item.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Upload Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold text-foreground mb-4">Upload Foto Baru</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Judul / Caption</label>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-background text-foreground"
                                    placeholder="Nama kegiatan..."
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Foto</label>
                                <ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
                            </div>
                            <div className="flex gap-2 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 rounded-lg bg-ipnu-primary text-white font-semibold hover:bg-ipnu-secondary transition-colors"
                                >
                                    Upload
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-full max-w-sm shadow-xl">
                        <h2 className="text-lg font-bold text-foreground mb-2">Hapus Foto?</h2>
                        <p className="text-foreground/70 mb-6">Apakah Anda yakin ingin menghapus foto ini? Tindakan ini tidak dapat dibatalkan.</p>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setDeleteId(null)}
                                className="flex-1 px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
