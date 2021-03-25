import { NextApiHandler } from 'next'
import sgMail from '@sendgrid/mail'
import { MailDataRequired } from '@sendgrid/helpers/classes/mail'
import { Session } from '@botui/types'

sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY ?? '')

interface RequestBody {
  values?: Record<string, string>
  config?: Required<Pick<Session, 'id' | 'title' | 'email'>>
}

const notify: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: '405 Method Not Allowed' })
    return
  }

  try {
    const { values, config } = req.body as RequestBody
    if (!values || !config?.email)
      throw new Error('The request is in the wrong format.')

    const data = {
      session_title: config.title,
      details: Object.entries(values).map(([key, value]) => ({ key, value }))
    }
    await sgMail.send(msg(config.email, data))

    res.status(200).json({ message: 'succeed' })
  } catch (e) {
    res.status(400).json({ message: e?.message ?? '' })
  }
}

export default notify

const msg = (to: string, data: Record<string, unknown>): MailDataRequired => ({
  to,
  from: 'no-reply@survaq.com',
  templateId: 'd-812677117fa7414ea9cb219d8dc0ab45',
  dynamicTemplateData: data
})

export const requestNotify = async (
  values: Record<string, unknown>,
  session: Session
): Promise<Response | void> => {
  const { id, title, email } = session
  if (!email) return
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
  const res = await fetch('/api/notify', {
    method: 'POST',
    headers,
    body: JSON.stringify({ values, config: { id, title, email } })
  })

  return res
}
