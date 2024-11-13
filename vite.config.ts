// import react from "@vitejs/plugin-react";
// import path from "node:path";

// import { defineConfig, normalizePath } from "vite";
// import { viteStaticCopy } from "vite-plugin-static-copy";

// const require = createRequire(import.meta.url);

// const pdfjsDistPath = path.dirname(require.resolve("pdfjs-dist/package.json"));
// const cMapsDir = normalizePath(path.join(pdfjsDistPath, "cmaps"));

// // Without it dynamic require is not possible in config file
// import { createRequire } from "module";
// // https://vitejs.dev/config/

// export default defineConfig({
//   plugins: [
//     react(),
//     viteStaticCopy({
//       targets: [
//         {
//           src: cMapsDir,
//           dest: "",
//         },
//       ],
//     }),
//   ],
//   build: {
//     commonjsOptions: {
//       defaultIsModuleExports(id) {
//         const module = require(id);
//         if (module?.default) {
//           return false;
//         }
//         return "auto";
//       },
//     },
//   },
// });

import path from "node:path";
import { createRequire } from "node:module";
import react from "@vitejs/plugin-react";

import { defineConfig, normalizePath } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

const require = createRequire(import.meta.url);
const cMapsDir = normalizePath(
  path.join(path.dirname(require.resolve("pdfjs-dist/package.json")), "cmaps")
);
const standardFontsDir = normalizePath(
  path.join(
    path.dirname(require.resolve("pdfjs-dist/package.json")),
    "standard_fonts"
  )
);

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        { src: cMapsDir, dest: "" },
        { src: standardFontsDir, dest: "" },
      ],
    }),
    react(),
  ],
  build: {
    commonjsOptions: {
      defaultIsModuleExports(id) {
        const module = require(id);
        if (module?.default) {
          return false;
        }
        return "auto";
      },
    },
  },
});
