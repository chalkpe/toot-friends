import { Stage as StageRef } from 'konva/lib/Stage'
import { FC, useCallback, useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { Image, Layer, Rect, Stage, Text } from 'react-konva'
import useImage from 'use-image'
import { Config } from '../App'

const sceneWidth = 1920
const sceneHeight = 1080

interface CanvasProps {
  config: Config
}

const Canvas: FC<CanvasProps> = ({ config }) => {
  const ref = useRef<StageRef>(null)
  const [imageOffset, setImageOffset] = useState(0)

  const [white] = useImage('/white.png')
  const [black] = useImage('/black.png')

  const [chalk] = useImage(
    'https://media.chalk.moe/media_attachments/files/109/389/476/054/454/399/original/88fd01a67facadd4.png'
  )

  const [job] = useImage(
    'https://raw.githubusercontent.com/xivapi/classjob-icons/master/icons/summoner.png'
  )

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

  const leftRectWidth = 544

  return (
    <Stage ref={ref} width={1920} height={1080}>
      <Layer>
        <Image
          image={chalk}
          x={-(sceneWidth / 2 - leftRectWidth / 2) + imageOffset}
        />

        {/* 배경 이미지 */}
        <Image image={config.color === 'white' ? white : black} />

        {/* 잡 아이콘 */}
        <Image
          image={job}
          x={leftRectWidth / 2 - 40}
          y={810}
          width={80}
          height={80}
        />

        {/* 칭호 */}
        <Text
          width={leftRectWidth}
          x={0}
          y={900}
          text={config.title}
          align="center"
          fontFamily={config.font}
          fontSize={24}
          fill={'#b3b3b3'}
        />

        {/* 이름 */}
        <Text
          width={leftRectWidth}
          x={0}
          y={940}
          text={config.name}
          align="center"
          fontStyle="bold"
          fontFamily={config.font}
          fontSize={48}
          fill={'white'}
        />

        {/* 서버 */}
        <Text
          width={leftRectWidth}
          x={0}
          y={990}
          text={config.server}
          align="center"
          fontFamily={config.font}
          fontSize={36}
          fill={'#8b8b8b'}
        />

        {/* 왼쪽 이미지 드래그시키는 녀석 */}
        <Rect
          x={0}
          y={0}
          width={sceneWidth}
          height={sceneHeight}
          draggable
          onDragMove={(e) => setImageOffset(imageOffset + e.evt.movementX)}
          onDragEnd={(e) => e.target.to({ x: 0, y: 0 })}
        ></Rect>
      </Layer>
    </Stage>
  )
}

export default Canvas
