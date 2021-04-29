import { Grid, Paper, Box, IconButton, makeStyles } from '@material-ui/core'
import { Cancel } from '@material-ui/icons'
import { FC, ReactNode, useState } from 'react'

const useStyle = makeStyles((theme) => ({
  paper: { cursor: 'pointer', position: 'relative' },
  leftTool: {
    position: 'absolute',
    left: -theme.spacing(4),
    top: '50%',
    transform: 'translateY(-50%)'
  },
  rightTool: {
    position: 'absolute',
    right: -theme.spacing(4),
    top: '50%',
    transform: 'translateY(-50%)'
  }
}))

interface DoubleColumnProps {
  onClick: () => void
  active?: boolean
  leftTool?: ReactNode
  rightTool?: ReactNode
}

export const DoubleColumn: FC<DoubleColumnProps> = ({
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
    <>
      <Grid
        component={Paper}
        item
        xs={12}
        sm={7}
        elevation={elevation}
        onMouseOver={handleMouseOverPaper}
        onMouseOut={handleMouseOutPaper}
        className={classes.paper}
      >
        <Box className={classes.leftTool}>{active && leftTool}</Box>
        <Box p={2} {...props}>
          {children}
        </Box>
        <Box className={classes.rightTool}>{active && rightTool}</Box>
      </Grid>
      <Grid component={Paper} item xs={false} sm={5} />
    </>
  )
}
