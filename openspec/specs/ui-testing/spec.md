## ADDED Requirements

### Requirement: Cobertura de Pruebas Automatizadas de Componentes UI
El proyecto DEBE contar con una suite de pruebas de componentes de interfaz utilizando `@testing-library/preact` y `jsdom` integrada con Vitest para validar las interacciones de usuario y renderizado de componentes.

#### Scenario: Prueba de Renderizado y Eventos de Componente StatusBar
- **WHEN** se ejecute `npx vitest run`
- **THEN** la suite de pruebas de `StatusBar` confirma que presionar F2 o hacer clic en los botones de función dispara los eventos esperados.

#### Scenario: Prueba de Conmutación de Pestañas en RightPane
- **WHEN** se ejecute la suite de pruebas de `RightPane`
- **THEN** se verifica que cambiar de pestaña renderice correctamente la vista de métricas y la vista JSON sin errores.
