import { expect, test } from "@playwright/test";

import { env, getConfig, loadEnv } from "../../framework/config/env";
import { parseEnv } from "../../framework/config/schema";

test("env parser accepts the documented baseline @unit", () => {
  const parsed = parseEnv({
    BASE_URL: "https://automationexercise.com",
    HIGHLIGHT: "0",
    TEST_PASSWORD: "",
    TEST_USERNAME: "demo-user"
  });

  expect(parsed.BASE_URL).toBe("https://automationexercise.com");
  expect(parsed.HIGHLIGHT).toBe("0");
  expect(parsed.TEST_PASSWORD).toBeUndefined();
  expect(parsed.TEST_USERNAME).toBe("demo-user");
});

test("typed config converts flags and preserves credentials @unit", () => {
  const config = loadEnv({
    BASE_URL: "https://automationexercise.com",
    HIGHLIGHT: "1",
    TEST_PASSWORD: "secret",
    TEST_USERNAME: "demo-user"
  });

  expect(config.HIGHLIGHT).toBe(true);
  expect(config.TEST_PASSWORD).toBe("secret");
  expect(config.TEST_USERNAME).toBe("demo-user");
});

test("typed config uses automationexercise as the default base url @unit", () => {
  const config = loadEnv({ HIGHLIGHT: "0" });

  expect(config.BASE_URL).toBe("https://automationexercise.com");
});

test("getConfig returns camelCase typed config @unit", () => {
  const config = getConfig();

  expect(typeof config.baseUrl).toBe("string");
  expect(typeof config.highlight).toBe("boolean");
});

test("getConfig maps SCREAMING_SNAKE_CASE env to camelCase @unit", () => {
  const config = getConfig();

  expect(config.baseUrl).toBe(env.BASE_URL);
  expect(config.highlight).toBe(env.HIGHLIGHT);
  expect(config.testPassword).toBe(env.TEST_PASSWORD);
  expect(config.testUsername).toBe(env.TEST_USERNAME);
});
