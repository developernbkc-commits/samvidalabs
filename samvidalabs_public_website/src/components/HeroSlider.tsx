import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "../lib/site";
import { imgUrl } from "../lib/images";
import Button from "./Button";
import { PLACEHOLDER_IMG } from "../lib/placeholders";

type Slide = { file: string; headline: string; sub: string; fit?: "cover" | "contain" };

export default function HeroSlider() {
  const slides = (site as any).heroSlides as Slide[] | undefined;
  const items = slides?.length
    ? slides
    : [
        { file: "", headline: "Mentor-led AI cohorts", sub: "Hands-on learning with reviews and accountability." },
        { file: "", headline: "Online + Offline hybrid", sub: "Weekend & weekday batches across key cities." },
        { file: "", headline: "Next batch starts 2 March 2026", sub: "WhatsApp “AI” to reserve your seat.", fit: "contain" },
      ];

  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    if (!items.length) return;
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 5200);
    return () => clearInterval(t);
  }, [items.length]);

  const cur = items[i];

  return (
    <div className="card card-3d rounded-3xl border border-slate-200/80 shadow-[0_26px_80px_rgba(15,23,42,0.14)] overflow-hidden">
      {/* Image */}
      <div className="relative bg-white p-4 pt-6">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
          <AnimatePresence mode="wait">
            <motion.img
              key={cur.file || String(i)}
              src={cur.file ? imgUrl(cur.file) : PLACEHOLDER_IMG}
              alt=""
              className="h-full w-full"
              style={{ objectFit: cur.fit || (i === 2 ? "contain" : "cover"), objectPosition: "center" }}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMG;
              }}
            />
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/6 via-transparent to-white/10" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/35 to-transparent" />
        </div>

        {/* Dots */}
        <div className="absolute top-5 right-6 flex gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-2.5 w-2.5 rounded-full border ${
                idx === i ? "bg-slate-950 border-slate-950" : "bg-white/90 border-slate-300"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Content below image */}
      <div className="relative bg-white/78 backdrop-blur border-t border-slate-200/70 px-6 py-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-xs text-slate-700"><span className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400" />CohortAI Labs</div>
        <div className="mt-1 text-xl sm:text-2xl font-semibold text-slate-950">{cur.headline}</div>
        <div className="mt-2 text-sm text-slate-800 leading-relaxed">{cur.sub}</div>

        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <Button href={(site as any).ctas?.primaryHref || "/contact"}>
            {(site as any).ctas?.primaryLabel || "Get batch schedule"}
          </Button>
          <Button href={(site as any).ctas?.demoHref || "/contact#lead"} variant="secondary">
            {(site as any).ctas?.demoLabel || "Book a free demo"}
          </Button>
        </div>
      </div>
    </div>
  );
}
