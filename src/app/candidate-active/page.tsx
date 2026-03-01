"use client";

import React from "react";
import Image from "next/image";
import {
    LayoutDashboard,
    BarChart3,
    History,
    Settings,
    User,
    Terminal,
    Key,
    Copy,
    RefreshCw,
    Trash2,
    ArrowUp,
    ChevronDown
} from "lucide-react";

const AVATARS = [
    "https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e2e8f0",
    "https://api.dicebear.com/7.x/notionists/svg?seed=Aneka&backgroundColor=fef08a",
    "https://api.dicebear.com/7.x/notionists/svg?seed=Jasper&backgroundColor=bfdbfe",
    "https://api.dicebear.com/7.x/notionists/svg?seed=Mia&backgroundColor=fbcfe8",
    "https://api.dicebear.com/7.x/notionists/svg?seed=Oliver&backgroundColor=bbf7d0",
    "https://api.dicebear.com/7.x/notionists/svg?seed=Sophia&backgroundColor=fca5a5"
];

export default function CandidateActiveDashboard() {
    const [mounted, setMounted] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState('dashboard');
    const [isProfileMenuOpen, setIsProfileMenuOpen] = React.useState(false);

    // Extracted from onboarding flow local storage
    const [userName, setUserName] = React.useState("Alex Rivera");
    const [userAvatar, setUserAvatar] = React.useState(AVATARS[0]);

    React.useEffect(() => {
        setMounted(true);
        // Safely extract from localStorage once mounted
        const rawData = localStorage.getItem("onboardingData");
        if (rawData) {
            try {
                const data = JSON.parse(rawData);
                if (data.name) setUserName(data.name);
                if (typeof data.avatarIndex === 'number' && AVATARS[data.avatarIndex]) {
                    setUserAvatar(AVATARS[data.avatarIndex]);
                }
            } catch (error) {
                console.error("Failed to parse onboarding data:", error);
            }
        }
    }, []);

    if (!mounted) return null; // Prevent hydration errors

    return (
        <div className="flex h-screen overflow-hidden bg-slate-100 dark:bg-[#0B0E14] text-slate-900 dark:text-white font-sans antialiased relative">
            {/* Background Orbs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 dark:bg-blue-600/20 blur-[120px] mix-blend-screen animate-pulse shadow-[0_0_100px_rgba(59,130,246,0.3)]"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-purple-500/20 dark:bg-purple-600/20 blur-[150px] mix-blend-screen animate-pulse shadow-[0_0_120px_rgba(168,85,247,0.3)]" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Sidebar */}
            <aside className="w-20 lg:w-64 border-r border-slate-200 dark:border-white/10 flex flex-col bg-white/70 dark:bg-[#0B0E14]/80 backdrop-blur-xl z-10 relative">
                <div className="p-8 flex items-center gap-3">
                    <Image src="/butterfly.svg" alt="TwinlyAI" width={32} height={32} className="dark:invert drop-shadow-md" />
                    <h2 className="hidden lg:block text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">TwinlyAI</h2>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'dashboard'
                            ? 'bg-slate-900/5 dark:bg-white/10 text-slate-900 dark:text-white'
                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-900/5 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                            }`}
                    >
                        <LayoutDashboard size={22} />
                        <span className="hidden lg:block">Dashboard</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('analytics')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'analytics'
                            ? 'bg-slate-900/5 dark:bg-white/10 text-slate-900 dark:text-white'
                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-900/5 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                            }`}
                    >
                        <BarChart3 size={22} />
                        <span className="hidden lg:block">Analytics</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'history'
                            ? 'bg-slate-900/5 dark:bg-white/10 text-slate-900 dark:text-white'
                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-900/5 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                            }`}
                    >
                        <History size={22} />
                        <span className="hidden lg:block">History</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'settings'
                            ? 'bg-slate-900/5 dark:bg-white/10 text-slate-900 dark:text-white'
                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-900/5 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                            }`}
                    >
                        <Settings size={22} />
                        <span className="hidden lg:block">Settings</span>
                    </button>
                </nav>

                <div className="p-6 border-t border-slate-200 dark:border-white/10 relative">
                    {/* Collapsible Profile Popover */}
                    {isProfileMenuOpen && (
                        <div className="absolute bottom-full left-6 mb-2 w-52 bg-white/90 dark:bg-[#1C2128]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-lg rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200 z-50">
                            <div className="p-3 border-b border-slate-100 dark:border-white/5">
                                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-2">Account</p>
                            </div>
                            <div className="p-1">
                                <button className="w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors">
                                    View Profile
                                </button>
                                <button className="w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors">
                                    Billing & Plans
                                </button>
                                <div className="h-px bg-slate-100 dark:bg-white/5 my-1" />
                                <button className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors">
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    )}

                    <div
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-900/5 dark:hover:bg-white/5 cursor-pointer transition-colors"
                        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    >
                        <div
                            className="w-10 h-10 rounded-full bg-cover bg-center border border-slate-200 dark:border-white/10"
                            style={{ backgroundImage: `url("${userAvatar}")` }}
                        ></div>
                        <div className="hidden lg:block overflow-hidden">
                            <p className="text-[13px] font-semibold truncate">{userName}</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">Premium Plan</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-transparent z-10 relative">
                <header className="h-20 border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-10 bg-white/70 dark:bg-[#0B0E14]/80 backdrop-blur-md sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-semibold text-slate-900 dark:text-white capitalize">
                            {activeTab === 'dashboard' ? 'Agent Profile' : activeTab}
                        </h1>
                        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400"></span>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-green-700 dark:text-green-400">Live</span>
                        </div>
                    </div>
                    {activeTab === 'dashboard' && (
                        <div className="flex items-center gap-3">
                            <button className="px-5 py-2.5 rounded-full bg-white dark:bg-[#1C2128] border border-slate-200 dark:border-white/10 text-sm font-medium hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                                Preview Page
                            </button>
                            <button className="px-5 py-2.5 rounded-full bg-[#007AFF] text-white text-sm font-semibold hover:bg-blue-600 transition-all shadow-md shadow-blue-500/20">
                                Publish Changes
                            </button>
                        </div>
                    )}
                </header>

                <div className="flex-1 overflow-y-auto p-10 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-white/20 scrollbar-track-transparent">
                    <div className="max-w-6xl mx-auto">

                        {/* Tab: Dashboard */}
                        {activeTab === 'dashboard' && (
                            <div className="grid grid-cols-12 gap-10">
                                {/* Left Column: Settings */}
                                <div className="col-span-12 lg:col-span-7 space-y-10">
                                    {/* Identity Config */}
                                    <section className="bg-white/80 dark:bg-[#1C2128]/80 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-sm rounded-3xl p-8">
                                        <div className="flex items-center gap-3 mb-8">
                                            <User className="text-[#007AFF]" size={24} />
                                            <h3 className="text-lg font-semibold">Identity Configuration</h3>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="flex flex-col">
                                                    <label htmlFor="agent-name" className="text-[13px] font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">Agent Display Name</label>
                                                    <input
                                                        id="agent-name"
                                                        type="text"
                                                        defaultValue={`${userName} AI`}
                                                        className="bg-white dark:bg-[#0B0E14] border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-2.5 text-sm transition-all duration-200 focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] outline-none text-slate-900 dark:text-white"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <label htmlFor="agent-role" className="text-[13px] font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">Professional Title</label>
                                                    <input
                                                        id="agent-role"
                                                        type="text"
                                                        defaultValue="Senior Product Designer"
                                                        className="bg-white dark:bg-[#0B0E14] border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-2.5 text-sm transition-all duration-200 focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] outline-none text-slate-900 dark:text-white"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <label htmlFor="agent-bio" className="text-[13px] font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">Personality & Context</label>
                                                <textarea
                                                    id="agent-bio"
                                                    rows={4}
                                                    className="resize-none bg-white dark:bg-[#0B0E14] border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-2.5 text-sm transition-all duration-200 focus:ring-2 focus:ring-[#007AFF]/20 focus:border-[#007AFF] outline-none text-slate-900 dark:text-white"
                                                    defaultValue={`I'm ${userName.split(' ')[0]}'s AI twin. I represent his design philosophy, technical skills, and career achievements. I should be articulate, helpful, and maintain a high standard of professional ethics while showing a bit of creative spark.`}
                                                />
                                            </div>
                                        </div>
                                    </section>

                                    {/* System Directives */}
                                    <section className="bg-white/80 dark:bg-[#1C2128]/80 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-sm rounded-3xl overflow-hidden">
                                        <button className="w-full flex items-center justify-between p-8 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                                            <div className="flex items-center gap-3">
                                                <Terminal className="text-[#007AFF]" size={24} />
                                                <h3 className="text-lg font-semibold">System Directives</h3>
                                            </div>
                                            <ChevronDown className="text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white rotate-180" size={24} />
                                        </button>
                                        <div className="px-8 pb-8">
                                            <div className="bg-slate-100 dark:bg-[#0B0E14] rounded-2xl p-6 font-mono text-[13px] text-slate-800 dark:text-slate-300 leading-relaxed border border-slate-200 dark:border-white/5 shadow-inner">
                                                <p className="mb-3 text-slate-500 dark:text-slate-500">{`// CORE INSTRUCTIONS`}</p>
                                                <p className="mb-2">1. Prioritize user-centric design data</p>
                                                <p className="mb-2">2. Reference Figma, React, and Swift workflows</p>
                                                <p className="mb-2">3. Keep responses under 150 words</p>
                                                <p className="text-[#007AFF]/80 mt-4 mb-2">{`# Experience Context`}</p>
                                                <p>- 8 years in Apple ecosystem design</p>
                                            </div>
                                        </div>
                                    </section>

                                    {/* API Connectivity */}
                                    <section className="bg-white/80 dark:bg-[#1C2128]/80 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-sm rounded-3xl p-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            <Key className="text-[#007AFF]" size={24} />
                                            <h3 className="text-lg font-semibold">API Connectivity</h3>
                                        </div>
                                        <div className="bg-slate-100 dark:bg-[#0B0E14] p-5 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center justify-between shadow-inner space-x-4">
                                            <div className="min-w-0">
                                                <label className="mb-0 text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-500 font-semibold block">Production Key</label>
                                                <p className="font-mono text-sm mt-1 text-slate-800 dark:text-slate-300 truncate">rk_live_•••••••••••••••••v8Lp</p>
                                            </div>
                                            <div className="flex gap-2 shrink-0">
                                                <button className="p-2 rounded-full hover:bg-white dark:hover:bg-[#1C2128] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all border border-transparent hover:border-slate-200 dark:hover:border-white/10 shadow-sm hover:shadow">
                                                    <Copy size={18} />
                                                </button>
                                                <button className="p-2 rounded-full hover:bg-white dark:hover:bg-[#1C2128] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all border border-transparent hover:border-slate-200 dark:hover:border-white/10 shadow-sm hover:shadow">
                                                    <RefreshCw size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </section>
                                </div>

                                {/* Right Column: The Mirror Chat UI */}
                                <div className="col-span-12 lg:col-span-5">
                                    <div className="bg-white/90 dark:bg-[#1C2128]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-[32px] h-[760px] flex flex-col overflow-hidden sticky top-28">
                                        <div className="p-6 border-b border-slate-200 dark:border-white/10 bg-transparent flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-2.5 h-2.5 bg-green-500 dark:bg-green-400 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                                <div>
                                                    <h4 className="font-semibold text-[16px] text-slate-900 dark:text-white">The Mirror</h4>
                                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">REAL-TIME PREVIEW</p>
                                                </div>
                                            </div>
                                            <button className="text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>

                                        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-white/20 scrollbar-track-transparent bg-slate-50/50 dark:bg-[#0B0E14]/40">
                                            {/* Outgoing Message (Recruiter) */}
                                            <div className="flex flex-col items-end">
                                                <div className="bg-[#007AFF] text-white rounded-[22px] rounded-br-[6px] px-4 py-2.5 text-[15px] leading-relaxed max-w-[85%] shadow-sm">
                                                    Hi {userName.split(' ')[0]}! I saw your portfolio. What&apos;s your process for handoff between design and engineering?
                                                </div>
                                                <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 font-medium mr-1 uppercase">Recruiter • 2:14 PM</span>
                                            </div>

                                            {/* Incoming Message (AI Agent) */}
                                            <div className="flex flex-col items-start gap-1">
                                                <div className="flex items-end gap-2 w-full">
                                                    <div className="bg-white dark:bg-[#2A303C] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/5 rounded-[22px] rounded-bl-[6px] px-4 py-2.5 text-[15px] leading-relaxed max-w-[85%] shadow-sm">
                                                        I treat handoff as a continuous conversation. I build robust design systems where every component is documented with its technical constraints, motion specs, and accessibility requirements.
                                                    </div>
                                                </div>
                                                <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 font-medium ml-1 uppercase">{userName.split(' ')[0]} AI • Now</span>
                                            </div>

                                            {/* Typing Indicator */}
                                            <div className="flex items-center gap-3 ml-1 pt-2">
                                                <div className="flex gap-1.5 bg-white dark:bg-[#2A303C] border border-slate-200 dark:border-white/5 px-4 py-3.5 rounded-full shadow-sm">
                                                    <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"></span>
                                                    <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }}></span>
                                                    <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }}></span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 bg-transparent border-t border-slate-200 dark:border-white/10 backdrop-blur-md">
                                            <div className="relative flex items-center gap-2">
                                                <input
                                                    className="w-full bg-white dark:bg-[#0B0E14] border border-slate-200 dark:border-white/10 rounded-full px-5 py-3.5 pr-14 text-[15px] focus:ring-2 focus:ring-[#007AFF] placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-all shadow-inner text-slate-900 dark:text-white"
                                                    placeholder="Test your agent..."
                                                    type="text"
                                                />
                                                <button className="absolute right-2 w-9 h-9 rounded-full bg-[#007AFF] text-white flex items-center justify-center hover:bg-blue-600 transition-colors shadow-sm">
                                                    <ArrowUp size={18} strokeWidth={2.5} />
                                                </button>
                                            </div>
                                            <p className="text-center text-[10px] text-slate-400 dark:text-slate-500 mt-5 font-semibold uppercase tracking-[0.2em]">Twinly AI resume engine v2.0</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab: Analytics */}
                        {activeTab === 'analytics' && (
                            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-white/80 dark:bg-[#1C2128]/80 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-sm rounded-3xl p-8">
                                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Total Profile Views</p>
                                        <h3 className="text-4xl font-bold bg-gradient-to-r from-[#007AFF] to-[#5AC8FA] bg-clip-text text-transparent">3,492</h3>
                                        <p className="text-sm font-medium text-green-600 dark:text-green-400 mt-3 flex items-center gap-1">+12% <span className="text-slate-400 text-xs">from last week</span></p>
                                    </div>
                                    <div className="bg-white/80 dark:bg-[#1C2128]/80 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-sm rounded-3xl p-8">
                                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Agent Inquiries</p>
                                        <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-fuchsia-500 bg-clip-text text-transparent">128</h3>
                                        <p className="text-sm font-medium text-green-600 dark:text-green-400 mt-3 flex items-center gap-1">+4% <span className="text-slate-400 text-xs">from last week</span></p>
                                    </div>
                                    <div className="bg-white/80 dark:bg-[#1C2128]/80 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-sm rounded-3xl p-8">
                                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Avg. Match Score</p>
                                        <h3 className="text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">94%</h3>
                                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-3">High compatibility rating</p>
                                    </div>
                                </div>
                                <div className="bg-white/80 dark:bg-[#1C2128]/80 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-sm rounded-3xl p-10 h-96 flex items-center justify-center flex-col text-center">
                                    <BarChart3 size={48} className="text-slate-300 dark:text-slate-600 mb-4" />
                                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Detailed analytics arriving soon</h4>
                                    <p className="text-slate-500 dark:text-slate-400 max-w-sm mt-2">We are compiling deeper insights regarding your agent&apos;s interactions with prospective recruiters.</p>
                                </div>
                            </div>
                        )}

                        {/* Tab: History */}
                        {activeTab === 'history' && (
                            <div className="bg-white/80 dark:bg-[#1C2128]/80 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-sm rounded-3xl overflow-hidden animate-in fade-in duration-300">
                                <div className="p-8 border-b border-slate-200 dark:border-white/10">
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Interactions</h3>
                                </div>
                                <div className="divide-y divide-slate-100 dark:divide-white/5">
                                    {[
                                        { company: 'Tech Innovators Inc.', time: '2 hours ago', action: 'Chatted with your twin regarding UI scale architecture.' },
                                        { company: 'Global Solutions', time: 'Yesterday', action: 'Viewed your system directives and connection keys.' },
                                        { company: 'Alpha Startups', time: '3 days ago', action: 'Downloaded resume extraction summary.' },
                                        { company: 'Meta Design Team', time: '1 week ago', action: 'Chatted with your twin for 15 minutes.' }
                                    ].map((item, i) => (
                                        <div key={i} className="p-6 flex items-start gap-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                            <div className="w-10 h-10 rounded-full bg-[#007AFF]/10 flex items-center justify-center shrink-0">
                                                <History size={18} className="text-[#007AFF]" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-[15px] text-slate-900 dark:text-white">{item.company}</h4>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{item.action}</p>
                                            </div>
                                            <div className="ml-auto text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                                {item.time}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tab: Settings */}
                        {activeTab === 'settings' && (
                            <div className="max-w-3xl space-y-8 animate-in fade-in duration-300">
                                <section className="bg-white/80 dark:bg-[#1C2128]/80 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-sm rounded-3xl p-8">
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Notification Preferences</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-[#0B0E14] rounded-2xl border border-slate-200 dark:border-white/5">
                                            <div>
                                                <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Email Alerts</h4>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Receive an email when a recruiter interacts securely.</p>
                                            </div>
                                            <div className="w-11 h-6 bg-green-500 rounded-full relative cursor-pointer shadow-inner">
                                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-[#0B0E14] rounded-2xl border border-slate-200 dark:border-white/5">
                                            <div>
                                                <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Weekly Digest</h4>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Summary report of profile analytics.</p>
                                            </div>
                                            <div className="w-11 h-6 bg-slate-300 dark:bg-slate-700 rounded-full relative cursor-pointer shadow-inner">
                                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="bg-white/80 dark:bg-[#1C2128]/80 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-sm rounded-3xl p-8">
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Danger Zone</h3>
                                    <div className="p-5 border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/5 rounded-2xl">
                                        <h4 className="font-semibold text-sm text-red-700 dark:text-red-400">Deactivate Agent</h4>
                                        <p className="text-xs text-red-600/80 dark:text-red-400/80 mt-1 mb-4">This will immediately pull your TwinlyAI profile offline. Recruiters will no longer be able to chat.</p>
                                        <button className="px-5 py-2.5 bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-red-200 dark:hover:bg-red-500/30 transition-colors">
                                            Take Offline
                                        </button>
                                    </div>
                                </section>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
