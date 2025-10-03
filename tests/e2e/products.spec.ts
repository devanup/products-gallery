import { test, expect } from '@playwright/test';

test.describe('Products Page', () => {
  test('should load and display products', async ({ page }) => {
    await page.goto('/products');

    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();

    await page.waitForSelector('[data-testid="product-card"], .group', {
      timeout: 10000,
    });

    const products = await page.locator('.group').count();
    expect(products).toBeGreaterThan(0);
  });

  test('should filter products by category', async ({ page }) => {
    await page.goto('/products');

    await page.waitForSelector('[data-testid="product-card"], .group', {
      timeout: 10000,
    });

    const filterButton = page.getByRole('button', { name: /filters/i });
    await filterButton.click();

    const electronicsButton = page.getByRole('button', { name: /electronics/i });
    if (await electronicsButton.isVisible()) {
      await electronicsButton.click();

      await page.waitForTimeout(500);

      const url = page.url();
      expect(url).toContain('category=electronics');
    }
  });

  test('should search for products', async ({ page }) => {
    await page.goto('/products');

    await page.waitForSelector('[data-testid="product-card"], .group', {
      timeout: 10000,
    });

    const searchInput = page.getByPlaceholder(/search products/i);
    await searchInput.fill('shirt');

    await page.waitForTimeout(500);

    const url = page.url();
    expect(url).toContain('search=shirt');
  });

  test('should load more products', async ({ page }) => {
    await page.goto('/products');

    await page.waitForSelector('[data-testid="product-card"], .group', {
      timeout: 10000,
    });

    const initialProducts = await page.locator('.group').count();

    const loadMoreButton = page.getByRole('button', { name: /load more/i });
    if (await loadMoreButton.isVisible()) {
      await loadMoreButton.click();

      await page.waitForTimeout(500);

      const newProducts = await page.locator('.group').count();
      expect(newProducts).toBeGreaterThan(initialProducts);
    }
  });
});
