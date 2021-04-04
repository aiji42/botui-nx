import React, { FC, useState, useCallback } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { Dialog, DialogContent, Button, Typography } from '@material-ui/core'
import { FileCopyOutlined } from '@material-ui/icons'
import { Code } from '@material-ui/icons'
import { Session } from '@botui/types'
import copy from 'copy-to-clipboard'
import { useNotify } from 'react-admin'

const embeddedScript = (sessionId: string) => `
<script type="text/javascript">var call=function(a,e){var t=document.getElementsByTagName("script")[0],n=document.createElement("script");n.async=!0,n.src=a,n.addEventListener?n.onload=function(){e()}:n.onreadystatechange=function(){"loaded"!=n.readyState&&"complete"!=n.readyState||(n.onreadystatechange=null,e())},t.parentNode.insertBefore(n,t)};call("/api/script/botui/chat.min.js",function(){new Botui.default("${process.env.NX_PREVIEW_HOST}/?sessionId=${sessionId}").start()});</script>
`

interface EmbeddedScriptDialogProps {
  session: Session
}

const EmbeddedScriptDialog: FC<EmbeddedScriptDialogProps> = ({ session }) => {
  const [open, setOpen] = useState(false)
  const handleClose = useCallback(() => setOpen(false), [setOpen])
  const notify = useNotify()
  const handleCopy = useCallback(() => {
    copy(embeddedScript(session.id))
    notify('コピーしました。')
  }, [session.id, notify])
  return (
    <>
      <Button startIcon={<Code />} onClick={() => setOpen(true)}>
        公開用タグ
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography color="textSecondary">
            下記のコードをチャットを起動させたいページのHEADタグに埋め込んでください。
          </Typography>
          <SyntaxHighlighter language="text">
            {embeddedScript(session.id)}
          </SyntaxHighlighter>
          <Button onClick={handleCopy}>
            <FileCopyOutlined />
            クリップボードにコピー
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EmbeddedScriptDialog
