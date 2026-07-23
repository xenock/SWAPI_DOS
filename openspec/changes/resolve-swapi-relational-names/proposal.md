## Por qué

Actualmente los enlaces relacionales de la Holonet en el panel derecho de inspección muestran nombres genéricos derivados del patrón de URL (ejemplo: `[VER PLANETS #1]` o `[VER FILMS #1]`). Resolver asíncronamente las URLs para mostrar los títulos y nombres reales de las entidades (ej. `[Tatooine]`, `[A New Hope]`) mejorará significativamente la legibilidad, usabilidad y experiencia inmersiva del sistema SWAPI_DOS.

## Qué cambia

- **Resolución Asíncrona de Nombres Relacionales**:
  - Actualizar `RightPane.tsx` para consultar y resolver los nombres reales de todas las URLs relacionales presentes en la entidad inspeccionada.
  - Renderizar botones/enlaces interactivos con los nombres legibles (ej: `[Tatooine]` en lugar de `[VER PLANETS #1]`).
- **Aprovechamiento de Caché en `localStorage`**:
  - Reutilizar `swapiClient.getEntityByUrl(url)` para servir instantáneamente los nombres desde `localStorage` sin penalización de red.
- **Actualización de Suites de Pruebas de Componentes**:
  - Actualizar `RightPane.test.tsx` para verificar la resolución y renderizado de los nombres reales de las entidades en lugar de etiquetas genéricas.

## Capacidades

### Nuevas Capacidades
*(Ninguna)*

### Capacidades Modificadas
- `swapi-dos-app`: Reemplazar las etiquetas genéricas de URLs relacionales por la resolución asíncrona de nombres y títulos reales de las entidades SWAPI.

## Impacto

- Archivos afectados: `src/components/RightPane.tsx`, `src/components/RightPane.test.tsx`.
