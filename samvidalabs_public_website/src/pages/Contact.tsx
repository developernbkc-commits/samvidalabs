import { useState } from "react";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import { site } from "../lib/site";
import Button from "../components/Button";

const intents = [
  "Need course guidance",
  "Want a counselling call",
  "Need enterprise training",
  "Want weekend batch",
] as const;

export default function Contact() {
  const [intent, setIntent] = useState<(typeof intents)[number]>("Need course guidance");

  return (
    <div>
      <section className="pt-16 pb-10">
        <Container>
          <SectionTitle
            eyebrow="Contact"
            title="Admissions help, batch scheduling, and enterprise inquiries"
            desc="Use this channel for counseling, enterprise cohorts, partnerships, or admissions support. Direct registrations should move through the self-registration flow."
          />
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button href="/register">Go to self-registration</Button>
            <Button href={`https://wa.me/91${site.whatsapp}`} target="_blank" rel="noreferrer" variant="secondary" className="!bg-white !text-slate-900 !border-slate-300 hover:!bg-slate-50">
              WhatsApp +91 {site.whatsapp}
            </Button>
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div className="glass-pearl rounded-3xl p-6 ring-soft">
              <div className="text-sm font-semibold text-slate-950">Contact details</div>
              <div className="mt-3 text-sm text-slate-600 grid gap-2 leading-7">
                <div>Locations: {site.cities.join(" • ")}</div>
                <div>Batches start: {site.startDate}</div>
                <div>Tracks: Everyday AI • Business AI • Tech & Data AI • Custom bundles</div>
              </div>
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-700 leading-7">
                Tip: For direct admissions, use self-registration. This form is best for custom programs, corporate training, or support requests.
              </div>
              <div className="mt-6">
                <div className="text-xs tracking-[0.22em] uppercase text-slate-500">Quick intent</div>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {intents.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setIntent(item)}
                      className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                        intent === item
                          ? "border-cyan-300 bg-cyan-50 text-slate-950"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <form name="admissions-help" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/thanks" className="glass rounded-3xl p-6 ring-soft">
              <input type="hidden" name="form-name" value="admissions-help" />
              <input type="hidden" name="intent" value={intent} />
              <p className="hidden">
                <label>
                  Don’t fill this out: <input name="bot-field" />
                </label>
              </p>

              <div className="grid gap-4">
                <div>
                  <label className="text-xs text-slate-300">Full name</label>
                  <input name="name" required className="mt-2 w-full rounded-2xl bg-slate-900/70 border border-slate-800/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-200/30" placeholder="Your name" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs text-slate-300">Phone</label>
                    <input name="phone" required className="mt-2 w-full rounded-2xl bg-slate-900/70 border border-slate-800/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-200/30" placeholder="10-digit number" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300">City</label>
                    <select name="city" className="mt-2 w-full rounded-2xl bg-slate-900/70 border border-slate-800/70 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-200/30" defaultValue={site.cities[0]}>
                      {site.cities.map((c) => (<option key={c} value={c}>{c}</option>))}
                      <option value="Online">Online</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs text-slate-300">Track</label>
                    <select name="track" className="mt-2 w-full rounded-2xl bg-slate-900/70 border border-slate-800/70 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-200/30" defaultValue="Custom bundle">
                      {site.tracks.map((t) => (<option key={t.name} value={t.name}>{t.name}</option>))}
                      <option value="Custom bundle">Custom bundle</option>
                      <option value="Corporate cohort">Corporate cohort</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-300">Preferred mode</label>
                    <select name="mode" className="mt-2 w-full rounded-2xl bg-slate-900/70 border border-slate-800/70 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-200/30" defaultValue="Hybrid">
                      <option>Hybrid</option>
                      <option>Online</option>
                      <option>Offline</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-300">Goal</label>
                  <textarea name="goal" rows={4} className="mt-2 w-full rounded-2xl bg-slate-900/70 border border-slate-800/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-200/30" defaultValue={intent} placeholder="Example: career switch, business growth, productivity, portfolio projects..." />
                </div>

                <button type="submit" className="mt-2 inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 hover:opacity-95 transition neon-edge">
                  Request support
                </button>

                <div className="text-xs text-slate-400">By submitting, you agree to be contacted by CohortAI Labs. We respect your privacy.</div>
              </div>
            </form>
          </div>
        </Container>
      </section>
    </div>
  );
}
