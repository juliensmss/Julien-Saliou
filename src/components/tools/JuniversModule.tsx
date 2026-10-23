import React from "react";
import { ExternalLink, Sparkles } from "lucide-react";

export default function JuniversModule() {
  return (
    <div className="space-y-6">
      {/* Redirection Showcase Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm overflow-hidden">
        <div className="max-w-3xl space-y-4 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Plateforme Dédiée • junivers.fr</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Junivers : L'Introspection & le Développement Personnel Augmenté par l'IA
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed">
            Retrouvez l'intégralité de la plateforme, des modules d'introspection et de cartographie de personnalité directement sur le site dédié <strong>Junivers</strong>.
          </p>

          <div>
            <a
              href="https://junivers.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all group"
            >
              <span>Accéder à la plateforme Junivers</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Visual Preview of Junivers */}
        <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 shadow-inner group">
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 border-b border-slate-200 text-xs text-slate-500 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
              <span className="ml-2 text-slate-600 font-semibold truncate">https://junivers.fr</span>
            </div>
            <a
              href="https://junivers.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-purple-700 hover:text-purple-900 font-semibold text-[11px]"
            >
              <span>Ouvrir le site</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <a
            href="https://junivers.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="block relative overflow-hidden focus:outline-none"
            title="Cliquer pour ouvrir https://junivers.fr/"
          >
            <img
              src="/assets/aistudio/image_66d5ce71.png"
              alt="Aperçu du site Junivers - junivers.fr"
              className="w-full h-auto object-cover object-top hover:opacity-95 transition-opacity"
            />
            <div className="absolute inset-0 bg-slate-900/0 hover:bg-slate-900/10 transition-colors flex items-center justify-center pointer-events-none">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 rounded-xl bg-slate-950/80 text-white text-xs font-semibold backdrop-blur-sm shadow-lg flex items-center gap-2">
                <span>Visiter junivers.fr</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
