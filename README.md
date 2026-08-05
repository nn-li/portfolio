# 網站文字怎麼改

你的作品集網站可以自己改文字，不用找工程師。

> **第一次使用前，有一件事要先做一次** —— 見最後面的[只做一次的設定](#只做一次的設定)。
> 做完之後就再也不用碰了，之後都只是開網頁改字而已。

---

## 怎麼改

**1. 打開後台**

```
https://你的網址/keystatic
```

第一次會要你用 GitHub 帳號登入，之後就會記住。

**2. 左邊選要改的頁面**

- 網站共用（導覽與頁尾）
- 首頁
- 關於我
- 專案：震時秒判 Quake
- 專案：台鐵 e訂通
- 專案：Soul Map
- 專案：chuu 服飾電商

**3. 改完按儲存**

就這樣。

---

## 存檔之後

**網站不會馬上變，要等大約 1 到 2 分鐘。**

這是這種網站的特性 —— 它會先把你的新文字「重新做成網頁」，做好才換上去。
所以存完檔去倒杯水，回來重新整理就看到了。

如果超過 5 分鐘還是舊的，跟 Rei 說一聲。

---

## 改壞了怎麼辦

**別緊張，每一次修改都有完整紀錄，隨時可以還原。**

網站背後會自動把你的每次存檔記下來，包含改了什麼、什麼時候改的。
要退回去只要跟 Rei 說「我想回到昨天的版本」就可以。

所以放心改，弄壞了不會不見。

---

## 現在還不能做的事

| | 說明 |
| --- | --- |
| **換圖片** | 後台只能填「圖片的位置」，不能直接拖曳上傳。想換圖的話把圖片給 Rei。 |
| **草稿** | 沒有草稿功能，按儲存就是直接上線。想先想一下的話，先存在別的地方。 |
| **改版面** | 後台只管文字。想調整排版、顏色、字級要找 Rei。 |
| **新增頁面** | 想多一個專案頁要找 Rei 開。 |

這些都不是做不到，只是要花時間做。有需要就提。

---

## 卡住了

| 狀況 | 怎麼辦 |
| --- | --- |
| 後台打不開、一片空白 | 先重新整理一次，還是不行就找 Rei |
| 要你重新登入 | 正常，登入就好 |
| 存檔跳出錯誤 | **先把畫面截圖**，再找 Rei |
| 存了但網站沒變 | 等滿 5 分鐘，還是沒變就找 Rei |

截圖很重要，錯誤訊息裡有找問題的線索。

---

## 第一次架設

從零到網站上線，六個步驟。**只做一次**，做完之後日常就只是開網頁改字。

全程都在終端機和瀏覽器之間切換，指令可以直接複製貼上。
建議留一到兩個小時，中間有幾段要等機器跑。

> 開始前確認一下 Node.js 版本夠新（要 22.12 以上）：
> ```bash
> node -v
> ```
> 太舊或沒裝的話，到 <https://nodejs.org> 下載 LTS 版本安裝。

---

### 第 1 步 · 把專案放到電腦上

```bash
git clone https://github.com/nn-li/portfolio.git
cd portfolio
npm install
```

`npm install` 會跑一陣子，跑完沒有紅色 error 就可以繼續。

> 之後每次要在終端機操作，都要先 `cd` 到這個資料夾。
> 忘記路徑的話，把資料夾從 Finder 拖進終端機視窗會自動填入。

---

### 第 2 步 · 建立 GitHub App

這步會產生三組密碼，是後台能寫入你 GitHub 的憑證。

```bash
npm run dev
```

瀏覽器打開 **http://127.0.0.1:4321/keystatic**，會看到「Keystatic Setup」畫面：

| 欄位 | 怎麼填 |
| --- | --- |
| Deployed App URL | **留空**（網站還沒部署，網址還不存在，之後再補） |
| GitHub organization | **留空**（`nn-li` 是個人帳號，不是組織） |

按 **Create GitHub App** → GitHub 會問要授權哪些 repo → 選 **`nn-li/portfolio`**

完成後會自動導回來，三組密碼已經寫進專案裡的 `.env` 檔。

做完關掉開發伺服器：

```bash
npx astro dev stop
```

---

### 第 3 步 · 第一次部署

```bash
npm run deploy
```

第一次會跳出瀏覽器要你登入 Cloudflare，同意授權就好。

跑完會印出網址，長得像 `https://brynn-portfolio.你的帳號.workers.dev`。
**把它記下來**，後面兩步和日常使用都要用。

這時候網站已經看得到了，但後台還不能用 —— 因為密碼還沒交給主機，也就是下一步。

---

### 第 4 步 · 把三組密碼交給主機

#### 這三組密碼從哪來

**是你自己的電腦產生的，不用跟任何人要。**

你在前面建立 GitHub App 的時候，系統就已經自動把它們寫進專案資料夾裡一個叫
`.env` 的檔案了。現在只是要把裡面的值複製出來，貼到 Cloudflare 上。

要打開來看，在終端機裡貼這行：

```bash
open -e .env
```

會用文字編輯器打開，內容長這樣（值都是亂碼，正常）：

```
KEYSTATIC_GITHUB_CLIENT_ID=Iv1.a1b2c3d4e5f6g7h8
KEYSTATIC_GITHUB_CLIENT_SECRET=1a2b3c4d5e6f7g8h9i0j...
KEYSTATIC_SECRET=9f8e7d6c5b4a...
```

等號**右邊**那一長串就是要用的值（等號左邊是名字，不要複製）。

> 🔒 **這三組值等於你網站的鑰匙，任何人拿到都能改你的網站。**
> 不要貼到 LINE、Slack、email、雲端筆記，不要截圖，不要傳給任何人。
> `.env` 這個檔案已經設定成不會被上傳到 GitHub，讓它待在你電腦上就好。
> 想備份的話存進 1Password 這類密碼管理工具。

#### 一組一組設定進去

`.env` 是你電腦上的檔案，線上主機讀不到，所以要另外交給它一次。

三個指令逐一執行，每個都會問 `Enter a secret value:`，貼上對應的值再按 Enter：

```bash
npx wrangler secret put KEYSTATIC_GITHUB_CLIENT_ID     --name brynn-portfolio
npx wrangler secret put KEYSTATIC_GITHUB_CLIENT_SECRET --name brynn-portfolio
npx wrangler secret put KEYSTATIC_SECRET               --name brynn-portfolio
```

> **貼上的時候畫面看起來沒反應是正常的** —— 密碼輸入本來就不會顯示。
> 貼上後直接按 Enter 就對了。

確認三組都進去了：

```bash
npx wrangler secret list --name brynn-portfolio
```

列出三個名字就成功了。

---

### 第 5 步 · 讓 GitHub 認得線上網址

GitHub App 現在只認得 localhost，線上後台會登不進去，要補上正式網址。

1. 到 <https://github.com/settings/apps> 找到剛才建立的 App → **Edit**
2. 找到 **Callback URL**，**新增一行**（原本 localhost 那行留著，不要覆蓋）：

   ```
   https://你的網址/api/keystatic/github/oauth/callback
   ```

3. 順便把 **Homepage URL** 改成 `https://你的網址`
4. 儲存

> 兩組都要留，因為在本機和在線上編輯時，GitHub 要導回的地方不一樣。

現在打開 `https://你的網址/keystatic`，應該可以登入並看到編輯畫面了。

---

### 第 6 步 · 設定自動更新

**最後一步，也是最重要的一步。**

沒有這步，你在後台存檔只會存進 GitHub，**線上網站永遠不會變** —— 每次都得回到電腦上手動跑一次 `npm run deploy`。

1. 登入 <https://dash.cloudflare.com> → **Workers & Pages**
2. 找到 **brynn-portfolio** → **Settings** → **Build**
3. 連結 GitHub 帳號，選 repo `nn-li/portfolio`、branch `main`
4. 建置設定填：

   | 項目 | 值 |
   | --- | --- |
   | Build command | `npm run build` |
   | Deploy command | `npx wrangler deploy --config dist/server/wrangler.json` |

5. 儲存

> Cloudflare 的介面偶爾改版，欄位名稱可能跟這裡寫的略有出入，找意思相近的即可。

**測試一下**：到後台隨便改一個字存檔，回到 Cloudflare 的 **Builds** 頁面，
應該會看到一筆新的建置正在跑。跑完再看網站，文字就變了。

---

### 完成

到這裡全部設定完了。日常使用回到最前面的[怎麼改](#怎麼改)就好。

`npm run deploy` 這個指令之後基本上用不到了，但自動更新萬一壞掉時，
它永遠是可以手動推一次的備案。

### 架設過程出錯的話

| 訊息裡有 | 意思 | 怎麼辦 |
| --- | --- | --- |
| `not found` / `does not exist` | 網站還沒部署過 | 先完成第 3 步 |
| `not logged in` / `authentication` | Cloudflare 沒登入 | 跑 `npx wrangler login` |
| `no such file or directory` | 不在專案資料夾裡 | `cd` 到 portfolio 資料夾再試 |
| `EACCES` / `permission denied` | 權限問題 | 截圖求助，不要用 `sudo` 硬解 |

---

<sub>技術文件在 [CLAUDE.md](./CLAUDE.md)。</sub>
