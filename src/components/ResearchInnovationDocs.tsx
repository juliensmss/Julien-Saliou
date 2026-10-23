import React, { useState, useEffect, useMemo } from "react";
import {
  FileText,
  Plus,
  Search,
  ExternalLink,
  Lock,
  Unlock,
  Trash2,
  Edit3,
  Pin,
  Check,
  Copy,
  AlertCircle,
  Sparkles,
  BookOpen,
  Eye,
  X,
  Calendar,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Download,
  RotateCcw,
  CheckCircle2,
  FilePlus,
  FolderOpen
} from "lucide-react";

export interface GoogleDocItem {
  id: string;
  title: string;
  docUrl: string;
  category: string;
  status: "Recherche Validée" | "En Cours d'Étude" | "Guide Opérationnel" | "Note Stratégique" | "Brouillon";
  readingTime: string;
  summary: string;
  tags: string[];
  isPinned: boolean;
  updatedAt: string;
  author?: string;
}

const PRESET_CATEGORIES = [
  "Tous",
  "Ingénierie & Autonomie",
  "Énergie & Conversion",
  "IA In Silico & Modélisation",
  "Low-Tech & Thermodynamique",
  "Stratégie Systémique"
];

// New storage key so previous 5 pre-loaded demo documents are cleared
const STORAGE_KEY = "systemia_google_docs_library_v3";
const ADMIN_AUTH_KEY = "systemia_admin_authenticated_v3";

export default function ResearchInnovationDocs() {
  // State: Documents library - starts empty as requested
  const [docs, setDocs] = useState<GoogleDocItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn("Could not load stored google docs", e);
    }
    return [];
  });

  // State: Admin authentication
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ADMIN_AUTH_KEY) === "true";
    } catch {
      return false;
    }
  });

  // UI States
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState<string>("");
  const [adminError, setAdminError] = useState<string>("");

  const [showAddEditModal, setShowAddEditModal] = useState<boolean>(false);
  const [editingDocId, setEditingDocId] = useState<string | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState("");
  const [formUrl, setFormUrl] = useState("");
  const [formCategory, setFormCategory] = useState("Ingénierie & Autonomie");
  const [formCustomCategory, setFormCustomCategory] = useState("");
  const [formStatus, setFormStatus] = useState<GoogleDocItem["status"]>("Recherche Validée");
  const [formReadingTime, setFormReadingTime] = useState("5 min");
  const [formSummary, setFormSummary] = useState("");
  const [formTags, setFormTags] = useState("");
  const [formIsPinned, setFormIsPinned] = useState(false);
  const [formAuthor, setFormAuthor] = useState("Julien Saliou");

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Selected Doc for Reader / Preview Drawer
  const [selectedDocForPreview, setSelectedDocForPreview] = useState<GoogleDocItem | null>(null);

  // Persist docs on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
    } catch (e) {
      console.error("Failed to save docs", e);
    }
  }, [docs]);

  // Persist admin auth
  useEffect(() => {
    try {
      localStorage.setItem(ADMIN_AUTH_KEY, isAdmin ? "true" : "false");
    } catch (e) {
      console.error("Failed to save admin auth", e);
    }
  }, [isAdmin]);

  // Handle Admin Login
  const handleAdminLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanPwd = adminPasswordInput.trim().toLowerCase();
    if (
      cleanPwd === "admin" ||
      cleanPwd === "systemia" ||
      cleanPwd === "julien" ||
      cleanPwd === "systemia2026" ||
      cleanPwd === "secret"
    ) {
      setIsAdmin(true);
      setShowAdminModal(false);
      setAdminPasswordInput("");
      setAdminError("");
    } else {
      setAdminError("Mot de passe incorrect. (Astuce : saisissez 'admin' ou utilisez le bouton d'accès direct)");
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setShowAddEditModal(false);
  };

  // Open modal to add new document
  const openAddModal = () => {
    if (!isAdmin) {
      setShowAdminModal(true);
      return;
    }
    setEditingDocId(null);
    setFormTitle("");
    setFormUrl("");
    setFormCategory("Ingénierie & Autonomie");
    setFormCustomCategory("");
    setFormStatus("Recherche Validée");
    setFormReadingTime("5 min");
    setFormSummary("");
    setFormTags("");
    setFormIsPinned(false);
    setFormAuthor("Julien Saliou");
    setShowAddEditModal(true);
  };

  // Open modal to edit existing document
  const openEditModal = (doc: GoogleDocItem) => {
    if (!isAdmin) return;
    setEditingDocId(doc.id);
    setFormTitle(doc.title);
    setFormUrl(doc.docUrl);
    if (PRESET_CATEGORIES.includes(doc.category)) {
      setFormCategory(doc.category);
      setFormCustomCategory("");
    } else {
      setFormCategory("Autre");
      setFormCustomCategory(doc.category);
    }
    setFormStatus(doc.status);
    setFormReadingTime(doc.readingTime);
    setFormSummary(doc.summary);
    setFormTags(doc.tags.join(", "));
    setFormIsPinned(doc.isPinned);
    setFormAuthor(doc.author || "Julien Saliou");
    setShowAddEditModal(true);
  };

  // Save document (Create or Update)
  const handleSaveDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    if (!formTitle.trim()) {
      alert("Veuillez indiquer un titre pour le document.");
      return;
    }
    if (!formUrl.trim()) {
      alert("Veuillez indiquer le lien vers votre Google Doc ou ressource.");
      return;
    }

    const finalCategory =
      formCategory === "Autre" && formCustomCategory.trim()
        ? formCustomCategory.trim()
        : formCategory;

    const parsedTags = formTags
      .split(",")
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const today = new Date().toISOString().split("T")[0];

    if (editingDocId) {
      // Update
      setDocs(prev =>
        prev.map(d =>
          d.id === editingDocId
            ? {
                ...d,
                title: formTitle.trim(),
                docUrl: formUrl.trim(),
                category: finalCategory,
                status: formStatus,
                readingTime: formReadingTime.trim() || "5 min",
                summary: formSummary.trim(),
                tags: parsedTags.length > 0 ? parsedTags : ["Recherche"],
                isPinned: formIsPinned,
                updatedAt: today,
                author: formAuthor.trim() || "Julien Saliou"
              }
            : d
        )
      );
    } else {
      // Create new
      const newDoc: GoogleDocItem = {
        id: "doc-" + Date.now(),
        title: formTitle.trim(),
        docUrl: formUrl.trim(),
        category: finalCategory,
        status: formStatus,
        readingTime: formReadingTime.trim() || "5 min",
        summary: formSummary.trim(),
        tags: parsedTags.length > 0 ? parsedTags : ["Google Doc", "Recherche"],
        isPinned: formIsPinned,
        updatedAt: today,
        author: formAuthor.trim() || "Julien Saliou"
      };
      setDocs(prev => [newDoc, ...prev]);
    }

    setShowAddEditModal(false);
  };

  // Delete document
  const handleDeleteDoc = (id: string, title: string) => {
    if (!isAdmin) return;
    if (window.confirm(`Supprimer définitivement le document :\n"${title}" ?`)) {
      setDocs(prev => prev.filter(d => d.id !== id));
      if (selectedDocForPreview?.id === id) {
        setSelectedDocForPreview(null);
      }
    }
  };

  // Toggle pin
  const handleTogglePin = (id: string) => {
    if (!isAdmin) return;
    setDocs(prev =>
      prev.map(d => (d.id === id ? { ...d, isPinned: !d.isPinned } : d))
    );
  };

  // Export JSON
  const handleExportJSON = () => {
    const dataStr =
      "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(docs, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `systemia-recherche-innovation-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Copy URL to clipboard
  const copyDocUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered & Sorted documents
  const filteredDocs = useMemo(() => {
    return docs
      .filter(doc => {
        const matchesCategory =
          selectedCategory === "Tous" || doc.category === selectedCategory;
        const matchesSearch =
          searchQuery.trim() === "" ||
          doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return b.updatedAt.localeCompare(a.updatedAt);
      });
  }, [docs, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-8 px-4 sm:px-6 lg:px-8 selection:bg-emerald-600 selection:text-white transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* ========================================================= */}
        {/* TOP BANNER (LIGHT THEME) */}
        {/* ========================================================= */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
          {/* Gentle background accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-emerald-100/60 via-sky-100/40 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="px-3 py-1 text-xs font-mono font-semibold rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Espace Documentaire
                </span>
                
                {/* ROLE BADGE */}
                {isAdmin ? (
                  <span className="px-3 py-1 text-xs font-mono font-bold rounded-full bg-emerald-600 text-white flex items-center gap-1.5 shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Mode Administrateur Actif
                  </span>
                ) : (
                  <span className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-slate-100 text-slate-700 border border-slate-300 flex items-center gap-1.5">
                    <Lock className="w-3 h-3 text-slate-500" />
                    Mode Visiteur (Lecture seule)
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-mono">
                Recherche & Innovation
              </h1>
              
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Dispositif centralisé de publication et de consultation directe de mes travaux de recherche,
                méthodologies opérationnelles et études systémiques.
              </p>
            </div>

            {/* ACTION CONTROLS */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {isAdmin ? (
                <>
                  <button
                    onClick={openAddModal}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm flex items-center gap-2 shadow-sm transition hover:scale-102"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Ajouter un Google Doc</span>
                  </button>

                  <button
                    onClick={handleAdminLogout}
                    className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium border border-slate-300 transition flex items-center gap-1.5"
                    title="Revenir en mode visiteur lecture seule"
                  >
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                    <span>Quitter Admin</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-start lg:items-end gap-1.5">
                  <button
                    onClick={() => setShowAdminModal(true)}
                    className="px-4 py-2.5 bg-white hover:bg-slate-50 text-emerald-700 border border-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition"
                  >
                    <Unlock className="w-4 h-4 text-emerald-600" />
                    <span>Accès Administrateur (Ajout de Docs)</span>
                  </button>
                  <span className="text-[11px] text-slate-500">
                    Mode visiteur : consultation et ouverture libre des documents.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SEARCH, CATEGORY FILTERS & STATS (LIGHT THEME) */}
        {/* ========================================================= */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Rechercher par titre, mot-clé, tag ou concept..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick tools: counts & admin backup buttons */}
            <div className="flex items-center gap-3 text-xs text-slate-600">
              <span className="font-mono bg-white px-3 py-1.5 rounded-lg border border-slate-300 shadow-xs">
                <strong className="text-emerald-700">{filteredDocs.length}</strong> document(s) enregistré(s)
              </span>

              {isAdmin && docs.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleExportJSON}
                    className="p-1.5 bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-lg border border-slate-300 transition shadow-xs"
                    title="Sauvegarder la bibliothèque en fichier JSON"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {PRESET_CATEGORIES.map(cat => {
              const count =
                cat === "Tous"
                  ? docs.length
                  : docs.filter(d => d.category === cat).length;
              const isActive = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition flex items-center gap-1.5 shadow-xs ${
                    isActive
                      ? "bg-emerald-600 text-white font-semibold shadow-xs"
                      : "bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-300"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? "bg-emerald-700 text-emerald-100" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* DOCUMENTS GRID / EMPTY STATE (LIGHT THEME) */}
        {/* ========================================================= */}
        {filteredDocs.length === 0 ? (
          <div className="bg-white border border-slate-200/90 rounded-2xl p-12 text-center space-y-4 shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto">
              <FolderOpen className="w-8 h-8" />
            </div>
            
            <div className="space-y-1.5 max-w-md mx-auto">
              <h3 className="text-lg font-bold text-slate-900 font-mono">
                {docs.length === 0 ? "Aucun document pour le moment" : "Aucun document ne correspond à ce filtre"}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {docs.length === 0
                  ? "Vous êtes administrateur ? Ajoutez vos premiers liens Google Docs en cliquant sur le bouton ci-dessous pour alimenter la bibliothèque."
                  : "Essayez de modifier votre mot-clé de recherche ou de sélectionner « Tous » dans les catégories."}
              </p>
            </div>

            {isAdmin ? (
              <button
                onClick={openAddModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>+ Ajouter votre premier Google Doc</span>
              </button>
            ) : docs.length === 0 ? (
              <button
                onClick={() => setShowAdminModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-medium rounded-xl transition"
              >
                <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Déverrouiller le Mode Admin pour ajouter des docs</span>
              </button>
            ) : null}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map(doc => {
              return (
                <div
                  key={doc.id}
                  className={`relative flex flex-col justify-between bg-white border rounded-2xl p-5 sm:p-6 transition-all duration-200 hover:shadow-md group ${
                    doc.isPinned
                      ? "border-emerald-400 ring-1 ring-emerald-300 bg-gradient-to-b from-white via-white to-emerald-50/30"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {/* Top line metadata */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Domain / Category Badge */}
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-sky-50 text-sky-800 border border-sky-200">
                          {doc.category}
                        </span>

                        {/* Status Badge */}
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-medium border ${
                            doc.status === "Recherche Validée"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : doc.status === "Guide Opérationnel"
                              ? "bg-amber-50 text-amber-800 border-amber-200"
                              : "bg-purple-50 text-purple-800 border-purple-200"
                          }`}
                        >
                          {doc.status}
                        </span>
                      </div>

                      {/* Admin Pinned Indicator or Toggle */}
                      {isAdmin ? (
                        <button
                          onClick={() => handleTogglePin(doc.id)}
                          className={`p-1.5 rounded-lg transition ${
                            doc.isPinned
                              ? "text-emerald-700 bg-emerald-100 hover:bg-emerald-200"
                              : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                          }`}
                          title={doc.isPinned ? "Désépingler ce document" : "Épingler en haut de page"}
                        >
                          <Pin className="w-3.5 h-3.5" />
                        </button>
                      ) : doc.isPinned ? (
                        <span className="p-1 text-emerald-600" title="Document épinglé">
                          <Pin className="w-3.5 h-3.5" />
                        </span>
                      ) : null}
                    </div>

                    {/* Document Title */}
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                        {doc.title}
                      </h3>
                      
                      <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-500 font-mono">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {doc.readingTime}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {doc.updatedAt}
                        </span>
                      </div>
                    </div>

                    {/* Summary */}
                    {doc.summary && (
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {doc.summary}
                      </p>
                    )}

                    {/* Tags */}
                    {doc.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {doc.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 font-mono border border-slate-200"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      
                      {/* Direct Open in Google Docs */}
                      <a
                        href={doc.docUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-3 py-2 bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white border border-emerald-300 hover:border-emerald-600 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-xs"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Ouvrir Google Doc</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>

                      {/* Quick Preview / Reader */}
                      <button
                        onClick={() => setSelectedDocForPreview(doc)}
                        className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-xl text-xs transition border border-slate-200 shadow-xs"
                        title="Consulter les notes et détails"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Copy Link */}
                      <button
                        onClick={() => copyDocUrl(doc.docUrl, doc.id)}
                        className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-xl text-xs transition border border-slate-200 shadow-xs"
                        title="Copier le lien du document"
                      >
                        {copiedId === doc.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Admin Specific Controls (Edit / Delete) */}
                    {isAdmin && (
                      <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-100">
                        <button
                          onClick={() => openEditModal(doc)}
                          className="px-2.5 py-1 text-[11px] font-medium text-slate-600 hover:text-sky-700 hover:bg-slate-100 rounded-lg transition flex items-center gap-1"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Modifier</span>
                        </button>
                        <button
                          onClick={() => handleDeleteDoc(doc.id, doc.title)}
                          className="px-2.5 py-1 text-[11px] font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Supprimer</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ========================================================= */}
        {/* MODAL : ADMIN AUTHENTICATION (LIGHT THEME) */}
        {/* ========================================================= */}
        {showAdminModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-6">
              <button
                onClick={() => {
                  setShowAdminModal(false);
                  setAdminError("");
                }}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Espace Administrateur</h3>
                  <p className="text-xs text-slate-500">Réservé à Julien Saliou pour gérer la bibliothèque</p>
                </div>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mot de passe administrateur
                  </label>
                  <input
                    type="password"
                    value={adminPasswordInput}
                    onChange={e => {
                      setAdminPasswordInput(e.target.value);
                      setAdminError("");
                    }}
                    placeholder="Saisissez le mot de passe..."
                    autoFocus
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                  {adminError && (
                    <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {adminError}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm transition shadow-sm"
                  >
                    Déverrouiller
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsAdmin(true);
                      setShowAdminModal(false);
                    }}
                    className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium border border-slate-300 transition"
                    title="Connexion directe avec les privilèges administrateur"
                  >
                    Accès Direct Propriétaire
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODAL : ADD / EDIT GOOGLE DOC (LIGHT THEME) */}
        {/* ========================================================= */}
        {showAddEditModal && isAdmin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs overflow-y-auto">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative my-8 space-y-6">
              <button
                onClick={() => setShowAddEditModal(false)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                  <FilePlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {editingDocId ? "Modifier le Google Doc" : "Ajouter un nouveau Google Doc"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Le document apparaîtra instantanément dans votre bibliothèque de Recherche & Innovation.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveDoc} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Titre du document *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={e => setFormTitle(e.target.value)}
                    placeholder="Ex: Analyse Exergétique des Pompes à Chaleur et SCAN Terrain"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>

                {/* Google Doc URL */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700">
                      Lien de partage Google Doc / Sheet / Drive *
                    </label>
                    {formUrl && (
                      <a
                        href={formUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-emerald-700 hover:underline flex items-center gap-1 font-semibold"
                      >
                        Tester le lien <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <input
                    type="url"
                    required
                    value={formUrl}
                    onChange={e => setFormUrl(e.target.value)}
                    placeholder="https://docs.google.com/document/d/..."
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white font-mono text-xs"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Assurez-vous que le document est partagé avec « Tous les utilisateurs disposant du lien peuvent consulter ».
                  </span>
                </div>

                {/* Category & Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Thématique / Domaine
                    </label>
                    <select
                      value={formCategory}
                      onChange={e => setFormCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    >
                      <option value="Ingénierie & Autonomie">Ingénierie & Autonomie</option>
                      <option value="Énergie & Conversion">Énergie & Conversion</option>
                      <option value="IA In Silico & Modélisation">IA In Silico & Modélisation</option>
                      <option value="Low-Tech & Thermodynamique">Low-Tech & Thermodynamique</option>
                      <option value="Stratégie Systémique">Stratégie Systémique</option>
                      <option value="Autre">Autre (personnalisé)...</option>
                    </select>

                    {formCategory === "Autre" && (
                      <input
                        type="text"
                        value={formCustomCategory}
                        onChange={e => setFormCustomCategory(e.target.value)}
                        placeholder="Nom du domaine personnalisé..."
                        className="mt-2 w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Statut de la recherche
                    </label>
                    <select
                      value={formStatus}
                      onChange={e => setFormStatus(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    >
                      <option value="Recherche Validée">Recherche Validée</option>
                      <option value="Guide Opérationnel">Guide Opérationnel</option>
                      <option value="Note Stratégique">Note Stratégique</option>
                      <option value="En Cours d'Étude">En Cours d'Étude</option>
                      <option value="Brouillon">Brouillon</option>
                    </select>
                  </div>
                </div>

                {/* Reading time & Author */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Temps de lecture estimé
                    </label>
                    <input
                      type="text"
                      value={formReadingTime}
                      onChange={e => setFormReadingTime(e.target.value)}
                      placeholder="Ex: 8 min"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Auteur
                    </label>
                    <input
                      type="text"
                      value={formAuthor}
                      onChange={e => setFormAuthor(e.target.value)}
                      placeholder="Julien Saliou"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Summary / Notes */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Résumé synthétique & Enseignements clés
                  </label>
                  <textarea
                    rows={4}
                    value={formSummary}
                    onChange={e => setFormSummary(e.target.value)}
                    placeholder="Synthèse des constats physiques, méthodologie déployée et leviers systémiques..."
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mots-clés / Tags (séparés par des virgules)
                  </label>
                  <input
                    type="text"
                    value={formTags}
                    onChange={e => setFormTags(e.target.value)}
                    placeholder="Ex: SCAN, Gravitaire, Double Réseau, Résilience"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white font-mono text-xs"
                  />
                </div>

                {/* Pin checkbox */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="pinCheckbox"
                    checked={formIsPinned}
                    onChange={e => setFormIsPinned(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500"
                  />
                  <label htmlFor="pinCheckbox" className="text-xs text-slate-700 cursor-pointer">
                    Épingler ce document en haut de page (Priorité de visibilité)
                  </label>
                </div>

                {/* Action buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setShowAddEditModal(false)}
                    className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs transition shadow-sm flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{editingDocId ? "Enregistrer les modifications" : "Publier le document"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SLIDE-OVER READER / DETAILS DRAWER (LIGHT THEME) */}
        {/* ========================================================= */}
        {selectedDocForPreview && (
          <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-xs">
            <div className="w-full max-w-xl bg-white border-l border-slate-200 h-full p-6 sm:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl">
              <div className="space-y-6">
                
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {selectedDocForPreview.category}
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 leading-snug">
                      {selectedDocForPreview.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedDocForPreview(null)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Metadata Pills */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-mono py-2 border-y border-slate-200">
                  <span>Temps : {selectedDocForPreview.readingTime}</span>
                  <span>•</span>
                  <span>Mise à jour : {selectedDocForPreview.updatedAt}</span>
                  <span>•</span>
                  <span>Statut : {selectedDocForPreview.status}</span>
                </div>

                {/* Summary */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
                    Résumé du document
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                    {selectedDocForPreview.summary}
                  </p>
                </div>

                {/* Tags */}
                {selectedDocForPreview.tags.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
                      Mots-clés associés
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDocForPreview.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md text-xs bg-slate-100 text-slate-700 font-mono border border-slate-200"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Google Doc URL Details */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
                    Lien source
                  </h4>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs text-slate-600 break-all flex items-center justify-between gap-2">
                    <span className="truncate">{selectedDocForPreview.docUrl}</span>
                    <button
                      onClick={() => copyDocUrl(selectedDocForPreview.docUrl, selectedDocForPreview.id)}
                      className="p-1.5 bg-white hover:bg-slate-100 text-slate-700 rounded border border-slate-200 transition shrink-0"
                      title="Copier le lien"
                    >
                      {copiedId === selectedDocForPreview.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="pt-6 border-t border-slate-200 space-y-3">
                <a
                  href={selectedDocForPreview.docUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <FileText className="w-4 h-4" />
                  <span>Ouvrir dans Google Docs</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setSelectedDocForPreview(null)}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs transition border border-slate-200"
                >
                  Fermer le volet
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
