import React from "react";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
import { site } from "../lib/site";
import { Building2, ClipboardList, ShieldCheck, GraduationCap, Clock, BarChart3, Mail, MessageCircle, Phone } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { canonical, seoDefaults } from "../lib/seo";
import { useLocation } from "react-router-dom";
import EnterpriseROIEstimator from "./partials/EnterpriseROIEstimator";

export default function Enterprise() {
  const location = useLocation();
  const email = (site as any).email || "info.cohortai.labs@itprofessional.pro";

  return (
    <div className="pt-12 pb-16">
      <Helmet>
        <title>Enterprise AI Enablement | CohortAI Labs</title>
        <meta
          name="description"
          content="Enterprise AI enablement programs with customized timelines, scoring exams, secure digital certificates and dedicated program management. Request a quote."
        />
        <link rel="canonical" href={canonical(location.pathname)} />
        <meta property="og:title" content="Enterprise AI Enablement | CohortAI Labs" />
        <meta
          property="og:description"
          content="Customized AI training for teams: dedicated program manager, tailored curriculum, scoring exams, and secure digital certificates. Request a quote."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical(location.pathname)} />
        <meta property="og:image" content={seoDefaults.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Container>
        <SectionTitle
          eyebrow="Enterprise customers"
          title="AI enablement programs for teams—built for outcomes"
          desc="Upskill teams with mentor-led cohorts, custom timelines, and measurable assessments. We tailor the program for your roles, stack, and business objectives."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 card card-3d rounded-3xl p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: <Building2 size={18} className="text-cyan-700" />, title: "Dedicated Program Manager", desc: "Single point of contact for schedule, reporting, and delivery." },
                { icon: <ClipboardList size={18} className="text-violet-700" />, title: "Customized Courses + Timelines", desc: "Role-based tracks with your preferred cadence and outcomes." },
                { icon: <BarChart3 size={18} className="text-emerald-700" />, title: "Online Scoring Exams", desc: "Baseline + final assessment with team-level scorecards." },
                { icon: <GraduationCap size={18} className="text-cyan-700" />, title: "Custom Material", desc: "Playbooks, templates, and internal-use guidelines tailored to your org." },
                { icon: <ShieldCheck size={18} className="text-violet-700" />, title: "Secure Digital Certificates", desc: "Verifiable certificates for transparency and auditability." },
                { icon: <Clock size={18} className="text-emerald-700" />, title: "Flexible Delivery Modes", desc: "Online, onsite, or hybrid cohorts across multiple locations." },
              ].map((x) => (
                <div key={x.title} className="rounded-3xl border border-slate-200/80 bg-white/80 p-5">
                  <div className="flex items-center gap-2 text-slate-950 font-semibold">
                    {x.icon}
                    {x.title}
                  </div>
                  <div className="mt-2 text-sm text-slate-800">{x.desc}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200/80 bg-white/70 p-5">
              <div className="text-sm font-semibold text-slate-950">Typical program outcomes</div>
              <ul className="mt-2 grid gap-1 text-sm text-slate-800">
                <li>• Higher adoption of approved AI tools with safe usage guidelines</li>
                <li>• Team deliverables: workflows, internal copilots, dashboards, or automation</li>
                <li>• Measurable improvement via scoring exams + mentor reviews</li>
                <li>• Optional: policy-aligned prompts, data handling SOPs, and governance checklists</li>
              </ul>
            </div>
          </div>

          <div className="card card-3d rounded-3xl p-6">
            <div className="text-sm text-slate-700">Request a quote</div>
            <div className="mt-2 text-xl font-semibold text-slate-950">Tell us your team goals</div>
            <p className="mt-2 text-sm text-slate-800">
              We’ll respond with a recommended plan, timeline, and a custom quote.
            </p>

            {/* Netlify Form */}
            <form
              className="mt-5 grid gap-3"
              name="enterprise-quote"
              method="POST"
              action="/thanks"
              data-netlify="true"
              netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="enterprise-quote" />
              <p className="hidden">
                <label>
                  Don’t fill this out: <input name="bot-field" />
                </label>
              </p>

              <input required name="name" placeholder="Your name" className="rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm" />
              <input required name="company" placeholder="Company / Organization" className="rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm" />
              <input required type="email" name="email" placeholder="Work email" className="rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm" />
              <input name="phone" placeholder="Phone (optional)" className="rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm" />
              <input name="team_size" placeholder="Team size (e.g., 25)" className="rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm" />
              <input name="timeline" placeholder="Timeline (e.g., 6 weeks)" className="rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm" />
              <textarea name="goals" placeholder="Goals (roles, use-cases, expected outcomes)" rows={4} className="rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm" />

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-200 via-violet-200 to-emerald-200 hover:opacity-95 transition accent-ring"
              >
                <ClipboardList className="mr-2" size={18} />
                Request a quote
              </button>
            </form>

            <div className="mt-5 rounded-2xl border border-slate-200/80 bg-white/70 p-4 text-sm text-slate-800">
              Prefer direct contact?
              <div className="mt-3 grid gap-2">
                <a className="inline-flex items-center gap-2 hover:underline" href={`mailto:${email}`}>
                  <Mail size={16} /> {email}
                </a>
                <a className="inline-flex items-center gap-2 hover:underline" href={`https://wa.me/91${site.whatsapp}`} target="_blank" rel="noreferrer">
                  <MessageCircle size={16} /> WhatsApp “Enterprise”
                </a>
                <a className="inline-flex items-center gap-2 hover:underline" href={`tel:${site.phone}`}>
                  <Phone size={16} /> {site.phone}
                </a>
              </div>
            </div>

            <div className="mt-4 text-xs text-slate-600">
              Note: We can sign NDA and align curriculum to your internal policies.
            </div>
          </div>
        </div>
      </Container>

      <Container>
        <EnterpriseROIEstimator />
      </Container>
    </div>
  );
}
