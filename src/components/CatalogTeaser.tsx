"use client";

import { motion } from "framer-motion";
import { STORE_CONFIG } from "@/data/store-config";
import { ArrowUpRight } from "lucide-react";

const pastelAccents = [
  "bg-pastel-lavender",
  "bg-pastel-pink",
  "bg-pastel-mint",
  "bg-pastel-sky",
  "bg-pastel-peach",
];

export function CatalogTeaser() {
  return (
    <section id="catalog" className="relative bg-pastel-purple pb-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12">
        {/* Minimalist Header */}
        <motion.div
          className="flex flex-col md:flex-row items-baseline justify-between mb-16 border-b border-white/20 pb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-6xl md:text-8xl font-script text-white drop-shadow-sm">
            Collections
          </h2>
          <span className="text-white/80 font-mono text-sm tracking-widest uppercase mt-4 md:mt-0">
            — Explore {STORE_CONFIG.categories.length} Categories
          </span>
        </motion.div>

        {/* Minimalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STORE_CONFIG.categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2.5rem] p-8 h-80 flex flex-col justify-between transition-all duration-500 hover:bg-white hover:border-white/40 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] cursor-pointer overflow-hidden"
            >
              {/* Top Accent Dot */}
              <div className="flex justify-between items-start">
                <span className={`w-3 h-3 rounded-full ${pastelAccents[index % pastelAccents.length]} ring-4 ring-white/10 group-hover:ring-pastel-purple/10 transition-all duration-500`} />
                <span className="font-mono text-xs text-white/40 group-hover:text-pastel-text-light transition-colors duration-300">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-3xl font-serif text-white group-hover:text-pastel-purple transition-colors duration-300 mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-white/60 group-hover:text-pastel-text leading-relaxed opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  {category.description}
                </p>
              </div>

              {/* Action Icon */}
              <div className="absolute top-8 right-8 mix-blend-overlay">
                <ArrowUpRight className="w-6 h-6 text-white opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 group-hover:text-pastel-purple" />
              </div>

              {/* Hover Gradient Background (Subtle) */}
              <div className={`absolute inset-0 bg-gradient-to-br ${pastelAccents[index % pastelAccents.length]} opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
