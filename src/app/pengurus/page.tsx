import Link from "next/link";
import { ArrowLeft, Instagram } from "lucide-react";
import Footer from "@/components/layout/Footer";

interface Pengurus {
    id: number;
    name: string;
    position: string;
    organization: string;
    image: string;
    instagram: string;
}

async function getPengurus(): Promise<Pengurus[]> {
    const fs = await import("fs");
    const path = await import("path");
    const dataFilePath = path.join(process.cwd(), "src/data/pengurus.json");

    try {
        const data = fs.readFileSync(dataFilePath, "utf-8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

export const dynamic = "force-dynamic";

export default async function PengurusPage() {
    const pengurus = await getPengurus();

    const ipnuPengurus = pengurus.filter((p) => p.organization === "IPNU");
    const ippnuPengurus = pengurus.filter((p) => p.organization === "IPPNU");

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1">
                {/* Hero */}
                <div className="bg-gradient-to-br from-ipnu-primary to-ipnu-secondary py-20 px-6">
                    <div className="mx-auto max-w-4xl text-center text-white">
                        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-8">
                            <ArrowLeft className="h-4 w-4" /> Kembali ke Beranda
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold">Struktur Pengurus</h1>
                        <p className="mt-4 text-lg text-white/80">
                            PC IPNU IPPNU Kota Semarang Periode 2024-2026
                        </p>
                    </div>
                </div>

                <div className="mx-auto max-w-6xl px-6 py-16">
                    {/* IPNU Section */}
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full bg-ipnu-primary flex items-center justify-center text-white font-bold text-lg">
                                IP
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-foreground">Pengurus IPNU</h2>
                                <p className="text-foreground/60">Ikatan Pelajar Nahdlatul Ulama</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {ipnuPengurus.map((person) => (
                                <div
                                    key={person.id}
                                    className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-black/5 dark:border-white/10 text-center hover:shadow-lg transition-shadow"
                                >
                                    <img
                                        src={person.image}
                                        alt={person.name}
                                        className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-ipnu-primary/20"
                                    />
                                    <h3 className="mt-4 text-lg font-semibold text-foreground">{person.name}</h3>
                                    <p className="text-ipnu-primary font-medium">{person.position}</p>
                                    {person.instagram && (
                                        <a
                                            href={`https://instagram.com/${person.instagram.replace("@", "")}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 mt-3 text-sm text-foreground/50 hover:text-pink-500"
                                        >
                                            <Instagram className="h-4 w-4" /> {person.instagram}
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* IPPNU Section */}
                    <div>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full bg-ippnu-primary flex items-center justify-center text-white font-bold text-lg">
                                IPP
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-foreground">Pengurus IPPNU</h2>
                                <p className="text-foreground/60">Ikatan Pelajar Putri Nahdlatul Ulama</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {ippnuPengurus.map((person) => (
                                <div
                                    key={person.id}
                                    className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-black/5 dark:border-white/10 text-center hover:shadow-lg transition-shadow"
                                >
                                    <img
                                        src={person.image}
                                        alt={person.name}
                                        className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-ippnu-primary/20"
                                    />
                                    <h3 className="mt-4 text-lg font-semibold text-foreground">{person.name}</h3>
                                    <p className="text-ippnu-primary font-medium">{person.position}</p>
                                    {person.instagram && (
                                        <a
                                            href={`https://instagram.com/${person.instagram.replace("@", "")}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 mt-3 text-sm text-foreground/50 hover:text-pink-500"
                                        >
                                            <Instagram className="h-4 w-4" /> {person.instagram}
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
