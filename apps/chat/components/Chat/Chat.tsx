import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { ChatConfigContextProvider } from '@botui/chat-hooks'
import { Proposals, ChatConfig, Message as MessageType } from '@botui/types'
import { Header, Body, Footer } from './parts'
import { controlMessage, effectToProposals } from './controller/dependencies'

const manageUpdatedMessage = (
  config: ChatConfig,
  updatedMessage: MessageType
) => ({
  ...config,
  messages: config.messages.reduce<ChatConfig['messages']>((res, message) => {
    // updated: true の場合、後続のメッセージは削除する
    if (
      updatedMessage.updated &&
      res.find(({ id }) => id === updatedMessage.id)
    )
      return res
    return [
      ...res,
      message.id === updatedMessage.id
        ? { ...updatedMessage, updated: false }
        : message
    ]
  }, [])
})

interface ChatProps {
  proposals: Proposals
  config: ChatConfig
}

export const Chat: FC<ChatProps> = ({
  config: initialConfig,
  proposals: initialProposals
}) => {
  const [config, setConfig] = useState<ChatConfig>(initialConfig)
  const [proposals, setProposals] = useState<Proposals>(initialProposals)
  const messages = useMemo(() => config?.messages || [], [config?.messages])

  useEffect(() => {
    const [effectedProposals] = effectToProposals(messages, proposals)
    setProposals(effectedProposals)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  useEffect(() => {
    controlMessage(
      proposals,
      config
    ).then(([messages, percentOfProgress]) =>
      setConfig({ ...config, percentOfProgress, messages })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proposals])

  const handleUpdate = useCallback(
    (updatedMessage: MessageType) =>
      setConfig(manageUpdatedMessage(config, updatedMessage)),
    [config]
  )

  return (
    <ChatConfigContextProvider {...config}>
      <Header />
      <Body onUpdated={handleUpdate} />
      <Footer />
    </ChatConfigContextProvider>
  )
}
