import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Sparkles, User, Brain, ExternalLink } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "assistant";
  content: string;
}

const PRESET_QUESTIONS = [
  { text: "🧬 Projets SEVESO chez Exxon ?", query: "Présente-moi ses réalisations et sa méthodologie de projet SEVESO chez ExxonMobil." },
  { text: "⚡ Expérience Nucléaire (EDF) ?", query: "Quelle est son expérience de maintenance automatisme d'EDF au CNPE de Paluel ?" },
  { text: "📊 Certifications Lean & Six Sigma ?", query: "Quel est son niveau en Lean Six Sigma ? Parle-moi de ses certifications et du projet Minitab." },
  { text: "☀️ Supervision IoT & Énergie ?", query: "A-t-il de l'expérience en audit et déploiement de supervision IoT d'usine ou d'EMS ?" },
  { text: "🧠 Solution IA 'Junivers' ?", query: "Qu'est ce que le projet Junivers ? Parle-moi de la conception de cette solution d'introspection IA." }
];

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "assistant",
      content: "Bonjour et bienvenue sur mon portfolio interactif ! Je suis l'assistant IA de Julien Saliou. Vous pouvez me poser toutes vos questions concernant son parcours, ses projets en milieux critiques (Nucléaire, SEVESO), ses solutions d'ingénierie IoT ou ses certifications Lean Six Sigma Black Belt ! Que souhaitez-vous savoir ?"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages list grows
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsgId = Date.now().toString();
    const newMessages: Message[] = [
      ...messages,
      { id: userMsgId, sender: "user", content: text }
    ];

    setMessages(newMessages);
    setInputValue("");
    setIsTyping(true);

    try {
      const payload = newMessages.map(m => ({
        role: m.sender === "user" ? "user" : "model",
        content: m.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload })
      });

      const data = await res.json();
      
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "assistant",
          content: data.text || "Désolé, je n'ai pas pu générer une réponse."
        }
      ]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "assistant",
          content: "Oups ! Je rencontre temporairement un problème de connexion avec l'API. N'hésitez pas à relancer la question ou à contacter directement Julien au +33767917023 !"
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans" id="ai-assistant-root">
      {/* Floating Launcher Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 px-4 py-4 shadow-xl font-semibold cursor-pointer border border-emerald-400/20"
        id="ai-assistant-toggle"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6 animate-pulse" />}
        <span className="hidden sm:inline text-xs tracking-wider uppercase">Julien Copilot IA</span>
      </motion.button>

      {/* Main Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[580px] h-[calc(100vh-8rem)] rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl flex flex-col overflow-hidden"
            id="ai-assistant-panel"
          >
            {/* Header */}
            <div className="bg-neutral-950 p-4 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-emerald-500/10 p-2 text-emerald-400 border border-emerald-500/20">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-none">Copilot IA Julien</h4>
                  <p className="text-[10px] text-emerald-400 font-mono mt-1 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                    En ligne • Propulsé par Gemini 3.5
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-white rounded-md p-1 hover:bg-neutral-800 transition"
                id="ai-assistant-close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Conversation Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-900/50" id="ai-messages-container">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${m.sender === "user" ? "flex-row-reverse" : ""}`}
                >
                  {/* Avatar */}
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center text-xs shrink-0 border ${
                      m.sender === "user"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-neutral-950 text-neutral-400 border-neutral-800"
                    }`}
                  >
                    {m.sender === "user" ? <User className="h-3.5 w-3.5" /> : <Brain className="h-3.5 w-3.5" />}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 text-xs max-w-[80%] leading-relaxed ${
                      m.sender === "user"
                        ? "bg-emerald-500 text-neutral-950 font-medium rounded-tr-none"
                        : "bg-neutral-950 text-neutral-300 rounded-tl-none border border-neutral-850"
                    }`}
                  >
                    {/* Render message formatting lines simply */}
                    <div className="space-y-1 whitespace-pre-line prose prose-invert">
                      {m.content}
                    </div>
                  </div>
                </div>
              ))}

              {/* Loader */}
              {isTyping && (
                <div className="flex gap-2.5">
                  <div className="h-7 w-7 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center text-neutral-400 shadow-md">
                    <Brain className="h-3.5 w-3.5 animate-bounce" />
                  </div>
                  <div className="bg-neutral-950 border border-neutral-850 rounded-2xl p-3 text-xs text-neutral-400 flex items-center gap-1.5 rounded-tl-none">
                    <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Quick Helper Questions slider */}
            {messages.length < 3 && (
              <div className="px-4 py-2 bg-neutral-950 border-t border-b border-neutral-850">
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono mb-1.5">Questions Fréquentes</p>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
                  {PRESET_QUESTIONS.map((pq, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(pq.query)}
                      className="whitespace-nowrap rounded-lg border border-neutral-800 hover:border-emerald-500 bg-neutral-900 px-2.5 py-1 text-[10px] text-neutral-300 hover:text-white transition duration-200 shrink-0 cursor-pointer"
                    >
                      {pq.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Input form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
              className="p-3 bg-neutral-950 border-t border-neutral-800 flex gap-2 items-center"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Posez une question à l'IA..."
                className="flex-1 rounded-xl bg-neutral-900 border border-neutral-800 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition"
                id="ai-assistant-input"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="rounded-xl bg-emerald-500 text-neutral-950 p-2 hover:bg-emerald-400 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                id="ai-assistant-submit"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
