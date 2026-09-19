# VHOX — prendas y Premium

## Alcance y decisiones, 19 de septiembre de 2026

Base: `origin/codex/vhox-signal-validation-v1`, que ya contiene el PR editorial #34. El árbol estaba limpio. `origin/main` todavía no contiene ese rediseño; esta revisión continúa la rama integrada y no modifica producción.

1. **Sistema:** se conserva React 19, Vite 6, rutas, carrito, idiomas, SEO y las condiciones de compra de SIGNAL. Las nuevas imágenes se organizan como contenido editorial de prendas, sin inventar SKU, precios o materiales.
2. **Visual:** cuatro familias — chaquetas, playeras, sudaderas y racing — con imagen completa y vistas seleccionables. La portada presenta una selección y la colección reúne todas las vistas. Premium tiene dos fotografías nuevas, luz natural y una composición propia. Se retiran los pequeños rótulos y números ornamentales de las páginas activas.
3. **Copy:** títulos breves, descripciones concretas de lo visible y una nota común de desarrollo. Los textos nuevos se ofrecen en ES, EN, PT y FR. SIGNAL conserva sus nombres e identificadores internos.
4. **Interacción:** miniaturas con selección explícita, ampliación mediante diálogo nativo, anterior/siguiente, Escape y retorno del foco. Imágenes adaptativas, carga diferida y dimensiones reservadas; sin reproducción ni desplazamiento automáticos.
5. **Implementación:** datos localizados, un componente de galería reutilizable y dos secciones; integración en home/colección y limpieza de encabezados. Verificación técnica y visual antes de subir el PR. Sin merge ni despliegue.

## Imágenes

Las once imágenes aportadas por el usuario se conservan como fuentes en `assets/garment-sources/`. Las dos imágenes Premium se generan con la herramienta integrada image_gen; sus prompts están en `artifacts/garment-review/prompts.json`. Se conservan sus fuentes en el mismo directorio. El sitio sirve WebP optimizados desde `public/garments/`, sin recortes ni alteraciones creativas sobre los archivos aportados.

Las fotografías muestran propuestas visuales. No se presentan como prueba de prendas fabricadas, materiales confirmados ni productos disponibles. El logo de la interfaz permanece intacto; no se redibuja en las nuevas imágenes.

## Validación

- Node 20.20.2 y npm 10.9.2: typecheck, lint, **38 tests en 11 archivos** y build correctos. `npm audit`: **0 vulnerabilidades**, sin cambios de dependencias.
- Build: JS 348.48 kB (gzip 105.18 kB); CSS 159.08 kB (gzip 29.15 kB).
- Once vistas seleccionadas individualmente: imagen cargada y miniatura activa correctas. Las dos imágenes Premium se inspeccionaron visualmente después de generarse y dentro del sitio.
- Visor: botones anterior/siguiente, flechas de teclado, Escape, retorno al disparador y restauración del scroll. Tab y Shift+Tab permanecen dentro del diálogo, tanto con una imagen como con varias.
- Home, prendas, Premium, Journal, manifiesto y ficha SIGNAL CORE TEE revisados a 320, 390, 768 y 1440 px. Sin desbordamiento horizontal en los elementos revisados ni imágenes visibles rotas. Ver `artifacts/garment-review/responsive.json`.
- ES, EN, PT y FR: encabezados, copy y texto alternativo verificados. El enlace Premium del menú móvil cierra el menú y llega a la sección correcta. Sin errores ni advertencias de consola en las comprobaciones finales.
- Originales: 13 PNG, 32.89 MB en total, conservados fuera de `public`. Versiones web: 39 WebP (completas, pequeñas y miniaturas), 3.81 MB en total, con `srcset` y carga diferida. Los hashes y dimensiones están en `image-manifest.json`.
- Se mantienen el catálogo SIGNAL y sus controles de compra, precios, tallas, formulario y destinos pendientes; las nuevas galerías no añaden productos comprables ni formularios ficticios.
- Los metadatos y la generación SEO siguen pasando el build. No hay nuevas rutas: las secciones utilizan anclas dentro de home y colección. No se midieron Core Web Vitals de usuarios reales ni cabeceras del servidor Hostinger.
- No se hizo merge a main, despliegue ni cambio de dominio.

## Evidencia y archivos

[Galería de capturas](artifacts/garment-review/index.html) · [Premium en escritorio](artifacts/garment-review/premium-1440.png) · [Prendas en móvil](artifacts/garment-review/garments-390.png) · [Prompts exactos](artifacts/garment-review/prompts.json)

- `src/data/garmentEditorials.ts`: cuatro familias, once vistas, dos imágenes Premium y copy en cuatro idiomas.
- `src/components/EditorialGallery.tsx`: miniaturas, ampliación, navegación y foco.
- `src/sections/GarmentEditorials.tsx`, `src/styles/garments.css`: selección de portada, galerías completas y apartado Premium.
- `src/App.tsx`, `src/main.tsx`, `src/pages/CollectionsPage.tsx`: integración y enlaces de sección.
- `Navigation`, `Footer`, `RelatedProducts`, `SectionHeading`, `Hero`, `EditorialHome`, `InnerCircle`, `ProductPage`, `JournalPage`, `ManifestoPage`: títulos directos y retirada de rótulos decorativos. Los contadores útiles del visor de producto se conservan.
- `assets/garment-sources/`, `public/garments/`: fuentes originales y derivados para web.
- `DESIGN_SYSTEM.md`, este informe y `artifacts/garment-review/`: decisiones y evidencia.
