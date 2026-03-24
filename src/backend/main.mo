import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Order "mo:core/Order";

actor {
  module TriviaSession {
    public func compare(session1 : TriviaSession, session2 : TriviaSession) : Order.Order {
      Int.compare(session1.timestamp, session2.timestamp);
    };
  };

  type TriviaSession = {
    correctAnswers : Nat;
    totalQuestions : Nat;
    timestamp : Int;
  };

  type BlockEvaluation = {
    blockId : Text;
    score : Nat;
    totalPossible : Nat;
    timestamp : Int;
  };

  let triviaSessions = Map.empty<Text, TriviaSession>();
  let blockEvaluations = Map.empty<Text, BlockEvaluation>();

  public shared ({ caller }) func addTriviaSession(sessionId : Text, correctAnswers : Nat, totalQuestions : Nat) : async () {
    let entry : TriviaSession = {
      correctAnswers;
      totalQuestions;
      timestamp = Time.now();
    };
    triviaSessions.add(sessionId, entry);
  };

  public shared ({ caller }) func addBlockEvaluation(blockId : Text, score : Nat, totalPossible : Nat) : async () {
    let evaluation : BlockEvaluation = {
      blockId;
      score;
      totalPossible;
      timestamp = Time.now();
    };
    blockEvaluations.add(blockId, evaluation);
  };

  public query ({ caller }) func getAllTriviaSessions() : async [TriviaSession] {
    triviaSessions.values().toArray().sort();
  };

  public query ({ caller }) func getAllBlockEvaluations() : async [BlockEvaluation] {
    blockEvaluations.values().toArray();
  };
};
