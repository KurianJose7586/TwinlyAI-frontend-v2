"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { PricingContent } from "@/components/sections/pricing";
import { Footer } from "@/components/layout/footer";

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-[var(--bg-main)] font-sans transition-colors duration-300 selection:bg-indigo-100">
            <Navbar />
            <PricingContent />
            <Footer />
        </main>
    );
}
