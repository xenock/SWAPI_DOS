## Por qué

Actualmente el servicio `SwapiClient` almacena la respuesta de los endpoints únicamente en la memoria RAM del navegador (`Map`). Si el usuario recarga la página (`F5`) o la abre en una nueva sesión, se deben realizar de nuevo peticiones HTTP a la red. Además, para enriquecer la estética retro estilo disquete/módem de los 90, se desea preservar un retardo y efecto visual/auditivo controlado ("CARGANDO HOLONET...") incluso al servir los datos instantáneamente desde el almacenamiento local, y ofrecer una opción de purga manual de caché desde el modal F10 o consola CLI.

## Qué cambia

- **Caché Persistente en Navegador**:
  - Actualizar `SwapiClient` para almacenar y recuperar respuestas JSON desde `localStorage`.
  - Si la entrada existe en `localStorage`, evitar cualquier llamada HTTP de red.
- **Simulación de Retardo Retro (Vintage Disk Loading)**:
  - Añadir un pequeño retardo controlado (~150ms-250ms) con feedback visual ("CARGANDO HOLONET...") y sonido de lectura para preservar la inmersión en la estética retro MS-DOS.
- **Purga de Caché Manual (F10 & CLI)**:
  - Añadir botón de purga de caché en el modal F10 ("PURGAR CACHÉ HOLONET") y soportar el comando CLI `CLEAR CACHE` o `PURGE`.

## Capacidades

### Nuevas Capacidades
*(Ninguna)*

### Capacidades Modificadas
- `swapi-client`: Añadir persistencia de caché mediante `localStorage`, simulación de retardo de lectura retro y purga manual desde F10/CLI.

## Impacto

- Archivos afectados: `src/services/swapi.ts`, `src/services/swapi.test.ts`, `src/App.tsx`, `src/components/CommandPrompt.tsx`.
