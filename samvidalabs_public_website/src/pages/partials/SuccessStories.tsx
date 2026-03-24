import { useEffect, useMemo, useState } from 'react';
import { Quote, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import Container from '../../components/Container';
import SectionTitle from '../../components/SectionTitle';
import { loadSuccessStories, type SuccessStory } from '../../lib/successStoriesData';

const segmentBadgeClass = (segment: string) => {
  if (segment.includes('Business')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (segment.includes('Tech')) return 'bg-violet-50 text-violet-700 border-violet-200';
  return 'bg-cyan-50 text-cyan-700 border-cyan-200';
};

export default function SuccessStories() {
  const [stories, setStories] = useState<SuccessStory[]>([]);

  useEffect(() => {
    let active = true;
    loadSuccessStories().then((data) => {
      if (active) setStories(data);
    });
    return () => {
      active = false;
    };
  }, []);

  const featuredStories = useMemo(
    () => stories.filter((s) => s.featured).slice(0, 3),
    [stories]
  );

  const stats = useMemo(() => {
    const cities = new Set(stories.map((s) => s.city));
    const tracks = new Set(stories.map((s) => s.programTrack));
    return {
      count: stories.length,
      cities: cities.size,
      tracks: tracks.size,
    };
  }, [stories]);

  if (!stories.length) return null;

  return (
    <section className="py-14 border-t border-slate-200/70">
      <Container>
        <SectionTitle
          eyebrow="Proof of outcomes"
          title="Real learner journeys and the outcomes they are proud of"
          subtitle="Each story highlights where a learner started, what changed during the program, and the practical outcomes they can now carry into work, interviews, or future study."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="card p-5">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 border border-cyan-200">
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="mt-3 text-sm text-slate-500">Stories loaded</p>
            <p className="text-2xl font-semibold text-slate-900">{stats.count}</p>
          </div>
          <div className="card p-5">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200">
              <TrendingUp className="h-5 w-5" />
            </div>
            <p className="mt-3 text-sm text-slate-500">Cities represented</p>
            <p className="text-2xl font-semibold text-slate-900">{stats.cities}</p>
          </div>
          <div className="card p-5">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-50 text-violet-700 border border-violet-200">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <p className="mt-3 text-sm text-slate-500">Tracks covered</p>
            <p className="text-2xl font-semibold text-slate-900">{stats.tracks}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {featuredStories.map((story) => (
            <article key={story.id} className="card p-5 md:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-slate-900">{story.name}</p>
                  <p className="text-sm text-slate-600">
                    {story.role} • {story.city}
                  </p>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${segmentBadgeClass(
                    story.profileSegment
                  )}`}
                >
                  {story.profileSegment}
                </span>
              </div>

              <div className="mt-4 grid gap-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Before</p>
                  <p className="mt-1 text-sm text-slate-700">{story.before}</p>
                </div>
                <div className="rounded-2xl border border-cyan-100 bg-cyan-50/50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">After</p>
                  <p className="mt-1 text-sm text-slate-800">{story.after}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {story.metrics.slice(0, 3).map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-3">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">{metric.label}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{metric.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                  Proof • {story.proofType}
                </p>
                <div className="mt-2 flex gap-2">
                  <Quote className="h-4 w-4 shrink-0 text-emerald-700" />
                  <p className="text-sm text-slate-800">{story.quote}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 card p-4 md:p-5">
          <p className="text-sm text-slate-700">
            <span className="font-semibold text-slate-900">Why this matters:</span> clear learner stories help future students, working professionals, and career switchers understand what they can realistically expect from the learning journey.
          </p>
        </div>
      </Container>
    </section>
  );
}
