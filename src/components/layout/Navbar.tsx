"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Berita", href: "/berita" },
    { name: "Agenda", href: "/agenda" },
    { name: "Tentang Kami", href: "/tentang" },
    { name: "Galeri", href: "/galeri" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo / Brand */}
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-xl font-bold tracking-tight text-ipnu-primary">
                                IPNU IPPNU
                            </span>
                            <span className="hidden text-xl font-light text-foreground sm:inline-block">
                                Semarang
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={clsx(
                                            "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-ipnu-primary/10 hover:text-ipnu-primary",
                                            isActive
                                                ? "text-ipnu-primary font-semibold"
                                                : "text-foreground/80"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                            {/* Admin Link Special */}
                            <Link
                                href="/admin"
                                className="ml-4 rounded-full bg-ipnu-primary px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-105 hover:bg-ipnu-secondary"
                            >
                                Login Admin
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ipnu-primary"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={clsx(
                                        "block rounded-md px-3 py-2 text-base font-medium",
                                        isActive
                                            ? "bg-ipnu-primary/10 text-ipnu-primary"
                                            : "text-foreground/80 hover:bg-black/5 hover:text-foreground"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                        <Link
                            href="/admin"
                            onClick={() => setIsOpen(false)}
                            className="mt-4 block w-full rounded-md bg-ipnu-primary px-3 py-2 text-center text-base font-medium text-white hover:bg-ipnu-secondary"
                        >
                            Login Admin
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
