import { frontendRules } from "./frontend";
import { backendRules } from "./backend";
import { enterpriseRules } from "./enterprise";
import { mobileRules } from "./mobile";

import { LanguageRule } from "./types";

const languageRules: LanguageRule[] = [
  ...frontendRules,
  ...backendRules,
  ...enterpriseRules,
  ...mobileRules,
];

export interface LanguageScore {
  technology: string;
  syntax: string;
  score: number;
}

export const calculateScores = (
  sourceCode: string,
): LanguageScore[] => {
  const code = sourceCode.toLowerCase();

  return languageRules.map((rule) => {
    let score = 0;

    rule.patterns.forEach((pattern) => {
      if (pattern.test(code)) {
        score += 10;
      }
    });

    return {
      technology: rule.language,
      syntax: rule.language,
      score,
    };
  });
};