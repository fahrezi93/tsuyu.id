"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { STORE_CONFIG } from "@/data/store-config";

export function FloatingCTA() {
  const message = encodeURIComponent("Halo Admin Tsuyu.id, mau tanya stok...");
  const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-white text-pastel-purple border-2 border-pastel-purple rounded-full shadow-lg shadow-pastel-purple/20 hover:shadow-xl hover:scale-110 transition-all duration-300"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg
        viewBox="0 0 24 24"
        width="28"
        height="28"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
        <path d="M9 10a0.5 .5 0 0 0 1 1a5 5 0 0 0 5 5a0.5 .5 0 0 0 1 -1" />
      </svg>
    </motion.a>
  );
}
