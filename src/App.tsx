import React, { useState } from "react";
import Navbar, { SystemiaTab } from "./components/Navbar";
import PortfolioView from "./components/PortfolioView";
import ResearchInnovationDocs from "./components/ResearchInnovationDocs";
import ToolsSimulators from "./components/ToolsSimulators";
import ContactInvitations from "./components/ContactInvitations";

export default function App() {
  const [activeTab, setActiveTab] = useState<SystemiaTab>("portfolio");

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 font-sans selection:bg-emerald-600 selection:text-white">
      {/* 1. Global Navigation Bar with SYSTEMIA title and 4 Tabs */}
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 2. Main Content Tab Container */}
      <main className="flex-1 w-full">
        {activeTab === "portfolio" && (
          <div className="w-full">
            {/* Existing Portfolio View with contact navigation callback */}
            <PortfolioView onNavigateToContact={() => setActiveTab("contact")} />
          </div>
        )}

        {activeTab === "tools" && (
          <div className="w-full">
            {/* Tab 2: Outils & Simulateurs (SCAN-FOCUS-ACT, Eau, Solaire) */}
            <ToolsSimulators />
          </div>
        )}

        {activeTab === "canvas" && (
          <div className="w-full">
            {/* Tab 3: Recherche & Innovation (Dispositif Google Docs Admin/Visiteur) */}
            <ResearchInnovationDocs />
          </div>
        )}

        {activeTab === "contact" && (
          <div className="w-full">
            {/* Tab 4: Contact & Invitations */}
            <ContactInvitations />
          </div>
        )}
      </main>
    </div>
  );
}
