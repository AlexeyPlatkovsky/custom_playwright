import { type RouteHandler, htmlResponse } from "./fixture-server";
import { test as base } from "./base.fixture";

export interface TestFixtures {
  mountHtml: (html: string, path?: string) => Promise<string>;
}

export const test = base.extend<TestFixtures>({
  mountHtml: async ({ fixtureServer }, use) => {
    const routes: Record<string, RouteHandler> = {};
    const mount = (html: string, path = "/"): Promise<string> => {
      routes[path] = htmlResponse(html);
      fixtureServer.setRoutes(routes);
      return Promise.resolve(`${fixtureServer.baseURL}${path}`);
    };
    await use(mount);
    fixtureServer.setRoutes({});
  }
});

export { expect } from "@playwright/test";
