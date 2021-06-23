import { useEffect, useState, VFC } from 'react'
import {
  BarChart,
  Tooltip,
  Bar,
  YAxis,
  XAxis,
  ResponsiveContainer,
  LabelList
} from 'recharts'
import { Box, Typography } from '@material-ui/core'

export interface Props {
  sessionId: string
  begin: string
  end: string
}

const PassedCountBar: VFC<Props> = ({ sessionId, begin, end }) => {
  const [dataSet, setDataSet] = useState<null | Array<unknown>>(null)
  useEffect(() => {
    const query = new URLSearchParams({ sessionId, begin, end })
    fetch(
      `${process.env.NX_PREVIEW_HOST}/api/event/analyze/counts-per-passed?${query}`,
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
        <BarChart data={dataSet} layout="vertical">
          <XAxis type="number" allowDecimals={false} />
          <YAxis type="category" dataKey="passed" tick={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#5aabf6">
            <LabelList dataKey="passed" position="insideLeft" />
          </Bar>
        </BarChart>
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

export default PassedCountBar
