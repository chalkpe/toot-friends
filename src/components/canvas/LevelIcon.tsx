import Konva from 'konva'
import { ComponentProps, FC, useEffect, useMemo, useRef } from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image'

const colors = {
  disabled: [90, 90, 90],
  enabled: [204, 204, 204],
}

interface LevelIconProps extends Omit<ComponentProps<typeof Image>, 'image'> {
  iconPath: string
  level: number
  theme: 'light' | 'dark'
}

const LevelIcon: FC<LevelIconProps> = ({ iconPath, level, ...props }) => {
  const ref = useRef<Konva.Image>(null)
  const [image] = useImage(`./ui/${iconPath}.png`, 'anonymous')

  const color = useMemo(() => colors[level === 0 ? 'disabled' : 'enabled'], [level])

  console.log(color)

  useEffect(() => {
    if (ref.current) {
      ref.current.cache()
      ref.current.filters([Konva.Filters.RGBA]).red(color[0]).green(color[1]).blue(color[2])
    }
  }, [color, image])

  return (
    <Image {...props} image={image} ref={ref} />
  )
}

export default LevelIcon
