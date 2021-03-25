import { NextApiHandler } from 'next'

const formPushTest: NextApiHandler = async (req, res) => {
  console.log(req.body)
  res.redirect(req.headers.referer ?? '/')
}

export default formPushTest
