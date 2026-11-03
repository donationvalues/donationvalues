import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://donationvalues.org',
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'directory',
    // Keep CSS in external files so the CSP in public/_headers needs no 'unsafe-inline'.
    inlineStylesheets: 'never',
  },
  integrations: [sitemap()],
});
