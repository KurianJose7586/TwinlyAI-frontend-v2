"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import {
    Search,
    Bell,
    Settings,
    X,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Briefcase,
    GraduationCap,
    Mail,
    FileText,
    ExternalLink,
    Linkedin,
    Github,
    Globe
} from "lucide-react";
import { Footer } from "@/components/layout/footer";

const AVATARS = [
    "https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e2e8f0",
    "https://api.dicebear.com/7.x/notionists/svg?seed=Aneka&backgroundColor=fef08a",
    "https://api.dicebear.com/7.x/notionists/svg?seed=Jasper&backgroundColor=bfdbfe",
    "https://api.dicebear.com/7.x/notionists/svg?seed=Mia&backgroundColor=fbcfe8",
    "https://api.dicebear.com/7.x/notionists/svg?seed=Oliver&backgroundColor=bbf7d0",
    "https://api.dicebear.com/7.x/notionists/svg?seed=Sophia&backgroundColor=fca5a5"
];

const MOCK_CANDIDATES = [
    {
        id: "1",
        name: "Sarah Jenkins",
        role: "AI Infrastructure Lead",
        email: "email@example.com",
        linkedin: "linkedin.com/in/ai-infra-lead",
        quote: "Expert in PyTorch; optimized inference by 40% at previous role.",
        match: 98,
        matchStyle: "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20",
        avatar: AVATARS[1],
        skills: ["PyTorch", "Kubernetes", "CUDA"]
    },
    {
        id: "2",
        name: "Marcus Vane",
        role: "Data Engineering Architect",
        email: "data.arch@example.com",
        linkedin: "linkedin.com/in/data-arch",
        quote: "Built scalable RAG pipelines for Fortune 500. Specializing in vector DBs.",
        match: 85,
        matchStyle: "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20",
        avatar: AVATARS[2],
        skills: ["Pinecone", "Spark", "Python"]
    },
    {
        id: "3",
        name: "Elena Rodriguez",
        role: "LLM Product Engineer",
        email: "llm.prod@example.com",
        linkedin: "linkedin.com/in/llm-prod",
        quote: "Specializes in prompt engineering and RAG. Redesigning UX for AI-first apps.",
        match: 92,
        matchStyle: "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20",
        avatar: AVATARS[3],
        skills: ["LangChain", "React", "OpenAI"]
    },
    {
        id: "4",
        name: "David Chen",
        role: "Full-Stack AI Developer",
        email: "fullstack.dev@example.com",
        linkedin: "linkedin.com/in/fullstack-dev",
        quote: "Transitioning to AI workflows. Expert in FastAPI and high-load AWS deployments.",
        match: 79,
        matchStyle: "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10",
        avatar: AVATARS[4],
        skills: ["FastAPI", "AWS", "Next.js"]
    }
];

// Duplicate the array to have 36 candidates total (3 pages of 12)
const EXTENDED_CANDIDATES = Array(9).fill(MOCK_CANDIDATES).flat().map((c, i) => ({ ...c, id: `${c.id}_${i}` }));

// Helper to generate deterministic but varied doodles based on candidate property
const generateDoodles = (seedString: string) => {
    let hash = 0;
    for (let i = 0; i < seedString.length; i++) {
        hash = seedString.charCodeAt(i) + ((hash << 5) - hash);
    }
    const seed = Math.abs(hash);
    const pseudoRandom = (min: number, max: number, offset: number) => {
        const val = ((seed + offset) * 9301 + 49297) % 233280;
        return min + (val / 233280) * (max - min);
    };

    return (
        <svg className="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay pointer-events-none rounded-t-3xl overflow-hidden" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id={`dots-${seed}`} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform={`rotate(${pseudoRandom(0, 45, 1)})`}>
                    <circle cx="2" cy="2" r="1.5" fill="white" opacity="0.5" />
                </pattern>
                <linearGradient id={`grad-${seed}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill={`url(#dots-${seed})`} />

            <circle cx={`${pseudoRandom(10, 90, 2)}%`} cy={`${pseudoRandom(10, 90, 3)}%`} r={`${pseudoRandom(20, 80, 4)}`} fill={`url(#grad-${seed})`} />
            <circle cx={`${pseudoRandom(10, 90, 5)}%`} cy={`${pseudoRandom(10, 90, 6)}%`} r={`${pseudoRandom(40, 100, 7)}`} fill="white" opacity={pseudoRandom(0.02, 0.08, 8)} />

            <path d={`M-50,${pseudoRandom(0, 100, 9)} Q${pseudoRandom(100, 300, 10)},${pseudoRandom(-50, 150, 11)} ${pseudoRandom(400, 600, 12)},${pseudoRandom(0, 150, 13)} T1000,${pseudoRandom(0, 200, 14)}`}
                stroke="white" strokeWidth={pseudoRandom(1, 4, 15)} fill="none" opacity={pseudoRandom(0.1, 0.4, 16)} />

            <path d={`M${pseudoRandom(0, 200, 17)},-50 C${pseudoRandom(100, 400, 18)},${pseudoRandom(50, 200, 19)} ${pseudoRandom(300, 600, 20)},${pseudoRandom(0, 150, 21)} ${pseudoRandom(500, 800, 22)},200`}
                stroke="white" strokeWidth={pseudoRandom(1, 4, 23)} fill="none" opacity={pseudoRandom(0.1, 0.4, 24)} strokeDasharray={`${pseudoRandom(4, 12, 25)} ${pseudoRandom(4, 12, 26)}`} />

            <rect x={`${pseudoRandom(20, 80, 27)}%`} y={`${pseudoRandom(10, 70, 28)}%`} width={`${pseudoRandom(40, 120, 29)}`} height={`${pseudoRandom(40, 120, 30)}`}
                transform={`rotate(${pseudoRandom(0, 180, 31)} ${pseudoRandom(100, 500, 32)} ${pseudoRandom(20, 80, 33)})`}
                fill={`url(#grad-${seed})`} rx={pseudoRandom(10, 40, 34)} />
        </svg>
    );
};

export default function RecruiterDashboard() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCandidate, setSelectedCandidate] = useState<typeof MOCK_CANDIDATES[0] | null>(null);
    const [mounted, setMounted] = useState(false);
    const ITEMS_PER_PAGE = 12;

    useEffect(() => {
        const timeout = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timeout);
    }, []);

    const totalPages = Math.ceil(EXTENDED_CANDIDATES.length / ITEMS_PER_PAGE);

    const indexOfLastCandidate = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstCandidate = indexOfLastCandidate - ITEMS_PER_PAGE;
    const currentCandidates = EXTENDED_CANDIDATES.slice(indexOfFirstCandidate, indexOfLastCandidate);

    const paginate = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-[#0B0E14] text-slate-900 dark:text-white font-sans antialiased relative overflow-hidden transition-colors duration-300">
            {/* Background Orbs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-0 dark:opacity-100 transition-opacity duration-300">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]" />
            </div>

            {/* Header */}
            <header className="flex items-center justify-between border-b border-transparent dark:border-white/5 px-8 py-4 bg-slate-100/80 dark:bg-[#0B0E14]/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300 relative z-50">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/butterfly.svg"
                            alt="TwinlyAI Logo"
                            width={24}
                            height={24}
                            className="w-6 h-6"
                        />
                        <h2 className="text-[17px] font-semibold tracking-tight text-slate-900 dark:text-white">
                            Twinly<span className="font-light">AI</span>
                        </h2>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6 ml-4">
                        <Link className="text-[14px] font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors" href="#">Overview</Link>
                        <Link className="text-[14px] font-semibold text-slate-900 dark:text-white relative after:content-[''] after:absolute after:-bottom-[19px] after:left-0 after:w-full after:h-[2px] after:bg-blue-600 dark:after:bg-purple-500" href="/recruiter">Candidates</Link>
                        <Link className="text-[14px] font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors" href="#">Campaigns</Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-slate-200/50 dark:bg-[#1C2128]/50 rounded-full px-3 py-1 gap-3 border border-transparent dark:border-white/5">
                        <button className="flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                            <Bell size={20} />
                        </button>
                        <button className="flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                            <Settings size={20} />
                        </button>
                    </div>
                    <div className="h-8 w-8 rounded-full overflow-hidden border border-slate-300 dark:border-white/20 bg-slate-200 dark:bg-[#1C2128]">
                        <img src={AVATARS[0]} alt="Recruiter Avatar" className="w-full h-full object-cover" />
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-12 relative z-10">
                <div className="mb-10 text-center">
                    <h1 className="text-slate-900 dark:text-white text-4xl font-extrabold tracking-tight mb-3">Find your next hire</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg font-normal">Intelligent semantic search for top AI talent.</p>
                </div>

                <div className="max-w-3xl mx-auto mb-12">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                            <Search className="text-blue-600 dark:text-purple-500 w-6 h-6" />
                        </div>
                        <input
                            className="w-full h-16 pl-14 pr-32 bg-white dark:bg-[#1C2128] border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-purple-500/20 focus:border-blue-600 dark:focus:border-purple-500 focus:outline-none text-xl font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all"
                            placeholder="Search for a Python dev with LLM experience..."
                            type="text"
                        />
                        <div className="absolute right-3 top-3 bottom-3 flex items-center">
                            <button className="h-full px-6 bg-blue-600 dark:bg-purple-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 dark:hover:bg-purple-700 transition-colors shadow-sm">
                                Search
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-2 mt-6 justify-center overflow-x-auto pb-2 scrollbar-none">
                        <span className="px-4 py-1.5 bg-white dark:bg-[#1C2128] border border-slate-200 dark:border-white/10 rounded-full text-xs font-semibold flex items-center gap-2 shadow-sm text-slate-900 dark:text-white">
                            Python <X size={14} className="cursor-pointer text-slate-400 hover:text-slate-900 dark:hover:text-white" />
                        </span>
                        <span className="px-4 py-1.5 bg-white dark:bg-[#1C2128] border border-slate-200 dark:border-white/10 rounded-full text-xs font-semibold flex items-center gap-2 shadow-sm text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-colors">
                            Machine Learning <ChevronDown size={14} />
                        </span>
                        <span className="px-4 py-1.5 bg-blue-50 dark:bg-purple-500/10 border border-blue-200 dark:border-purple-500/20 rounded-full text-xs font-semibold flex items-center gap-2 shadow-sm text-blue-700 dark:text-purple-400 cursor-pointer">
                            Remote <ChevronDown size={14} />
                        </span>
                        <span className="px-4 py-1.5 bg-white dark:bg-[#1C2128] border border-slate-200 dark:border-white/10 rounded-full text-xs font-semibold flex items-center gap-2 shadow-sm text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-colors">
                            Senior Level <ChevronDown size={14} />
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {currentCandidates.map((candidate) => (
                        <div key={candidate.id} onClick={() => setSelectedCandidate(candidate)} className="bg-white dark:bg-[#1C2128] rounded-2xl border border-slate-200 dark:border-white/10 p-6 shadow-sm hover:shadow-md dark:shadow-none dark:hover:border-white/20 transition-all group flex flex-col relative overflow-hidden cursor-pointer">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-slate-100 dark:border-white/10 bg-slate-100 dark:bg-[#0B0E14]">
                                    <img src={candidate.avatar} alt={candidate.name} className="w-full h-full object-cover" />
                                </div>
                                <div className={`px-2.5 py-1 text-[11px] font-bold rounded-full border ${candidate.matchStyle}`}>
                                    {candidate.match}% MATCH
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-[19px] font-bold text-slate-900 dark:text-white mb-0.5">{candidate.name}</h3>
                                <p className="text-blue-600 dark:text-purple-400 text-[13px] font-semibold mb-4">{candidate.role}</p>
                                <p className="text-blue-600 dark:text-purple-400 text-[13px] font-semibold mb-2">{candidate.email}</p>
                                <p className="text-blue-600 dark:text-purple-400 text-[13px] font-semibold mb-4">{candidate.linkedin}</p>
                                <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-3 mb-4 border border-slate-100 dark:border-white/5">
                                    <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed italic">
                                        &quot;{candidate.quote}&quot;
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-1.5 mb-6">
                                    {candidate.skills.map((skill: string, index: number) => (
                                        <span key={index} className="px-2 py-1 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-[10px] font-bold rounded uppercase tracking-wider">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-2 mt-auto">
                                <Link href="/recruiter/chat" className="flex-1" onClick={(e) => e.stopPropagation()}>
                                    <button className="w-full py-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white text-[13px] font-semibold hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
                                        Chat
                                    </button>
                                </Link>
                                <Link href="/recruiter/call" className="flex-1" onClick={(e) => e.stopPropagation()}>
                                    <button className="w-full py-2 rounded-lg bg-blue-600 dark:bg-purple-600 text-white text-[13px] font-semibold hover:bg-blue-700 dark:hover:bg-purple-700 transition-colors">
                                        Call
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="mt-12 flex justify-center items-center gap-4">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg flex items-center justify-center bg-white dark:bg-[#1C2128] border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-white/5 transition-colors shadow-sm"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <div className="flex items-center gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                <button
                                    key={number}
                                    onClick={() => paginate(number)}
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold transition-colors shadow-sm ${currentPage === number
                                        ? "bg-blue-600 dark:bg-purple-600 text-white border-transparent"
                                        : "bg-white dark:bg-[#1C2128] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                                        }`}
                                >
                                    {number}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg flex items-center justify-center bg-white dark:bg-[#1C2128] border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-white/5 transition-colors shadow-sm"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}

                <div className="mt-20 pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between text-[11px] font-medium tracking-tight text-slate-500 dark:text-slate-500 uppercase gap-4 mb-20 relative z-10">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 bg-green-500 rounded-full"></span>
                            Service Operational
                        </span>
                        <span className="h-1 w-1 bg-slate-300 dark:bg-white/20 rounded-full"></span>
                        <span>{EXTENDED_CANDIDATES.length.toLocaleString()} Candidates Indexed</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span>Last Update: 2m ago</span>
                        <span className="h-1 w-1 bg-slate-300 dark:bg-white/20 rounded-full"></span>
                        <span>AI Analysis Engine v2.4</span>
                        <span className="h-1 w-1 bg-slate-300 dark:bg-white/20 rounded-full"></span>
                        <span>Designed in Lajpat Nagar</span>
                    </div>
                </div>
            </main>

            {/* Candidate Profile Modal */}
            {mounted && selectedCandidate && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    <div className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setSelectedCandidate(null)}></div>
                    <div className="relative w-full max-w-2xl bg-white dark:bg-[#1C2128] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 flex flex-col max-h-[90vh] overflow-y-auto custom-scrollbar animate-in fade-in zoom-in-95 duration-200">
                        {/* Header Image / Pattern */}
                        <div className="h-32 shrink-0 bg-gradient-to-r from-blue-600 to-purple-600 relative rounded-t-3xl overflow-hidden">
                            {generateDoodles(selectedCandidate.id + selectedCandidate.name)}
                            <button
                                onClick={() => setSelectedCandidate(null)}
                                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors z-50"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Avatar & Basic Info */}
                        <div className="px-8 pb-6 relative">
                            <div className="flex justify-between items-end -mt-12 mb-6 pointer-events-none">
                                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-[#1C2128] bg-slate-100 dark:bg-[#0B0E14] relative z-10 pointer-events-auto">
                                    <img src={selectedCandidate.avatar} alt={selectedCandidate.name} className="w-full h-full object-cover" />
                                </div>
                                <div className={`px-4 py-1.5 text-xs font-bold rounded-full border pointer-events-auto ${selectedCandidate.matchStyle}`}>
                                    {selectedCandidate.match}% MATCH SCORE
                                </div>
                            </div>

                            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">{selectedCandidate.name}</h2>
                            <p className="text-blue-600 dark:text-purple-400 text-lg font-semibold mb-6">{selectedCandidate.role}</p>

                            <div className="flex flex-wrap gap-4 mb-8">
                                <a href={`mailto:${selectedCandidate.email}`} className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-slate-200 dark:border-white/10 shadow-sm outline-none focus:ring-2 focus:ring-blue-600/30" title={selectedCandidate.email}>
                                    <Mail size={18} />
                                </a>
                                <a href={`https://${selectedCandidate.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-[#0a66c2]/10 hover:text-[#0a66c2] transition-colors border border-slate-200 dark:border-white/10 shadow-sm outline-none focus:ring-2 focus:ring-[#0a66c2]/30" title={selectedCandidate.linkedin}>
                                    <Linkedin size={18} />
                                </a>
                                <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-white/10 shadow-sm outline-none focus:ring-2 focus:ring-slate-500/30" title="GitHub Profile">
                                    <Github size={18} />
                                </a>
                                <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-white/10 shadow-sm outline-none focus:ring-2 focus:ring-slate-500/30" title="Personal Website">
                                    <Globe size={18} />
                                </a>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <Briefcase size={16} className="text-blue-600 dark:text-purple-500" /> Executive Summary
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-[#0B0E14]/50 p-4 rounded-xl border border-slate-100 dark:border-white/5 italic">
                                        &quot;{selectedCandidate.quote}&quot;
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <FileText size={16} className="text-blue-600 dark:text-purple-500" /> Technical Skills
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedCandidate.skills.map((skill: string, index: number) => (
                                            <span key={index} className="px-3 py-1.5 bg-blue-50 dark:bg-purple-500/10 text-blue-700 dark:text-purple-300 text-xs font-bold rounded-lg border border-blue-100 dark:border-purple-500/20 shadow-sm">
                                                {skill}
                                            </span>
                                        ))}
                                        <span className="px-3 py-1.5 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-xs font-bold rounded-lg border border-slate-200 dark:border-white/10 hidden sm:inline-block">
                                            +4 more implicit skills
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <GraduationCap size={16} className="text-blue-600 dark:text-purple-500" /> Simulated Experience
                                    </h3>
                                    <div className="relative pl-6 border-l-2 border-slate-200 dark:border-white/10 space-y-6">
                                        <div className="relative">
                                            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-100 dark:bg-purple-900 border-[3px] border-white dark:border-[#1C2128]"></div>
                                            <h4 className="font-bold text-slate-900 dark:text-white text-base">Senior AI Engineer</h4>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">TechCorp Global &bull; 2021 - Present</p>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Led the migration to a transformer-based recommendation engine, improving user engagement by 22%.</p>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-slate-200 dark:bg-white/20 border-[3px] border-white dark:border-[#1C2128]"></div>
                                            <h4 className="font-bold text-slate-900 dark:text-white text-base">Machine Learning Specialist</h4>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">DataWorks Inc &bull; 2018 - 2021</p>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Developed and deployed computer vision models for automated quality assurance pipelines.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="p-6 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B0E14]/50 flex gap-4 mt-auto">
                            <Link href="/recruiter/chat" className="flex-1">
                                <button className="w-full py-3.5 rounded-xl bg-white dark:bg-[#1C2128] text-slate-700 dark:text-white text-sm font-bold hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-200 dark:border-white/10 transition-colors shadow-sm">
                                    Message Digital Twin
                                </button>
                            </Link>
                            <Link href="/recruiter/call" className="flex-1">
                                <button className="w-full py-3.5 rounded-xl bg-blue-600 dark:bg-purple-600 text-white text-sm font-bold hover:bg-blue-700 dark:hover:bg-purple-700 transition-colors shadow-sm shadow-blue-500/20 dark:shadow-purple-500/20">
                                    Live Voice Interview
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            <Footer />
        </div>
    );
}
