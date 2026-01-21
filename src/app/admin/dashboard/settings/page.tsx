"use client";

import { useState, useEffect } from "react";
import { Save, RefreshCw } from "lucide-react";
import ImageUpload from "@/components/ui/ImageUpload";

interface Settings {
    heroImage: string;
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    contactWhatsapp: string;
    contactEmail: string;
    contactAddress: string;
    instagramIpnu: string;
    instagramIppnu: string;
}

export default function SettingsPage() {
    const [settings, setSettings] = useState<Settings>({
        heroImage: "",
        heroTitle: "",
        heroSubtitle: "",
        heroDescription: "",
        contactWhatsapp: "",
        contactEmail: "",
        contactAddress: "",
        instagramIpnu: "",
        instagramIppnu: "",
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const fetchSettings = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/settings");
            const data = await res.json();
            setSettings(data);
        } catch (error) {
            console.error("Failed to fetch settings:", error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });
            if (res.ok) {
                alert("Pengaturan berhasil disimpan!");
            }
        } catch (error) {
            console.error("Failed to save:", error);
            alert("Gagal menyimpan pengaturan");
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Pengaturan Website</h1>
                    <p className="text-foreground/60 mt-1">Kelola tampilan dan informasi website.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={fetchSettings}
                        className="inline-flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-foreground px-4 py-2.5 rounded-lg font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                    >
                        <RefreshCw className="h-5 w-5" />
                        Refresh
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="inline-flex items-center gap-2 bg-ipnu-primary text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-ipnu-secondary transition-colors disabled:opacity-50"
                    >
                        {isSaving ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                        ) : (
                            <>
                                <Save className="h-5 w-5" />
                                Simpan
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Hero Section Settings */}
                <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-black/5 dark:border-white/10">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Hero Section</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Gambar Hero</label>
                            <ImageUpload
                                value={settings.heroImage}
                                onChange={(url) => setSettings({ ...settings, heroImage: url })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Judul Utama</label>
                            <input
                                type="text"
                                value={settings.heroTitle}
                                onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-background text-foreground"
                                placeholder="Pelajar NU Semarang"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Subjudul</label>
                            <input
                                type="text"
                                value={settings.heroSubtitle}
                                onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-background text-foreground"
                                placeholder="Kreatif & Berbudaya"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Deskripsi</label>
                            <textarea
                                value={settings.heroDescription}
                                onChange={(e) => setSettings({ ...settings, heroDescription: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-background text-foreground"
                                placeholder="Deskripsi singkat..."
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Settings */}
                <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-black/5 dark:border-white/10">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Informasi Kontak</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">WhatsApp</label>
                            <input
                                type="text"
                                value={settings.contactWhatsapp}
                                onChange={(e) => setSettings({ ...settings, contactWhatsapp: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-background text-foreground"
                                placeholder="6281234567890"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                            <input
                                type="email"
                                value={settings.contactEmail}
                                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-background text-foreground"
                                placeholder="email@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Alamat</label>
                            <textarea
                                value={settings.contactAddress}
                                onChange={(e) => setSettings({ ...settings, contactAddress: e.target.value })}
                                rows={2}
                                className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-background text-foreground"
                                placeholder="Alamat sekretariat..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Instagram IPNU</label>
                            <input
                                type="text"
                                value={settings.instagramIpnu}
                                onChange={(e) => setSettings({ ...settings, instagramIpnu: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-background text-foreground"
                                placeholder="@ipnusemarang"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Instagram IPPNU</label>
                            <input
                                type="text"
                                value={settings.instagramIppnu}
                                onChange={(e) => setSettings({ ...settings, instagramIppnu: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-background text-foreground"
                                placeholder="@ippnusemarang"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
