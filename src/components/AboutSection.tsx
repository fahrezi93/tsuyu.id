"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function AboutSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

    return (
        <section id="about" className="py-32 bg-pastel-cream relative overflow-hidden" ref={containerRef}>
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Visual Side */}
                    <div className="relative">
                        {/* Decorative Layer - Back */}
                        <motion.div
                            style={{ y: y2, rotate }}
                            className="absolute top-0 right-0 w-3/4 h-full bg-pastel-lavender rounded-[3rem] -z-10 opacity-60"
                        />

                        {/* Main Image Frame (Placeholder) */}
                        <motion.div
                            style={{ y: y1 }}
                            className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden bg-gray-200 border-[8px] border-white shadow-2xl"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1974&auto=format&fit=crop"
                                alt="Vintage Store Interior"
                                fill
                                className="object-cover"
                            />
                        </motion.div>

                        {/* Floater Badge */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            className="absolute -bottom-10 -left-10 w-40 h-40 bg-white rounded-full flex items-center justify-center p-2 shadow-xl animate-spin-slow"
                        >
                            <div className="w-full h-full border border-dashed border-gray-300 rounded-full flex items-center justify-center">
                                <div className="text-center">
                                    <span className="block text-xs uppercase tracking-widest text-gray-400">Est.</span>
                                    <span className="block font-serif text-3xl text-pastel-purple">2023</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Content Side */}
                    <div className="lg:pl-10">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-pastel-purple font-mono text-sm tracking-widest uppercase mb-4 block">
                                Who We Are
                            </span>
                            <h2 className="text-5xl md:text-6xl font-script text-gray-800 mb-8 leading-tight">
                                More than just <br />
                                <span className="text-pastel-purple/80">vintage</span> clothing.
                            </h2>
                            <div className="space-y-6 text-gray-600 leading-relaxed font-sans text-lg">
                                <p>
                                    At Tsuyu.id, we believe that style shouldn't come at the cost of our planet. Every piece in our collection is hand-picked for its uniqueness, creating a bridge between the nostalgic past and the sustainable future.
                                </p>
                                <p>
                                    We scour the corners of the world to find gems from the 90s and Y2K era—giving high-quality garments a second life and helping you express a style that is truly one-of-a-kind.
                                </p>
                            </div>

                            <div className="mt-12 grid grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-serif text-2xl mb-2 text-pastel-purple">100%</h4>
                                    <p className="text-sm text-gray-500 uppercase tracking-wider">Authentic Vintage</p>
                                </div>
                                <div>
                                    <h4 className="font-serif text-2xl mb-2 text-pastel-purple">Zero</h4>
                                    <p className="text-sm text-gray-500 uppercase tracking-wider">Fast Fashion</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
