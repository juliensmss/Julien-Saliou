import React, { useState } from "react";
import Navbar, { SystemiaTab } from "./components/Navbar";
import PortfolioView from "./components/PortfolioView";
import ToolsSimulators from "./components/ToolsSimulators";
import ContactInvitations from "./components/ContactInvitations";

export default function App() {
  const [activeTab, setActiveTab] = useState<SystemiaTab>("portfolio");

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-emerald-600 selection:text-white">
      {/* 1. Global Navigation Bar with 3 Tabs */}
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 2. Main Content Tab Container */}
      <main className="flex-1 w-full">
        {activeTab === "portfolio" && (
          <div className="w-full">
            {/* Portfolio View with contact and solutions navigation callbacks */}
            <PortfolioView 
              onNavigateToContact={() => setActiveTab("contact")} 
              onNavigateToTools={() => setActiveTab("tools")}
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
    </div>
  );
}
