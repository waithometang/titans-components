import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
import dts from "vite-plugin-dts";

const COMP_NAMES = ["NativeTooltip"] as const;

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types",
    }),
  ],
  build: {
    outDir: "dist/es",
    lib: {
      entry: resolve(__dirname, "index.ts"),
      name: "TitansComponents",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue", "vue-jsx"],
      output: {
        exports: "named",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") {
            return "index.css";
          }
          return assetInfo.name as string;
        },
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }

          if (id.includes("hooks")) {
            return "hooks";
          }

          if (id.includes("utils")) {
            return "utils";
          }

          for (const item of COMP_NAMES) {
            if (id.includes(`packages/components/${item}`)) {
              return item;
            }
          }
        },
      },
    },
  },
});
