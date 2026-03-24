import { useEffect, useMemo, useState } from 'react';
import { BarChart3, Briefcase, Building2, Calculator, ShieldCheck } from 'lucide-react';
import { loadEnterpriseOffers, type EnterpriseOffer } from '../../lib/enterpriseOffersData';

type ProgramGoal = 'ai-readiness' | 'productivity' | 'department-rollout';

const goalLabels: Record<ProgramGoal, string> = {
  'ai-readiness': 'AI readiness',
  productivity: 'Productivity boost',
  'department-rollout': 'Department rollout',
};

const goalMultiplier: Record<ProgramGoal, number> = {
  'ai-readiness': 0.9,
  productivity: 1.25,
  'department-rollout': 1.5,
};

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

export default function EnterpriseROIEstimator() {
  const [teamSize, setTeamSize] = useState(50);
  const [hoursPerWeekSaved, setHoursPerWeekSaved] = useState(2);
  const [goal, setGoal] = useState<ProgramGoal>('productivity');
  const [offers, setOffers] = useState<EnterpriseOffer[]>([]);

  useEffect(() => {
    let active = true;
    loadEnterpriseOffers().then((data) => {
      if (active) setOffers(data);
    });
    return () => {
      active = false;
    };
  }, []);

  const roi = useMemo(() => {
    const multiplier = goalMultiplier[goal];
    const effectiveWeeklyHours = teamSize * hoursPerWeekSaved * multiplier;
    const monthlyHours = Math.round(effectiveWeeklyHours * 4.33);

    const recommendedProgram =
      teamSize <= 40
        ? 'AI Readiness Bootcamp'
        : goal === 'department-rollout'
        ? 'Capability Transformation Program'
        : 'Role-Based AI Academy';

    const cohortBands = clamp(Math.ceil(teamSize / 25), 1, 12);
    const deliveryModel =
      teamSize > 100 || goal === 'department-rollout' ? 'Hybrid (onsite + online)' : 'Online or Hybrid';

    return {
      monthlyHours,
      recommendedProgram,
      cohortBands,
      deliveryModel,
    };
  }, [goal, hoursPerWeekSaved, teamSize]);

  return (
    <section className="py-14 border-t border-slate-200/70">
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="card p-5 md:p-6">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 border border-cyan-200">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900">Enterprise ROI snapshot (pre-quote)</p>
              <p className="text-sm text-slate-600">
                A quick planning estimator to help enterprise buyers qualify scope before requesting a quote.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-6">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">Team size</span>
                <span className="font-semibold text-slate-900">{teamSize} learners</span>
              </div>
              <input
                type="range"
                min={10}
                max={300}
                step={5}
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full accent-cyan-500"
              />
              <div className="mt-1 flex justify-between text-xs text-slate-500">
                <span>10</span>
                <span>300+</span>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">Target time saved per learner / week</span>
                <span className="font-semibold text-slate-900">{hoursPerWeekSaved} hrs</span>
              </div>
              <input
                type="range"
                min={1}
                max={8}
                step={1}
                value={hoursPerWeekSaved}
                onChange={(e) => setHoursPerWeekSaved(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <div className="mt-1 flex justify-between text-xs text-slate-500">
                <span>1 hr</span>
                <span>8 hrs</span>
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-slate-700">Primary goal</p>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(goalLabels) as ProgramGoal[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setGoal(key)}
                    className={`rounded-full border px-3 py-2 text-sm transition ${
                      goal === key
                        ? 'border-cyan-300 bg-cyan-50 text-cyan-700'
                        : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    {goalLabels[key]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="card p-5 md:p-6">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-50 text-violet-700 border border-violet-200">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900">Planning output</p>
              <p className="text-sm text-slate-600">Use this as a business-case starter in internal discussions.</p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Estimated monthly productivity impact</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">~{roi.monthlyHours} hours saved</p>
              <p className="mt-1 text-xs text-slate-500">Illustrative estimate to support scoping conversations.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Recommended program</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">{roi.recommendedProgram}</p>
              <p className="mt-1 text-sm text-slate-600">Delivery model: {roi.deliveryModel}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Suggested execution shape</p>
              <p className="mt-1 text-sm text-slate-700">{roi.cohortBands} cohort band(s) with role-based groups + checkpoints.</p>
            </div>
          </div>
        </div>
      </div>

      {offers.length > 0 && (
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {offers.map((offer) => (
            <article
              key={offer.id}
              className={`card p-5 ${offer.featured ? 'ring-1 ring-cyan-200/80 shadow-[0_18px_45px_-30px_rgba(34,211,238,0.5)]' : ''}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-slate-900">{offer.name}</p>
                  <p className="mt-1 text-sm text-slate-600">{offer.audience}</p>
                </div>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700">
                  {offer.id.includes('capability') ? (
                    <Building2 className="h-5 w-5" />
                  ) : offer.id.includes('academy') ? (
                    <Briefcase className="h-5 w-5" />
                  ) : (
                    <ShieldCheck className="h-5 w-5" />
                  )}
                </div>
              </div>

              <div className="mt-4 grid gap-2 text-sm text-slate-700">
                <p>
                  <span className="font-semibold text-slate-900">Timeline:</span> {offer.timeline}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Format:</span> {offer.format}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {offer.delivery.map((mode) => (
                    <span key={mode} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700">
                      {mode}
                    </span>
                  ))}
                </div>
              </div>

              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {offer.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-500" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-3 text-sm text-emerald-800">
                Quote mode: <span className="font-semibold">Custom pricing after needs discovery</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
