import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import { readdirSync } from "fs";
import { filter, map } from "lodash-es";

function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true });

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}
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

          for (const dirName of getDirectoriesSync("../components")) {
            if (id.includes(`packages/components/${dirName}`)) {
              return dirName;
            }
          }
        },
      },
    },
  },
});
