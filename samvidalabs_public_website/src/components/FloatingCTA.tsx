import { Phone, MessageCircle, CalendarCheck } from "lucide-react";
import { site } from "../lib/site";

export default function FloatingCTA() {
  return (
    <>
      {/* Desktop floating stack */}
      <div className="hidden sm:flex fixed bottom-5 right-5 z-50 flex-col gap-3">
        <a
          href="/recommendation"
          className="card card-3d flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-slate-950 accent-ring"
          aria-label="Book Free Counselling"
        >
          <CalendarCheck size={18} className="text-violet-600" />
          Free Counselling
        </a>

        <a
          href={`https://wa.me/91${site.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="card card-3d flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-slate-950 accent-ring"
          aria-label="WhatsApp CohortAI Labs"
        >
          <MessageCircle size={18} className="text-emerald-600" />
          WhatsApp
        </a>

        <a
          href={`tel:${site.phone}`}
          className="flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 hover:opacity-95 transition accent-ring"
          aria-label="Call CohortAI Labs"
          title={`Call ${site.phone}`}
        >
          <Phone size={18} />
          Call
        </a>
      </div>

      {/* Mobile sticky bar */}
      <div className="sm:hidden fixed inset-x-3 bottom-3 z-50">
        <div className="card rounded-2xl p-2 shadow-[0_20px_50px_rgba(15,23,42,0.22)]">
          <div className="grid grid-cols-3 gap-2">
            <a
              href="/recommendation"
              className="inline-flex items-center justify-center gap-1 rounded-xl px-2 py-2.5 text-xs font-semibold text-slate-950 bg-white/80 border border-slate-200/80"
            >
              <CalendarCheck size={15} className="text-violet-600" />
              Counselling
            </a>
            <a
              href={`https://wa.me/91${site.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1 rounded-xl px-2 py-2.5 text-xs font-semibold text-slate-950 bg-white/80 border border-slate-200/80"
            >
              <MessageCircle size={15} className="text-emerald-600" />
              WhatsApp
            </a>
            <a
              href={`tel:${site.phone}`}
              className="inline-flex items-center justify-center gap-1 rounded-xl px-2 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300"
              title={`Call ${site.phone}`}
            >
              <Phone size={15} />
              Call
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
