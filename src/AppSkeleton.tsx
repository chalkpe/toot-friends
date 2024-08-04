import './App.css'
import { Layout, Spin } from 'antd'

const AppSkeleton = () => {
  return (
    <Layout style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Spin size="large" tip="폰트를 불러오는 중입니다" />
    </Layout>
  )
}

export default AppSkeleton
