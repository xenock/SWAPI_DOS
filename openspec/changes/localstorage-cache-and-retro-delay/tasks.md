## 1. Implementación de Caché Persistente en localStorage

- [x] 1.1 Actualizar `SwapiClient` en `src/services/swapi.ts` para integrar lectura y escritura en `localStorage` con fallback a `Map`.
- [x] 1.2 Añadir método `clearCache()` para limpiar la caché de `localStorage` y en memoria.
- [x] 1.3 Agregar opción de purgar caché en modal F10 (`App.tsx`) y soportar el comando CLI `CLEAR CACHE` / `PURGE` en `CommandPrompt.tsx`.

## 2. Simulación de Retardo Retro de Lectura (Vintage Disk Delay)

- [x] 2.1 Implementar un retardo simulado de ~180ms con `setTimeout` en `SwapiClient` para mantener el efecto de carga retro `"CARGANDO HOLONET..."`.

## 3. Pruebas y Verificación

- [x] 3.1 Actualizar `src/services/swapi.test.ts` para probar que los datos persisten en `localStorage`, se recuperan correctamente y se borran con `clearCache()`.
- [x] 3.2 Ejecutar `npx vitest run` y `npx tsc --noEmit` para verificar que la suite completa de tests pase al 100%.
