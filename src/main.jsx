import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Hub from './Hub.jsx'
import CursedSpiritGenerator from './CursedSpiritGenerator.jsx'
import ForbiddenFactory from './ForbiddenFactory.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Hub />} />
        <Route path="/cursed-spirit" element={<CursedSpiritGenerator />} />
        <Route path="/forbidden-factory" element={<ForbiddenFactory />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
)
