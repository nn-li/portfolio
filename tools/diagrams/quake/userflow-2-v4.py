#!/usr/bin/env python3
# 流程二｜日常防震準備 產生器（深色螢光綠風格，重建自原 userflow-2.png）
# 執行：python3 userflow-2-v4.py > userflow-2-v4.svg

W, H = 1920, 1340
BG, CARD, CBORD = "#141414", "#1e1f1a", "#3c3e33"
GREEN, GDARK = "#d3f04b", "#20220f"
WHITE, GREY, LINE = "#ecede4", "#a0a196", "#6b6d5e"
S = []

def txt(x, y, t, fs=22, fill=GREY, w="400", anchor="middle"):
    S.append(f'<text x="{x}" y="{y}" text-anchor="{anchor}" font-size="{fs}" font-weight="{w}" fill="{fill}">{t}</text>')

def card(x, y, w, h, title, lines, kind="dark", tfs=26, dfs=20):
    if kind == "entry":
        S.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="22" fill="{GREEN}"/>')
        tcol, dcol = GDARK, "#3a3d1e"
    elif kind == "judge":
        S.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="22" fill="{CARD}" stroke="{GREEN}" stroke-width="2.5"/>')
        tcol, dcol = GREEN, GREY
    else:
        S.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="22" fill="{CARD}" stroke="{CBORD}" stroke-width="1.5"/>')
        tcol, dcol = WHITE, GREY
    cx = x + w/2
    txt(cx, y+54, title, tfs, tcol, "700")
    for i, l in enumerate(lines):
        txt(cx, y+96+i*32, l, dfs, dcol)

def arrow(d):
    S.append(f'<path d="{d}" fill="none" stroke="{LINE}" stroke-width="2.5" marker-end="url(#ar)"/>')

def module_row(y, title, logic, cards):
    # 標題列
    txt(90, y, title, 26, GREEN, "700", "start")
    txt(90 + len(title)*27 + 24, y, "邏輯：" + logic, 21, GREY, "400", "start")
    # 四張卡
    xs, wcard = [90, 570, 1050, 1530], 330
    for i, (t, lines, kind) in enumerate(cards):
        card(xs[i], y+28, wcard, 176, t, lines, kind)
    return xs, wcard

def row_labels(y, labels):
    # 卡片間的箭頭與條件標籤
    mids = [(420, 570), (900, 1050), (1380, 1530)]
    for (x0, x1), t in zip(mids, labels):
        txt((x0+x1)/2, y+96, t, 19, WHITE)
        arrow(f"M {x0+6} {y+116} H {x1-8}")

# 表頭
S.append(f'<rect x="90" y="52" width="96" height="46" rx="23" fill="{GREEN}"/>')
txt(138, 84, "震前", 24, GDARK, "700")
txt(212, 90, "日常防震準備", 42, WHITE, "700", "start")
txt(90, 165, "從首頁「防震準備」進入，三個模組獨立運作、各自可完成。設計邏輯是把「準備」拆成小任務：清單化、給提醒、", 24, GREY, "400", "start")
txt(90, 203, "可反覆練習，讓防災變成日常就能維護的事。", 24, GREY, "400", "start")

# 圖例
S.append(f'<rect x="90" y="238" width="1740" height="74" rx="16" fill="none" stroke="{CBORD}" stroke-width="1.5"/>')
S.append(f'<rect x="122" y="264" width="22" height="22" rx="6" fill="{GREEN}"/>')
txt(160, 283, "模組進入點", 22, GREY, "400", "start")
S.append(f'<rect x="316" y="264" width="22" height="22" rx="6" fill="none" stroke="{GREY}" stroke-width="2"/>')
txt(354, 283, "App 畫面", 22, GREY, "400", "start")
S.append(f'<polygon points="505,264 518,275 505,286 492,275" fill="none" stroke="{GREEN}" stroke-width="2"/>')
txt(536, 283, "系統判斷", 22, GREY, "400", "start")
S.append(f'<rect x="698" y="264" width="22" height="22" rx="6" fill="{CBORD}"/>')
txt(736, 283, "模組完成", 22, GREY, "400", "start")

# 模組 1
y1 = 388
module_row(y1, "模組 1・防災包管理", "先知道家裡需要什麼，再追蹤有沒有備齊、會不會過期", [
    ("設定家庭成員", ["人數・嬰幼兒・寵物", "慢性病等特殊需求"], "entry"),
    ("客製化物資清單", ["食品・飲水・醫療", "證件，而非通用清單"], "dark"),
    ("缺項／效期偵測", ["盤點完成度", "與各品項效期"], "judge"),
    ("提醒補齊・更新", ["點擊提醒回到清單", "形成維護循環"], "dark"),
])
row_labels(y1, ["系統依成員生成", "逐項確認", "到期前推播"])
S.append(f'<path d="M 90 {y1+256} H 1830" stroke="#2c2d26" stroke-width="1.5"/>')

# 模組 2
y2 = 706
module_row(y2, "模組 2・家具固定自檢", "先盤點居家風險，再教會使用者怎麼處理", [
    ("選擇居家空間", ["客廳・臥室・廚房", "逐空間檢查"], "entry"),
    ("固定狀態判斷", ["櫃體・電器・吊掛物", "是否已固定"], "judge"),
    ("動態翻卡教學", ["對應家具的固定方式", "示範與所需工具"], "dark"),
    ("完成標記", ["累計居家安全完成度", "未完成項目保留提醒"], "dark"),
])
row_labels(y2, ["逐項檢查", "未固定項目", "處理完成後"])
S.append(f'<path d="M 90 {y2+256} H 1830" stroke="#2c2d26" stroke-width="1.5"/>')

# 模組 3
y3 = 1024
module_row(y3, "模組 3・互動式模擬演練", "用隨機情境模擬真實的不可預期，練完給檢討", [
    ("選擇演練模式", ["自選情境", "或隨機模擬"], "entry"),
    ("情境組合", ["地區 × 建築類型 ×", "樓層 × 時間情境"], "dark"),
    ("模擬警報演練", ["照震時流程實際操作", "掩護或避難的判斷"], "dark"),
    ("後設反思", ["檢討本次選擇", "給出改進建議"], "dark"),
])
row_labels(y3, ["隨機模式自動生成", "開始演練", "演練結束"])

head = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" font-family="Noto Sans TC, PingFang TC, Hanken Grotesk, sans-serif">',
        f'<defs><marker id="ar" markerWidth="11" markerHeight="11" refX="9" refY="5.5" orient="auto"><path d="M0,0 L10,5.5 L0,11 Z" fill="{GREEN}"/></marker></defs>',
        f'<rect width="{W}" height="{H}" fill="{BG}"/>']
print("\n".join(head + S) + "\n</svg>")
