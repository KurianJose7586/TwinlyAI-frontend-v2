"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Mic,
    Volume2,
    MessageSquare,
    SlidersHorizontal,
    PhoneOff,
    X,
    History,
    Sparkles,
    ChevronLeft
} from "lucide-react";

export default function VoiceInterviewPage() {
    const [isCopilotOpen, setIsCopilotOpen] = useState(false);

    return (
        <div className="bg-[#1c1c1e] text-white font-sans overflow-hidden h-screen w-full flex relative">
            {/* Inline styles for the complex fluid animation and scrollbars */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fluid-wave {
                    0% { transform: scale(1) rotate(0deg); filter: blur(40px); opacity: 0.6; }
                    50% { transform: scale(1.2) rotate(180deg); filter: blur(60px); opacity: 0.8; }
                    100% { transform: scale(1) rotate(360deg); filter: blur(40px); opacity: 0.6; }
                }
                .fluid-blob {
                    background: linear-gradient(45deg, #a259ff, #00d1ff, #ff4d94, #00d1ff);
                    background-size: 200% 200%;
                    animation: fluid-wave 10s ease-content infinite;
                    filter: blur(50px);
                }
                .glass-footer {
                    background: rgba(44, 44, 46, 0.4);
                    backdrop-filter: saturate(180%) blur(20px);
                    border: 0.5px solid rgba(255, 255, 255, 0.1);
                }
                .transcription-panel {
                    background: linear-gradient(to top, rgba(28, 28, 30, 0.95), rgba(28, 28, 30, 0));
                    backdrop-filter: blur(4px);
                }
                .glass-sidebar {
                    background: rgba(44, 44, 46, 0.3);
                    backdrop-filter: saturate(180%) blur(30px);
                    border-left: 1px solid rgba(255, 255, 255, 0.08);
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
            `}} />

            {/* Main Content Area */}
            <div className={`main-content flex-1 flex flex-col items-center justify-between py-12 px-8 transition-all duration-500 ease-in-out ${isCopilotOpen ? 'mr-80' : 'mr-0'}`}>

                {/* Header */}
                <header className="w-full max-w-5xl flex justify-between items-start z-20">
                    <div className="flex flex-col gap-2">
                        <Link href="/recruiter" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium w-fit mb-2">
                            <ChevronLeft size={16} />
                            Back to Candidates
                        </Link>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse tracking-wide"></span>
                            <span className="text-xs font-semibold tracking-wide text-white/80 uppercase">Live Interview</span>
                        </div>
                        <h1 className="text-2xl font-light text-white/90">Design System Lead</h1>
                    </div>

                    <div className="flex items-center gap-4 group cursor-pointer bg-white/5 hover:bg-white/10 transition-all px-4 py-2 rounded-2xl border border-white/10">
                        <div className="text-right">
                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Interviewer</p>
                            <p className="text-sm font-medium">Alex Chen</p>
                        </div>
                        <div
                            className="w-10 h-10 rounded-full bg-cover bg-center border border-white/20"
                            style={{ backgroundImage: 'url("https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=bbf7d0")' }}
                        ></div>
                    </div>
                </header>

                {/* Central Animation */}
                <main className="relative flex-1 flex items-center justify-center w-full max-w-4xl">
                    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                        <div className="absolute inset-0 fluid-blob rounded-full"></div>
                        <div className="absolute inset-4 fluid-blob rounded-full opacity-50" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)]"></div>
                        </div>
                    </div>
                    <div className="absolute bottom-1/4 flex flex-col items-center gap-2">
                        <p className="text-lg font-light text-white/90 tracking-tight">Listening...</p>
                    </div>
                </main>

                {/* Transcription Panel */}
                <div className="absolute bottom-32 left-0 right-0 px-8 flex justify-center z-10 pointer-events-none">
                    <div className="w-full max-w-2xl transcription-panel pt-20 pb-4 px-6 rounded-3xl pointer-events-auto">
                        <div className="space-y-6">
                            <div className="flex flex-col gap-1 transition-all">
                                <span className="text-[10px] font-bold text-[#00d1ff]/80 uppercase tracking-widest ml-1">Alex AI</span>
                                <p className="text-white/60 text-lg font-light leading-relaxed">
                                    Tell me more about how you prioritize accessibility when building complex data visualization components.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Controls */}
                <footer className="w-full flex justify-center z-20">
                    <div className="glass-footer px-2 py-2 rounded-[28px] flex items-center gap-1">
                        <button className="w-14 h-14 flex items-center justify-center rounded-2xl text-white/70 hover:text-white hover:bg-white/10 transition-all">
                            <Mic size={24} />
                        </button>
                        <button className="w-14 h-14 flex items-center justify-center rounded-2xl text-white/70 hover:text-white hover:bg-white/10 transition-all">
                            <Volume2 size={24} />
                        </button>

                        <button
                            className={`w-14 h-14 flex items-center justify-center rounded-2xl transition-all cursor-pointer ${isCopilotOpen ? 'bg-white/20 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                            onClick={() => setIsCopilotOpen(!isCopilotOpen)}
                        >
                            <MessageSquare size={24} />
                        </button>

                        <div className="w-[1px] h-6 bg-white/10 mx-2"></div>

                        <button className="w-14 h-14 flex items-center justify-center rounded-2xl text-white/70 hover:text-white hover:bg-white/10 transition-all">
                            <SlidersHorizontal size={24} />
                        </button>
                        <Link href="/recruiter">
                            <button className="w-14 h-14 flex items-center justify-center rounded-2xl bg-red-500/80 hover:bg-red-500 text-white shadow-lg shadow-red-500/20 transition-all ml-1">
                                <PhoneOff size={24} />
                            </button>
                        </Link>
                    </div>
                </footer>
            </div>

            {/* Sidebar Copilot */}
            <aside className={`fixed top-0 right-0 h-full w-80 glass-sidebar z-30 transition-transform duration-500 ease-in-out flex flex-col ${isCopilotOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6 flex items-center justify-between border-b border-white/10">
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-white/60">Interview Copilot</h2>
                    <button
                        className="p-2 -mr-2 cursor-pointer hover:bg-white/5 rounded-full transition-colors text-white/60 hover:text-white"
                        onClick={() => setIsCopilotOpen(false)}
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-10">
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <History size={16} className="text-[#00d1ff]" />
                            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">Conversation History</h3>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-[#00d1ff]/80 uppercase">Alex AI</span>
                                <p className="text-sm text-white/70 font-light leading-relaxed">Could you describe your typical workflow for design handoffs?</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-white/40 uppercase">Candidate</span>
                                <p className="text-sm text-white/90 font-medium leading-relaxed">I use automated documentation tools combined with weekly syncs to ensure no detail is lost...</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-[#00d1ff]/80 uppercase">Alex AI</span>
                                <p className="text-sm text-white/70 font-light leading-relaxed">Tell me more about how you prioritize accessibility when building complex data visualization components.</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-white/40 uppercase">Candidate</span>
                                <p className="text-sm text-white/90 font-medium leading-relaxed">I start by ensuring semantic HTML and ARIA labels are integrated from the initial prototype...</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles size={16} className="text-[#a259ff]" />
                            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">AI Suggestions</h3>
                        </div>
                        <div className="space-y-3">
                            <button className="w-full text-left p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                                <p className="text-xs text-white/80 group-hover:text-white leading-snug">Ask about team leadership and managing junior designers</p>
                            </button>
                            <button className="w-full text-left p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                                <p className="text-xs text-white/80 group-hover:text-white leading-snug">Deep dive into tech stack and CSS architecture experience</p>
                            </button>
                            <button className="w-full text-left p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                                <p className="text-xs text-white/80 group-hover:text-white leading-snug">Verify conflict resolution skills within product teams</p>
                            </button>
                        </div>
                    </section>
                </div>

                <div className="p-6 border-t border-white/10 bg-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#ff4d94] rounded-full animate-pulse"></div>
                        <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Analyzing response...</span>
                    </div>
                </div>
            </aside>

            {/* Background Ambient Glows */}
            <div className="fixed inset-0 pointer-events-none z-[-10]">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#a259ff]/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#00d1ff]/10 rounded-full blur-[120px]"></div>
            </div>
        </div>
    );
}
