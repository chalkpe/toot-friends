import React from 'react'
import ReactDOM from 'react-dom/client'

import WebFont from 'webfontloader'

import App from './App'

WebFont.load({ google: { families: ['Noto Sans KR'] } })

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
