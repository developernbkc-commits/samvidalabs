import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import { site } from "../lib/site";
import { CheckCircle2, GraduationCap, MapPin, Timer, Trophy, Sparkles, Handshake, Rocket, Shield } from "lucide-react";
import SuccessStories from "./partials/SuccessStories";

const points = [
  { icon: GraduationCap, title: "Senior mentorship", desc: "Industry-experienced mentors focus on practical skills, business context, and clarity." },
  { icon: CheckCircle2, title: "Deliverables", desc: "Every module produces outputs you can show, reuse, or demo in work, interviews, or client meetings." },
  { icon: Timer, title: "Cohort accountability", desc: "Small batches, weekly reviews, and progress tracking keep learners moving forward." },
  { icon: MapPin, title: "Hybrid access", desc: "Online + offline options across Hyderabad, Vijayawada, and Guntur." },
  { icon: Trophy, title: "Gamified momentum", desc: "XP, streaks, badges, and milestones increase completion and make learning feel dynamic." },
  { icon: Sparkles, title: "Thoughtful learning experience", desc: "Every part of the experience is designed to feel clear, supportive, and polished for serious learners." },
];

const principles = [
  { icon: Handshake, title: "Trust before pressure", desc: "We lead with clarity, proof, and guided discovery—not noisy sales tactics." },
  { icon: Rocket, title: "Outcomes before complexity", desc: "Learners should see what they will build, unlock, or improve at every stage." },
  { icon: Shield, title: "Premium, but human", desc: "The brand should feel polished and aspirational while still approachable for beginners." },
];

export default function About() {
  return (
    <div className="page-shell">
      <section className="pt-16 pb-10">
        <Container>
          <SectionTitle
            eyebrow="About"
            title={`Why ${site.brand}?`}
            desc="We built CohortAI Labs for learners who want outcomes, structure, and premium guidance—not random lectures or passive video courses."
          />
        </Container>
      </section>

      <section className="py-14 section-divider">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {points.map((p) => (
              <div key={p.title} className="glass-pearl interactive-card rounded-3xl p-6 ring-soft">
                <p.icon className="text-cyan-600" size={20} />
                <div className="mt-3 text-lg font-semibold text-slate-950">{p.title}</div>
                <div className="mt-2 text-sm leading-7 text-slate-600">{p.desc}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 section-divider">
        <Container>
          <SectionTitle eyebrow="Brand principles" title="How the brand should feel to a learner, parent, or enterprise buyer" desc="These principles guide the design, teaching style, and public messaging across the platform." />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {principles.map((item) => (
              <div key={item.title} className="glass rounded-3xl p-6 interactive-card ring-soft">
                <item.icon className="text-cyan-300" size={20} />
                <div className="mt-4 text-xl font-semibold text-white">{item.title}</div>
                <div className="mt-2 text-sm leading-7 text-slate-300">{item.desc}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <SuccessStories />
    </div>
  );
}
