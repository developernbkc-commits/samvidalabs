export default function SectionTitle({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="max-w-3xl">
      <div className="text-xs tracking-[0.24em] uppercase text-slate-500">{eyebrow}</div>
      <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-950 text-balance">{title}</h2>
      {desc && <p className="mt-4 text-slate-600 text-sm sm:text-base leading-7">{desc}</p>}
    </div>
  );
}
