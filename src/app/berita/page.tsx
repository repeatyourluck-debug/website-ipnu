import Link from "next/link";
import { Calendar, ArrowLeft } from "lucide-react";
import Footer from "@/components/layout/Footer";

import { supabase } from "@/lib/supabaseClient";

interface Article {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    image: string;
    category: string;
}

async function getArticles(): Promise<Article[]> {
    const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching articles:", error);
        return [];
    }

    return data || [];
}

export const dynamic = "force-dynamic"; // Always fetch fresh data

export default async function BeritaPage() {
    const articles = await getArticles();

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1 bg-zinc-50">
                <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                    {/* Header */}
                    <div className="mb-12">
                        <Link href="/" className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-ipnu-primary mb-4">
                            <ArrowLeft className="h-4 w-4" /> Kembali ke Beranda
                        </Link>
                        <h1 className="text-4xl font-bold text-foreground">Kabar Pelajar NU</h1>
                        <p className="mt-2 text-lg text-foreground/60">Berita dan artikel terbaru dari IPNU IPPNU Semarang.</p>
                    </div>

                    {/* Articles Grid */}
                    {articles.length === 0 ? (
                        <div className="text-center py-12 text-foreground/50">
                            Belum ada artikel. Silakan tambahkan melalui Admin Panel.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {articles.map((article) => (
                                <article
                                    key={article.id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-black/5 group"
                                >
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <span className="absolute top-4 left-4 bg-ipnu-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                                            {article.category}
                                        </span>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 text-xs text-foreground/50 mb-3">
                                            <Calendar className="h-3 w-3" />
                                            {article.date}
                                        </div>
                                        <h2 className="text-lg font-semibold text-foreground group-hover:text-ipnu-primary transition-colors line-clamp-2">
                                            {article.title}
                                        </h2>
                                        <p className="mt-2 text-sm text-foreground/60 line-clamp-3">
                                            {article.excerpt}
                                        </p>
                                        <Link
                                            href={`/berita/${article.id}`}
                                            className="mt-4 inline-block text-sm font-semibold text-ipnu-primary hover:text-ipnu-secondary"
                                        >
                                            Baca selengkapnya →
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
