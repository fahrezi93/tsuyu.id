"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { STORE_CONFIG } from "@/data/store-config";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    useEffect(() => {
        const unsubscribe = scrollY.on("change", (latest) => {
            setIsScrolled(latest > 50);
        });
        return () => unsubscribe();
    }, [scrollY]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isMobileMenuOpen]);

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-4 bg-white/90 backdrop-blur-md shadow-sm" : "py-6 bg-transparent"
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className={`font-serif text-3xl drop-shadow-md select-none transition-colors duration-300 ${isScrolled || isMobileMenuOpen ? "text-gray-800" : "text-white"
                        }`}>
                        {STORE_CONFIG.name}
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {["Collections", "New Arrivals", "About", "Journal"].map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase().replace(' ', '-')}`}
                                className={`text-sm uppercase tracking-widest font-medium transition-colors relative group ${isScrolled ? "text-gray-600 hover:text-pastel-purple" : "text-white/80 hover:text-white"
                                    }`}
                            >
                                {item}
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isScrolled ? "bg-pastel-purple" : "bg-white"
                                    }`} />
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className={`flex items-center gap-4 transition-colors duration-300 ${isScrolled || isMobileMenuOpen ? "text-gray-800" : "text-white"
                        }`}>
                        <button className={`p-2 rounded-full transition-colors ${isScrolled ? "hover:bg-gray-100" : "hover:bg-white/10"
                            }`}>
                            <Search className="w-5 h-5" />
                        </button>
                        <button className={`p-2 rounded-full transition-colors relative ${isScrolled ? "hover:bg-gray-100" : "hover:bg-white/10"
                            }`}>
                            <ShoppingBag className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-pastel-pink rounded-full" />
                        </button>
                        <button
                            className={`md:hidden p-2 rounded-full transition-colors relative z-50 ${isScrolled || isMobileMenuOpen ? "hover:bg-gray-100" : "hover:bg-white/10"
                                }`}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-pastel-cream/95 backdrop-blur-xl md:hidden flex items-center justify-center"
                    >
                        <nav className="flex flex-col items-center gap-8 p-8">
                            {["Collections", "New Arrivals", "About", "Journal"].map((item, index) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + index * 0.1 }}
                                >
                                    <Link
                                        href={`#${item.toLowerCase().replace(' ', '-')}`}
                                        className="text-2xl font-serif text-gray-800 hover:text-pastel-purple transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item}
                                    </Link>
                                </motion.div>
                            ))}
                            <div className="w-12 h-0.5 bg-gray-200 my-4" />
                            <div className="flex flex-col items-center gap-4 text-sm text-gray-500 font-mono">
                                <Link href="#" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                                <Link href="#" onClick={() => setIsMobileMenuOpen(false)}>Help Center</Link>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
