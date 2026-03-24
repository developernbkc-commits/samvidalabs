import React from "react";
import { ChevronDown } from "lucide-react";
import { site } from "../../lib/site";
import { cn } from "../../lib/utils";

export default function FAQ() {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <div className="grid gap-4">
      {site.faqs.map((f, idx) => {
        const isOpen = open === idx;
        return (
          <div key={f.q} className="glass rounded-3xl ring-soft overflow-hidden">
            <button className="w-full flex items-center justify-between gap-4 p-5 text-left" onClick={() => setOpen(isOpen ? null : idx)}>
              <div className="text-sm sm:text-base font-semibold text-white">{f.q}</div>
              <ChevronDown size={18} className={cn("text-slate-400 transition", isOpen && "rotate-180")} />
            </button>
            {isOpen && <div className="px-5 pb-5 text-sm text-slate-400">{f.a}</div>}
          </div>
        );
      })}
    </div>
  );
}
