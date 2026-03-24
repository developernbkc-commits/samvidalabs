import React from "react";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import { submitReview } from "../lib/api";
import { CheckCircle2, ImagePlus, ShieldCheck, Star } from "lucide-react";
import { verifiedTestimonials } from "../lib/verifiedTestimonials";

const initial = {
  fullName: "",
  email: "",
  city: "",
  country: "India",
  courseName: "AI Productivity Pro",
  roleTitle: "",
  rating: 5,
  headline: "",
  reviewText: "",
  profileImageUrl: "",
  consentToPublish: true,
};

export default function Reviews() {
  const [form, setForm] = React.useState(initial);
  const [submitting, setSubmitting] = React.useState(false);
  const [done, setDone] = React.useState<null | { mode: string; error?: string }>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const result = await submitReview(form);
    setSubmitting(false);
    setDone({ mode: result.mode, error: result.error });
    if (result.ok) setForm(initial);
  }

  return (
    <div>
      <section className="pt-12 pb-8">
        <Container>
          <SectionTitle
            eyebrow="Success stories"
            title="See how learners describe their experience in their own words"
            desc="These stories help future learners understand what changed, what they built, and how the learning experience supported them before they decide to enrol."
          />
        </Container>
      </section>

      <section className="pb-10">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {verifiedTestimonials.map((item) => (
              <article key={item.name} className="glass-pearl rounded-3xl p-5 ring-soft border border-white/60">
                <div className="flex items-start gap-4">
                  <img src={item.image} alt={item.name} className="h-20 w-20 rounded-2xl object-cover object-top shadow-md" loading="lazy" />
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950">{item.name}</h3>
                    <p className="mt-1 text-sm text-slate-600">{item.role}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-700">
                      <span className="rounded-full bg-slate-100 px-3 py-1">{item.course}</span>
                      <span className="rounded-full bg-slate-100 px-3 py-1">{item.duration}</span>
                      <span className="rounded-full bg-slate-100 px-3 py-1">{item.date}</span>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-700">“{item.quote}”</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="pt-4 pb-8">
        <Container>
          <SectionTitle
            eyebrow="Share your experience"
            title="Submit your review for approval"
            desc="Learners can submit their review, an optional profile image URL, and consent to publish. Every submission is reviewed by the team before it appears on the public site."
          />
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
            <form onSubmit={onSubmit} className="glass rounded-3xl p-6 ring-soft space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Full name"><input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required className={inputClass} /></Field>
                <Field label="Email"><input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" required className={inputClass} /></Field>
                <Field label="City"><input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={inputClass} /></Field>
                <Field label="Country"><input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className={inputClass} /></Field>
                <Field label="Course / program"><input value={form.courseName} onChange={(e) => setForm({ ...form, courseName: e.target.value })} required className={inputClass} /></Field>
                <Field label="Role / title"><input value={form.roleTitle} onChange={(e) => setForm({ ...form, roleTitle: e.target.value })} className={inputClass} placeholder="Student, Founder, Analyst..." /></Field>
              </div>

              <Field label="Headline">
                <input value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} required className={inputClass} placeholder="Example: Practical course that helped me build confidence" />
              </Field>

              <Field label="Review text">
                <textarea value={form.reviewText} onChange={(e) => setForm({ ...form, reviewText: e.target.value })} required rows={5} className={inputClass} placeholder="What changed for you? Mention outcomes, mentor support, confidence, projects, or business impact." />
              </Field>

              <div className="grid gap-4 md:grid-cols-[0.5fr_1fr]">
                <Field label="Rating">
                  <select value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className={inputClass}>
                    {[5,4,3,2,1].map((n) => <option key={n} value={n}>{n} / 5</option>)}
                  </select>
                </Field>
                <Field label="Profile image URL (optional)">
                  <input value={form.profileImageUrl} onChange={(e) => setForm({ ...form, profileImageUrl: e.target.value })} className={inputClass} placeholder="https://..." />
                </Field>
              </div>

              <label className="flex items-start gap-3 text-sm text-slate-300">
                <input type="checkbox" checked={form.consentToPublish} onChange={(e) => setForm({ ...form, consentToPublish: e.target.checked })} className="mt-1" />
                <span>I confirm that this review is genuine and I allow CohortAI Labs to review and publish it after approval.</span>
              </label>

              <div className="flex flex-wrap gap-3">
                <button disabled={submitting} className="rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-200 disabled:opacity-60">
                  {submitting ? "Submitting..." : "Submit review"}
                </button>
                {done?.mode === "fallback" && (
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-amber-300/40 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
                    <ShieldCheck size={16} /> Submitted in fallback mode. Remote storage can be enabled later.
                  </div>
                )}
                {done?.mode === "remote" && !done?.error && (
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-emerald-300/40 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                    <CheckCircle2 size={16} /> Review submitted successfully for approval.
                  </div>
                )}
                {done?.error && (
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-rose-300/40 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
                    {done.error}
                  </div>
                )}
              </div>
            </form>

            <div className="space-y-5">
              <div className="glass rounded-3xl p-6 ring-soft">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/20 text-cyan-200 border border-cyan-300/20">
                  <Star size={20} />
                </div>
                <div className="mt-4 text-lg font-semibold text-white">What makes a strong review?</div>
                <ul className="mt-4 space-y-3 text-sm text-slate-300">
                  <li>• Explain what changed for you during or after the program.</li>
                  <li>• Mention practical outcomes such as confidence, projects, work impact, or interviews.</li>
                  <li>• Keep it specific, honest, and easy for a future learner to relate to.</li>
                </ul>
              </div>

              <div className="glass rounded-3xl p-6 ring-soft">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-300/20 text-violet-200 border border-violet-300/20">
                  <ImagePlus size={20} />
                </div>
                <div className="mt-4 text-lg font-semibold text-white">Publishing process</div>
                <ul className="mt-4 space-y-3 text-sm text-slate-300">
                  <li>• Reviews are checked before they go live.</li>
                  <li>• The team may shorten or lightly edit text for clarity while preserving the meaning.</li>
                  <li>• Profile images are optional and should be clear, respectful, and appropriate for a public site.</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-2 text-sm text-slate-300">{label}</div>
      {children}
    </label>
  );
}

const inputClass = "w-full rounded-2xl border border-slate-700/80 bg-slate-950/60 px-4 py-3 text-slate-50 outline-none focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20";
