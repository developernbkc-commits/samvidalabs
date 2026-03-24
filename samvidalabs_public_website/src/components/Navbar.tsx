import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, PhoneCall, MessageCircleMore } from "lucide-react";
import React from "react";
import { cn } from "../lib/utils";
import Container from "./Container";
import Logo from "./Logo";

const nav = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={cn(
          "mx-auto max-w-[1240px] rounded-[28px] border transition-all duration-300",
          scrolled
            ? "border-white/70 bg-white/92 shadow-[0_22px_70px_rgba(15,23,42,0.14)] backdrop-blur-2xl"
            : "border-slate-200/70 bg-white/84 shadow-[0_16px_50px_rgba(15,23,42,0.10)] backdrop-blur-xl"
        )}
      >
        <Container>
          <div className="flex h-[92px] items-center justify-between gap-4">
            <Link to="/" className="group flex min-w-0 items-center" aria-label="CohortAI Labs home">
              <Logo compact className="origin-left transition duration-300 group-hover:scale-[1.02]" />
            </Link>

            <nav className="hidden items-center gap-2 text-sm lg:flex">
              {nav.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) =>
                    cn(
                      "rounded-full px-4 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-950/6 hover:text-slate-950",
                      isActive && "bg-slate-950 text-white shadow-[0_14px_30px_rgba(15,23,42,0.16)] hover:bg-slate-950 hover:text-white"
                    )
                  }
                >
                  {n.label}
                </NavLink>
              ))}
              <a
                href="/#advisor"
                className="ml-1 inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2.5 text-sm font-semibold text-cyan-900 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-100"
              >
                AI Advisor
              </a>
              <a
                href="https://wa.me/918374617625"
                target="_blank"
                rel="noreferrer"
                className="ml-2 inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 shadow-[0_16px_36px_rgba(86,214,255,0.22)] transition hover:-translate-y-0.5 hover:opacity-95"
              >
                <MessageCircleMore className="mr-2 h-4 w-4" />
                WhatsApp
              </a>
              <a
                href="tel:8374617625"
                className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50"
              >
                <PhoneCall className="mr-2 h-4 w-4" />
                Call
              </a>
            </nav>

            <button
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white/80 p-3 text-slate-700 transition hover:bg-white lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {open && (
            <div className="pb-4 lg:hidden">
              <div className="rounded-[28px] border border-white/80 bg-white/96 p-3 shadow-[0_28px_80px_rgba(15,23,42,0.14)] backdrop-blur-2xl">
                <div className="flex flex-col gap-1">
                  {nav.map((n) => (
                    <NavLink
                      key={n.to}
                      to={n.to}
                      className={({ isActive }) =>
                        cn(
                          "rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950",
                          isActive && "bg-slate-950 text-white"
                        )
                      }
                    >
                      {n.label}
                    </NavLink>
                  ))}
                  <a href="/#advisor" className="rounded-2xl px-4 py-3 text-sm font-semibold text-cyan-900 bg-cyan-50 border border-cyan-200">
                    AI Advisor
                  </a>
                  <a
                    href="https://wa.me/918374617625"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 px-4 py-3 text-sm font-semibold text-slate-950"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          )}
        </Container>
      </div>
    </header>
  );
}
