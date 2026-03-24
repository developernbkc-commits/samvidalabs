import React from "react";
import { cn } from "../lib/utils";

export default function Button({
  children,
  href,
  variant = "primary",
  className,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: "primary" | "secondary" }) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950";
  const styles =
    variant === "primary"
      ? "text-slate-950 bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 hover:opacity-95 focus:ring-cyan-200 neon-edge"
      : "text-white bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/60 focus:ring-slate-500";

  return (
    <a href={href} className={cn(base, styles, className)} {...rest}>
      {children}
    </a>
  );
}
