import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/preact';
import { StatusBar } from './StatusBar';

describe('StatusBar Component', () => {
  it('renders function keys F1 to F10 correctly', () => {
    const handleFnKey = vi.fn();
    const { getByText } = render(<StatusBar statusText="ONLINE" onFnKey={handleFnKey} />);

    expect(getByText('F1')).toBeDefined();
    expect(getByText('Ayuda')).toBeDefined();
    expect(getByText('F2')).toBeDefined();
    expect(getByText('F3')).toBeDefined();
    expect(getByText('F10')).toBeDefined();
    expect(getByText('ONLINE')).toBeDefined();
  });

  it('triggers onFnKey callback when a function key is clicked', () => {
    const handleFnKey = vi.fn();
    const { getByText } = render(<StatusBar statusText="ONLINE" onFnKey={handleFnKey} />);

    const f2Key = getByText('F2').parentElement;
    if (f2Key) {
      fireEvent.click(f2Key);
      expect(handleFnKey).toHaveBeenCalledWith(2);
    }

    const f10Key = getByText('F10').parentElement;
    if (f10Key) {
      fireEvent.click(f10Key);
      expect(handleFnKey).toHaveBeenCalledWith(10);
    }
  });
});
