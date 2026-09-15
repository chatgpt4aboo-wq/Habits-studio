#!/usr/bin/env python3
"""
Turn the studio's portfolio plates into product images.

The supplied artwork is a portfolio page, not a product shot: each garment sits
on a bordered white card, and three of the five have their caption typeset into
the image. The site draws its own captions, so those have to go — and every
garment has to be framed identically, or a grid of them looks accidental.

    assets-inbox/products/0X.jpg  →  public/products/0X.webp

Run:  python3 scripts/prepare_assets.py
"""

from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

SOURCE = Path("assets-inbox/products")
TARGET = Path("public/products")
MODEL_SOURCE = Path("assets-inbox/models")
MODEL_TARGET = Path("public/models")

# 4:5 portrait, matching the plate ratio the site lays out.
CANVAS = (1200, 1500)
# How close to white counts as the studio backdrop.
WHITE_TOLERANCE = 7
# Boundary pixels are blended with the old white ground; dropping a couple of
# them is what stops a halo appearing against the near-black page.
MATTE_EROSION = 2
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


def cut_out(im: Image.Image) -> Image.Image:
    """Lift the garment off the studio backdrop.

    Only white *connected to the frame edge* goes. A plain threshold would be
    simpler, but the prints are white too: it punches the HABITS out of the
    chest of half the collection. Measured on the cropped garment, every
    enclosed white region is under 0.05% of the frame — they are all print, and
    none of them is background — so connectivity is the right rule here.
    """
    rgb = np.asarray(im.convert("RGB"), dtype=np.int16)
    labels, _ = ndimage.label(rgb.min(axis=2) >= 255 - WHITE_TOLERANCE)
    touching = set(labels[0]) | set(labels[-1]) | set(labels[:, 0]) | set(labels[:, -1])
    touching.discard(0)
    keep = ~np.isin(labels, list(touching))

    if keep.mean() < 0.12:
        raise SystemExit(
            "Almost nothing survived the cut — is this garment as bright as the "
            "backdrop? Lower WHITE_TOLERANCE or cut it by hand."
        )

    keep = ndimage.binary_erosion(keep, np.ones((3, 3), bool), iterations=MATTE_EROSION)

    alpha = Image.fromarray(np.where(keep, 255, 0).astype(np.uint8))
    out = im.convert("RGBA")
    out.putalpha(alpha.filter(ImageFilter.GaussianBlur(0.8)))
    return out


# On-body plates: 2:3, the whole figure, held at one height across the five.
# The product gallery frames every view at this ratio — the garments are cut
# out, so the space around a shorter one is just page, never a letterbox.
MODEL_CANVAS = (1000, 1500)
MODEL_FIGURE_HEIGHT = 0.94


def figure_box(im: Image.Image) -> tuple[int, int, int, int]:
    """Where the figure sits in an on-body frame.

    These are not cut out: the backdrop is a lit grey that varies shot to shot
    and one frame has something dark against the edge, so a matte would be
    guesswork. The backdrop is read from the border instead, and only used to
    find the figure.
    """
    grey = np.asarray(im.convert("L"), dtype=np.int16)
    border = np.concatenate([grey[0], grey[-1], grey[:, 0], grey[:, -1]])
    backdrop = int(np.median(border))

    subject = grey < backdrop - 14
    # Drop speckle so a few stray pixels cannot define the frame.
    subject = ndimage.binary_opening(subject, np.ones((5, 5), bool))
    rows = np.where(subject.mean(axis=1) > 0.01)[0]
    cols = np.where(subject.mean(axis=0) > 0.01)[0]
    if rows.size == 0 or cols.size == 0:
        return 0, 0, im.width - 1, im.height - 1
    return int(cols[0]), int(rows[0]), int(cols[-1]), int(rows[-1])


def prepare_models() -> None:
    if not MODEL_SOURCE.exists():
        return
    MODEL_TARGET.mkdir(parents=True, exist_ok=True)

    for path in sorted(MODEL_SOURCE.glob("*.jpg")):
        im = Image.open(path).convert("RGB")
        x0, y0, x1, y1 = figure_box(im)
        height = y1 - y0 + 1

        scale = (MODEL_CANVAS[1] * MODEL_FIGURE_HEIGHT) / height
        scaled = im.resize(
            (max(1, round(im.width * scale)), max(1, round(im.height * scale))), Image.LANCZOS
        )

        # Extend with the backdrop's own colour so a widened frame has no seam.
        grey = np.asarray(im.convert("RGB"), dtype=np.int16)
        edge = np.concatenate([grey[0], grey[-1]])
        backdrop = tuple(int(v) for v in np.median(edge, axis=0))

        plate = Image.new("RGB", MODEL_CANVAS, backdrop)
        centre_x = round((x0 + x1) / 2 * scale)
        plate.paste(scaled, (MODEL_CANVAS[0] // 2 - centre_x, round(-y0 * scale + MODEL_CANVAS[1] * (1 - MODEL_FIGURE_HEIGHT) / 2)))

        out = (MODEL_TARGET / path.name).with_suffix(".webp")
        plate.save(out, "WEBP", quality=84, method=6)
        print(f"{path.name}: figure {x1-x0+1}x{height} → plate {MODEL_CANVAS[0]}x{MODEL_CANVAS[1]} "
              f"({out.stat().st_size / 1024:.0f}KB)")


def main() -> None:
    TARGET.mkdir(parents=True, exist_ok=True)
    for path in sorted(SOURCE.glob("*.jpg")):
        box = garment_box(path)
        garment = cut_out(
            Image.open(path).crop((box[0], box[1], box[2] + 1, box[3] + 1))
        )

        scale = (CANVAS[0] * GARMENT_WIDTH) / garment.width
        size = (round(garment.width * scale), round(garment.height * scale))
        garment = garment.resize(size, Image.LANCZOS)

        plate = Image.new("RGBA", CANVAS, (0, 0, 0, 0))
        plate.paste(
            garment,
            ((CANVAS[0] - size[0]) // 2, (CANVAS[1] - size[1]) // 2),
            garment,
        )

        # WebP keeps the alpha at a fraction of a PNG's weight, and a garment
        # with no ground of its own can sit on bone or on the void.
        out = (TARGET / path.name).with_suffix(".webp")
        plate.save(out, "WEBP", quality=86, method=6)
        print(
            f"{path.name}: garment {box[2]-box[0]+1}x{box[3]-box[1]+1} "
            f"→ {size[0]}x{size[1]} on {CANVAS[0]}x{CANVAS[1]} "
            f"({out.stat().st_size / 1024:.0f}KB)"
        )


if __name__ == "__main__":
    main()
    prepare_models()
