import { useEffect, useState, VFC } from 'react'
import { AreaChart, Area, Tooltip, CartesianGrid, YAxis, XAxis } from 'recharts'

export interface Props {
  sessionId: string
  begin: string
  end: string
}

const DateAreaChart: VFC<Props> = ({ sessionId, begin, end }) => {
  const [dataSet, setDataSet] = useState([])
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
    ).then((res) => res.json())
    .then(({ data }) => setDataSet(data[0]))
  }, [begin, end, sessionId])

  console.log(dataSet)

  return (
    <AreaChart
      width={730}
      height={250}
      data={dataSet}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="createdOn.value" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="open"
        stroke="#8884d8"
        fillOpacity={1}
        fill="url(#colorUv)"
      />
      <Area
        type="monotone"
        dataKey="complete"
        stroke="#82ca9d"
        fillOpacity={1}
        fill="url(#colorPv)"
      />
    </AreaChart>
  )
}

export default DateAreaChart