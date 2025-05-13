import { createRoot } from 'react-dom/client';

import { AppProvider } from './provider';

import './styles/index.css';

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById('root')!).render(<AppProvider />);
