import { FC, useEffect, useCallback, useState, useRef, Fragment } from 'react'
import { useMessageContext, useImageUrl, useProposal } from '@botui/hooks'
import { MessageLoading } from '@botui/components'
import { css } from '@emotion/react'
import { ContentImage } from '@botui/types'

const style = (loading: boolean) =>
  loading
    ? css({
        display: 'none'
      })
    : css({
        width: '100%'
      })

const Image: FC = () => {
  const message = useMessageContext<ContentImage>()
  const [, { handleUpdate }] = useProposal()
  const url = useImageUrl(message.content.props.imgKey)
  const [loading, setLoading] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)
  const mounted = useRef(true)
  useEffect(() => {
    setTimeout(
      () => mounted.current && setLoading(false),
      message.content.delay ?? 0
    )
    return () => {
      mounted.current = false
    }
  }, [message.content.delay])
  const completed = useRef(false)
  useEffect(() => {
    if (completed.current || !imageLoaded || loading) return
    handleUpdate()
    completed.current = true
  }, [loading, imageLoaded, handleUpdate, message])
  const handleImageLoaded = useCallback(() => {
    setImageLoaded(true)
  }, [setImageLoaded])

  return (
    <Fragment>
      {loading && <MessageLoading />}
      <img
        src={url}
        onLoad={handleImageLoaded}
        onError={handleImageLoaded}
        css={style(loading)}
        alt="illustration"
      />
    </Fragment>
  )
}

export default Image
