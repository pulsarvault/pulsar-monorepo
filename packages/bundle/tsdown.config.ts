// packages/bundle/tsdown.config.ts
import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["iife"],
  globalName: "Vault",      // window.vault
  platform: "browser",
  outDir: "../../release",
  dts: true, sourcemap: true, clean: false,
  external: ["@vault/eventbus", "@vault/statemanager"],
  outputOptions: {
    globals: {
      "@vault/statemanager": "StateManager",
      "@vault/eventbus": "EventBus"
    },
    entryFileNames: "vault.js"
  }
});

