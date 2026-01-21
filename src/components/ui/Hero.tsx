"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface LatestUpdate {
    type: string;
    title: string;
    date: string;
    link: string;
}

interface Settings {
    heroImage: string;
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
}

export default function Hero() {
    const [latestUpdate, setLatestUpdate] = useState<LatestUpdate | null>(null);
    const [settings, setSettings] = useState<Settings | null>(null);

    useEffect(() => {
        fetch("/api/latest-update")
            .then((res) => res.json())
            .then((data) => setLatestUpdate(data))
            .catch(() => { });

        fetch("/api/settings")
            .then((res) => res.json())
            .then((data) => setSettings(data))
            .catch(() => { });
    }, []);

    return (
        <div className="relative isolate overflow-hidden bg-background">
            {/* Abstract Background Pattern (Islamic Geometric inspired CSS) */}
            <div className="absolute inset-0 -z-10 opacity-10">
                <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                    <defs>
                        <pattern id="islamic-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="none" stroke="currentColor" strokeWidth="1" className="text-ipnu-primary" />
                            <circle cx="20" cy="20" r="5" fill="currentColor" className="text-ipnu-secondary" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
                </svg>
            </div>

            {/* Gradient Overlay */}
            <div
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true"
            >
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-ipnu-primary to-nu-gold opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                />
            </div>

            <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
                    <div className="mt-24 sm:mt-32 lg:mt-16">
                        {latestUpdate && (
                            <Link href={latestUpdate.link} className="inline-flex space-x-6 group">
                                <span className="rounded-full bg-ipnu-primary/10 px-3 py-1 text-sm font-semibold leading-6 text-ipnu-primary ring-1 ring-inset ring-ipnu-primary/10 transition-colors group-hover:bg-ipnu-primary/20">
                                    {latestUpdate.type} Terbaru
                                </span>
                                <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-foreground/60 group-hover:text-foreground transition-colors">
                                    <span className="line-clamp-1 max-w-[250px]">{latestUpdate.title}</span>
                                    <ArrowRight className="h-4 w-4 text-foreground/40 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                        )}
                    </div>
                    <h1 className="mt-10 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                        {settings?.heroTitle?.split(" ").slice(0, -1).join(" ") || "Pelajar NU"}{" "}
                        <span className="text-ipnu-primary">{settings?.heroTitle?.split(" ").pop() || "Semarang"}</span>
                        <br />
                        <span className="text-nu-gold">{settings?.heroSubtitle || "Kreatif & Berbudaya"}</span>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-foreground/70">
                        {settings?.heroDescription || "Wadah kreatifitas dan perjuangan pelajar Nahdlatul Ulama Kota Semarang. Belajar, Berjuang, Bertakwa untuk agama, bangsa, dan negeri."}
                    </p>
                    <div className="mt-10 flex items-center gap-x-6">
                        <Link
                            href="/tentang"
                            className="rounded-full bg-ipnu-primary px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-ipnu-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ipnu-primary transition-all hover:shadow-lg hover:-translate-y-1"
                        >
                            Tentang Kami <span aria-hidden="true">→</span>
                        </Link>

                    </div>
                </div>

                {/* Right side Image/Graphic */}
                <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
                    <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                        <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 dark:bg-white/5 dark:ring-white/10 glassmorphism-card">
                            {settings?.heroImage ? (
                                <img
                                    src={settings.heroImage}
                                    alt="IPNU IPPNU Semarang"
                                    className="w-[30rem] rounded-md shadow-2xl ring-1 ring-gray-900/10 dark:ring-white/10 lg:w-[40rem] object-cover"
                                />
                            ) : (
                                <div className="w-[30rem] h-[20rem] lg:w-[40rem] lg:h-[25rem] rounded-md bg-gradient-to-br from-ipnu-primary to-ippnu-primary flex items-center justify-center">
                                    <div className="text-center text-white">
                                        <p className="text-6xl font-bold">IPNU</p>
                                        <p className="text-4xl font-bold mt-2">IPPNU</p>
                                        <p className="mt-4 text-lg">Semarang</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
