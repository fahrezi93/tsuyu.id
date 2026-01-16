"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { STORE_CONFIG } from "@/data/store-config";
import Image from "next/image";



// Animated floating star component
function AnimatedStar({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) {
    return (
        <motion.div
            className="absolute text-pastel-purple"
            style={{ left: x, top: y }}
            animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 180, 360],
            }}
            transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut",
            }}
        >
            <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
            </svg>
        </motion.div>
    );
}

export function ParallaxHero() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Parallax transforms for different layers - different speeds create depth
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Wave Parallax transforms
    // Higher percentage = appears further away / moves slower relative to content
    const wave1Y = useTransform(scrollYProgress, [0, 1], ["0%", "150px"]);
    const wave2Y = useTransform(scrollYProgress, [0, 1], ["0%", "100px"]);
    const wave3Y = useTransform(scrollYProgress, [0, 1], ["0%", "50px"]);

    // Fix hydration mismatch by generating stars only on client
    const [stars, setStars] = useState<{ id: number; x: string; y: string; size: number; delay: number }[]>([]);

    useEffect(() => {
        const generatedStars = Array.from({ length: 30 }, (_, i) => ({
            id: i,
            x: `${5 + Math.random() * 90}%`,
            y: `${5 + Math.random() * 85}%`,
            size: 8 + Math.random() * 16,
            delay: Math.random() * 3,
        }));
        setStars(generatedStars);
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-screen min-h-screen overflow-hidden"
        >
            {/* Background Layer - Gradient + Image, moves slowest */}
            <motion.div
                className="absolute inset-0 z-0 bg-[#e8dff5]"
                style={{ y: bgY, scale: bgScale }}
            >
                <Image
                    src="/parallax/hero-bg-dreamy.png"
                    alt="Background"
                    fill
                    className="object-cover opacity-90"
                    priority
                />
                {/* Enhanced Gradient overlays for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pastel-purple/10 to-pastel-purple/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-pastel-purple/60 via-transparent to-transparent opacity-80" />
            </motion.div>

            {/* Animated Stars Layer */}
            <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
                {stars.map((star) => (
                    <AnimatedStar
                        key={star.id}
                        x={star.x}
                        y={star.y}
                        size={star.size}
                        delay={star.delay}
                    />
                ))}
            </div>

            {/* Main Content - Moves at medium speed */}
            <motion.div
                className="relative z-20 h-screen flex flex-col items-center justify-start pt-[25vh] text-center px-4"
                style={{ y: textY, opacity }}
            >
                {/* Brand Name */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                    className="relative mb-4 p-4"
                >
                    <h1
                        className="text-[6rem] md:text-[12rem] font-script text-white leading-normal select-none"
                        style={{
                            fontFamily: "'Sacramento', cursive",
                            textShadow: "0 0 40px rgba(255,255,255,0.4), 0 0 80px rgba(155, 126, 189, 0.2)"
                        }}
                    >
                        {STORE_CONFIG.name}
                    </h1>
                </motion.div>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-base md:text-lg text-white/90 font-sans tracking-wide max-w-lg mx-auto mb-10 leading-relaxed mix-blend-overlay"
                >
                    {STORE_CONFIG.description}
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <motion.a
                        href="#catalog"
                        className="group relative inline-flex items-center gap-3 px-8 py-3 overflow-hidden rounded-full bg-white/20 backdrop-blur-sm border border-white/20 shadow-[0_4px_16px_0_rgba(31,38,135,0.15)] transition-all duration-300 hover:bg-white/30 hover:scale-105 hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.2)]"
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="relative z-10 text-white font-medium tracking-[0.2em] text-xs uppercase">Shop Collection</span>
                        <ArrowDown className="relative z-10 w-3 h-3 text-white group-hover:translate-y-0.5 transition-transform" />

                        {/* Shine effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-shine bg-gradient-to-r from-transparent via-white/40 to-transparent z-0" />
                    </motion.a>
                </motion.div>
            </motion.div>
            {/* Parallax Waves Layers - Reduced to 4 layers */}
            <div className="absolute bottom-0 left-0 right-0 z-10 w-full h-[320px] md:h-[500px] lg:h-[700px] pointer-events-none select-none">
                {/* Layer 2 (Middle) */}
                <motion.div
                    className="absolute inset-x-0 bottom-0 h-[78%]"
                    style={{ y: wave2Y }}
                >
                    <svg className="w-full h-full" viewBox="0 0 900 600" preserveAspectRatio="none">
                        <path d="M0 439L13.7 440.7C27.3 442.3 54.7 445.7 82 453.3C109.3 461 136.7 473 163.8 472.8C191 472.7 218 460.3 245.2 456.8C272.3 453.3 299.7 458.7 327 462.5C354.3 466.3 381.7 468.7 409 467.8C436.3 467 463.7 463 491 461C518.3 459 545.7 459 573 459.7C600.3 460.3 627.7 461.7 654.8 464.2C682 466.7 709 470.3 736.2 474.2C763.3 478 790.7 482 818 480.7C845.3 479.3 872.7 472.7 886.3 469.3L900 466L900 601L886.3 601C872.7 601 845.3 601 818 601C790.7 601 763.3 601 736.2 601C709 601 682 601 654.8 601C627.7 601 600.3 601 573 601C545.7 601 518.3 601 491 601C463.7 601 436.3 601 409 601C381.7 601 354.3 601 327 601C299.7 601 272.3 601 245.2 601C218 601 191 601 163.8 601C136.7 601 109.3 601 82 601C54.7 601 27.3 601 13.7 601L0 601Z" fill="#af99cf" />
                    </svg>
                </motion.div>

                {/* Layer 3 (Lower Middle) */}
                <motion.div
                    className="absolute inset-x-0 bottom-0 h-[62%]"
                    style={{ y: wave3Y }}
                >
                    <svg className="w-full h-full" viewBox="0 0 900 600" preserveAspectRatio="none">
                        <path d="M0 500L13.7 499.5C27.3 499 54.7 498 82 494.2C109.3 490.3 136.7 483.7 163.8 485.7C191 487.7 218 498.3 245.2 505.2C272.3 512 299.7 515 327 518.3C354.3 521.7 381.7 525.3 409 524.3C436.3 523.3 463.7 517.7 491 515C518.3 512.3 545.7 512.7 573 513C600.3 513.3 627.7 513.7 654.8 510C682 506.3 709 498.7 736.2 499.3C763.3 500 790.7 509 818 514.3C845.3 519.7 872.7 521.3 886.3 522.2L900 523L900 601L886.3 601C872.7 601 845.3 601 818 601C790.7 601 763.3 601 736.2 601C709 601 682 601 654.8 601C627.7 601 600.3 601 573 601C545.7 601 518.3 601 491 601C463.7 601 436.3 601 409 601C381.7 601 354.3 601 327 601C299.7 601 272.3 601 245.2 601C218 601 191 601 163.8 601C136.7 601 109.3 601 82 601C54.7 601 27.3 601 13.7 601L0 601Z" fill="#a58bc6" />
                    </svg>
                </motion.div>

                {/* Layer 4 (Front/Darkest) - No parallax to blend directly with next section */}
                <div
                    className="absolute inset-x-0 bottom-0 h-[45%]"
                >
                    <svg className="w-full h-full" viewBox="0 0 900 600" preserveAspectRatio="none">
                        <path d="M0 531L13.7 534.7C27.3 538.3 54.7 545.7 82 548.7C109.3 551.7 136.7 550.3 163.8 548.5C191 546.7 218 544.3 245.2 546C272.3 547.7 299.7 553.3 327 556.5C354.3 559.7 381.7 560.3 409 556.3C436.3 552.3 463.7 543.7 491 539.2C518.3 534.7 545.7 534.3 573 537.5C600.3 540.7 627.7 547.3 654.8 553.8C682 560.3 709 566.7 736.2 569.2C763.3 571.7 790.7 570.3 818 562.3C845.3 554.3 872.7 539.7 886.3 532.3L900 525L900 601L886.3 601C872.7 601 845.3 601 818 601C790.7 601 763.3 601 736.2 601C709 601 682 601 654.8 601C627.7 601 600.3 601 573 601C545.7 601 518.3 601 491 601C463.7 601 436.3 601 409 601C381.7 601 354.3 601 327 601C299.7 601 272.3 601 245.2 601C218 601 191 601 163.8 601C136.7 601 109.3 601 82 601C54.7 601 27.3 601 13.7 601L0 601Z" fill="#9b7ebd" />
                    </svg>
                </div>
            </div>
        </section>
    );
}
