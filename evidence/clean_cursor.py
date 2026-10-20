"""Create display copies with only browser cursor artifacts removed.

The original evidence/*.jpg captures remain untouched. Each replacement region is
copied from a blank area in the same image and same scanlines; no checkout UI,
text, product or pricing pixels are synthesized or changed.
"""

from pathlib import Path
from PIL import Image

HERE = Path(__file__).resolve().parent
OUT = HERE / "clean"
OUT.mkdir(exist_ok=True)

# filename: (target left, top, right, bottom), source left
PATCHES = {
    "address-stage-header.jpg": ((808, 46, 858, 83), 735),
    "payment-methods.jpg": ((715, 140, 774, 191), 625),
    "delivery-options.jpg": ((728, 483, 793, 503), 620),
    "review-total.jpg": ((712, 71, 773, 121), 620),
    "cancellation-success.jpg": ((719, 346, 779, 402), 620),
}

for filename, (target, source_left) in PATCHES.items():
    with Image.open(HERE / filename) as opened:
        image = opened.convert("RGB")
    left, top, right, bottom = target
    patch = image.crop((source_left, top, source_left + right - left, bottom))
    image.paste(patch, (left, top))
    destination = OUT / filename.replace(".jpg", ".png")
    image.save(destination, optimize=True)
    print(destination)
