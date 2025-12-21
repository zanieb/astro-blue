import { test, expect, type Page } from '@playwright/test';

/**
 * Visual Regression Tests
 *
 * These tests capture screenshots of the current Mintlify/PYX visual design
 * and compare them on future runs. This protects against accidental visual
 * regressions during CSS refactoring.
 *
 * IMPORTANT: Before running these tests, make sure the dev server is running.
 * Run: bun run dev
 *
 * To generate baseline screenshots (first run):
 * bun run test:visual:update
 *
 * To run visual regression tests:
 * bun run test:visual
 */

// Helper to set theme
async function setTheme(page: Page, theme: 'light' | 'dark') {
  await page.evaluate((selectedTheme: string) => {
    document.documentElement.dataset.theme = selectedTheme;
    localStorage.setItem('starlight-theme', selectedTheme);
  }, theme);
  // Wait for theme to apply
  await page.waitForTimeout(500);
}

test.describe('Visual Regression - Homepage', () => {
  test('homepage - light mode - desktop', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'light');
    await expect(page).toHaveScreenshot('homepage-light-desktop.png', {
      fullPage: true,
    });
  });

  test('homepage - dark mode - desktop', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'dark');
    await expect(page).toHaveScreenshot('homepage-dark-desktop.png', {
      fullPage: true,
    });
  });

  test('homepage - light mode - mobile', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'light');
    await expect(page).toHaveScreenshot('homepage-light-mobile.png', {
      fullPage: true,
    });
  });

  test('homepage - dark mode - mobile', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'dark');
    await expect(page).toHaveScreenshot('homepage-dark-mobile.png', {
      fullPage: true,
    });
  });
});

test.describe('Visual Regression - Getting Started', () => {
  test('installation page - light mode', async ({ page }) => {
    await page.goto('/getting-started/installation');
    await setTheme(page, 'light');
    await expect(page).toHaveScreenshot('installation-light-desktop.png', {
      fullPage: true,
    });
  });

  test('installation page - dark mode', async ({ page }) => {
    await page.goto('/getting-started/installation');
    await setTheme(page, 'dark');
    await expect(page).toHaveScreenshot('installation-dark-desktop.png', {
      fullPage: true,
    });
  });
});

test.describe('Visual Regression - Guides', () => {
  test('guides page - light mode', async ({ page }) => {
    await page.goto('/guides/customization');
    await setTheme(page, 'light');
    await expect(page).toHaveScreenshot('guides-light-desktop.png', {
      fullPage: true,
    });
  });

  test('guides page - dark mode', async ({ page }) => {
    await page.goto('/guides/customization');
    await setTheme(page, 'dark');
    await expect(page).toHaveScreenshot('guides-dark-desktop.png', {
      fullPage: true,
    });
  });
});

test.describe('Visual Regression - Concepts', () => {
  test('concepts page - light mode', async ({ page }) => {
    await page.goto('/concepts/components');
    await setTheme(page, 'light');
    await expect(page).toHaveScreenshot('concepts-light-desktop.png', {
      fullPage: true,
    });
  });

  test('concepts page - dark mode', async ({ page }) => {
    await page.goto('/concepts/components');
    await setTheme(page, 'dark');
    await expect(page).toHaveScreenshot('concepts-dark-desktop.png', {
      fullPage: true,
    });
  });
});

test.describe('Visual Regression - Reference', () => {
  test('reference page - light mode', async ({ page }) => {
    await page.goto('/reference/configuration');
    await setTheme(page, 'light');
    await expect(page).toHaveScreenshot('reference-light-desktop.png', {
      fullPage: true,
    });
  });

  test('reference page - dark mode', async ({ page }) => {
    await page.goto('/reference/configuration');
    await setTheme(page, 'dark');
    await expect(page).toHaveScreenshot('reference-dark-desktop.png', {
      fullPage: true,
    });
  });
});

test.describe('Visual Regression - UI Components', () => {
  test('sidebar - expanded state - light mode', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'light');

    // Make sure sidebar is visible (desktop view)
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Screenshot just the sidebar area
    const sidebar = page.locator('.sidebar-pane');
    await expect(sidebar).toHaveScreenshot('sidebar-expanded-light.png');
  });

  test('sidebar - expanded state - dark mode', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'dark');

    await page.setViewportSize({ width: 1920, height: 1080 });

    const sidebar = page.locator('.sidebar-pane');
    await expect(sidebar).toHaveScreenshot('sidebar-expanded-dark.png');
  });

  test('code block with copy button - light mode', async ({ page }) => {
    await page.goto('/getting-started/installation');
    await setTheme(page, 'light');

    // Find first code block
    const codeBlock = page.locator('.expressive-code').first();
    await expect(codeBlock).toHaveScreenshot('code-block-light.png');
  });

  test('code block with copy button - dark mode', async ({ page }) => {
    await page.goto('/getting-started/installation');
    await setTheme(page, 'dark');

    const codeBlock = page.locator('.expressive-code').first();
    await expect(codeBlock).toHaveScreenshot('code-block-dark.png');
  });

  test('search button - light mode', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'light');

    await page.setViewportSize({ width: 1920, height: 1080 });

    const searchButton = page.locator('site-search button[data-open-modal]');
    await expect(searchButton).toHaveScreenshot('search-button-light.png');
  });

  test('search button - dark mode', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'dark');

    await page.setViewportSize({ width: 1920, height: 1080 });

    const searchButton = page.locator('site-search button[data-open-modal]');
    await expect(searchButton).toHaveScreenshot('search-button-dark.png');
  });

  test('theme toggle - light mode', async ({ page }, testInfo) => {
    // Skip on mobile since theme toggle is in hamburger menu
    test.skip(testInfo.project.name === 'mobile-chromium', 'Theme toggle not visible on mobile');

    await page.goto('/');
    await setTheme(page, 'light');

    // Select the theme toggle in the header (not the mobile menu)
    const themeToggle = page.locator('header starlight-theme-select button').first();
    await expect(themeToggle).toHaveScreenshot('theme-toggle-light.png');
  });

  test('theme toggle - dark mode', async ({ page }, testInfo) => {
    // Skip on mobile since theme toggle is in hamburger menu
    test.skip(testInfo.project.name === 'mobile-chromium', 'Theme toggle not visible on mobile');

    await page.goto('/');
    await setTheme(page, 'dark');

    // Select the theme toggle in the header (not the mobile menu)
    const themeToggle = page.locator('header starlight-theme-select button').first();
    await expect(themeToggle).toHaveScreenshot('theme-toggle-dark.png');
  });
});

test.describe('Visual Regression - Interactive States', () => {
  test('sidebar link - hover state', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'light');

    await page.setViewportSize({ width: 1920, height: 1080 });

    // Hover over first sidebar link
    const firstLink = page.locator('.sidebar-content a').first();
    await firstLink.hover();

    const sidebar = page.locator('.sidebar-pane');
    await expect(sidebar).toHaveScreenshot('sidebar-link-hover.png');
  });

  test('sidebar link - active/current state', async ({ page }) => {
    await page.goto('/getting-started/installation');
    await setTheme(page, 'light');

    await page.setViewportSize({ width: 1920, height: 1080 });

    // Screenshot sidebar to capture active state
    const sidebar = page.locator('.sidebar-pane');
    await expect(sidebar).toHaveScreenshot('sidebar-link-active.png');
  });

  test('pagination - light mode', async ({ page }) => {
    await page.goto('/getting-started/first-steps');
    await setTheme(page, 'light');

    // Scroll to pagination
    await page.locator('.pagination-links').scrollIntoViewIfNeeded();

    const pagination = page.locator('.pagination-links');
    await expect(pagination).toHaveScreenshot('pagination-light.png');
  });

  test('pagination - dark mode', async ({ page }) => {
    await page.goto('/getting-started/first-steps');
    await setTheme(page, 'dark');

    await page.locator('.pagination-links').scrollIntoViewIfNeeded();

    const pagination = page.locator('.pagination-links');
    await expect(pagination).toHaveScreenshot('pagination-dark.png');
  });
});
