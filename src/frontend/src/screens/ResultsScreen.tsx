import { Progress } from "@/components/ui/progress";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { BlockEvaluation, TriviaSession } from "../backend.d";
import { useActor } from "../hooks/useActor";

interface Props {
  onBack: () => void;
  extraScore: number;
}

export function ResultsScreen({ onBack, extraScore }: Props) {
  const { actor } = useActor();
  const [triviaSessions, setTriviaSessions] = useState<TriviaSession[]>([]);
  const [blockEvals, setBlockEvals] = useState<BlockEvaluation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!actor) return;
    let cancelled = false;
    async function load() {
      try {
        const [sessions, evals] = await Promise.all([
          actor!.getAllTriviaSessions(),
          actor!.getAllBlockEvaluations(),
        ]);
        if (!cancelled) {
          setTriviaSessions(sessions);
          setBlockEvals(evals);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [actor]);

  const totalSessions = triviaSessions.length;
  const totalCorrect = triviaSessions.reduce(
    (sum, s) => sum + Number(s.correctAnswers),
    0,
  );
  const totalQuestions = triviaSessions.reduce(
    (sum, s) => sum + Number(s.totalQuestions),
    0,
  );
  const bestSession = triviaSessions.reduce((best, s) => {
    const pct =
      Number(s.totalQuestions) > 0
        ? (Number(s.correctAnswers) / Number(s.totalQuestions)) * 100
        : 0;
    return pct > best ? pct : best;
  }, 0);
  const triviaAccuracy =
    totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  const blocksCompleted = blockEvals.length;
  const blockPoints = blockEvals.reduce((sum, e) => sum + Number(e.score), 0);

  const overallPoints = totalCorrect + blockPoints + extraScore;
  const level =
    overallPoints < 5
      ? "Principiante"
      : overallPoints < 15
        ? "Aprendiz"
        : overallPoints < 30
          ? "Estudiante"
          : "Experto";
  const levelEmoji =
    overallPoints < 5
      ? "🌱"
      : overallPoints < 15
        ? "📚"
        : overallPoints < 30
          ? "🎓"
          : "🏆";

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="gradient-hero px-5 py-4 flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="text-white/80 text-2xl"
          >
            ←
          </button>
          <h1 className="text-white font-black text-xl">🏆 Mis Resultados</h1>
        </header>
        <div
          className="flex-1 flex items-center justify-center"
          data-ocid="results.loading_state"
        >
          <div className="text-center">
            <div className="text-5xl animate-bounce">⏳</div>
            <p className="text-muted-foreground mt-3 font-medium">
              Cargando tu progreso...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="gradient-hero px-5 py-4 flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="text-white/80 text-2xl"
          >
            ←
          </button>
          <h1 className="text-white font-black text-xl">🏆 Mis Resultados</h1>
        </header>
        <div
          className="flex-1 flex items-center justify-center"
          data-ocid="results.error_state"
        >
          <p className="text-destructive font-medium">
            Error al cargar resultados.
          </p>
        </div>
      </div>
    );
  }

  const isEmpty = totalSessions === 0 && blocksCompleted === 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="gradient-hero px-5 py-4 flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="text-white/80 text-2xl"
          data-ocid="results.back_button"
        >
          ←
        </button>
        <div>
          <h1 className="text-white font-black text-xl">🏆 Mis Resultados</h1>
          <p className="text-white/70 text-sm">Tu progreso de aprendizaje</p>
        </div>
      </header>

      <main className="flex-1 px-4 py-5 flex flex-col gap-4">
        {isEmpty ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-12"
            data-ocid="results.empty_state"
          >
            <div className="text-7xl">🌟</div>
            <div>
              <h2 className="font-black text-xl text-foreground">
                ¡Tu aventura comienza aquí!
              </h2>
              <p className="text-muted-foreground mt-2 text-sm max-w-xs">
                Aún no tienes resultados. ¡Juega un trivia o completa un bloque
                de aprendizaje para ver tu progreso!
              </p>
            </div>
            <button
              type="button"
              onClick={onBack}
              className="px-8 py-3 gradient-card-blue text-white font-bold rounded-full shadow-card hover:opacity-90 transition-opacity"
              data-ocid="results.primary_button"
            >
              🚀 ¡Empezar a jugar!
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="gradient-card-blue rounded-3xl p-5 text-white shadow-card-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-xs font-semibold uppercase">
                    Tu Nivel
                  </p>
                  <h2 className="font-black text-2xl mt-0.5">
                    {levelEmoji} {level}
                  </h2>
                  <p className="text-white/70 text-sm mt-1">
                    {overallPoints} puntos totales
                  </p>
                </div>
                <div className="text-6xl">{levelEmoji}</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-card rounded-2xl p-5 shadow-card"
            >
              <h3 className="font-bold text-foreground text-base mb-3">
                🎯 Estadísticas de Trivia
              </h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <p className="font-black text-2xl text-primary">
                    {totalSessions}
                  </p>
                  <p className="text-muted-foreground text-xs">Partidas</p>
                </div>
                <div className="text-center">
                  <p className="font-black text-2xl text-brand-green">
                    {totalCorrect}
                  </p>
                  <p className="text-muted-foreground text-xs">Correctas</p>
                </div>
                <div className="text-center">
                  <p className="font-black text-2xl text-accent">
                    {Math.round(bestSession)}%
                  </p>
                  <p className="text-muted-foreground text-xs">Mejor %</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Precisión total</span>
                  <span className="font-bold text-primary">
                    {triviaAccuracy}%
                  </span>
                </div>
                <Progress value={triviaAccuracy} className="h-2.5" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-card rounded-2xl p-5 shadow-card"
            >
              <h3 className="font-bold text-foreground text-base mb-3">
                📚 Aprendizaje por Bloques
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-secondary rounded-xl p-3 text-center">
                  <p className="font-black text-2xl text-brand-purple">
                    {blocksCompleted}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Bloques completados
                  </p>
                </div>
                <div className="bg-secondary rounded-xl p-3 text-center">
                  <p className="font-black text-2xl text-accent">
                    {blockPoints}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Puntos de bloques
                  </p>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Bloques completados</span>
                  <span className="font-bold text-brand-purple">
                    {blocksCompleted}/5
                  </span>
                </div>
                <Progress
                  value={(blocksCompleted / 5) * 100}
                  className="h-2.5"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="gradient-card-orange rounded-2xl p-4 text-white text-center"
            >
              <p className="font-bold">¡Sigue adelante! 💪</p>
              <p className="text-white/80 text-sm mt-1">
                Cada pregunta respondida te hace más inteligente.
              </p>
            </motion.div>
          </>
        )}
      </main>

      <footer className="bg-brand-navy text-white/60 text-center text-xs py-4">
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
