import { HeroSceneShell } from "@/components/hero-scene-shell";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  CircleDollarSign,
  Database,
  FileSearch,
  Leaf,
  MapPinned,
  Radar,
  ShieldCheck,
  SlidersHorizontal,
  Sprout,
  Workflow,
} from "lucide-react";

type ShowcaseCard = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
};

const heroSignals = [
  "Baseline history mapped",
  "Practice deltas modeled",
  "MRV evidence tracked",
  "Net payout logic exposed",
];

const heroStats = [
  {
    value: "-32",
    suffix: "tCO2e",
    label: "modeled annual delta",
    note: "The mock scenario drops the example farm from 110 to 78 tCO2e net.",
  },
  {
    value: "24-36",
    suffix: "credits",
    label: "conservative volume",
    note: "The visible range already assumes deductions for uncertainty and buffers.",
  },
  {
    value: "89",
    suffix: "%",
    label: "readiness posture",
    note: "The interface treats missing records as a product signal, not a hidden footnote.",
  },
];

const showcaseCards: ShowcaseCard[] = [
  {
    icon: Database,
    eyebrow: "Data capture",
    title: "Every field becomes a live record with history attached.",
    description:
      "The intake flow is built around hectares, crop rotation, nitrogen, livestock, residue handling, and evidence sources instead of generic profile forms.",
    tags: ["Area", "Inputs", "Livestock", "History"],
  },
  {
    icon: SlidersHorizontal,
    eyebrow: "Scenario engine",
    title: "Practice changes drive the UI, not marketing fluff.",
    description:
      "Cover crops, reduced tillage, nitrogen strategy, and sequestration assumptions surface as visible deltas in emissions, removals, and projected credit volume.",
    tags: ["What-if", "Field delta", "Hotspot view"],
  },
  {
    icon: FileSearch,
    eyebrow: "Evidence posture",
    title: "The design calls out what is still missing before anyone can trust the number.",
    description:
      "Receipts, field boundaries, baseline years, and activity logs live as readiness layers so the interface respects how MRV actually works.",
    tags: ["Receipts", "Field logs", "Sampling notes"],
  },
];

const workflow = [
  {
    step: "01",
    title: "Ingest the operating reality",
    description:
      "Collect current practice, acreage, historical seasons, crop mix, livestock, and input intensity before any scenario or payout estimate appears.",
    meta: "3-5 seasons of context",
  },
  {
    step: "02",
    title: "Run practice scenarios",
    description:
      "Model cover crops, reduced tillage, nitrogen optimization, manure changes, and sequestration assumptions at the field level.",
    meta: "Field-by-field deltas",
  },
  {
    step: "03",
    title: "Discount to credible volume",
    description:
      "Apply uncertainty, leakage, permanence buffers, and ineligible acreage adjustments before the platform surfaces credit volume.",
    meta: "No inflated outputs",
  },
  {
    step: "04",
    title: "Package MRV evidence",
    description:
      "Translate the scenario into a verifier-facing readiness view with missing records and assumptions made explicit.",
    meta: "Audit-friendly posture",
  },
];

const formulaCards = [
  {
    label: "Net farm balance",
    expression: "net balance = total emissions - total removals",
    note: "The platform separates gross emissions from soil and biomass removals.",
  },
  {
    label: "Gross climate benefit",
    expression:
      "gross benefit = (baseline emissions - baseline removals) - (project emissions - project removals)",
    note: "This makes the delta legible before any market deduction enters the picture.",
  },
  {
    label: "Issuable credits",
    expression:
      "credits = max(0, gross benefit - leakage - uncertainty - buffer - ineligible adjustments)",
    note: "The output shown to farmers stays conservative by default.",
  },
];

const modules = [
  {
    icon: Sprout,
    title: "Farm intake cockpit",
    description:
      "A guided flow for farm profile, operational context, crops, livestock, and current practice setup.",
  },
  {
    icon: MapPinned,
    title: "Field mapping layer",
    description:
      "Boundaries, soil types, crop history, and practice state become spatial objects instead of buried rows.",
  },
  {
    icon: Radar,
    title: "Scenario simulator",
    description:
      "Users compare baseline versus project outcomes with visible deltas in emissions, removals, and credits.",
  },
  {
    icon: ShieldCheck,
    title: "MRV checklist",
    description:
      "The interface turns trust into a trackable product surface with records, evidence gaps, and readiness flags.",
  },
];

const tickerItems = [
  "baseline history",
  "additionality logic",
  "fertilizer N2O",
  "soil carbon rates",
  "buffer deductions",
  "net payout transparency",
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <section className="relative isolate overflow-hidden bg-[#07121b] text-[#eaf1ee]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(24,185,143,0.18),transparent_18%),radial-gradient(circle_at_88%_12%,rgba(242,154,90,0.18),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.04)_0%,transparent_55%)]" />
        <div className="mx-auto max-w-7xl px-5 pb-14 pt-5 sm:px-8 lg:px-10">
          <header className="surface-panel-dark sticky top-4 z-30 flex items-center justify-between rounded-full px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#1bc49a_0%,#117e67_100%)] text-[#08131a] shadow-[0_18px_36px_rgba(12,201,160,0.26)]">
                <Leaf className="size-5" strokeWidth={1.9} />
              </div>
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#88decf]">
                  TerraYield
                </p>
                <p className="text-sm text-[#b4c7c1]">Farm Carbon Readiness</p>
              </div>
            </div>

            <nav className="hidden items-center gap-8 text-sm text-[#c6d5d0] md:flex">
              <a href="#experience">Positioning</a>
              <a href="#workflow">Workflow</a>
              <a href="#pilot">Modules</a>
            </nav>

            <div className="hidden items-center gap-3 sm:flex">
              <div className="signal-chip rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-[#dbe7e3]">
                Commit-by-commit build
              </div>
              <a
                href="#pilot"
                className="rounded-full bg-[#f3c77c] px-5 py-2 text-sm font-medium text-[#0b1620] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Next phase
              </a>
            </div>
          </header>

          <div className="grid items-center gap-12 pb-10 pt-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:pt-20">
            <div className="animate-rise space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-[rgba(255,255,255,0.04)] px-4 py-2 text-sm text-[#d4e2dd] shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-md">
                <span className="command-dot animate-pulse-soft" />
                Private prototype phase 01
              </div>

              <div className="space-y-5">
                <p className="section-label text-[#88decf]">
                  Carbon readiness, styled like a serious product
                </p>
                <h1 className="max-w-4xl font-display text-[3.8rem] leading-[0.86] tracking-[-0.04em] text-white sm:text-[4.9rem] xl:text-[6.4rem]">
                  The farm carbon platform should feel like high-stakes software,
                  not a beige brochure.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[#c2d3cf] sm:text-xl">
                  TerraYield reframes the mock site as a premium decision surface.
                  It maps the baseline, simulates better practice, exposes MRV
                  gaps, and makes the credit math visible enough to earn trust.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#pilot"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#19b98f] px-6 py-3 text-sm font-medium text-[#06131a] shadow-[0_22px_50px_rgba(24,185,143,0.28)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Build the next phase
                  <ArrowRight className="size-4" strokeWidth={1.9} />
                </a>
                <a
                  href="#workflow"
                  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-[rgba(255,255,255,0.04)] px-6 py-3 text-sm font-medium text-[#e8f0ed] transition-transform duration-300 hover:-translate-y-0.5 backdrop-blur-md"
                >
                  Review the product flow
                </a>
              </div>

              <div className="flex flex-wrap gap-3">
                {heroSignals.map((signal) => (
                  <div
                    key={signal}
                    className="signal-chip rounded-full px-4 py-2 text-sm text-[#d9e4e1]"
                  >
                    {signal}
                  </div>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {heroStats.map((stat) => (
                  <article key={stat.label} className="hero-stat rounded-[1.8rem] p-5">
                    <p className="font-display text-4xl leading-none text-white sm:text-5xl">
                      {stat.value}
                      <span className="ml-2 text-lg text-[#b6c8c3] sm:text-xl">
                        {stat.suffix}
                      </span>
                    </p>
                    <p className="mt-4 text-xs font-medium uppercase tracking-[0.22em] text-[#81d8c6]">
                      {stat.label}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-[#bacbc6]">
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

                <div className="pointer-events-none absolute inset-x-5 top-5 flex flex-wrap gap-3 sm:inset-x-7 sm:top-7">
                  <div className="surface-panel-dark rounded-full px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#edf3ef]">
                    Project readiness demo
                  </div>
                  <div className="surface-panel-dark rounded-full px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#edf3ef]">
                    Three.js command scene
                  </div>
                </div>

                <div className="absolute right-5 top-24 max-w-[16rem] rounded-[1.6rem] p-5 text-[#edf3ef] sm:right-7 surface-panel-dark animate-drift">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#f2c77f]">
                    Credibility posture
                  </p>
                  <p className="mt-3 font-display text-3xl text-white">Audit-facing by design</p>
                  <p className="mt-3 text-sm leading-6 text-[#cad9d5]">
                    The product surfaces assumptions, missing records, and buffer
                    logic instead of hiding them behind glossy language.
                  </p>
                </div>

                <div className="absolute left-5 top-28 max-w-[15rem] rounded-[1.6rem] p-5 text-[#edf3ef] sm:left-7 surface-panel-dark">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#7ce5d8]">
                    Live monitor
                  </p>
                  <div className="mt-4 space-y-3 text-sm text-[#d7e4df]">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span>Baseline</span>
                      <span>110 tCO2e</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span>Project</span>
                      <span>78 tCO2e</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Credit window</span>
                      <span>24-36</span>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-5 left-5 right-5 grid gap-4 sm:bottom-7 sm:left-7 sm:right-7 lg:grid-cols-[0.95fr_1.05fr]">
                  <div className="surface-panel-dark rounded-[1.7rem] p-5 text-[#eef3ef]">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#7ce5d8]">
                      Core formula
                    </p>
                    <p className="mt-3 font-mono text-sm leading-7 text-[#f7f8f5]">
                      credits = max(0, gross benefit - leakage - uncertainty -
                      buffer - ineligible adjustments)
                    </p>
                  </div>

                  <div className="surface-panel-dark rounded-[1.7rem] p-5 text-[#eef3ef]">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#f2c77f]">
                      Stack + direction
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2 text-sm text-[#eff6f1]">
                      {[
                        "Next.js",
                        "React 19",
                        "Three.js",
                        "Design system",
                        "MRV framing",
                      ].map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-[rgba(255,255,255,0.04)] px-3 py-1"
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
        </div>

        <div className="border-t border-white/10 bg-[rgba(255,255,255,0.03)]">
          <div className="mx-auto flex max-w-7xl flex-wrap gap-x-8 gap-y-3 px-5 py-4 text-xs uppercase tracking-[0.22em] text-[#b9cbc6] sm:px-8 lg:px-10">
            {tickerItems.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="command-dot" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="experience"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10"
      >
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="surface-panel-deep rounded-[2.3rem] p-7 text-[#ebf0ec] sm:p-9">
            <p className="section-label text-[#7ce5d8]">Visual repositioning</p>
            <h2 className="mt-4 max-w-xl font-display text-5xl leading-[0.92] text-white">
              Modern, restrained, and expensive-looking without losing rigor.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#c7d6d2]">
              The page now leans on control-room contrast, warm metallic accents,
              asymmetrical composition, and visible math. That makes it feel more
              like decision software and less like a generic landing template.
            </p>

            <div className="mt-8 space-y-3">
              {formulaCards.map((card) => (
                <div
                  key={card.label}
                  className="surface-panel rounded-[1.5rem] p-5"
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-[#7ce5d8]">
                    {card.label}
                  </p>
                  <p className="mt-3 font-mono text-sm leading-7 text-[#f4f8f6]">
                    {card.expression}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#b7c8c3]">
                    {card.note}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="surface-panel rounded-[1.5rem] p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-[#f2c77f]">
                  Product behavior
                </p>
                <p className="mt-3 text-base leading-7 text-[#dce6e2]">
                  Nothing on the screen implies real issuance. Everything points
                  back to methodology, evidence, and conservative assumptions.
                </p>
              </div>
              <div className="surface-panel rounded-[1.5rem] p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-[#f2c77f]">
                  Visual rule
                </p>
                <p className="mt-3 text-base leading-7 text-[#dce6e2]">
                  Bold presentation belongs in contrast, spacing, and hierarchy,
                  not fake promises or inflated numbers.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <article className="bento-card rounded-[2.1rem] p-6 md:col-span-2 sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,#102332_0%,#0a1620_100%)] text-[#f0f4f1] shadow-[0_18px_40px_rgba(0,0,0,0.24)]">
                    <Workflow className="size-5" strokeWidth={1.85} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#18b98f]">
                      Product principle
                    </p>
                    <p className="mt-2 text-sm text-[#9fb2bc]">
                      Beautiful interface, conservative carbon logic.
                    </p>
                  </div>
                </div>

                <div className="rounded-full border border-white/10 bg-[rgba(255,255,255,0.04)] px-4 py-2 text-xs uppercase tracking-[0.22em] text-[#ecf3ef] backdrop-blur-md">
                  Farmer-facing, verifier-aware
                </div>
              </div>

              <h3 className="mt-8 max-w-3xl font-display text-4xl leading-[0.98] text-white sm:text-5xl">
                Every field, practice change, and supporting record should feel
                like part of one coherent operating system.
              </h3>
              <p className="mt-4 max-w-3xl text-base leading-7 text-[#aac0c8]">
                That means intake, modeling, deduction logic, and MRV evidence
                all live inside the same visual language. The user should never
                wonder whether the calculator and the reporting workflow belong
                to different products.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Field history",
                  "Nitrogen intensity",
                  "Livestock methane",
                  "Buffer deductions",
                  "Net payout split",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-[rgba(255,255,255,0.04)] px-3 py-2 text-sm text-[#d4e1dd]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>

            {showcaseCards.map(({ icon: Icon, eyebrow, title, description, tags }) => (
              <article key={title} className="bento-card rounded-[2rem] p-6 sm:p-7">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,#102332_0%,#0a1620_100%)] text-[#edf3ef] shadow-[0_16px_36px_rgba(0,0,0,0.22)]">
                  <Icon className="size-5" strokeWidth={1.85} />
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.26em] text-[#18b98f]">
                  {eyebrow}
                </p>
                <h3 className="mt-3 font-display text-3xl leading-tight text-white">
                  {title}
                </h3>
                <p className="mt-4 text-base leading-7 text-[#aac0c8]">
                  {description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-[rgba(255,255,255,0.04)] px-3 py-1.5 text-sm text-[#d4e1dd]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="workflow"
        className="mx-auto max-w-7xl px-5 pb-16 pt-2 sm:px-8 lg:px-10"
      >
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <aside className="surface-panel-strong rounded-[2rem] p-7 lg:sticky lg:top-24 sm:p-8">
            <p className="section-label">Operating sequence</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight text-white sm:text-5xl">
              The interface only earns trust if the workflow stays disciplined.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#aac0c8]">
              The right order is baseline first, scenario second, deductions
              third, and MRV packaging last. That keeps the output credible and
              gives the next screens an obvious structure.
            </p>

            <div id="formula" className="mt-8 grid gap-4">
              <div className="formula-tile rounded-[1.5rem] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#18b98f]">
                  Formula desk
                </p>
                <p className="mt-3 font-mono text-sm leading-7 text-[#f3f7f4]">
                  net balance = total emissions - total removals
                </p>
              </div>
              <div className="formula-tile rounded-[1.5rem] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#18b98f]">
                  Credits desk
                </p>
                <p className="mt-3 font-mono text-sm leading-7 text-[#f3f7f4]">
                  credits = max(0, gross benefit - leakage - uncertainty -
                  buffer)
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <article className="formula-tile rounded-[1.5rem] p-5">
                  <div className="flex items-center gap-3 text-[#eef4f1]">
                    <BarChart3 className="size-5" strokeWidth={1.85} />
                    <p className="text-sm font-medium uppercase tracking-[0.18em]">
                      Baseline view
                    </p>
                  </div>
                  <p className="mt-4 text-base leading-7 text-[#aac0c8]">
                    Emissions sources and removals must stay visible by source so
                    the farmer understands what is actually driving the number.
                  </p>
                </article>
                <article className="formula-tile rounded-[1.5rem] p-5">
                  <div className="flex items-center gap-3 text-[#eef4f1]">
                    <CircleDollarSign className="size-5" strokeWidth={1.85} />
                    <p className="text-sm font-medium uppercase tracking-[0.18em]">
                      Revenue view
                    </p>
                  </div>
                  <p className="mt-4 text-base leading-7 text-[#aac0c8]">
                    Gross credits, price, verifier costs, platform fees, and net
                    farmer revenue need separate rows.
                  </p>
                </article>
              </div>
            </div>
          </aside>

          <div className="relative space-y-4 lg:pl-10">
            <div className="absolute bottom-4 left-5 top-5 hidden w-px bg-[linear-gradient(180deg,rgba(24,185,143,0.4)_0%,rgba(24,185,143,0.04)_100%)] lg:block" />
            {workflow.map((item) => (
              <article key={item.step} className="timeline-card rounded-[1.9rem] p-6 sm:p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(180deg,#102332_0%,#0a1620_100%)] font-mono text-sm text-[#eaf2ee] shadow-[0_16px_36px_rgba(0,0,0,0.24)] lg:-ml-[4.1rem]">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="font-display text-3xl text-white sm:text-[2.2rem]">
                        {item.title}
                      </h3>
                      <div className="rounded-full border border-white/10 bg-[rgba(255,255,255,0.04)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#d4e1dd]">
                        {item.meta}
                      </div>
                    </div>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-[#aac0c8]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="pilot"
        className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10"
      >
        <div className="overflow-hidden rounded-[2.5rem] bg-[#07121b] text-[#eaf1ee] shadow-[0_40px_120px_rgba(7,17,26,0.28)]">
          <div className="grid gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[0.92fr_1.08fr] lg:px-10">
            <div>
              <p className="section-label text-[#7ce5d8]">Phase 02 build surface</p>
              <h2 className="mt-4 max-w-xl font-display text-4xl leading-[0.96] text-white sm:text-5xl">
                The shell is now strong enough to carry real product screens.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#bfd1cc]">
                The next phase should plug real workflows into this design system:
                intake, field setup, scenario controls, calculator outputs, and an
                MRV checklist that turns trust into something the user can track.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Premium landing resolved",
                  "Three.js hero upgraded",
                  "Design system sharpened",
                  "Product narrative clarified",
                ].map((item) => (
                  <div
                    key={item}
                    className="signal-chip rounded-full px-4 py-2 text-sm text-[#dce7e3]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {modules.map(({ icon: Icon, title, description }) => (
                <article key={title} className="module-tile rounded-[1.6rem] p-5">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.04)_100%)] text-[#eef4f0]">
                    <Icon className="size-5" strokeWidth={1.85} />
                  </div>
                  <h3 className="mt-5 text-xl text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#bfd1cc]">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
