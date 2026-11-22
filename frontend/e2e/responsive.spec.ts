import { expect, test } from "@playwright/test";

test("tablet layout keeps navigation separate and shows the full featured image", async ({ page }) => {
  await page.setViewportSize({ width: 780, height: 500 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const logo = page.getByRole("navigation", { name: "Navegación principal" }).getByRole("link").first();
  const badge = page.getByRole("status");
  const preview = page.getByRole("region", { name: "Sección de presentación" })
    .getByRole("img", { name: "Captura de FreeMarket" });
  const [logoBox, badgeBox, previewBox] = await Promise.all([
    logo.boundingBox(),
    badge.boundingBox(),
    preview.boundingBox(),
  ]);

  expect(logoBox).not.toBeNull();
  expect(badgeBox).not.toBeNull();
  expect(previewBox).not.toBeNull();
  expect(badgeBox!.y).toBeGreaterThan(logoBox!.y + logoBox!.height);
  expect(previewBox!.width).toBeGreaterThan(0);
  expect(previewBox!.height).toBeGreaterThan(0);
  await expect(preview).toHaveJSProperty("naturalWidth", 1905);
  await expect(preview).toHaveCSS("object-fit", "contain");
});

test("SEO metadata and crawler files use the active Render domain", async ({ page, request }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const siteUrl = "https://portfolio-p6iv.onrender.com/";
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", siteUrl);
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", siteUrl);
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
    "content",
    `${siteUrl}Ecommerce-Screenshot.png`,
  );
  const structuredData = await page.locator('script[type="application/ld+json"]').textContent();
  expect(structuredData).toContain(siteUrl);
  await expect(page.locator('script[src*="G-XXXXXXXXXX"]')).toHaveCount(0);

  const [robots, sitemap] = await Promise.all([
    request.get("/robots.txt"),
    request.get("/sitemap.xml"),
  ]);
  expect(await robots.text()).toContain(`${siteUrl}sitemap.xml`);
  expect(await sitemap.text()).toContain(siteUrl);
});

test("mobile navigation opens and the page has no horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const menuButton = page.getByRole("button", { name: "Abrir menú" });
  await menuButton.click();
  await expect(page.getByRole("button", { name: "Cerrar menú" })).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("navigation", { name: "Navegación móvil" }).getByRole("link", { name: "Sobre mí" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
});
