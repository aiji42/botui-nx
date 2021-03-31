import path from 'path'
import fs from 'fs'
import { NextApiHandler } from 'next'

const downloadable: NextApiHandler = async (req, res) => {
  const dir = path.resolve('./public', 'chat.min.js')
  const filestream = fs.createReadStream(dir);
  console.log(filestream)
  // const filename = path.basename(dir);
  // res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  // res.setHeader('Content-type', 'text/javascript');
  // const filestream = fs.createReadStream(dir);
  // filestream.pipe(res);

  res.status(200).json({ message: 'succeed' })
}

export default downloadable
