import {Drawer, makeStyles, Box} from '@material-ui/core';
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
  },
  inner: {
    padding: theme.spacing(3),
    paddingTop: theme.spacing(10)
  }
}))

interface ProposalDrawerProps {
  open: boolean
  onClose: () => void
  padding?: boolean
}

export const ProposalDrawer: FC<ProposalDrawerProps> = ({
  children,
  padding = false,
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
      <Box className={padding && classes.inner}>{children}</Box>
    </Drawer>
  )
}
