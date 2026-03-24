import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const payload = await req.json();
    if (!payload.fullName || !payload.email || !payload.courseName || !payload.headline || !payload.reviewText) {
      return json({ error: "Missing required fields" }, 400);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const res = await fetch(`${supabaseUrl}/rest/v1/review_submissions`, {
      method: "POST",
      headers: {
        apikey: serviceRole,
        Authorization: `Bearer ${serviceRole}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        full_name: payload.fullName,
        email: String(payload.email).toLowerCase(),
        city: payload.city || null,
        country: payload.country || null,
        course_name: payload.courseName,
        role_title: payload.roleTitle || null,
        rating: payload.rating || 5,
        headline: payload.headline,
        review_text: payload.reviewText,
        profile_image_url: payload.profileImageUrl || null,
        consent_to_publish: Boolean(payload.consentToPublish),
        moderation_status: "pending_approval",
      }),
    });
    const [review] = await res.json();

    await fetch(`${supabaseUrl}/rest/v1/audit_logs`, {
      method: "POST",
      headers: {
        apikey: serviceRole,
        Authorization: `Bearer ${serviceRole}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        entity_type: "review_submission",
        entity_id: review.id,
        action: "review_submitted",
        details: { rating: payload.rating || 5 },
      }),
    });

    return json({ reviewId: review.id }, 200);
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Unexpected error" }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
