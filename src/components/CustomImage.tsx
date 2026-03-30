import NextImage, { ImageProps } from 'next/image'

export default function CustomImage(props: ImageProps) {
    return <NextImage {...props} />
}
