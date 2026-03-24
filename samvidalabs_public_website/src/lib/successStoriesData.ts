export type SuccessMetric = {
  label: string;
  value: string;
};

export type SuccessStory = {
  id: string;
  name: string;
  role: string;
  city: string;
  profileSegment: 'Everyday AI' | 'Business AI' | 'Tech & Data AI' | string;
  programTrack: string;
  deliveryMode: string;
  timeline: string;
  before: string;
  after: string;
  metrics: SuccessMetric[];
  quote: string;
  proofType: string;
  featured?: boolean;
};

type SuccessStoriesPayload = {
  schemaVersion?: string;
  updatedAt?: string;
  items?: unknown;
};

const isMetric = (value: unknown): value is SuccessMetric => {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return typeof v.label === 'string' && typeof v.value === 'string';
};

const isStory = (value: unknown): value is SuccessStory => {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === 'string' &&
    typeof v.name === 'string' &&
    typeof v.role === 'string' &&
    typeof v.city === 'string' &&
    typeof v.profileSegment === 'string' &&
    typeof v.programTrack === 'string' &&
    typeof v.deliveryMode === 'string' &&
    typeof v.timeline === 'string' &&
    typeof v.before === 'string' &&
    typeof v.after === 'string' &&
    Array.isArray(v.metrics) &&
    v.metrics.every(isMetric) &&
    typeof v.quote === 'string' &&
    typeof v.proofType === 'string'
  );
};

export async function loadSuccessStories(): Promise<SuccessStory[]> {
  try {
    const response = await fetch('/data/success_stories.json', { cache: 'no-store' });
    if (!response.ok) return [];

    const payload = (await response.json()) as SuccessStoriesPayload;
    const items = Array.isArray(payload.items) ? payload.items.filter(isStory) : [];
    return items;
  } catch {
    return [];
  }
}
