import { useEffect, useState } from 'react'
import { getStorageUrl } from '@botui/api'

export const useImageUrl = (key?: string): string => {
  const [url, setUrl] = useState<string>('')
  useEffect(() => {
    if (key) getStorageUrl(key).then(setUrl)
  }, [key])

  return url
}
