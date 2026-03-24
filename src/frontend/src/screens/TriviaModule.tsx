import { Progress } from "@/components/ui/progress";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  categoryLabel,
  motivationalMessages,
  triviaQuestions,
} from "../data/trivia";
import { useActor } from "../hooks/useActor";

interface Props {
  onBack: () => void;
  onFinish: (score: number) => void;
}

type Phase = "question" | "feedback" | "result";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function TriviaModule({ onBack, onFinish }: Props) {
  const { actor } = useActor();
  const [questions] = useState(() => shuffle(triviaQuestions).slice(0, 10));
  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState<Phase>("question");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [motivationalMsg, setMotivationalMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const q = questions[current];
  const isCorrect = selectedIndex !== null && selectedIndex === q.correctIndex;

  function handleAnswer(index: number) {
    if (phase !== "question") return;
    setSelectedIndex(index);
    const correct = index === q.correctIndex;
    if (correct) {
      setScore((s) => s + 1);
      setMotivationalMsg(
        motivationalMessages[
          Math.floor(Math.random() * motivationalMessages.length)
        ],
      );
    }
    setPhase("feedback");
  }

  async function handleNext() {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelectedIndex(null);
      setPhase("question");
    } else {
      setPhase("result");
      setSubmitting(true);
      try {
        if (actor) {
          const sessionId = `session_${Date.now()}`;
          await actor.addTriviaSession(
            sessionId,
            BigInt(score),
            BigInt(questions.length),
          );
        }
      } catch (e) {
        console.error("Error saving trivia session", e);
      } finally {
        setSubmitting(false);
      }
    }
  }

  if (phase === "result") {
    const pct = Math.round((score / questions.length) * 100);
    const emoji = pct >= 80 ? "🏆" : pct >= 60 ? "😊" : "💪";
    const msg =
      pct >= 80
        ? "¡Eres un campeón!"
        : pct >= 60
          ? "¡Muy bien hecho!"
          : "¡Sigue practicando!";
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
          <h1 className="text-white font-black text-xl">Resultado Final</h1>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center px-5 gap-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-8xl"
          >
            {emoji}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <h2 className="font-black text-3xl text-foreground">{msg}</h2>
            <p className="text-muted-foreground mt-2">Terminaste el trivia</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-card rounded-3xl p-8 shadow-card-lg text-center w-full max-w-sm"
          >
            <div className="text-5xl font-black text-primary">
              {score}
              <span className="text-2xl text-muted-foreground">
                /{questions.length}
              </span>
            </div>
            <p className="text-muted-foreground mt-1 font-medium">
              respuestas correctas
            </p>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-muted-foreground mb-1">
                <span>Puntuación</span>
                <span className="font-bold text-primary">{pct}%</span>
              </div>
              <Progress value={pct} className="h-3" />
            </div>
          </motion.div>
          <div className="flex gap-3 w-full max-w-sm">
            <button
              type="button"
              data-ocid="trivia.result.secondary_button"
              onClick={() => {
                setCurrent(0);
                setScore(0);
                setSelectedIndex(null);
                setPhase("question");
              }}
              className="flex-1 py-3 rounded-full border-2 border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-colors"
            >
              🔄 Jugar de Nuevo
            </button>
            <button
              type="button"
              data-ocid="trivia.result.primary_button"
              onClick={() => onFinish(score)}
              className="flex-1 py-3 rounded-full gradient-card-blue text-white font-bold text-sm shadow-card hover:opacity-90 transition-opacity"
            >
              🏠 Volver al Menú
            </button>
          </div>
          {submitting && (
            <p
              className="text-muted-foreground text-sm"
              data-ocid="trivia.loading_state"
            >
              Guardando resultados...
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="gradient-hero px-5 py-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="text-white/80 text-2xl"
            data-ocid="trivia.back_button"
          >
            ←
          </button>
          <h1 className="text-white font-black text-lg">🎯 Trivia</h1>
          <div className="bg-white/20 rounded-full px-3 py-1">
            <span className="text-white font-bold text-sm">⭐ {score}</span>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between text-white/80 text-xs mb-1">
            <span>
              Pregunta {current + 1} de {questions.length}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                q.category === "matematica"
                  ? "bg-primary/30"
                  : q.category === "informatica"
                    ? "bg-accent/30"
                    : "bg-chart-3/30"
              }`}
            >
              {categoryLabel[q.category]}
            </span>
          </div>
          <Progress
            value={(current / questions.length) * 100}
            className="h-2 bg-white/20"
          />
        </div>
      </header>

      <main className="flex-1 px-4 py-5 flex flex-col gap-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-card rounded-2xl p-5 shadow-card mb-4">
              <p className="font-bold text-foreground text-lg leading-snug">
                {q.question}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {q.options.map((option, idx) => {
                let btnClass = "bg-card border-2 border-border text-foreground";
                if (phase === "feedback") {
                  if (idx === q.correctIndex)
                    btnClass =
                      "bg-brand-green border-2 border-brand-green text-white";
                  else if (idx === selectedIndex)
                    btnClass =
                      "bg-destructive border-2 border-destructive text-white";
                  else
                    btnClass =
                      "bg-card border-2 border-border text-muted-foreground opacity-60";
                }
                return (
                  <button
                    type="button"
                    key={option}
                    data-ocid={`trivia.option.${idx + 1}`}
                    onClick={() => handleAnswer(idx)}
                    disabled={phase === "feedback"}
                    className={`${btnClass} rounded-xl px-4 py-3.5 text-left font-semibold transition-all duration-200 active:scale-98 flex items-center gap-3`}
                  >
                    <span className="w-7 h-7 rounded-full bg-current/10 flex items-center justify-center text-sm font-bold shrink-0">
                      {["A", "B", "C", "D"][idx]}
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>

            {phase === "feedback" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 rounded-2xl p-4 ${
                  isCorrect
                    ? "bg-brand-green/10 border border-brand-green/30"
                    : "bg-destructive/10 border border-destructive/30"
                }`}
                data-ocid={
                  isCorrect ? "trivia.success_state" : "trivia.error_state"
                }
              >
                <p className="font-bold text-sm">
                  {isCorrect
                    ? motivationalMsg
                    : `❌ Incorrecto. La respuesta correcta es: "${q.options[q.correctIndex]}"`}
                </p>
                {!isCorrect && (
                  <p className="text-muted-foreground text-xs mt-1">
                    {q.explanation}
                  </p>
                )}
              </motion.div>
            )}

            {phase === "feedback" && (
              <button
                type="button"
                data-ocid="trivia.next_button"
                onClick={handleNext}
                className="mt-4 w-full py-4 gradient-card-blue text-white font-bold rounded-full shadow-card hover:opacity-90 transition-opacity"
              >
                {current < questions.length - 1
                  ? "Siguiente Pregunta →"
                  : "Ver Resultado Final 🏆"}
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
