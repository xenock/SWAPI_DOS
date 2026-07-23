## 1. Reestructuración de Teclas de Función F-Keys

- [x] 1.1 Conectar la tecla `F2` y el botón de la barra inferior para hacer foco automático al campo de texto en `CommandPrompt.tsx`.
- [x] 1.2 Implementar en `App.tsx` y `RightPane.tsx` el alternado cíclico de pestañas (General ➔ Stats ➔ Raw) mediante la tecla `F3`.
- [x] 1.3 Crear modal de apagado retro de sistema estilo DOS ("It is now safe to turn off your computer") activado por la tecla `F10`.

## 2. Sistema de Temas Visuales Retro

- [x] 2.1 Configurar variables CSS en `styles.css` para soportar temas (Imperial Blue, Rebel Green, Sith Red, Amber Terminal).
- [x] 2.2 Agregar selector de tema en la barra de menú superior (`Navbar.tsx`) y soportar el comando CLI `THEME <nombre>` en `CommandPrompt.tsx`.

## 3. Navegación Cruzada de Entidades Relacionadas

- [x] 3.1 Actualizar `RightPane.tsx` para detectar URLs relacionales de SWAPI y renderizar los nombres de las entidades como enlaces clicables.
- [x] 3.2 Implementar manejador de navegación en `App.tsx` para resolver y cargar el registro seleccionado al hacer clic en un enlace relacional.

## 4. Cobertura de Pruebas de UI con Testing Library

- [x] 4.1 Instalar `@testing-library/preact` en `package.json`.
- [x] 4.2 Crear suite de pruebas de componentes en `src/components/StatusBar.test.tsx` y `src/components/RightPane.test.tsx`.
- [x] 4.3 Ejecutar `npx vitest run` y verificar que la suite completa de pruebas pase al 100%.
