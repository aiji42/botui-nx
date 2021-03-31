import path from 'path'
import fs from 'fs'
import { NextApiHandler } from 'next'

// 多分本番はパスを変更しないといけない
const downloadable: NextApiHandler = async (req, res) => {
  if (typeof req.query.filename !== 'string') {
    res.status(400).json({ message: 'Bad request' })
    return
  }

  try {
  const file = path.resolve('./apps/chat/public', req.query.filename)
    if (!fs.existsSync(file)) {
      res.status(404).json({ message: `No file: ${req.query.filename}` })
      return
    }
    const filename = path.basename(file)
    res.setHeader('Content-disposition', 'attachment; filename=' + filename)
    res.setHeader('Content-type', 'text/javascript')
    const filestream = fs.createReadStream(file)
    filestream.pipe(res)
  } catch(e) {
    console.error(e)
    res.status(500).json({ message: e.message })
  }
}

export default downloadable
