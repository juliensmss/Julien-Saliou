import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { JULIEN_PROFILE, PROJECTS, EXPERIENCES, SKILLS, TECH_STACK, CERTIFICATIONS } from "./src/data";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper to format CV as text for the AI system instruction
function getCVText(): string {
  return `
NOM: ${JULIEN_PROFILE.name}
POSTE PRINCIPAL: ${JULIEN_PROFILE.title}
SOUS-TITRE: ${JULIEN_PROFILE.subTitle}
BIO: ${JULIEN_PROFILE.summary}
EXPÉRIENCE GLOBALE: ${JULIEN_PROFILE.yearsOfExp}+ ans

COORDONNÉES:
- Email: ${JULIEN_PROFILE.email}
- Téléphone: ${JULIEN_PROFILE.phone}
- LinkedIn: ${JULIEN_PROFILE.linkedin}

EXPÉRIENCES PROFESSIONNELLES DURANT SA CARRIÈRE:
${EXPERIENCES.map(e => `
* PÉRIODE: ${e.period}
  POSTE: ${e.title}
  ENTREPRISE: ${e.organization}
  LIEU: ${e.location}
  RÉALISATIONS ET DÉTAILS:
  ${e.details.map(d => `- ${d}`).join("\n  ")}
`).join("\n")}

PROJETS PHARES PARTICULIERS:
${PROJECTS.map(p => `
* PROJET: ${p.title} sur le créneau "${p.category}"
  CLIENT/ENTREPRISE: ${p.client}
  DURÉE: ${p.duration} | LIEU: ${p.location}
  RÉSUMÉ: ${p.summary}
  PRÉSENTATION: ${p.presentation}
  MÉTHODOLOGIE / ACTIONS:
  ${p.methodology.map(m => `- ${m}`).join("\n  ")}
  RÉSULTATS DE HAUTE PERFORMANCE:
  - Indicateurs Clés: ${p.results.kpis.join(", ")}
  - Détails:
    ${p.results.details.map(rd => `* ${rd}`).join("\n    ")}
`).join("\n")}

COMPÉTENCES ET EXPERTISES CLÉS:
${SKILLS.map(sc => `
* ${sc.title}:
  ${sc.skills.map(s => `- ${s}`).join("\n  ")}
`).join("\n")}

STACK TECHNIQUE & LOGICIELS PILOTÉS:
- Méthodologies: ${TECH_STACK.methods.join(", ")}
- Intelligence Artificielle & Innovation: ${TECH_STACK.ia.join(", ")}
- Protocoles & IoT d'usine: ${TECH_STACK.iot.join(", ")}
- Systèmes de Data & Supervision: ${TECH_STACK.systems.join(", ")}

FORMATIONS & CERTIFICATIONS OBTENUES:
${CERTIFICATIONS.map(c => `
- ${c.year} | ${c.title} délivré par ${c.organization}
  Description: ${c.description}
`).join("\n")}
`;
}

// AI Copilot route
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Séquence de messages manquante ou invalide" });
  }

  const userQuery = messages[messages.length - 1]?.content || "";

  // Lazy initialize Google Gen AI safely
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    // Elegant fallback response if API Key is not set yet in environment
    console.warn("GEMINI_API_KEY environment variable is not configured or placeholder.");
    return res.json({
      text: `Bonjour ! Je suis l'assistant IA de Julien Saliou. 
             *(⚠️ Note: L'API Key Gemini n'est pas configurée dans les secrets de l'application, je réponds donc en mode hors-ligne).*

             Voici ce que je peux vous dire sur Julien d'après son curriculum :
             - **15+ ans d'expérience** dans des industries critiques (SEVESO, EDF Nucléaire) et le conseil stratégique.
             - **Expert certifié Lean Six Sigma Black Belt** (réduction de variabilité d'usinage, DMAIC, VSM).
             - **Énergie & IoT**: Certification ISO 50001 de 14 sites industriels chez Les Grands Chais de France.
             - **Digitalisation**: Déploiement de solutions MES (OEE) chez Danone et Thales Europe.

             N'hésitez pas à poser n'importe quelle question ciblée ou à m'envoyer un mail à ju.saliou@gmail.com pour rentrer directement en contact !`,
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const systemPrompt = `
Tu es "Julien Saliou AI Copilot", un assistant virtuel extrêmement poli, professionnel, technique et ingénieux inséré sur le portfolio web de Julien Saliou.
Ton but est de renseigner les recruteurs, collègues et clients potentiels de manière hyper-qualitativée et fluide.

Voici les règles que tu dois impérativement respecter :
1. Tu tires tes réponses exclusivement des détails du CV de Julien ci-dessous. Ne fabrique pas/n'hallucine pas de projets ou certifications inexistants.
2. Formule tes réponses d'un ton chaleureux, humble et rigoureux, digne d'un consultant d'excellence.
3. Réponds principalement en Français. Si l'interlocuteur te questionne en Anglais, réponds-lui en Anglais avec la même rigueur.
4. Rends tes réponses structurées, courtes et très scannables en utilisant du Markdown (gras, puces).
5. Mets particulièrement en valeur ses compétences clés : Black Belt Lean Six Sigma, ISO 50001, MES (OEE), d'Automatismes EDF (CNPE de Paluel) et de projets SEVESO chez ExxonMobil. Mentionne aussi son projet innovant "Junivers" basé sur l'IA.

Voici le dossier de compétences de Julien Saliou :
=======================================
${getCVText()}
=======================================

Fin du dossier. Réponds à la question de l'utilisateur de manière pragmatique.
`;

    // Map message list to Gemini structure
    // Since ai.models.generateContent supports standard input, we can pass systemInstruction
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userQuery,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    return res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({
      error: "Une erreur est survenue lors du traitement de la requête IA.",
      text: "Désolé, j'ai rencontré un petit problème technique de communication avec mon noyau d'intelligence. Écrivez plutôt à Julien directement à l'adresse ju.saliou@gmail.com !",
    });
  }
});

async function startServer() {
  // Vite dev middleware connection
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite HMR middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
