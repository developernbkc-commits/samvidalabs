import { edgeFunctionUrl, env, hasPhaseBBackend } from "./env";

export type RegistrationPayload = {
  fullName: string;
  email: string;
  phoneCountryCode: string;
  phoneNationalNumber: string;
  country: string;
  preferredMode: string;
  modules: string[];
  learnerGoal: string;
  promoCode?: string;
  referralCode?: string;
  leadSource?: string;
};

export type ReviewPayload = {
  fullName: string;
  email: string;
  city?: string;
  country?: string;
  courseName: string;
  roleTitle?: string;
  rating: number;
  headline: string;
  reviewText: string;
  profileImageUrl?: string;
  consentToPublish: boolean;
};

export type ApiResult<T> = {
  ok: boolean;
  mode: "remote" | "fallback";
  data?: T;
  error?: string;
};

function persistFallback<T extends object>(key: string, payload: T) {
  if (typeof window === "undefined") return;
  const current = JSON.parse(window.localStorage.getItem(key) || "[]");
  current.push({ ...payload, savedAt: new Date().toISOString() });
  window.localStorage.setItem(key, JSON.stringify(current));
}

async function postJson<T>(functionName: string, payload: unknown): Promise<T> {
  const res = await fetch(edgeFunctionUrl(functionName), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: env.supabaseAnonKey,
      Authorization: `Bearer ${env.supabaseAnonKey}`,
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json?.error || `Request failed: ${res.status}`);
  }
  return json as T;
}

export async function submitRegistration(payload: RegistrationPayload): Promise<ApiResult<{ registrationId?: string; paymentUrl?: string }>> {
  if (!hasPhaseBBackend()) {
    persistFallback("cohortai_phaseb_registrations", payload);
    return {
      ok: true,
      mode: "fallback",
      data: {},
    };
  }

  try {
    const data = await postJson<{ registrationId: string; paymentUrl?: string }>("create-registration", payload);
    return { ok: true, mode: "remote", data };
  } catch (error) {
    persistFallback("cohortai_phaseb_registrations_failed_remote", payload);
    return { ok: false, mode: "fallback", error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function submitReview(payload: ReviewPayload): Promise<ApiResult<{ reviewId?: string }>> {
  if (!hasPhaseBBackend()) {
    persistFallback("cohortai_phaseb_reviews", payload);
    return {
      ok: true,
      mode: "fallback",
      data: {},
    };
  }

  try {
    const data = await postJson<{ reviewId: string }>("submit-review", payload);
    return { ok: true, mode: "remote", data };
  } catch (error) {
    persistFallback("cohortai_phaseb_reviews_failed_remote", payload);
    return { ok: false, mode: "fallback", error: error instanceof Error ? error.message : "Unknown error" };
  }
}
