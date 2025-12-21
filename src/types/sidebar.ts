/**
 * Sidebar types matching Starlight's internal types.
 * These are not exported from @astrojs/starlight, so we define them here
 * to match the structure from utils/routing/types.ts
 */

export type BadgeVariant = 'note' | 'tip' | 'danger' | 'default' | 'success' | 'caution';

export interface SidebarLink {
  type: 'link';
  label: string;
  href: string;
  isCurrent: boolean;
  badge: { variant?: BadgeVariant; class?: string; text: string } | undefined;
  attrs: Record<string, unknown>;
}

export interface SidebarGroup {
  type: 'group';
  label: string;
  entries: SidebarEntry[];
  collapsed: boolean;
  badge: { variant?: BadgeVariant; class?: string; text: string } | undefined;
}

export type SidebarEntry = SidebarLink | SidebarGroup;
