import { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'

export const useOwnEmail = () => {
  const [email, setEmail] = useState<string | null>(null)
  useEffect(() => {
    Auth.currentUserInfo().then(({ attributes }) => setEmail(attributes.email))
  }, [])

  return email
}
