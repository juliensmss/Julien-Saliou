import React, { useState, useEffect } from "react";
import Navbar, { SystemiaTab } from "./components/Navbar";
import PortfolioView from "./components/PortfolioView";
import ToolsSimulators from "./components/ToolsSimulators";
import ContactInvitations from "./components/ContactInvitations";
import CookieBanner from "./components/CookieBanner";
import { trackTabChange } from "./lib/analytics";

export default function App() {
  const [activeTab, setActiveTab] = useState<SystemiaTab>("portfolio");

  const handleTabChange = (tab: SystemiaTab) => {
    setActiveTab(tab);
    trackTabChange(tab);
  };

  useEffect(() => {
    // Initial page/tab view tracking
    trackTabChange("portfolio");
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-emerald-600 selection:text-white">
      {/* 1. Global Navigation Bar with 3 Tabs */}
      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />

      {/* 2. Main Content Tab Container */}
      <main className="flex-1 w-full">
        {activeTab === "portfolio" && (
          <div className="w-full">
            {/* Portfolio View with contact and solutions navigation callbacks */}
            <PortfolioView 
              onNavigateToContact={() => handleTabChange("contact")} 
              onNavigateToTools={() => handleTabChange("tools")}
            />
          </div>
        )}

        {activeTab === "tools" && (
          <div className="w-full">
            {/* Tab 2: Solutions */}
            <ToolsSimulators />
          </div>
        )}

        {activeTab === "contact" && (
          <div className="w-full">
            {/* Tab 3: Contact & Invitations */}
            <ContactInvitations />
          </div>
        )}
      </main>

      {/* 3. Bandeau RGPD discret de gestion des cookies */}
      <CookieBanner />
    </div>
  );
}
