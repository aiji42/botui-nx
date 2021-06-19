import { NextApiHandler } from 'next'
import { BigQuery } from '@google-cloud/bigquery'

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
    await client.query(makeQuery(req.body))
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
  eventValue: string
}

const makeQuery = ({
  sessionId,
  userId,
  eventLabel,
  eventValue
}: EventTrackQueryArg) => `
    INSERT INTO chachat.session_events (sessionId, userId, eventLabel, eventValue, createdAt)
    VALUES ('${sessionId}', '${userId}', '${eventLabel}', '${eventValue}', CURRENT_TIMESTAMP())
  `

