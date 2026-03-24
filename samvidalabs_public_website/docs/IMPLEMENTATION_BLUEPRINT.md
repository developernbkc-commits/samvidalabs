# CohortAI Labs platform upgrade blueprint

## What this upgrade introduces
- Self-registration with configurable course bundles
- Admin console with admissions, approvals, batch allocation, and RBAC
- UPI-driven payment initiation and verification
- Enrollment confirmation only after admin assigns batch date and slot
- Product-ready information architecture instead of a brochure-only site

## Recommended stack
- Frontend: React + Vite + Tailwind
- Backend: Supabase (Postgres, Auth, RLS, Edge Functions)
- Payments: Razorpay Payment Links or Standard Checkout with UPI enabled
- Email: Resend transactional templates
- Hosting: Netlify or Vercel for frontend, Supabase for data + functions

## Core workflow
1. Learner chooses modules and submits profile details.
2. Application creates a `registration` row with status `draft`.
3. Backend creates a payment link and updates registration to `payment_pending`.
4. UPI payment success is verified through webhook / signature checks.
5. Registration moves to `paid_review_pending`.
6. Admin reviews the candidate and assigns batch + slot.
7. Enrollment email is triggered only after approval and slot allocation.

## Admin modules
- Dashboard
- Admissions process
- Approvals process
- Registrations
- Batch creation and seat allocation
- Users / roles / permissions
- Audit log
- Reports and exports

## Frontend changes included in this ZIP
- New self-registration page
- New admin console page
- New solution blueprint page
- Updated home page and navigation to expose the new flows

## What still needs secrets / infrastructure to go live
- Supabase project URL and anon key
- Service role key for secure backend operations
- Razorpay live/test credentials
- Verified email domain and Resend API key
- DNS / webhook configuration
