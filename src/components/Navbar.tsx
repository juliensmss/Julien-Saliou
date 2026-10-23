import React from "react";
import {
  Briefcase,
  Compass,
  SlidersHorizontal,
  Mail
} from "lucide-react";

export type SystemiaTab = "portfolio" | "canvas" | "tools" | "contact";

interface NavbarProps {
  activeTab: SystemiaTab;
  onTabChange: (tab: SystemiaTab) => void;
}

export default function Navbar({ activeTab, onTabChange }: NavbarProps) {
  const tabs = [
    {
      id: "portfolio" as const,
      label: "Portfolio",
      badge: "Existant Intact",
      icon: Briefcase,
      color: "hover:text-emerald-700"
    },
    {
      id: "tools" as const,
      label: "Outils",
      badge: "SCAN-FOCUS-ACT",
      icon: SlidersHorizontal,
      color: "hover:text-amber-700"
    },
    {
      id: "canvas" as const,
      label: "Recherche & Innovation",
      badge: "Google Docs",
      icon: Compass,
      color: "hover:text-sky-700"
    },
    {
      id: "contact" as const,
      label: "Contact",
      badge: "Contact",
      icon: Mail,
      color: "hover:text-purple-700"
    }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[65px] gap-2 sm:gap-4">
          
          {/* Left: Julien Saliou Brand with Logo JS */}
          <div
            onClick={() => onTabChange("portfolio")}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
            title="Julien Saliou - Portfolio"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 via-sky-600 to-indigo-600 p-0.5 shadow-md group-hover:scale-105 transition-transform overflow-hidden">
              <img src="/favicon.svg" alt="Julien Saliou Logo" className="w-full h-full rounded-[6px] object-contain bg-slate-950 p-0.5" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-wider font-mono text-white group-hover:text-emerald-400 transition-colors">
                Julien Saliou
              </span>
            </div>
          </div>

          {/* Center: 4 Main Tabs Nav */}
          <div className="flex-1 flex justify-center">
            <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`relative flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-xl text-xs font-medium transition whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "bg-slate-800 text-white shadow-inner font-semibold border border-slate-700"
                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? "text-emerald-400" : "text-slate-400"
                      }`}
                    />
                    <span>{tab.label}</span>

                    {/* Active bottom line indicator */}
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Spacer (hidden on mobile) to ensure exact optical centering on desktop */}
          <div className="hidden md:block shrink-0 w-[140px] pointer-events-none" aria-hidden="true" />

        </div>
      </div>
    </header>
  );
}
