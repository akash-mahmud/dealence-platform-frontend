import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";



// Without it dynamic require is not possible in config file
import { createRequire } from "module";
const require = createRequire(import.meta.url);
// https://vitejs.dev/config/


export default defineConfig({
  plugins: [ react(), viteTsconfigPaths(), svgrPlugin()],
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
