# -*- coding: utf-8 -*-
"""用真实软件界面截图生成教程配图：带导览标注的主图 + 局部步骤图。"""
from PIL import Image, ImageDraw, ImageFont
import os

SEAL = (181, 69, 58)      # 品牌印章红 #b5453a
WHITE = (255, 255, 255)
FB = r"C:\Windows\Fonts\msyhbd.ttc"
FR = r"C:\Windows\Fonts\msyh.ttc"
IMG_DIR = r"E:\Node\inkdot\public\assets\img"
GUIDE_DIR = os.path.join(IMG_DIR, "guide")
os.makedirs(GUIDE_DIR, exist_ok=True)


def f(size, bold=False):
    return ImageFont.truetype(FB if bold else FR, size)


def badge(d, x, y, num, text, leader_to=None):
    ft, fn = f(23, True), f(18, True)
    cap_h, r, pad = 42, 17, 12
    tw = d.textlength(text, font=ft)
    cap_w = int(2 * r + pad * 2 + tw)
    d.rounded_rectangle([x, y, x + cap_w, y + cap_h], radius=21, fill=SEAL)
    cd = 30
    cx, cy = x + 6, y + (cap_h - cd) / 2
    d.ellipse([cx, cy, cx + cd, cy + cd], fill=WHITE)
    ns = str(num)
    bb = d.textbbox((0, 0), ns, font=fn)
    nw, nh = bb[2] - bb[0], bb[3] - bb[1]
    d.text((cx + (cd - nw) / 2 - bb[0], cy + (cd - nh) / 2 - bb[1]), ns, font=fn, fill=SEAL)
    tl = d.textbbox((0, 0), text, font=ft)
    th = tl[3] - tl[1]
    d.text((x + 2 * r + pad, y + (cap_h - th) / 2 - tl[1]), text, font=ft, fill=WHITE)
    if leader_to:
        sx = x + cap_w / 2
        sy = y + (0 if leader_to[1] < y + cap_h / 2 else cap_h)
        d.line([sx, sy, leader_to[0], leader_to[1]], fill=SEAL, width=3)
        d.ellipse([leader_to[0] - 6, leader_to[1] - 6,
                   leader_to[0] + 6, leader_to[1] + 6], fill=SEAL)


def annotated(src, dst, boxes, badges_list):
    img = Image.open(src).convert("RGBA")
    ov = Image.new("RGBA", img.size, (0, 0, 0, 0))
    od = ImageDraw.Draw(ov)
    for box in boxes:
        od.rounded_rectangle(box, radius=14, fill=SEAL + (22,), outline=SEAL + (235,), width=3)
    img = Image.alpha_composite(img, ov).convert("RGB")
    d = ImageDraw.Draw(img)
    for b in badges_list:
        badge(d, b[0], b[1], b[2], b[3], leader_to=b[4] if len(b) > 4 else None)
    img.save(dst, optimize=True)
    print("OK", os.path.basename(dst), img.size)


def crop_shot(src, dst, box, scale=2):
    img = Image.open(src).convert("RGB")
    c = img.crop(box)
    if scale != 1:
        c = c.resize((int(c.width * scale), int(c.height * scale)), Image.LANCZOS)
    c.save(dst, optimize=True)
    print("OK", os.path.basename(dst), c.size)


PDF = r"E:\rustc\tools\pdf\ScreenShot_2026-06-11_213456_655.png"
IMG = r"E:\rustc\tools\images\ScreenShot_2026-06-11_211809_169.png"

# ---- 主图：真实界面 + 导览标注 ----
annotated(PDF, os.path.join(IMG_DIR, "pdf-toolbox-guide.png"),
          [(4, 34, 196, 852), (250, 100, 1220, 482)],
          [(24, 600, 1, "功能导航", (100, 300)),
           (560, 560, 2, "工具入口", (735, 470)),
           (770, 60, 3, "切换深/浅色主题", (155, 65))])

annotated(IMG, os.path.join(IMG_DIR, "image-processor-guide.png"),
          [(3, 33, 198, 780), (210, 95, 662, 205), (678, 95, 1188, 300)],
          [(20, 640, 1, "功能导航", (100, 400)),
           (300, 470, 2, "参数设置", (430, 170)),
           (770, 360, 3, "图片列表", (930, 200)),
           (300, 42, 4, "设置→输出设置", (200, 16)),
           (835, 745, 5, "开始处理", (1090, 766))])

# ---- 局部步骤图（从真实截图裁切放大）----
crop_shot(PDF, os.path.join(GUIDE_DIR, "pdf-nav.png"), (0, 28, 198, 700), 1.6)
crop_shot(PDF, os.path.join(GUIDE_DIR, "pdf-tools.png"), (250, 95, 1225, 490), 1.3)
crop_shot(IMG, os.path.join(GUIDE_DIR, "img-menubar.png"), (0, 0, 360, 120), 2)
crop_shot(IMG, os.path.join(GUIDE_DIR, "img-dropzone.png"), (675, 33, 1200, 310), 1.4)
crop_shot(IMG, os.path.join(GUIDE_DIR, "img-quality.png"), (200, 33, 668, 250), 1.6)
crop_shot(IMG, os.path.join(GUIDE_DIR, "img-start.png"), (900, 710, 1200, 800), 2)


# ---- 财务工具箱（真实界面截图 1100×760）----
FIN = r"E:\rustc\tools\finance\ScreenShot_2026-06-12_140916_309.png"


def legend_annotated(src, dst, boxes, badges, pad=48, legend_h=96):
    """截图四周留白，底部放编号图例，避免标注遮挡界面内容。"""
    img = Image.open(src).convert("RGB")
    W, H = img.size
    canvas = Image.new("RGB", (W + pad * 2, H + pad * 2 + legend_h), WHITE)
    canvas.paste(img, (pad, pad))
    ov = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    od = ImageDraw.Draw(ov)
    for box in boxes:
        b = (box[0] + pad, box[1] + pad, box[2] + pad, box[3] + pad)
        od.rounded_rectangle(b, radius=12, fill=SEAL + (18,), outline=SEAL + (230,), width=3)
    canvas = Image.alpha_composite(canvas.convert("RGBA"), ov).convert("RGB")
    d = ImageDraw.Draw(canvas)
    d.line([(pad, H + pad + 18), (W + pad, H + pad + 18)], fill=(232, 224, 220), width=2)
    x, y = pad, H + pad + 34
    for num, text in badges:
        badge(d, x, y, num, text)
        x += int(d.textlength(text, font=f(23, True))) + 58 + 34
    canvas.save(dst, optimize=True)
    print("OK", os.path.basename(dst), canvas.size)


def make_finance_icon(dst, S=512):
    """计算器网格图标，配色与站内既有图标一致。"""
    BG = (200, 114, 112)
    im = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([0, 0, S - 1, S - 1], radius=112, fill=BG)
    d.rounded_rectangle([104, 96, 408, 416], radius=30, outline=WHITE, width=14)
    d.rounded_rectangle([132, 124, 380, 214], radius=14, fill=WHITE)
    ft = f(76, True)
    t = "¥"
    bb = d.textbbox((0, 0), t, font=ft)
    d.text((256 - (bb[2] - bb[0]) / 2 - bb[0], 169 - (bb[3] - bb[1]) / 2 - bb[1]),
           t, font=ft, fill=BG)
    for r in range(3):
        for c in range(3):
            x, y = 140 + c * 84, 244 + r * 52
            d.rounded_rectangle([x, y, x + 56, y + 34], radius=12, fill=WHITE)
    im.save(dst, optimize=True)
    print("OK", os.path.basename(dst), im.size)


make_finance_icon(os.path.join(IMG_DIR, "finance-toolbox-icon.png"))
Image.open(FIN).convert("RGB").save(
    os.path.join(IMG_DIR, "finance-toolbox-cover.png"), optimize=True)
print("OK finance-toolbox-cover.png")

legend_annotated(
    FIN, os.path.join(IMG_DIR, "finance-toolbox-guide.png"),
    [(0, 100, 195, 655), (240, 140, 1060, 655), (0, 655, 195, 760)],
    [(1, "功能导航"), (2, "工具宫格"), (3, "语言与主题")],
)

crop_shot(FIN, os.path.join(GUIDE_DIR, "fin-nav.png"), (0, 100, 195, 655), 1.8)
crop_shot(FIN, os.path.join(GUIDE_DIR, "fin-tools.png"), (240, 140, 1060, 420), 1.2)
crop_shot(FIN, os.path.join(GUIDE_DIR, "fin-lang.png"), (0, 640, 195, 760), 2.6)
crop_shot(FIN, os.path.join(GUIDE_DIR, "fin-topbar.png"), (0, 0, 260, 46), 3)


# ---- 批量重命名（真实界面截图 960×720）----
BAT = r"E:\rustc\tools\batch\ScreenShot_2026-06-12_210425_265.png"


def make_batch_icon(dst, S=512):
    """两张文件卡片 + 箭头，表达「原名 → 新名」。"""
    BG = (126, 106, 186)
    im = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([0, 0, S - 1, S - 1], radius=112, fill=BG)
    for x0 in (72, 296):
        d.rounded_rectangle([x0, 132, x0 + 144, 344], radius=22, outline=WHITE, width=13)
        for y, w in ((184, 88), (216, 64)):
            d.rounded_rectangle([x0 + 24, y, x0 + 24 + w, y + 12], radius=6, fill=WHITE)
    ft = f(74, True)
    for t, cx in (("A", 144), ("B", 368)):
        bb = d.textbbox((0, 0), t, font=ft)
        d.text((cx - (bb[2] - bb[0]) / 2 - bb[0],
                272 - (bb[3] - bb[1]) / 2 - bb[1]), t, font=ft, fill=WHITE)
    d.line([(228, 238), (260, 238)], fill=WHITE, width=14)
    d.polygon([(260, 214), (286, 238), (260, 262)], fill=WHITE)
    im.save(dst, optimize=True)
    print("OK", os.path.basename(dst), im.size)


make_batch_icon(os.path.join(IMG_DIR, "batch-rename-icon.png"))
Image.open(BAT).convert("RGB").save(
    os.path.join(IMG_DIR, "batch-rename-cover.png"), optimize=True)
print("OK batch-rename-cover.png")

legend_annotated(
    BAT, os.path.join(IMG_DIR, "batch-rename-guide.png"),
    [(0, 85, 223, 470), (223, 0, 960, 90),
     (223, 90, 960, 600), (223, 600, 960, 720)],
    [(1, "模式导航"), (2, "规则提示"), (3, "文件列表"), (4, "执行与历史")],
)

crop_shot(BAT, os.path.join(GUIDE_DIR, "batch-nav.png"), (0, 0, 223, 500), 1.8)
crop_shot(BAT, os.path.join(GUIDE_DIR, "batch-toolbar.png"), (223, 665, 960, 720), 2.2)
crop_shot(BAT, os.path.join(GUIDE_DIR, "batch-topbar.png"), (223, 0, 960, 95), 1.6)
crop_shot(BAT, os.path.join(GUIDE_DIR, "batch-history.png"), (223, 600, 640, 668), 2.4)
crop_shot(BAT, os.path.join(GUIDE_DIR, "batch-lang.png"), (0, 590, 223, 720), 2.4)


# ---- 元数据管理 / ClearMeta（真实界面截图 1280×820，深色主题）----
CM = r"E:\rustc\tools\clear meta\ScreenShot_2026-11-12_clearmeta.png"


def make_clearmeta_icon(dst, S=512):
    """文档卡片 + 被划掉的元数据行 + 安全勾印章，表达「清除元数据、安心外发」。"""
    BG = (74, 144, 136)  # 青绿，与站内既有图标配色区分
    im = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([0, 0, S - 1, S - 1], radius=112, fill=BG)
    # 文档主体
    d.rounded_rectangle([120, 84, 380, 428], radius=26, fill=WHITE)
    # 文档内的「元数据行」
    for y, w in ((150, 180), (198, 220), (246, 150)):
        d.rounded_rectangle([152, y, 152 + w, y + 16], radius=8, fill=(214, 228, 226))
    # 红色斜线划掉敏感信息
    d.line([(140, 300), (368, 150)], fill=SEAL, width=18)
    # 右下角安全勾印章
    d.ellipse([292, 296, 452, 456], fill=SEAL, outline=WHITE, width=12)
    d.line([(330, 376), (360, 408), (416, 340)], fill=WHITE, width=20, joint="curve")
    im.save(dst, optimize=True)
    print("OK", os.path.basename(dst), im.size)


make_clearmeta_icon(os.path.join(IMG_DIR, "clear-meta-icon.png"))
Image.open(CM).convert("RGB").save(
    os.path.join(IMG_DIR, "clear-meta-cover.png"), optimize=True)
print("OK clear-meta-cover.png")

legend_annotated(
    CM, os.path.join(IMG_DIR, "clear-meta-guide.png"),
    [(0, 96, 206, 820), (214, 128, 592, 470), (214, 470, 592, 806), (608, 128, 1266, 806)],
    [(1, "功能模块"), (2, "拖放与预设"), (3, "输出与文件"), (4, "元数据编辑")],
)

crop_shot(CM, os.path.join(GUIDE_DIR, "cm-nav.png"), (0, 90, 206, 720), 1.6)
crop_shot(CM, os.path.join(GUIDE_DIR, "cm-dropzone.png"), (214, 128, 592, 300), 1.6)
crop_shot(CM, os.path.join(GUIDE_DIR, "cm-preset.png"), (214, 300, 592, 470), 1.7)
crop_shot(CM, os.path.join(GUIDE_DIR, "cm-output.png"), (214, 470, 592, 806), 1.5)
crop_shot(CM, os.path.join(GUIDE_DIR, "cm-editor.png"), (608, 128, 1266, 806), 1.2)
crop_shot(CM, os.path.join(GUIDE_DIR, "cm-theme.png"), (0, 0, 206, 96), 2.6)


# ---- 印章提取 / SealExtractor（真实界面截图 1280×860，浅色，已识别 2 页 8 章）----
SEALSHOT = r"E:\rustc\tools\seal\ScreenShot_2026-11-12_seal.png"


def make_seal_icon(dst, S=512):
    """印章圆 + 红色印泥 + 识别角框，表达「自动圈出并导出红章」。"""
    BG = (166, 58, 48)  # 深朱红，与 pdf 棕红/财务红区分
    GOLD = (240, 196, 96)
    im = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([0, 0, S - 1, S - 1], radius=112, fill=BG)
    # 识别角框（四角）
    m, L, t = 92, 78, 15
    for (x, y, dx, dy) in ((m, m, 1, 1), (S - m, m, -1, 1),
                           (m, S - m, 1, -1), (S - m, S - m, -1, -1)):
        d.line([(x, y), (x + dx * L, y)], fill=GOLD, width=t)
        d.line([(x, y), (x, y + dy * L)], fill=GOLD, width=t)
    # 圆形印章外圈 + 内五角星
    d.ellipse([158, 158, 354, 354], outline=WHITE, width=20)
    cx, cy, R = 256, 262, 62
    import math
    pts = []
    for i in range(10):
        ang = -math.pi / 2 + i * math.pi / 5
        r = R if i % 2 == 0 else R * 0.42
        pts.append((cx + r * math.cos(ang), cy + r * math.sin(ang)))
    d.polygon(pts, fill=WHITE)
    d.rounded_rectangle([172, 372, 340, 388], radius=8, fill=WHITE)
    im.save(dst, optimize=True)
    print("OK", os.path.basename(dst), im.size)


make_seal_icon(os.path.join(IMG_DIR, "seal-extractor-icon.png"))
Image.open(SEALSHOT).convert("RGB").save(
    os.path.join(IMG_DIR, "seal-extractor-cover.png"), optimize=True)
print("OK seal-extractor-cover.png")

legend_annotated(
    SEALSHOT, os.path.join(IMG_DIR, "seal-extractor-guide.png"),
    [(0, 76, 248, 508), (250, 76, 936, 812), (938, 76, 1280, 760)],
    [(1, "文件与参数"), (2, "预览与标注"), (3, "印章结果")],
)

crop_shot(SEALSHOT, os.path.join(GUIDE_DIR, "seal-files.png"), (0, 76, 248, 250), 1.9)
crop_shot(SEALSHOT, os.path.join(GUIDE_DIR, "seal-params.png"), (0, 250, 248, 508), 1.9)
crop_shot(SEALSHOT, os.path.join(GUIDE_DIR, "seal-preview.png"), (350, 120, 840, 700), 1.35)
crop_shot(SEALSHOT, os.path.join(GUIDE_DIR, "seal-mode.png"), (938, 76, 1280, 250), 1.9)
crop_shot(SEALSHOT, os.path.join(GUIDE_DIR, "seal-cards.png"), (938, 250, 1280, 760), 1.6)
crop_shot(SEALSHOT, os.path.join(GUIDE_DIR, "seal-export.png"), (938, 748, 1280, 846), 2.2)
