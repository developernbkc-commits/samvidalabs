export type EnterpriseOffer = {
  id: string;
  name: string;
  audience: string;
  timeline: string;
  delivery: string[];
  format: string;
  outcomes: string[];
  quoteMode: 'custom' | string;
  featured?: boolean;
};

type EnterpriseOffersPayload = {
  schemaVersion?: string;
  updatedAt?: string;
  currency?: string;
  packages?: unknown;
};

const isOffer = (value: unknown): value is EnterpriseOffer => {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === 'string' &&
    typeof v.name === 'string' &&
    typeof v.audience === 'string' &&
    typeof v.timeline === 'string' &&
    Array.isArray(v.delivery) &&
    v.delivery.every((d) => typeof d === 'string') &&
    typeof v.format === 'string' &&
    Array.isArray(v.outcomes) &&
    v.outcomes.every((o) => typeof o === 'string') &&
    typeof v.quoteMode === 'string'
  );
};

export async function loadEnterpriseOffers(): Promise<EnterpriseOffer[]> {
  try {
    const response = await fetch('/data/enterprise_offers.json', { cache: 'no-store' });
    if (!response.ok) return [];
    const payload = (await response.json()) as EnterpriseOffersPayload;
    return Array.isArray(payload.packages) ? payload.packages.filter(isOffer) : [];
  } catch {
    return [];
  }
}
