const trackedCache = new Set()

export const chatTracker = (sessionId: string, preview = false) => ({
  start: () => {
    if (preview) return
    const cacheKey = `${sessionId}_start`
    if (trackedCache.has(cacheKey)) return
    gtag('event', 'start', {
      event_category: sessionId
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
    trackedCache.add(cacheKey)
  },
  process: (progress: number) => {
    if (preview) return
    const label = `${Math.floor(progress * 10) * 10}%`
    const cacheKey = `${sessionId}_progress_${label}`
    if (trackedCache.has(cacheKey)) return
    gtag('event', 'progress', {
      event_category: sessionId,
      event_label: label
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
    trackedCache.add(cacheKey)
  }
})
