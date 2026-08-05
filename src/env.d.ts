/**
 * 兩個「虛擬模組」的型別補充：它們在執行期由 runtime / bundler 提供，磁碟上沒有實體檔案，
 * 所以 TypeScript 找不到，需要手動宣告。
 *
 * - cloudflare:workers  由 workerd 提供。@astrojs/cloudflare 沒有附這個模組的型別
 *   （node_modules/@astrojs/cloudflare/types.d.ts 只宣告了 App.Locals），也沒安裝
 *   @cloudflare/workers-types。這裡只宣告我們真正用到的 env，不假裝涵蓋整個 Workers API。
 * - virtual:keystatic-config  由 Keystatic 的 vite plugin 轉址到根目錄的 keystatic.config.ts
 *   （node_modules/@keystatic/astro/dist/keystatic-astro.js:20）。
 */

declare module 'cloudflare:workers' {
  export const env: Record<string, string | undefined>;
}

declare module 'virtual:keystatic-config' {
  const config: import('@keystatic/core').Config;
  export default config;
}
