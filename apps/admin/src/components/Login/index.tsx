import { FC, lazy, Suspense } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Paper,
  Grid,
  MuiThemeProvider,
  createMuiTheme,
  Box,
  Hidden
} from '@material-ui/core'
import { customizedTheme } from '../../customizedTheme'
import { makeStyles } from '@material-ui/core'
import { LoginContextProvider } from './use-login-context'
import { useCheckAuth } from 'react-admin'

const AuthForm = lazy(() => import('./AuthForm'))

const theme = createMuiTheme({
  palette: {
    primary: customizedTheme.palette.primary,
    secondary: customizedTheme.palette.secondary
  }
})

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh'
  },
  paper: {
    backgroundColor: theme.palette.grey[50]
  },
  img: {
    width: '100%',
    maxWidth: 800
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
        <Hidden smDown>
          <Grid item md={7}>
            <Box textAlign="center" m={1}>
              <img
                src="/assets/entry-form.png"
                alt="eye catch"
                className={classes.img}
              />
            </Box>
          </Grid>
        </Hidden>
        <Grid
          item
          xs={12}
          md={5}
          component={Paper}
          elevation={6}
          square
          className={classes.paper}
        >
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
