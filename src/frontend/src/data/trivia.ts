export type Category = "matematica" | "informatica" | "ciencia";

export interface TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  category: Category;
  explanation: string;
}

export const triviaQuestions: TriviaQuestion[] = [
  {
    id: 1,
    question: "¿Cuánto es 12 × 12?",
    options: ["124", "144", "132", "148"],
    correctIndex: 1,
    category: "matematica",
    explanation: "12 × 12 = 144. ¡Recuerda la tabla de multiplicar del 12!",
  },
  {
    id: 2,
    question: "¿Cuál es la raíz cuadrada de 81?",
    options: ["7", "8", "9", "10"],
    correctIndex: 2,
    category: "matematica",
    explanation: "√81 = 9, porque 9 × 9 = 81.",
  },
  {
    id: 3,
    question: "¿Cuántos lados tiene un pentágono?",
    options: ["4", "5", "6", "7"],
    correctIndex: 1,
    category: "matematica",
    explanation:
      "Un pentágono tiene 5 lados. 'Penta' significa cinco en griego.",
  },
  {
    id: 4,
    question: "¿Cuánto es 2³ (dos al cubo)?",
    options: ["6", "8", "9", "12"],
    correctIndex: 1,
    category: "matematica",
    explanation: "2³ = 2 × 2 × 2 = 8.",
  },
  {
    id: 5,
    question: "¿Qué significa CPU?",
    options: [
      "Centro de Procesamiento Universal",
      "Unidad Central de Procesamiento",
      "Control de Programas Únicos",
      "Computadora Personal Unificada",
    ],
    correctIndex: 1,
    category: "informatica",
    explanation:
      "CPU = Unidad Central de Procesamiento (Central Processing Unit en inglés).",
  },
  {
    id: 6,
    question: "¿Cuántos bits tiene un byte?",
    options: ["4", "6", "8", "16"],
    correctIndex: 2,
    category: "informatica",
    explanation:
      "Un byte = 8 bits. Es la unidad básica de almacenamiento digital.",
  },
  {
    id: 7,
    question: "¿Qué lenguaje se usa para crear páginas web?",
    options: ["Python", "Java", "HTML", "C++"],
    correctIndex: 2,
    category: "informatica",
    explanation:
      "HTML (HyperText Markup Language) es el lenguaje estándar para crear páginas web.",
  },
  {
    id: 8,
    question: "¿Cuántos planetas tiene el sistema solar?",
    options: ["7", "8", "9", "10"],
    correctIndex: 1,
    category: "ciencia",
    explanation:
      "Desde 2006, el sistema solar tiene 8 planetas (Plutón fue reclasificado como planeta enano).",
  },
  {
    id: 9,
    question: "¿A qué temperatura hierve el agua a nivel del mar?",
    options: ["90°C", "95°C", "100°C", "110°C"],
    correctIndex: 2,
    category: "ciencia",
    explanation: "El agua hierve a 100°C (212°F) a nivel del mar.",
  },
  {
    id: 10,
    question: "¿Cuál es el símbolo químico del oxígeno?",
    options: ["Ox", "O2", "O", "Og"],
    correctIndex: 2,
    category: "ciencia",
    explanation:
      "El símbolo del oxígeno es O (número atómico 8 en la tabla periódica).",
  },
  {
    id: 11,
    question: "¿Qué órgano bombea la sangre en el cuerpo humano?",
    options: ["El pulmón", "El hígado", "El riñón", "El corazón"],
    correctIndex: 3,
    category: "ciencia",
    explanation:
      "El corazón es el órgano muscular que bombea la sangre por todo el cuerpo.",
  },
  {
    id: 12,
    question: "¿Cuánto es el 25% de 200?",
    options: ["25", "40", "50", "75"],
    correctIndex: 2,
    category: "matematica",
    explanation: "25% de 200 = 200 × 0.25 = 50.",
  },
];

export const motivationalMessages = [
  "¡Excelente! ¡Eres un genio! 🌟",
  "¡Correcto! ¡Sigue así, campeón! 🏆",
  "¡Perfecto! ¡Tu cerebro es increíble! 🧠",
  "¡Brillante! ¡Lo sabías de memoria! ⚡",
  "¡Increíble! ¡Eres imparable! 🚀",
  "¡Fantástico! ¡Cada vez mejor! 🎯",
  "¡Súper! ¡Estás en racha! 🔥",
];

export const categoryLabel: Record<Category, string> = {
  matematica: "🧮 Matemáticas",
  informatica: "💻 Informática",
  ciencia: "🔬 Ciencia",
};

export const categoryColor: Record<Category, string> = {
  matematica: "gradient-card-blue",
  informatica: "gradient-card-orange",
  ciencia: "gradient-card-green",
};
