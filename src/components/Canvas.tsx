import { FC, useCallback, useMemo, useState, useEffect, useRef } from 'react'

import { Button, Card } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'

import { Image, Layer, Rect, Stage, Text } from 'react-konva'
import { Stage as StageRef } from 'konva/lib/Stage'
import useImage from 'use-image'

import { Config, iconPrefix } from '../common'

const sceneWidth = 1920
const sceneHeight = 1080

const leftRectWidth = 544

interface CanvasProps {
  config: Config
}

const Canvas: FC<CanvasProps> = ({ config }) => {
  const ref = useRef<StageRef>(null)
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 })

  const [image] = useImage(config.image, 'anonymous')
  const [white] = useImage('./white.png', 'anonymous')
  const [black] = useImage('./black.png', 'anonymous')
  const [job] = useImage(`${iconPrefix}/${config.job}.png`, 'anonymous')

  const resize = useCallback(() => {
    const stage = ref.current
    if (!stage) return

    const container = stage.container()
    const scale = container.offsetWidth / sceneWidth

    stage.width(sceneWidth * scale)
    stage.height(sceneHeight * scale)
    stage.scale({ x: scale, y: scale })
  }, [ref])

  const download = useCallback(() => {
    const stage = ref.current
    if (!stage) return

    const a = document.createElement('a')
    a.href = stage.toDataURL()
    a.download = 'toot-friends.png'
    a.click()
  }, [ref])

  useEffect(() => {
    resize()
    window.addEventListener('resize', resize)
    return () => void window.removeEventListener('resize', resize)
  })

  const fontFamily = useMemo(() => config.font || 'Noto Sans KR', [config.font])

  return (
    <Card
      hoverable
      title="툿친소 시트 메이커"
      bodyStyle={{ padding: 0 }}
      extra={
        <Button type="text" icon={<DownloadOutlined />} onClick={download}>
          다운로드
        </Button>
      }
    >
      <Stage
        ref={ref}
        width={sceneWidth}
        height={sceneHeight}
        style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8, overflow: 'hidden' }}
      >
        <Layer>
          <Image
            image={image}
            scale={{ x: config.scale, y: config.scale }}
            x={imageOffset.x - (sceneWidth / 2 - leftRectWidth / 2)}
            y={imageOffset.y}
          />

          {/* 배경 이미지 */}
          <Image image={config.color === 'white' ? white : black} />

          {/* 잡 아이콘 */}
          <Image image={job} x={leftRectWidth / 2 - 40} y={810} width={80} height={80} />

          {/* 칭호 */}
          <Text
            width={leftRectWidth}
            x={0}
            y={900}
            text={config.title}
            align="center"
            fontFamily={fontFamily}
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
            fontFamily={fontFamily}
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
            fontFamily={fontFamily}
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
            onDragMove={(e) =>
              setImageOffset({ x: imageOffset.x + e.evt.movementX, y: imageOffset.y + e.evt.movementY })
            }
            onDragEnd={(e) => e.target.to({ x: 0, y: 0 })}
          ></Rect>
        </Layer>
      </Stage>
    </Card>
  )
}

export default Canvas
