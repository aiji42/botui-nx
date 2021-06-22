import { useEffect, useState, VFC } from 'react'
import {
  ComposedChart,
  Area,
  Tooltip,
  CartesianGrid,
  Line,
  YAxis,
  XAxis,
  ResponsiveContainer
} from 'recharts'

export interface Props {
  sessionId: string
  begin: string
  end: string
}

const ProgressChart: VFC<Props> = ({ sessionId, begin, end }) => {
  const [dataSet, setDataSet] = useState([])
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
      .then(({ data }) => setDataSet(data[0]))
  }, [begin, end, sessionId])

  return (
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
  )
}

export default ProgressChart
