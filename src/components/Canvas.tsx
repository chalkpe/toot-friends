import { Stage as StageRef } from 'konva/lib/Stage'
import { FC, useCallback } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { Image, Layer, Stage, Text } from 'react-konva'
import useImage from 'use-image'
import { Config } from '../App'

const sceneWidth = 1920
const sceneHeight = 1080

interface CanvasProps {
  config: Config
}

const Canvas: FC<CanvasProps> = ({ config }) => {
  const ref = useRef<StageRef>(null)

  const [white] = useImage('/white.png')
  const [black] = useImage('/black.png')

  const resize = useCallback(() => {
    const stage = ref.current
    if (!stage) return

    const container = stage.container()
    const scale = container.offsetWidth / sceneWidth

    stage.width(sceneWidth * scale)
    stage.height(sceneHeight * scale)
    stage.scale({ x: scale, y: scale })
  }, [])

  useEffect(() => {
    resize()
    window.addEventListener('resize', resize)
    return () => void window.removeEventListener('resize', resize)
  })

  return (
    <Stage ref={ref} width={1920} height={1080}>
      <Layer>
        <Image image={config.color === 'white' ? white : black} />
        <Text
          width={500}
          x={100}
          y={900}
          text={config.name}
          align="center"
          fontFamily="Noto Sans KR"
          fontSize={36}
        />
      </Layer>
    </Stage>
  )
}

export default Canvas
