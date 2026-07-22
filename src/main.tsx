import { render } from 'preact';
import { App } from './App';
import './styles.css';

const rootEl = document.getElementById('app');
if (rootEl) {
  render(<App />, rootEl);
}
