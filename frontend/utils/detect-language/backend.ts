import { LanguageRule } from "./types";

export const backendRules: LanguageRule[] = [
  /**
   * ===========================
   * Node.js
   * ===========================
   */
  {
    language: "node",
    patterns: [/require\(/i],
  },

  {
    language: "node",
    patterns: [/module\.exports/i],
  },

  {
    language: "node",
    patterns: [/process\.env/i],
  },

  /**
   * ===========================
   * Express
   * ===========================
   */

  {
    language: "express",
    patterns: [/express\(\)/i],
  },

  {
    language: "express",
    patterns: [/router\./i],
  },

  {
    language: "express",
    patterns: [/app\.use/i],
  },

  {
    language: "express",
    patterns: [/req,\s*res/i],
  },

  /**
   * ===========================
   * NestJS
   * ===========================
   */

  {
    language: "nestjs",
    patterns: [/@controller/i],
  },

  {
    language: "nestjs",
    patterns: [/@injectable/i],
  },

  {
    language: "nestjs",
    patterns: [/@get/i],
  },

  /**
   * ===========================
   * Fastify
   * ===========================
   */

  {
    language: "fastify",
    patterns: [/fastify\(/i],
  },

  {
    language: "fastify",
    patterns: [/reply\.send/i],
  },

  /**
   * ===========================
   * REST API
   * ===========================
   */

  {
    language: "rest",
    patterns: [/router\.get/i],
  },

  {
    language: "rest",
    patterns: [/router\.post/i],
  },

  {
    language: "rest",
    patterns: [/status\(/i],
  },

  /**
   * ===========================
   * GraphQL
   * ===========================
   */

  {
    language: "graphql",
    patterns: [/type Query/i],
  },

  {
    language: "graphql",
    patterns: [/graphql/i],
  },

  /**
 * ===========================
 * Go
 * ===========================
 */

{
  language: "go",
  patterns: [/func main/i],
},

{
  language: "go",
  patterns: [/package main/i],
},

/**
 * Gin
 */

{
  language: "gin",
  patterns: [/gin\.default/i],
},

{
  language: "gin",
  patterns: [/gin\.context/i],
},

/**
 * Fiber
 */

{
  language: "fiber",
  patterns: [/fiber\.new/i],
},

{
  language: "fiber",
  patterns: [/fiber\.ctx/i],
},

/**
 * Echo
 */

{
  language: "echo",
  patterns: [/echo\.new/i],
},

/**
 * Chi
 */

{
  language: "chi",
  patterns: [/chi\.newrouter/i],
},

/**
 * ===========================
 * PHP
 * ===========================
 */

{
  language: "php",
  patterns: [/<\?php/i],
},

{
  language: "php",
  patterns: [/echo\s+/i],
},

/**
 * Laravel
 */

{
  language: "laravel",
  patterns: [/route::get/i],
},

{
  language: "laravel",
  patterns: [/artisan/i],
},

{
  language: "laravel",
  patterns: [/eloquent/i],
},

/**
 * CodeIgniter
 */

{
  language: "codeigniter",
  patterns: [/base_url/i],
},

{
  language: "codeigniter",
  patterns: [/ci_controller/i],
},

/**
 * Symfony
 */

{
  language: "symfony",
  patterns: [/@route/i],
},

/**
 * ===========================
 * SQL
 * ===========================
 */

{
  language: "sql",
  patterns: [/select .* from/i],
},

{
  language: "sql",
  patterns: [/insert into/i],
},

{
  language: "sql",
  patterns: [/update .* set/i],
},

{
  language: "mysql",
  patterns: [/engine=innoDB/i],
},

{
  language: "postgresql",
  patterns: [/serial primary key/i],
},

/**
 * ===========================
 * Python
 * ===========================
 */

{
  language: "python",
  patterns: [/def /i],
},

{
  language: "python",
  patterns: [/import pandas/i],
},

{
  language: "python",
  patterns: [/if __name__ == "__main__"/i],
},

/**
 * YAML
 */

{
  language: "yaml",
  patterns: [/version:/i],
},

{
  language: "yaml",
  patterns: [/services:/i],
},

/**
 * Dockerfile
 */

{
  language: "dockerfile",
  patterns: [/^FROM /im],
},

{
  language: "dockerfile",
  patterns: [/CMD \[/i],
},

/**
 * Bash
 */

{
  language: "bash",
  patterns: [/#!\/bin\/bash/i],
},

{
  language: "bash",
  patterns: [/echo "/i],
},
];