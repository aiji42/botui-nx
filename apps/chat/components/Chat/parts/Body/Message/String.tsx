import React, { FC, useEffect, useRef, useState } from 'react'
import nl2br from 'react-nl2br'
import {
  useMessageContext,
  useProposal
} from '@botui/hooks'
import { useChatControllerServer, Values } from '@botui/chat-controller'
import { CustomMessage } from '@botui/chat-controller'
import Linkify from 'react-linkify'
import { ContentString } from '@botui/types'

const String: FC = () => {
  const message = useMessageContext<ContentString>()
  const [customMessage, setCustomMessage] = useState<CustomMessage>({})
  const [, { handleUpdate }] = useProposal()
  const { values, getCustomMessage } = useChatControllerServer()
  const props = message.content.props
  const { children, ...rest } = props
  const mounted = useRef(true)
  useEffect(() => {
    if (mounted.current) {
      handleUpdate()
      getCustomMessage().then(
        (msgs) => typeof msgs === 'object' && setCustomMessage(msgs)
      )
    }
    return () => {
      mounted.current = false
    }
  }, [handleUpdate, message, getCustomMessage])

  // TODO: customMessageの置換
  return (
    <Linkify
      componentDecorator={(decoratedHref, decoratedText, key) => (
        <a
          target="_blank"
          rel="noreferrer"
          href={decoratedHref}
          key={key}
          style={{ color: '#0366d6' }}
        >
          {decoratedText}
        </a>
      )}
    >
      <span {...rest}>
        {typeof children === 'string'
          ? nl2br(replace(children, { ...values, ...customMessage }))
          : children}
      </span>
    </Linkify>
  )
}
export default String

const replace = (message: string, values: Values) =>
  message.replace(/\{\{(.+?)\}\}/g, (_, key) => `${values[key] ?? ''}`)
