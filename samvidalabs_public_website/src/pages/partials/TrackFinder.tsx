import React from "react";
import { site } from "../../lib/site";
import { cn } from "../../lib/utils";
import { CheckCircle2, Sparkles, Flame, Trophy, Gauge } from "lucide-react";

type Persona = "Beginner / Non-tech" | "Business / Self-employed" | "Tech / IT";
type Goal = "Career upgrade" | "Business growth" | "Productivity";
type Mode = "Hybrid (Auto)" | "Online only" | "Offline preferred";

function recommendation(persona: Persona, goal: Goal, budget: number, mode: Mode) {
  let track = site.tracks[0].name;
  if (persona === "Business / Self-employed") track = "Business AI";
  if (persona === "Tech / IT") track = "Tech & Data AI";

  let start = "₹5,000 (AI Starter)";
  if (budget >= 10000) start = "₹10,000 (AI Productivity Pro)";
  if (budget >= 15000) start = "₹15,000 (Specialization Cohort 1)";
  if (budget >= 25000) start = "₹25,000 (Project Builder)";
  if (budget >= 35000) start = "₹35,000 (Flagship Premium Cohort)";

  const note =
    goal === "Productivity"
      ? "Start with a track-fit cohort, then build portfolio outcomes with reviews and interview-ready projects."
      : goal === "Business growth"
      ? "Start with content + lead systems, then layer follow-up automation and sales workflows."
      : "Build a portfolio with mentor-reviewed outputs first, then sharpen interview and role-readiness.";

  const fit = budget >= 35000 ? 82 : budget >= 25000 ? 85 : budget >= 15000 ? 88 : budget >= 10000 ? 87 : 79;
  const badge = goal === "Productivity" ? "Portfolio Builder" : goal === "Business growth" ? "Growth Operator" : "Project Finisher";

  return { track, start, note, fit, badge, mode };
}

export default function TrackFinder() {
  const [persona, setPersona] = React.useState<Persona>("Beginner / Non-tech");
  const [goal, setGoal] = React.useState<Goal>("Productivity");
  const [budget, setBudget] = React.useState(35000);
  const [mode, setMode] = React.useState<Mode>("Offline preferred");
  const [xp, setXp] = React.useState(0);

  const rec = recommendation(persona, goal, budget, mode);

  const pill =
    "rounded-full px-4 py-2.5 text-sm border border-slate-200 bg-white/85 text-slate-700 hover:bg-white hover:border-slate-300 transition shadow-sm";

  return (
    <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
      <div className="glass-pearl rounded-[34px] p-6 ring-soft">
        <div className="max-w-xl">
          <div className="text-sm font-semibold text-slate-950 flex items-center gap-2">
            <Sparkles size={18} className="text-cyan-600" />
            Track Finder
          </div>
          <div className="mt-2 text-sm leading-7 text-slate-600">
            Find your best starting track, budget band, and challenge path. Every toggle updates the recommendation instantly so the experience feels alive, not read-only.
          </div>
        </div>

        <div className="mt-5 inline-flex items-center gap-6 rounded-[24px] border border-white/70 bg-white/80 px-4 py-3 shadow-sm">
          <div>
            <div className="text-sm text-slate-500">Your streak</div>
            <div className="mt-1 flex items-center gap-2 text-3xl font-semibold text-slate-950"><Flame className="h-5 w-5 text-orange-500" /> 0 days</div>
          </div>
          <div>
            <div className="text-sm text-slate-500">XP</div>
            <div className="mt-1 text-3xl font-semibold text-slate-950">{xp}/250</div>
          </div>
        </div>

        <div className="mt-8 grid gap-7">
          <div>
            <div className="text-xs tracking-[0.22em] uppercase text-slate-500">Background</div>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {(["Beginner / Non-tech", "Business / Self-employed", "Tech / IT"] as Persona[]).map((p) => (
                <button key={p} className={cn(pill, persona === p && "border-cyan-300 bg-cyan-50 text-slate-950 shadow-[0_10px_30px_rgba(34,211,238,0.12)]")} onClick={() => setPersona(p)}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs tracking-[0.22em] uppercase text-slate-500">Primary goal</div>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {(["Career upgrade", "Business growth", "Productivity"] as Goal[]).map((g) => (
                <button key={g} className={cn(pill, goal === g && "border-violet-300 bg-violet-50 text-slate-950 shadow-[0_10px_30px_rgba(167,139,250,0.12)]")} onClick={() => setGoal(g)}>
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs tracking-[0.22em] uppercase text-slate-500">Preferred track mode</div>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {(["Hybrid (Auto)", "Online only", "Offline preferred"] as Mode[]).map((m) => (
                <button key={m} className={cn(pill, mode === m && "border-emerald-300 bg-emerald-50 text-slate-950 shadow-[0_10px_30px_rgba(52,211,153,0.12)]")} onClick={() => setMode(m)}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs tracking-[0.22em] uppercase text-slate-500">Budget (₹)</div>
                <div className="mt-2 text-5xl font-semibold tracking-[-0.04em] text-slate-950">₹{budget.toLocaleString("en-IN")}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right shadow-sm">
                <div className="text-xs tracking-[0.18em] uppercase text-slate-500">Nearest tier</div>
                <div className="mt-1 text-sm font-semibold text-slate-900">{rec.start.replace(/^[^ ]+ /, "")}</div>
              </div>
            </div>
            <input
              type="range"
              min={5000}
              max={35000}
              step={5000}
              value={budget}
              onChange={(e) => setBudget(parseInt(e.target.value, 10))}
              className="mt-5 w-full accent-cyan-500"
            />
            <div className="mt-3 flex justify-between text-xs font-medium text-slate-500">
              {[5000,10000,15000,20000,25000,30000,35000].map((v) => <span key={v}>₹{v/1000}k</span>)}
            </div>
          </div>
        </div>
      </div>

      <div className="glass rounded-[34px] p-6 ring-soft">
        <div className="rounded-[28px] border border-white/10 bg-white/6 p-5">
          <div className="text-xs tracking-[0.22em] uppercase text-cyan-300">Recommendation</div>
          <div className="mt-3 text-5xl font-semibold tracking-[-0.04em] text-white">{rec.track}</div>
          <p className="mt-3 max-w-xl text-slate-300 leading-7">{rec.note}</p>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[28px] border border-white/10 bg-white/6 p-5 interactive-card">
            <div className="text-sm text-slate-400">Suggested plan</div>
            <div className="mt-2 text-2xl font-semibold leading-tight text-white">{rec.start}</div>
            <div className="mt-2 text-sm text-slate-300">{rec.mode.toLowerCase()}</div>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/6 p-5 interactive-card">
            <div className="flex items-center gap-2 text-sm text-slate-400"><Gauge className="h-4 w-4 text-cyan-300" /> Fit score</div>
            <div className="mt-2 text-2xl font-semibold text-white">{rec.fit}%</div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300" style={{ width: `${rec.fit}%` }} />
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-[30px] border border-white/10 bg-white/6 p-5">
          <div className="text-sm font-semibold text-white flex items-center gap-2"><Trophy className="h-4 w-4 text-violet-300" /> Your current milestone badge</div>
          <div className="mt-4 inline-flex rounded-full bg-emerald-400/15 px-4 py-2 text-sm font-medium text-emerald-200">{rec.badge}</div>
          <div className="mt-4 text-slate-300 leading-7">Ship one AI workflow that saves you 30 minutes daily, then submit it for review to unlock your next XP milestone.</div>
          <button
            type="button"
            onClick={() => setXp((v) => Math.min(250, v + 20))}
            className="mt-5 inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100"
          >
            Unlock my plan + earn XP
          </button>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
          <div className="font-medium text-white flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-300" /> Consistency tip</div>
          <div className="mt-2">Use 3 focused sessions each week and submit one small output for review.</div>
        </div>
      </div>
    </div>
  );
}
