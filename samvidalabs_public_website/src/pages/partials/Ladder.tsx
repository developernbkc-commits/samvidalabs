import { motion } from "framer-motion";
import { site } from "../../lib/site";

export default function Ladder() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {site.ladder.map((s, idx) => (
        <motion.div
          key={s.title}
          className="glass rounded-3xl p-6 ring-soft"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35, delay: idx * 0.04 }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs tracking-[0.22em] uppercase text-slate-400">{s.duration}</div>
              <div className="mt-2 text-xl font-semibold text-white">{s.title}</div>
              <div className="mt-2 text-sm text-slate-400">{s.highlight}</div>
            </div>
            <div className="shrink-0 rounded-2xl px-4 py-3 bg-gradient-to-r from-cyan-300/15 via-violet-300/10 to-emerald-300/15 border border-slate-700/60">
              <div className="text-sm font-semibold text-white">{s.price}</div>
              <div className="text-xs text-slate-400 mt-1">Starting</div>
            </div>
          </div>

          <div className="mt-5 grid gap-2 text-sm text-slate-200">
            {s.includes.map((i) => (
              <div key={i}>• {i}</div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
