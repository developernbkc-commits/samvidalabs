import Container from "./Container";
import SectionTitle from "./SectionTitle";
import { site } from "../lib/site";
import { imgUrl } from "../lib/images";
import { motion } from "framer-motion";
import { PLACEHOLDER_IMG } from "../lib/placeholders";

export default function GalleryStrip() {
  const imgs: string[] = (site as any).images?.gallery || [];
  return (
    <section className="py-14 section-divider">
      <Container>
        <SectionTitle
          eyebrow="Campus + learning moments"
          title="Visual proof that the experience is real, active, and mentor-led"
          desc="We restored this useful visual content lane from the baseline so the site can show classrooms, demos, reviews, and learning energy instead of only text blocks."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {imgs.map((f, idx) => (
            <motion.div
              key={f || idx}
              className="glass-pearl interactive-card overflow-hidden rounded-3xl border border-white/70"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
            >
              <div className="h-48 bg-white">
                <img
                  src={f ? imgUrl(f) : PLACEHOLDER_IMG}
                  alt="Gallery"
                  className="h-48 w-full object-cover transition duration-500 hover:scale-105"
                  onError={(e) => ((e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMG)}
                />
              </div>

              <div className="p-4">
                <div className="text-xs tracking-[0.22em] uppercase text-slate-500">Proof moment {idx + 1}</div>
                <div className="mt-2 text-sm font-semibold text-slate-950">Premium learning environment</div>
                <div className="mt-1 text-sm leading-6 text-slate-600">
                  Real classrooms, hybrid sessions, review checkpoints, and project showcases build trust faster than claims alone.
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
