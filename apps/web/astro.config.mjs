import { defineConfig, envField } from "astro/config";
import react from "@astrojs/react";
import sanity from "@sanity/astro";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");
const projectId = env.SANITY_PROJECT_ID ?? "qyinc6gz";
const dataset = env.SANITY_DATASET ?? "production";

export default defineConfig({
  site: "https://sinter.studio",
  integrations: [
    sanity({
      projectId,
      dataset,
      useCdn: true,
      apiVersion: "2025-01-01",
    }),
    react(),
  ],
  env: {
    schema: {
      SANITY_PROJECT_ID: envField.string({ context: "server", access: "public", default: "qyinc6gz" }),
      SANITY_DATASET: envField.string({ context: "server", access: "public", default: "production" }),
    },
  },
});
