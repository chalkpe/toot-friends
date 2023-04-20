import { FC, useState } from 'react'
import { Button, Card, Divider, Form, Image, Input, Radio, Space, Upload } from 'antd'
import { RcFile } from 'antd/es/upload'
import { UploadOutlined } from '@ant-design/icons'

import { Config, iconPrefix, jobs } from '../common'

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
            maxCount={1}
            listType="picture"
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

        <Form.Item label="주직업">
          {jobs.map((job) =>
            job ? (
              <Image
                width="1.5rem"
                preview={false}
                alt={job}
                src={`${iconPrefix}/${job}.png`}
                onClick={() => setConfig({ ...config, job })}
              />
            ) : (
              <Divider type="vertical" />
            )
          )}
        </Form.Item>

        <Form.Item label="캐릭터 정보">
          <Space.Compact>
            <Input
              value={config.name}
              onChange={(e) => setConfig({ ...config, name: e.target.value })}
              placeholder="닉네임"
            />
            <Input
              value={config.server}
              onChange={(e) => setConfig({ ...config, server: e.target.value })}
              placeholder="서버"
              prefix="@"
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
