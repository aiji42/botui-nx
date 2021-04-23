import { FC, ReactNode, useState, cloneElement, isValidElement } from 'react'
import { Grid, Box, makeStyles } from '@material-ui/core'

const useStyle = makeStyles((theme) => ({
  column: { position: 'relative', padding: theme.spacing(3) },
  activeColumn: {
    position: 'relative',
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(3)
  },
  topTool: { position: 'absolute', top: -theme.spacing(1.8) },
  bottomTool: { position: 'absolute', bottom: -theme.spacing(1.8) },
  rightTopTool: {
    position: 'absolute',
    right: -theme.spacing(2),
    top: -theme.spacing(2)
  }
}))

interface DoubleColumnRowProps {
  side: 'left' | 'right'
  topTool?: ReactNode
  bottomTool?: ReactNode
  rightTopTool?: ReactNode
}

export const DoubleColumnRow: FC<DoubleColumnRowProps> = ({
  children,
  side,
  topTool,
  bottomTool,
  rightTopTool
}) => {
  const [active, setActive] = useState(false)
  const handleMouseOverColumn = () => setActive(true)
  const handleMouseOutColumn = () => setActive(false)
  const classes = useStyle()
  const newChildren = isValidElement(children)
    ? cloneElement(children, { active })
    : children

  return (
    <Grid
      container
      direction={side === 'left' ? 'row' : 'row-reverse'}
      justify="space-around"
      alignItems="center"
      onMouseEnter={handleMouseOverColumn}
      onMouseLeave={handleMouseOutColumn}
      className={active ? classes.activeColumn : classes.column}
    >
      <Box className={classes.rightTopTool}>{active && rightTopTool}</Box>
      <Box className={classes.topTool}>{active && topTool}</Box>
      {newChildren}
      <Box className={classes.bottomTool}>{active && bottomTool}</Box>
    </Grid>
  )
}
