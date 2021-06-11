import { VFC } from 'react'
import { FunctionField } from 'react-admin'
import { Session } from '@botui/types'
import { Box, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  img: {
    width: '100%',
    maxWidth: 600
  }
}))

export const AnalyticsTabInner: VFC = () => {
  const classes = useStyles()

  return (
    <FunctionField<Session>
      source="id"
      label=""
      render={() => (
        <Box textAlign="center" m={1}>
          <Typography variant="h5" color="secondary">
            COMING SOON...
          </Typography>
          <img
            src="/assets/analytics.png"
            alt="eye catch"
            className={classes.img}
          />
        </Box>
      )}
    />
  )
}
