import { test as base, type Page } from "@playwright/test";

import { xLogger } from "../core/xLogger";
import { type FixtureServerHandle, startFixtureServer } from "./fixture-server";

export interface WorkerFixtures {
  fixtureServer: FixtureServerHandle;
}

export interface TestFixtures {
  logger: typeof xLogger;
  // The "app" capability — composed entry point for browser tests.
  // DI chain: page → app → (apiClient) → (authSession)
  // Extend this fixture to inject auth state or an API client alongside the page.
  app: Page;
}

export const test = base.extend<TestFixtures, WorkerFixtures>({
  fixtureServer: [
    // eslint-disable-next-line no-empty-pattern
    async ({}, use) => {
      const server = await startFixtureServer();
      await use(server);
      await server.close();
    },
    { scope: "worker" }
  ],
  // eslint-disable-next-line no-empty-pattern
  logger: async ({}, use) => {
    xLogger.resetForTesting();
    await use(xLogger);
    xLogger.resetForTesting();
  },
  app: async ({ page }, use) => {
    await use(page);
  }
});

export { expect } from "@playwright/test";
