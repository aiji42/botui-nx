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

export interface Props {
  sessionId: string
  begin: string
  end: string
}

const PassedCountBar: VFC<Props> = ({ sessionId, begin, end }) => {
  const [dataSet, setDataSet] = useState()
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
      .then(({ data }) => setDataSet(data[0]))
  }, [begin, end, sessionId])

  return (
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
  )
}

export default PassedCountBar
