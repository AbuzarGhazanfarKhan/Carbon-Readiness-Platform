# Farm Carbon Credit Mock Website Plan

## 1. Goal

Create a mock website that explains and simulates how a farm carbon credit platform could work.

This prototype should not pretend to issue real carbon credits. It should act as a:

- farm carbon footprint estimator
- project readiness checker
- carbon credit potential simulator
- simple MRV workflow demo

The website should help a farmer answer four questions:

1. What does my farm emit today?
2. What could change if I adopt better practices?
3. How many potential credits might I generate?
4. What evidence and verification would I still need before credits could be sold?

## 2. Product Positioning

The mock website should be positioned as a farmer-facing "carbon readiness platform" rather than a real exchange or registry.

That keeps the prototype realistic and easier to build.

What the mock website should do:

- collect farm activity data
- estimate baseline emissions
- estimate reductions and removals under a new scenario
- show possible credit volume after deductions
- explain the MRV process
- show a simple financial estimate

What the mock website should not do yet:

- issue real credits
- integrate with a real carbon registry
- make legal compliance claims
- guarantee payout values
- claim satellite-only verification is enough

## 3. Core Concept

The platform represents a simplified digital MRV flow:

- Measurement: collect farm and field data
- Reporting: calculate emissions, removals, and projected credits
- Verification: prepare a report and evidence checklist for third-party review

The website is basically a mix of:

- onboarding tool
- calculator
- dashboard
- report generator

## 4. Target Users

Primary users:

- farmers
- farm managers
- agricultural advisors

Secondary users:

- carbon project developers
- sustainability program managers
- corporate buyers viewing example projects

## 5. User Problem

Farmers usually do not know:

- their current emissions profile
- whether their current practices qualify for a carbon project
- how credits are estimated
- what data they must keep for verification
- how much money would remain after deductions and fees

The mock website should reduce confusion by turning a complex carbon market into a step-by-step product flow.

## 6. Main Website Flow

### Step 1: Landing Page

Explain in simple language:

- what carbon credits are
- how farming activities affect emissions and removals
- how the platform helps estimate project readiness

Primary call to action:

- Start carbon assessment

### Step 2: Farm Onboarding

Collect basic profile data:

- farm name
- country/region
- total farm area
- crop types
- livestock counts
- irrigation use
- fuel use
- fertilizer use
- current practices such as tillage, cover crops, residue management

### Step 3: Field and Practice Setup

For each field, collect:

- field name
- area in hectares
- soil type
- crop history
- current tillage system
- fertilizer rate
- manure use
- cover crop status
- grazing or livestock linkage if relevant

### Step 4: Baseline Carbon Calculation

Estimate current emissions and current sequestration.

Outputs:

- total annual emissions in tCO2e
- total annual removals in tCO2e
- net farm balance
- hotspot breakdown by source

### Step 5: Scenario Simulation

Allow the user to test practice changes such as:

- reduced tillage
- no-till
- cover crops
- optimized nitrogen use
- manure management improvements
- rotational grazing
- agroforestry or tree planting

Outputs:

- projected emissions after changes
- projected removals after changes
- estimated reduction/removal delta
- estimated creditable volume before and after deductions

### Step 6: MRV Readiness Review

Show what is still needed for credibility:

- field boundaries
- historical baseline records
- activity logs
- invoices or purchase records
- soil tests if applicable
- satellite review
- third-party verifier review

### Step 7: Financial Estimate

Show a simple range, not a promise:

- gross potential credits
- buffer deduction
- uncertainty deduction
- platform fee
- verifier cost estimate
- net farmer payout estimate

### Step 8: Mock Report

Generate a simple downloadable summary with:

- farm profile
- assumptions
- baseline vs project scenario
- formula summary
- risk notes
- evidence checklist
- projected credit range

## 7. Recommended Core Pages

1. Home
2. About Carbon Credits
3. Start Assessment
4. Farm Profile Form
5. Field Details Form
6. Baseline Dashboard
7. What-If Simulator
8. MRV Checklist
9. Estimated Credit Value Page
10. Report Summary

## 8. Functional Requirements

The mock website should support these features.

### Required MVP Features

- farmer onboarding form
- field-level data capture
- emissions calculator
- sequestration estimate input
- scenario comparison
- simple credit estimate
- readiness score or status
- dashboard charts
- report summary page

### Optional Later Features

- map upload or field drawing
- satellite image panel
- advisor dashboard
- multi-farm aggregation
- buyer-facing project listings
- registry integration mock
- audit trail view

## 9. Non-Functional Requirements

- mobile-friendly layout
- simple language for non-technical users
- fast form flow with minimal friction
- editable assumptions and emission factors
- transparent calculations
- clear disclaimers that values are estimates only
- ability to export a summary as PDF later

## 10. Core Data Model

Suggested entities for the prototype:

### User

- id
- name
- email
- role

### Farm

- id
- owner_id
- farm_name
- region
- total_area_ha
- farming_type

### Field

- id
- farm_id
- field_name
- area_ha
- soil_type
- crop_type
- baseline_practice
- project_practice

### Activity Record

- id
- field_id
- year
- fertilizer_n_kg
- diesel_liters
- electricity_kwh
- livestock_count
- manure_system
- tillage_type
- cover_crop_used

### Carbon Result

- id
- farm_id
- baseline_emissions_tco2e
- baseline_removals_tco2e
- project_emissions_tco2e
- project_removals_tco2e
- gross_delta_tco2e
- leakage_tco2e
- uncertainty_tco2e
- buffer_tco2e
- issued_credit_estimate

## 11. Core Carbon Logic

The website should separate carbon logic into five layers:

1. Activity data
2. Emission factors
3. Baseline calculation
4. Project scenario calculation
5. Credit estimation after deductions

Important: all formulas below are prototype formulas. Real programs use region-specific methodologies and stricter verification rules.

## 12. Core Formulas

### 12.1 CO2e Conversion

Convert different gases into a common unit.

$$
CO2e = CO2 + (CH4 \times GWP_{CH4}) + (N2O \times GWP_{N2O})
$$

Notes:

- Use configurable GWP values because standards differ.
- Keep GWP values in a settings file or admin table.

### 12.2 Diesel Emissions

$$
Diesel\ Emissions\ (kg\ CO2e) = Diesel\ Liters \times EF_{diesel}
$$

Where:

- $EF_{diesel}$ = emissions factor for diesel combustion

### 12.3 Electricity Emissions

$$
Electricity\ Emissions\ (kg\ CO2e) = Electricity\ kWh \times EF_{grid}
$$

Where:

- $EF_{grid}$ = grid emissions factor for the relevant region

### 12.4 Fertilizer-Related N2O Emissions

Simplified prototype approach:

$$
Direct\ N2O\text{-}N = N\ Applied\ (kg) \times EF_{N}
$$

$$
Direct\ N2O = Direct\ N2O\text{-}N \times \frac{44}{28}
$$

$$
Fertilizer\ Emissions\ (kg\ CO2e) = Direct\ N2O \times GWP_{N2O}
$$

Where:

- $N\ Applied$ = kilograms of nitrogen applied
- $EF_N$ = emission factor for nitrogen-induced N2O emissions

### 12.5 Enteric Methane From Livestock

$$
Enteric\ CH4\ (kg\ CH4) = Number\ of\ Animals \times EF_{enteric}
$$

$$
Enteric\ Emissions\ (kg\ CO2e) = Enteric\ CH4 \times GWP_{CH4}
$$

### 12.6 Manure Emissions

Simplified prototype approach:

$$
Manure\ Emissions\ (kg\ CO2e) = Number\ of\ Animals \times EF_{manure}
$$

This can later be split into CH4 and N2O by manure management system.

### 12.7 Soil Carbon Sequestration

Simple prototype version:

$$
Soil\ Carbon\ Removal\ (tCO2e) = Area\ (ha) \times Sequestration\ Rate\ (tCO2e/ha/yr)
$$

The sequestration rate can depend on:

- no-till adoption
- cover crop adoption
- pasture improvement
- agroforestry
- local soil type and climate

### 12.8 Total Baseline Emissions

$$
Baseline\ Emissions = Diesel + Electricity + Fertilizer + Enteric + Manure + Other\ Sources
$$

### 12.9 Total Project Emissions

$$
Project\ Emissions = Diesel' + Electricity' + Fertilizer' + Enteric' + Manure' + Other\ Sources'
$$

### 12.10 Net Farm Carbon Balance

$$
Net\ Balance = Total\ Emissions - Total\ Removals
$$

Interpretation:

- positive value = the farm is still a net emitter
- negative value = removals exceed emissions

### 12.11 Gross Climate Benefit

$$
Gross\ Benefit = (Baseline\ Emissions - Baseline\ Removals) - (Project\ Emissions - Project\ Removals)
$$

This is the starting point for potential credits.

### 12.12 Estimated Issuable Credits

$$
Estimated\ Credits = \max(0, Gross\ Benefit - Leakage - Uncertainty - Buffer - Ineligible\ Adjustments)
$$

This formula is critical because not every ton of modeled benefit becomes a tradable credit.

### 12.13 Revenue Estimate

$$
Gross\ Revenue = Estimated\ Credits \times Carbon\ Price
$$

$$
Net\ Farmer\ Revenue = Gross\ Revenue - Verification\ Costs - Platform\ Fees - Other\ Deductions
$$

## 13. Simple Example Calculation

Assume a farm has the following baseline each year:

- diesel emissions = 20 tCO2e
- electricity emissions = 8 tCO2e
- fertilizer emissions = 40 tCO2e
- livestock and manure emissions = 52 tCO2e
- soil carbon removals = 10 tCO2e

Baseline net balance:

$$
(20 + 8 + 40 + 52) - 10 = 110\ tCO2e
$$

Now assume a new scenario with:

- reduced fertilizer emissions = 28 tCO2e
- reduced diesel emissions = 16 tCO2e
- same livestock and manure emissions = 52 tCO2e
- improved soil removals = 30 tCO2e
- electricity unchanged = 8 tCO2e

Project net balance:

$$
(16 + 8 + 28 + 52) - 30 = 74\ tCO2e
$$

Gross benefit:

$$
110 - 74 = 36\ tCO2e
$$

Now deduct:

- uncertainty = 4
- buffer = 6
- leakage = 2

Estimated credits:

$$
36 - 4 - 6 - 2 = 24\ credits
$$

If carbon price is $18 per credit:

$$
24 \times 18 = 432
$$

If fees total $82:

$$
Net\ Farmer\ Revenue = 432 - 82 = 350
$$

## 14. Suggested Dashboard Widgets

The mock dashboard should display:

- annual emissions by source
- annual removals by source
- net farm balance
- baseline vs project comparison chart
- estimated credits after deductions
- estimated value range
- readiness status
- missing evidence checklist

## 15. Suggested Readiness Status Logic

Use a simple prototype status rather than claiming certification.

Example logic:

- Ready for pilot: field data complete, baseline available, scenario defined
- Needs more data: missing activity records or missing field history
- Low eligibility: no additionality or low measurable benefit
- High uncertainty: too many assumptions or missing verification evidence

Possible score formula:

$$
Readiness\ Score = Data\ Completeness + Additionality\ Confidence + MRV\ Evidence\ Quality + Method\ Fit
$$

Use weighted scoring in the UI, for example out of 100, but clearly label it as an internal prototype score.

## 16. UI Content Strategy

The site should avoid technical overload on the first screen.

Good UI pattern:

- plain-language explanation first
- calculator second
- methodology detail third

Suggested tone:

- simple
- transparent
- practical
- not overpromising

Important copy rule:

Do not say "you will earn carbon credits."

Say:

- estimated credit potential
- projected carbon benefit
- mock financial estimate
- subject to methodology and verification

## 17. Technical Approach For The Mock Website

### Frontend

A simple prototype could be built with:

- React with Vite
- Next.js if you want routing and future backend support

### Backend

For a mock, backend can be optional at first.

Two paths:

1. Frontend-only mock using hardcoded factors and local form state
2. Full prototype with API and database

If building a fuller prototype later, use:

- FastAPI or Node.js backend
- PostgreSQL database
- object storage for evidence files

### Calculation Engine

Keep calculations separate from UI code.

Recommended structure:

- input validation layer
- emission factor config
- calculation service
- scenario comparison service
- reporting service

## 18. MVP Build Scope

If the goal is a portfolio-quality mock website, the MVP should include only these sections:

1. Landing page
2. Simple farm intake form
3. Calculator page
4. Results dashboard
5. MRV checklist page
6. Report summary page

This is enough to demonstrate the concept clearly.

## 19. Future Enhancements

After the mock website works, future versions could include:

- GIS field mapping
- satellite data overlays
- soil testing uploads
- advisor review workflows
- project aggregation across many farms
- buyer marketplace interface
- verifier portal
- registry integration simulation

## 20. Risks And Reality Checks

The mock website should explain these limitations clearly:

- real carbon methodologies are region-specific
- emission factors vary by geography and practice
- soil carbon is difficult to verify precisely
- not every reduction is credit-eligible
- additionality is often the hardest eligibility issue
- verification and registry steps are external to the calculator

## 21. Final Product Statement

Best concept for this prototype:

"A mock farmer carbon readiness platform that estimates farm emissions, simulates practice changes, projects potential carbon credits, and shows what evidence is required before credits could be verified and sold."

## 22. Build Order Recommendation

Build in this order:

1. landing page and education content
2. farm data input forms
3. calculator formulas
4. baseline vs project comparison dashboard
5. readiness and MRV checklist
6. report summary output

That order gives you a usable demo quickly while keeping the complex pieces contained.