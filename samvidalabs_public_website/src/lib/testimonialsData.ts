export type TestimonialItem = {
  id: string;
  name: string;
  role: string;
  city: string;
  track: "Everyday AI" | "Business AI" | "Tech & Data AI" | "Enterprise" | "General";
  rating: number;
  quote: string;
  source?: string;
  featured?: boolean;
};

export type TestimonialsPayload = {
  version: string;
  updatedAt: string;
  schema: "cohortai.testimonials.v1";
  items: TestimonialItem[];
};

export const fallbackTestimonials: TestimonialsPayload = {
  version: "1.0",
  updatedAt: "2026-02-24",
  schema: "cohortai.testimonials.v1",
  items: [

    {
      id: "t101",
      name: "Anand Balan",
      role: "Technical Lead at KhetiBuddy AgriTech",
      city: "Pune",
      track: "Tech & Data AI",
      rating: 5,
      quote: "Material is so good that it doesn't feel exhaustive or even like putting efforts. I enjoyed it as if I'm watching a Discovery documentary :). I'm handling things very professionally now and I noticed the change in me from the first few days of starting the course.",
      source: "Certificate holder",
      featured: true,
    },
    {
      id: "t102",
      name: "Ajay Cherukuri",
      role: "Software Engineer at Indo Mim Limited",
      city: "Online",
      track: "Tech & Data AI",
      rating: 5,
      quote: "Thank you for the online training provided by Cohort AI Labs. I'm now a different person at work. My productivity skyrocketed and things are much easier now.",
      source: "Certificate holder",
      featured: true,
    },
    {
      id: "t103",
      name: "P. Shankar Raghavendra",
      role: "Aspiring ML Engineer",
      city: "Online",
      track: "Tech & Data AI",
      rating: 5,
      quote: "Thank you all for tailoring the program specially for me. I'm attending interviews with great confidence now and my SaaS project gained momentum during this course.",
      source: "Certificate holder",
      featured: false,
    },
    {
      id: "t104",
      name: "Sai Vineeth Modugavarapu",
      role: "Aspiring Data Scientist",
      city: "Online",
      track: "Tech & Data AI",
      rating: 5,
      quote: "So much information to grasp during the course, but awesome illustrations and practicals made it very easy to understand. Thank you Sasikala Madam.",
      source: "Certificate holder",
      featured: false,
    },

  ],
};

const allowedTracks = new Set(["Everyday AI", "Business AI", "Tech & Data AI", "Enterprise", "General"]);

function normalizeItem(input: unknown): TestimonialItem | null {
  if (!input || typeof input !== "object") return null;
  const row = input as Record<string, unknown>;
  const id = String(row.id ?? "").trim();
  const name = String(row.name ?? "").trim();
  const role = String(row.role ?? "").trim();
  const city = String(row.city ?? "").trim();
  const track = String(row.track ?? "General").trim();
  const quote = String(row.quote ?? "").trim();
  const ratingRaw = Number(row.rating ?? 5);
  const rating = Number.isFinite(ratingRaw) ? Math.max(1, Math.min(5, Math.round(ratingRaw))) : 5;
  const source = row.source ? String(row.source).trim() : undefined;
  const featured = Boolean(row.featured);

  if (!id || !name || !role || !city || !quote) return null;
  if (!allowedTracks.has(track)) return null;

  return {
    id,
    name,
    role,
    city,
    track: track as TestimonialItem["track"],
    quote: quote.slice(0, 420),
    rating,
    source,
    featured,
  };
}

export function sanitizeTestimonialsPayload(input: unknown): TestimonialsPayload {
  if (!input || typeof input !== "object") return fallbackTestimonials;
  const obj = input as Record<string, unknown>;
  const itemsRaw = Array.isArray(obj.items) ? obj.items : [];
  const items = itemsRaw.map(normalizeItem).filter((v): v is TestimonialItem => Boolean(v));

  if (!items.length) return fallbackTestimonials;

  return {
    version: String(obj.version ?? "1.0"),
    updatedAt: String(obj.updatedAt ?? fallbackTestimonials.updatedAt),
    schema: "cohortai.testimonials.v1",
    items,
  };
}

export async function fetchTestimonialsPayload(): Promise<TestimonialsPayload> {
  try {
    const res = await fetch("/data/testimonials.json", { cache: "no-store" });
    if (!res.ok) return fallbackTestimonials;
    const json = (await res.json()) as unknown;
    return sanitizeTestimonialsPayload(json);
  } catch {
    return fallbackTestimonials;
  }
}
