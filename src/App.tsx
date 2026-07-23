import { useState, useEffect, useRef } from 'preact/hooks';
import { Navbar, DosTheme } from './components/Navbar';
import { LeftPane } from './components/LeftPane';
import { RightPane, RightPaneTab } from './components/RightPane';
import { CommandPrompt } from './components/CommandPrompt';
import { StatusBar } from './components/StatusBar';
import { swapiClient } from './services/swapi';
import { soundSynth } from './services/sound';
import { SwapiCategory, DatFileEntry, SwapiEntity } from './types/swapi';

export const App = () => {
  const [category, setCategory] = useState<SwapiCategory>('people');
  const [theme, setTheme] = useState<DosTheme>('imperial');
  const [entries, setEntries] = useState<DatFileEntry[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [hasPrevPage, setHasPrevPage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(soundSynth.isMuted());
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [showShutdownModal, setShowShutdownModal] = useState<boolean>(false);
  const [activeRightTab, setActiveRightTab] = useState<RightPaneTab>('general');
  const [statusText, setStatusText] = useState<string>('ONLINE');

  const cmdInputRef = useRef<HTMLInputElement>(null);

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

  // Handle global F-keys
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F1') {
        e.preventDefault();
        soundSynth.playClick();
        setShowHelpModal((prev) => !prev);
      } else if (e.key === 'F2') {
        e.preventDefault();
        soundSynth.playClick();
        cmdInputRef.current?.focus();
      } else if (e.key === 'F3') {
        e.preventDefault();
        soundSynth.playClick();
        setActiveRightTab((prev) => {
          if (prev === 'general') return 'stats';
          if (prev === 'stats') return 'raw';
          return 'general';
        });
      } else if (e.key === 'F5') {
        e.preventDefault();
        soundSynth.playClick();
        loadCategoryData(category, page);
      } else if (e.key === 'F9' || (e.altKey && e.key.toLowerCase() === 's')) {
        e.preventDefault();
        const muted = soundSynth.toggleMute();
        setIsMuted(muted);
      } else if (e.key === 'F10') {
        e.preventDefault();
        soundSynth.playError();
        setShowShutdownModal((prev) => !prev);
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
    if (num === 2) cmdInputRef.current?.focus();
    if (num === 3) {
      setActiveRightTab((prev) => (prev === 'general' ? 'stats' : prev === 'stats' ? 'raw' : 'general'));
    }
    if (num === 5) loadCategoryData(category, page);
    if (num === 9) setIsMuted(soundSynth.toggleMute());
    if (num === 10) setShowShutdownModal(true);
  };

  const handleNavigateToUrl = async (url: string) => {
    setIsLoading(true);
    setStatusText('RESOLVIENDO RELACIÓN...');
    try {
      const match = url.match(/\/(people|planets|starships|vehicles|species|films)\/(\d+)\/?$/);
      if (match) {
        const targetCat = match[1] as SwapiCategory;
        const fetchedEntity = await swapiClient.getEntityByUrl<SwapiEntity>(url);

        setCategory(targetCat);
        const formatted = swapiClient.formatAsDatEntries(targetCat, [fetchedEntity]);
        setEntries(formatted);
        setSelectedIndex(0);
        setStatusText(`OK [RELACIÓN CARGADA]`);
        soundSynth.playSuccess();
      }
    } catch (err) {
      console.error(err);
      setStatusText('ERROR AL NAVEGAR');
      soundSynth.playError();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="app" data-theme={theme}>
      <Navbar
        currentCategory={category}
        onSelectCategory={handleSelectCategory}
        onOpenHelp={() => setShowHelpModal(true)}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(soundSynth.toggleMute())}
        currentTheme={theme}
        onSelectTheme={(t) => setTheme(t)}
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

        <RightPane
          selectedEntry={entries[selectedIndex] || null}
          activeTab={activeRightTab}
          onTabChange={(tab) => setActiveRightTab(tab)}
          onNavigateToUrl={handleNavigateToUrl}
        />
      </div>

      <CommandPrompt
        inputRef={cmdInputRef}
        currentCategory={category}
        onExecuteSearch={handleExecuteSearch}
        onChangeCategory={handleSelectCategory}
        onOpenHelp={() => setShowHelpModal(true)}
        onSelectTheme={(t) => setTheme(t)}
      />

      <StatusBar statusText={statusText} onFnKey={handleFnKey} />

      {/* Modal Ayuda F1 */}
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
                <p className="cyan-text">TECLAS DE FUNCIÓN Y CONSOLA:</p>
                <ul>
                  <li><strong>F1</strong>: Abrir esta ventana de ayuda</li>
                  <li><strong>F2</strong>: Enfocar la consola de comandos CLI</li>
                  <li><strong>F3</strong>: Alternar pestañas (General ➔ Stats ➔ Raw)</li>
                  <li><strong>F5</strong>: Recargar datos de la categoría actual</li>
                  <li><strong>F9 / Alt+S</strong>: Activar / Silenciar sonidos PC Speaker</li>
                  <li><strong>F10</strong>: Apagar sistema / Salir</li>
                  <li><strong>THEME imperial|rebel|sith|amber</strong>: Cambiar tema</li>
                  <li><strong>SEARCH &lt;query&gt;</strong>: Buscar registros en SWAPI</li>
                  <li><strong>DIR &lt;category&gt;</strong>: Cambiar de categoría</li>
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

      {/* Modal Apagado F10 */}
      {showShutdownModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#000000',
            color: '#FFB000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20000,
            fontFamily: 'Courier New, monospace',
            textAlign: 'center',
            padding: '20px'
          }}
        >
          <h2 style={{ color: '#FF3333', marginBottom: '20px' }}>*** SWAPI_DOS SHUTDOWN ***</h2>
          <p style={{ fontSize: '1.2rem', margin: '10px 0' }}>
            It is now safe to turn off your computer.
          </p>
          <p style={{ color: '#AAAAAA', fontSize: '0.9rem', marginBottom: '30px' }}>
            El sistema Holonet ha sido puesto en modo de espera seguro.
          </p>
          <button
            className="tui-button"
            onClick={() => {
              soundSynth.playSuccess();
              setShowShutdownModal(false);
            }}
          >
            [REINICIAR TERMINAL]
          </button>
        </div>
      )}
    </div>
  );
};
