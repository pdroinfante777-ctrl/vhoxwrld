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

## DROP 001 campaign

The hero currently presents BAT, ROSE and VOID through code-native abstract scenes defined in `src/data/editorial.ts`; it does not present generated art as a real product.

When approved campaign photography or video exists, add it to `public/campaign/` and extend the corresponding scene with exact media metadata. Provide intrinsic width and height for images and a poster for video so the layout can reserve space without shifting. Keep every source free of embedded third-party branding and confirm VHOX has the right to publish it.

The next useful deliverables are:

- one desktop and one vertical campaign master for each BAT / ROSE / VOID chapter;
- verified product views for every item in `src/data/products.ts`;
- approved material, fit, care, availability and price data;
- approved journal photography or video;
- the mailing-service endpoint for the private-access form;
- final VHOX Instagram, TikTok and YouTube profile URLs.

## Lookbook

Add approved campaign images and short editorial videos to `public/lookbook/`, then reference them from `src/data/lookbook.ts`. Generated campaign art must not be used as product photography.
