## Requisitos AÑADIDOS

### Requisito: Marco de Interfaz Estilo MS-DOS Norton Commander
La aplicación DEBE renderizar un contenedor retro estilo MS-DOS de pantalla completa utilizando estilos TuiCss, componentes Preact y TypeScript. Debe incluir una barra de menú superior, paneles dobles (Lista de Directorio a la izquierda, Inspector a la derecha), una consola CLI interactiva y una barra de estado de teclas de función en la parte inferior.

#### Escenario: Inicialización de la Aplicación
- **DADO** que la aplicación se carga en el navegador
- **ENTONCES** los estilos TuiCss, el fondo azul MS-DOS, la barra de menú superior, los dos paneles y la barra inferior de teclas de función se muestran con el tema clásico de 16 colores DOS.

### Requisito: Selección de Categoría y Entidad en el Panel Izquierdo
El panel izquierdo DEBE mostrar las categorías de SWAPI (Personajes, Planetas, Naves, Vehículos, Especies, Películas) como directorios y las entidades como entradas formateadas de archivos `.DAT`.

#### Escenario: Navegación de Categorías
- **CUANDO** el usuario selecciona un directorio de categoría (ej. `PEOPLE`)
- **ENTONCES** el panel izquierdo renderiza la lista de registros de entidades pertenecientes a esa categoría formateados como ítems `.DAT` con su índice y tamaño simulado.

### Requisito: Inspector de Detalles de Entidad en el Panel Derecho
El panel derecho DEBE mostrar los atributos detallados de la entidad seleccionada actualmente, formateados utilizando pestañas TuiCss, cajas de campo (fieldsets) y barras de progreso para estadísticas numéricas.

#### Escenario: Inspeccionar un Registro de Entidad
- **CUANDO** el usuario selecciona un archivo `.DAT` en el panel izquierdo (ej. `001_LUKE_SKYWALKER.DAT`)
- **ENTONCES** el panel derecho se puebla con los detalles de Luke Skywalker, mostrando pestañas de Información General, Estadísticas/Atributos y Enlaces Relacionados (Planeta Natal, Películas).

### Requisito: Consola Interactivo de Línea de Comandos
La línea de comandos DEBE aceptar comandos de texto ingresados por el usuario como `SEARCH <consulta>`, `DIR <categoria>`, `CLS` o `HELP` y ejecutar la acción correspondiente en la interfaz.

#### Escenario: Ejecución de Búsqueda desde la Consola
- **CUANDO** el usuario escribe `SEARCH Vader` en la consola CLI y presiona Enter
- **ENTONCES** el sistema filtra la vista de entidades actual o dispara una búsqueda global en SWAPI retornando los registros coincidentes.
