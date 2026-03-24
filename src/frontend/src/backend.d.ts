import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlockEvaluation {
    blockId: string;
    score: bigint;
    timestamp: bigint;
    totalPossible: bigint;
}
export interface TriviaSession {
    totalQuestions: bigint;
    correctAnswers: bigint;
    timestamp: bigint;
}
export interface backendInterface {
    addBlockEvaluation(blockId: string, score: bigint, totalPossible: bigint): Promise<void>;
    addTriviaSession(sessionId: string, correctAnswers: bigint, totalQuestions: bigint): Promise<void>;
    getAllBlockEvaluations(): Promise<Array<BlockEvaluation>>;
    getAllTriviaSessions(): Promise<Array<TriviaSession>>;
}
