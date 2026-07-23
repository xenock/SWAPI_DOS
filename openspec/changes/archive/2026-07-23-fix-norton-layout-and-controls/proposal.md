## Por qué

La primera versión de `SWAPI_DOS` estableció la estructura visual básica, pero carecía de interactividad real en varias teclas de función (`F2`, `F3`, `F10`), no contaba con personalización de temas retro, las relaciones entre entidades no permitían navegación con un clic, y los componentes de la interfaz no tenían cobertura de pruebas automatizadas.

## Qué cambia

- **Comportamiento F-Keys**:
  - `F2`: Enfocar automáticamente el cursor de entrada en la consola de comandos (`C:\SWAPI>`).
  - `F3`: Alternar cíclicamente las pestañas del panel derecho de inspección (General ➔ Estadísticas ➔ Raw JSON).
  - `F10`: Mostrar una pantalla/modal de apagado de sistema retro estilo DOS ("It is now safe to turn off your computer").
- **Sistema de Temas Retro**:
  - Incorporar selector de temas visuales (Azul DOS Imperial, Verde Fósforo Rebelde, Rojo Alarma Sith, Ámbar Terminal).
- **Navegación Cruzada de Entidades**:
  - Transformar referencias de la API (planetas natales, películas, naves) en enlaces interactivos que naveguen y carguen automáticamente el registro correspondiente.
- **Cobertura de Pruebas UI**:
  - Integrar `@testing-library/preact` y `jsdom` para pruebas unitarias e interactivas de componentes de interfaz.

## Capacidades

### Nuevas Capacidades
- `ui-testing`: Pruebas de componentes de interfaz Preact automatizadas mediante `@testing-library/preact` y Vitest.

### Capacidades Modificadas
- `swapi-dos-app`: Reorganizar atajos de teclas de función (F2, F3, F10), añadir navegación cruzada interactiva entre entidades y selector de temas retro.

## Impacto

- Archivos afectados: `src/components/StatusBar.tsx`, `src/components/RightPane.tsx`, `src/components/CommandPrompt.tsx`, `src/components/Navbar.tsx`, `src/App.tsx`, `src/styles.css`.
- Nuevas dependencias de desarrollo: `@testing-library/preact`.
