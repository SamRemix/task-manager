// import React from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'

import './styles/global.scss'
import './styles/form.scss'

import './styles/responsive.scss'

import App from './App'
import Context from './context'

const root = createRoot(document.getElementById('root'))
root.render(
  <Context>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context>
)