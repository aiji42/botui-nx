import React, { FC, useEffect, useRef } from 'react'
import nl2br from 'react-nl2br'
import { useMessageContext } from '@botui/hooks'
import Linkify from 'react-linkify'
import { ContentString } from '@botui/types'

const String: FC = () => {
  const { message, handleUpdate } = useMessageContext<ContentString>()
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
        {typeof children === 'string' ? nl2br(children) : children}
      </span>
    </Linkify>
  )
}
export default String
