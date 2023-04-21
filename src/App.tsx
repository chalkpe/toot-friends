import { useState } from 'react'
import { Layout } from 'antd'

import Canvas from './components/Canvas'
import Options from './components/Options'

import { Config, defaultConfig } from './common'

function App() {
  const [config, setConfig] = useState<Config>(defaultConfig)

  return (
    <Layout style={{ padding: 10 }}>
      <Layout.Content>
        <Canvas config={config} />
        <Options config={config} setConfig={setConfig} />
      </Layout.Content>
    </Layout>
  )
}

export default App
