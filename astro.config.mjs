import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Astro Blue',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' },
      ],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', slug: 'getting-started/introduction' },
          ],
        },
        {
          label: 'Demo',
          items: [
            { label: 'Quickstart', slug: 'demo/quickstart' },
            { label: 'Configuration', slug: 'demo/configuration' },
            { label: 'API Reference', slug: 'demo/api-reference' },
            { label: 'Examples', slug: 'demo/examples' },
          ],
        },
      ],
      customCss: ['./src/styles/custom.css'],
    }),
  ],
});
