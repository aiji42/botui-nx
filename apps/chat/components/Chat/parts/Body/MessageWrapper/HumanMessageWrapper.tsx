import { FC } from 'react'
import { MessageBubble, MessageBubbleProps } from '@botui/components'
import { css } from '@emotion/react'

const style = {
  wrapper: css({
    '@media (max-width:500px)': {
      maxWidth: '85%',
    },
    maxWidth: 425,
    textAlign: 'right',
    margin: '8px 0px 8px auto'
  })
}

type Props = Pick<MessageBubbleProps, 'baseColor' | 'messageColor'>

export const HumanMessageWrapper: FC<Props> = (props) => (
  <div css={style.wrapper}>
    <MessageBubble human {...props} />
  </div>
)
