"use client";

import { motion } from "framer-motion";
import { Instagram, Heart } from "lucide-react";
import { STORE_CONFIG } from "@/data/store-config";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-pastel-lavender/30 to-pastel-lavender/50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center md:text-left">
            <h4 className="text-4xl font-script text-pastel-purple mb-3">
              {STORE_CONFIG.name}
            </h4>
            <p className="text-sm text-pastel-text-light">
              Curated Secondhand & Vintage Streetwear
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4">
              <motion.a
                href={STORE_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/60 rounded-full text-pastel-purple hover:bg-pastel-purple hover:text-white transition-all duration-300 shadow-md"
                aria-label="Instagram"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram size={24} />
              </motion.a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 pt-8 border-t border-pastel-purple/20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-sm text-pastel-text-light flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-pastel-pink fill-pastel-pink" /> in Jakarta
          </p>
          <p className="text-xs text-pastel-text-light/60 mt-2">
            &copy; {currentYear} {STORE_CONFIG.name}. All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
