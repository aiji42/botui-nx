import React, { FC } from 'react'
import Image from 'next/image'

const Invalid: FC = () => {
  return <Image src="/notFound.svg" layout="responsive" width="" height="" />
}

export default Invalid
