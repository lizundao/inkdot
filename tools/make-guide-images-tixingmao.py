# -*- coding: utf-8 -*-
"""提醒猫官网配图：暖橘猫脸图标 + 悬浮层封面 + 主图标注 + 步骤图。
素材来自真实桌面应用截图（tools/src-shots/tixingmao/），非设计稿。"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

FB = r"C:\Windows\Fonts\msyhbd.ttc"
FR = r"C:\Windows\Fonts\msyh.ttc"
IMG_DIR = r"E:\Node\inkdot\public\assets\img"
GUIDE_DIR = os.path.join(IMG_DIR, "guide")
SRC = r"E:\Node\inkdot\tools\src-shots\tixingmao"
os.makedirs(GUIDE_DIR, exist_ok=True)

SEAL = (204, 111, 77)      # 提醒猫暖橘 #cc6f4d
DARK = (48, 44, 42)        # 深色主题底 #302c2a
CREAM = (248, 240, 228)    # 猫咪米白
WHITE = (255, 255, 255)
INK = (45, 41, 38)


def f(size, bold=False):
    return ImageFont.truetype(FB if bold else FR, size)


def badge(d, x, y, num, text):
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
    return cap_w


def legend_annotated(src, dst, boxes, badges_list, pad=40, legend_h=92):
    """四周留白、底部放编号图例，避免遮挡界面内容。"""
    img = Image.open(src).convert("RGB")
    W, H = img.size
    canvas = Image.new("RGB", (W + pad * 2, H + pad * 2 + legend_h), (247, 239, 230))
    canvas.paste(img, (pad, pad))
    ov = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    od = ImageDraw.Draw(ov)
    for box in boxes:
        b = (box[0] + pad, box[1] + pad, box[2] + pad, box[3] + pad)
        od.rounded_rectangle(b, radius=12, fill=SEAL + (18,), outline=SEAL + (230,), width=3)
    canvas = Image.alpha_composite(canvas.convert("RGBA"), ov).convert("RGB")
    d = ImageDraw.Draw(canvas)
    d.line([(pad, H + pad + 16), (W + pad, H + pad + 16)], fill=(226, 214, 202), width=2)
    x, y = pad, H + pad + 30
    for num, text in badges_list:
        badge(d, x, y, num, text)
        x += int(d.textlength(text, font=f(23, True))) + 58 + 36
    canvas.save(dst, optimize=True)
    print("OK", os.path.basename(dst), canvas.size)


def crop_shot(src, dst, box, scale=2):
    img = Image.open(src).convert("RGB")
    c = img.crop(box)
    if scale != 1:
        c = c.resize((int(c.width * scale), int(c.height * scale)), Image.LANCZOS)
    c.save(dst, optimize=True)
    print("OK", os.path.basename(dst), c.size)


def make_cat_icon(dst, S=512):
    """暖橘圆角底 + 米白猫脸 + 铃铛，呼应软件内猫咪形象。"""
    BG = (204, 111, 77)
    im = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([0, 0, S - 1, S - 1], radius=112, fill=BG)
    # 猫耳
    d.polygon([(150, 200), (140, 96), (236, 156)], fill=CREAM)
    d.polygon([(362, 200), (372, 96), (276, 156)], fill=CREAM)
    d.polygon([(158, 186), (152, 122), (214, 158)], fill=(232, 170, 177))
    d.polygon([(354, 186), (360, 122), (298, 158)], fill=(232, 170, 177))
    # 猫脸
    d.ellipse([112, 140, 400, 428], fill=CREAM)
    # 眼睛
    d.ellipse([178, 244, 216, 296], fill=DARK)
    d.ellipse([296, 244, 334, 296], fill=DARK)
    d.ellipse([188, 250, 200, 264], fill=WHITE)
    d.ellipse([306, 250, 318, 264], fill=WHITE)
    # 腮红
    d.ellipse([150, 292, 196, 316], fill=(243, 199, 191))
    d.ellipse([316, 292, 362, 316], fill=(243, 199, 191))
    # 鼻子 + 嘴
    d.polygon([(248, 300), (264, 300), (256, 312)], fill=(216, 141, 134))
    d.arc([232, 306, 256, 330], 0, 160, fill=DARK, width=5)
    d.arc([256, 306, 280, 330], 20, 180, fill=DARK, width=5)
    # 铃铛
    d.ellipse([236, 340, 276, 380], fill=(231, 178, 75), outline=DARK, width=5)
    d.ellipse([253, 356, 259, 362], fill=DARK)
    im.save(dst, optimize=True)
    print("OK", os.path.basename(dst), im.size)


def draw_cat_face(S=480):
    """透明底米白猫咪主视觉，风格与软件内猫咪/App 图标一致。
    纯矢量绘制、无方形背景，从根本上避免截图抠图留下的色块与透印。"""
    im = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    cx = S / 2
    OUT = (58, 50, 46, 255)              # 深色描边，浅底上轮廓清晰
    cream = CREAM + (255,)
    pink = (233, 174, 180, 255)

    # 身体（底部圆润）
    d.ellipse([cx - 158, S - 205, cx + 150, S + 40], fill=cream, outline=OUT, width=6)
    # 举起的右爪
    d.ellipse([cx + 96, S - 232, cx + 188, S - 150], fill=cream, outline=OUT, width=6)
    # 耳朵（外米白 + 内粉 + 描边）
    d.polygon([(cx - 168, 212), (cx - 182, 66), (cx - 58, 152)], fill=cream)
    d.polygon([(cx + 168, 212), (cx + 182, 66), (cx + 58, 152)], fill=cream)
    d.line([(cx - 168, 212), (cx - 182, 66), (cx - 58, 152)], fill=OUT, width=6, joint="curve")
    d.line([(cx + 168, 212), (cx + 182, 66), (cx + 58, 152)], fill=OUT, width=6, joint="curve")
    d.polygon([(cx - 150, 190), (cx - 158, 104), (cx - 82, 156)], fill=pink)
    d.polygon([(cx + 150, 190), (cx + 158, 104), (cx + 82, 156)], fill=pink)
    # 脸
    d.ellipse([cx - 172, 118, cx + 172, 430], fill=cream, outline=OUT, width=7)
    # 眼睛 + 高光
    d.ellipse([cx - 112, 226, cx - 62, 290], fill=OUT)
    d.ellipse([cx + 62, 226, cx + 112, 290], fill=OUT)
    d.ellipse([cx - 102, 236, cx - 86, 256], fill=(255, 255, 255, 255))
    d.ellipse([cx + 72, 236, cx + 88, 256], fill=(255, 255, 255, 255))
    # 腮红
    d.ellipse([cx - 148, 292, cx - 92, 322], fill=(244, 198, 190, 255))
    d.ellipse([cx + 92, 292, cx + 148, 322], fill=(244, 198, 190, 255))
    # 鼻子 + w 形微笑
    d.polygon([(cx - 20, 306), (cx + 20, 306), (cx, 328)], fill=(220, 140, 132, 255))
    d.arc([cx - 52, 312, cx - 4, 356], 0, 150, fill=OUT, width=6)
    d.arc([cx + 4, 312, cx + 52, 356], 30, 180, fill=OUT, width=6)
    # 胡须
    for dy in (-6, 10):
        d.line([(cx - 172, 300 + dy), (cx - 214, 288 + dy)], fill=OUT, width=4)
        d.line([(cx + 172, 300 + dy), (cx + 214, 288 + dy)], fill=OUT, width=4)
    # 铃铛
    d.ellipse([cx - 34, 352, cx + 34, 420], fill=(233, 180, 78, 255), outline=OUT, width=6)
    d.line([(cx - 24, 366), (cx + 24, 366)], fill=(200, 150, 60, 255), width=3)
    d.ellipse([cx - 6, 382, cx + 6, 394], fill=OUT)
    return im


def make_cover(src, dst, W=1200, H=750):
    """矢量猫咪 + 真实提醒卡片，合成到干净暖色渐变背景，做封面主视觉。"""
    shot = Image.open(src).convert("RGBA")  # 仅用于截取真实卡片

    # 背景：暖棕渐变 + 柔光
    bg = Image.new("RGB", (W, H))
    px = bg.load()
    for y in range(H):
        t = y / H
        r, g, b = int(250 - 26 * t), int(243 - 30 * t), int(233 - 32 * t)
        for x in range(W):
            px[x, y] = (r, g, b)
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([W - 360, -120, W + 120, 360], fill=(232, 173, 92, 60))
    gd.ellipse([-120, H - 320, 300, H + 80], fill=(204, 111, 77, 42))
    base = Image.alpha_composite(bg.convert("RGBA"), glow.filter(ImageFilter.GaussianBlur(60)))

    # 猫咪落地阴影 + 矢量猫咪（透明底，无方形色块）
    cat_x, cat_y = 226, 286
    csh = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    csd = ImageDraw.Draw(csh)
    csd.ellipse([cat_x + 70, cat_y + 408, cat_x + 420, cat_y + 468], fill=(70, 50, 40, 60))
    base = Image.alpha_composite(base, csh.filter(ImageFilter.GaussianBlur(22)))
    base.alpha_composite(draw_cat_face(480), (cat_x, cat_y))

    # 真实提醒卡片：裁切避开顶部主窗口透印文字，圆角蒙版 + 柔和阴影
    card = shot.crop((142, 14, 434, 163)).resize((456, 238), Image.LANCZOS)
    cm = Image.new("L", card.size, 0)
    cd = ImageDraw.Draw(cm)
    cd.rounded_rectangle([0, 0, card.width - 1, card.height - 1], radius=26, fill=255)
    cm = cm.filter(ImageFilter.GaussianBlur(2))
    shadow = Image.new("RGBA", card.size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.rounded_rectangle([8, 16, card.width - 8, card.height - 4], radius=26, fill=(60, 44, 34, 85))
    card_x, card_y = W - card.width - 66, 150
    base.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(15)), (card_x, card_y))
    base.paste(card, (card_x, card_y), cm)

    # 文案
    d = ImageDraw.Draw(base)
    d.text((90, 92), "提醒猫", font=f(64, True), fill=DARK)
    d.text((94, 178), "到点了，让一只小猫来提醒你", font=f(28), fill=(122, 96, 80))
    d.rounded_rectangle([94, 246, 300, 296], radius=25, fill=SEAL)
    d.text((124, 257), "离线 · 托盘", font=f(22, True), fill=WHITE)
    base.convert("RGB").save(dst, optimize=True)
    print("OK", os.path.basename(dst), base.size)


SRC_MAIN = os.path.join(SRC, "tm-main.png")
SRC_FORM = os.path.join(SRC, "tm-form.png")
SRC_SET = os.path.join(SRC, "tm-settings.png")
SRC_ABOUT = os.path.join(SRC, "tm-about.png")
SRC_OVL = os.path.join(SRC, "tm-overlay-clean.png")

# 图标与封面
make_cat_icon(os.path.join(IMG_DIR, "tixingmao-icon.png"))
make_cover(SRC_OVL, os.path.join(IMG_DIR, "tixingmao-cover.png"))

# 主图：主窗口 + 编号图例
legend_annotated(
    SRC_MAIN, os.path.join(IMG_DIR, "tixingmao-guide.png"),
    [(28, 90, 1010, 158), (30, 168, 1008, 556), (30, 556, 1008, 700)],
    [(1, "页头与操作"), (2, "我的提醒"), (3, "内置假期与说明")],
)

def make_tray_hint(src, dst, pad=40, legend_h=92):
    """从第6步真实主窗口底部提示栏裁「托盘与后台运行」配图，四周留白+底部图例。"""
    img = Image.open(src).convert("RGB")
    W, H = img.size
    bar = img.crop((26, H - 68, W - 26, H - 10))            # 三段提示文字，纯深色底
    bar = bar.resize((int(bar.width * 1.35), int(bar.height * 1.35)), Image.LANCZOS)
    bw, bh = bar.size
    canvas = Image.new("RGB", (bw + pad * 2, bh + pad * 2 + legend_h), (247, 239, 230))
    canvas.paste(bar, (pad, pad))
    d = ImageDraw.Draw(canvas)
    d.line([(pad, bh + pad + 16), (bw + pad, bh + pad + 16)], fill=(226, 214, 202), width=2)
    x, y = pad, bh + pad + 30
    for num, text in [(1, "关闭窗口继续托盘运行"), (2, "拖拽卡片排序"), (3, "右键托盘快捷操作")]:
        badge(d, x, y, num, text)
        x += int(d.textlength(text, font=f(23, True))) + 58 + 36
    canvas.save(dst, optimize=True)
    print("OK", os.path.basename(dst), canvas.size)


# 步骤图
make_tray_hint(SRC_MAIN, os.path.join(GUIDE_DIR, "tm-tray.png"))
crop_shot(SRC_MAIN, os.path.join(GUIDE_DIR, "tm-main.png"), (0, 0, 1040, 560), 1.15)
crop_shot(SRC_FORM, os.path.join(GUIDE_DIR, "tm-form.png"), (238, 72, 780, 662), 1.25)
crop_shot(SRC_SET, os.path.join(GUIDE_DIR, "tm-position.png"), (258, 175, 762, 340), 1.9)
crop_shot(SRC_SET, os.path.join(GUIDE_DIR, "tm-holiday.png"), (258, 350, 762, 560), 1.7)
crop_shot(SRC_OVL, os.path.join(GUIDE_DIR, "tm-overlay.png"), (0, 0, 440, 360), 1.7)
crop_shot(SRC_ABOUT, os.path.join(GUIDE_DIR, "tm-about.png"), (260, 72, 782, 662), 1.25)
