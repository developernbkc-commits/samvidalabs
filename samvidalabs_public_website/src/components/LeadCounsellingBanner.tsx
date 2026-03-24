import Button from "./Button";
import { site } from "../lib/site";
import { BadgeCheck, Headphones, MessageCircle, ShieldCheck } from "lucide-react";

const bullets = [
  { icon: Headphones, text: "Friendly staff who understand beginner to professional needs" },
  { icon: BadgeCheck, text: "Track + budget fit guidance before enrollment" },
  { icon: ShieldCheck, text: "No-pressure counselling. Clear next steps." },
];

export default function LeadCounsellingBanner() {
  const leadMagnet = (site as any).leadMagnet || {
    title: "Free AI Readiness Checklist",
    subtitle: "Get guidance from our team.",
    ctaLabel: "Book Free Counselling",
    ctaHref: "/recommendation",
  };

  return (
    <div className="rounded-3xl section-shell p-5 sm:p-6">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-700">
            <MessageCircle size={14} className="text-emerald-600" />
            Free counselling
          </div>
          <h3 className="mt-3 text-xl sm:text-2xl font-semibold text-slate-950">
            {leadMagnet.title}
          </h3>
          <p className="mt-2 text-sm sm:text-base text-slate-700">
            {leadMagnet.subtitle}
          </p>

          <div className="mt-4 grid gap-2">
            {bullets.map((b) => (
              <div key={b.text} className="flex items-start gap-2 rounded-xl bg-white/70 border border-slate-200/70 p-3">
                <b.icon size={16} className="mt-0.5 text-cyan-700" />
                <p className="text-sm text-slate-800">{b.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card rounded-2xl p-5">
          <div className="text-sm font-semibold text-slate-950">Quick route to the right cohort</div>
          <p className="mt-2 text-sm text-slate-700">
            Tell us your background, budget, and goal. We’ll suggest the most suitable track and timings.
          </p>
          <div className="mt-4 grid gap-3">
            <Button href={leadMagnet.ctaHref || "/recommendation"} className="w-full">
              {leadMagnet.ctaLabel || "Book Free Counselling"}
            </Button>
            <Button
              href={`https://wa.me/91${site.whatsapp}?text=${encodeURIComponent("Hi CohortAI Labs, I need a friendly counselling call to choose the right AI course track and budget.")}`}
              variant="secondary"
              target="_blank"
              rel="noreferrer"
              className="w-full"
            >
              WhatsApp for guidance
            </Button>
          </div>
          <div className="mt-3 text-xs text-slate-600">
            We support online + offline learners across {site.cities.join(", ")}.
          </div>
        </div>
      </div>
    </div>
  );
}
