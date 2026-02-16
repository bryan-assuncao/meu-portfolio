import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => {
  const repository = process.env.GITHUB_REPOSITORY?.split("/")[1];
  const isGithubActions = process.env.GITHUB_ACTIONS === "true";

  return {
    base: isGithubActions && repository ? `/${repository}/` : "/",
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [react()],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("framer-motion")) return "vendor-framer";
              if (id.includes("lucide-react")) return "vendor-icons";
              if (id.includes("@radix-ui")) return "vendor-ui";

              return "vendor";
            }
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
