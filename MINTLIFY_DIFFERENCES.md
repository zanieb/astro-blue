# Mintlify/PYX Docs vs Astro Blue - Remaining Differences

A comparison of our Astro Blue theme against the PYX Documentation (https://docs.pyx.dev) which uses Mintlify. This document identifies remaining polish items to achieve feature parity.

---

## Header / Navigation

### Logo & Branding
| Feature | Mintlify/PYX | Astro Blue | Priority |
|---------|--------------|------------|----------|
| Logo icon | Purple square icon with "P" | None - text only | High |
| Logo + title layout | Icon + "PYX Documentation" | Just "Astro Blue" text | Medium |

### Navigation Items
| Feature | Mintlify/PYX | Astro Blue | Priority |
|---------|--------------|------------|----------|
| Extra nav links | "Contact", "Service Status" | None | Low |
| CTA button | Purple "Dashboard >" button | None | Low |
| Search bar styling | Rounded, subtle placeholder | Default Starlight | Medium |
| Header border | Very subtle bottom border | More prominent | Low |

---

## Sidebar

### Background & Colors
| Feature | Mintlify/PYX | Astro Blue | Priority |
|---------|--------------|------------|----------|
| Sidebar background | Pure white (matches content) | Light gray tint | High |
| Border/separator | Subtle right border | Starlight default | Medium |

### Section Headers
| Feature | Mintlify/PYX | Astro Blue | Priority |
|---------|--------------|------------|----------|
| Top-level style | Small gray text, not uppercase | UPPERCASE, larger | High |
| Collapsible sections | Not collapsible, static groups | All sections collapsible | Medium |
| Group label style | Bold text like "Account", "Support" | Uppercase headers | High |

### Links
| Feature | Mintlify/PYX | Astro Blue | Priority |
|---------|--------------|------------|----------|
| Selected item | Subtle gray rounded background | Purple background | Medium |
| Hover state | Light gray background | Similar but different shade | Low |
| Font weight | Normal, consistent | Similar | Low |
| Link padding | Tighter vertical padding | Slightly more padding | Low |

### Hierarchy Indicator
| Feature | Mintlify/PYX | Astro Blue | Priority |
|---------|--------------|------------|----------|
| Parent label above content | "pyx" shown above "Introduction" | Not present | Medium |
| Breadcrumb in sidebar | Section context shown | None | Low |

---

## Content Area

### Page Header
| Feature | Mintlify/PYX | Astro Blue | Priority |
|---------|--------------|------------|----------|
| Breadcrumb above title | "pyx" shown above "Introduction" | None | High |
| Title underline/border | None | Subtle line under title | Low |
| Title typography | Clean, possibly different font | Default Starlight | Medium |

### Typography
| Feature | Mintlify/PYX | Astro Blue | Priority |
|---------|--------------|------------|----------|
| Heading font | Appears slightly different weight | Starlight default | Medium |
| Body line-height | Generous, very readable | Good but different | Low |
| Link styling | Underlined, subtle | Similar | Low |

### Lists
| Feature | Mintlify/PYX | Astro Blue | Priority |
|---------|--------------|------------|----------|
| Ordered list numbers | Gray, slightly separated | Default Starlight | Medium |
| List spacing | More generous | Tighter | Low |
| Bold in list items | Clean, distinct | Similar | Low |

### Code Blocks
| Feature | Mintlify/PYX | Astro Blue | Priority |
|---------|--------------|------------|----------|
| Border radius | More rounded | Less rounded | Low |
| Background color | Slightly different gray | Current gray | Low |
| Header bar | Has colored dots (macOS style) | Has dots | Low |

---

## Table of Contents (Right Sidebar)

| Feature | Mintlify/PYX | Astro Blue | Priority |
|---------|--------------|------------|----------|
| Visibility | Hidden on some pages | Always visible | Medium |
| "On this page" header | May not have | Has header | Low |
| Active indicator | Subtle | Purple text | Low |

---

## Overall Polish

### Whitespace & Spacing
| Feature | Mintlify/PYX | Astro Blue | Priority |
|---------|--------------|------------|----------|
| Content max-width | Narrower, more focused | Wider | Medium |
| Sidebar width | Narrower | Wider | Low |
| Content padding | More generous margins | Default | Medium |

### Colors & Contrast
| Feature | Mintlify/PYX | Astro Blue | Priority |
|---------|--------------|------------|----------|
| Gray tones | Warmer, softer | Cooler grays | Medium |
| Accent usage | Minimal, mostly purple | Similar | Low |
| Background consistency | All white | Gray sidebar | High |

### Animations & Transitions
| Feature | Mintlify/PYX | Astro Blue | Priority |
|---------|--------------|------------|----------|
| Hover transitions | Very smooth | Basic | Low |
| Page transitions | May have | None | Low |

---

## Priority Summary

### High Priority (Big Impact)
1. **Sidebar background** - Change to white to match content area
2. **Section headers** - Remove uppercase, use simpler styling
3. **Breadcrumb** - Add parent section above page title
4. **Logo** - Add a logo icon

### Medium Priority (Polish)
1. Search bar styling refinement
2. Typography adjustments (font weights, spacing)
3. Content area max-width
4. Ordered list styling
5. Table of contents behavior

### Low Priority (Nice to Have)
1. Extra navigation links
2. CTA button in header
3. Animation smoothness
4. Minor spacing adjustments

---

## Implementation Notes

### Starlight Component Overrides
These changes may require component overrides (like we did for ThemeSelect):
- `Header.astro` - for logo and nav links
- `Sidebar.astro` - for section header styling
- `PageTitle.astro` - for breadcrumb above title

### CSS-Only Changes
These can be done with CSS in `custom.css`:
- Sidebar background color
- Typography refinements
- Spacing adjustments
- List styling

### Configuration Changes
Some changes may be possible via `astro.config.mjs`:
- Table of contents visibility
- Sidebar behavior
