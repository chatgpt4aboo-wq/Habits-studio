import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(async ({ mode }) => {
  // The Lovable editor tags components in dev only; it is optional at runtime.
  const plugins: PluginOption[] = [react()];
  if (mode === "development") {
    try {
      const { componentTagger } = await import("lovable-tagger");
      plugins.push(componentTagger());
    } catch {
      /* tagger not installed — carry on */
    }
  }

  return {
    server: { host: "::", port: 8080 },
    plugins,
    resolve: {
      alias: { "@": path.resolve(__dirname, "./src") },
    },
  };
});
