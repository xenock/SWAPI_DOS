import { useState, useEffect } from 'preact/hooks';
import { Navbar } from './components/Navbar';
import { LeftPane } from './components/LeftPane';
import { RightPane } from './components/RightPane';
import { CommandPrompt } from './components/CommandPrompt';
import { StatusBar } from './components/StatusBar';
import { swapiClient } from './services/swapi';
import { soundSynth } from './services/sound';
import { SwapiCategory, DatFileEntry } from './types/swapi';

export const App = () => {
  const [category, setCategory] = useState<SwapiCategory>('people');
  const [entries, setEntries] = useState<DatFileEntry[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [hasPrevPage, setHasPrevPage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(soundSynth.isMuted());
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>('ONLINE');

  const loadCategoryData = async (cat: SwapiCategory, pageNum: number, searchQuery?: string) => {
    setIsLoading(true);
    setStatusText('CARGANDO HOLONET...');
    try {
      const response = searchQuery
        ? await swapiClient.searchEntities(cat, searchQuery)
        : await swapiClient.getCategoryList(cat, pageNum);

      const datEntries = swapiClient.formatAsDatEntries(cat, response.results);
      setEntries(datEntries);
      setSelectedIndex(0);
      setHasNextPage(Boolean(response.next));
      setHasPrevPage(Boolean(response.previous));
      setStatusText(`OK [${response.results.length} REGISTROS]`);
      soundSynth.playSuccess();
    } catch (err) {
      console.error(err);
      setStatusText('ERROR DE CONEXIÓN');
      soundSynth.playError();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategoryData(category, page);
  }, [category, page]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F1') {
        e.preventDefault();
        soundSynth.playClick();
        setShowHelpModal((prev) => !prev);
      } else if (e.key === 'F5') {
        e.preventDefault();
        soundSynth.playClick();
        loadCategoryData(category, page);
      } else if (e.key === 'F9' || (e.altKey && e.key.toLowerCase() === 's')) {
        e.preventDefault();
        const muted = soundSynth.toggleMute();
        setIsMuted(muted);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [category, page]);

  const handleSelectCategory = (newCat: SwapiCategory) => {
    setCategory(newCat);
    setPage(1);
  };

  const handleExecuteSearch = (query: string) => {
    if (!query) {
      loadCategoryData(category, 1);
    } else {
      loadCategoryData(category, 1, query);
    }
  };

  const handleFnKey = (num: number) => {
    soundSynth.playClick();
    if (num === 1) setShowHelpModal(true);
    if (num === 5) loadCategoryData(category, page);
    if (num === 9) setIsMuted(soundSynth.toggleMute());
    if (num === 10) setStatusText('SISTEMA EN ESPERA');
  };

  return (
    <div id="app">
      <Navbar
        currentCategory={category}
        onSelectCategory={handleSelectCategory}
        onOpenHelp={() => setShowHelpModal(true)}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(soundSynth.toggleMute())}
      />

      <div className="dos-workspace">
        <LeftPane
          category={category}
          entries={entries}
          selectedIndex={selectedIndex}
          onSelectEntry={(idx) => setSelectedIndex(idx)}
          page={page}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          onPageChange={(newPage) => setPage(newPage)}
          isLoading={isLoading}
        />

        <RightPane selectedEntry={entries[selectedIndex] || null} />
      </div>

      <CommandPrompt
        currentCategory={category}
        onExecuteSearch={handleExecuteSearch}
        onChangeCategory={handleSelectCategory}
        onOpenHelp={() => setShowHelpModal(true)}
      />

      <StatusBar statusText={statusText} onFnKey={handleFnKey} />

      {showHelpModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
          }}
        >
          <div className="tui-window" style={{ width: '480px', maxWidth: '90%' }}>
            <fieldset className="tui-fieldset">
              <legend className="yellow-text">❓ AYUDA DEL SISTEMA SWAPI_DOS</legend>
              <div style={{ padding: '12px', fontSize: '0.9rem' }}>
                <p className="cyan-text">COMANDOS DE TECLADO Y CONSOLA:</p>
                <ul>
                  <li><strong>F1</strong>: Abrir esta ventana de ayuda</li>
                  <li><strong>F5</strong>: Recargar datos de la categoría actual</li>
                  <li><strong>F9 / Alt+S</strong>: Activar / Silenciar sonidos PC Speaker</li>
                  <li><strong>SEARCH &lt;query&gt;</strong>: Buscar registros en SWAPI</li>
                  <li><strong>DIR &lt;category&gt;</strong>: Cambiar de categoría (people, planets, etc.)</li>
                </ul>
                <div style={{ textAlign: 'right', marginTop: '16px' }}>
                  <button
                    className="tui-button"
                    onClick={() => {
                      soundSynth.playClick();
                      setShowHelpModal(false);
                    }}
                  >
                    [ACEPTAR]
                  </button>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      )}
    </div>
  );
};
