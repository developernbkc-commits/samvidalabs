import { site } from "../lib/site";
import { Link } from "react-router-dom";

export default function StickyBar() {
  return (
    <div className="fixed bottom-4 inset-x-0 z-40 px-4 md:hidden">
      <div className="mx-auto max-w-md glass rounded-2xl p-3 ring-soft">
        <div className="flex items-center gap-3">
          <Link
            to="/register"
            className="flex-1 inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 neon-edge"
          >
            Self-register
          </Link>
          <a
            href={`https://wa.me/91${site.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-slate-700/60 px-4 py-3 text-sm font-semibold text-white bg-slate-800/70"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
