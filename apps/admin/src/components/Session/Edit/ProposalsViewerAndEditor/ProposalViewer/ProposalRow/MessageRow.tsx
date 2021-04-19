import { ProposalMessage } from '@botui/types'
import { FC, useCallback, useState, AllHTMLAttributes } from 'react'
import {
  Typography,
  Box,
  ListItem,
  ListItemIcon,
  IconButton,
  makeStyles
} from '@material-ui/core'
import {
  TextFields,
  DoubleArrow,
  ImportExport,
  AddCircle
} from '@material-ui/icons'
import { DoubleColumnRow } from './DoubleColumnRow'
import { DoubleColumn } from './DoubleCulmn'
import { ProposalDrawer } from '../ProposalDrawer/ProposalDrawer'
import { MessageEditForm } from '../PoposalForm/MessageEditForm'
import { ProposalItemSelectList } from '../PoposalForm/ProposalItemSelectList'

const useStyle = makeStyles((theme) => ({
  sidePanel: {
    padding: theme.spacing(3),
    paddingTop: theme.spacing(10)
  }
}))

interface MessageRowProps {
  proposal: ProposalMessage
  updateProposal: (arg: ProposalMessage) => void
}

export const MessageRow: FC<MessageRowProps> = ({
  proposal,
  updateProposal
}) => {
  const [editing, setEditing] = useState(false)
  const handleEditig = () => setEditing(true)
  const handleCloseEditig = () => setEditing(false)
  const classes = useStyle()
  const switchSide = useCallback(() => {
    updateProposal({
      ...proposal,
      data: { ...proposal.data, human: !proposal.data.human }
    })
  }, [updateProposal, proposal])

  const {
    data: { human, content }
  } = proposal
  if (content.type !== 'string') return null
  return (
    <>
      <DoubleColumnRow
        side={human ? 'right' : 'left'}
        topTool={<EdgeTool />}
        bottomTool={<EdgeTool />}
      >
        <DoubleColumn
          onClick={handleEditig}
          leftTool={human && <LeftTool onClick={switchSide} />}
          rightTool={!human && <RightTool onClick={switchSide} />}
        >
          <ListItem>
            <ListItemIcon>
              <TextFields />
            </ListItemIcon>
            <Typography variant="body1">{content.props.children}</Typography>
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

const LeftTool: FC<{ onClick: () => void }> = (props) => {
  return (
    <IconButton {...props} style={{ transform: 'scale(-1, 1)' }} size="small">
      <DoubleArrow />
    </IconButton>
  )
}

const RightTool: FC<{ onClick: () => void }> = (props) => {
  return (
    <IconButton {...props} size="small">
      <DoubleArrow />
    </IconButton>
  )
}
