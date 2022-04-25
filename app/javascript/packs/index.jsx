import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './routes'

document.addEventListener('DOMContentLoaded', () => {
  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(<Routes />)
})
