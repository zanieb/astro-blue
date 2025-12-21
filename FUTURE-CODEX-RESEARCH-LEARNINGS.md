# Codex Research: Best Practices for Astro Starlight Documentation

## Executive Summary

Analysis of best practices research for themed Astro Starlight developer documentation sites, comparing recommendations against the current astro-blue project state. This plan identifies gaps and provides actionable improvements based on proven patterns for production documentation sites.

## Research Source: Codex Best Practices

**Key Themes:**

1. Progressive enhancement: Start with defaults, customize selectively
2. Automation: Quality checks in CI, not manual processes
3. Plugin ecosystem: Use proven plugins vs custom solutions
4. Accessibility-first: WCAG compliance, semantic structure
5. Layered customization: CSS → Tailwind → Component overrides (in that order)

---

## Current State Assessment

### ✅ What's Working Well

**Styling Approach:**

- Following CSS-first customization approach
- Custom CSS variables for theming
- Good visual design matching Mintlify/PYX
- Both light and dark mode support

**Component Strategy:**

- Selective component overrides (PageTitle, SiteTitle, ThemeSelect, Callout)
- Not over-engineering with unnecessary overrides
- Following "CSS first, components when necessary" principle

**Project Structure:**

- Standard Starlight conventions
- Clean content organization in `src/content/docs/`
- Logical folder structure (getting-started, guides, concepts, reference)

### ❌ Gaps & Improvements Needed

**CI/CD & Quality Assurance:**

- ❌ No automated link validation
- ❌ No linting/formatting in CI
- ❌ No accessibility audits
- ❌ No automated quality checks

**Accessibility:**

- ⚠️ Need to verify WCAG AA contrast in both modes
- ⚠️ Need to test at 200-300% zoom
- ⚠️ Need to verify keyboard focus states
- ⚠️ Need semantic heading audit

**SEO:**

- ❌ No sitemap configuration
- ⚠️ Limited meta descriptions in frontmatter
- ❌ No structured data

**Plugin Ecosystem:**

- ❌ Using default Pagefind (good start)
- ❌ No link validator plugin
- ❌ No image zoom plugin
- ❌ No additional UX enhancements

**Build & Deployment:**

- ⚠️ No CI/CD pipeline defined
- ❌ No automated deployments
- ❌ No preview deployments for PRs

---

## Priority 1: Critical Quality & Automation (High Impact)

### 1. Starlight Links Validator Plugin

**Impact:** 🔥🔥🔥 High - Prevent broken links before deployment
**Effort:** ⚡ Very Low - 5-minute setup
**Research says:** "Catch broken links before deployment" - critical for quality

**Implementation:**

```bash
npm install starlight-links-validator
```

```javascript
// astro.config.mjs
import starlightLinksValidator from 'starlight-links-validator';

export default defineConfig({
  integrations: [
    starlight({
      // ... config
      plugins: [starlightLinksValidator()],
    }),
  ],
});
```

**Files to modify:**

- `package.json` - Add dependency
- `astro.config.mjs` - Add plugin

---

### 2. Sitemap Configuration for SEO

**Impact:** 🔥🔥🔥 High - Essential for search engines
**Effort:** ⚡ Very Low - 1-minute setup
**Research says:** "Generate sitemap.xml automatically by setting site in config"

**Implementation:**

```javascript
// astro.config.mjs
export default defineConfig({
  site: 'https://your-domain.com', // Required for sitemap
  integrations: [
    starlight({
      // ... config
    }),
  ],
});
```

**Result:** Automatic `sitemap.xml` generation at build time

**Files to modify:**

- `astro.config.mjs` - Add site URL

---

### 3. GitHub Actions CI/CD Pipeline

**Impact:** 🔥🔥🔥 High - Automated quality checks & deployment
**Effort:** ⚡⚡ Medium - 30-minute setup
**Research says:** "Use GitHub Actions with Astro's official action for consistent builds"

**Implementation:**
Create `.github/workflows/ci.yml`:

```yaml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Build site
        run: npm run build

      - name: Check for broken links
        run: npm run build # Links validator runs during build
```

**Files to create:**

- `.github/workflows/ci.yml` - CI pipeline
- Add `lint` script to `package.json`

---

### 4. Accessibility Audit Setup

**Impact:** 🔥🔥 Medium - WCAG compliance
**Effort:** ⚡⚡ Medium - 20-minute setup
**Research says:** "Consider Lighthouse CI or Pa11y for automated accessibility audits"

**Option A: Lighthouse CI (Recommended)**

```bash
npm install -D @lhci/cli
```

```json
// lighthouserc.json
{
  "ci": {
    "collect": {
      "staticDistDir": "./dist",
      "numberOfRuns": 3
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:accessibility": ["error", { "minScore": 0.9 }]
      }
    }
  }
}
```

**Option B: Pa11y**

```bash
npm install -D pa11y-ci
```

**Files to create:**

- `lighthouserc.json` or `.pa11yci.json`
- Update `package.json` with audit script
- Update CI workflow to run audits

---

## Priority 2: UX & Plugin Enhancements (Medium Impact)

### 5. Image Zoom Plugin

**Impact:** 🔥🔥 Medium - Better image viewing experience
**Effort:** ⚡ Very Low - 5-minute setup
**Research says:** Listed as recommended UX enhancement

**Implementation:**

```bash
npm install starlight-image-zoom
```

```javascript
// astro.config.mjs
import starlightImageZoom from 'starlight-image-zoom';

export default defineConfig({
  integrations: [
    starlight({
      plugins: [starlightLinksValidator(), starlightImageZoom()],
    }),
  ],
});
```

**Files to modify:**

- `package.json` - Add dependency
- `astro.config.mjs` - Add plugin

---

### 6. Enhanced Meta Descriptions

**Impact:** 🔥🔥 Medium - Better SEO & social sharing
**Effort:** ⚡ Low - 15-minute implementation
**Research says:** "Ensure unique <title> and meta descriptions for every page via frontmatter"

**Implementation:**
Add `description` to all frontmatter:

```mdx
---
title: Installation Guide
description: Learn how to install Astro Blue on macOS, Windows, and Linux with our comprehensive installation guide.
---
```

**Content audit required:**

- Review all MDX files
- Add unique descriptions (150-160 characters)
- Avoid duplication

**Files to modify:**

- All `src/content/docs/**/*.mdx` files

---

### 7. Prettier & ESLint Setup

**Impact:** 🔥 Low-Medium - Code consistency
**Effort:** ⚡ Low - 15-minute setup
**Research says:** "Run linters (ESLint, Prettier) for consistency"

**Implementation:**

```bash
npm install -D prettier eslint eslint-plugin-astro
```

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "plugins": ["prettier-plugin-astro"]
}
```

```json
// .eslintrc.json
{
  "extends": ["eslint:recommended", "plugin:astro/recommended"],
  "overrides": [
    {
      "files": ["*.astro"],
      "parser": "astro-eslint-parser"
    }
  ]
}
```

```json
// package.json scripts
{
  "scripts": {
    "lint": "eslint . && prettier --check .",
    "format": "prettier --write ."
  }
}
```

**Files to create:**

- `.prettierrc`
- `.eslintrc.json`
- `.prettierignore`
- `.eslintignore`

**Files to modify:**

- `package.json` - Add scripts and dependencies

---

## Priority 3: Deployment & Performance (Future)

### 8. Automated Deployment

**Impact:** 🔥🔥 Medium - Streamlined releases
**Effort:** ⚡⚡ Medium - Depends on platform
**Research says:** "Deploy via Vercel or Cloudflare Pages with Git integration"

**Options:**

**Vercel (Easiest):**

- Connect GitHub repo
- Auto-detects Astro
- Zero configuration needed
- Automatic preview deployments for PRs

**Cloudflare Pages:**

- Connect GitHub repo
- Build command: `npm run build`
- Output directory: `dist`
- Free unlimited bandwidth

**Files to create:**

- None required (platform handles it)
- Optional: `vercel.json` or `wrangler.toml` for advanced config

---

### 9. Performance Monitoring

**Impact:** 🔥 Low-Medium - Track performance regressions
**Effort:** ⚡⚡ Medium
**Research says:** Lighthouse CI provides performance metrics

**Implementation:**
Already covered in #4 (Lighthouse CI setup)

Additional monitoring:

- Core Web Vitals tracking
- Bundle size monitoring
- Image optimization verification

---

### 10. Tailwind CSS Integration

**Impact:** 🔥 Low - Alternative styling approach
**Effort:** ⚡⚡ Medium
**Research says:** "Use utility-first approach with first-party Starlight integration"

**Current state:** Using CSS variables (good!)
**Recommendation:** Only add Tailwind if team prefers utility classes

**Implementation (if desired):**

```bash
npm install @astrojs/tailwind tailwindcss
```

```javascript
// astro.config.mjs
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false, // Let Starlight handle base styles
    }),
    starlight({
      // ... config
    }),
  ],
});
```

**Decision:** Defer this unless there's a strong team preference

---

## Accessibility Audit Checklist

Based on research recommendations:

### Visual & Color

- [ ] Verify color contrast meets WCAG AA (4.5:1 for text, 3:1 for UI)
- [ ] Test in both light and dark modes
- [ ] Use Starlight's theme editor to validate accessible color palettes
- [ ] Check link color contrast (both visited and unvisited)

### Keyboard & Focus

- [ ] Verify visible focus states on all interactive elements
- [ ] Don't remove focus outlines without accessible replacement
- [ ] Test keyboard navigation through entire site
- [ ] Ensure skip-to-content link works

### Semantic Structure

- [ ] Maintain heading hierarchy (no skipped levels)
- [ ] Don't style non-headings as headings
- [ ] Use ARIA labels for icons and interactive components
- [ ] Verify semantic HTML (nav, main, article, aside)

### Zoom & Responsiveness

- [ ] Test at 200% zoom (WCAG requirement)
- [ ] Test at 300% zoom (better coverage)
- [ ] Verify no horizontal scrolling at zoom
- [ ] Check text reflow works properly

### Screen Readers

- [ ] Test with VoiceOver (macOS) or NVDA (Windows)
- [ ] Verify alt text on all images
- [ ] Check form labels and error messages
- [ ] Ensure modals trap focus properly

---

## Implementation Roadmap

### Week 1: Quality & Automation Foundation (Priority 1)

1. ✅ Add Starlight Links Validator plugin (5 min)
2. ✅ Configure sitemap in astro.config (1 min)
3. ✅ Set up GitHub Actions CI/CD (30 min)
4. ✅ Add Lighthouse CI or Pa11y (20 min)

**Total Time:** ~1 hour
**Value:** Automated quality checks, SEO foundation, CI/CD pipeline

### Week 2: UX Enhancements (Priority 2)

5. ✅ Add image zoom plugin (5 min)
6. ✅ Audit and add meta descriptions (1-2 hours depending on content volume)
7. ✅ Set up Prettier & ESLint (15 min)

**Total Time:** ~2-3 hours
**Value:** Better UX, improved SEO, code consistency

### Week 3: Accessibility Audit

8. ✅ Run accessibility audit checklist
9. ✅ Fix any issues found
10. ✅ Document accessibility standards

**Total Time:** ~3-4 hours
**Value:** WCAG AA compliance, inclusive documentation

### Future: Deployment & Monitoring (Priority 3)

11. Set up Vercel or Cloudflare Pages
12. Configure automated deployments
13. Add performance monitoring

---

## Files To Modify/Create

### New Files

- `.github/workflows/ci.yml` - CI/CD pipeline
- `.prettierrc` - Prettier configuration
- `.eslintrc.json` - ESLint configuration
- `.prettierignore` - Files to skip formatting
- `.eslintignore` - Files to skip linting
- `lighthouserc.json` or `.pa11yci.json` - Accessibility audits

### Modified Files

- `package.json` - Add dependencies and scripts
- `astro.config.mjs` - Add plugins, site URL
- `src/content/docs/**/*.mdx` - Add descriptions to frontmatter

### No Breaking Changes

All improvements are additive. Existing functionality remains unchanged.

---

## Key Decisions Based on Research

### ✅ Validated Decisions (Already Following Best Practices)

1. **CSS-first customization** - Research confirms this approach
2. **Selective component overrides** - Only when CSS insufficient
3. **Standard Starlight structure** - Following conventions

### ⚠️ Gaps to Address

1. **No automated link validation** - Critical gap, easy fix
2. **No CI/CD pipeline** - Missing automation
3. **No accessibility audits** - Need automated checks
4. **Missing sitemap** - Essential for SEO

### 🤔 Optional Enhancements

1. **Tailwind CSS** - Not needed if CSS approach works
2. **Advanced plugins** - Add as specific needs arise
3. **Blog integration** - Only if needed

---

## Research-Backed Recommendations

### Must Do (High ROI)

1. **Starlight Links Validator** - Prevents broken links (5 min setup)
2. **Sitemap configuration** - SEO essential (1 min setup)
3. **CI/CD with quality checks** - Automation foundation (30 min)
4. **Accessibility audits** - WCAG compliance (20 min setup)

### Should Do (Medium ROI)

5. **Image zoom plugin** - Better UX (5 min)
6. **Meta descriptions audit** - SEO improvement (1-2 hours)
7. **Linting/formatting** - Code quality (15 min)

### Consider (Lower Priority)

8. **Automated deployment** - Streamlines releases
9. **Tailwind CSS** - Only if team prefers utilities
10. **Advanced plugins** - Based on specific needs

---

## Progressive Enhancement Philosophy

Research emphasizes a layered approach:

**Layer 1: Starlight Defaults** ✅

- Using Starlight's solid foundation
- Leveraging built-in features

**Layer 2: CSS Customization** ✅

- Custom CSS variables for theming
- Visual matching to Mintlify/PYX

**Layer 3: Plugin Ecosystem** ⚠️ (Gaps to fill)

- Need: Links validator, image zoom
- Future: Additional UX plugins as needed

**Layer 4: Component Overrides** ✅

- Selective overrides (PageTitle, SiteTitle, etc.)
- Only when CSS cannot achieve goal

**Current State:** Layers 1, 2, and 4 are solid. Layer 3 needs attention.

---

## Success Metrics

Track these metrics after implementation:

### Quality

- ✅ Zero broken links (via validator plugin)
- ✅ Lighthouse accessibility score ≥90
- ✅ WCAG AA compliance verified
- ✅ All pages have unique meta descriptions

### Automation

- ✅ CI passing on all PRs
- ✅ Automated accessibility checks
- ✅ Automated link validation
- ✅ Automated deployment (when configured)

### SEO

- ✅ Sitemap.xml generated
- ✅ All pages indexed by search engines
- ✅ Proper meta tags and descriptions
- ✅ Structured data (future)

---

## Next Steps

1. **Review this plan** - Confirm priorities align with goals
2. **Start with Priority 1** - Quality & automation foundation
3. **Run accessibility audit** - Identify specific issues
4. **Iterate on Priority 2** - UX enhancements
5. **Consider deployment** - When ready for production

The research validates your current approach while identifying specific gaps in automation and quality assurance. Focus on the "must do" items first for maximum impact.
