import { FC, useCallback, useMemo, useState, useEffect, useRef } from 'react'

import { Button, Card, Space } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'

import { Arc, Image, Layer, Line, Rect, Stage, Text } from 'react-konva'
import { Stage as StageRef } from 'konva/lib/Stage'
import useImage from 'use-image'

import { Config, jobsByRole } from '../common'

import JobIcon from './canvas/JobIcon'
import PlaystyleIcon from './canvas/PlaystyleIcon'
import LevelIcon from './canvas/LevelIcon'
import Thanks from './Thanks'

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
  const theme = useMemo(() => (config.color.startsWith('black') ? 'dark' : 'light'), [config.color])

  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 })

  const [userImage] = useImage(config.image, 'anonymous')
  const [backgroundImage] = useImage(`./${config.color}.png`, 'anonymous')

  const [job] = useImage(`./icons/${config.job}.png`, 'anonymous')
  const [grade] = useImage(`./gc/${config.company}_${config.grade}.png`, 'anonymous')
  const [expansion] = useImage(`./expansions/${config.expansion}_ko.png`, 'anonymous')

  const [like] = useImage('./ui/like.png', 'anonymous')
  const [dislike] = useImage('./ui/dislike.png', 'anonymous')

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
  const titleFontFamily = useMemo(() => config.titleFont || 'KoPub Dotum', [config.titleFont])
  const lineColor = useMemo(() => (theme === 'dark' ? '#3c3c3c' : '#b3b3b3'), [theme])
  const textColor = useMemo(() => (theme === 'dark' ? '#818181' : '#424242'), [theme])
  const highlightTextColor = useMemo(() => (theme === 'dark' ? '#818181' : '#cccccc'), [theme])

  const image = (
    <>
      {/* 유저 이미지 */}
      <Image image={userImage} scale={{ x: config.scale, y: config.scale }} x={imageOffset.x - (sceneWidth / 2 - leftRectWidth / 2)} y={imageOffset.y} />

      {/* 배경 이미지 */}
      <Image image={backgroundImage} />
    </>
  )

  const leftRect = (
    <>
      {/* 잡 아이콘 */}
      <Image image={job} x={leftRectWidth / 2 - 40} y={810} width={80} height={80} />

      {/* 칭호 */}
      <Text width={leftRectWidth} x={0} y={900} text={config.title} align="center" fontFamily={fontFamily} fontSize={24} fill={'#b3b3b3'} />

      {/* 이름 */}
      <Text width={leftRectWidth} x={0} y={940} text={config.name} align="center" fontFamily={fontFamily} fontSize={48} fill={'white'} />

      {/* 서버 */}
      <Text width={leftRectWidth} x={0} y={990} text={config.server} align="center" fontFamily={fontFamily} fontSize={36} fill={'#8b8b8b'} />
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
        return <Line key={i} points={[rightBoxStartX + step * i, 900 - invert * step, rightBoxStartX + step * (i + 1), 900 + invert * step]} stroke={lineColor} />
      })}
    </>
  )

  const freeCompany = (
    <>
      {/* 총사령부 아이콘 */}
      <Image image={grade} x={leftRectWidth + 57} y={30} width={80} height={80} />
      <Text x={leftRectWidth + 145} y={58} text={`${config.company} ${config.grade}`} fontFamily={fontFamily} fontSize={24} fill={highlightTextColor} />
    </>
  )

  const bozjaEureka = (
    <>
      {/* 에우레카 */}
      <LevelIcon iconPath="eureka" level={config.eurekaLevel ?? 0} theme={theme} x={leftRectWidth + 60} y={110} width={40} height={40} />
      <Text text={config.eurekaLevel?.toString() ?? '0'} x={leftRectWidth + 60 + 45} y={110 + 14} fill={config.eurekaLevel === 0 ? '#5a5a5a' : '#cccccc'} fontSize={30} fontFamily={fontFamily} />

      {/* 보즈야 아이콘 */}
      <LevelIcon iconPath="bozja" level={config.bozjaLevel ?? 0} theme={theme} x={leftRectWidth + 150} y={110} width={40} height={40} />
      <Text text={config.bozjaLevel?.toString() ?? '0'} x={leftRectWidth + 150 + 45} y={110 + 14} fill={config.bozjaLevel === 0 ? '#5a5a5a' : '#cccccc'} fontSize={30} fontFamily={fontFamily} />
    </>
  )

  const jobStartX = rightBoxStartX + 275
  const jobStartY = 35
  const jobIconSize = 60
  const jobPaddingSize = 53

  const jobDividerStrokeWidth = 4
  const jobDividerPadding = jobIconSize / 4.5
  const jobDividerStartX = jobStartX + jobDividerStrokeWidth / 2 + jobIconSize / 2
  const jobDividerColor = useMemo(() => (theme === 'dark' ? '#777777' : '#6e6e6e'), [theme])

  const jobDisabled = useMemo(() => (theme === 'dark' ? 'disabled' : 'disabledLight'), [theme])

  const jobs = (
    <>
      {/* 탱커 */}
      {jobsByRole.tank.map((job, index) => (
        <JobIcon key={job} width={jobIconSize} height={jobIconSize} x={jobStartX + index * jobPaddingSize} y={jobStartY} iconPath={job} colorType={config.jobs.includes(job) ? 'tank' : jobDisabled} />
      ))}

      {/* 탱커 | 힐러 */}
      <Line stroke={jobDividerColor} strokeWidth={jobDividerStrokeWidth} points={[jobDividerStartX + jobPaddingSize * jobsByRole.tank.length, jobStartY + jobDividerPadding, jobDividerStartX + jobPaddingSize * jobsByRole.tank.length, jobStartY + jobIconSize - jobDividerPadding]} />

      {/* 힐러 */}
      {jobsByRole.healer.map((job, index) => (
        <JobIcon key={job} width={jobIconSize} height={jobIconSize} x={jobStartX + index * jobPaddingSize + jobPaddingSize * (1 + jobsByRole.tank.length)} y={jobStartY} iconPath={job} colorType={config.jobs.includes(job) ? 'healer' : jobDisabled} />
      ))}

      {/* 힐러 | 제작자 */}
      <Line
        stroke={jobDividerColor}
        strokeWidth={jobDividerStrokeWidth}
        points={[jobDividerStartX + jobPaddingSize * (1 + jobsByRole.tank.length + jobsByRole.healer.length), jobStartY + jobDividerPadding, jobDividerStartX + jobPaddingSize * (1 + jobsByRole.tank.length + jobsByRole.healer.length), jobStartY + jobIconSize - jobDividerPadding]}
      />

      {/* 제작자 */}
      {jobsByRole.crafter.map((job, index) => (
        <JobIcon key={job} width={jobIconSize} height={jobIconSize} x={jobStartX + index * jobPaddingSize + jobPaddingSize * (1 + jobsByRole.tank.length) + jobPaddingSize * (1 + jobsByRole.healer.length)} y={jobStartY} iconPath={job} colorType={config.jobs.includes(job) ? 'crafter' : jobDisabled} />
      ))}

      {/* 딜러 */}
      {jobsByRole.dps.map((job, index) => (
        <JobIcon key={job} width={jobIconSize} height={jobIconSize} x={jobStartX + index * jobPaddingSize} y={jobStartY + jobIconSize} iconPath={job} colorType={config.jobs.includes(job) ? 'dps' : jobDisabled} />
      ))}

      {/* 딜러 | 채집가 */}
      <Line
        stroke={jobDividerColor}
        strokeWidth={jobDividerStrokeWidth}
        points={[jobDividerStartX + jobPaddingSize * jobsByRole.dps.length, jobStartY + jobIconSize + jobDividerPadding, jobDividerStartX + jobPaddingSize * jobsByRole.dps.length, jobStartY + jobIconSize + jobIconSize - jobDividerPadding]}
      />

      {/* 채집가 */}
      {jobsByRole.gatherer.map((job, index) => (
        <JobIcon key={job} width={jobIconSize} height={jobIconSize} x={jobStartX + index * jobPaddingSize + jobPaddingSize * (1 + jobsByRole.dps.length)} y={jobStartY + jobIconSize} iconPath={job} colorType={config.jobs.includes(job) ? 'gatherer' : jobDisabled} />
      ))}
    </>
  )

  const progress = (
    <>
      {/* 메인 퀘스트 진행도 레이블 */}
      <Text x={600} y={220} text="메인 퀘스트" fontFamily={titleFontFamily} fontSize={30} fill={textColor} />

      {/* 메인 퀘스트 진행도 이미지 */}
      {expansion && <Image image={expansion} x={1310 - (105 * expansion.width) / expansion.height} y={215} height={105} width={(105 * expansion.width) / expansion.height} />}

      {/* 메인 퀘스트 진행도 */}
      <Text x={600} y={265} text={`${config.progress} ${config.expansionOngoing ? '진행 중' : '완료'}`} fontFamily={fontFamily} fontSize={48} fill={textColor} />
    </>
  )

  const times = (
    <>
      {/* 플레이 시간 파이 차트 */}
      {config.playtime.map((play, index) => (
        <Arc key={index} angle={360 / config.playtime.length + 0.5} rotation={-90 + 360 * (index / config.playtime.length)} innerRadius={60} outerRadius={90} x={700} y={460} fill={play ? (index < 12 ? '#45c4f1' : '#f1a251') : '#d2d2d2'} />
      ))}

      <Text text="0" x={625} y={450 - 40} width={150} fontFamily={fontFamily} fontSize={25} fill={textColor} align="center" />
      <Text text="6" x={625 + 40} y={450} width={150} fontFamily={fontFamily} fontSize={25} fill={textColor} align="center" />
      <Text text="12" x={625} y={450 + 40} width={150} fontFamily={fontFamily} fontSize={25} fill={textColor} align="center" />
      <Text text="18" x={625 - 40} y={450} width={150} fontFamily={fontFamily} fontSize={25} fill={textColor} align="center" />
    </>
  )

  const playstyle = (
    <>
      {Array.from(Array(5)).map((_, i) => (
        <PlaystyleIcon key={i} x={835 + 95 * i} y={370} iconPath={config.playstyles[i]} />
      ))}
      {Array.from(Array(5)).map((_, i) => (
        <PlaystyleIcon key={i + 5} x={835 + 95 * i} y={465} iconPath={config.playstyles[i + 5]} />
      ))}
    </>
  )

  const likes = (
    <>
      {/* 좋아요 */}
      <Image image={like} x={620} y={620} height={70} width={70} />
      <Text x={620 + 100} y={620 + 12} text={config.like} fontFamily={fontFamily} fontSize={42} fill={textColor} />

      {/* 싫어요 */}
      <Image image={dislike} x={620} y={770} height={70} width={70} />
      <Text x={620 + 100} y={770 + 12} text={config.dislike} fontFamily={fontFamily} fontSize={42} fill={textColor} />
    </>
  )

  const mastodon = (
    <>
      {/* 마스토돈 계정명 */}
      <Text x={rightSeparatorX + 22} y={225} text={config.mastodonName} fontFamily={fontFamily} fontSize={48} fill={textColor} />

      {/* 마스토돈 핸들 */}
      <Text x={rightSeparatorX + 22} y={280} text={config.handle} fontFamily={fontFamily} fontSize={36} fill={textColor} />

      {/* 마스토돈 주 장르 레이블 */}
      <Text x={rightSeparatorX + 22} y={350} text="MAIN" fontFamily={titleFontFamily} fontSize={30} fill={textColor} fontStyle="bold" />
      {/* 마스토돈 주 장르 텍스트 */}
      <Text x={rightSeparatorX + 22} y={390} text={config.mastodonMain} fontFamily={fontFamily} fontSize={30} fill={textColor} />

      {/* 마스토돈 서브 장르 레이블 */}
      <Text x={rightSeparatorX + 22} y={440} text="ETC" fontFamily={titleFontFamily} fontSize={30} fill={textColor} fontStyle="bold" />
      {/* 마스토돈 서브 장르 텍스트 */}
      <Text x={rightSeparatorX + 22} y={480} text={config.mastodonSub} fontFamily={fontFamily} fontSize={30} fill={textColor} />
    </>
  )

  const orientations = (
    <>
      {/* 마스토돈 툿 성향 레이블 */}
      <Text x={rightSeparatorX + 22} y={575} text="툿 성향" fontFamily={titleFontFamily} fontSize={30} fill={textColor} fontStyle="bold" />
      {/* 마스토돈 툿 성향 텍스트 */}
      <Text x={rightSeparatorX + 22} y={615} text={config.orientations.length ? config.orientations.join(' | ') : '-'} fontFamily={fontFamily} fontSize={24} fill={textColor} />

      {/* 마스토돈 커플링 성향 레이블 */}
      <Text x={rightSeparatorX + 22} y={675} text="커플링 성향" fontFamily={titleFontFamily} fontSize={30} fill={textColor} fontStyle="bold" />
      {/* 마스토돈 커플링 성향 텍스트 */}
      <Text x={rightSeparatorX + 22} y={715} text={config.couplings.length ? config.couplings.join(' | ') : '-'} fontFamily={fontFamily} fontSize={24} fill={textColor} />

      {/* 마스토돈 기피 소재 레이블 */}
      <Text x={rightSeparatorX + 22} y={775} text="기피 소재" fontFamily={titleFontFamily} fontSize={30} fill={textColor} fontStyle="bold" />
      {/* 마스토돈 기피 소재 텍스트 */}
      <Text x={rightSeparatorX + 22} y={815} text={config.avoids.length ? config.avoids.join(' | ') : '-'} fontFamily={fontFamily} fontSize={24} fill={textColor} />
    </>
  )

  const commentText = config.comment || '-'
  const isMultiLine = commentText.split('\n').length >= 2

  const comment = (
    <>
      {/* 한마디 */}
      <Text x={leftRectWidth + 50} y={950} text="한마디" fontFamily={fontFamily} fontSize={48} fill={textColor} fontStyle="bold" />
      <Text x={leftRectWidth + 190} y={isMultiLine ? 932 : 952} width={1150} text={commentText} fontFamily={fontFamily} fontSize={isMultiLine ? 36 : 42} fill={textColor} lineHeight={isMultiLine ? 1.25 : undefined} />
    </>
  )

  const copyright = (
    <>
      <Text width={1895} align="right" x={0} y={1005} text="https://chalkpe.github.io/toot-friends/" fontFamily={fontFamily} fontSize={24} fill={textColor} opacity={0.5} />
      <Text width={1895} align="right" x={0} y={1040} text={`©2010-${new Date().getFullYear()} SQUARE ENIX CO., LTD. All Rights Reserved. Published in Korea by Actoz Soft CO., LTD.`} fontFamily={fontFamily} fontSize={24} fill={textColor} opacity={0.5} />
    </>
  )

  return (
    <Card
      hoverable
      title={
        <Space>
          <span>툿친소 시트 메이커</span>
          <Thanks />
        </Space>
      }
      bodyStyle={{ padding: 0 }}
      extra={
        <Button type="text" icon={<DownloadOutlined />} onClick={download}>
          다운로드
        </Button>
      }
    >
      <Stage ref={ref} width={sceneWidth} height={sceneHeight} style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8, overflow: 'hidden' }}>
        <Layer>
          {image}
          {lines}
          {leftRect}
          {jobs}
          {likes}
          {progress}
          {mastodon}
          {orientations}
          {times}
          {playstyle}
          {comment}
          {copyright}
          {freeCompany}
          {bozjaEureka}

          {/* 왼쪽 이미지 드래그시키는 녀석 */}
          <Rect
            x={0}
            y={0}
            width={sceneWidth}
            height={sceneHeight}
            draggable
            onDragEnd={(e) => e.target.to({ x: 0, y: 0 })}
            onDragMove={(e) => {
              if (Number.isFinite(e.evt.movementX) && Number.isFinite(e.evt.movementY)) setImageOffset({ x: imageOffset.x + e.evt.movementX, y: imageOffset.y + e.evt.movementY })
            }}
          ></Rect>
        </Layer>
      </Stage>
    </Card>
  )
}

export default Canvas
