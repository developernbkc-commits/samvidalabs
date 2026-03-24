import type { ReactNode } from "react";
type Row = {
  track: string;
  bestFor: string;
  idealStart: string;
  duration: string;
  primaryOutcome: string;
  support: string;
};

const rows: Row[] = [
  {
    track: "Everyday AI",
    bestFor: "Students, homemakers, beginners",
    idealStart: "₹5k–₹15k",
    duration: "1–4 weeks",
    primaryOutcome: "Confidence + daily productivity systems",
    support: "Guided practice + templates",
  },
  {
    track: "Business AI",
    bestFor: "Creators, self-employed, marketing teams",
    idealStart: "₹10k–₹25k",
    duration: "2–6 weeks",
    primaryOutcome: "Content, lead follow-up, automation workflows",
    support: "Campaign workflows + reviews",
  },
  {
    track: "Tech & Data AI",
    bestFor: "IT professionals, devs, analysts",
    idealStart: "₹15k–₹35k",
    duration: "3–10 weeks",
    primaryOutcome: "Portfolio projects + interview readiness",
    support: "Project reviews + mentor feedback",
  },
];

export default function TrackComparisonTable() {
  return (
    <div className="rounded-3xl section-shell p-4 sm:p-5">
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80">
        <div className="hidden md:grid grid-cols-[1.1fr_1.2fr_0.8fr_0.8fr_1.4fr_1fr] text-xs uppercase tracking-[0.14em] text-slate-600 bg-slate-50/80 border-b border-slate-200/80">
          {["Track", "Best for", "Ideal budget", "Duration", "Primary outcome", "Support"].map((h) => (
            <div key={h} className="px-4 py-3">{h}</div>
          ))}
        </div>

        <div className="grid">
          {rows.map((row, idx) => (
            <div key={row.track} className={`md:grid md:grid-cols-[1.1fr_1.2fr_0.8fr_0.8fr_1.4fr_1fr] ${idx !== rows.length - 1 ? "border-b border-slate-200/70" : ""}`}>
              <div className="md:hidden px-4 pt-4 pb-2">
                <div className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-800">
                  {row.track}
                </div>
              </div>

              <Cell label="Track" desktopStrong>{row.track}</Cell>
              <Cell label="Best for">{row.bestFor}</Cell>
              <Cell label="Ideal budget">{row.idealStart}</Cell>
              <Cell label="Duration">{row.duration}</Cell>
              <Cell label="Primary outcome">{row.primaryOutcome}</Cell>
              <Cell label="Support">{row.support}</Cell>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-xs text-slate-600">
        Tip: Start with a lower tier, then level up after your first deliverable. This improves completion rate and learner confidence.
      </div>
    </div>
  );
}

function Cell({
  label,
  children,
  desktopStrong = false,
}: {
  label: string;
  children: ReactNode;
  desktopStrong?: boolean;
}) {
  return (
    <div className="px-4 pb-4 md:py-4">
      <div className="md:hidden text-[11px] uppercase tracking-[0.14em] text-slate-500">{label}</div>
      <div className={`text-sm ${desktopStrong ? "font-semibold text-slate-950" : "text-slate-800"}`}>{children}</div>
    </div>
  );
}
