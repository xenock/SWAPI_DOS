import { useState } from 'preact/hooks';
import { soundSynth } from '../services/sound';
import { SwapiCategory } from '../types/swapi';
import { DosTheme } from './Navbar';
import { RefObject } from 'preact';

interface CommandPromptProps {
  currentCategory: SwapiCategory;
  onExecuteSearch: (query: string) => void;
  onChangeCategory: (category: SwapiCategory) => void;
  onOpenHelp: () => void;
  onSelectTheme: (theme: DosTheme) => void;
  inputRef?: RefObject<HTMLInputElement>;
}

export const CommandPrompt = ({
  currentCategory,
  onExecuteSearch,
  onChangeCategory,
  onOpenHelp,
  onSelectTheme,
  inputRef
}: CommandPromptProps) => {
  const [inputVal, setInputVal] = useState('');

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      const trimmed = inputVal.trim();
      if (!trimmed) return;

      soundSynth.playClick();
      const parts = trimmed.split(' ');
      const cmd = parts[0].toUpperCase();
      const arg = parts.slice(1).join(' ');

      if (cmd === 'SEARCH' || cmd === 'FIND') {
        onExecuteSearch(arg);
      } else if (cmd === 'DIR' || cmd === 'CD') {
        const cat = arg.toLowerCase() as SwapiCategory;
        if (['people', 'planets', 'starships', 'vehicles', 'species', 'films'].includes(cat)) {
          onChangeCategory(cat);
        } else {
          soundSynth.playError();
        }
      } else if (cmd === 'THEME') {
        const themeName = arg.toLowerCase() as DosTheme;
        if (['imperial', 'rebel', 'sith', 'amber'].includes(themeName)) {
          onSelectTheme(themeName);
        } else {
          soundSynth.playError();
        }
      } else if (cmd === 'HELP' || cmd === '?') {
        onOpenHelp();
      } else if (cmd === 'CLS' || cmd === 'CLEAR') {
        onExecuteSearch('');
      } else {
        // Fallback: search query directly
        onExecuteSearch(trimmed);
      }

      setInputVal('');
    }
  };

  return (
    <div className="dos-cmd-bar">
      <label>C:\SWAPI\{currentCategory.toUpperCase()}&gt;</label>
      <input
        ref={inputRef}
        type="text"
        className="dos-cmd-input"
        placeholder="Escriba un comando (ej. SEARCH Skywalker, DIR planets, THEME rebel, HELP)..."
        value={inputVal}
        onInput={(e) => setInputVal((e.target as HTMLInputElement).value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
