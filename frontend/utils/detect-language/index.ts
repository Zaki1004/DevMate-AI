import { DetectionResult } from "@/types/language";
import { calculateScores } from "./scoring";
import {
    ProgrammingLanguage
} from "./types";


export const detectLanguage = (
  sourceCode: string,
): DetectionResult => {
  const scores = calculateScores(sourceCode);

  scores.sort((a, b) => b.score - a.score);

  const winner = scores[0];

  if (!winner || winner.score === 0) {
    return {
      technology: "Plain Text",
      syntax: "text",
    };
  }

  return {
    technology: winner.technology,
    syntax: winner.syntax,
  };
};

export type { ProgrammingLanguage };
