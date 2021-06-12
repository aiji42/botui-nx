import { useOwnUserInfo } from '../use-own-user-info'

export const useOwnEmail = () => {
  const userInfo = useOwnUserInfo()
  return userInfo?.attributes.email
}
