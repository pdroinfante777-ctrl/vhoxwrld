# VHOX asset intake

The approved VHOX master logo is preserved verbatim in `public/brand/vhox-logo-source.png`. This PNG is the only source for site branding and favicon derivatives. Do not rename, reinterpret, trace or replace it with generated symbols.

## Brand

- `vhox-logo-source.png` — official transparent raster source (`1254 × 1254`, original green `#7cff00`).
- `vhox-bat-particle-source.png` — exact approved bat reference used only to sample the opening particle silhouette in the fiber study. It does not replace the official logo or introduce a redrawn mark.
- Navbar, mobile menu, footer, 404 and social metadata all reference this exact file.
- Favicons are deterministic crops and resizes of this exact file; they contain no added symbol or geometry.

## Products

Add real product media to `public/products/`, preferably optimized WebP/AVIF images with descriptive filenames. Reference exact paths from `src/data/products.ts`, for example `/products/tshirt-black-front.webp`.

Each product supports image/video galleries, price, color, size, materials, care, shipping, availability and an external purchase URL. Leave unknown fields empty instead of fabricating them.

## Campaign hero

Add one approved campaign image or video to `public/campaign/`, then set its exact path and metadata in `src/data/campaign.ts`. Until that happens, the homepage deliberately renders an abstract industrial fallback labelled `CAMPAIGN PHOTOGRAPHY PENDING`; it never requests a missing file or presents generated art as a VHOX garment.

Provide intrinsic width and height for images, and a poster for video, so the hero can reserve space without layout shift. Keep the source free of embedded third-party branding and confirm VHOX has the right to publish it.

## Lookbook

Add approved campaign images and short editorial videos to `public/lookbook/`, then reference them from `src/data/lookbook.ts`. Generated campaign art must not be used as product photography.
