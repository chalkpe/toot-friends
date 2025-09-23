import { FC, useCallback, useState } from 'react'
import { AutoComplete, Button, Card, Checkbox, Form, Image, Input, InputNumber, Radio, Select, Slider, Space, Upload } from 'antd'
import { RcFile } from 'antd/es/upload'
import { UploadOutlined } from '@ant-design/icons'

import { Config, avoids, companies, coupling, expansions, grades, orientations, playstyles, servers } from '../common'
import JobSelect from './options/JobSelect'

interface OptionsProps {
  config: Config
  setConfig: (config: Config) => void
}

const Options: FC<OptionsProps> = ({ config, setConfig }) => {
  const [key, setKey] = useState('basic')

  const setJob = useCallback((job: string) => setConfig({ ...config, job: config.job === job ? undefined : job }), [config, setConfig])
  const setJobs = useCallback((job: string) => setConfig({ ...config, jobs: config.jobs.includes(job) ? config.jobs.filter((j) => j !== job) : [...config.jobs, job] }), [config, setConfig])

  const components = {
    basic: (
      <Space direction="vertical">
        <Form.Item label="카드 이미지 (1920*1080px 권장)">
          <Upload
            accept="image/*"
            listType="picture"
            maxCount={1}
            defaultFileList={config.image ? [{ uid: '1', name: 'image.png', url: config.image, status: 'done' }] : undefined}
            beforeUpload={() => false}
            onRemove={() => setConfig({ ...config, image: null })}
            onChange={(info) => {
              if (info.fileList.length) {
                const reader = new FileReader()
                reader.addEventListener('load', () => setConfig({ ...config, image: reader.result }))
                reader.readAsDataURL(info.file as RcFile)
              }
            }}
          >
            <Button icon={<UploadOutlined />}>이미지 선택하기</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="카드 이미지 확대/축소">
          <Slider min={0} max={2} step={0.01} tooltip={{ formatter: (value) => `${Math.floor((value ?? 0) * 100)}%` }} defaultValue={config.scale} onChange={(scale) => setConfig({ ...config, scale })} />
        </Form.Item>

        <Form.Item label="대표 직업">
          <JobSelect selectedJobs={config.job} onSelect={setJob} />
        </Form.Item>

        <Form.Item label="캐릭터 정보">
          <Space.Compact style={{ width: '100%' }}>
            <Input value={config.name} onChange={(e) => setConfig({ ...config, name: e.target.value })} placeholder="닉네임" />
            <AutoComplete
              value={config.server}
              onChange={(server) => setConfig({ ...config, server })}
              placeholder="서버"
              options={servers.map((server) => ({
                ...server,
                options: server.options.map((o) => ({ label: o, value: o })),
              }))}
              filterOption={(inputValue, option) => option?.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1}
            />
            <Input value={config.title} onChange={(e) => setConfig({ ...config, title: e.target.value })} placeholder="칭호" />
          </Space.Compact>
        </Form.Item>

        <Form.Item label="한마디">
          <Input.TextArea style={{ height: 80 }} value={config.comment} onChange={(e) => setConfig({ ...config, comment: e.target.value })} placeholder="한마디" />
        </Form.Item>
      </Space>
    ),

    theme: (
      <Space direction="vertical">
        <Form.Item label="테마 설정">
          <Radio.Group
            value={config.color}
            onChange={(color) =>
              setConfig({
                ...config,
                color: color.target.value as Config['color'],
              })
            }
            defaultValue="black"
          >
            <Radio value="black">검은색</Radio>
            <Radio value="black2">검은색 (상단 그림자 없음)</Radio>
            <Radio value="white">흰색</Radio>
            <Radio value="white2">흰색 (상단 그림자 없음)</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="폰트 설정">
          <Select
            value={config.font}
            onChange={(font) => setConfig({ ...config, font })}
            options={['나눔바른펜OTF', 'Noto Sans KR', 'Pretendard', 'IBM Plex Sans KR'].map((font) => ({
              value: font,
              label: <span style={{ fontFamily: font }}>{font}</span>,
            }))}
          />
        </Form.Item>
        <Form.Item label="타이틀 폰트 설정">
          <Select
            value={config.titleFont}
            onChange={(titleFont) => setConfig({ ...config, titleFont })}
            options={['나눔바른펜OTF', 'KoPub Dotum', 'Noto Sans KR', 'Pretendard', 'IBM Plex Sans KR'].map((font) => ({
              value: font,
              label: <span style={{ fontFamily: font }}>{font}</span>,
            }))}
          />
        </Form.Item>
      </Space>
    ),

    ffxiv: (
      <Space direction="vertical">
        <Form.Item label="선호 직업">
          <JobSelect selectedJobs={config.jobs} onSelect={setJobs} />
        </Form.Item>

        <Form.Item label="메인 퀘스트 진도">
          <Space wrap>
            <Select
              style={{ width: 225 }}
              value={config.progress}
              onChange={(p) => {
                const expansion = expansions.find((expansion) => expansion.options.some((sub) => sub.value === p))
                setConfig(expansion ? { ...config, progress: p, expansion: expansion.value } : { ...config, progress: p })
              }}
              placeholder="예시) v6.3 완료"
              options={expansions}
            />
            <Select
              style={{ width: 150 }}
              value={config.expansion}
              onChange={(e) => {
                const expansion = expansions.find((expansion) => expansion.value === e)
                setConfig(expansion ? { ...config, expansion: e, progress: expansion.options[0].value } : { ...config, expansion: e })
              }}
              placeholder="확장팩"
              options={expansions.map(({ label, value }) => ({ label, value }))}
            />
            <Checkbox checked={config.expansionOngoing} onChange={(e) => setConfig({ ...config, expansionOngoing: e.target.checked })}>
              진행 중
            </Checkbox>
          </Space>
        </Form.Item>
        <Form.Item label="좋아요 / 싫어요">
          <Space wrap>
            <Input style={{ width: 300 }} value={config.like} onChange={(e) => setConfig({ ...config, like: e.target.value })} placeholder="좋아요" />
            <Input style={{ width: 300 }} value={config.dislike} onChange={(e) => setConfig({ ...config, dislike: e.target.value })} placeholder="싫어요" />
          </Space>
        </Form.Item>

        <Form.Item label="총사령부">
          <Space wrap>
            <Select style={{ width: 150 }} value={config.company} onChange={(company) => setConfig({ ...config, company })} placeholder="총사령부" options={companies} />
            <Select style={{ width: 150 }} value={config.grade} onChange={(grade) => setConfig({ ...config, grade })} placeholder="계급" options={grades} />
          </Space>
        </Form.Item>

        <Form.Item label="특수 레벨">
          <Space wrap>
            <InputNumber style={{ width: 150 }} value={config.eurekaLevel} onChange={(eurekaLevel) => setConfig({ ...config, eurekaLevel: eurekaLevel ?? undefined })} placeholder="에우레카 (최대 60)" min={0} max={60} />
            <InputNumber style={{ width: 150 }} value={config.bozjaLevel} onChange={(bozjaLevel) => setConfig({ ...config, bozjaLevel: bozjaLevel ?? undefined })} placeholder="보즈야 (최대 25)" min={0} max={25} />
          </Space>
        </Form.Item>

        <Form.Item label="플레이 시간대">
          <Checkbox.Group value={config.playtime.map((_, index) => index).filter((index) => config.playtime[index])} onChange={(group) => setConfig({ ...config, playtime: Array.from(Array(24)).map((_, index) => group.includes(index)) })}>
            <Space direction="vertical">
              <Space wrap>
                {Array.from(Array(12)).map((_, index) => (
                  <Checkbox key={index} value={index}>
                    {index.toString().padStart(2, '0')}시
                  </Checkbox>
                ))}
              </Space>
              <Space wrap>
                {Array.from(Array(12)).map((_, index) => (
                  <Checkbox key={index + 12} value={index + 12}>
                    {index + 12}시
                  </Checkbox>
                ))}
              </Space>
            </Space>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item label="플레이 스타일">
          <Checkbox.Group value={config.playstyles} onChange={(values) => setConfig({ ...config, playstyles: values.map((v) => v.toString()).slice(0, 10) })}>
            <Space wrap>
              {Object.entries(playstyles).map(([playstyle, displayName]) => (
                <Checkbox key={playstyle} value={playstyle}>
                  <Image src={`playstyles/${playstyle}.png`} preview={false} width={32} />
                  &nbsp;{displayName}
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
        </Form.Item>
      </Space>
    ),

    mastodon: (
      <Space direction="vertical">
        <Form.Item label="정보">
          <Space wrap>
            <Input style={{ width: 300 }} value={config.mastodonName} onChange={(e) => setConfig({ ...config, mastodonName: e.target.value })} placeholder="마스토돈 계정명" />
            <Input style={{ width: 300 }} value={config.handle} onChange={(e) => setConfig({ ...config, handle: e.target.value })} placeholder="핸들 (예시: @chalk@chalk.moe)" />
          </Space>
        </Form.Item>
        <Form.Item label="장르">
          <Space wrap>
            <Input style={{ width: 300 }} value={config.mastodonMain} onChange={(e) => setConfig({ ...config, mastodonMain: e.target.value })} placeholder="주로 언급하는 장르" />
            <Input style={{ width: 300 }} value={config.mastodonSub} onChange={(e) => setConfig({ ...config, mastodonSub: e.target.value })} placeholder="가끔 언급하는 장르" />
          </Space>
        </Form.Item>
        <Form.Item label="툿 성향">
          <Checkbox.Group value={config.orientations} onChange={(values) => setConfig({ ...config, orientations: values.map((x) => x.toString()) })}>
            <Space wrap>
              {orientations.map(({ label, value }) => (
                <Checkbox key={value} value={value}>
                  {label}
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item label="커플링 성향">
          <Checkbox.Group value={config.couplings} onChange={(values) => setConfig({ ...config, couplings: values.map((x) => x.toString()) })}>
            <Space wrap>
              {coupling.map(({ label, value }) => (
                <Checkbox key={value} value={value}>
                  {label}
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item label="기피 소재">
          <Checkbox.Group value={config.avoids} onChange={(values) => setConfig({ ...config, avoids: values.map((x) => x.toString()) })}>
            <Space wrap>
              {avoids.map(({ label, value }) => (
                <Checkbox key={value} value={value}>
                  {label}
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
        </Form.Item>
      </Space>
    ),
  }

  const tabs: { key: keyof typeof components; tab: string }[] = [
    { key: 'basic', tab: '기본' },
    { key: 'theme', tab: '테마' },
    { key: 'ffxiv', tab: '파판14' },
    { key: 'mastodon', tab: '마스토돈' },
  ]

  return (
    <Card style={{ marginTop: 10 }} tabList={tabs} activeTabKey={key} onTabChange={setKey}>
      <Form layout="vertical">{components[key as keyof typeof components]}</Form>
    </Card>
  )
}

export default Options
