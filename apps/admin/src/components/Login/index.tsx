import { FC, lazy, Suspense } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Paper,
  Grid,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core'
import { customizedTheme } from '../../customizedTheme'
import { makeStyles } from '@material-ui/core'
import { EyeCatch } from './EyeCatch'
import { LoginContextProvider } from './use-login-context'
import { useCheckAuth } from 'react-admin'

const AuthForm = lazy(() => import('./AuthForm'))

const theme = createMuiTheme({
  palette: {
    primary: customizedTheme.palette.primary,
    secondary: customizedTheme.palette.secondary
  }
})

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh'
  }
}))

export const Login: FC = () => {
  const classes = useStyles()
  const checkAuth = useCheckAuth()
  const history = useHistory()
  checkAuth({}, false).then(() => history.push('/'))

  return (
    <MuiThemeProvider theme={theme}>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={4} md={7}>
          <EyeCatch />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <LoginContextProvider>
            <Suspense fallback={null}>
              <AuthForm />
            </Suspense>
          </LoginContextProvider>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  )
}
