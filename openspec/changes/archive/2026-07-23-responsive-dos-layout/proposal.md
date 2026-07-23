## Por qué

En el panel derecho (`RightPane`), la leyenda del título TuiCss `<legend>` puede colisionar con los botones de pestañas si no existe suficiente margen superior. Asimismo, valores de campos o URLs de relaciones muy largas pueden provocar desbordamiento horizontal en dispositivos móviles estrechos. Se requiere actualizar los planos para despejar la cabecera y controlar el desbordamiento de texto.

## Qué cambia

- **Prevención de Colisión con Leyenda (RightPane)**:
  - Añadir margen/padding superior adecuado (`padding-top: 12px`) al contenedor de pestañas para garantizar espacio limpio bajo la leyenda TuiCss.
- **Control de Desbordamiento de Texto y Enlaces**:
  - Aplicar `word-break: break-word` u `overflow-wrap: anywhere` en las claves, valores y enlaces relacionales del panel derecho para asegurar que ningún texto desborde los bordes laterales en dispositivos móviles.

## Capacidades

### Nuevas Capacidades
*(Ninguna)*

### Capacidades Modificadas
- `swapi-dos-app`: Prevenir solapamiento con la leyenda del inspector y desbordamiento de texto en el panel derecho.

## Impacto

- Archivos afectados: `src/components/RightPane.tsx`, `src/styles.css`.
