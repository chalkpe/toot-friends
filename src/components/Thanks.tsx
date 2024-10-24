import { CloseOutlined, GithubOutlined, InfoCircleOutlined, LinkOutlined } from '@ant-design/icons'
import { Modal, Typography } from 'antd'
import { useState } from 'react'

const Thanks = () => {
  const [open, setOpen] = useState(false)

  const ofl = (
    <a target="_blank" rel="noreferrer" href="https://spdx.org/licenses/OFL-1.1.html">
      <LinkOutlined /> SIL Open Font License 1.1
    </a>
  )

  return (
    <>
      <InfoCircleOutlined onClick={() => setOpen(true)} />
      <Modal open={open} closeIcon={<CloseOutlined onClick={() => setOpen(false)} />} title="툿친소 시트 메이커에 대해서" footer={null}>
        <Typography>
          <h4>Repository</h4>
          <ul>
            <li>
              <a target="_blank" rel="noreferrer" href="https://github.com/chalkpe/toot-friends">
                <GithubOutlined /> chalkpe/toot-friends
              </a>
            </li>
          </ul>

          <h4>Font license</h4>
          <ul>
            <li>Pretendard - {ofl}</li>
            <li>나눔바른펜OTF - {ofl}</li>
            <li>Noto Sans KR - {ofl}</li>
            <li>
              KoPub Dotum -{' '}
              <a target="_blank" rel="noreferrer" href="https://www.kopus.org/wp-content/uploads/2021/04/%EC%84%9C%EC%B2%B4_%EB%9D%BC%EC%9D%B4%EC%84%A0%EC%8A%A4.pdf">
                <LinkOutlined /> 라이선스 전문
              </a>
            </li>
          </ul>

          <h4>Developer</h4>
          <ul>
            <li>Chalk (@chalk@chalk.moe)</li>
          </ul>
          <h4>Designer</h4>
          <ul>
            <li>Dro (@Drodraw@chalk.moe)</li>
          </ul>

          <h4>Thanks to...</h4>
          <ul>
            <li>Arcturus (@arcturus@sharlayan.in)</li>
            <li>Firefox (@thefirefox@planet.moe)</li>
          </ul>
        </Typography>
      </Modal>
    </>
  )
}

export default Thanks
