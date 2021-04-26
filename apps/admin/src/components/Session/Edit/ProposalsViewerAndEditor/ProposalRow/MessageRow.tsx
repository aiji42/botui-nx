import { ProposalMessage } from '@botui/types'
import { FC, useCallback } from 'react'
import { Typography, ListItem, ListItemIcon } from '@material-ui/core'
import { TextFields } from '@material-ui/icons'
import { DoubleColumnRow } from './DoubleColumnRow'
import { DoubleColumn } from './DoubleCulmn'
import { ProposalDrawer } from '../ProposalDrawer/ProposalDrawer'
import { MessageEditForm } from '../PoposalForm/MessageEditForm'
import { EdgeTool, LeftTool, RightTool, DeleteTool } from './Tools'
import { useProposalRow, UseProposalRowArgs } from './dependencies'
import { ProposalItemSelectList } from '../PoposalForm/ProposalItemSelectList'

interface MessageRowProps extends UseProposalRowArgs<ProposalMessage> {
  isFirst: boolean
  isLast: boolean
  deleteProposal: () => void
}

export const MessageRow: FC<MessageRowProps> = ({
  isFirst,
  isLast,
  proposal,
  updateProposal,
  insertProposal,
  deleteProposal,
  overtake
}) => {
  const [status, helper] = useProposalRow({
    proposal,
    updateProposal,
    insertProposal,
    overtake
  })
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
        topTool={
          <EdgeTool
            onClickSwitch={!isFirst ? helper.overtakehWithPrev : undefined}
            onClickInsert={helper.startCreatePrev}
          />
        }
        bottomTool={
          <EdgeTool
            onClickSwitch={!isLast ? helper.overtakehWithNext : undefined}
            onClickInsert={helper.startCreateNext}
          />
        }
        rightTopTool={<DeleteTool onClick={deleteProposal} />}
      >
        <DoubleColumn
          onClick={helper.startEdit}
          leftTool={human && <LeftTool onClick={switchSide} />}
          rightTool={!human && <RightTool onClick={switchSide} />}
        >
          <ListItem id={String(proposal.id)}>
            <ListItemIcon>
              <TextFields />
            </ListItemIcon>
            <Typography variant="body1">{content.props.children}</Typography>
          </ListItem>
        </DoubleColumn>
      </DoubleColumnRow>
      <ProposalDrawer open={status.editing} onClose={helper.complete} padding>
        <MessageEditForm proposal={proposal} submitter={helper.complete} />
      </ProposalDrawer>
      <ProposalDrawer
        open={status.creatingNext || status.creatingPrev}
        onClose={helper.complete}
      >
        <ProposalItemSelectList submitter={helper.complete} />
      </ProposalDrawer>
    </>
  )
}
