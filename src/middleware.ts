import { defineMiddleware } from 'astro:middleware';

/**
 * ── 為什麼需要這支 middleware ──
 *
 * Keystatic 5.2.0 注入的 API route（node_modules/@keystatic/astro/internal/keystatic-api.js）
 * 只做 `makeHandler({ config })`，不帶憑證；於是 handler 內部改從
 * `context.locals.runtime.env` 取 GitHub App 的三個 secret
 * （node_modules/@keystatic/astro/dist/keystatic-astro-api.js:7）。
 *
 * 但 `locals.runtime` 在 Astro v6 已移除，@astrojs/cloudflare v14 改放一個「一讀就 throw」
 * 的 getter 當棄用警告（dist/utils/cf-helpers.js:32）。Keystatic 寫的 `?.` 救不了自己 ——
 * runtime 這個屬性確實存在，optional chaining 照樣走進 getter 然後炸。
 *
 * 修法：在 middleware 直接接管 /api/keystatic/*，不呼叫 next()，讓那條注入路由永遠不會執行。
 * 我們自己呼叫 makeHandler，把憑證「明確傳進去」（?? 鏈的第一順位），並餵一個乾淨的 locals，
 * 於是 handler 完全不會碰到那個有毒的 getter。
 *
 * 憑證來源同時涵蓋兩種環境：
 *   - 線上 Workers：cloudflare:workers 的 env（wrangler secret put 設定的值）
 *   - 本機 dev：workerd 沒有這些 binding → 傳入 undefined → handler 的 ?? 鏈往下掉到
 *     import.meta.env，也就是 .env 檔，維持 Keystatic 原本的本機開發流程
 */
export const onRequest = defineMiddleware(async (ctx, next) => {
  if (!ctx.url.pathname.startsWith('/api/keystatic')) return next();

  // 動態載入：cloudflare:workers 只存在於 workerd。build 時 Node 會預先渲染各靜態頁並執行
  // middleware，若寫成頂層 import 會在建置階段就解析失敗。
  const [{ env }, { makeHandler }, { default: config }] = await Promise.all([
    import('cloudflare:workers'),
    import('@keystatic/astro/api'),
    import('virtual:keystatic-config'),
  ]);

  const handler = makeHandler({
    config,
    clientId: env.KEYSTATIC_GITHUB_CLIENT_ID,
    clientSecret: env.KEYSTATIC_GITHUB_CLIENT_SECRET,
    secret: env.KEYSTATIC_SECRET,
  });

  // handler 只用到 request / cookies / locals 三個欄位；locals 給乾淨物件即可。
  return handler({
    request: ctx.request,
    cookies: ctx.cookies,
    locals: {},
  } as Parameters<typeof handler>[0]);
});
