import { SwapiCategory } from '../types/swapi';
import { soundSynth } from '../services/sound';

interface NavbarProps {
  currentCategory: SwapiCategory;
  onSelectCategory: (cat: SwapiCategory) => void;
  onOpenHelp: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Navbar = ({ currentCategory, onSelectCategory, onOpenHelp, isMuted, onToggleMute }: NavbarProps) => {
  const categories: { label: string; key: SwapiCategory }[] = [
    { label: 'Personajes', key: 'people' },
    { label: 'Planetas', key: 'planets' },
    { label: 'Naves', key: 'starships' },
    { label: 'Vehículos', key: 'vehicles' },
    { label: 'Especies', key: 'species' },
    { label: 'Películas', key: 'films' },
  ];

  return (
    <nav className="tui-navbar">
      <ul>
        <li className="tui-dropdown">
          <a className="tui-dropdown-button">SWAPI-DOS</a>
        </li>
        {categories.map((cat) => (
          <li key={cat.key} className={currentCategory === cat.key ? 'active' : ''}>
            <a
              onClick={() => {
                soundSynth.playClick();
                onSelectCategory(cat.key);
              }}
            >
              {cat.label}
            </a>
          </li>
        ))}
        <li style={{ float: 'right' }}>
          <a onClick={() => { soundSynth.playClick(); onToggleMute(); }}>
            AUDIO: {isMuted ? '[MUTED]' : '[ON]'}
          </a>
        </li>
        <li style={{ float: 'right' }}>
          <a onClick={() => { soundSynth.playClick(); onOpenHelp(); }}>
            Ayuda (F1)
          </a>
        </li>
      </ul>
    </nav>
  );
};
