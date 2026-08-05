#!/usr/bin/env python3
# 流程一｜即時應變與避難指引 產生器（深色螢光綠風格，重建自原 userflow-1.png）
# 執行：python3 userflow-1-v4.py > userflow-1-v4.svg

W, H = 1920, 1810
BG, CARD, CBORD = "#141414", "#1e1f1a", "#3c3e33"
GREEN, GDARK = "#d3f04b", "#20220f"
WHITE, GREY, LINE = "#ecede4", "#a0a196", "#6b6d5e"
S = []

def txt(x, y, t, fs=22, fill=GREY, w="400", anchor="middle"):
    S.append(f'<text x="{x}" y="{y}" text-anchor="{anchor}" font-size="{fs}" font-weight="{w}" fill="{fill}">{t}</text>')

def card(x, y, w, h, title, lines, kind="dark", tfs=30):
    if kind == "entry":
        S.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="24" fill="{GREEN}"/>')
        tcol, dcol = GDARK, "#3a3d1e"
    elif kind == "judge":
        S.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="24" fill="{CARD}" stroke="{GREEN}" stroke-width="2.5"/>')
        tcol, dcol = GREEN, GREY
    else:
        S.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="24" fill="{CARD}" stroke="{CBORD}" stroke-width="1.5"/>')
        tcol, dcol = WHITE, GREY
    cx = x + w/2
    txt(cx, y+58, title, tfs, tcol, "700")
    for i, l in enumerate(lines):
        txt(cx, y+104+i*36, l, 22, dcol)

def pill(cx, cy, t, w):
    S.append(f'<rect x="{cx-w/2}" y="{cy-24}" width="{w}" height="48" rx="24" fill="{BG}" stroke="{GREEN}" stroke-width="2"/>')
    txt(cx, cy+8, t, 22, GREEN, "600")

def arrow(d):
    S.append(f'<path d="{d}" fill="none" stroke="{LINE}" stroke-width="2.5" marker-end="url(#ar)"/>')

def wire(d):
    S.append(f'<path d="{d}" fill="none" stroke="{LINE}" stroke-width="2.5"/>')

# 表頭
S.append(f'<rect x="90" y="52" width="96" height="46" rx="23" fill="{GREEN}"/>')
txt(138, 84, "震時", 24, GDARK, "700")
txt(212, 90, "即時應變與避難指引", 42, WHITE, "700", "start")
txt(90, 165, "由氣象署地震速報自動觸發。系統比對「震度 × 使用者預先設定的情境」給出不同層級的應變指引，一路帶到避難完成", 24, GREY, "400", "start")
txt(90, 203, "與親友回報，過程中不需要使用者自行判讀資訊。", 24, GREY, "400", "start")

# 圖例
S.append(f'<rect x="90" y="238" width="1740" height="74" rx="16" fill="none" stroke="{CBORD}" stroke-width="1.5"/>')
S.append(f'<rect x="122" y="264" width="22" height="22" rx="6" fill="{GREEN}"/>')
txt(160, 283, "觸發／進入點", 22, GREY, "400", "start")
S.append(f'<rect x="336" y="264" width="22" height="22" rx="6" fill="none" stroke="{GREY}" stroke-width="2"/>')
txt(374, 283, "App 畫面", 22, GREY, "400", "start")
S.append(f'<polygon points="525,264 538,275 525,286 512,275" fill="none" stroke="{GREEN}" stroke-width="2"/>')
txt(556, 283, "系統判斷", 22, GREY, "400", "start")
S.append(f'<rect x="718" y="264" width="22" height="22" rx="6" fill="{CBORD}"/>')
txt(756, 283, "流程終點", 22, GREY, "400", "start")
S.append(f'<rect x="902" y="258" width="72" height="34" rx="17" fill="{GREEN}"/>')
txt(938, 282, "條件", 20, GDARK, "700")
txt(994, 283, "分支條件", 22, GREY, "400", "start")

# 第一列
card(90, 370, 520, 180, "地震速報觸發", ["接收氣象署地震速報", "App 於背景自動啟動"], "entry")
txt(655, 443, "推播喚醒", 20, WHITE)
arrow("M 618 460 H 692")
card(700, 370, 520, 180, "分級警報聲＋推播", ["依預估震度播放低／中／高", "三段警報音，聲音即資訊"])
txt(1265, 443, "點擊或自動開啟", 20, WHITE)
arrow("M 1228 460 H 1302")
card(1310, 370, 520, 180, "震時應變畫面", ["全螢幕接管，只顯示", "當下最必要的行動指令"])

# 系統判斷
txt(985, 605, "系統自動判斷，使用者不需操作", 20, WHITE, "400", "start")
arrow("M 960 550 V 642")
card(505, 650, 910, 190, "震度 × 個人情境判斷", ["比對預先設定的資料：所在地區・建築屋齡", "樓層高度・當下情境（在家／外出／睡眠）"], "judge")

# 分支
wire("M 960 840 V 880 M 365 880 H 1550 M 365 880 V 898 M 1550 880 V 898")
pill(365, 930, "震度低", 150)
pill(960, 930, "震度中高・建築相對安全", 400)
pill(1550, 930, "震度高・老舊建築等高風險", 430)
arrow("M 365 954 V 1002")
arrow("M 960 954 V 1002")
arrow("M 1550 954 V 1002")

# 第三列
card(90, 1010, 550, 180, "安全提示", ["顯示震度資訊", "與注意事項"])
card(685, 1010, 550, 180, "原地掩護指引", ["趴下・掩護・穩住", "大字倒數，可單手操作"])
card(1280, 1010, 550, 180, "立即避難指引", ["判定留在原地風險更高", "引導馬上離開建築"])

# 安全提示 → 回報平安（流程終點）
arrow("M 365 1190 V 1262")
card(90, 1270, 550, 170, "回報平安", ["一鍵通知緊急聯絡人", "流程在此結束"])

# 掩護／避難 → 搖晃結束後接續
wire("M 960 1190 V 1240 M 1555 1190 V 1240 M 960 1240 H 1555 M 1257 1240 V 1490 M 1257 1490 H 320")
txt(350, 1535, "搖晃結束後自動接續", 20, WHITE, "400", "start")
arrow("M 320 1490 V 1552")

# 第四列
card(90, 1560, 520, 180, "避難路線導航", ["規劃最短安全路線", "避開已回報的危險區域"])
txt(675, 1633, "抵達後自動偵測", 20, WHITE)
arrow("M 618 1650 H 732")
card(740, 1560, 520, 180, "避難所報到", ["打卡確認位置", "顯示避難所注意事項"])
txt(1325, 1633, "報到同時觸發", 20, WHITE)
arrow("M 1268 1650 H 1382")
card(1390, 1560, 440, 180, "親友安全通知", ["安全狀態即時同步", "減少震後互相搜尋的混亂"])

head = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" font-family="Noto Sans TC, PingFang TC, Hanken Grotesk, sans-serif">',
        f'<defs><marker id="ar" markerWidth="11" markerHeight="11" refX="9" refY="5.5" orient="auto"><path d="M0,0 L10,5.5 L0,11 Z" fill="{GREEN}"/></marker></defs>',
        f'<rect width="{W}" height="{H}" fill="{BG}"/>']
print("\n".join(head + S) + "\n</svg>")
