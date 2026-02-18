import { FC, useMemo, useState } from 'react'
import { Config, expansions, jobNames, playstyles } from '../common'
import { Button, Modal, Typography } from 'antd'
import { CloseOutlined, CopyOutlined } from '@ant-design/icons'

const oneLine = (str: string) => str.replace(/\n/g, ' ').trim() || '-'

interface AltProps {
  config: Config
}

const Alt: FC<AltProps> = ({ config }) => {
  const [open, setOpen] = useState(false)

  // 메인 퀘스트 진도
  const msq = useMemo(() => {
    const ongoing = config.expansionOngoing ? '진행 중' : '완료'
    const exp = config.expansion ? (expansions.find((e) => e.value === config.expansion)?.label ?? '') : ''
    const prog = config.progress ? (expansions.flatMap((e) => e.options).find((o) => o.value === config.progress)?.label ?? '') : ''

    return `${[exp, prog].filter(Boolean).join(' - ')} ${ongoing}`.trim()
  }, [config])

  const text = useMemo(
    () => `# 툿친소 시트
${oneLine(config.mastodonName)} (${oneLine(config.handle)})
${config.title ? `<·${config.title}·> ` : ''}${[config.name, config.server].filter(Boolean).join('@')}${config.job ? (config.job in jobNames ? ` (${jobNames[config.job as keyof typeof jobNames]} 주직)` : ` (${config.job} 주직)`) : ''}

## 한마디
${oneLine(config.comment)}

## 연합우주
- 메인 장르: ${oneLine(config.mastodonMain)}
- 서브 장르: ${oneLine(config.mastodonSub)}
- 툿 성향: ${config.orientations.length > 0 ? config.orientations.join(', ') : '-'}
- 커플링 성향: ${config.couplings.length > 0 ? config.couplings.join(', ') : '-'}
- 기피 소재: ${config.avoids.length > 0 ? config.avoids.join(', ') : '-'}

## 파판14
- 선호 직업: ${config.jobs.length > 0 ? config.jobs.map((job) => (job in jobNames ? jobNames[job as keyof typeof jobNames] : job)).join(', ') : '-'}
- 메인 퀘스트 진도: ${msq || '-'}
- 플레이 시간대: ${
      config.playtime
        .map((v, i) => (v ? `${i}시` : null))
        .filter(Boolean)
        .join(', ') || '-'
    }
- 플레이 스타일: ${config.playstyles.length > 0 ? config.playstyles.map((style) => (style in playstyles ? playstyles[style as keyof typeof playstyles] : style)).join(', ') : '-'}
- 좋아요: ${oneLine(config.like)}
- 싫어요: ${oneLine(config.dislike)}`,
    [config, msq]
  )

  return (
    <>
      <Button type="text" icon={<CopyOutlined />} onClick={() => setOpen(true)}>
        ALT
      </Button>
      <Modal
        open={open}
        closeIcon={<CloseOutlined onClick={() => setOpen(false)} />}
        title="ALT"
        footer={
          <Button
            type="primary"
            icon={<CopyOutlined />}
            onClick={() => {
              navigator.clipboard.writeText(text)
              setOpen(false)
            }}
          >
            복사하고 닫기
          </Button>
        }
      >
        <Typography>
          <Typography.Text style={{ whiteSpace: 'pre-wrap' }}>
            {text.trim()}
          </Typography.Text>
        </Typography>
      </Modal>
    </>
  )
}

export default Alt
