"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FileText, Calendar, LogOut, Menu, X, Plus, Home, Users, Image as ImageIcon } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
        if (!isLoggedIn) {
            router.push("/admin");
        } else {
            setIsLoading(false);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("isAdminLoggedIn");
        router.push("/admin");
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ipnu-primary"></div>
            </div>
        );
    }

    const navItems = [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Kelola Artikel", href: "/admin/dashboard/articles", icon: FileText },
        { name: "Kelola Pengurus", href: "/admin/dashboard/pengurus", icon: Users },
        { name: "Kelola Agenda", href: "/admin/dashboard/agenda", icon: Calendar },
        { name: "Kelola Galeri", href: "/admin/dashboard/gallery", icon: ImageIcon },
        { name: "Pengaturan", href: "/admin/dashboard/settings", icon: LayoutDashboard },
    ];

    return (
        <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-zinc-900 border-r border-black/5 dark:border-white/10 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between h-16 px-4 border-b border-black/5 dark:border-white/10">
                        <Link href="/admin/dashboard" className="font-bold text-ipnu-primary text-lg">
                            Admin Panel
                        </Link>
                        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-foreground/60">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Nav Links */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-foreground/70 hover:bg-ipnu-primary/10 hover:text-ipnu-primary transition-colors font-medium"
                            >
                                <item.icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-black/5 dark:border-white/10 space-y-2">
                        <Link
                            href="/"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-foreground/70 hover:bg-blue-500/10 hover:text-blue-500 transition-colors font-medium w-full"
                        >
                            <Home className="h-5 w-5" />
                            Lihat Website
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-500/10 transition-colors font-medium w-full"
                        >
                            <LogOut className="h-5 w-5" />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:pl-64">
                {/* Top Bar */}
                <header className="sticky top-0 z-40 h-16 bg-white dark:bg-zinc-900 border-b border-black/5 dark:border-white/10 flex items-center justify-between px-4 lg:px-8">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="lg:hidden text-foreground/60 hover:text-foreground"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    <div className="text-sm text-foreground/60">Selamat datang, Admin!</div>
                    <Link
                        href="/admin/dashboard/articles/new"
                        className="flex items-center gap-2 bg-ipnu-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-ipnu-secondary transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                        Artikel Baru
                    </Link>
                </header>

                {/* Page Content */}
                <main className="p-4 lg:p-8">{children}</main>
            </div>

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
}
