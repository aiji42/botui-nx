import { cloneElement, isValidElement, VFC, ReactNode, useState } from 'react'
import { Grid, makeStyles, Box } from '@material-ui/core'

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

interface SingleColumnRowProps {
  topTool?: ReactNode
  bottomTool?: ReactNode
  rightTopTool?: ReactNode
  children: ReactNode | ((arg: { active: boolean }) => ReactNode)
}

export const SingleColumnRow: VFC<SingleColumnRowProps> = ({
  children,
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
    : typeof children === 'function'
    ? children({ active })
    : children

  return (
    <Grid
      container
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
