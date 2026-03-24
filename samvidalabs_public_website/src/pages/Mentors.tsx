import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
import { site } from "../lib/site";
import { imgUrl } from "../lib/images";
import { Helmet } from "react-helmet-async";
import { canonical, seoDefaults } from "../lib/seo";
import { useLocation } from "react-router-dom";

export default function Mentors() {
  
  const location = useLocation();
const mentors = site.images?.mentors || [];
  return (
<div>
  <Helmet>
    <title>Mentors | CohortAI Labs</title>
    <meta name="description" content="Meet CohortAI Labs mentors—experienced industry professionals guiding learners with structured reviews and practical labs." />
    <link rel="canonical" href={canonical(location.pathname)} />
    <meta property="og:title" content="Mentors | CohortAI Labs" />
    <meta property="og:description" content="Meet CohortAI Labs mentors—experienced industry professionals guiding learners with structured reviews and practical labs." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonical(location.pathname)} />
    <meta property="og:image" content={seoDefaults.ogImage} />
    <meta name="twitter:card" content="summary_large_image" />
  </Helmet>

      <section className="pt-12 pb-8">
        <Container>
          <SectionTitle
            eyebrow="Mentors"
            title="Learn from industry-experienced trainers"
            desc="We blend clear teaching with real-world engineering experience—so you build skills you can actually use."
          />
          <div className="mt-6 flex gap-3 flex-col sm:flex-row">
            <Button href="/contact">Get a batch schedule</Button>
            <Button href={`https://wa.me/91${site.whatsapp}`} variant="secondary" target="_blank" rel="noreferrer">
              WhatsApp us
            </Button>
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {mentors.map((m: string, idx: number) => (
              <div key={m} className="card card-3d rounded-3xl p-6">
                <div className="overflow-hidden rounded-2xl border border-slate-200/80 shadow-[0_18px_55px_rgba(15,23,42,0.10)]">
                  <img src={imgUrl(m)} alt={`Mentor ${idx + 1}`} className="h-48 w-full object-cover" />
                </div>
                <div className="mt-4 text-lg font-semibold text-slate-950">Senior Mentor {idx + 1}</div>
                <div className="mt-1 text-sm text-slate-800">20+ years industry experience • Mentor reviews • Practical projects</div>
                <div className="mt-4 text-sm text-slate-800">
                  Placeholder bio: add specialization, company background, and focus area (Everyday / Business / Tech & Data).
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}