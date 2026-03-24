import React from "react";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
import { site } from "../lib/site";
import { Helmet } from "react-helmet-async";
import { canonical, seoDefaults } from "../lib/seo";
import { useLocation } from "react-router-dom";
import {
  CheckCircle2,
  Copy,
  Sparkles,
  Trophy,
  Zap,
  Gift,
  Rocket,
  Download,
  Flame,
  Gauge,
  Star,
  Share2,
  MessageCircle,
} from "lucide-react";

type Q = { q: string; options: { label: string; score: number }[] };
type TrackName = "Everyday AI" | "Business AI" | "Tech & Data AI";
type BadgeResult = {
  name: "Explorer" | "Builder" | "Pro";
  desc: string;
  suggestedTrack: TrackName;
  milestone: "Starter" | "Workflow Builder" | "Project Finisher" | "AI Practitioner";
};

type GamifyState = {
  streak: number;
  lastActiveDate?: string;
  xp: number;
  actions: string[];
};

const LS_KEY = "cohortai_gamify_v416";

const questions: Q[] = [
  {
    q: "Which best describes you?",
    options: [
      { label: "Beginner / Non-tech", score: 10 },
      { label: "Business / Self-employed", score: 20 },
      { label: "Tech / IT professional", score: 30 },
    ],
  },
  {
    q: "Your primary goal?",
    options: [
      { label: "Career upgrade / job readiness", score: 30 },
      { label: "Business growth", score: 25 },
      { label: "Productivity & confidence", score: 20 },
    ],
  },
  {
    q: "How much time can you commit weekly?",
    options: [
      { label: "2–4 hours", score: 10 },
      { label: "5–7 hours", score: 20 },
      { label: "8+ hours", score: 30 },
    ],
  },
  {
    q: "What do you want at the end?",
    options: [
      { label: "Templates & workflows", score: 15 },
      { label: "Projects I can show", score: 25 },
      { label: "Portfolio + interview prep", score: 30 },
    ],
  },
  {
    q: "Preferred learning style?",
    options: [
      { label: "Step-by-step guidance", score: 15 },
      { label: "Hands-on labs + reviews", score: 25 },
      { label: "Intense cohort sprint", score: 30 },
    ],
  },
];

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function ydayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function readGamify(): GamifyState {
  if (typeof window === "undefined") return { streak: 0, xp: 0, actions: [] };
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return { streak: 0, xp: 0, actions: [] };
    const parsed = JSON.parse(raw);
    return {
      streak: Number(parsed?.streak || 0),
      lastActiveDate: parsed?.lastActiveDate,
      xp: Number(parsed?.xp || 0),
      actions: Array.isArray(parsed?.actions) ? parsed.actions.slice(-30) : [],
    };
  } catch {
    return { streak: 0, xp: 0, actions: [] };
  }
}
function writeGamify(next: GamifyState) {
  if (typeof window !== "undefined") window.localStorage.setItem(LS_KEY, JSON.stringify(next));
}
function addXpAndStreak(action: string, xpDelta: number) {
  const state = readGamify();
  const t = todayKey();
  let streak = state.streak || 0;
  if (state.lastActiveDate !== t) {
    streak = state.lastActiveDate === ydayKey() ? streak + 1 : 1;
  }
  const next: GamifyState = {
    ...state,
    streak,
    lastActiveDate: t,
    xp: Math.min(500, Math.max(0, (state.xp || 0) + xpDelta)),
    actions: [...(state.actions || []), `${t}:${action}`].slice(-30),
  };
  writeGamify(next);
  return next;
}

function badge(score: number): BadgeResult {
  if (score < 70) {
    return {
      name: "Explorer",
      desc: "Start with AI fundamentals and build confidence.",
      suggestedTrack: "Everyday AI",
      milestone: "Starter",
    };
  }
  if (score < 110) {
    return {
      name: "Builder",
      desc: "You’re ready for hands-on deliverables and reviews.",
      suggestedTrack: "Business AI",
      milestone: "Workflow Builder",
    };
  }
  return {
    name: "Pro",
    desc: "Aim for portfolio projects, interviews, and a capstone.",
    suggestedTrack: "Tech & Data AI",
    milestone: "Project Finisher",
  };
}

function levelProgress(score: number) {
  const clamped = Math.max(50, Math.min(150, score));
  const pct = Math.round(((clamped - 50) / 100) * 100);
  return Math.max(0, Math.min(100, pct));
}
function xpPct(xp: number) {
  return Math.max(0, Math.min(100, Math.round((Math.min(xp, 250) / 250) * 100)));
}
function challengeForTrack(track: TrackName) {
  if (track === "Everyday AI") {
    return [
      "Use AI to simplify one daily task (message/email/list) and save the output",
      "Try a beginner-friendly explanation prompt on one topic you fear",
      "Create one reusable prompt template for tomorrow",
    ] as const;
  }
  if (track === "Business AI") {
    return [
      "Draft a 7-day content calendar using AI",
      "Create a lead follow-up message sequence",
      "Document one automation workflow you want to build",
    ] as const;
  }
  return [
    "Build one mini dev/data use-case",
    "Document your approach and assumptions",
    "Prepare your output for mentor review",
  ] as const;
}
function unlocks(xp: number) {
  return [
    { xp: 20, title: "Explorer Unlocked", desc: "You’ve started your AI journey." },
    { xp: 60, title: "Consistency Badge", desc: "Daily engagement is building momentum." },
    { xp: 120, title: "Workflow Builder", desc: "You’re ready for guided projects." },
    { xp: 200, title: "Fast-Track Ready", desc: "Time to request a mentor recommendation." },
  ].filter((u) => xp >= u.xp);
}
function milestoneFrom(scoreBandPct: number, xp: number, current: BadgeResult["milestone"]) {
  if (xp >= 240) return "AI Practitioner";
  if (current === "Project Finisher" || current === "AI Practitioner") return current;
  if (scoreBandPct >= 75 && xp >= 120) return "Project Finisher";
  return current;
}
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ");
  let line = "";
  let yy = y;
  for (let n = 0; n < words.length; n++) {
    const test = line + words[n] + " ";
    const w = ctx.measureText(test).width;
    if (w > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, yy);
      line = words[n] + " ";
      yy += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line.trim(), x, yy);
  return yy;
}

export default function Quiz() {
  const location = useLocation();
  const [answers, setAnswers] = React.useState<number[]>(Array(questions.length).fill(-1));
  const [copied, setCopied] = React.useState(false);
  const [shareCardReady, setShareCardReady] = React.useState(false);
  const [gamify, setGamify] = React.useState<GamifyState>({ streak: 0, xp: 0, actions: [] });
  const [animatedXp, setAnimatedXp] = React.useState(0);
  const [completionAwarded, setCompletionAwarded] = React.useState(false);

  React.useEffect(() => {
    setGamify(readGamify());
  }, []);

  const answeredCount = answers.filter((a) => a >= 0).length;
  const done = answeredCount === questions.length;
  const total = done ? answers.reduce((a, b) => a + b, 0) : 0;
  const b = badge(total);
  const progress = Math.round((answeredCount / questions.length) * 100);
  const lp = done ? levelProgress(total) : 0;
  const effectiveMilestone = done ? milestoneFrom(lp, gamify.xp, b.milestone) : b.milestone;
  const miniChallenges = done ? challengeForTrack(b.suggestedTrack) : [];
  const unlockBanners = unlocks(gamify.xp);

  React.useEffect(() => {
    const target = xpPct(gamify.xp);
    const id = window.setInterval(() => {
      setAnimatedXp((prev) => {
        if (prev === target) {
          window.clearInterval(id);
          return prev;
        }
        if (Math.abs(target - prev) <= 2) return target;
        return prev + (target > prev ? 2 : -2);
      });
    }, 12);
    return () => window.clearInterval(id);
  }, [gamify.xp]);

  React.useEffect(() => {
    if (done && !completionAwarded) {
      const key = `cohortai_quiz_completed_${todayKey()}`;
      if (typeof window !== "undefined" && !window.localStorage.getItem(key)) {
        const next = addXpAndStreak("quiz_completed", 18);
        setGamify(next);
        window.localStorage.setItem(key, "1");
      }
      setCompletionAwarded(true);
    }
  }, [done, completionAwarded]);

  function pick(i: number, s: number) {
    setAnswers((prev) => prev.map((v, idx) => (idx === i ? s : v)));
    const next = addXpAndStreak("quiz_answer", 2);
    setGamify(next);
  }

  const shareText = done
    ? `CohortAI Labs AI Readiness Result → Badge: ${b.name} • Track: ${b.suggestedTrack} • Milestone: ${effectiveMilestone} • Score band: ${lp}% • Streak: ${gamify.streak || 0} day(s). I’d like a mentor-led recommendation for the right cohort and batch schedule.`
    : "";

  const waHref = done
    ? `https://wa.me/91${site.whatsapp}?text=${encodeURIComponent(
        `Hi CohortAI Labs! I completed the AI Readiness Assessment.
Result Badge: ${b.name}
Suggested Track: ${b.suggestedTrack}
Milestone: ${effectiveMilestone}
Score Band: ${lp}%
Current Streak: ${gamify.streak || 0} day(s)

Please suggest the best cohort, budget option, and next batch schedule.`
      )}`
    : `https://wa.me/91${site.whatsapp}`;

  async function copyResult() {
    if (!done) return;
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      const next = addXpAndStreak("quiz_copy_result", 6);
      setGamify(next);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  function exportShareCard() {
    if (!done || typeof document === "undefined") return;
    const c = document.createElement("canvas");
    c.width = 1080;
    c.height = 1350;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    // Background
    const g = ctx.createLinearGradient(0, 0, c.width, c.height);
    g.addColorStop(0, "#F8FBFF");
    g.addColorStop(0.45, "#EEF4FF");
    g.addColorStop(1, "#F1FFF8");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, c.width, c.height);

    // Blobs
    ctx.globalAlpha = 0.18;
    ctx.fillStyle = "#4CC9F0";
    ctx.beginPath(); ctx.arc(190, 180, 180, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#7B61FF";
    ctx.beginPath(); ctx.arc(890, 250, 220, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#5FE1B5";
    ctx.beginPath(); ctx.arc(880, 1100, 240, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;

    // Card panel
    ctx.fillStyle = "rgba(255,255,255,0.88)";
    ctx.strokeStyle = "rgba(148,163,184,0.25)";
    ctx.lineWidth = 2;
    const x = 70, y = 90, w = 940, h = 1170, r = 36;
    roundRect(ctx, x, y, w, h, r);
    ctx.fill();
    ctx.stroke();

    // Heading
    ctx.fillStyle = "#0F172A";
    ctx.font = "700 46px Inter, Arial, sans-serif";
    ctx.fillText("CohortAI Labs", x + 50, y + 86);

    ctx.font = "600 22px Inter, Arial, sans-serif";
    ctx.fillStyle = "#475569";
    ctx.fillText("AI Readiness Assessment Result", x + 50, y + 124);

    // Badge row
    const badgeGrad = ctx.createLinearGradient(x + 50, y + 170, x + 420, y + 170);
    badgeGrad.addColorStop(0, "#DDF5FF");
    badgeGrad.addColorStop(0.5, "#EFE7FF");
    badgeGrad.addColorStop(1, "#E7FFF5");
    ctx.fillStyle = badgeGrad;
    roundRect(ctx, x + 50, y + 160, 410, 64, 22);
    ctx.fill();

    ctx.font = "700 30px Inter, Arial, sans-serif";
    ctx.fillStyle = "#0F172A";
    ctx.fillText(`${b.name} • ${effectiveMilestone}`, x + 72, y + 202);

    // Score blocks
    drawMiniStat(ctx, x + 50, y + 250, 280, 120, "Suggested Track", b.suggestedTrack);
    drawMiniStat(ctx, x + 350, y + 250, 280, 120, "Score Band", `${lp}%`);
    drawMiniStat(ctx, x + 650, y + 250, 280, 120, "Current Streak", `${gamify.streak || 0} day(s)`);

    // XP bar
    ctx.fillStyle = "#334155";
    ctx.font = "700 22px Inter, Arial, sans-serif";
    ctx.fillText("XP Progress", x + 50, y + 418);
    roundRect(ctx, x + 50, y + 440, 880, 18, 9);
    ctx.fillStyle = "#E2E8F0";
    ctx.fill();
    const pct = xpPct(gamify.xp);
    const pg = ctx.createLinearGradient(x + 50, y + 440, x + 930, y + 440);
    pg.addColorStop(0, "#4CC9F0");
    pg.addColorStop(0.5, "#7B61FF");
    pg.addColorStop(1, "#5FE1B5");
    ctx.fillStyle = pg;
    roundRect(ctx, x + 50, y + 440, Math.max(18, Math.round(880 * pct / 100)), 18, 9);
    ctx.fill();
    ctx.font = "600 18px Inter, Arial, sans-serif";
    ctx.fillStyle = "#64748B";
    ctx.fillText(`${gamify.xp || 0}/250 XP`, x + 50, y + 490);

    // Challenge tasks
    ctx.fillStyle = "#0F172A";
    ctx.font = "700 22px Inter, Arial, sans-serif";
    ctx.fillText("Mini challenge to start this week", x + 50, y + 545);
    let yy = y + 590;
    miniChallenges.forEach((task, idx) => {
      roundRect(ctx, x + 50, yy - 24, 880, 78, 18);
      ctx.fillStyle = idx % 2 === 0 ? "rgba(248,250,252,0.95)" : "rgba(255,255,255,0.95)";
      ctx.fill();
      ctx.strokeStyle = "rgba(148,163,184,0.22)";
      ctx.stroke();
      ctx.fillStyle = "#0F172A";
      ctx.font = "700 18px Inter, Arial, sans-serif";
      ctx.fillText(`Task ${idx + 1}`, x + 76, yy + 4);
      ctx.font = "500 16px Inter, Arial, sans-serif";
      ctx.fillStyle = "#334155";
      wrapText(ctx, task, x + 170, yy + 4, 730, 22);
      yy += 94;
    });

    // Footer CTA
    ctx.fillStyle = "#334155";
    ctx.font = "600 18px Inter, Arial, sans-serif";
    const foot = "Mentor-led AI cohorts • Online + Offline • WhatsApp for a personalized recommendation";
    wrapText(ctx, foot, x + 50, y + 1010, 880, 26);

    // signature CTA pill
    const ctaGrad = ctx.createLinearGradient(x + 50, y + 1070, x + 620, y + 1070);
    ctaGrad.addColorStop(0, "#CDEFFF");
    ctaGrad.addColorStop(0.5, "#E6DBFF");
    ctaGrad.addColorStop(1, "#D8FFF0");
    ctx.fillStyle = ctaGrad;
    roundRect(ctx, x + 50, y + 1060, 560, 68, 22);
    ctx.fill();
    ctx.fillStyle = "#0F172A";
    ctx.font = "700 22px Inter, Arial, sans-serif";
    ctx.fillText("Get a human recommendation → /recommendation", x + 78, y + 1104);

    const a = document.createElement("a");
    a.href = c.toDataURL("image/png");
    a.download = "cohortai_ai_readiness_share_card.png";
    a.click();

    setShareCardReady(true);
    const next = addXpAndStreak("quiz_export_share_card", 12);
    setGamify(next);
    window.setTimeout(() => setShareCardReady(false), 1800);
  }

  return (
    <div className="pt-12 pb-16">
      <Helmet>
        <title>AI Readiness Assessment | CohortAI Labs</title>
        <meta
          name="description"
          content="Take the CohortAI Labs AI Readiness Assessment to get a suggested track, milestone badge, and mentor-friendly recommendation path."
        />
        <link rel="canonical" href={canonical(location.pathname)} />
        <meta property="og:title" content="AI Readiness Assessment | CohortAI Labs" />
        <meta property="og:description" content="Get a suggested AI track, milestone badge, and next-step recommendation from CohortAI Labs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical(location.pathname)} />
        <meta property="og:image" content={seoDefaults.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <section className="py-2">
        <Container>
          <SectionTitle
            eyebrow="Gamified assessment"
            title="AI Readiness Assessment + XP + milestone unlocks"
            desc="Answer a few beginner-friendly questions. Get a track recommendation, challenge tasks, share card export, and a human recommendation path."
          />

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="card card-3d rounded-3xl p-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-xs tracking-[0.22em] uppercase text-slate-700">Progress</div>
                  <div className="mt-1 text-sm font-semibold text-slate-950">
                    {answeredCount}/{questions.length} answered • {progress}%
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-white/85 px-4 py-3 min-w-[240px]">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs text-slate-600">Streak</div>
                      <div className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-950">
                        <Flame size={15} className="text-orange-500" />
                        {gamify.streak || 0} day{(gamify.streak || 0) === 1 ? "" : "s"}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-600">XP</div>
                      <div className="mt-1 text-sm font-semibold text-slate-950">{gamify.xp || 0}/250</div>
                    </div>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 transition-all duration-500"
                      style={{ width: `${animatedXp}%` }}
                    />
                  </div>
                  <div className="mt-2 text-[11px] text-slate-600">XP progress to Fast-Track Ready</div>
                </div>
              </div>

              <div className="mt-5 h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-6 grid gap-4">
                {questions.map((q, i) => (
                  <div key={q.q} className="rounded-2xl border border-slate-200/80 bg-white/75 p-4">
                    <div className="text-sm font-semibold text-slate-950">
                      {i + 1}. {q.q}
                    </div>
                    <div className="mt-3 grid gap-2">
                      {q.options.map((op) => {
                        const active = answers[i] === op.score;
                        return (
                          <button
                            key={op.label}
                            type="button"
                            onClick={() => pick(i, op.score)}
                            className={
                              "text-left rounded-xl border px-3 py-2.5 text-sm transition " +
                              (active
                                ? "border-violet-200 bg-gradient-to-r from-cyan-50 via-violet-50 to-emerald-50 text-slate-950 ring-2 ring-violet-100"
                                : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50")
                            }
                          >
                            {op.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4">
                <div className="flex items-start gap-2">
                  <Sparkles size={16} className="mt-0.5 text-cyan-700" />
                  <div>
                    <div className="text-sm font-semibold text-slate-950">Friendly note</div>
                    <p className="mt-1 text-xs text-slate-700">
                      This assessment is guidance, not a limitation. We use it to suggest the fastest practical starting point for your goals and schedule.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card card-3d rounded-3xl p-6">
              {!done ? (
                <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5">
                  <div className="text-sm font-semibold text-slate-950">Complete the assessment to unlock your result</div>
                  <p className="mt-2 text-sm text-slate-700">
                    You’ll get a recommended track, milestone badge, mini challenge, and share-ready summary for WhatsApp.
                  </p>
                  <div className="mt-4 grid gap-2">
                    <div className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-700">XP unlocks on quiz completion and result actions (copy/share/export/WhatsApp).</div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-700">Streak grows when you return daily and engage with the assessment or track finder.</div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="rounded-2xl border border-slate-200/80 bg-white/85 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                      <Trophy size={16} className="text-violet-700" />
                      Your badge: {b.name}
                    </div>
                    <p className="mt-2 text-sm text-slate-700">{b.desc}</p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4">
                        <div className="text-xs text-slate-700">Milestone</div>
                        <div className="mt-1 inline-flex items-center rounded-full border border-slate-200 bg-gradient-to-r from-cyan-50 via-violet-50 to-emerald-50 px-3 py-1.5 text-xs font-semibold text-slate-900">
                          <Trophy size={16} className="mr-2 text-violet-700" />
                          {effectiveMilestone}
                        </div>
                        <div className="mt-2 h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400"
                            style={{ width: `${lp}%` }}
                          />
                        </div>
                        <div className="mt-2 text-[11px] text-slate-600">Score band: {lp}%</div>
                      </div>

                      <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4">
                        <div className="text-xs text-slate-700">Suggested track</div>
                        <div className="mt-1 text-sm font-semibold text-slate-950">{b.suggestedTrack}</div>
                        <p className="mt-2 text-xs text-slate-700">
                          We can adapt this recommendation based on budget, schedule, and preferred mode.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-slate-200/80 bg-white/85 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                      <Star size={16} className="text-amber-500" />
                      Milestone unlock banners
                    </div>
                    <div className="mt-3 grid gap-2">
                      {unlockBanners.length === 0 ? (
                        <div className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-700">
                          Finish actions like copy/share/export to unlock more banners.
                        </div>
                      ) : (
                        unlockBanners.map((u) => (
                          <div key={u.xp} className="rounded-xl border border-emerald-200 bg-emerald-50/70 px-3 py-2">
                            <div className="text-xs font-semibold text-emerald-900">{u.title}</div>
                            <div className="mt-0.5 text-[11px] text-emerald-800">{u.desc}</div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-slate-200/80 bg-white/80 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                      <Zap size={16} className="text-cyan-700" />
                      Mini challenge to start this week
                    </div>
                    <div className="mt-3 grid gap-2">
                      {miniChallenges.map((task, idx) => (
                        <div key={task} className="flex items-start gap-2 rounded-xl border border-slate-200/70 bg-slate-50/80 px-3 py-2">
                          <CheckCircle2 size={14} className="mt-0.5 text-emerald-700" />
                          <div className="text-xs text-slate-800">
                            <span className="font-semibold">Task {idx + 1}:</span> {task}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-slate-200/80 bg-white/85 p-4">
                    <div className="text-xs tracking-[0.22em] uppercase text-slate-700">Share-ready summary</div>
                    <p className="mt-2 text-xs text-slate-700 leading-relaxed">{shareText}</p>
                    <div className="mt-3 grid gap-2">
                      <div className="grid sm:grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={copyResult}
                          className="inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-950 bg-white border border-slate-200/80 hover:bg-slate-50 transition"
                        >
                          <Copy size={16} className="mr-2" />
                          {copied ? "Copied" : "Copy result"}
                        </button>
                        <button
                          type="button"
                          onClick={exportShareCard}
                          className="inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-950 bg-white border border-slate-200/80 hover:bg-slate-50 transition"
                        >
                          <Download size={16} className="mr-2" />
                          {shareCardReady ? "Exported" : "Export share card"}
                        </button>
                      </div>
                      <a
                        href={waHref}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setGamify(addXpAndStreak("quiz_whatsapp_result", 14))}
                        className="inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-200 via-violet-200 to-emerald-200 hover:opacity-95 transition accent-ring"
                      >
                        <MessageCircle size={16} className="mr-2" />
                        WhatsApp my result
                      </a>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <Button href="/recommendation" onClick={() => setGamify(addXpAndStreak("quiz_human_recommendation_click", 12))}>
                      <Rocket className="mr-2" size={18} />
                      Get a human recommendation
                    </Button>
                    <Button href="/courses" variant="secondary">
                      Explore courses
                    </Button>
                  </div>

                  <div className="mt-4 rounded-2xl border border-slate-200/80 bg-gradient-to-r from-cyan-50/80 via-violet-50/70 to-emerald-50/80 p-4">
                    <div className="flex items-start gap-2">
                      <Gauge size={16} className="mt-0.5 text-violet-700" />
                      <div>
                        <div className="text-sm font-semibold text-slate-950">7-Day challenge + mentor support</div>
                        <p className="mt-1 text-xs text-slate-700">
                          Next best step: use the Track Finder, unlock the 7-Day AI Challenge PDF, then WhatsApp your plan for a personalized recommendation and batch fit.
                        </p>
                        <div className="mt-3">
                          <a
                            href="/#track-finder"
                            onClick={() => setGamify(addXpAndStreak("quiz_go_trackfinder", 8))}
                            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-xs font-semibold text-slate-950 bg-white/90 border border-slate-200 hover:bg-white"
                          >
                            <Share2 size={14} className="mr-2" />
                            Continue to Track Finder
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 text-xs text-slate-700">
                Tip: Daily engagement builds streak + XP. We use this gamified layer to encourage consistency, not pressure.
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function drawMiniStat(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  label: string,
  value: string
) {
  roundRect(ctx, x, y, w, h, 20);
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.fill();
  ctx.strokeStyle = "rgba(148,163,184,0.25)";
  ctx.stroke();

  ctx.fillStyle = "#64748B";
  ctx.font = "600 15px Inter, Arial, sans-serif";
  ctx.fillText(label, x + 16, y + 28);

  ctx.fillStyle = "#0F172A";
  ctx.font = "700 22px Inter, Arial, sans-serif";
  wrapText(ctx, value, x + 16, y + 62, w - 32, 24);
}
