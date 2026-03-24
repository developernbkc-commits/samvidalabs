import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import { site } from "../lib/site";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { canonical } from "../lib/seo";

export default function AdminSchedule() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const key = params.get("key");
  const required = (site as any).adminKey || "cohortai-admin-2026";

  const scheduleUrl = (site as any).scheduleUrl || "https://raw.githubusercontent.com/developernbkc-commits/cohortai_labs_images/main/schedule.json";

  return (
    <div className="pt-12 pb-16">
      <Helmet>
        <title>Admin | Schedule</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={canonical(location.pathname)} />
      </Helmet>

      <Container>
        <SectionTitle
          eyebrow="Admin (internal)"
          title="Schedule update instructions"
          desc="This page is not meant for public users. If you are not an admin, exit."
        />

        {key !== required ? (
          <div className="mt-8 card rounded-3xl p-6 text-slate-800">
            Not authorized.
          </div>
        ) : (
          <div className="mt-8 card rounded-3xl p-6">
            <div className="text-sm text-slate-700">Update this JSON in your images repo</div>
            <div className="mt-2 font-mono text-xs break-all text-slate-800">{scheduleUrl}</div>

            <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white/70 p-4">
              <div className="text-sm font-semibold text-slate-950">Template</div>
              <pre className="mt-2 text-xs overflow-auto text-slate-800">{`{
  "updatedAt": "2026-02-21",
  "byCity": {
    "Hyderabad": "2 March 2026",
    "Pune": "TBD",
    "Vijayawada": "TBD",
    "Guntur": "TBD",
    "Vizag": "TBD"
  }
}`}</pre>
            </div>

            <div className="mt-4 text-sm text-slate-800">
              After updating, refresh the site. The app caches schedule in localStorage—hard refresh if needed.
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
