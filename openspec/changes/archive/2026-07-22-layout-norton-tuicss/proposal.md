## Por qué

El conjunto de datos de la API de Star Wars (SWAPI) es rico en lore, pero las interfaces web estándar suelen presentarla en diseños modernos genéricos. Crear `SWAPI_DOS` con una estética clásica de panel doble estilo MS-DOS Norton Commander de los años 90 impulsada por TuiCss, Preact y TypeScript ofrece una experiencia inmersiva e interactiva de la base de datos de Star Wars (Datapad Imperial / Archivos Jedi).

## Qué cambia

- Implementar una aplicación web de una sola página (SPA) con Preact y TypeScript presentando un diseño visual de dos paneles estilo MS-DOS Norton Commander utilizando TuiCss.
- Incluir una barra de menú de navegación superior retro (Archivo, Vistas, Base de Datos, Buscar, Audio, Ayuda) y una barra de estado de teclas de función en la parte inferior (`F1` a `F10`).
- Panel Izquierdo: Lista de directorios y archivos que muestra las categorías y entidades de Star Wars formateadas como archivos `.DAT` (`001_LUKE_SKYWALKER.DAT`, `TATOOINE.DAT`, `X-WING.DAT`).
- Panel Derecho: Inspector de detalles que muestra los atributos de las entidades seleccionadas con pestañas TuiCss, barras de estadísticas y enlaces cruzados.
- Consola de Comandos: Barra de entrada interactiva CLI (`C:\SWAPI>`) para filtrado rápido y ejecución de comandos de terminal retro.
- Cliente SWAPI en TypeScript: Capa de consumo de datos asíncrona compatible con todos los endpoints de SWAPI, con almacenamiento en caché local y manejo de espejos API de respaldo (failover).
- Efectos de Sonido Retro: Sintetizador Web Audio API que genera retroalimentación de beeps de altavoz PC de 8 bits para clics, navegación por menús y eventos de carga.

## Capacidades

### Nuevas Capacidades
- `swapi-dos-app`: Diseño UI de panel doble estilo MS-DOS Norton Commander construido con Preact + TypeScript y TuiCss, menú de navegación retro, barra de estado de teclas de función y consola CLI.
- `swapi-client`: Cliente REST para Star Wars API escrito en TypeScript con caché en memoria, espejos de reserva y tipado fuerte.
- `audio-effects`: Sintetizador de sonido de altavoz PC de 8 bits con Web Audio API para retroalimentación auditiva.

### Capacidades Modificadas
*(Ninguna - implementación inicial)*

## Impacto

- Stack Frontend: HTML5, Preact, TypeScript, Vite, CSS Vanilla con integración de TuiCss.
- Dependencias Externas: Librería TuiCss, SWAPI REST API (`swapi.dev` / `swapi.py4e.com`).
- Requisitos de Navegador: Navegadores modernos compatibles con Web Audio API, Flexbox/Grid y ES Modules.
