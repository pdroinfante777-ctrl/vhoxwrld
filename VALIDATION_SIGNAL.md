# VHOX — revisión de SIGNAL

Fecha: 2026-09-09. Repositorio existente: `pdroinfante777-ctrl/vhoxwrld`.

Se recuperaron y completaron los 11 archivos modificados que quedaron al agotarse el contexto. No se reinició el proyecto ni se modificaron Hostinger, dominio, secretos o `main`.

## Resultado

La experiencia identifica VHOX como streetwear premium y dirige a DROP 001: SIGNAL. Las tres piezas previstas tienen rutas consistentes y estados de información pendiente. Las imágenes conservan su condición de estudios de campaña; no se presentan como fotografía oficial aprobada ni habilitan compras.

La tabla de las ocho alertas originales, versiones corregidas, árbol antes/después y alertas adicionales de septiembre están en [SECURITY_AUDIT.md](SECURITY_AUDIT.md). La auditoría completa y la de producción finalizaron con **0 vulnerabilidades**.

## Verificación ejecutada

| Comprobación | Resultado |
| --- | --- |
| Instalación reproducible | `npm ci` con Node 20.20.2 / npm 10.9.2: correcta; 212 paquetes instalados |
| TypeScript y ESLint | Sin errores |
| Pruebas | 38 pruebas, 11 archivos, Vitest 4.1.11 |
| Build | `dist/index.html`, assets, rutas prerenderizadas y `.htaccess` generados |
| Auditoría completa y producción | 0 vulnerabilidades en ambas |
| Ficha SIGNAL CORE TEE | 320, 390, 430, 768, 1024, 1440 px y 844 × 390: un H1, sin desbordamiento horizontal |
| Otras rutas | Home, colección, otras dos fichas, Journal, manifiesto, carrito y 404 a 320, 768, 1440 y 844 × 390: sin desbordamiento horizontal |
| Imágenes | Los 11 elementos de imagen de la home cargaron durante el recorrido; sin imágenes rotas en las rutas inspeccionadas |
| Menú | Foco inicial, Shift+Tab, Escape y devolución de foco comprobados; menú cerrado inerte |
| Galería | Cambio de imagen, selección de miniatura, ampliación y Escape comprobados |
| Idiomas | EN, ES, PT y FR cambian texto y metadatos de colección |
| FAQ | Respuesta visible y schema con las mismas preguntas y respuestas |
| Carrito | Estado vacío real; pruebas descartan líneas malformadas y piezas no comprables |
| Rutas antiguas | Colecciones BAT/ROSE/VOID llegan a SIGNAL; `/product/signal-core-tee/` llega a su ruta canónica |
| Consola | Sin errores ni advertencias en los recorridos inspeccionados |

Se revisaron capturas de home en móvil/escritorio y FAQ. Las mediciones de dimensiones no equivalen a una certificación WCAG. El último ajuste de textos y enlace de volver arriba volvió a pasar typecheck, lint, pruebas y build en Node 24 local; el toolchain y la instalación limpia se validaron previamente bajo Node 20.

## Contenido y confianza

- BAT, ROSE y VOID dejan de ser el catálogo público; sus rutas llevan al índice SIGNAL sin inferir equivalencias entre productos.
- Los códigos de detalle dejan de afirmar alto gramaje y bordado: describen estudios visuales pendientes de validación física.
- La home explica streetwear premium, oscuridad cromática y Movimiento Exclusivo.
- El texto de ecosistema en productos relacionados se sustituye por SIGNAL.
- Gramaje, composición, construcción, ajuste, guía de tallas, cuidados, envío y devoluciones se muestran o se declaran pendientes.
- La home usa estudios de camisetas coherentes con las fichas; los archivos visuales originales se conservan.
- No se añadieron testimonios, precios, cantidades, escasez ni fechas.

## PR y orden de revisión

Cada PR depende del anterior. Revisar toda la cadena antes de una decisión de producción; no fusionar automáticamente pasos intermedios.

| PR | Alcance |
| --- | --- |
| [23](https://github.com/pdroinfante777-ctrl/vhoxwrld/pull/23) | Auditoría y fuente de verdad, existente |
| [24](https://github.com/pdroinfante777-ctrl/vhoxwrld/pull/24) | Seguridad inicial, existente |
| [25](https://github.com/pdroinfante777-ctrl/vhoxwrld/pull/25) | Sistema visual, existente |
| [26](https://github.com/pdroinfante777-ctrl/vhoxwrld/pull/26) | Continuación de estructura SIGNAL |
| [27](https://github.com/pdroinfante777-ctrl/vhoxwrld/pull/27) | Contenido, estados comerciales y FAQ |
| [28](https://github.com/pdroinfante777-ctrl/vhoxwrld/pull/28) | Interacciones y destinos seguros |
| [29](https://github.com/pdroinfante777-ctrl/vhoxwrld/pull/29) | Rutas y SEO |
| [30](https://github.com/pdroinfante777-ctrl/vhoxwrld/pull/30) | Encuadres, responsive y galería |
| [31](https://github.com/pdroinfante777-ctrl/vhoxwrld/pull/31) | Alertas de septiembre y Node 20 |

La rama final `codex/vhox-signal-validation-v1` añade esta entrega y ajustes de revisión. [METHODOLOGY_VHOX.md](METHODOLOGY_VHOX.md) conserva íntegra la metodología adjunta, con igualdad de SHA-256 comprobada.

## Vista temporal

La vista local es `http://127.0.0.1:4173/`. En otro checkout de la rama final, usar Node 20.20.2 / npm 10.9.2:

```sh
npm ci
npm run typecheck
npm run lint
npm run test
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

En Windows, detener Vite antes de `npm ci` para liberar `esbuild.exe`. Revisar home → SIGNAL → ficha → FAQ/Inner Circle, idiomas, teclado y móvil. No asignar esta rama a la aplicación de producción de Hostinger.

## Pendiente antes de producción

1. Confirmar en un log real la versión exacta de Node/npm de Hostinger; la prueba local no acredita la configuración remota.
2. En una URL temporal de hosting autorizada, verificar respuestas 301/404, CSP y demás headers. Vite preview no ejecuta Apache ni acredita `.htaccess`.
3. Medir Core Web Vitals en condiciones de red/dispositivo representativas y luego con datos de campo. No se declara un resultado LCP/INP/CLS que no se haya medido.
4. Completar revisión con lector de pantalla, emulación de reduced motion y dispositivos físicos. Se revisó en código el soporte de movimiento reducido; no se afirma una prueba completa de emulación en esta continuación.
5. Carlos debe aprobar fotos por pieza, precio/moneda, disponibilidad, colores/subtonos, composición, gramaje, construcción, fit, tallas, cuidados, envío, cambios/devoluciones y destino de compra. También registro y canales sociales oficiales.

La compra y el registro externo dependen de datos y destinos aprobados. La entrega es una versión revisable del repositorio, no una tienda publicada ni una integración de pagos terminada.

## Archivos de esta continuación

`package.json`, `package-lock.json`, `public/.htaccess`, `public/llms.txt`, `public/sitemap.xml`, `scripts/generate-seo.mjs`, `scripts/prerender-seo.mjs`, `seo.config.mjs`, `src/App.tsx`, `src/main.tsx`, `src/cart/cartPersistence.test.ts`, `src/components/Footer.tsx`, `src/components/Navigation.tsx`, `src/components/ProductCard.tsx`, `src/components/ProductGallery.tsx`, `src/components/RelatedProducts.tsx`, `src/components/ShareButton.tsx`, `src/config/shop.ts`, `src/config/shop.test.ts`, `src/data/chromaticBlack.ts`, `src/data/editorial.ts`, `src/data/editorial.test.ts`, `src/data/products.ts`, `src/data/productReadiness.test.ts`, `src/i18n/translations.ts`, `src/pages/CollectionsPage.tsx`, `src/pages/ProductPage.tsx`, `src/sections/ChromaticBlack.tsx`, `src/sections/Hero.tsx`, `src/seo/content.ts`, `src/seo/redirects.ts`, `src/seo/redirects.test.ts`, `src/styles/chromatic.css`, `SECURITY_AUDIT.md`, `SEO_AUDIT.md`, `README.md`, `HOSTINGER_DEPLOY.md`, `AUDIT_VHOX.md`, `METHODOLOGY_VHOX.md`, `VALIDATION_SIGNAL.md`.
