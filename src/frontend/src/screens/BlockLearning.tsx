import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { type LearningBlock, learningBlocks } from "../data/blocks";
import { useActor } from "../hooks/useActor";

interface Props {
  onBack: () => void;
}

type BlockPhase = "explain" | "question" | "feedback";

const PHASES: BlockPhase[] = ["explain", "question"];

function BlockDetail({
  block,
  onBack,
}: { block: LearningBlock; onBack: () => void }) {
  const { actor } = useActor();
  const [phase, setPhase] = useState<BlockPhase>("explain");
  const [selected, setSelected] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const isCorrect =
    selected !== null && selected === block.question.correctIndex;

  async function handleAnswer(idx: number) {
    if (phase !== "question") return;
    setSelected(idx);
    setPhase("feedback");
    setSaving(true);
    try {
      if (actor) {
        const correct = idx === block.question.correctIndex ? 1 : 0;
        await actor.addBlockEvaluation(block.id, BigInt(correct), BigInt(1));
      }
    } catch (e) {
      console.error("Error saving block eval", e);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header
        className={`${block.colorClass} px-5 py-4 flex items-center gap-3`}
      >
        <button
          type="button"
          onClick={onBack}
          className="text-white/80 text-2xl"
          data-ocid="block.back_button"
        >
          ←
        </button>
        <div>
          <p className="text-white/70 text-xs font-semibold uppercase">
            {block.subject}
          </p>
          <h1 className="text-white font-black text-xl">
            {block.icon} {block.title}
          </h1>
        </div>
      </header>

      <main className="flex-1 px-4 py-5 flex flex-col gap-4">
        <div className="flex gap-2">
          {PHASES.map((p, i) => (
            <div
              key={p}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                phase === "explain" && i === 0
                  ? "bg-primary"
                  : phase !== "explain" && i <= 1
                    ? "bg-primary"
                    : "bg-border"
              }`}
            />
          ))}
        </div>

        {phase === "explain" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4"
          >
            <div className="bg-card rounded-2xl p-5 shadow-card">
              <h2 className="font-bold text-foreground text-base mb-3">
                📖 Explicación
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                {block.explanation}
              </p>
            </div>
            <div className="bg-card rounded-2xl p-5 shadow-card">
              <h2 className="font-bold text-foreground text-base mb-3">
                💡 Ejemplo Práctico
              </h2>
              <pre className="text-sm text-foreground bg-secondary rounded-xl p-3 whitespace-pre-wrap font-sans leading-relaxed">
                {block.example}
              </pre>
            </div>
            <button
              type="button"
              data-ocid="block.next_button"
              onClick={() => setPhase("question")}
              className={`w-full py-4 ${block.colorClass} text-white font-bold rounded-full shadow-card hover:opacity-90 transition-opacity`}
            >
              ¿Entendiste? ¡Pon a prueba tu conocimiento! →
            </button>
          </motion.div>
        )}

        {(phase === "question" || phase === "feedback") && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-4"
          >
            <div className="bg-card rounded-2xl p-5 shadow-card">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                Mini Evaluación
              </p>
              <p className="font-bold text-foreground text-base leading-snug">
                {block.question.question}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {block.question.options.map((opt, idx) => {
                let cls = "bg-card border-2 border-border text-foreground";
                if (phase === "feedback") {
                  if (idx === block.question.correctIndex)
                    cls =
                      "bg-brand-green border-2 border-brand-green text-white";
                  else if (idx === selected)
                    cls =
                      "bg-destructive border-2 border-destructive text-white";
                  else
                    cls =
                      "bg-card border-2 border-border text-muted-foreground opacity-60";
                }
                return (
                  <button
                    type="button"
                    key={opt}
                    data-ocid={`block.option.${idx + 1}`}
                    onClick={() => handleAnswer(idx)}
                    disabled={phase === "feedback"}
                    className={`${cls} rounded-xl px-4 py-3.5 text-left font-semibold transition-all duration-200 flex items-center gap-3`}
                  >
                    <span className="w-7 h-7 rounded-full bg-current/10 flex items-center justify-center text-sm font-bold shrink-0">
                      {["A", "B", "C", "D"][idx]}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {phase === "feedback" && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-2xl p-4 ${
                    isCorrect
                      ? "bg-brand-green/10 border border-brand-green/30"
                      : "bg-destructive/10 border border-destructive/30"
                  }`}
                  data-ocid={
                    isCorrect ? "block.success_state" : "block.error_state"
                  }
                >
                  <p className="font-bold text-sm">
                    {isCorrect
                      ? "🎉 ¡Excelente! ¡Lo lograste!"
                      : "❌ Respuesta incorrecta."}
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">
                    {block.question.explanation}
                  </p>
                  {saving && (
                    <p
                      className="text-xs text-muted-foreground mt-1"
                      data-ocid="block.loading_state"
                    >
                      Guardando...
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            )}

            {phase === "feedback" && (
              <button
                type="button"
                data-ocid="block.finish_button"
                onClick={onBack}
                className={`w-full py-4 ${block.colorClass} text-white font-bold rounded-full shadow-card hover:opacity-90 transition-opacity`}
              >
                ← Volver a Bloques
              </button>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
}

export function BlockLearning({ onBack }: Props) {
  const [selected, setSelected] = useState<LearningBlock | null>(null);

  if (selected) {
    return <BlockDetail block={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="gradient-hero px-5 py-4 flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="text-white/80 text-2xl"
          data-ocid="blocks.back_button"
        >
          ←
        </button>
        <div>
          <h1 className="text-white font-black text-xl">
            📚 Aprendizaje por Bloques
          </h1>
          <p className="text-white/70 text-sm">
            Selecciona un tema para explorar
          </p>
        </div>
      </header>

      <main className="flex-1 px-4 py-5 flex flex-col gap-3">
        {learningBlocks.map((block, i) => (
          <motion.button
            type="button"
            key={block.id}
            data-ocid={`blocks.item.${i + 1}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => setSelected(block)}
            className={`${block.colorClass} rounded-2xl p-4 text-left shadow-card active:scale-98 transition-transform duration-150 flex items-center gap-4`}
          >
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shrink-0">
              {block.icon}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-white/70 text-xs font-semibold uppercase">
                {block.subject}
              </span>
              <p className="text-white font-bold text-base leading-tight">
                {block.title}
              </p>
              <p className="text-white/75 text-xs mt-0.5 leading-snug truncate">
                {block.description}
              </p>
            </div>
            <span className="text-white/60 text-xl shrink-0">›</span>
          </motion.button>
        ))}
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
