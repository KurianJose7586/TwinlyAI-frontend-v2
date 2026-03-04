"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { useScroll, useMotionValueEvent, motion } from "framer-motion";

export function Navbar() {
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest: number) => {
        const previous = scrollY.getPrevious() ?? 0;

        // Always show at the very top of the page
        if (latest < 50) {
            setHidden(false);
            return;
        }

        // Only hide/show if scrolling with some velocity to prevent trackpad micro-bouncing
        // > 0 is scrolling down, < 0 is scrolling up
        const diff = latest - previous;

        if (diff > 5) {
            setHidden(true); // significantly scrolled down
        } else if (diff < -5) {
            setHidden(false); // significantly scrolled up
        }
    });

    return (
        <motion.div
            variants={{
                visible: { y: 0 },
                hidden: { y: "-120%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-6 left-0 right-0 z-[100] px-4 pointer-events-none"
        >
            <nav className="max-w-[1000px] mx-auto h-16 nav-glass-pill rounded-full px-6 flex items-center justify-between pointer-events-auto bg-[var(--bg-card-hover)]/30 backdrop-blur-md">
                <div className="flex items-center">
                    <Link
                        className="flex items-center gap-2 font-bold text-xl tracking-tighter"
                        href="/"
                    >
                        <Image
                            src="/butterfly.svg"
                            alt="TwinlyAI Logo"
                            width={32}
                            height={32}
                            className="w-8 h-8"
                        />
                        <span className="text-[var(--text-main)]">
                            Twinly<span className="font-light">AI</span>
                        </span>
                    </Link>
                </div>
                <div className="hidden md:flex items-center gap-8 text-[14px] font-medium text-slate-500 dark:text-slate-400">
                    <Link
                        className="hover:text-slate-900 dark:hover:text-white transition-colors"
                        href="/solutions"
                    >
                        Solutions
                    </Link>
                    <Link
                        className="hover:text-slate-900 dark:hover:text-white transition-colors"
                        href="/pricing"
                    >
                        Pricing
                    </Link>
                    <Link
                        className="hover:text-slate-900 dark:hover:text-white transition-colors"
                        href="/about"
                    >
                        About Us
                    </Link>
                </div>
                <div className="flex items-center gap-5 text-[14px]">
                    <ThemeToggle />
                    <Link
                        className="text-slate-500 dark:text-slate-400 font-medium hover:text-blue-600 dark:hover:text-indigo-400 transition-colors"
                        href="/login"
                    >
                        Login
                    </Link>
                    <Link
                        href="/role-selection"
                        className="bg-blue-600 dark:bg-indigo-600 text-white px-5 py-2 rounded-full text-[13px] font-semibold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(37,99,235,0.2)] dark:shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:bg-blue-700 dark:hover:bg-indigo-700"
                    >
                        Start Free Trial
                    </Link>
                </div>
            </nav>
        </motion.div>
    );
}
