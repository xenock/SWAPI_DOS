import { DatFileEntry, SwapiCategory } from '../types/swapi';
import { soundSynth } from '../services/sound';

interface LeftPaneProps {
  category: SwapiCategory;
  entries: DatFileEntry[];
  selectedIndex: number;
  onSelectEntry: (index: number) => void;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange: (newPage: number) => void;
  isLoading: boolean;
}

export const LeftPane = ({
  category,
  entries,
  selectedIndex,
  onSelectEntry,
  page,
  hasNextPage,
  hasPrevPage,
  onPageChange,
  isLoading
}: LeftPaneProps) => {
  return (
    <div className="dos-pane">
      <div className="tui-window">
        <fieldset className="tui-fieldset" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <legend className="yellow-text" style={{ fontWeight: 'bold' }}>
            📁 C:\SWAPI\{category.toUpperCase()}\ [PÁGINA {page}]
          </legend>
          
          <div className="tui-window-content" style={{ flex: 1 }}>
            {isLoading ? (
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <p className="yellow-text">CARGANDO ARCHIVOS HOLONET...</p>
                <div className="tui-progress tui-progress-animated">
                  <div className="tui-progress-value" style={{ width: '60%' }}></div>
                </div>
              </div>
            ) : entries.length === 0 ? (
              <p style={{ color: '#aaaaaa' }}>No se encontraron archivos en este directorio.</p>
            ) : (
              <table className="dos-file-table">
                <thead>
                  <tr>
                    <th>NOMBRE DE ARCHIVO</th>
                    <th>REGISTRO</th>
                    <th className="dos-col-size">TAMAÑO</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, idx) => (
                    <tr
                      key={entry.filename}
                      className={idx === selectedIndex ? 'selected' : ''}
                      onClick={() => {
                        soundSynth.playClick();
                        onSelectEntry(idx);
                      }}
                    >
                      <td>{entry.filename}</td>
                      <td>{entry.name}</td>
                      <td className="dos-col-size">{entry.sizeKb}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', paddingTop: '4px', borderTop: '1px dashed #00aaaa' }}>
            <button
              className="tui-button"
              disabled={!hasPrevPage || isLoading}
              onClick={() => {
                soundSynth.playClick();
                onPageChange(page - 1);
              }}
            >
              &lt; ANT (Page {page - 1})
            </button>
            <span style={{ fontSize: '0.85rem', color: '#ffff55', alignSelf: 'center' }}>
              {entries.length} archivos mostrados
            </span>
            <button
              className="tui-button"
              disabled={!hasNextPage || isLoading}
              onClick={() => {
                soundSynth.playClick();
                onPageChange(page + 1);
              }}
            >
              SIG &gt; (Page {page + 1})
            </button>
          </div>
        </fieldset>
      </div>
    </div>
  );
};
