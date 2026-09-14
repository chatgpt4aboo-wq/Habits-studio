# Drop artwork here

Put the studio's files in this folder and they get processed into the site —
cropped, resized, renamed and committed. **Any format, any size**: PDF, PNG,
JPG, SVG, AI exports. PDFs are fine and preferred for the logo, since the
artwork can be pulled out at full resolution.

This folder is a delivery point, not a destination. Nothing here is served to
the browser; the processed results land in `public/products/` and
`public/brand/`.

## Why files come through the repo

Google Drive is connected and readable, but this environment's network policy
blocks Google's download hosts, so Drive files can only arrive base64-encoded
through a limited context window — fine for a few KB, impossible for the 0.5–4 MB
artwork. Committing to the repo has no size limit at all.

Upload through Lovable (it commits straight to this repo) or drag files into
GitHub's web UI.

## Expected files

| Drive file | Becomes |
| --- | --- |
| `Habits_Long_Sleeve_Line_Study_HQ.pdf` | `public/products/01.jpg` |
| `Habits_Long_Sleeve_Constellation_HQ.pdf` | `public/products/02.jpg` |
| `Habits_Long_Sleeve_Tonal_Wrap_HQ.pdf` | `public/products/03.jpg` |
| `Habits_Long_Sleeve_Minimal_Black_HQ.pdf` | `public/products/04.jpg` |
| `Habits_Long_Sleeve_Oversized_Navy_HQ.pdf` | `public/products/05.jpg` |
| `Habits_Logo_Wordmark_HQ.pdf` | `public/brand/wordmark.svg` |
| `Habits_Logo_HS_Monogram_HQ.pdf` | `public/brand/monogram.svg` |
| `Habits_Logo_Sleeve_Lockup_HQ.pdf` | `public/brand/sleeve-lockup.svg` |
