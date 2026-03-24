import { ArrowRight, ClipboardList, MessageCircle, Rocket, Sparkles, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    step: "Step 1",
    title: "Discover the right track",
    desc: "Use the AI Advisor to match background, goal, budget, and learning mode to a realistic starting point.",
    href: "/#advisor",
    cta: "Open AI Advisor",
    icon: Sparkles,
  },
  {
    step: "Step 2",
    title: "Talk to a counsellor",
    desc: "Get clarity on batches, outcomes, timings, and the shortest path to visible deliverables.",
    href: "/contact",
    cta: "Book counselling",
    icon: MessageCircle,
  },
  {
    step: "Step 3",
    title: "Choose schedule and format",
    desc: "Select weekday or weekend and online, offline, or hybrid learning based on your lifestyle.",
    href: "/courses",
    cta: "Compare programs",
    icon: ClipboardList,
  },
  {
    step: "Step 4",
    title: "Enter cohort and build proof",
    desc: "Start mentor-led sessions, earn streaks, ship assignments, and graduate with real evidence of learning.",
    href: "/register",
    cta: "Reserve your seat",
    icon: Trophy,
  },
] as const;

export default function ConversionFunnel() {
  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-[11px] tracking-[0.32em] text-slate-600 uppercase">How to begin</div>
          <h3 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-slate-950">
            A clear path from first visit to getting started
          </h3>
          <p className="mt-2 text-slate-600 max-w-3xl leading-7">
            Each step is meant to reduce uncertainty, build confidence, and show the learner the most practical next move.
          </p>
        </div>
        <a
          href="/contact"
          className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 bg-slate-900"
        >
          <Rocket className="h-4 w-4 mr-2" />
          Request guidance
        </a>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.32, delay: idx * 0.05 }}
              className="h-full"
            >
              <div className="h-full rounded-2xl border border-slate-200/80 bg-white/92 p-5 shadow-sm interactive-card">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] tracking-[0.22em] text-slate-700 uppercase">
                    {step.step}
                  </span>
                  <div className="rounded-xl border border-cyan-100 bg-gradient-to-r from-cyan-50 to-violet-50 p-2 text-cyan-700">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <h4 className="mt-4 text-lg font-semibold text-slate-900 leading-tight">{step.title}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.desc}</p>
                <a href={step.href} className="mt-4 inline-flex items-center text-sm font-semibold text-slate-900 hover:text-cyan-700 transition">
                  {step.cta}
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
