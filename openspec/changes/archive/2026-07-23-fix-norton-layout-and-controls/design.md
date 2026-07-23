## Contexto

Tras la versión inicial de `SWAPI_DOS`, se identificaron áreas de mejora en la experiencia de usuario y robustez:
1. Las teclas de función `F2`, `F3` y `F10` carecían de acciones interactivas reales.
2. No existía la posibilidad de alternar entre temas cromáticos retro.
3. Las referencias entre registros de la API (planeta natal, películas) se mostraban como texto simple sin enlaces clicables.
4. Faltaban pruebas automatizadas de componentes visuales UI.

## Objetivos / No Objetivos

**Objetivos:**
- Mapear acciones reales a `F2` (focus consola), `F3` (ciclo de pestañas inspector) y `F10` (pantalla modal de apagado DOS).
- Implementar un selector de temas en `styles.css` controlado por CSS Variables (`--dos-bg`, `--dos-text`, `--dos-primary`, `--dos-highlight`) con soporte para temas: Imperial (Azul), Rebel (Verde CRT), Sith (Rojo), Amber (Ámbar).
- Hacer clicables las referencias relacionales (ej. planeta natal o películas) para resolver automáticamente la entidad y navegar al registro en el panel.
- Integrar `@testing-library/preact` y escribir pruebas de componentes en `src/components/*.test.tsx`.

**No Objetivos:**
- Modificar la estructura del backend de SWAPI (mantenemos la capa de clientes y caché en memoria existente).

## Decisiones Técnicas

### 1. Sistema de Temas por CSS Variables
- **Decisión**: Reemplazar colores fijos en `styles.css` por variables CSS dinámicas aplicadas en el contenedor raíz `[data-theme="imperial|rebel|sith|amber"]`.
- **Justificación**: Permite alternar de tema instantáneamente sin recargar la aplicación ni re-renderizar componentes pesados.

### 2. Atajos Globales de Teclas F-Keys
- **Decisión**: Manejar listeners de eventos `keydown` en `App.tsx` y utilizar referencias `useRef` para enfocar el elemento de entrada de la consola cuando se presione `F2`.

### 3. Navegación Cruzada de Recursos SWAPI
- **Decisión**: Al hacer clic en una propiedad con URL de SWAPI (ej: `homeworld: https://swapi.dev/api/planets/1/`), extraer la categoría y el ID para realizar una búsqueda/fetch directo y seleccionar el objeto en la UI.

### 4. Pruebas de Componentes con `@testing-library/preact`
- **Decisión**: Usar `@testing-library/preact` ejecutado con Vitest en entorno `jsdom` para simular eventos de teclado y clics.

## Riesgos / Limitaciones

- **[Dependencia de URLs de SWAPI en enlaces cruzados]** → *Mitigación*: Parsear rutas relativas mediante expresiones regulares para soportar URLs de espejos (`swapi.dev` o `swapi.py4e.com`).
