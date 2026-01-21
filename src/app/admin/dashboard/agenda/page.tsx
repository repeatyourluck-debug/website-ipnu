"use client";

import { useState, useEffect } from "react";
import { Edit, Trash2, Plus, RefreshCw, Calendar, MapPin, Clock } from "lucide-react";

interface Agenda {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    category: string;
}

export default function AgendaAdminPage() {
    const [agenda, setAgenda] = useState<Agenda[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        category: "Organisasi",
    });

    const fetchAgenda = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/agenda");
            const data = await res.json();
            setAgenda(data);
        } catch (error) {
            console.error("Failed to fetch:", error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchAgenda();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingId) {
                await fetch(`/api/agenda/${editingId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                });
            } else {
                await fetch("/api/agenda", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                });
            }

            setShowModal(false);
            setEditingId(null);
            setForm({ title: "", description: "", date: "", time: "", location: "", category: "Organisasi" });
            fetchAgenda();
        } catch (error) {
            console.error("Error saving:", error);
        }
    };

    const handleEdit = (item: Agenda) => {
        setForm({
            title: item.title,
            description: item.description,
            date: item.date,
            time: item.time,
            location: item.location,
            category: item.category,
        });
        setEditingId(item.id);
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        if (confirm("Yakin ingin menghapus agenda ini?")) {
            await fetch(`/api/agenda/${id}`, { method: "DELETE" });
            fetchAgenda();
        }
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Kelola Agenda</h1>
                    <p className="text-foreground/60 mt-1">Tambah, edit, dan hapus agenda kegiatan.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={fetchAgenda}
                        className="inline-flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-foreground px-4 py-2.5 rounded-lg font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                    >
                        <RefreshCw className="h-5 w-5" />
                        Refresh
                    </button>
                    <button
                        onClick={() => {
                            setForm({ title: "", description: "", date: "", time: "", location: "", category: "Organisasi" });
                            setEditingId(null);
                            setShowModal(true);
                        }}
                        className="inline-flex items-center gap-2 bg-ipnu-primary text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-ipnu-secondary transition-colors"
                    >
                        <Plus className="h-5 w-5" />
                        Tambah Agenda
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-black/5 dark:border-white/10 overflow-hidden">
                {isLoading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-ipnu-primary mx-auto"></div>
                    </div>
                ) : agenda.length === 0 ? (
                    <div className="p-12 text-center text-foreground/50">
                        <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Belum ada agenda.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-black/5 dark:divide-white/10">
                        {agenda.map((item) => (
                            <div key={item.id} className="p-4 flex items-start gap-4">
                                <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-ipnu-primary/10 flex flex-col items-center justify-center text-ipnu-primary">
                                    <span className="text-2xl font-bold">{new Date(item.date).getDate()}</span>
                                    <span className="text-xs">{new Date(item.date).toLocaleDateString("id-ID", { month: "short" })}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                                    <p className="text-sm text-foreground/60 mt-1 line-clamp-1">{item.description}</p>
                                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-foreground/50">
                                        <span className="inline-flex items-center gap-1">
                                            <Clock className="h-3 w-3" /> {item.time}
                                        </span>
                                        <span className="inline-flex items-center gap-1">
                                            <MapPin className="h-3 w-3" /> {item.location}
                                        </span>
                                        <span className="bg-ipnu-primary/10 text-ipnu-primary px-2 py-0.5 rounded-full">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
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
                            {editingId ? "Edit Agenda" : "Tambah Agenda"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Judul</label>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-background text-foreground"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Deskripsi</label>
                                <textarea
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-background text-foreground"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">Tanggal</label>
                                    <input
                                        type="date"
                                        value={form.date}
                                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-background text-foreground"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">Waktu</label>
                                    <input
                                        type="time"
                                        value={form.time}
                                        onChange={(e) => setForm({ ...form, time: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-background text-foreground"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Lokasi</label>
                                <input
                                    type="text"
                                    value={form.location}
                                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-background text-foreground"
                                    placeholder="Alamat atau nama tempat"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Kategori</label>
                                <select
                                    value={form.category}
                                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-background text-foreground"
                                >
                                    <option value="Organisasi">Organisasi</option>
                                    <option value="Kaderisasi">Kaderisasi</option>
                                    <option value="Pelatihan">Pelatihan</option>
                                    <option value="Sosial">Sosial</option>
                                    <option value="Dakwah">Dakwah</option>
                                </select>
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
