import './App.css'

import { useState } from 'react'
import { Layout } from 'antd'

import Canvas from './components/Canvas'
import Options from './components/Options'

import { Config, defaultConfig } from './common'

function App() {
  const [config, setConfig] = useState<Config>(defaultConfig)

  return (
    <Layout>
      <Layout.Content>
        <Canvas config={config} />
        <Options config={config} setConfig={setConfig} />
      </Layout.Content>

      <Layout.Footer>
        asdasd
      </Layout.Footer>
    </Layout>
  )
}

export default App
