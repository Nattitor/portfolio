import { test, expect, type Page } from "@playwright/test";

async function scrollTo(page: Page, top: number) {
  await page.evaluate(async (y) => {
    window.scrollTo({ top: y, behavior: "instant" });
    await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
  }, top);
}

test("header and favicon share the Vega monogram, and Vellura uses its original local logo", async ({ page }) => {
  await page.goto("/");
  const monogram = page.locator(".hero-brand img");
  await expect(monogram).toHaveAttribute("src", "/icon.svg");
  await expect(monogram).toHaveAttribute("alt", "");
  await expect(page.locator('link[rel="icon"][href^="/icon.svg"]')).toHaveCount(1);
  const favicon = await page.request.get("/icon.svg");
  expect(favicon.status()).toBe(200);
  const mark = await favicon.text();
  expect(mark).toContain('viewBox="0 0 64 64"');
  expect(mark).toContain("#c8a45e");
  expect(mark).not.toContain("<text");

  const cover = page.locator(".project-vellura .project-cover");
  await expect(cover).toHaveAttribute("aria-hidden", "true");
  await expect(cover.locator(".project-cover-wordmark")).toHaveText("Vellura");
  const logo = cover.locator("img");
  await expect(logo).toHaveAttribute("src", "/images/projects/vellura-logo.svg");
  await expect(logo).toHaveAttribute("alt", "");
  await logo.scrollIntoViewIfNeeded();
  await expect.poll(() => logo.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBe(true);

  const response = await page.request.get("/images/projects/vellura-logo.svg");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("image/svg+xml");
  const svg = await response.text();
  expect(svg).toContain("M110 220L400 220L500 515L630 780L370 780Z");
  expect(svg).toContain("#6741C8");
  expect(svg).toContain("#58E8EF");
  expect(svg).not.toMatch(/<script|<foreignObject|(?:href|onload)=/i);
  const structure = await page.evaluate((source) => {
    const document = new DOMParser().parseFromString(source, "image/svg+xml");
    const ids = [...document.querySelectorAll("[id]")].map((node) => node.id);
    return { valid: !document.querySelector("parsererror"), uniqueIds: new Set(ids).size === ids.length };
  }, svg);
  expect(structure).toEqual({ valid: true, uniqueIds: true });
});

for (const width of [390, 1440]) {
  for (const reducedMotion of ["no-preference", "reduce"] as const) {
    test(`bottom navigation follows scroll and preserves keyboard access at ${width}px (${reducedMotion})`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion });
      await page.goto("/");
      const nav = page.locator(".site-nav");
      await nav.getByRole("button").click();
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      await expect(nav).toHaveAttribute("data-scroll-hidden", "false");
      if (reducedMotion === "reduce") await expect(nav).toHaveCSS("transition-duration", "0s");

      // A pointer click must not leave the bar permanently visible.
      await scrollTo(page, 600);
      await expect(nav).toHaveAttribute("data-scroll-hidden", "true");
      await expect(nav).toHaveCSS("opacity", "0");
      await expect(nav).toHaveCSS("pointer-events", "none");
      await expect(nav).not.toBeInViewport();

      await scrollTo(page, 540);
      await expect(nav).toHaveAttribute("data-scroll-hidden", "false");
      await expect(nav).toHaveCSS("opacity", "1");
      await expect(nav).toBeInViewport();
      await scrollTo(page, 544);
      await expect(nav).toHaveAttribute("data-scroll-hidden", "false");
      await scrollTo(page, 540);
      await expect(nav).toHaveAttribute("data-scroll-hidden", "false");

      await scrollTo(page, 900);
      await expect(nav).toHaveAttribute("data-scroll-hidden", "true");
      await page.keyboard.press("Tab");
      await expect(nav).toHaveAttribute("data-scroll-hidden", "false");
      await nav.getByRole("link").first().focus();
      await page.keyboard.press("Tab");
      await expect(nav.getByRole("link").nth(1)).toBeFocused();
      await scrollTo(page, 1100);
      await expect(nav).toHaveAttribute("data-scroll-hidden", "false");
      await expect(nav).toHaveCSS("opacity", "1");
      await expect(nav).toBeInViewport();

      await nav.getByRole("button").click();
      await expect(page.locator("html")).toHaveAttribute("lang", "es");
      await expect(nav.locator(":focus-visible")).toHaveCount(0);
      await scrollTo(page, 1300);
      await expect(nav).toHaveAttribute("data-scroll-hidden", "true");
      await expect(nav).toHaveCSS("pointer-events", "none");
      await scrollTo(page, 0);
      await expect(nav).toHaveAttribute("data-scroll-hidden", "false");
      await expect(nav).toHaveCSS("opacity", "1");
      await expect(nav).toBeInViewport();
    });
  }
}
