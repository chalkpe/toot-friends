import { FC, useCallback, useMemo, useState, useEffect, useRef } from 'react'

import { Button, Card, Space } from 'antd'
import { DownloadOutlined, InfoCircleOutlined } from '@ant-design/icons'

import { Image, Layer, Line, Rect, Stage, Text } from 'react-konva'
import { Stage as StageRef } from 'konva/lib/Stage'
import useImage from 'use-image'

import { Config } from '../common'

const sceneWidth = 1920
const sceneHeight = 1080

const leftRectWidth = 544
const rightBoxStartX = 586
const rightSeparatorX = 1328

interface CanvasProps {
  config: Config
}

const Canvas: FC<CanvasProps> = ({ config }) => {
  const ref = useRef<StageRef>(null)
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 })

  const [white] = useImage('./white.png', 'anonymous')
  const [black] = useImage('./black.png', 'anonymous')
  const [userImage] = useImage(config.image, 'anonymous')

  const [job] = useImage(`./icons/${config.job}.png`, 'anonymous')
  const [expansion] = useImage(`./expansions/${config.expansion}.png`, 'anonymous')

  const resize = useCallback((scale: number) => {
    const stage = ref.current
    if (stage) {
      stage.width(sceneWidth * scale)
      stage.height(sceneHeight * scale)
      stage.scale({ x: scale, y: scale })
    }
  }, [])

  const resizeToContainer = useCallback(() => {
    const stage = ref.current
    if (stage) {
      const container = stage.container()
      resize(container.offsetWidth / sceneWidth)
    }
  }, [resize])

  const download = useCallback(() => {
    const stage = ref.current
    if (!stage) return

    resize(1)

    const a = document.createElement('a')
    a.href = stage.toDataURL()
    a.target = '_blank'
    a.download = 'toot-friends.png'
    a.click()

    resizeToContainer()
  }, [resize, resizeToContainer])

  useEffect(() => {
    resizeToContainer()
    window.addEventListener('resize', resizeToContainer)
    return () => void window.removeEventListener('resize', resizeToContainer)
  })

  const fontFamily = useMemo(() => config.font || 'Noto Sans KR', [config.font])
  const lineColor = useMemo(() => (config.color === 'black' ? '#3c3c3c' : '#b3b3b3'), [config.color])
  const textColor = useMemo(() => (config.color === 'black' ? '#818181' : '#424242'), [config.color])

  const image = (
    <>
      {/* 유저 이미지 */}
      <Image
        image={userImage}
        scale={{ x: config.scale, y: config.scale }}
        x={imageOffset.x - (sceneWidth / 2 - leftRectWidth / 2)}
        y={imageOffset.y}
      />

      {/* 배경 이미지 */}
      <Image image={config.color === 'white' ? white : black} />
    </>
  )

  const leftRect = (
    <>
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
    </>
  )

  const lines = (
    <>
      {/* 세로 구분선 */}
      <Line points={[rightSeparatorX, 221, rightSeparatorX, 853]} stroke={lineColor} dash={[10, 10]} />

      {/* 왼쪽 가로선 #1 */}
      <Line points={[rightBoxStartX, 340, rightSeparatorX - 18, 340]} stroke={lineColor} dash={[10, 10]} />

      {/* 왼쪽 가로선 #2 */}
      <Line points={[rightBoxStartX, 578, rightSeparatorX - 18, 578]} stroke={lineColor} dash={[10, 10]} />

      {/* 왼쪽 가로선 #3 */}
      <Line points={[rightBoxStartX + 20, 725, rightSeparatorX - 38, 725]} stroke={lineColor} dash={[10, 10]} />

      {/* 오른쪽 가로선 #1 */}
      <Line points={[rightSeparatorX + 22, 542, 1844, 542]} stroke={lineColor} dash={[10, 10]} />

      {/* 지그재그 선 */}
      {Array.from(Array(50)).map((_, i, a) => {
        const invert = i % 2 !== 0 ? 0.5 : -0.5
        const step = (1844 - rightBoxStartX) / a.length
        return (
          <Line
            key={i}
            points={[
              rightBoxStartX + step * i,
              900 - invert * step,
              rightBoxStartX + step * (i + 1),
              900 + invert * step,
            ]}
            stroke={lineColor}
          />
        )
      })}
    </>
  )

  const progress = (
    <>
      {/* 메인 퀘스트 진행도 레이블 */}
      <Text x={600} y={220} text="메인 퀘스트" fontFamily={'KoPub Dotum'} fontSize={30} fill={textColor} />

      {/* 메인 퀘스트 진행도 이미지 */}
      {expansion && (
        <Image
          image={expansion}
          x={1310 - (105 * expansion.width) / expansion.height}
          y={215}
          height={105}
          width={(105 * expansion.width) / expansion.height}
        />
      )}

      {/* 메인 퀘스트 진행도 */}
      <Text x={600} y={265} text={config.progress} fontFamily={fontFamily} fontSize={48} fill={textColor} />
    </>
  )

  const mastodon = (
    <>
      {/* 마스토돈 계정명 */}
      <Text
        x={rightSeparatorX + 22}
        y={225}
        text={config.mastodonName}
        fontFamily={fontFamily}
        fontSize={48}
        fill={textColor}
      />

      {/* 마스토돈 핸들 */}
      <Text
        x={rightSeparatorX + 22}
        y={280}
        text={config.handle}
        fontFamily={fontFamily}
        fontSize={36}
        fill={textColor}
      />

      {/* 메인 퀘스트 진행도 레이블 */}
      <Text
        x={rightSeparatorX + 22}
        y={350}
        text="MAIN"
        fontFamily={'KoPub Dotum'}
        fontSize={30}
        fill={textColor}
        fontStyle="bold"
      />
      <Text
        x={rightSeparatorX + 22}
        y={390}
        text={config.mastodonMain}
        fontFamily={fontFamily}
        fontSize={30}
        fill={textColor}
      />
      <Text
        x={rightSeparatorX + 22}
        y={440}
        text="ETC"
        fontFamily={'KoPub Dotum'}
        fontSize={30}
        fill={textColor}
        fontStyle="bold"
      />
      <Text
        x={rightSeparatorX + 22}
        y={480}
        text={config.mastodonSub}
        fontFamily={fontFamily}
        fontSize={30}
        fill={textColor}
      />
    </>
  )

  return (
    <Card
      hoverable
      title={
        <Space>
          <span>툿친소 시트 메이커</span>
          <InfoCircleOutlined />
        </Space>
      }
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
          {image}
          {lines}
          {leftRect}
          {progress}
          {mastodon}

          {/* 왼쪽 이미지 드래그시키는 녀석 */}
          <Rect
            x={0}
            y={0}
            width={sceneWidth}
            height={sceneHeight}
            draggable
            onDragEnd={(e) => e.target.to({ x: 0, y: 0 })}
            onDragMove={(e) => {
              if (Number.isFinite(e.evt.movementX) && Number.isFinite(e.evt.movementY))
                setImageOffset({ x: imageOffset.x + e.evt.movementX, y: imageOffset.y + e.evt.movementY })
            }}
          ></Rect>
        </Layer>
      </Stage>
    </Card>
  )
}

export default Canvas
