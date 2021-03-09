import React, { FC, useEffect } from 'react'
import Botui from '@botui/embedded'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

interface TesterProps {
  id?: string
}

const Tester: FC<TesterProps> = ({ id }) => {
  const router = useRouter()
  useEffect(() => {
    new Botui(`/?sessionId=${id ?? ''}`, Boolean(router.query.open)).start()
  }, [id, router])
  return <div></div>
}

export default Tester

export const getServerSideProps: GetServerSideProps<
  TesterProps,
  { id: string }
> = async (context) => {
  return { props: { id: context.params?.id } }
}
