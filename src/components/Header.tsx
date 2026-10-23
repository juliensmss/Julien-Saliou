import { Mail, Phone, Linkedin, Award, LayoutDashboard, Cpu, TrendingUp, Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-neutral-900 bg-neutral-950/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Name */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-neutral-950 font-bold font-sans">
            JS
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white leading-none">Julien Saliou</h1>
            <p className="text-[10px] text-emerald-400 font-mono mt-0.5 tracking-wider uppercase">Ingénieur Généraliste d'Excellence</p>
          </div>
        </div>

        {/* Core Expertise Navigation Pills (Desktop) */}
        <nav className="hidden md:flex items-center gap-4 text-xs font-mono text-neutral-400">
          <span className="flex items-center gap-1 hover:text-white transition">
            <LayoutDashboard className="h-3.5 w-3.5 text-emerald-500" />
            Performance
          </span>
          <span className="text-neutral-700">/</span>
          <span className="flex items-center gap-1 hover:text-white transition">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
            Lean Six Sigma
          </span>
          <span className="text-neutral-700">/</span>
          <span className="flex items-center gap-1 hover:text-white transition">
            <Cpu className="h-3.5 w-3.5 text-emerald-500" />
            Énergie & IoT
          </span>
          <span className="text-neutral-700">/</span>
          <span className="flex items-center gap-1 hover:text-white transition">
            <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
            Innovation IA
          </span>
        </nav>

        {/* Simple Quick Action Button Block */}
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="mailto:ju.saliou@gmail.com"
            className="rounded-lg bg-emerald-500 text-neutral-950 mx-auto px-3.5 py-1.5 text-xs font-semibold hover:bg-emerald-400 transition cursor-pointer flex items-center gap-1.5"
            id="header-contact-button"
          >
            <Mail className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Me contacter</span>
          </a>
        </div>
      </div>

      {/* Quick Contact Banner (Bottom sub-header) */}
      <div className="bg-neutral-900 border-t border-b border-neutral-850 py-1 py-1.5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center sm:justify-between items-center gap-3 text-xs text-neutral-400">
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="mailto:ju.saliou@gmail.com" className="flex items-center gap-1.5 hover:text-emerald-400 transition" id="banner-email">
              <Mail className="h-3.5 w-3.5 text-emerald-500" />
              <span>ju.saliou@gmail.com</span>
            </a>
            <a href="tel:+33767917023" className="flex items-center gap-1.5 hover:text-emerald-400 transition" id="banner-phone">
              <Phone className="h-3.5 w-3.5 text-emerald-500" />
              <span>+33 7 67 91 70 23</span>
            </a>
            <a
              href="https://www.linkedin.com/in/juliencr6/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-emerald-400 transition"
              id="banner-linkedin"
            >
              <Linkedin className="h-3.5 w-3.5 text-emerald-500" />
              <span>linkedin.com/in/juliencr6</span>
            </a>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-emerald-400 font-mono text-[10px] tracking-widest uppercase">
            <Award className="h-3.5 w-3.5" />
            <span>Black Belt Certifié</span>
          </div>
        </div>
      </div>
    </header>
  );
}
