import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    // plugins: [react()],
    esbuild: {
        target: "es2022", // or 'es2021'
    },
    plugins: [react({ fastRefresh: false })],
    // worker: {
    //     plugins: [react()],
    // },
});
