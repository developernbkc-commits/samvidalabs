import { motion } from "framer-motion";

export default function GlowBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-28 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(34,211,238,0.35), transparent 55%), radial-gradient(circle at 70% 60%, rgba(167,139,250,0.30), transparent 55%), radial-gradient(circle at 40% 80%, rgba(16,185,129,0.22), transparent 55%)",
        }}
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: "radial-gradient(rgba(148,163,184,0.35) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(circle at 50% 20%, black 35%, transparent 70%)",
        }}
      />
    </div>
  );
}
