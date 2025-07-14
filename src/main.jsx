import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.scss';
import AppRouter from './router';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <AppRouter />
    </StrictMode>,
  );
}
