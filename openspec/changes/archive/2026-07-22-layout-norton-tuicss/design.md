## Contexto

`SWAPI_DOS` es una aplicación web diseñada para revivir la base de datos de Star Wars API (SWAPI) con el estilo visual clásico de MS-DOS Norton Commander de los años 90 utilizando TuiCss. 
La aplicación requiere ofrecer la sensación de una terminal de computadora retro (Datapad Imperial / Archivos Jedi) con alto rendimiento, interacciones fluidas, un diseño responsive de dos paneles, efectos de sonido vintage y pruebas automáticas ultrarrápidas con Vitest.

## Objetivos / No Objetivos

**Objetivos:**
- Proporcionar una interfaz estructurada en Preact y TypeScript con layout de dos paneles (Izquierda: Lista de Archivos, Derecha: Inspector de Registros) estilizado con TuiCss (`tui-window`, `tui-panel`, `tui-fieldset`, `tui-button`, `tui-tabs`, `tui-progress`).
- Soportar una barra de menú desplegable superior (Archivo, Vistas, Base de Datos, Buscar, Audio, Ayuda) y una barra inferior de teclas de función (`F1`-`F10`).
- Construir un cliente asíncrono SWAPI en TypeScript con almacenamiento en caché local (`Map`) y espejos de respaldo (`swapi.dev`, `swapi.py4e.com`).
- Incorporar una consola de entrada de comandos interactiva (`C:\SWAPI>`) capaz de procesar búsquedas y comandos de navegación.
- Sintetizar efectos de sonido de altavoz PC de 8 bits mediante Web Audio API para navegación, errores y eventos de carga.
- Configurar **Vitest** para ejecutar suites de prueba unitarias e integración en consola de forma instantánea y ligera.

**No Objetivos:**
- Implementar un servidor backend personalizado (toda la lógica se ejecuta del lado del cliente en el navegador).
- Sistema de autenticación de usuarios (acceso público a la base de datos).

## Decisiones Técnicas

### 1. Seleccion de Stack: Preact + TypeScript + Vite + Vitest + TuiCss
- **Decisión**: Usar Preact con TypeScript empaquetado mediante Vite, utilizando **Vitest** como framework de pruebas unitarias ultrarrápido y TuiCss para la capa visual.
- **Justificación**: Vitest comparte la misma configuración de transformadores que Vite, ejecutando pruebas en milisegundos sin sobrecarga de tokens ni compilaciones lentas.

### 2. Arquitectura del Diseño Dual-Pane Norton Commander
- **Decisión**: Contenedor Flexbox dividido 50/50 con componentes Preact para cada panel.
- **Panel Izquierdo**: Renderizado dinámico de entidades formateadas como archivos `.DAT` con paginación.
- **Panel Derecho**: Panel inspector con pestañas para mostrar atributos, estadísticas y barras de progreso.

### 3. Estrategia de Caché y Resiliencia de la API
- **Decisión**: Caché en memoria `Map<string, unknown>` con clave por URL/endpoint y conmutación automática de espejos (`swapi.dev` -> `swapi.py4e.com/api/`).
- **Justificación**: Garantiza respuesta instantánea al navegar repetidamente entre registros sin saturar la API externa.

### 4. Síntesis de Sonido con Web Audio API
- **Decisión**: Módulo TypeScript con oscilador de onda cuadrada (`square wave`) y barridos rápidos de frecuencia para recrear el sonido característico del altavoz PC.

## Riesgos / Limitaciones

- **[Disponibilidad / CORS de SWAPI]** → *Mitigación*: Lista de URLs espejo y datos mock locales de respaldo si no hay conexión a internet.
- **[Adaptabilidad Móvil de TuiCss]** → *Mitigación*: Botón para alternar visibilidad entre el panel izquierdo y derecho en pantallas estrechas sin perder la estética DOS.
