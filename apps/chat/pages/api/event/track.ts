import { NextApiHandler } from 'next'
import { BigQuery } from '@google-cloud/bigquery'
import sql from 'sqlstring'

const credentials = JSON.parse(
  process.env.BIGQUERY_CREDENTIALS ??
    '{"client_email":"","private_key":"","project_id":""}'
) as { client_email: string; private_key: string; project_id: '' }

const client = new BigQuery({ credentials, projectId: credentials.project_id })

const eventTrack: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: '405 Method Not Allowed' })
    return
  }

  try {
    await client.query({
      query: makeQuery(req.body),
      dryRun: process.env.VERCEL_ENV !== 'production'
    })

    res.status(200).json({ message: 'succeed' })
  } catch (e) {
    res.status(400).json({ message: e?.message ?? '' })
  }
}

export default eventTrack

export interface EventTrackQueryArg {
  sessionId: string
  userId: string
  eventLabel: string
  eventValue: string | number
}

const makeQuery = ({
  sessionId,
  userId,
  eventLabel,
  eventValue
}: EventTrackQueryArg) =>
  sql.format(
    `
    INSERT INTO chachat.session_events (sessionId, userId, eventLabel, eventValue, createdAt)
    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP())
  `,
    [sessionId, userId, eventLabel, String(eventValue)]
  )
