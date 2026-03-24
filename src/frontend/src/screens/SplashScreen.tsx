import { motion } from "motion/react";

interface Props {
  onStart: () => void;
}

export function SplashScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden gradient-hero">
      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-8 w-20 h-20 rounded-full bg-white/10 animate-pulse" />
        <div className="absolute top-24 right-12 w-14 h-14 rounded-2xl bg-accent/30 rotate-12" />
        <div className="absolute bottom-32 left-16 w-12 h-12 rounded-full bg-white/15" />
        <div className="absolute bottom-20 right-8 w-24 h-24 rounded-3xl bg-white/10 -rotate-12" />
        <div className="absolute top-1/2 left-4 w-8 h-8 rounded-full bg-accent/40" />
        <div className="absolute top-1/3 right-6 w-10 h-10 rounded-xl bg-white/20 rotate-45" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 px-8 text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
          className="text-7xl mb-2"
        >
          🎓
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-4xl font-black text-white tracking-tight leading-tight"
        >
          Aprende
          <br />
          <span className="text-accent">Jugando</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-white/80 text-lg font-medium max-w-xs"
        >
          ¡Diviértete mientras aprendes matemáticas, ciencias e informática!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-col items-center gap-4 mt-4"
        >
          <button
            type="button"
            data-ocid="splash.primary_button"
            onClick={onStart}
            className="px-10 py-4 bg-accent text-white font-bold text-lg rounded-full shadow-card-lg hover:opacity-90 active:scale-95 transition-all duration-200 animate-pulse"
          >
            🚀 ¡INICIAR!
          </button>
          <p className="text-white/60 text-sm">
            Para estudiantes de secundaria
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex gap-6 mt-6"
        >
          {["🧮", "💻", "🔬"].map((emoji) => (
            <div
              key={emoji}
              className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl"
            >
              {emoji}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
