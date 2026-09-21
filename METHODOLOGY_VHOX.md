AÑADE ESTA METODOLOGÍA AL PROYECTO VHOXWRLD

Estas instrucciones complementan todo el brief, el diseño premium, el sistema SEO y los requisitos anteriores. No sustituyen las decisiones ya aprobadas.

FUENTE ÚNICA DE VERDAD

El documento `VHOX_Master_Brief_v1` es la fuente principal de decisiones del proyecto.

Debes preservar:

* Marca: VHOX.
* Concepto: Movimiento Exclusivo.
* Dirección: streetwear premium, oscuro, editorial y monumental.
* Mensaje: VHOX vende identidad, material, ajuste, detalle y pertenencia.
* Paleta principal: negro, blanco y verde VHOX como acento controlado.
* Logo oficial: emblema del murciélago VHOX.
* DROP 001: SIGNAL.
* Productos actualmente planteados: SIGNAL CORE TEE, NIGHT BLOOM TEE y CRYSTAL SIGNAL TEE.
* La tecnología y las animaciones deben apoyar el producto, no distraer de él.
* En cinco segundos debe entenderse qué vende VHOX, cuál es el drop vigente y cómo comprar.

No utilices “personalizamos prendas”. Utiliza “MOVIMIENTO EXCLUSIVO”.

FLUJO OBLIGATORIO DE CINCO CAPAS

No saltes directamente a modificar componentes. Trabaja en este orden:

1. Arquitectura del sistema.
2. Arquitectura visual.
3. Arquitectura de copy y conversión.
4. Ingeniería de interacciones.
5. Traducción a implementación.

FASE 1 — ARQUITECTO DEL SISTEMA

Antes de editar, actúa como arquitecto senior de plataformas de e-commerce.

Inspecciona el repositorio y entrega:

* Mapa completo del sitio.
* Jerarquía de páginas.
* Rutas existentes.
* Componentes reutilizables.
* Assets disponibles.
* Dependencias y versiones.
* Arquitectura de información.
* Flujo de datos.
* Estado del carrito y checkout.
* Integraciones.
* Hardcodes.
* Errores existentes.
* Problemas responsive.
* Riesgos de rendimiento y accesibilidad.
* Estado del SEO técnico.
* Necesidades reales de autenticación, CMS, API y base de datos.
* Tres rutas críticas del usuario desde la entrada hasta la conversión.
* Plan de implementación dividido en fases pequeñas y verificables.

Crea o actualiza `AUDIT_VHOX.md`.

No rediseñes ni modifiques producción durante esta fase.

El stack declarado utiliza Next.js 15, React 19, Node 20 y npm. Confirma el stack real antes de tomar decisiones y no cambies de framework sin una justificación técnica imprescindible.

FASE 2 — ARQUITECTO DEL SISTEMA VISUAL

Actúa como director global de diseño y convierte la identidad VHOX en un sistema escalable.

Define:

* Tokens de color primarios, secundarios, neutros y semánticos.
* Variables CSS.
* Tipografía display y tipografía funcional.
* Escala tipográfica fluida.
* Cuadrícula y sistema de espaciado.
* Radios, bordes, opacidades y superficies.
* Sistema de botones.
* Estados hover, active, focus, disabled y loading.
* Tarjetas de producto.
* Contenedores de imágenes editoriales.
* Contenedores de fotografía de producto.
* Formularios.
* Navegación.
* Modales.
* Carrito.
* Selectores de tallas.
* Acordeones.
* Tablas.
* Mensajes de error y confirmación.
* Breakpoints y comportamiento responsive.
* Principios de movimiento.
* Duraciones y curvas de transición.
* Cumplimiento WCAG AA.
* Contraste y navegación mediante teclado.

No crees más de 30 componentes únicamente para cumplir una cifra. Construye solo los componentes que tengan una función real y reutilizable.

Las imágenes editoriales pueden utilizar `object-fit: cover`; las imágenes de producto deben mostrar la prenda completa usando `contain`, encuadre específico u `object-position` individual.

No rediseñes el logo.

FASE 3 — ARQUITECTO DE COPY Y CONVERSIÓN

Actúa como estratega senior de conversión para una marca de streetwear premium.

El tono debe ser:

* Exclusivo.
* Seguro.
* Contundente.
* Editorial.
* Misterioso.
* Con autoridad.
* Minimalista.
* Sin sonar desesperado por vender.

Para cada página define:

* Objetivo.
* Audiencia.
* Intención de búsqueda.
* H1 único.
* Subtítulo.
* CTA principal.
* CTA secundario cuando sea necesario.
* Beneficios reales.
* Prueba de producto.
* Información que reduce dudas.
* FAQ.
* Navegación siguiente dentro del recorrido.

En producto debe responder claramente:

* Qué es.
* Cómo queda.
* De qué está hecho.
* Qué lo hace diferente.
* Cómo elegir talla.
* Cuándo se entrega.
* Cómo funcionan devoluciones.
* Si la edición es limitada.
* Cómo comprar.

No inventes:

* Testimonios.
* Ventas.
* Reseñas.
* Resultados cuantificables.
* Disponibilidad.
* Escasez.
* Precios.
* Fechas.
* Materiales no confirmados.
* Certificaciones.
* Políticas.
* Autoridad falsa.

La urgencia y exclusividad solo pueden utilizarse cuando sean reales.

La primera imagen debe crear deseo. Las imágenes posteriores deben demostrar silueta, material, textura, construcción y detalles.

FASE 4 — INGENIERO DE SISTEMAS DE INTERACCIÓN

Actúa como ingeniero frontend senior.

Para cada módulo interactivo define:

* Estados.
* Eventos.
* Flujo de datos.
* Validación.
* Loading.
* Empty state.
* Error state.
* Success state.
* Casos límite.
* Comportamiento con teclado.
* Accesibilidad.
* Comportamiento responsive.
* Integración con API o estado global.
* Persistencia necesaria.

Prioriza los módulos relevantes para VHOX:

* Navegación.
* Menú móvil.
* Hero cinematográfico.
* Selector de colección.
* Galería de producto.
* Selector de talla.
* Selector de variante.
* Cantidad.
* Añadir al carrito.
* Carrito lateral.
* Persistencia del carrito.
* Código promocional, solo si existe realmente.
* Cálculo de subtotal.
* Formularios.
* Inner Circle.
* Búsqueda y filtrado, únicamente cuando exista suficiente catálogo.
* Compartir producto.
* CTA fijo en móvil.
* Estados de inventario.
* Checkout o conexión con la solución comercial autorizada.

No implementes dashboards, calculadoras, autenticación o módulos complejos si VHOX todavía no los necesita.

No simules compras reales, inventario o pagos mediante botones que aparenten funcionar sin integración.

FASE 5 — TRADUCTOR DE ESPECIFICACIONES

Después de aprobar las cuatro fases anteriores, convierte la especificación en tareas pequeñas para Codex.

Cada tarea debe incluir:

1. Resultado esperado.
2. Archivos que probablemente serán afectados.
3. Componentes implicados.
4. Identidad visual que debe respetarse.
5. Comportamiento desktop.
6. Comportamiento tablet.
7. Comportamiento móvil.
8. Hover, click, scroll y transiciones.
9. Estados de carga, error, vacío y éxito.
10. Accesibilidad.
11. SEO relacionado.
12. Criterios de aceptación.
13. Pruebas necesarias.
14. Dependencias respecto a otras tareas.

Las tareas deben ser suficientemente pequeñas para poder revisarse, probarse y revertirse sin comprometer todo el proyecto.

Si se utiliza Figma Make, transforma cada especificación aprobada en prompts separados y precisos. Figma Make es una herramienta opcional de prototipado, no la fuente de verdad ni el sustituto del código del repositorio.

REGLA DE IMPLEMENTACIÓN

No mezcles auditoría, rediseño, copy, interacciones y despliegue en una sola modificación gigantesca.

Trabaja mediante esta secuencia:

* PR 1: auditoría.
* PR 2: arquitectura y design tokens.
* PR 3: estructura visual.
* PR 4: contenido y conversión.
* PR 5: funcionalidades e interacciones.
* PR 6: SEO técnico y datos estructurados.
* PR 7: rendimiento, accesibilidad y responsive.
* PR 8: validación final y preparación de despliegue.

No publiques, modifiques Hostinger, cambies el dominio, alteres secretos ni manipules producción sin autorización expresa.

VALIDACIÓN FINAL

Antes de considerar una fase terminada:

* Ejecuta lint.
* Ejecuta pruebas.
* Ejecuta el build.
* Revisa errores de consola.
* Comprueba enlaces.
* Prueba carrito y selector de tallas.
* Revisa formularios.
* Comprueba imágenes una por una.
* Revisa desktop, tablet y móvil.
* Verifica accesibilidad.
* Verifica Core Web Vitals.
* Comprueba metadatos, schemas, sitemap y robots.
* Confirma que el diseño sigue sintiéndose VHOX.
* Enumera los archivos modificados.
* Informa qué se completó, qué falta y qué requiere información de Carlos.

No declares terminada una función que solamente está representada visualmente.

El resultado debe ser un sistema real, escalable y coherente: arquitectura sólida, diseño premium, copy auténtico, interacciones funcionales y una implementación verificable.
