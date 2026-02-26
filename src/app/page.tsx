"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image"; // Added Image import
import { ArrowRight, Bot, Check, Play, User } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { DotPatternLogo } from "@/components/ui/dot-pattern-logo";

export default function LandingPage() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className="min-h-screen bg-[var(--bg-main)] relative overflow-x-hidden">
      {/* Navigation */}
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-24 overflow-visible bg-[var(--bg-main)]" ref={targetRef}>
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            className="hero-container rounded-[48px] pt-24 pb-48 px-8 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid-pattern absolute inset-0 pointer-events-none"></div>
            <div className="relative z-10">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--nav-glass)] border border-indigo-500/30 text-[12px] font-bold text-[var(--brand-purple)] uppercase tracking-wider mb-10 shadow-lg backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="bg-indigo-600 text-white px-2 py-0.5 rounded-full text-[10px] mr-1">
                  New
                </span>
                Enterprise v2.0 Now Live
              </motion.div>
              <motion.h1
                className="text-[64px] md:text-[88px] font-bold tracking-tighter text-[var(--text-main)] leading-[0.95] mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Your Resume,
                <br />
                Now Alive.
              </motion.h1>
              <motion.p
                className="text-[22px] text-[var(--text-muted)] max-w-2xl mx-auto mb-12 leading-relaxed font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Transform static PDFs into interactive AI agents that recruiters
                can interview 24/7. Your high-fidelity professional digital
                twin.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <button className="btn-primary px-12 py-5 rounded-full font-bold text-[18px] shadow-2xl shadow-indigo-500/20">
                  Deploy Your AI Twin
                </button>
                <button className="bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-color)] px-12 py-5 rounded-full font-bold text-[18px] hover:bg-[var(--bg-card-hover)] transition-colors shadow-sm backdrop-blur-md">
                  Request Demo
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* Floating UI Window (Parallax Effect) */}
          <motion.div
            className="relative mx-auto max-w-[960px] w-full -mt-32 z-20 px-4"
            style={{ y }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            <div className="ui-window overflow-hidden text-left bg-[var(--ui-window-bg)] ring-1 ring-[var(--border-color)]">
              <div className="chat-header px-6 py-4 flex items-center justify-between border-b border-[var(--border-color)] bg-[var(--nav-glass)]">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  </div>
                  <div className="h-4 w-px bg-[var(--border-color)] mx-1"></div>
                  <div className="flex items-center gap-2">
                    <span className="text-[18px] text-[var(--text-muted)]">💬</span>
                    <span className="text-[12px] font-bold text-[var(--text-muted)] tracking-wide uppercase">
                      Candidate Portal | Technical Screening
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
                  <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest">
                    Digital Twin Active
                  </span>
                </div>
              </div>

              {/* Chat Content */}
              <div className="p-8 md:p-14 space-y-12">
                <div className="flex gap-6 max-w-[85%]">
                  <div className="w-12 h-12 rounded-full bg-[var(--bg-card)] flex items-center justify-center shrink-0 border border-[var(--border-color)] shadow-sm">
                    <User className="text-[var(--text-muted)] w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] text-[16px] p-6 rounded-[24px] rounded-tl-none leading-relaxed text-[var(--text-main)] shadow-sm">
                      "I see you've led several cloud migrations. Could you
                      explain how you managed data consistency across hybrid
                      environments during the switch?"
                    </div>
                    <div className="flex items-center gap-2 px-1">
                      <span className="text-[11px] text-[var(--text-muted)] font-bold uppercase tracking-wider">
                        Hiring Manager
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-6 justify-end">
                  <div className="space-y-2 text-right max-w-[85%]">
                    <div className="bg-indigo-600 text-white text-[16px] p-6 rounded-[24px] rounded-tr-none leading-relaxed shadow-xl shadow-indigo-100 text-left">
                      "For those migrations, I leveraged a change-data-capture
                      (CDC) pattern with Kafka. This allowed us to keep the
                      legacy and cloud databases in sync within milliseconds,
                      ensuring that users saw consistent data regardless of the
                      cluster."
                    </div>
                    <div className="flex items-center justify-end gap-2 px-1">
                      <span className="text-[11px] text-indigo-600 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-indigo-600" />
                        Sarah's AI Twin
                      </span>
                      <span className="w-1 h-1 bg-indigo-200 rounded-full"></span>
                      <span className="text-[11px] text-slate-400 italic">
                        Technical voice match 98%
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-indigo-500/30 ring-4 ring-indigo-500/10">
                    <img
                      alt="Professional Profile"
                      className="w-full h-full object-cover"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
                    />
                  </div>
                </div>

                <div className="pt-8 border-t border-[var(--border-color)] flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-40 animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-60 animate-bounce delay-75"></div>
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                    <span className="text-[13px] text-[var(--text-muted)] italic">
                      Hiring manager is typing...
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <button className="text-[12px] font-bold text-indigo-500 hover:text-indigo-400">
                      View Full Transcript
                    </button>
                    <button className="text-[12px] font-bold text-[var(--text-muted)] hover:text-[var(--text-main)]">
                      Export PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 px-8 bg-[var(--bg-main)] relative z-10" id="stats">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[52px] font-bold tracking-tighter text-[var(--text-main)]">
              The Professional Impact
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                value: "12x",
                label: "Interview Rate",
                desc: "Higher placement rate for candidates using active AI twins compared to traditional PDFs.",
              },
              {
                value: "24/7",
                label: "Availability",
                desc: "Your professional expertise stays engaged across every timezone while you focus on what matters.",
              },
              {
                value: "100%",
                label: "Data Sovereignty",
                desc: "Full encryption and ownership. You control exactly what your twin knows and who it speaks to.",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div className="text-[64px] font-bold text-[var(--brand-purple)] mb-2 tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-[13px] font-bold text-[var(--text-muted)] uppercase tracking-[0.2em] mb-6">
                  {stat.label}
                </div>
                <p className="text-[17px] text-[var(--text-muted)] leading-relaxed">
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-40 px-8 section-divider bg-[var(--bg-main)]/50 border-t border-[var(--border-color)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              className="space-y-10"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-[52px] font-bold tracking-tighter leading-[1.1] text-[var(--text-main)]">
                Authentic intelligence, synced with your work.
              </h2>
              <p className="text-[20px] text-[var(--text-muted)] leading-relaxed">
                Our AI twin isn't just a chatbot—it's a high-fidelity synthesis
                of your professional identity. It integrates with your actual
                work artifacts to sound and think exactly like you.
              </p>
              <ul className="space-y-6">
                {[
                  "Real-time synchronization with GitHub & LinkedIn",
                  "Proprietary NLP optimized for technical domains",
                  "Custom tone-of-voice & persona mapping",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-4 text-[18px] font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  >
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                      <Check className="text-[var(--brand-purple)] w-4 h-4 font-bold" />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-full aspect-square opacity-100">
                <DotPatternLogo />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-56 px-8 bg-[var(--bg-main)]">
        <motion.div
          className="max-w-[900px] mx-auto text-center space-y-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-[64px] md:text-[80px] font-bold tracking-tighter text-[var(--text-main)] leading-none">
            Scale your expertise.
          </h2>
          <p className="text-2xl text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
            Join 50,000+ top-tier professionals who are already using TwinlyAI
            to navigate the future of recruitment.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-8">
            <button className="bg-[var(--brand-purple)] text-white px-12 py-6 rounded-full font-bold text-[20px] hover:opacity-90 transition-opacity button-hover-effect shadow-xl shadow-indigo-500/20">
              Create Your Instance
            </button>
            <button className="bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-main)] px-12 py-6 rounded-full font-bold text-[20px] hover:bg-[var(--bg-card-hover)] transition-colors">
              Talk to Sales
            </button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
