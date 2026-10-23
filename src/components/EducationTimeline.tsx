import { CERTIFICATIONS } from "../data";
import { GraduationCap, Award, Calendar, BookOpen } from "lucide-react";

export default function EducationTimeline() {
  return (
    <div className="relative border-l border-neutral-800 ml-4 sm:ml-6 space-y-8 py-4" id="education-timeline">
      {CERTIFICATIONS.map((cert, idx) => {
        const isBlackBelt = cert.title.toLowerCase().includes("six sigma");
        return (
          <div key={idx} className="relative pl-8 sm:pl-10 group" id={`education-node-${idx}`}>
            {/* Pulsing Timeline Dot */}
            <div
              className={`absolute -left-[17px] top-1.5 flex h-8 w-8 items-center justify-center rounded-full border shadow-md transition-all duration-300 ${
                isBlackBelt
                  ? "bg-emerald-500 border-emerald-400 text-neutral-950 scale-110"
                  : "bg-neutral-950 border-neutral-800 text-neutral-400 group-hover:border-emerald-500 group-hover:text-emerald-400"
              }`}
            >
              {isBlackBelt ? <Award className="h-4 w-4" /> : <GraduationCap className="h-4 w-4" />}
            </div>

            {/* Content box */}
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 group-hover:bg-neutral-900/70 group-hover:border-neutral-700 transition duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-850 pb-3 mb-3">
                <span className="flex items-center gap-1.5 font-mono text-xs text-emerald-400">
                  <Calendar className="h-3.5 w-3.5" />
                  {cert.year}
                </span>
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                  {cert.organization}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                {cert.title}
              </h3>
              
              <p className="mt-2 text-sm text-neutral-400 leading-relaxed font-sans">
                {cert.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
