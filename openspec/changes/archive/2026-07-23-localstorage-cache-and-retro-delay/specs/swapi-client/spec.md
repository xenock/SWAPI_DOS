## MODIFIED Requirements

### Requisito: Consumo Asíncrono de SWAPI con Caché Tipada en TypeScript
El sistema DEBE realizar peticiones asíncronas a los endpoints de la API de Star Wars mediante un servicio tipado en TypeScript y almacenar los registros obtenidos en almacenamiento local del navegador (`localStorage`) para eliminar peticiones de red duplicadas entre sesiones.

#### Escenario: Recuperación de Entidad desde Caché Persistente
- **CUANDO** se solicita una entidad o página que ya fue consultada previamente
- **ENTONCES** el servicio retorna inmediatamente los datos desde `localStorage` sin realizar una nueva petición HTTP de red.

## ADDED Requirements

### Requisito: Simulación de Retardo Retro de Lectura
El cliente DEBE simular un pequeño retardo controlado de lectura de disco/módem (~150ms-250ms) e indicar el estado de carga visual en la interfaz incluso cuando los datos se sirvan desde la caché de `localStorage`.

#### Escenario: Sensación de Carga Vintage desde Caché
- **CUANDO** el usuario solicite un registro almacenado previamente en la caché del navegador
- **ENTONCES** la interfaz muestra brevemente el estado "CARGANDO HOLONET..." durante el retardo retro antes de renderizar los datos guardados.

### Requisito: Purga Manual de Caché desde F10 y Consola CLI
El sistema DEBE proveer la capacidad de vaciar la caché persistente de `localStorage` a través del modal de salida F10 y mediante el comando CLI `CLEAR CACHE` o `PURGE`.

#### Escenario: Purgar Caché desde el Menú F10 o Consola
- **CUANDO** el usuario presione el botón de purgar en el modal F10 o ejecute `CLEAR CACHE` en la consola CLI
- **ENTONCES** el sistema ejecuta `swapiClient.clearCache()`, elimina las entradas de `localStorage` y actualiza el mensaje de estado a "CACHÉ PURGADA".
