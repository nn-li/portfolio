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
  vite: {
    // Keystatic 的 server 進入點（/keystatic 後台 + /api/keystatic API）會相依一串純
    // CommonJS 套件（set-cookie-parser、cookie、superstruct…）。它們透過 virtual module
    // 注入，Vite optimizer 掃不到、不會預打包；而 Cloudflare 的 workerd dev runtime 只吃
    // ESM，直接載入 CJS 會丟 "exports/module is not defined"。
    // 把 Keystatic 進入點列進 optimizeDeps.include，@astrojs/cloudflare 會轉發到 ssr 環境，
    // 讓 esbuild 沿著相依圖「一次」把所有巢狀 CJS 預打包成 ESM。
    optimizeDeps: {
      include: [
        '@keystatic/astro/api',
        '@keystatic/core',
        '@keystatic/core/api/generic',
        'set-cookie-parser',
      ],
    },
  },
});
