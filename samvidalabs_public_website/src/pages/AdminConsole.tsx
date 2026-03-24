import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import { adminRoles, sampleApplicants } from "../lib/catalog";
import { Activity, BadgeCheck, CalendarRange, CreditCard, LayoutDashboard, Shield, UserCog, Users } from "lucide-react";

const tiles = [
  { icon: LayoutDashboard, title: "Dashboard", text: "Admissions funnel, revenue, upcoming batches, conversion by track" },
  { icon: Users, title: "Admissions process", text: "Lead intake, counseling notes, document collection, status changes" },
  { icon: BadgeCheck, title: "Approvals process", text: "Review paid applications, approve or reject, assign counselors" },
  { icon: CreditCard, title: "Registration", text: "Payment verification, learner contracts, refund and reconciliation states" },
  { icon: CalendarRange, title: "Batch allocation", text: "Create batches, assign start dates, slot capacity, mentor mapping" },
  { icon: UserCog, title: "User management", text: "Add, edit, deactivate users with RBAC and audit visibility" },
];

export default function AdminConsole() {
  return (
    <div>
      <section className="pt-12 pb-10">
        <Container>
          <SectionTitle
            eyebrow="Admin console"
            title="A role-based back office for admissions, approvals, registrations, and batch operations"
            desc="This page shows the admin experience the upgraded platform should support. Each function is permission-controlled and optimized for operations rather than marketing."
          />
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6">
              <div className="glass rounded-3xl p-6 ring-soft">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Shield className="text-cyan-200" size={18} />
                  Personalized RBAC
                </div>
                <div className="mt-4 grid gap-3">
                  {adminRoles.map((item) => (
                    <div key={item.role} className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-4">
                      <div className="text-sm font-semibold text-white">{item.role}</div>
                      <div className="mt-1 text-sm text-slate-400">{item.scope}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-3xl p-6 ring-soft">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Activity className="text-emerald-200" size={18} />
                  Operational states
                </div>
                <ul className="mt-4 grid gap-3 text-sm text-slate-300">
                  <li>• New lead</li>
                  <li>• Application in progress</li>
                  <li>• Payment initiated</li>
                  <li>• Paid / under review</li>
                  <li>• Approved / slot pending</li>
                  <li>• Enrolled / email sent</li>
                  <li>• Waitlisted / rejected / refunded</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {tiles.map((tile) => (
                  <div key={tile.title} className="glass rounded-3xl p-5 ring-soft">
                    <tile.icon className="text-cyan-200" size={20} />
                    <div className="mt-4 text-lg font-semibold text-white">{tile.title}</div>
                    <div className="mt-2 text-sm text-slate-400">{tile.text}</div>
                  </div>
                ))}
              </div>

              <div className="glass rounded-3xl p-6 ring-soft overflow-x-auto">
                <div className="text-sm font-semibold text-white">Admissions review queue</div>
                <table className="mt-4 w-full text-sm min-w-[680px]">
                  <thead>
                    <tr className="text-left text-slate-400 border-b border-slate-800/60">
                      <th className="pb-3 pr-4">Applicant</th>
                      <th className="pb-3 pr-4">Program</th>
                      <th className="pb-3 pr-4">Status</th>
                      <th className="pb-3 pr-4">Payment</th>
                      <th className="pb-3">Batch slot</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleApplicants.map((row) => (
                      <tr key={row.name} className="border-b border-slate-900/80 text-slate-200">
                        <td className="py-4 pr-4">{row.name}</td>
                        <td className="py-4 pr-4">{row.track}</td>
                        <td className="py-4 pr-4">{row.status}</td>
                        <td className="py-4 pr-4">{row.payment}</td>
                        <td className="py-4">{row.slot}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
