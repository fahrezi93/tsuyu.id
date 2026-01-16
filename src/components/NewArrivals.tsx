"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Heart } from "lucide-react";

// Mock data for immediate visual result
const ARRIVALS = [
    {
        id: 1,
        name: "'90s Nike Windbreaker",
        price: "IDR 450.000",
        tag: "Vintage",
        image: "https://images.unsplash.com/photo-1559551409-dadc959f76b8?q=80&w=2070&auto=format&fit=crop",
        color: "bg-pastel-sky/20"
    },
    {
        id: 2,
        name: "Carhartt Double Knee",
        price: "IDR 850.000",
        tag: "Workwear",
        image: "https://images.unsplash.com/photo-1584370848010-d7cc31f92e97?q=80&w=2070&auto=format&fit=crop",
        color: "bg-pastel-cream/50"
    },
    {
        id: 3,
        name: "Stussy World Tour Tee",
        price: "IDR 350.000",
        tag: "Streetwear",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop",
        color: "bg-pastel-mint/20"
    },
    {
        id: 4,
        name: "Ralph Lauren Cap",
        price: "IDR 250.000",
        tag: "Accessories",
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1935&auto=format&fit=crop",
        color: "bg-pastel-pink/20"
    }
];

export function NewArrivals() {
    return (
        <section id="new-arrivals" className="py-32 bg-white relative overflow-hidden">
            {/* Background blob decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pastel-purple/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pastel-sky/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
                    <div className="max-w-xl">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-7xl font-script text-gray-800 mb-4"
                        >
                            Fresh Drops
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-500 font-sans leading-relaxed"
                        >
                            Updated weekly. Curated with love. Grab them before they're gone to a new home.
                        </motion.p>
                    </div>

                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="group flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 hover:border-pastel-purple hover:bg-pastel-purple/5 transition-all duration-300"
                    >
                        <span className="uppercase tracking-widest text-xs font-semibold text-gray-600 group-hover:text-pastel-purple">View All Items</span>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-pastel-purple group-hover:translate-x-1 transition-all" />
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {ARRIVALS.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="group cursor-pointer"
                        >
                            {/* Card Image Area */}
                            <div className={`relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 ${item.color} transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2`}>
                                {/* Placeholder for actual image - using a colored div for now if image missing */}
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Tag */}
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-gray-600">
                                        {item.tag}
                                    </span>
                                </div>
                                {/* Like Button */}
                                <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-gray-400 hover:text-red-400 transition-colors">
                                    <Heart className="w-4 h-4" />
                                </button>

                                {/* Quick Add */}
                                <div className="absolute inset-x-4 bottom-4 translate-y-[150%] group-hover:translate-y-0 transition-transform duration-300">
                                    <button className="w-full py-3 bg-white/90 backdrop-blur text-gray-800 font-medium text-sm rounded-xl hover:bg-pastel-purple hover:text-white transition-colors">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>

                            {/* Card Info */}
                            <div className="space-y-1">
                                <h3 className="font-serif text-xl text-gray-800 group-hover:text-pastel-purple transition-colors">
                                    {item.name}
                                </h3>
                                <p className="font-mono text-sm text-gray-500">
                                    {item.price}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
