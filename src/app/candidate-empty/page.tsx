"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Upload,
    Lock,
    EyeOff,
    CheckCircle,
    BadgeCheck,
    Info,
    Loader2,
    AlertCircle
} from "lucide-react";
import { Footer } from "@/components/layout/footer";
import api from "@/lib/api";

const PIPELINE_STEPS = [
    { id: "reading", title: "Reading Document", desc: "Extracting raw text from upload" },
    { id: "semantic", title: "Semantic Extraction", desc: "Mapping professional nodes" },
    { id: "neural", title: "Neural Indexing", desc: "Generating career vector" },
    { id: "twin", title: "Digital Twin Generation", desc: "Finalizing agent profile" }
];

export default function CandidateEmptyDashboard() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [activeStepIndex, setActiveStepIndex] = useState(-1);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [uploadDone, setUploadDone] = useState(false);

    const [botId, setBotId] = useState<string | null>(null);
    const [userName, setUserName] = useState<string>("there");

    // On mount: try localStorage first, then fetch fresh from server
    useEffect(() => {
        const stored = typeof window !== "undefined" ? localStorage.getItem("twinly_botId") : null;
        const storedName = typeof window !== "undefined" ? localStorage.getItem("twinly_userName") : null;
        if (storedName) setUserName(storedName);

        // Always re-fetch from server to get the canonical bot ID
        api.get("/bots/")
            .then(res => {
                const bots = res.data;
                if (Array.isArray(bots) && bots.length > 0) {
                    const bot = bots[0];
                    const id = bot.id ?? bot._id ?? stored;
                    console.log("[candidate-empty] resolved botId from server:", id, "bot:", bot);
                    if (id) {
                        setBotId(id);
                        localStorage.setItem("twinly_botId", id);
                        if (bot.name) {
                            setUserName(bot.name);
                            localStorage.setItem("twinly_userName", bot.name);
                        }
                    }
                } else if (stored) {
                    console.log("[candidate-empty] no bots from server, using localStorage:", stored);
                    setBotId(stored);
                }
            })
            .catch(() => {
                if (stored) setBotId(stored);
            });
    }, []);

    const doUpload = async (file: File) => {
        if (isUploading || !botId) return;
        setUploadError(null);
        setIsUploading(true);
        setActiveStepIndex(0); // Step 1: Reading Document starts

        try {
            const formData = new FormData();
            formData.append("file", file);

            // Move to step 2 after a short delay (UI feel)
            const step2Timer = setTimeout(() => setActiveStepIndex(1), 1500);

            const res = await api.post(`/bots/${botId}/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            clearTimeout(step2Timer);

            const data = res.data;

            // Persist candidate name returned by the backend
            if (data?.candidate_name) {
                localStorage.setItem("twinly_userName", data.candidate_name);
                localStorage.setItem("userName", data.candidate_name);
            }

            // Animate remaining pipeline steps quickly now that we have data
            setActiveStepIndex(2);
            await delay(900);
            setActiveStepIndex(3);
            await delay(1000);

            setUploadDone(true);
            await delay(800);
            router.push("/candidate-active");

        } catch (err: unknown) {
            setUploadError((err as Error).message || "Upload failed. Please try again.");
            setActiveStepIndex(-1);
        }
        setIsUploading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) doUpload(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) doUpload(file);
    };

    return (
        <div className="min-h-screen flex flex-col font-sans bg-[#F5F5F7] dark:bg-[#0B0E14] text-[#1D1D1F] dark:text-white antialiased">
            <header className="h-16 flex items-center justify-between px-12 bg-white/80 dark:bg-[#1C2128]/80 backdrop-blur-md border-b border-[#E5E7EB] dark:border-white/10 sticky top-0 z-50">
                <div className="flex items-center gap-10">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/butterfly.svg" alt="TwinlyAI Logo" width={24} height={24} className="w-6 h-6 dark:invert" />
                        <h2 className="text-[17px] font-semibold tracking-tight">
                            Twinly<span className="font-light">AI</span>
                        </h2>
                    </Link>
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                    Logged in as <span className="font-semibold text-slate-800 dark:text-white">{userName}</span>
                </div>
            </header>

            <div className="flex-1 flex flex-col">
                <main className="max-w-6xl w-full mx-auto px-8 lg:px-12 py-16 flex-1">
                    <div className="grid grid-cols-12 gap-12">
                        {/* Left: Upload */}
                        <div className="col-span-12 lg:col-span-8 flex flex-col gap-10">
                            <div className="space-y-4">
                                <h1 className="text-[40px] font-semibold tracking-tight leading-[1.1] text-[#1D1D1F] dark:text-white">
                                    Build your professional <br />digital identity.
                                </h1>
                                <p className="text-[19px] text-[#86868B] font-normal max-w-xl">
                                    Upload your resume to begin. Our neural engine creates a dynamic index of your skills and experiences, and brings your AI Twin to life.
                                </p>
                            </div>

                            {!botId && (
                                <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 text-sm text-amber-700 dark:text-amber-400">
                                    <AlertCircle size={18} className="shrink-0" />
                                    No bot found. Please complete onboarding first or <Link href="/onboarding" className="underline font-semibold">restart onboarding</Link>.
                                </div>
                            )}

                            {/* Drop zone */}
                            <div
                                className="relative group"
                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={handleDrop}
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-[20px] blur opacity-0 group-hover:opacity-100 transition duration-1000" />
                                <div className={`relative flex flex-col items-center justify-center gap-8 rounded-[20px] border border-dashed bg-white dark:bg-[#1C2128] p-16 transition-all duration-300 shadow-sm ${uploadDone ? 'border-green-400 dark:border-green-500' :
                                    isDragging || isUploading ? 'border-[#0071E3]/50 shadow-md' :
                                        'border-gray-300 dark:border-white/20 hover:border-[#0071E3]/50'
                                    }`}>
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${uploadDone ? 'bg-green-50 dark:bg-green-500/20 text-green-500' :
                                        isUploading ? 'bg-blue-50 dark:bg-blue-500/20 text-[#0071E3]' :
                                            'bg-[#F5F5F7] dark:bg-white/5 text-[#0071E3]'
                                        }`}>
                                        {uploadDone
                                            ? <CheckCircle size={32} />
                                            : isUploading
                                                ? <Loader2 size={32} className="animate-spin" />
                                                : <Upload size={32} />}
                                    </div>
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <h3 className="text-xl font-medium text-[#1D1D1F] dark:text-white">
                                            {uploadDone
                                                ? "Twin Created! Redirecting..."
                                                : isUploading
                                                    ? "Training your AI Twin…"
                                                    : "Select a file or drag and drop"}
                                        </h3>
                                        <p className="text-sm text-[#86868B]">
                                            {uploadDone
                                                ? "Your AI Twin is live. Taking you to your dashboard."
                                                : isUploading
                                                    ? "This may take 30–60 seconds. Please don't close the tab."
                                                    : "PDF, DOCX, TXT — up to 10MB"}
                                        </p>
                                    </div>

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        className="hidden"
                                        accept=".pdf,.doc,.docx,.txt,.json"
                                        onChange={handleChange}
                                        disabled={isUploading || !botId}
                                    />
                                    {!isUploading && !uploadDone && (
                                        <button
                                            onClick={() => botId && fileInputRef.current?.click()}
                                            disabled={!botId}
                                            className="px-6 flex items-center justify-center h-10 bg-[#0071E3] text-white text-[14px] font-medium rounded-full hover:bg-[#0077ED] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Choose File
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Error */}
                            {uploadError && (
                                <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-sm text-red-700 dark:text-red-400">
                                    <AlertCircle size={18} className="shrink-0" />
                                    {uploadError}
                                    <button onClick={() => setUploadError(null)} className="ml-auto underline text-xs">Dismiss</button>
                                </div>
                            )}

                            {/* Trust badges */}
                            <div className="flex items-center justify-center gap-8 px-4">
                                <div className="flex items-center gap-2 text-[12px] text-[#86868B]"><Lock size={16} /> Secure processing</div>
                                <div className="flex items-center gap-2 text-[12px] text-[#86868B]"><EyeOff size={16} /> Private by default</div>
                                <div className="flex items-center gap-2 text-[12px] text-[#86868B]"><BadgeCheck size={16} /> SOC2 Compliant</div>
                            </div>
                        </div>

                        {/* Right: Pipeline */}
                        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                            <div className="bg-white dark:bg-[#1C2128] rounded-[20px] p-8 border border-[#E5E7EB] dark:border-white/10 shadow-sm">
                                <h3 className="text-[15px] font-semibold text-[#1D1D1F] dark:text-white mb-10 flex items-center justify-between">
                                    Analysis Pipeline
                                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded uppercase tracking-wider ${uploadDone ? 'bg-green-50 dark:bg-green-500/20 text-green-600 dark:text-green-400' :
                                        isUploading ? 'bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400' :
                                            'bg-[#F5F5F7] dark:bg-white/5 text-[#86868B]'
                                        }`}>
                                        {uploadDone ? 'Complete' : isUploading ? 'Processing' : 'Standby'}
                                    </span>
                                </h3>

                                <div className="relative flex flex-col gap-10">
                                    <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-[#E5E7EB] to-[#E5E7EB] dark:from-white/10 dark:to-white/10" />

                                    {PIPELINE_STEPS.map((step, index) => {
                                        const isActive = activeStepIndex === index;
                                        const isCompleted = activeStepIndex > index || uploadDone;
                                        const isPending = activeStepIndex < index && !isActive && !isCompleted;

                                        return (
                                            <div key={step.id} className={`relative flex items-start gap-5 transition-opacity duration-300 ${isPending ? 'opacity-40' : 'opacity-100'}`}>
                                                <div className={`relative z-10 flex items-center justify-center w-[15px] h-[15px] rounded-full mt-1 flex-shrink-0 ${isActive ? 'border-2 border-[#0071E3] bg-white dark:bg-[#1C2128]' :
                                                    isCompleted ? 'bg-[#0071E3] border-none' :
                                                        'border border-gray-300 dark:border-white/20 bg-white dark:bg-[#1C2128]'
                                                    }`}>
                                                    {isCompleted && <CheckCircle size={10} className="text-white absolute" />}
                                                </div>
                                                <div>
                                                    <p className={`text-[14px] font-medium ${isActive || isCompleted ? 'text-[#1D1D1F] dark:text-white' : 'text-[#86868B]'}`}>
                                                        {step.title}
                                                    </p>
                                                    <p className={`text-[12px] mt-1 ${isActive ? 'text-[#0071E3]' : 'text-[#86868B]/60'}`}>
                                                        {isActive ? (
                                                            <span className="flex items-center gap-2">
                                                                <Loader2 size={10} className="animate-spin" /> Processing...
                                                            </span>
                                                        ) : isCompleted ? (
                                                            "Completed ✓"
                                                        ) : (
                                                            step.desc
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-12 pt-8 border-t border-[#E5E7EB] dark:border-white/10">
                                    <div className="flex items-start gap-3 p-4 bg-[#F5F5F7] dark:bg-white/5 rounded-xl">
                                        <Info size={18} className="text-[#0071E3] shrink-0" />
                                        <p className="text-[12px] leading-relaxed text-[#86868B]">
                                            Your digital twin lets recruiters interact with your experience asynchronously using natural language.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
}

function delay(ms: number) {
    return new Promise(res => setTimeout(res, ms));
}
