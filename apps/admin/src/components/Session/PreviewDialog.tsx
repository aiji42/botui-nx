import { FC, useCallback, useState } from 'react'
import {Dialog, DialogContent, makeStyles, Button, useTheme, useMediaQuery} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility'
import { Session } from '@botui/types'
import { ChatControllerClient } from '@botui/chat-controller'

const useStyleDialog = makeStyles(() => ({
  paper: {
    width: 375,
    height: 812
  }
}))

const useStyleDialogContent = makeStyles(() => ({
  root: {
    padding: 0,
    '&:first-child': {
      paddingTop: 0
    }
  }
}))

interface PreviewDialogProps {
  session: Session
}

const PreviewDialog: FC<PreviewDialogProps> = ({ session }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])
  const dialogClasses = useStyleDialog()
  const dialogContentClasses = useStyleDialogContent()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  return (
    <>
      <Button startIcon={<Visibility />} onClick={handleOpen}>
        プレビュー
      </Button>
      <Dialog open={open} onClose={handleClose} classes={matches ? dialogClasses : {}} fullScreen={!matches}>
        <DialogContent classes={dialogContentClasses}>
          <ChatControllerClient onClose={handleClose} onComplete={handleClose}>
            <iframe
              src={`${
                process.env.NX_PREVIEW_HOST
              }/?preview=true&jsonedSession=${encodeURIComponent(
                JSON.stringify(session)
              )}`}
              title="プレビュー"
              width="100%"
              height="100%"
            />
          </ChatControllerClient>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PreviewDialog
