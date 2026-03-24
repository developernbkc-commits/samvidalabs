import { site } from "../lib/site";
import { Clock3, Phone, Sparkles } from "lucide-react";

type SeatRow = {
  city: string;
  seatsLeft: number;
  batch: string;
  mode: string;
  status?: "open" | "fast-filling" | "priority" | string;
};

function badgeClass(status?: string) {
  if (status === "fast-filling") return "bg-amber-50 text-amber-700 border-amber-200";
  if (status === "priority") return "bg-violet-50 text-violet-700 border-violet-200";
  return "bg-emerald-50 text-emerald-700 border-emerald-200";
}

export default function SeatAvailabilityPanel({ compact = false }: { compact?: boolean }) {
  const rows = (((site as any).seatAvailability as SeatRow[]) || []).slice(0, compact ? 3 : 5);

  if (!rows.length) return null;

  return (
    <div className="card rounded-3xl p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-700">
            <Sparkles size={14} className="text-cyan-700" />
            Seats & cohorts
          </div>
          <h3 className="mt-3 text-lg sm:text-xl font-semibold text-slate-950">
            Fast-filling batches across cities
          </h3>
          <p className="mt-2 text-sm text-slate-700">
            Seat counts are planning indicators. Call/WhatsApp for the latest availability before payment.
          </p>
        </div>
        <a
          href={`tel:${site.phone}`}
          className="hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-200 via-violet-200 to-emerald-200 accent-ring"
        >
          <Phone size={16} />
          Call now
        </a>
      </div>

      <div className="mt-5 grid gap-3">
        {rows.map((row) => (
          <div key={row.city} className="rounded-2xl border border-slate-200/80 bg-white/80 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-slate-950">{row.city}</div>
                <div className="mt-1 text-xs text-slate-600 flex items-center gap-1.5">
                  <Clock3 size={14} />
                  {row.batch} • {row.mode}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-semibold text-slate-950">{row.seatsLeft}</div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-slate-600">Seats left</div>
              </div>
            </div>
            <div className="mt-3 h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400"
                style={{ width: `${Math.max(12, Math.min(100, row.seatsLeft * 5))}%` }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-2">
              <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${badgeClass(row.status)}`}>
                {row.status === "fast-filling" ? "Fast filling" : row.status === "priority" ? "Priority city" : "Open"}
              </span>
              <a
                href={`https://wa.me/91${site.whatsapp}?text=${encodeURIComponent(`Hi CohortAI Labs, please share current seat availability for ${row.city} (${row.batch}).`)}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-slate-700 hover:text-slate-950"
              >
                Check on WhatsApp →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
