export interface BlockQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LearningBlock {
  id: string;
  title: string;
  subject: string;
  icon: string;
  colorClass: string;
  description: string;
  explanation: string;
  example: string;
  question: BlockQuestion;
}

export const learningBlocks: LearningBlock[] = [
  {
    id: "algebra",
    title: "Álgebra Básica",
    subject: "Matemáticas",
    icon: "🧮",
    colorClass: "gradient-card-blue",
    description: "Aprende a resolver ecuaciones simples y a usar variables.",
    explanation:
      "El álgebra usa letras (variables) para representar números desconocidos. Una ecuación es una igualdad que contiene variables. Por ejemplo, x + 3 = 7 significa que x es el número que, sumado a 3, da 7. Para resolver, despejamos la variable: x = 7 - 3 = 4. Las ecuaciones son la base de las matemáticas avanzadas.",
    example:
      "Resuelve: 2x + 4 = 10\n→ 2x = 10 - 4\n→ 2x = 6\n→ x = 3\n✅ Comprueba: 2(3) + 4 = 10 ✓",
    question: {
      question: "Si 3x + 6 = 15, ¿cuánto vale x?",
      options: ["2", "3", "4", "5"],
      correctIndex: 1,
      explanation: "3x = 15 - 6 = 9, entonces x = 9 ÷ 3 = 3.",
    },
  },
  {
    id: "internet",
    title: "Internet y Redes",
    subject: "Informática",
    icon: "💻",
    colorClass: "gradient-card-orange",
    description: "Descubre cómo funciona internet y las redes de computadoras.",
    explanation:
      "Internet es una red global que conecta millones de computadoras. Una red de área local (LAN) conecta dispositivos en un espacio pequeño. El protocolo TCP/IP permite que las computadoras se comuniquen. Una dirección IP identifica cada dispositivo en la red, como una dirección postal. Los datos viajan en 'paquetes' por diferentes rutas hasta llegar a su destino.",
    example:
      "Cuando buscas en Google:\n1. Tu computadora envía una solicitud al servidor de Google\n2. Google procesa la búsqueda\n3. Los resultados viajan por internet\n4. Tu pantalla muestra los resultados\n¡Todo en menos de 1 segundo! ⚡",
    question: {
      question: "¿Qué es una dirección IP?",
      options: [
        "Un tipo de cable de red",
        "Un identificador único de cada dispositivo en la red",
        "El nombre de una página web",
        "Un programa de computadora",
      ],
      correctIndex: 1,
      explanation:
        "Una dirección IP (Internet Protocol) identifica de forma única a cada dispositivo conectado a una red.",
    },
  },
  {
    id: "celulas",
    title: "Las Células",
    subject: "Biología",
    icon: "🔬",
    colorClass: "gradient-card-green",
    description: "Conoce la unidad básica de la vida y sus componentes.",
    explanation:
      "La célula es la unidad básica y fundamental de todos los seres vivos. Existen dos tipos principales: células procariotas (sin núcleo definido, como las bacterias) y eucariotas (con núcleo, como las de plantas y animales). El núcleo contiene el ADN con la información genética. La membrana celular regula lo que entra y sale. La mitocondria es la 'central eléctrica' que produce energía.",
    example:
      "Comparación con una ciudad:\n🏛 Núcleo → Gobierno (controla todo)\n⚡ Mitocondria → Planta eléctrica (produce energía)\n🚪 Membrana → Frontera (controla el acceso)\n🏭 Ribosomas → Fábricas (producen proteínas)",
    question: {
      question: "¿Cuál es la función principal de la mitocondria?",
      options: [
        "Controlar el ADN",
        "Regular lo que entra y sale",
        "Producir energía para la célula",
        "Fabricar proteínas",
      ],
      correctIndex: 2,
      explanation:
        "La mitocondria produce energía (ATP) para todas las actividades de la célula. ¡Por eso se llama 'la central energética'!",
    },
  },
  {
    id: "movimiento",
    title: "El Movimiento",
    subject: "Física",
    icon: "⚡",
    colorClass: "gradient-card-purple",
    description: "Explora las leyes del movimiento y la velocidad.",
    explanation:
      "El movimiento ocurre cuando un objeto cambia de posición respecto a otro. La velocidad mide qué tan rápido se mueve: velocidad = distancia ÷ tiempo. La aceleración indica cómo cambia la velocidad. Isaac Newton describió las leyes del movimiento: la inercia (un objeto en reposo sigue en reposo), la fuerza = masa × aceleración, y la acción-reacción.",
    example:
      "Un auto recorre 120 km en 2 horas:\nVelocidad = 120 km ÷ 2 h = 60 km/h\n\nSi frena de 60 km/h a 0 en 4 segundos:\nAceleración = (0 - 60) ÷ 4 = -15 km/h/s\n(desaceleración)",
    question: {
      question:
        "Un ciclista recorre 30 km en 1.5 horas. ¿Cuál es su velocidad promedio?",
      options: ["15 km/h", "20 km/h", "25 km/h", "30 km/h"],
      correctIndex: 1,
      explanation: "Velocidad = 30 km ÷ 1.5 h = 20 km/h.",
    },
  },
  {
    id: "gramatica",
    title: "Gramática Española",
    subject: "Lenguaje",
    icon: "📝",
    colorClass: "gradient-card-pink",
    description: "Domina las reglas esenciales del español y redacta mejor.",
    explanation:
      "La gramática es el conjunto de reglas que rigen el uso correcto de un idioma. El sujeto indica quién realiza la acción; el predicado indica qué hace. Los verbos se conjugan según persona, número y tiempo. La ortografía define el uso correcto de letras y tildes. Una tilde cambia el significado: 'el' (artículo) vs 'él' (pronombre), 'si' (condicional) vs 'sí' (afirmación).",
    example:
      "Oración: 'Los estudiantes estudian mucho.'\n\n→ Sujeto: Los estudiantes\n→ Verbo: estudian\n→ Complemento: mucho\n\n¿Cuándo usar tilde?\n📌 'Más' (cantidad) vs 'mas' (pero)",
    question: {
      question: "¿Cuál es el SUJETO en: 'María canta una canción hermosa'?",
      options: ["canta", "una canción", "María", "hermosa"],
      correctIndex: 2,
      explanation:
        "El sujeto es quien realiza la acción. En esta oración, 'María' es quien canta.",
    },
  },
];
