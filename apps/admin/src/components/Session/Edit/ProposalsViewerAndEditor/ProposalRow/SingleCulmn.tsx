import { Grid, Paper, Box, makeStyles } from '@material-ui/core'
import { FC, ReactNode, useState } from 'react'

const useStyle = makeStyles((theme) => ({
  paper: { cursor: 'pointer', position: 'relative' },
  leftTool: {
    position: 'absolute',
    left: -theme.spacing(3),
    top: '50%',
    transform: 'translateY(-50%)'
  },
  rightTool: {
    position: 'absolute',
    right: -theme.spacing(3),
    top: '50%',
    transform: 'translateY(-50%)'
  }
}))

interface SingleColumnProps {
  onClick: () => void
  active?: boolean
  leftTool?: ReactNode
  rightTool?: ReactNode
}

export const SingleColumn: FC<SingleColumnProps> = ({
  children,
  leftTool,
  rightTool,
  active = false,
  ...props
}) => {
  const [elevation, setElevation] = useState(1)
  const handleMouseOverPaper = () => setElevation(5)
  const handleMouseOutPaper = () => setElevation(1)
  const classes = useStyle()

  return (
    <Grid
      component={Paper}
      item
      elevation={elevation}
      onMouseOver={handleMouseOverPaper}
      onMouseOut={handleMouseOutPaper}
      className={classes.paper}
    >
      <Box className={classes.leftTool}>{active && leftTool}</Box>
      <Box p={2} {...props}>
        {children}
      </Box>
      <Box className={classes.leftTool}>{active && rightTool}</Box>
    </Grid>
  )
}
