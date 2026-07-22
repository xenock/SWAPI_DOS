## 1. Configuración Inicial del Proyecto (Preact + TypeScript + Vitest)

- [x] 1.1 Configurar estructura de proyecto Preact + TypeScript con Vite y Vitest (`src/`, `src/components/`, `src/services/`, `src/types/`).
- [x] 1.2 Importar e integrar la librería TuiCss y estilos del tema MS-DOS en `index.html` y `src/styles.css`.
- [x] 1.3 Implementar componentes de interfaz principal: Barra de menú superior (Archivo, Vistas, Base de Datos, Buscar, Audio, Ayuda) y barra de teclas de función (`F1`-`F10`).

## 2. Desarrollo de Layout de Dos Paneles (Preact)

- [x] 2.1 Crear componente `LeftPane` para listar categorías de SWAPI y registros de entidades en formato `.DAT`.
- [x] 2.2 Crear componente `RightPane` (Inspector) con pestañas TuiCss, bloques de datos y barras de progreso estadísticas.
- [x] 2.3 Crear componente `CommandPrompt` (`C:\SWAPI>`) para procesar búsquedas y comandos de usuario.

## 3. Cliente SWAPI en TypeScript y Gestión de Datos

- [x] 3.1 Definir interfaces TypeScript para entidades de SWAPI (People, Planets, Starships, Vehicles, Species, Films) en `src/types/swapi.ts`.
- [x] 3.2 Implementar servicio `SwapiClient` en `src/services/swapi.ts` con almacenamiento en caché local (`Map`) y conmutación de espejos de respaldo.
- [x] 3.3 Crear suite de pruebas `swapi.test.ts` para verificar caché y conmutación de espejos con `npx vitest run`.
- [x] 3.4 Conectar los componentes Preact con `SwapiClient` para carga de datos y actualización dinámica de UI.

## 4. Sintetizador de Audio PC Speaker de 8 Bits

- [x] 4.1 Implementar servicio de audio `SoundSynth` en `src/services/sound.ts` usando Web Audio API (osciladores `square wave`).
- [x] 4.2 Crear suite de pruebas `sound.test.ts` para verificar inicialización de AudioContext y estados de mute.
- [x] 4.3 Integrar reproducción de efectos de sonido en interacciones de componentes y control de silencio (Mute / `Alt+S`).

## 5. Pruebas y Verificación Ligera

- [x] 5.1 Ejecutar suite completa de pruebas unitarias (`npx vitest run`) y verificar 100% de tests aprobados.
- [x] 5.2 Comprobar compilación de TypeScript (`npx tsc --noEmit`) y empaquetado de producción.
