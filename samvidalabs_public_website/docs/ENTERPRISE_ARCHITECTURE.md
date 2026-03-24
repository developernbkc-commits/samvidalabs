# Enterprise-grade Architecture Notes

## Current target shape
- Premium marketing site on Netlify
- Operational data and workflows on Supabase
- Transactional email on Resend
- Admin / LMS modules to be added on the same domain as route-based modules

## Architectural stance
Start as a modular monolith, not a fragmented microservice estate.

### Module boundaries
- marketing
- registration
- admissions
- reviews
- gamification
- admin
- lms
- notifications
- identity & rbac

## SOLID application guidance
- Single Responsibility: each page submits through dedicated service modules, not embedded fetch logic everywhere
- Open/Closed: add new intake flows through new edge functions, without rewriting existing ones
- Liskov: keep domain contracts stable and typed between UI and backend
- Interface Segregation: separate registration payloads, review payloads, payment payloads, and admin payloads
- Dependency Inversion: UI depends on `src/lib/api.ts`, not direct backend implementation details

## Security baseline
- RLS on all user-owned and admin-owned records
- service-role only inside edge functions
- audit logs for admin actions
- explicit moderation workflow for public proof
- rate limiting and CAPTCHA next
