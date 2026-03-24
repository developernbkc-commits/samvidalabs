import Container from "../components/Container";
import Button from "../components/Button";
import { site } from "../lib/site";

export default function Thanks() {
  return (
    <div className="py-20">
      <Container>
        <div className="glass rounded-3xl p-10 ring-soft max-w-2xl">
          <div className="text-xs tracking-[0.22em] uppercase text-slate-400">Submitted</div>
          <h1 className="mt-2 text-3xl font-semibold text-white">Thanks! We’ll contact you soon.</h1>
          <p className="mt-3 text-slate-400">
            If you want faster help, WhatsApp us now. Batches start {site.startDate}.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button href={`https://wa.me/91${site.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp us</Button>
            <Button href="/" variant="secondary">Back to Home</Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
