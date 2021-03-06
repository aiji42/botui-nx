import { FC, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Mode, useLoginContext } from './use-login-context'
import { SignInForm } from './SignInForm'
import { ForgotPasswordForm } from './ForgotPasswordForm'
import { SignUpForm } from './SignUpForm'
import { ConfirmSignUpForm } from './ConfirmSignUpForm'
import { ResetPasswordForm } from './ResetPasswordForm'
import { resetNotification } from 'react-admin'
import { useDispatch } from 'react-redux'

const AuthForm: FC = () => {
  const [{ mode, authSucceed }] = useLoginContext()
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (authSucceed) {
      dispatch(resetNotification())
      history.push('/')
    }
  }, [authSucceed, dispatch, history])

  return (
    <>
      {mode === Mode.SIGN_IN && <SignInForm />}
      {mode === Mode.SIGN_UP && <SignUpForm />}
      {mode === Mode.CONFIRM_SIGN_UP && <ConfirmSignUpForm />}
      {mode === Mode.FORGOT_PASSWORD && <ForgotPasswordForm />}
      {mode === Mode.RESET_PASSWORD && <ResetPasswordForm />}
    </>
  )
}

export default AuthForm
