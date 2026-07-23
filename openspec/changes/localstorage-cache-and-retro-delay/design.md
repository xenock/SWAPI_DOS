## Contexto

El cliente SWAPI almacena temporalmente las peticiones en un `Map` en memoria RAM. Al recargar la página o iniciar una nueva sesión, estas respuestas se pierden. Al mismo tiempo, se desea preservar el parpadeo (*flicker*) retro con el mensaje `"CARGANDO HOLONET..."` para mantener la inmersión en la interfaz MS-DOS de los años 90 y permitir purgar manualmente la caché local.

## Objetivos / No Objetivos

**Objetivos:**
- Reemplazar o respaldar el mapa `Map` en memoria con `localStorage` utilizando una clave con prefijo `swapi_cache_<key>`.
- Preservar la tolerancia a fallos (failover a espejos).
- Incorporar una función helper de retardo simulado de lectura retro (`simulateRetroDelay(ms: 180)`) para asegurar que el indicador visual "CARGANDO..." se muestre brevemente.
- Agregar opción de vaciado de `localStorage` en el modal F10 y comando CLI `CLEAR CACHE` / `PURGE`.

**No Objetivos:**
- Sincronización en segundo plano con servidores externos cuando el cliente está completamente offline sin datos en caché.

## Decisiones Técnicas

### 1. Persistencia mediante `localStorage`
- **Decisión**: Crear métodos de almacenamiento seguro `getFromStorage(key)` y `setToStorage(key, data)` con manejo de errores `try...catch` por si el navegador bloquea las cookies/storage.

### 2. Retardo Controlado de Carga Retro
- **Decisión**: Utilizar `await new Promise(resolve => setTimeout(resolve, 180))` en la llamada de recuperación para simular el retardo de disco de 150ms-200ms sin saturar la red.

### 3. Purga Manual de Caché
- **Decisión**: Extender `SwapiClient.clearCache()` para limpiar tanto el `Map` en memoria como todas las claves con prefijo `swapi_cache_` en `localStorage`.

## Riesgos / Limitaciones

- **[Límite de cuota de localStorage]** → *Mitigación*: La información de SWAPI en JSON ocupa pocos Kilobytes. Si la cuota se agota, capturar la excepción y mantener fallback en memoria `Map`.
