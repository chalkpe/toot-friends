import { FC, useState } from 'react'
import {
  AutoComplete,
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  Form,
  Input,
  Radio,
  Slider,
  Space,
  Upload,
} from 'antd'
import { RcFile } from 'antd/es/upload'
import { UploadOutlined } from '@ant-design/icons'

import { Config, jobs, servers } from '../common'

interface OptionsProps {
  config: Config
  setConfig: (config: Config) => void
}

const Options: FC<OptionsProps> = ({ config, setConfig }) => {
  const [key, setKey] = useState('basic')

  const components = {
    basic: (
      <Space direction="vertical">
        <Form.Item label="카드 이미지">
          <Upload
            accept="image/*"
            listType="picture"
            maxCount={1}
            defaultFileList={
              config.image ? [{ uid: '1', name: 'image.png', url: config.image, status: 'done' }] : undefined
            }
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
          <Slider
            min={0}
            max={2}
            step={0.01}
            tooltip={{ formatter: (value) => `${Math.floor((value ?? 0) * 100)}%` }}
            defaultValue={config.scale}
            onChange={(scale) => setConfig({ ...config, scale })}
          />
        </Form.Item>

        <Form.Item label="주직업">
          <Space size="small" wrap>
            {jobs.map((job, index) => {
              if (!job) return <Divider key={index} type="vertical" />

              const image = (
                <Avatar
                  size="small"
                  shape="square"
                  key={job}
                  alt={job}
                  src={`./icons/${job}.png`}
                  onClick={() => setConfig({ ...config, job })}
                />
              )

              return job === config.job ? <Badge dot>{image}</Badge> : image
            })}
          </Space>
        </Form.Item>

        <Form.Item label="캐릭터 정보">
          <Space.Compact style={{ width: '100%' }}>
            <Input
              value={config.name}
              onChange={(e) => setConfig({ ...config, name: e.target.value })}
              placeholder="닉네임"
            />
            <AutoComplete
              value={config.server}
              onChange={(server) => setConfig({ ...config, server })}
              placeholder="서버"
              options={servers.map((server) => ({
                ...server,
                options: server.options.map((o) => ({ label: o, value: o })),
              }))}
              filterOption={(inputValue, option) =>
                option?.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
              }
            />
            <Input
              value={config.title}
              onChange={(e) => setConfig({ ...config, title: e.target.value })}
              placeholder="칭호"
            />
          </Space.Compact>
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
            <Radio value="white">흰색</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="폰트 설정">
          <Input
            placeholder="폰트 이름을 입력하세요."
            value={config.font}
            onChange={(e) => setConfig({ ...config, font: e.target.value })}
          />
        </Form.Item>
      </Space>
    ),
  }

  const tabs: { key: keyof typeof components; tab: string }[] = [
    { key: 'basic', tab: '기본설정' },
    { key: 'theme', tab: '테마설정' },
  ]

  return (
    <Card style={{ marginTop: 10 }} tabList={tabs} activeTabKey={key} onTabChange={setKey}>
      <Form layout="vertical">{components[key as keyof typeof components]}</Form>
    </Card>
  )
}

export default Options
