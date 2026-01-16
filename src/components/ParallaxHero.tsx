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
            className="absolute text-pastel-purple will-change-transform"
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
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Wave Parallax transforms
    // Higher percentage = appears further away / moves slower relative to content
    const wave1Y = useTransform(scrollYProgress, [0, 1], ["0%", "150px"]);
    const wave2Y = useTransform(scrollYProgress, [0, 1], ["0%", "100px"]);
    const wave3Y = useTransform(scrollYProgress, [0, 1], ["0%", "50px"]);

    // Fix hydration mismatch by generating stars only on client
    const [stars, setStars] = useState<{ id: number; x: string; y: string; size: number; delay: number }[]>([]);

    useEffect(() => {
        const starCount = window.innerWidth < 768 ? 12 : 30; // Reduce stars on mobile
        const generatedStars = Array.from({ length: starCount }, (_, i) => ({
            id: i,
            x: `${5 + Math.random() * 90}%`,
            y: `${5 + Math.random() * 85}%`,
            size: 8 + Math.random() * 16,
            delay: Math.random() * 3,
        }));
        setStars(generatedStars);
    }, []);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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
                className="relative z-20 h-screen flex flex-col items-center justify-center md:justify-start md:pt-[15vh] text-center px-4"
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
                            // Optimized shadow using state to avoid hydration mismatch
                            textShadow: isMobile
                                ? "0 0 20px rgba(255,255,255,0.3)"
                                : "0 0 40px rgba(255,255,255,0.4), 0 0 80px rgba(155, 126, 189, 0.2)"
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
            <div className="absolute bottom-0 left-0 right-0 z-10 w-full h-[200px] md:h-[320px] lg:h-[420px] pointer-events-none select-none">
                {/* Layer 2 (Middle) */}
                <motion.div
                    className="absolute inset-x-0 bottom-0 h-[85%]"
                    style={{ y: wave2Y }}
                >
                    <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="#af99cf" />
                    </svg>
                </motion.div>

                {/* Layer 3 (Lower Middle) */}
                <motion.div
                    className="absolute inset-x-0 bottom-0 h-[70%]"
                    style={{ y: wave3Y }}
                >
                    <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path d="M0,256L48,250.7C96,245,192,235,288,218.7C384,203,480,181,576,186.7C672,192,768,224,864,240C960,256,1056,256,1152,245.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="#a58bc6" />
                    </svg>
                </motion.div>

                {/* Layer 4 (Front/Darkest) - No parallax to blend directly with next section */}
                <div
                    className="absolute inset-x-0 bottom-0 h-[45%]"
                >
                    <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path d="M0,224L40,218.7C80,213,160,203,240,208C320,213,400,235,480,240C560,245,640,235,720,213.3C800,192,880,160,960,160C1040,160,1120,192,1200,208C1280,224,1360,224,1400,224L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z" fill="#9b7ebd" />
                    </svg>
                </div>
            </div>
        </section>
    );
}
