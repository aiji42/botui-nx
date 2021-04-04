import React, { FC, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Index: FC = () => {
  const router = useRouter()
  useEffect(() => {
    if (router.query.preview && router.query.jsonedSession) {
      router.replace({
        pathname: '/session/preview',
        query: { jsonedSession: router.query.jsonedSession }
      })
      return
    }
    router.replace({
      pathname: '/session/[id]',
      query: { id: router.query.sessionId ?? 'invalid' }
    })
  }, [router])

  return <Image src="/loading.gif" layout="responsive" width="" height="" />
}

export default Index
