import { NextApiHandler } from 'next'
import { BigQuery } from '@google-cloud/bigquery'
import sql from 'sqlstring'
import NextCors from 'nextjs-cors'

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
    WITH progressPerUser AS (
      SELECT userId, max(eventValue) AS progress FROM chachat.session_events
      WHERE eventLabel = 'progress'
        AND sessionid = ?
        AND createdAt BETWEEN ? AND ?
      GROUP BY userId
    )
    SELECT * FROM (
      SELECT progress, count(progress) AS \`count\` FROM progressPerUser
      GROUP BY progress
    ) tmp
    ORDER BY tmp.progress ASC
  `,
    [sessionId, begin, end]
  )
