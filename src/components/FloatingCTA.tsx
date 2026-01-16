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
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gradient-to-r from-pastel-purple to-pastel-purple-dark text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-pastel-purple/40 hover:shadow-xl hover:shadow-pastel-purple/50 transition-all duration-300"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle size={24} className="fill-current" />
      <span>Chat Admin</span>
    </motion.a>
  );
}
