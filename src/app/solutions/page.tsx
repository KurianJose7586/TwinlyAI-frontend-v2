"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { SolutionsHero, SolutionsSection, CTASection } from "@/components/sections/solutions";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function SolutionsPage() {
    return (
        <main className="min-h-screen bg-[var(--bg-main)] font-sans transition-colors duration-300">
            {/* Navigation */}
            <Navbar />

            <SolutionsHero />
            <SolutionsSection />
            <CTASection />
            <Footer />
        </main>
    );
}
