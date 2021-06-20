import { NextApiHandler } from 'next'
import { BigQuery } from '@google-cloud/bigquery'
import sql from 'sqlstring'

const credentials = JSON.parse(
  process.env.BIGQUERY_CREDENTIALS ??
    '{"client_email":"","private_key":"","project_id":""}'
) as { client_email: string; private_key: string; project_id: '' }

const client = new BigQuery({ credentials, projectId: credentials.project_id })

const analyze: NextApiHandler = async (req, res) => {
  const { query }: { query: Partial<QueryArg> } = req
  if (!valid(query)) {
    res.status(400).json({ message: '400 Bad Request' })
    return
  }

  try {
    const response = await client.query({
      query: makeQuery(query)
    })

    res.status(200).json({ message: 'succeed', data: response })
  } catch (e) {
    res.status(400).json({ message: e?.message ?? '' })
  }
}

export default analyze

export interface QueryArg {
  sessionId: string
  begin: string
  end: string
}

const valid = (query: Partial<QueryArg>): query is QueryArg =>
  !!(query.sessionId && query.begin && query.end)

const makeQuery = ({ sessionId, begin, end }: QueryArg) =>
  sql.format(
    `
    WITH openedPerDay AS (
      SELECT userId, date(createdAt) as createdOn FROM chachat.session_events
      WHERE eventLabel = 'start'
        AND sessionid = ?
        AND createdAt BETWEEN ? AND ?
      GROUP BY date(createdAt), userId
    )
    SELECT createdOn, count(*) as \`count\` FROM openedPerDay
    GROUP BY createdOn
  `,
    [sessionId, begin, end]
  )
