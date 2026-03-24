import React from "react";
import Container from "../../components/Container";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

const proof = [
  { label: "Designed for", value: "Beginners → Tech pros", detail: "Switch personas to see the site actively reshape recommendations around your background." },
  { label: "Batch format", value: "Online + offline hybrid", detail: "Hybrid is now part of the premium story, with flexible schedules and in-person credibility." },
  { label: "Guided support", value: "Advisor-led recommendations", detail: "Visitors can move from curiosity to guidance, counselling, and registration without feeling lost." },
  { label: "Momentum", value: "XP streaks + unlocks", detail: "Gamification nudges learners to interact, finish, and return instead of passively reading." },
];

export default function ProofStrip() {
  const [active, setActive] = React.useState(0);

  return (
    <section className="section-divider py-6">
      <Container>
        <div className="grid gap-4 lg:grid-cols-[1.4fr_0.9fr] lg:items-stretch">
          <div className="grid gap-3 md:grid-cols-4">
            {proof.map((item, idx) => (
              <button key={item.label} onMouseEnter={() => setActive(idx)} onFocus={() => setActive(idx)} onClick={() => setActive(idx)} className={cn("chip rounded-2xl px-4 py-4 text-left transition card-3d", active === idx ? "border-cyan-400/40 bg-white text-slate-950" : "text-slate-700") }>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.label}</div>
                <div className="mt-2 text-sm font-semibold text-slate-950">{item.value}</div>
              </button>
            ))}
          </div>
          <div className="card rounded-2xl p-5 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-cyan-700/80">Live interaction prompt</div>
              <div className="mt-2 text-lg font-semibold text-slate-950">{proof[active].value}</div>
              <div className="mt-2 text-sm text-slate-600">{proof[active].detail}</div>
            </div>
            <div className="shrink-0 rounded-full bg-slate-950 p-3 text-white"><ArrowRight size={18} /></div>
          </div>
        </div>
      </Container>
    </section>
  );
}
