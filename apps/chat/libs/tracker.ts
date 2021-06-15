export const chatTracker = (sessionId: string, preview = false) => ({
  start: () => {
    !preview &&
      gtag('event', 'start', {
        event_category: sessionId
      })
  },
  complete: () => {
    !preview &&
      gtag('event', 'start', {
        event_category: sessionId
      })
  },
  process: (progress: 10 | 20 | 30 | 40 | 50 | 60 | 70 | 90) => {
    !preview &&
      gtag('event', 'progress', {
        event_category: sessionId,
        event_label: String(progress)
      })
  },
  checkpoint: (action: 'in' | 'out', name: string) => {
    !preview &&
      gtag('event', action === 'in' ? 'checkin' : 'checkout', {
        event_category: sessionId,
        event_label: name
      })
  }
})