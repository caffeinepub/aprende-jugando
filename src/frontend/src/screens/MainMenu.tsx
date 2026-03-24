import { motion } from "motion/react";

type Screen = "trivia" | "blocks" | "results" | "splash";

interface Props {
  onNavigate: (screen: Screen) => void;
  score: number;
}

const menuItems = [
  {
    id: "trivia" as Screen,
    label: "Trivias",
    icon: "🎯",
    colorClass: "gradient-card-blue",
    description: "10+ preguntas de mat, ciencia e informática",
    cta: "Jugar Ahora",
  },
  {
    id: "blocks" as Screen,
    label: "Bloques de Aprendizaje",
    icon: "📚",
    colorClass: "gradient-card-orange",
    description: "5 módulos con explicaciones y ejemplos",
    cta: "Explorar",
  },
  {
    id: "results" as Screen,
    label: "Mis Resultados",
    icon: "🏆",
    colorClass: "gradient-card-green",
    description: "Ve tu progreso acumulado",
    cta: "Ver Logros",
  },
  {
    id: "splash" as Screen,
    label: "Salir",
    icon: "🚪",
    colorClass: "gradient-card-purple",
    description: "Volver a la pantalla de inicio",
    cta: "Salir",
  },
];

export function MainMenu({ onNavigate, score }: Props) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-brand-navy text-white px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎓</span>
          <div>
            <h1 className="font-black text-lg leading-tight">APRENDE</h1>
            <p className="text-accent text-sm font-bold leading-tight">
              JUGANDO
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
          <span className="text-yellow-300">⭐</span>
          <span className="font-bold text-sm">{score} pts</span>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="gradient-hero mx-4 mt-4 rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute top-2 right-4 text-5xl opacity-30">✨</div>
        <div className="absolute bottom-2 right-12 text-3xl opacity-20">🌟</div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-white/80 text-sm font-semibold uppercase tracking-wide">
            ¡Bienvenido de vuelta!
          </p>
          <h2 className="text-white font-black text-2xl mt-1 leading-tight">
            ¡DIVIÉRTETE
            <br />
            APRENDIENDO! 🚀
          </h2>
          <p className="text-white/70 text-sm mt-2">
            Elige un módulo y comienza tu aventura de conocimiento
          </p>
        </motion.div>
      </div>

      {/* Menu Cards */}
      <main className="px-4 py-5">
        <h2 className="font-bold text-foreground text-lg mb-3">
          ¿Qué quieres hacer hoy?
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.id}
              data-ocid={`menu.${item.id}.button`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              onClick={() => onNavigate(item.id)}
              className={`${item.colorClass} rounded-2xl p-4 text-white text-left shadow-card active:scale-95 transition-transform duration-150 flex flex-col gap-2`}
            >
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
                {item.icon}
              </div>
              <div>
                <p className="font-bold text-sm leading-tight">{item.label}</p>
                <p className="text-white/75 text-xs mt-0.5 leading-snug">
                  {item.description}
                </p>
              </div>
              <span className="text-xs font-semibold bg-white/20 rounded-full px-3 py-1 self-start mt-1">
                {item.cta} →
              </span>
            </motion.button>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-brand-navy text-white/60 text-center text-xs py-4 mt-4">
        <p>
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
