import { useState } from 'react'
import { Card, Container } from '@nextui-org/react'

import Canvas from './components/Canvas'
import Options from './components/Options'

export type Config = {
  color: 'black' | 'white'
  font: string
  name: string
  server: string
  title: string
}

function App() {
  const [config, setConfig] = useState<Config>({
    color: 'black',
    font: 'Noto Sans KR',
    name: '초크',
    server: '초코보',
    title: '궁극의 전설',
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
