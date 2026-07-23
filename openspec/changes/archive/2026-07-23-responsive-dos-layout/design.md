## Contexto

TuiCss posiciona la etiqueta `<legend>` en la parte superior del borde de `<fieldset>`. Sin un margen superior explícito en el primer hijo div de `<fieldset>`, las pestañas `[1] General`, `[2] Stats`, `[3] Raw` pueden colisionar con la leyenda. Adicionalmente, las cadenas de texto largas (como URLs relacionales) necesitan quiebres de palabra automáticos.

## Objetivos / No Objetivos

**Objetivos:**
- En `RightPane.tsx`, añadir `paddingTop: '12px'` y `marginTop: '4px'` al contenedor de los botones de pestañas.
- Aplicar `wordBreak: 'break-word'` en las etiquetas y valores de `RightPane.tsx`.

**No Objetivos:**
- Alterar la estética de los componentes TuiCss en modo escritorio.

## Decisiones Técnicas

### 1. Espaciado Seguro bajo `<legend>`
- **Decisión**: Añadir `padding-top: 12px` al contenedor de pestañas en `RightPane.tsx`.

### 2. Quiebre de Palabra en Enlaces
- **Decisión**: Usar `word-break: break-word` en las etiquetas de texto de `RightPane.tsx`.
