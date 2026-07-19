# VHOX asset intake

The approved master logo and product photography are not currently present in this repository. The website therefore uses an explicitly temporary web mark and editorial placeholders; it does not invent products or commercial data.

## Brand

Add approved files to `public/brand/`:

- `vhox-logo.svg` — primary full logo
- `vhox-symbol.svg` — compact symbol
- `favicon-source.png` — high-resolution square source

Replace the temporary `BrandMark` implementation only after the master SVG is available. Do not auto-trace or redesign the official mark in this project.

## Products

Add real product media to `public/products/`, preferably optimized WebP/AVIF images with descriptive filenames. Reference exact paths from `src/data/products.ts`, for example `/products/tshirt-black-front.webp`.

Each product supports image/video galleries, price, color, size, materials, care, shipping, availability and an external purchase URL. Leave unknown fields empty instead of fabricating them.

## Lookbook

Add approved campaign images and short editorial videos to `public/lookbook/`, then reference them from `src/data/lookbook.ts`. Generated campaign art must not be used as product photography.
