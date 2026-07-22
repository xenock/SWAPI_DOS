## Requisitos AÑADIDOS

### Requisito: Consumo Asíncrono de SWAPI con Caché Tipada en TypeScript
El sistema DEBE realizar peticiones asíncronas a los endpoints de la API de Star Wars mediante un servicio tipado en TypeScript y almacenar los registros obtenidos en caché local en memoria (`Map`) para eliminar peticiones de red duplicadas.

#### Escenario: Recuperación de Entidad desde Caché
- **CUANDO** se solicita una entidad o página por segunda vez
- **ENTONCES** el servicio retorna inmediatamente los datos desde la caché en memoria sin realizar una nueva petición HTTP.

### Requisito: Manejo de Espejos API de Resguardo (Failover)
El cliente SWAPI en TypeScript DEBE intentar automáticamente conectarse a endpoints espejos secundarios (ej. `swapi.py4e.com/api/` o `swapi.tech`) si el endpoint principal `swapi.dev/api/` experimenta errores de red o tiempo de espera agotado.

#### Escenario: Recuperación ante Fallo del Servidor Principal
- **CUANDO** la petición a `swapi.dev` falla por timeout o error de red
- **ENTONCES** el cliente conmuta de forma transparente al espejo secundario y resuelve la petición.
