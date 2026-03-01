"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Brain, Search } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";

export default function RoleSelectionPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 pt-24 bg-slate-100 dark:bg-[#0B0E14] transition-colors duration-300 relative overflow-hidden font-sans">
            {/* Background Ambience - Dark Mode Only */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-0 dark:opacity-100 transition-opacity duration-300">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]" />
            </div>

            <Navbar />

            <main className="w-full max-w-4xl relative z-10">
                <div className="bg-white dark:bg-[#161B22] border border-transparent dark:border-white/10 rounded-[2.5rem] p-10 md:p-14 shadow-2xl transition-colors duration-300">

                    <div className="flex flex-col items-center text-center mb-14">
                        {/* Butterfly Logo */}
                        <Link href="/" className="mb-6 hover:scale-105 transition-transform duration-300 block">
                            <Image
                                src="/butterfly.svg"
                                alt="TwinlyAI"
                                width={56}
                                height={56}
                                className="w-14 h-14"
                            />
                        </Link>

                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-800 dark:text-[#F9FAFB] mb-4">
                            Choose your path
                        </h1>
                        <p className="text-slate-500 dark:text-[#9CA3AF] text-lg max-w-lg leading-relaxed">
                            Select how you'll use TwinlyAI to tailor your experience.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Candidate Card */}
                        <Link href="/onboarding?role=candidate" className="group relative block flex-col items-start text-left p-10 rounded-3xl border border-slate-100 dark:border-white/10 bg-white dark:bg-[#1C2128] hover:bg-slate-50 dark:hover:bg-[#1C2128] transition-all duration-300 hover:shadow-xl hover:shadow-blue-100 dark:hover:shadow-purple-500/10 hover:-translate-y-1">
                            <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-purple-500/10 flex items-center justify-center text-blue-600 dark:text-purple-400 mb-8 dark:mb-10 border border-transparent dark:border-purple-500/20 transition-all duration-300">
                                <Brain size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-[#F9FAFB] mb-3 dark:mb-4">
                                I am a Candidate
                            </h3>
                            <p className="text-slate-500 dark:text-[#9CA3AF] mb-8 dark:mb-10 leading-relaxed text-base">
                                Build your AI Twin, manage your professional persona, and accelerate your career growth.
                            </p>
                            <div className="mt-auto flex items-center font-bold text-blue-600 dark:text-purple-400 text-[13px] tracking-[0.1em] uppercase">
                                Building my Twin
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        {/* Recruiter Card */}
                        <Link href="/onboarding?role=recruiter" className="group relative block flex-col items-start text-left p-10 rounded-3xl border border-slate-100 dark:border-white/10 bg-white dark:bg-[#1C2128] hover:bg-slate-50 dark:hover:bg-[#1C2128] transition-all duration-300 hover:shadow-xl hover:shadow-indigo-100 dark:hover:shadow-blue-500/10 hover:-translate-y-1">
                            <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-8 dark:mb-10 border border-transparent dark:border-blue-500/20 transition-all duration-300">
                                <Search size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-[#F9FAFB] mb-3 dark:mb-4">
                                I am a Recruiter
                            </h3>
                            <p className="text-slate-500 dark:text-[#9CA3AF] mb-8 dark:mb-10 leading-relaxed text-base">
                                Discover top-tier talent, engage with AI Twins, and streamline your entire hiring pipeline.
                            </p>
                            <div className="mt-auto flex items-center font-bold text-blue-600 dark:text-blue-400 text-[13px] tracking-[0.1em] uppercase">
                                Finding Talent
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    </div>

                    <div className="mt-14 text-center">
                        <p className="text-slate-400 dark:text-[#9CA3AF] text-sm font-semibold">
                            Already have an enterprise account?
                            <Link
                                href="/login"
                                className="text-slate-900 dark:text-[#F9FAFB] underline underline-offset-4 hover:text-slate-700 dark:hover:text-purple-400 transition-colors ml-1"
                            >
                                Log in here
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
