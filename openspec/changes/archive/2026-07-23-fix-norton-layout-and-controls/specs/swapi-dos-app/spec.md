## ADDED Requirements

### Requirement: Atajos Interactivos de Teclas F-Keys
La barra de estado inferior DEBE habilitar atajos funcionales reales para las teclas de función: `F1` (modal de Ayuda), `F2` (enfocar consola CLI `C:\SWAPI>`), `F3` (alternar pestañas del panel inspector General ➔ Stats ➔ Raw), `F5` (recargar datos), `F9` (conmutar audio mute) y `F10` (pantalla de apagado de sistema retro DOS).

#### Scenario: Enfoque de Consola con F2
- **WHEN** el usuario presione la tecla F2 o haga clic en el botón F2 de la barra inferior
- **THEN** la consola de comandos `C:\SWAPI>` recibe el foco del teclado inmediatamente.

#### Scenario: Alternar Pestañas del Inspector con F3
- **WHEN** el usuario presione F3
- **THEN** el panel derecho conmuta en ciclo continuo entre las pestañas General, Estadísticas y Raw JSON.

#### Scenario: Apagado de Sistema con F10
- **WHEN** el usuario presione F10
- **THEN** se despliega una pantalla/modal retro de apagado estilo DOS con la frase "It is now safe to turn off your computer".

### Requirement: Selector de Temas Visuales Retro
La aplicación DEBE ofrecer opciones para seleccionar y alternar entre temas cromáticos retro (Imperial Blue, Rebel Green, Sith Red, Amber Terminal) mediante la barra de menús o comandos CLI (`THEME <nombre>`).

#### Scenario: Cambio de Tema a Verde Rebelde
- **WHEN** el usuario ejecute el comando `THEME REBEL` en la consola CLI o seleccione el tema en la barra de menús
- **THEN** la paleta de colores de toda la interfaz conmuta a verde fósforo estilo terminal CRT.

### Requirement: Navegación Cruzada Interactiva entre Entidades
Las referencias a otras entidades (como planeta natal, vehículos o películas) mostradas en el panel de inspección DEBEN renderizarse como enlaces interactivos que al ser accionados naveguen e inspeccionen directamente la entidad vinculada.

#### Scenario: Clic en Planeta Natal
- **WHEN** el usuario haga clic en el enlace interactivo del planeta natal (ej. "Tatooine") en la ficha de un personaje
- **THEN** el sistema conmuta la categoría a `planets` y selecciona automáticamente la ficha de Tatooine.
