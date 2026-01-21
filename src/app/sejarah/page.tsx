import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";
import Footer from "@/components/layout/Footer";

export default function SejarahPage() {
    const timelineIpnu = [
        { year: "1954", event: "IPNU didirikan pada tanggal 24 Februari 1954 (20 Jumadil Akhir 1373 H) di Semarang oleh para tokoh pelajar NU." },
        { year: "1954", event: "Tolchah Mansoer terpilih sebagai Ketua Umum IPNU pertama." },
        { year: "1955", event: "Kongres I IPNU diselenggarakan di Surabaya." },
        { year: "1984", event: "IPNU diterima menjadi anggota Badan Otonom NU." },
        { year: "2024", event: "IPNU genap berusia 70 tahun, terus berkembang di seluruh Indonesia." },
    ];

    const timelineIppnu = [
        { year: "1955", event: "IPPNU didirikan pada tanggal 2 Maret 1955 di Malang, Jawa Timur." },
        { year: "1955", event: "Umroh Mahfudhoh terpilih sebagai Ketua Umum IPPNU pertama." },
        { year: "1984", event: "IPPNU resmi menjadi Badan Otonom NU bersama IPNU." },
        { year: "2025", event: "IPPNU genap berusia 70 tahun, terus membina pelajar putri NU." },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1">
                {/* Hero */}
                <div className="bg-gradient-to-br from-ipnu-primary to-ipnu-secondary py-20 px-6">
                    <div className="mx-auto max-w-4xl text-center text-white">
                        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-8">
                            <ArrowLeft className="h-4 w-4" /> Kembali ke Beranda
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold">Sejarah IPNU IPPNU</h1>
                        <p className="mt-4 text-lg text-white/80">
                            Perjalanan panjang organisasi pelajar NU
                        </p>
                    </div>
                </div>

                <div className="mx-auto max-w-5xl px-6 py-16">
                    {/* Intro */}
                    <div className="text-center mb-16">
                        <p className="text-lg text-foreground/70 leading-relaxed max-w-3xl mx-auto">
                            IPNU dan IPPNU merupakan organisasi pelajar di bawah naungan Nahdlatul Ulama yang lahir dari semangat
                            para pemuda dan pemudi NU untuk mewadahi gerakan pelajar dalam memperjuangkan ajaran Ahlussunnah Wal Jamaah.
                        </p>
                    </div>

                    {/* IPNU History */}
                    <div className="mb-20">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 rounded-full bg-ipnu-primary flex items-center justify-center text-white font-bold text-xl">
                                IPNU
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-foreground">Sejarah IPNU</h2>
                                <p className="text-foreground/60">Ikatan Pelajar Nahdlatul Ulama</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-sm border border-black/5 dark:border-white/10 mb-8">
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 text-ipnu-primary mb-4">
                                        <Calendar className="h-5 w-5" />
                                        <span className="font-semibold">24 Februari 1954</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-foreground/60 mb-4">
                                        <MapPin className="h-5 w-5" />
                                        <span>Semarang, Jawa Tengah</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-foreground/60">
                                        <Users className="h-5 w-5" />
                                        <span>Ketua Pertama: Tolchah Mansoer</span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-foreground/70 leading-relaxed">
                                        IPNU didirikan di Semarang sebagai wadah bagi para pelajar putra Nahdlatul Ulama.
                                        Organisasi ini lahir dari kesadaran akan pentingnya pembinaan generasi muda NU yang
                                        berakhlakul karimah, berilmu, dan cinta tanah air.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="relative pl-8 border-l-2 border-ipnu-primary/30 space-y-6">
                            {timelineIpnu.map((item, index) => (
                                <div key={index} className="relative">
                                    <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-ipnu-primary"></div>
                                    <div className="bg-ipnu-primary/5 rounded-lg p-4">
                                        <span className="text-sm font-bold text-ipnu-primary">{item.year}</span>
                                        <p className="text-foreground/70 mt-1">{item.event}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* IPPNU History */}
                    <div>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 rounded-full bg-ippnu-primary flex items-center justify-center text-white font-bold text-lg">
                                IPPNU
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-foreground">Sejarah IPPNU</h2>
                                <p className="text-foreground/60">Ikatan Pelajar Putri Nahdlatul Ulama</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-sm border border-black/5 dark:border-white/10 mb-8">
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 text-ippnu-primary mb-4">
                                        <Calendar className="h-5 w-5" />
                                        <span className="font-semibold">2 Maret 1955</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-foreground/60 mb-4">
                                        <MapPin className="h-5 w-5" />
                                        <span>Malang, Jawa Timur</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-foreground/60">
                                        <Users className="h-5 w-5" />
                                        <span>Ketua Pertama: Umroh Mahfudhoh</span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-foreground/70 leading-relaxed">
                                        IPPNU didirikan di Malang sebagai wadah bagi para pelajar putri Nahdlatul Ulama.
                                        Organisasi ini lahir untuk memberdayakan perempuan muda NU agar memiliki peran aktif
                                        dalam pembangunan bangsa dengan tetap menjunjung tinggi nilai-nilai Islam Ahlussunnah Wal Jamaah.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="relative pl-8 border-l-2 border-ippnu-primary/30 space-y-6">
                            {timelineIppnu.map((item, index) => (
                                <div key={index} className="relative">
                                    <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-ippnu-primary"></div>
                                    <div className="bg-ippnu-primary/5 rounded-lg p-4">
                                        <span className="text-sm font-bold text-ippnu-primary">{item.year}</span>
                                        <p className="text-foreground/70 mt-1">{item.event}</p>
                                    </div>
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
