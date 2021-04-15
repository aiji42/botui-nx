import { Session } from '@botui/types'
import { FC, useState } from 'react'
import { useFormState } from 'react-final-form'
import { Grid, Paper, makeStyles } from '@material-ui/core'

const ProposalViewer: FC = () => {
  const {
    values: { proposals }
  } = useFormState<Session>()

  return (
    <Grid container spacing={2}>
      <Column side="left">
        this is a pen.this is a pen.this is a pen.this is a pen.this is a
        pen.this is a pen.
      </Column>
      <Column side="right">
        this is a pen.this is a pen.this is a pen.this is a pen.this is a
        pen.this is a pen.
      </Column>
      <Column side="left">
        this is a pen.this is a pen.this is a pen.this is a pen.this is a
        pen.this is a pen.
      </Column>
      <Column side="right">
        this is a pen.this is a pen.this is a pen.this is a pen.this is a
        pen.this is a pen.
      </Column>
      <Column side="right">
        this is a pen.this is a pen.this is a pen.this is a pen.this is a
        pen.this is a pen.
      </Column>
    </Grid>
  )
}

interface ColumnProps {
  side: 'left' | 'right'
}

const useStyle = makeStyles((theme) => ({
  activeColumn: { backgroundColor: theme.palette.grey[100] },
  paper: { cursor: 'pointer' }
}))

const Column: FC<ColumnProps> = ({ side, children }) => {
  const [elevation, setElevation] = useState(1)
  const [active, setActive] = useState(false)
  const handleMouseOverPaper = () => setElevation(5)
  const handleMouseOutPaper = () => setElevation(1)
  const handleMouseOverColumn = () => setActive(true)
  const handleMouseOutColumn = () => setActive(false)
  const classes = useStyle()
  return (
    <>
      <Grid
        item
        container
        xs={12}
        md={9}
        lg={6}
        direction={side === 'left' ? 'row' : 'row-reverse'}
        justify="space-around"
        alignItems="center"
        onMouseOver={handleMouseOverColumn}
        onMouseOut={handleMouseOutColumn}
        className={active && classes.activeColumn}
      >
        <Grid
          component={Paper}
          xs={12}
          sm={7}
          elevation={elevation}
          onMouseOver={handleMouseOverPaper}
          onMouseOut={handleMouseOutPaper}
          className={classes.paper}
        >
          {children}
        </Grid>
        <Grid component={Paper} xs={false} sm={5} />
      </Grid>
      <Grid item container xs={false} md={3} lg={6} />
    </>
  )
}

export default ProposalViewer
