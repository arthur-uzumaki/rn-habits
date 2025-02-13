import { Image, type ImageProps } from 'react-native'
import clsx from 'clsx'

interface AvatarProps extends ImageProps {
  selected: boolean
}

export function Avatar({ selected, ...rest }: AvatarProps) {
  return (
    <Image
      className={clsx('h-[30px] w-[30px] rounded-[25px]', {
        'border-2 border-white': selected,
      })}
      {...rest}
    />
  )
}
