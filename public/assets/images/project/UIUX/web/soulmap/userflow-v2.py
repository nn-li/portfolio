#!/usr/bin/env python3
# Soul Map User Flow v2 產生器（橫式單視窗版面，含分區底框）
# 執行：python3 userflow-v2.py > userflow-v2.svg
# 流程依 2026-07 內容改版規格 7.3：先體驗、心情可略過、目標完成率與解鎖狀態。

W, H = 1560, 860
BORDER = SOLID = LINE = BAND = "#7B8CE4"
TEXT = "#2b3252"
BG, PANEL, ACCENT = "#f1f3fb", "#ffffff", "#e7eafa"
SECT_FILL, SECT_BORDER = "#f4f6fd", "#d8def7"
S = []

def node(x, y, w, h, lines, solid=False, accent=False, fs=14):
    fill = SOLID if solid else (ACCENT if accent else PANEL)
    color = "#ffffff" if solid else TEXT
    S.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="10" fill="{fill}" stroke="{BORDER}" stroke-width="1.6"/>')
    n = len(lines)
    for i, t in enumerate(lines):
        ty = y + h/2 + (i - (n-1)/2) * (fs + 5) + fs*0.36
        size = fs if i == 0 else fs - 1.5
        S.append(f'<text x="{x+w/2}" y="{ty}" text-anchor="middle" font-size="{size}" fill="{color}">{t}</text>')

def diamond(cx, cy, w, h, label, fs=13):
    S.append(f'<polygon points="{cx},{cy-h/2} {cx+w/2},{cy} {cx},{cy+h/2} {cx-w/2},{cy}" fill="{ACCENT}" stroke="{BORDER}" stroke-width="1.6"/>')
    S.append(f'<text x="{cx}" y="{cy+fs*0.36}" text-anchor="middle" font-size="{fs}" fill="{TEXT}">{label}</text>')

def edge(d, dotted=False):
    dash = ' stroke-dasharray="6 5"' if dotted else ""
    S.append(f'<path d="{d}" fill="none" stroke="{LINE}" stroke-width="1.6"{dash} marker-end="url(#ar)"/>')

def label(x, y, t, fs=12.5):
    S.append(f'<text x="{x}" y="{y}" font-size="{fs}" fill="{BAND}">{t}</text>')

def section(x, y, w, h, title):
    S.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="14" fill="{SECT_FILL}" stroke="{SECT_BORDER}" stroke-width="1.2"/>')
    S.append(f'<text x="{x+22}" y="{y+27}" font-size="14" font-weight="700" letter-spacing="2" fill="{BAND}">{title}</text>')

# ── 分區底框（先畫，節點壓在上面） ──
section(70, 108, 1250, 224, "首次體驗與練習")
section(70, 340, 1250, 272, "心情與進度")
section(70, 624, 1250, 172, "保存紀錄")

# ── 首次體驗與練習 ──
node(90, 150, 130, 48, ["Welcome"], solid=True)
edge("M 220 174 H 245")
diamond(330, 174, 170, 80, "先開始體驗或登入")
label(388, 156, "先開始體驗"); edge("M 415 174 H 455")
node(455, 142, 250, 64, ["查看目前可用的練習", "可用／鎖定／已完成"])
edge("M 705 174 H 745")
node(745, 150, 130, 48, ["開始練習"])
edge("M 875 174 H 915")
node(915, 150, 170, 48, ["暫停／繼續／離開"])
edge("M 1085 174 H 1125")
node(1125, 150, 130, 48, ["完成練習"], accent=True)
label(338, 248, "登入"); edge("M 330 214 V 270")
node(255, 270, 150, 48, ["登入／註冊"])
edge("M 405 294 H 500 V 206")

# ── 心情與進度 ──
edge("M 1190 198 V 350")
diamond(1190, 390, 160, 80, "是否記錄心情")
label(1086, 368, "保存"); edge("M 1110 390 H 1080")
node(910, 366, 170, 48, ["選擇心情並保存"])
label(1200, 452, "略過"); edge("M 1190 430 V 470 H 760 V 414")
edge("M 910 390 H 860")
node(660, 366, 200, 48, ["更新已完成次數"])
edge("M 660 390 H 620")
node(410, 366, 210, 48, ["更新本週練習目標完成率"], fs=13.5)
edge("M 410 390 H 380")
diamond(290, 390, 180, 84, "是否開放下一組內容")
label(300, 458, "是"); edge("M 290 432 V 480")
node(215, 480, 150, 48, ["開放下一組練習"])
label(150, 380, "否"); edge("M 200 390 H 140 V 560")
edge("M 290 528 V 584 H 260")
node(90, 560, 170, 48, ["回首頁／查看紀錄"])

# ── 保存紀錄 ──
edge("M 175 608 V 680 H 370")
diamond(470, 680, 200, 84, "未登入時是否保存紀錄", fs=12.5)
label(580, 668, "是"); edge("M 570 680 H 610")
node(610, 656, 150, 48, ["登入／註冊"])
edge("M 760 680 H 800")
node(800, 656, 280, 48, ["保存本週目標、完成紀錄與心情"], solid=True)
label(480, 742, "否"); edge("M 470 722 V 754 H 610")
node(610, 730, 240, 48, ["維持未登入，僅本次瀏覽"])

head = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" font-family="Noto Sans TC, PingFang TC, Hanken Grotesk, sans-serif">',
        f'<defs><marker id="ar" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M1,1 L8,4.5 L1,8" fill="none" stroke="{LINE}" stroke-width="1.4"/></marker></defs>',
        f'<rect width="{W}" height="{H}" rx="26" fill="{BG}"/>',
        f'<rect x="40" y="40" width="{W-80}" height="{H-80}" rx="18" fill="{PANEL}"/>',
        f'<text x="70" y="96" font-size="26" font-weight="700" fill="{TEXT}">User Flow</text>']
print("\n".join(head + S) + "\n</svg>")
