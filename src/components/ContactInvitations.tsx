import React, { useState } from "react";
import {
  Mail,
  Phone,
  Linkedin,
  Copy,
  Check,
  ExternalLink,
  MessageSquare
} from "lucide-react";

export default function ContactInvitations() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("ju.saliou@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("0767917023");
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/70 border border-emerald-300 text-emerald-800 text-xs font-mono font-semibold">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>Contact Direct & Échanges</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Prendre Contact
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Pour toute demande d'échange, d'intervention ou d'opportunité de collaboration, n'hésitez pas à me contacter directement.
          </p>
        </div>

        {/* Main Contact Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* 1. Email Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs uppercase font-mono font-bold text-slate-400 tracking-wider">
                  Adresse E-mail
                </h3>
                <p className="text-sm font-bold text-slate-900 break-all mt-0.5">
                  ju.saliou@gmail.com
                </p>
              </div>
            </div>

            <div className="pt-5 flex items-center gap-2">
              <a
                href="mailto:ju.saliou@gmail.com?subject=Prise%20de%20contact%20-%20Julien%20Saliou"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Écrire</span>
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition cursor-pointer"
                title="Copier l'adresse e-mail"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* 2. Téléphone Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs uppercase font-mono font-bold text-slate-400 tracking-wider">
                  Téléphone
                </h3>
                <p className="text-sm font-bold text-slate-900 mt-0.5 font-mono">
                  07 67 91 70 23
                </p>
              </div>
            </div>

            <div className="pt-5 flex items-center gap-2">
              <a
                href="tel:0767917023"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Appeler</span>
              </a>
              <button
                type="button"
                onClick={handleCopyPhone}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition cursor-pointer"
                title="Copier le numéro de téléphone"
              >
                {copiedPhone ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* 3. LinkedIn Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs uppercase font-mono font-bold text-slate-400 tracking-wider">
                  Réseau LinkedIn
                </h3>
                <p className="text-sm font-bold text-slate-900 mt-0.5 truncate">
                  in/juliencr6
                </p>
              </div>
            </div>

            <div className="pt-5">
              <a
                href="https://www.linkedin.com/in/juliencr6/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-sky-700 hover:bg-sky-600 text-white text-xs font-semibold shadow-xs transition"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>Profil LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-sky-200" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
