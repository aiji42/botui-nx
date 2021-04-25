import { Proposal, ProposalCloser } from '@botui/types'
import { FC, useCallback, useState } from 'react'
import { SingleColumnRow } from './SingleColumnRow'
import { SingleColumn } from './SingleCulmn'
import { ProposalDrawer } from '../ProposalDrawer/ProposalDrawer'
import { DeleteTool, EdgeTool } from './Tools'
import { CheckCircle } from '@material-ui/icons'
import { Typography, ListItem, ListItemIcon, Box } from '@material-ui/core'

import {
  CustomScriptOnCloseEditForm,
  FormPushOnCloseEditForm,
  NoJobOnCloseEditForm,
  StoreOnCloseEditForm
} from '../PoposalForm/CloserEditForm'

interface CloserRowProps {
  isFirst: boolean
  isLast: boolean
  proposal: ProposalCloser
  updateProposal: (arg: ProposalCloser) => void
  insertProposal: (proposal: Proposal, arg: 1 | -1) => void
  deleteProposal?: () => void
  overtake: (take: 1 | -1) => void
}

export const CloserRow: FC<CloserRowProps> = ({
  proposal,
  isFirst,
  isLast,
  insertProposal,
  updateProposal,
  deleteProposal,
  overtake
}) => {
  const [editing, setEditing] = useState(false)
  const handleEditig = () => setEditing(true)
  const handleCloseEditig = useCallback(() => setEditing(false), [])
  const makeInserter = useCallback(
    (nextPrev: -1 | 1) => {
      return (newProposal: Proposal) => insertProposal(newProposal, nextPrev)
    },
    [insertProposal]
  )
  const submitter = useCallback(
    (newProposal: ProposalCloser) => {
      updateProposal(newProposal)
      handleCloseEditig()
    },
    [handleCloseEditig, updateProposal]
  )
  return (
    <>
      <SingleColumnRow
        topTool={
          <EdgeTool
            onClickSwitch={!isFirst ? () => overtake(-1) : undefined}
            onInsert={makeInserter(-1)}
          />
        }
        bottomTool={
          <EdgeTool
            onClickSwitch={!isLast ? () => overtake(1) : undefined}
            onInsert={makeInserter(1)}
          />
        }
        rightTopTool={deleteProposal && <DeleteTool onClick={deleteProposal} />}
      >
        <SingleColumn onClick={handleEditig}>
          <ListItem id={String(proposal.id)}>
            <ListItemIcon>
              <CheckCircle />
            </ListItemIcon>
            <Typography variant="body1">終了</Typography>
          </ListItem>
          <Box>
            <Typography variant="body2" color="textSecondary">
              {proposal.data.notify && (
                <>
                  メールで通知
                  <br />
                </>
              )}
              {proposal.data.job === 'script' && 'カスタムスクリプトを実行'}
              {proposal.data.job === 'store' && 'データベースに保存'}
              {proposal.data.job === 'formPush' && 'フォームを送信'}
            </Typography>
          </Box>
        </SingleColumn>
      </SingleColumnRow>
      <ProposalDrawer open={editing} onClose={handleCloseEditig} padding>
        {proposal.data.job === 'none' && (
          <NoJobOnCloseEditForm proposal={proposal} submitter={submitter} />
        )}
        {proposal.data.job === 'store' && (
          <StoreOnCloseEditForm proposal={proposal} submitter={submitter} />
        )}
        {proposal.data.job === 'script' && (
          <CustomScriptOnCloseEditForm
            proposal={proposal}
            submitter={submitter}
          />
        )}
        {proposal.data.job === 'formPush' && (
          <FormPushOnCloseEditForm proposal={proposal} submitter={submitter} />
        )}
      </ProposalDrawer>
    </>
  )
}
