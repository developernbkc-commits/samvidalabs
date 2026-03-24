import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
import { site } from "../lib/site";
import { Helmet } from "react-helmet-async";
import { canonical, seoDefaults } from "../lib/seo";
import { useLocation } from "react-router-dom";
import { HeartHandshake, MessageCircle, Phone, Mail, Sparkles } from "lucide-react";

export default function Recommendation() {
  const location = useLocation();
  const email = (site as any).email || "info.cohortai.labs@itprofessional.pro";

  const wa = `https://wa.me/91${site.whatsapp}?text=${encodeURIComponent(
    "Hi CohortAI Labs! I’d like a track recommendation. My background: _____. My goal: _____. My budget: _____. Please suggest the best starting cohort and schedule."
  )}`;

  return (
    <div className="pt-12 pb-16">
      <Helmet>
        <title>Get a Recommendation | CohortAI Labs</title>
        <meta
          name="description"
          content="Get a personalized AI learning recommendation from CohortAI Labs. Friendly staff, clear guidance, and the right cohort for your goals."
        />
        <link rel="canonical" href={canonical(location.pathname)} />
        <meta property="og:title" content="Get a Recommendation | CohortAI Labs" />
        <meta
          property="og:description"
          content="Get a personalized AI learning recommendation. Friendly guidance, clear next steps, and a batch schedule that fits you."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical(location.pathname)} />
        <meta property="og:image" content={seoDefaults.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Container>
        <SectionTitle
          eyebrow="Friendly guidance"
          title="We’ll recommend the right track for your goals"
          desc="Our coordinators are friendly, patient, and practical. Share your background and goal—within minutes we’ll suggest the right track, starting cohort, and the best batch schedule."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 card card-3d rounded-3xl p-6">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl p-3 bg-gradient-to-r from-cyan-300/25 via-violet-300/20 to-emerald-300/25 border border-slate-200/70">
                <HeartHandshake className="text-slate-900" />
              </div>
              <div>
                <div className="text-sm text-slate-700">What you can expect</div>
                <div className="mt-1 text-xl font-semibold text-slate-950">
                  Clear answers, zero pressure
                </div>
                <ul className="mt-3 grid gap-2 text-sm text-slate-800">
                  <li className="flex items-start gap-2"><Sparkles size={18} className="mt-0.5 text-cyan-700" /> We understand your background (Beginner / Business / Tech)</li>
                  <li className="flex items-start gap-2"><Sparkles size={18} className="mt-0.5 text-cyan-700" /> We recommend the best starting cohort in your budget</li>
                  <li className="flex items-start gap-2"><Sparkles size={18} className="mt-0.5 text-cyan-700" /> We share timings for your city (online + offline options)</li>
                  <li className="flex items-start gap-2"><Sparkles size={18} className="mt-0.5 text-cyan-700" /> You get a clear plan + next steps</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200/80 bg-white/70 p-5">
              <div className="text-sm font-semibold text-slate-950">Fastest way</div>
              <div className="mt-1 text-sm text-slate-800">
                WhatsApp “AI” with your background + goal + budget. We’ll reply with a recommendation.
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <Button href={wa} target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-2" size={18} />
                  WhatsApp for recommendation
                </Button>
                <Button href={`tel:${site.phone}`} variant="secondary">
                  <Phone className="mr-2" size={18} />
                  Call
                </Button>
                <Button href={`mailto:${email}`} variant="secondary">
                  <Mail className="mr-2" size={18} />
                  Email
                </Button>
              </div>

              <div className="mt-4 text-xs text-slate-600">
                Tip: Mention your city + preferred timing (weekday/weekend).
              </div>
            </div>
          </div>

          <div className="card card-3d rounded-3xl p-6">
            <div className="text-sm text-slate-700">Need a callback?</div>
            <div className="mt-1 text-xl font-semibold text-slate-950">Request a call</div>

            <form name="recommendation" method="POST" data-netlify="true" action="/thanks" className="mt-4 grid gap-3">
              <input type="hidden" name="form-name" value="recommendation" />
              <input className="w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm"
                name="name" placeholder="Full name" required />
              <input className="w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm"
                name="phone" placeholder="Phone / WhatsApp number" required />
              <input className="w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm"
                name="city" placeholder="City (Hyderabad / Pune / …)" />
              <textarea className="w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm"
                name="message" rows={4} placeholder="Background + goal + budget (optional)" />
              <Button type="submit">Get a callback</Button>
              <div className="text-xs text-slate-600">
                Our team usually responds quickly during business hours.
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}
