"use client";

import { motion } from "framer-motion";
import { Check, User } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DotPatternLogo } from "@/components/ui/dot-pattern-logo";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

// --- Helper Component: Subtle Typing Effect ---
const AnimatedTypingText = ({ text }: { text: string }) => {
  const words = text.split(" ");

  return (
    <motion.span
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.03, // Speed of typing (lower is faster)
            delayChildren: 0.2     // Waits for the bubble to finish entering before typing
          }
        }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-1"
          variants={{
            hidden: { opacity: 0, filter: "blur(2px)", y: 2 },
            visible: { opacity: 1, filter: "blur(0px)", y: 0 }
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function LandingPage() {
  // We're removing the heavy nested useMotionValue tilt calculations because it combats ContainerScroll
  // and compounds lag. The primary effect should just be the 3D scroll coming from ContainerScroll.

  return (
    <main className="min-h-screen bg-[var(--bg-main)] relative overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[var(--bg-main)]">
        <ContainerScroll
          titleComponent={
            <div className="flex flex-col items-center pb-8 pt-8 md:pt-20">

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
                className="text-[22px] text-[var(--text-muted)] max-w-2xl mx-auto mb-12 leading-relaxed font-light px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Transform static PDFs into interactive AI agents that recruiters
                can interview 24/7. Your high-fidelity professional digital twin.
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
          }
        >
          {/* Interactive UI Window */}
          <div
            className="w-full h-full bg-[#111318] rounded-2xl overflow-hidden will-change-transform shadow-[0_0_80px_rgba(255,255,255,0.05)]"
            style={{
              perspective: 1200
            }}
          >
            <div
              className="h-full w-full bg-[#111318] text-white rounded-2xl ring-1 ring-white/5 text-left transform-gpu"
            >
              {/* Header */}
              <div className="chat-header px-8 py-5 flex items-center justify-between border-b border-white/5 bg-[#111318]">
                <div className="flex items-center gap-6">
                  <div className="flex gap-2.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] hover:bg-red-500 transition-colors cursor-pointer"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] hover:bg-yellow-500 transition-colors cursor-pointer"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] hover:bg-green-500 transition-colors cursor-pointer"></div>
                  </div>
                  <div className="h-5 w-px bg-white/10 mx-2"></div>
                  <div className="flex items-center gap-3">
                    <span className="text-[20px] text-white/60">💬</span>
                    <span className="text-[13px] font-bold text-white/60 tracking-wider uppercase">
                      Candidate Portal | Technical Screening
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-[#4F46E5]/10 px-4 py-2 rounded-full border border-[#4F46E5]/20">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-[#4F46E5] animate-pulse"></span>
                  <span className="text-[12px] font-bold text-[#4F46E5] uppercase tracking-widest">
                    Digital Twin Active
                  </span>
                </div>
              </div>

              {/* Chat Content - Staggered Storytelling */}
              <motion.div
                className="px-8 py-10 space-y-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  visible: { transition: { staggerChildren: 1.2 } }
                }}
              >

                {/* 1. Hiring Manager Message (Now on Right) */}
                <motion.div
                  className="flex gap-6 justify-end will-change-transform"
                  variants={{
                    hidden: { opacity: 0, x: 20, scale: 0.95 },
                    visible: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 100 } }
                  }}
                >
                  <div className="space-y-4 text-right max-w-[85%]">
                    <div className="bg-[#1e2330] border-none text-[18px] p-6 md:p-8 rounded-[32px] rounded-tr-[8px] leading-[1.6] text-white/90 shadow-sm text-left">
                      <AnimatedTypingText text="I see you&rsquo;ve led several cloud migrations. Could you explain how you managed data consistency across hybrid environments during the switch?" />
                    </div>
                    <div className="flex items-center justify-end gap-2 px-2">
                      <span className="text-[12px] text-white/40 font-bold uppercase tracking-widest">Hiring Manager</span>
                    </div>
                  </div>
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden shrink-0 border-2 border-[#1e2330] ring-4 ring-white/5 bg-[#1e2330]">
                    <img
                      alt="Recruiter Profile"
                      className="w-full h-full object-cover scale-[1.3] pt-2"
                      src="https://api.dicebear.com/7.x/notionists/svg?seed=Michael&backgroundColor=e2e8f0"
                    />
                  </div>
                </motion.div>

                {/* 2. AI Twin Response (Now on Left) */}
                <motion.div
                  className="flex gap-6 max-w-[85%] will-change-transform"
                  variants={{
                    hidden: { opacity: 0, x: -20, scale: 0.95 },
                    visible: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 100 } }
                  }}
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden shrink-0 border-2 border-[#1e2330] ring-4 ring-white/5 bg-[#1e2330]">
                    <img
                      alt="Professional Profile"
                      className="w-full h-full object-cover"
                      src="https://api.dicebear.com/7.x/notionists/svg?seed=Sarah&backgroundColor=e2e8f0"
                    />
                  </div>
                  <div className="space-y-4 text-left">
                    <div className="bg-[#5c4dff] text-white text-[18px] p-6 md:p-8 rounded-[32px] rounded-tl-[8px] leading-[1.6] shadow-[0_0_80px_rgba(92,77,255,0.15)] relative group overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      <AnimatedTypingText text="For those migrations, I leveraged a change-data-capture (CDC) pattern with Kafka. This allowed us to keep the legacy and cloud databases in sync within milliseconds, ensuring that users saw consistent data regardless of the cluster." />
                    </div>
                    <div className="flex flex-wrap items-center gap-3 px-2">
                      <span className="text-[12px] text-[#A5B4FC] font-bold uppercase tracking-widest flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#A5B4FC]" /> AI DIGITAL TWIN
                      </span>
                      <span className="w-1.5 h-1.5 bg-[#4F46E5]/40 rounded-full hidden sm:block"></span>
                      <span className="text-[12px] text-white/40 italic">Technical voice match 98%</span>
                    </div>
                  </div>
                </motion.div>

                {/* 3. Typing Indicator */}
                <motion.div
                  className="pt-6 border-t border-white/5 flex items-center justify-between will-change-transform mt-2"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <div className="flex items-center gap-5">
                    <div className="flex gap-1.5 bg-[#1e2330] px-4 py-3 rounded-full border border-white/5">
                      <div className="w-2 h-2 bg-[#5c4dff] rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[#5c4dff] rounded-full animate-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-[#5c4dff] rounded-full animate-bounce delay-150"></div>
                    </div>
                    <span className="text-[14px] text-white/40 italic">Hiring manager is typing...</span>
                  </div>
                  <div className="flex gap-4">
                    <button className="text-[14px] font-bold text-[#5c4dff] hover:text-[#7b6dff] transition-colors">View Full Transcript</button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </ContainerScroll>
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
              { value: "12x", label: "Interview Rate", desc: "Higher placement rate for candidates using active AI twins compared to traditional PDFs." },
              { value: "24/7", label: "Availability", desc: "Your professional expertise stays engaged across every timezone while you focus on what matters." },
              { value: "100%", label: "Data Sovereignty", desc: "Full encryption and ownership. You control exactly what your twin knows and who it speaks to." },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div className="text-[64px] font-bold text-[var(--brand-purple)] mb-2 tracking-tighter">{stat.value}</div>
                <div className="text-[13px] font-bold text-[var(--text-muted)] uppercase tracking-[0.2em] mb-6">{stat.label}</div>
                <p className="text-[17px] text-[var(--text-muted)] leading-relaxed">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section with the Canvas Particle Component */}
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
                Our AI twin isn&apos;t just a chatbot&mdash;it&apos;s a high-fidelity synthesis
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
              className="relative flex justify-center items-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-full max-w-[450px]">
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