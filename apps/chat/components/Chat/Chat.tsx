import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { ChatConfigContextProvider, ChatControllerProvider } from '@botui/hooks'
import { Proposals, Proposal, ChatConfig, Message as MessageType, Session, Message } from '@botui/types'
import { Header, Body, Footer } from './parts'
import { controlMessage, effectToProposals } from './controller/dependencies'
import { useRouter } from 'next/router'
import { string } from 'yup/lib/locale'
import { type } from 'node:os'

type Values = Record<string, ValueType | undefined>

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

const getNextProposal = (proposals: Proposals, id: string): Proposal | null => {
  const index = proposals.findIndex((p) => p.id === id) ?? 0
  return proposals[index + 1] ?? null
}

interface ChatProps {
  proposals: Proposals
  config: ChatConfig
  session: Session
}

export const Chat: FC<ChatProps> = ({
  config: initialConfig,
  proposals: initialProposals
  session
}) => {
  const [messages, setMessages] = useState<Array<Message>>([])
  const { query } = useRouter()

  const prepareMessage = (message: Message, values: Values): Message => {
  if (isStringMessage(message)) return messageReplace(message, values)
  if (isFormMessage(message)) return fillFormMessage(message)
  return message
}

const messageReplace = (
  message: Message<ContentString>,
  values: Values,
  customMessages: Record<string, string>
): Message<ContentString> => {
  if (typeof message.content.props.children !== 'string') return message
  return {
    ...message,
    content: {
      ...message.content,
      props: {
        ...message.content.props,
        children: message.content.props.children.replace(
          /\{\{(.+?)\}\}/g,
          (_, key) =>
            `${customMessages[key] ?? values[key] ?? ''}`
        )
      }
    }
  }
}

const fillFormMessage = (
  message: Message<ContentForm>,
  customChoice: Record<string, Array<{ value: string; label: string }>>
): Message<ContentForm> => {
  if (
    message.content.props.type === 'FormCustomCheckbox' ||
    message.content.props.type === 'FormCustomRadioGroup'
  ) {
    const choices = window.botui?.customChoice?.[message.content.props.name]
    if (!choices) return message
    return {
      ...message,
      content: {
        ...message.content,
        props: {
          ...message.content.props,
          inputs: choices.map(({ label, value }) => ({ value, title: label }))
        }
      }
    }
  }
  if (message.content.props.type === 'FormCustomSelect') {
    const selects = message.content.props.selects.map<CustomSelect>(
      (select) => {
        const choices = customChoice[select.name]
        if (!choices) return select
        return { ...select, options: choices }
      }
    )

    return {
      ...message,
      content: {
        ...message.content,
        props: {
          ...message.content.props,
          selects
        }
      }
    }
  }
  return message
}

  useEffect(() => {
    const id = query['currentId']
    if (typeof id !== 'string') return
    const proposal = getNextProposal(session.proposals, id)
    if (!proposal) return // complete
    const { type } = proposal
    if (type === 'message') setMessages((prev) => [...prev, proposal.data])
  }, [query])

  return (
    <ChatConfigContextProvider {...config}>
      <ChatControllerProvider>
        <Header />
        <Body onUpdated={handleUpdate} />
        <Footer />
      </ChatControllerProvider>
    </ChatConfigContextProvider>
  )
}
