import { useState } from 'preact/hooks';
import { DatFileEntry } from '../types/swapi';
import { soundSynth } from '../services/sound';

interface RightPaneProps {
  selectedEntry: DatFileEntry | null;
}

export const RightPane = ({ selectedEntry }: RightPaneProps) => {
  const [activeTab, setActiveTab] = useState<'general' | 'stats' | 'raw'>('general');

  if (!selectedEntry) {
    return (
      <div className="dos-pane">
        <div className="tui-window">
          <fieldset className="tui-fieldset" style={{ height: '100%' }}>
            <legend className="cyan-text">🔍 INSPECTOR DE REGISTROS</legend>
            <p style={{ color: '#aaaaaa', padding: '20px' }}>
              Seleccione un archivo .DAT en el panel izquierdo para examinar su contenido.
            </p>
          </fieldset>
        </div>
      </div>
    );
  }

  const data = selectedEntry.data as Record<string, any>;

  const renderProgress = (valStr: string, maxVal: number = 200) => {
    const num = parseInt(valStr, 10);
    if (isNaN(num)) return <span className="yellow-text">{valStr}</span>;
    const pct = Math.min(100, Math.max(5, Math.round((num / maxVal) * 100)));
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div className="tui-progress" style={{ flex: 1, height: '14px' }}>
          <div className="tui-progress-value" style={{ width: `${pct}%` }}></div>
        </div>
        <span style={{ fontSize: '0.85rem', width: '50px', textAlign: 'right' }}>{num}</span>
      </div>
    );
  };

  return (
    <div className="dos-pane">
      <div className="tui-window">
        <fieldset className="tui-fieldset" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <legend className="yellow-text" style={{ fontWeight: 'bold' }}>
            📜 INSPECCIONANDO: {selectedEntry.filename}
          </legend>

          <div style={{ marginBottom: '8px' }}>
            <button
              className={`tui-button ${activeTab === 'general' ? 'tui-fieldset-button' : ''}`}
              onClick={() => { soundSynth.playClick(); setActiveTab('general'); }}
              style={{ marginRight: '4px' }}
            >
              [1] General
            </button>
            <button
              className={`tui-button ${activeTab === 'stats' ? 'tui-fieldset-button' : ''}`}
              onClick={() => { soundSynth.playClick(); setActiveTab('stats'); }}
              style={{ marginRight: '4px' }}
            >
              [2] Estadísticas
            </button>
            <button
              className={`tui-button ${activeTab === 'raw' ? 'tui-fieldset-button' : ''}`}
              onClick={() => { soundSynth.playClick(); setActiveTab('raw'); }}
            >
              [3] Raw JSON
            </button>
          </div>

          <div className="tui-window-content" style={{ flex: 1, overflowY: 'auto' }}>
            {activeTab === 'general' && (
              <div>
                <h4 className="yellow-text" style={{ margin: '0 0 8px 0', borderBottom: '1px solid #00aaaa' }}>
                  {selectedEntry.name.toUpperCase()}
                </h4>
                <p><strong>Categoría:</strong> <span className="cyan-text">{selectedEntry.category.toUpperCase()}</span></p>
                <p><strong>Tamaño del archivo:</strong> {selectedEntry.sizeKb}</p>

                <div className="tui-panel" style={{ padding: '8px', marginTop: '10px' }}>
                  {Object.entries(data)
                    .filter(([_key, v]) => typeof v === 'string' && !v.startsWith('http'))
                    .slice(0, 8)
                    .map(([k, v]) => (
                      <div key={k} style={{ marginBottom: '4px', fontSize: '0.9rem' }}>
                        <span className="cyan-text">{k.replace(/_/g, ' ').toUpperCase()}:</span>{' '}
                        <span>{String(v)}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div>
                <h4 className="yellow-text" style={{ margin: '0 0 8px 0', borderBottom: '1px solid #00aaaa' }}>
                  ANÁLISIS DE MÉTRICAS / SPECS
                </h4>
                {selectedEntry.category === 'people' && (
                  <div>
                    <p className="cyan-text">ALTURA (CM):</p>
                    {renderProgress(data.height, 220)}
                    <p className="cyan-text" style={{ marginTop: '8px' }}>MASA (KG):</p>
                    {renderProgress(data.mass, 150)}
                  </div>
                )}

                {selectedEntry.category === 'starships' && (
                  <div>
                    <p className="cyan-text">LONGITUD (M):</p>
                    {renderProgress(data.length, 1000)}
                    <p className="cyan-text" style={{ marginTop: '8px' }}>VELOCIDAD MÁXIMA:</p>
                    {renderProgress(data.max_atmosphering_speed, 1200)}
                    <p className="cyan-text" style={{ marginTop: '8px' }}>PASAJEROS:</p>
                    {renderProgress(data.passengers, 100)}
                  </div>
                )}

                {selectedEntry.category === 'planets' && (
                  <div>
                    <p className="cyan-text">DIÁMETRO (KM):</p>
                    {renderProgress(data.diameter, 20000)}
                    <p className="cyan-text" style={{ marginTop: '8px' }}>PERÍODO ROTACIÓN:</p>
                    {renderProgress(data.rotation_period, 50)}
                  </div>
                )}

                {!['people', 'starships', 'planets'].includes(selectedEntry.category) && (
                  <p style={{ color: '#aaaaaa' }}>No hay métricas gráficas para esta categoría.</p>
                )}
              </div>
            )}

            {activeTab === 'raw' && (
              <pre style={{ color: '#00ff00', fontSize: '0.8rem', whiteSpace: 'pre-wrap', margin: 0 }}>
                {JSON.stringify(data, null, 2)}
              </pre>
            )}
          </div>
        </fieldset>
      </div>
    </div>
  );
};
