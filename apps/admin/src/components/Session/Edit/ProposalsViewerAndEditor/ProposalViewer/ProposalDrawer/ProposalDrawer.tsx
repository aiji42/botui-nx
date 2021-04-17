import { Drawer, makeStyles } from '@material-ui/core'
import { FC } from 'react'

const useStyle = makeStyles((theme) => ({
  drawer: {
    minWidth: theme.spacing(50),
    maxWidth: theme.spacing(100),
    width: '70%',
    height: '100%'
  },
  drawerPaper: {
    minWidth: theme.spacing(50),
    maxWidth: theme.spacing(100),
    width: '70%',
    height: '100%'
  }
}))

interface ProposalDrawerProps {
  open: boolean
  onClose: () => void
}

export const ProposalDrawer: FC<ProposalDrawerProps> = ({
  children,
  ...props
}) => {
  const classes = useStyle()
  return (
    <Drawer
      anchor="right"
      {...props}
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      {children}
    </Drawer>
  )
}
