## MODIFIED Requirements

### Requirement: Navegación Cruzada Interactiva entre Entidades
Las referencias a otras entidades (como planeta natal, vehículos o películas) mostradas en el panel de inspección DEBEN renderizarse como enlaces interactivos etiquetados con el título/nombre real de la entidad resolviéndolos asíncronamente (ej. `[Tatooine]`, `[A New Hope]`), permitiendo navegar e inspeccionar la entidad vinculada al ser accionados.

#### Scenario: Visualización y Clic en Planeta Natal con Nombre Real
- **WHEN** se inspeccione la ficha de un personaje (ej. Luke Skywalker)
- **THEN** el enlace de planeta natal resuelve y muestra el nombre real "[Tatooine]" en lugar de etiquetas genéricas, y al hacer clic navega e inspecciona la ficha de Tatooine.
