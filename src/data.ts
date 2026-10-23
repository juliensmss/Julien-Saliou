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
    duration: "6 mois",
    location: "Plateforme Port Jerome (France/Normandie)",
    category: "energy",
    image: "/exxonMobil.jpg",
    summary: "Amélioration du rendement de production d'une unité d'alkylation par régulation PID dynamique et variateur de vitesse sur site SEVESO Seuil Haut.",
    presentation: "Dans le cadre du service \"Projets IEA\", j'ai été chargé d'améliorer le rendement de production d'une unité d'alkylation. L'enjeu majeur était de stabiliser un processus de neutralisation peu efficace qui entraînait un encrassement prématuré des équipements, une maintenance curative trop fréquente et une surconsommation de produits chimiques.",
    methodology: [
      "Analyse du besoin & études : Identification d'un surdimensionnement critique. La pompe existante fonctionnait à 3000 tr/min pour un débit de 40m3/h, alors que le besoin réel du procédé n'était que de 8m3/h. Ce décalage empêchait une neutralisation efficace du fluide.",
      "Conception de la solution : Étude comparative de plusieurs leviers techniques. Application des lois de similitude pour valider que la variation de vitesse (VFD) était la solution la plus performante en termes de précision de réglage et d'efficacité énergétique.",
      "Pilotage technique : Remplacement du système de laminage manuel par un variateur de vitesse piloté dynamiquement via le système SCADA.",
      "Coordination de chantier : Planification et supervision des corps de métiers (mécanique, électrique, instrumentation) durant une fenêtre de tir critique : un arrêt d'unité de seulement 10 jours.",
      "Mise en service : Paramétrage fin de la boucle de régulation PID et tests de communication avec la salle de contrôle pour garantir un redémarrage sans incident."
    ],
    results: {
      kpis: ["Qualité doublée", "Économies opérationnelles", "Fiabilisation des actifs", "Sûreté industrielle"],
      details: [
        "Qualité doublée : Le taux de soude libre en sortie, indicateur clé de la performance, a été ramené de 15 % à 7 %, validant immédiatement l'efficacité du nouveau système de dosage.",
        "Économies opérationnelles : Réduction significative de la consommation de réactifs chimiques et optimisation de la facture électrique de l'unité.",
        "Fiabilisation des actifs : La périodicité de nettoyage et de maintenance des pompes est passée de 2 mois à 6 mois, augmentant ainsi la disponibilité opérationnelle du site.",
        "Sûreté industrielle : Exécution du projet dans le respect strict des normes de sécurité SEVESO, avec un redémarrage de l'installation effectué exactement dans les délais prévus."
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
    presentation: "En tant que Coordinateur Technique en Automatisme, ma mission consistait à garantir la disponibilité et la fiabilité des systèmes de contrôle-commande et des automatismes industriels du site. Dans un environnement à haute criticité où la sûreté nucléaire est la priorité absolue, j'ai assuré le pilotage des interventions techniques et la résolution de problématiques complexes.",
    methodology: [
      "Coordination opérationnelle : Pilotage et planification des interventions de maintenance (préventive et curative) en automatisme. Interface directe entre les équipes de terrain et le planning de tranche.",
      "Diagnostic & Expertise : Analyse de pannes complexes sur des systèmes automatisés critiques. Réalisation de diagnostics approfondis pour identifier les causes racines et limiter les temps d'indisponibilité.",
      "Ingénierie de maintenance : Programmation, ajustement et mise à jour des logiques d'automatisme. Travaux de fiabilisation pour réduire les aléas techniques sur les boucles de régulation et les systèmes de sécurité.",
      "Gestion des Arrêts de Tranche : Coordination des activités d'automatisme lors de fenêtres de tir très denses. Gestion des ressources et des contraintes techniques pour respecter les jalons de redémarrage.",
      "Sûreté & radioprotection : Application stricte des procédures de sûreté nucléaire et des règles de radioprotection (Habilitation PR2) lors des interventions en zone contrôlée."
    ],
    results: {
      kpis: ["Continuité de service", "Respect des délais", "Fiabilisation du parc", "Culture sûreté"],
      details: [
        "Continuité de service : Participation active à 7 arrêts de tranche, dont 2 visites décennales (VD3), étapes majeures pour la prolongation de la durée de vie des centrales.",
        "Respect des délais : Garantie du respect des plannings de redémarrage grâce à une coordination fluide et une réactivité accrue sur les aléas techniques de dernière minute.",
        "Fiabilisation du parc : Réduction des pannes récurrentes par l'optimisation des programmes et le déploiement de solutions correctives pérennes sur les installations.",
        "Culture sûreté : Maintien d'un haut niveau d'exigence technique et de sécurité, contribuant à l'absence d'incident notable sur le périmètre automatisme durant toute la durée de la mission."
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
    presentation: "Dans un contexte de forte volonté de réduction de l'empreinte carbone, j'ai piloté le déploiement d'une architecture numérique permettant de monitorer et d'optimiser la consommation énergétique du groupe Les Grands Chais De France. L'enjeu était de transformer des données brutes provenant de sites hétérogènes en indicateurs de performance exploitables pour la certification ISO 50001.",
    methodology: [
      "Audit Connectivité : État des lieux technique des 14 sites pour identifier les points de comptage critiques (Électricité, Gaz, Eau, Vapeur).",
      "Déploiement Architecture IoT : Mise en œuvre d'un réseau de capteurs communicants via le protocole LoRaWAN, permettant une collecte de données sans fil à longue portée.",
      "Intégration SI : Centralisation des flux de données vers une plateforme de supervision énergétique pour un suivi en temps réel.",
      "Management de Projet : Coordination des prestataires techniques, des responsables de maintenance site et des équipes IT."
    ],
    results: {
      kpis: ["Digitalisation & Visibilité", "Standardisation", "Accompagnement ISO 50001", "Optimisation"],
      details: [
        "Digitalisation & Visibilité : Mise en place de tableaux de bord de suivi des IPÉ (Indicateurs de Performance Énergétique) par ligne de production.",
        "Standardisation : Création d'un modèle de comptage réplicable sur l'ensemble des sites du groupe.",
        "Accompagnement ISO 50001 : Fourniture des preuves de mesures nécessaires à l'obtention et au maintien de la certification énergétique.",
        "Optimisation : Identification immédiate des dérives de consommation, permettant des actions correctives rapides et des économies directes sur les factures d'énergie."
      ]
    }
  },
  {
    id: "danone",
    title: "MES (OEE) Intelligence Opérationnelle",
    client: "Danone",
    duration: "6 mois",
    location: "Danone Pays de Bray (France/Normandie)",
    category: "digital",
    image: "/danone.png",
    summary: "Numérisation de reporting et contextualisation de données via OSIsoft PI System sur 13 lignes de production laitières (Produits laitiers frais).",
    presentation: "L'objectif de ce projet était de numériser et contextualiser les données de production pour remplacer l'ancien système de saisie manuelle. J'ai piloté le développement d'une solution basée sur la technologie OSIsoft PI pour capturer, filtrer et visualiser les indicateurs de performance (KPI) en temps réel sur 13 lignes de production, en commençant par une ligne pilote stratégique.",
    methodology: [
      "Analyse du besoin & cadrage : Rédaction des spécifications fonctionnelles détaillant la collecte des données provenant des automates (Siemens, WinCC) via des serveurs OPC.",
      "Modélisation Asset Framework (PI AF) : Structuration des données selon les standards industriels pour représenter chaque actif physique (cuves, conditionneuses, suremballeuses) de manière uniforme.",
      "Définition du modèle de temps : Adaptation de la décomposition des temps (Temps disponible, Temps de production, Temps de production net) pour calculer automatiquement le TRS et l'OEE (Efficacité Globale de l'Équipement).",
      "Visualisation PI Vision : Conception d'écrans de bord personnalisés pour différents profils (Opérateur, Chef d'équipe, Manager) permettant la justification des arrêts et le suivi des pertes."
    ],
    results: {
      kpis: ["Automatisation du reporting", "Justification intelligente", "Standardisation groupe", "Formation & adoption"],
      details: [
        "Automatisation du reporting : Catégorisation automatique des arrêts machines à l'aide des codes défauts issus des automates, réduisant ainsi drastiquement les erreurs de saisie manuelle.",
        "Justification intelligente : Mise en place d'une interface de justification intuitive permettant aux opérateurs de documenter les causes d'arrêts (défauts techniques, changements de format, nettoyages) en quelques clics.",
        "Standardisation groupe : Création d'un modèle d'installation (Blue Print) servant de référence pour les déploiements futurs sur d'autres sites industriels du groupe.",
        "Formation & adoption : Organisation de sessions de formation pour les administrateurs et utilisateurs finaux afin de garantir l'appropriation immédiate de l'outil."
      ]
    }
  },
  {
    id: "totalenergies",
    title: "ISO 50001 - Accompagnement",
    client: "TotalEnergies",
    duration: "2 ans",
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
      kpis: ["Accompagnement & Certifications", "Pilotage de la Performance", "Leadership Transverse"],
      details: [
        "Accompagnement & Certifications : Obtention de la certification ISO 50001 pour des entités majeures dans des contextes opérationnels complexes :\n• TotalEnergies Marketing Services 🇫🇷 France\n• TotalEnergies 🇶🇦 Qatar\n• TotalEnergies 🇳🇬 Nigeria\n• TotalEnergies 🇦🇴 Angola\n• TotalEnergies 🇨🇬 Congo\n• TotalEnergies 🇩🇰 Danemark",
        "Pilotage de la Performance : Standardisation des méthodes de reporting énergétique à l'échelle mondiale pour la branche Exploration-Production du Groupe.",
        "Leadership Transverse : Animation d'un réseau d'experts permettant une capitalisation efficace des bonnes pratiques entre les différentes zones géographiques."
      ]
    }
  },
  {
    id: "strategy-bayer",
    title: "Stratégie Industrielle & Dialogue Social",
    client: "Bayer & Syensqo",
    duration: "1 an",
    location: "Bayer & Syensqo (France)",
    category: "lean",
    image: "/strategy-bayer.png",
    summary: "Expert d'audit en maturité de performance industrielle et organisation du travail avec Secafi.",
    presentation: "En tant qu'expert en performance industrielle pour SECAFI, ma mission consistait à analyser les unités de production et la maturité des équipes. En évaluant l'écart entre l'organisation actuelle et la cible, j'ai pu mesurer précisément l'impact de la transformation organisationnelle à venir sur le travail et les compétences.",
    methodology: [
      "Audit des transformations industrielles : Analyse des écarts entre l’organisation actuelle et la cible visée, s'appuyant sur une immersion en unités de production et une confrontation directe avec les réalités du terrain.",
      "Diagnostic des parties prenantes : Évaluation de la maturité et des besoins via des entretiens structurés avec l'ensemble de la chaîne de décision (techniciens, managers et directions) pour sécuriser l'adhésion au changement."
    ],
    results: {
      kpis: ["Éclairage Décisionnel", "Dialogue Social", "Préconisations Concrètes"],
      details: [
        "Éclairage Décisionnel : Rédaction de rapports d'expertise permettant de nourrir le dialogue social par des données factuelles et des préconisations concrètes."
      ]
    }
  },
  {
    id: "mes-thales",
    title: "Cadrage MES Aéronautique & Défense",
    client: "Thales",
    duration: "6 mois",
    location: "Thales (Europe)",
    category: "digital",
    image: "/mes-thales.png",
    summary: "Schéma directeur et étude Fit-to-Standard pour le cadrage du déploiement d'un progiciel MES européen (Défense & Aéro).",
    presentation: "En tant que Consultant Senior Transformation Digitale, ma mission a consisté à cadrer le déploiement d’un MES (Manufacturing Execution System) sur des sites en forte croissance, en réalisant des analyses \"Fit to Standard\" pour aligner les processus locaux sur les standards du MES Groupe. L'objectif prioritaire a été de simplifier les flux de travail des collaborateurs en production et qualité, en transformant les contraintes techniques en outils intuitifs et performants.",
    methodology: [
      "Immersion & Audit Terrain : Réalisation d'analyses approfondies des processus de fabrication et capture des besoins métiers spécifiques aux sites via des observations directes et des interviews.",
      "Analyse \"Fit to Standard\" : Évaluation des écarts entre les solutions logicielles standards du Groupe et les exigences opérationnelles locales pour limiter les développements spécifiques et garantir la maintenabilité.",
      "Gouvernance SI & OT : Pilotage de la convergence entre les enjeux de production et les contraintes d'architecture informatique et de cybersécurité industrielle.",
      "Élaboration de la Roadmap : Conception d'un schéma directeur complet incluant la trajectoire de déploiement et l’estimation des ressources."
    ],
    results: {
      kpis: ["Stratégie Validée", "Standardisation Opérationnelle", "Sécurisation du Projet"],
      details: [
        "Stratégie Validée : Livraison d'une étude de cadrage exhaustive ayant servi de socle décisionnel au comité de direction pour l'engagement des phases d'intégration.",
        "Standardisation Opérationnelle : Définition d'un socle fonctionnel commun permettant de capitaliser sur les meilleures pratiques du Groupe tout en respectant les particularités critiques de chaque site.",
        "Sécurisation du Projet : Identification proactive des risques techniques et organisationnels, permettant la mise en place d'un plan d'atténuation dès le lancement de l'initiative."
      ]
    }
  },
  {
    id: "log-brewery",
    title: "Projets Lean & Lean Six Sigma",
    client: "Brasserie B&B & Usine Aéronautique",
    duration: "3 semaines / 4 mois",
    location: "France (Plateforme logistique & Lyon)",
    category: "lean",
    image: "/log-brewery.jpg",
    summary: "Ce volet regroupe deux projets majeurs d'excellence opérationnelle : l'optimisation Lean des flux de transit de camions et la réduction de variabilité d'usinage de précision via la méthodologie Six Sigma (DMAIC).",
    presentation: "Ce volet rassemble deux projets majeurs d'excellence opérationnelle et d'amélioration continue :\n\n### 1 - Optimisation de flux logistique - Brasserie B&B\n• Durée : 3 semaines.\n• Environnement : Secteur Agroalimentaire (Logistique & Distribution).\n• Lieu : Site de production et plateforme logistique.\n\nPrésentation de la mission : Dans un contexte de forte croissance (pic de demande lié à la coupe du monde), la brasserie était confrontée à une saturation de ses quais, limitant les expéditions à 120 camions/jour pour un besoin de 150. L'enjeu était d'augmenter la capacité de chargement de 25% sans investissement lourd, en éliminant les gaspillages et en optimisant l'efficience opérationnelle des caristes.\n\n---\n\n### 2 - Optimisation de procédé d’usinage (Méthodologie Six Sigma)\n• Durée : 4 mois.\n• Environnement : Secteur Industriel / Usinage de précision.\n• Lieu : Lyon, France.\n\nPrésentation de la mission : Dans le cadre de l'amélioration de la qualité de production, l'objectif était d'analyser et de réduire la variabilité du diamètre de perçage (Y) sur une ligne de production. La mission consistait à identifier, parmi de nombreux facteurs d'influence qualitatifs et quantitatifs (X), ceux ayant un impact significatif sur la conformité des pièces afin de stabiliser le procédé et d'atteindre les objectifs de capabilité machine.",
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
      kpis: ["Réduction Lead Time (90 min)", "Capacité 150 camions/j", "Facteurs critiques identifiés", "Stabilisation Six Sigma"],
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
