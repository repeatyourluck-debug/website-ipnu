"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Edit, Trash2, Plus, Search, RefreshCw } from "lucide-react";

interface Article {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    image: string;
    category: string;
}

export default function ArticlesPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const fetchArticles = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/articles");
            const data = await res.json();
            setArticles(data);
        } catch (error) {
            console.error("Failed to fetch articles:", error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const filteredArticles = articles.filter((article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id: number) => {
        if (confirm("Yakin ingin menghapus artikel ini?")) {
            try {
                const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
                if (res.ok) {
                    setArticles(articles.filter((a) => a.id !== id));
                }
            } catch (error) {
                console.error("Failed to delete:", error);
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Kelola Artikel</h1>
                    <p className="text-foreground/60 mt-1">Buat, edit, dan hapus artikel website.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={fetchArticles}
                        className="inline-flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-foreground px-4 py-2.5 rounded-lg font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                    >
                        <RefreshCw className="h-5 w-5" />
                        Refresh
                    </button>
                    <Link
                        href="/admin/dashboard/articles/new"
                        className="inline-flex items-center gap-2 bg-ipnu-primary text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-ipnu-secondary transition-colors"
                    >
                        <Plus className="h-5 w-5" />
                        Artikel Baru
                    </Link>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
                <input
                    type="text"
                    placeholder="Cari artikel..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-foreground focus:ring-2 focus:ring-ipnu-primary focus:border-ipnu-primary"
                />
            </div>

            {/* Articles Table */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-black/5 dark:border-white/10 overflow-hidden">
                {isLoading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-ipnu-primary mx-auto"></div>
                        <p className="mt-4 text-foreground/50">Memuat artikel...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-black/5 dark:divide-white/10">
                            <thead className="bg-zinc-50 dark:bg-zinc-800/50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">
                                        Artikel
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">
                                        Kategori
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">
                                        Tanggal
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-foreground/60 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-black/5 dark:divide-white/10">
                                {filteredArticles.map((article) => (
                                    <tr key={article.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={article.image}
                                                    alt={article.title}
                                                    className="h-12 w-16 rounded-lg object-cover"
                                                />
                                                <div>
                                                    <p className="font-medium text-foreground line-clamp-1">{article.title}</p>
                                                    <p className="text-sm text-foreground/50 line-clamp-1">{article.excerpt}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-ipnu-primary/10 text-ipnu-primary">
                                                {article.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-foreground/60">{article.date}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/dashboard/articles/${article.id}`}
                                                    className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(article.id)}
                                                    className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredArticles.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-foreground/50">
                                            Tidak ada artikel ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
