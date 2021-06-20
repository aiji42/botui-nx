import { EventTrackQueryArg } from '../pages/api/event-track'
import { v4 as uuid } from 'uuid'
import store from 'store2'

const userId =
  store.get('uuid-chachat')?.length > 10 ? store.get('uuid-chachat') : uuid()
store.set('uuid-chachat', userId)
const trackedCache = new Set()

export const chatTracker = (sessionId: string, preview = false) => ({
  start: () => {
    if (preview) return
    const cacheKey = `${sessionId}_start`
    if (trackedCache.has(cacheKey)) return
    gtag('event', 'start', {
      event_category: sessionId
    })
    requestTrack({
      sessionId,
      userId,
      eventLabel: 'start',
      eventValue: ''
    })
    trackedCache.add(cacheKey)
  },
  complete: () => {
    if (preview) return
    const cacheKey = `${sessionId}_complete`
    if (trackedCache.has(cacheKey)) return
    gtag('event', 'complete', {
      event_category: sessionId
    })
    requestTrack({
      sessionId,
      userId,
      eventLabel: 'complete',
      eventValue: ''
    })
    trackedCache.add(cacheKey)
  },
  process: (progress: number) => {
    if (preview) return
    const percentage = Math.floor((progress * 100) / 5) * 5
    const cacheKey = `${sessionId}_progress_${percentage}`
    if (trackedCache.has(cacheKey)) return
    if ([25, 50, 75, 100].includes(percentage))
      gtag('event', 'progress', {
        event_category: sessionId,
        event_label: `${percentage}%`
      })
    if (progress > 0 && progress % 10 === 0)
      requestTrack({
        sessionId,
        userId,
        eventLabel: 'progress',
        eventValue: percentage
      })
    trackedCache.add(cacheKey)
  },
  checkpoint: (action: 'in' | 'out', name: string) => {
    if (preview) return
    const cacheKey = `${sessionId}_${action}_${name}`
    if (trackedCache.has(cacheKey)) return
    gtag('event', action === 'in' ? 'checkin' : 'checkout', {
      event_category: sessionId,
      event_label: name
    })
    action === 'out' && requestTrack({
      sessionId,
      userId,
      eventLabel: 'passed',
      eventValue: name
    })
    trackedCache.add(cacheKey)
  }
})

export const requestTrack = (arg: EventTrackQueryArg) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
  fetch('/api/event-track', {
    method: 'POST',
    headers,
    body: JSON.stringify(arg)
  })
}
