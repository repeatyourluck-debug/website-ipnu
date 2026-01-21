import Link from "next/link";
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";
import Footer from "@/components/layout/Footer";

import { supabase } from "@/lib/supabaseClient";

interface Agenda {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    category: string;
}

async function getAgenda(): Promise<Agenda[]> {
    const { data, error } = await supabase
        .from("agenda")
        .select("*")
        .order("date", { ascending: true });

    if (error) {
        console.error("Error fetching agenda:", error);
        return [];
    }

    return data || [];
}

export const dynamic = "force-dynamic";

export default async function AgendaPage() {
    const agenda = await getAgenda();

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1">
                {/* Hero */}
                <div className="bg-gradient-to-br from-ipnu-primary to-ipnu-secondary py-20 px-6">
                    <div className="mx-auto max-w-4xl text-center text-white">
                        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-8">
                            <ArrowLeft className="h-4 w-4" /> Kembali ke Beranda
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold">Agenda Kegiatan</h1>
                        <p className="mt-4 text-lg text-white/80">
                            Jadwal kegiatan PC IPNU IPPNU Kota Semarang
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="mx-auto max-w-4xl px-6 py-16">
                    {agenda.length === 0 ? (
                        <div className="text-center text-foreground/50 py-12">
                            <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
                            <p className="text-lg">Belum ada agenda kegiatan.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {agenda.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-black/5 dark:border-white/10 flex gap-6 hover:shadow-lg transition-shadow"
                                >
                                    {/* Date Box */}
                                    <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-gradient-to-br from-ipnu-primary to-ipnu-secondary flex flex-col items-center justify-center text-white">
                                        <span className="text-3xl font-bold">{new Date(item.date).getDate()}</span>
                                        <span className="text-sm uppercase">
                                            {new Date(item.date).toLocaleDateString("id-ID", { month: "short" })}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <span className="inline-block bg-ipnu-primary/10 text-ipnu-primary text-xs font-medium px-2 py-1 rounded-full mb-2">
                                                    {item.category}
                                                </span>
                                                <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                                            </div>
                                        </div>
                                        <p className="text-foreground/60 mt-2">{item.description}</p>
                                        <div className="flex flex-wrap gap-4 mt-4 text-sm text-foreground/50">
                                            <span className="inline-flex items-center gap-1">
                                                <Clock className="h-4 w-4" /> {item.time} WIB
                                            </span>
                                            <span className="inline-flex items-center gap-1">
                                                <MapPin className="h-4 w-4" /> {item.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
