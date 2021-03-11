import React, { FC } from 'react'
import {
  useChatConfigContext,
  useChatController,
  useImageUrl
} from '@botui/hooks'
import Close from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import { Header as ChatHeader } from '@botui/components'
import { css } from '@emotion/react'

const style = {
  root: css({
    position: 'sticky',
    top: 0,
    height: 60,
    width: '100%',
    zIndex: 100
  }),
  logoImage: css({
    objectFit: 'contain',
    width: '100%',
    height: '100%'
  }),
  title: css({
    padding: 15
  }),
  closeButton: css({
    position: 'absolute',
    right: 0,
    top: 4
  })
}

export const Header: FC = () => {
  const {
    theme: { header },
    images,
    title
  } = useChatConfigContext()
  const imageURL = useImageUrl(images.logo?.key)
  const { close } = useChatController()

  return (
    <div css={style.root}>
      <ChatHeader
        baseColor={header?.backgroundColor}
        logo={
          imageURL ? (
            <img src={imageURL} alt="logo" css={style.logoImage} />
          ) : (
            <p css={style.title}>{title}</p>
          )
        }
      />
      <div css={style.closeButton}>
        <IconButton onClick={close}>
          <Close style={{ color: 'white' }} />
        </IconButton>
      </div>
    </div>
  )
}
