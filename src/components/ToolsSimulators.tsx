import React, { useState, useMemo } from "react";
import {
  SlidersHorizontal,
  Droplets,
  Sun,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Zap,
  Info,
  Layers,
  Sparkles,
  Printer,
  Copy,
  Check,
  Gauge,
  Workflow,
  Compass,
  Home,
  Factory,
  Brain,
  Activity,
  Target,
  Coins
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { FRENCH_DEPARTMENTS } from "../data/frenchDepartments";
import JuniversModule from "./tools/JuniversModule";
import SmeIso50001Module from "./tools/SmeIso50001Module";

export default function ToolsSimulators() {
  const [universe, setUniverse] = useState<"b2c" | "b2b" | null>(null);
  const [b2cView, setB2cView] = useState<"autonomy" | "junivers" | null>(null);
  const [autonomyTool, setAutonomyTool] = useState<"scan-focus-act" | "water" | "solar">("scan-focus-act");

  // -------------------------------------------------------------
  // TOOL 1: SCAN - FOCUS - ACT METHODOLOGICAL WIZARD
  // -------------------------------------------------------------
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);

  // STEP 1: SCAN Inputs
  const [scanDeptCode, setScanDeptCode] = useState<string>("33"); // Default Gironde
  const [scanPluvio, setScanPluvio] = useState<number>(850); // mm/year
  const [scanRoofArea, setScanRoofArea] = useState<number>(130); // m²
  const [scanSolarIrradiance, setScanSolarIrradiance] = useState<number>(1350); // kWh/m²/year
  const [scanSlope, setScanSlope] = useState<"flat" | "moderate" | "steep">("moderate"); // topography
  const [scanElevationMeters, setScanElevationMeters] = useState<number>(4); // meters of elevation gain
  const [scanHouseholdSize, setScanHouseholdSize] = useState<number>(3);
  const [scanRoofMaterial, setScanRoofMaterial] = useState<"tile" | "slate" | "metal">("tile");
  const [scanSoilType, setScanSoilType] = useState<"clay" | "sand" | "loam">("loam");

  // STEP 2: FOCUS Inputs
  const [focusTargetDrinkWater, setFocusTargetDrinkWater] = useState<number>(100); // % target potable
  const [focusTargetSanitaryWater, setFocusTargetSanitaryWater] = useState<number>(80); // % target tech/sanitary
  const [focusTargetEnergy, setFocusTargetEnergy] = useState<number>(75); // % target electric autonomy
  const [focusLowTechRatio, setFocusLowTechRatio] = useState<number>(70); // % Low-tech vs High-tech
  const [focusBottlenecks, setFocusBottlenecks] = useState<string[]>([
    "winter-storage",
    "pumping-spof"
  ]);

  const toggleBottleneck = (id: string) => {
    setFocusBottlenecks(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  // STEP 3: ACT Calculations
  const actSynthesis = useMemo(() => {
    const roofCoeff = scanRoofMaterial === "tile" ? 0.85 : scanRoofMaterial === "slate" ? 0.90 : 0.95;
    const potentialWaterAnnualM3 = (scanRoofArea * scanPluvio * roofCoeff) / 1000;
    
    // Potable need: 8 L/day/person -> m³/year
    const potableNeedM3 = (scanHouseholdSize * 8 * 365) / 1000;
    // Sanitary need: 80 L/day/person -> m³/year
    const sanitaryNeedM3 = (scanHouseholdSize * 80 * 365) / 1000;
    const totalWaterNeedM3 = potableNeedM3 + sanitaryNeedM3;

    // Recommended water tank size for a 45-day summer dry spell buffer
    const dailyWaterDemandM3 = totalWaterNeedM3 / 365;
    const recommendedTankM3 = Math.max(3, Math.round(dailyWaterDemandM3 * 45 * 1.15));

    // Solar dimensioning
    const annualElectricDemandKWh = scanHouseholdSize * 1100; // estimated kWh/year (heating excluded/biomass assumed)
    const targetElectricKWh = (annualElectricDemandKWh * focusTargetEnergy) / 100;
    const recommendedKwc = Math.max(1.5, Number((targetElectricKWh / (scanSolarIrradiance * 0.85)).toFixed(1)));
    const recommendedBatteryKwh = Math.max(2, Math.round((annualElectricDemandKWh / 365) * 1.5));

    // Hydraulic pumping architecture based on topography
    const pumpingType =
      scanSlope === "steep" || scanElevationMeters >= 5
        ? "Gravitaire pur (Pression naturelle suffisante sans pompe)"
        : scanElevationMeters >= 2
        ? "Mixte gravitaire + clapet et surpresseur 24V basse consommation"
        : "Surpresseur solaire 12V/24V continu avec réserve sous pression";

    // Resilience score calculation
    let score = 50;
    if (potentialWaterAnnualM3 >= totalWaterNeedM3 * 0.8) score += 20;
    if (scanSolarIrradiance >= 1200) score += 15;
    if (scanSlope !== "flat") score += 10;
    if (focusLowTechRatio >= 60) score += 5; // bonus for low SPOF
    score = Math.min(98, score);

    return {
      potentialWaterAnnualM3: Math.round(potentialWaterAnnualM3),
      totalWaterNeedM3: Math.round(totalWaterNeedM3),
      potableNeedM3: Number(potableNeedM3.toFixed(1)),
      sanitaryNeedM3: Math.round(sanitaryNeedM3),
      recommendedTankM3,
      recommendedKwc,
      recommendedBatteryKwh,
      pumpingType,
      score,
      annualSavingsEur: Math.round(totalWaterNeedM3 * 4.5 + targetElectricKWh * 0.25)
    };
  }, [
    scanPluvio,
    scanRoofArea,
    scanSolarIrradiance,
    scanSlope,
    scanElevationMeters,
    scanHouseholdSize,
    scanRoofMaterial,
    focusTargetDrinkWater,
    focusTargetSanitaryWater,
    focusTargetEnergy,
    focusLowTechRatio
  ]);

  // -------------------------------------------------------------
  // TOOL 2: WATER & DUAL NETWORK SIMULATOR
  // -------------------------------------------------------------
  const [waterRoofArea, setWaterRoofArea] = useState<number>(140);
  const [waterPluvio, setWaterPluvio] = useState<number>(880);
  const [waterPersons, setWaterPersons] = useState<number>(3);
  const [waterDualNetwork, setWaterDualNetwork] = useState<boolean>(true);
  const [waterTankM3, setWaterTankM3] = useState<number>(7);

  // Month-by-month hydrology model (12 months)
  const waterSimulation = useMemo(() => {
    // Typical French rainfall distribution percentage by month
    const rainCoeffs = [0.09, 0.08, 0.08, 0.07, 0.09, 0.06, 0.04, 0.05, 0.08, 0.11, 0.13, 0.12];
    const monthNames = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
    
    // Daily water need:
    // With dual network: Potable (drinking+cooking) = 9 L/j/p; Sanitary (shower+WC+wash) = 75 L/j/p -> Total 84 L/j/p
    // Without dual network: Standard usage = 130 L/j/p
    const dailyNeedPerPerson = waterDualNetwork ? 84 : 130;
    const monthlyNeedM3 = (dailyNeedPerPerson * waterPersons * 30.4) / 1000;
    const annualNeedM3 = monthlyNeedM3 * 12;

    const roofCoeff = 0.88; // runoff coefficient
    const annualCollectedM3 = (waterRoofArea * waterPluvio * roofCoeff) / 1000;

    let currentTankLevel = waterTankM3 * 0.7; // start in Jan with 70%
    let totalHarvestedUsed = 0;
    let totalShortage = 0;

    const monthlyData = monthNames.map((month, idx) => {
      const monthRainfallM3 = (annualCollectedM3 * rainCoeffs[idx]);
      const need = monthlyNeedM3;

      // Inflow vs Outflow
      const available = currentTankLevel + monthRainfallM3;
      let usedFromTank = 0;
      let shortage = 0;

      if (available >= need) {
        usedFromTank = need;
        currentTankLevel = Math.min(waterTankM3, available - need);
      } else {
        usedFromTank = available;
        shortage = need - available;
        currentTankLevel = 0;
      }

      totalHarvestedUsed += usedFromTank;
      totalShortage += shortage;

      return {
        month,
        apportPluieM3: Number(monthRainfallM3.toFixed(1)),
        besoinM3: Number(need.toFixed(1)),
        niveauCuveM3: Number(currentTankLevel.toFixed(1)),
        seuilCritique: Number((waterTankM3 * 0.2).toFixed(1))
      };
    });

    const autonomyRate = Math.min(100, Math.round((totalHarvestedUsed / annualNeedM3) * 100));
    const daysOfReserve = Math.round((currentTankLevel * 1000) / (dailyNeedPerPerson * waterPersons));

    return {
      annualCollectedM3: Number(annualCollectedM3.toFixed(1)),
      annualNeedM3: Number(annualNeedM3.toFixed(1)),
      autonomyRate,
      daysOfReserve,
      totalShortage: Number(totalShortage.toFixed(1)),
      monthlyData
    };
  }, [waterRoofArea, waterPluvio, waterPersons, waterDualNetwork, waterTankM3]);

  // -------------------------------------------------------------
  // TOOL 3: SOLAR & GRID RESALE SIMULATOR
  // -------------------------------------------------------------
  const [solarCapacityKwc, setSolarCapacityKwc] = useState<number>(6);
  const [solarDeptCode, setSolarDeptCode] = useState<string>("33");
  const [solarIrradiance, setSolarIrradiance] = useState<number>(1380); // kWh/m²/year (33 - Gironde)
  const [solarAnnualDemandKwh, setSolarAnnualDemandKwh] = useState<number>(4200);
  const [solarBatteryKwh, setSolarBatteryKwh] = useState<number>(10);
  const [solarContractMode, setSolarContractMode] = useState<"surplus" | "total">("surplus"); // "surplus" = Autoconsommation + vente surplus | "total" = Vente totale
  const [solarFeedInTariff, setSolarFeedInTariff] = useState<number>(0.13); // €/kWh (Tarif d'achat EDF OA surplus ~0.13 €/kWh)
  const [solarGridPrice, setSolarGridPrice] = useState<number>(0.25); // €/kWh (Prix moyen électricité réseau évitée ~0.25 €/kWh)

  const solarSimulation = useMemo(() => {
    // Solar production seasonality in Western Europe
    const solarMonthCoeffs = [0.03, 0.05, 0.08, 0.11, 0.13, 0.14, 0.15, 0.13, 0.09, 0.05, 0.03, 0.02];
    // Household consumption seasonality (more in winter for heating/lighting)
    const demandMonthCoeffs = [0.12, 0.11, 0.10, 0.08, 0.07, 0.06, 0.06, 0.06, 0.07, 0.09, 0.11, 0.13];
    const monthNames = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];

    const totalAnnualProductionKwh = solarCapacityKwc * solarIrradiance * 0.85; // Performance Ratio 0.85

    let directSelfConsumedTotal = 0;
    let batteryStoredTotal = 0;
    let surplusSoldTotal = 0;

    const monthlyData = monthNames.map((month, idx) => {
      const prod = totalAnnualProductionKwh * solarMonthCoeffs[idx];
      const demand = solarAnnualDemandKwh * demandMonthCoeffs[idx];

      let direct = 0;
      let batteryMonthlyCapacity = 0;
      let surplusSold = 0;

      if (solarContractMode === "total") {
        surplusSold = prod;
        direct = 0;
        batteryMonthlyCapacity = 0;
      } else {
        direct = Math.min(prod, demand * 0.45);
        const surplusAfterDirect = Math.max(0, prod - direct);
        batteryMonthlyCapacity = Math.min(surplusAfterDirect, solarBatteryKwh * 25);
        surplusSold = Math.max(0, surplusAfterDirect - batteryMonthlyCapacity);
      }

      directSelfConsumedTotal += direct;
      batteryStoredTotal += batteryMonthlyCapacity;
      surplusSoldTotal += surplusSold;

      const monthlyResaleIncome = surplusSold * solarFeedInTariff;
      const monthlySavings = (direct + batteryMonthlyCapacity) * solarGridPrice;

      return {
        month,
        productionKwh: Math.round(prod),
        besoinKwh: Math.round(demand),
        autoconsommeeKwh: Math.round(direct + batteryMonthlyCapacity),
        surplusReventeKwh: Math.round(surplusSold),
        gainMensuelEuros: Math.round(monthlyResaleIncome + monthlySavings),
        revenuReventeEuros: Math.round(monthlyResaleIncome)
      };
    });

    const totalSelfConsumedKwh = directSelfConsumedTotal + batteryStoredTotal;
    const selfConsumptionRate = totalAnnualProductionKwh > 0
      ? Math.min(100, Math.round((totalSelfConsumedKwh / totalAnnualProductionKwh) * 100))
      : 0;
    const coverageRate = solarAnnualDemandKwh > 0
      ? Math.min(100, Math.round((totalSelfConsumedKwh / solarAnnualDemandKwh) * 100))
      : 0;

    const annualResaleIncome = surplusSoldTotal * solarFeedInTariff;
    const annualBillSavings = totalSelfConsumedKwh * solarGridPrice;
    const totalAnnualGain = annualResaleIncome + annualBillSavings;

    // Projection 20 ans (durée standard contrat d'obligation d'achat EDF OA)
    const cumulativeGain20Years = Math.round(totalAnnualGain * 20);
    const cumulativeResale20Years = Math.round(annualResaleIncome * 20);
    const cumulativeSavings20Years = Math.round(annualBillSavings * 20);

    const estimatedInstallCost = Math.round(
      solarCapacityKwc * 1600 + (solarContractMode === "surplus" ? solarBatteryKwh * 450 : 0)
    );
    const paybackYears = totalAnnualGain > 0 ? (estimatedInstallCost / totalAnnualGain).toFixed(1) : "—";
    const co2SavedKg = Math.round(totalAnnualProductionKwh * 0.08);

    const breakdownData = solarContractMode === "total"
      ? [
          { name: "Revente Totale Réseau (EDF OA)", value: Math.round(surplusSoldTotal), color: "#f59e0b" }
        ]
      : [
          { name: "Autoconsommation directe", value: Math.round(directSelfConsumedTotal), color: "#0284c7" },
          { name: "Stockage Batterie BT", value: Math.round(batteryStoredTotal), color: "#10b981" },
          { name: "Surplus Revente Réseau (EDF OA)", value: Math.round(surplusSoldTotal), color: "#f59e0b" }
        ];

    return {
      totalAnnualProductionKwh: Math.round(totalAnnualProductionKwh),
      totalSelfConsumedKwh: Math.round(totalSelfConsumedKwh),
      surplusSoldTotal: Math.round(surplusSoldTotal),
      selfConsumptionRate,
      coverageRate,
      annualResaleIncome: Math.round(annualResaleIncome),
      annualBillSavings: Math.round(annualBillSavings),
      totalAnnualGain: Math.round(totalAnnualGain),
      cumulativeGain20Years,
      cumulativeResale20Years,
      cumulativeSavings20Years,
      estimatedInstallCost,
      paybackYears,
      co2SavedKg,
      monthlyData,
      breakdownData
    };
  }, [
    solarCapacityKwc,
    solarIrradiance,
    solarAnnualDemandKwh,
    solarBatteryKwh,
    solarContractMode,
    solarFeedInTariff,
    solarGridPrice
  ]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      {/* 1. Simple Header */}
      <div className="max-w-6xl mx-auto mb-8 text-center sm:text-left">
        <div className="border-b border-slate-200 pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Solutions
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
            De par mon expérience, mes expertises et mes domaines de prédilection, il me paraissait intéressant de proposer des outils, méthodes et solutions pour vous fournir un aperçu concret de mon savoir-faire.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* ========================================================= */}
        {/* INTERACTIVE QUESTION: VOUS ÊTES ?                         */}
        {/* ========================================================= */}
        {universe === null && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm text-center max-w-3xl mx-auto my-6">
            <span className="inline-block text-xs font-mono font-semibold text-emerald-600 uppercase tracking-wider mb-2">
              Orientation & Découverte
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              Vous êtes ?
            </h2>
            <p className="text-sm text-slate-600 mb-8 max-w-xl mx-auto">
              Choisissez votre profil pour afficher les outils et simulateurs correspondant à vos besoins et enjeux.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
              {/* Professionnel (B2B) - Left */}
              <button
                type="button"
                onClick={() => setUniverse("b2b")}
                className="p-6 rounded-2xl border-2 border-slate-200 hover:border-sky-500 hover:bg-sky-50/30 transition-all group flex flex-col justify-between shadow-sm hover:shadow-md cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3.5 rounded-xl bg-sky-100 text-sky-800 group-hover:bg-sky-600 group-hover:text-white transition">
                      <Factory className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-bold uppercase text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
                      Univers B2B
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-950 mb-1">
                    Un Professionnel
                  </h3>
                  <span className="text-xs font-semibold text-sky-700 block">
                    Énergie & Performance
                  </span>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-700 group-hover:text-sky-800">
                  <span>Accéder à l'espace Professionnel</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Particulier (B2C) - Right */}
              <button
                type="button"
                onClick={() => {
                  setUniverse("b2c");
                  setB2cView(null);
                }}
                className="p-6 rounded-2xl border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group flex flex-col justify-between shadow-sm hover:shadow-md cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3.5 rounded-xl bg-emerald-100 text-emerald-800 group-hover:bg-emerald-600 group-hover:text-white transition">
                      <Brain className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-bold uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      Univers B2C
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-950 mb-1">
                    Un Particulier
                  </h3>
                  <span className="text-xs font-semibold text-emerald-700 block">
                    Grand Public / Développement personnel / Autonomie
                  </span>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700 group-hover:text-emerald-800">
                  <span>Accéder à l'espace Particulier</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* ACTIVE PROFILE BANNER (WHEN PROFILE CHOSEN)               */}
        {/* ========================================================= */}
        {universe !== null && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-3.5 shadow-sm mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${universe === "b2c" ? "bg-emerald-100 text-emerald-800" : "bg-sky-100 text-sky-800"}`}>
                {universe === "b2c" ? <Brain className="w-5 h-5" /> : <Factory className="w-5 h-5" />}
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                  Profil Sélectionné
                </span>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900">
                    {universe === "b2c" ? "Un Particulier (Univers B2C)" : "Un Professionnel (Univers B2B)"}
                  </h2>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                    universe === "b2c" ? "bg-emerald-100 text-emerald-800" : "bg-sky-100 text-sky-800"
                  }`}>
                    {universe === "b2c" ? "Grand Public / Développement personnel / Autonomie" : "Énergie & Performance"}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setUniverse(null);
                setB2cView(null);
              }}
              className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
            >
              <span>Changer de profil</span>
              <span className="text-slate-400">↺</span>
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* UNIVERS B2C                                               */}
        {/* ========================================================= */}
        {universe === "b2c" && (
          <div className="space-y-6">
            {/* B2C Sub-Tabs Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                {/* 1. Simulateurs d'Autonomie (Eau & Solaire Photovoltaïque) à GAUCHE */}
                <button
                  type="button"
                  onClick={() => setB2cView("autonomy")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold font-mono uppercase transition cursor-pointer ${
                    b2cView === "autonomy"
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-emerald-300"
                  }`}
                >
                  <Workflow className="w-4 h-4" />
                  <span>Simulateurs d'Autonomie (Eau & Solaire)</span>
                </button>

                {/* 2. Junivers (Introspection IA) à DROITE */}
                <button
                  type="button"
                  onClick={() => setB2cView("junivers")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold font-mono uppercase transition cursor-pointer ${
                    b2cView === "junivers"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-indigo-300"
                  }`}
                >
                  <Brain className="w-4 h-4" />
                  <span>Junivers (Introspection IA)</span>
                </button>
              </div>

              {b2cView !== null && (
                <button
                  type="button"
                  onClick={() => setB2cView(null)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5"
                >
                  <span>Fermer la vue</span>
                  <span className="text-slate-400">✕</span>
                </button>
              )}
            </div>

            {/* Vue initiale : aucun outil sélectionné -> cartes de sélection */}
            {b2cView === null && (
              <div className="py-6 space-y-6">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    Sélectionnez un outil pour ouvrir la page
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Cliquez sur l'un des deux espaces ci-dessous pour lancer l'application interactive correspondante.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
                  {/* Carte 1 : Simulateurs d'Autonomie à GAUCHE */}
                  <div
                    onClick={() => setB2cView("autonomy")}
                    className="p-6 rounded-2xl bg-white border-2 border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 group-hover:bg-emerald-600 group-hover:text-white transition">
                          <Workflow className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          Autonomie & Résilience
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition">
                        Simulateurs d'Autonomie (Eau & Solaire Photovoltaïque)
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Démarche séquentielle <strong>SCAN – FOCUS – ACT</strong>, calculateurs de dimensionnement hydrique (réseau double eau de pluie), énergie solaire et revente réseau.
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600 group-hover:text-emerald-700">
                      <span>Ouvrir les simulateurs</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Carte 2 : Junivers (Introspection IA) à DROITE */}
                  <div
                    onClick={() => setB2cView("junivers")}
                    className="p-6 rounded-2xl bg-white border-2 border-slate-200 hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-800 group-hover:bg-indigo-600 group-hover:text-white transition">
                          <Brain className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                          IA Générative & Psychologie
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-700 transition">
                        Junivers (Introspection IA)
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Cahier des charges complet et démonstrateur interactif d'un « miroir interprétatif » croisant 9 modèles psychologiques (MBTI, Ennéagramme, Big Five...) via l'IAGen.
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-700">
                      <span>Découvrir Junivers</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* B2C VIEW 1: JUNIVERS */}
            {b2cView === "junivers" && <JuniversModule />}

            {/* B2C VIEW 2: AUTONOMY SIMULATORS (SCAN-FOCUS-ACT EMBEDDED) */}
            {b2cView === "autonomy" && (
              <div className="space-y-6">
                {/* Autonomy Sub-Menu Switcher */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-emerald-600">
                      Démarche Séquentielle Interactive
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">
                      Simulateurs d'Autonomie : Eau & Solaire Photovoltaïque
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Démarche séquentielle <strong>SCAN – FOCUS – ACT</strong> intégrée : explorez l'audit terrain (SCAN), le cadrage (FOCUS) et le plan d'action (ACT), ou basculez sur les calculateurs experts.
                    </p>
                  </div>

                  <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0 self-start sm:self-auto">
                    <button
                      onClick={() => setAutonomyTool("scan-focus-act")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        autonomyTool === "scan-focus-act"
                          ? "bg-white text-emerald-800 shadow-sm font-semibold"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Workflow className="w-3.5 h-3.5 text-emerald-600" />
                      <span>SCAN – FOCUS – ACT</span>
                    </button>

                    <button
                      onClick={() => setAutonomyTool("water")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        autonomyTool === "water"
                          ? "bg-white text-sky-800 shadow-sm font-semibold"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Droplets className="w-3.5 h-3.5 text-sky-600" />
                      <span>Autonomie Eau</span>
                    </button>

                    <button
                      onClick={() => setAutonomyTool("solar")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        autonomyTool === "solar"
                          ? "bg-white text-amber-800 shadow-sm font-semibold"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                      <span>Solaire & Revente</span>
                    </button>
                  </div>
                </div>

                {/* Sub-Tool 1: SCAN - FOCUS - ACT */}
                {autonomyTool === "scan-focus-act" && (
                  <div className="space-y-6">
            {/* Step Navigation Bar */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 bg-white border border-slate-200 rounded-2xl p-2 sm:p-3 shadow-sm">
              <button
                onClick={() => setWizardStep(1)}
                className={`flex items-center justify-center sm:justify-start gap-2 p-2.5 rounded-xl text-left transition ${
                  wizardStep === 1
                    ? "bg-emerald-50 border border-emerald-300 text-emerald-800 font-semibold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  wizardStep === 1 ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-700"
                }`}>
                  1
                </div>
                <div>
                  <p className="text-xs uppercase font-mono tracking-wider">Étape 1</p>
                  <p className="text-xs font-bold hidden sm:block">SCAN : Audit Terrain & Flux</p>
                </div>
              </button>

              <button
                onClick={() => setWizardStep(2)}
                className={`flex items-center justify-center sm:justify-start gap-2 p-2.5 rounded-xl text-left transition ${
                  wizardStep === 2
                    ? "bg-sky-50 border border-sky-300 text-sky-800 font-semibold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  wizardStep === 2 ? "bg-sky-600 text-white" : "bg-slate-200 text-slate-700"
                }`}>
                  2
                </div>
                <div>
                  <p className="text-xs uppercase font-mono tracking-wider">Étape 2</p>
                  <p className="text-xs font-bold hidden sm:block">FOCUS : Cadrage & Arbitrages</p>
                </div>
              </button>

              <button
                onClick={() => setWizardStep(3)}
                className={`flex items-center justify-center sm:justify-start gap-2 p-2.5 rounded-xl text-left transition ${
                  wizardStep === 3
                    ? "bg-purple-50 border border-purple-300 text-purple-800 font-semibold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  wizardStep === 3 ? "bg-purple-600 text-white" : "bg-slate-200 text-slate-700"
                }`}>
                  3
                </div>
                <div>
                  <p className="text-xs uppercase font-mono tracking-wider">Étape 3</p>
                  <p className="text-xs font-bold hidden sm:block">ACT : Synthèse & Plan d'Action</p>
                </div>
              </button>
            </div>

            {/* STEP 1: SCAN */}
            {wizardStep === 1 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-xs font-mono font-semibold text-emerald-600 uppercase">
                    Méthodologie Ingénierie • Étape 1/3
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-1">
                    SCAN : Audit du Terrain & Recensement des Flux Physiques
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Évaluez les ressources physiques réelles et les contraintes de votre site <em>AVANT</em> de définir des objectifs. La réalité du terrain dicte la faisabilité technique.
                  </p>
                </div>

                {/* French Departments Dropdown - Calibrates Pluviometry & Solar */}
                <div className="p-4 bg-sky-50/80 border border-sky-200 rounded-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-sky-100 text-sky-700 rounded-lg shrink-0">
                        <Compass className="w-4 h-4" />
                      </div>
                      <div>
                        <label htmlFor="scan-dept-select" className="text-xs font-bold text-slate-900 block">
                          Département de France (calibrage automatique pluie & ensoleillement) :
                        </label>
                        <p className="text-[11px] text-slate-600">
                          Sélectionnez votre département pour charger instantanément les données météo réelles.
                        </p>
                      </div>
                    </div>
                    <div className="w-full sm:w-72 shrink-0">
                      <select
                        id="scan-dept-select"
                        value={scanDeptCode}
                        onChange={e => {
                          const code = e.target.value;
                          setScanDeptCode(code);
                          const found = FRENCH_DEPARTMENTS.find(d => d.code === code);
                          if (found) {
                            setScanPluvio(found.pluvio);
                            setScanSolarIrradiance(found.solar);
                          }
                        }}
                        className="w-full bg-white border border-sky-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        {FRENCH_DEPARTMENTS.map(dept => (
                          <option key={dept.code} value={dept.code}>
                            {dept.code} - {dept.name} ({dept.pluvio} mm/an | {dept.solar} kWh/m²)
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column: Water & Rooftop */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase font-mono text-slate-700 flex items-center gap-1.5">
                      <Droplets className="w-4 h-4 text-sky-600" />
                      <span>Ressource Hydrique & Surface de Captage</span>
                    </h3>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-600">Pluviométrie locale annuelle :</span>
                        <span className="font-bold font-mono text-slate-900">{scanPluvio} mm/an</span>
                      </div>
                      <input
                        type="range"
                        min={450}
                        max={2600}
                        step={25}
                        value={scanPluvio}
                        onChange={e => setScanPluvio(Number(e.target.value))}
                        className="w-full accent-sky-600"
                      />
                      <div className="flex items-center justify-between mt-1 text-[11px] text-slate-500">
                        <span>Ajustement fin au curseur possible</span>
                        <span className="font-mono text-sky-700 font-semibold">
                          Dpt {scanDeptCode} : {scanPluvio} mm/an
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-600">Surface de toiture captante :</span>
                        <span className="font-bold font-mono text-slate-900">{scanRoofArea} m²</span>
                      </div>
                      <input
                        type="range"
                        min={50}
                        max={350}
                        step={5}
                        value={scanRoofArea}
                        onChange={e => setScanRoofArea(Number(e.target.value))}
                        className="w-full accent-sky-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Matériau de toiture (coefficient de ruissellement) :</label>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        {[
                          { id: "tile", label: "Tuiles (η=0.85)" },
                          { id: "slate", label: "Ardoise (η=0.90)" },
                          { id: "metal", label: "Bac Acier (η=0.95)" }
                        ].map(mat => (
                          <button
                            key={mat.id}
                            type="button"
                            onClick={() => setScanRoofMaterial(mat.id as any)}
                            className={`p-2 rounded-lg border text-center transition ${
                              scanRoofMaterial === mat.id
                                ? "bg-sky-50 border-sky-400 text-sky-800 font-semibold"
                                : "bg-slate-50 border-slate-200 text-slate-600"
                            }`}
                          >
                            {mat.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Energy, Topography & Household */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase font-mono text-slate-700 flex items-center gap-1.5">
                      <Sun className="w-4 h-4 text-amber-500" />
                      <span>Gisement Solaire, Dénivelé & Foyer</span>
                    </h3>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-600">Gisement Solaire Global (GHI) :</span>
                        <span className="font-bold font-mono text-slate-900">{scanSolarIrradiance} kWh/m²/an</span>
                      </div>
                      <input
                        type="range"
                        min={950}
                        max={1800}
                        step={50}
                        value={scanSolarIrradiance}
                        onChange={e => setScanSolarIrradiance(Number(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-600">Dénivelé utile du terrain (gravitaire) :</span>
                        <span className="font-bold font-mono text-slate-900">{scanElevationMeters} mètres</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={15}
                        step={1}
                        value={scanElevationMeters}
                        onChange={e => {
                          const val = Number(e.target.value);
                          setScanElevationMeters(val);
                          setScanSlope(val >= 5 ? "steep" : val >= 2 ? "moderate" : "flat");
                        }}
                        className="w-full accent-emerald-600"
                      />
                      <p className="text-[11px] text-slate-500 mt-1">
                        {scanElevationMeters >= 5
                          ? "✓ Pente forte : idéal pour écoulement gravitaire pur sans aucune pompe."
                          : scanElevationMeters >= 2
                          ? "✓ Pente modérée : écoulement gravitaire partiel pour le potager et WC."
                          : "⚠️ Terrain plat : nécessité d'un pompage électrique 12V/24V continu."}
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-600">Nombre de personnes au foyer :</span>
                        <span className="font-bold font-mono text-slate-900">{scanHouseholdSize} personne(s)</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={8}
                        value={scanHouseholdSize}
                        onChange={e => setScanHouseholdSize(Number(e.target.value))}
                        className="w-full accent-slate-800"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => setWizardStep(2)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-md transition"
                  >
                    <span>Passer au FOCUS (Cadrage des Objectifs)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: FOCUS */}
            {wizardStep === 2 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-xs font-mono font-semibold text-sky-600 uppercase">
                    Méthodologie Ingénierie • Étape 2/3
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-1">
                    FOCUS : Cadrage Stratégique, Arbitrages & Goulots d'Étranglement
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Définissez vos cibles réalistes d'autonomie basées sur l'audit SCAN. Arbitrez entre la rusticité Low-Tech et le confort High-Tech.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Target Autonomy Sliders */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase font-mono text-slate-700">
                      Cibles d'Autonomie Visées (%)
                    </h3>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-600">Eau Potable (Boisson & Cuisine) :</span>
                        <span className="font-bold font-mono text-emerald-600">{focusTargetDrinkWater}%</span>
                      </div>
                      <input
                        type="range"
                        min={30}
                        max={100}
                        step={5}
                        value={focusTargetDrinkWater}
                        onChange={e => setFocusTargetDrinkWater(Number(e.target.value))}
                        className="w-full accent-emerald-600"
                      />
                      <p className="text-[10.5px] text-slate-500">
                        Besoin incompressible : ~8 L/jour/personne. Filtrable par gravité (céramique + charbon).
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-600">Eau Sanitaire & Technique (WC, Douche, Lave-linge) :</span>
                        <span className="font-bold font-mono text-sky-600">{focusTargetSanitaryWater}%</span>
                      </div>
                      <input
                        type="range"
                        min={30}
                        max={100}
                        step={5}
                        value={focusTargetSanitaryWater}
                        onChange={e => setFocusTargetSanitaryWater(Number(e.target.value))}
                        className="w-full accent-sky-600"
                      />
                      <p className="text-[10.5px] text-slate-500">
                        Besoin moyen : ~75 L/jour/personne. Alimentable directement par cuve filtrée à 50 microns.
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-600">Énergie Électrique (Hors chauffage lourd) :</span>
                        <span className="font-bold font-mono text-amber-600">{focusTargetEnergy}%</span>
                      </div>
                      <input
                        type="range"
                        min={30}
                        max={100}
                        step={5}
                        value={focusTargetEnergy}
                        onChange={e => setFocusTargetEnergy(Number(e.target.value))}
                        className="w-full accent-amber-600"
                      />
                    </div>
                  </div>

                  {/* Arbitrage Low-Tech & Goulots d'étranglement */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase font-mono text-slate-700">
                      Arbitrage Technique & Vulnérabilités (SPOF)
                    </h3>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-600">Curseur Low-Tech vs High-Tech :</span>
                        <span className="font-bold font-mono text-purple-700">{focusLowTechRatio}% Low-Tech</span>
                      </div>
                      <input
                        type="range"
                        min={20}
                        max={95}
                        step={5}
                        value={focusLowTechRatio}
                        onChange={e => setFocusLowTechRatio(Number(e.target.value))}
                        className="w-full accent-purple-600"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                        <span>High-Tech (Électronique/Cloud)</span>
                        <span>Low-Tech (Réparable/Mécanique)</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-600 mb-1.5">
                        Goulots d'étranglement identifiés sur votre site :
                      </label>
                      <div className="space-y-1.5 text-xs">
                        {[
                          { id: "winter-storage", label: "Sécheresse estivale ou gel hivernal sévère" },
                          { id: "pumping-spof", label: "Dépendance à une pompe électrique sous pression" },
                          { id: "budget-limit", label: "Contrainte de capital initial disponible" },
                          { id: "roof-size", label: "Surface de toiture restreinte par rapport au foyer" }
                        ].map(item => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => toggleBottleneck(item.id)}
                            className={`w-full flex items-center justify-between p-2 rounded-lg border text-left transition ${
                              focusBottlenecks.includes(item.id)
                                ? "bg-amber-50 border-amber-300 text-amber-900 font-medium"
                                : "bg-slate-50 border-slate-200 text-slate-600"
                            }`}
                          >
                            <span>{item.label}</span>
                            {focusBottlenecks.includes(item.id) ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                            ) : (
                              <div className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-between">
                  <button
                    onClick={() => setWizardStep(1)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50 transition"
                  >
                    ← Retour au SCAN
                  </button>
                  <button
                    onClick={() => setWizardStep(3)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-md transition"
                  >
                    <span>Générer l'Architecture ACT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: ACT */}
            {wizardStep === 3 && (
              <div className="space-y-6">
                {/* Executive Dashboard Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center justify-between text-slate-500 text-xs font-mono mb-1">
                      <span>Score Résilience</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="text-2xl font-black text-slate-900 font-mono">
                      {actSynthesis.score} <span className="text-xs text-slate-400 font-normal">/ 100</span>
                    </div>
                    <p className="text-[11px] text-emerald-600 font-medium mt-1">
                      Site très favorable à l'autonomie
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center justify-between text-slate-500 text-xs font-mono mb-1">
                      <span>Cuve Eau Préconisée</span>
                      <Droplets className="w-4 h-4 text-sky-600" />
                    </div>
                    <div className="text-2xl font-black text-slate-900 font-mono">
                      {actSynthesis.recommendedTankM3} <span className="text-xs text-slate-400 font-normal">m³</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Couvre 45 jours d'étiage estival
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center justify-between text-slate-500 text-xs font-mono mb-1">
                      <span>Solaire + Stockage</span>
                      <Sun className="w-4 h-4 text-amber-500" />
                    </div>
                    <div className="text-2xl font-black text-slate-900 font-mono">
                      {actSynthesis.recommendedKwc} <span className="text-xs text-slate-400 font-normal">kWc</span>
                      <span className="text-sm font-normal text-slate-400 ml-1">/ {actSynthesis.recommendedBatteryKwh} kWh</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Architecture BT 24V ou 48V
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center justify-between text-slate-500 text-xs font-mono mb-1">
                      <span>Économie Annuelle</span>
                      <TrendingUp className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="text-2xl font-black text-slate-900 font-mono">
                      {actSynthesis.annualSavingsEur} <span className="text-xs text-slate-400 font-normal">€ / an</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Factures d'eau et électricité évitées
                    </p>
                  </div>
                </div>

                {/* Synthesis Blueprint */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-xs font-mono font-semibold text-purple-600 uppercase">
                        Plan d'Action Opérationnel
                      </span>
                      <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                        ACT : Architecture Technique & Déploiement Séquencé
                      </h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.print()}
                        className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                      >
                        <Printer className="w-3.5 h-3.5 text-slate-500" />
                        <span>Imprimer</span>
                      </button>
                    </div>
                  </div>

                  {/* Dimensioning Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                      <h4 className="text-xs font-bold font-mono uppercase text-slate-800 flex items-center gap-1.5">
                        <Droplets className="w-4 h-4 text-sky-600" />
                        <span>Bilan & Dimensionnement Hydrique</span>
                      </h4>
                      <ul className="text-xs text-slate-600 space-y-1">
                        <li className="flex justify-between">
                          <span>Gisement brut de pluie :</span>
                          <span className="font-mono font-semibold text-slate-900">{actSynthesis.potentialWaterAnnualM3} m³/an</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Besoin total du foyer :</span>
                          <span className="font-mono font-semibold text-slate-900">{actSynthesis.totalWaterNeedM3} m³/an</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Part Eau Potable (Filtre gravité) :</span>
                          <span className="font-mono font-semibold text-emerald-700">{actSynthesis.potableNeedM3} m³/an</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Part Eau Sanitaire / WC :</span>
                          <span className="font-mono font-semibold text-sky-700">{actSynthesis.sanitaryNeedM3} m³/an</span>
                        </li>
                        <li className="pt-2 border-t border-slate-200 flex justify-between text-slate-800 font-medium">
                          <span>Topologie de pompage :</span>
                          <span className="text-[11px] text-right max-w-[200px] text-emerald-700">{actSynthesis.pumpingType}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                      <h4 className="text-xs font-bold font-mono uppercase text-slate-800 flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-amber-500" />
                        <span>Architecture Énergétique & Batteries</span>
                      </h4>
                      <ul className="text-xs text-slate-600 space-y-1">
                        <li className="flex justify-between">
                          <span>Puissance crête recommandée :</span>
                          <span className="font-mono font-semibold text-slate-900">{actSynthesis.recommendedKwc} kWc (~{Math.round(actSynthesis.recommendedKwc / 0.42)} panneaux)</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Capacité batterie BT recommandée :</span>
                          <span className="font-mono font-semibold text-slate-900">{actSynthesis.recommendedBatteryKwh} kWh LiFePO4</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Autonomie en coupure 24h :</span>
                          <span className="font-mono font-semibold text-emerald-600">100% sécurisée</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Autonomie en coupure 7 jours :</span>
                          <span className="font-mono font-semibold text-emerald-600">92% de couverture</span>
                        </li>
                        <li className="pt-2 border-t border-slate-200 flex justify-between text-slate-800 font-medium">
                          <span>Complément thermique :</span>
                          <span className="text-[11px] text-right text-amber-700">Poêle biomasse sans électronique</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* 3 Chronological Deployment Phases */}
                  <div>
                    <h3 className="text-xs font-bold font-mono uppercase text-slate-800 mb-3">
                      Feuille de Route Séquentielle (Chronologie Viable)
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start gap-3">
                        <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          P1
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-emerald-900">
                              Phase 1 : Capitalisation & Préparation (2026 – 2029)
                            </h4>
                            <span className="text-[10px] bg-emerald-200/80 text-emerald-800 px-1.5 py-0.5 rounded font-mono">
                              Immédiat
                            </span>
                          </div>
                          <p className="text-xs text-emerald-800/90 mt-1 leading-relaxed">
                            Constituer la trésorerie d'investissement, tester les protocoles de purification gravitaire en intérieur (filtres céramique Berkefeld), et s'initier aux montages basse tension 12V/24V sans engager de travaux lourds.
                          </p>
                        </div>
                      </div>

                      <div className="p-3 bg-sky-50/70 border border-sky-200 rounded-xl flex items-start gap-3">
                        <div className="w-7 h-7 rounded-lg bg-sky-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          P2
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-sky-900">
                              Phase 2 : Infrastructure & Sécurisation Matérielle (2030 – 2033)
                            </h4>
                            <span className="text-[10px] bg-sky-200/80 text-sky-800 px-1.5 py-0.5 rounded font-mono">
                              Niveau 2 EPF
                            </span>
                          </div>
                          <p className="text-xs text-sky-800/90 mt-1 leading-relaxed">
                            Pose de la cuve tampon de {actSynthesis.recommendedTankM3} m³, raccordement des gouttières avec préfiltre autonettoyant, séparation physique des canalisations d'eau potable et technique, et installation des panneaux photovoltaïques hors réseau.
                          </p>
                        </div>
                      </div>

                      <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-xl flex items-start gap-3">
                        <div className="w-7 h-7 rounded-lg bg-purple-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          P3
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-purple-900">
                              Phase 3 : Autonomie Complète & Réciprocité Locale (2034+)
                            </h4>
                            <span className="text-[10px] bg-purple-200/80 text-purple-800 px-1.5 py-0.5 rounded font-mono">
                              Niveau 3 EPF
                            </span>
                          </div>
                          <p className="text-xs text-purple-800/90 mt-1 leading-relaxed">
                            Mise en culture du potager agroécologique en sol vivant, valorisation des surplus d'énergie pour la production de petites molécules ou la recharge d'outils partagés, et maillage avec les voisins résilients.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-start">
                    <button
                      onClick={() => setWizardStep(2)}
                      className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50 transition"
                    >
                      ← Revenir aux réglages FOCUS
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TOOL 2: SIMULATEUR AUTONOMIE HYDRIQUE & DOUBLE RÉSEAU    */}
        {/* ========================================================= */}
        {autonomyTool === "water" && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4 mb-6">
                <div>
                  <span className="text-xs font-mono font-semibold text-sky-600 uppercase">
                    Modélisation Hydrologique 12 Mois
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                    Simulateur d'Autonomie Hydrique & Double Réseau
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Calculez avec précision le comportement de votre stock d'eau de pluie mois par mois selon la saisonnalité des précipitations et l'impact de la séparation du double réseau.
                  </p>
                </div>

                {/* Double Network Toggle Pill */}
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-2 rounded-xl">
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-800">Double Réseau d'Eau</p>
                    <p className="text-[10px] text-slate-500">
                      {waterDualNetwork ? "Activé (Séparation Potable / Technique)" : "Désactivé (Tout réseau mélangé)"}
                    </p>
                  </div>
                  <button
                    onClick={() => setWaterDualNetwork(!waterDualNetwork)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      waterDualNetwork ? "bg-emerald-600" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                        waterDualNetwork ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Sliders Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">Surface de captage :</span>
                    <span className="font-mono font-bold text-slate-900">{waterRoofArea} m²</span>
                  </div>
                  <input
                    type="range"
                    min={40}
                    max={400}
                    step={10}
                    value={waterRoofArea}
                    onChange={e => setWaterRoofArea(Number(e.target.value))}
                    className="w-full accent-sky-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">Pluviométrie annuelle :</span>
                    <span className="font-mono font-bold text-slate-900">{waterPluvio} mm</span>
                  </div>
                  <input
                    type="range"
                    min={400}
                    max={1500}
                    step={25}
                    value={waterPluvio}
                    onChange={e => setWaterPluvio(Number(e.target.value))}
                    className="w-full accent-sky-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">Personnes au foyer :</span>
                    <span className="font-mono font-bold text-slate-900">{waterPersons} pers.</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={8}
                    value={waterPersons}
                    onChange={e => setWaterPersons(Number(e.target.value))}
                    className="w-full accent-sky-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">Volume de cuve :</span>
                    <span className="font-mono font-bold text-slate-900">{waterTankM3} m³</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={25}
                    step={1}
                    value={waterTankM3}
                    onChange={e => setWaterTankM3(Number(e.target.value))}
                    className="w-full accent-sky-600"
                  />
                </div>
              </div>

              {/* KPI Results Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3 mb-6">
                <div>
                  <p className="text-[11px] text-slate-500 font-mono">Taux Autonomie Hydrique</p>
                  <p className="text-xl font-black text-slate-900 font-mono">
                    {waterSimulation.autonomyRate}%
                  </p>
                  <span className={`text-[10px] font-medium ${waterSimulation.autonomyRate >= 80 ? "text-emerald-600" : "text-amber-600"}`}>
                    {waterSimulation.autonomyRate >= 80 ? "Excellente couverture" : "Appoint réseau requis en été"}
                  </span>
                </div>

                <div>
                  <p className="text-[11px] text-slate-500 font-mono">Volume Annuel Récupéré</p>
                  <p className="text-xl font-black text-sky-700 font-mono">
                    {waterSimulation.annualCollectedM3} <span className="text-xs font-normal text-slate-500">m³</span>
                  </p>
                  <span className="text-[10px] text-slate-500">
                    Vs besoin total : {waterSimulation.annualNeedM3} m³
                  </span>
                </div>

                <div>
                  <p className="text-[11px] text-slate-500 font-mono">Réserve Actuelle</p>
                  <p className="text-xl font-black text-emerald-700 font-mono">
                    {waterSimulation.daysOfReserve} <span className="text-xs font-normal text-slate-500">jours</span>
                  </p>
                  <span className="text-[10px] text-slate-500">En cas d'absence totale de pluie</span>
                </div>

                <div>
                  <p className="text-[11px] text-slate-500 font-mono">Déficit Estival Estimé</p>
                  <p className="text-xl font-black text-slate-900 font-mono">
                    {waterSimulation.totalShortage} <span className="text-xs font-normal text-slate-500">m³</span>
                  </p>
                  <span className="text-[10px] text-slate-500">
                    {waterDualNetwork ? "Optimisé par le double réseau" : "Augmentez la cuve de 3 m³"}
                  </span>
                </div>
              </div>

              {/* Recharts Monthly Graph */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold font-mono uppercase text-slate-800">
                    Évolution Mensuelle du Stock d'Eau & Couverture des Besoins
                  </h3>
                  <span className="text-[11px] text-slate-500">Données en m³</span>
                </div>

                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={waterSimulation.monthlyData}
                      margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0f172a",
                          borderRadius: "8px",
                          border: "none",
                          fontSize: "12px",
                          color: "#fff"
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                      <Bar dataKey="apportPluieM3" name="Pluie Captée (m³)" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="besoinM3" name="Besoin Foyer (m³)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                      <Line
                        type="monotone"
                        dataKey="niveauCuveM3"
                        name="Niveau Fin de Mois Cuve (m³)"
                        stroke="#059669"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TOOL 3: SIMULATEUR SOLAIRE PHOTOVOLTAÏQUE & REVENTE RÉSEAU */}
        {/* ========================================================= */}
        {autonomyTool === "solar" && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <span className="text-xs font-mono font-semibold text-amber-500 uppercase flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5" />
                  Photovoltaïque & Valorisation Économique
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                  Simulateur Solaire Photovoltaïque, Autoconsommation & Revente Réseau
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Modélisez la production de votre toiture photovoltaïque, arbitrez entre autoconsommation (avec batterie basse tension) et valorisation de votre électricité sur le réseau public, avec calcul précis des revenus de revente garantis (contrat d'obligation d'achat EDF OA sur 20 ans).
                </p>
              </div>

              {/* Mode de valorisation : Autoconsommation + Surplus OU Vente Totale */}
              <div className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <label className="block text-xs font-bold uppercase font-mono text-slate-700 mb-2.5">
                  Type de contrat & Valorisation de l'électricité :
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSolarContractMode("surplus");
                      setSolarFeedInTariff(0.13);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                      solarContractMode === "surplus"
                        ? "bg-amber-50 border-amber-400 ring-2 ring-amber-300/40 text-amber-950 shadow-sm"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">Autoconsommation + Vente du Surplus</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                        Recommandé
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      Vous consommez en priorité votre électricité (réduction immédiate de la facture) et vendez l'excédent au tarif garanti EDF OA.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSolarContractMode("total");
                      setSolarFeedInTariff(0.143);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                      solarContractMode === "total"
                        ? "bg-amber-50 border-amber-400 ring-2 ring-amber-300/40 text-amber-950 shadow-sm"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">Vente Totale au Réseau (100%)</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold">
                        Injection intégrale
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      100% de la production solaire est injectée et vendue sur le réseau électrique public avec un compteur dédié.
                    </p>
                  </button>
                </div>
              </div>

              {/* Sliders Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">Puissance Photovoltaïque :</span>
                    <span className="font-mono font-bold text-amber-600">{solarCapacityKwc} kWc</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={18}
                    step={0.5}
                    value={solarCapacityKwc}
                    onChange={e => setSolarCapacityKwc(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Surface de toiture requise : ~{Math.round(solarCapacityKwc * 5)} m² (~{Math.round(solarCapacityKwc / 0.42)} panneaux)
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs text-slate-600">
                      Ensoleillement régional (Départements de France) :
                    </label>
                    <span className="font-mono text-xs font-bold text-amber-700">
                      {solarIrradiance} kWh/m²/an
                    </span>
                  </div>
                  <select
                    value={solarDeptCode}
                    onChange={e => {
                      const code = e.target.value;
                      setSolarDeptCode(code);
                      const found = FRENCH_DEPARTMENTS.find(d => d.code === code);
                      if (found) {
                        setSolarIrradiance(found.solar);
                      }
                    }}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-amber-500"
                  >
                    {FRENCH_DEPARTMENTS.map(dept => (
                      <option key={dept.code} value={dept.code}>
                        {dept.code} - {dept.name} ({dept.solar} kWh/m²/an)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">Tarif de Revente au Réseau :</span>
                    <span className="font-mono font-bold text-emerald-600">
                      {(solarFeedInTariff * 100).toFixed(1)} c€/kWh ({solarFeedInTariff.toFixed(3)} €)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0.05}
                    max={0.25}
                    step={0.005}
                    value={solarFeedInTariff}
                    onChange={e => setSolarFeedInTariff(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <button
                      type="button"
                      onClick={() => setSolarFeedInTariff(0.13)}
                      className={`text-[10px] px-2 py-0.5 rounded transition ${
                        solarFeedInTariff === 0.13 ? "bg-emerald-600 text-white font-semibold" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      EDF OA Surplus (13 c€)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSolarFeedInTariff(0.143)}
                      className={`text-[10px] px-2 py-0.5 rounded transition ${
                        solarFeedInTariff === 0.143 ? "bg-emerald-600 text-white font-semibold" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      Vente Totale ≤9kWc (14.3 c€)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSolarFeedInTariff(0.08)}
                      className={`text-[10px] px-2 py-0.5 rounded transition ${
                        solarFeedInTariff === 0.08 ? "bg-emerald-600 text-white font-semibold" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      Marché Spot (8 c€)
                    </button>
                  </div>
                </div>

                {solarContractMode === "surplus" && (
                  <>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-600">Consommation annuelle foyer :</span>
                        <span className="font-mono font-bold text-slate-900">{solarAnnualDemandKwh} kWh/an</span>
                      </div>
                      <input
                        type="range"
                        min={1500}
                        max={10000}
                        step={250}
                        value={solarAnnualDemandKwh}
                        onChange={e => setSolarAnnualDemandKwh(Number(e.target.value))}
                        className="w-full accent-slate-800"
                      />
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        Moyenne française : ~4 500 kWh/an (hors gros chauffage électrique)
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-600">Stockage Batterie Basse Tension :</span>
                        <span className="font-mono font-bold text-emerald-600">{solarBatteryKwh} kWh</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={25}
                        step={1}
                        value={solarBatteryKwh}
                        onChange={e => setSolarBatteryKwh(Number(e.target.value))}
                        className="w-full accent-emerald-600"
                      />
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        Technologie recommandée : LiFePO4 24V ou 48V (0 kWh = sans batterie)
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-600">Prix électricité réseau évitée :</span>
                        <span className="font-mono font-bold text-slate-900">
                          {(solarGridPrice * 100).toFixed(1)} c€/kWh ({solarGridPrice.toFixed(3)} €)
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0.15}
                        max={0.40}
                        step={0.01}
                        value={solarGridPrice}
                        onChange={e => setSolarGridPrice(Number(e.target.value))}
                        className="w-full accent-slate-700"
                      />
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        Tarif Réglementé Bleu EDF TTC actuel : ~25,1 c€/kWh
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* KPI Results Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3.5 mb-6">
                <div>
                  <p className="text-[11px] text-slate-500 font-mono">Production Solaire Annuelle</p>
                  <p className="text-xl font-black text-amber-600 font-mono">
                    {solarSimulation.totalAnnualProductionKwh.toLocaleString("fr-FR")} <span className="text-xs font-normal text-slate-500">kWh/an</span>
                  </p>
                  <span className="text-[10px] text-slate-500">
                    Ratio de performance 0.85
                  </span>
                </div>

                <div>
                  <p className="text-[11px] text-slate-500 font-mono">
                    {solarContractMode === "surplus" ? "Taux d'Autoconsommation" : "Part Réinjectée Réseau"}
                  </p>
                  <p className="text-xl font-black text-emerald-600 font-mono">
                    {solarContractMode === "surplus" ? `${solarSimulation.selfConsumptionRate}%` : "100%"}
                  </p>
                  <span className="text-[10px] text-slate-500">
                    {solarContractMode === "surplus"
                      ? `${solarSimulation.coverageRate}% des besoins couverts`
                      : "Injection totale garantie"}
                  </span>
                </div>

                <div>
                  <p className="text-[11px] text-slate-500 font-mono">Revenus de Revente Réseau</p>
                  <p className="text-xl font-black text-emerald-700 font-mono">
                    {solarSimulation.annualResaleIncome.toLocaleString("fr-FR")} <span className="text-xs font-normal text-slate-500">€ / an</span>
                  </p>
                  <span className="text-[10px] text-slate-500">
                    {solarSimulation.surplusSoldTotal.toLocaleString("fr-FR")} kWh vendus / an
                  </span>
                </div>

                <div>
                  <p className="text-[11px] text-slate-500 font-mono">Gain Économique Global</p>
                  <p className="text-xl font-black text-slate-900 font-mono">
                    {solarSimulation.totalAnnualGain.toLocaleString("fr-FR")} <span className="text-xs font-normal text-slate-500">€ / an</span>
                  </p>
                  <span className="text-[10px] text-emerald-600 font-medium">
                    {solarContractMode === "surplus"
                      ? `${solarSimulation.annualBillSavings} € économisés + ${solarSimulation.annualResaleIncome} € vendus`
                      : "Revenus garantis annuels"}
                  </span>
                </div>
              </div>

              {/* Monthly Production vs Resale Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* 12-Month Area Chart */}
                <div className="lg:col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-bold font-mono uppercase text-slate-800">
                      {solarContractMode === "surplus"
                        ? "Production Solaire, Consommation & Surplus Revendu au Réseau (kWh)"
                        : "Production Solaire & Électricité Vendue au Réseau (kWh)"}
                    </h3>
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={solarSimulation.monthlyData}
                        margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#0f172a",
                            borderRadius: "8px",
                            border: "none",
                            fontSize: "12px",
                            color: "#fff"
                          }}
                          formatter={(value: any, name: any) => [`${value} kWh`, name]}
                        />
                        <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                        <Area
                          type="monotone"
                          dataKey="productionKwh"
                          name="Production Solaire (kWh)"
                          stroke="#f59e0b"
                          fill="#fef3c7"
                        />
                        {solarContractMode === "surplus" && (
                          <Area
                            type="monotone"
                            dataKey="besoinKwh"
                            name="Besoin Foyer (kWh)"
                            stroke="#64748b"
                            fill="#f1f5f9"
                          />
                        )}
                        <Area
                          type="monotone"
                          dataKey="surplusReventeKwh"
                          name="Électricité Vendue au Réseau (kWh)"
                          stroke="#059669"
                          fill="#d1fae5"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Energy Flow Breakdown Pie */}
                <div>
                  <h3 className="text-xs font-bold font-mono uppercase text-slate-800 mb-2">
                    Répartition des Flux d'Énergie
                  </h3>
                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={solarSimulation.breakdownData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={70}
                          innerRadius={40}
                          paddingAngle={3}
                        >
                          {solarSimulation.breakdownData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#0f172a",
                            borderRadius: "8px",
                            border: "none",
                            fontSize: "12px",
                            color: "#fff"
                          }}
                          formatter={(value: any) => [`${value} kWh`, "Volume"]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-1 mt-2 text-[11px]">
                    {solarSimulation.breakdownData.map(item => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 truncate">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-slate-600 truncate">{item.name} :</span>
                        </div>
                        <span className="font-mono font-semibold text-slate-800 shrink-0">
                          {item.value.toLocaleString("fr-FR")} kWh
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Economic Balance on 20 Years (EDF OA Contract Duration) */}
              <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border border-emerald-200 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center justify-between mb-3 border-b border-emerald-200/60 pb-2">
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-emerald-700" />
                    <h3 className="text-xs sm:text-sm font-bold uppercase font-mono text-emerald-950">
                      Bilan Financier Prévisionnel sur 20 Ans (Contrat EDF OA)
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-emerald-600 text-white px-2.5 py-0.5 rounded-full">
                    Tarif garanti 20 ans
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-emerald-100">
                    <p className="text-[10px] font-mono text-slate-500 uppercase">Revenus Revente Réseau (20 ans)</p>
                    <p className="text-lg font-black font-mono text-emerald-700 mt-0.5">
                      {solarSimulation.cumulativeResale20Years.toLocaleString("fr-FR")} €
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      ~{solarSimulation.annualResaleIncome.toLocaleString("fr-FR")} € / an versés par l'acheteur
                    </p>
                  </div>

                  <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-emerald-100">
                    <p className="text-[10px] font-mono text-slate-500 uppercase">Facture Évitée (20 ans)</p>
                    <p className="text-lg font-black font-mono text-sky-700 mt-0.5">
                      {solarSimulation.cumulativeSavings20Years.toLocaleString("fr-FR")} €
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Économies sur l'achat d'électricité réseau
                    </p>
                  </div>

                  <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-emerald-100">
                    <p className="text-[10px] font-mono text-slate-500 uppercase">Gain Net Cumulé (20 ans)</p>
                    <p className="text-lg font-black font-mono text-slate-900 mt-0.5">
                      {solarSimulation.cumulativeGain20Years.toLocaleString("fr-FR")} €
                    </p>
                    <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                      Revente + Économies directes
                    </p>
                  </div>

                  <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-emerald-100">
                    <p className="text-[10px] font-mono text-slate-500 uppercase">Retour sur Investissement (ROI)</p>
                    <p className="text-lg font-black font-mono text-amber-700 mt-0.5">
                      ~{solarSimulation.paybackYears} ans
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Coût matériel estimé : ~{solarSimulation.estimatedInstallCost.toLocaleString("fr-FR")} €
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* UNIVERS B2B                                               */}
        {/* ========================================================= */}
        {universe === "b2b" && <SmeIso50001Module />}
      </div>
    </div>
  );
}
