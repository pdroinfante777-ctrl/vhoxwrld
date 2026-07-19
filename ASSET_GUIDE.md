# VHOX asset intake

The approved VHOX master logo is preserved verbatim in `public/brand/vhox-logo-source.png`. This PNG is the only source for site branding and favicon derivatives. Do not rename, reinterpret, trace or replace it with generated symbols.

## Brand

- `vhox-logo-source.png` — official transparent raster source (`1254 × 1254`, original green `#7cff00`).
- Navbar, mobile menu, footer, 404 and social metadata all reference this exact file.
- Favicons are deterministic crops and resizes of this exact file; they contain no added symbol or geometry.

## Products

Add real product media to `public/products/`, preferably optimized WebP/AVIF images with descriptive filenames. Reference exact paths from `src/data/products.ts`, for example `/products/tshirt-black-front.webp`.

Each product supports image/video galleries, price, color, size, materials, care, shipping, availability and an external purchase URL. Leave unknown fields empty instead of fabricating them.

## Lookbook

Add approved campaign images and short editorial videos to `public/lookbook/`, then reference them from `src/data/lookbook.ts`. Generated campaign art must not be used as product photography.
