import { FC } from 'react'
import { Input, Radio } from '@nextui-org/react'
import { Config } from '../App'

interface OptionsProps {
  config: Config
  setConfig: (config: Config) => void
}

const Options: FC<OptionsProps> = ({ config, setConfig }) => {
  return (
    <>
      <Input
        label="이름"
        placeholder="이름을 입력하세요."
        initialValue={config.name}
        onChange={(e) => setConfig({ ...config, name: e.target.value })}
      />
      <Input
        label="서버"
        placeholder="서버를 입력하세요."
        initialValue={config.server}
        onChange={(e) => setConfig({ ...config, server: e.target.value })}
      />
      <Input
        label="칭호"
        placeholder="칭호를 입력하세요."
        initialValue={config.title}
        onChange={(e) => setConfig({ ...config, title: e.target.value })}
      />
      <Input
        label="폰트"
        placeholder="폰트 이름을 입력하세요."
        initialValue={config.font}
        onChange={(e) => setConfig({ ...config, font: e.target.value })}
      />

      <Radio.Group
        value={config.color}
        onChange={(color) =>
          setConfig({ ...config, color: color as Config['color'] })
        }
        orientation="horizontal"
        label="카드 색상"
        defaultValue="black"
      >
        <Radio value="black">검은색</Radio>
        <Radio value="white">흰색</Radio>
      </Radio.Group>
    </>
  )
}

export default Options
