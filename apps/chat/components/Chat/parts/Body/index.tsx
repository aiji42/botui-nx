import React, { FC } from 'react'
import { useChatConfigContext, MessageContextProvider, useChatController } from '@botui/hooks'
import { css } from '@emotion/react'
import { MessageWrapper } from './MessageWrapper'
import { Message } from './Message'
import { Message as MessageType } from '@botui/types'

const style = {
  root: css({
    padding: '5px 15px 150px 15px',
    overflowY: 'scroll',
    msOverflowStyle: 'none', // スクロールバーを隠す(IE、Edge)
    scrollbarWidth: 'none', // スクロールバーを隠す(Firefox)
    '&::-webkit-scrollbar': {
      display: 'none' // スクロールバーを隠す(Chrome、Safari)
    }
  })
}

export const Body: FC = (props) => {
  const { proposals } = useChatController()

  return (
    <div css={style.root}>
      {proposals.map((proposal) => proposal.type === 'message' ? (
        <MessageContextProvider
          key={proposal.id}
          message={proposal.data}
        >
          <MessageWrapper>
            <Message />
          </MessageWrapper>
        </MessageContextProvider>
      ) : null)
    }
    </div>
  )
}
