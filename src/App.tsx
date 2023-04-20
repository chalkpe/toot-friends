import { useState } from 'react'

import Canvas from './components/Canvas'
import Options from './components/Options'

import { Config, defaultConfig } from './common'

function App() {
  const [config, setConfig] = useState<Config>(defaultConfig)

  return (
    <div className='App'>
      <Canvas config={config} />
      <Options config={config} setConfig={setConfig} />
    </div>
  )
}

export default App
