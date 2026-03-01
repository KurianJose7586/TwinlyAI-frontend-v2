"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Lock, Check } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 pt-24 bg-slate-100 dark:bg-[#0B0E14] transition-colors duration-300 relative overflow-hidden font-sans">
            {/* Background Ambience - Dark Mode Only */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-0 dark:opacity-100 transition-opacity duration-300">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]" />
            </div>

            <Navbar />

            <main className="w-full max-w-lg relative z-10">
                <div className="bg-white dark:bg-[#161B22] border border-transparent dark:border-white/10 rounded-[2.5rem] p-10 md:p-12 shadow-2xl transition-colors duration-300">

                    <div className="flex flex-col items-center text-center mb-10">
                        {/* Logo */}
                        <Link href="/" className="mb-6 hover:scale-105 transition-transform duration-300">
                            <Image
                                src="/butterfly.svg"
                                alt="TwinlyAI"
                                width={56}
                                height={56}
                                className="w-14 h-14"
                            />
                        </Link>

                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-[#F9FAFB] mb-3">
                            Welcome back
                        </h1>
                        <p className="text-slate-500 dark:text-[#9CA3AF] text-base max-w-xs leading-relaxed">
                            Sign in to manage your AI twin and access your professional insights.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Google Sign In Button */}
                        <button className="w-full flex items-center justify-center gap-3 bg-white dark:bg-[#1C2128] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-[#F9FAFB] px-6 py-4 rounded-2xl font-semibold hover:bg-slate-50 dark:hover:bg-[#22272E] transition-all duration-300 shadow-sm">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Continue with Google
                        </button>

                        <div className="relative py-4 flex items-center">
                            <div className="flex-grow border-t border-slate-200 dark:border-white/10"></div>
                            <span className="flex-shrink mx-4 text-slate-400 dark:text-[#57606A] text-[10px] font-bold uppercase tracking-widest">Or login with email</span>
                            <div className="flex-grow border-t border-slate-200 dark:border-white/10"></div>
                        </div>

                        <div className="space-y-4">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 dark:text-[#57606A] group-focus-within:text-blue-600 dark:group-focus-within:text-purple-400 transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Work email"
                                    className="w-full bg-slate-50 dark:bg-[#1C2128] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-[#F9FAFB] pl-12 pr-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 dark:focus:ring-purple-500/20 focus:border-blue-500 dark:focus:border-purple-400 transition-all placeholder:text-slate-400 dark:placeholder:text-[#57606A]"
                                />
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 dark:text-[#57606A] group-focus-within:text-blue-600 dark:group-focus-within:text-purple-400 transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full bg-slate-50 dark:bg-[#1C2128] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-[#F9FAFB] pl-12 pr-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 dark:focus:ring-purple-500/20 focus:border-blue-500 dark:focus:border-purple-400 transition-all placeholder:text-slate-400 dark:placeholder:text-[#57606A]"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-1">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div className="w-4 h-4 rounded border border-slate-300 dark:border-white/20 flex items-center justify-center bg-white dark:bg-[#1C2128] group-hover:border-blue-600 dark:group-hover:border-purple-400 transition-colors">
                                    <Check size={12} className="text-white opacity-0 transition-opacity" />
                                </div>
                                <span className="text-xs font-medium text-slate-500 dark:text-[#9CA3AF]">Remember me</span>
                            </label>
                            <Link href="#" className="text-xs font-bold text-blue-600 dark:text-purple-400 hover:underline underline-offset-4">
                                Forgot password?
                            </Link>
                        </div>

                        <button className="w-full bg-blue-600 dark:bg-purple-600 text-white px-6 py-4 rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg shadow-blue-500/20 dark:shadow-purple-500/20 flex items-center justify-center group mt-4">
                            Sign In
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="mt-10 text-center">
                        <p className="text-slate-500 dark:text-[#9CA3AF] text-sm">
                            Don't have an account?
                            <Link
                                href="/role-selection"
                                className="text-blue-600 dark:text-purple-400 font-bold hover:underline underline-offset-4 ml-1"
                            >
                                Sign up for free
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex justify-center items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-slate-300 dark:text-white/20 font-medium flex-wrap">
                    <Link href="#" className="hover:text-white dark:hover:text-white/40 transition-colors">
                        Privacy Policy
                    </Link>
                    <Link href="#" className="hover:text-white dark:hover:text-white/40 transition-colors">
                        Terms of Service
                    </Link>
                    <span>© 2024 TwinlyAI</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Designed in Lajpat Nagar</span>
                </div>
            </main>
        </div>
    );
}
