# VHOX asset intake

The approved VHOX source logo is preserved verbatim in `public/brand/vhox-logo-source.png`. Product photography is not currently present, so the website keeps explicit editorial placeholders and does not invent products or commercial data.

## Brand

- `vhox-logo-source.png` — untouched approved raster source (`#7cff00`).
- `vhox-bat-outline.svg` — deterministic exterior trace of the source silhouette, without text or internal letter counters.

The navbar uses the VHOX wordmark without the previous temporary star. `BatIsotype` is available as a separate component for placements large enough to preserve the silhouette's detail. Do not regenerate or redesign either approved asset.

## Products

Add real product media to `public/products/`, preferably optimized WebP/AVIF images with descriptive filenames. Reference exact paths from `src/data/products.ts`, for example `/products/tshirt-black-front.webp`.

Each product supports image/video galleries, price, color, size, materials, care, shipping, availability and an external purchase URL. Leave unknown fields empty instead of fabricating them.

## Lookbook

Add approved campaign images and short editorial videos to `public/lookbook/`, then reference them from `src/data/lookbook.ts`. Generated campaign art must not be used as product photography.
