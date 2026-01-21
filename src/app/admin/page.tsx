"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User } from "lucide-react";

export default function AdminLoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple demo auth - in production, use proper auth
        if (username === "admin" && password === "admin123") {
            localStorage.setItem("isAdminLoggedIn", "true");
            router.push("/admin/dashboard");
        } else {
            setError("Username atau password salah!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ipnu-primary to-ipnu-secondary p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                    <defs>
                        <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="none" stroke="white" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#pattern)" />
                </svg>
            </div>

            <div className="w-full max-w-md relative">
                {/* Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-ipnu-primary/10 p-8 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ipnu-primary text-white mb-4">
                            <Lock className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
                        <p className="text-foreground/60 mt-1">IPNU IPPNU Semarang</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="p-8 space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ipnu-primary focus:border-ipnu-primary bg-background text-foreground"
                                    placeholder="Masukkan username"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ipnu-primary focus:border-ipnu-primary bg-background text-foreground"
                                    placeholder="Masukkan password"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-ipnu-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-ipnu-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ipnu-primary focus:ring-offset-2"
                        >
                            Masuk
                        </button>

                        <p className="text-center text-xs text-gray-500 mt-4">
                            Demo: username <code className="bg-gray-100 px-1 rounded">admin</code> / password <code className="bg-gray-100 px-1 rounded">admin123</code>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
