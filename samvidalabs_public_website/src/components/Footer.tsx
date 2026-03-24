import Container from "./Container";
import Logo from "./Logo";
import { site } from "../lib/site";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-white/70 backdrop-blur-xl">
      <Container>
        <div className="py-10 grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <Logo size="footer" />
            <p className="text-sm text-slate-600 max-w-sm leading-7">
              Mentor-led cohorts. Real projects. Hybrid learning. Built for beginners and professionals alike.
            </p>
          </div>
          <div className="text-sm">
            <div className="font-semibold text-slate-900 mb-3">Quick Links</div>
            <div className="grid gap-2 text-slate-600">
              <Link to="/courses" className="hover:text-slate-950">Courses</Link>
              <Link to="/about" className="hover:text-slate-950">About</Link>
              <Link to="/register" className="hover:text-slate-950">Register</Link>
              <Link to="/platform" className="hover:text-slate-950">Platform</Link>
              <Link to="/admin" className="hover:text-slate-950">Admin</Link>
              <Link to="/contact" className="hover:text-slate-950">Contact</Link>
              <Link to="/sitemap" className="hover:text-slate-950">Sitemap</Link>
            </div>
          </div>
          <div className="text-sm">
            <div className="font-semibold text-slate-900 mb-3">Get in touch</div>
            <div className="grid gap-2 text-slate-600">
              <a className="hover:text-slate-950" href={`tel:${site.phone}`}>Call: {site.phone}</a>
              <a className="hover:text-slate-950" href={`https://wa.me/91${site.whatsapp}`} target="_blank" rel="noreferrer">
                WhatsApp: +91 {site.whatsapp}
              </a>
              <div>Locations: {site.cities.join(" • ")}</div>
              <div>Online cohorts: Available worldwide</div>
              <div>Batches start: {site.startDate}</div>
            </div>
          </div>
        </div>
        <div className="pb-10 text-xs text-slate-500">
          © {new Date().getFullYear()} {site.brand}. All rights reserved. This website is powered by Samvida Labs.
        </div>
      </Container>
    </footer>
  );
}
