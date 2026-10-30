import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const email = "Ryufg.100@gmail.com";
const projects = ["Nattitor Analytics Dashboard", "Vellura", "Miru"];
const contactStatus = (page: Page) => page.locator("#contact [role='status']");

async function switchToEnglish(page: Page) {
  const languageButton = page.getByRole("button", { name: "Switch to English", exact: true });
  await languageButton.focus();
  await languageButton.click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
}

test("Spanish SSR, keyboard navigation, projects and production security headers", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("response", (response) => {
    if (response.url().includes("/_next/") && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
  });
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  expect(await response?.text()).toContain('<html lang="es"');
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page).toHaveTitle("Freddy Guerra | Desarrollador web");
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(/Freddy\s+Guerra\./);
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Saltar al contenido" });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeInViewport();
  await page.keyboard.press("Enter");
  await expect(page.locator("main#main-content")).toBeFocused();
  await expect(page.getByText(email, { exact: true })).toBeVisible();
  await expect(page.locator(`a[href="mailto:${email}"]`)).toBeVisible();
  await expect(contactStatus(page)).toHaveText("");
  const articles = page.locator("#projects article");
  await expect(articles).toHaveCount(3);
  for (const name of projects) await expect(articles.getByRole("heading", { name, exact: true })).toBeVisible();
  const miru = articles.filter({ has: page.getByRole("heading", { name: "Miru", exact: true }) });
  await expect(miru.getByText("En desarrollo", { exact: true })).toBeVisible();
  await expect(miru.locator("a, img")).toHaveCount(0);
  await expect(page.locator('a[href="#"]')).toHaveCount(0);
  const images = page.locator("#projects img, .hero-brand img");
  await expect(images).toHaveCount(3);
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBe(true);
  }
  for (const link of await page.locator('a[target="_blank"]').all()) {
    await expect(link).toHaveAttribute("rel", /noopener/);
    await expect(link).toHaveAttribute("rel", /noreferrer/);
    await expect(link).toHaveAccessibleName(/pestaña nueva/);
  }
  const headers = response?.headers() ?? {};
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["x-powered-by"]).toBeUndefined();
  const csp = headers["content-security-policy"];
  expect(csp).toMatch(/nonce-/);
  expect(csp).toMatch(/frame-ancestors\s+'none'/);
  const scriptPolicy = csp.split(";").find((directive) => directive.trim().startsWith("script-src"));
  expect(scriptPolicy).not.toMatch(/unsafe-inline|unsafe-eval/);
  const secondResponse = await page.request.get("/");
  expect(secondResponse.headers()["content-security-policy"]).not.toBe(csp);
  expect(errors).toEqual([]);
});

test("filters survive language changes, and the cookie persists English SSR", async ({ page, context }) => {
  await page.goto("/");
  const articles = page.locator("#projects article");
  const filter = page.getByRole("group", { name: "Filtrar proyectos" });
  await filter.getByRole("button", { name: "Publicados" }).click();
  await expect(articles).toHaveCount(2);
  await filter.getByRole("button", { name: "En desarrollo" }).click();
  await expect(articles).toHaveCount(1);
  await switchToEnglish(page);
  await expect(page.getByRole("group", { name: "Filter projects" }).getByRole("button", { name: "In development" })).toHaveAttribute("aria-pressed", "true");
  expect((await context.cookies()).find((cookie) => cookie.name === "portfolio-lang")).toMatchObject({ value: "en", sameSite: "Lax", path: "/" });
  await expect(page).toHaveTitle("Freddy Guerra | Web Developer");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /web developer/);
  await expect(page.getByRole("link", { name: /GitHub/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /LinkedIn/ })).toBeVisible();
  const response = await page.reload();
  expect(await response?.text()).toContain('<html lang="en"');
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(articles).toHaveCount(3);
  await page.getByRole("button", { name: "Cambiar a español", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
});

for (const language of ["es", "en"] as const) {
  test(`clipboard success, fallback and failure feedback (${language})`, async ({ page }) => {
    await page.goto("/");
    if (language === "en") await switchToEnglish(page);
    const copy = page.getByRole("button", { name: language === "es" ? "Copiar correo" : "Copy email", exact: true });
    const success = language === "es" ? "Correo copiado." : "Email copied.";
    const failure = language === "es" ? "No se pudo copiar. Puedes seleccionar el correo o abrir tu aplicación de correo." : "Could not copy. Select the address or open your email app.";
    await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async (text: string) => { document.documentElement.dataset.copied = text; } } }));
    await copy.click();
    await expect(contactStatus(page)).toHaveText(success);
    await expect(page.locator("html")).toHaveAttribute("data-copied", email);
    await page.evaluate(() => {
      Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async () => { throw new Error("blocked"); } } });
      document.execCommand = () => true;
    });
    await copy.click();
    await expect(contactStatus(page)).toHaveText(success);
    await expect(copy).toBeFocused();
    await page.evaluate(() => { document.execCommand = () => false; });
    await copy.click();
    await expect(contactStatus(page)).toHaveText(failure);
    await expect(page.getByText(email, { exact: true })).toBeVisible();
    await expect(page.locator("textarea")).toHaveCount(0);
    await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { configurable: true, value: undefined }));
    await copy.click();
    await expect(contactStatus(page)).toHaveText(failure);
    await page.evaluate(() => { document.execCommand = () => true; });
    await copy.click();
    await expect(contactStatus(page)).toHaveText(success);
    await expect(contactStatus(page)).toHaveText("", { timeout: 4_000 });
  });
}

test("pending clipboard requests prevent duplicates without trapping keyboard focus", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: {
      writeText: () => {
        const root = document.documentElement;
        root.dataset.copyCalls = String(Number(root.dataset.copyCalls ?? "0") + 1);
        return new Promise<void>((resolve) => document.addEventListener("finish-copy", () => resolve(), { once: true }));
      },
    } });
  });
  const copy = page.getByRole("button", { name: "Copiar correo", exact: true });
  await copy.focus();
  await page.keyboard.press("Enter");
  await expect(copy).toHaveAttribute("aria-disabled", "true");
  await expect(copy).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveAttribute("data-copy-calls", "1");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Enviar correo", exact: true })).toBeFocused();
  await page.evaluate(() => document.dispatchEvent(new Event("finish-copy")));
  await expect(contactStatus(page)).toHaveText("Correo copiado.");
  await expect(copy).toHaveAttribute("aria-disabled", "false");
});

test("invalid language cookie, crawler metadata and missing route", async ({ page, context, baseURL }) => {
  await context.addCookies([{ name: "portfolio-lang", value: "fr", url: baseURL! }]);
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  const robots = await page.request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Sitemap: https://nattitor-portfolio.vercel.app/sitemap.xml");
  const sitemap = await page.request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("<loc>https://nattitor-portfolio.vercel.app</loc>");
  expect((await page.request.get("/no-such-page")).status()).toBe(404);
});

for (const width of [320, 375, 390, 768, 1440]) {
  for (const language of ["es", "en"] as const) {
    test(`responsive layout and touch targets at ${width}px (${language})`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      if (language === "en") await switchToEnglish(page);
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const footerBox = await page.locator("footer").boundingBox();
      expect(footerBox!.x).toBeGreaterThanOrEqual(20);
      expect(footerBox!.x + footerBox!.width).toBeLessThanOrEqual(width - 20);
      const nodes = page.locator("#home .hero-topline, #home h1, #home .hero-actions, #home .hero-location, #projects article, #projects article h3, #contact, nav, nav a, nav button, footer");
      for (const node of await nodes.all()) {
        const box = await node.boundingBox();
        expect(box).not.toBeNull();
        expect(box!.x).toBeGreaterThanOrEqual(0);
        expect(box!.x + box!.width).toBeLessThanOrEqual(width + 1);
      }
      for (const control of await page.locator("button, a[href]:not(.skip-link)").all()) {
        const box = await control.boundingBox();
        expect(box?.height).toBeGreaterThanOrEqual(44);
        expect(box?.width).toBeGreaterThanOrEqual(44);
      }
      if (width === 390 || width === 1440) {
        const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
        expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
        await page.screenshot({ path: testInfo.outputPath(`portfolio-${width}-${language}.png`), fullPage: true });
      }
    });
  }
}

test("Ayabe sky is decorative and its motion finishes instead of looping", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator(".hero-sky")).toHaveAttribute("aria-hidden", "true");
  await expect(page.locator(".hero-constellation")).toHaveAttribute("aria-hidden", "true");
  for (const node of await page.locator(".hero-name, .hero-constellation, .lyra-vega, .shooting-star").all()) {
    const motion = await node.evaluate((element) => {
      const style = getComputedStyle(element);
      return { name: style.animationName, iterations: style.animationIterationCount, duration: parseFloat(style.animationDuration), delay: parseFloat(style.animationDelay) };
    });
    expect(motion.name).not.toBe("none");
    expect(motion.iterations).toBe("1");
    expect(motion.duration + motion.delay).toBeLessThanOrEqual(5);
  }
  await page.locator(".shooting-star").evaluate(async (node) => {
    await Promise.all(node.getAnimations().map((animation) => animation.finished));
  });
  await expect(page.locator(".shooting-star")).toHaveCSS("opacity", "0");
  const running = await page.locator("#home").evaluate((node) => node.getAnimations({ subtree: true }).filter((animation) => animation.playState === "running").length);
  expect(running).toBe(0);
});

test("desktop composition balances Lyra, keeps Miru compact and bounds section gaps", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  const selectors = [".hero-intro", ".hero-sky", ".hero-location", "#projects-heading", "#project-list", ".project-dashboard", ".project-vellura", ".project-miru", "#about-heading"];
  const boxes = await Promise.all(selectors.map((selector) => page.locator(selector).boundingBox()));
  for (const box of boxes) expect(box).not.toBeNull();
  const [intro, sky, location, heading, list, dashboard, vellura, miru, about] = boxes;
  expect(sky!.x).toBeGreaterThan(intro!.x + intro!.width);
  expect(miru!.x).toBeCloseTo(vellura!.x, 0);
  expect(miru!.x).toBeGreaterThan(dashboard!.x);
  expect(miru!.width).toBeLessThan(list!.width * 0.55);
  expect(miru!.height).toBeLessThan(160);
  await expect(page.locator(".project-miru .project-body")).toHaveCSS("padding", "0px");
  expect(heading!.y - location!.y - location!.height).toBeLessThan(180);
  expect(about!.y - list!.y - list!.height).toBeLessThan(140);
});

test("reduced motion removes sky animation, hover motion and transitions; clock uses 24-hour time", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(await page.locator("html").evaluate((node) => getComputedStyle(node).scrollBehavior)).toBe("auto");
  expect(await page.locator(".button-primary").first().evaluate((node) => getComputedStyle(node).transitionDuration)).toBe("0s");
  for (const node of await page.locator(".hero-name, .hero-constellation, .lyra-vega, .shooting-star").all()) {
    await expect(node).toHaveCSS("animation-name", "none");
  }
  await page.locator(".project-dashboard").hover();
  await expect(page.locator(".project-dashboard")).toHaveCSS("transform", "none");
  await expect(page.locator(".project-dashboard img")).toHaveCSS("transform", "none");
  await expect(page.locator("#about .tabular-nums")).toHaveText(/^(?:[01]\d|2[0-3]):[0-5]\d$/);
});
