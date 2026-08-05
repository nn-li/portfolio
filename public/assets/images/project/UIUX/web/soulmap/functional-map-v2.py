#!/usr/bin/env python3
# Soul Map Functional Map v2 產生器
# 編輯 TREE 後執行：python3 functional-map-v2.py > functional-map-v2.svg
# 結構依 2026-07 內容改版規格：核心練習／帳號與設定／延伸探索。

TREE = {
  "核心練習": [
    ("內容路徑", ["呼吸覺察", "身體放鬆", "內在觀察"]),
    ("練習播放", []),
    ("完成進度", []),
    ("本週練習目標", []),
    ("心情紀錄", []),
    ("日曆回顧", []),
  ],
  "帳號與設定": [
    ("先體驗", []),
    ("登入／註冊", []),
    ("每週目標設定", []),
    ("個人資料", []),
    ("通知設定", []),
  ],
  "延伸探索": [
    ("好友邀請", []),
    ("練習分享", []),
    ("聊天", []),
  ],
}
GROUPS = [("核心", ["核心練習"]), ("帳號", ["帳號與設定"]), ("延伸", ["延伸探索"])]

COL_W, NODE_W, NODE_H, ROW_GAP, INDENT = 330, 180, 36, 12, 28
TOP, LEFT, HEAD_Y = 200, 70, 142
FILL, BORDER, TEXT = "#e7eafa", "#b3bfee", "#2b3252"
ROOT_FILL, LINE = "#7B8CE4", "#a5b1e8"

def norm(children):
    out = []
    for c in children:
        if isinstance(c, tuple):
            name, kids = c
        else:
            name, kids = c, []
        out.append((name, norm(kids)))
    return out

cols = [(top, norm(kids)) for top, kids in TREE.items()]

def node(x, y, w, label, fill=FILL, color=TEXT, weight="400", fs=13.5):
    return (f'<rect x="{x}" y="{y}" width="{w}" height="{NODE_H}" rx="9" fill="{fill}" stroke="{BORDER}"/>' +
            f'<text x="{x + w/2}" y="{y + NODE_H/2 + 5}" text-anchor="middle" font-size="{fs}" fill="{color}" font-weight="{weight}">{label}</text>')

svg, links = [], []
col_bounds = []
max_y = 0
def layout_col(cx, kids):
    state = {"y": TOP}
    def walk(items, depth, parent_x, parent_bottom):
        rail_x = parent_x + 14
        for name, sub in items:
            state["y"] += NODE_H + ROW_GAP
            y = state["y"]
            nx = cx + depth * INDENT
            links.append(f'<path d="M {rail_x} {parent_bottom} V {y + NODE_H/2} H {nx}" fill="none" stroke="{LINE}" stroke-width="1.2"/>')
            svg.append(node(nx, y, NODE_W, name))
            if sub:
                walk(sub, depth + 1, nx, y + NODE_H)
    walk(kids, 1, cx, TOP + NODE_H)
    return state["y"]

for i, (top, kids) in enumerate(cols):
    cx = LEFT + i * COL_W
    svg.append(node(cx, TOP, NODE_W, top, fill="#d3daf6", weight="600", fs=14.5))
    col_bounds.append((cx, cx + NODE_W / 2))
    max_y = max(max_y, layout_col(cx, kids))

W = LEFT * 2 + COL_W * (len(cols) - 1) + NODE_W
H = max_y + NODE_H + 70
root_x = W / 2 - NODE_W / 2
out = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" font-family="Noto Sans TC, PingFang TC, Hanken Grotesk, sans-serif">']
out.append(f'<rect width="{W}" height="{H}" fill="#f1f3fb"/>')
out.append(f'<rect x="26" y="26" width="{W-52}" height="{H-52}" rx="18" fill="#ffffff"/>')
out.append(f'<text x="{LEFT}" y="84" font-size="28" font-weight="700" fill="#2b3252">Functional Map</text>')
out.append(f'<rect x="{root_x}" y="{HEAD_Y-38}" width="{NODE_W}" height="{NODE_H}" rx="9" fill="{ROOT_FILL}"/>')
out.append(f'<text x="{W/2}" y="{HEAD_Y-38+NODE_H/2+5}" text-anchor="middle" font-size="14.5" font-weight="700" fill="#fff">Soul Map</text>')
bus_y = HEAD_Y + 22
out.append(f'<path d="M {W/2} {HEAD_Y-38+NODE_H} V {bus_y}" stroke="{LINE}" fill="none" stroke-width="1.4"/>')
xs = [tx for _, tx in col_bounds]
out.append(f'<path d="M {min(xs)} {bus_y} H {max(xs)}" stroke="{LINE}" fill="none" stroke-width="1.4"/>')
for _, tx in col_bounds:
    out.append(f'<path d="M {tx} {bus_y} V {TOP}" stroke="{LINE}" fill="none" stroke-width="1.4"/>')
out += links + svg
out.append('</svg>')
print("\n".join(out))
