import { VFC, lazy, Suspense } from 'react'
import { FunctionField } from 'react-admin'
import { Session } from '@botui/types'
import { Box, Grid, Typography } from '@material-ui/core'

const DateAreaChart = lazy(() => import('./AnalyticsChart/DateAreaChart'))
const PassedCountBar = lazy(() => import('./AnalyticsChart/PassedCountBar'))
const ProgressChart = lazy(() => import('./AnalyticsChart/ProgressChart'))

export const AnalyticsTabInner: VFC = () => {
  return (
    <FunctionField<Session>
      source="id"
      label=""
      render={(record) =>
        record && (
          <Grid container component={Box} textAlign="center" m={1}>
            <Grid
              item
              xs={12}
              component={Box}
              pb={8}
              height="400px"
              width="100px"
            >
              <Typography>開始・完了カウンタ/CVR</Typography>
              <Suspense fallback={null}>
                <DateAreaChart
                  sessionId={record.id}
                  begin="2021-06-19"
                  end="2021-06-23"
                />
              </Suspense>
            </Grid>
            <Grid
              item
              sm={12}
              md={6}
              component={Box}
              pb={8}
              height="320px"
              width="100px"
            >
              <Typography>フォーム入力完了カウンタ</Typography>
              <Suspense fallback={null}>
                <PassedCountBar
                  sessionId={record.id}
                  begin="2021-06-19"
                  end="2021-06-23"
                />
              </Suspense>
            </Grid>
            <Grid
              item
              sm={12}
              md={6}
              component={Box}
              pb={8}
              height="320px"
              width="100px"
            >
              <Typography>進捗率カウンタ</Typography>
              <Suspense fallback={null}>
                <ProgressChart
                  sessionId={record.id}
                  begin="2021-06-19"
                  end="2021-06-23"
                />
              </Suspense>
            </Grid>
          </Grid>
        )
      }
    />
  )
}
