import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import { Database, GitBranch, Mail, ShieldCheck, Sparkles, Wallet } from "lucide-react";

const pillars = [
  { icon: Database, title: "Admissions CRM + DB", body: "Applications, chosen programs, payments, approvals, batch assignments, mentors, and learner updates stay organized in one place." },
  { icon: Wallet, title: "UPI-first payments", body: "Each registration creates a payable record. Payment success updates the registration state and unlocks admin review." },
  { icon: ShieldCheck, title: "RBAC and approvals", body: "Admissions, finance, mentors, and super admins each see only the functions relevant to their responsibilities." },
  { icon: Mail, title: "Controlled enrollment mails", body: "No auto-enrollment immediately after payment. Final confirmation goes out only after admin allocates a batch date and slot." },
  { icon: GitBranch, title: "Workflow automation", body: "Keep the learner journey clear from application to payment, approval, batch allocation, and final enrollment." },
  { icon: Sparkles, title: "Technology refresh", body: "This is the right moment to move from a brochure-style website into a more complete learning and admissions platform." },
];

const phases = [
  "Phase 1: UX refresh + self-registration + modular catalog",
  "Phase 2: Database schema + authentication + admin RBAC",
  "Phase 3: UPI payment integration + webhook reconciliation",
  "Phase 4: Batch creation, seat allocation, and email templates",
  "Phase 5: Reporting, audit logs, exports, and mentor workspace",
];

export default function Platform() {
  return (
    <div>
      <section className="pt-12 pb-10">
        <Container>
          <SectionTitle
            eyebrow="Solution blueprint"
            title="From marketing website to admissions and enrollment platform"
            desc="The next upgrade is not only about design. It is about making registrations, payments, scheduling, and learner communication smoother for both students and the team."
          />
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {pillars.map((item) => (
              <div key={item.title} className="glass rounded-3xl p-6 ring-soft">
                <item.icon className="text-cyan-200" size={20} />
                <div className="mt-4 text-lg font-semibold text-white">{item.title}</div>
                <div className="mt-2 text-sm text-slate-400">{item.body}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="glass rounded-3xl p-6 ring-soft">
              <div className="text-sm font-semibold text-white">What the platform should manage</div>
              <ul className="mt-4 grid gap-3 text-sm text-slate-300">
                <li>• Learners, teams, and access levels</li>
                <li>• Learner details and contact preferences</li>
                <li>• Programs, course bundles, and optional modules</li>
                <li>• Registrations, payments, and invoices</li>
                <li>• Batches, locations, mentors, and seat allocation</li>
                <li>• Notifications, email templates, and key activity records</li>
              </ul>
            </div>

            <div className="glass rounded-3xl p-6 ring-soft">
              <div className="text-sm font-semibold text-white">Suggested rollout</div>
              <div className="mt-4 grid gap-3">
                {phases.map((phase) => (
                  <div key={phase} className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-4 text-sm text-slate-300">
                    {phase}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
