import React from "react";
import {
  Briefcase,
  SlidersHorizontal,
  Mail
} from "lucide-react";

export type SystemiaTab = "portfolio" | "tools" | "contact";

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
      label: "Solutions",
      badge: "Solutions Web",
      icon: SlidersHorizontal,
      color: "hover:text-amber-700"
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
    <header className="sticky top-0 z-40 w-full bg-slate-100/95 backdrop-blur-md border-b border-slate-300 shadow-xs text-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[65px] gap-2 sm:gap-4">
          
          {/* Left: Julien Saliou Brand with Logo Infini */}
          <div
            onClick={() => onTabChange("portfolio")}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            title="Julien Saliou - Portfolio"
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-300 p-1 shadow-xs group-hover:scale-105 group-hover:border-slate-400 transition-all flex items-center justify-center overflow-hidden">
              <img
                src="/logo-infinity.png"
                alt="Julien Saliou Logo"
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight font-sans text-black group-hover:text-slate-800 transition-colors block leading-tight">
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
                    className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs transition whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "bg-white text-slate-900 shadow-xs font-bold border border-slate-300"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 font-medium"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? "text-emerald-600" : "text-slate-500"
                      }`}
                    />
                    <span>{tab.label}</span>

                    {/* Active bottom line indicator with green/blue gradient */}
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Spacer (hidden on mobile) to ensure exact optical centering on desktop */}
          <div className="hidden lg:block shrink-0 w-[160px] pointer-events-none" aria-hidden="true" />

        </div>
      </div>
    </header>
  );
}
