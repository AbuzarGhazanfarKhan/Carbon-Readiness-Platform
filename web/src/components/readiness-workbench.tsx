"use client";

import { startTransition, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Database,
  FileCheck2,
  Map as MapIcon,
  MapPinned,
  Plus,
  ShieldCheck,
  Tractor,
  Trash2,
  TreePine,
} from "lucide-react";

type Practice = "conventional" | "reduced" | "no-till";
type StepId =
  | "farm"
  | "fields"
  | "mapping"
  | "scenario"
  | "readiness"
  | "results"
  | "packet";
type PacketStatus = "ready" | "review" | "missing";
type BoundaryStatus = "mapped" | "review" | "missing";
type BoundaryMethod = "Satellite trace" | "Survey upload" | "Manual sketch";
type ExclusionReason =
  | "None"
  | "Road / access"
  | "Canal or drainage edge"
  | "Riparian buffer"
  | "Habitation / structure"
  | "Unverified boundary";
type ReversalRiskLevel = "low" | "moderate" | "high";
type LandControlStatus =
  | "owned"
  | "lease-consent"
  | "aggregator-mandate"
  | "missing";
type RegulatorySurplusStatus = "clear" | "review" | "blocked";
type CommonPracticeStatus = "clear" | "review" | "common";
type BarrierStatus = "clear" | "review" | "weak";
type AdoptionTimingStatus = "clear" | "review" | "retroactive";
type DoubleCountStatus = "clear" | "review" | "flagged";
type PacketCategory =
  | "Boundary"
  | "Baseline"
  | "Operations"
  | "Soil"
  | "Commercial"
  | "Records"
  | "Review";

type FactorSet = {
  dieselEf: number;
  nitrogenEf: number;
  n2oGwp: number;
  ch4Gwp: number;
  entericEf: number;
  manureEf: number;
};

type ScenarioPresetLabel = "Conservative" | "Balanced" | "Stretch";

type ScenarioControlConfig = {
  label: string;
  min: number;
  max: number;
};

type MethodologyPack = {
  id: string;
  label: string;
  registryLabel: string;
  projectType: string;
  regionIds: string[];
  minimumBaselineYears: number;
  factorSet: FactorSet;
  evidenceFocus: string;
  deductionFocus: string;
  scenarioPresets: Record<ScenarioPresetLabel, ScenarioState>;
  scenarioControls: Record<keyof ScenarioState, ScenarioControlConfig>;
};

type CommercialScenario = {
  pricePerCredit: number;
  registryCost: number;
  verificationCost: number;
  platformFee: number;
  developerSharePct: number;
};

type ReversalRiskDriver = {
  key: string;
  label: string;
  detail: string;
  value: number;
};

type FarmProfile = {
  farmName: string;
  regionId: string;
  methodologyId: string;
  landControlStatus: LandControlStatus;
  baselineYears: number;
  permanenceYears: number;
  droughtRiskLevel: ReversalRiskLevel;
  floodRiskLevel: ReversalRiskLevel;
  fireRiskLevel: ReversalRiskLevel;
  regulatorySurplusStatus: RegulatorySurplusStatus;
  commonPracticeStatus: CommonPracticeStatus;
  barrierStatus: BarrierStatus;
  adoptionTimingStatus: AdoptionTimingStatus;
  doubleCountStatus: DoubleCountStatus;
};

type FieldRecord = {
  id: number;
  name: string;
  areaHa: number;
  cropType: string;
  soilType: string;
  nitrogenKgPerHa: number;
  dieselLitersPerHa: number;
  electricityKwhPerHa: number;
  livestockHead: number;
  baselinePractice: Practice;
  projectPractice: Practice;
  baselineRemovalRate: number;
  coverCropPlanned: boolean;
  agroforestryHa: number;
  boundaryStatus: BoundaryStatus;
  boundaryMethod: BoundaryMethod;
  geometryConfidencePct: number;
  samplingCoveragePct: number;
  adjacencyRiskPct: number;
  excludedAreaHa: number;
  exclusionReason: ExclusionReason;
  waterSource: string;
  boundaryNotes: string;
};

type ScenarioState = {
  nitrogenReductionPct: number;
  dieselOptimizationPct: number;
  entericReductionPct: number;
  manureImprovementPct: number;
  leakagePct: number;
  uncertaintyPct: number;
  bufferPct: number;
  ineligiblePct: number;
};

type ReadinessItem = {
  key: string;
  label: string;
  note: string;
  weight: number;
  complete: boolean;
};

type EvidenceDocument = {
  id: number;
  title: string;
  category: PacketCategory;
  linkedFieldId: number | null;
  season: string;
  owner: string;
  status: PacketStatus;
  note: string;
  readinessKey: ReadinessItem["key"];
};

type RegionConfig = {
  id: string;
  label: string;
  gridFactor: number;
};

type FieldResult = {
  id: number;
  name: string;
  baselineEmissions: number;
  baselineRemovals: number;
  projectEmissions: number;
  projectRemovals: number;
  grossBenefit: number;
};

type StepDefinition = {
  id: StepId;
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const regionConfigs: RegionConfig[] = [
  { id: "south-asia", label: "South Asia mixed grid", gridFactor: 0.52 },
  { id: "mena", label: "MENA irrigated grid", gridFactor: 0.61 },
  { id: "eu-lower-carbon", label: "EU lower-carbon grid", gridFactor: 0.24 },
];

const scenarioPresetOrder: ScenarioPresetLabel[] = [
  "Conservative",
  "Balanced",
  "Stretch",
];

const scenarioControlOrder: Array<keyof ScenarioState> = [
  "nitrogenReductionPct",
  "dieselOptimizationPct",
  "entericReductionPct",
  "manureImprovementPct",
  "leakagePct",
  "uncertaintyPct",
  "bufferPct",
  "ineligiblePct",
];

const exclusionReasonOptions: ExclusionReason[] = [
  "None",
  "Road / access",
  "Canal or drainage edge",
  "Riparian buffer",
  "Habitation / structure",
  "Unverified boundary",
];

const croplandScenarioPresets: Record<ScenarioPresetLabel, ScenarioState> = {
  Conservative: {
    nitrogenReductionPct: 10,
    dieselOptimizationPct: 6,
    entericReductionPct: 0,
    manureImprovementPct: 2,
    leakagePct: 4,
    uncertaintyPct: 15,
    bufferPct: 20,
    ineligiblePct: 3,
  },
  Balanced: {
    nitrogenReductionPct: 16,
    dieselOptimizationPct: 10,
    entericReductionPct: 0,
    manureImprovementPct: 4,
    leakagePct: 5,
    uncertaintyPct: 12,
    bufferPct: 18,
    ineligiblePct: 2,
  },
  Stretch: {
    nitrogenReductionPct: 24,
    dieselOptimizationPct: 16,
    entericReductionPct: 0,
    manureImprovementPct: 8,
    leakagePct: 4,
    uncertaintyPct: 10,
    bufferPct: 16,
    ineligiblePct: 2,
  },
};

const croplandScenarioControls: Record<keyof ScenarioState, ScenarioControlConfig> = {
  nitrogenReductionPct: { label: "Nitrogen reduction", min: 0, max: 35 },
  dieselOptimizationPct: { label: "Diesel optimization", min: 0, max: 25 },
  entericReductionPct: { label: "Enteric improvement", min: 0, max: 4 },
  manureImprovementPct: { label: "Manure improvement", min: 0, max: 12 },
  leakagePct: { label: "Leakage deduction", min: 2, max: 10 },
  uncertaintyPct: { label: "Uncertainty deduction", min: 8, max: 20 },
  bufferPct: { label: "Base buffer reserve", min: 10, max: 25 },
  ineligiblePct: { label: "Other ineligible adjustment", min: 0, max: 10 },
};

const grazingScenarioPresets: Record<ScenarioPresetLabel, ScenarioState> = {
  Conservative: {
    nitrogenReductionPct: 8,
    dieselOptimizationPct: 4,
    entericReductionPct: 4,
    manureImprovementPct: 8,
    leakagePct: 7,
    uncertaintyPct: 16,
    bufferPct: 22,
    ineligiblePct: 4,
  },
  Balanced: {
    nitrogenReductionPct: 12,
    dieselOptimizationPct: 7,
    entericReductionPct: 8,
    manureImprovementPct: 14,
    leakagePct: 6,
    uncertaintyPct: 14,
    bufferPct: 20,
    ineligiblePct: 3,
  },
  Stretch: {
    nitrogenReductionPct: 16,
    dieselOptimizationPct: 10,
    entericReductionPct: 12,
    manureImprovementPct: 20,
    leakagePct: 5,
    uncertaintyPct: 12,
    bufferPct: 18,
    ineligiblePct: 3,
  },
};

const grazingScenarioControls: Record<keyof ScenarioState, ScenarioControlConfig> = {
  nitrogenReductionPct: { label: "Nitrogen reduction", min: 0, max: 20 },
  dieselOptimizationPct: { label: "Diesel optimization", min: 0, max: 20 },
  entericReductionPct: { label: "Enteric improvement", min: 0, max: 20 },
  manureImprovementPct: { label: "Manure improvement", min: 0, max: 30 },
  leakagePct: { label: "Leakage deduction", min: 3, max: 12 },
  uncertaintyPct: { label: "Uncertainty deduction", min: 10, max: 22 },
  bufferPct: { label: "Base buffer reserve", min: 15, max: 28 },
  ineligiblePct: { label: "Other ineligible adjustment", min: 0, max: 12 },
};

const agroforestryScenarioPresets: Record<ScenarioPresetLabel, ScenarioState> = {
  Conservative: {
    nitrogenReductionPct: 6,
    dieselOptimizationPct: 4,
    entericReductionPct: 0,
    manureImprovementPct: 2,
    leakagePct: 3,
    uncertaintyPct: 18,
    bufferPct: 26,
    ineligiblePct: 4,
  },
  Balanced: {
    nitrogenReductionPct: 10,
    dieselOptimizationPct: 6,
    entericReductionPct: 0,
    manureImprovementPct: 4,
    leakagePct: 3,
    uncertaintyPct: 16,
    bufferPct: 24,
    ineligiblePct: 3,
  },
  Stretch: {
    nitrogenReductionPct: 14,
    dieselOptimizationPct: 8,
    entericReductionPct: 0,
    manureImprovementPct: 6,
    leakagePct: 2,
    uncertaintyPct: 14,
    bufferPct: 20,
    ineligiblePct: 3,
  },
};

const agroforestryScenarioControls: Record<keyof ScenarioState, ScenarioControlConfig> = {
  nitrogenReductionPct: { label: "Nitrogen reduction", min: 0, max: 18 },
  dieselOptimizationPct: { label: "Diesel optimization", min: 0, max: 15 },
  entericReductionPct: { label: "Enteric improvement", min: 0, max: 6 },
  manureImprovementPct: { label: "Manure improvement", min: 0, max: 12 },
  leakagePct: { label: "Leakage deduction", min: 1, max: 8 },
  uncertaintyPct: { label: "Uncertainty deduction", min: 12, max: 24 },
  bufferPct: { label: "Base buffer reserve", min: 18, max: 35 },
  ineligiblePct: { label: "Other ineligible adjustment", min: 0, max: 12 },
};

const methodologyPacks: MethodologyPack[] = [
  {
    id: "cropland-soil",
    label: "Cropland soil carbon readiness",
    registryLabel: "Practice-change soil carbon pathway",
    projectType: "Tillage, cover crops, and nutrient management",
    regionIds: ["south-asia", "mena", "eu-lower-carbon"],
    minimumBaselineYears: 3,
    factorSet: {
      dieselEf: 2.68,
      nitrogenEf: 0.0052,
      n2oGwp: 273,
      ch4Gwp: 27.2,
      entericEf: 44,
      manureEf: 650,
    },
    evidenceFocus:
      "Parcel history, input ledgers, and soil sampling design need to align before the estimate is trusted.",
    deductionFocus:
      "Uncertainty and buffer stay conservative until baseline history and sampling coverage are stronger.",
    scenarioPresets: croplandScenarioPresets,
    scenarioControls: croplandScenarioControls,
  },
  {
    id: "grazing-methane",
    label: "Grazing and methane readiness",
    registryLabel: "Livestock methane and grazing pathway",
    projectType: "Enteric methane, manure, and grazing changes",
    regionIds: ["south-asia", "mena"],
    minimumBaselineYears: 3,
    factorSet: {
      dieselEf: 2.68,
      nitrogenEf: 0.0048,
      n2oGwp: 273,
      ch4Gwp: 27.2,
      entericEf: 49,
      manureEf: 720,
    },
    evidenceFocus:
      "Herd class, feed regime, manure system, and grazing records matter more than broad farm averages.",
    deductionFocus:
      "Methane claims should stay conservative until livestock class and manure handling evidence are complete.",
    scenarioPresets: grazingScenarioPresets,
    scenarioControls: grazingScenarioControls,
  },
  {
    id: "agroforestry-removals",
    label: "Agroforestry removals readiness",
    registryLabel: "Woody biomass and agroforestry pathway",
    projectType: "Tree establishment and long-term removals",
    regionIds: ["south-asia", "mena", "eu-lower-carbon"],
    minimumBaselineYears: 4,
    factorSet: {
      dieselEf: 2.68,
      nitrogenEf: 0.0052,
      n2oGwp: 273,
      ch4Gwp: 27.2,
      entericEf: 40,
      manureEf: 610,
    },
    evidenceFocus:
      "Tree establishment timing, exclusion zones, and a biomass monitoring plan are required early.",
    deductionFocus:
      "Buffer withholding stays prominent because permanence and reversal risk take time to evidence.",
    scenarioPresets: agroforestryScenarioPresets,
    scenarioControls: agroforestryScenarioControls,
  },
];

const landControlOptions: Array<{
  value: LandControlStatus;
  label: string;
}> = [
  { value: "owned", label: "Owned title" },
  { value: "lease-consent", label: "Lease with written consent" },
  { value: "aggregator-mandate", label: "Aggregator mandate" },
  { value: "missing", label: "Missing or unresolved" },
];

const regulatorySurplusOptions: Array<{
  value: RegulatorySurplusStatus;
  label: string;
}> = [
  { value: "clear", label: "Clear regulatory surplus" },
  { value: "review", label: "Needs review" },
  { value: "blocked", label: "Blocked by current requirement" },
];

const commonPracticeOptions: Array<{
  value: CommonPracticeStatus;
  label: string;
}> = [
  { value: "clear", label: "Not common practice" },
  { value: "review", label: "Needs benchmark review" },
  { value: "common", label: "Already common practice" },
];

const barrierOptions: Array<{
  value: BarrierStatus;
  label: string;
}> = [
  { value: "clear", label: "Clear barrier or investment case" },
  { value: "review", label: "Needs supporting evidence" },
  { value: "weak", label: "Weak barrier case" },
];

const adoptionTimingOptions: Array<{
  value: AdoptionTimingStatus;
  label: string;
}> = [
  { value: "clear", label: "Adoption timing is acceptable" },
  { value: "review", label: "Needs timing review" },
  { value: "retroactive", label: "Change may be too early or retroactive" },
];

const doubleCountOptions: Array<{
  value: DoubleCountStatus;
  label: string;
}> = [
  { value: "clear", label: "No overlap found" },
  { value: "review", label: "Needs overlap review" },
  { value: "flagged", label: "Potential double count" },
];

const reversalRiskOptions: Array<{
  value: ReversalRiskLevel;
  label: string;
}> = [
  { value: "low", label: "Low exposure" },
  { value: "moderate", label: "Moderate exposure" },
  { value: "high", label: "High exposure" },
];

const landControlLabels: Record<LandControlStatus, string> = {
  owned: "Owned title",
  "lease-consent": "Lease with written consent",
  "aggregator-mandate": "Aggregator mandate",
  missing: "Missing or unresolved",
};

const regulatorySurplusLabels: Record<RegulatorySurplusStatus, string> = {
  clear: "Clear regulatory surplus",
  review: "Needs review",
  blocked: "Blocked by current requirement",
};

const commonPracticeLabels: Record<CommonPracticeStatus, string> = {
  clear: "Not common practice",
  review: "Needs benchmark review",
  common: "Already common practice",
};

const barrierLabels: Record<BarrierStatus, string> = {
  clear: "Clear barrier or investment case",
  review: "Needs supporting evidence",
  weak: "Weak barrier case",
};

const adoptionTimingLabels: Record<AdoptionTimingStatus, string> = {
  clear: "Adoption timing is acceptable",
  review: "Needs timing review",
  retroactive: "Change may be too early or retroactive",
};

const doubleCountLabels: Record<DoubleCountStatus, string> = {
  clear: "No overlap found",
  review: "Needs overlap review",
  flagged: "Potential double count",
};

const reversalRiskLabels: Record<ReversalRiskLevel, string> = {
  low: "Low exposure",
  moderate: "Moderate exposure",
  high: "High exposure",
};

const reversalRiskScore: Record<ReversalRiskLevel, number> = {
  low: 0,
  moderate: 2,
  high: 4,
};

const practiceOptions: Array<{ value: Practice; label: string }> = [
  { value: "conventional", label: "Conventional tillage" },
  { value: "reduced", label: "Reduced tillage" },
  { value: "no-till", label: "No-till" },
];

const initialFields: FieldRecord[] = [
  {
    id: 1,
    name: "North Block",
    areaHa: 180,
    cropType: "Cotton",
    soilType: "Silty loam",
    nitrogenKgPerHa: 44,
    dieselLitersPerHa: 15,
    electricityKwhPerHa: 28,
    livestockHead: 10,
    baselinePractice: "conventional",
    projectPractice: "reduced",
    baselineRemovalRate: 0.03,
    coverCropPlanned: true,
    agroforestryHa: 10,
    boundaryStatus: "mapped",
    boundaryMethod: "Satellite trace",
    geometryConfidencePct: 91,
    samplingCoveragePct: 76,
    adjacencyRiskPct: 18,
    excludedAreaHa: 6,
    exclusionReason: "Canal or drainage edge",
    waterSource: "Canal lateral",
    boundaryNotes:
      "Boundary trace reconciled to the current season plan with one small roadside edge to confirm.",
  },
  {
    id: 2,
    name: "River Parcel",
    areaHa: 142,
    cropType: "Wheat",
    soilType: "Clay loam",
    nitrogenKgPerHa: 39,
    dieselLitersPerHa: 17,
    electricityKwhPerHa: 38,
    livestockHead: 8,
    baselinePractice: "reduced",
    projectPractice: "no-till",
    baselineRemovalRate: 0.025,
    coverCropPlanned: true,
    agroforestryHa: 4,
    boundaryStatus: "review",
    boundaryMethod: "Survey upload",
    geometryConfidencePct: 74,
    samplingCoveragePct: 58,
    adjacencyRiskPct: 37,
    excludedAreaHa: 12,
    exclusionReason: "Riparian buffer",
    waterSource: "Tube well",
    boundaryNotes:
      "Survey upload exists, but the river edge and one irrigation cut still need a second geometry review.",
  },
  {
    id: 3,
    name: "Orchard Edge",
    areaHa: 90,
    cropType: "Mixed orchard",
    soilType: "Sandy loam",
    nitrogenKgPerHa: 32,
    dieselLitersPerHa: 13,
    electricityKwhPerHa: 49,
    livestockHead: 10,
    baselinePractice: "reduced",
    projectPractice: "reduced",
    baselineRemovalRate: 0.04,
    coverCropPlanned: false,
    agroforestryHa: 14,
    boundaryStatus: "missing",
    boundaryMethod: "Manual sketch",
    geometryConfidencePct: 42,
    samplingCoveragePct: 24,
    adjacencyRiskPct: 52,
    excludedAreaHa: 18,
    exclusionReason: "Unverified boundary",
    waterSource: "Drip storage tank",
    boundaryNotes:
      "Only a hand sketch exists today. Formal parcel geometry and sampling layout still need to be built.",
  },
];

const boundaryMethodOptions: BoundaryMethod[] = [
  "Satellite trace",
  "Survey upload",
  "Manual sketch",
];

const boundaryStatusOptions: Array<{ value: BoundaryStatus; label: string }> = [
  { value: "mapped", label: "Mapped" },
  { value: "review", label: "Needs review" },
  { value: "missing", label: "Missing" },
];

const boundaryStatusLabels: Record<BoundaryStatus, string> = {
  mapped: "Mapped",
  review: "Needs review",
  missing: "Missing",
};

const boundaryStatusClasses: Record<BoundaryStatus, string> = {
  mapped: "border-[#27ddb4]/30 bg-[rgba(39,221,180,0.1)] text-[#7ce5d8]",
  review: "border-[#f2c77f]/30 bg-[#f2c77f]/10 text-[#f2c77f]",
  missing: "border-[#f3a66b]/28 bg-[#f3a66b]/10 text-[#f3d6b2]",
};

const initialReadiness: ReadinessItem[] = [
  {
    key: "boundaries",
    label: "Field boundaries",
    note: "Mapped parcels or reconciled field boundaries.",
    weight: 20,
    complete: true,
  },
  {
    key: "baseline-history",
    label: "Baseline records",
    note: "At least three seasons of historical crop and input data.",
    weight: 20,
    complete: true,
  },
  {
    key: "activity-logs",
    label: "Activity logs",
    note: "Seasonal logs for tillage, planting, fertilizer, and irrigation.",
    weight: 20,
    complete: false,
  },
  {
    key: "invoices",
    label: "Invoices and receipts",
    note: "Input purchases, fuel use, and contractor records.",
    weight: 15,
    complete: true,
  },
  {
    key: "soil-tests",
    label: "Soil tests",
    note: "Sampling or soil benchmark records for sequestration claims.",
    weight: 15,
    complete: false,
  },
  {
    key: "review-path",
    label: "Verifier review path",
    note: "Named advisor or verifier pathway for third-party review.",
    weight: 10,
    complete: true,
  },
];

const packetCategoryOptions: PacketCategory[] = [
  "Boundary",
  "Baseline",
  "Operations",
  "Soil",
  "Commercial",
  "Records",
  "Review",
];

const packetStatusOptions: Array<{ value: PacketStatus; label: string }> = [
  { value: "ready", label: "Linked" },
  { value: "review", label: "Needs review" },
  { value: "missing", label: "Missing" },
];

const packetStatusLabels: Record<PacketStatus, string> = {
  ready: "Linked",
  review: "Needs review",
  missing: "Missing",
};

const packetStatusClasses: Record<PacketStatus, string> = {
  ready: "border-[#27ddb4]/30 bg-[rgba(39,221,180,0.1)] text-[#7ce5d8]",
  review: "border-[#f2c77f]/30 bg-[#f2c77f]/10 text-[#f2c77f]",
  missing: "border-[#f3a66b]/28 bg-[#f3a66b]/10 text-[#f3d6b2]",
};

const initialPacketDocuments: EvidenceDocument[] = [
  {
    id: 1,
    title: "Parcel boundary export",
    category: "Boundary",
    linkedFieldId: null,
    season: "Current season",
    owner: "GIS desk",
    status: "ready",
    note: "Mapped parcel boundaries reconciled to the current field register.",
    readinessKey: "boundaries",
  },
  {
    id: 2,
    title: "Baseline crop and input ledger",
    category: "Baseline",
    linkedFieldId: null,
    season: "2021-2024",
    owner: "Farm office",
    status: "ready",
    note: "Three seasons of crop mix, fertilizer, and fuel intensity normalized for baseline review.",
    readinessKey: "baseline-history",
  },
  {
    id: 3,
    title: "Field activity log bundle",
    category: "Operations",
    linkedFieldId: 1,
    season: "2025 harvest",
    owner: "Operations lead",
    status: "missing",
    note: "Tillage, planting, irrigation, and fertilizer logs are still incomplete for one parcel.",
    readinessKey: "activity-logs",
  },
  {
    id: 4,
    title: "Invoices and diesel receipt pack",
    category: "Commercial",
    linkedFieldId: null,
    season: "Current season",
    owner: "Finance",
    status: "review",
    note: "Most invoices are linked; contractor diesel receipts still need a second pass.",
    readinessKey: "invoices",
  },
  {
    id: 5,
    title: "Soil sampling packet",
    category: "Soil",
    linkedFieldId: 2,
    season: "Spring 2025",
    owner: "Lab partner",
    status: "missing",
    note: "Benchmark samples for sequestration claims are not yet attached to the packet.",
    readinessKey: "soil-tests",
  },
  {
    id: 6,
    title: "Verifier review memo",
    category: "Review",
    linkedFieldId: null,
    season: "Current season",
    owner: "Advisory lead",
    status: "ready",
    note: "Named review path is established with methodology references and the expected verifier workflow.",
    readinessKey: "review-path",
  },
];

const stepDefinitions: StepDefinition[] = [
  {
    id: "farm",
    step: "01",
    title: "Farm profile",
    description: "Set the methodology, land control, and baseline assumptions.",
    icon: MapPinned,
  },
  {
    id: "fields",
    step: "02",
    title: "Field records",
    description: "Edit one field at a time instead of stacking every editor.",
    icon: Database,
  },
  {
    id: "mapping",
    step: "03",
    title: "Map layer",
    description: "Resolve field boundaries, sampling coverage, and spatial leakage risk.",
    icon: MapIcon,
  },
  {
    id: "scenario",
    step: "04",
    title: "Scenario design",
    description: "Tune the practice deltas and deduction logic.",
    icon: Tractor,
  },
  {
    id: "readiness",
    step: "05",
    title: "MRV readiness",
    description: "Track the evidence packet and missing proof.",
    icon: ClipboardCheck,
  },
  {
    id: "results",
    step: "06",
    title: "Results",
    description: "Review the modeled outcome, deductions, gate status, and report summary.",
    icon: BarChart3,
  },
  {
    id: "packet",
    step: "07",
    title: "Packet desk",
    description: "Assemble the verifier-facing evidence packet and resolve blockers.",
    icon: FileCheck2,
  },
];

function parseNumberInput(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function getExcludedAreaHa(field: FieldRecord) {
  return Math.max(0, Math.min(field.areaHa, field.excludedAreaHa));
}

function getEligibleAreaHa(field: FieldRecord) {
  return Math.max(0, field.areaHa - getExcludedAreaHa(field));
}

function getPracticeDieselLift(
  baselinePractice: Practice,
  projectPractice: Practice,
) {
  if (baselinePractice === projectPractice) {
    return 0;
  }

  if (baselinePractice === "conventional" && projectPractice === "reduced") {
    return 0.05;
  }

  if (baselinePractice === "conventional" && projectPractice === "no-till") {
    return 0.11;
  }

  if (baselinePractice === "reduced" && projectPractice === "no-till") {
    return 0.06;
  }

  return 0;
}

function getPracticeRemovalLift(
  baselinePractice: Practice,
  projectPractice: Practice,
) {
  if (baselinePractice === projectPractice) {
    return 0;
  }

  if (baselinePractice === "conventional" && projectPractice === "reduced") {
    return 0.02;
  }

  if (baselinePractice === "conventional" && projectPractice === "no-till") {
    return 0.05;
  }

  if (baselinePractice === "reduced" && projectPractice === "no-till") {
    return 0.03;
  }

  return 0;
}

function calculateFieldResult(
  field: FieldRecord,
  scenario: ScenarioState,
  region: RegionConfig,
  factorSet: FactorSet,
): FieldResult {
  const dieselFactor = factorSet.dieselEf / 1000;
  const electricityFactor = region.gridFactor / 1000;
  const fertilizerFactor =
    (factorSet.nitrogenEf * (44 / 28) * factorSet.n2oGwp) / 1000;
  const entericFactor = (factorSet.entericEf * factorSet.ch4Gwp) / 1000;
  const manureFactor = factorSet.manureEf / 1000;

  const totalNitrogen = field.areaHa * field.nitrogenKgPerHa;
  const totalDiesel = field.areaHa * field.dieselLitersPerHa;
  const totalElectricity = field.areaHa * field.electricityKwhPerHa;

  const baselineDiesel = totalDiesel * dieselFactor;
  const baselineElectricity = totalElectricity * electricityFactor;
  const baselineFertilizer = totalNitrogen * fertilizerFactor;
  const baselineEnteric = field.livestockHead * entericFactor;
  const baselineManure = field.livestockHead * manureFactor;
  const baselineRemovals = field.areaHa * field.baselineRemovalRate;

  const practiceDieselLift = getPracticeDieselLift(
    field.baselinePractice,
    field.projectPractice,
  );
  const practiceRemovalLift = getPracticeRemovalLift(
    field.baselinePractice,
    field.projectPractice,
  );
  const coverCropLift = field.coverCropPlanned ? 0.04 : 0;
  const agroforestryLift =
    field.areaHa > 0 ? (field.agroforestryHa / field.areaHa) * 0.9 : 0;

  const projectDieselMultiplier = Math.max(
    0.5,
    1 - scenario.dieselOptimizationPct / 100 - practiceDieselLift,
  );
  const projectFertilizerMultiplier = Math.max(
    0.55,
    1 - scenario.nitrogenReductionPct / 100,
  );
  const projectEntericMultiplier = Math.max(
    0.7,
    1 - scenario.entericReductionPct / 100,
  );
  const projectManureMultiplier = Math.max(
    0.65,
    1 - scenario.manureImprovementPct / 100,
  );

  const projectDiesel = baselineDiesel * projectDieselMultiplier;
  const projectElectricity = baselineElectricity;
  const projectFertilizer = baselineFertilizer * projectFertilizerMultiplier;
  const projectEnteric = baselineEnteric * projectEntericMultiplier;
  const projectManure = baselineManure * projectManureMultiplier;
  const projectRemovals =
    field.areaHa *
    (
      field.baselineRemovalRate +
      practiceRemovalLift +
      coverCropLift +
      agroforestryLift
    );

  const baselineEmissions =
    baselineDiesel +
    baselineElectricity +
    baselineFertilizer +
    baselineEnteric +
    baselineManure;
  const projectEmissions =
    projectDiesel +
    projectElectricity +
    projectFertilizer +
    projectEnteric +
    projectManure;
  const grossBenefit =
    baselineEmissions - baselineRemovals - (projectEmissions - projectRemovals);

  return {
    id: field.id,
    name: field.name,
    baselineEmissions,
    baselineRemovals,
    projectEmissions,
    projectRemovals,
    grossBenefit,
  };
}

function formatTco2e(value: number) {
  return `${value.toFixed(1)} tCO2e`;
}

function formatUsd(value: number) {
  const absolute = Math.abs(value);
  return `${value < 0 ? "-" : ""}$${absolute.toFixed(0)}`;
}

export function ReadinessWorkbench() {
  const packetStatusScore: Record<PacketStatus, number> = {
    ready: 1,
    review: 0.6,
    missing: 0,
  };
  const boundaryStatusScore: Record<BoundaryStatus, number> = {
    mapped: 1,
    review: 0.55,
    missing: 0,
  };

  const [farm, setFarm] = useState<FarmProfile>({
    farmName: "TerraYield Demo Farm",
    regionId: "south-asia",
    methodologyId: "cropland-soil",
    landControlStatus: "owned",
    baselineYears: 3,
    permanenceYears: 20,
    droughtRiskLevel: "moderate",
    floodRiskLevel: "low",
    fireRiskLevel: "low",
    regulatorySurplusStatus: "review",
    commonPracticeStatus: "review",
    barrierStatus: "review",
    adoptionTimingStatus: "review",
    doubleCountStatus: "clear",
  });
  const [commercial, setCommercial] = useState<CommercialScenario>({
    pricePerCredit: 18,
    registryCost: 22,
    verificationCost: 60,
    platformFee: 24,
    developerSharePct: 12,
  });
  const [fields, setFields] = useState<FieldRecord[]>(initialFields);
  const [scenario, setScenario] = useState<ScenarioState>(
    methodologyPacks[0].scenarioPresets.Balanced,
  );
  const [scenarioPresetLabel, setScenarioPresetLabel] = useState("Balanced");
  const [readinessItems, setReadinessItems] =
    useState<ReadinessItem[]>(initialReadiness);
  const [packetDocuments, setPacketDocuments] =
    useState<EvidenceDocument[]>(initialPacketDocuments);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [activeFieldId, setActiveFieldId] = useState(initialFields[0]?.id ?? 0);
  const [activePacketDocumentId, setActivePacketDocumentId] = useState(
    initialPacketDocuments[0]?.id ?? 0,
  );

  const region =
    regionConfigs.find((option) => option.id === farm.regionId) ??
    regionConfigs[0];
  const methodology =
    methodologyPacks.find((option) => option.id === farm.methodologyId) ??
    methodologyPacks[0];
  const factorSet = methodology.factorSet;

  const fieldResults = fields.map((field) =>
    calculateFieldResult(field, scenario, region, factorSet),
  );

  const totals = fieldResults.reduce(
    (summary, result) => ({
      baselineEmissions: summary.baselineEmissions + result.baselineEmissions,
      baselineRemovals: summary.baselineRemovals + result.baselineRemovals,
      projectEmissions: summary.projectEmissions + result.projectEmissions,
      projectRemovals: summary.projectRemovals + result.projectRemovals,
    }),
    {
      baselineEmissions: 0,
      baselineRemovals: 0,
      projectEmissions: 0,
      projectRemovals: 0,
    },
  );

  const baselineNet = totals.baselineEmissions - totals.baselineRemovals;
  const projectNet = totals.projectEmissions - totals.projectRemovals;
  const grossBenefit = baselineNet - projectNet;
  const positiveBenefit = Math.max(grossBenefit, 0);
  const permanenceBufferPct =
    farm.permanenceYears >= 25
      ? 0
      : farm.permanenceYears >= 15
        ? 2
        : farm.permanenceYears >= 10
          ? 4
          : 6;
  const climateRiskBufferPct = Math.max(
    reversalRiskScore[farm.droughtRiskLevel],
    reversalRiskScore[farm.floodRiskLevel],
    reversalRiskScore[farm.fireRiskLevel],
  );
  const methodologyReversalBufferPct =
    methodology.id === "agroforestry-removals" ? 2 : 0;
  const modeledBufferUpliftPct = Math.min(
    12,
    permanenceBufferPct + climateRiskBufferPct + methodologyReversalBufferPct,
  );
  const parcelExclusionDeduction = fieldResults.reduce((sum, result) => {
    const field = fields.find((entry) => entry.id === result.id);
    if (!field || field.areaHa <= 0) {
      return sum;
    }

    return (
      sum +
      Math.max(result.grossBenefit, 0) * (getExcludedAreaHa(field) / field.areaHa)
    );
  }, 0);
  const eligibleBenefitBeforeDeductions = Math.max(
    positiveBenefit - parcelExclusionDeduction,
    0,
  );
  const leakage = eligibleBenefitBeforeDeductions * (scenario.leakagePct / 100);
  const uncertainty =
    eligibleBenefitBeforeDeductions * (scenario.uncertaintyPct / 100);
  const effectiveBufferPct = Math.min(45, scenario.bufferPct + modeledBufferUpliftPct);
  const reversalRiskUpliftPct = Math.max(0, effectiveBufferPct - scenario.bufferPct);
  const baseBuffer = eligibleBenefitBeforeDeductions * (scenario.bufferPct / 100);
  const reversalRiskBuffer =
    eligibleBenefitBeforeDeductions * (reversalRiskUpliftPct / 100);
  const buffer = baseBuffer + reversalRiskBuffer;
  const screeningIneligible =
    eligibleBenefitBeforeDeductions * (scenario.ineligiblePct / 100);
  const ineligible = parcelExclusionDeduction + screeningIneligible;
  const estimatedCredits = Math.max(
    0,
    eligibleBenefitBeforeDeductions - leakage - uncertainty - buffer - screeningIneligible,
  );
  const grossRevenue = estimatedCredits * commercial.pricePerCredit;
  const developerShareValue = grossRevenue * (commercial.developerSharePct / 100);
  const fixedCommercialCosts =
    commercial.registryCost + commercial.verificationCost + commercial.platformFee;
  const indicativeFarmerNet =
    grossRevenue - developerShareValue - fixedCommercialCosts;

  const reversalRiskDrivers: ReversalRiskDriver[] = [
    {
      key: "permanence",
      label: "Permanence horizon",
      detail:
        farm.permanenceYears >= 25
          ? `${farm.permanenceYears} years currently modeled.`
          : `${farm.permanenceYears} years keeps the reserve elevated.`,
      value: permanenceBufferPct,
    },
    {
      key: "drought",
      label: "Drought exposure",
      detail: reversalRiskLabels[farm.droughtRiskLevel],
      value: reversalRiskScore[farm.droughtRiskLevel],
    },
    {
      key: "flood",
      label: "Flood exposure",
      detail: reversalRiskLabels[farm.floodRiskLevel],
      value: reversalRiskScore[farm.floodRiskLevel],
    },
    {
      key: "fire",
      label: "Fire or disturbance exposure",
      detail: reversalRiskLabels[farm.fireRiskLevel],
      value: reversalRiskScore[farm.fireRiskLevel],
    },
  ];

  if (methodologyReversalBufferPct > 0) {
    reversalRiskDrivers.push({
      key: "methodology-floor",
      label: "Removal pathway reserve",
      detail: "Tree and woody removals keep a higher permanence floor.",
      value: methodologyReversalBufferPct,
    });
  }

  const activeReversalDrivers = reversalRiskDrivers.filter(
    (driver) => driver.value > 0,
  );
  const topReversalDriver = activeReversalDrivers.reduce<ReversalRiskDriver | null>(
    (highest, driver) => {
      if (!highest || driver.value > highest.value) {
        return driver;
      }

      return highest;
    },
    null,
  );
  const reversalRiskStatus =
    reversalRiskUpliftPct >= 8
      ? "Elevated"
      : reversalRiskUpliftPct >= 4
        ? "Managed"
        : "Contained";

  const totalArea = fields.reduce((sum, field) => sum + field.areaHa, 0);
  const hasProjectChange = fields.some(
    (field) =>
      field.baselinePractice !== field.projectPractice ||
      field.coverCropPlanned ||
      field.agroforestryHa > 0,
  );
  const additionalityTests = [
    {
      key: "practice-change",
      label: "Practice change modeled",
      pass: hasProjectChange,
      detail: hasProjectChange
        ? "At least one field changes management, cover crop use, or removals practice."
        : "No field-level practice change is modeled yet.",
    },
    {
      key: "regulatory-surplus",
      label: "Regulatory surplus",
      pass: farm.regulatorySurplusStatus === "clear",
      detail: regulatorySurplusLabels[farm.regulatorySurplusStatus],
    },
    {
      key: "common-practice",
      label: "Common practice test",
      pass: farm.commonPracticeStatus === "clear",
      detail: commonPracticeLabels[farm.commonPracticeStatus],
    },
    {
      key: "barrier-test",
      label: "Barrier or investment test",
      pass: farm.barrierStatus === "clear",
      detail: barrierLabels[farm.barrierStatus],
    },
    {
      key: "adoption-timing",
      label: "Adoption timing",
      pass: farm.adoptionTimingStatus === "clear",
      detail: adoptionTimingLabels[farm.adoptionTimingStatus],
    },
  ];
  const additionalityPassCount = additionalityTests.filter((item) => item.pass).length;
  const additionalityReady = additionalityTests.every((item) => item.pass);
  const additionalitySummary = additionalityReady
    ? "Clear pathway"
    : additionalityPassCount >= 3
      ? "Needs review"
      : "Weak additionality";
  const eligibilityGates = [
    {
      key: "methodology-fit",
      label: "Methodology-region fit",
      pass: methodology.regionIds.includes(farm.regionId),
      detail: methodology.regionIds.includes(farm.regionId)
        ? `${methodology.label} supports ${region.label}.`
        : `${methodology.label} does not match ${region.label} without a different pack or geography.`,
    },
    {
      key: "land-control",
      label: "Land control",
      pass: farm.landControlStatus !== "missing",
      detail: landControlLabels[farm.landControlStatus],
    },
    {
      key: "baseline-history",
      label: "Baseline history",
      pass: farm.baselineYears >= methodology.minimumBaselineYears,
      detail: `${farm.baselineYears} of ${methodology.minimumBaselineYears} required baseline years are available.`,
    },
    {
      key: "additionality",
      label: "Additionality screen",
      pass: additionalityReady,
      detail: `${additionalityPassCount}/${additionalityTests.length} tests clear · ${additionalitySummary}`,
    },
    {
      key: "double-counting",
      label: "Double counting",
      pass: farm.doubleCountStatus === "clear",
      detail: doubleCountLabels[farm.doubleCountStatus],
    },
  ];
  const eligibilityPassCount = eligibilityGates.filter((item) => item.pass).length;
  const blockingEligibilityGates = eligibilityGates.filter((item) => !item.pass);

  const readinessEntries = readinessItems.map((item) => {
    const linkedDocuments = packetDocuments.filter(
      (document) => document.readinessKey === item.key,
    );
    const progress =
      linkedDocuments.length > 0
        ? linkedDocuments.reduce(
            (score, document) => score + packetStatusScore[document.status],
            0,
          ) / linkedDocuments.length
        : item.complete
          ? 1
          : 0;

    return {
      ...item,
      linkedDocuments,
      progress,
      derivedComplete: progress >= 0.999,
    };
  });

  const readinessScore = Math.round(
    readinessEntries.reduce(
      (score, item) => score + item.weight * item.progress,
      0,
    ),
  );
  const readinessStatus =
    readinessScore >= 85
      ? "Verifier-ready"
      : readinessScore >= 65
        ? "Almost ready"
        : "Needs evidence";
  const missingReadiness = readinessEntries.filter((item) => item.progress < 1);
  const packetReadyCount = packetDocuments.filter(
    (document) => document.status === "ready",
  ).length;
  const packetReviewCount = packetDocuments.filter(
    (document) => document.status === "review",
  ).length;
  const packetMissingCount = packetDocuments.filter(
    (document) => document.status === "missing",
  ).length;
  const packetCoverage =
    packetDocuments.length > 0
      ? Math.round(
          (packetDocuments.reduce((score, document) => {
            if (document.status === "ready") {
              return score + 1;
            }

            if (document.status === "review") {
              return score + 0.6;
            }

            return score;
          }, 0) /
            packetDocuments.length) *
            100,
        )
      : 0;
  const mappedArea = fields.reduce(
    (sum, field) => sum + (field.boundaryStatus === "mapped" ? field.areaHa : 0),
    0,
  );
  const excludedArea = fields.reduce(
    (sum, field) => sum + getExcludedAreaHa(field),
    0,
  );
  const eligibleArea = fields.reduce(
    (sum, field) => sum + getEligibleAreaHa(field),
    0,
  );
  const reviewArea = fields.reduce(
    (sum, field) => sum + (field.boundaryStatus === "review" ? field.areaHa : 0),
    0,
  );
  const missingMapArea = fields.reduce(
    (sum, field) => sum + (field.boundaryStatus === "missing" ? field.areaHa : 0),
    0,
  );
  const mappingCoverage =
    totalArea > 0
      ? Math.round(
          (fields.reduce(
            (sum, field) =>
              sum + field.areaHa * boundaryStatusScore[field.boundaryStatus],
            0,
          ) /
            totalArea) *
            100,
        )
      : 0;
  const averageGeometryConfidence =
    totalArea > 0
      ? Math.round(
          fields.reduce(
            (sum, field) => sum + field.areaHa * field.geometryConfidencePct,
            0,
          ) / totalArea,
        )
      : 0;
  const averageSamplingCoverage =
    totalArea > 0
      ? Math.round(
          fields.reduce(
            (sum, field) => sum + field.areaHa * field.samplingCoveragePct,
            0,
          ) / totalArea,
        )
      : 0;
  const highestBoundaryRisk =
    fields.reduce<FieldRecord | null>((highest, field) => {
      if (!highest || field.adjacencyRiskPct > highest.adjacencyRiskPct) {
        return field;
      }

      return highest;
    }, null) ?? null;
  const mappingBlockers = fields.filter(
    (field) =>
      field.boundaryStatus !== "mapped" ||
      field.geometryConfidencePct < 70 ||
      field.samplingCoveragePct < 60 ||
      (getExcludedAreaHa(field) > 0 && field.exclusionReason === "None"),
  );

  const baselineHotspots = [
    {
      label: "Fertilizer N2O",
      value: fields.reduce((sum, field) => {
        const fertilizerFactor =
          (factorSet.nitrogenEf * (44 / 28) * factorSet.n2oGwp) / 1000;
        return sum + field.areaHa * field.nitrogenKgPerHa * fertilizerFactor;
      }, 0),
    },
    {
      label: "Diesel",
      value: fields.reduce(
        (sum, field) =>
          sum + field.areaHa * field.dieselLitersPerHa * (factorSet.dieselEf / 1000),
        0,
      ),
    },
    {
      label: "Livestock + manure",
      value: fields.reduce(
        (sum, field) =>
          sum +
          field.livestockHead * ((factorSet.entericEf * factorSet.ch4Gwp) / 1000) +
          field.livestockHead * (factorSet.manureEf / 1000),
        0,
      ),
    },
  ];

  const largestHotspot = Math.max(
    ...baselineHotspots.map((item) => item.value),
    1,
  );

  const reportSummary = [
    `${farm.farmName} covers ${totalArea.toFixed(0)} ha across ${fields.length} fields in ${region.label}.`,
    `Baseline net balance is ${formatTco2e(baselineNet)}. The modeled scenario moves the farm to ${formatTco2e(projectNet)}.`,
    `${methodology.label} currently clears ${additionalityPassCount}/${additionalityTests.length} additionality tests, leaves ${blockingEligibilityGates.length} open hard-gate blockers, and yields ${estimatedCredits.toFixed(1)} indicative quantity after deductions with an indicative farmer net of ${formatUsd(indicativeFarmerNet)}.`,
  ];
  const packetSummary = [
    `${packetReadyCount} packet items are linked, ${packetReviewCount} are waiting for review, and ${packetMissingCount} remain blocking.`,
    packetMissingCount > 0
      ? `Before handoff, resolve ${packetDocuments
          .filter((document) => document.status === "missing")
          .slice(0, 2)
          .map((document) => document.title)
          .join(" and ")}.`
      : "The mock packet is aligned for verifier handoff with no blocking evidence gaps.",
    `Current packet coverage spans ${fields.length} fields and ${totalArea.toFixed(0)} ha across operations, finance, records, and advisory owners.`,
  ];

  const activeStep = stepDefinitions[activeStepIndex];
  const ActiveStepIcon = activeStep.icon;
  const activeField = fields.find((field) => field.id === activeFieldId) ?? fields[0];
  const activeFieldResult = fieldResults.find(
    (result) => result.id === activeField?.id,
  );
  const activePacketDocument =
    packetDocuments.find((document) => document.id === activePacketDocumentId) ??
    packetDocuments[0];
  const activePacketDocumentFieldLabel = !activePacketDocument
    ? ""
    : activePacketDocument.linkedFieldId === null
      ? "Farm-wide"
      : fields.find((field) => field.id === activePacketDocument.linkedFieldId)
            ?.name ?? "Removed field";
  const activePacketReadiness = activePacketDocument
    ? readinessItems.find((item) => item.key === activePacketDocument.readinessKey)
    : undefined;
  const progressPct = ((activeStepIndex + 1) / stepDefinitions.length) * 100;
  const useExpandedWorkbenchLayout = stepDefinitions.length >= 7;

  const stepCompletion: Record<StepId, boolean> = {
    farm:
      farm.farmName.trim().length > 0 &&
      methodology.regionIds.includes(farm.regionId) &&
      farm.landControlStatus !== "missing" &&
      farm.baselineYears >= methodology.minimumBaselineYears &&
      additionalityReady &&
      farm.doubleCountStatus === "clear",
    fields: fields.every((field) => field.name.trim().length > 0 && field.areaHa > 0),
    mapping: mappingCoverage >= 65 && averageGeometryConfidence >= 70,
    scenario: grossBenefit > 0,
    readiness: readinessScore >= 65,
    results: true,
    packet: packetMissingCount === 0,
  };

  function updateFieldValue<Key extends keyof FieldRecord>(
    fieldId: number,
    key: Key,
    value: FieldRecord[Key],
  ) {
    setFields((current) =>
      current.map((field) =>
        field.id === fieldId ? { ...field, [key]: value } : field,
      ),
    );
  }

  function addField() {
    const nextId = Math.max(...fields.map((field) => field.id), 0) + 1;
    const nextField: FieldRecord = {
      id: nextId,
      name: `New Field ${nextId}`,
      areaHa: 40,
      cropType: "Wheat",
      soilType: "Loam",
      nitrogenKgPerHa: 36,
      dieselLitersPerHa: 14,
      electricityKwhPerHa: 24,
      livestockHead: 0,
      baselinePractice: "conventional",
      projectPractice: "reduced",
      baselineRemovalRate: 0.02,
      coverCropPlanned: false,
      agroforestryHa: 0,
      boundaryStatus: "missing",
      boundaryMethod: "Manual sketch",
      geometryConfidencePct: 45,
      samplingCoveragePct: 20,
      adjacencyRiskPct: 30,
      excludedAreaHa: 0,
      exclusionReason: "None",
      waterSource: "Canal lateral",
      boundaryNotes: "New field still needs a parcel trace, coverage plan, and edge review.",
    };

    setFields((current) => [...current, nextField]);
    setActiveFieldId(nextId);
  }

  function removeField(fieldId: number) {
    if (fields.length === 1) {
      return;
    }

    const nextFields = fields.filter((field) => field.id !== fieldId);
    setFields(nextFields);
    if (activeFieldId === fieldId) {
      setActiveFieldId(nextFields[0]?.id ?? 0);
    }
  }

  function toggleReadinessItem(itemKey: string) {
    setReadinessItems((current) =>
      current.map((item) =>
        item.key === itemKey ? { ...item, complete: !item.complete } : item,
      ),
    );
  }

  function updatePacketDocument<Key extends keyof EvidenceDocument>(
    documentId: number,
    key: Key,
    value: EvidenceDocument[Key],
  ) {
    setPacketDocuments((current) =>
      current.map((document) =>
        document.id === documentId ? { ...document, [key]: value } : document,
      ),
    );
  }

  function addPacketDocument() {
    const nextId = Math.max(...packetDocuments.map((document) => document.id), 0) + 1;
    const nextDocument: EvidenceDocument = {
      id: nextId,
      title: `Support file ${nextId}`,
      category: "Operations",
      linkedFieldId: null,
      season: "Current season",
      owner: "Farm office",
      status: "missing",
      note: "Attach the supporting file or explain why it is still missing.",
      readinessKey: "activity-logs",
    };

    setPacketDocuments((current) => [...current, nextDocument]);
    setActivePacketDocumentId(nextId);
  }

  function removePacketDocument(documentId: number) {
    if (packetDocuments.length === 1) {
      return;
    }

    const nextDocuments = packetDocuments.filter(
      (document) => document.id !== documentId,
    );
    setPacketDocuments(nextDocuments);
    if (activePacketDocumentId === documentId) {
      setActivePacketDocumentId(nextDocuments[0]?.id ?? 0);
    }
  }

  function updateScenario<Key extends keyof ScenarioState>(
    key: Key,
    value: ScenarioState[Key],
  ) {
    setScenarioPresetLabel("Custom");
    setScenario((current) => ({ ...current, [key]: value }));
  }

  function moveStep(direction: "next" | "back") {
    setActiveStepIndex((current) => {
      if (direction === "next") {
        return Math.min(current + 1, stepDefinitions.length - 1);
      }

      return Math.max(current - 1, 0);
    });
  }

  function renderFarmStep() {
    return (
      <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="workbench-subpanel rounded-[1.7rem] p-5 sm:p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[#95edff]">
            Core profile
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="workbench-field sm:col-span-2">
              <span className="workbench-label">Farm name</span>
              <input
                value={farm.farmName}
                onChange={(event) =>
                  setFarm((current) => ({ ...current, farmName: event.target.value }))
                }
                className="workbench-input"
              />
            </label>

            <label className="workbench-field">
              <span className="workbench-label">Region</span>
              <select
                value={farm.regionId}
                onChange={(event) =>
                  setFarm((current) => ({ ...current, regionId: event.target.value }))
                }
                className="workbench-input"
              >
                {regionConfigs.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="workbench-field">
              <span className="workbench-label">Methodology pack</span>
              <select
                value={farm.methodologyId}
                onChange={(event) => {
                  const nextMethodologyId = event.target.value;
                  const nextMethodology =
                    methodologyPacks.find((option) => option.id === nextMethodologyId) ??
                    methodologyPacks[0];

                  setFarm((current) => ({
                    ...current,
                    methodologyId: nextMethodologyId,
                  }));
                  setScenarioPresetLabel("Balanced");
                  startTransition(() =>
                    setScenario({ ...nextMethodology.scenarioPresets.Balanced }),
                  );
                }}
                className="workbench-input"
              >
                {methodologyPacks.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="workbench-field">
              <span className="workbench-label">Land control</span>
              <select
                value={farm.landControlStatus}
                onChange={(event) =>
                  setFarm((current) => ({
                    ...current,
                    landControlStatus: event.target.value as LandControlStatus,
                  }))
                }
                className="workbench-input"
              >
                {landControlOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="workbench-field">
              <span className="workbench-label">Baseline years</span>
              <input
                type="number"
                min="1"
                value={farm.baselineYears}
                onChange={(event) =>
                  setFarm((current) => ({
                    ...current,
                    baselineYears: parseNumberInput(event.target.value),
                  }))
                }
                className="workbench-input"
              />
            </label>

            <label className="workbench-field">
              <span className="workbench-label">Regulatory surplus</span>
              <select
                value={farm.regulatorySurplusStatus}
                onChange={(event) =>
                  setFarm((current) => ({
                    ...current,
                    regulatorySurplusStatus:
                      event.target.value as RegulatorySurplusStatus,
                  }))
                }
                className="workbench-input"
              >
                {regulatorySurplusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="workbench-field">
              <span className="workbench-label">Common practice</span>
              <select
                value={farm.commonPracticeStatus}
                onChange={(event) =>
                  setFarm((current) => ({
                    ...current,
                    commonPracticeStatus:
                      event.target.value as CommonPracticeStatus,
                  }))
                }
                className="workbench-input"
              >
                {commonPracticeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="workbench-field">
              <span className="workbench-label">Barrier test</span>
              <select
                value={farm.barrierStatus}
                onChange={(event) =>
                  setFarm((current) => ({
                    ...current,
                    barrierStatus: event.target.value as BarrierStatus,
                  }))
                }
                className="workbench-input"
              >
                {barrierOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="workbench-field">
              <span className="workbench-label">Adoption timing</span>
              <select
                value={farm.adoptionTimingStatus}
                onChange={(event) =>
                  setFarm((current) => ({
                    ...current,
                    adoptionTimingStatus:
                      event.target.value as AdoptionTimingStatus,
                  }))
                }
                className="workbench-input"
              >
                {adoptionTimingOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="workbench-field">
              <span className="workbench-label">Double counting</span>
              <select
                value={farm.doubleCountStatus}
                onChange={(event) =>
                  setFarm((current) => ({
                    ...current,
                    doubleCountStatus: event.target.value as DoubleCountStatus,
                  }))
                }
                className="workbench-input"
              >
                {doubleCountOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="workbench-field">
              <span className="workbench-label">Permanence horizon (years)</span>
              <input
                type="number"
                min="1"
                value={farm.permanenceYears}
                onChange={(event) =>
                  setFarm((current) => ({
                    ...current,
                    permanenceYears: parseNumberInput(event.target.value),
                  }))
                }
                className="workbench-input"
              />
            </label>

            <label className="workbench-field">
              <span className="workbench-label">Drought exposure</span>
              <select
                value={farm.droughtRiskLevel}
                onChange={(event) =>
                  setFarm((current) => ({
                    ...current,
                    droughtRiskLevel: event.target.value as ReversalRiskLevel,
                  }))
                }
                className="workbench-input"
              >
                {reversalRiskOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="workbench-field">
              <span className="workbench-label">Flood exposure</span>
              <select
                value={farm.floodRiskLevel}
                onChange={(event) =>
                  setFarm((current) => ({
                    ...current,
                    floodRiskLevel: event.target.value as ReversalRiskLevel,
                  }))
                }
                className="workbench-input"
              >
                {reversalRiskOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="workbench-field">
              <span className="workbench-label">Fire or disturbance exposure</span>
              <select
                value={farm.fireRiskLevel}
                onChange={(event) =>
                  setFarm((current) => ({
                    ...current,
                    fireRiskLevel: event.target.value as ReversalRiskLevel,
                  }))
                }
                className="workbench-input"
              >
                {reversalRiskOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-5 rounded-[1.4rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#f2c77f]">
                  Derived additionality
                </p>
                <p className="mt-2 text-sm leading-6 text-[#a8bcc6]">
                  The gate now comes from concrete tests instead of one manual status.
                </p>
              </div>
              <span
                className={`rounded-full border px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em] ${
                  additionalityReady
                    ? "border-[#27ddb4]/30 bg-[rgba(39,221,180,0.1)] text-[#7ce5d8]"
                    : additionalityPassCount >= 3
                      ? "border-[#f2c77f]/30 bg-[#f2c77f]/10 text-[#f2c77f]"
                      : "border-[#f3a66b]/28 bg-[#f3a66b]/10 text-[#f3d6b2]"
                }`}
              >
                {additionalitySummary}
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {additionalityTests.map((test) => (
                <div
                  key={test.key}
                  className="flex items-start justify-between gap-4 border-b border-white/10 pb-3 text-sm text-[#dce7e3] last:border-b-0 last:pb-0"
                >
                  <div>
                    <p>{test.label}</p>
                    <p className="mt-1 text-xs leading-5 text-[#8aa8b3]">{test.detail}</p>
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em] ${
                      test.pass
                        ? "border-[#27ddb4]/30 bg-[rgba(39,221,180,0.1)] text-[#7ce5d8]"
                        : "border-[#f2c77f]/30 bg-[#f2c77f]/10 text-[#f2c77f]"
                    }`}
                  >
                    {test.pass ? "clear" : "review"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="workbench-subpanel rounded-[1.7rem] p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[#f2c77f]">
              Methodology pack
            </p>
            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 text-sm text-[#dce7e3]">
                <span>Registry basis</span>
                <span className="font-mono text-[#95edff]">{methodology.registryLabel}</span>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 text-sm text-[#dce7e3]">
                <span>Project type</span>
                <span className="font-mono text-[#95edff]">{methodology.projectType}</span>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 text-sm text-[#dce7e3]">
                <span>Minimum baseline years</span>
                <span className="font-mono text-[#95edff]">{methodology.minimumBaselineYears}</span>
              </div>
              <div className="flex items-center justify-between gap-4 text-sm text-[#dce7e3]">
                <span>Selected grid factor</span>
                <span className="font-mono text-[#95edff]">{region.gridFactor} kg / kWh</span>
              </div>
            </div>

            <p className="mt-5 text-sm leading-6 text-[#a8bcc6]">{methodology.evidenceFocus}</p>
          </div>

          <div className="workbench-subpanel rounded-[1.7rem] p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[#95edff]">
              Buffer and reversal profile
            </p>
            <p className="mt-2 text-sm leading-6 text-[#a8bcc6]">
              Base methodology reserve is lifted when the permanence horizon is short or reversal exposure is high.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="workbench-summary-card">
                <p className="workbench-label">Effective buffer</p>
                <p className="mt-3 font-display text-3xl text-white">{effectiveBufferPct}%</p>
              </div>
              <div className="workbench-summary-card">
                <p className="workbench-label">Risk uplift</p>
                <p className="mt-3 font-display text-3xl text-[#f2c77f]">+{reversalRiskUpliftPct}%</p>
              </div>
              <div className="workbench-summary-card">
                <p className="workbench-label">Risk posture</p>
                <p className="mt-3 font-display text-3xl text-[#7ce5d8]">{reversalRiskStatus}</p>
              </div>
            </div>

            <div className="mt-5 space-y-3 rounded-[1.4rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
              {activeReversalDrivers.length > 0 ? (
                activeReversalDrivers.map((driver) => (
                  <div
                    key={driver.key}
                    className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 text-sm text-[#dce7e3] last:border-b-0 last:pb-0"
                  >
                    <div>
                      <p>{driver.label}</p>
                      <p className="mt-1 text-xs leading-5 text-[#8aa8b3]">{driver.detail}</p>
                    </div>
                    <span className="font-mono text-[#f2c77f]">+{driver.value}%</span>
                  </div>
                ))
              ) : (
                <p className="text-sm leading-6 text-[#dce7e3]">
                  No additional reversal-risk uplift is being applied beyond the selected base reserve.
                </p>
              )}
            </div>
          </div>

          <div className="workbench-subpanel rounded-[1.7rem] p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="workbench-icon-chip">
                <CircleDollarSign className="size-5" strokeWidth={1.85} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#f2c77f]">
                  Indicative commercial
                </p>
                <p className="mt-2 text-sm leading-6 text-[#a8bcc6]">
                  This does not change the carbon math. It only screens the current price and cost scenario for the farmer.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="workbench-field">
                <span className="workbench-label">Price assumption ($ / credit)</span>
                <input
                  type="number"
                  min="0"
                  value={commercial.pricePerCredit}
                  onChange={(event) =>
                    setCommercial((current) => ({
                      ...current,
                      pricePerCredit: parseNumberInput(event.target.value),
                    }))
                  }
                  className="workbench-input"
                />
              </label>

              <label className="workbench-field">
                <span className="workbench-label">Registry costs</span>
                <input
                  type="number"
                  min="0"
                  value={commercial.registryCost}
                  onChange={(event) =>
                    setCommercial((current) => ({
                      ...current,
                      registryCost: parseNumberInput(event.target.value),
                    }))
                  }
                  className="workbench-input"
                />
              </label>

              <label className="workbench-field">
                <span className="workbench-label">Verification costs</span>
                <input
                  type="number"
                  min="0"
                  value={commercial.verificationCost}
                  onChange={(event) =>
                    setCommercial((current) => ({
                      ...current,
                      verificationCost: parseNumberInput(event.target.value),
                    }))
                  }
                  className="workbench-input"
                />
              </label>

              <label className="workbench-field">
                <span className="workbench-label">Platform fee</span>
                <input
                  type="number"
                  min="0"
                  value={commercial.platformFee}
                  onChange={(event) =>
                    setCommercial((current) => ({
                      ...current,
                      platformFee: parseNumberInput(event.target.value),
                    }))
                  }
                  className="workbench-input"
                />
              </label>

              <label className="workbench-field sm:col-span-2">
                <span className="workbench-label">Developer share (%)</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={commercial.developerSharePct}
                  onChange={(event) =>
                    setCommercial((current) => ({
                      ...current,
                      developerSharePct: parseNumberInput(event.target.value),
                    }))
                  }
                  className="workbench-input"
                />
              </label>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="workbench-summary-card">
                <p className="workbench-label">Gross revenue</p>
                <p className="mt-3 font-display text-3xl text-white">{formatUsd(grossRevenue)}</p>
              </div>
              <div className="workbench-summary-card">
                <p className="workbench-label">Indicative net</p>
                <p className="mt-3 font-display text-3xl text-[#7ce5d8]">{formatUsd(indicativeFarmerNet)}</p>
              </div>
            </div>
          </div>

          <div className="workbench-subpanel rounded-[1.7rem] p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[#f2c77f]">
              Hard gates
            </p>
            <div className="mt-5 space-y-3">
              {eligibilityGates.map((gate) => (
                <div
                  key={gate.key}
                  className="flex items-start justify-between gap-4 border-b border-white/10 pb-3 text-sm text-[#dce7e3] last:border-b-0 last:pb-0"
                >
                  <div>
                    <p>{gate.label}</p>
                    <p className="mt-1 text-xs leading-5 text-[#8aa8b3]">{gate.detail}</p>
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em] ${
                      gate.pass
                        ? "border-[#27ddb4]/30 bg-[rgba(39,221,180,0.1)] text-[#7ce5d8]"
                        : "border-[#f2c77f]/30 bg-[#f2c77f]/10 text-[#f2c77f]"
                    }`}
                  >
                    {gate.pass ? "clear" : "review"}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-5 text-sm leading-6 text-[#a8bcc6]">{methodology.deductionFocus}</p>
          </div>
        </div>
      </div>
    );
  }

  function renderFieldsStep() {
    if (!activeField || !activeFieldResult) {
      return null;
    }

    return (
      <div className="space-y-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#95edff]">
              Field stack
            </p>
            <p className="mt-2 text-sm leading-6 text-[#a8bcc6]">
              Pick one field to edit. The summary rail keeps the cross-farm picture visible without forcing every field editor on screen at once.
            </p>
          </div>

          <button
            type="button"
            onClick={addField}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-[rgba(255,255,255,0.04)] px-4 py-2 text-sm text-[#edf3ef] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <Plus className="size-4" strokeWidth={1.9} />
            Add field
          </button>
        </div>

        <div className="grid gap-5 xl:grid-cols-[0.72fr_1.28fr]">
          <div className="space-y-3">
            {fields.map((field) => {
              const result = fieldResults.find((item) => item.id === field.id);
              const isActive = field.id === activeField.id;

              return (
                <button
                  key={field.id}
                  type="button"
                  onClick={() => setActiveFieldId(field.id)}
                  className={`w-full rounded-[1.4rem] border p-4 text-left transition ${
                    isActive
                      ? "border-[#27ddb4]/40 bg-[rgba(39,221,180,0.09)]"
                      : "border-white/10 bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.05)]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-[1.7rem] leading-none text-white">
                        {field.name}
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-[0.22em] text-[#8fded0]">
                        {field.cropType} · {field.areaHa} ha
                      </p>
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#dce7e3]">
                      {field.projectPractice}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[#95edff]">
                        Gross benefit
                      </p>
                      <p className="mt-2 font-mono text-sm text-[#f2c77f]">
                        {result?.grossBenefit.toFixed(1) ?? "0.0"} tCO2e
                      </p>
                    </div>
                    <div>
                      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[#95edff]">
                        Removal rate
                      </p>
                      <p className="mt-2 font-mono text-sm text-[#f2c77f]">
                        {field.baselineRemovalRate.toFixed(2)} t / ha
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="workbench-subpanel rounded-[1.7rem] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="font-display text-3xl text-white">{activeField.name}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-[#90e0d2]">
                  {activeField.cropType} · {activeField.soilType}
                </p>
              </div>

              <button
                type="button"
                onClick={() => removeField(activeField.id)}
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-[rgba(255,255,255,0.03)] text-[#c5d3cf] disabled:cursor-not-allowed disabled:opacity-35"
                disabled={fields.length === 1}
              >
                <Trash2 className="size-4" strokeWidth={1.8} />
              </button>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="workbench-field">
                <span className="workbench-label">Field name</span>
                <input
                  value={activeField.name}
                  onChange={(event) =>
                    updateFieldValue(activeField.id, "name", event.target.value)
                  }
                  className="workbench-input"
                />
              </label>
              <label className="workbench-field">
                <span className="workbench-label">Area (ha)</span>
                <input
                  type="number"
                  min="1"
                  value={activeField.areaHa}
                  onChange={(event) =>
                    updateFieldValue(
                      activeField.id,
                      "areaHa",
                      parseNumberInput(event.target.value),
                    )
                  }
                  className="workbench-input"
                />
              </label>
              <label className="workbench-field">
                <span className="workbench-label">Crop</span>
                <input
                  value={activeField.cropType}
                  onChange={(event) =>
                    updateFieldValue(activeField.id, "cropType", event.target.value)
                  }
                  className="workbench-input"
                />
              </label>
              <label className="workbench-field">
                <span className="workbench-label">Soil type</span>
                <input
                  value={activeField.soilType}
                  onChange={(event) =>
                    updateFieldValue(activeField.id, "soilType", event.target.value)
                  }
                  className="workbench-input"
                />
              </label>
              <label className="workbench-field">
                <span className="workbench-label">Nitrogen (kg / ha)</span>
                <input
                  type="number"
                  min="0"
                  value={activeField.nitrogenKgPerHa}
                  onChange={(event) =>
                    updateFieldValue(
                      activeField.id,
                      "nitrogenKgPerHa",
                      parseNumberInput(event.target.value),
                    )
                  }
                  className="workbench-input"
                />
              </label>
              <label className="workbench-field">
                <span className="workbench-label">Diesel (L / ha)</span>
                <input
                  type="number"
                  min="0"
                  value={activeField.dieselLitersPerHa}
                  onChange={(event) =>
                    updateFieldValue(
                      activeField.id,
                      "dieselLitersPerHa",
                      parseNumberInput(event.target.value),
                    )
                  }
                  className="workbench-input"
                />
              </label>
              <label className="workbench-field">
                <span className="workbench-label">Electricity (kWh / ha)</span>
                <input
                  type="number"
                  min="0"
                  value={activeField.electricityKwhPerHa}
                  onChange={(event) =>
                    updateFieldValue(
                      activeField.id,
                      "electricityKwhPerHa",
                      parseNumberInput(event.target.value),
                    )
                  }
                  className="workbench-input"
                />
              </label>
              <label className="workbench-field">
                <span className="workbench-label">Livestock linked</span>
                <input
                  type="number"
                  min="0"
                  value={activeField.livestockHead}
                  onChange={(event) =>
                    updateFieldValue(
                      activeField.id,
                      "livestockHead",
                      parseNumberInput(event.target.value),
                    )
                  }
                  className="workbench-input"
                />
              </label>
              <label className="workbench-field">
                <span className="workbench-label">Baseline practice</span>
                <select
                  value={activeField.baselinePractice}
                  onChange={(event) =>
                    updateFieldValue(
                      activeField.id,
                      "baselinePractice",
                      event.target.value as Practice,
                    )
                  }
                  className="workbench-input"
                >
                  {practiceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="workbench-field">
                <span className="workbench-label">Project practice</span>
                <select
                  value={activeField.projectPractice}
                  onChange={(event) =>
                    updateFieldValue(
                      activeField.id,
                      "projectPractice",
                      event.target.value as Practice,
                    )
                  }
                  className="workbench-input"
                >
                  {practiceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="workbench-field">
                <span className="workbench-label">Baseline removals (tCO2e / ha)</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={activeField.baselineRemovalRate}
                  onChange={(event) =>
                    updateFieldValue(
                      activeField.id,
                      "baselineRemovalRate",
                      parseNumberInput(event.target.value),
                    )
                  }
                  className="workbench-input"
                />
              </label>
              <label className="workbench-field">
                <span className="workbench-label">Agroforestry area (ha)</span>
                <input
                  type="number"
                  min="0"
                  max={activeField.areaHa}
                  value={activeField.agroforestryHa}
                  onChange={(event) =>
                    updateFieldValue(
                      activeField.id,
                      "agroforestryHa",
                      parseNumberInput(event.target.value),
                    )
                  }
                  className="workbench-input"
                />
              </label>
            </div>

            <label className="workbench-toggle mt-5 flex items-center gap-3 rounded-[1rem] px-4 py-3 text-sm text-[#dce7e3]">
              <input
                type="checkbox"
                checked={activeField.coverCropPlanned}
                onChange={(event) =>
                  updateFieldValue(
                    activeField.id,
                    "coverCropPlanned",
                    event.target.checked,
                  )
                }
                className="size-4 accent-[#27ddb4]"
              />
              Cover crop planned in the project scenario
            </label>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="workbench-summary-card">
                <p className="workbench-label">Baseline emissions</p>
                <p className="mt-3 font-display text-3xl text-white">
                  {activeFieldResult.baselineEmissions.toFixed(1)}
                </p>
              </div>
              <div className="workbench-summary-card">
                <p className="workbench-label">Project removals</p>
                <p className="mt-3 font-display text-3xl text-white">
                  {activeFieldResult.projectRemovals.toFixed(1)}
                </p>
              </div>
              <div className="workbench-summary-card">
                <p className="workbench-label">Gross benefit</p>
                <p className="mt-3 font-display text-3xl text-[#7ce5d8]">
                  {activeFieldResult.grossBenefit.toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderScenarioStep() {
    const controls = scenarioControlOrder.map((key) => ({
      ...methodology.scenarioControls[key],
      key,
      value: scenario[key],
    }));

    return (
      <div className="space-y-5">
        <div className="workbench-subpanel rounded-[1.7rem] p-5 sm:p-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#95edff]">
                Deduction profile
              </p>
              <p className="mt-2 text-sm leading-6 text-[#a8bcc6]">
                {methodology.label} now controls the allowed slider bounds and preset profiles. Switching methodology resets this step to the selected pack's balanced view.
              </p>
            </div>

            <div className="rounded-full border border-white/10 bg-[rgba(255,255,255,0.04)] px-4 py-2 text-xs uppercase tracking-[0.22em] text-[#ecf3ef]">
              {methodology.registryLabel}
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-[#dce7e3]">{methodology.deductionFocus}</p>
          <p className="mt-3 text-sm leading-6 text-[#dce7e3]">
            The selected base reserve is {scenario.bufferPct}%, and current farm-level reversal pressure lifts the effective buffer to {effectiveBufferPct}%.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {scenarioPresetOrder.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                setScenarioPresetLabel(label);
                startTransition(() =>
                  setScenario({ ...methodology.scenarioPresets[label] }),
                );
              }}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                scenarioPresetLabel === label
                  ? "border-[#27ddb4]/40 bg-[rgba(39,221,180,0.09)] text-white"
                  : "border-white/10 bg-[rgba(255,255,255,0.04)] text-[#eaf2ee]"
              }`}
            >
              {label}
            </button>
          ))}
          {scenarioPresetLabel === "Custom" ? (
            <span className="rounded-full border border-[#f2c77f]/30 bg-[#f2c77f]/8 px-4 py-2 text-sm text-[#f2c77f]">
              Custom
            </span>
          ) : null}
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {controls.map((item) => (
              <label key={item.key} className="workbench-range-card">
                <div className="flex items-center justify-between gap-4">
                  <span className="workbench-label">{item.label}</span>
                  <span className="font-mono text-sm text-[#f2c77f]">{item.value}%</span>
                </div>
                <input
                  type="range"
                  min={item.min}
                  max={item.max}
                  value={item.value}
                  onChange={(event) =>
                    updateScenario(item.key, parseNumberInput(event.target.value))
                  }
                  className="mt-4 w-full accent-[#27ddb4]"
                />
              </label>
            ))}
          </div>

          <div className="space-y-5">
            <div className="workbench-subpanel rounded-[1.7rem] p-5 sm:p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-[#95edff]">
                Scenario preview
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="workbench-summary-card">
                  <p className="workbench-label">Gross benefit</p>
                  <p className="mt-3 font-display text-3xl text-[#7ce5d8]">
                    {grossBenefit.toFixed(1)}
                  </p>
                </div>
                <div className="workbench-summary-card">
                  <p className="workbench-label">Effective buffer</p>
                  <p className="mt-3 font-display text-3xl text-white">
                    {effectiveBufferPct}%
                  </p>
                </div>
                <div className="workbench-summary-card">
                  <p className="workbench-label">Estimated credits</p>
                  <p className="mt-3 font-display text-3xl text-white">
                    {estimatedCredits.toFixed(1)}
                  </p>
                </div>
              </div>
            </div>

            <div className="workbench-subpanel rounded-[1.7rem] p-5 sm:p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-[#f2c77f]">
                Deduction chain
              </p>
              <div className="mt-5 space-y-3 text-sm text-[#dce7e3]">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                  <span>Parcel exclusions</span>
                  <span className="font-mono text-[#f2c77f]">{parcelExclusionDeduction.toFixed(1)} t</span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                  <span>Leakage</span>
                  <span className="font-mono text-[#95edff]">{leakage.toFixed(1)} t</span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                  <span>Uncertainty</span>
                  <span className="font-mono text-[#95edff]">{uncertainty.toFixed(1)} t</span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                  <span>Base buffer</span>
                  <span className="font-mono text-[#95edff]">{baseBuffer.toFixed(1)} t</span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                  <span>Reversal risk uplift</span>
                  <span className="font-mono text-[#f2c77f]">{reversalRiskBuffer.toFixed(1)} t</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Other ineligible</span>
                  <span className="font-mono text-[#95edff]">{screeningIneligible.toFixed(1)} t</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderMappingStep() {
    if (!activeField) {
      return null;
    }

    return (
      <div className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="workbench-metric-card">
            <p className="workbench-label">Map coverage</p>
            <p className="mt-3 font-display text-4xl text-white">{mappingCoverage}%</p>
          </div>
          <div className="workbench-metric-card">
            <p className="workbench-label">Eligible area</p>
            <p className="mt-3 font-display text-4xl text-[#7ce5d8]">
              {eligibleArea.toFixed(0)}
            </p>
            <p className="text-sm text-[#a8bcc6]">ha still creditable</p>
          </div>
          <div className="workbench-metric-card">
            <p className="workbench-label">Excluded area</p>
            <p className="mt-3 font-display text-4xl text-white">
              {excludedArea.toFixed(0)}
            </p>
            <p className="text-sm text-[#a8bcc6]">ha screened out</p>
          </div>
          <div className="workbench-metric-card">
            <p className="workbench-label">Sampling coverage</p>
            <p className="mt-3 font-display text-4xl text-white">
              {averageSamplingCoverage}%
            </p>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[0.72fr_1.28fr]">
          <div className="space-y-3">
            {fields.map((field) => {
              const isActive = field.id === activeField.id;

              return (
                <button
                  key={field.id}
                  type="button"
                  onClick={() => setActiveFieldId(field.id)}
                  className={`w-full rounded-[1.4rem] border p-4 text-left transition ${
                    isActive
                      ? "border-[#27ddb4]/40 bg-[rgba(39,221,180,0.09)]"
                      : "border-white/10 bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.05)]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-[1.7rem] leading-none text-white">
                        {field.name}
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-[0.22em] text-[#8fded0]">
                        {field.areaHa} ha · {field.boundaryMethod}
                      </p>
                    </div>
                    <span
                      className={`rounded-full border px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em] ${boundaryStatusClasses[field.boundaryStatus]}`}
                    >
                      {boundaryStatusLabels[field.boundaryStatus]}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[#95edff]">
                        Geometry
                      </p>
                      <p className="mt-2 font-mono text-sm text-[#f2c77f]">
                        {field.geometryConfidencePct}%
                      </p>
                    </div>
                    <div>
                      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[#95edff]">
                        Sampling
                      </p>
                      <p className="mt-2 font-mono text-sm text-[#f2c77f]">
                        {field.samplingCoveragePct}%
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="space-y-5">
            <div className="workbench-subpanel rounded-[1.7rem] p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <p className="font-display text-3xl text-white">{activeField.name}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.22em] text-[#90e0d2]">
                    {activeField.areaHa} ha · {activeField.waterSource}
                  </p>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em] ${boundaryStatusClasses[activeField.boundaryStatus]}`}
                >
                  {boundaryStatusLabels[activeField.boundaryStatus]}
                </span>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#95edff]">
                    Parcel matrix
                  </p>
                  <div className="mt-4 grid min-h-[15rem] grid-cols-12 gap-3">
                    {fields.map((field) => {
                      const columnSpan = Math.max(
                        4,
                        Math.min(12, Math.round((field.areaHa / Math.max(totalArea, 1)) * 12)),
                      );
                      const isSelected = field.id === activeField.id;

                      return (
                        <button
                          key={field.id}
                          type="button"
                          onClick={() => setActiveFieldId(field.id)}
                          className={`relative flex min-h-[6.5rem] flex-col justify-between rounded-[1.25rem] border p-3 text-left transition ${
                            isSelected
                              ? "border-[#95edff]/45 shadow-[0_18px_40px_rgba(0,0,0,0.2)]"
                              : "border-white/10"
                          } ${boundaryStatusClasses[field.boundaryStatus]}`}
                          style={{ gridColumn: `span ${columnSpan}` }}
                        >
                          <div>
                            <p className="text-sm font-medium">{field.name}</p>
                            <p className="mt-1 text-[0.68rem] uppercase tracking-[0.22em] opacity-80">
                              {field.areaHa} ha
                            </p>
                          </div>
                          <div className="space-y-2">
                            <div className="h-1.5 rounded-full bg-black/20">
                              <div
                                className="h-full rounded-full bg-white/80"
                                style={{ width: `${field.geometryConfidencePct}%` }}
                              />
                            </div>
                            <p className="text-[0.68rem] uppercase tracking-[0.22em] opacity-80">
                              geometry {field.geometryConfidencePct}%
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[#a8bcc6]">
                    Boundary status sets the parcel tone. Geometry confidence drives the white bar, so weak parcels stand out immediately.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="workbench-summary-card">
                    <p className="workbench-label">Edge risk</p>
                    <p className="mt-3 font-display text-3xl text-white">
                      {activeField.adjacencyRiskPct}%
                    </p>
                  </div>
                  <div className="workbench-summary-card">
                    <p className="workbench-label">Sampling coverage</p>
                    <p className="mt-3 font-display text-3xl text-white">
                      {activeField.samplingCoveragePct}%
                    </p>
                  </div>
                  <div className="workbench-summary-card">
                    <p className="workbench-label">Boundary method</p>
                    <p className="mt-3 font-display text-3xl text-white">
                      {activeField.boundaryMethod}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="workbench-subpanel rounded-[1.7rem] p-5 sm:p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-[#95edff]">
                Mapping controls
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <label className="workbench-field">
                  <span className="workbench-label">Boundary status</span>
                  <select
                    value={activeField.boundaryStatus}
                    onChange={(event) =>
                      updateFieldValue(
                        activeField.id,
                        "boundaryStatus",
                        event.target.value as BoundaryStatus,
                      )
                    }
                    className="workbench-input"
                  >
                    {boundaryStatusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="workbench-field">
                  <span className="workbench-label">Boundary method</span>
                  <select
                    value={activeField.boundaryMethod}
                    onChange={(event) =>
                      updateFieldValue(
                        activeField.id,
                        "boundaryMethod",
                        event.target.value as BoundaryMethod,
                      )
                    }
                    className="workbench-input"
                  >
                    {boundaryMethodOptions.map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="workbench-field">
                  <span className="workbench-label">Geometry confidence (%)</span>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={activeField.geometryConfidencePct}
                    onChange={(event) =>
                      updateFieldValue(
                        activeField.id,
                        "geometryConfidencePct",
                        parseNumberInput(event.target.value),
                      )
                    }
                    className="workbench-input"
                  />
                </label>

                <label className="workbench-field">
                  <span className="workbench-label">Sampling coverage (%)</span>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={activeField.samplingCoveragePct}
                    onChange={(event) =>
                      updateFieldValue(
                        activeField.id,
                        "samplingCoveragePct",
                        parseNumberInput(event.target.value),
                      )
                    }
                    className="workbench-input"
                  />
                </label>

                <label className="workbench-field">
                  <span className="workbench-label">Leakage edge risk (%)</span>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={activeField.adjacencyRiskPct}
                    onChange={(event) =>
                      updateFieldValue(
                        activeField.id,
                        "adjacencyRiskPct",
                        parseNumberInput(event.target.value),
                      )
                    }
                    className="workbench-input"
                  />
                </label>

                <label className="workbench-field">
                  <span className="workbench-label">Excluded area (ha)</span>
                  <input
                    type="number"
                    min="0"
                    max={activeField.areaHa}
                    value={activeField.excludedAreaHa}
                    onChange={(event) =>
                      updateFieldValue(
                        activeField.id,
                        "excludedAreaHa",
                        parseNumberInput(event.target.value),
                      )
                    }
                    className="workbench-input"
                  />
                </label>

                <label className="workbench-field">
                  <span className="workbench-label">Exclusion reason</span>
                  <select
                    value={activeField.exclusionReason}
                    onChange={(event) =>
                      updateFieldValue(
                        activeField.id,
                        "exclusionReason",
                        event.target.value as ExclusionReason,
                      )
                    }
                    className="workbench-input"
                  >
                    {exclusionReasonOptions.map((reason) => (
                      <option key={reason} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="workbench-field">
                  <span className="workbench-label">Water source</span>
                  <input
                    value={activeField.waterSource}
                    onChange={(event) =>
                      updateFieldValue(activeField.id, "waterSource", event.target.value)
                    }
                    className="workbench-input"
                  />
                </label>
              </div>

              <label className="workbench-field mt-4">
                <span className="workbench-label">Boundary notes</span>
                <textarea
                  rows={4}
                  value={activeField.boundaryNotes}
                  onChange={(event) =>
                    updateFieldValue(activeField.id, "boundaryNotes", event.target.value)
                  }
                  className="workbench-input min-h-28 resize-y"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[0.96fr_1.04fr]">
          <div className="workbench-subpanel rounded-[1.7rem] p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[#f2c77f]">
              Mapping blockers
            </p>
            <div className="mt-5 space-y-3">
              {mappingBlockers.length > 0 ? (
                mappingBlockers.map((field) => (
                  <div key={field.id} className="flex items-start gap-3 text-sm leading-6 text-[#dce7e3]">
                    <MapPinned className="mt-1 size-4 shrink-0 text-[#f2c77f]" strokeWidth={1.85} />
                    <span>
                      {field.name}: {getExcludedAreaHa(field) > 0 && field.exclusionReason === "None"
                        ? "excluded area is set but no exclusion reason is linked yet"
                        : field.boundaryNotes}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm leading-6 text-[#dce7e3]">
                  No parcel-level mapping blockers remain in the current farm layout.
                </p>
              )}
            </div>
          </div>

          <div className="workbench-subpanel rounded-[1.7rem] p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[#95edff]">
              Spatial summary
            </p>
            <div className="mt-5 space-y-3 text-sm text-[#dce7e3]">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                <span>Eligible area</span>
                <span className="font-mono text-[#7ce5d8]">{eligibleArea.toFixed(0)} ha</span>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                <span>Excluded area</span>
                <span className="font-mono text-[#f2c77f]">{excludedArea.toFixed(0)} ha</span>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                <span>Mapped area</span>
                <span className="font-mono text-[#95edff]">{mappedArea.toFixed(0)} ha</span>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                <span>Needs review</span>
                <span className="font-mono text-[#95edff]">{reviewArea.toFixed(0)} ha</span>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                <span>Missing geometry</span>
                <span className="font-mono text-[#95edff]">{missingMapArea.toFixed(0)} ha</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Highest leakage edge</span>
                <span className="font-mono text-[#f2c77f]">
                  {highestBoundaryRisk
                    ? `${highestBoundaryRisk.name} · ${highestBoundaryRisk.adjacencyRiskPct}%`
                    : "None"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderReadinessStep() {
    return (
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="workbench-metric-card">
            <p className="workbench-label">Readiness score</p>
            <p className="mt-3 font-display text-4xl text-white">{readinessScore}%</p>
          </div>
          <div className="workbench-metric-card">
            <p className="workbench-label">Status</p>
            <p className="mt-3 font-display text-4xl text-[#7ce5d8]">
              {readinessStatus}
            </p>
          </div>
          <div className="workbench-metric-card">
            <p className="workbench-label">Missing items</p>
            <p className="mt-3 font-display text-4xl text-white">
              {missingReadiness.length}
            </p>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-3">
            {readinessEntries.map((item) => (
              <label
                key={item.key}
                className="workbench-toggle flex items-start gap-4 rounded-[1.3rem] p-4"
              >
                <input
                  type="checkbox"
                  checked={item.derivedComplete}
                  onChange={() => toggleReadinessItem(item.key)}
                  disabled={item.linkedDocuments.length > 0}
                  className="mt-1 size-4 accent-[#27ddb4]"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-sm font-medium text-[#eef4f1]">{item.label}</p>
                    <span className="rounded-full border border-white/10 px-2 py-1 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[#95edff]">
                      {item.weight}%
                    </span>
                    <span
                      className={`rounded-full border px-2 py-1 font-mono text-[0.68rem] uppercase tracking-[0.2em] ${
                        item.progress >= 1
                          ? "border-[#27ddb4]/30 bg-[rgba(39,221,180,0.1)] text-[#7ce5d8]"
                          : item.progress > 0
                            ? "border-[#f2c77f]/30 bg-[#f2c77f]/10 text-[#f2c77f]"
                            : "border-[#f3a66b]/28 bg-[#f3a66b]/10 text-[#f3d6b2]"
                      }`}
                    >
                      {item.progress >= 1
                        ? "Ready"
                        : item.progress > 0
                          ? "In review"
                          : "Missing"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[#a8bcc6]">{item.note}</p>
                  <p className="mt-2 text-[0.72rem] uppercase tracking-[0.22em] text-[#95edff]">
                    {item.linkedDocuments.length > 0
                      ? `${Math.round(item.progress * 100)}% synced from packet desk across ${item.linkedDocuments.length} doc${item.linkedDocuments.length === 1 ? "" : "s"}`
                      : item.complete
                        ? "Manually confirmed"
                        : "Waiting for confirmation"}
                  </p>
                </div>
              </label>
            ))}
          </div>

          <div className="space-y-5">
            <div className="workbench-subpanel rounded-[1.7rem] p-5 sm:p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-[#f2c77f]">
                Missing packet notes
              </p>
              <div className="mt-5 space-y-3">
                {missingReadiness.length > 0 ? (
                  missingReadiness.map((item) => (
                    <div key={item.key} className="flex items-start gap-3 text-sm leading-6 text-[#dce7e3]">
                      <FileCheck2 className="mt-1 size-4 shrink-0 text-[#f2c77f]" strokeWidth={1.85} />
                      <span>
                        {item.label}: {item.note}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm leading-6 text-[#dce7e3]">
                    No blocking gaps remain in the mock evidence packet.
                  </p>
                )}
              </div>
            </div>

            <div className="workbench-subpanel rounded-[1.7rem] p-5 sm:p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-[#95edff]">
                Verifier posture
              </p>
              <p className="mt-5 text-sm leading-6 text-[#dce7e3]">
                The packet is strongest when the baseline history, activity logs, and sampling evidence all point to the same operating story. This step should stay brutally explicit about what is still missing.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderResultsStep() {
    return (
      <div className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="workbench-metric-card">
            <p className="workbench-label">Baseline net</p>
            <p className="mt-3 font-display text-4xl text-white">{baselineNet.toFixed(1)}</p>
            <p className="text-sm text-[#a8bcc6]">tCO2e / year</p>
          </div>
          <div className="workbench-metric-card">
            <p className="workbench-label">Project net</p>
            <p className="mt-3 font-display text-4xl text-white">{projectNet.toFixed(1)}</p>
            <p className="text-sm text-[#a8bcc6]">tCO2e / year</p>
          </div>
          <div className="workbench-metric-card">
            <p className="workbench-label">Indicative quantity</p>
            <p className="mt-3 font-display text-4xl text-[#7ce5d8]">
              {estimatedCredits.toFixed(1)}
            </p>
            <p className="text-sm text-[#a8bcc6]">after deductions</p>
          </div>
          <div className="workbench-metric-card">
            <p className="workbench-label">Indicative net</p>
            <p className="mt-3 font-display text-4xl text-white">{formatUsd(indicativeFarmerNet)}</p>
            <p className="text-sm text-[#a8bcc6]">commercial screen only</p>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[0.96fr_1.04fr]">
          <div className="space-y-5">
            <div className="workbench-subpanel rounded-[1.7rem] p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="workbench-icon-chip">
                  <BarChart3 className="size-5" strokeWidth={1.85} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#95edff]">
                    Baseline versus project
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#a8bcc6]">
                    Emissions and removals stay separated so the delta is readable.
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  { label: "Baseline emissions", value: totals.baselineEmissions },
                  { label: "Baseline removals", value: totals.baselineRemovals },
                  { label: "Project emissions", value: totals.projectEmissions },
                  { label: "Project removals", value: totals.projectRemovals },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 text-sm text-[#dce7e3] last:border-b-0 last:pb-0">
                    <span>{item.label}</span>
                    <span className="font-mono text-[#95edff]">{item.value.toFixed(1)} tCO2e</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="workbench-subpanel rounded-[1.7rem] p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="workbench-icon-chip">
                  <ShieldCheck className="size-5" strokeWidth={1.85} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#95edff]">
                    Baseline hotspots
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#a8bcc6]">
                    Source ranking before the scenario moves the farm into a lower-emission posture.
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {baselineHotspots.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between gap-4 text-sm text-[#dce7e3]">
                      <span>{item.label}</span>
                      <span className="font-mono text-[#95edff]">{item.value.toFixed(1)} tCO2e</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-white/6">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,#27ddb4_0%,#95edff_100%)]"
                        style={{ width: `${(item.value / largestHotspot) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="workbench-subpanel rounded-[1.7rem] p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="workbench-icon-chip">
                  <ClipboardCheck className="size-5" strokeWidth={1.85} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#95edff]">
                    Deductions, gates, and commercial screen
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#a8bcc6]">
                    Gross benefit, conservative deductions, gate blockers, and the indicative farmer economics stay visible as separate layers.
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3 rounded-[1.4rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
                {[
                  { label: "Parcel exclusions", value: parcelExclusionDeduction },
                  { label: "Leakage", value: leakage },
                  { label: "Uncertainty", value: uncertainty },
                  { label: "Base buffer", value: baseBuffer },
                  { label: "Reversal risk uplift", value: reversalRiskBuffer },
                  { label: "Other ineligible", value: screeningIneligible },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 text-sm text-[#dce7e3] last:border-b-0 last:pb-0">
                    <span>{item.label}</span>
                    <span className="font-mono text-[#f2c77f]">{item.value.toFixed(1)} t</span>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-sm leading-6 text-[#a8bcc6]">
                Effective buffer reserve is {effectiveBufferPct}%: {scenario.bufferPct}% base plus {reversalRiskUpliftPct}% from the current reversal profile{topReversalDriver ? `, led by ${topReversalDriver.label.toLowerCase()}` : ""}.
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="workbench-summary-card">
                  <p className="workbench-label">Indicative quantity</p>
                  <p className="mt-3 font-display text-3xl text-white">{estimatedCredits.toFixed(1)}</p>
                </div>
                <div className="workbench-summary-card">
                  <p className="workbench-label">Gross revenue</p>
                  <p className="mt-3 font-display text-3xl text-white">{formatUsd(grossRevenue)}</p>
                </div>
                <div className="workbench-summary-card">
                  <p className="workbench-label">Eligible area</p>
                  <p className="mt-3 font-display text-3xl text-white">{eligibleArea.toFixed(0)} ha</p>
                </div>
                <div className="workbench-summary-card">
                  <p className="workbench-label">Open blockers</p>
                  <p className="mt-3 font-display text-3xl text-[#7ce5d8]">{blockingEligibilityGates.length}</p>
                </div>
                <div className="workbench-summary-card">
                  <p className="workbench-label">Indicative net</p>
                  <p className="mt-3 font-display text-3xl text-[#7ce5d8]">{formatUsd(indicativeFarmerNet)}</p>
                </div>
              </div>

              <div className="mt-4 space-y-3 rounded-[1.4rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 text-sm text-[#dce7e3]">
                  <span>Price assumption</span>
                  <span className="font-mono text-[#95edff]">{formatUsd(commercial.pricePerCredit)} / credit</span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 text-sm text-[#dce7e3]">
                  <span>Registry + platform + verification</span>
                  <span className="font-mono text-[#f2c77f]">{formatUsd(fixedCommercialCosts)}</span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 text-sm text-[#dce7e3]">
                  <span>Developer share</span>
                  <span className="font-mono text-[#f2c77f]">{formatUsd(developerShareValue)}</span>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm text-[#dce7e3]">
                  <span>Indicative farmer net</span>
                  <span className="font-mono text-[#7ce5d8]">{formatUsd(indicativeFarmerNet)}</span>
                </div>
              </div>

              <div className="mt-4 space-y-3 rounded-[1.4rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 text-sm text-[#dce7e3]">
                  <span>Methodology pack</span>
                  <span className="font-mono text-[#95edff]">{methodology.label}</span>
                </div>
                {eligibilityGates.map((gate) => (
                  <div
                    key={gate.key}
                    className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 text-sm text-[#dce7e3] last:border-b-0 last:pb-0"
                  >
                    <span>{gate.label}</span>
                    <span className={`font-mono ${gate.pass ? "text-[#7ce5d8]" : "text-[#f2c77f]"}`}>
                      {gate.pass ? "Clear" : "Review"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="workbench-subpanel rounded-[1.7rem] p-5 sm:p-6">
              <div className="flex items-center gap-3 text-[#eef4f1]">
                <TreePine className="size-4" strokeWidth={1.8} />
                <p className="text-xs uppercase tracking-[0.24em] text-[#95edff]">
                  Mock report summary
                </p>
              </div>

              <div className="mt-5 space-y-3">
                {reportSummary.map((line) => (
                  <p key={line} className="text-sm leading-6 text-[#dbe5e2]">
                    {line}
                  </p>
                ))}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {fieldResults.map((field) => (
                  <div key={field.id} className="rounded-[1.2rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
                    <p className="text-sm font-medium text-white">{field.name}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.22em] text-[#7ce5d8]">
                      Gross benefit
                    </p>
                    <p className="mt-2 font-display text-3xl text-[#f1ede3]">
                      {field.grossBenefit.toFixed(1)}
                    </p>
                    <p className="text-sm text-[#a8bcc6]">tCO2e</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderPacketStep() {
    if (!activePacketDocument) {
      return null;
    }

    return (
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="workbench-metric-card">
            <p className="workbench-label">Packet coverage</p>
            <p className="mt-3 font-display text-4xl text-white">{packetCoverage}%</p>
          </div>
          <div className="workbench-metric-card">
            <p className="workbench-label">Review queue</p>
            <p className="mt-3 font-display text-4xl text-[#f2c77f]">
              {packetReviewCount}
            </p>
          </div>
          <div className="workbench-metric-card">
            <p className="workbench-label">Blocking docs</p>
            <p className="mt-3 font-display text-4xl text-white">
              {packetMissingCount}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#95edff]">
              Packet register
            </p>
            <p className="mt-2 text-sm leading-6 text-[#a8bcc6]">
              Turn each readiness control into a named verifier-facing file with a status, owner, scope, and explicit blocker note.
            </p>
          </div>

          <button
            type="button"
            onClick={addPacketDocument}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-[rgba(255,255,255,0.04)] px-4 py-2 text-sm text-[#edf3ef] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <Plus className="size-4" strokeWidth={1.9} />
            Add document
          </button>
        </div>

        <div className="grid gap-5 xl:grid-cols-[0.74fr_1.26fr]">
          <div className="space-y-3">
            {packetDocuments.map((document) => {
              const isActive = document.id === activePacketDocument.id;
              const linkedFieldLabel =
                document.linkedFieldId === null
                  ? "Farm-wide"
                  : fields.find((field) => field.id === document.linkedFieldId)?.name ??
                    "Removed field";

              return (
                <button
                  key={document.id}
                  type="button"
                  onClick={() => setActivePacketDocumentId(document.id)}
                  className={`w-full rounded-[1.4rem] border p-4 text-left transition ${
                    isActive
                      ? "border-[#27ddb4]/40 bg-[rgba(39,221,180,0.09)]"
                      : "border-white/10 bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.05)]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-[1.6rem] leading-none text-white">
                        {document.title}
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-[0.22em] text-[#8fded0]">
                        {document.category} · {document.season}
                      </p>
                    </div>
                    <span
                      className={`rounded-full border px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em] ${packetStatusClasses[document.status]}`}
                    >
                      {packetStatusLabels[document.status]}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[#95edff]">
                        Owner
                      </p>
                      <p className="mt-2 text-sm text-[#dce7e3]">{document.owner}</p>
                    </div>
                    <div>
                      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[#95edff]">
                        Linked scope
                      </p>
                      <p className="mt-2 text-sm text-[#dce7e3]">{linkedFieldLabel}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="workbench-subpanel rounded-[1.7rem] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="font-display text-3xl text-white">
                  {activePacketDocument.title}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-[#90e0d2]">
                  {activePacketDocument.category} · {activePacketDocument.season}
                </p>
              </div>

              <button
                type="button"
                onClick={() => removePacketDocument(activePacketDocument.id)}
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-[rgba(255,255,255,0.03)] text-[#c5d3cf] disabled:cursor-not-allowed disabled:opacity-35"
                disabled={packetDocuments.length === 1}
              >
                <Trash2 className="size-4" strokeWidth={1.8} />
              </button>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="workbench-field md:col-span-2">
                <span className="workbench-label">Document title</span>
                <input
                  value={activePacketDocument.title}
                  onChange={(event) =>
                    updatePacketDocument(
                      activePacketDocument.id,
                      "title",
                      event.target.value,
                    )
                  }
                  className="workbench-input"
                />
              </label>

              <label className="workbench-field">
                <span className="workbench-label">Category</span>
                <select
                  value={activePacketDocument.category}
                  onChange={(event) =>
                    updatePacketDocument(
                      activePacketDocument.id,
                      "category",
                      event.target.value as PacketCategory,
                    )
                  }
                  className="workbench-input"
                >
                  {packetCategoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <label className="workbench-field">
                <span className="workbench-label">Linked scope</span>
                <select
                  value={activePacketDocument.linkedFieldId ?? "farm"}
                  onChange={(event) => {
                    const nextValue =
                      event.target.value === "farm"
                        ? null
                        : Number(event.target.value);
                    updatePacketDocument(
                      activePacketDocument.id,
                      "linkedFieldId",
                      nextValue,
                    );
                  }}
                  className="workbench-input"
                >
                  <option value="farm">Farm-wide</option>
                  {fields.map((field) => (
                    <option key={field.id} value={field.id}>
                      {field.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="workbench-field">
                <span className="workbench-label">Owner</span>
                <input
                  value={activePacketDocument.owner}
                  onChange={(event) =>
                    updatePacketDocument(
                      activePacketDocument.id,
                      "owner",
                      event.target.value,
                    )
                  }
                  className="workbench-input"
                />
              </label>

              <label className="workbench-field">
                <span className="workbench-label">Season / range</span>
                <input
                  value={activePacketDocument.season}
                  onChange={(event) =>
                    updatePacketDocument(
                      activePacketDocument.id,
                      "season",
                      event.target.value,
                    )
                  }
                  className="workbench-input"
                />
              </label>

              <label className="workbench-field">
                <span className="workbench-label">Status</span>
                <select
                  value={activePacketDocument.status}
                  onChange={(event) =>
                    updatePacketDocument(
                      activePacketDocument.id,
                      "status",
                      event.target.value as PacketStatus,
                    )
                  }
                  className="workbench-input"
                >
                  {packetStatusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="workbench-field">
                <span className="workbench-label">Related readiness control</span>
                <select
                  value={activePacketDocument.readinessKey}
                  onChange={(event) =>
                    updatePacketDocument(
                      activePacketDocument.id,
                      "readinessKey",
                      event.target.value,
                    )
                  }
                  className="workbench-input"
                >
                  {readinessItems.map((item) => (
                    <option key={item.key} value={item.key}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="workbench-field mt-4">
              <span className="workbench-label">Packet note</span>
              <textarea
                rows={4}
                value={activePacketDocument.note}
                onChange={(event) =>
                  updatePacketDocument(
                    activePacketDocument.id,
                    "note",
                    event.target.value,
                  )
                }
                className="workbench-input min-h-28 resize-y"
              />
            </label>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="workbench-summary-card">
                <p className="workbench-label">Related control</p>
                <p className="mt-3 font-display text-3xl text-white">
                  {activePacketReadiness?.label ?? "Unmapped"}
                </p>
              </div>
              <div className="workbench-summary-card">
                <p className="workbench-label">Linked scope</p>
                <p className="mt-3 font-display text-3xl text-white">
                  {activePacketDocumentFieldLabel}
                </p>
              </div>
              <div className="workbench-summary-card">
                <p className="workbench-label">Status</p>
                <p className="mt-3 font-display text-3xl text-[#7ce5d8]">
                  {packetStatusLabels[activePacketDocument.status]}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[0.96fr_1.04fr]">
          <div className="workbench-subpanel rounded-[1.7rem] p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[#95edff]">
              Packet export summary
            </p>
            <div className="mt-5 space-y-3">
              {packetSummary.map((line) => (
                <p key={line} className="text-sm leading-6 text-[#dbe5e2]">
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="workbench-subpanel rounded-[1.7rem] p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[#f2c77f]">
              Blocking packet items
            </p>
            <div className="mt-5 space-y-3">
              {packetMissingCount > 0 ? (
                packetDocuments
                  .filter((document) => document.status === "missing")
                  .map((document) => (
                    <div
                      key={document.id}
                      className="flex items-start gap-3 text-sm leading-6 text-[#dce7e3]"
                    >
                      <FileCheck2
                        className="mt-1 size-4 shrink-0 text-[#f2c77f]"
                        strokeWidth={1.85}
                      />
                      <span>
                        {document.title}: {document.note}
                      </span>
                    </div>
                  ))
              ) : (
                <p className="text-sm leading-6 text-[#dce7e3]">
                  No blocking documents remain in the packet register.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderStepContent() {
    switch (activeStep.id) {
      case "farm":
        return renderFarmStep();
      case "fields":
        return renderFieldsStep();
      case "mapping":
        return renderMappingStep();
      case "scenario":
        return renderScenarioStep();
      case "readiness":
        return renderReadinessStep();
      case "results":
        return renderResultsStep();
      case "packet":
        return renderPacketStep();
      default:
        return null;
    }
  }

  return (
    <section id="workbench" className="pb-16">
      <div className="mb-8 rounded-[2.3rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,14,21,0.94)_0%,rgba(4,8,14,0.88)_100%)] p-7 text-[#ebf0ec] shadow-[0_28px_70px_rgba(0,0,0,0.28)] sm:p-9">
        <div className="grid gap-6 2xl:grid-cols-[1.08fr_0.92fr] 2xl:items-end">
          <div>
            <p className="section-label text-[#7ce5d8]">Assessment flow</p>
            <h2 className="mt-4 max-w-4xl font-display text-[3.6rem] leading-[0.92] text-white sm:text-[4rem] xl:text-[4.25rem] 2xl:text-5xl">
              Proper sections. Real sequence. One working step at a time.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#c7d6d2]">
              The assessment is now split into a clean seven-step flow so farm setup, field editing, field mapping, scenario tuning, evidence review, modeled results, and packet assembly stop crashing into each other.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 2xl:self-end">
            <div className="rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.04)] p-5">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#95edff]">Current step</p>
              <p className="mt-3 font-display text-4xl text-white">{activeStep.step}</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.04)] p-5">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#95edff]">Indicative qty</p>
              <p className="mt-3 font-display text-4xl text-white">{estimatedCredits.toFixed(1)}</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.04)] p-5">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#95edff]">Readiness</p>
              <p className="mt-3 font-display text-4xl text-white">{readinessScore}%</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          useExpandedWorkbenchLayout
            ? "space-y-6"
            : "grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-start"
        }
      >
        <div className="min-w-0 space-y-6">
          <div className="workbench-panel rounded-[2rem] p-3 sm:p-4">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7">
              {stepDefinitions.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === activeStepIndex;
                const isComplete = stepCompletion[step.id];

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveStepIndex(index)}
                    className={`rounded-[1.25rem] border p-4 text-left transition xl:min-h-[10.5rem] xl:p-4 2xl:min-h-[11rem] 2xl:p-4 ${
                      isActive
                        ? "border-[#27ddb4]/40 bg-[rgba(39,221,180,0.09)]"
                        : "border-white/10 bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.05)]"
                    }`}
                  >
                    <div className="flex items-center gap-3 2xl:flex-col 2xl:items-start 2xl:gap-2">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-[0.95rem] bg-[linear-gradient(180deg,#102332_0%,#0a1620_100%)] text-[#edf3ef] shadow-[0_16px_36px_rgba(0,0,0,0.2)] 2xl:size-9 2xl:rounded-[0.85rem]">
                        <Icon className="size-5" strokeWidth={1.85} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#8fded0]">
                          Step {step.step}
                        </p>
                        <p className="mt-1 font-display text-[1.65rem] leading-none text-white xl:text-[1.55rem] xl:leading-[0.98] 2xl:text-[1.45rem]">
                          {step.title}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3 text-[0.68rem] uppercase tracking-[0.22em] text-[#dce7e3] 2xl:mt-3 2xl:flex-col 2xl:items-start 2xl:gap-2">
                      <span className="rounded-full border border-white/10 px-3 py-1 2xl:px-2.5">
                        {isActive ? "Open" : isComplete ? "Ready" : "Pending"}
                      </span>
                      <span className="text-[#8aa8b3]">{index + 1} / {stepDefinitions.length}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <section className="workbench-panel rounded-[2rem] p-6 sm:p-8">
            <div className="flex flex-col gap-5 border-b border-white/10 pb-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="workbench-icon-chip">
                  <ActiveStepIcon className="size-5" strokeWidth={1.85} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#18b98f]">
                    Step {activeStep.step}
                  </p>
                  <h3 className="mt-3 font-display text-4xl leading-[0.95] text-white">
                    {activeStep.title}
                  </h3>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-[#a8bcc6]">
                    {activeStep.description}
                  </p>
                </div>
              </div>

              <div className="rounded-full border border-white/10 bg-[rgba(255,255,255,0.04)] px-4 py-2 text-xs uppercase tracking-[0.22em] text-[#ecf3ef]">
                {activeStepIndex + 1} of {stepDefinitions.length}
              </div>
            </div>

            <div className="mt-6">{renderStepContent()}</div>

            <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => moveStep("back")}
                disabled={activeStepIndex === 0}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-2 text-sm text-[#dce7e3] disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ChevronLeft className="size-4" strokeWidth={1.9} />
                Back
              </button>

              <button
                type="button"
                onClick={() => moveStep("next")}
                disabled={activeStepIndex === stepDefinitions.length - 1}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#19b98f] px-5 py-2 text-sm font-medium text-[#06131a] disabled:cursor-not-allowed disabled:opacity-45"
              >
                {activeStep.id === "results" ? "Go to packet desk" : "Continue"}
                <ChevronRight className="size-4" strokeWidth={1.9} />
              </button>
            </div>
          </section>
        </div>

        <aside
          className={
            useExpandedWorkbenchLayout
              ? "grid gap-4 md:grid-cols-2 xl:grid-cols-3"
              : "space-y-4"
          }
        >
          <section className="workbench-panel rounded-[2rem] p-6 sm:p-7">
            <p className="text-xs uppercase tracking-[0.24em] text-[#95edff]">
              Assessment progress
            </p>
            <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="font-display text-3xl text-white">{activeStep.title}</p>
                <span className="font-mono text-sm text-[#f2c77f]">{Math.round(progressPct)}%</span>
              </div>
              <div className="mt-4 h-2 rounded-full bg-white/6">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#27ddb4_0%,#95edff_100%)]"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="mt-4 text-sm leading-6 text-[#dce7e3]">
                {activeStep.description}
              </p>
            </div>
          </section>

          <section className="workbench-panel rounded-[2rem] p-6 sm:p-7">
            <p className="text-xs uppercase tracking-[0.24em] text-[#95edff]">
              Live snapshot
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <div className="workbench-summary-card">
                <p className="workbench-label">Fields</p>
                <p className="mt-3 font-display text-3xl text-white">{fields.length}</p>
              </div>
              <div className="workbench-summary-card">
                <p className="workbench-label">Total area</p>
                <p className="mt-3 font-display text-3xl text-white">{totalArea.toFixed(0)} ha</p>
              </div>
              <div className="workbench-summary-card">
                <p className="workbench-label">Gross benefit</p>
                <p className="mt-3 font-display text-3xl text-[#7ce5d8]">
                  {grossBenefit.toFixed(1)}
                </p>
              </div>
              <div className="workbench-summary-card">
                <p className="workbench-label">Indicative net</p>
                <p className="mt-3 font-display text-3xl text-white">
                  {formatUsd(indicativeFarmerNet)}
                </p>
              </div>
            </div>
          </section>

          <section className="workbench-panel rounded-[2rem] p-6 sm:p-7">
            <p className="text-xs uppercase tracking-[0.24em] text-[#95edff]">
              Current focus
            </p>
            {activeStep.id === "mapping" && activeField ? (
              <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-3xl text-white">{activeField.name}</p>
                    <p className="mt-2 text-sm text-[#a8bcc6]">
                      {activeField.areaHa} ha · {activeField.waterSource}
                    </p>
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em] ${boundaryStatusClasses[activeField.boundaryStatus]}`}
                  >
                    {boundaryStatusLabels[activeField.boundaryStatus]}
                  </span>
                </div>
                <div className="mt-5 space-y-3 text-sm text-[#dce7e3]">
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                    <span>Geometry confidence</span>
                    <span className="font-mono text-[#95edff]">
                      {activeField.geometryConfidencePct}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                    <span>Sampling coverage</span>
                    <span className="font-mono text-[#95edff]">
                      {activeField.samplingCoveragePct}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>Leakage edge</span>
                    <span className="font-mono text-[#f2c77f]">
                      {activeField.adjacencyRiskPct}%
                    </span>
                  </div>
                </div>
              </div>
            ) : activeStep.id === "packet" && activePacketDocument ? (
              <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-3xl text-white">
                      {activePacketDocument.title}
                    </p>
                    <p className="mt-2 text-sm text-[#a8bcc6]">
                      {activePacketDocumentFieldLabel} · {activePacketDocument.category}
                    </p>
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em] ${packetStatusClasses[activePacketDocument.status]}`}
                  >
                    {packetStatusLabels[activePacketDocument.status]}
                  </span>
                </div>
                <div className="mt-5 space-y-3 text-sm text-[#dce7e3]">
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                    <span>Owner</span>
                    <span className="font-mono text-[#95edff]">
                      {activePacketDocument.owner}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                    <span>Related control</span>
                    <span className="font-mono text-[#95edff]">
                      {activePacketReadiness?.label ?? "Unmapped"}
                    </span>
                  </div>
                  <p className="text-sm leading-6 text-[#a8bcc6]">
                    {activePacketDocument.note}
                  </p>
                </div>
              </div>
            ) : activeStep.id === "fields" && activeField && activeFieldResult ? (
              <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-5">
                <p className="font-display text-3xl text-white">{activeField.name}</p>
                <p className="mt-2 text-sm text-[#a8bcc6]">
                  {activeField.cropType} · {activeField.soilType}
                </p>
                <div className="mt-5 space-y-3 text-sm text-[#dce7e3]">
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                    <span>Baseline emissions</span>
                    <span className="font-mono text-[#95edff]">
                      {activeFieldResult.baselineEmissions.toFixed(1)} t
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                    <span>Project removals</span>
                    <span className="font-mono text-[#95edff]">
                      {activeFieldResult.projectRemovals.toFixed(1)} t
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>Gross benefit</span>
                    <span className="font-mono text-[#f2c77f]">
                      {activeFieldResult.grossBenefit.toFixed(1)} t
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-5">
                {missingReadiness.length > 0 ? (
                  <div className="space-y-3">
                    {missingReadiness.slice(0, 3).map((item) => (
                      <div key={item.key} className="flex items-start gap-3 text-sm leading-6 text-[#dce7e3]">
                        <FileCheck2 className="mt-1 size-4 shrink-0 text-[#f2c77f]" strokeWidth={1.85} />
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm leading-6 text-[#dce7e3]">
                    The packet is structurally complete for a mock verifier review.
                  </p>
                )}
              </div>
            )}
          </section>
        </aside>
      </div>
    </section>
  );
}
