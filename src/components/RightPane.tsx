import { useState, useEffect } from 'preact/hooks';
import { DatFileEntry, SwapiEntity } from '../types/swapi';
import { soundSynth } from '../services/sound';
import { swapiClient } from '../services/swapi';

export type RightPaneTab = 'general' | 'stats' | 'raw';

interface RightPaneProps {
  selectedEntry: DatFileEntry | null;
  activeTab?: RightPaneTab;
  onTabChange?: (tab: RightPaneTab) => void;
  onNavigateToUrl?: (url: string) => void;
}

export const RightPane = ({
  selectedEntry,
  activeTab = 'general',
  onTabChange,
  onNavigateToUrl
}: RightPaneProps) => {
  const [resolvedNames, setResolvedNames] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!selectedEntry) return;

    const data = selectedEntry.data as Record<string, any>;
    const urlsToResolve: string[] = [];

    Object.values(data).forEach((v) => {
      if (typeof v === 'string' && v.startsWith('http')) {
        urlsToResolve.push(v);
      } else if (Array.isArray(v) && v.length > 0 && typeof v[0] === 'string' && v[0].startsWith('http')) {
        v.forEach((url) => {
          if (typeof url === 'string' && url.startsWith('http')) {
            urlsToResolve.push(url);
          }
        });
      }
    });

    if (urlsToResolve.length === 0) return;

    let isSubscribed = true;

    const resolveUrls = async () => {
      const nameMap: Record<string, string> = {};
      await Promise.all(
        urlsToResolve.map(async (url) => {
          try {
            const entity = await swapiClient.getEntityByUrl<SwapiEntity>(url);
            const displayName = 'name' in entity ? entity.name : 'title' in entity ? entity.title : null;
            if (displayName) {
              nameMap[url] = displayName;
            }
          } catch {
            // fallback silently
          }
        })
      );

      if (isSubscribed) {
        setResolvedNames((prev) => ({ ...prev, ...nameMap }));
      }
    };

    resolveUrls();

    return () => {
      isSubscribed = false;
    };
  }, [selectedEntry]);

  const handleTabClick = (tab: RightPaneTab) => {
    soundSynth.playClick();
    onTabChange?.(tab);
  };

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

  const parseSwapiUrlLabel = (urlStr: string): string => {
    if (resolvedNames[urlStr]) {
      return `[${resolvedNames[urlStr]}]`;
    }
    try {
      const match = urlStr.match(/\/(people|planets|starships|vehicles|species|films)\/(\d+)\/?$/);
      if (match) {
        const cat = match[1].toUpperCase();
        const id = match[2];
        return `[${cat} #${id}]`;
      }
    } catch {
      // fallback
    }
    return '[ENLACE REGISTRO]';
  };

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

  // Extract relational properties (array or single string starting with http)
  const relationalEntries = Object.entries(data).filter(([_k, v]) => {
    if (typeof v === 'string' && v.startsWith('http')) return true;
    if (Array.isArray(v) && v.length > 0 && typeof v[0] === 'string' && v[0].startsWith('http')) return true;
    return false;
  });

  return (
    <div className="dos-pane">
      <div className="tui-window">
        <fieldset className="tui-fieldset" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <legend className="yellow-text">
            📜 INSPECCIONANDO: {selectedEntry.filename}
          </legend>

          <div style={{ margin: '4px 0 8px 0', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            <button
              className="tui-button"
              onClick={() => handleTabClick('general')}
              style={{
                backgroundColor: activeTab === 'general' ? 'var(--dos-cyan)' : undefined,
                color: activeTab === 'general' ? 'var(--dos-black)' : undefined,
                fontWeight: activeTab === 'general' ? 'bold' : undefined
              }}
            >
              [1] General
            </button>
            <button
              className="tui-button"
              onClick={() => handleTabClick('stats')}
              style={{
                backgroundColor: activeTab === 'stats' ? 'var(--dos-cyan)' : undefined,
                color: activeTab === 'stats' ? 'var(--dos-black)' : undefined,
                fontWeight: activeTab === 'stats' ? 'bold' : undefined
              }}
            >
              [2] Estadísticas
            </button>
            <button
              className="tui-button"
              onClick={() => handleTabClick('raw')}
              style={{
                backgroundColor: activeTab === 'raw' ? 'var(--dos-cyan)' : undefined,
                color: activeTab === 'raw' ? 'var(--dos-black)' : undefined,
                fontWeight: activeTab === 'raw' ? 'bold' : undefined
              }}
            >
              [3] Raw JSON
            </button>
          </div>

          <div className="tui-window-content" style={{ flex: 1, overflowY: 'auto', wordBreak: 'break-word' }}>
            {activeTab === 'general' && (
              <div>
                <h4 className="yellow-text" style={{ margin: '0 0 8px 0', borderBottom: '1px solid #00aaaa' }}>
                  {selectedEntry.name.toUpperCase()}
                </h4>
                <p><strong>Categoría:</strong> <span className="cyan-text">{selectedEntry.category.toUpperCase()}</span></p>
                <p><strong>Tamaño del archivo:</strong> {selectedEntry.sizeKb}</p>

                <div className="tui-panel" style={{ padding: '8px', marginTop: '10px' }}>
                  {Object.entries(data)
                    .filter(([k, v]) => typeof v === 'string' && !v.startsWith('http') && k !== 'name' && k !== 'title')
                    .slice(0, 8)
                    .map(([k, v]) => (
                      <div key={k} style={{ marginBottom: '4px', fontSize: '0.9rem' }}>
                        <span className="cyan-text">{k.replace(/_/g, ' ').toUpperCase()}:</span>{' '}
                        <span>{String(v)}</span>
                      </div>
                    ))}
                </div>

                {relationalEntries.length > 0 && (
                  <div style={{ marginTop: '12px' }}>
                    <h5 className="yellow-text" style={{ margin: '0 0 6px 0', borderBottom: '1px dashed #00aaaa' }}>
                      🔗 ENLACES Y RELACIONES HOLONET
                    </h5>
                    {relationalEntries.map(([k, v]) => (
                      <div key={k} style={{ marginBottom: '6px', fontSize: '0.85rem' }}>
                        <span className="cyan-text">{k.replace(/_/g, ' ').toUpperCase()}:</span>{' '}
                        {typeof v === 'string' ? (
                          <span
                            className="dos-link"
                            onClick={() => {
                              soundSynth.playClick();
                              onNavigateToUrl?.(v);
                            }}
                          >
                            {parseSwapiUrlLabel(v)}
                          </span>
                        ) : (
                          <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '6px', marginTop: '2px' }}>
                            {(v as string[]).map((url) => (
                              <span
                                key={url}
                                className="dos-link"
                                onClick={() => {
                                  soundSynth.playClick();
                                  onNavigateToUrl?.(url);
                                }}
                              >
                                {parseSwapiUrlLabel(url)}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
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
