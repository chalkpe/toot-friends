import './App.css'

import { useEffect, useState } from 'react'
import { Layout } from 'antd'

import Canvas from './components/Canvas'
import Options from './components/Options'

import { Config, defaultConfig } from './common'

function App() {
  const conf = localStorage.getItem('config')
  const [config, setConfig] = useState<Config>(conf ? JSON.parse(conf) : defaultConfig)

  useEffect(() => {
    const { image, ...rest } = config
    localStorage.setItem('config', JSON.stringify(rest))
  }, [config])
  
  return (
    <Layout>
      <Layout.Content>
        <Canvas config={config} />
        <Options config={config} setConfig={setConfig} />
      </Layout.Content>

      <Layout.Footer>
        This site is not affiliated with Square Enix
        <br />
        FINAL FANTASY is a registered trademark of Square Enix Holdings Co., Ltd.
        <br />© 2010 - {new Date().getFullYear()} SQUARE ENIX CO., LTD. All Rights Reserved. Published in Korea by Actoz Soft CO., LTD.
      </Layout.Footer>
    </Layout>
  )
}

export default App
