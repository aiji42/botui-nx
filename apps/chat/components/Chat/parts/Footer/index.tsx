import React, { FC } from 'react'
import { useChatConfigContext, useChatController } from '@botui/hooks'
import { Footer as ChatFooter } from '@botui/components'
import { css } from '@emotion/react'

const style = {
  root: css({
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: 40
  })
}

export const Footer: FC = () => {
  const {
    percentOfProgress
  } = useChatConfigContext()
  const { session: { theme: { footer, progressBar } } } = useChatController()

  return (
    <div css={style.root}>
      <ChatFooter
        percent={percentOfProgress * 100}
        baseColor={footer?.backgroundColor}
        barColor={progressBar?.backgroundColor}
      />
    </div>
  )
}
