import { SKILLS, TECH_STACK } from "../data";
import { Award, Cpu, Network, Users, Check, Layers, Binary, Router, GraduationCap } from "lucide-react";

interface SkillsDashboardProps {
  onSendMessage: (query: string) => void;
}

export default function SkillsDashboard() {
  // Map hardcoded titles to Lucide icon components to satisfy guidelines
  const getIcon = (title: string) => {
    switch (title) {
      case "Excellence Opérationnelle":
        return <Award className="h-5 w-5 text-emerald-400" />;
      case "Expertise Technique":
        return <Cpu className="h-5 w-5 text-emerald-400" />;
      case "Transformation Digitale":
        return <Network className="h-5 w-5 text-emerald-400" />;
      default:
        return <Users className="h-5 w-5 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-12" id="skills-dashboard">
      {/* Skill Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SKILLS.map((sc, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 hover:border-emerald-500/30 hover:bg-neutral-900 transition duration-300"
            id={`skill-card-${idx}`}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-neutral-800 pb-4 mb-4">
              <div className="rounded-xl bg-neutral-950 p-2 border border-neutral-800">
                {getIcon(sc.title)}
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">{sc.title}</h3>
            </div>

            {/* List */}
            <ul className="space-y-2.5">
              {sc.skills.map((skill, sIdx) => (
                <li key={sIdx} className="flex gap-2.5 text-sm text-neutral-300 items-start">
                  <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Tech Stack / Tooling Highlights */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 space-y-8" id="tech-stack-section">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-mono font-semibold text-emerald-400">
            <Layers className="h-3 w-3" />
            OUTILS & TECHNOLOGIES
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-sans text-white tracking-tight">
            Plateformes, Protocoles & Méthodes Maîtrisées
          </h3>
          <p className="text-neutral-400 text-sm">
            Une stack technique d'ingénieur calibrée pour la connectivité d'usine (OT), la traçabilité digitale (IT) et l'IA.
          </p>
        </div>

        {/* Tech groups layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Methods Card */}
          <div className="space-y-3 rounded-xl bg-neutral-900/40 p-4 border border-neutral-850">
            <div className="flex items-center gap-2 text-white font-mono text-xs uppercase tracking-wider text-emerald-400">
              <Award className="h-4 w-4" />
              Méthodes & Pilotage
            </div>
            <div className="flex flex-wrap gap-1.5">
              {TECH_STACK.methods.map((m, i) => (
                <span key={i} className="rounded-md bg-neutral-950 px-2 py-1 text-xs border border-neutral-800 text-neutral-300">
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* AI Carbon Card */}
          <div className="space-y-3 rounded-xl bg-neutral-900/40 p-4 border border-neutral-850">
            <div className="flex items-center gap-2 text-white font-mono text-xs uppercase tracking-wider text-emerald-400">
              <Binary className="h-4 w-4" />
              IA & Innovation
            </div>
            <div className="flex flex-wrap gap-1.5">
              {TECH_STACK.ia.map((m, i) => (
                <span key={i} className="rounded-md bg-neutral-950 px-2 py-1 text-xs border border-neutral-800 text-neutral-300">
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Protocols Card */}
          <div className="space-y-3 rounded-xl bg-neutral-900/40 p-4 border border-neutral-850">
            <div className="flex items-center gap-2 text-white font-mono text-xs uppercase tracking-wider text-emerald-400">
              <Router className="h-4 w-4" />
              Protocoles & IoT
            </div>
            <div className="flex flex-wrap gap-1.5">
              {TECH_STACK.iot.map((m, i) => (
                <span key={i} className="rounded-md bg-neutral-950 px-2 py-1 text-xs border border-neutral-800 text-neutral-300">
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Systems Card */}
          <div className="space-y-3 rounded-xl bg-neutral-900/40 p-4 border border-neutral-850">
            <div className="flex items-center gap-2 text-white font-mono text-xs uppercase tracking-wider text-emerald-400">
              <Cpu className="h-4 w-4" />
              Systèmes & Data
            </div>
            <div className="flex flex-wrap gap-1.5">
              {TECH_STACK.systems.map((m, i) => (
                <span key={i} className="rounded-md bg-neutral-950 px-2 py-1 text-xs border border-neutral-800 text-emerald-300/80">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
