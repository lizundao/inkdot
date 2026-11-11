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
