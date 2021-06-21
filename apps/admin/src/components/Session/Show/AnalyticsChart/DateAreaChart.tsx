import { useEffect, useState, VFC } from 'react'
import { AreaChart,ComposedChart, Area, Tooltip, CartesianGrid, Line, YAxis, XAxis } from 'recharts'

export interface Props {
  sessionId: string
  begin: string
  end: string
}

const DateAreaChart: VFC<Props> = ({ sessionId, begin, end }) => {
  const [dataSet, setDataSet] = useState([
    { complete: 10, createdOn: { value: '2021-06-12' }, cvr: 0.4, open: 25 },
    { complete: 40, createdOn: { value: '2021-06-13' }, cvr: 0.2, open: 200 },
    { complete: 60, createdOn: { value: '2021-06-14' }, cvr: 0.5, open: 120 },
    { complete: 20, createdOn: { value: '2021-06-15' }, cvr: 0.2, open: 100 },
    { complete: 10, createdOn: { value: '2021-06-17' }, cvr: 0.1, open: 100 },
    { complete: 10, createdOn: { value: '2021-06-18' }, cvr: 0.1, open: 100 }
  ])
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
    .then(({ data }) => setDataSet((prev) => [...prev, ...data[0]]))
  }, [begin, end, sessionId])

  console.log(dataSet)

  return (
    <ComposedChart
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
      <YAxis allowDecimals={false} yAxisId="count" />
      <YAxis orientation="right" yAxisId="rate" />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="open"
        stroke="#8884d8"
        fillOpacity={1}
        fill="url(#colorUv)"
        yAxisId="count"
      />
      <Area
        type="monotone"
        dataKey="complete"
        stroke="#82ca9d"
        fillOpacity={1}
        fill="url(#colorPv)"
        yAxisId="count"
      />
      <Line type="monotone" dataKey="cvr" stroke="#82ca9d" yAxisId="rate" />
    </ComposedChart>
  )
}

export default DateAreaChart