import React, { FC, useEffect, useState } from 'react'
import { ChatControllerProvider } from '@botui/hooks'
import { Proposals, Proposal, Session } from '@botui/types'
import { Header, Body, Footer } from './parts'
import { useRouter } from 'next/router'

const getNextProposal = (proposals: Proposals, id: string, skipNum = 0): Proposal | null => {
  const index = proposals.findIndex((p) => p.id === id) ?? 0
  return proposals[index + 1 + skipNum] ?? null
}

interface ChatProps {
  session: Session
}

export const Chat: FC<ChatProps> = ({
  session
}) => {
  const [proposals, setProposals] = useState<Proposals>([])
  const { query } = useRouter()

  useEffect(() => {
    const id = query['currentId']
    const skipNum = query['skipNum']
    if (typeof id !== 'string') return
    const nextProposal = getNextProposal(session.proposals, id, typeof skipNum === 'number' ? skipNum : 0)
    if (!nextProposal) return // complete
    setProposals((prev) => [...prev, nextProposal])
  }, [query, session.proposals])

  return (
    <ChatControllerProvider proposals={proposals}>
      <Header />
      <Body />
      <Footer />
    </ChatControllerProvider>
  )
}
