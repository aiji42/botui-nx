import { useEffect, useState, VFC } from 'react'
import {
  ComposedChart,
  Area,
  Tooltip,
  CartesianGrid,
  YAxis,
  XAxis,
  ResponsiveContainer
} from 'recharts'
import { Box, Typography } from '@material-ui/core'

export interface Props {
  sessionId: string
  begin: string
  end: string
}

const ProgressChart: VFC<Props> = ({ sessionId, begin, end }) => {
  const [dataSet, setDataSet] = useState<null | Array<unknown>>(null)
  useEffect(() => {
    const query = new URLSearchParams({ sessionId, begin, end })
    fetch(
      `${process.env.NX_PREVIEW_HOST}/api/event/analyze/counts-per-progress?${query}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => res.json())
      .then(({ data }) => setDataSet(data))
  }, [begin, end, sessionId])

  return (
    <>
      <ResponsiveContainer height="100%">
        <ComposedChart data={dataSet}>
          <defs>
            <linearGradient id="colorOpen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2196f3" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4dabf5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="progress" unit="%" />
          <YAxis allowDecimals={false} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            dataKey="count"
            type="monotone"
            stroke="#4dabf5"
            fillOpacity={1}
            fill="url(#colorOpen)"
          />
        </ComposedChart>
      </ResponsiveContainer>
      {dataSet?.length < 3 && (
        <Box
          width="100%"
          height="100%"
          bgcolor="rgb(17 34 51 / 30%)"
          top={0}
          position="absolute"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h5">十分なデータが有りません</Typography>
        </Box>
      )}
    </>
  )
}

export default ProgressChart
