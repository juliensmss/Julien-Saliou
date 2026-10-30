import React, { useState, useEffect } from "react";
import { Cookie, ShieldCheck, X } from "lucide-react";
import { getStoredConsent, updateGAConsent } from "../lib/analytics";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(true);

  useEffect(() => {
    const consent = getStoredConsent();
    if (!consent) {
      // Affichage après un léger délai pour ne pas gêner le premier affichage
      const timer = setTimeout(() => {
        setIsVisible(true);
        setHasAnswered(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    updateGAConsent(true);
    setIsVisible(false);
    setHasAnswered(true);
  };

  const handleDecline = () => {
    updateGAConsent(false);
    setIsVisible(false);
    setHasAnswered(true);
  };

  const handleOpenPreferences = () => {
    setIsVisible(true);
  };

  return (
    <>
      {/* Bandeau flottant discret */}
      {isVisible && (
        <div
          role="region"
          aria-label="Consentement cookies"
          className="fixed bottom-4 right-4 left-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-50 bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl rounded-2xl p-5 text-slate-800 animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl shrink-0 mt-0.5">
              <Cookie className="w-5 h-5" />
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span>Mesure d'audience & Confidentialité</span>
                </h4>
                <button
                  type="button"
                  onClick={handleDecline}
                  className="text-slate-400 hover:text-slate-600 p-1 -mr-1 rounded-lg transition"
                  aria-label="Fermer et refuser"
                  title="Fermer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Ce site utilise <strong>Google Analytics</strong> (ID anonymisé) afin d'analyser la fréquentation et perfectionner l'expérience de navigation, dans le respect de votre vie privée (RGPD).
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleAccept}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition cursor-pointer"
                >
                  Accepter
                </button>
                <button
                  type="button"
                  onClick={handleDecline}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl transition cursor-pointer"
                >
                  Refuser
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Petit déclencheur discret en pied de page pour rouvrir si souhaité */}
      {hasAnswered && !isVisible && (
        <button
          type="button"
          onClick={handleOpenPreferences}
          className="fixed bottom-3 left-3 z-40 text-[11px] font-mono text-slate-500 hover:text-slate-800 bg-white/80 hover:bg-white backdrop-blur-xs px-2.5 py-1 rounded-lg border border-slate-200/80 shadow-xs transition inline-flex items-center gap-1.5 cursor-pointer opacity-70 hover:opacity-100"
          title="Modifier mes préférences de cookies"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Gestion des cookies</span>
        </button>
      )}
    </>
  );
}
