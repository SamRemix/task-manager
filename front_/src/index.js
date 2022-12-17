// import React from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'

import './styles/layout.scss'
// import './styles/navbar.scss'
// import './styles/tasks.scss'
import './styles/form.scss'
import './styles/button.scss'

import './styles/responsive.scss'

import App from './App'
import Context from './context/Context'

const root = createRoot(document.getElementById('root'))
root.render(
  <Context>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context>
)