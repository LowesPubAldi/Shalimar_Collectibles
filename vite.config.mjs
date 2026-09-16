import { resolve } from "node:path";
import { defineConfig } from "vite";

const rootDirectory = import.meta.dirname;

export default defineConfig({
    build: {
        rollupOptions: {
            input: resolve(rootDirectory, "inventory.html")
        }
    },
    server: {
        proxy: {
            "/api": "http://localhost:3000"
        }
    }
});