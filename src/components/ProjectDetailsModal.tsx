import { Project } from "../types";
import { motion, AnimatePresence } from "motion/react";
import SmartImage from "./SmartImage";
import { X, MapPin, Calendar, Award, CheckCircle, TrendingUp, Info } from "lucide-react";
import { trackUnismeClick } from "../lib/analytics";

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
  isDarkMode?: boolean;
}

export default function ProjectDetailsModal({ project, onClose, isDarkMode = false }: ProjectDetailsModalProps) {
  const mBg = isDarkMode ? "bg-neutral-900 text-neutral-100" : "bg-white text-[#37352f]";
  const mBorder = isDarkMode ? "border-neutral-800" : "border-neutral-200";
  const mTextMuted = isDarkMode ? "text-neutral-500" : "text-neutral-400";
  const mTextSubtle = isDarkMode ? "text-neutral-400" : "text-neutral-600";
  const mBgMuted = isDarkMode ? "bg-neutral-950" : "bg-[#f7f7f5]";
  const mBorderMuted = isDarkMode ? "border-neutral-850" : "border-neutral-200";
  const mTextHeader = isDarkMode ? "text-white" : "text-[#37352f]";
  const mCloseBtn = isDarkMode 
    ? "border-neutral-850 bg-neutral-950 text-neutral-400 hover:text-white hover:bg-neutral-800" 
    : "border-neutral-200 bg-white text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100";
  const mTitleGradient = isDarkMode
    ? "from-neutral-900 via-neutral-900/40 to-black/60"
    : "from-white via-white/40 to-transparent";

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md"
            id="modal-overlay"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className={`relative w-full max-w-[95%] lg:max-w-6xl xl:max-w-7xl overflow-hidden rounded-2xl border ${mBorder} ${mBg} shadow-2xl z-10`}
            id={`modal-${project.id}`}
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 z-20 rounded-full border ${mCloseBtn} p-2 transition`}
              id="close-button"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header Image/Gradient */}
            <div className="relative h-48 sm:h-64 bg-neutral-950 overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-t ${mTitleGradient} z-10`} />
              <SmartImage
                projectId={project.id}
                initialSrc={project.image}
                alt={project.title}
                className="h-full w-full object-cover opacity-60"
              />
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                  <Award className="h-3 w-3" />
                  {project.client}
                </span>
                <h3 className={`mt-2 text-2xl sm:text-3xl font-bold font-sans tracking-tight ${mTextHeader} leading-tight`}>
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Content Area */}
            <div className="max-h-[60vh] overflow-y-auto p-6 sm:p-8 space-y-6" id="modal-scrollable">
              {/* Project Metadata grid */}
              <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 border-b ${mBorderMuted} pb-6 text-sm ${mTextSubtle}`}>
                <div className={`flex items-start gap-2.5 p-3 rounded-xl border ${mBorderMuted} ${isDarkMode ? "bg-neutral-900/60" : "bg-slate-50/80"} min-w-0`}>
                  <Calendar className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-medium">Durée</p>
                    <p className={`font-semibold text-xs sm:text-sm ${isDarkMode ? "text-neutral-200" : "text-neutral-800"} break-words`}>
                      {project.duration}
                    </p>
                  </div>
                </div>

                <div className={`flex items-start gap-2.5 p-3 rounded-xl border ${mBorderMuted} ${isDarkMode ? "bg-neutral-900/60" : "bg-slate-50/80"} min-w-0`}>
                  <MapPin className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-medium">Lieu de Mission</p>
                    <p className={`font-semibold text-xs sm:text-sm ${isDarkMode ? "text-neutral-200" : "text-neutral-800"} break-words leading-snug`}>
                      {project.location}
                    </p>
                  </div>
                </div>

                <div className={`flex items-start gap-2.5 p-3 rounded-xl border ${mBorderMuted} ${isDarkMode ? "bg-neutral-900/60" : "bg-slate-50/80"} min-w-0`}>
                  <Info className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-medium">Secteur Cible</p>
                    <p className={`font-semibold text-xs sm:text-sm ${isDarkMode ? "text-neutral-200" : "text-neutral-800"} break-words leading-snug`}>
                      {project.category === "critical"
                        ? "Milieu Critique / Sûreté"
                        : project.category === "energy"
                        ? "Performance Énergie / ISO 50001"
                        : project.category === "lean"
                        ? "Excellence Opérationnelle"
                        : "Sujets Digitaux & Innovation"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Presentation Panel */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 font-mono">Contexte & Enjeux</h4>
                <p className={`${isDarkMode ? "text-neutral-300" : "text-neutral-700"} text-sm sm:text-base leading-relaxed whitespace-pre-line`}>
                  {project.presentation}
                </p>
              </div>

              {/* Methodology & Steps Checklist */}
              <div className="space-y-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 font-mono">Méthodologie & Actions menées</h4>
                <div className="space-y-3">
                  {project.methodology.map((step, idx) => {
                    const parts = step.split(":");
                    const title = parts[0];
                    const desc = parts.slice(1).join(":");
                    return (
                      <div key={idx} className={`flex gap-3 text-sm ${isDarkMode ? "text-neutral-300" : "text-neutral-700"} leading-relaxed`}>
                        <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                          {desc ? (
                            <p>
                              <strong className={`${isDarkMode ? "text-neutral-150" : "text-neutral-900"} font-medium`}>{title}:</strong>
                              {desc}
                            </p>
                          ) : (
                            <p>{step}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quantified High KPIs and Results */}
              <div className={`space-y-4 border-t ${mBorderMuted} pt-6`}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Résultats & Valeur Ajoutée
                </h4>
                
                {/* Result Badges */}
                <div className="flex flex-wrap gap-2">
                  {project.results.kpis.map((kpi, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-300"
                    >
                      {kpi}
                    </span>
                  ))}
                </div>

                {/* Performance Bullet Lists */}
                <ul className={`space-y-2.5 text-sm ${isDarkMode ? "text-neutral-300" : "text-neutral-700"} pl-1 list-disc list-inside`}>
                  {project.results.details.map((detail, idx) => (
                    <li key={idx} className="leading-relaxed marker:text-emerald-500">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer Contact Reminder & Live Solution Action */}
            <div className={`bg-neutral-950 ${isDarkMode ? "bg-neutral-950" : "bg-neutral-100"} p-4 border-t ${mBorderMuted} flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${mTextSubtle}`}>
              {(project.id === "totalenergies" || project.id === "lgcf") ? (
                <a
                  href="https://unisme.juliensaliou.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackUnismeClick("modal_projet_" + project.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-xs transition"
                >
                  <span>Découvrir la solution SMÉ ISO 50001 en direct ↗</span>
                </a>
              ) : project.id === "junivers" ? (
                <a
                  href="https://junivers.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-xs transition"
                >
                  <span>Visiter la plateforme Junivers ↗</span>
                </a>
              ) : (
                <div />
              )}
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/in/juliencr6/" target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? "text-neutral-300" : "text-neutral-700"} font-semibold hover:underline`}>
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
