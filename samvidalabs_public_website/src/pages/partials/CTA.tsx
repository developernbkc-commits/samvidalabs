import Container from "../../components/Container";
import Button from "../../components/Button";
import { site } from "../../lib/site";

export default function CTA() {
  return (
    <section className="py-16 border-t border-slate-800/60">
      <Container>
        <div className="glass rounded-[28px] p-8 sm:p-10 ring-soft">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="text-xs tracking-[0.22em] uppercase text-slate-400">Ready to start?</div>
              <div className="mt-2 text-3xl font-semibold text-white text-balance">
                Reserve your seat for the {site.startDate} cohort.
              </div>
              <div className="mt-3 text-slate-400">
                DM “AI” on WhatsApp or submit the contact form for a recommended starting level.
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
              <Button href="/contact">Get batch schedule</Button>
              <Button href={`https://wa.me/91${site.whatsapp}`} variant="secondary" target="_blank" rel="noreferrer">
                WhatsApp +91 {site.whatsapp}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
