import { HeroSceneShell } from "@/components/hero-scene-shell";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  CircleDollarSign,
  Leaf,
  MapPinned,
  Radar,
  ShieldCheck,
  Sprout,
} from "lucide-react";

type CardItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const stats = [
  {
    value: "24-36",
    label: "estimated annual credits",
    note: "Already discounted for leakage, uncertainty, and buffer reserves.",
  },
  {
    value: "89%",
    label: "mock MRV completeness",
    note: "Field logs, input records, baseline history, and sampling notes aligned.",
  },
  {
    value: "$350",
    label: "sample net payout",
    note: "Demo economics after platform and verifier deductions.",
  },
];

const pillars: CardItem[] = [
  {
    icon: MapPinned,
    title: "Field-first intake",
    description:
      "Capture hectares, crop history, tillage, nitrogen, livestock, and soil signals before the platform ever shows a flashy number.",
  },
  {
    icon: Radar,
    title: "Scenario simulation",
    description:
      "Switch on cover crops, lower nitrogen, or move toward no-till and compare baseline versus project outcomes with immediate visual feedback.",
  },
  {
    icon: ShieldCheck,
    title: "Verification posture",
    description:
      "Translate calculations into evidence checklists so the product reflects how real MRV workflows work instead of pretending the dashboard alone is enough.",
  },
];

const workflow = [
  {
    step: "01",
    title: "Measure the baseline",
    description:
      "Start from current practice, not aspiration. The baseline combines fuel, fertilizer, livestock, and current removals into a conservative farm carbon balance.",
  },
  {
    step: "02",
    title: "Model the new practice",
    description:
      "Apply better practices such as cover crops, nitrogen optimization, or reduced tillage and recalculate emissions plus sequestration under the project scenario.",
  },
  {
    step: "03",
    title: "Discount to credible volume",
    description:
      "Subtract leakage, uncertainty, and permanence buffers so the estimated credits shown on screen feel grounded in real market logic.",
  },
];

const formulaCards = [
  {
    label: "Net farm balance",
    expression: "net balance = total emissions - total removals",
  },
  {
    label: "Gross climate benefit",
    expression:
      "gross benefit = (baseline emissions - baseline removals) - (project emissions - project removals)",
  },
  {
    label: "Issuable credits",
    expression:
      "credits = max(0, gross benefit - leakage - uncertainty - buffer - ineligible adjustments)",
  },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-5 pb-16 pt-5 sm:px-8 lg:px-10">
        <header className="glass-panel sticky top-4 z-30 flex items-center justify-between rounded-full px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-[#10281f] text-[#f7ebcf] shadow-[0_12px_30px_rgba(16,40,31,0.24)]">
              <Leaf className="size-5" strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#315b4a]">
                TerraYield
              </p>
              <p className="text-sm text-[#647a6f]">Farm Carbon Readiness</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-[#41594f] md:flex">
            <a href="#experience">Experience</a>
            <a href="#workflow">Workflow</a>
            <a href="#formula">Formula</a>
          </nav>

          <a
            href="#pilot"
            className="hidden rounded-full border border-[#15352b]/10 bg-[#fff7ea]/85 px-5 py-2 text-sm font-medium text-[#173329] shadow-[0_10px_30px_rgba(31,48,39,0.08)] transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
          >
            Book the pilot
          </a>
        </header>

        <div className="grid flex-1 items-center gap-12 pb-8 pt-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:pt-20">
          <div className="animate-rise space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#173329]/8 bg-[#fff8ee]/85 px-4 py-2 text-sm text-[#3f5b4f] shadow-[0_12px_30px_rgba(32,49,40,0.06)]">
              <span className="signal-dot" />
              Mock phase 01: immersive concept landing page
            </div>

            <div className="space-y-6">
              <p className="section-label">A cinematic carbon cockpit for farms</p>
              <h1 className="max-w-4xl font-display text-6xl leading-[0.92] text-[#14231d] sm:text-7xl xl:text-[6.35rem]">
                Proof-first carbon software that feels more like a control room
                than a spreadsheet.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[#486056] sm:text-xl">
                TerraYield helps farmers map the baseline, simulate practice
                changes, and understand projected credit potential before any
                verifier or registry ever enters the conversation.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#pilot"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#123127] px-6 py-3 text-sm font-medium text-[#f8edd3] shadow-[0_18px_40px_rgba(18,49,39,0.22)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Start the concept build
                <ArrowRight className="size-4" strokeWidth={1.9} />
              </a>
              <a
                href="#formula"
                className="inline-flex items-center justify-center rounded-full border border-[#173329]/10 bg-[#fff8ee]/70 px-6 py-3 text-sm font-medium text-[#173329] transition-transform duration-300 hover:-translate-y-0.5"
              >
                See the carbon logic
              </a>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {stats.map((stat) => (
                <article
                  key={stat.label}
                  className="metric-card rounded-[1.7rem] p-5"
                >
                  <p className="font-display text-4xl leading-none text-[#13211c] sm:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-sm font-medium uppercase tracking-[0.16em] text-[#385245]">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#60746b]">
                    {stat.note}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="animate-rise-delay relative">
            <div className="hero-stage">
              <div className="absolute inset-0">
                <HeroSceneShell />
              </div>

              <div className="pointer-events-none absolute inset-x-5 top-5 flex flex-wrap gap-3 text-xs uppercase tracking-[0.26em] text-[#f8ebcd] sm:top-6 sm:inset-x-6">
                <div className="glass-panel-dark rounded-full px-4 py-2">
                  Project readiness demo
                </div>
                <div className="glass-panel-dark rounded-full px-4 py-2">
                  Three.js hero system
                </div>
              </div>

              <div className="absolute left-5 top-24 max-w-[16rem] rounded-[1.5rem] px-5 py-4 text-[#f8ead0] sm:left-6 sm:max-w-[18rem] glass-panel-dark animate-drift">
                <p className="text-xs uppercase tracking-[0.26em] text-[#ecd9b0]">
                  MRV posture
                </p>
                <p className="mt-3 font-display text-3xl">89% complete</p>
                <p className="mt-2 text-sm leading-6 text-[#d9e6e0]">
                  Baseline records, activity logs, and evidence streams framed as
                  a verifier-ready checklist.
                </p>
              </div>

              <div className="absolute bottom-5 left-5 right-5 grid gap-4 sm:bottom-6 sm:left-6 sm:right-6 sm:grid-cols-2">
                <div className="glass-panel-dark rounded-[1.6rem] p-5 text-[#f8ead0]">
                  <p className="text-xs uppercase tracking-[0.26em] text-[#ecd9b0]">
                    Core formula
                  </p>
                  <p className="mt-3 font-mono text-sm leading-7 text-[#f8f0dc]">
                    credits = max(0, gross benefit - leakage - uncertainty -
                    buffer)
                  </p>
                </div>

                <div className="glass-panel-dark rounded-[1.6rem] p-5 text-[#f8ead0]">
                  <p className="text-xs uppercase tracking-[0.26em] text-[#ecd9b0]">
                    Live stack
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-sm text-[#eff7f2]">
                    {[
                      "Next.js",
                      "React 19",
                      "Three.js",
                      "Tailwind v4",
                      "R3F",
                    ].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-[rgba(255,255,255,0.06)] px-3 py-1"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="experience"
        className="mx-auto max-w-7xl px-5 pb-12 sm:px-8 lg:px-10"
      >
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="section-label">What the product should feel like</p>
            <h2 className="max-w-3xl font-display text-4xl leading-tight text-[#15251e] sm:text-5xl">
              The experience should look premium, but the carbon logic must stay
              conservative.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-[#597066]">
            This concept is built around one rule: no fake certainty. The UI can
            be bold and cinematic while the calculations stay explicit about
            assumptions, evidence, and credit deductions.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {pillars.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="glass-panel-strong rounded-[2rem] p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[#173329] text-[#f4e9ce] shadow-[0_18px_40px_rgba(23,51,41,0.18)]">
                <Icon className="size-5" strokeWidth={1.85} />
              </div>
              <h3 className="mt-6 font-display text-3xl text-[#15241d]">
                {title}
              </h3>
              <p className="mt-4 text-base leading-7 text-[#5a6f65]">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="workflow"
        className="mx-auto grid max-w-7xl gap-8 px-5 pb-12 pt-6 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10"
      >
        <div className="space-y-5">
          <p className="section-label">Real-world flow translated into UI</p>
          <h2 className="font-display text-4xl leading-tight text-[#15241d] sm:text-5xl">
            Measure, model, and discount before you ever talk about issuance.
          </h2>
          <p className="max-w-xl text-base leading-7 text-[#597066]">
            That sequence keeps the prototype honest and makes the later phases
            obvious: onboarding, field setup, simulation, MRV checklist, and a
            report summary that can eventually become exportable.
          </p>

          <div className="space-y-4">
            {workflow.map((item) => (
              <article
                key={item.step}
                className="glass-panel rounded-[1.7rem] p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#173329] font-mono text-sm text-[#f8edd4]">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-display text-3xl text-[#15241d]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-[#597066]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div id="formula" className="space-y-5">
          <div className="glass-panel-strong rounded-[2rem] p-7 sm:p-8">
            <p className="section-label">Formula language</p>
            <h3 className="mt-4 font-display text-4xl leading-tight text-[#15241d]">
              A polished mock still needs visible math.
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#597066]">
              These are prototype equations, not registry-approved methodologies.
              They are here to show the user exactly how the story is built:
              emissions in, removals in, then disciplined deductions before any
              credit estimate appears.
            </p>

            <div className="mt-8 grid gap-4">
              {formulaCards.map((card) => (
                <div key={card.label} className="formula-chip rounded-[1.5rem] p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.26em] text-[#446356]">
                    {card.label}
                  </p>
                  <p className="mt-3 font-mono text-sm leading-7 text-[#1f312a] sm:text-[0.95rem]">
                    {card.expression}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="glass-panel rounded-[1.7rem] p-5">
              <div className="flex items-center gap-3 text-[#173329]">
                <BarChart3 className="size-5" strokeWidth={1.85} />
                <p className="text-sm font-medium uppercase tracking-[0.18em]">
                  Baseline insight
                </p>
              </div>
              <p className="mt-4 text-base leading-7 text-[#597066]">
                Show the user where emissions actually come from: diesel,
                electricity, fertilizer-related N2O, enteric methane, manure,
                and current soil storage.
              </p>
            </article>

            <article className="glass-panel rounded-[1.7rem] p-5">
              <div className="flex items-center gap-3 text-[#173329]">
                <CircleDollarSign className="size-5" strokeWidth={1.85} />
                <p className="text-sm font-medium uppercase tracking-[0.18em]">
                  Payout realism
                </p>
              </div>
              <p className="mt-4 text-base leading-7 text-[#597066]">
                Always split gross credits, deductions, price, and net farmer
                revenue into separate rows so the platform never feels like it is
                hiding where the money goes.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        id="pilot"
        className="mx-auto max-w-7xl px-5 pb-16 pt-4 sm:px-8 lg:px-10"
      >
        <div className="glass-panel-dark rounded-[2.2rem] px-6 py-8 text-[#f8ead0] sm:px-8 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="section-label text-[#ecd8ad]">Phase-ready foundation</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-[#fff0d2] sm:text-5xl">
                The shell is ready for forms, maps, calculators, and reports.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#dce7e1]">
                This first phase sets the brand, design system, motion language,
                and immersive landing surface. The next phase can plug in actual
                farm onboarding flows and the calculator logic from the plan.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: Sprout, label: "Farm intake forms" },
                { icon: MapPinned, label: "Field mapping layer" },
                { icon: Radar, label: "Scenario simulator" },
                { icon: ShieldCheck, label: "MRV checklist" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="rounded-[1.35rem] border border-white/10 bg-[rgba(255,255,255,0.06)] p-4"
                >
                  <div className="flex size-10 items-center justify-center rounded-2xl bg-white/10 text-[#fff1d5]">
                    <Icon className="size-5" strokeWidth={1.85} />
                  </div>
                  <p className="mt-4 text-lg text-[#fff0d1]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
