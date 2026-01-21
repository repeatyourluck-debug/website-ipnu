import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";

import { supabase } from "@/lib/supabaseClient";

interface Article {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    image: string;
    category: string;
}

async function getArticle(id: string): Promise<Article | null> {
    const { data: article, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        // If not found or error
        return null;
    }

    return article;
}

export const dynamic = "force-dynamic";

export default async function ArticleDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const article = await getArticle(id);

    if (!article) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1">
                {/* Hero Image */}
                <div className="relative h-64 md:h-96 bg-zinc-900">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>

                {/* Content */}
                <article className="mx-auto max-w-4xl px-6 -mt-32 relative z-10">
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                        {/* Back Link */}
                        <Link
                            href="/berita"
                            className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-ipnu-primary mb-6"
                        >
                            <ArrowLeft className="h-4 w-4" /> Kembali ke Berita
                        </Link>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60 mb-4">
                            <span className="inline-flex items-center gap-1">
                                <Calendar className="h-4 w-4" /> {article.date}
                            </span>
                            <span className="inline-flex items-center gap-1 bg-ipnu-primary/10 text-ipnu-primary px-3 py-1 rounded-full text-xs font-medium">
                                <Tag className="h-3 w-3" /> {article.category}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
                            {article.title}
                        </h1>

                        {/* Excerpt */}
                        <p className="text-lg text-foreground/70 border-l-4 border-ipnu-primary pl-4 mb-8 italic">
                            {article.excerpt}
                        </p>

                        {/* Content */}
                        <div className="prose prose-lg max-w-none">
                            {article.content.split("\n").map((paragraph, index) => (
                                <p key={index} className="text-foreground/80 leading-relaxed mb-4">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* Share */}
                        <div className="mt-12 pt-8 border-t border-black/10">
                            <p className="text-sm text-foreground/60 mb-3">Bagikan artikel ini:</p>
                            <div className="flex gap-3">
                                <a
                                    href={`https://wa.me/?text=${encodeURIComponent(article.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                                >
                                    WhatsApp
                                </a>
                                <a
                                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                                >
                                    Twitter
                                </a>
                            </div>
                        </div>
                    </div>
                </article>

                <div className="h-24" />
            </div>
            <Footer />
        </div>
    );
}
