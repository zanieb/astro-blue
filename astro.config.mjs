import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Astro Blue',
      favicon: '/favicon.svg',
      logo: {
        src: './src/assets/logo.svg',
      },
      components: {
        Head: './src/components/Head.astro',
        ThemeSelect: './src/components/ThemeSelect.astro',
        PageTitle: './src/components/PageTitle.astro',
        SiteTitle: './src/components/SiteTitle.astro',
        Sidebar: './src/components/Sidebar.astro',
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/example/astro-blue' },
        { icon: 'discord', label: 'Discord', href: 'https://discord.com/invite/astral-sh' },
      ],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Overview', slug: 'getting-started', attrs: { 'data-index': 'true' } },
            { label: 'Installation', slug: 'getting-started/installation' },
            { label: 'First Steps', slug: 'getting-started/first-steps' },
            { label: 'Configuration', slug: 'getting-started/configuration' },
            { label: 'Features', slug: 'getting-started/features' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Overview', slug: 'guides', attrs: { 'data-index': 'true' } },
            { label: 'Customization', slug: 'guides/customization' },
            { label: 'Colors', slug: 'guides/colors' },
            { label: 'Sidebar', slug: 'guides/sidebar' },
            {
              label: 'Integrations',
              items: [
                { label: 'Docker', slug: 'guides/integrations/docker' },
                { label: 'Vercel', slug: 'guides/integrations/vercel' },
                { label: 'GitHub Pages', slug: 'guides/integrations/github-pages' },
                { label: 'Cloudflare Pages', slug: 'guides/integrations/cloudflare' },
              ],
            },
          ],
        },
        {
          label: 'Concepts',
          items: [
            { label: 'Overview', slug: 'concepts', attrs: { 'data-index': 'true' } },
            {
              label: 'Components',
              items: [
                { label: 'Overview', slug: 'concepts/components' },
                { label: 'Asides', slug: 'concepts/asides' },
                { label: 'Code Blocks', slug: 'concepts/code-blocks' },
                { label: 'Cards', slug: 'concepts/cards' },
                { label: 'Tabs', slug: 'concepts/tabs' },
                { label: 'Steps', slug: 'concepts/steps' },
              ],
            },
            {
              label: 'Demos',
              items: [
                { label: 'On This Page', slug: 'concepts/on-this-page' },
                { label: 'Lists', slug: 'concepts/lists' },
                { label: 'Complex Lists', slug: 'concepts/complex-lists' },
                { label: 'Links', slug: 'concepts/links' },
                {
                  label: 'Breadcrumbs',
                  items: [
                    { label: 'Overview', slug: 'concepts/breadcrumb-test' },
                    { label: 'Child Page', slug: 'concepts/breadcrumb-test/child' },
                    { label: 'Grandchild Page', slug: 'concepts/breadcrumb-test/child/grandchild' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'Overview', slug: 'reference', attrs: { 'data-index': 'true' } },
            { label: 'Configuration', slug: 'reference/configuration' },
            { label: 'CSS Variables', slug: 'reference/css-variables' },
            { label: 'Frontmatter', slug: 'reference/frontmatter' },
            {
              label: 'Troubleshooting',
              items: [
                { label: 'Common Issues', slug: 'reference/troubleshooting/common-issues' },
                { label: 'Build Errors', slug: 'reference/troubleshooting/build-errors' },
              ],
            },
            { label: 'Changelog', slug: 'reference/changelog' },
          ],
        },
      ],
      customCss: ['./src/styles/custom.css'],
    }),
  ],
});
