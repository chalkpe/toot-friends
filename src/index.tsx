import React from 'react'
import ReactDOM from 'react-dom/client'

import WebFont from 'webfontloader'

import App from './App'
import AppSkeleton from './AppSkeleton'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

WebFont.load({
  google: { families: ['Noto Sans KR'] },
  custom: {
    families: ['나눔바른펜OTF', 'KoPub Dotum', 'Pretendard'],
    urls: ['https://unpkg.com/@kfonts/nanum-barun-pen-otf/index.css', 'https://cdn.jsdelivr.net/npm/font-kopub@1.0/kopubdotum.min.css', 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css'],
  },

  loading: () => {
    root.render(
      <React.StrictMode>
        <AppSkeleton />
      </React.StrictMode>
    )
  },
  active: () => {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  },
})
