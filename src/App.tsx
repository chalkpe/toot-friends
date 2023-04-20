import { useState } from 'react'
import { Card, Container } from '@nextui-org/react'

import Canvas from './components/Canvas'
import Options from './components/Options'

export type Config = {
  name: string
  color: 'black' | 'white'
}

function App() {
  const [config, setConfig] = useState<Config>({
    name: '',
    color: 'black',
  })

  return (
    <Container css={{ padding: '$10' }}>
      <Canvas config={config} />

      <Card css={{ marginTop: '$10' }}>
        <Card.Header>옵션</Card.Header>
        <Card.Body>
          <Options config={config} setConfig={setConfig} />
        </Card.Body>
      </Card>
    </Container>
  )
}

export default App
