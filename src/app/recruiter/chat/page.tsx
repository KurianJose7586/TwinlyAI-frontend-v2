"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Search,
    Phone,
    Video,
    MoreVertical,
    Send,
    Smile,
    Paperclip,
    ChevronLeft,
    CheckCheck
} from "lucide-react";

const CHATS = [
    {
        id: "1",
        name: "Sarah Jenkins",
        role: "AI Infrastructure Lead",
        avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Aneka&backgroundColor=fef08a",
        lastMessage: "I optimized the PyTorch inference pipeline...",
        time: "10:24 AM",
        unread: 2,
        active: true
    },
    {
        id: "2",
        name: "Marcus Vane",
        role: "Data Engineering Architect",
        avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Jasper&backgroundColor=bfdbfe",
        lastMessage: "Yes, we mainly used Pinecone for the vector...",
        time: "Yesterday",
        unread: 0,
        active: false
    },
    {
        id: "3",
        name: "Elena Rodriguez",
        role: "LLM Product Engineer",
        avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Mia&backgroundColor=fbcfe8",
        lastMessage: "Sure, I can send over the case study.",
        time: "Yesterday",
        unread: 0,
        active: false
    }
];

export default function CandidateChatPage() {
    const [message, setMessage] = useState("");

    return (
        <div className="flex h-screen bg-slate-100 dark:bg-[#0B0E14] text-slate-900 dark:text-white font-sans overflow-hidden transition-colors duration-300">
            {/* Sidebar List */}
            <aside className="w-full md:w-80 lg:w-96 border-r border-slate-200 dark:border-white/10 flex flex-col bg-white dark:bg-[#1C2128]">
                <div className="p-4 border-b border-slate-200 dark:border-white/10 flex items-center gap-3">
                    <Link href="/recruiter" className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors">
                        <ChevronLeft size={20} className="text-slate-500 dark:text-slate-400" />
                    </Link>
                    <h1 className="text-xl font-bold tracking-tight">Messages</h1>
                </div>

                <div className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            className="w-full bg-slate-100 dark:bg-[#0B0E14] border border-transparent dark:border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-shadow"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-white/20">
                    {CHATS.map((chat) => (
                        <div
                            key={chat.id}
                            className={`flex items-start gap-4 p-4 cursor-pointer transition-colors border-l-4 ${chat.active ? 'bg-blue-50/50 dark:bg-white/5 border-blue-600 dark:border-purple-500' : 'hover:bg-slate-50 dark:hover:bg-white/5 border-transparent'}`}
                        >
                            <div className="relative shrink-0">
                                <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#0B0E14]">
                                    <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
                                </div>
                                {chat.active && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#1C2128] rounded-full"></div>}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-semibold text-sm text-slate-900 dark:text-white truncate">{chat.name}</h3>
                                    <span className={`text-[11px] font-medium shrink-0 ml-2 ${chat.unread > 0 ? 'text-blue-600 dark:text-purple-400' : 'text-slate-500 dark:text-slate-400'}`}>{chat.time}</span>
                                </div>
                                <div className="flex justify-between items-center gap-2">
                                    <p className={`text-xs truncate ${chat.unread > 0 ? 'font-semibold text-slate-800 dark:text-slate-200' : 'text-slate-500 dark:text-slate-400'}`}>
                                        {chat.lastMessage}
                                    </p>
                                    {chat.unread > 0 && (
                                        <span className="w-4 h-4 rounded-full bg-blue-600 dark:bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                                            {chat.unread}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] dark:bg-[#0B0E14] relative">
                {/* Chat Header */}
                <header className="h-20 border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-6 bg-white/80 dark:bg-[#1C2128]/80 backdrop-blur-md sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#0B0E14]">
                            <img src={CHATS[0].avatar} alt={CHATS[0].name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="font-bold text-[15px]">{CHATS[0].name} AI</h2>
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/30">
                                    98% MATCH
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 tracking-wide">{CHATS[0].role}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link href="/recruiter/call">
                            <button className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 transition-colors">
                                <Phone size={20} />
                            </button>
                        </Link>
                        <button className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 transition-colors">
                            <Video size={20} />
                        </button>
                        <div className="w-px h-6 bg-slate-200 dark:bg-white/10 mx-2"></div>
                        <button className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 transition-colors">
                            <MoreVertical size={20} />
                        </button>
                    </div>
                </header>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-white/20">
                    <div className="flex justify-center mb-8">
                        <span className="px-3 py-1 bg-slate-200/50 dark:bg-white/5 rounded-full text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                            Today
                        </span>
                    </div>

                    {/* Recruiter Message */}
                    <div className="flex flex-col items-end">
                        <div className="bg-blue-600 dark:bg-purple-600 text-white rounded-[20px] rounded-br-sm px-5 py-3 text-[15px] leading-relaxed max-w-[80%] shadow-sm">
                            Hi Sarah! I noticed your extensive experience with PyTorch and Kubernetes. Could you elaborate on how you optimized the inference pipeline at your last role?
                        </div>
                        <div className="flex items-center gap-1 mt-1 mr-1">
                            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium tracking-wide">10:22 AM</span>
                            <CheckCheck size={14} className="text-blue-500 dark:text-purple-400" />
                        </div>
                    </div>

                    {/* AI Agent Message */}
                    <div className="flex flex-col items-start">
                        <div className="flex gap-3 max-w-[80%]">
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 dark:border-white/10 shrink-0 mt-auto hidden sm:block">
                                <img src={CHATS[0].avatar} alt={CHATS[0].name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col">
                                <div className="bg-white dark:bg-[#1C2128] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/5 rounded-[20px] rounded-bl-sm px-5 py-3 text-[15px] leading-relaxed shadow-sm">
                                    Absolutely! I optimized the PyTorch inference pipeline by implementing a custom model sharding strategy across our GPU clusters using Ray. We also switched our serving layer to TensorRT, which massively reduced latency by about 40% for our most intensive generation tasks.
                                </div>
                                <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 ml-1 font-medium tracking-wide">10:24 AM</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white/80 dark:bg-[#1C2128]/80 backdrop-blur-md border-t border-slate-200 dark:border-white/10">
                    <div className="max-w-4xl mx-auto flex items-end gap-3 bg-slate-100 dark:bg-[#0B0E14] border border-slate-200 dark:border-white/5 rounded-[24px] p-2 shadow-inner">
                        <button className="p-2.5 rounded-full text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors shrink-0">
                            <Paperclip size={20} />
                        </button>

                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Message Sarah's AI Twin..."
                            className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[44px] py-3 text-[15px] outline-none text-slate-900 dark:text-white placeholder:text-slate-400 scrollbar-none"
                            rows={1}
                        />

                        <div className="flex items-center gap-1 pb-1 shrink-0">
                            <button className="p-2.5 rounded-full text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors hidden sm:block">
                                <Smile size={20} />
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 dark:bg-purple-600 hover:bg-blue-700 dark:hover:bg-purple-700 text-white transition-all shadow-md ml-1 shrink-0">
                                <Send size={18} className="translate-x-[1px] translate-y-[1px]" />
                            </button>
                        </div>
                    </div>
                    <p className="text-center text-[10px] text-slate-400 dark:text-slate-500 mt-3 font-semibold uppercase tracking-[0.2em]">RESUME-GENIE AI CONNECTION SECURED</p>
                </div>
            </main>
        </div>
    );
}
