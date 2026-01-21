"use client";

import { FileText, Users, Eye, TrendingUp } from "lucide-react";

const stats = [
    { name: "Total Artikel", value: "24", icon: FileText, color: "bg-blue-500" },
    { name: "Total Pengunjung", value: "1,250", icon: Eye, color: "bg-green-500" },
    { name: "Anggota Terdaftar", value: "156", icon: Users, color: "bg-purple-500" },
    { name: "Kegiatan Bulan Ini", value: "5", icon: TrendingUp, color: "bg-orange-500" },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                <p className="text-foreground/60 mt-1">Ringkasan aktivitas website IPNU IPPNU Semarang.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.name}
                        className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-black/5 dark:border-white/10"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`${stat.color} p-3 rounded-lg`}>
                                <stat.icon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-foreground/60">{stat.name}</p>
                                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-black/5 dark:border-white/10">
                <h2 className="text-lg font-semibold text-foreground mb-4">Aktivitas Terbaru</h2>
                <div className="space-y-4">
                    {[
                        { action: "Artikel baru dipublikasikan", time: "5 menit lalu", user: "Admin" },
                        { action: "Agenda kegiatan diperbarui", time: "1 jam lalu", user: "Admin" },
                        { action: "Foto galeri baru ditambahkan", time: "3 jam lalu", user: "Admin" },
                    ].map((activity, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-black/5 dark:border-white/10 last:border-0">
                            <div>
                                <p className="text-sm font-medium text-foreground">{activity.action}</p>
                                <p className="text-xs text-foreground/50">oleh {activity.user}</p>
                            </div>
                            <span className="text-xs text-foreground/50">{activity.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
