import { cpSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const rootDirectory = import.meta.dirname;

function copyStaticData() {
  return {
    name: "copy-static-data",
    closeBundle() {
      const source = resolve(rootDirectory, "data");
      const destination = resolve(rootDirectory, "dist/data");

      if (existsSync(source)) {
        cpSync(source, destination, { recursive: true });
      }
    },
  };
}

function copyStaticAssets() {
  return {
    name: "copy-static-assets",
    closeBundle() {
      const source = resolve(rootDirectory, "assets");
      const destination = resolve(rootDirectory, "dist/assets");

      if (existsSync(source)) {
        cpSync(source, destination, { recursive: true });
      }
    },
  };
}

export default defineConfig({
  plugins: [copyStaticData(), copyStaticAssets()],

  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDirectory, "index.html"),
        about: resolve(rootDirectory, "about.html"),
        cardTemplate: resolve(rootDirectory, "card-template.html"),
        contact: resolve(rootDirectory, "contact.html"),
        contributors: resolve(rootDirectory, "contributors.html"),
        evolution: resolve(rootDirectory, "evolution.html"),
        inventory: resolve(rootDirectory, "inventory.html"),
        item: resolve(rootDirectory, "item.html"),
        kings: resolve(rootDirectory, "kings.html"),
        sets: resolve(rootDirectory, "sets.html"),
      },
    },
  },

  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});