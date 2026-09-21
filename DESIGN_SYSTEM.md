# VHOX Design System

## Revisión editorial vigente — septiembre de 2026

La dirección implementada en `src/styles/editorial.css` y `src/sections/EditorialHome.tsx` sustituye las decisiones de color, escala y movimiento de la versión inicial documentada abajo. El Master Brief y las condiciones de aprobación comercial siguen vigentes.

- Una sola familia activa en la interfaz: Manrope, alojada localmente con su licencia existente. Se elimina la precarga de la serif sin borrar los archivos originales.
- Base tinta `#131412`, carbón `#191a17`, hueso `#eeece5`, piedra `#e7e4dc`. Texto secundario oscuro `#55574f` sobre piedra; `#b5b3aa` sobre tinta. El verde permanece en el logo oficial.
- Retícula editorial 5:6 en portada; catálogo comparable de tres columnas en escritorio/tablet y una en móvil. Composiciones narrativas 7:3 y 6:4.
- Fotografías sin filtros ni zoom de hover; prendas completas con contain. La imagen vertical de Black Cherry tiene encuadre propio para equilibrar su escala.
- Controles rectos, enlaces subrayados, foco por currentColor, navegación estable y scroll nativo. Loader, Lenis y revelaciones generales dejan de montarse.
- Home: campaña → selección → Chromatic Black → detalle → identidad → acceso/servicio.
- Ver `EDITORIAL_REVIEW.md` y `artifacts/editorial-review/index.html` para la evidencia y las limitaciones de los recursos disponibles.

---

## Especificación inicial conservada como referencia histórica

Este documento define el contrato visual y de interacción de VHOXWRLD. La fuente de verdad de marca sigue siendo `VHOX_Master_Brief_v1.md`; este sistema traduce esa dirección a decisiones reutilizables para interfaz.

## 1. Principios de marca

VHOX debe sentirse como streetwear premium: oscuro, humano, editorial, preciso y monumental. El producto ocupa el centro; el movimiento y la tecnología solo facilitan su lectura.

- Concepto: **Movimiento Exclusivo**.
- Colección vigente: **DROP 001 — SIGNAL**.
- Idea visual: **Chromatic Black**. A distancia, negro; bajo la luz, el material revela profundidad y matices oscuros.
- El verde VHOX es un acento controlado, no un fondo dominante ni un efecto neón decorativo.
- El espacio negativo, la escala y la fotografía generan jerarquía. No se compensa contenido débil con ruido, partículas o animación excesiva.
- La interfaz nunca debe inventar disponibilidad, precio, materiales, escasez, reseñas o funciones comerciales.
- El logo oficial se utiliza sin redibujarlo, estirarlo, recortarlo ni añadirle símbolos.

## 2. Tokens de color

Los tokens implementados en `src/styles/base.css` son la fuente operativa:

| Rol | Token | Valor | Uso |
| --- | --- | --- | --- |
| Negro principal | `--color-black` | `#070706` | Fondo de página y superficies de máxima profundidad |
| Tinta | `--color-ink` | `#0c0c0b` | Secciones y paneles sutilmente diferenciados |
| Carbón | `--color-carbon` | `#151513` | Controles, tarjetas y estados elevados |
| Acero | `--color-steel` | `#2b2b29` | Separadores fuertes y superficies secundarias |
| Plata | `--color-silver` | `#9b9891` | Texto secundario legible |
| Blanco hueso | `--color-white` | `#f1eee7` | Texto principal y controles de alto contraste |
| Papel | `--color-paper` | `#e9e5dc` | Superficies editoriales claras puntuales |
| Verde VHOX | `--vhox-accent` / `--color-accent` | `#7cff00` | CTA primario, foco, selección y énfasis de marca |
| Éxito | `--color-success` | `#7cff00` | Confirmaciones reales |
| Advertencia | `--color-warning` | `#d7b86a` | Estados que requieren atención |
| Error | `--color-danger` | `#df786f` | Errores y acciones destructivas |
| Superficie base | `--surface-base` | `var(--color-black)` | Fondo raíz |
| Superficie elevada | `--surface-raised` | `var(--color-ink)` | Paneles y estados elevados |
| Superficie inversa | `--surface-inverse` | `var(--color-paper)` | Bloques editoriales claros |
| Línea | `--line` | `rgba(241, 241, 234, 0.18)` | Divisores y bordes pasivos |
| Línea fuerte | `--line-strong` | `rgba(241, 241, 234, 0.4)` | Hover, selección y separadores de mayor jerarquía |

Reglas:

- El fondo por defecto es negro. `ink` y `carbon` crean profundidad sin degradados coloridos.
- El texto funcional pequeño usa `white` o `silver`; tonos más tenues se reservan para decoración o texto grande, nunca para información crítica.
- El verde VHOX se limita a la acción principal, estados de foco, selección y microacentos. No debe cubrir grandes áreas ni simular luz artificial sobre el producto.
- El blanco hueso evita un contraste óptico agresivo sin perder legibilidad.
- No depender solo del color para comunicar estado: acompañar con texto, icono y atributos accesibles.

## 3. Tipografía

### Familias

- `--font-display`, `--font-body` y `--font-mono`: **Manrope**, con Helvetica Neue, Arial y sans-serif como fallback. Es la voz funcional, directa y contemporánea.
- `--font-editorial`: **Cormorant Garamond**, con Georgia y serif como fallback. Se usa de manera selectiva para contraste editorial, citas de manifiesto o detalles de campaña; no para navegación ni datos de producto.

### Escala fluida

| Rol | Token | Escala |
| --- | --- | --- |
| Hero | `--type-hero` | `clamp(4rem, 9.2vw, 10.75rem)` |
| Display XL | `--type-display-xl` | `clamp(3.6rem, 7.4vw, 8.25rem)` |
| Display L | `--type-display-lg` | `clamp(2.8rem, 5.1vw, 5.75rem)` |
| Display M | `--type-display-md` | `clamp(2.2rem, 3.5vw, 3.9rem)` |
| Título S | `--type-title-sm` | `clamp(1.5rem, 2.4vw, 2.5rem)` |
| Cuerpo L | `--type-body-lg` | `clamp(1.0625rem, 1.2vw, 1.25rem)` |
| Cuerpo M | `--type-body-md` | `clamp(0.9375rem, 0.9vw, 1.0625rem)` |
| Cuerpo pequeño | `--type-body-sm` | `clamp(0.8125rem, 0.78vw, 0.9375rem)` |
| Etiqueta XS | `--type-label-xs` | `clamp(0.625rem, 0.58vw, 0.6875rem)` |
| Etiqueta S | `--type-label-sm` | `clamp(0.6875rem, 0.65vw, 0.75rem)` |

Reglas:

- Cada página tiene un solo `h1`; los niveles siguientes conservan orden semántico aunque el tamaño visual difiera.
- Los titulares usan `text-wrap: balance`; el cuerpo usa `text-wrap: pretty`.
- Las etiquetas en mayúsculas pueden ampliar el tracking entre `0.08em` y `0.18em`, pero no deben bajar de `--type-label-xs`.
- Textos esenciales —precio, disponibilidad, talla, entrega, errores y CTA— no usan opacidad decorativa ni tamaños inferiores a 12 px.
- Los titulares monumentales deben usar `clamp()`, `max-inline-size`, `overflow-wrap` cuando corresponda y pruebas a 320 px para impedir recortes o scroll horizontal.
- La lectura de párrafos se limita aproximadamente a 55–70 caracteres por línea, con `line-height` entre 1.5 y 1.7.

## 4. Cuadrícula y espaciado

### Tokens

| Token | Valor |
| --- | --- |
| `--page-x` | `clamp(1.25rem, 3.4vw, 4.5rem)` |
| `--content-max` | `100rem` |
| `--header-height` | `5.25rem`; `4.5rem` bajo 48 rem |
| `--space-1` | `0.5rem` |
| `--space-2` | `0.75rem` |
| `--space-3` | `1rem` |
| `--space-4` | `1.5rem` |
| `--space-5` | `2rem` |
| `--space-6` | `3rem` |
| `--control-min-height` | `2.75rem` |
| `--measure-copy` | `42rem` |

- El contenido se centra con `max-inline-size: var(--content-max)` y mantiene `var(--page-x)` a ambos lados.
- Las secciones usan respiración vertical amplia: `clamp(6rem, 11vw, 10rem)`; en móvil, aproximadamente `5.5rem`.
- La cuadrícula recomendada es de 4 columnas en móvil, 8 en tablet y 12 en escritorio, con gutters basados en `--space-3` a `--space-5`.
- Alineaciones editoriales pueden ser asimétricas, pero deben compartir líneas de inicio y terminar dentro del contenedor.
- Todo hijo de grid o flex susceptible de desbordarse debe declarar `min-width: 0`.
- El viewport de 320 px es el mínimo funcional. Ninguna sección debe producir scroll horizontal.

## 5. Bordes, radios, opacidad y superficies

- `--radius-control: 0` y `--radius-media: 0`: la geometría VHOX es deliberadamente recta y editorial.
- Usar bordes de 1 px con `--line`; elevar a `--line-strong` en hover, selección o foco complementario.
- La jerarquía se resuelve con tono, borde y espacio, no con sombras de tarjeta genéricas.
- Los overlays pueden utilizar negro con opacidad, pero nunca deben reducir el contraste del contenido por debajo de AA.
- El grano global es ambiental y muy tenue. No debe contaminar fotografía de producto, texto ni controles.
- Si una superficie clara usa `--color-paper`, todo su contenido cambia a `--color-black` o un tono oscuro verificado.

## 6. Botones y enlaces

### Variantes

1. **Primario:** fondo `--color-accent`, texto `--color-black`, borde del mismo color.
2. **Secundario:** fondo transparente, texto `--color-white`, borde `--line-strong`.
3. **Tercero/editorial:** enlace textual con subrayado, flecha o desplazamiento de línea; no simula un botón sin necesidad.
4. **Destructivo:** `--color-danger`, reservado para eliminar o descartar.

### Estados

- **Default:** jerarquía inequívoca; solo una acción primaria por bloque.
- **Hover:** transición de color/borde o desplazamiento máximo de 2 px. No depender de hover en touch.
- **Active:** respuesta inmediata por escala sutil (`0.98`) o cambio de superficie.
- **Focus:** `outline: 2px solid var(--color-accent)` con `outline-offset: 4px`; nunca se elimina sin reemplazo equivalente.
- **Disabled:** mantiene legibilidad, indica el motivo en texto y usa `disabled`/`aria-disabled`. No debe parecer una acción disponible.
- **Loading:** conserva ancho y etiqueta accesible, expone `aria-busy` y evita doble envío.

Todos los objetivos táctiles deben medir al menos 44 × 44 px. Los enlaces externos abiertos en otra pestaña usan `rel="noopener noreferrer"` y deben anunciar el contexto cuando resulte relevante.

## 7. Tarjetas y contenedores de imagen

### Tarjeta de producto

- Fotografía primero; después nombre confirmado, categoría/estado y precio solo cuando esté confirmado.
- La tarjeta no inventa badges de escasez, descuentos, materiales o disponibilidad.
- Toda la tarjeta puede ser enlace si mantiene un nombre accesible único; acciones secundarias no deben anidarse dentro del enlace.
- Hover: zoom óptico muy moderado o cambio a segunda imagen real. En touch, la información permanece disponible sin hover.
- Las alturas de datos se estabilizan para evitar saltos entre tarjetas.

### Fotografía de producto

- Usar `object-fit: contain` o un encuadre específico que muestre cuello, mangas, bajo, visera y demás partes esenciales.
- Definir `width`, `height` o `aspect-ratio` para evitar layout shift.
- `object-position` se ajusta por asset, no se corrige estirando la imagen.
- Galerías incluyen texto alternativo real, miniatura seleccionada, controles de teclado y estado de carga/error.

### Imagen editorial

- Puede usar `object-fit: cover` cuando el recorte preserve el sujeto y la intención.
- El punto focal se define mediante `object-position` por imagen y se valida en móvil, tablet y escritorio.
- La primera imagen crea deseo; las siguientes demuestran silueta, textura, construcción y detalle.
- No usar material generado o conceptual como prueba factual del producto.

## 8. Formularios

- Cada campo tiene `label` persistente; el placeholder no sustituye a la etiqueta.
- Controles con altura mínima de 44 px, superficie `--color-ink` o transparente, texto `--color-white` y borde `--line`.
- Hover y focus incrementan el borde; `:focus-visible` conserva el outline global.
- Mensajes de ayuda se asocian mediante `aria-describedby`.
- Validación ocurre al enviar o después de interacción, no mientras el usuario aún escribe el primer carácter.
- Error: mensaje específico junto al campo y resumen cuando haya varios errores. Éxito: confirmación explícita y siguiente paso.
- Estados de envío bloquean duplicados y conservan lo escrito ante un error recuperable.
- Formularios conectados a correo o APIs deben mostrar un fallback honesto si el servicio no está disponible.

## 9. Navegación

- El header prioriza logo oficial, acceso a colección y apertura de menú; evita mensajes promocionales redundantes.
- En scroll puede reducir presencia, pero reaparece de manera predecible al desplazarse hacia arriba y nunca oculta el foco del teclado.
- El menú móvil funciona como diálogo: bloqueo de scroll, foco inicial, ciclo de foco, cierre por botón, enlace, `Escape` y click exterior cuando sea seguro.
- El estado se expone con `aria-expanded`, `aria-controls` y un nombre accesible que cambia entre abrir/cerrar.
- El menú debe admitir overflow vertical en landscape y respetar safe areas.
- La ubicación actual utiliza `aria-current="page"`.
- La bolsa se muestra como función real o estado de preparación claramente explicado; no aparenta checkout si no existe integración.

## 10. Modales, carrito y selectores

### Modales

- Usar semántica `dialog`, `aria-modal="true"`, título asociado, foco atrapado y restauración al disparador al cerrar.
- Cerrar con `Escape` y botón visible. El backdrop no es el único mecanismo de cierre.
- El contenido puede desplazarse sin desplazar el documento de fondo.

### Carrito

- Estados mínimos: vacío, producto válido, producto no disponible, actualizando, error y listo.
- Cantidad, subtotal y eliminación se anuncian con regiones live moderadas.
- El subtotal se calcula a partir de datos confirmados; no se simulan impuestos, entrega, pagos ni inventario.
- Si no hay productos comprables, el CTA explica el estado y dirige a colección o acceso anticipado.
- La persistencia local no almacena datos sensibles.

### Talla, variante y cantidad

- Usar controles nativos o patrones radio/listbox accesibles; la selección nunca depende únicamente del color.
- Tallas no disponibles tienen `disabled` y explicación, no desaparecen sin contexto.
- Ningún selector preselecciona una variante que pueda provocar una compra accidental.
- La guía de tallas se abre como diálogo o panel accesible y usa unidades claras.

## 11. Acordeones, tablas y contenido estructurado

- Acordeones usan `button` dentro del encabezado, `aria-expanded`, `aria-controls` y panel asociado.
- El contenido sigue disponible con JavaScript básico o presenta un fallback legible.
- Tablas se reservan para datos comparables, como medidas; incluyen `caption`, encabezados `th` y lectura horizontal controlada en móvil.
- En móvil, una tabla puede desplazarse dentro de su propio contenedor, nunca ampliar el viewport completo.
- Políticas, cuidados y entrega se organizan en bloques breves y verificables, no en texto legal inventado.

## 12. Estados de sistema

- **Vacío:** explica qué falta y ofrece una acción útil.
- **Carga:** skeleton o indicador estable, sin parpadeo ni layout shift; informar con `aria-busy`.
- **Error:** lenguaje directo, causa recuperable cuando se conoce y opción de reintentar. Usar `--color-danger` con icono/texto.
- **Advertencia:** usa `--color-warning` para decisiones que requieren atención, sin urgencia artificial.
- **Éxito:** confirma la acción real con `--color-success` y anuncia mediante `role="status"` cuando corresponda.
- **No disponible / por confirmar:** lenguaje neutral y explícito. No se presenta como “agotado” si nunca estuvo a la venta.

## 13. Breakpoints y comportamiento responsive

Los breakpoints se definen por necesidad del contenido, no por un dispositivo específico:

| Rango de referencia | Objetivo |
| --- | --- |
| 320–479 px | Móvil compacto; una columna, controles táctiles, titulares contenidos |
| 480–767 px | Móvil amplio y landscape; revisar altura disponible y menú desplazable |
| 768–1023 px | Tablet; 8 columnas y composiciones de una o dos columnas |
| 1024–1439 px | Escritorio; 12 columnas y mayor espacio negativo |
| 1440 px o más | Escritorio amplio; respetar `--content-max`, no estirar contenido indefinidamente |

Reglas:

- El breakpoint activo de header/sección en la base actual es 48 rem.
- Validar al menos 320, 390–430, 768, 1024 y 1440 px, además de landscape móvil.
- Reordenar contenido cuando la lectura lo requiera; no reducir tipografía hasta volverla ilegible.
- Evitar alturas fijas para contenido textual y usar `min-height` solo cuando la composición lo justifique.
- Considerar `env(safe-area-inset-*)` en navegación, menú, drawers y CTA fijos.
- Imágenes, video y SVG nunca exceden su contenedor.

## 14. Movimiento

Tokens implementados:

| Rol | Token | Valor |
| --- | --- | --- |
| Salida expresiva | `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Transición estándar | `--ease-standard` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Rápida | `--duration-fast` | `180ms` |
| Base | `--duration-base` | `360ms` |
| Lenta | `--duration-slow` | `760ms` |

- `180ms`: hover, focus, iconos y feedback inmediato.
- `360ms`: paneles, filtros, cambios de imagen y estados de controles.
- `760ms`: revelados editoriales puntuales; no para acciones necesarias para comprar.
- Animar principalmente `transform` y `opacity`; evitar propiedades que provoquen layout continuo.
- El scroll conserva control nativo. No se ralentiza ni se bloquea para imponer una narrativa.
- El producto debe permanecer identificable durante la animación.
- `prefers-reduced-motion: reduce` elimina revelados, parallax, smooth scroll y transiciones no esenciales; el contenido aparece completo y usable.
- No usar autoplay con audio ni loops intensos. El video decorativo se pausa cuando no está visible y tiene fallback.

## 15. Accesibilidad WCAG AA

- Contraste mínimo: 4.5:1 para texto normal y 3:1 para texto grande y componentes gráficos esenciales.
- El verde VHOX sobre negro puede usarse para texto y foco; negro sobre verde para CTA primario. Cada combinación nueva debe verificarse antes de adoptarse.
- `--color-silver` es el mínimo recomendado para texto secundario pequeño sobre fondos negros. Opacidades menores se reservan para decoración no esencial.
- Orden de tabulación igual al orden visual y del DOM.
- Todas las funciones están disponibles mediante teclado; el hover nunca contiene información exclusiva.
- El foco visible global no se elimina. En superficies verdes se proporciona un foco oscuro equivalente si el verde deja de contrastar.
- Imágenes informativas tienen `alt` específico; imágenes decorativas usan `alt=""`.
- Iconos interactivos tienen nombre accesible; SVG decorativos se ocultan de tecnologías de asistencia.
- Los cambios asincrónicos relevantes se anuncian sin interrumpir mediante `aria-live` o `role="status"`.
- La estructura usa landmarks (`header`, `nav`, `main`, `footer`) y existe un skip link funcional.
- Zoom al 200 % y tamaño de texto aumentado no deben ocultar contenido ni acciones.

## 16. Criterios de aceptación visual

Antes de aprobar un componente o página:

1. Comunica producto, drop y acción siguiente sin lenguaje tecnológico o claims inventados.
2. Usa tokens; no introduce colores, tamaños o duraciones arbitrarios sin documentarlos.
3. Mantiene contraste AA, foco visible y operación completa con teclado.
4. No genera scroll horizontal desde 320 px hasta escritorio amplio.
5. La fotografía de producto aparece completa; el recorte editorial conserva el sujeto.
6. Funciona sin hover y con `prefers-reduced-motion`.
7. Incluye estados vacío, carga, error, éxito y no disponible cuando aplican.
8. No simula compra, inventario, precio, envío ni escasez.
9. No deforma ni reinterpreta el logo oficial.
10. Se valida en móvil, landscape, tablet y escritorio antes de fusionarse.
# Ampliación de prendas — 19 de septiembre de 2026

Las historias de prendas y VHOX Premium utilizan títulos directos, fotografías completas y vistas seleccionables. La composición alterna dos columnas con un desplazamiento moderado en escritorio y una sola columna en móvil. Premium combina paisaje y retrato sobre piedra clara. Sin códigos de sección, números ornamentales ni etiquetas repetidas encima de los títulos. Los nombres SIGNAL e identificadores comerciales internos se conservan.

Las imágenes nuevas son propuestas visuales, separadas del catálogo comprable. Se conserva el archivo original y se sirve WebP adaptativo. Las ampliaciones admiten teclado, Escape y retorno del foco; no hay animaciones automáticas. Los estados de producto y notas que ayudan a comprender disponibilidad siguen visibles.
