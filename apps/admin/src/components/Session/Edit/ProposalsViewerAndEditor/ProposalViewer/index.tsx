import { Session } from '@botui/types'
import { AllHTMLAttributes, FC, useState } from 'react'
import { useFormState } from 'react-final-form'
import { Grid, Paper, makeStyles, IconButton } from '@material-ui/core'
import { ImportExport, Add } from '@material-ui/icons'

const ProposalViewer: FC = () => {
  const {
    values: { proposals }
  } = useFormState<Session>()

  return (
    <Grid container spacing={7}>
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
  column: { position: 'relative' },
  activeColumn: {
    position: 'relative',
    backgroundColor: theme.palette.grey[100]
  },
  paper: { cursor: 'pointer' },
  toolTop: { position: 'absolute', top: -theme.spacing(1.8) },
  toolBottom: { position: 'absolute', bottom: -theme.spacing(1.8) }
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
    <Grid
      item
      container
      xs={12}
      md={9}
      lg={7}
      direction={side === 'left' ? 'row' : 'row-reverse'}
      justify="space-around"
      alignItems="center"
      onMouseEnter={handleMouseOverColumn}
      onMouseLeave={handleMouseOutColumn}
      className={active ? classes.activeColumn : classes.column}
    >
      {active && <EdgeTool className={classes.toolTop} />}
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
      {active && <EdgeTool className={classes.toolBottom} />}
    </Grid>
  )
}

const EdgeTool: FC<AllHTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div {...props}>
      <IconButton size="small">
        <Add />
      </IconButton>
      <IconButton size="small">
        <ImportExport />
      </IconButton>
    </div>
  )
}

export default ProposalViewer
