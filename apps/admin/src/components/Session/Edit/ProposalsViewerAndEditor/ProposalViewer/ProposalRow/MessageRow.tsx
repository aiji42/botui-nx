import { ProposalMessage } from '@botui/types'
import { FC, useCallback, useState, AllHTMLAttributes } from 'react'
import {
  Typography,
  ListItem,
  ListItemIcon,
  IconButton
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

interface MessageRowProps {
  proposal: ProposalMessage
  updateProposal: (arg: ProposalMessage) => void
  overtake: (take: 1 | -1) => void
}

export const MessageRow: FC<MessageRowProps> = ({
  proposal,
  updateProposal,
  overtake
}) => {
  const [editing, setEditing] = useState(false)
  const handleEditig = () => setEditing(true)
  const handleCloseEditig = useCallback(() => setEditing(false), [])
  const switchSide = useCallback(() => {
    updateProposal({
      ...proposal,
      data: { ...proposal.data, human: !proposal.data.human }
    })
  }, [updateProposal, proposal])
  const submitter = useCallback(
    (proposal: ProposalMessage) => {
      updateProposal(proposal)
      handleCloseEditig()
    },
    [handleCloseEditig, updateProposal]
  )

  const {
    data: { human, content }
  } = proposal
  if (content.type !== 'string') return null
  return (
    <>
      <DoubleColumnRow
        side={human ? 'right' : 'left'}
        topTool={<EdgeTool onClickSwitch={() => overtake(-1)} />}
        bottomTool={<EdgeTool onClickSwitch={() => overtake(1)} />}
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
      <ProposalDrawer open={editing} onClose={handleCloseEditig} padding>
        <MessageEditForm proposal={proposal} submitter={submitter} />
      </ProposalDrawer>
    </>
  )
}

const EdgeTool: FC<
  AllHTMLAttributes<HTMLDivElement> & { onClickSwitch: () => void }
> = ({ onClickSwitch, ...props }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div {...props}>
        <IconButton size="small" onClick={() => setOpen(true)}>
          <AddCircle />
        </IconButton>
        <IconButton size="small" onClick={onClickSwitch}>
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
