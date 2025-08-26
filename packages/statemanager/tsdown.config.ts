import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "iife"],     // ESM + browser global
  globalName: "StateManager",// window.StateManager in <script> builds
  platform: "browser",         // produce a browser bundle for the iife
  dts: true,
  sourcemap: true,
  outDir: "dist",
  clean: true
});

