import { ProposalMessage, Proposal } from '@botui/types'
import { FC, useCallback, useState } from 'react'
import { Typography, ListItem, ListItemIcon } from '@material-ui/core'
import { TextFields } from '@material-ui/icons'
import { DoubleColumnRow } from './DoubleColumnRow'
import { DoubleColumn } from './DoubleCulmn'
import { ProposalDrawer } from '../ProposalDrawer/ProposalDrawer'
import { MessageEditForm } from '../PoposalForm/MessageEditForm'
import {EdgeTool, LeftTool, RightTool, DeleteTool} from './Tools';

interface MessageRowProps {
  proposal: ProposalMessage
  updateProposal: (arg: ProposalMessage) => void
  insertProposal: (proposal: Proposal, arg: 1 | -1) => void
  deleteProposal: () => void
  overtake: (take: 1 | -1) => void
}

export const MessageRow: FC<MessageRowProps> = ({
  proposal,
  updateProposal,
  insertProposal,
  deleteProposal,
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
  const makeInserter = useCallback(
    (nextPrev: -1 | 1) => {
      return (newProposal: Proposal) => insertProposal(newProposal, nextPrev)
    },
    [insertProposal]
  )

  const {
    data: { human, content }
  } = proposal
  if (content.type !== 'string') return null
  return (
    <>
      <DoubleColumnRow
        side={human ? 'right' : 'left'}
        topTool={
          <EdgeTool
            onClickSwitch={() => overtake(-1)}
            onInsert={makeInserter(-1)}
          />
        }
        bottomTool={
          <EdgeTool
            onClickSwitch={() => overtake(1)}
            onInsert={makeInserter(1)}
          />
        }
      >
        <DoubleColumn
          onClick={handleEditig}
          leftTool={human && <LeftTool onClick={switchSide} />}
          rightTool={!human && <RightTool onClick={switchSide} />}
          leftTopTool={!human && <DeleteTool onClick={deleteProposal} />}
          rightTopTool={human && <DeleteTool onClick={deleteProposal} />}
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
