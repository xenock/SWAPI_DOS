## Contexto

Actualmente el componente `RightPane.tsx` analiza las URLs relacionales de SWAPI mediante una función `parseSwapiUrlLabel` que produce etiquetas genéricas como `[VER PLANETS #1]`. Queremos que el usuario vea los títulos y nombres reales (ej. `[Tatooine]`, `[A New Hope]`) resolviendo las entidades asíncronamente mediante `swapiClient.getEntityByUrl()`.

## Objetivos / No Objetivos

**Objetivos:**
- Implementar un estado o mapa `resolvedNames: Record<string, string>` en `RightPane.tsx` que se pueble mediante `useEffect` al seleccionar un registro.
- Consultar las URLs relacionales a través de `swapiClient.getEntityByUrl(url)` (la cual aprovecha `localStorage` y la caché en memoria).
- Mostrar el nombre real resuelto `[Nombre]` en los botones de enlace de la sección "ENLACES Y RELACIONES HOLONET".
- Actualizar `RightPane.test.tsx` para verificar que los nombres reales se resuelvan y rendericen.

**No Objetivos:**
- Reestructurar el backend de la API o alterar la lógica del cliente de red existente.

## Decisiones Técnicas

### 1. Resolución Asíncrona en RightPane
- **Decisión**: Utilizar `useEffect` en `RightPane` dependiente de `selectedEntry` para iterar sobre todas las URLs relacionales y llamar a `swapiClient.getEntityByUrl(url)`.
- **Justificación**: Como la mayoría de entidades ya están guardadas en `localStorage`, la resolución ocurre en milisegundos sin bloquear el renderizado principal del panel.

### 2. Formato Visual de los Enlaces
- **Decisión**: Renderizar `[name || title]` con la clase `.dos-link`. Mientras se resuelve, mostrar un estado de carga temporal como `[CARGANDO...]`.

## Riesgos / Limitaciones

- **[Peticiones simultáneas múltiples]** → *Mitigación*: Agrupar las llamadas con `Promise.all` para resolver todos los enlaces del registro en una sola ráfaga controlada.
