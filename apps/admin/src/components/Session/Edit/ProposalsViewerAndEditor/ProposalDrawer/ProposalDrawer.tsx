import {
  Drawer,
  makeStyles,
  Box,
  IconButton,
  useTheme,
  useMediaQuery
} from '@material-ui/core'
import Clear from '@material-ui/icons/Clear'
import { FC } from 'react'

const useStyle = makeStyles((theme) => ({
  drawer: {
    maxWidth: theme.spacing(100),
    width: '70%',
    height: '100%'
  },
  narrowDrawer: {
    width: '100%',
    height: '100%'
  },
  inner: {
    padding: theme.spacing(3)
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
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <Drawer
      anchor="right"
      {...props}
      classes={{ paper: matches ? classes.drawer : classes.narrowDrawer }}
    >
      <Box className={padding ? classes.inner : ''} position="relative">
        <Box position="absolute" top={0} right={0}>
          <IconButton onClick={props.onClose}>
            <Clear />
          </IconButton>
        </Box>
        {children}
      </Box>
    </Drawer>
  )
}
