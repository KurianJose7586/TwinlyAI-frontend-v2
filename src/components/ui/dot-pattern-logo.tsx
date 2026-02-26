"use client";

import { useState, useEffect, useMemo } from "react";

// Dense Butterfly Pattern
const BASE_PATTERN = [
    "   ###        ###   ",
    "  #####      #####  ",
    " #######    ####### ",
    "#########  #########",
    " ########  ######## ",
    "  ######    ######  ",
    "   ####      ####   ",
    "    ##        ##    ",
    "    ##        ##    ",
    "   ####      ####   ",
    "  ######    ######  ",
    " ########  ######## ",
    "  ######    ######  ",
    "   ####      ####   ",
    "    ##        ##    ",
];

interface DotData {
    id: number;
    randomX: number;
    randomY: number;
    targetX: number;
    targetY: number;
    color: string;
    scatterDelay: number;
}

export function DotPatternLogo() {
    const [isHovered, setIsHovered] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Generate around ~500 dots (4 for every '#' in the ASCII map)
    const dots = useMemo(() => {
        const newDots: DotData[] = [];
        const colors = ["bg-indigo-500", "bg-purple-500", "bg-blue-500", "bg-indigo-400"];

        const rows = BASE_PATTERN.length;
        const cols = BASE_PATTERN[0].length;

        let idCounter = 0;

        for (let ri = 0; ri < rows; ri++) {
            for (let ci = 0; ci < cols; ci++) {
                if (BASE_PATTERN[ri][ci] === "#") {
                    // 2x2 sub-grid for each pixel to create density
                    for (let dx = 0; dx < 2; dx++) {
                        for (let dy = 0; dy < 2; dy++) {

                            // Target coordinates (Logo Mode)
                            // Fit it cleanly into the center (35% to 65% area, or tweak as needed)
                            const xPercent = 30 + ((ci + dx * 0.5) / cols) * 40;
                            const yPercent = 25 + ((ri + dy * 0.5) / rows) * 40;

                            // Random Scatter coordinates (Background Mode)
                            // We'll keep them fully random anywhere from 0% to 100%
                            const rx = Math.random() * 100;
                            const ry = Math.random() * 100;

                            newDots.push({
                                id: idCounter++,
                                randomX: rx,
                                randomY: ry,
                                targetX: xPercent,
                                targetY: yPercent,
                                color: colors[Math.floor(Math.random() * colors.length)],
                                // Keep the scatter unpredictable so it looks like an explosion outwards
                                scatterDelay: Math.random() * 400
                            });
                        }
                    }
                }
            }
        }
        return newDots;
    }, []);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div
            className="relative w-full h-full bg-[var(--bg-card)] rounded-[32px] overflow-hidden cursor-pointer flex items-center justify-center p-8 group border border-[var(--border-color)] shadow-2xl shadow-indigo-500/5 transition-colors duration-700 hover:border-indigo-500/30"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="absolute inset-0 z-0">
                {dots.map((dot) => {
                    // When hovered, all dots assemble perfectly.
                    // When not, they scatter out.
                    const x = isHovered ? dot.targetX : dot.randomX;
                    const y = isHovered ? dot.targetY : dot.randomY;

                    const scale = isHovered ? 1 : 0.4 + Math.random() * 0.6;
                    const opacity = isHovered ? 1 : 0.2 + Math.random() * 0.4;

                    return (
                        <div
                            key={dot.id}
                            className={`absolute w-1.5 h-1.5 rounded-full ${dot.color} dark:opacity-80`}
                            style={{
                                left: `${x}%`,
                                top: `${y}%`,
                                transform: `scale(${scale})`,
                                opacity: opacity,
                                // Lightning fast hardware accelerated transitions
                                transition: "left 0.8s, top 0.8s, transform 0.8s, opacity 0.8s",
                                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                                // When assembling, they all fly in precisely at once.
                                // When scattering, they explode outwards with slight randomness.
                                transitionDelay: isHovered ? "0ms" : `${dot.scatterDelay}ms`
                            }}
                        />
                    );
                })}
            </div>

            <div className="relative z-10 flex flex-col items-center mt-48 pointer-events-none transition-all duration-700">
                <span
                    className={`text-[14px] font-bold text-[var(--text-main)] uppercase tracking-[0.3em] bg-[var(--bg-main)]/80 backdrop-blur-md px-6 py-2 rounded-full border border-[var(--border-color)] transition-all duration-700 shadow-xl ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                    Knowledge Neural Engine
                </span>
            </div>
        </div>
    );
}
