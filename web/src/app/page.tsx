import { ReadinessWorkbench } from "@/components/readiness-workbench";
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
  "Eligibility screened before modeling",
  "Baseline seasons normalized",
  "Deductions shown line by line",
  "Evidence blockers kept visible",
];

const heroStats = [
  {
    value: "6",
    suffix: "seasons",
    label: "baseline history in view",
    note: "The demo farm carries enough operating history to explain baseline normalization before any project scenario is modeled.",
  },
  {
    value: "24-36",
    suffix: "credits",
    label: "indicative issuable range",
    note: "The visible range already reflects ineligible area, uncertainty, leakage, and permanence buffer deductions.",
  },
  {
    value: "89",
    suffix: "%",
    label: "submission readiness",
    note: "Two unresolved records keep the example below a clean submission posture, which gives the demo a concrete ending.",
  },
];

const heroParcelMetrics = [
  { label: "Screened area", value: "412 ha" },
  { label: "Method pack", value: "Cropland SOC" },
  { label: "Open blockers", value: "2 items" },
];

const heroEvidenceTrail = [
  { label: "Field boundaries reconciled", value: "Ready" },
  { label: "Input invoices attached", value: "14 / 16" },
  { label: "Baseline seasons normalized", value: "6 years" },
];

const positioningNotes = [
  "Readiness before issuance",
  "Conservative credits only",
  "Evidence-led workflow",
];

const workflowDesk = [
  {
    label: "Baseline desk",
    title: "Start with the operating reality",
    detail:
      "The workflow captures seasons, parcel context, crop mix, nitrogen intensity, and livestock before it lets the user talk about credits.",
    icon: BarChart3,
  },
  {
    label: "Credit desk",
    title: "Separate climate benefit from saleable volume",
    detail:
      "Gross benefit, deductions, verifier cost, and farmer share stay legible in separate lines so the demo never overstates what could be issued or paid.",
    icon: CircleDollarSign,
  },
];

const showcaseCards: ShowcaseCard[] = [
  {
    icon: Database,
    eyebrow: "Operational intake",
    title: "Farm data enters in the units operators already understand.",
    description:
      "The intake flow is built around hectares, crop rotation, nitrogen, livestock, residue handling, and source records instead of generic profile forms.",
    tags: ["Seasons", "Hectares", "Inputs", "Livestock"],
  },
  {
    icon: SlidersHorizontal,
    eyebrow: "Quantification logic",
    title: "Methodology assumptions stay visible instead of disappearing behind one score.",
    description:
      "Cover crops, reduced tillage, nitrogen strategy, and sequestration assumptions surface as visible deltas in emissions, removals, and projected credit volume.",
    tags: ["Baseline", "Project case", "Deductions", "Sensitivity"],
  },
  {
    icon: FileSearch,
    eyebrow: "Readiness controls",
    title: "Missing evidence becomes an action list, not a hidden disclaimer.",
    description:
      "Receipts, field boundaries, baseline years, and activity logs live as readiness layers so the interface respects how MRV actually works.",
    tags: ["Invoices", "Boundary proof", "Logs", "Packet status"],
  },
];

const workflow = [
  {
    step: "01",
    title: "Qualify the farm and methodology fit",
    description:
      "Set land use, project type, and operating context so the workflow starts inside a credible program frame before any carbon estimate appears.",
    meta: "Program framing",
  },
  {
    step: "02",
    title: "Capture fields and baseline history",
    description:
      "Enter hectares, rotations, nitrogen, livestock, and historic practice so the model has real operating context rather than headline assumptions.",
    meta: "Farm reality",
  },
  {
    step: "03",
    title: "Model practice change",
    description:
      "Test cover crops, tillage shifts, nitrogen strategy, manure handling, and sequestration assumptions at the field level.",
    meta: "Project scenario",
  },
  {
    step: "04",
    title: "Discount to credible credits",
    description:
      "Show exclusions, uncertainty, leakage, permanence buffer, and commercial deductions before surfacing indicative credits or payout.",
    meta: "Conservative output",
  },
  {
    step: "05",
    title: "Assemble the readiness packet",
    description:
      "Turn the result into a verifier-facing file set with blockers, assumptions, and next actions still visible.",
    meta: "Next actions",
  },
];

const formulaCards = [
  {
    label: "Baseline position",
    expression: "baseline net balance = baseline emissions - baseline removals",
    note: "The platform keeps gross emissions and removals separate so the audience can see what the starting point actually is.",
  },
  {
    label: "Project delta",
    expression: "gross benefit = baseline net balance - project net balance",
    note: "This makes the climate delta legible before any market or commercial deduction enters the picture.",
  },
  {
    label: "Indicative issuable credits",
    expression:
      "credits = max(0, gross benefit - leakage - uncertainty - buffer - ineligible adjustments)",
    note: "The number shown to farmers stays conservative by default and remains visibly downstream of deductions.",
  },
];

const modules = [
  {
    icon: Sprout,
    title: "Intake and eligibility desk",
    description:
      "Farm profile, geography, methodology fit, and operating context are structured before the scenario engine runs.",
  },
  {
    icon: MapPinned,
    title: "Parcel and boundary register",
    description:
      "Fields, boundary confidence, exclusions, and mapped area coverage stay visible instead of disappearing into rows.",
  },
  {
    icon: Radar,
    title: "Scenario and deduction engine",
    description:
      "Users compare baseline versus project outcomes with visible deltas in emissions, removals, and conservative credit estimates.",
  },
  {
    icon: ShieldCheck,
    title: "Evidence and packet desk",
    description:
      "The interface turns trust into a trackable surface with readiness controls, document status, and blocker notes.",
  },
];

const tickerItems = [
  "eligibility gates",
  "parcel exclusions",
  "additionality logic",
  "conservative credit range",
  "evidence blockers",
  "packet readiness",
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <section className="relative isolate overflow-hidden bg-[#07121b] text-[#eaf1ee]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(24,185,143,0.18),transparent_18%),radial-gradient(circle_at_88%_12%,rgba(242,154,90,0.18),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.04)_0%,transparent_55%)]" />
        <div className="mx-auto max-w-[108rem] px-5 pb-14 pt-5 sm:px-8 lg:px-10">
          <header className="surface-panel-dark sticky top-4 z-30 flex flex-wrap items-center justify-between gap-4 rounded-[1.75rem] px-4 py-3 sm:px-6 xl:flex-nowrap xl:rounded-full">
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

            <nav className="hidden items-center gap-8 text-sm text-[#c6d5d0] xl:flex">
              <a href="#experience">Product</a>
              <a href="#workbench">Live workflow</a>
              <a href="#workflow">Demo route</a>
              <a href="#pilot">Coverage</a>
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <div className="signal-chip rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-[#dbe7e3]">
                Interactive product demo
              </div>
              <a
                href="#workbench"
                className="rounded-full bg-[#f3c77c] px-5 py-2 text-sm font-medium text-[#0b1620] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Open live workflow
              </a>
            </div>
          </header>

          <div className="grid items-start gap-10 pb-8 pt-10 xl:grid-cols-[1.06fr_0.94fr] xl:gap-14 xl:pt-14 2xl:gap-16 2xl:pt-16">
            <div className="animate-rise space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-[rgba(255,255,255,0.04)] px-4 py-2 text-sm text-[#d4e2dd] shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-md">
                <span className="command-dot animate-pulse-soft" />
                Methodology-aware prototype
              </div>

              <div className="space-y-5">
                <p className="section-label text-[#88decf]">
                  Carbon readiness for agriculture
                </p>
                <h1 className="max-w-none font-display text-[3.3rem] leading-[0.88] tracking-[-0.04em] text-white sm:text-[4.35rem] lg:text-[4.95rem] xl:text-[5.45rem] 2xl:text-[5.95rem]">
                  From field operations to carbon project readiness, in one
                  working workflow.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[#c2d3cf] sm:text-xl">
                  TerraYield helps an operator structure baseline data, model
                  practice change, apply conservative deductions, and package
                  the evidence needed before a farm carbon project moves
                  forward.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#workbench"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#19b98f] px-6 py-3 text-sm font-medium text-[#06131a] shadow-[0_22px_50px_rgba(24,185,143,0.28)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Open live workflow
                  <ArrowRight className="size-4" strokeWidth={1.9} />
                </a>
                <a
                  href="#workflow"
                  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-[rgba(255,255,255,0.04)] px-6 py-3 text-sm font-medium text-[#e8f0ed] transition-transform duration-300 hover:-translate-y-0.5 backdrop-blur-md"
                >
                  See the demo route
                </a>
              </div>

              <div className="max-w-xl border-l border-[#f3a66b]/30 pl-5">
                <p className="font-display text-[1.85rem] leading-[0.96] text-[#f4eadb] sm:text-[2.15rem] xl:text-[2.35rem]">
                  If the exclusions, deductions, and missing proof are not
                  visible, the product is not credible.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {heroSignals.map((signal, index) => (
                  <div
                    key={signal}
                    className="border-t border-white/10 pt-4"
                  >
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-[#7ce5d8]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#d7e4df]">
                      {signal}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.15fr_0.85fr_0.85fr]">
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
                <div className="grid h-full gap-4 p-4 sm:p-5 lg:grid-cols-[1.08fr_0.92fr] lg:p-7">
                  <div className="hero-story-card lg:col-span-2">
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <p className="section-label text-[#7ce5d8]">Demo farm</p>
                        <h2 className="mt-4 max-w-md font-display text-[2.15rem] leading-[0.92] text-white sm:text-[2.5rem] xl:text-[2.75rem] 2xl:text-[3.05rem]">
                          From parcel intake to verifier-facing packet, in one
                          deliberate surface.
                        </h2>
                      </div>
                      <div className="rounded-full border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-2 font-mono text-xs uppercase tracking-[0.24em] text-[#dce6e2]">
                        412 ha
                      </div>
                    </div>

                    <div className="hero-topography mt-8">
                      <div className="parcel-block parcel-block-a" />
                      <div className="parcel-block parcel-block-b" />
                      <div className="parcel-block parcel-block-c" />
                      <div className="parcel-route" />
                      <div className="parcel-ping" />
                    </div>

                    <div className="mt-6 grid gap-3 md:grid-cols-3">
                      {heroParcelMetrics.map((item) => (
                        <div
                          key={item.label}
                          className="rounded-[1.3rem] border border-white/10 bg-[rgba(255,255,255,0.04)] p-4"
                        >
                          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#8fded0]">
                            {item.label}
                          </p>
                          <p className="mt-3 font-display text-3xl text-white">
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="hero-note-card">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#f2c77f]">
                      Demo promise
                    </p>
                    <p className="mt-4 font-display text-[2.4rem] leading-[0.95] text-white xl:text-[2.55rem] 2xl:text-3xl">
                      Show the logic and the limits.
                    </p>
                    <p className="mt-4 text-sm leading-6 text-[#d8e1dd]">
                      A strong walkthrough does not stop at an optimistic credit
                      number. It shows how eligibility, exclusions, and missing
                      records shape the outcome.
                    </p>
                  </div>

                  <div className="hero-ledger-card">
                    <div className="flex items-center gap-3 text-[#eff4f1]">
                      <ShieldCheck className="size-4" strokeWidth={1.8} />
                      <p className="text-xs uppercase tracking-[0.24em] text-[#7ce5d8]">
                        Evidence trail
                      </p>
                    </div>

                    <div className="mt-5 space-y-4">
                      {heroEvidenceTrail.map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
                        >
                          <span className="text-sm text-[#d7e4df]">{item.label}</span>
                          <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#f2c77f]">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 rounded-[1.2rem] border border-white/10 bg-[rgba(255,255,255,0.04)] p-4">
                      <div className="flex items-center gap-3 text-[#eef4f1]">
                        <Workflow className="size-4" strokeWidth={1.8} />
                        <p className="text-xs uppercase tracking-[0.24em] text-[#95edff]">
                          Visible formula
                        </p>
                      </div>
                      <p className="mt-3 font-mono text-sm leading-7 text-[#f7f8f5]">
                        credits = max(0, gross benefit - leakage - uncertainty -
                        buffer - ineligible adjustments)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-[rgba(255,255,255,0.03)]">
          <div className="mx-auto flex max-w-[108rem] flex-wrap gap-x-8 gap-y-3 px-5 py-4 text-xs uppercase tracking-[0.22em] text-[#b9cbc6] sm:px-8 lg:px-10">
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
        className="mx-auto max-w-[108rem] px-5 py-16 sm:px-8 lg:px-10"
      >
        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.94fr)_minmax(0,1.08fr)_minmax(0,0.9fr)] 2xl:gap-8">
          <div className="space-y-6">
            <article className="surface-panel-deep rounded-[2.3rem] p-7 text-[#ebf0ec] sm:p-9">
              <p className="section-label text-[#7ce5d8]">Product position</p>
              <h2 className="mt-4 max-w-xl font-display text-[2.85rem] leading-[0.94] text-white sm:text-[3.45rem] 2xl:text-5xl">
                This is not a registry portal. It is the operating layer before
                one.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#c7d6d2]">
                TerraYield should read as a farm carbon readiness and
                pre-feasibility platform. It structures farm data, makes the
                methodology logic legible, and turns missing proof into next
                actions before anyone talks about submission.
              </p>

              <div className="mt-8 space-y-3">
                {formulaCards.map((card) => (
                  <div
                    key={card.label}
                    className="formula-ledger rounded-[1.5rem] p-5"
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
            </article>

            <article className="surface-panel-deep rounded-[2rem] p-6 text-[#ebf0ec] sm:p-7">
              <p className="text-xs uppercase tracking-[0.24em] text-[#f2c77f]">
                Plain-language promise
              </p>
              <div className="mt-5 grid gap-4">
                {positioningNotes.map((note) => (
                  <div
                    key={note}
                    className="rounded-[1.3rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4"
                  >
                    <p className="font-display text-[1.85rem] leading-[1.02] text-[#f1ede3]">
                      {note}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <article className="editorial-feature-card rounded-[2.2rem] p-6 sm:p-8 xl:h-full">
              <div className="flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,#102332_0%,#0a1620_100%)] text-[#f0f4f1] shadow-[0_18px_40px_rgba(0,0,0,0.24)]">
                    <Workflow className="size-5" strokeWidth={1.85} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#18b98f]">
                      Demo frame
                    </p>
                    <p className="mt-2 text-sm text-[#9fb2bc]">
                      Professional presentation, conservative carbon logic.
                    </p>
                  </div>
                </div>

                <div className="rounded-full border border-white/10 bg-[rgba(255,255,255,0.04)] px-4 py-2 text-xs uppercase tracking-[0.22em] text-[#ecf3ef] backdrop-blur-md">
                  Operator-facing, verifier-aware
                </div>
              </div>

              <h3 className="mt-8 max-w-3xl font-display text-[2.6rem] leading-[0.98] text-white sm:text-[3.25rem] 2xl:text-5xl">
                A five-minute walkthrough should make the product legible to a
                farmer, operator, or reviewer.
              </h3>
              <p className="mt-4 max-w-3xl text-base leading-7 text-[#aac0c8]">
                The audience should understand what goes in, what changes, what
                gets deducted, and what is still missing. The interface should
                make the workflow understandable even before a presenter starts
                narrating it.
              </p>

              <div className="mt-8 grid gap-4">
                <div className="rounded-[1.6rem] border border-white/10 bg-[rgba(255,255,255,0.04)] p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#f2c77f]">
                    Who it serves
                  </p>
                  <p className="mt-3 text-base leading-7 text-[#dbe5e2]">
                    Farm operators, project developers, and aggregators who
                    need to understand readiness before they spend time on a
                    full project cycle.
                  </p>
                </div>
                <div className="rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)] p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#95edff]">
                    What the walkthrough must show
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[
                      "Farm profile",
                      "Parcel screening",
                      "Scenario delta",
                      "Credit deductions",
                      "Packet blockers",
                    ].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-[rgba(255,255,255,0.04)] px-3 py-2 text-sm text-[#d4e1dd]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  "Demo-ready narrative",
                  "Methodology visible",
                  "Single-farm workflow live",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#f3a66b]/20 bg-[#f3a66b]/8 px-3 py-1.5 text-sm text-[#f3d6b2]"
                  >
                    {item}
                  </span>
                ))}
              </div>
          </article>

          <div className="space-y-6">
            {showcaseCards.map(({ icon: Icon, eyebrow, title, description, tags }, index) => (
              <article key={title} className="editorial-slab rounded-[1.9rem] p-6 sm:p-7">
                <div className="flex items-start justify-between gap-5">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,#102332_0%,#0a1620_100%)] text-[#edf3ef] shadow-[0_16px_36px_rgba(0,0,0,0.22)]">
                    <Icon className="size-5" strokeWidth={1.85} />
                  </div>
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-[#7ce5d8]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.26em] text-[#18b98f]">
                  {eyebrow}
                </p>
                <h3 className="mt-3 font-display text-[2rem] leading-[0.98] text-white sm:text-[2.15rem] 2xl:text-[2.3rem]">
                  {title}
                </h3>
                <p className="mt-4 text-base leading-7 text-[#aac0c8]">
                  {description}
                </p>
                <div className="mt-6 grid gap-2 sm:grid-cols-2">
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      className="border-t border-white/10 pt-3 text-sm text-[#d4e1dd]"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="workflow"
        className="mx-auto max-w-[108rem] px-5 pb-16 pt-2 sm:px-8 lg:px-10"
      >
        <ReadinessWorkbench />

        <div className="grid gap-8 xl:grid-cols-[0.78fr_1.22fr] xl:items-start">
          <aside className="workflow-sidebar rounded-[2rem] p-7 xl:sticky xl:top-24 sm:p-8">
            <p className="section-label">Demo route</p>
            <h2 className="mt-4 max-w-xl font-display text-[2.85rem] leading-tight text-white sm:text-[3.45rem] xl:text-5xl">
              Use this order when presenting the workflow.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#aac0c8]">
              Start with context, then show parcel structure, scenario change,
              conservative deductions, and the packet that still needs to be
              completed. That sequence keeps the demo credible and easy to
              follow.
            </p>

            <div id="formula" className="mt-8 grid gap-4">
              <div className="formula-tile rounded-[1.5rem] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#18b98f]">
                  Logic desk
                </p>
                <p className="mt-3 font-mono text-sm leading-7 text-[#f3f7f4]">
                  baseline net balance = baseline emissions - baseline removals
                </p>
              </div>
              <div className="formula-tile rounded-[1.5rem] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#18b98f]">
                  Issuance desk
                </p>
                <p className="mt-3 font-mono text-sm leading-7 text-[#f3f7f4]">
                  credits = max(0, gross benefit - leakage - uncertainty -
                  buffer - ineligible adjustments)
                </p>
              </div>
              <div className="space-y-3">
                {workflowDesk.map(({ icon: Icon, label, title, detail }) => (
                  <article key={label} className="workflow-note rounded-[1.4rem] p-5">
                    <div className="flex items-center gap-3 text-[#eef4f1]">
                      <Icon className="size-5" strokeWidth={1.85} />
                      <p className="text-sm font-medium uppercase tracking-[0.18em]">
                        {label}
                      </p>
                    </div>
                    <p className="mt-4 font-display text-[2rem] leading-[0.95] text-white">
                      {title}
                    </p>
                    <p className="mt-3 text-base leading-7 text-[#aac0c8]">
                      {detail}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </aside>

          <div className="relative space-y-4 xl:pl-10">
            <div className="absolute bottom-4 left-5 top-5 hidden w-px bg-[linear-gradient(180deg,rgba(24,185,143,0.4)_0%,rgba(24,185,143,0.04)_100%)] xl:block" />
            {workflow.map((item) => (
              <article key={item.step} className="timeline-card rounded-[1.9rem] p-6 sm:p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <div className="timeline-step-chip flex size-12 shrink-0 items-center justify-center rounded-full font-mono text-sm text-[#eaf2ee] xl:-ml-[4.1rem]">
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
        className="mx-auto max-w-[108rem] px-5 pb-20 sm:px-8 lg:px-10"
      >
        <div className="overflow-hidden rounded-[2.5rem] bg-[#07121b] text-[#eaf1ee] shadow-[0_40px_120px_rgba(7,17,26,0.28)]">
          <div className="grid gap-8 px-6 py-8 sm:px-8 sm:py-10 xl:grid-cols-[0.88fr_1.12fr] lg:px-10">
            <div>
              <p className="section-label text-[#7ce5d8]">Prototype coverage</p>
              <h2 className="mt-4 max-w-xl font-display text-[2.85rem] leading-[0.96] text-white sm:text-[3.45rem] xl:text-5xl">
                The current build is strong enough to demonstrate the product
                with confidence.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#bfd1cc]">
                This phase moves past a landing mock. The prototype now shows a
                coherent single-farm flow: intake, field records, parcel review,
                scenario modeling, conservative credit logic, and evidence
                packaging.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "End-to-end workflow live",
                  "Field inputs editable",
                  "Conservative math visible",
                  "Packet review connected",
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
              {modules.map(({ icon: Icon, title, description }, index) => (
                <article
                  key={title}
                  className={`module-tile rounded-[1.6rem] p-5 ${index === 0 ? "sm:col-span-2" : ""}`}
                >
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.04)_100%)] text-[#eef4f0]">
                    <Icon className="size-5" strokeWidth={1.85} />
                  </div>
                  <p className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.28em] text-[#8ddfd1]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-[2rem] leading-[0.96] text-white">{title}</h3>
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
