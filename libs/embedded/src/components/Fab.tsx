import React, { FC, MouseEventHandler } from 'react'
import FabMU from '@material-ui/core/Fab'
import makeStyles from '@material-ui/core/styles/makeStyles'
import ChatIcon from '@material-ui/icons/ChatBubble'

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    zIndex: 100,
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    backgroundImage: 'none' // reset style
  }
}))

export interface FabProps {
  isOpen: boolean
  onClick: MouseEventHandler
}

export const Fab: FC<FabProps> = (props) => {
  const { isOpen, onClick } = props
  const classes = useStyles()
  if (isOpen) return null
  return (
    <FabMU onClick={onClick} className={classes.fab} color="primary">
      <ChatIcon fontSize="large" />
    </FabMU>
  )
}
