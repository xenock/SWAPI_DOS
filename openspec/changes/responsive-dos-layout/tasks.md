## 1. Reglas de Estilo Responsivo y Eliminación de Solapamientos en CSS y Componentes

- [x] 1.1 Configurar `.tui-navbar` y sus listas en `src/styles.css` con `flex-wrap: nowrap`, `overflow-x: auto` y altura fija (~32px) para móviles.
- [x] 1.2 Añadir clase `dos-col-size` a la columna de tamaño en `LeftPane.tsx` y ocultarla en `@media (max-width: 767px)` para dejar 2 columnas perfectamente alineadas (55% / 45%) sin solapamiento.
- [x] 1.3 Reestructurar el contenedor de pestañas en `RightPane.tsx` con `paddingTop: '14px'` y `wordBreak: 'break-word'` para evitar desbordamientos y colisiones con la leyenda.
- [x] 1.4 Adaptar `.dos-workspace` a disposición apilada vertical con scroll suave.

## 2. Pruebas y Verificación

- [x] 2.1 Ejecutar `npx vitest run` y `npx tsc --noEmit` para verificar que la suite completa de pruebas pase al 100%.
- [x] 2.2 Ejecutar `npm run build` para asegurar la compilación limpia de producción.
