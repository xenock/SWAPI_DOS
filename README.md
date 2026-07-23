# 📟 SWAPI_DOS

Un pequeño proyecto para probar la API de Star Wars (SWAPI) con una interfaz retro estilo MS-DOS utilizando Preact y TuiCss.

---

## 🌟 Características

1. **Interfaz Retro DOS**: Diseño de dos paneles inspirado en Norton Commander de los años 90.
2. **Navegación SWAPI**: Explora personajes, planetas, naves y películas con enlaces relacionales interactivos.
3. **Caché Persistente**: Guarda las respuestas de la API en `localStorage` con simulación de retardo de carga vintage.
4. **Consola CLI (`C:\SWAPI>`)**: Comandos para buscar (`SEARCH`), cambiar directorio (`DIR`), cambiar tema (`THEME`) o purgar la caché (`CLEAR CACHE`).
5. **Teclas de Función (F1 - F10)**: Atajos de teclado para ayuda, pestañas de inspección, sonido y menú de apagado.
6. **Efectos de Sonido PC Speaker**: Efectos de audio retro de 8 bits sintetizados mediante la Web Audio API.
7. **Diseño Responsivo**: Adaptado para pantallas de escritorio y dispositivos móviles.

---

## 📋 Metodología OpenSpec

El desarrollo de este proyecto se gestiona mediante la metodología **[OpenSpec](https://openspec.dev/)** (*Spec-Driven Agentic Workflow*). Cada iteración sigue un flujo estructurado de propuesta, diseño, especificaciones delta, tareas verificables y archivado:

Todas las especificaciones vivas del sistema se encuentran en la carpeta `openspec/specs/`.

---

## 🛠️ Stack Técnico y Herramientas

- **Librería UI**: [Preact](https://preactjs.com/) + [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: Vanilla CSS + [TuiCss](https://github.com/vinibiavatti1/TuiCss)
- **Metodología**: [OpenSpec](https://openspec.dev/) (*Spec-Driven Development*)
- **Empaquetador**: [Vite](https://vitejs.dev/)
- **Testing**: [Vitest](https://vitest.dev/) + `@testing-library/preact`

---

## 🚀 Instalación y Uso Local

```bash
# 1. Clonar el repositorio e instalar dependencias
npm install

# 2. Iniciar el servidor de desarrollo
npm run dev

# 3. Ejecutar la suite de pruebas automáticas
npm test

# 4. Compilar para producción
npm run build
```
