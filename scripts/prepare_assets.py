#!/usr/bin/env python3
"""
Turn the studio's portfolio plates into product images.

The supplied artwork is a portfolio page, not a product shot: each garment sits
on a bordered white card, and three of the five have their caption typeset into
the image. The site draws its own captions, so those have to go — and every
garment has to be framed identically, or a grid of them looks accidental.

    assets-inbox/products/0X.jpg  →  public/products/0X.jpg

Run:  python3 scripts/prepare_assets.py
"""

from pathlib import Path

import numpy as np
from PIL import Image

SOURCE = Path("assets-inbox/products")
TARGET = Path("public/products")

# 4:5 portrait, matching the plate ratio the site lays out.
CANVAS = (1200, 1500)
# Shoulder width as a share of the canvas. The five garments are photographed
# at near-identical scale, so normalising on width makes the grid line up.
GARMENT_WIDTH = 0.86
INK = 243  # below this is not the white card


def card_interior(ink: np.ndarray) -> tuple[int, int]:
    """The card's own border is a hairline inked down its full height; find it
    so the garment's extent isn't measured against the frame.

    A wide pale garment can also ink a column down most of its height, so only
    the outer margins are searched — the frame is never anywhere else.
    """
    width = ink.shape[1]
    margin = int(width * 0.15)
    border = np.where(ink.mean(axis=0) > 0.6)[0]
    left = border[border < margin]
    right = border[border > width - margin]
    x0 = int(left.max()) + 4 if left.size else 0
    x1 = int(right.min()) - 4 if right.size else width - 1
    return x0, x1


def garment_box(path: Path) -> tuple[int, int, int, int]:
    """The garment alone: the tallest run of substantially-inked rows. Caption
    lines are inked too, but only ~45px tall and far narrower."""
    grey = np.asarray(Image.open(path).convert("L"), dtype=np.int16)
    ink = grey < INK
    x0, x1 = card_interior(ink)
    inner = ink[:, x0 : x1 + 1]

    rows = inner.mean(axis=1) > 0.08
    runs, start = [], None
    for y, filled in enumerate(rows):
        if filled and start is None:
            start = y
        elif not filled and start is not None:
            runs.append((start, y - 1))
            start = None
    if start is not None:
        runs.append((start, len(rows) - 1))
    if not runs:
        raise SystemExit(f"{path}: no garment found")
    y0, y1 = max(runs, key=lambda run: run[1] - run[0])

    band = inner[y0 : y1 + 1]
    filled_cols = np.where(band.mean(axis=0) > 0.02)[0]
    return x0 + int(filled_cols[0]), y0, x0 + int(filled_cols[-1]), y1


def main() -> None:
    TARGET.mkdir(parents=True, exist_ok=True)
    for path in sorted(SOURCE.glob("*.jpg")):
        box = garment_box(path)
        garment = Image.open(path).convert("RGB").crop(
            (box[0], box[1], box[2] + 1, box[3] + 1)
        )

        scale = (CANVAS[0] * GARMENT_WIDTH) / garment.width
        size = (round(garment.width * scale), round(garment.height * scale))
        garment = garment.resize(size, Image.LANCZOS)

        plate = Image.new("RGB", CANVAS, "white")
        plate.paste(
            garment,
            ((CANVAS[0] - size[0]) // 2, (CANVAS[1] - size[1]) // 2),
        )

        out = TARGET / path.name
        plate.save(out, "JPEG", quality=88, optimize=True, progressive=True)
        print(
            f"{path.name}: garment {box[2]-box[0]+1}x{box[3]-box[1]+1} "
            f"→ {size[0]}x{size[1]} on {CANVAS[0]}x{CANVAS[1]} "
            f"({out.stat().st_size / 1024:.0f}KB)"
        )


if __name__ == "__main__":
    main()
