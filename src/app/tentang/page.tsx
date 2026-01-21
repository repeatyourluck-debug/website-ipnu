import Link from "next/link";
import { ArrowLeft, Users, Target, BookOpen, Heart, Globe, Lightbulb } from "lucide-react";
import Footer from "@/components/layout/Footer";

export default function TentangPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1">
                {/* Hero */}
                <div className="bg-gradient-to-br from-ipnu-primary to-ipnu-secondary py-20 px-6">
                    <div className="mx-auto max-w-4xl text-center text-white">
                        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-8">
                            <ArrowLeft className="h-4 w-4" /> Kembali ke Beranda
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold">Tentang Kami</h1>
                        <p className="mt-4 text-lg text-white/80">
                            Pimpinan Cabang IPNU IPPNU Kota Semarang
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="mx-auto max-w-5xl px-6 py-16">
                    {/* Intro */}
                    <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
                        <p className="text-lg text-foreground/70 leading-relaxed">
                            <strong>IPNU (Ikatan Pelajar Nahdlatul Ulama)</strong> dan <strong>IPPNU (Ikatan Pelajar Putri Nahdlatul Ulama)</strong>
                            adalah organisasi pelajar di bawah naungan Nahdlatul Ulama yang bergerak dalam bidang kaderisasi,
                            pendidikan, dan pengembangan potensi pelajar yang berakhlakul karimah.
                        </p>
                    </div>

                    {/* IPNU Section */}
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 rounded-full bg-ipnu-primary flex items-center justify-center text-white font-bold text-xl">
                                IPNU
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-foreground">Visi & Misi IPNU</h2>
                                <p className="text-foreground/60">Ikatan Pelajar Nahdlatul Ulama</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-sm border border-black/5 dark:border-white/10 mb-6">
                            <h3 className="text-lg font-semibold text-ipnu-primary mb-4 flex items-center gap-2">
                                <Target className="h-5 w-5" /> Visi
                            </h3>
                            <p className="text-foreground/70 leading-relaxed">
                                Terwujudnya pelajar bangsa yang bertaqwa kepada Allah SWT, berilmu, berakhlak mulia,
                                berwawasan kebangsaan dan kebhinekaan, serta bertanggung jawab atas terlaksananya
                                <strong> syari'at Islam Ahlussunnah Wal-Jama'ah An-Nahdliyah</strong> yang berdasarkan
                                Pancasila dan Undang-Undang Dasar 1945 demi tegaknya NKRI.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-sm border border-black/5 dark:border-white/10">
                            <h3 className="text-lg font-semibold text-ipnu-primary mb-4 flex items-center gap-2">
                                <Lightbulb className="h-5 w-5" /> Misi
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ipnu-primary/10 text-ipnu-primary flex items-center justify-center text-sm font-bold">1</span>
                                    <p className="text-foreground/70">Menghimpun dan membina pelajar Nahdlatul Ulama dalam satu wadah organisasi.</p>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ipnu-primary/10 text-ipnu-primary flex items-center justify-center text-sm font-bold">2</span>
                                    <p className="text-foreground/70">Mempersiapkan kader-kader intelektual sebagai penerus perjuangan bangsa.</p>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ipnu-primary/10 text-ipnu-primary flex items-center justify-center text-sm font-bold">3</span>
                                    <p className="text-foreground/70">Mengusahakan tercapainya tujuan organisasi dengan menyusun landasan program perjuangan sesuai dengan perkembangan masyarakat (maslahah al-ammah), guna terwujudnya khaira ummah.</p>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ipnu-primary/10 text-ipnu-primary flex items-center justify-center text-sm font-bold">4</span>
                                    <p className="text-foreground/70">Mendorong para pelajar bangsa untuk taat dalam menjalankan perintah dan menjauhi segala larangan yang termaktub dalam ajaran Islam.</p>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ipnu-primary/10 text-ipnu-primary flex items-center justify-center text-sm font-bold">5</span>
                                    <p className="text-foreground/70">Membentuk karakter para pelajar bangsa yang santun dalam bertindak, jujur dalam berperilaku, jernih dan objektif dalam berpikir, serta memiliki ide/gagasan yang inovatif.</p>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ipnu-primary/10 text-ipnu-primary flex items-center justify-center text-sm font-bold">6</span>
                                    <p className="text-foreground/70">Mendorong pemanfaatan dan pengembangan ilmu pengetahuan dan teknologi sebagai media pengembangan potensi dan peningkatan SDM pelajar.</p>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ipnu-primary/10 text-ipnu-primary flex items-center justify-center text-sm font-bold">7</span>
                                    <p className="text-foreground/70">Mewujudkan kader pemimpin bangsa yang profesional, jujur, dan bertanggung jawab yang dilandasi oleh spirit nilai ajaran Islam Ahlussunnah Wal Jama'ah.</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* IPPNU Section */}
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 rounded-full bg-ippnu-primary flex items-center justify-center text-white font-bold text-lg">
                                IPPNU
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-foreground">Visi & Misi IPPNU</h2>
                                <p className="text-foreground/60">Ikatan Pelajar Putri Nahdlatul Ulama</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-sm border border-black/5 dark:border-white/10 mb-6">
                            <h3 className="text-lg font-semibold text-ippnu-primary mb-4 flex items-center gap-2">
                                <Target className="h-5 w-5" /> Visi
                            </h3>
                            <p className="text-foreground/70 leading-relaxed">
                                Terbentuknya kesempurnaan <strong>Pelajar Putri Indonesia</strong> yang bertakwa,
                                berakhlaqul karimah, berilmu, dan berwawasan kebangsaan.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-sm border border-black/5 dark:border-white/10">
                            <h3 className="text-lg font-semibold text-ippnu-primary mb-4 flex items-center gap-2">
                                <Lightbulb className="h-5 w-5" /> Misi
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ippnu-primary/10 text-ippnu-primary flex items-center justify-center text-sm font-bold">1</span>
                                    <p className="text-foreground/70">Membangun kader NU yang berkualitas, berakhlaqul karimah, bersikap demokratis dalam kehidupan bermasyarakat, berbangsa, dan bernegara.</p>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ippnu-primary/10 text-ippnu-primary flex items-center justify-center text-sm font-bold">2</span>
                                    <p className="text-foreground/70">Mengembangkan wacana dan kualitas sumber daya kader menuju terciptanya kesetaraan gender.</p>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ippnu-primary/10 text-ippnu-primary flex items-center justify-center text-sm font-bold">3</span>
                                    <p className="text-foreground/70">Membentuk kader yang dinamis, kreatif, dan inovatif.</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Values */}
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Nilai-Nilai Kami</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center p-6 rounded-2xl bg-ipnu-primary/5 border border-ipnu-primary/10">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ipnu-primary/10 text-ipnu-primary mb-4">
                                    <BookOpen className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground">Berilmu</h3>
                                <p className="mt-2 text-sm text-foreground/60">
                                    Menuntut ilmu sebagai bekal membangun peradaban Islam yang rahmatan lil 'alamin.
                                </p>
                            </div>
                            <div className="text-center p-6 rounded-2xl bg-ipnu-primary/5 border border-ipnu-primary/10">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ipnu-primary/10 text-ipnu-primary mb-4">
                                    <Heart className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground">Berakhlak</h3>
                                <p className="mt-2 text-sm text-foreground/60">
                                    Menjunjung tinggi akhlakul karimah dalam setiap aspek kehidupan.
                                </p>
                            </div>
                            <div className="text-center p-6 rounded-2xl bg-ipnu-primary/5 border border-ipnu-primary/10">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ipnu-primary/10 text-ipnu-primary mb-4">
                                    <Globe className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground">Berwawasan</h3>
                                <p className="mt-2 text-sm text-foreground/60">
                                    Memiliki wawasan kebangsaan dan kebhinekaan untuk NKRI.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
