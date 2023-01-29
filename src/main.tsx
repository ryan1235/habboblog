import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import './index.css'
import Router from './Router'
import { ThemeProvider } from '@material-tailwind/react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
