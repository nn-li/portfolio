#!/usr/bin/env python3
# 流程三｜災後支援整合 產生器（深色螢光綠風格，重建自原 userflow-3.png）
# 執行：python3 userflow-3-v4.py > userflow-3-v4.svg
# 2026-08 文字修訂：AI 判定改為初步提示、分支標籤與前言同步調整。

W, H = 1920, 1240
BG, CARD, CBORD = "#141414", "#1e1f1a", "#3c3e33"
GREEN, GDARK = "#d3f04b", "#20220f"
WHITE, GREY, LINE = "#ecede4", "#a0a196", "#6b6d5e"
S = []

def txt(x, y, t, fs=22, fill=GREY, w="400", anchor="middle"):
    S.append(f'<text x="{x}" y="{y}" text-anchor="{anchor}" font-size="{fs}" font-weight="{w}" fill="{fill}">{t}</text>')

def card(x, y, w, h, title, lines, kind="dark"):
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
    txt(cx, y+58, title, 30, tcol, "700")
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
txt(138, 84, "震後", 24, GDARK, "700")
txt(212, 90, "災後支援整合", 42, WHITE, "700", "start")
txt(90, 165, "震後由使用者主動發起。透過 AI 建築風險檢測記錄可見損傷並取得初步風險提示，再把「災損記錄 → 找補助 → 申請」", 24, GREY, "400", "start")
txt(90, 203, "串成一條路，取代原本要在多個政府網站間自行搜尋的流程。", 24, GREY, "400", "start")

# 圖例
S.append(f'<rect x="90" y="238" width="1740" height="74" rx="16" fill="none" stroke="{CBORD}" stroke-width="1.5"/>')
S.append(f'<rect x="122" y="264" width="22" height="22" rx="6" fill="{GREEN}"/>')
txt(160, 283, "進入點", 22, GREY, "400", "start")
S.append(f'<rect x="286" y="264" width="22" height="22" rx="6" fill="none" stroke="{GREY}" stroke-width="2"/>')
txt(324, 283, "App 畫面", 22, GREY, "400", "start")
S.append(f'<polygon points="475,264 488,275 475,286 462,275" fill="none" stroke="{GREEN}" stroke-width="2"/>')
txt(506, 283, "系統判斷", 22, GREY, "400", "start")
S.append(f'<rect x="668" y="264" width="22" height="22" rx="6" fill="{CBORD}"/>')
txt(706, 283, "流程終點", 22, GREY, "400", "start")
S.append(f'<rect x="852" y="258" width="72" height="34" rx="17" fill="{GREEN}"/>')
txt(888, 282, "條件", 20, GDARK, "700")
txt(944, 283, "分支條件", 22, GREY, "400", "start")

# 第一列
card(90, 370, 520, 180, "震後返家前", ["從首頁「災後支援」進入", "確認自身安全後開始"], "entry")
txt(675, 443, "開啟相機掃描", 20, WHITE)
arrow("M 618 460 H 732")
card(740, 370, 520, 180, "AI 建築風險檢測", ["掃描牆面裂縫・樑柱損傷", "與建築傾斜狀況"])
txt(1325, 443, "即時分析", 20, WHITE)
arrow("M 1268 460 H 1382")
card(1390, 370, 440, 180, "AI 初步風險提示", ["依損傷程度", "分級給出結果"], "judge")

# 分支
wire("M 1000 550 V 600 M 500 600 H 1410 M 500 600 V 616 M 1410 600 V 616")
pill(500, 646, "未發現明顯異常・仍需持續留意", 430)
pill(1410, 646, "發現疑似風險・暫勿進入", 350)
arrow("M 500 670 V 726")
arrow("M 1410 670 V 726")

# 第二列
card(90, 730, 860, 170, "災損盤點", ["逐項拍照記錄損失", "作為申請補助的依據"])
card(1000, 730, 830, 170, "暫勿進入", ["引導通報主管機關", "並導向就近避難所"])
txt(1830, 944, "待專業人員檢查後再回到此流程", 20, GREY, "400", "end")

# 第三列
txt(545, 972, "依災損紀錄自動比對", 20, WHITE, "400", "start")
arrow("M 520 900 V 1002")
card(90, 1010, 520, 170, "補助種類比對", ["依災損類型自動判別出", "可申請的補助項目"])
txt(675, 1078, "選擇補助項目", 20, WHITE)
arrow("M 618 1095 H 732")
card(740, 1010, 520, 170, "申請流程指引", ["所需文件、辦理步驟", "與申請進度追蹤"])
txt(1325, 1078, "申請送出後", 20, WHITE)
arrow("M 1268 1095 H 1382")
card(1390, 1010, 440, 170, "社群互助", ["物資分享、求助訊息", "與平安打卡"])

head = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" font-family="Noto Sans TC, PingFang TC, Hanken Grotesk, sans-serif">',
        f'<defs><marker id="ar" markerWidth="11" markerHeight="11" refX="9" refY="5.5" orient="auto"><path d="M0,0 L10,5.5 L0,11 Z" fill="{GREEN}"/></marker></defs>',
        f'<rect width="{W}" height="{H}" fill="{BG}"/>']
print("\n".join(head + S) + "\n</svg>")
