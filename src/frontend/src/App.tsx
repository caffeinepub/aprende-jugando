import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { BlockLearning } from "./screens/BlockLearning";
import { MainMenu } from "./screens/MainMenu";
import { ResultsScreen } from "./screens/ResultsScreen";
import { SplashScreen } from "./screens/SplashScreen";
import { TriviaModule } from "./screens/TriviaModule";

const queryClient = new QueryClient();

type Screen = "splash" | "menu" | "trivia" | "blocks" | "results";

function AprendeJugando() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [totalScore, setTotalScore] = useState(0);

  function navigate(target: Screen) {
    setScreen(target);
  }

  function handleTriviaFinish(sessionScore: number) {
    setTotalScore((s) => s + sessionScore);
    setScreen("menu");
  }

  return (
    <div className="min-h-screen w-full max-w-[430px] mx-auto relative overflow-x-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="w-full"
        >
          {screen === "splash" && (
            <SplashScreen onStart={() => navigate("menu")} />
          )}
          {screen === "menu" && (
            <MainMenu
              onNavigate={(s) => {
                if (s === "splash") navigate("splash");
                else if (s === "trivia") navigate("trivia");
                else if (s === "blocks") navigate("blocks");
                else if (s === "results") navigate("results");
              }}
              score={totalScore}
            />
          )}
          {screen === "trivia" && (
            <TriviaModule
              onBack={() => navigate("menu")}
              onFinish={handleTriviaFinish}
            />
          )}
          {screen === "blocks" && (
            <BlockLearning onBack={() => navigate("menu")} />
          )}
          {screen === "results" && (
            <ResultsScreen
              onBack={() => navigate("menu")}
              extraScore={totalScore}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AprendeJugando />
    </QueryClientProvider>
  );
}
