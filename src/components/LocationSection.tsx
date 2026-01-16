"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Navigation } from "lucide-react";
import { STORE_CONFIG } from "@/data/store-config";

export function LocationSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-script text-pastel-purple">
              Visit Store
            </h2>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-pastel-lavender/30 rounded-full">
                <MapPin className="w-6 h-6 text-pastel-purple" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold uppercase tracking-wider text-pastel-text">Store Location</h3>
                <p className="text-lg md:text-xl font-medium leading-relaxed max-w-md text-pastel-text-light">
                  {STORE_CONFIG.address}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-pastel-mint/30 rounded-full">
                <Clock className="w-6 h-6 text-pastel-purple" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold uppercase tracking-wider text-pastel-text">Opening Hours</h3>
                <p className="text-lg font-medium text-pastel-text-light">
                  Daily: 10:00 - 22:00
                </p>
              </div>
            </div>

            <motion.a
              href={`https://maps.google.com/?q=${encodeURIComponent(STORE_CONFIG.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-pastel-purple text-white px-6 py-3 rounded-full font-semibold hover:bg-pastel-purple-dark transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Navigation className="w-5 h-5" />
              Get Directions
            </motion.a>
          </motion.div>

          {/* Map Embed */}
          <motion.div
            className="aspect-square md:aspect-video bg-white border-2 border-pastel-lavender/50 p-3 rounded-3xl overflow-hidden shadow-xl shadow-pastel-purple/10"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <iframe
              src={STORE_CONFIG.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "saturate(0.8) hue-rotate(20deg)" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full block rounded-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
