import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from '../src/App';

import store from '../src/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </ReduxProvider>
  </React.StrictMode>
);
