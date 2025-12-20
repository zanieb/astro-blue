import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Astro Blue',
      components: {
        ThemeSelect: './src/components/ThemeSelect.astro',
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/example/astro-blue' },
      ],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Installation', slug: 'getting-started/installation' },
            { label: 'First Steps', slug: 'getting-started/first-steps' },
            { label: 'Configuration', slug: 'getting-started/configuration' },
            { label: 'Features', slug: 'getting-started/features' },
          ],
        },
        {
          label: 'Guides',
          items: [
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
            { label: 'Components', slug: 'concepts/components' },
            { label: 'Asides', slug: 'concepts/asides' },
            { label: 'Code Blocks', slug: 'concepts/code-blocks' },
            { label: 'Cards', slug: 'concepts/cards' },
            { label: 'Tabs', slug: 'concepts/tabs' },
            { label: 'Steps', slug: 'concepts/steps' },
          ],
        },
        {
          label: 'Reference',
          items: [
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
