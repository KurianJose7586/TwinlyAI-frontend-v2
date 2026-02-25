import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AboutContent } from "@/components/sections/about-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | TwinlyAI - The Manifesto",
    description: "We believe you are more than a PDF. TwinlyAI bridges the gap between static resumes and authentic potential.",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[var(--bg-main)] font-sans transition-colors duration-300">
            <Navbar />
            <AboutContent />
            <Footer />
        </main>
    );
}
