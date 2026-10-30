/**
 * Google Analytics 4 (GA4) Tracking & Consent Management
 * ID de Mesure : G-R0F2BCPFXJ
 */

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export const GA_MEASUREMENT_ID = "G-R0F2BCPFXJ";

/**
 * Envoi d'un événement générique vers Google Analytics
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

/**
 * Suivi de navigation par onglet (Portfolio, Solutions, Contact)
 */
export function trackTabChange(tabName: string) {
  trackEvent("tab_navigation", {
    tab_name: tabName,
    page_title: `Onglet ${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`,
    event_category: "navigation",
    event_label: `Navigation vers ${tabName}`
  });
}

/**
 * Suivi d'ouverture de dossier projet (Danone, ExxonMobil, TotalEnergies, etc.)
 */
export function trackProjectView(projectId: string, projectTitle: string, client?: string) {
  trackEvent("project_view", {
    project_id: projectId,
    project_title: projectTitle,
    client: client || "Non précisé",
    event_category: "portfolio",
    event_label: `${client ? `[${client}] ` : ""}${projectTitle}`
  });
}

/**
 * Suivi des clics vers la plateforme Unisme (https://unisme.juliensaliou.com/)
 */
export function trackUnismeClick(sourceLocation: string) {
  trackEvent("click_unisme", {
    destination_url: "https://unisme.juliensaliou.com/",
    source_location: sourceLocation,
    event_category: "external_link",
    event_label: `Clic Unisme depuis ${sourceLocation}`
  });
}

/**
 * Suivi de conversion : envoi réussi du formulaire de contact
 */
export function trackContactSubmit(subject: string, profile: string) {
  trackEvent("contact_submission", {
    contact_subject: subject,
    contact_profile: profile,
    event_category: "conversion",
    event_label: `Message envoyé - ${subject}`
  });
}

/**
 * Mise à jour du statut de consentement RGPD (Google Consent Mode v2)
 */
export function updateGAConsent(granted: boolean) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: granted ? "granted" : "denied"
    });
  }
  try {
    localStorage.setItem("ga_consent_status", granted ? "granted" : "denied");
  } catch (e) {
    // LocalStorage indisponible
  }
}

/**
 * Récupération du consentement enregistré
 */
export function getStoredConsent(): "granted" | "denied" | null {
  if (typeof window === "undefined") return null;
  try {
    return (localStorage.getItem("ga_consent_status") as "granted" | "denied") || null;
  } catch (e) {
    return null;
  }
}
