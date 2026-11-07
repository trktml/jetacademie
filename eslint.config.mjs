import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  eslintConfigPrettier,
  {
    files: [
      "src/components/**/*.{ts,tsx}",
      "src/hooks/**/*.{ts,tsx}",
      "src/store/**/*.ts",
      "src/providers/**/*.{ts,tsx}",
      "src/lib/queries/**/*.ts",
      "src/lib/mutations/**/*.ts",
      "src/lib/*-client.ts",
      "src/lib/client-http.ts",
    ],
    ignores: ["**/*.test.*"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "auth",
                "db",
                "database-schema",
                "auth-configuration",
                "action-user",
                "auth-login-limit",
                "auth-rate-limit",
                "mutation-security",
                "request-origin",
                "user-preferences",
                "curriculum-db",
                "curriculum-progress",
                "curriculum-progress-service",
                "editor/auth",
                "editor/content",
                "editor/schema",
                "editor/http",
              ]
                .flatMap((module) => [`**/lib/${module}`, `**/lib/${module}.ts`])
                .concat(["**/lib/curriculum/**"]),
              message: "Sunucu verisine sunucu eylemi veya API üzerinden erişin.",
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "public/**",
  ]),
]);

export default eslintConfig;
