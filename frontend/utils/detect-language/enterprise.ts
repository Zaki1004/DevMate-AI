import { LanguageRule } from "./types";

export const enterpriseRules: LanguageRule[] = [
  /**
   * ===========================
   * Java
   * ===========================
   */

  {
    language: "java",
    patterns: [/public static void main/i],
  },

  {
    language: "java",
    patterns: [/System\.out\.println/i],
  },

  /**
   * ===========================
   * Spring Boot
   * ===========================
   */

  {
    language: "spring",
    patterns: [/@SpringBootApplication/i],
  },

  {
    language: "spring",
    patterns: [/@RestController/i],
  },

  {
    language: "spring",
    patterns: [/@Autowired/i],
  },

  /**
   * ===========================
   * C#
   * ===========================
   */

  {
    language: "csharp",
    patterns: [/using System/i],
  },

  {
    language: "csharp",
    patterns: [/Console\.WriteLine/i],
  },

  /**
   * ===========================
   * ASP.NET
   * ===========================
   */

  {
    language: "aspnet",
    patterns: [/builder\.Services/i],
  },

  {
    language: "aspnet",
    patterns: [/WebApplication\.CreateBuilder/i],
  },

  /**
   * ===========================
   * C++
   * ===========================
   */

  {
    language: "cpp",
    patterns: [/#include <iostream>/i],
  },

  {
    language: "cpp",
    patterns: [/std::cout/i],
  },

  /**
   * ===========================
   * C
   * ===========================
   */

  {
    language: "c",
    patterns: [/#include <stdio\.h>/i],
  },

  {
    language: "c",
    patterns: [/printf\(/i],
  },
];