import { useEffect, useState, VFC } from 'react'
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Tooltip,
  CartesianGrid,
  Line,
  YAxis,
  XAxis
} from 'recharts'
import { Box, Typography } from '@material-ui/core'

export interface Props {
  sessionId: string
  begin: string
  end: string
}

const DateAreaChart: VFC<Props> = ({ sessionId, begin, end }) => {
  const [dataSet, setDataSet] = useState<null | Array<{
    open: number
    [x: string]: unknown
  }>>(null)
  useEffect(() => {
    const query = new URLSearchParams({ sessionId, begin, end })
    fetch(
      `${process.env.NX_PREVIEW_HOST}/api/event/analyze/counts-per-date?${query}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => res.json())
      .then(({ data }) => setDataSet(data[0]))
  }, [begin, end, sessionId])

  return (
    <>
      <ResponsiveContainer height="100%">
        <ComposedChart data={dataSet ?? []}>
          <defs>
            <linearGradient id="colorOpen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2196f3" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4dabf5" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorComplete" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00bcd4" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#33c9dc" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="createdOn.value" />
          <YAxis allowDecimals={false} yAxisId="count" />
          <YAxis orientation="right" yAxisId="rate" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            dataKey="open"
            stroke="#4dabf5"
            fillOpacity={1}
            fill="url(#colorOpen)"
            yAxisId="count"
          />
          <Area
            dataKey="complete"
            stroke="#00bcd4"
            fillOpacity={1}
            fill="url(#colorComplete)"
            yAxisId="count"
          />
          <Line dataKey="cvr" stroke="#3f51b5" yAxisId="rate" />
        </ComposedChart>
      </ResponsiveContainer>
      {dataSet?.map(({ open }) => open > 3)?.length < 3 && (
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

export default DateAreaChart
