import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import next from "@next/eslint-plugin-next";
import reactHooks from "eslint-plugin-react-hooks";
import ts from "typescript-eslint";

export default defineConfig([
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "playwright-report/**", "test-results/**"]),
  js.configs.recommended,
  ts.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [next.configs["core-web-vitals"], reactHooks.configs.flat.recommended],
  },
]);
