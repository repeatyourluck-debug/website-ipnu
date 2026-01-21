"use client";

import { useState, useEffect } from "react";
import { Edit, Trash2, Plus, RefreshCw, Users } from "lucide-react";
import ImageUpload from "@/components/ui/ImageUpload";

interface Pengurus {
    id: number;
    name: string;
    position: string;
    organization: string;
    image: string;
    instagram: string;
}

export default function PengurusAdminPage() {
    const [pengurus, setPengurus] = useState<Pengurus[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState({
        name: "",
        position: "",
        organization: "IPNU",
        image: "",
        instagram: "",
    });

    const fetchPengurus = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/pengurus");
            const data = await res.json();
            setPengurus(data);
        } catch (error) {
            console.error("Failed to fetch:", error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchPengurus();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingId) {
                // Update
                await fetch(`/api/pengurus/${editingId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                });
            } else {
                // Create
                await fetch("/api/pengurus", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                });
            }

            setShowModal(false);
            setEditingId(null);
            setForm({ name: "", position: "", organization: "IPNU", image: "", instagram: "" });
            fetchPengurus();
        } catch (error) {
            console.error("Error saving:", error);
        }
    };

    const handleEdit = (person: Pengurus) => {
        setForm({
            name: person.name,
            position: person.position,
            organization: person.organization,
            image: person.image,
            instagram: person.instagram,
        });
        setEditingId(person.id);
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        if (confirm("Yakin ingin menghapus pengurus ini?")) {
            await fetch(`/api/pengurus/${id}`, { method: "DELETE" });
            fetchPengurus();
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Kelola Pengurus</h1>
                    <p className="text-foreground/60 mt-1">Tambah, edit, dan hapus data pengurus.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={fetchPengurus}
                        className="inline-flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-foreground px-4 py-2.5 rounded-lg font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                    >
                        <RefreshCw className="h-5 w-5" />
                        Refresh
                    </button>
                    <button
                        onClick={() => {
                            setForm({ name: "", position: "", organization: "IPNU", image: "", instagram: "" });
                            setEditingId(null);
                            setShowModal(true);
                        }}
                        className="inline-flex items-center gap-2 bg-ipnu-primary text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-ipnu-secondary transition-colors"
                    >
                        <Plus className="h-5 w-5" />
                        Tambah Pengurus
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-black/5 dark:border-white/10 overflow-hidden">
                {isLoading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-ipnu-primary mx-auto"></div>
                    </div>
                ) : pengurus.length === 0 ? (
                    <div className="p-12 text-center text-foreground/50">
                        <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Belum ada data pengurus.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                        {pengurus.map((person) => (
                            <div
                                key={person.id}
                                className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 flex items-center gap-4"
                            >
                                <img
                                    src={person.image}
                                    alt={person.name}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-foreground truncate">{person.name}</p>
                                    <p className="text-sm text-foreground/60">{person.position}</p>
                                    <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${person.organization === "IPNU"
                                        ? "bg-ipnu-primary/10 text-ipnu-primary"
                                        : "bg-ippnu-primary/10 text-ippnu-primary"
                                        }`}>
                                        {person.organization}
                                    </span>
                                </div>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => handleEdit(person)}
                                        className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(person.id)}
                                        className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-full max-w-md shadow-xl my-8 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold text-foreground mb-4">
                            {editingId ? "Edit Pengurus" : "Tambah Pengurus"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Nama</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-background text-foreground"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Jabatan</label>
                                <input
                                    type="text"
                                    value={form.position}
                                    onChange={(e) => setForm({ ...form, position: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-background text-foreground"
                                    placeholder="Ketua Umum, Sekretaris, dll"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Organisasi</label>
                                <select
                                    value={form.organization}
                                    onChange={(e) => setForm({ ...form, organization: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-background text-foreground"
                                >
                                    <option value="IPNU">IPNU</option>
                                    <option value="IPPNU">IPPNU</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Foto</label>
                                <ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Instagram</label>
                                <input
                                    type="text"
                                    value={form.instagram}
                                    onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-background text-foreground"
                                    placeholder="@username"
                                />
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
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
