import { resolve } from "node:path";
import { defineConfig } from "vite";

const rootDirectory = import.meta.dirname;

export default defineConfig({
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