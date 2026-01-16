import { ArrowDown } from "lucide-react";
import { STORE_CONFIG } from "@/data/store-config";

export function Hero() {
  return (
    <section className="relative h-screen min-h-[80vh] flex flex-col items-center justify-center bg-zinc-900 border-b border-zinc-800">
      {/* Texture/Overlay (Optional subtle grain or gradient) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-zinc-800/20 to-zinc-900 pointer-events-none" />

      <div className="relative z-10 text-center space-y-8 px-4">
        {/* Brand Name */}
        <h1 className="text-7xl md:text-9xl font-script text-sage-300 leading-none drop-shadow-[0_0_15px_rgba(214,230,204,0.3)]">
          {STORE_CONFIG.name}
        </h1>
        
        {/* Description/Tagline */}
        <p className="text-sage-100/80 text-lg md:text-xl font-light tracking-wide max-w-lg mx-auto">
          {STORE_CONFIG.description}
        </p>

        {/* CTA Button */}
        <div className="pt-8">
          <a
            href="#catalog"
            className="inline-flex items-center gap-2 bg-sage-300 text-zinc-950 px-8 py-4 text-lg font-bold uppercase tracking-wider hover:bg-sage-200 transition-colors duration-300 rounded-full"
          >
            Lihat Koleksi
            <ArrowDown size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
