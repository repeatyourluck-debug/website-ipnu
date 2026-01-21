import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-black border-t border-black/5 dark:border-white/10" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <h3 className="text-xl font-bold text-ipnu-primary">IPNU IPPNU Semarang</h3>
                        <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                            Belajar, Berjuang, Bertakwa.
                            <br />
                            Membangun peradaban pelajar yang berakhlakul karimah.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-ipnu-primary">
                                <span className="sr-only">Facebook</span>
                                <Facebook className="h-6 w-6" aria-hidden="true" />
                            </a>
                            <a href="https://instagram.com/ipnusemarang" className="text-gray-400 hover:text-ipnu-primary">
                                <span className="sr-only">Instagram</span>
                                <Instagram className="h-6 w-6" aria-hidden="true" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-ipnu-primary">
                                <span className="sr-only">Twitter</span>
                                <Twitter className="h-6 w-6" aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-foreground">Organisasi</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li>
                                        <Link href="/tentang" className="text-sm leading-6 text-gray-600 hover:text-ipnu-primary dark:text-gray-400">
                                            Profil
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/pengurus" className="text-sm leading-6 text-gray-600 hover:text-ipnu-primary dark:text-gray-400">
                                            Struktur Pengurus
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/sejarah" className="text-sm leading-6 text-gray-600 hover:text-ipnu-primary dark:text-gray-400">
                                            Sejarah
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-foreground">Informasi</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li>
                                        <Link href="/berita" className="text-sm leading-6 text-gray-600 hover:text-ipnu-primary dark:text-gray-400">
                                            Berita Terbaru
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/agenda" className="text-sm leading-6 text-gray-600 hover:text-ipnu-primary dark:text-gray-400">
                                            Agenda Kegiatan
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/galeri" className="text-sm leading-6 text-gray-600 hover:text-ipnu-primary dark:text-gray-400">
                                            Galeri Foto
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-foreground">Kontak</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li className="flex items-start gap-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                                        <Mail className="h-5 w-5 mt-0.5" />
                                        <span>
                                            Sekretariat PC IPNU IPPNU Kota Semarang<br />
                                            Jl. Puspogiwang I No. 45<br />
                                            Semarang Barat, Kota Semarang
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-black/10 pt-8 sm:mt-20 lg:mt-24 dark:border-white/10">
                    <p className="text-xs leading-5 text-gray-500">
                        &copy; {new Date().getFullYear()} PC IPNU IPPNU Kota Semarang. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
