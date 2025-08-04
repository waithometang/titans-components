import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue(), vueJsx()],
  build: {
    outDir: "dist/umd",
    lib: {
      entry: resolve(__dirname, "index.ts"),
      name: "TitansComponents",
      fileName: "index",
      formats: ["umd"],
    },
    rollupOptions: {
      external: ["vue", "vue-jsx"],
      output: {
        globals: {
          vue: "Vue",
          "vue-jsx": "VueJSX",
        },
        exports: "named",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") {
            return "index.css";
          }
          return assetInfo.name as string;
        },
      },
    },
  },
});
