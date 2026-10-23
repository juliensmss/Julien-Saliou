import { Project, Experience, SkillCategory, Certification } from "./types";

export const JULIEN_PROFILE = {
  name: "Julien Saliou",
  title: "Ingénieur Généraliste",
  subTitle: "Expert Performance Industrielle & Énergétique | Certified Lean Six Sigma Black Belt",
  summary: "Aujourd'hui, avec plus de 15 années d'expérience, j’ai développé une double expertise : une maîtrise robuste des enjeux métiers alliée à une vision stratégique de conseil. Passionné par les systèmes complexes, je cultive également une forte curiosité pour les sciences humaines et l'innovation digitale, cherchant toujours à lier la rigueur de l'ingénieur à la compréhension du facteur humain. Porté par cette approche globale, mon ambition est de piloter la transformation des systèmes complexes en concevant des architectures d’excellence opérationnelle, capables d'aligner l'efficience industrielle, la sobriété des ressources et l'agilité organisationnelle face aux mutations environnementales.",
  yearsOfExp: 15,
  email: "ju.saliou@gmail.com",
  phone: "+33767917023",
  linkedin: "https://www.linkedin.com/in/juliencr6/",
  cvUrl: "#", // User click will open a nice print/dialog mockup with options to download or print
};

export const PROJECTS: Project[] = [
  {
    id: "exxonmobil",
    title: "Maintenannce & Optimisation de Production",
    client: "ExxonMobil",
    duration: "4 ans",
    location: "Plateforme Port Jerome (France/Normandie)",
    category: "energy",
    image: "/exxonMobil.jpg",
    summary: "Amélioration du rendement de production d'une unité d'alkylation par régulation PID dynamique et variateur de vitesse sur site SEVESO Seuil Haut.",
    presentation: "Dans le cadre du service 'Projets IEA', j'ai été chargé d'améliorer le rendement de production d'une unité d'alkylation. L'enjeu majeur était de stabiliser un processus de neutralisation peu efficace qui entraînait un encrassement prématuré des équipements, une maintenance curative trop fréquente et une surconsommation de produits chimiques.",
    methodology: [
      "Analyse du besoin & études : Identification d'un surdimensionnement critique. La pompe existante fonctionnait à 3000 tr/min pour un débit de 40m3/h, alors que le besoin réel du procédé n'était que de 8m3/h.",
      "Conception de la solution : Étude comparative et application des lois de similitude pour valider que la variation de vitesse (VFD) était la solution la plus performante en termes de précision et d'efficacité énergétique.",
      "Pilotage technique : Remplacement du système de laminage manuel par un variateur de vitesse (VFD) piloté dynamiquement via le système SCADA.",
      "Coordination de chantier : Planification et supervision des corps de métiers (mécanique, électrique, instrumentation) durant une fenêtre de tir critique de seulement 10 jours d'arrêt d'unité.",
      "Mise en service : Paramétrage fin de la boucle de régulation PID et tests de communication avec la salle de contrôle."
    ],
    results: {
      kpis: ["Qualité Doublée", "Maintenance Divisée", "Sûreté Sans Faille"],
      details: [
        "Le taux de soude libre en sortie, indicateur clé, a été ramené de 15 % à 7 %.",
        "La périodicité de nettoyage et de maintenance des pompes est passée de 2 mois à 6 mois.",
        "Réduction de la consommation de réactifs chimiques et optimisation de la facture électrique.",
        "Respect strict des normes SEVESO avec redémarrage effectué à l'heure exacte."
      ]
    }
  },
  {
    id: "edf",
    title: "Maintenance Automatisme & Sûreté Nucléaire",
    client: "EDF (CNPE de Paluel)",
    duration: "5 ans et 2 mois",
    location: "CNPE Paluel (France/Normandie)",
    category: "energy",
    image: "/edf.png",
    summary: "Interventions & Coordination Technique en Automatisme pour garantir la disponibilité et la fiabilité des systèmes de contrôle-commande de la centrale nucléaire.",
    presentation: "En tant que Coordinateur Technique en Automatisme, ma mission consistait à garantir la disponibilité et la fiabilité des systèmes de contrôle-commande et des automatismes industriels du site. Dans un environnement à haute criticité où la sûreté nucléaire est la priorité absolue, j'ai assuré le pilotage des interventions techniques and la résolution de problématiques complexes.",
    methodology: [
      "Coordination opérationnelle : Pilotage et planification des interventions de maintenance (préventive/curative) en automatisme en liaison directe avec le planning de tranche.",
      "Diagnostic & Expertise : Analyse de pannes complexes sur des systèmes automatisés critiques pour identifier les causes racines et limiter l'indisponibilité.",
      "Ingénierie de maintenance : Programmation, ajustement et mise à jour de programmes automates. Travaux de fiabilisation des boucles de régulation et sécurité.",
      "Gestion de l'Arrêt de Tranche : Coordination d'activités intenses lors de fenêtres denses pour respecter les jalons de redémarrage.",
      "Sûreté & Radioprotection : Application stricte des procédures nucléaires (Habilitation PR2) lors des interventions en zone contrôlée."
    ],
    results: {
      kpis: ["7 Arrêts de Tranche", "2 Visites Décennales", "Zéro Incident"],
      details: [
        "Participation réussie à 7 arrêts de tranche, dont 2 visites décennales (VD3) majeures.",
        "Garantie absolue du respect des plannings de redémarrage face aux aléas techniques de dernière minute.",
        "Réduction significative des pannes récurrentes par l'optimisation des programmes automates.",
        "Absence de tout incident de sûreté sur le périmètre automatisme."
      ]
    }
  },
  {
    id: "lgcf",
    title: "Système EMS (IoT & Supervision Digitale)",
    client: "Les Grands Chais de France (LGCF)",
    duration: "1 an",
    location: "Bordeaux & 14 sites de production (France/Aquitaine)",
    category: "energy",
    image: "/LGCF.jpg",
    summary: "Déploiement d'une architecture IoT de supervision énergétique multi-site et accompagnement vers la certification ISO 50001.",
    presentation: "Dans un contexte de forte volonté de réduction de l'empreinte carbone, j'ai piloté le déploiement d'une architecture numérique permettant de monitorer et d'optimiser la consommation énergétique du groupe. L'enjeu était de transformer les données de 14 sites hétérogènes en indicateurs de performance exploitables.",
    methodology: [
      "Audit de connectivité : Analyse technique des 14 sites pour identifier les points de comptage critiques (Électricité, Gaz, Eau, Vapeur).",
      "Déploiement d'architecture IoT : Intégration de capteurs connectés via le protocole sans fil à longue portée LoRaWAN.",
      "Intégration SI : Centralisation de tous les flux de données vers une plateforme de supervision énergétique globale.",
      "Management de Projet : Alignement des prestataires, responsables de maintenance site et équipes IT sous contrat d'apprentissage d'ingénieur CESI."
    ],
    results: {
      kpis: ["14 Sites Connectés", "Capteurs LoRaWAN", "Certifié ISO 50001"],
      details: [
        "Mise en place de tableaux de bord IPÉ (Indicateurs de Performance Énergétique) par ligne.",
        "Création d'un modèle de comptage standardisé et réplicable sur l'ensemble du groupe.",
        "Obtention et maintien de la certification énergétique ISO 50001.",
        "Détection immédiate des dérives pour des économies financières et de carbone instantanées."
      ]
    }
  },
  {
    id: "danone",
    title: "MES (OEE) Intelligence Opérationnelle",
    client: "Danone",
    duration: "4 mois",
    location: "Danone Pays de Bray (France/Normandie)",
    category: "digital",
    image: "/danone.png",
    summary: "Numérisation de reporting et contextualisation de données via OSIsoft PI System sur 13 lignes de production laitières (Produits laitiers frais).",
    presentation: "L'objectif majeur de ce projet était de numériser et contextualiser les données de production pour remplacer l'ancien système de saisie manuelle. J'ai piloté le développement d'une solution basée sur la technologie OSIsoft PI pour capturer, filtrer et visualiser les indicateurs de performance (KPI) en temps réel sur 13 lignes de production, en commençant par une ligne pilote stratégique.",
    methodology: [
      "Analyse du Besoin & Cadrage : Rédaction des spécifications fonctionnelles détaillant la collecte des données provenant des automates (Siemens, WinCC) via des serveurs OPC.",
      "Modélisation Asset Framework (PI AF) : Structuration des données selon les standards industriels pour représenter chaque actif physique (cuves, conditionneuses, suremballeuses) de manière uniforme.",
      "Définition du Modèle de Temps : Adaptation de la décomposition des temps (Temps disponible, Temps de production, Temps de production net) pour calculer automatiquement le TRS et l'OEE (Efficacité Globale de l'Équipement).",
      "Visualisation PI Vision : Conception d'écrans de bord personnalisés pour différents profils (Opérateur, Chef d'équipe, Manager) permettant la justification des arrêts et le suivi des pertes."
    ],
    results: {
      kpis: ["Automatisation du Reporting", "Justification Intelligente", "Standardisation Groupe", "Formation & Adoption"],
      details: [
        "Catégorisation automatique des arrêts machines à l'aide des codes défauts issus des automates, réduisant ainsi drastiquement les erreurs de saisie manuelle.",
        "Mise en place d'une interface de justification intuitive permettant aux opérateurs de documenter les causes d'arrêts (défauts techniques, changements de format, nettoyages) en quelques clics.",
        "Création d'un modèle d'installation (Blue Print) servant de référence pour les déploiements futurs sur d'autres sites industriels du groupe.",
        "Organisation de sessions de formation pour les administrateurs et utilisateurs finaux afin de garantir l'appropriation immédiate de l'outil."
      ]
    }
  },
  {
    id: "totalenergies",
    title: "ISO 50001 - Accompagnement",
    client: "TotalEnergies",
    duration: "1 an",
    location: "International (Europe, Moyen-Orient, Afrique)",
    category: "energy",
    image: "/totalEnergies.jpg",
    summary: "Pilotage et déploiement de l'offre d'assistance certifiable ISO 50001 pour la branche Exploration-Production.",
    presentation: "Au sein de GreenFlex, j'ai développé et piloté l'offre stratégique dédiée à l'ISO 50001 pour le compte du groupe TotalEnergies. Mon rôle consistait à coordonner une équipe de 30 ingénieurs et à accompagner les entités internationales de la branche Exploration-Production dans la mise en œuvre de systèmes de management de l'énergie performants et certifiables.",
    methodology: [
      "Développement de l'Offre : Structuration de la proposition commerciale, veille concurrentielle et animation technique de la communauté d'ingénieurs experts.",
      "Diagnostics de Maturité : Évaluation du niveau de performance énergétique des sites et identification des écarts par rapport à la norme internationale.",
      "Accompagnement Stratégique : Définition des plans de comptage, formation des équipes locales et coaching des responsables énergie sur site.",
      "Audit & Gouvernance : Réalisation d'audits internes rigoureux pour préparer les entités aux audits de certification tierce partie."
    ],
    results: {
      kpis: ["Accompagnement & Certifications", "Pilotage de la Performance", "Leadership Transverse", "6 pays certifiés"],
      details: [
        "Obtention de la certification ISO 50001 pour des entités majeures dans des contextes complexes : France (Marketing Services), Qatar, Nigeria, Angola, Congo, Danemark.",
        "Standardisation des méthodes de reporting énergétique à l'échelle mondiale pour la branche Exploration-Production du Groupe.",
        "Animation d'un réseau de 30 experts permettant une capitalisation efficace des bonnes pratiques entre les différentes zones géographiques."
      ]
    }
  },
  {
    id: "log-brewery",
    title: "Projets Lean & Lean Six Sigma",
    client: "Brasserie B&B & Usine Aéronautique",
    duration: "3 semaines / 3 mois",
    location: "France",
    category: "lean",
    image: "/log-brewery.jpg",
    summary: "Ce volet regroupe deux projets majeurs d'excellence opérationnelle : l'optimisation Lean des flux de transit de camions et la réduction de variabilité d'usinage de précision via la méthodologie Six Sigma (DMAIC).",
    presentation: "Ce volet rassemble deux projets majeurs d'amélioration de la performance :\n\n1 - Optimisation de flux logistique - Brasserie B&B\nDurée : 3 semaines.\nEnvironnement : Secteur Agroalimentaire (Logistique & Distribution).\nLieu : Site de production et plateforme logistique.\nPrésentation de la mission : Dans un contexte de forte croissance (pic de demande lié à la coupe du monde), la brasserie était confrontée à une saturation de ses quais, limitant les expéditions à 120 camions/jour pour un besoin de 150. L'enjeu était d'augmenter la capacité de chargement de 25% sans investissement lourd, en éliminant les gaspillages et en optimisant l'efficience opérationnelle des caristes.\n\n2 - Optimisation de procédé d'usinage (Méthodologie Six Sigma)\nDurée : 3 mois.\nEnvironnement : Secteur Industriel / Usinage de précision.\nLieu : Lyon, France.\nPrésentation de la mission : Dans le cadre de l'amélioration de la qualité de production, l'objectif était d'analyser et de réduire la variabilité du diamètre de perçage (Y) sur une ligne de production. La mission consistait à identifier, parmi de nombreux facteurs d'influence qualitatifs et quantitatifs (X), ceux ayant un impact significatif sur la conformité des pièces afin de stabiliser le procédé et d'atteindre les objectifs de capabilité machine.",
    methodology: [
      "1 [Lean] Analyse de Déroulement (AD) : Observation terrain et chronométrage des cycles complets pour quantifier la Valeur Ajoutée (VA) et identifier les activités à Non-Valeur Ajoutée (NVA).",
      "1 [Lean] Cartographie des gaspillages : Identification des causes d'inefficience (attentes administratives, déplacements à vide, doubles manipulations de palettes).",
      "1 [Lean] Réingénierie du processus : Mise en place d'une zone tampon pour dissocier le déchargement du quai du stockage final, et synchronisation des flux documentaires (BL, factures) dès l'arrivée du chauffeur.",
      "1 [Lean] Optimisation matérielle : Préconisation de l'utilisation de chariots à doubles fourches pour diviser par deux le nombre de trajets lors de la manutention des palettes vides et pleines.",
      "2 [Six Sigma] Étude de la normalité : Analyse statistique des données via le test du Khi-deux et construction d'histogrammes pour vérifier la distribution de la production.",
      "2 [Six Sigma] Analyse de capabilité : Calcul des indices de capabilité machine (Z, Cp, Cpk) pour quantifier la dispersion et le centrage du procédé par rapport aux tolérances (9.97 mm / 10.03 mm).",
      "2 [Six Sigma] Étude de corrélation : Analyse des variables quantitatives (vitesse d'avance, rotation du foret) via le coefficient de Bravais-Pearson pour déterminer leur influence réelle sur le diamètre final.",
      "2 [Six Sigma] Tests d'hypothèses : Réalisation de tests de comparaison de moyennes (Student) et de variances (Fisher) sur les variables qualitatives (type de matière, affûtage, bridage, opérateur) pour isoler les causes racines de dispersion."
    ],
    results: {
      kpis: ["150 Camions/Jour Réduits", "+25% Capacité", "Capabilité Machine Optimisée", "Facteurs Critiques Isolés"],
      details: [
        "1 [Lean] Réduction du Lead Time : Diminution drastique du temps de traversée global des camions sur site (gain cible de 90 min de NVA).",
        "1 [Lean] Amélioration de l'efficience : Augmentation du taux de VA du processus cariste via la réduction des distances parcourues (passage de 40m à 10m par trajet cible).",
        "1 [Lean] Capacité de production : Sécurisation de l'objectif de 150 camions expédiés par jour, permettant de répondre à 100% de la demande marché et d'éliminer les ruptures.",
        "1 [Lean] Pilotage visuel & rituels : Installation d'un management visuel aux quais (heures cibles d'arrivée/départ) et mise en place de points 'Top 5' pour traiter les écarts en temps réel.",
        "2 [Six Sigma] Identification des facteurs critiques : Mise en évidence de l'impact majeur de l'affûtage du foret et de la nature de la matière (Aluminium vs Titane) sur la dispersion du diamètre.",
        "2 [Six Sigma] Élimination des variables non-influentes : Validation statistique de l'absence d'impact significatif des paramètres de coupe (vitesse et rotation) et du pointage sur la qualité du perçage.",
        "2 [Six Sigma] Optimisation du procédé : Recommandation stratégique d'écarter les anciens affûtages et de modifier les méthodes de bridage (privilégier le bridage 4 au détriment du bridage 1) pour gagner en répétabilité.",
        "2 [Six Sigma] Aide à la décision : Fourniture d'un plan d'action concret pour réduire les non-conformités et stabiliser le centrage de la production vers la valeur cible."
      ]
    }
  },
  {
    id: "junivers",
    title: "A.I. Personal Development (Junivers)",
    client: "Junivers (Projet Personnel Innovant)",
    duration: "4 mois",
    location: "Lyon (France)",
    category: "ia",
    image: "/junivers.jpg",
    summary: "Conception d'un product-cahier des charges de développement personnel croisant 9 tests de psychologie cognitive via l'IAGen.",
    presentation: "Junivers est né d’un constat de terrain lors d’une phase de transition professionnelle. J’ai conçu un parcours capable de croiser les données de plus de 8 tests reconnus (sciences humaines et sociologie) pour produire une synthèse unique et nuancée, transformant des données brutes en un véritable récit fluide.",
    methodology: [
      "Idéation & Valuation : Conception de la proposition de valeur exclusive ('miroir interprétatif' croisé par IA générative).",
      "Recherche scientifique : Audit de 15 questionnaires pour retenir 9 piliers théoriques robustes.",
      "Propriété Intellectuelle : Adaptation exclusive de formulations pour garantir le respect rigoureux des frameworks protégés.",
      "Analyse des Risques (AMDEC) : Traitement des points de sécurité critiques : conformité RGPD (tests psychologiques), hébergement, pseudonymisation, gestion d'hallucinations d'IA.",
      "Modélisation business & financière : Business plan complet établissant le point d'équilibre financier.",
      "Architecture techniques & Prompting : Conception des règles de prompts et orchestration de workflows via n8n et GenAI."
    ],
    results: {
      kpis: ["Rapports Narratifs 30 pages", "10 Bêta-Testeurs Convaincus", "Architecture n8n / IA"],
      details: [
        "Mise au point d'un prototype fonctionnel complet, testé par 10 utilisateurs renvoyant d'excellents retours d'introspection.",
        "Rédaction d'un Cahier des Charges approfondi, structurant l'expérience interface et technique pour intégration définitive.",
        "Élimination complète des risques de fuite de données personnelles par anonymisation stricte."
      ]
    }
  },
  {
    id: "strategy-bayer",
    title: "Stratégie Industrielle & Dialogue Social",
    client: "Bayer & Syensqo",
    duration: "5 mois",
    location: "Bayer & Syensqo (France)",
    category: "lean",
    image: "/strategy-bayer.png",
    summary: "Expert d'audit en maturité de performance industrielle et organisation du travail avec Secafi.",
    presentation: "En tant qu'expert en performance industrielle pour SECAFI (Groupe Alpha), ma mission consistait à analyser les unités de production chimie/pharma et l'impact de transformations sur le dialogue social et les compétences.",
    methodology: [
      "Audit des transformations : Immersion terrain en unités pour scruter les écarts entre organisation réelle et organisation théorisée.",
      "Concertation multi-parties : Entretiens confidentiels avec l’ensemble des acteurs, du technicien d’exploitation au directeur d’usine pour sécuriser l’accompagnement."
    ],
    results: {
      kpis: ["Immersion EMEA", "Dialogue Social Éclairé", "Pratiques Capitalisées"],
      details: [
        "Rédaction de rapports d'expertise de référence servant d'arbitrage objectif lors des CSE.",
        "Soutien à la négociation sociale par l'apport de préconisations techniques réalistes.",
        "Accompagnement de transformations industrielles complexes vers des modèles durables."
      ]
    }
  },
  {
    id: "mes-thales",
    title: "Cadrage MES Aéronautique & Défense",
    client: "Thales",
    duration: "4 mois",
    location: "Thales (Europe)",
    category: "digital",
    image: "/mes-thales.png",
    summary: "Schéma directeur et étude Fit-to-Standard pour le cadrage du déploiement d'un progiciel MES européen (Défense & Aéro).",
    presentation: "En tant que Consultant Senior en Transformation Digitale, j'ai cadré le déploiement d’un MES (Manufacturing Execution System) sur des usines de pointe en forte croissance, axé sur l'alignement des processus locaux aux standards groupe.",
    methodology: [
      "Immersion & Spécification : Analyse de flux de production sensibles haute exigence qualité.",
      "Audit 'Fit to Standard' : Identification de l'écart standard-besoins locaux afin de minimiser le spécifique.",
      "Roadmap & ROI : Construction d'un schéma directeur pluriannuel étayant les gains et coûts d'investissements.",
      "Convergence IT/OT : Robustesse d'architecture de cybersécurité industrielle."
    ],
    results: {
      kpis: ["Aéronautique & Défense", "Schéma Directeur Validé", "Alignement IT/OT"],
      details: [
        "Validation de la Roadmap digitale par le comité exécutif pour déverrouiller l'intégration MES.",
        "Création d'un ensemble de procédures communes pour la traçabilité renforcée de production.",
        "Anticipation et couverture complète des risques cybersécurité industrielle."
      ]
    }
  }
];

export const EXPERIENCES: Experience[] = [
  {
    period: "2021 — 2026 (~ 5 ans)",
    title: "Consultant Senior & Architecte Transformation",
    organization: "Conseil & Stratégie (GreenFlex, Secafi Groupe Alpha)",
    location: "Paris, Lyon, Europe",
    details: [
      "Pilotage de schémas directeurs Industrie 4.0 et audits de performance pour des fleurons industriels.",
      "Accompagnement de plans internationaux d'efficacité énergétique et décarbonation certifiés ISO 50001.",
      "Cadrage de grands projets numériques de traçabilité et pilotage d'ateliers (MES/OEE) et interfaces IoT.",
      "Arbitrage technique et managérial de contextes de transformation complexes facilitant le dialogue social."
    ]
  },
  {
    period: "2019 — 2021 (~ 2 ans)",
    title: "Chef de projet Énergie Multisite & Reprise d'études",
    organization: "Les Grands Chais de France (LGCF)",
    location: "Petersbach, Alsace (France)",
    details: [
      "Déploiement d'un réseau IoT LoRaWAN de supervision sur 14 sites de production agroalimentaire.",
      "Management de projet de certification ISO 50001 sur l'ensemble du périmètre industriel.",
      "Reprise d'études réussie de niveau Ingénieur Généraliste au sein de l'école d'Ingénieurs CESI Bordeaux."
    ]
  },
  {
    period: "2018 — 2019 (~ 1 an)",
    title: "Parcours en Itinérance & Perfectionnement",
    organization: "Kaplan Business School - International",
    location: "Australie",
    details: [
      "Perfectionnement linguistique de l'anglais professionnel en contexte international.",
      "Développement de capacités d'adaptabilité et d'agilité dans des environnements culturels variés."
    ]
  },
  {
    period: "2013 — 2018 (5 ans 2 mois)",
    title: "Coordinateur Technique en Automatisme (CNPE Paluel)",
    organization: "EDF Nucléaire",
    location: "Saint-Valery-en-Caux, Normandie (France)",
    details: [
      "Garant de la disponibilité des automatismes et contrôle-commande sur 4 tranches nucléaires de 1300 MW.",
      "Pilotage d'équipes opérationnelles sur 7 arrêts de tranche d'importance critique (dont 2 visites décennales ).",
      "Maintien de standards extrêmes de sûreté de fonctionnement, radioprotection habilitée PR2 et diagnostic."
    ]
  },
  {
    period: "2009 — 2013 (~ 4 ans)",
    title: "Préparateur Projets IEA (Instrumentation, Electricité, Automatisme)",
    organization: "ExxonMobil Chemical France",
    location: "Port-Jérôme-sur-Seine (France)",
    details: [
      "Études de boucle de régulation, devis IEA et préparation de chantiers en environnement hostile SEVESO.",
      "Optimisation de rendement de procédés (alkylation, vapocraqueur) et fiabilisation de l'appareil industriel.",
      "Mise en service et configuration d'automates industriels et de boucles PID."
    ]
  }
];

export const SKILLS: SkillCategory[] = [
  {
    title: "Excellence Opérationnelle",
    icon: "Award",
    skills: [
      "Lean Six Sigma Expert (Certifié Black Belt)",
      "Méthodologie DMAIC & Analyses Statistiques",
      "Diagnostic de Flux de Valeur (VSM / Lead Time)",
      "Pilotage de la Performance Terrain (Kaizen, 5S, SMED)",
      "Synchronisation des flux (Heijunka, Kanban, Takt)",
      "Résolution de problèmes complexes (A3, Ishikawa, 5 Whys)"
    ]
  },
  {
    title: "Expertise Technique",
    icon: "Cpu",
    skills: [
      "Environnements Critiques (Nucléaire, SEVESO)",
      "Instrumentation, Électricité & Automatisme (IEA)",
      "Régulation de Process & Paramétrage PID avancés",
      "Efficience Énergétique & Générateurs Thermiques (ISO 50001)",
      "Supervision SCADA & Automates Industriels (Siemens, WinCC)",
      "Conduite de procédés raffinage & vapocraquage"
    ]
  },
  {
    title: "Transformation Digitale",
    icon: "Network",
    skills: [
      "Architecture IoT Industrielle (LoRaWAN, MQTT)",
      "Manufacturing Execution Systems (MES / OEE / MOM)",
      "Traitement de la donnée industrielle (OSIsoft PI System)",
      "Cybersécurité industrielle (Convergence IT/OT)",
      "Projets d'innovation basés sur l'IA Générative",
      "Orchestration de flux numériques complexes (n8n, API)"
    ]
  },
  {
    title: "Soft Skills & Leadership",
    icon: "Users",
    skills: [
      "Esprit de synthèse & Intelligence Pratique",
      "Résolution de situations de crise terrain",
      "Posture de conseil au dialogue social",
      "Coordination transversale sans lien hiérarchique direct",
      "Adaptabilité extrême (itinérance Australie, multi-site)",
      "Conduite du changement agile"
    ]
  }
];

export const TECH_STACK = {
  methods: ["Lean Six Sigma", "Minitab", "Jira / Asana", "MS Project", "DMAIC / VSM"],
  ia: ["Prompt Engineering", "IA Générative (Gemini)", "Machine Learning Industriel", "Flow Automation"],
  iot: ["LoRaWAN", "OPC (UA/DA)", "Modbus / MQTT", "Capteurs Industriels"],
  systems: ["Aveva / OSIsoft PI", "MES / MOM", "SCADA", "SAP ERP", "Power BI / Tableau"]
};

export const CERTIFICATIONS: Certification[] = [
  {
    year: "2024",
    title: "Certification Lean Six Sigma - Green Belt & Black Belt",
    organization: "IASSC / Organisme de Référence",
    description: "Pilotage de transformations stratégiques, résolution de problèmes hautement complexes par l'analyse statistique multidimensionnelle, méthodologie DMAIC."
  },
  {
    year: "2019 — 2021",
    title: "Diplôme d'Ingénieur Généraliste",
    organization: "CESI - École d'ingénieurs (Bordeaux)",
    description: "Reprise d'études en alternance chez Les Grands Chais de France. Focus performance industrielle, excellence opérationnelle et pilotage de projets multidisciplinaires."
  },
  {
    year: "2018 — 2019",
    title: "Formation Anglais Intensive",
    organization: "Kaplan Business School (Australie)",
    description: "Maîtrise totale de l'anglais professionnel en contexte international et interculturel."
  },
  {
    year: "2011 — 2012",
    title: "Brevet d'Opérateur des Industries Pétrolières et Pétrochimiques",
    organization: "IFP Training",
    description: "Modélisation et conduite de procédés industriels complexes sous normes SEVESO Seuil Haut."
  },
  {
    year: "2009 — 2011",
    title: "BTS Électrotechnique",
    organization: "Campus Jeanne d'Arc",
    description: "Maintenance industrielle, automatisme, circuits de puissance et d'instrumentation."
  }
];
