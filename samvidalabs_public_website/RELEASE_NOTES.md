# CohortAI Labs upgrade package

## Included
- Self-registration page with modular course builder UI
- Admin console page with RBAC-oriented operational modules
- Platform blueprint page describing the end-to-end admissions + enrollment system
- Navigation and homepage refresh to support product flows
- Database schema starter under `supabase/schema.sql`
- Placeholder edge functions for registration creation, payment verification, and enrollment email
- Implementation blueprint under `docs/IMPLEMENTATION_BLUEPRINT.md`

## Important limitation
This ZIP upgrades the website and includes the data model + backend blueprint, but it is **not fully wired to a live database/payment provider yet** because production credentials and environment variables were not provided.

## To go live
1. Provision Supabase project
2. Apply `supabase/schema.sql`
3. Implement the placeholder functions with real secrets
4. Add Razorpay webhook + callback URLs
5. Add Resend email templates and API key
6. Deploy frontend with environment variables
