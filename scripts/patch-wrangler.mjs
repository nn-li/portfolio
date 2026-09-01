// postbuild 補丁：把 SESSION KV namespace 的 id 補進 adapter 產生的 wrangler.json。
//
// 為什麼需要：@astrojs/cloudflare 產生的 dist/server/wrangler.json 只寫
// {"binding":"SESSION"}、不帶 id。deploy 時 wrangler 會「嘗試新建」同名 namespace，
// 但它已經存在，於是報 "namespace already exists" 讓部署失敗。補上既有 namespace 的
// id，wrangler 就會改成「沿用」而非「新建」。
//
// 這個 id 是這個 Cloudflare 帳號（zutto1166）裡 brynn-portfolio-session 的 id。
// 若日後換帳號 / 重建 KV，改這裡即可（用 `npx wrangler kv namespace list` 查新 id）。
import { readFileSync, writeFileSync } from 'node:fs';

const CONFIG_PATH = 'dist/server/wrangler.json';
const SESSION_KV_ID = '0f95de20a5f643bca1e52adfbaa03edf';

const config = JSON.parse(readFileSync(CONFIG_PATH, 'utf8'));

let patched = 0;
const fill = (list) => {
  if (!Array.isArray(list)) return;
  for (const ns of list) {
    if (ns?.binding === 'SESSION' && !ns.id) {
      ns.id = SESSION_KV_ID;
      patched++;
    }
  }
};

fill(config.kv_namespaces);
fill(config.previews?.kv_namespaces);

if (patched > 0) {
  writeFileSync(CONFIG_PATH, JSON.stringify(config));
  console.log(`[patch-wrangler] 已補上 SESSION KV id（${patched} 處）`);
} else {
  console.log('[patch-wrangler] SESSION KV id 已存在或找不到 binding，未變更');
}
