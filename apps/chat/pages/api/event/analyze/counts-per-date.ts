import { NextApiHandler } from 'next'
import { BigQuery } from '@google-cloud/bigquery'
import sql from 'sqlstring'
import NextCors from 'nextjs-cors'
import dayjs from 'dayjs'

const credentials = JSON.parse(
  process.env.BIGQUERY_CREDENTIALS ??
    '{"client_email":"","private_key":"","project_id":""}'
) as { client_email: string; private_key: string; project_id: '' }

const client = new BigQuery({ credentials, projectId: credentials.project_id })

const analyze: NextApiHandler = async (req, res) => {
  await NextCors(req, res, {
    methods: ['GET'],
    origin: '*',
    optionsSuccessStatus: 200
  })

  const { query }: { query: Partial<QueryArg> } = req
  if (!valid(query)) {
    res.status(400).json({ message: '400 Bad Request' })
    return
  }
  const range: string[] = [query.begin]
  while (query.end !== range.slice(-1)[0]) {
    range.push(dayjs(range.slice(-1)[0]).add(1, 'day').format('YYYY-MM-DD'))
  }

  try {
    const response = await client.query({
      query: makeQuery(query)
    })
    const data = range.map((date) => {
      const data = response[0].find(
        ({ createdOn: { value } }) => value === date
      )
      return {
        createdOn: { value: date },
        ...(data ?? { open: 0, complete: 0, cvr: 0 })
      }
    })

    res.status(200).json({ message: 'succeed', data })
  } catch (e) {
    res.status(400).json({ message: e?.message ?? '' })
  }
}

export default analyze

interface QueryArg {
  sessionId: string
  begin: string
  end: string
}

const valid = (query: Partial<QueryArg>): query is QueryArg =>
  !!(query.sessionId && query.begin && query.end)

const makeQuery = ({ sessionId, begin, end }: QueryArg) =>
  sql.format(
    `
    WITH
    openedPerDay AS (
      SELECT userId, date(createdAt) AS createdOn FROM chachat.session_events
      WHERE eventLabel = 'start'
        AND sessionid = ?
        AND createdAt BETWEEN ? AND ?
      GROUP BY date(createdAt), userId
    ),
    completedPerDay AS (
      SELECT userId, date(createdAt) AS createdOn FROM chachat.session_events
      WHERE eventLabel = 'complete'
        AND sessionid = ?
        AND createdAt BETWEEN ? AND ?
      GROUP BY date(createdAt), userId
    )
    SELECT * FROM (
      SELECT
        o.createdOn,
        count(o.createdOn) AS open,
        count(c.createdOn) AS complete,
        count(c.createdOn) / count(o.createdOn) AS cvr
      FROM openedPerDay o
      LEFT JOIN completedPerDay c
        ON o.createdOn = c.createdOn
      GROUP BY o.createdOn, c.createdOn
    ) tmp
    ORDER BY tmp.createdOn ASC
  `,
    [sessionId, begin, end, sessionId, begin, end]
  )
