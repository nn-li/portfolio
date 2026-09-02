import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';

// Keystatic 後台登入需要 GitHub App 的 slug，會在 build 時經 import.meta.env
// .PUBLIC_KEYSTATIC_GITHUB_APP_SLUG 烤進前端 bundle。寫死一個預設值，讓每次打包
//（本機 npm run build、Cloudflare 自動 build）都自動帶上，不必另外設環境變數；
// 若外部已設同名環境變數則以外部為準。少了它線上後台會登不進去。
process.env.PUBLIC_KEYSTATIC_GITHUB_APP_SLUG ||= 'brynn-portfolio-cms';

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
    server: {
      watch: {
        // 忽略本機參考／原檔資料夾（含第三方 node_modules），否則 dev server 會監看
        // 巨大檔案樹、反覆整頁重載，甚至不穩定當掉。
        ignored: ['**/_ref/**', '**/_src-graphic/**', '**/_backup/**'],
      },
    },
  },
});
