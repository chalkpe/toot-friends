import React from 'react'
import ReactDOM from 'react-dom/client'

import WebFont from 'webfontloader'

import App from './App'

WebFont.load({
  google: { families: ['Noto Sans KR']},
  custom: {
    families: ['NanumBarunpen', 'KoPub Dotum'],
    urls: [
      'https://webfontworld.github.io/NanumBarunpen/NanumBarunpen.css',
      'https://cdn.jsdelivr.net/npm/font-kopub@1.0/kopubdotum.min.css',
    ],
  },

  active: () => {
    const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  },
})
