# VHOX — revisión editorial

Verificación visual principal: 11 de septiembre de 2026. Cierre del menú móvil, validación técnica y auditoría de dependencias: 14 de septiembre de 2026.
Repositorio: `pdroinfante777-ctrl/vhoxwrld`.
Base conservada: `ea2a9a6f262de09d54e9e394adac78a7f5959d05` (`codex/vhox-signal-validation-v1`, PR #32).
Rama de revisión: `codex/vhox-editorial-art-direction-v1`.

## Resultado

El proyecto real es React 19 + TypeScript + Vite 6, con salida estática `dist` para Hostinger. No contiene configuración de Sites. Se revisaron el Master Brief, el sistema de diseño, la metodología y el estado de Git antes de editar; el árbol inicial estaba limpio. El trabajo anterior permanece en la historia de la nueva rama.

La portada cambia de fotografía recortada con tipografía superpuesta a una composición 5:6: mensaje breve a la izquierda y fotografía vertical completa a la derecha. En móvil el texto y la acción preceden a la imagen, sin intro bloqueante. La selección aparece inmediatamente después de la campaña. Chromatic Black combina una vista amplia y otra menor desplazada; el detalle se presenta sobre piedra y la identidad ocupa un bloque breve.

El catálogo utiliza marcos comparables, imágenes completas, nombres estables, precio pendiente explícito y enlaces directos. Black Cherry tiene un encuadre más contenido para equilibrar su escala con los originales horizontales. La ficha amplía la galería, conserva miniaturas, flechas, teclado y ampliación; elimina descripción/tabla duplicadas y mantiene especificaciones desplegables. El carrito conserva su funcionamiento y presenta el estado vacío sin contadores decorativos.

Manrope es la única familia activa del rediseño, con licencia y archivos locales ya existentes. Se conserva el logo original sin editar el recurso. Se retiran filtros fotográficos, fondos de cristal, formas redondeadas, neón de estado y animaciones generales. El menú permanece visible al desplazarse. Loader, Lenis y usePageMotion dejan de montarse; los módulos anteriores se conservan para evitar una limpieza de código ajena a esta revisión.

## Referencias inspeccionadas

- [LOEWE, Men](https://www.loewe.com/usa/en/men): se observó la entrada editorial asimétrica, navegación pequeña y clara, categorías junto a la fotografía y catálogo ordenado con inserciones editoriales. Principio adoptado: separar la voz de campaña de la lectura funcional del producto.
- [Bottega Veneta](https://www.bottegaveneta.com/): la ruta inicial de categoría no fue accesible mediante la herramienta de consulta; la portada oficial sí pudo inspeccionarse en navegador, también a 390 px. Se observó fotografía dominante y cabecera compacta. Principio adoptado: que el color y la expresión provengan de la imagen. El aviso de cookies seguía visible; no se afirma haber auditado toda la tienda.
- [Rick Owens, Men](https://www.rickowens.eu/en-us/collections/mens-all): se observó una retícula sobria, tres siluetas completas sobre superficie clara y controles compactos. Principio adoptado: encuadres comparables, interfaz subordinada y lectura completa de la prenda.

La revisión de referencias se limita a las superficies anteriores. No se presenta como auditoría exhaustiva de sus galerías, checkout o comportamiento en todos los dispositivos. No se reutilizó ningún archivo, logo, texto o código de estas marcas.

## Recursos de imagen

Todos los archivos utilizados ya estaban en el proyecto. No se generaron imágenes ni se editaron píxeles. Su presencia previa no se interpreta como aprobación de producto terminado.

| Recurso en public/chromatic-black | Uso y decisión |
| --- | --- |
| vhox-campaign-brutalist.jpeg, 1122 × 1402 | Campaña principal: proporción original completa, sin filtros; el rostro y los extremos de la playera permanecen visibles. |
| vhox-textured-black-tee.jpeg, 1448 × 1086 | Estudio asociado a SIGNAL CORE TEE: contain, sin cambio de contraste. |
| vhox-black-cherry-tee.jpeg, 1122 × 1402 | Estudio asociado a NIGHT BLOOM TEE: encuadre individual más pequeño dentro del marco común. |
| vhox-midnight-violet-tee.jpeg, 1448 × 1086 | Estudio asociado a CRYSTAL SIGNAL TEE y vista amplia de color. |
| vhox-burnt-earth-tee.jpeg, 1122 × 1402 | Vista menor de color y alternativa de galería ya existente; no se presenta como color comercial confirmado. |
| vhox-purple-detail.jpeg, 1448 × 1086 | Macro editorial existente, expresamente identificado como estudio y no muestra de producción. |
| vhox-drop-001-family.jpeg, 1448 × 1086 | Conservado en la galería existente. Se elimina su bloque dominante de la home: contiene prendas ajenas a las tres piezas previstas y texto incrustado. |
| vhox-nylon-jacket.jpeg / vhox-cargo-pant.jpeg | Conservados en disco; no se introducen en la nueva selección ni se vinculan a productos SIGNAL. |
| vhox-og-chromatic.png | Recurso social existente conservado; no se utiliza como fotografía de producto. |
| public/brand/vhox-logo-source.png | Logo oficial existente, sin redibujo ni alteración. |

Los originales de campaña tienen luces, fondos y proporciones distintos. El marco común mejora la lectura, pero no convierte estas imágenes en una sesión de e-commerce uniforme. No se afirma correspondencia definitiva con cada producto.

## Fotografías e información pendientes

Para cada una de las tres piezas: frontal y espalda completos sobre el mismo fondo neutro y a la misma escala; vistas laterales y sobre modelo con pose comparable; cuello, manga, bajo, costuras y aplicación de marca en macro; fotografía bajo iluminación neutra que permita aprobar el color. Identificar cada imagen con su producto real y aprobarla expresamente para comercio. Para gorras o prendas adicionales, solo añadir sus vistas completas si pasan a formar parte del catálogo aprobado.

También faltan muestras físicas, composición, gramaje, construcción, fit, medidas por talla, cuidados, precio, moneda de cobro, disponibilidad, fecha, entrega, devoluciones y destino de compra aprobados. El registro requiere la URL HTTPS aprobada del proveedor; actualmente se muestra su estado pendiente. No se ha enviado ningún formulario ni simulado una suscripción.

## Validación

- Node **20.20.2**, npm **10.9.2**: `typecheck`, `lint`, **38 tests en 11 archivos** y `build` correctos después de los ajustes visuales finales.
- `npm audit --json`: **0 vulnerabilidades**. `package.json` y `package-lock.json` no cambian.
- Build final: JS **336.65 kB**, gzip **100.71 kB**; CSS **153.99 kB**, gzip **28.27 kB**. La versión base generaba JS 477.74 kB, gzip 154.25 kB; la reducción procede de dejar de montar movimiento ornamental. El CSS aumenta por la capa visual que conserva compatibilidad con rutas anteriores.
- Home, colección, producto SIGNAL CORE TEE y carrito: **320, 390, 768 y 1440 px**, altura 1000 px. Sin desbordamiento de documento ni de los elementos visibles revisados; imágenes visibles cargadas. El navegador reserva 15 px de barra vertical: clientWidth 305/375/753/1425, sin ocultar un overflow horizontal.
- Idiomas EN/ES/PT/FR: título y CTA cambian correctamente; selector de moneda MXN y retorno a USD comprobados.
- Contraste calculado de los cinco pares principales: 15.63:1, 8.79:1, 12.75:1, 5.77:1, 6.54:1. Todos superan 4.5:1; no equivale a una certificación integral WCAG. Ver `contrast-results.json`.
- Menú: apertura, foco inicial en Inicio, Shift+Tab hacia el cierre, Escape y retorno del foco al botón. Revisión final a 320 px: siete enlaces de 280 × 53 px sin saltos de línea, sin animación escalonada. A 768 × 390 px conserva objetivos de al menos 44 px y desplazamiento vertical para acceder al contenido completo. Ver [captura final](artifacts/editorial-review/after-menu-320.png).
- Galería: siguiente, miniatura, flecha de teclado, ampliación, foco en cerrar y Escape con retorno al disparador. Guía de tallas accesible y con estado pendiente correcto.
- El gate de compra, variantes y carrito permanece cubierto por los tests existentes. No hay tallas, precios ni compra reales habilitados: no es posible probar una transacción real con el catálogo actual.
- Se conserva SEO, metadatos, canonical, datos estructurados, rutas SIGNAL, redirecciones anteriores, idiomas y analítica. Las fichas incompletas siguen con `noindex, follow`.
- `prefers-reduced-motion` revisado en CSS; no se afirma emulación del ajuste del sistema operativo. Scroll nativo y contenido inicial sin loader verificados.
- La vista previa local no ejecuta Apache: no acredita cabeceras de Hostinger, redirecciones del servidor ni métricas reales de usuarios. No se ha desplegado ni modificado dominio o main.

## Capturas comparables

Abrir [el comparador](artifacts/editorial-review/index.html). Permite elegir página y ancho; las 32 imágenes también se pueden abrir individualmente.

Las capturas anteriores proceden del commit base en una copia temporal aislada: se repitieron después de finalizar las animaciones para no comparar estados intermedios. Las capturas posteriores proceden de la compilación local del rediseño. El idioma y las dimensiones coinciden; las fotografías se muestran sin retoque.

- [Antes, portada escritorio](artifacts/editorial-review/before-home-1440.png) / [Después](artifacts/editorial-review/after-home-1440.png)
- [Antes, portada móvil](artifacts/editorial-review/before-home-390.png) / [Después](artifacts/editorial-review/after-home-390.png)
- [Antes, catálogo](artifacts/editorial-review/before-collection-1440.png) / [Después](artifacts/editorial-review/after-collection-1440.png)
- [Antes, producto](artifacts/editorial-review/before-product-1440.png) / [Después](artifacts/editorial-review/after-product-1440.png)
- [Matriz de comprobaciones](artifacts/editorial-review/viewport-results.json)

## Archivos de implementación

- `src/App.tsx`, `src/main.tsx`, `index.html`: nueva secuencia, scroll nativo, retirada del loader y de la precarga de serif.
- `src/sections/Hero.tsx`, `src/sections/EditorialHome.tsx`, `src/sections/InnerCircle.tsx`: composición y narrativa.
- `src/data/artDirection.ts`, `src/i18n/translations.ts`: contenido localizado y etiquetas más legibles.
- `src/components/Navigation.tsx`, `ProductCard.tsx`, `RelatedProducts.tsx`: navegación estable y selección sin decoración repetida.
- `src/pages/CollectionsPage.tsx`, `ProductPage.tsx`, `CartPage.tsx`: jerarquía de tienda y reducción de información duplicada.
- `src/styles/editorial.css`, `src/styles/components.css`: sistema visual y eliminación del acento de neón forzado.
- `DESIGN_SYSTEM.md`, este informe y `artifacts/editorial-review/`: contrato actualizado y evidencia.

El PR debe compararse con `codex/vhox-signal-validation-v1` para revisar únicamente esta dirección editorial. La cadena anterior de seguridad y SIGNAL no se debe omitir al integrar. La aprobación visual y el despliegue son pasos separados; esta entrega no autoriza un merge automático.
