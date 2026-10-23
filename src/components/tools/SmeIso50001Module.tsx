import React from "react";
import { Factory, CheckCircle2, Cpu, TrendingDown, Activity, ExternalLink } from "lucide-react";

export default function SmeIso50001Module() {
  return (
    <div className="space-y-8">
      {/* Module Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-mono">
            <Factory className="w-3.5 h-3.5 text-emerald-400" />
            <span>Norme Internationale ISO 50001:2018 • Système de Management de l'Énergie</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            SME ISO 50001 Digitalisé & Performance Industrielle
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Passez de la facture énergétique subie au pilotage millimétré de vos flux d'usine. Modélisez vos <strong>Usages Énergétiques Significatifs (UES / SEU)</strong>, suivez vos Indicateurs de Performance Énergétique (IPÉ) corrélés aux variables d'influence (DJU, tonnages) et pérennisez vos gains grâce au cycle d'amélioration continue <strong>PDCA</strong>.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Conforme Exigences ISO 50001:2018</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-sky-400" />
              <span>Architecture Sous-Comptage IoT Ready</span>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5 text-amber-400" />
              <span>Valorisation Fiches CEE Industrielles</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Application Showcase Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold">
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            <span>Démonstrateur Interactif • Solution SMÉ ISO 50001</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Plateforme Digitale de Management Énergétique
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed">
            Accédez directement à la modélisation en direct de la solution SMÉ ISO 50001 (plan de comptage IoT, revue énergétique initiale, suivi des indicateurs IPÉ et cycle PDCA d'amélioration continue).
          </p>

          <div className="pt-2">
            <a
              href="https://ai.studio/apps/6b93ee19-58d9-422f-9bee-477b083a91de?fullscreenApplet=true"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all group"
            >
              <span>Découvrir la solution SMÉ ISO 50001 en direct ↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
