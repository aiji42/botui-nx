import { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'

export const useOwnUserInfo = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [useInfo, setUserInfo] = useState<any | null>(null)
  useEffect(() => {
    Auth.currentUserInfo().then((info) => setUserInfo(info))
  }, [])

  return useInfo
}
