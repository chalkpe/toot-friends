import { ComponentProps, FC, useEffect, useRef } from 'react'
import Konva from 'konva'
import { Image } from 'react-konva'
import useImage from 'use-image'

const colors = {
  tank: [98, 116, 244] as const,
  healer: [99, 154, 41] as const,
  dps: [255, 87, 90] as const,
  crafter: [140, 108, 194] as const,
  gatherer: [210, 191, 88] as const,
  disabled: [86, 86, 86] as const,
  disabledLight: [110, 110, 110] as const,
}

interface JobIconProps extends Omit<ComponentProps<typeof Image>, 'image'> {
  iconPath: string
  colorType: keyof typeof colors
}

const JobIcon: FC<JobIconProps> = ({ iconPath, colorType, ...props }) => {
  const ref = useRef<Konva.Image>(null)
  const [icon] = useImage(`./icons/${iconPath}.svg`, 'anonymous')

  useEffect(() => {
    if (ref.current) {
      ref.current.cache()
      ref.current.width(props.width)
      ref.current.height(props.height)
      ref.current.filters([Konva.Filters.RGBA]).red(colors[colorType][0]).green(colors[colorType][1]).blue(colors[colorType][2])
    }
  }, [icon, colorType, props.width, props.height])

  return <Image {...props} image={icon} ref={ref} />
}

export default JobIcon
