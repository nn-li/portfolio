import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  // 保留與原靜態站相同的 URL 結構（/about.html、/work/quake.html）
  build: { format: 'file' },
  // 頁面全部預先靜態化；只有 /keystatic 後台與其 API 走 server render
  integrations: [react(), keystatic()],
  adapter: cloudflare(),
});
