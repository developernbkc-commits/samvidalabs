import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { verifiedTestimonials } from "../../lib/verifiedTestimonials";

export default function Testimonials() {
  const [i, setI] = React.useState(0);
  const cur = verifiedTestimonials[i];

  return (
    <section className="py-6">
      <div className="glass rounded-[32px] p-6 sm:p-8 ring-soft">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="text-sm font-semibold text-white">Verified learner stories</div>
            <div className="mt-1 text-sm text-slate-300">
              Hear from working professionals and committed learners who completed focused programs and carried their progress into work, interviews, and real projects.
            </div>
          </div>
          <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-cyan-200">
            <Star size={14} className="fill-current" />
            Trusted feedback
          </div>
        </div>

        <motion.div
          key={cur.name}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="mt-6 grid gap-6 lg:grid-cols-[220px_1fr]"
        >
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/30 shadow-[0_18px_40px_rgba(2,6,23,0.28)]">
            <img src={cur.image} alt={cur.name} className="h-[280px] w-full object-cover object-top" loading="lazy" />
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.18)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-2xl font-semibold text-white">{cur.name}</div>
                <div className="mt-1 text-sm text-slate-300">{cur.role}</div>
              </div>
              <Quote className="text-cyan-200" size={20} />
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Stat label="Program / Course" value={cur.course} />
              <Stat label="Duration" value={cur.duration} />
              <Stat label="Certificate on" value={cur.date} />
            </div>

            <div className="mt-5 text-lg leading-relaxed text-white/95">“{cur.quote}”</div>
          </div>
        </motion.div>

        <div className="mt-6 flex items-center gap-2">
          <button
            className="rounded-xl border border-white/10 bg-slate-900/70 p-2 text-white hover:bg-slate-800/70"
            onClick={() => setI((v) => (v - 1 + verifiedTestimonials.length) % verifiedTestimonials.length)}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className="rounded-xl border border-white/10 bg-slate-900/70 p-2 text-white hover:bg-slate-800/70"
            onClick={() => setI((v) => (v + 1) % verifiedTestimonials.length)}
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
          <div className="ml-auto flex items-center gap-2">
            {verifiedTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setI(index)}
                className={`h-2.5 rounded-full transition-all ${index === i ? "w-8 bg-cyan-300" : "w-2.5 bg-white/30"}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-3">
      <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{label}</div>
      <div className="mt-1 text-sm font-medium text-white">{value}</div>
    </div>
  );
}
