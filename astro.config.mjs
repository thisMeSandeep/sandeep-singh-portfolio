// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Canonical base URL. Used for canonical tags, sitemap, and absolute OG URLs.
  site: 'https://sandeepnayal.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
