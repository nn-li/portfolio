#!/usr/bin/env python3
# 台鐵 e訂通 User Flow v2 產生器（橫式單視窗版面）
# 執行：python3 userflow-full-v2.py > userflow-full-v2.svg
# 流程內容依 2026-07 內容改版規格 6.5；視覺沿用原 userflow-full.png 的淺藍語言。

W, H = 1560, 880
BORDER, SOLID, TEXT, BAND = "#4a9bd8", "#2f8bd0", "#1d3a5f", "#2f8bd0"
BG, PANEL, ACCENT, LINE = "#ddeefa", "#ffffff", "#eaf5fd", "#4a9bd8"
S = []

def node(x, y, w, h, lines, solid=False, accent=False, fs=14):
    fill = SOLID if solid else (ACCENT if accent else PANEL)
    color = "#ffffff" if solid else TEXT
    S.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="9" fill="{fill}" stroke="{BORDER}" stroke-width="1.6"/>')
    n = len(lines)
    for i, t in enumerate(lines):
        ty = y + h/2 + (i - (n-1)/2) * (fs + 5) + fs*0.36
        size = fs if i == 0 else fs - 1.5
        S.append(f'<text x="{x+w/2}" y="{ty}" text-anchor="middle" font-size="{size}" fill="{color}">{t}</text>')

def diamond(cx, cy, w, h, label, fs=13.5):
    S.append(f'<polygon points="{cx},{cy-h/2} {cx+w/2},{cy} {cx},{cy+h/2} {cx-w/2},{cy}" fill="{ACCENT}" stroke="{BORDER}" stroke-width="1.6"/>')
    S.append(f'<text x="{cx}" y="{cy+fs*0.36}" text-anchor="middle" font-size="{fs}" fill="{TEXT}">{label}</text>')

def edge(d, dotted=False):
    dash = ' stroke-dasharray="6 5"' if dotted else ""
    S.append(f'<path d="{d}" fill="none" stroke="{LINE}" stroke-width="1.6"{dash} marker-end="url(#ar)"/>')

def label(x, y, t, fs=12.5):
    S.append(f'<text x="{x}" y="{y}" font-size="{fs}" fill="{BAND}">{t}</text>')

def band(x, y, t):
    S.append(f'<text x="{x}" y="{y}" font-size="14" font-weight="700" letter-spacing="2" fill="{BAND}">{t}</text>')

# ── 訂票（第一列） ──
band(70, 122, "訂票")
row_y, hh = 140, 48
xs = [90, 300, 510, 720, 930]
names = ["訂票頁面", "填寫訂票資訊", "選擇車次", "確認訂票資訊", "人機驗證"]
for x, t in zip(xs, names):
    node(x, row_y, 170, hh, [t])
node(1140, 132, 280, 64, ["訂票成功", "顯示訂單結果、付款期限與付款選擇"])
for x in xs[1:]:
    edge(f"M {x-40} 164 H {x}")
edge("M 1100 164 H 1140")

# ── 付款（第二列） ──
band(70, 326, "付款")
edge("M 1280 196 V 282")
diamond(1280, 320, 150, 76, "是否立即付款")
label(1150, 308, "是"); edge("M 1205 320 H 1120")
node(950, 296, 170, 48, ["選擇付款方式"])
edge("M 950 320 H 860")
node(710, 296, 150, 48, ["完成付款"])
label(1290, 396, "否"); edge("M 1280 358 V 420")
node(1150, 420, 280, 64, ["進入我的車票「未付款」", "顯示付款期限與返回付款入口"])
label(1030, 442, "返回付款"); edge("M 1150 452 H 1035 V 344", dotted=True)

# ── 取票與分票（第三列） ──
band(70, 500, "取票與分票")
edge("M 785 344 V 520")
diamond(785, 560, 160, 80, "是否立即取票")
label(682, 548, "是"); edge("M 705 560 H 670")
node(500, 536, 170, 48, ["選擇取票方式"])
edge("M 500 560 H 470")
diamond(400, 560, 140, 76, "是否分票")
label(410, 620, "是"); edge("M 400 598 V 622 H 355 V 646")
node(280, 646, 150, 48, ["取得驗證碼"])
edge("M 430 670 H 470")
node(470, 646, 210, 48, ["分享驗證碼給同行者"])
edge("M 680 670 H 720")
node(720, 646, 170, 48, ["分票完成回饋"], solid=True)
label(290, 546, "否"); edge("M 330 560 H 175 V 646")
node(90, 646, 170, 48, ["取票完成回饋"], solid=True)

# ── 票券狀態（右下） ──
S.append(f'<rect x="1080" y="580" width="360" height="230" rx="12" fill="{ACCENT}" stroke="{BORDER}" stroke-width="1.4"/>')
S.append(f'<text x="1260" y="612" text-anchor="middle" font-size="13.5" font-weight="700" fill="{TEXT}">我的車票（票券狀態）</text>')
chips = [("未付款", 1110, 630), ("待取票", 1270, 630), ("已分票", 1110, 700), ("已取票", 1270, 700)]
for t, x, y in chips:
    node(x, y, 140, 40, [t], fs=13)
label(880, 548, "否"); edge("M 865 560 H 1340 V 630")
edge("M 1200 484 V 630")
edge("M 805 694 V 760 H 1180 V 740")
edge("M 175 694 V 788 H 1340 V 740")

head = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" font-family="Noto Sans TC, PingFang TC, Hanken Grotesk, sans-serif">',
        f'<defs><marker id="ar" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M1,1 L8,4.5 L1,8" fill="none" stroke="{LINE}" stroke-width="1.4"/></marker></defs>',
        f'<rect width="{W}" height="{H}" rx="26" fill="{BG}"/>',
        f'<rect x="40" y="40" width="{W-80}" height="{H-80}" rx="18" fill="{PANEL}"/>',
        f'<text x="70" y="96" font-size="26" font-weight="700" fill="{TEXT}">User Flow</text>']
print("\n".join(head + S) + "\n</svg>")
