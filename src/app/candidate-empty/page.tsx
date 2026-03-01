"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Search,
    Bell,
    Upload,
    Lock,
    EyeOff,
    CheckCircle,
    BadgeCheck,
    Info,
    Loader2
} from "lucide-react";
import { Footer } from "@/components/layout/footer";

const PIPELINE_STEPS = [
    { id: "reading", title: "Reading Document", desc: "Extracting raw text from upload" },
    { id: "semantic", title: "Semantic Extraction", desc: "Mapping professional nodes" },
    { id: "neural", title: "Neural Indexing", desc: "Generating career vector" },
    { id: "twin", title: "Digital Twin Generation", desc: "Finalizing agent profile" }
];

export default function CandidateEmptyDashboard() {
    const router = useRouter();
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [activeStepIndex, setActiveStepIndex] = useState(-1);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (isUploading) return;

        setIsUploading(true);
        setActiveStepIndex(0);
    };

    useEffect(() => {
        if (!isUploading) return;

        let currentStep = 0;
        const interval = setInterval(() => {
            currentStep++;
            if (currentStep < PIPELINE_STEPS.length) {
                setActiveStepIndex(currentStep);
            } else {
                clearInterval(interval);
                // Pipeline complete, redirect to active dashboard
                setTimeout(() => {
                    router.push("/candidate-active");
                }, 800);
            }
        }, 1200); // 1.2s per simulated step

        return () => clearInterval(interval);
    }, [isUploading, router]);

    return (
        <div className="min-h-screen flex flex-col font-sans bg-[#F5F5F7] text-[#1D1D1F] antialiased">
            <header className="h-16 flex items-center justify-between px-12 bg-white/80 backdrop-blur-md border-b border-[#E5E7EB] sticky top-0 z-50">
                <div className="flex items-center gap-10">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/butterfly.svg"
                            alt="TwinlyAI Logo"
                            width={24}
                            height={24}
                            className="w-6 h-6"
                        />
                        <h2 className="text-[17px] font-semibold tracking-tight">
                            Twinly<span className="font-light">AI</span>
                        </h2>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link className="text-[13px] font-medium text-[#1D1D1F]" href="#">Dashboard</Link>
                        <Link className="text-[13px] font-medium text-[#86868B] hover:text-[#1D1D1F] transition-colors" href="#">Marketplace</Link>
                        <Link className="text-[13px] font-medium text-[#86868B] hover:text-[#1D1D1F] transition-colors" href="#">Applications</Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <button className="flex items-center justify-center rounded-full w-8 h-8 hover:bg-[#F5F5F7] transition-colors">
                        <Search size={20} className="text-[#86868B]" />
                    </button>
                    <button className="flex items-center justify-center rounded-full w-8 h-8 hover:bg-[#F5F5F7] transition-colors">
                        <Bell size={20} className="text-[#86868B]" />
                    </button>
                    <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-8 h-8 border border-[#E5E7EB]"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDVe17b6C6Ggp4ItKOvRJ0ttyO2gbkZ9d7syMS68suHLs8mqqXFLNPtBPmC_C2VzZYY1ZU44y-19tG8oQSj6MyUjx5AbvGG4YwQw6q4hC8RSoa7DLii83BP2AuU-G_w9hv_Y5QKEVzmKfp8ws258sulVTQpJM0WTAffILZ2PH_OSFiARVUkNLj7U77Un5gdbHbGexhzPjOWsCz6nQIBgo4yN0_kfSNs_HX3zcQ5MjDAovAyMEpgzfaszume9mLzHToeR4zf1VVoHXdD")' }}
                    ></div>
                </div>
            </header>

            <div className="flex-1 flex flex-col">
                <main className="max-w-6xl w-full mx-auto px-12 py-16 flex-1">
                    <div className="grid grid-cols-12 gap-12">
                        <div className="col-span-12 lg:col-span-8 flex flex-col gap-10">
                            <div className="space-y-4">
                                <h1 className="text-[40px] font-semibold tracking-tight leading-[1.1] text-[#1D1D1F]">
                                    Build your professional <br />digital identity.
                                </h1>
                                <p className="text-[19px] text-[#86868B] font-normal max-w-xl">
                                    Upload your resume to begin. Our neural engine creates a dynamic index of your skills and experiences.
                                </p>
                            </div>

                            <div
                                className="relative group"
                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                                onDrop={handleFile}
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-[20px] blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                                <div className={`relative flex flex-col items-center justify-center gap-8 rounded-[20px] border border-dashed bg-white p-16 transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_12px_rgba(0,0,0,0.03)] ${isDragging || isUploading ? 'border-[#0071E3]/50 shadow-md' : 'border-gray-300 hover:border-[#0071E3]/50'}`}>
                                    <div className="w-16 h-16 rounded-full bg-[#F5F5F7] flex items-center justify-center text-[#0071E3]">
                                        {isUploading ? <Loader2 size={32} className="animate-spin" /> : <Upload size={32} />}
                                    </div>
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <h3 className="text-xl font-medium text-[#1D1D1F]">
                                            {isUploading ? "Uploading Resume..." : "Select a file or drag and drop"}
                                        </h3>
                                        <p className="text-sm text-[#86868B]">
                                            {isUploading ? "Please wait while we establish your profile." : "PDF, DOCX up to 10MB"}
                                        </p>
                                    </div>

                                    <input
                                        type="file"
                                        className="hidden"
                                        id="resume-upload"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleFile}
                                        disabled={isUploading}
                                    />
                                    <label
                                        htmlFor="resume-upload"
                                        className={`px-6 flex items-center justify-center h-10 bg-[#0071E3] text-white text-[14px] font-medium rounded-full hover:bg-[#0077ED] transition-all shadow-sm cursor-pointer ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
                                    >
                                        Choose File
                                    </label>
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-8 px-4">
                                <div className="flex items-center gap-2 text-[12px] text-[#86868B]">
                                    <Lock size={16} /> Secure processing
                                </div>
                                <div className="flex items-center gap-2 text-[12px] text-[#86868B]">
                                    <EyeOff size={16} /> Private by default
                                </div>
                                <div className="flex items-center gap-2 text-[12px] text-[#86868B]">
                                    <BadgeCheck size={16} /> SOC2 Compliant
                                </div>
                            </div>
                        </div>

                        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                            <div className="bg-white rounded-[20px] p-8 border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.02),0_4px_12px_rgba(0,0,0,0.03)]">
                                <h3 className="text-[15px] font-semibold text-[#1D1D1F] mb-10 flex items-center justify-between">
                                    Analysis Pipeline
                                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded uppercase tracking-wider ${isUploading ? 'bg-blue-50 text-blue-600' : 'bg-[#F5F5F7] text-[#86868B]'}`}>
                                        {isUploading ? 'Processing' : 'Standby'}
                                    </span>
                                </h3>

                                <div className="relative flex flex-col gap-10">
                                    <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-[#E5E7EB] to-[#E5E7EB]"></div>

                                    {PIPELINE_STEPS.map((step, index) => {
                                        const isActive = activeStepIndex === index;
                                        const isCompleted = activeStepIndex > index;
                                        const isPending = activeStepIndex < index && !isActive && !isCompleted;

                                        return (
                                            <div key={step.id} className={`relative flex items-start gap-5 group transition-opacity duration-300 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
                                                <div className={`relative z-10 flex items-center justify-center w-[15px] h-[15px] rounded-full mt-1 ${isActive ? 'border-2 border-[#0071E3] bg-white' :
                                                        isCompleted ? 'bg-[#0071E3] border-none' :
                                                            'border border-gray-300 bg-white'
                                                    }`}>
                                                    {isCompleted && <CheckCircle size={10} className="text-white absolute" />}
                                                </div>
                                                <div>
                                                    <p className={`text-[14px] font-medium ${isActive || isCompleted ? 'text-[#1D1D1F]' : 'text-[#86868B]'}`}>
                                                        {step.title}
                                                    </p>
                                                    <p className={`text-[12px] mt-1 ${isActive ? 'text-[#0071E3]' : 'text-[#86868B]/60'}`}>
                                                        {isActive ? (
                                                            <span className="flex items-center gap-2">
                                                                <Loader2 size={10} className="animate-spin" /> Processing...
                                                            </span>
                                                        ) : isCompleted ? (
                                                            "Completed"
                                                        ) : (
                                                            step.desc
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-12 pt-8 border-t border-[#E5E7EB]">
                                    <div className="flex items-start gap-3 p-4 bg-[#F5F5F7] rounded-xl">
                                        <Info size={18} className="text-[#0071E3] shrink-0" />
                                        <p className="text-[12px] leading-relaxed text-[#86868B]">
                                            Your digital twin allows recruiters to interact with your experience asynchronously using natural language.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center p-6 text-center">
                                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#86868B]/50">
                                    Designed in Lajpat Nagar
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
}
