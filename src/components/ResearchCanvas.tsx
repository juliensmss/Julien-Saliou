import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Plus,
  Trash2,
  ExternalLink,
  Move,
  Link as LinkIcon,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileText,
  Sparkles,
  Layers,
  Info,
  Check,
  X,
  Compass,
  ArrowRight,
  Database,
  Cpu,
  SunMedium,
  Droplets,
  BookOpen
} from "lucide-react";

export interface CanvasNode {
  id: string;
  title: string;
  category: "blue" | "green" | "orange" | "purple";
  x: number;
  y: number;
  docUrl?: string;
  notes?: string;
  summary?: string;
  tags?: string[];
  isMaster?: boolean;
}

export interface CanvasEdge {
  id: string;
  from: string;
  to: string;
  label?: string;
}

const CATEGORY_STYLES = {
  blue: {
    name: "Énergie & Eau",
    badge: "bg-sky-50 text-sky-700 border-sky-200",
    nodeBorder: "border-sky-500",
    nodeGlow: "shadow-sky-500/20",
    headerBg: "bg-sky-600",
    accentText: "text-sky-600",
    dot: "bg-sky-500",
    tagBg: "bg-sky-100 text-sky-800",
    lineColor: "#0284c7" // sky-600
  },
  green: {
    name: "Autonomie & Solaire",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    nodeBorder: "border-emerald-500",
    nodeGlow: "shadow-emerald-500/20",
    headerBg: "bg-emerald-600",
    accentText: "text-emerald-600",
    dot: "bg-emerald-500",
    tagBg: "bg-emerald-100 text-emerald-800",
    lineColor: "#059669" // emerald-600
  },
  orange: {
    name: "Low-Tech & Thermodynamique",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    nodeBorder: "border-amber-500",
    nodeGlow: "shadow-amber-500/20",
    headerBg: "bg-amber-600",
    accentText: "text-amber-600",
    dot: "bg-amber-500",
    tagBg: "bg-amber-100 text-amber-800",
    lineColor: "#d97706" // amber-600
  },
  purple: {
    name: "IA & Recherche In Silico",
    badge: "bg-purple-50 text-purple-700 border-purple-200",
    nodeBorder: "border-purple-500",
    nodeGlow: "shadow-purple-500/20",
    headerBg: "bg-purple-600",
    accentText: "text-purple-600",
    dot: "bg-purple-500",
    tagBg: "bg-purple-100 text-purple-800",
    lineColor: "#9333ea" // purple-600
  }
};

const INITIAL_NODES: CanvasNode[] = [
  // 1. Central Master Node
  {
    id: "master-sovereignty",
    title: "Souveraineté & Résilience",
    category: "green",
    x: 460,
    y: 280,
    isMaster: true,
    summary: "Nœud central articulant l'indépendance des flux physiques (eau, calories, électrons) et la maîtrise des leviers cognitifs.",
    docUrl: "https://docs.google.com/document/d/1Autonomie-Constat-Strategie/edit",
    notes: "• Priorité 2026 : Phase 1 Capitalisation & Acquisition de savoirs théoriques.\n• Antifragilité face aux SPOF industriels.\n• Asymétrie des coûts marginaux : ce qui est tangible prend de la valeur relative face au numérique.",
    tags: ["Pivot Systémique", "Antifragilité", "Nexus"]
  },

  // 2. Conversion Énergétique Avancée (Master & Children)
  {
    id: "master-energy",
    title: "Conversion Énergétique Avancée",
    category: "blue",
    x: 100,
    y: 110,
    isMaster: true,
    summary: "Dépassement des rendements thermodynamiques classiques : vecteur solaire direct et molécules décarbonées.",
    docUrl: "https://docs.google.com/document/d/1Energie-Recherche-Fondamentale/edit",
    notes: "• Point 4 de la recherche fondamentale : plus fort pouvoir de résolution immédiat.\n• Rupture de la dépendance aux électrolyseurs haute pression.",
    tags: ["Énergie", "Vecteur Moléculaire", "Recherche Fondamentale"]
  },
  {
    id: "sub-stf-photosynthesis",
    title: "Photosynthèse Artificielle STF",
    category: "blue",
    x: 60,
    y: 330,
    summary: "Solar-to-Fuel direct : dissociation de l'eau (water-splitting) et réduction du CO₂ en carburants solaires.",
    docUrl: "https://docs.google.com/document/d/1La-Photosynthese-Artificielle/edit",
    notes: "• Demi-réaction : 2H₂O + hv -> O₂ + 4H⁺ + 4e⁻\n• Seuil de rentabilité : STF > 10-15%\n• Protection anti-photocorrosion par couche ALD TiO₂\n• Élimine la boîte noire de l'électrolyseur séparé.",
    tags: ["STF", "PEC", "ALD TiO₂"]
  },
  {
    id: "sub-hydrogen-efuels",
    title: "Hydrogène Vert & E-fuels",
    category: "blue",
    x: 140,
    y: 520,
    summary: "Transport moléculaire longue distance (LOHC, méthanol, ammoniac) face aux limites de portée du réseau électrique.",
    docUrl: "https://docs.google.com/document/d/1Energie-Transport-Stockage/edit",
    notes: "• Rendement Power-to-Power : 30% à 45%\n• L'H₂ exige une électricité primaire quasi gratuite ou une conversion directe pour être rentable face aux pertes thermodynamiques.",
    tags: ["LOHC", "Densité Massique", "E-fuels"]
  },
  {
    id: "sub-shockley-queisser",
    title: "Dépassement Shockley-Queisser",
    category: "blue",
    x: 350,
    y: 70,
    summary: "Franchir le plafond théorique de 33% du silicium via les cellules tandem Pérovskite / Silicium et multi-jonctions.",
    docUrl: "https://docs.google.com/document/d/1Recherche-Solaire-Tandem/edit",
    notes: "• Doublement de la production au m².\n• Accélération directe de l'électrification du bâtiment et de l'industrie.",
    tags: ["Pérovskites", "Cellules Tandem", "Rendement"]
  },

  // 3. Levier IA & Recherche In Silico (Master & Children)
  {
    id: "master-ai",
    title: "Levier IA & Recherche In Silico",
    category: "purple",
    x: 820,
    y: 110,
    isMaster: true,
    summary: "Automatisation de la découverte scientifique et modélisation prédictive avant prototypage physique.",
    docUrl: "https://docs.google.com/document/d/1Anthropic-Policy-AI-Exponential/edit",
    notes: "• 'Policy on the AI Exponential' (Amodei) : l'IA avance à vitesse exponentielle.\n• Le bastion cognitif s'automatise : rôle de donneur d'ordres & architecte de terrain.\n• Hybridation des compétences.",
    tags: ["In Silico", "Scaling Laws", "DFT"]
  },
  {
    id: "sub-materials-project",
    title: "Screening Haut Débit Materials Project",
    category: "purple",
    x: 850,
    y: 330,
    summary: "Exploration combinatoire des structures cristallines et catalyseurs sans métaux nobles (alliages Ni-Fe, sulfures).",
    docUrl: "https://docs.google.com/spreadsheets/d/1Materials-Project-Screening/edit",
    notes: "• Remplacement de l'Iridium et du Platine.\n• Calculs ab initio des bandes d'énergie et surpotentiels de suractivation.",
    tags: ["Materials Project", "Catalyseurs", "Ni-Fe"]
  },
  {
    id: "sub-digital-twins",
    title: "Jumeaux Numériques de Photoréacteurs",
    category: "purple",
    x: 770,
    y: 520,
    summary: "Modélisation couplée dynamique des fluides (CFD) + transfert radiatif photonique pour réacteurs solaires.",
    docUrl: "https://docs.google.com/document/d/1Digital-Twin-Photoreactors/edit",
    notes: "• Optimisation de l'absorption lumineuse et de l'écoulement des flux réactifs.\n• Réduction des points morts et du coût de scaling-up de 1 cm² à 1 m².",
    tags: ["Jumeaux Numériques", "CFD", "Scaling-up"]
  },

  // 4. Ingénierie de l'Autonomie (Master & Children)
  {
    id: "master-autonomy",
    title: "Ingénierie de l'Autonomie",
    category: "orange",
    x: 480,
    y: 560,
    isMaster: true,
    summary: "Méthodologie rigoureuse d'ingénierie appliquée à l'habitat résilient et aux flux décentralisés.",
    docUrl: "https://docs.google.com/document/d/1Ingenierie-Autonomie-Methode/edit",
    notes: "• Refus de la boîte noire technique.\n• Cycle séquentiel SCAN -> FOCUS -> ACT.\n• L'interdépendance choisie plutôt que l'autarcie illusoire.",
    tags: ["Excellence Opérationnelle", "SCAN-FOCUS-ACT", "Résilience"]
  },
  {
    id: "sub-water-dual-network",
    title: "Double Réseau d'Eau SCAN-FOCUS-ACT",
    category: "orange",
    x: 250,
    y: 690,
    summary: "Séparation stricte Eau Potable (7-10 L/j gravitaire) vs Eau Technique (sanitaire & WC) pour éviter le surdimensionnement.",
    docUrl: "https://docs.google.com/document/d/1Double-Reseau-Hydrique/edit",
    notes: "• L'eau pèse 1 kg/L : valoriser l'écoulement gravitaire pour annuler la facture énergétique du pompage.\n• Filtration céramique & charbon actif autonome.",
    tags: ["Double Réseau", "Gravitaire", "Autonomie Eau"]
  },
  {
    id: "sub-nexus-energy-water",
    title: "Nexus Énergie-Eau",
    category: "blue",
    x: 480,
    y: 770,
    summary: "Interdépendance fondamentale : toute production énergétique exige de l'eau pure, tout captage d'eau exige de l'énergie.",
    docUrl: "https://docs.google.com/document/d/1Nexus-Energie-Eau/edit",
    notes: "• En cas de crise de réseau, la pompe électrique est le premier SPOF.\n• Couplage direct solaire basse tension / réservoir en hauteur.",
    tags: ["Nexus", "Pompage Solaire", "Thermodynamique"]
  },
  {
    id: "sub-kaya-thermo",
    title: "Thermodynamique Low-Tech & Kaya",
    category: "orange",
    x: 740,
    y: 710,
    summary: "Application de l'équation de Kaya : décarbonation par l'efficacité thermique et recyclage des 60% de chaleur perdue.",
    docUrl: "https://docs.google.com/document/d/1Equation-Kaya-LowTech/edit",
    notes: "• CO₂ = POP × (PIB/POP) × (Énergie/PIB) × (CO₂/Énergie)\n• Sobriété structurelle + matériaux nanostructurés thermoélectriques et poêles de masse.",
    tags: ["Équation de Kaya", "Chaleur Fatale", "Low-Tech"]
  }
];

const INITIAL_EDGES: CanvasEdge[] = [
  // Links between central node and master nodes
  { id: "e1", from: "master-sovereignty", to: "master-energy", label: "Sécurisation Flux Électrons" },
  { id: "e2", from: "master-sovereignty", to: "master-ai", label: "Levier In Silico" },
  { id: "e3", from: "master-sovereignty", to: "master-autonomy", label: "Déploiement Physique & Terrain" },

  // Energy branch links
  { id: "e4", from: "master-energy", to: "sub-stf-photosynthesis", label: "Vecteur Direct" },
  { id: "e5", from: "master-energy", to: "sub-shockley-queisser", label: "Rendement Tandem" },
  { id: "e6", from: "sub-stf-photosynthesis", to: "sub-hydrogen-efuels", label: "Synthèse E-fuels" },

  // AI branch links
  { id: "e7", from: "master-ai", to: "sub-materials-project", label: "Screening Ab Initio" },
  { id: "e8", from: "master-ai", to: "sub-digital-twins", label: "CFD & Photoréacteurs" },
  { id: "e9", from: "sub-materials-project", to: "sub-stf-photosynthesis", label: "Catalyseurs Ni-Fe" },
  { id: "e10", from: "sub-digital-twins", to: "sub-stf-photosynthesis", label: "Dimensionnement Réacteur" },

  // Autonomy branch links
  { id: "e11", from: "master-autonomy", to: "sub-water-dual-network", label: "Audit SCAN" },
  { id: "e12", from: "master-autonomy", to: "sub-kaya-thermo", label: "Énergie / PIB" },
  { id: "e13", from: "master-autonomy", to: "sub-nexus-energy-water", label: "Double Boucle" },
  { id: "e14", from: "sub-water-dual-network", to: "sub-nexus-energy-water", label: "Réservoir & Pression" },
  { id: "e15", from: "sub-hydrogen-efuels", to: "sub-nexus-energy-water", label: "Eau Ultra-Pure" }
];

const LOCAL_STORAGE_KEY_NODES = "systemia_canvas_nodes_v1";
const LOCAL_STORAGE_KEY_EDGES = "systemia_canvas_edges_v1";

export default function ResearchCanvas() {
  const [nodes, setNodes] = useState<CanvasNode[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_NODES);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_NODES;
  });

  const [edges, setEdges] = useState<CanvasEdge[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_EDGES);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_EDGES;
  });

  // Selected node for sidebar drawer
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>("master-sovereignty");
  
  // Dragging state
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Link creation mode
  const [linkingFromId, setLinkingFromId] = useState<string | null>(null);

  // Modal for new node / doc
  const [showAddModal, setShowAddModal] = useState(false);
  const [newNodeTitle, setNewNodeTitle] = useState("");
  const [newNodeCategory, setNewNodeCategory] = useState<"blue" | "green" | "orange" | "purple">("blue");
  const [newNodeUrl, setNewNodeUrl] = useState("");
  const [newNodeSummary, setNewNodeSummary] = useState("");
  const [addClickPos, setAddClickPos] = useState<{ x: number; y: number } | null>(null);

  // Zoom and pan
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 20, y: 20 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0 });

  // Filter category
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_NODES, JSON.stringify(nodes));
    } catch {
      // localStorage may fail in restricted mode
    }
  }, [nodes]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_EDGES, JSON.stringify(edges));
    } catch {
      // localStorage error
    }
  }, [edges]);

  const selectedNode = useMemo(
    () => nodes.find(n => n.id === selectedNodeId) || null,
    [nodes, selectedNodeId]
  );

  // Dragging logic
  const handleMouseDownNode = (e: React.MouseEvent, node: CanvasNode) => {
    e.stopPropagation();
    if (linkingFromId) {
      if (linkingFromId !== node.id) {
        // Create link
        const newEdge: CanvasEdge = {
          id: `e-${Date.now()}`,
          from: linkingFromId,
          to: node.id,
          label: "Liaison"
        };
        setEdges(prev => [...prev, newEdge]);
      }
      setLinkingFromId(null);
      return;
    }

    setSelectedNodeId(node.id);
    setDraggingNodeId(node.id);

    // Track offset
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      dragOffset.current = {
        x: (e.clientX - rect.left - pan.x) / zoom - node.x,
        y: (e.clientY - rect.top - pan.y) / zoom - node.y
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggingNodeId) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const mouseX = (e.clientX - rect.left - pan.x) / zoom;
      const mouseY = (e.clientY - rect.top - pan.y) / zoom;

      const newX = Math.round(mouseX - dragOffset.current.x);
      const newY = Math.round(mouseY - dragOffset.current.y);

      setNodes(prev =>
        prev.map(n =>
          n.id === draggingNodeId ? { ...n, x: Math.max(10, newX), y: Math.max(10, newY) } : n
        )
      );
    } else if (isPanning) {
      setPan({
        x: e.clientX - panStart.current.x,
        y: e.clientY - panStart.current.y
      });
    }
  };

  const handleMouseUp = () => {
    setDraggingNodeId(null);
    setIsPanning(false);
  };

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || (e.target as HTMLElement).tagName === "svg") {
      setIsPanning(true);
      panStart.current = {
        x: e.clientX - pan.x,
        y: e.clientY - pan.y
      };
      if (linkingFromId) {
        setLinkingFromId(null);
      }
    }
  };

  // Double click on canvas to add node at cursor position
  const handleDoubleClickCanvas = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clickX = Math.round((e.clientX - rect.left - pan.x) / zoom);
    const clickY = Math.round((e.clientY - rect.top - pan.y) / zoom);
    setAddClickPos({ x: clickX, y: clickY });
    setNewNodeTitle("");
    setNewNodeSummary("");
    setNewNodeUrl("");
    setShowAddModal(true);
  };

  // Add new node submission
  const handleCreateNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNodeTitle.trim()) return;

    const posX = addClickPos ? addClickPos.x : 400 + Math.floor(Math.random() * 100);
    const posY = addClickPos ? addClickPos.y : 300 + Math.floor(Math.random() * 100);

    const newNode: CanvasNode = {
      id: `node-${Date.now()}`,
      title: newNodeTitle.trim(),
      category: newNodeCategory,
      x: posX,
      y: posY,
      docUrl: newNodeUrl.trim() || undefined,
      summary: newNodeSummary.trim() || "Document de recherche ajouté",
      notes: "Points clés à renseigner..."
    };

    setNodes(prev => [...prev, newNode]);
    setSelectedNodeId(newNode.id);
    setShowAddModal(false);
    setAddClickPos(null);
  };

  // Node deletion
  const handleDeleteNode = (id: string) => {
    setNodes(prev => prev.filter(n => n.id !== id));
    setEdges(prev => prev.filter(e => e.from !== id && e.to !== id));
    if (selectedNodeId === id) {
      setSelectedNodeId(null);
    }
  };

  // Edge deletion
  const handleDeleteEdge = (id: string) => {
    setEdges(prev => prev.filter(e => e.id !== id));
  };

  // Reset to default
  const handleResetMap = () => {
    if (window.confirm("Réinitialiser la cartographie aux nœuds et liaisons d'origine ?")) {
      setNodes(INITIAL_NODES);
      setEdges(INITIAL_EDGES);
      setSelectedNodeId("master-sovereignty");
      setPan({ x: 20, y: 20 });
      setZoom(1);
      localStorage.removeItem(LOCAL_STORAGE_KEY_NODES);
      localStorage.removeItem(LOCAL_STORAGE_KEY_EDGES);
    }
  };

  // Quick notes update
  const handleUpdateNotes = (notes: string) => {
    if (!selectedNodeId) return;
    setNodes(prev => prev.map(n => (n.id === selectedNodeId ? { ...n, notes } : n)));
  };

  const handleUpdateTitle = (title: string) => {
    if (!selectedNodeId) return;
    setNodes(prev => prev.map(n => (n.id === selectedNodeId ? { ...n, title } : n)));
  };

  const handleUpdateCategory = (category: "blue" | "green" | "orange" | "purple") => {
    if (!selectedNodeId) return;
    setNodes(prev => prev.map(n => (n.id === selectedNodeId ? { ...n, category } : n)));
  };

  const handleUpdateDocUrl = (docUrl: string) => {
    if (!selectedNodeId) return;
    setNodes(prev => prev.map(n => (n.id === selectedNodeId ? { ...n, docUrl } : n)));
  };

  // Compute node map for fast coordinate lookup
  const nodeMap = useMemo(() => {
    const map = new Map<string, CanvasNode>();
    nodes.forEach(n => map.set(n.id, n));
    return map;
  }, [nodes]);

  return (
    <div className="relative w-full h-[calc(100vh-65px)] overflow-hidden bg-slate-900 select-none">
      {/* 1. Canvas Top Toolbar */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl px-3 py-2 shadow-xl text-xs text-slate-200">
        <div className="flex items-center gap-1.5 pr-2 border-r border-slate-700">
          <Compass className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-slate-100 uppercase tracking-wider font-mono">
            Canvas Systémique
          </span>
        </div>

        {/* Add Node Button */}
        <button
          onClick={() => {
            setAddClickPos(null);
            setNewNodeTitle("");
            setNewNodeSummary("");
            setNewNodeUrl("");
            setShowAddModal(true);
          }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Ajouter Nœud / Doc</span>
        </button>

        {/* Link Mode Indicator */}
        {linkingFromId ? (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-500/20 border border-amber-400 text-amber-300 rounded-lg animate-pulse">
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Cliquez sur un nœud cible...</span>
            <button
              onClick={() => setLinkingFromId(null)}
              className="ml-1 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              if (selectedNodeId) {
                setLinkingFromId(selectedNodeId);
              } else {
                alert("Sélectionnez d'abord un nœud de départ.");
              }
            }}
            disabled={!selectedNodeId}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border transition ${
              selectedNodeId
                ? "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
                : "opacity-40 cursor-not-allowed bg-slate-800/40 border-slate-800 text-slate-500"
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5 text-sky-400" />
            <span>Lier</span>
          </button>
        )}

        {/* Filter categories */}
        <div className="hidden lg:flex items-center gap-1 pl-2 border-l border-slate-700">
          <span className="text-slate-400 text-[11px]">Filtre :</span>
          {(["all", "blue", "green", "orange", "purple"] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                categoryFilter === cat
                  ? "bg-slate-700 text-white shadow-inner"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              {cat === "all" ? "Tous" : CATEGORY_STYLES[cat].name.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 pl-2 border-l border-slate-700">
          <button
            onClick={() => setZoom(z => Math.max(0.4, z - 0.1))}
            className="p-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition"
            title="Zoom Arrière"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] font-mono text-slate-400 w-8 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom(z => Math.min(1.8, z + 0.1))}
            className="p-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition"
            title="Zoom Avant"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              setZoom(1);
              setPan({ x: 20, y: 20 });
            }}
            className="p-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition"
            title="Recentrer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Reset */}
        <button
          onClick={handleResetMap}
          className="flex items-center gap-1 px-2 py-1 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded transition ml-auto"
          title="Restaurer la cartographie initiale"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[11px]">Réinitialiser</span>
        </button>
      </div>

      {/* Helpful Hint Badge */}
      <div className="absolute bottom-4 left-4 z-20 hidden md:flex items-center gap-2 bg-slate-900/80 backdrop-blur-sm border border-slate-800 text-slate-400 text-[11px] px-3 py-1.5 rounded-lg pointer-events-none">
        <Info className="w-3.5 h-3.5 text-sky-400 shrink-0" />
        <span>
          Glissez les nœuds à la souris • Double-cliquez pour ajouter un document • Cliquez sur un nœud pour ouvrir le bloc-notes.
        </span>
      </div>

      {/* 2. Interactive SVG Canvas & Dot-Matrix Grid */}
      <div
        ref={containerRef}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onDoubleClick={handleDoubleClickCanvas}
        className="w-full h-full cursor-grab active:cursor-grabbing relative overflow-hidden"
        style={{
          backgroundColor: "#0b0f19",
          backgroundImage: `radial-gradient(circle, #243048 1.5px, transparent 1.5px)`,
          backgroundSize: `${32 * zoom}px ${32 * zoom}px`,
          backgroundPosition: `${pan.x}px ${pan.y}px`
        }}
      >
        {/* Transform Layer for Pan & Zoom */}
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: "0 0",
            position: "absolute",
            width: "3000px",
            height: "2200px"
          }}
        >
          {/* SVG Connecting Edges Layer */}
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
            style={{ overflow: "visible" }}
          >
            <defs>
              <marker
                id="arrowhead-default"
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#64748b" />
              </marker>
              <marker
                id="arrowhead-active"
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#10b981" />
              </marker>
              <marker
                id="arrowhead-blue"
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#0284c7" />
              </marker>
              <marker
                id="arrowhead-orange"
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#d97706" />
              </marker>
              <marker
                id="arrowhead-purple"
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#9333ea" />
              </marker>
            </defs>

            {edges.map(edge => {
              const source = nodeMap.get(edge.from);
              const target = nodeMap.get(edge.to);
              if (!source || !target) return null;

              // Node dimensions approx for anchor points
              const sW = source.isMaster ? 250 : 210;
              const sH = source.isMaster ? 110 : 85;
              const tW = target.isMaster ? 250 : 210;
              const tH = target.isMaster ? 110 : 85;

              const x1 = source.x + sW / 2;
              const y1 = source.y + sH / 2;
              const x2 = target.x + tW / 2;
              const y2 = target.y + tH / 2;

              // Calculate gentle bezier curve
              const dx = x2 - x1;
              const dy = y2 - y1;
              const cx1 = x1 + dx * 0.4;
              const cy1 = y1;
              const cx2 = x1 + dx * 0.6;
              const cy2 = y2;
              const pathData = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;

              const isConnectedToSelected =
                selectedNodeId === edge.from || selectedNodeId === edge.to;
              const strokeColor = isConnectedToSelected
                ? "#10b981"
                : CATEGORY_STYLES[source.category]?.lineColor || "#475569";

              const midX = (x1 + x2) / 2;
              const midY = (y1 + y2) / 2;

              return (
                <g key={edge.id} className="group">
                  <path
                    d={pathData}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={isConnectedToSelected ? 2.5 : 1.5}
                    strokeDasharray={isConnectedToSelected ? "none" : "4,3"}
                    markerEnd={
                      isConnectedToSelected
                        ? "url(#arrowhead-active)"
                        : `url(#arrowhead-${source.category})`
                    }
                    className="transition-colors duration-200"
                  />
                  {edge.label && (
                    <text
                      x={midX}
                      y={midY - 8}
                      textAnchor="middle"
                      fill={isConnectedToSelected ? "#e2e8f0" : "#94a3b8"}
                      fontSize="10"
                      fontFamily="monospace"
                      className="bg-slate-900 px-1 font-medium select-none"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* HTML Nodes Layer */}
          {nodes
            .filter(
              n => categoryFilter === "all" || n.category === categoryFilter
            )
            .map(node => {
              const isSelected = selectedNodeId === node.id;
              const isLinkingSource = linkingFromId === node.id;
              const style = CATEGORY_STYLES[node.category];

              return (
                <div
                  key={node.id}
                  onMouseDown={e => handleMouseDownNode(e, node)}
                  style={{
                    position: "absolute",
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    width: node.isMaster ? "250px" : "210px"
                  }}
                  className={`group rounded-xl border bg-slate-900/95 backdrop-blur-md shadow-lg transition-all duration-150 cursor-grab active:cursor-grabbing z-10 ${
                    isSelected
                      ? `ring-2 ring-emerald-400 border-emerald-400 shadow-2xl ${style.nodeGlow}`
                      : isLinkingSource
                      ? "ring-2 ring-amber-400 border-amber-400 animate-pulse"
                      : "border-slate-700/80 hover:border-slate-500 hover:shadow-xl"
                  }`}
                >
                  {/* Node Header Strip */}
                  <div
                    className={`h-1.5 w-full rounded-t-xl ${
                      node.isMaster ? style.headerBg : `${style.headerBg}/80`
                    }`}
                  />

                  <div className="p-3">
                    {/* Category pill & badges */}
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span
                        className={`text-[9.5px] uppercase font-mono font-semibold px-1.5 py-0.5 rounded border ${style.badge}`}
                      >
                        {style.name}
                      </span>

                      {node.isMaster && (
                        <span className="text-[9px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1 py-0.5 rounded font-bold">
                          PILIER
                        </span>
                      )}
                    </div>

                    {/* Node Title */}
                    <h4
                      className={`font-semibold leading-tight mb-1 text-slate-100 ${
                        node.isMaster ? "text-sm font-bold text-white" : "text-xs"
                      }`}
                    >
                      {node.title}
                    </h4>

                    {/* Short Summary */}
                    {node.summary && (
                      <p className="text-[10.5px] text-slate-400 line-clamp-2 leading-snug mb-2">
                        {node.summary}
                      </p>
                    )}

                    {/* Footer tags & quick actions */}
                    <div className="flex items-center justify-between pt-1.5 border-t border-slate-800 text-[10px] text-slate-400">
                      <div className="flex items-center gap-1 truncate">
                        {node.docUrl ? (
                          <span className="flex items-center gap-1 text-sky-400 font-medium">
                            <FileText className="w-3 h-3" />
                            <span className="truncate max-w-[100px]">Google Doc</span>
                          </span>
                        ) : (
                          <span className="text-slate-500 italic">Mémo local</span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                        {node.docUrl && (
                          <a
                            href={node.docUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="p-1 hover:text-emerald-400 hover:bg-slate-800 rounded transition"
                            title="Ouvrir le document"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            handleDeleteNode(node.id);
                          }}
                          className="p-1 hover:text-red-400 hover:bg-slate-800 rounded transition"
                          title="Supprimer ce nœud"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* 3. Slide-Over Contextual Drawer (Side Note & Edit Panel) */}
      {selectedNode && (
        <div className="absolute top-0 right-0 bottom-0 w-full sm:w-[380px] z-30 bg-slate-900/98 backdrop-blur-xl border-l border-slate-700/80 shadow-2xl flex flex-col text-slate-200 animate-in slide-in-from-right duration-200">
          {/* Drawer Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  CATEGORY_STYLES[selectedNode.category].dot
                }`}
              />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                Fiche Nœud Canvas
              </span>
            </div>
            <button
              onClick={() => setSelectedNodeId(null)}
              className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Category Selector */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                Catégorie & Thématique
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {(["blue", "green", "orange", "purple"] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleUpdateCategory(cat)}
                    className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-medium border text-left transition ${
                      selectedNode.category === cat
                        ? "bg-slate-800 border-emerald-500 text-white shadow-sm"
                        : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${CATEGORY_STYLES[cat].dot}`}
                    />
                    <span className="truncate">{CATEGORY_STYLES[cat].name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Title edit */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                Titre du Nœud
              </label>
              <input
                type="text"
                value={selectedNode.title}
                onChange={e => handleUpdateTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Direct Action Button: Open Associated Google Doc */}
            <div className="pt-1">
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                Lien Document Google Doc / Sheet
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://docs.google.com/..."
                  value={selectedNode.docUrl || ""}
                  onChange={e => handleUpdateDocUrl(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {selectedNode.docUrl && (
                <a
                  href={selectedNode.docUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 px-3 rounded-lg text-xs transition shadow-md"
                >
                  <FileText className="w-4 h-4" />
                  <span>Ouvrir le Google Doc associé</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-auto" />
                </a>
              )}
            </div>

            {/* Quick Notepad (Auto-saved memo) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-mono text-slate-400 uppercase flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Bloc-Notes Rapide (Mémo & Équations)</span>
                </label>
                <span className="text-[10px] text-emerald-400 font-mono">Enregistré auto</span>
              </div>
              <textarea
                rows={7}
                value={selectedNode.notes || ""}
                onChange={e => handleUpdateNotes(e.target.value)}
                placeholder="Saisissez vos observations, équations, to-do list, références d'articles scientifiques..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 font-mono leading-relaxed focus:outline-none focus:border-emerald-500 placeholder:text-slate-600"
              />
            </div>

            {/* Node Relations (Edges) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-mono text-slate-400 uppercase">
                  Liaisons Connectées ({edges.filter(e => e.from === selectedNode.id || e.to === selectedNode.id).length})
                </label>
                <button
                  onClick={() => setLinkingFromId(selectedNode.id)}
                  className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium"
                >
                  <Plus className="w-3 h-3" />
                  <span>Créer une liaison</span>
                </button>
              </div>

              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {edges
                  .filter(e => e.from === selectedNode.id || e.to === selectedNode.id)
                  .map(edge => {
                    const isSource = edge.from === selectedNode.id;
                    const otherNodeId = isSource ? edge.to : edge.from;
                    const otherNode = nodeMap.get(otherNodeId);

                    return (
                      <div
                        key={edge.id}
                        className="flex items-center justify-between bg-slate-950/70 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs"
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="text-slate-500 text-[10px]">
                            {isSource ? "Vers →" : "Depuis ←"}
                          </span>
                          <span className="font-medium text-slate-200 truncate">
                            {otherNode?.title || otherNodeId}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteEdge(edge.id)}
                          className="text-slate-500 hover:text-red-400 p-1"
                          title="Supprimer cette liaison"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Delete Node action */}
            <div className="pt-3 border-t border-slate-800">
              <button
                onClick={() => handleDeleteNode(selectedNode.id)}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-medium transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Supprimer ce nœud du Canvas</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Modal for Adding a New Node / Google Doc */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-5 text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-white text-sm">
                  Ajouter un Nœud de Recherche / Google Doc
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateNode} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Titre du document ou sujet *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Analyse Matériaux Pérovskite..."
                  value={newNodeTitle}
                  onChange={e => setNewNodeTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Catégorie thématique
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(["blue", "green", "orange", "purple"] as const).map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setNewNodeCategory(cat)}
                      className={`flex items-center gap-2 p-2 rounded-lg text-xs font-medium border text-left transition ${
                        newNodeCategory === cat
                          ? "bg-slate-800 border-emerald-500 text-white"
                          : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${CATEGORY_STYLES[cat].dot}`}
                      />
                      <span>{CATEGORY_STYLES[cat].name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Lien URL (Google Doc, Sheet ou URL web)
                </label>
                <input
                  type="url"
                  placeholder="https://docs.google.com/document/d/..."
                  value={newNodeUrl}
                  onChange={e => setNewNodeUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Court résumé ou mot-clé
                </label>
                <input
                  type="text"
                  placeholder="Ex: Mécanismes de demi-réactions et catalyseurs..."
                  value={newNodeSummary}
                  onChange={e => setNewNodeSummary(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium transition shadow-md"
                >
                  Créer et Positionner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
