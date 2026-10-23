import React, { useState } from "react";
import {
  Linkedin,
  ExternalLink,
  MessageSquare,
  Send,
  CheckCircle2,
  RotateCcw,
  User,
  Building2
} from "lucide-react";

export default function ContactInvitations() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [objetType, setObjetType] = useState<"Professionnel" | "Particulier">("Professionnel");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  const contactDestination = "contact@juliensaliou.com";

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);

    const emailSubject = `[${objetType}] Contact via juliensaliou.com - ${prenom} ${nom}`;
    const emailBody = `Nom : ${nom}
Prénom : ${prenom}
Adresse e-mail : ${email}
Entreprise : ${entreprise || "Non précisée"}
Cadre / Profil : ${objetType}

Message :
${message}`;

    const mailtoUrl = `mailto:${contactDestination}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoUrl;
  };

  const handleResetForm = () => {
    setIsSent(false);
    setNom("");
    setPrenom("");
    setEmail("");
    setEntreprise("");
    setObjetType("Professionnel");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/70 border border-emerald-300 text-emerald-800 text-xs font-mono font-semibold">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>Contact & Échanges</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Prendre Contact
          </h1>
          <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Pour toute demande d'échange, d'intervention ou de collaboration, complétez le formulaire ci-dessous.
          </p>
        </div>

        {/* Main Card Form */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          {isSent ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Message préparé avec succès !
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Merci {prenom} {nom}. Votre messagerie s'ouvre avec votre message pré-rempli adressé à <strong>{contactDestination}</strong>.
              </p>
              <div className="pt-3 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Rédiger un autre message</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-5">
              
              {/* Nom & Prénom */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-nom" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 font-mono">
                    Nom <span className="text-emerald-600">*</span>
                  </label>
                  <input
                    id="contact-nom"
                    type="text"
                    required
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Votre nom"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label htmlFor="contact-prenom" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 font-mono">
                    Prénom <span className="text-emerald-600">*</span>
                  </label>
                  <input
                    id="contact-prenom"
                    type="text"
                    required
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    placeholder="Votre prénom"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Adresse e-mail & Entreprise */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 font-mono">
                    Adresse e-mail <span className="text-emerald-600">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre.email@domaine.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="contact-entreprise" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono">
                      Entreprise
                    </label>
                    <span className="text-[11px] text-slate-400 font-mono">(Facultatif)</span>
                  </div>
                  <input
                    id="contact-entreprise"
                    type="text"
                    value={entreprise}
                    onChange={(e) => setEntreprise(e.target.value)}
                    placeholder="Structure ou société"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Objet du message : Particulier / Professionnel */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 font-mono">
                  Objet du message (Vous êtes) <span className="text-emerald-600">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setObjetType("Professionnel")}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                      objetType === "Professionnel"
                        ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <Building2 className={`w-4 h-4 ${objetType === "Professionnel" ? "text-emerald-400" : "text-slate-400"}`} />
                    <span>Professionnel</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setObjetType("Particulier")}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                      objetType === "Particulier"
                        ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <User className={`w-4 h-4 ${objetType === "Particulier" ? "text-emerald-400" : "text-slate-400"}`} />
                    <span>Particulier</span>
                  </button>
                </div>
              </div>

              {/* Votre message (champ libre) */}
              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 font-mono">
                  Votre message (champ libre) <span className="text-emerald-600">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Bonjour Julien, je souhaite échanger avec vous concernant..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition leading-relaxed"
                />
              </div>

              {/* Bouton Envoyer */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs tracking-wide uppercase transition shadow-md hover:shadow-lg cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer</span>
                </button>
              </div>

            </form>
          )}

          {/* Lien LinkedIn en bas du champ message */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center">
            <a
              href="https://www.linkedin.com/in/juliencr6/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 text-slate-700 hover:text-sky-800 text-xs font-medium transition shadow-2xs group"
            >
              <Linkedin className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Retrouvez-moi également sur LinkedIn : <strong>linkedin.com/in/juliencr6</strong></span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600 transition-colors" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
