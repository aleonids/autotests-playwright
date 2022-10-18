import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  timeout: 60000,
  retries: 0, //количество повторов тестов
  use: {
    headless: true, //запускать браузер (false), без запуска браузера -true
    viewport: { width: 1280, height: 720 },
    actionTimeout: 15000, //таймаут для каждого действия
    ignoreHTTPSErrors: true, //игнорировать http ошибки
    video: "retain-on-failure", //делать скрин при фейле
    screenshot: "only-on-failure", //делать скрин при фейле
  },
  projects: [
    {
      name: "Chromium",
      use: { browserName: "chromium" },
    },
    //    {
    //name: "Firefox",
    //use: {browserName:"firefox"},
    //    }
    //
  ],
};
export default config;
