# Phase B - Supabase + Resend Wiring

## Objective
Move the website from demo/fallback submissions into a real admissions backend.

## Included in this pack
- Registration form wired through a live edge-function abstraction
- Review submission form wired through a live edge-function abstraction
- Expanded Postgres schema for registrations, promo/referral groundwork, testimonials, and auditability
- Supabase Edge Functions for registration intake and review intake
- Resend-backed internal email notification flow for new registrations

## What still needs real credentials
- Supabase project URL and anon key in frontend env
- Supabase service role key in edge function secrets
- Resend API key and sender domain configuration
- Optional payment provider integration for UPI link generation

## Deployment notes
- Frontend still deploys on Netlify the same way
- Supabase Edge Functions must be deployed from the `supabase/functions` directory
- Keep `package-lock.json` out if Netlify is stable without it

## Sequence
1. Create Supabase project
2. Apply `supabase/schema.sql`
3. Set function secrets for service role + Resend
4. Deploy edge functions
5. Add Netlify environment variables from `.env.example`
6. Test registration and review flows
