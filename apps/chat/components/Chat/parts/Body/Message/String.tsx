import React, { FC, useEffect, useRef } from 'react'
import nl2br from 'react-nl2br'
import { useChatController, useMessageContext, useProposal } from '@botui/hooks'
import Linkify from 'react-linkify'
import { ContentString } from '@botui/types'

const String: FC = () => {
  const message = useMessageContext<ContentString>()
  const [, { handleUpdate }] = useProposal()
  const { values } = useChatController()
  const props = message.content.props
  const { children, ...rest } = props
  const mounted = useRef(true)
  useEffect(() => {
    mounted.current && handleUpdate()
    return () => {
      mounted.current = false
    }
  }, [handleUpdate, message])

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
