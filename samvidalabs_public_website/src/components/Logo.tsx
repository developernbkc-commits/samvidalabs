import { site } from "../lib/site";

type LogoProps = {
  compact?: boolean;
  size?: "nav" | "hero" | "footer";
  className?: string;
};

export default function Logo({ compact = false, size = "nav", className = "" }: LogoProps) {
  const width = compact ? 320 : size === "hero" ? 420 : size === "footer" ? 320 : 340;
  const height = compact ? 96 : size === "hero" ? 118 : size === "footer" ? 98 : 104;

  return (
    <div className={`flex items-center ${className}`.trim()}>
      <img
        src={site.logoUrl || "/logo.svg"}
        alt={site.brand}
        className="shrink-0 object-contain object-left drop-shadow-[0_16px_40px_rgba(15,23,42,0.16)]"
        style={{ width, height }}
      />
    </div>
  );
}
