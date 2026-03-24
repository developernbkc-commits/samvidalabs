# Context - Phase B

## What changed
- Real backend abstraction added for registration and review intake
- Internal email path designed for `registrations@itprofessional.pro`
- Fallback storage preserved so the site never silently loses submissions
- New `/reviews` page added for moderated testimonial intake

## Why this matters
This is the bridge from a premium brochure-like experience into a true operating admissions funnel.

## Guardrails
- final enrollment email must still be admin-triggered after batch allocation
- payment verification should not be implied as complete until webhook/verification exists
- public testimonials must remain moderated
