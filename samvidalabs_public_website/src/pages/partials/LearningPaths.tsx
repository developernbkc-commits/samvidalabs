import React from "react";
import { Compass, Rocket, Wand2 } from "lucide-react";
import { cn } from "../../lib/utils";

const paths = [
  {
    id: "everyday",
    title: "Everyday AI",
    icon: Compass,
    who: "Beginners, students, homemakers",
    milestones: ["Confidence with prompting", "Weekly productivity stack", "First mini project", "Portfolio starter"],
    outcome: "Best entry path when the goal is clarity, consistency, and early confidence.",
    vibe: "Fast confidence + visible early wins",
  },
  {
    id: "business",
    title: "Business AI",
    icon: Wand2,
    who: "Founders, freelancers, marketing teams",
    milestones: ["Content system", "Customer follow-up setup", "Automation workflow", "Case study asset"],
    outcome: "Best path when the goal is faster content, smoother customer follow-up, and repeatable systems.",
    vibe: "Practical systems + repeatable workflows",
  },
  {
    id: "tech",
    title: "Tech & Data AI",
    icon: Rocket,
    who: "Developers, analysts, IT professionals",
    milestones: ["AI dev workflows", "Data foundations", "Project review", "Interview-ready portfolio"],
    outcome: "Best path when the goal is projects, confidence, and a sharper technical profile.",
    vibe: "Portfolio momentum + stronger interviews",
  },
];

export default function LearningPaths() {
  const [active, setActive] = React.useState(paths[0]);
  const [revealed, setRevealed] = React.useState(1);

  React.useEffect(() => setRevealed(1), [active.id]);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="grid gap-4">
        {paths.map((path) => (
          <button key={path.id} onClick={() => setActive(path)} className={cn("card card-3d rounded-3xl p-5 text-left border", active.id === path.id && "border-cyan-300/40 accent-ring bg-white") }>
            <div className="flex items-center gap-3">
              <path.icon className="text-cyan-700" size={18} />
              <div className="font-semibold text-slate-950">{path.title}</div>
            </div>
            <div className="mt-2 text-sm text-slate-600">{path.who}</div>
            <div className="mt-3 text-xs uppercase tracking-[0.22em] text-slate-500">{path.vibe}</div>
          </button>
        ))}
      </div>

      <div className="card rounded-[28px] p-6 sm:p-7">
        <div className="text-xs uppercase tracking-[0.22em] text-cyan-700/80">Interactive path preview</div>
        <div className="mt-2 text-2xl font-semibold text-slate-950">{active.title}</div>
        <div className="mt-2 text-slate-600 max-w-2xl">{active.outcome}</div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="rounded-full bg-slate-950 px-4 py-2 text-sm text-white" onClick={() => setRevealed((r) => Math.min(active.milestones.length, r + 1))}>Unlock next milestone</button>
          <span className="rounded-full chip px-4 py-2 text-sm text-slate-700">{revealed}/{active.milestones.length} milestones revealed</span>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {active.milestones.slice(0, revealed).map((step, idx) => (
            <div key={step} className="rounded-3xl border border-slate-200 bg-white/75 p-4">
              <div className="text-xs text-slate-500">Milestone {idx + 1}</div>
              <div className="mt-2 text-slate-950 font-semibold">{step}</div>
              <div className="mt-3 h-2 rounded-full bg-slate-200"><div className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400" style={{ width: `${(idx + 1) * 24}%` }} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
