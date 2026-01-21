import Link from "next/link";
import { ArrowLeft, Instagram } from "lucide-react";
import Footer from "@/components/layout/Footer";

import { supabase } from "@/lib/supabaseClient";

interface GalleryItem {
    id: number;
    title: string;
    image: string;
    date: string;
}

async function getGallery(): Promise<GalleryItem[]> {
    const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching gallery:", error);
        return [];
    }

    return data || [];
}

export const dynamic = "force-dynamic";

export default async function GaleriPage() {
    const gallery = await getGallery();

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1">
                {/* Hero */}
                <div className="bg-gradient-to-br from-ipnu-primary to-ipnu-secondary py-20 px-6">
                    <div className="mx-auto max-w-4xl text-center text-white">
                        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-8">
                            <ArrowLeft className="h-4 w-4" /> Kembali ke Beranda
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold">Galeri Kegiatan</h1>
                        <p className="mt-4 text-lg text-white/80">
                            Dokumentasi kegiatan IPNU IPPNU Kota Semarang
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="mx-auto max-w-7xl px-6 py-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {gallery.map((item) => (
                            <div key={item.id} className="group relative break-inside-avoid">
                                <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-100 relative shadow-sm hover:shadow-xl transition-all duration-300">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                        <h3 className="text-white font-bold text-lg leading-tight">{item.title}</h3>
                                        <p className="text-white/70 text-sm mt-1">{item.date}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Instagram CTA */}
                    <div className="mt-20 text-center">
                        <p className="text-foreground/60 mb-6">Lihat dokumentasi selengkapnya di Instagram kami</p>
                        <div className="flex justify-center gap-4">
                            <a
                                href="https://instagram.com/ipnusemarang"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity"
                            >
                                <Instagram className="h-5 w-5" />
                                @ipnusemarang
                            </a>
                            <a
                                href="https://instagram.com/ippnusemarang"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity"
                            >
                                <Instagram className="h-5 w-5" />
                                @ippnusemarang
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
