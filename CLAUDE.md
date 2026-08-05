# 專案技術文件

給接手維護的人（以及 Claude Code）。內容編輯者看 [README.md](./README.md) 就好。

> **README.md 的讀者是 Brynn（設計師，非工程背景）** —— 修改那份文件時避免技術術語、
> 檔案路徑、行號，指令要能直接複製貼上。技術細節一律放這裡。

---

## 架構

Astro 7 靜態站 + Cloudflare Workers adapter，worker 名稱 `brynn-portfolio`。

頁面全部預先渲染，只有 Keystatic 的兩條路由是動態的：`/keystatic/*`（後台介面）、`/api/keystatic/*`（OAuth 端點）。

內容以 build-time import 讀入（例如 `src/pages/index.astro:3`），**所以內容變動必須重建才會反映到線上**：

| 後台項目 | 檔案 |
| --- | --- |
| 網站共用（導覽與頁尾） | `src/content/site.json` |
| 首頁 | `src/content/index.json` |
| 關於我 | `src/content/about.json` |
| 專案 ×4 | `src/content/work/{quake,tra,soulmap,chuu}.json` |

Keystatic 用 `storage: github`（`keystatic.config.ts:13`，repo `nn-li/portfolio`）：編輯器存檔是**瀏覽器直接對 GitHub API 建 commit**，不經過 Worker。Worker 唯一的職責是 OAuth 換 token（需要 client_secret，不能放前端）。

```
瀏覽器 ──① 登入 ──► GitHub 授權頁
       ◄─② callback ── Worker（用 client_secret 換 token，寫 httpOnly cookie）
       ──③ 之後讀寫檔案，直接打 GitHub API ──► repo commit
                                                  │
                                                  ▼
                                          自動重建 → 線上更新
```

---

## 初次設定

> **這整段由 Brynn 自己執行**（GitHub 和 Cloudflare 帳號都是她的）。
> 給她看的逐步版本在 [README.md 的「第一次架設」](./README.md#第一次架設)。
> 這裡保留精簡版供對照與除錯。

### 1. 建立 GitHub App

需要用 **Brynn 的 GitHub 帳號**登入操作。

```bash
npm run dev
```

開 http://127.0.0.1:4321/keystatic → Setup 畫面兩欄都留空
（`nn-li` 是個人帳號不是 org；deployed URL 還不存在，之後補）
→ Create GitHub App → 授權 `nn-li/portfolio`

完成後三組密鑰自動寫進 `.env`（已在 `.gitignore`）。**另外備份一份到密碼管理工具。**

### 2. 首次部署

```bash
npm run deploy
```

記下產生的網址。

### 3. 設定 Worker secrets

> **這步由 Brynn 自己執行**（Cloudflare 帳號是她的，需要她登入）。
> 給她看的逐步版本在 [README.md 的「只做一次的設定」](./README.md#只做一次的設定)。
> 你要做的是把 `.env` 的三個值**用安全管道**交給她。

線上讀不到 `.env`，要另外設：

```bash
npx wrangler secret put KEYSTATIC_GITHUB_CLIENT_ID     --name brynn-portfolio
npx wrangler secret put KEYSTATIC_GITHUB_CLIENT_SECRET --name brynn-portfolio
npx wrangler secret put KEYSTATIC_SECRET               --name brynn-portfolio
npx wrangler secret list --name brynn-portfolio        # 確認三個都在
```

用 `--name` 而不是 `--config dist/server/wrangler.json`，是因為根目錄沒有 wrangler 設定檔（由 adapter 在 build 時產生到 `dist/server/`）。帶 `--name` 就不需要先跑一次 build，對非工程背景的操作者少一個失敗點。

**前提：worker 必須已經存在**，所以[步驟 2 的首次部署](#2-首次部署)要先做完，否則她會拿到 `not found`。

三個缺任何一個，production 會在啟動時直接 throw（`keystatic-core-api-generic.js:117`），不是安靜失敗。

### 4. 補 GitHub App 的 production callback

<https://github.com/settings/apps> → Edit → Callback URL **新增一行**（保留 localhost 那行）：

```
https://你的網址/api/keystatic/github/oauth/callback
```

兩組都要留，因為 OAuth 的 `redirect_uri` 是用當下請求的 origin 動態組出來的（`keystatic-core-api-generic.js:338`）。

### 5. 接自動重建 ⚠️ 尚未完成

**沒有這步，後台存檔只會進 GitHub，線上網站永遠不會變。**

Cloudflare Dashboard → Workers & Pages → `brynn-portfolio` → Settings → Build
→ 連結 repo `nn-li/portfolio`、branch `main`

| 項目 | 值 |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy --config dist/server/wrangler.json` |

（介面欄位名稱可能與此處略有出入，以實際為準。）

---

## `src/middleware.ts` 為什麼存在

Keystatic 5.2.0 注入的 API route 只做 `makeHandler({ config })` 不帶憑證（`node_modules/@keystatic/astro/internal/keystatic-api.js:5`），於是 handler 內部改從 `context.locals.runtime.env` 取密鑰（`dist/keystatic-astro-api.js:7`）。

但 `locals.runtime` 在 **Astro v6 已移除**，`@astrojs/cloudflare` v14 在該位置放了一個**一讀就 throw** 的 getter 當棄用警告（`dist/utils/cf-helpers.js:32`）。Keystatic 寫的 `?.` 救不了自己 —— `runtime` 這個屬性確實存在，optional chaining 照樣走進 getter。結果 `/api/keystatic/*` 一律 500。

修法：middleware **直接接管這條路由且不呼叫 `next()`**，讓注入的那條永遠不執行。自己呼叫 `makeHandler` 時把憑證明確傳入（`??` 鏈第一順位），並餵乾淨的 `locals`，全程碰不到那個 getter。

憑證同時涵蓋兩種環境：線上讀 `cloudflare:workers` 的 `env`（wrangler secrets）；本機 workerd 沒有這些 binding 而回傳 undefined，`??` 鏈自然往下掉到 `import.meta.env`，也就是 `.env`。

> **死路備忘**：試過「在 middleware 重設 `ctx.locals`」，Astro 7 丟 `LocalsReassigned: locals cannot be assigned directly`。別再試。

## `astro.config.mjs` 的 `optimizeDeps` 為什麼存在

Keystatic 的 server 進入點相依一串純 CommonJS 套件，透過 virtual module 注入所以 Vite optimizer 掃不到；workerd 只吃 ESM，直接載入 CJS 會丟 `exports/module is not defined`。把進入點列進 `optimizeDeps.include`，讓 esbuild 沿相依圖一次預打包成 ESM。

---

## 已知脆弱點

上面兩個 workaround 同源：**Keystatic 沒有針對 Workers runtime 維護**（peer deps 宣稱支援 astro 2–7，但顯然只在 Node 上測過）。

升級 `astro` / `@astrojs/cloudflare` / `@keystatic/astro` 任一個之後，都要重驗：

```bash
npm run build     # 應印出 Complete!

# 修好是 307，壞掉是 500
curl -s -D- -o /dev/null http://127.0.0.1:4321/api/keystatic/github/login \
  | grep -i "^HTTP\|^location"
```

兩種情況都是 307，差別在 `Location`：憑證未設定時導向 `/keystatic/setup`，設定完成後導向 `github.com/login/oauth/authorize`。

**逃生路線**：真的維護不動就換 Node-native 平台（Vercel / Netlify）。Keystatic 是對著 Node 測的，換掉 adapter 之後這兩個 workaround 都能刪，程式碼幾乎不用動。

---

## 開發雜項

```bash
npm run dev              # 127.0.0.1:4321（host 被 keystatic integration 強制）
npx astro dev status     # Astro 7 的 dev server 是背景常駐
npx astro dev logs       # 真正的錯誤訊息在這
npx astro dev stop
```

**不要在 dev server 開著的時候跑 `npm run build`** —— 兩個 process 會搶 `node_modules/.vite` 快取，症狀是全站 500 且訊息是 `The file does not exist at .../deps_ssr/...`。解法：

```bash
npx astro dev stop && rm -rf node_modules/.vite && npm run dev
```

## 待辦

- [ ] 完成上面的「初次設定」步驟 1–5，特別是**步驟 5 自動重建**
- [ ] 圖片欄位目前是 `fields.text` 純路徑（例如 `src/keystatic/soulmap.ts`），Brynn 不能自己上傳圖。要改善需調整 schema
- [ ] 無草稿／預覽流程，存檔直接進 main
