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
  process: (progress: number) => {
    !preview &&
      gtag('event', 'progress', {
        event_category: sessionId,
        event_label: `${Math.floor(progress * 10) * 10}%`
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