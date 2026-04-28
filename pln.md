# Farm Carbon Readiness Platform Plan

## 1. Objective

Create a methodology-aware product prototype that mirrors how a real agricultural carbon project moves from farm intake to quantified benefit, MRV preparation, and commercial screening.

This product should help a farmer, advisor, or project developer answer five real-world questions:

1. Is this farm or parcel even eligible for a carbon project?
2. What is the credible baseline for emissions and removals?
3. What quantified change could a project scenario create?
4. What deductions, uncertainty, and buffer rules reduce that quantity before any issuance claim?
5. What records, spatial evidence, and verification work are still missing?

The platform should be built as a carbon readiness and pre-feasibility system, not as a registry, broker, or verifier.

## 2. Non-Negotiable Accuracy Boundaries

The product should be as close to real-world practice as possible without making false claims.

It should do the following:

- screen methodology fit and basic eligibility
- collect farm, parcel, and activity data at a level useful for pre-feasibility
- estimate baseline and project emissions and removals
- separate gross modeled benefit from deductible or non-creditable volume
- show evidence gaps and verifier-facing readiness blockers
- show an indicative commercial waterfall with explicit caveats

It should not do the following unless a later phase implements them properly:

- claim that credits are issued or guaranteed
- claim that a parcel is certified
- replace validation or third-party verification
- imply that one global formula works for all project types
- imply that satellite imagery alone is sufficient evidence
- imply that modeled benefit equals saleable credits

Every output should clearly distinguish between:

- indicative estimate
- methodology-aligned estimate
- verifier-ready package

## 3. Real-World Reference Basis

The product logic should be informed by real-world carbon accounting practice, especially:

- IPCC greenhouse gas accounting structure for agriculture, forestry, and other land use
- jurisdiction-specific grid factors and fuel factors
- methodology-specific rules from the selected registry or program
- monitoring, reporting, and verification workflows used by project developers and verifiers

The product should not hardcode one universal methodology. It should instead support configurable methodology packs.

Each methodology pack should define:

- eligible project types
- eligible geographies and land uses
- baseline rules
- project activity definitions
- factor library and GWP set
- uncertainty handling
- leakage rules
- permanence and buffer handling
- evidence requirements
- monitoring frequency
- reporting outputs

Examples of methodology-aligned packs the product could support later:

- cropland soil carbon improvement
- grazing or grassland soil carbon improvement
- enteric methane reduction
- manure methane reduction
- agroforestry or tree-based removals
- rice methane reduction

## 4. Product Positioning

The platform should be positioned as a farmer-facing and advisor-facing operating system for carbon readiness.

It is best described as a combination of:

- intake workflow
- eligibility screener
- quantification workbench
- MRV evidence manager
- report generator
- commercial pre-feasibility tool

This positioning is much closer to real market practice than calling it a marketplace or exchange.

## 5. Real-World Operating Model

The system should mirror the actual sequence used in carbon project development.

### Stage 1: Eligibility and Scoping

Determine whether the farm, parcel, and intended project type fit a credible methodology path.

Key checks:

- geography and jurisdiction fit
- land use and parcel type fit
- legal control or land tenure evidence
- project start date
- history of management practices
- double counting risk
- overlap with other programs or environmental claims

### Stage 2: Baseline Definition

Establish the pre-project operating pattern and emissions or removals profile.

Key checks:

- baseline period length
- number of historical seasons or years available
- activity data completeness
- weather or yield anomalies that may distort the baseline
- baseline practice classification

### Stage 3: Project Design

Define the change being proposed and whether it is additional, measurable, and monitorable.

Key checks:

- project practice change start date
- expected adoption area
- project activity boundaries
- implementation schedule
- reversibility risk
- methodology constraints on activity combinations

### Stage 4: Quantification

Estimate ex-ante reductions or removals using the selected methodology path.

Outputs:

- baseline emissions
- baseline removals
- project emissions
- project removals
- gross quantified benefit
- deductions and conservative adjustments
- indicative creditable volume

### Stage 5: MRV Preparation

Prepare the evidence and reporting structure that a project developer and verifier would need.

Outputs:

- parcel boundary status
- baseline evidence completeness
- activity evidence completeness
- sampling status
- unresolved assumptions
- audit packet readiness

### Stage 6: Commercial Screening

Show what the project could look like commercially after the real-world waterfall.

Outputs:

- gross modeled volume
- buffer withholding
- issuance-adjusted volume
- registry and verification costs
- developer or platform share
- indicative farmer payout range
- key risk notes

## 6. Target Users

Primary users:

- farmers
- farm managers
- agricultural advisors
- project origination teams

Secondary users:

- carbon project developers
- sustainability leads
- MRV operations teams
- verifier-facing coordinators

Later-stage users:

- finance or procurement teams screening project economics
- registry operations teams reviewing output packages

## 7. Core User Problems

Real users typically do not know:

- whether their land and practices qualify at all
- whether they have enough historical data for a credible baseline
- whether the scenario is additional rather than already common practice
- whether the modeled benefit will survive deductions and conservative adjustments
- whether they have the records to survive verification
- whether the expected payout still makes sense after fees, reserves, and issuance delays

The platform should reduce this uncertainty by making the real project logic visible instead of hiding it behind a single number.

## 8. Core Product Modules

### 8.1 Farm and Legal Profile

Collect:

- farm entity name
- operator name
- country and region
- legal ownership or land control status
- contract structure if leased or aggregated
- farm boundary and parcel count
- enterprise type such as crops, mixed, livestock, or agroforestry

### 8.2 Spatial and Parcel Module

Collect and validate:

- georeferenced parcel boundaries
- area by parcel
- parcel adjacency and overlap risk
- exclusions or ineligible subareas
- land-use history
- sampling strata
- water source and irrigation footprint

### 8.3 Baseline Data Module

Collect historical data by field, parcel, and year where relevant:

- crop rotation
- tillage system
- fertilizer and manure inputs
- irrigation electricity or fuel
- diesel and machinery passes
- livestock class and count
- grazing intensity or grazing days
- yield where relevant to methodology
- residue management
- previous tree cover or woody biomass condition

### 8.4 Scenario Design Module

Define proposed changes:

- reduced tillage or no-till
- cover crop adoption
- nutrient management optimization
- manure system changes
- feed or herd management changes
- rotational grazing improvements
- agroforestry establishment
- irrigation or energy changes if allowed by methodology

### 8.5 Quantification Engine

Calculate:

- baseline emissions and removals
- project emissions and removals
- gross benefit
- leakage
- uncertainty deduction or conservative adjustment
- permanence or buffer withholding
- ineligible acreage or activity deductions
- indicative creditable volume

### 8.6 MRV and Evidence Module

Track:

- source documents
- parcel maps
- sampling logs
- invoices and receipts
- machine logs
- livestock records
- baseline records by year
- methodology assumptions that still need substantiation

### 8.7 Commercial Module

Estimate:

- issued quantity after deductions
- saleable quantity after reserves or commitments
- price scenarios by vintage or quality assumption
- registry costs
- validation and verification costs
- developer share or platform fee
- farmer net payout range

## 9. Functional Requirements

### 9.1 Required Phase 1 Features

- methodology pack selector
- farm and parcel intake
- field-level activity capture
- baseline period setup
- scenario comparison
- gross and net quantified benefit view
- deductions waterfall
- evidence readiness tracker
- audit packet summary
- indicative commercial estimate

### 9.2 Required Phase 2 Features

- parcel drawing or shapefile upload
- ineligible area marking
- stratification support for sampling
- versioned evidence records
- assumption approval workflow
- multi-year monitoring view
- exportable methodology summary

### 9.3 Required Phase 3 Features

- program or registry specific calculation packs
- aggregator support for many farms
- verifier review state model
- QA and exception queue
- issuance forecast by monitoring period and vintage

## 10. Non-Functional Requirements

- transparent formulas and factor sources
- editable but permission-controlled assumptions
- strong unit handling across hectares, kilograms, liters, kWh, headcount, and tCO2e
- explicit data provenance for every important output
- audit-friendly event history
- conservative defaults where data quality is weak
- clear separation between modeled and verified values
- mobile-friendly field data capture where practical
- desktop-first workbench for quantification and MRV review

## 11. Real-World Data Model

Suggested core entities for the more accurate product.

### User

- id
- name
- email
- role
- organization_id

### Organization

- id
- name
- type such as farm, advisor, developer, verifier-facing team

### Farm

- id
- organization_id
- farm_name
- country
- region
- farm_boundary_status
- legal_control_status
- total_area_ha
- farming_system

### Parcel

- id
- farm_id
- parcel_name
- geometry
- area_ha
- eligibility_status
- exclusion_area_ha
- land_use_history
- tenure_notes

### Field or Management Unit

- id
- parcel_id
- field_name
- soil_type
- irrigation_type
- baseline_practice
- project_practice
- crop_system
- livestock_linkage
- stratum_id

### Baseline Period

- id
- farm_id
- methodology_pack_id
- start_year
- end_year
- normalization_notes

### Activity Record

- id
- field_id
- year
- crop_type
- yield
- fertilizer_n_kg
- organic_amendment_n_kg
- diesel_liters
- electricity_kwh
- livestock_count_by_class
- manure_system
- tillage_type
- residue_management
- grazing_days

### Scenario

- id
- farm_id
- methodology_pack_id
- scenario_name
- start_year
- adoption_area_ha
- assumptions_json

### Methodology Pack

- id
- name
- registry_or_program
- version
- project_type
- geography_rules
- factor_set_id
- gwp_set
- deduction_rules
- evidence_requirements

### Factor Set

- id
- source_name
- source_version
- region_scope
- factors_json

### Evidence Item

- id
- farm_id
- parcel_id nullable
- field_id nullable
- category
- source_year
- owner
- status
- provenance
- file_uri
- reviewer_notes

### Quantification Run

- id
- scenario_id
- methodology_pack_id
- run_type such as indicative or methodology-aligned
- baseline_emissions_tco2e
- baseline_removals_tco2e
- project_emissions_tco2e
- project_removals_tco2e
- gross_benefit_tco2e
- leakage_tco2e
- uncertainty_tco2e
- ineligible_tco2e
- buffer_tco2e
- indicative_credits_tco2e
- assumptions_hash

### Commercial Estimate

- id
- quantification_run_id
- price_per_credit
- registry_cost
- validation_cost
- verification_cost
- developer_share
- platform_fee
- financing_discount
- tax_estimate
- indicative_farmer_net

## 12. Eligibility and Additionality Logic

This is one of the most important missing pieces in most simple carbon tools.

The platform should not let the user jump straight to credits without checking these gates.

### 12.1 Eligibility Gates

- parcel boundary exists and is controlled by the participant
- land use fits the methodology pack
- project start date is acceptable under the methodology rules
- required baseline history is available or reasonably reconstructable
- no obvious double counting with another carbon or environmental claim
- no excluded land class or prohibited activity combination

### 12.2 Additionality Gates

Depending on methodology pack, the product should support these tests:

- regulatory surplus test
- common practice test
- barrier test
- investment or financial attractiveness test
- practice adoption timing test

The UI should make clear that a parcel can model benefit but still fail additionality.

## 13. Quantification Architecture

The product should separate carbon logic into these layers:

1. methodology pack
2. activity data
3. factor library
4. baseline model
5. project model
6. deduction layer
7. readiness and evidence layer
8. commercial waterfall

Important: the system should support both ex-ante estimates and ex-post monitoring outputs.

- ex-ante estimate = forward-looking project potential
- ex-post quantity = monitoring-period quantity supported by evidence and verification

## 14. Core Quantification Formulas

All formulas below should be treated as framework-level formulas. The exact implementation should be parameterized by methodology pack and factor source.

### 14.1 CO2e Conversion

$$
CO2e = CO2 + (CH4 \times GWP_{CH4}) + (N2O \times GWP_{N2O})
$$

Notes:

- GWP values must be configurable because programs can reference different assessment reports.
- The selected GWP set must be stored on every quantification run.

### 14.2 Generic Activity Emissions

$$
Emissions_i = Activity_i \times EF_i
$$

Where:

- $Activity_i$ is the measured activity level
- $EF_i$ is the approved emissions factor for the methodology pack

### 14.3 Diesel Combustion

$$
Diesel\ Emissions\ (kg\ CO2e) = Diesel\ Liters \times EF_{diesel}
$$

### 14.4 Grid Electricity

$$
Electricity\ Emissions\ (kg\ CO2e) = Electricity\ kWh \times EF_{grid}
$$

Where $EF_{grid}$ must be regional and time-appropriate when possible.

### 14.5 Direct Soil N2O From Nitrogen Inputs

Framework form:

$$
N2O\text{-}N_{direct} = N_{applied} \times EF_1
$$

$$
N2O_{direct} = N2O\text{-}N_{direct} \times \frac{44}{28}
$$

$$
Emissions_{direct\ N2O} = N2O_{direct} \times GWP_{N2O}
$$

For a more complete methodology-aligned path, the system should later support:

- synthetic nitrogen
- organic amendments
- residue returns
- urine and dung deposition
- mineralization from land-use change where relevant

### 14.6 Indirect Soil N2O

More realistic agricultural quantification should also allow indirect N2O from volatilization and leaching.

Framework form:

$$
N2O\text{-}N_{indirect} = (N_{volatilized} \times EF_4) + (N_{leached} \times EF_5)
$$

Then convert to $N2O$ and to $CO2e$ using the same conversion logic.

### 14.7 Enteric Methane

Simplified factor form:

$$
CH4_{enteric} = \sum (Animals_c \times EF_{enteric,c})
$$

$$
Emissions_{enteric} = CH4_{enteric} \times GWP_{CH4}
$$

The full product should differentiate by livestock class, productivity, and feeding system where methodology requires it.

### 14.8 Manure Emissions

Simplified factor form:

$$
Emissions_{manure} = \sum (Animals_c \times EF_{manure,c,system})
$$

Later, a more detailed manure path can support methane and nitrous oxide separately by manure management system.

### 14.9 Soil Organic Carbon Change

There should be two supported paths over time:

- modeled SOC change
- measured SOC stock change

Measured stock-change framework:

$$
Annual\ SOC\ Change = \frac{(SOC_{t2} - SOC_{t1}) \times BD \times Depth \times Area \times (1 - CF) \times \frac{44}{12}}{Monitoring\ Interval}
$$

Where:

- $SOC$ = soil organic carbon concentration or stock basis used by the method
- $BD$ = bulk density
- $Depth$ = sampled depth
- $Area$ = land area
- $CF$ = coarse fragment fraction if required

The exact stock-change formulation should follow the selected methodology pack and its sampling design.

### 14.10 Woody Biomass or Agroforestry Change

Where relevant:

$$
Biomass\ Removal = Area \times Biomass\ Growth\ Rate \times \frac{44}{12}
$$

This should only be used where the methodology pack explicitly allows it and the evidence path is defined.

### 14.11 Baseline Net Balance

$$
Baseline\ Net = Baseline\ Emissions - Baseline\ Removals
$$

### 14.12 Project Net Balance

$$
Project\ Net = Project\ Emissions - Project\ Removals
$$

### 14.13 Gross Quantified Benefit

$$
Gross\ Benefit = Baseline\ Net - Project\ Net
$$

This is the modeled climate improvement before deductions and conservative adjustments.

### 14.14 Leakage

Leakage should not be treated as a cosmetic flat deduction forever.

In the accurate plan, leakage should be modeled as either:

- a methodology-defined factor
- a scenario-specific quantified adjustment
- a conservative default where evidence is weak

Framework form:

$$
Net\ After\ Leakage = Gross\ Benefit - Leakage
$$

### 14.15 Uncertainty or Conservative Deduction

Where the methodology or data quality requires conservatism:

$$
Net\ After\ Uncertainty = Net\ After\ Leakage - Uncertainty\ Deduction
$$

This deduction may come from:

- sampling uncertainty
- model uncertainty
- missing evidence
- conservative discount rules in the chosen methodology

### 14.16 Ineligible Activity or Area Deduction

$$
Eligible\ Benefit = Net\ After\ Uncertainty - Ineligible\ Adjustments
$$

### 14.17 Buffer or Permanence Reserve

For projects where reversal risk applies, some quantity may need to be withheld.

$$
Indicative\ Issuable\ Quantity = \max(0, Eligible\ Benefit - Buffer\ Withholding)
$$

### 14.18 Commercial Waterfall

$$
Indicative\ Gross\ Revenue = Indicative\ Issuable\ Quantity \times Price\ Assumption
$$

$$
Indicative\ Net\ To\ Farmer = Gross\ Revenue - Registry\ Costs - Validation\ Costs - Verification\ Costs - Developer\ Share - Platform\ Fee - Financing\ Discount - Taxes
$$

Important: this is not payout certainty. It is a scenario screen.

## 15. Example Of A More Realistic Estimate Chain

The UI should present the estimate in this order:

1. baseline net
2. project net
3. gross quantified benefit
4. leakage deduction
5. uncertainty or conservative deduction
6. ineligible area or activity deduction
7. buffer withholding
8. indicative issuable quantity
9. indicative saleable quantity
10. indicative commercial net

This sequence is much more faithful to real project development than showing one direct credit number.

## 16. MRV and Evidence Requirements

The MRV module should be built around the evidence categories that real project teams actually chase.

### 16.1 Spatial Evidence

- parcel geometry
- boundary change history
- exclusion zones
- adjacency and overlap review
- stratification map

### 16.2 Baseline Evidence

- historical field logs
- purchase records
- energy or fuel bills
- livestock records
- yield records where required
- land-use history evidence

### 16.3 Project Activity Evidence

- planting and tillage records
- cover crop seed purchases
- nutrient management plans
- grazing rotation records
- manure handling logs
- agroforestry establishment evidence

### 16.4 Quantification Evidence

- factor source version
- sampling plan
- soil test results
- lab metadata
- model assumptions
- QA and reviewer notes

### 16.5 Verification Readiness Flags

- missing document
- document exists but not linked
- linked but not reviewed
- reviewed with open issue
- accepted for packet

## 17. Readiness Scoring Logic

The readiness score should remain an internal operating score, not a certification claim.

It should combine both weighted scoring and hard gates.

### 17.1 Hard Gates

The farm should never be marked ready if any of these fail:

- no land control evidence
- no methodology fit
- no baseline period defined
- no parcel boundaries
- no project scenario defined

### 17.2 Weighted Readiness Dimensions

- methodology fit
- legal and spatial control
- baseline data completeness
- activity evidence completeness
- sampling and quantification confidence
- MRV packet completeness
- commercial viability

Example score structure:

$$
Readiness\ Score = \sum (Weight_i \times Score_i)
$$

But the UI must always show gate failures separately from the numeric score.

## 18. Suggested Dashboard Outputs

The dashboard should expose the real structure of the project.

Recommended widgets:

- baseline emissions by source
- project emissions by source
- baseline removals by source
- project removals by source
- gross benefit waterfall
- deductions waterfall
- eligible area versus excluded area
- indicative issuable volume
- evidence completeness by category
- readiness gates and blockers
- indicative commercial waterfall

## 19. UI Content Rules

Good UI copy is critical because overclaiming is one of the biggest realism failures.

Avoid:

- you will earn credits
- guaranteed payout
- certified project
- verifier approved

Prefer:

- indicative carbon benefit
- methodology-aligned estimate
- subject to validation, verification, and registry rules
- evidence still required
- commercial scenario only

The interface should privilege:

- transparent assumptions
- visible deductions
- visible missing evidence
- visible methodology selection
- visible confidence level

## 20. Technical Architecture

### Frontend

- Next.js application for product shell and workbench
- desktop-first quantification and MRV interface
- mobile-capable field data capture where useful

### Backend

For a serious prototype, backend should be included.

Recommended components:

- API service
- PostgreSQL database
- object storage for evidence files
- background job runner for quantification runs and exports

### Calculation Engine

Keep the engine separate from UI code.

Recommended services:

- methodology pack service
- factor library service
- eligibility rules engine
- quantification engine
- deductions engine
- readiness engine
- reporting and export service

### Auditability

Store on each calculation run:

- methodology pack id and version
- factor set id and version
- GWP set
- input snapshot hash
- run timestamp
- reviewer notes if overridden

## 21. MVP Build Scope

If the immediate goal is a serious, portfolio-quality product prototype, the MVP should include:

1. methodology-aware intake
2. parcel and field setup
3. baseline and scenario workbench
4. deductions waterfall
5. MRV evidence desk
6. readiness gates and score
7. indicative commercial output
8. report summary

This is enough to demonstrate a credible real-world product direction without pretending the tool already performs full issuance-grade quantification.

## 22. Recommended Next Product Modules

If realism is the priority, the next modules should be built in this order:

1. methodology and factor engine
2. eligibility and additionality gates
3. deductions waterfall and commercial waterfall
4. evidence versioning and audit trail
5. spatial eligibility and exclusion engine

That order will close the biggest gap between a beautiful prototype and a real project development system.

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