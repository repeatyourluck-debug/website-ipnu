"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { mockArticles } from "@/lib/data";

export default function NewsSection() {
    return (
        <section className="py-24 sm:py-32 bg-zinc-50 dark:bg-zinc-900/50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Kabar Pelajar NU
                    </h2>
                    <p className="mt-2 text-lg leading-8 text-foreground/60">
                        Informasi terkini kegiatan dan opini pelajar NU Kota Semarang.
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {mockArticles.map((post) => (
                        <article
                            key={post.id}
                            className="flex flex-col items-start justify-between bg-white dark:bg-white/5 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-black/5 dark:border-white/5"
                        >
                            <div className="relative w-full">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                />
                                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                            </div>
                            <div className="max-w-xl">
                                <div className="mt-8 flex items-center gap-x-4 text-xs">
                                    <time dateTime={post.date} className="text-gray-500 flex items-center gap-1">
                                        <Calendar className="h-3 w-3" /> {post.date}
                                    </time>
                                    <span className="relative z-10 rounded-full bg-ipnu-primary/10 px-3 py-1.5 font-medium text-ipnu-primary hover:bg-gray-100">
                                        {post.category}
                                    </span>
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-foreground group-hover:text-ipnu-primary transition-colors">
                                        <Link href={`/berita/${post.id}`}>
                                            <span className="absolute inset-0" />
                                            {post.title}
                                        </Link>
                                    </h3>
                                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                                        {post.excerpt}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <Link
                        href="/berita"
                        className="inline-flex items-center gap-2 text-sm font-semibold leading-6 text-ipnu-primary hover:text-ipnu-secondary"
                    >
                        Lihat Semua Berita <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
