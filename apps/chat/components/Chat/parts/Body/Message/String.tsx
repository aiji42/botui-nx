import React, { FC, useEffect, useRef, useState } from 'react'
import nl2br from 'react-nl2br'
import { useChatController, useMessageContext, useProposal } from '@botui/hooks'
import Linkify from 'react-linkify'
import { ContentString } from '@botui/types'

const String: FC = () => {
  const message = useMessageContext<ContentString>()
  const [customMessage, setCustomMessage] = useState<Record<string, string>>({})
  const [, { handleUpdate }] = useProposal()
  const { values, getCustomMessage } = useChatController()
  const props = message.content.props
  const { children, ...rest } = props
  const mounted = useRef(true)
  useEffect(() => {
    if (mounted.current) {
      handleUpdate()
      getCustomMessage().then((msgs) => typeof msgs === 'object' && setCustomMessage)
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
        {typeof children === 'string' ? nl2br(replace(children, values)) : children}
      </span>
    </Linkify>
  )
}
export default String

const replace = (message: string, values: Record<string, unknown>) =>
  message.replace(
    /\{\{(.+?)\}\}/g,
    (_, key) => `${values[key] ?? ''}`
  )
