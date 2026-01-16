"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const ARTICLES = [
    {
        id: 1,
        category: "Style Guide",
        date: "Oct 12, 2026",
        title: "How to Style Oversized Windbreakers in 2026",
        snippet: "The 90s silhouette is back. Here are 5 ways to rock the baggy look without drowning in fabric.",
        bg: "bg-pastel-lavender",
        image: "https://images.unsplash.com/photo-1605763240004-741b7f72b529?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 2,
        category: "Care Tips",
        date: "Sep 28, 2026",
        title: "The Ultimate Guide to Washing Vintage Denim",
        snippet: "Stop ruining your thrift finds. Learn the gentle art of preserving 30-year-old cotton.",
        bg: "bg-pastel-peach",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1973&auto=format&fit=crop"
    },
    {
        id: 3,
        category: "Culture",
        date: "Sep 15, 2026",
        title: "The History of Harajuku Streetwear",
        snippet: "Exploring the roots of Japanese street fashion and its influence on modern thrift culture.",
        bg: "bg-pastel-sky",
        image: "https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?q=80&w=2069&auto=format&fit=crop"
    }
];

export function JournalSection() {
    return (
        <section id="journal" className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-gray-400 font-mono text-xs uppercase tracking-[0.3em] mb-4 block">
                        Read Our Thoughts
                    </span>
                    <h2 className="text-6xl md:text-8xl font-script text-gray-800">
                        The Journal
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {ARTICLES.map((article, index) => (
                        <motion.article
                            key={article.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group relative flex flex-col h-full"
                        >
                            {/* Card Top */}
                            <div className={`aspect-video rounded-3xl ${article.bg} bg-opacity-30 mb-8 overflow-hidden relative`}>
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />

                                <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    <ArrowUpRight className="w-5 h-5 text-gray-800" />
                                </button>
                            </div>

                            {/* Card Content */}
                            <div className="flex-1 flex flex-col">
                                <div className="flex items-center justify-between text-xs text-gray-400 uppercase tracking-wider mb-4 font-mono">
                                    <span>{article.category}</span>
                                    <span>{article.date}</span>
                                </div>
                                <h3 className="text-2xl font-serif text-gray-800 mb-4 group-hover:text-pastel-purple transition-colors duration-300">
                                    {article.title}
                                </h3>
                                <p className="text-gray-500 leading-relaxed text-sm mb-6 flex-1">
                                    {article.snippet}
                                </p>
                                <div className="pt-6 border-t border-gray-100">
                                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-pastel-purple group-hover:translate-x-2 transition-transform duration-300">
                                        Read Article
                                    </span>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
