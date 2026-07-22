# Reglas y Guías del Proyecto (AGENTS.md)

## 🛠️ Stack Técnico y Arquitectura
- **Lenguaje y Framework**: TypeScript + Preact.
- **Testing**: **Vitest** para pruebas unitarias y de integración automáticas de alta velocidad.
- **Estilos**: HTML5 + CSS Vanilla integrado con la librería **TuiCss** (`tui-window`, `tui-panel`, `tui-fieldset`, `tui-button`, `tui-tabs`, `tui-progress`).
- **Fuente de Datos**: Star Wars API (`swapi.dev`) con soporte de espejos secundarios (`swapi.py4e.com/api/`) y caché local en memoria.
- **Síntesis de Audio**: Web Audio API para efectos de sonido retro de altavoz PC de 8 bits.

## ⚡ Regla de Verificación y Ahorro de Tokens
- **Verificación Ligera**: Para comprobar que el código funciona, la IA DEBE ejecutar comandos de test automáticos en consola (`npm test` o `npx vitest run`).
- **Prohibido Subagentes Visuales Innecesarios**: No usar inspecciones redundantes o subagentes pesados cuando los tests unitarios en consola puedan confirmar el funcionamiento en milisegundos.

## 🎨 Estándares Visuales y de UX
- **Estética**: Diseño estilo MS-DOS Norton Commander de dos paneles de los años 90.
- **Paleta de Colores**: Paleta clásica de 16 colores DOS (fondo azul `#0000aa`, encabezados cian, texto activo amarillo).
- **Tipografía**: Fuentes monoespaciadas (`Courier New`, `Consolas`, fuentes retro de ancho fijo).
- **Interactividad**: Navegación por teclado (teclas de función `F1`-`F10`, `Tab`, flechas) y consola interactiva de línea de comandos (`C:\SWAPI>`).

## 🌐 Idioma y Calidad de Código
- **Código e Identificadores**: Todo el código, variables, funciones, nombres de archivos y clases DEBEN estar en **Inglés**.
- **Documentación y UI**: Toda la documentación (incluyendo archivos Markdown de OpenSpec), comentarios explicativos y textos de la interfaz gráfica DEBEN estar en **Español**.
