import { useState } from "react";
import {
  Search,
  Share2,
  Clock,
  MoreHorizontal,
  ChevronDown,
  Mail,
  Phone,
  Linkedin,
  MapPin,
  Calendar,
  X,
  Plus,
  Pin,
  ExternalLink,
  SlidersHorizontal,
  CheckCircle,
  HelpCircle,
  FolderOpen,
  Grid,
  Filter,
  ArrowUpDown,
  Laptop,
  Info,
  ArrowRight
} from "lucide-react";
import { PROJECTS } from "../data";
import ProjectDetailsModal from "./ProjectDetailsModal";
import SmartImage, { SmartProfileImage, SmartCoverImage } from "./SmartImage";
import AiAssistant from "./AiAssistant";
import { Project } from "../types";

interface PortfolioViewProps {
  onNavigateToContact?: () => void;
}

export default function PortfolioView({ onNavigateToContact }: PortfolioViewProps) {
  const [projectFilter, setProjectFilter] = useState<"all" | "energy" | "lean" | "digital" | "ia" | string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const isDarkMode = false;
  const [activeToggles, setActiveToggles] = useState<Record<string, boolean>>({
    "soft-skills": true,
    "expertise": true,
    "excellence": true,
    "transformation": true
  });

  const toggleSection = (id: string) => {
    setActiveToggles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Light Theme styling mappings
  const themeBg = "bg-white";
  const themeText = "text-[#37352f]";
  const themeTextMuted = "text-[#6a6a65]";
  const themeBorder = "border-[#e9e9e6]";
  const themeCardBg = "bg-[#fbfbfa]";
  const themeCardBorder = "border-[#e9e9e6]";
  const themeCardHover = "hover:border-[#b1b1af]";
  const themeTitle = "text-[#37352f]";
  const themeHover = "hover:bg-[#f1f1ef]";
  const themeButtonActive = "bg-[#efefe0] border-[#e9e9e6] text-[#37352f]";
  const themeTimelineNode = "bg-[#fbfbfa]";
  const themeSeparator = "bg-[#e9e9e6]";

  // Filter projects by category and search query
  const filteredProjects = PROJECTS.filter((p) => {
    const matchesCategory =
      projectFilter === "all" ||
      p.category === projectFilter ||
      (projectFilter === "energy" && (p.category === "critical" || p.category.toLowerCase() === "energie" || p.category.toLowerCase() === "énergie")) ||
      (projectFilter === "ia" && (p.category === "ia" || p.category === "ai"));
    const matchesSearch = searchQuery === "" || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Helper to match card title precisely with user's Notion screenshots
  const getNotionCardTitle = (proj: Project) => {
    if (proj.id === "exxonmobil") return "🛠️ Optimisation Production - ExxonMobil";
    if (proj.id === "edf") return "🛠️ Maintenance Automatisme & Sûreté Nucléaire – EDF (CNPE de Paluel)";
    if (proj.id === "lgcf") return "🛠️ EMS (IoT & Supervision Digitale) - LGCF";
    if (proj.id === "danone") return "💡 MES (OEE) Intelligence Opérationnelle - Danone";
    if (proj.id === "totalenergies") return "💡 ISO 50001 - TotalEnergies";
    if (proj.id === "strategy-bayer") return "💡 Stratégie Industrielle - Bayer & Syensqo";
    if (proj.id === "mes-thales") return "💡 MES - Thales Sites Industriels EU";
    if (proj.id === "log-brewery") return "💡 Projets Lean & Lean Six Sigma";
    if (proj.id === "junivers") return "💡 Conception Introspection IAGen (Junivers)";
    return `💡 ${proj.title} - ${proj.client}`;
  };

  return (
    <div className={`min-h-screen ${themeBg} ${themeText} font-sans antialiased selection:bg-[#2e4d3c] selection:text-white`} id="notion-viewport">
      
      {/* 2. Top Fluid Cover Banner Image */}
      <div className="relative w-full h-[240px] sm:h-[300px] overflow-hidden" id="notion-cover">
        <SmartCoverImage
          alt="Lago di Braies Wooden Boat on Lake"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 3. Main Streamlined Full-Width Workspace */}
      <div className="w-full px-6 sm:px-12 md:px-16 lg:px-24 pb-24 relative" id="notion-content-area">
        
        {/* Overlapping Profile Photo (Doubled in size) */}
        <div className="absolute -top-[80px] sm:-top-[110px] left-6 sm:left-12 md:left-16" id="profile-photo-wrapper">
          <div className={`h-[160px] w-[160px] sm:h-[220px] sm:w-[220px] rounded-xl overflow-hidden ${themeBg} border-4 border-white shadow-xl`}>
            <SmartProfileImage
              alt="Julien Saliou Headshot"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Top Space Offset (Adjusted for the larger profile photo) */}
        <div className="pt-24 sm:pt-36" />

        {/* 4. Portfolio Main Header Block */}
        <div className="space-y-4" id="portfolio-title-block">
          <h1 className={`text-[32px] sm:text-[40px] font-bold tracking-tight ${themeTitle} leading-tight font-sans`}>
            Portfolio : Julien Saliou
          </h1>
          
          <div className={`text-sm sm:text-[15px] ${themeTextMuted} leading-relaxed space-y-1 font-sans`}>
            <p className={`font-semibold ${themeTitle}`}>
              Ingénieur Sénior • +15 ans d'expérience (Industrie & Conseil) • Expert Industrie, Énergie & Transformation Digitale • Lean Six Sigma Black Belt 
            </p>
            <p className="font-mono text-xs text-emerald-500 font-semibold tracking-wider">
              +15 ans d'expérience (Industrie & Conseil)
            </p>
          </div>

          <div className={`border-b ${themeBorder} pt-4`} />
        </div>

        {/* 5. Bonjour et bienvenue ! Block */}
        <div className="mt-8 space-y-4" id="notion-introduction">
          <h2 className={`text-xl sm:text-[22px] font-bold ${themeTitle} tracking-tight flex items-center gap-2`}>
            Bonjour et bienvenue !
          </h2>

          <div className={`rounded-xl border ${themeCardBorder} ${themeCardBg} p-6 space-y-4 text-xs sm:text-sm ${themeText} leading-relaxed font-sans`}>
            <p>
              Ravi de vous accueillir sur cet espace pour vous permettre de faire plus ample connaissance avec mon parcours et mes réalisations.
            </p>
            <p>
              J'ai bâti ma carrière sur une understanding concrète des réalités industrielles, au plus près des équipements et des métiers industriels.
            </p>
            <p>
              Aujourd'hui, avec plus de 15 années d'expérience, j’ai développé une double expertise : une maîtrise robuste des enjeux métiers alliée à une vision stratégique de conseil. Passionné par les systèmes complexes, je cultive également une forte curiosité pour les sciences humaines et l'innovation digitale, cherchant toujours à lier la rigueur de l'ingénieur à la compréhension du facteur humain.
            </p>
            <p>
              Porté par cette approche globale, mon ambition est de piloter la transformation des systèmes complexes en concevant des architectures d’excellence opérationnelle, capables d'aligner l'efficience industrielle, la sobriété des ressources et l'agilité organisationnelle face aux mutations environnementales.
            </p>
          </div>
        </div>

        {/* 6. Career parallel column grids Section */}
        <div className={`mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 border-t ${themeBorder} pt-10`} id="career-columns-section">
          
          {/* Left Column: Terrain (2009-2021) */}
          <div className="space-y-3" id="career-col-left">
            <div>
              <h3 className={`text-base sm:text-lg font-bold ${themeTitle} tracking-tight flex items-center gap-2 p-1 ${themeHover} rounded transition duration-200`}>
                <span className="shrink-0">🔧</span>
                <span>2009 — 2021 (~ 12 ans) : Expertise Terrain & Pilotage Multisite</span>
              </h3>
              <div className="pl-1 mt-0.5">
                <span className="text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-neutral-500/10 text-neutral-600 border border-neutral-500/20 uppercase tracking-wider inline-block">
                  Opérationnel
                </span>
              </div>
            </div>
            
            <p className={`text-xs sm:text-sm ${themeTextMuted} leading-relaxed`}>
              Une expérience opérationnelle de premier plan acquise dans des environnements industriels (Nucléaire, Pétrochimie, Agroalimentaire) où la rigueur technique, la sûreté absolue et l'excellence opérationnelle sont indispensables.
            </p>
            <p className="text-[11px] font-mono text-emerald-500/90 flex items-center gap-1">
              <span>👉</span>
              <span>Cliquez sur un site souligné pour ouvrir directement son dossier projet technique.</span>
            </p>

            <ul className={`space-y-4 text-xs sm:text-sm ${themeText} list-none pl-1`}>
              <li className="space-y-1">
                <span 
                  onClick={() => {
                    const proj = PROJECTS.find(p => p.id === "exxonmobil");
                    if (proj) setSelectedProject(proj);
                  }}
                  className={`font-semibold ${themeTitle} hover:text-emerald-500 hover:underline cursor-pointer inline-flex items-center gap-1 text-xs sm:text-sm transition-colors duration-150`}
                  title="Ouvrir le projet Optimisation ExxonMobil"
                >
                  • ExxonMobil (SEVESO) | 2009 - 2013 ↗
                </span>
                <span className={`${themeTextMuted} text-xs sm:text-[13px] leading-relaxed block pl-3`}>
                  Préparateur Projets Instrumentation Électricité Automatisme. Optimisation des rendements de production et maintenance système.
                </span>
              </li>
              <li className="space-y-1">
                <span 
                  onClick={() => {
                    const proj = PROJECTS.find(p => p.id === "edf");
                    if (proj) setSelectedProject(proj);
                  }}
                  className={`font-semibold ${themeTitle} hover:text-emerald-500 hover:underline cursor-pointer inline-flex items-center gap-1 text-xs sm:text-sm transition-colors duration-150`}
                  title="Ouvrir le projet Maintenance EDF"
                >
                  • EDF (Nucléaire - CNPE Paluel) | 2013 - 2018 ↗
                </span>
                <span className={`${themeTextMuted} text-xs sm:text-[13px] leading-relaxed block pl-3`}>
                  Coordinateur Technique en Automatisme. Maintenance de systèmes critiques et garant de la disponibilité.
                </span>
              </li>
              <li className="space-y-1">
                <span className={`font-semibold ${themeTitle} block text-xs sm:text-sm`}>
                  • Australie | 2018 - 2019
                </span>
                <span className={`${themeTextMuted} text-xs sm:text-[13px] leading-relaxed block pl-3`}>
                  Parcours en itinérance. Perfectionnement de l'anglais et adaptabilité en environnement international.
                </span>
              </li>
              <li className="space-y-1">
                <span 
                  onClick={() => {
                    const proj = PROJECTS.find(p => p.id === "lgcf");
                    if (proj) setSelectedProject(proj);
                  }}
                  className={`font-semibold ${themeTitle} hover:text-emerald-500 hover:underline cursor-pointer inline-flex items-center gap-1 text-xs sm:text-sm transition-colors duration-150`}
                  title="Ouvrir le projet EMS LGCF"
                >
                  • Les Grands Chais de France (LGCF/Agroalimentaire) | 2019 — 2021 ↗
                </span>
                <span className={`${themeTextMuted} text-xs sm:text-[13px] leading-relaxed block pl-3`}>
                  Chef de projet Énergie Multisite. Certification ISO 50001 (14 sites) et déploiement de la supervision IoT. En parallèle d'une <strong className={`${isDarkMode ? "text-neutral-200" : "text-neutral-800"} font-semibold`}>reprise d'études avec le CESI de Bordeaux (Ingénieur Généraliste)</strong>.
                </span>
              </li>
            </ul>
          </div>

          {/* Right Column: Conseil (2021-2026) */}
          <div className="space-y-3" id="career-col-right">
            <div>
              <h3 className={`text-base sm:text-lg font-bold ${themeTitle} tracking-tight flex items-center gap-2 p-1 ${themeHover} rounded transition duration-200`}>
                <span className="shrink-0 text-amber-500">💡</span>
                <span className="text-black font-extrabold">2021 — 2026 (~ 5 ans) : Conseil Sénior</span>
              </h3>
              <div className="pl-1 mt-0.5">
                <span className="text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 uppercase tracking-wider inline-block">
                  Conseil
                </span>
              </div>
            </div>

            <p className={`text-xs sm:text-sm ${themeText} leading-relaxed`}>
              J'ai mis cette solide expérience terrain au service du conseil, évoluant de l'exécution technique au pilotage de schémas directeurs. Mon parcours en tant que <strong className="text-neutral-900 font-semibold">Consultant Sénior</strong> m'a permis d'orchestrer des projets d'envergure : du déploiement de solutions <strong className="text-neutral-900 font-medium">Industrie 4.0</strong> à l'accompagnement international de <strong className="text-neutral-900 font-medium">systèmes de management de l'énergie</strong>, jusqu'à l'audit de <strong className="text-neutral-900 font-medium">stratégies industrielles complexes</strong>.
            </p>

            <div className="space-y-3 mt-4" id="project-details-intro">
              <p className="text-[11px] font-mono text-emerald-500/90 flex items-center gap-1">
                <span>👉</span>
                <span>Cliquez sur une mission de conseil pour ouvrir les spécifications :</span>
              </p>
              
              <ul className={`space-y-3 text-xs sm:text-sm ${themeText} list-none pl-1`}>
                <li className="space-y-1">
                  <span 
                    onClick={() => {
                      const proj = PROJECTS.find(p => p.id === "danone");
                      if (proj) setSelectedProject(proj);
                    }}
                    className={`font-semibold ${themeTitle} hover:text-emerald-500 hover:underline cursor-pointer inline-flex items-center gap-1 text-xs sm:text-sm transition-colors duration-150`}
                    title="Ouvrir le projet Danone OEE"
                  >
                    🔹 Danone (MES/OEE) | 2024 (4 mois) ↗
                  </span>
                  <span className={`${themeTextMuted} text-xs sm:text-[13px] block pl-3`}>
                    Numérisation de reporting et contextualisation de données OSIsoft PI sur 13 lignes de production.
                  </span>
                </li>
                <li className="space-y-1">
                  <span 
                    onClick={() => {
                      const proj = PROJECTS.find(p => p.id === "totalenergies");
                      if (proj) setSelectedProject(proj);
                    }}
                    className={`font-semibold ${themeTitle} hover:text-emerald-500 hover:underline cursor-pointer inline-flex items-center gap-1 text-xs sm:text-sm transition-colors duration-150`}
                    title="Ouvrir le projet TotalEnergies ISO 50001"
                  >
                    🔹 TotalEnergies (ISO 50001) | 2022 - 2023 (1 an) ↗
                  </span>
                  <span className={`${themeTextMuted} text-xs sm:text-[13px] block pl-3`}>
                    Déploiement international de l'offre d'accompagnement certifiable ISO 50001 (6 filiales).
                  </span>
                </li>
                <li className="space-y-1">
                  <span 
                    onClick={() => {
                      const proj = PROJECTS.find(p => p.id === "log-brewery");
                      if (proj) setSelectedProject(proj);
                    }}
                    className={`font-semibold ${themeTitle} hover:text-emerald-500 hover:underline cursor-pointer inline-flex items-center gap-1 text-xs sm:text-sm transition-colors duration-150`}
                    title="Ouvrir le projet Lean & Lean Six Sigma"
                  >
                    🔹 Projets Lean & Lean Six Sigma | 2024 ↗
                  </span>
                  <span className={`${themeTextMuted} text-xs sm:text-[13px] block pl-3`}>
                    Optimisation Lean du flux logistique (Brasserie B&B) et réduction statistique de la variabilité de perçage (Six Sigma).
                  </span>
                </li>
                <li className="space-y-1">
                  <span 
                    onClick={() => {
                      const proj = PROJECTS.find(p => p.id === "strategy-bayer");
                      if (proj) setSelectedProject(proj);
                    }}
                    className={`font-semibold ${themeTitle} hover:text-emerald-500 hover:underline cursor-pointer inline-flex items-center gap-1 text-xs sm:text-sm transition-colors duration-150`}
                    title="Ouvrir le projet Bayer & Syensqo"
                  >
                    🔹 Bayer & Syensqo (Dialogue Social) | 2024 - 2025 (5 mois) ↗
                  </span>
                  <span className={`${themeTextMuted} text-xs sm:text-[13px] block pl-3`}>
                    Audit d'expertise en maturité opérationnelle et accompagnement du dialogue social.
                  </span>
                </li>
                <li className="space-y-1">
                  <span 
                    onClick={() => {
                      const proj = PROJECTS.find(p => p.id === "mes-thales");
                      if (proj) setSelectedProject(proj);
                    }}
                    className={`font-semibold ${themeTitle} hover:text-emerald-500 hover:underline cursor-pointer inline-flex items-center gap-1 text-xs sm:text-sm transition-colors duration-150`}
                    title="Ouvrir le projet Cadrage Thales"
                  >
                    🔹 Thales (Schéma Directeur MES) | 2023 (4 mois) ↗
                  </span>
                  <span className={`${themeTextMuted} text-xs sm:text-[13px] block pl-3`}>
                    Étude Fit-to-Standard pour le déploiement d’un MES européen de pointe Aéro & Défense.
                  </span>
                </li>
              </ul>

              <p className={`text-xs sm:text-[11px] ${themeTextMuted} font-mono italic leading-relaxed pl-1 pt-2`}>
                • Parcourez également la galerie dynamique ci-dessous pour trier par secteur d’activité.
              </p>
            </div>
          </div>
        </div>

        {/* 7. Gallery Database View Section */}
        <div className={`mt-14 space-y-4 border-t ${themeBorder} pt-10`} id="projects-gallery-section">
          <h2 className={`text-xl sm:text-[22px] font-bold ${themeTitle} tracking-tight flex items-center gap-2`}>
            Mes projets phares
          </h2>

          {/* Database Control Row */}
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between border-b ${themeBorder} pb-3 mb-6 gap-3 text-xs ${themeTextMuted}`} id="gallery-controls">
            {/* Left: Dynamic Sector filter badges directly */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex flex-wrap gap-1.5" id="notion-filters">
                {[
                  { id: "all", label: "Tous", color: "bg-slate-200 text-slate-900 font-semibold border border-slate-300" },
                  { id: "energy", label: "Énergie", color: "bg-emerald-50 text-emerald-800 border border-emerald-200" },
                  { id: "lean", label: "Performance et Stratégie Industrielle", color: "bg-amber-50 text-amber-800 border border-amber-200" },
                  { id: "digital", label: "Transformation Digitale", color: "bg-sky-50 text-sky-800 border border-sky-200" },
                  { id: "ia", label: "Intelligence Artificielle (IA)", color: "bg-purple-50 text-purple-800 border border-purple-200" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setProjectFilter(item.id as any)}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium cursor-pointer transition-all ${
                      projectFilter === item.id 
                        ? `${item.color} ring-1 ring-emerald-500` 
                        : `${themeCardBg} ${themeHover} ${themeTextMuted}`
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              {searchQuery && (
                <span className="text-emerald-600 font-mono text-[11px] font-semibold">
                  {filteredProjects.length} résultat(s)
                </span>
              )}
              <span className={`${themeHover} p-1 rounded cursor-pointer transition flex items-center gap-1`}>
                <Filter className="h-3.5 w-3.5" />
                <span>Filter</span>
              </span>
              <span className={`${themeHover} p-1 rounded cursor-pointer transition flex items-center gap-1`}>
                <ArrowUpDown className="h-3.5 w-3.5" />
                <span>Sort</span>
              </span>
              <span className={`${themeHover} p-1 rounded cursor-pointer transition`}>
                <Search className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>

          {/* Card database grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" id="gallery-grid">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                onClick={() => setSelectedProject(p)}
                className={`group rounded-lg border ${themeCardBorder} ${themeCardBg} overflow-hidden cursor-pointer ${themeCardHover} transition-all duration-200 flex flex-col h-full`}
                id={`project-card-${p.id}`}
              >
                {/* Image Header with fallback placeholder image if needed */}
                <div className="h-[140px] bg-slate-100 overflow-hidden relative">
                  <SmartImage
                    projectId={p.id}
                    initialSrc={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  {/* Subtle info line */}
                  <span className="absolute top-2 left-2 bg-white/95 text-slate-700 border border-slate-200 shadow-xs rounded px-1.5 py-0.5 text-[9px] font-mono">
                    {p.duration}
                  </span>
                </div>

                {/* Notion Card Title underneath */}
                <div className="p-3 flex flex-col justify-between flex-grow min-h-[75px]" id={`card-heading-${p.id}`}>
                  <h4 className={`text-xs sm:text-[13px] font-semibold ${themeTitle} leading-tight group-hover:text-emerald-505 transition-colors line-clamp-2`}>
                    {getNotionCardTitle(p)}
                  </h4>
                  <div className={`mt-2 flex items-center gap-1.5 text-[10px] ${themeTextMuted} font-mono`}>
                    <MapPin className="h-3 w-3 text-emerald-500 shrink-0" />
                    <span className="truncate">{p.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 8. Toggle List block: Compétences & Expertises */}
        <div className={`mt-14 space-y-4 border-t ${themeBorder} pt-10`} id="competences-toggle-section">
          <h2 className={`text-xl sm:text-[22px] font-bold ${themeTitle} tracking-tight flex items-center gap-2`}>
            💎 Compétences & Expertises
          </h2>

          {/* 4-Column responsive grid styled exactly like Notion's column toggles */}
          <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 text-xs sm:text-[13px] ${themeText} leading-relaxed`} id="competences-columns">
            
            {/* Column 1: Soft Skills */}
            <div className="space-y-3" id="comp-col-1">
              <button
                onClick={() => toggleSection("soft-skills")}
                className={`font-bold ${themeTitle} flex items-center gap-1.5 p-1 w-full text-left ${themeHover} rounded transition duration-150`}
              >
                <span className={`${themeTextMuted} transition-transform ${activeToggles["soft-skills"] ? "" : "-rotate-90"}`}>▼</span>
                Soft Skills & Leadership
              </button>
              
              {activeToggles["soft-skills"] && (
                <ul className={`space-y-4 pl-3.5 ${themeTextMuted}`} id="soft-skills-list">
                  <li className="space-y-1">
                    <span className={`${themeText} font-medium block`}>
                      ▶ Intelligence Pratique & Résolution de Problèmes
                    </span>
                    <span className={`block text-xs ${themeTextMuted} leading-normal pl-3`}>
                      Capacité à "dégripper" des situations critiques par des solutions concrètes, réelles et exploitables. Curiosité intellectuelle et auto-formation continue (Innovation, Intelligence Artificielle, Sciences cognitives).
                    </span>
                  </li>
                  <li className="space-y-1">
                    <span className={`${themeText} font-medium block`}>
                      ▶ Esprit de Synthèse & Vision Globale
                    </span>
                    <span className={`block text-xs ${themeTextMuted} leading-normal pl-3`}>
                      Aptitude à ramener des flux d'informations complexes à leur essence pour les traduire en schémas directeurs et décisions stratégiques.
                    </span>
                  </li>
                  <li className="space-y-1">
                    <span className={`${themeText} font-medium block`}>
                      ▶ Leadership & Pilotage
                    </span>
                    <span className={`block text-xs ${themeTextMuted} leading-normal pl-3`}>
                      Orchestration de fonctions variées et de projets d'envergure en fédérant les équipes multidisciplinaires sans rapport de force.
                    </span>
                  </li>
                  <li className="space-y-1">
                    <span className={`${themeText} font-medium block`}>
                      ▶ Adaptabilité & Communication Diplomate
                    </span>
                    <span className={`block text-xs ${themeTextMuted} leading-normal pl-3`}>
                      Aisance en environnements internationaux et diplomatie naturelle pour lever les résistances au changement et les enjeux humains.
                    </span>
                  </li>
                  <li className="space-y-1">
                    <span className={`${themeText} font-medium block`}>
                      ▶ Posture de Conseil & Résilience
                    </span>
                    <span className={`block text-xs ${themeTextMuted} leading-normal pl-3`}>
                      Accompagnement proactif des clients avec une stabilité émotionnelle face aux résistances au changement et aux imprévus.
                    </span>
                  </li>
                </ul>
              )}
            </div>

            {/* Column 2: Expertise Technique */}
            <div className="space-y-3" id="comp-col-2">
              <button
                onClick={() => toggleSection("expertise")}
                className={`font-bold ${themeTitle} flex items-center gap-1.5 p-1 w-full text-left ${themeHover} rounded transition duration-150`}
              >
                <span className={`${themeTextMuted} transition-transform ${activeToggles["expertise"] ? "" : "-rotate-90"}`}>▼</span>
                Expertise Technique & Milieux Critiques
              </button>

              {activeToggles["expertise"] && (
                <ul className={`space-y-4 pl-3.5 ${themeTextMuted}`} id="expertise-list">
                  <li className="space-y-1">
                    <span className={`${themeText} font-medium block`}>
                      ▶ Sûreté & Risques (SEVESO, Nucléaire, Offshore)
                    </span>
                    <span className={`block text-xs ${themeTextMuted} leading-normal pl-3`}>
                      Maîtrise des environnements à haute criticité (BOSIET, ATEX) et gestion des risques industriels complexes.
                    </span>
                  </li>
                  <li className="space-y-1">
                    <span className={`${themeText} font-medium block`}>
                      ▶ Instrumentation, Électricité & Automatisme (IEA)
                    </span>
                    <span className={`block text-xs ${themeTextMuted} leading-normal pl-3`}>
                      Conception, maintenance et optimisation de boucles de régulation complexes. Maîtrise des systèmes SCADA et des automates programmables pour garantir la disponibilité des actifs critiques.
                    </span>
                  </li>
                  <li className="space-y-1">
                    <span className={`${themeText} font-medium block`}>
                      ▶ Conduite & Procédés (Pétrochimie/Raffinage)
                    </span>
                    <span className={`block text-xs ${themeTextMuted} leading-normal pl-3`}>
                      Pilotage d'unités, rédaction de cahiers des charges et coordination d'arrêts de tranche.
                    </span>
                  </li>
                  <li className="space-y-1">
                    <span className={`${themeText} font-medium block`}>
                      ▶ Efficience Énergétique & Décarbonation
                    </span>
                    <span className={`block text-xs ${themeTextMuted} leading-normal pl-3`}>
                      Management de projets ISO 50001 multi-sites. Déploiement de solutions concrètes de réduction des consommations et de l'optimisation des utilités (vapeur, air comprimé, électricité).
                    </span>
                  </li>
                </ul>
              )}
            </div>

            {/* Column 3: Excellence Opérationnelle */}
            <div className="space-y-3" id="comp-col-3">
              <button
                onClick={() => toggleSection("excellence")}
                className={`font-bold ${themeTitle} flex items-center gap-1.5 p-1 w-full text-left ${themeHover} rounded transition duration-150`}
              >
                <span className={`${themeTextMuted} transition-transform ${activeToggles["excellence"] ? "" : "-rotate-90"}`}>▼</span>
                Excellence Opérationnelle & Performance
              </button>

              {activeToggles["excellence"] && (
                <ul className={`space-y-4 pl-3.5 ${themeTextMuted}`} id="excellence-list">
                  <li className="space-y-1">
                    <span className={`${themeText} font-medium block`}>
                      ▶ Excellence Opérationnelle & Lean
                    </span>
                    <span className={`block text-xs ${themeTextMuted} leading-normal pl-3`}>
                      Expert Black Belt certifié. Maîtrise de la chaîne de valeur : diagnostic VSM, synchronisation des flux (Takt Time, Heijunka, Kanban) et performance terrain (Kaizen, 5S, SMED, Poka-Yoke). Résolution de problèmes complexes par la méthode DMAIC et l'analyse statistique pour éliminer durablement les gaspillages (Muda, Mura, Muri).
                    </span>
                  </li>
                  <li className="space-y-1">
                    <span className={`${themeText} font-medium block`}>
                      ▶ Gestion de Projets Transverses
                    </span>
                    <span className={`block text-xs ${themeTextMuted} leading-normal pl-3`}>
                      Pilotage de projets multidisciplinaires et internationaux (Budgets CAPEX, coordination multi-sites).
                    </span>
                  </li>
                  <li className="space-y-1">
                    <span className={`${themeText} font-medium block`}>
                      ▶ Conduite du Changement & Gouvernance
                    </span>
                    <span className={`block text-xs ${themeTextMuted} leading-normal pl-3`}>
                      Analyse des parties prenantes et communication interpersonnelle ciblée pour lever les résistances et sécuriser l'adhésion lors de transformations ou réformes structurelles majeures.
                    </span>
                  </li>
                </ul>
              )}
            </div>

            {/* Column 4: Stratégie & Transformation Digitale */}
            <div className="space-y-3" id="comp-col-4">
              <button
                onClick={() => toggleSection("transformation")}
                className={`font-bold ${themeTitle} flex items-center gap-1.5 p-1 w-full text-left ${themeHover} rounded transition duration-150`}
              >
                <span className={`${themeTextMuted} transition-transform ${activeToggles["transformation"] ? "" : "-rotate-90"}`}>▼</span>
                Stratégie & Transformation Digitale
              </button>

              {activeToggles["transformation"] && (
                <ul className={`space-y-4 pl-3.5 ${themeTextMuted}`} id="transformation-list">
                  <li className="space-y-1">
                    <span className={`${themeText} font-medium block`}>
                      ▶ Cadrage & Trajectoire Technologique
                    </span>
                    <span className={`block text-xs ${themeTextMuted} leading-normal pl-3`}>
                      Analyse des flux et des besoins opérationnels pour définir des trajectoires technologiques à forte valeur ajoutée.
                    </span>
                  </li>
                  <li className="space-y-1">
                    <span className={`${themeText} font-medium block`}>
                      ▶ Analyse des besoins & Benchmark
                    </span>
                    <span className={`block text-xs ${themeTextMuted} leading-normal pl-3`}>
                      Études comparatives et analyses multicritères (ROI, technique, humain) pour sécuriser les choix d'investissement et le "Fit to Standard".
                    </span>
                  </li>
                  <li className="space-y-1">
                    <span className={`${themeText} font-medium block`}>
                      ▶ Schéma Directeur & Intelligence Opérationnelle
                    </span>
                    <span className={`block text-xs ${themeTextMuted} leading-normal pl-3`}>
                      Conception de feuilles de route digitales et structuration de la donnée (KPI temps réel, OEE/TRG) pour piloter la performance.
                    </span>
                  </li>
                  <li className="space-y-1">
                    <span className={`${themeText} font-medium block`}>
                      ▶ Industrie 4.0 (MES/MOM & IIoT)
                    </span>
                    <span className={`block text-xs ${themeTextMuted} leading-normal pl-3`}>
                      Expertise en déploiement de systèmes d'exécution de la fabrication et architectures connectées (LoRaWAN, protocoles industriels). Pilotage de la convergence entre les infrastructures informatiques (IT) et les impératifs de production (OT) pour une usine intégrée.
                    </span>
                  </li>
                  <li className="space-y-1">
                    <span className={`${themeText} font-medium block`}>
                      ▶ Pilotage de projets d'innovation IA
                    </span>
                    <span className={`block text-xs ${themeTextMuted} leading-normal pl-3`}>
                      Cadrage complet de produits digitaux (étude de marché, AMDEC, cahier des charges) et développement de workflows automatisés utilisant l'IA générative pour transformer des données complexes en analyses décisionnelles.
                    </span>
                  </li>
                </ul>
              )}
            </div>

          </div>
        </div>

        {/* 9. Stack Technologique & Outils */}
        <div className={`mt-14 space-y-4 border-t ${themeBorder} pt-10`} id="tech-stack-list-section">
          <h2 className={`text-xl sm:text-[22px] font-bold ${themeTitle} tracking-tight flex items-center gap-2`}>
            💻 Stack Technologique & Outils
          </h2>

          <ul className={`space-y-2 text-xs sm:text-sm ${themeText} list-none pl-1 font-sans`}>
            <li className="leading-relaxed">
              <strong className={themeTitle}>• Méthodes & Pilotage</strong> : Lean Six Sigma (Minitab), Gestion de projet (Jira, Asana), MS Project, Suite Office Expert.
            </li>
            <li className="leading-relaxed">
              <strong className={themeTitle}>• IA & Innovation</strong> : IA Générative (Prompt Engineering, LLMs), Analyse prédictive, Machine Learning appliqué à l'industrie.
            </li>
            <li className="leading-relaxed">
              <strong className={themeTitle}>• Protocoles & IoT</strong> : LoRaWAN, OPC (UA/DA), Instrumentation connectée, MQTT.
            </li>
            <li className="leading-relaxed">
              <strong className={themeTitle}>• Systèmes & Data</strong> : Aveva/OSIsoft PI (AF, Vision), MES/MOM, SCADA, ERP (SAP), Power BI / Tableau.
            </li>
          </ul>
        </div>

        {/* 10. Formations & Certifications - Timeline */}
        <div className={`mt-14 space-y-6 border-t ${themeBorder} pt-10`} id="education-certifications-section">
          <h2 className={`text-xl sm:text-[22px] font-bold ${themeTitle} tracking-tight flex items-center gap-2`}>
            🎗️ Formations & Certifications
          </h2>

          <div className="relative pt-6" id="education-timeline-wrapper">
            {/* Horizontal Timeline bar for desktop (md and above) */}
            <div className="absolute top-[28px] left-[40px] right-[40px] h-[3px] bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-200 z-0 hidden md:block" />

            {/* Grid container spanning full width without scroll on md and above */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10" id="education-timeline-items">
              
              {/* Item 1: 2009 — 2011 */}
              <div className={`flex flex-col justify-between ${themeCardBg} border ${themeCardBorder} ${themeCardHover} p-4 rounded-xl transition-all duration-200 h-full`} id="timeline-node-1">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-[14px] w-[14px] rounded-full bg-emerald-500 ring-4 ring-emerald-100 shrink-0" />
                    <span className="text-[11px] font-mono text-black font-extrabold bg-slate-100 border border-slate-300 px-2.5 py-0.5 rounded-full shadow-xs">
                      2009 — 2011
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className={`text-xs sm:text-sm font-bold ${themeTitle} hover:text-emerald-600 transition-colors`}>
                      BTS Électrotechnique
                    </h4>
                    <span className={`text-[11px] ${themeTextMuted} font-mono block`}>
                      Organisme : Campus Jeanne d'Arc
                    </span>
                  </div>

                  <p className={`text-xs ${themeTextMuted} leading-relaxed`}>
                    <strong className={`${themeTitle} font-medium`}>Compétences :</strong> Maintenance industrielle, conception électrique, automatismes et dépannage.
                  </p>
                </div>
              </div>

              {/* Item 2: 2011 — 2012 */}
              <div className={`flex flex-col justify-between ${themeCardBg} border ${themeCardBorder} ${themeCardHover} p-4 rounded-xl transition-all duration-200 h-full`} id="timeline-node-2">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-[14px] w-[14px] rounded-full bg-emerald-500 ring-4 ring-emerald-100 shrink-0" />
                    <span className="text-[11px] font-mono text-slate-800 font-bold bg-slate-100 border border-slate-300 px-2.5 py-0.5 rounded-full shadow-xs">
                      2011 — 2012
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className={`text-xs sm:text-sm font-bold ${themeTitle} hover:text-emerald-600 transition-colors`}>
                      Brevet d'Opérateur Extérieur des Industries Pétrolières et Pétrochimiques
                    </h4>
                    <span className={`text-[11px] ${themeTextMuted} font-mono block`}>
                      Organisme : IFP Training
                    </span>
                  </div>

                  <p className={`text-xs ${themeTextMuted} leading-relaxed`}>
                    <strong className={`${themeTitle} font-medium`}>Compétences :</strong> Pilotage de procédés industriels complexes, chimie et raffinage.
                  </p>
                </div>
              </div>

              {/* Item 3: 2018 — 2019 */}
              <div className={`flex flex-col justify-between ${themeCardBg} border ${themeCardBorder} ${themeCardHover} p-4 rounded-xl transition-all duration-200 h-full`} id="timeline-node-3">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-[14px] w-[14px] rounded-full bg-emerald-500 ring-4 ring-emerald-100 shrink-0" />
                    <span className="text-[11px] font-mono text-slate-800 font-bold bg-slate-100 border border-slate-300 px-2.5 py-0.5 rounded-full shadow-xs">
                      2018 — 2019
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className={`text-xs sm:text-sm font-bold ${themeTitle} hover:text-emerald-600 transition-colors`}>
                      Formation Anglais intensive
                    </h4>
                    <span className={`text-[11px] ${themeTextMuted} font-mono block`}>
                      Organisme : Kaplan Business School
                    </span>
                  </div>

                  <p className={`text-xs ${themeTextMuted} leading-relaxed`}>
                    <strong className={`${themeTitle} font-medium`}>Compétences :</strong> Maîtrise de l'anglais professionnel en environnement international.
                  </p>
                </div>
              </div>

              {/* Item 4: 2019 — 2021 */}
              <div className={`flex flex-col justify-between ${themeCardBg} border ${themeCardBorder} ${themeCardHover} p-4 rounded-xl transition-all duration-200 h-full`} id="timeline-node-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-[14px] w-[14px] rounded-full bg-emerald-500 ring-4 ring-emerald-100 shrink-0" />
                    <span className="text-[11px] font-mono text-slate-800 font-bold bg-slate-100 border border-slate-300 px-2.5 py-0.5 rounded-full shadow-xs">
                      2019 — 2021
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className={`text-xs sm:text-sm font-bold ${themeTitle} hover:text-emerald-600 transition-colors`}>
                      Ingénieur Généraliste (CESI - École d'ingénieurs)
                    </h4>
                    <span className={`text-[11px] ${themeTextMuted} font-mono block`}>
                      Organisme : CESI - École d'ingénieurs
                    </span>
                  </div>

                  <p className={`text-xs ${themeTextMuted} leading-relaxed`}>
                    <strong className={`${themeTitle} font-medium`}>Contexte :</strong> Reprise d'études (en contrat de professionnalisation – Les Grands Chais de France). <br />
                    <strong className={`${themeTitle} font-medium`}>Compétences :</strong> Performance industrielle, Excellence opérationnelle, Management Lean et Gestion de projet.
                  </p>
                </div>
              </div>

              {/* Item 5: 2024 */}
              <div className={`flex flex-col justify-between ${themeCardBg} border ${themeCardBorder} ${themeCardHover} p-4 rounded-xl transition-all duration-200 h-full`} id="timeline-node-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-[14px] w-[14px] rounded-full bg-emerald-500 ring-4 ring-emerald-100 shrink-0" />
                    <span className="text-[11px] font-mono text-slate-800 font-bold bg-slate-100 border border-slate-300 px-2.5 py-0.5 rounded-full shadow-xs">
                      2024
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className={`text-xs sm:text-sm font-bold ${themeTitle} hover:text-emerald-600 transition-colors`}>
                      Certification Lean Six Sigma - Green Belt & Black Belt
                    </h4>
                  </div>

                  <p className={`text-xs ${themeTextMuted} leading-relaxed`}>
                    <strong className={`${themeTitle} font-medium`}>Compétences :</strong> Pilotage de transformations stratégiques, résolution de problèmes complexes, statistiques avancées et coaching d'équipes. Optimisation de processus, réduction des gaspillages et conduite de projets via la méthodologie DMAIC.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* 11. Call-to-Action Contact Banner */}
      <div className={`border-t ${themeBorder} bg-gradient-to-b from-white via-emerald-50/20 to-slate-50 py-16 px-6 sm:px-12 mt-12 text-center`} id="portfolio-contact-cta">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold">
            <Mail className="w-3.5 h-3.5 text-emerald-600" />
            <span>Échange & Collaboration</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Une question ? Un projet ou un souhait d'échanger ?
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
            Que ce soit pour un échange exploratoire, un cadrage stratégique, une mission en performance énergétique ou une opportunité de collaboration, je suis à votre écoute.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onNavigateToContact?.()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer group"
            >
              <Mail className="w-4 h-4" />
              <span>Me contacter</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="https://www.linkedin.com/in/juliencr6/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 text-slate-700 hover:text-sky-800 text-xs font-semibold transition shadow-xs group"
            >
              <Linkedin className="w-4 h-4 text-sky-600" />
              <span>Profil LinkedIn</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600 transition-colors" />
            </a>
          </div>

          <p className="text-[11px] font-mono text-slate-400 pt-3">
            Julien Saliou • Ingénieur Généraliste • Performance Industrielle & Énergétique
          </p>
        </div>
      </div>

      {/* 12. Dynamic Modal Detailed Popups */}
      <ProjectDetailsModal project={selectedProject} onClose={() => setSelectedProject(null)} isDarkMode={false} />
      {/* 15. Real-Time Server-Side Conversational AI Copilot widget */}
      <AiAssistant />

    </div>
  );
}
