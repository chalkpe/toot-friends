import { Avatar, Badge, Divider, Space } from 'antd'
import { FC, memo } from 'react'
import { jobs } from '../../common'

interface JobSelectProps {
  selectedJobs: string | string[]
  onSelect: (job: string) => void
}

const JobSelect: FC<JobSelectProps> = ({ selectedJobs, onSelect }) => {
  return (
    <Space size="small" wrap>
      {jobs.map((job, index) => {
        if (!job) return <Divider key={index} type="vertical" />
        const image = <Avatar key={job} size="small" shape="square" alt={job} src={`./icons/${job}.png`} onClick={() => onSelect(job)} />

        return (Array.isArray(selectedJobs) ? selectedJobs.includes(job) : selectedJobs === job) ? (
          <Badge dot key={job}>
            {image}
          </Badge>
        ) : (
          image
        )
      })}
    </Space>
  )
}

export default memo(JobSelect)
