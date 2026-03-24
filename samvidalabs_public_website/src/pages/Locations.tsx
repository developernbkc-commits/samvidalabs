import { MapPin, Calendar, Clock, Phone, Mail, MessageCircle } from "lucide-react";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
import { site } from "../lib/site";
import { useSchedule } from "../lib/schedule";
import { Helmet } from "react-helmet-async";
import { canonical, seoDefaults } from "../lib/seo";
import { useLocation } from "react-router-dom";

export default function Locations() {
  const location = useLocation();
  const schedule = useSchedule();
  const cities: string[] = site.cities;

  const email = (site as any).email || "info.cohortai.labs@itprofessional.pro";

  function wa(city: string) {
    const msg = encodeURIComponent(
      `Hi CohortAI Labs! Please share the batch timings, fee ladder, and seat availability for ${city}. My background: _____.`
    );
    return `https://wa.me/91${site.whatsapp}?text=${msg}`;
  }

  return (
    <div className="pt-12 pb-16">
      <Helmet>
        <title>Locations & Schedule | CohortAI Labs</title>
        <meta
          name="description"
          content="Find CohortAI Labs locations and upcoming batches in Hyderabad, Vijayawada, Guntur, Visakhapatnam and Pune. Online + Offline options."
        />
        <link rel="canonical" href={canonical(location.pathname)} />
        <meta property="og:title" content="Locations & Schedule | CohortAI Labs" />
        <meta
          property="og:description"
          content="Upcoming AI coaching batches across Hyderabad, Vijayawada, Guntur, Visakhapatnam and Pune. Online + Offline options."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical(location.pathname)} />
        <meta property="og:image" content={seoDefaults.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Container>
        <SectionTitle
          eyebrow="Locations + schedule"
          title="Choose your city. We’ll share timings & seat availability."
          desc="We run hybrid cohorts (online + offline) with weekend and weekday options. Timings may vary by city—message us and we’ll recommend the best batch."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2 card card-3d rounded-3xl p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {cities.map((city) => (
                <div key={city} className="rounded-3xl border border-slate-200/80 bg-white/80 p-5">
                  <div className="flex items-center gap-2 text-slate-950 font-semibold">
                    <MapPin size={18} className="text-cyan-700" />
                    {city}
                  </div>

                  <div className="mt-3 grid gap-2 text-sm text-slate-800">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-slate-600" />
                      <span>
                        Next batch:{" "}
                        <span className="font-semibold text-slate-950">
                          {(schedule.byCity && schedule.byCity[city]) || "TBD"}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-slate-600" />
                      <span>Weekend + weekday options • Online + Offline</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <Button href={wa(city)} target="_blank" rel="noreferrer">
                      <MessageCircle className="mr-2" size={18} />
                      Get timings
                    </Button>
                    <Button href={`tel:${site.phone}`} variant="secondary">
                      <Phone className="mr-2" size={18} />
                      Call
                    </Button>
                  </div>

                  <div className="mt-3 text-xs text-slate-600">
                    Tip: Share your background (Beginner / Business / Tech) for a faster recommendation.
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card card-3d rounded-3xl p-6">
            <div className="text-sm text-slate-700">Quick actions</div>
            <div className="mt-2 text-xl font-semibold text-slate-950">Talk to us</div>
            <p className="mt-2 text-sm text-slate-800">
              Get the latest schedule, pricing ladder, and recommended track.
            </p>

            <div className="mt-5 grid gap-2">
              <Button href={`https://wa.me/91${site.whatsapp}`} target="_blank" rel="noreferrer">
                <MessageCircle className="mr-2" size={18} />
                WhatsApp “AI”
              </Button>
              <Button href={`tel:${site.phone}`} variant="secondary">
                <Phone className="mr-2" size={18} />
                Call {site.phone}
              </Button>
              <Button href={`mailto:${email}`} variant="secondary">
                <Mail className="mr-2" size={18} />
                Email us
              </Button>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white/70 p-4 text-sm text-slate-800">
              <div className="font-semibold text-slate-950">What to ask</div>
              <ul className="mt-2 grid gap-1">
                <li>• Weekend vs weekday batch timing</li>
                <li>• Online vs offline availability in your city</li>
                <li>• Track recommendation + course ladder</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
