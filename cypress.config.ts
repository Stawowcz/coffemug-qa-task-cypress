import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://demowebshop.tricentis.com",
    defaultCommandTimeout: 8000,
    specPattern: "cypress/e2e/**/*.{spec,cy}.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    watchForFileChanges: false,

    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    video: true,
    screenshotOnRunFailure: true,

    setupNodeEvents(on, config) {},
  },
});
