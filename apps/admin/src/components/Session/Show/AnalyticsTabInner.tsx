import { VFC, lazy, Suspense } from 'react'
import { FunctionField } from 'react-admin'
import { Session } from '@botui/types'
import { Box, Grid, Typography } from '@material-ui/core'
import dayjs from 'dayjs'

const DateAreaChart = lazy(() => import('./AnalyticsChart/DateAreaChart'))
const PassedCountBar = lazy(() => import('./AnalyticsChart/PassedCountBar'))
const ProgressChart = lazy(() => import('./AnalyticsChart/ProgressChart'))

const begin = dayjs().add(-10, 'day').format('YYYY-MM-DD')
const end = dayjs().format('YYYY-MM-DD')

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
              position="relative"
            >
              <Typography color="primary">開始・完了カウンタ/CVR</Typography>
              <Suspense fallback={null}>
                <DateAreaChart sessionId={record.id} begin={begin} end={end} />
              </Suspense>
            </Grid>
            <Grid
              item
              sm={12}
              md={6}
              mt={6}
              component={Box}
              pb={8}
              height="320px"
              width="100px"
              position="relative"
            >
              <Typography color="primary">フォーム入力完了カウンタ</Typography>
              <Suspense fallback={null}>
                <PassedCountBar sessionId={record.id} begin={begin} end={end} />
              </Suspense>
            </Grid>
            <Grid
              item
              sm={12}
              md={6}
              mt={6}
              component={Box}
              pb={8}
              height="320px"
              width="100px"
              position="relative"
            >
              <Typography color="primary">進捗率カウンタ</Typography>
              <Suspense fallback={null}>
                <ProgressChart sessionId={record.id} begin={begin} end={end} />
              </Suspense>
            </Grid>
          </Grid>
        )
      }
    />
  )
}
