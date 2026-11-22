import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4173",
    browserName: "chromium",
    launchOptions: {
      executablePath: process.env.CI ? undefined : "/usr/bin/google-chrome-stable",
      args: ["--no-sandbox"],
    },
  },
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 4173",
    env: { VITE_BASE_PATH: "/" },
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
  },
});
