import { Session } from '@botui/types'
import { AllHTMLAttributes, FC, useState } from 'react'
import { useFormState } from 'react-final-form'
import {
  Grid,
  makeStyles,
  IconButton,
  Typography,
  Box,
  ListItem,
  ListItemIcon
} from '@material-ui/core'
import {
  ImportExport,
  AddCircle,
  DoubleArrow,
  Code,
  TextFields,
  ListAlt
} from '@material-ui/icons'
import { DoubleColumnRow } from './ProposalRow/DoubleColumnRow'
import { DoubleColumn } from './ProposalRow/DoubleCulmn'
import { SingleColumnRow } from './ProposalRow/SingleColumnRow'
import { SingleColumn } from './ProposalRow/SingleCulmn'
import { ProposalDrawer } from './ProposalDrawer/ProposalDrawer'
import { MessageEditForm } from './PoposalForm/MessageEditForm'
import { ProposalItemSelectList } from './PoposalForm/ProposalItemSelectList'
import {
  FormCustomCheckboxEditForm,
  FormBirthDayEditForm
} from './PoposalForm/FormEfitForm'

const ProposalViewer: FC = () => {
  const {
    values: { proposals }
  } = useFormState<Session>()

  return (
    <Grid container>
      <Grid container item xs={12} lg={8}>
        <MessageRow>
          this is a pen.this is a pen.this is a pen.this is a pen.this is a
          pen.this is a pen.
        </MessageRow>
        <RelayerRow>
          <Code />
        </RelayerRow>
        <FormRow human>氏名フォーム</FormRow>
        <MessageRow>
          this is a pen.this is a pen.this is a pen.this is a pen.this is a
          pen.this is a pen.
        </MessageRow>
        <FormRow human>住所フォーム</FormRow>
        <FormRow human>電話番号フォーム</FormRow>
      </Grid>
      <Grid container item xs={false} lg={4} />
    </Grid>
  )
}

const useStyle = makeStyles((theme) => ({
  sidePanel: {
    padding: theme.spacing(3),
    paddingTop: theme.spacing(10)
  }
}))

interface MessageRowProps {
  human?: boolean
}

const MessageRow: FC<MessageRowProps> = ({ human = false, children }) => {
  const [editing, setEditing] = useState(false)
  const handleEditig = () => setEditing(true)
  const handleCloseEditig = () => setEditing(false)
  const classes = useStyle()
  return (
    <>
      <DoubleColumnRow
        side={human ? 'right' : 'left'}
        topTool={<EdgeTool />}
        bottomTool={<EdgeTool />}
      >
        <DoubleColumn
          onClick={handleEditig}
          leftTool={human && <LeftTool />}
          rightTool={!human && <RightTool />}
        >
          <ListItem>
            <ListItemIcon>
              <TextFields />
            </ListItemIcon>
            <Typography variant="body1">{children}</Typography>
          </ListItem>
        </DoubleColumn>
      </DoubleColumnRow>
      <ProposalDrawer open={editing} onClose={handleCloseEditig}>
        <Box className={classes.sidePanel}>
          <MessageEditForm />
        </Box>
      </ProposalDrawer>
    </>
  )
}

interface FormRowProps {
  human?: boolean
}

const FormRow: FC<FormRowProps> = ({ human = false, children }) => {
  const [editing, setEditing] = useState(false)
  const handleEditig = () => setEditing(true)
  const handleCloseEditig = () => setEditing(false)
  const classes = useStyle()
  return (
    <>
      <DoubleColumnRow
        side={human ? 'right' : 'left'}
        topTool={<EdgeTool />}
        bottomTool={<EdgeTool />}
      >
        <DoubleColumn
          onClick={handleEditig}
          leftTool={human && <LeftTool />}
          rightTool={!human && <RightTool />}
        >
          <ListItem>
            <ListItemIcon>
              <ListAlt />
            </ListItemIcon>
            {children}
          </ListItem>
        </DoubleColumn>
      </DoubleColumnRow>
      <ProposalDrawer open={editing} onClose={handleCloseEditig}>
        <Box className={classes.sidePanel}>
          <FormBirthDayEditForm />
        </Box>
      </ProposalDrawer>
    </>
  )
}

const RelayerRow: FC = ({ children }) => {
  const [editing, setEditing] = useState(false)
  const handleEditig = () => setEditing(true)
  const handleCloseEditig = () => setEditing(false)
  const classes = useStyle()
  return (
    <>
      <SingleColumnRow topTool={<EdgeTool />} bottomTool={<EdgeTool />}>
        <SingleColumn onClick={handleEditig}>{children}</SingleColumn>
      </SingleColumnRow>
      <ProposalDrawer open={editing} onClose={handleCloseEditig}>
        <Box className={classes.sidePanel}>
          <MessageEditForm />
        </Box>
      </ProposalDrawer>
    </>
  )
}

const EdgeTool: FC<AllHTMLAttributes<HTMLDivElement>> = (props) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div {...props}>
        <IconButton size="small" onClick={() => setOpen(true)}>
          <AddCircle />
        </IconButton>
        <IconButton size="small">
          <ImportExport />
        </IconButton>
      </div>
      <ProposalDrawer open={open} onClose={() => setOpen(false)}>
        <ProposalItemSelectList />
      </ProposalDrawer>
    </>
  )
}

const LeftTool: FC = () => {
  return (
    <IconButton style={{ transform: 'scale(-1, 1)' }} size="small">
      <DoubleArrow />
    </IconButton>
  )
}

const RightTool: FC = () => {
  return (
    <IconButton size="small">
      <DoubleArrow />
    </IconButton>
  )
}

export default ProposalViewer
