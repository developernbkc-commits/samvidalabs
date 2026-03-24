import { site } from "./site";

export function canonical(pathname: string) {
  const base = (site as any).publicSiteUrl || "https://www.itprofessional.pro";
  const clean = pathname === "/" ? "" : pathname;
  return `${base}${clean}`;
}

export const seoDefaults = {
  title: "CohortAI Labs | AI Coaching (Online + Offline)",
  description:
    "Learn AI the practical way with mentor-led cohorts, real projects, and structured reviews. Online + Offline coaching in Hyderabad, Pune, Vijayawada, Guntur, and Vizag. Batches start 2 March 2026.",
  ogImage: "https://raw.githubusercontent.com/developernbkc-commits/cohortai_labs_images/main/og_image.jpg",
};
