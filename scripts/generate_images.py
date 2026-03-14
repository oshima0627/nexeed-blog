#!/usr/bin/env python3
"""Generate themed placeholder images for blog articles."""

from PIL import Image, ImageDraw, ImageFont
import os

OUTPUT_DIR = "/home/user/nexeed-blog/public/images"
os.makedirs(OUTPUT_DIR, exist_ok=True)

WIDTH = 1200
HEIGHT = 630

def create_gradient_image(filename, color1, color2, icon_text, title_text, subtitle_text=""):
    """Create a gradient image with icon and text."""
    img = Image.new("RGB", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(img)

    # Draw gradient background
    for y in range(HEIGHT):
        ratio = y / HEIGHT
        r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
        g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
        b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
        draw.line([(0, y), (WIDTH, y)], fill=(r, g, b))

    # Add decorative circles/shapes
    for i in range(5):
        x = WIDTH * (i + 1) // 6
        size = 80 + i * 20
        alpha_color = tuple(int(c * 0.15) for c in color1)
        overlay = Image.new("RGB", (size * 2, size * 2), color2)
        overlay_draw = ImageDraw.Draw(overlay)
        overlay_draw.ellipse([0, 0, size * 2, size * 2], fill=tuple(int(c * 0.8) for c in color1))
        img.paste(overlay, (x - size, HEIGHT // 2 - size),
                  overlay.convert("RGBA").split()[-1] if overlay.mode == "RGBA" else None)

    # Try to use default font
    try:
        # Large icon text
        draw.text((WIDTH // 2, HEIGHT // 2 - 80), icon_text,
                  fill=(255, 255, 255, 200), anchor="mm")
        # Title
        draw.text((WIDTH // 2, HEIGHT // 2 + 20), title_text,
                  fill=(255, 255, 255), anchor="mm")
        if subtitle_text:
            draw.text((WIDTH // 2, HEIGHT // 2 + 70), subtitle_text,
                      fill=(220, 220, 220), anchor="mm")
    except Exception:
        pass

    # Save
    filepath = os.path.join(OUTPUT_DIR, filename)
    img.save(filepath, "JPEG", quality=90)
    print(f"Created: {filename}")
    return filepath


# Theme definitions: (filename, color1_rgb, color2_rgb, emoji, title, subtitle)
themes = [
    # 1. nursery-childcare - warm orange/yellow
    ("nursery-childcare.jpg", (255, 140, 50), (255, 200, 80),
     "🏫", "保育園・学童保育", "子どもたちの笑顔あふれる場所"),

    # 2. baby-family - soft pink/purple
    ("baby-family.jpg", (255, 100, 150), (200, 120, 220),
     "👶", "赤ちゃんと家族", "新しい命と家族のきずな"),

    # 3. parent-children-education - blue/teal
    ("parent-children-education.jpg", (50, 150, 255), (50, 220, 200),
     "📚", "子どもの教育", "学びの楽しさを育む"),

    # 4. housekeeping-cleaning - green/mint
    ("housekeeping-cleaning.jpg", (50, 200, 120), (100, 220, 180),
     "🏠", "家事・掃除", "快適な暮らしをサポート"),

    # 5. investment-stocks - dark blue/navy
    ("investment-stocks.jpg", (20, 60, 150), (30, 120, 200),
     "📈", "投資・資産運用", "将来のための賢いお金の使い方"),

    # 6. furusato-gift - red/orange
    ("furusato-gift.jpg", (200, 60, 50), (240, 140, 60),
     "🎁", "ふるさと納税", "地域を応援してお得に返礼品"),

    # 7. money-seminar-women - purple/pink
    ("money-seminar-women.jpg", (150, 50, 200), (220, 100, 180),
     "💰", "女性のためのマネー", "賢くお金を増やす"),

    # 8. semiconductor-chip - dark/tech blue
    ("semiconductor-chip.jpg", (10, 30, 80), (20, 100, 180),
     "💻", "半導体・AI投資", "テクノロジーが変える未来"),

    # 9. ai-robot-technology - cyan/teal tech
    ("ai-robot-technology.jpg", (0, 150, 200), (0, 220, 180),
     "🤖", "AIテクノロジー", "人工知能が変える働き方"),

    # 10. chatgpt-llm-chat - green/dark
    ("chatgpt-llm-chat.jpg", (16, 163, 127), (10, 100, 80),
     "💬", "生成AI・チャットボット", "ChatGPT・Gemini・Claude活用術"),

    # 11. engineer-coding-laptop - dark/purple
    ("engineer-coding-laptop.jpg", (50, 30, 100), (100, 60, 180),
     "👨‍💻", "エンジニア・コーディング", "最新技術で未来を切り開く"),

    # 12. career-change - orange/amber
    ("career-change.jpg", (200, 100, 20), (240, 160, 40),
     "🔄", "キャリアチェンジ", "未経験からエンジニアへ"),

    # 13. engineer-family-balance - blue-green
    ("engineer-family-balance.jpg", (30, 120, 180), (60, 180, 150),
     "⚖️", "仕事と家族の両立", "エンジニアパパ・ママの働き方"),

    # 14. freelance-remote-work - yellow/orange
    ("freelance-remote-work.jpg", (220, 160, 30), (240, 200, 60),
     "🏡", "フリーランス・副業", "自由な働き方を実現"),

    # 15. startup-entrepreneur - red/coral
    ("startup-entrepreneur.jpg", (220, 50, 80), (240, 120, 100),
     "🚀", "スタートアップ・起業", "ゼロからビジネスを作る"),

    # 16. baseball-sport - green/blue
    ("baseball-sport.jpg", (30, 130, 50), (40, 100, 180),
     "⚾", "野球・WBC 2026", "世界一を目指せ！"),
]


for theme in themes:
    filename, color1, color2, icon, title, subtitle = theme
    create_gradient_image(filename, color1, color2, icon, title, subtitle)

print("\nAll images generated!")
print(f"Files in {OUTPUT_DIR}:")
for f in sorted(os.listdir(OUTPUT_DIR)):
    size = os.path.getsize(os.path.join(OUTPUT_DIR, f))
    print(f"  {f}: {size:,} bytes")
