import { ComponentProps, FC } from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image'

interface PlaystyleIconProps extends Omit<ComponentProps<typeof Image>, 'image'> {
  iconPath: string
}

const PlaystyleIcon: FC<PlaystyleIconProps> = ({ iconPath, ...props }) => {
  const [image] = useImage(`./playstyles/${iconPath}.png`, 'anonymous')
  return (
    <>
      <Image {...props} image={image} width={80} height={80} />
    </>
  )
}

export default PlaystyleIcon
