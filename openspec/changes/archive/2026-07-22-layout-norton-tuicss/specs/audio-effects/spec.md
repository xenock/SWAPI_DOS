## Requisitos AÑADIDOS

### Requisito: Sintetizador de Audio PC Speaker con Web Audio API
El sistema DEBE proveer un módulo de gestión de audio tipado en TypeScript utilizando osciladores de onda cuadrada (`square wave`) de la Web Audio API para emular sonidos auténticos de altavoz PC de 8 bits al interactuar con la interfaz.

#### Escenario: Reproducción de Sonido en Interacción de Usuario
- **CUANDO** el usuario hace clic en un botón, navega un menú o ejecuta un comando en la consola
- **ENTONCES** se reproduce una breve secuencia de beeps retro a través del `AudioContext` del navegador.

### Requisito: Interruptor de Silencio (Mute)
El sistema DEBE permitir al usuario activar o desactivar el sonido desde la barra de menú superior o mediante un atajo de teclado (`Alt+S`).

#### Escenario: Silenciar el Audio
- **CUANDO** el usuario cambia el estado de sonido a MUTE
- **ENTONCES** todas las llamadas posteriores del sintetizador de audio se silencian hasta que vuelva a ser activado.
