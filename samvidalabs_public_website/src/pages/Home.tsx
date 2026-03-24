import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Users, Workflow, Database, Wallet, UserCog, MousePointerClick, Star, Clock3, BadgeCheck } from "lucide-react";
import Container from "../components/Container";
import GlowBg from "../components/GlowBg";
import Button from "../components/Button";
import SectionTitle from "../components/SectionTitle";
import { site } from "../lib/site";
import TrackFinder from "./partials/TrackFinder";
import Tracks from "./partials/Tracks";
import Ladder from "./partials/Ladder";
import Testimonials from "./partials/Testimonials";
import FAQ from "./partials/FAQ";
import CTA from "./partials/CTA";
import GalleryStrip from "../components/GalleryStrip";
import ConversionFunnel from "./partials/ConversionFunnel";
import SuccessStories from "./partials/SuccessStories";
import GamifiedJourney from "./partials/GamifiedJourney";

const platformCards = [
  { icon: Database, title: "Organized admissions", desc: "Registrations, payments, approvals, and batch details stay organized so learners receive a smoother experience." },
  { icon: Wallet, title: "UPI-led checkout", desc: "Registrations move into review only after verified payment, reducing manual reconciliation." },
  { icon: UserCog, title: "Guided team workflows", desc: "Admissions, finance, mentors, and admins can manage their responsibilities with the right tools and visibility." },
];

const stat = [
  { icon: Users, label: "Cohort model", value: "Small batches" },
  { icon: Workflow, label: "Hands-on", value: "Real deliverables" },
  { icon: ShieldCheck, label: "Mentor reviews", value: "Structured feedback" },
  { icon: MousePointerClick, label: "Interactive journey", value: "Advisor + XP" },
];

const proof = [
  { icon: Star, title: "Clear guidance", desc: "See the learning path, expected outcomes, and next steps in one place so choosing a program feels simpler and more informed." },
  { icon: Clock3, title: "Support at every step", desc: "Use the advisor, speak to a counsellor, or message on WhatsApp whenever you want practical guidance before enrolling." },
  { icon: BadgeCheck, title: "Know what to expect", desc: "Programs, durations, deliverables, locations, and mentor support are explained clearly before you commit." },
];

export default function Home() {

  return (
    <div className="page-shell relative">
      <section className="relative overflow-hidden pt-20 sm:pt-28 pb-14">
        <GlowBg />
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/80 glass-pearl px-4 py-2 text-xs text-slate-700">
                <Sparkles size={14} className="text-cyan-600" />
                <span>
                  Premium cohort experience • Next batch <span className="font-semibold text-slate-950">{site.startDate}</span>
                </span>
              </div>

              <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.045em] text-slate-950 text-balance leading-[0.94]">
                Build an <span className="bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-500 bg-clip-text text-transparent">AI career edge</span> with a premium,
                mentor-led learning system.
              </h1>

              <p className="mt-5 max-w-2xl text-base sm:text-xl leading-8 text-slate-600">
                {site.brand} blends live cohorts, guided labs, interactive learning paths, social proof, and gamified momentum so learners stay engaged and actually finish.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button href="#advisor">
                  Start AI Advisor <ArrowRight className="ml-2" size={18} />
                </Button>
                <Button href="/contact" variant="secondary" className="!bg-white !text-slate-900 !border-slate-300 hover:!bg-slate-50">
                  Book Free Counselling
                </Button>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {stat.map((s) => (
                  <div key={s.label} className="glass-pearl interactive-card rounded-3xl p-4 ring-soft">
                    <s.icon className="text-cyan-600" size={18} />
                    <div className="mt-3 text-sm font-semibold text-slate-950">{s.value}</div>
                    <div className="mt-1 text-xs text-slate-500">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="glass rounded-[36px] p-7 ring-soft">
                <div className="text-sm tracking-[0.28em] uppercase text-cyan-300">3D cohort command center</div>
                <div className="mt-3 text-4xl font-semibold text-white text-balance">A guided, mentor-led AI learning experience</div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 interactive-card">
                    <div className="text-sm text-slate-400">How learners usually begin</div>
                    <div className="mt-3 text-3xl font-semibold text-white leading-tight">Advisor → Guidance → Enrolment</div>
                    <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300" />
                    </div>
                  </div>
                  <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 interactive-card">
                    <div className="text-sm text-slate-400">Learner momentum</div>
                    <div className="mt-3 text-3xl font-semibold text-white leading-tight">XP streaks + unlocks</div>
                    <div className="mt-5 flex items-center gap-2 text-xs text-slate-300">
                      <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-emerald-200">7-day challenge</span>
                      <span className="rounded-full bg-violet-400/15 px-3 py-1 text-violet-200">Milestone badges</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 rounded-[32px] border border-white/10 bg-slate-950/60 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.28)]">
                  <div className="text-sm text-emerald-300">Suggested starter plan</div>
                  <div className="mt-2 text-3xl font-semibold text-white">AI Productivity Pro</div>
                  <p className="mt-3 max-w-md text-slate-300 leading-7">
                    For working professionals who want practical AI skills, stronger output at work, and a structured path into deeper projects and advanced cohorts.
                  </p>
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {[["Fit", "87%"], ["Mode", "Hybrid"], ["Start", "₹10k"]].map(([label, value]) => (
                      <div key={label} className="rounded-2xl bg-white/6 p-4 text-center interactive-card">
                        <div className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</div>
                        <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute -z-10 inset-0 blur-3xl opacity-60 animate-floaty" style={{ background: "radial-gradient(circle at 60% 40%, rgba(34,211,238,0.22), transparent 55%), radial-gradient(circle at 30% 70%, rgba(167,139,250,0.20), transparent 55%)" }} />
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {proof.map((item, idx) => (
              <motion.div
                key={item.title}
                className="glass-pearl interactive-card rounded-3xl p-5 ring-soft"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
              >
                <item.icon className="text-cyan-600" size={20} />
                <div className="mt-4 text-lg font-semibold text-slate-950">{item.title}</div>
                <div className="mt-2 text-sm leading-7 text-slate-600">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      
</section>

      <section className="py-12 section-divider">
        <Container>
          <SectionTitle eyebrow="Learner voices" title="Real learner stories from people who completed focused programs" desc="Hear from working professionals and committed learners who used these programs to improve clarity, productivity, confidence, and practical outcomes." />
          <div className="mt-8"><Testimonials /></div>
        </Container>
      </section>

      <section id="advisor" className="py-14 section-divider scroll-mt-28">
        <Container>
          <SectionTitle eyebrow="Find your path" title="Use the AI advisor to discover the right starting point" desc="Choose your background, goal, budget, and learning mode to get a practical recommendation you can act on right away." />
          <div className="mt-8"><TrackFinder /></div>
        </Container>
      </section>

      <section className="py-14 section-divider">
        <Container>
          <SectionTitle eyebrow="How to get started" title="A clear path from first visit to confident enrolment" desc="Explore the advisor, compare tracks, speak to a counsellor, and choose the format that fits your schedule and location." />
          <div className="mt-8"><ConversionFunnel /></div>
        </Container>
      </section>

      <section className="py-14 section-divider">
        <Container>
          <SectionTitle eyebrow="Tracks" title="Learning paths for beginners, working professionals, and technical learners" desc="Each path is organized around practical outcomes so learners can choose a program that matches their current stage and future goals." />
          <div className="mt-8"><Tracks /></div>
        </Container>
      </section>

      <section className="py-14 section-divider">
        <Container>
          <SectionTitle eyebrow="Gamified momentum" title="Small milestones make it easier to stay consistent" desc="Progress markers, challenges, and visible milestones help learners stay engaged and finish what they start." />
          <div className="mt-8"><GamifiedJourney /></div>
        </Container>
      </section>

      <section className="py-14 section-divider">
        <Container>
          <SectionTitle eyebrow="Course ladder" title="Start with the right level, then grow with projects and mentor feedback" desc="Transparent pricing from ₹5,000 to ₹35,000. Each level adds deeper outcomes, stronger accountability, and more hands-on support." />
          <div className="mt-8"><Ladder /></div>
        </Container>
      </section>

      <GalleryStrip />
      <SuccessStories />

      <section className="py-14 section-divider">
        <Container>
          <SectionTitle eyebrow="Admissions and operations" title="Built to support registrations, payments, batch operations, and guided admissions" desc="The platform is evolving so learners get a smoother experience and the team can manage admissions, approvals, and schedules with more clarity." />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {platformCards.map((card) => (
              <div key={card.title} className="glass-pearl interactive-card rounded-3xl p-6 ring-soft">
                <card.icon className="text-cyan-600" size={20} />
                <div className="mt-4 text-lg font-semibold text-slate-950">{card.title}</div>
                <div className="mt-2 text-sm text-slate-600 leading-7">{card.desc}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/register">Try self-registration</Button>
            <Button href="/admin" variant="secondary" className="!bg-white !text-slate-900 !border-slate-300 hover:!bg-slate-50">View admin console</Button>
          </div>
        </Container>
      </section>

      <section className="py-14 section-divider">
        <Container>
          <SectionTitle eyebrow="FAQ" title="Quick answers" desc="If you have more questions, message us and we’ll guide you." />
          <div className="mt-8"><FAQ /></div>
        </Container>
      </section>

      <CTA />
    </div>
  );
}
