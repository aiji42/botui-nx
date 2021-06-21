import { VFC, lazy, Suspense } from 'react'
import { FunctionField } from 'react-admin'
import { Session } from '@botui/types'
import { Box, Typography, makeStyles } from '@material-ui/core'

const DateAreaChart = lazy(() => import('./AnalyticsChart/DateAreaChart'))

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
          <Suspense fallback={null}>
            <DateAreaChart
              sessionId="9040a628-6afa-4874-982c-a6e1a8de877b"
              begin="2021-06-19"
              end="2021-06-22"
            />
          </Suspense>
        </Box>
      )}
    />
  )
}
