# TerraYield Web Prototype

TerraYield is a Next.js prototype for demonstrating a farm carbon readiness workflow. It is positioned as a farmer-facing, verifier-aware pre-feasibility product rather than a registry portal or a final issuance engine.

The current web app demonstrates how a user can:

- capture farm and field context
- screen methodology fit and additionality posture
- model practice-change scenarios
- apply conservative deductions before showing indicative credits
- assemble a verifier-facing readiness packet

## What The Prototype Covers

The product is currently optimized for demonstration and workflow storytelling.

- Homepage narrative that explains the product, audience, and logic stack
- Seven-step readiness workbench for intake, fields, mapping, scenario design, readiness, results, and packet review
- Multiple live demo presets so different carbon project stories can be presented without manually editing the whole form
- Transparent deductions and indicative economics instead of one opaque score

## Live Demo Presets

The workbench currently ships with three prepared demo stories:

1. Cropland transition pilot
2. Grazing methane pilot
3. Agroforestry removals estate

Each preset swaps the farm profile, methodology pack, field records, readiness items, packet documents, and opening scenario so the demo can be presented from different project angles.

## Workflow Overview

The prototype is structured as a disciplined sequence:

1. Farm profile
2. Field records
3. Map layer
4. Scenario design
5. MRV readiness
6. Results
7. Packet desk

This order is intentional. The product is designed to show context first, carbon logic second, deductions third, and evidence readiness last.

## Formula Section

The formulas below describe the logic currently implemented in the prototype. They are intended for demonstration and pre-feasibility screening, not final registry issuance.

### 1. Field baseline emissions

`field baseline emissions = diesel + electricity + fertilizer N2O + enteric methane + manure emissions`

Explanation: each field starts with an estimated baseline emissions profile built from fuel use, electricity use, nitrogen application, and livestock-related sources where relevant.

### 2. Field baseline removals

`field baseline removals = field area x baseline removal rate`

Explanation: removals are treated separately from emissions so the starting carbon balance stays legible.

### 3. Field project emissions

`field project emissions = adjusted diesel + adjusted electricity + adjusted fertilizer + adjusted enteric + adjusted manure`

Explanation: the project case applies scenario multipliers such as nitrogen reduction, diesel optimization, enteric improvement, and manure improvement.

### 4. Field project removals

`field project removals = field area x (baseline removal rate + practice lift + cover crop lift + agroforestry lift)`

Explanation: removals can increase when management improves, cover crops are introduced, or agroforestry area is added.

### 5. Baseline net balance

`baseline net balance = total baseline emissions - total baseline removals`

Explanation: this is the farm-wide starting position before any project intervention is modeled.

### 6. Project net balance

`project net balance = total project emissions - total project removals`

Explanation: this is the modeled farm-wide position after the chosen project practices and removals assumptions are applied.

### 7. Gross climate benefit

`gross benefit = baseline net balance - project net balance`

Explanation: this is the raw modeled climate improvement before deductions, exclusions, or commercial logic are applied.

### 8. Parcel exclusion deduction

`parcel exclusion deduction = sum(max(field gross benefit, 0) x excluded area / field area)`

Explanation: if part of a field is ineligible because of roads, riparian buffers, structures, or unresolved boundaries, that share of the field benefit is removed before credits are shown.

### 9. Eligible benefit before deductions

`eligible benefit before deductions = max(0, gross benefit - parcel exclusion deduction)`

Explanation: this is the remaining modeled benefit after obvious ineligible area is stripped out.

### 10. Leakage deduction

`leakage = eligible benefit before deductions x leakage percentage`

Explanation: leakage reduces the apparent benefit to reflect emissions or activity shifts that may occur outside the immediate project boundary.

### 11. Uncertainty deduction

`uncertainty = eligible benefit before deductions x uncertainty percentage`

Explanation: uncertainty keeps the output conservative when data quality, sampling, or evidence depth is still limited.

### 12. Effective buffer reserve

`effective buffer percentage = min(45, base buffer percentage + reversal-risk uplift)`

Explanation: the model starts with a base reserve and then lifts it when permanence years are short or drought, flood, fire, or removals-pathway risk is higher.

### 13. Buffer deduction

`buffer = eligible benefit before deductions x effective buffer percentage`

Explanation: this is the quantity withheld for permanence and reversal-risk protection.

### 14. Other screening ineligible deduction

`screening ineligible = eligible benefit before deductions x ineligible percentage`

Explanation: this is a second conservative deduction layer used for non-spatial screening adjustments that still reduce the indicative credit result.

### 15. Indicative issuable credits

`credits = max(0, eligible benefit before deductions - leakage - uncertainty - buffer - screening ineligible)`

Explanation: this is the conservative credit quantity shown in the demo. It is intentionally downstream of all visible deductions.

### 16. Gross revenue

`gross revenue = credits x price per credit`

Explanation: this converts the indicative credit volume into a simple commercial screening number.

### 17. Developer share

`developer share value = gross revenue x developer share percentage`

Explanation: this represents the portion of revenue allocated to a project developer or aggregator under the selected commercial scenario.

### 18. Indicative farmer net

`indicative farmer net = gross revenue - developer share value - registry cost - verification cost - platform fee`

Explanation: this is the simplified farmer-facing economics view. It does not change the carbon math; it only translates the indicative credits into an early commercial screen.

## Local Development

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

To build the static export used for deployment:

```bash
npm run build
```

This project is configured with `output: "export"`, so a successful build produces static files in `web/out`.

## Netlify Deployment

The current Netlify deployment model for this repo is static export.

Use these settings:

- Base directory: `web`
- Build command: `npm run build`
- Publish directory: `out`
- Functions directory: leave empty
- Node version: `20`

The repo root also includes `netlify.toml` so these settings can be versioned with the project.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide icons

## Important Note

This prototype is designed for workflow demonstration, conservative screening, and product storytelling. It should not be treated as a final registry-grade quantification engine or a substitute for methodology-specific verification.
