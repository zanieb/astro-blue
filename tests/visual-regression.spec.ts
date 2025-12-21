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
  await page.waitForTimeout(500);
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
    await expect(sidebar).toHaveScreenshot('sidebar-group-collapsed.png');
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
    await expect(sidebar).toHaveScreenshot('sidebar-group-expanded.png');
  });

  test('tab component - first tab active', async ({ page }) => {
    await page.goto('/concepts/tabs');
    await setTheme(page, 'light');

    // Click first tab to ensure it's active
    const firstTabGroup = page.locator('.tablist').first();
    await firstTabGroup.locator('[role="tab"]').first().click();
    await page.waitForTimeout(200);

    const tabs = page.locator('.tabs').first();
    await expect(tabs).toHaveScreenshot('tabs-first-active.png');
  });

  test('tab component - second tab active', async ({ page }) => {
    await page.goto('/concepts/tabs');
    await setTheme(page, 'light');

    // Click second tab
    const firstTabGroup = page.locator('.tablist').first();
    await firstTabGroup.locator('[role="tab"]').nth(1).click();
    await page.waitForTimeout(200);

    const tabs = page.locator('.tabs').first();
    await expect(tabs).toHaveScreenshot('tabs-second-active.png');
  });

  test('code block - copy button hover', async ({ page }) => {
    await page.goto('/getting-started/installation');
    await setTheme(page, 'light');

    const codeBlock = page.locator('.expressive-code').first();
    const copyButton = codeBlock.locator('button').first();
    await copyButton.hover();

    await expect(codeBlock).toHaveScreenshot('code-block-copy-hover.png');
  });

  test('link card - hover state', async ({ page }) => {
    await page.goto('/concepts/cards');
    await setTheme(page, 'light');

    const linkCard = page.locator('.card.link-card').first();
    await linkCard.hover();

    await expect(linkCard).toHaveScreenshot('link-card-hover.png');
  });
});

test.describe('Visual Regression - Component Pages', () => {
  test('asides page - light mode - desktop', async ({ page }) => {
    await page.goto('/concepts/asides');
    await setTheme(page, 'light');
    await expect(page).toHaveScreenshot('asides-light-desktop.png', {
      fullPage: true,
    });
  });

  test('asides page - dark mode - desktop', async ({ page }) => {
    await page.goto('/concepts/asides');
    await setTheme(page, 'dark');
    await expect(page).toHaveScreenshot('asides-dark-desktop.png', {
      fullPage: true,
    });
  });

  test('asides page - light mode - mobile', async ({ page }) => {
    await page.goto('/concepts/asides');
    await setTheme(page, 'light');
    await expect(page).toHaveScreenshot('asides-light-mobile.png', {
      fullPage: true,
    });
  });

  test('asides page - dark mode - mobile', async ({ page }) => {
    await page.goto('/concepts/asides');
    await setTheme(page, 'dark');
    await expect(page).toHaveScreenshot('asides-dark-mobile.png', {
      fullPage: true,
    });
  });

  test('cards page - light mode - desktop', async ({ page }) => {
    await page.goto('/concepts/cards');
    await setTheme(page, 'light');
    await expect(page).toHaveScreenshot('cards-light-desktop.png', {
      fullPage: true,
    });
  });

  test('cards page - dark mode - desktop', async ({ page }) => {
    await page.goto('/concepts/cards');
    await setTheme(page, 'dark');
    await expect(page).toHaveScreenshot('cards-dark-desktop.png', {
      fullPage: true,
    });
  });

  test('cards page - light mode - mobile', async ({ page }) => {
    await page.goto('/concepts/cards');
    await setTheme(page, 'light');
    await expect(page).toHaveScreenshot('cards-light-mobile.png', {
      fullPage: true,
    });
  });

  test('cards page - dark mode - mobile', async ({ page }) => {
    await page.goto('/concepts/cards');
    await setTheme(page, 'dark');
    await expect(page).toHaveScreenshot('cards-dark-mobile.png', {
      fullPage: true,
    });
  });

  test('tabs page - light mode - desktop', async ({ page }) => {
    await page.goto('/concepts/tabs');
    await setTheme(page, 'light');
    await expect(page).toHaveScreenshot('tabs-light-desktop.png', {
      fullPage: true,
    });
  });

  test('tabs page - dark mode - desktop', async ({ page }) => {
    await page.goto('/concepts/tabs');
    await setTheme(page, 'dark');
    await expect(page).toHaveScreenshot('tabs-dark-desktop.png', {
      fullPage: true,
    });
  });

  test('tabs page - light mode - mobile', async ({ page }) => {
    await page.goto('/concepts/tabs');
    await setTheme(page, 'light');
    await expect(page).toHaveScreenshot('tabs-light-mobile.png', {
      fullPage: true,
    });
  });

  test('tabs page - dark mode - mobile', async ({ page }) => {
    await page.goto('/concepts/tabs');
    await setTheme(page, 'dark');
    await expect(page).toHaveScreenshot('tabs-dark-mobile.png', {
      fullPage: true,
    });
  });

  test('steps page - light mode - desktop', async ({ page }) => {
    await page.goto('/concepts/steps');
    await setTheme(page, 'light');
    await expect(page).toHaveScreenshot('steps-light-desktop.png', {
      fullPage: true,
    });
  });

  test('steps page - dark mode - desktop', async ({ page }) => {
    await page.goto('/concepts/steps');
    await setTheme(page, 'dark');
    await expect(page).toHaveScreenshot('steps-dark-desktop.png', {
      fullPage: true,
    });
  });

  test('steps page - light mode - mobile', async ({ page }) => {
    await page.goto('/concepts/steps');
    await setTheme(page, 'light');
    await expect(page).toHaveScreenshot('steps-light-mobile.png', {
      fullPage: true,
    });
  });

  test('steps page - dark mode - mobile', async ({ page }) => {
    await page.goto('/concepts/steps');
    await setTheme(page, 'dark');
    await expect(page).toHaveScreenshot('steps-dark-mobile.png', {
      fullPage: true,
    });
  });

  test('code-blocks page - light mode - desktop', async ({ page }) => {
    await page.goto('/concepts/code-blocks', { waitUntil: 'networkidle' });
    await setTheme(page, 'light');
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('code-blocks-light-desktop.png', {
      fullPage: true,
    });
  });

  test('code-blocks page - dark mode - desktop', async ({ page }) => {
    await page.goto('/concepts/code-blocks', { waitUntil: 'networkidle' });
    await setTheme(page, 'dark');
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('code-blocks-dark-desktop.png', {
      fullPage: true,
    });
  });

  test('code-blocks page - light mode - mobile', async ({ page }) => {
    await page.goto('/concepts/code-blocks', { waitUntil: 'networkidle' });
    await setTheme(page, 'light');
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('code-blocks-light-mobile.png', {
      fullPage: true,
    });
  });

  test('code-blocks page - dark mode - mobile', async ({ page }) => {
    await page.goto('/concepts/code-blocks', { waitUntil: 'networkidle' });
    await setTheme(page, 'dark');
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('code-blocks-dark-mobile.png', {
      fullPage: true,
    });
  });

  test('on-this-page demo - light mode - desktop', async ({ page }) => {
    await page.goto('/concepts/on-this-page');
    await setTheme(page, 'light');
    await expect(page).toHaveScreenshot('on-this-page-light-desktop.png', {
      fullPage: true,
    });
  });

  test('on-this-page demo - dark mode - desktop', async ({ page }) => {
    await page.goto('/concepts/on-this-page');
    await setTheme(page, 'dark');
    await expect(page).toHaveScreenshot('on-this-page-dark-desktop.png', {
      fullPage: true,
    });
  });

  test('complex lists - light mode - desktop', async ({ page }) => {
    await page.goto('/concepts/complex-lists');
    await setTheme(page, 'light');
    await expect(page).toHaveScreenshot('complex-lists-light-desktop.png', {
      fullPage: true,
    });
  });

  test('complex lists - dark mode - desktop', async ({ page }) => {
    await page.goto('/concepts/complex-lists');
    await setTheme(page, 'dark');
    await expect(page).toHaveScreenshot('complex-lists-dark-desktop.png', {
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
    await expect(toc).toHaveScreenshot('toc-light.png');
  });

  test('table of contents - dark mode', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === 'mobile-chromium', 'ToC not visible on mobile');

    await page.goto('/concepts/on-this-page');
    await setTheme(page, 'dark');

    await page.setViewportSize({ width: 1920, height: 1080 });

    const toc = page.locator('.right-sidebar');
    await expect(toc).toHaveScreenshot('toc-dark.png');
  });

  test('breadcrumbs - deeply nested page - light mode', async ({ page }) => {
    await page.goto('/concepts/breadcrumb-test/child/grandchild');
    await setTheme(page, 'light');

    await page.setViewportSize({ width: 1920, height: 1080 });

    // Screenshot the breadcrumb area
    const breadcrumbs = page.locator('.breadcrumbs, nav[aria-label="Breadcrumb"]');
    await expect(breadcrumbs).toHaveScreenshot('breadcrumbs-nested-light.png');
  });

  test('breadcrumbs - deeply nested page - dark mode', async ({ page }) => {
    await page.goto('/concepts/breadcrumb-test/child/grandchild');
    await setTheme(page, 'dark');

    await page.setViewportSize({ width: 1920, height: 1080 });

    const breadcrumbs = page.locator('.breadcrumbs, nav[aria-label="Breadcrumb"]');
    await expect(breadcrumbs).toHaveScreenshot('breadcrumbs-nested-dark.png');
  });

  test('mobile menu - closed state', async ({ page }, testInfo) => {
    // Only run on mobile
    test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile menu only on mobile');

    await page.goto('/');
    await setTheme(page, 'light');

    // Ensure menu is closed
    await expect(page).toHaveScreenshot('mobile-menu-closed.png', {
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

    await expect(page).toHaveScreenshot('mobile-menu-open-light.png', {
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

    await expect(page).toHaveScreenshot('mobile-menu-open-dark.png', {
      fullPage: true,
    });
  });

  test('callout variants - all types', async ({ page }) => {
    await page.goto('/concepts/asides');
    await setTheme(page, 'light');

    await page.setViewportSize({ width: 1920, height: 1080 });

    // Screenshot the callout section
    const calloutsSection = page.locator('text=Callout (Mintlify Style)').locator('..');
    await expect(calloutsSection).toHaveScreenshot('callout-variants.png');
  });

  test('aside variants - all types', async ({ page }) => {
    await page.goto('/concepts/asides');
    await setTheme(page, 'light');

    await page.setViewportSize({ width: 1920, height: 1080 });

    // Scroll to standard aside section
    await page.locator('text=Standard Aside').scrollIntoViewIfNeeded();

    const asidesSection = page.locator('text=Standard Aside').locator('..');
    await expect(asidesSection).toHaveScreenshot('aside-variants.png');
  });

  test('card grid layout', async ({ page }) => {
    await page.goto('/concepts/cards');
    await setTheme(page, 'light');

    await page.setViewportSize({ width: 1920, height: 1080 });

    // Screenshot card grid
    const cardGrid = page.locator('.card-grid').first();
    await expect(cardGrid).toHaveScreenshot('card-grid-layout.png');
  });
});
