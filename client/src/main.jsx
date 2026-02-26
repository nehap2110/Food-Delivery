import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from './context/AppContext.jsx';
import "@radix-ui/themes/styles.css";

import './index.css'
import App from './App.jsx'
import { Theme } from '@radix-ui/themes/dist/cjs/index.js';

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <AppContextProvider>
      <Theme>
        <App />
      </Theme>
    </AppContextProvider>
  </BrowserRouter>

)
