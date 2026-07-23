import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/preact';
import { RightPane } from './RightPane';
import { DatFileEntry } from '../types/swapi';

describe('RightPane Component', () => {
  const mockEntry: DatFileEntry = {
    filename: '001_LUKE_SKYWALKER.DAT',
    name: 'Luke Skywalker',
    sizeKb: '1.72 KB',
    category: 'people',
    data: {
      name: 'Luke Skywalker',
      height: '172',
      mass: '73',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: ['https://swapi.dev/api/films/1/']
    } as any
  };

  it('renders empty message when no entry is selected', () => {
    const { getByText } = render(<RightPane selectedEntry={null} />);
    expect(getByText(/Seleccione un archivo .DAT/i)).toBeDefined();
  });

  it('renders entity details and active tab buttons', () => {
    const { getByText } = render(
      <RightPane selectedEntry={mockEntry} activeTab="general" />
    );

    expect(getByText(/001_LUKE_SKYWALKER.DAT/i)).toBeDefined();
    expect(getByText('LUKE SKYWALKER')).toBeDefined();
    expect(getByText(/PEOPLE/i)).toBeDefined();
    expect(getByText('[1] General')).toBeDefined();
  });

  it('triggers onTabChange when tab button is clicked', () => {
    const handleTabChange = vi.fn();
    const { getByText } = render(
      <RightPane selectedEntry={mockEntry} activeTab="general" onTabChange={handleTabChange} />
    );

    fireEvent.click(getByText('[2] Estadísticas'));
    expect(handleTabChange).toHaveBeenCalledWith('stats');
  });

  it('renders interactive links for SWAPI relation URLs and handles clicks', () => {
    const handleNavigate = vi.fn();
    const { getByText } = render(
      <RightPane selectedEntry={mockEntry} activeTab="general" onNavigateToUrl={handleNavigate} />
    );

    const planetLink = getByText('[VER PLANETS #1]');
    expect(planetLink).toBeDefined();

    fireEvent.click(planetLink);
    expect(handleNavigate).toHaveBeenCalledWith('https://swapi.dev/api/planets/1/');
  });
});
