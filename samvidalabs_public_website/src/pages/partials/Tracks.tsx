import { motion } from "framer-motion";
import { site } from "../../lib/site";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Tracks() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {site.tracks.map((t, idx) => (
        <motion.div
          key={t.name}
          className="glass rounded-3xl p-6 ring-soft hover:neon-edge transition"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35, delay: idx * 0.05 }}
        >
          <div className="text-sm font-semibold text-white flex items-center justify-between">
            <span>{t.name}</span>
            <ArrowUpRight size={18} className="text-slate-400" />
          </div>
          <div className="mt-2 text-xs text-slate-400">{t.who}</div>
          <div className="mt-4 text-sm text-slate-300">{t.outcome}</div>
          <ul className="mt-5 grid gap-2 text-sm text-slate-200">
            {t.bullets.map((b) => (
              <li key={b}>• {b}</li>
            ))}
          </ul>

          <Link to="/contact" className="mt-6 inline-flex text-sm font-semibold text-cyan-200 hover:text-cyan-100 transition">
            Get a recommendation
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
