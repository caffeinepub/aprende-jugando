# Aprende Jugando

## Current State
Nuevo proyecto. No hay archivos de aplicación existentes.

## Requested Changes (Diff)

### Add
- Pantalla de inicio con nombre de la app y botón "Iniciar"
- Menú principal con 4 opciones: Trivias, Aprendizaje por bloques, Resultados, Salir
- Módulo de Trivias: 10+ preguntas de opción múltiple (matemática, informática, ciencia), puntaje, retroalimentación inmediata, resultado final
- Módulo de Aprendizaje por Bloques: bloques de contenido con título, explicación, ejemplo práctico y mini-evaluación al final
- Sistema de progreso: guardar puntaje acumulado, mostrar resultados
- Mensajes motivacionales al acertar, retroalimentación al fallar
- Diseño colorido, moderno y amigable para jóvenes

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Backend Motoko: almacenar puntajes de trivias y resultados de bloques por sesión; queries para obtener puntaje total y historial
2. Frontend: 6 vistas principales
   - SplashScreen (pantalla de inicio)
   - MainMenu (menú principal)
   - TriviaModule (preguntas, opciones, feedback, puntaje)
   - BlockLearning (lista de bloques y vista detalle con mini-evaluación)
   - ResultsScreen (historial y progreso acumulado)
   - Navegación entre pantallas con React state
3. Datos de trivias y bloques embebidos en el frontend (10+ preguntas, 5+ bloques educativos)
