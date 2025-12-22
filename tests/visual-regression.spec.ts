import { test, type Page } from '@playwright/test';
import { argosScreenshot } from '@argos-ci/playwright';

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
  await page.waitForTimeout(100);
}

test.describe('Visual Regression - Homepage', () => {
  test('homepage - light mode - desktop', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'light');
    await argosScreenshot(page, 'homepage-light-desktop', {
      fullPage: true,
    });
  });

  test('homepage - dark mode - desktop', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'dark');
    await argosScreenshot(page, 'homepage-dark-desktop', {
      fullPage: true,
    });
  });

  test('homepage - light mode - mobile', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'light');
    await argosScreenshot(page, 'homepage-light-mobile', {
      fullPage: true,
    });
  });

  test('homepage - dark mode - mobile', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'dark');
    await argosScreenshot(page, 'homepage-dark-mobile', {
      fullPage: true,
    });
  });
});

test.describe('Visual Regression - Getting Started', () => {
  test('installation page - light mode', async ({ page }) => {
    await page.goto('/getting-started/installation');
    await setTheme(page, 'light');
    await argosScreenshot(page, 'installation-light-desktop', {
      fullPage: true,
    });
  });

  test('installation page - dark mode', async ({ page }) => {
    await page.goto('/getting-started/installation');
    await setTheme(page, 'dark');
    await argosScreenshot(page, 'installation-dark-desktop', {
      fullPage: true,
    });
  });
});

test.describe('Visual Regression - Guides', () => {
  test('guides page - light mode', async ({ page }) => {
    await page.goto('/guides/customization');
    await setTheme(page, 'light');
    await argosScreenshot(page, 'guides-light-desktop', {
      fullPage: true,
    });
  });

  test('guides page - dark mode', async ({ page }) => {
    await page.goto('/guides/customization');
    await setTheme(page, 'dark');
    await argosScreenshot(page, 'guides-dark-desktop', {
      fullPage: true,
    });
  });
});

test.describe('Visual Regression - Concepts', () => {
  test('concepts page - light mode', async ({ page }) => {
    await page.goto('/concepts/components');
    await setTheme(page, 'light');
    await argosScreenshot(page, 'concepts-light-desktop', {
      fullPage: true,
    });
  });

  test('concepts page - dark mode', async ({ page }) => {
    await page.goto('/concepts/components');
    await setTheme(page, 'dark');
    await argosScreenshot(page, 'concepts-dark-desktop', {
      fullPage: true,
    });
  });
});

test.describe('Visual Regression - Reference', () => {
  test('reference page - light mode', async ({ page }) => {
    await page.goto('/reference/configuration', { waitUntil: 'networkidle' });
    await setTheme(page, 'light');
    // Extra wait for code syntax highlighting to settle
    await page.waitForTimeout(500);
    await argosScreenshot(page, 'reference-light-desktop', {
      fullPage: true,
    });
  });

  test('reference page - dark mode', async ({ page }) => {
    await page.goto('/reference/configuration', { waitUntil: 'networkidle' });
    await setTheme(page, 'dark');
    // Extra wait for code syntax highlighting to settle
    await page.waitForTimeout(500);
    await argosScreenshot(page, 'reference-dark-desktop', {
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
    await argosScreenshot(page, 'sidebar-expanded-light', {
      element: sidebar,
    });
  });

  test('sidebar - expanded state - dark mode', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'dark');

    await page.setViewportSize({ width: 1920, height: 1080 });

    const sidebar = page.locator('.sidebar-pane');
    await argosScreenshot(page, 'sidebar-expanded-dark', {
      element: sidebar,
    });
  });

  test('code block with copy button - light mode', async ({ page }) => {
    await page.goto('/getting-started/installation');
    await setTheme(page, 'light');

    // Find first code block
    const codeBlock = page.locator('.expressive-code').first();
    await argosScreenshot(page, 'code-block-light', {
      element: codeBlock,
    });
  });

  test('code block with copy button - dark mode', async ({ page }) => {
    await page.goto('/getting-started/installation');
    await setTheme(page, 'dark');

    const codeBlock = page.locator('.expressive-code').first();
    await argosScreenshot(page, 'code-block-dark', {
      element: codeBlock,
    });
  });

  test('search button - light mode', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'light');

    await page.setViewportSize({ width: 1920, height: 1080 });

    const searchButton = page.locator('site-search button[data-open-modal]');
    await argosScreenshot(page, 'search-button-light', {
      element: searchButton,
    });
  });

  test('search button - dark mode', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'dark');

    await page.setViewportSize({ width: 1920, height: 1080 });

    const searchButton = page.locator('site-search button[data-open-modal]');
    await argosScreenshot(page, 'search-button-dark', {
      element: searchButton,
    });
  });

  test('search button - mobile', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile-specific test');

    await page.goto('/');
    await setTheme(page, 'light');

    const searchButton = page.locator('site-search button[data-open-modal]');
    await argosScreenshot(page, 'search-button-mobile', {
      element: searchButton,
    });
  });

  test('theme toggle - light mode', async ({ page }, testInfo) => {
    // Skip on mobile since theme toggle is in hamburger menu
    test.skip(testInfo.project.name === 'mobile-chromium', 'Theme toggle not visible on mobile');

    await page.goto('/');
    await setTheme(page, 'light');

    // Select the theme toggle in the header (not the mobile menu)
    const themeToggle = page.locator('header starlight-theme-select button').first();
    await argosScreenshot(page, 'theme-toggle-light', {
      element: themeToggle,
    });
  });

  test('theme toggle - dark mode', async ({ page }, testInfo) => {
    // Skip on mobile since theme toggle is in hamburger menu
    test.skip(testInfo.project.name === 'mobile-chromium', 'Theme toggle not visible on mobile');

    await page.goto('/');
    await setTheme(page, 'dark');

    // Select the theme toggle in the header (not the mobile menu)
    const themeToggle = page.locator('header starlight-theme-select button').first();
    await argosScreenshot(page, 'theme-toggle-dark', {
      element: themeToggle,
    });
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
    await argosScreenshot(page, 'sidebar-link-hover', {
      element: sidebar,
    });
  });

  test('sidebar link - active/current state', async ({ page }) => {
    await page.goto('/getting-started/installation');
    await setTheme(page, 'light');

    await page.setViewportSize({ width: 1920, height: 1080 });

    // Screenshot sidebar to capture active state
    const sidebar = page.locator('.sidebar-pane');
    await argosScreenshot(page, 'sidebar-link-active', {
      element: sidebar,
    });
  });

  test('pagination - light mode', async ({ page }) => {
    await page.goto('/getting-started/first-steps');
    await setTheme(page, 'light');

    // Scroll to pagination
    await page.locator('.pagination-links').scrollIntoViewIfNeeded();

    const pagination = page.locator('.pagination-links');
    await argosScreenshot(page, 'pagination-light', {
      element: pagination,
    });
  });

  test('pagination - dark mode', async ({ page }) => {
    await page.goto('/getting-started/first-steps');
    await setTheme(page, 'dark');

    await page.locator('.pagination-links').scrollIntoViewIfNeeded();

    const pagination = page.locator('.pagination-links');
    await argosScreenshot(page, 'pagination-dark', {
      element: pagination,
    });
  });

  test('nested sidebar group - collapsed state', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'light');

    await page.setViewportSize({ width: 1920, height: 1080 });

    // Find a collapsible group and ensure it's collapsed
    const group = page.locator('.sidebar-content details').first();
    // Close it if open
    const isOpen = await group.evaluate((el) => (el as HTMLDetailsElement).open);
    if (isOpen) {
      await group.locator('summary').click();
      await page.waitForTimeout(300);
    }

    const sidebar = page.locator('.sidebar-pane');
    await argosScreenshot(page, 'sidebar-group-collapsed', {
      element: sidebar,
    });
  });

  test('nested sidebar group - expanded state', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'light');

    await page.setViewportSize({ width: 1920, height: 1080 });

    // Find a collapsible group and ensure it's expanded
    const group = page.locator('.sidebar-content details').first();
    const isOpen = await group.evaluate((el) => (el as HTMLDetailsElement).open);
    if (!isOpen) {
      await group.locator('summary').click();
      await page.waitForTimeout(300);
    }

    const sidebar = page.locator('.sidebar-pane');
    await argosScreenshot(page, 'sidebar-group-expanded', {
      element: sidebar,
    });
  });

  test('code block - copy button hover', async ({ page }) => {
    await page.goto('/getting-started/installation');
    await setTheme(page, 'light');

    const codeBlock = page.locator('.expressive-code').first();
    const copyButton = codeBlock.locator('button').first();
    await copyButton.hover();

    await argosScreenshot(page, 'code-block-copy-hover', {
      element: codeBlock,
    });
  });
});

test.describe('Visual Regression - Component Pages', () => {
  test('asides page - light mode - desktop', async ({ page }) => {
    await page.goto('/concepts/asides');
    await setTheme(page, 'light');
    await argosScreenshot(page, 'asides-light-desktop', {
      fullPage: true,
    });
  });

  test('asides page - dark mode - desktop', async ({ page }) => {
    await page.goto('/concepts/asides');
    await setTheme(page, 'dark');
    await argosScreenshot(page, 'asides-dark-desktop', {
      fullPage: true,
    });
  });

  test('asides page - light mode - mobile', async ({ page }) => {
    await page.goto('/concepts/asides');
    await setTheme(page, 'light');
    await argosScreenshot(page, 'asides-light-mobile', {
      fullPage: true,
    });
  });

  test('asides page - dark mode - mobile', async ({ page }) => {
    await page.goto('/concepts/asides');
    await setTheme(page, 'dark');
    await argosScreenshot(page, 'asides-dark-mobile', {
      fullPage: true,
    });
  });

  test('cards page - light mode - desktop', async ({ page }) => {
    await page.goto('/concepts/cards');
    await setTheme(page, 'light');
    await argosScreenshot(page, 'cards-light-desktop', {
      fullPage: true,
    });
  });

  test('cards page - dark mode - desktop', async ({ page }) => {
    await page.goto('/concepts/cards');
    await setTheme(page, 'dark');
    await argosScreenshot(page, 'cards-dark-desktop', {
      fullPage: true,
    });
  });

  test('cards page - light mode - mobile', async ({ page }) => {
    await page.goto('/concepts/cards');
    await setTheme(page, 'light');
    await argosScreenshot(page, 'cards-light-mobile', {
      fullPage: true,
    });
  });

  test('cards page - dark mode - mobile', async ({ page }) => {
    await page.goto('/concepts/cards');
    await setTheme(page, 'dark');
    await argosScreenshot(page, 'cards-dark-mobile', {
      fullPage: true,
    });
  });

  test('tabs page - light mode - desktop', async ({ page }) => {
    await page.goto('/concepts/tabs');
    await setTheme(page, 'light');
    await argosScreenshot(page, 'tabs-light-desktop', {
      fullPage: true,
    });
  });

  test('tabs page - dark mode - desktop', async ({ page }) => {
    await page.goto('/concepts/tabs');
    await setTheme(page, 'dark');
    await argosScreenshot(page, 'tabs-dark-desktop', {
      fullPage: true,
    });
  });

  test('tabs page - light mode - mobile', async ({ page }) => {
    await page.goto('/concepts/tabs');
    await setTheme(page, 'light');
    await argosScreenshot(page, 'tabs-light-mobile', {
      fullPage: true,
    });
  });

  test('tabs page - dark mode - mobile', async ({ page }) => {
    await page.goto('/concepts/tabs');
    await setTheme(page, 'dark');
    await argosScreenshot(page, 'tabs-dark-mobile', {
      fullPage: true,
    });
  });

  test('steps page - light mode - desktop', async ({ page }) => {
    await page.goto('/concepts/steps');
    await setTheme(page, 'light');
    await argosScreenshot(page, 'steps-light-desktop', {
      fullPage: true,
    });
  });

  test('steps page - dark mode - desktop', async ({ page }) => {
    await page.goto('/concepts/steps');
    await setTheme(page, 'dark');
    await argosScreenshot(page, 'steps-dark-desktop', {
      fullPage: true,
    });
  });

  test('steps page - light mode - mobile', async ({ page }) => {
    await page.goto('/concepts/steps');
    await setTheme(page, 'light');
    await argosScreenshot(page, 'steps-light-mobile', {
      fullPage: true,
    });
  });

  test('steps page - dark mode - mobile', async ({ page }) => {
    await page.goto('/concepts/steps');
    await setTheme(page, 'dark');
    await argosScreenshot(page, 'steps-dark-mobile', {
      fullPage: true,
    });
  });

  test('code-blocks page - light mode - desktop', async ({ page }) => {
    await page.goto('/concepts/code-blocks', { waitUntil: 'networkidle' });
    await setTheme(page, 'light');
    await page.waitForTimeout(500);
    await argosScreenshot(page, 'code-blocks-light-desktop', {
      fullPage: true,
    });
  });

  test('code-blocks page - dark mode - desktop', async ({ page }) => {
    await page.goto('/concepts/code-blocks', { waitUntil: 'networkidle' });
    await setTheme(page, 'dark');
    await page.waitForTimeout(500);
    await argosScreenshot(page, 'code-blocks-dark-desktop', {
      fullPage: true,
    });
  });

  test('code-blocks page - light mode - mobile', async ({ page }) => {
    await page.goto('/concepts/code-blocks', { waitUntil: 'networkidle' });
    await setTheme(page, 'light');
    await page.waitForTimeout(500);
    await argosScreenshot(page, 'code-blocks-light-mobile', {
      fullPage: true,
    });
  });

  test('code-blocks page - dark mode - mobile', async ({ page }) => {
    await page.goto('/concepts/code-blocks', { waitUntil: 'networkidle' });
    await setTheme(page, 'dark');
    await page.waitForTimeout(500);
    await argosScreenshot(page, 'code-blocks-dark-mobile', {
      fullPage: true,
    });
  });

  test('on-this-page demo - light mode - desktop', async ({ page }) => {
    await page.goto('/concepts/on-this-page');
    await setTheme(page, 'light');
    await argosScreenshot(page, 'on-this-page-light-desktop', {
      fullPage: true,
    });
  });

  test('on-this-page demo - dark mode - desktop', async ({ page }) => {
    await page.goto('/concepts/on-this-page');
    await setTheme(page, 'dark');
    await argosScreenshot(page, 'on-this-page-dark-desktop', {
      fullPage: true,
    });
  });

  test('complex lists - light mode - desktop', async ({ page }) => {
    await page.goto('/concepts/complex-lists');
    await setTheme(page, 'light');
    await argosScreenshot(page, 'complex-lists-light-desktop', {
      fullPage: true,
    });
  });

  test('complex lists - dark mode - desktop', async ({ page }) => {
    await page.goto('/concepts/complex-lists');
    await setTheme(page, 'dark');
    await argosScreenshot(page, 'complex-lists-dark-desktop', {
      fullPage: true,
    });
  });
});

test.describe('Visual Regression - Special UI Components', () => {
  test('table of contents - light mode', async ({ page }, testInfo) => {
    // Skip on mobile - ToC is usually hidden on mobile
    test.skip(testInfo.project.name === 'mobile-chromium', 'ToC not visible on mobile');

    await page.goto('/concepts/on-this-page');
    await setTheme(page, 'light');

    await page.setViewportSize({ width: 1920, height: 1080 });

    const toc = page.locator('.right-sidebar');
    await argosScreenshot(page, 'toc-light', {
      element: toc,
    });
  });

  test('table of contents - dark mode', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'mobile-chromium', 'ToC not visible on mobile');

    await page.goto('/concepts/on-this-page');
    await setTheme(page, 'dark');

    await page.setViewportSize({ width: 1920, height: 1080 });

    const toc = page.locator('.right-sidebar');
    await argosScreenshot(page, 'toc-dark', {
      element: toc,
    });
  });

  test('breadcrumbs - deeply nested page - light mode', async ({ page }) => {
    await page.goto('/concepts/breadcrumb-test/child/grandchild');
    await setTheme(page, 'light');

    await page.setViewportSize({ width: 1920, height: 1080 });

    // Screenshot the breadcrumb area
    const breadcrumbs = page.locator('.breadcrumbs, nav[aria-label="Breadcrumb"]');
    await argosScreenshot(page, 'breadcrumbs-nested-light', {
      element: breadcrumbs,
    });
  });

  test('breadcrumbs - deeply nested page - dark mode', async ({ page }) => {
    await page.goto('/concepts/breadcrumb-test/child/grandchild');
    await setTheme(page, 'dark');

    await page.setViewportSize({ width: 1920, height: 1080 });

    const breadcrumbs = page.locator('.breadcrumbs, nav[aria-label="Breadcrumb"]');
    await argosScreenshot(page, 'breadcrumbs-nested-dark', {
      element: breadcrumbs,
    });
  });

  test('mobile menu - closed state', async ({ page }, testInfo) => {
    // Only run on mobile
    test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile menu only on mobile');

    await page.goto('/');
    await setTheme(page, 'light');

    // Ensure menu is closed
    await argosScreenshot(page, 'mobile-menu-closed', {
      fullPage: true,
    });
  });

  test('mobile menu - open state - light', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile menu only on mobile');

    await page.goto('/');
    await setTheme(page, 'light');

    // Open mobile menu
    const menuButton = page.locator('[aria-label="Menu"], [aria-expanded]').first();
    await menuButton.click();
    await page.waitForTimeout(300);

    await argosScreenshot(page, 'mobile-menu-open-light', {
      fullPage: true,
    });
  });

  test('mobile menu - open state - dark', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile menu only on mobile');

    await page.goto('/');
    await setTheme(page, 'dark');

    // Open mobile menu
    const menuButton = page.locator('[aria-label="Menu"], [aria-expanded]').first();
    await menuButton.click();
    await page.waitForTimeout(300);

    await argosScreenshot(page, 'mobile-menu-open-dark', {
      fullPage: true,
    });
  });

  test('card grid layout', async ({ page }) => {
    await page.goto('/concepts/cards');
    await setTheme(page, 'light');

    await page.setViewportSize({ width: 1920, height: 1080 });

    // Screenshot card grid
    const cardGrid = page.locator('.card-grid').first();
    await argosScreenshot(page, 'card-grid-layout', {
      element: cardGrid,
    });
  });
});

test.describe('Visual Regression - Search', () => {
  test('search modal - initial state - light mode', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'light');

    await page.setViewportSize({ width: 1920, height: 1080 });

    // Open search modal
    const searchButton = page.locator('site-search button[data-open-modal]');
    await searchButton.click();
    await page.waitForTimeout(300);

    // Screenshot the modal
    await argosScreenshot(page, 'search-modal-initial-light');
  });

  test('search modal - initial state - dark mode', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'dark');

    await page.setViewportSize({ width: 1920, height: 1080 });

    // Open search modal
    const searchButton = page.locator('site-search button[data-open-modal]');
    await searchButton.click();
    await page.waitForTimeout(300);

    await argosScreenshot(page, 'search-modal-initial-dark');
  });

  test('search modal - with query text - light mode', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'light');

    await page.setViewportSize({ width: 1920, height: 1080 });

    // Open search and type query
    const searchButton = page.locator('site-search button[data-open-modal]');
    await searchButton.click();
    await page.waitForTimeout(300);

    // Find search input and type
    const searchInput = page.locator('input[type="search"], input[placeholder*="Search"]').first();
    await searchInput.fill('installation');
    await page.waitForTimeout(500); // Wait for results to load

    await argosScreenshot(page, 'search-modal-with-query-light');
  });

  test('search modal - with query text - dark mode', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'dark');

    await page.setViewportSize({ width: 1920, height: 1080 });

    // Open search and type query
    const searchButton = page.locator('site-search button[data-open-modal]');
    await searchButton.click();
    await page.waitForTimeout(300);

    const searchInput = page.locator('input[type="search"], input[placeholder*="Search"]').first();
    await searchInput.fill('installation');
    await page.waitForTimeout(500);

    await argosScreenshot(page, 'search-modal-with-query-dark');
  });

  test('search modal - with results - light mode', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'light');

    await page.setViewportSize({ width: 1920, height: 1080 });

    // Open search and search for common term
    const searchButton = page.locator('site-search button[data-open-modal]');
    await searchButton.click();
    await page.waitForTimeout(300);

    const searchInput = page.locator('input[type="search"], input[placeholder*="Search"]').first();
    await searchInput.fill('getting started');
    await page.waitForTimeout(800); // Wait for results

    await argosScreenshot(page, 'search-modal-results-light');
  });

  test('search modal - with results - dark mode', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'dark');

    await page.setViewportSize({ width: 1920, height: 1080 });

    const searchButton = page.locator('site-search button[data-open-modal]');
    await searchButton.click();
    await page.waitForTimeout(300);

    const searchInput = page.locator('input[type="search"], input[placeholder*="Search"]').first();
    await searchInput.fill('getting started');
    await page.waitForTimeout(800);

    await argosScreenshot(page, 'search-modal-results-dark');
  });

  test('search modal - no results state', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'light');

    await page.setViewportSize({ width: 1920, height: 1080 });

    // Open search and search for nonsense
    const searchButton = page.locator('site-search button[data-open-modal]');
    await searchButton.click();
    await page.waitForTimeout(300);

    const searchInput = page.locator('input[type="search"], input[placeholder*="Search"]').first();
    await searchInput.fill('xyzqwertynoresults123');
    await page.waitForTimeout(800);

    await argosScreenshot(page, 'search-modal-no-results');
  });

  test('search modal - mobile - light mode', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile-specific test');

    await page.goto('/');
    await setTheme(page, 'light');

    // Open search modal
    const searchButton = page.locator('site-search button[data-open-modal]');
    await searchButton.click();
    await page.waitForTimeout(300);

    await argosScreenshot(page, 'search-modal-mobile-light', {
      fullPage: true,
    });
  });

  test('search modal - mobile - dark mode', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile-specific test');

    await page.goto('/');
    await setTheme(page, 'dark');

    const searchButton = page.locator('site-search button[data-open-modal]');
    await searchButton.click();
    await page.waitForTimeout(300);

    await argosScreenshot(page, 'search-modal-mobile-dark', {
      fullPage: true,
    });
  });

  test('search modal - mobile with results', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile-specific test');

    await page.goto('/');
    await setTheme(page, 'light');

    const searchButton = page.locator('site-search button[data-open-modal]');
    await searchButton.click();
    await page.waitForTimeout(300);

    const searchInput = page.locator('input[type="search"], input[placeholder*="Search"]').first();
    await searchInput.fill('components');
    await page.waitForTimeout(800);

    await argosScreenshot(page, 'search-modal-mobile-results', {
      fullPage: true,
    });
  });

  test('search input - focused state', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'light');

    await page.setViewportSize({ width: 1920, height: 1080 });

    // Open search and focus input
    const searchButton = page.locator('site-search button[data-open-modal]');
    await searchButton.click();
    await page.waitForTimeout(300);

    const searchInput = page.locator('input[type="search"], input[placeholder*="Search"]').first();
    await searchInput.focus();

    // Screenshot just the search input area
    const searchDialog = page.locator('dialog[open], [role="dialog"]').first();
    await argosScreenshot(page, 'search-input-focused', {
      element: searchDialog,
    });
  });

  test('search bar - header integration - light mode', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'light');

    await page.setViewportSize({ width: 1920, height: 1080 });

    // Screenshot the entire header to show search bar integration
    const header = page.locator('header').first();
    await argosScreenshot(page, 'search-header-integration-light', {
      element: header,
    });
  });

  test('search bar - header integration - dark mode', async ({ page }) => {
    await page.goto('/');
    await setTheme(page, 'dark');

    await page.setViewportSize({ width: 1920, height: 1080 });

    const header = page.locator('header').first();
    await argosScreenshot(page, 'search-header-integration-dark', {
      element: header,
    });
  });
});
