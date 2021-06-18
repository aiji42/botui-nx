import { useEffect, useMemo, VFC } from 'react'
import { useChatControllerServer } from '@botui/chat-controller'
import { chatTracker } from '../../../../libs/tracker'

export const Tracker: VFC = () => {
  const {
    proposals,
    progressPercentage,
    session,
    preview
  } = useChatControllerServer()

  const tracker = useMemo(() => chatTracker(session.id, preview), [
    session.id,
    preview
  ])

  useEffect(() => {
    tracker.start()
  }, [tracker])

  useEffect(() => {
    tracker.process(progressPercentage)
  }, [progressPercentage, tracker])

  useEffect(() => {
    const [last, prev] = proposals.slice(-2)
    last?.type === 'message' &&
      last.data.content.type === 'form' &&
      tracker.checkpoint(
        'in',
        `${last.data.content.props.type}_${last.data.id}`
      )
    prev?.type === 'message' &&
      prev.data.content.type === 'form' &&
      tracker.checkpoint(
        'out',
        `${prev.data.content.props.type}_${prev.data.id}`
      )
  }, [proposals, tracker])

  return null
}
