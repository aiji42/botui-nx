import { Proposal, ProposalRelayer } from '@botui/types'
import { FC, useCallback, useState } from 'react'
import { SingleColumnRow } from './SingleColumnRow'
import { SingleColumn } from './SingleCulmn'
import { ProposalDrawer } from '../ProposalDrawer/ProposalDrawer'
import { DeleteTool, EdgeTool } from './Tools'
import { Code, FlashOn } from '@material-ui/icons'
import { Typography, ListItem, ListItemIcon } from '@material-ui/core'
import {
  CustomScriptEditForm,
  FormPushEditForm
} from '../PoposalForm/RelayerEditForm'

interface RelayerRowProps {
  proposal: ProposalRelayer
  updateProposal: (arg: ProposalRelayer) => void
  insertProposal: (proposal: Proposal, arg: 1 | -1) => void
  deleteProposal: () => void
  overtake: (take: 1 | -1) => void
}

export const RelayerRow: FC<RelayerRowProps> = ({
  proposal,
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
    (newProposal: ProposalRelayer) => {
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
            onClickSwitch={() => overtake(-1)}
            onInsert={makeInserter(-1)}
          />
        }
        bottomTool={
          <EdgeTool
            onClickSwitch={() => overtake(-1)}
            onInsert={makeInserter(-1)}
          />
        }
        rightTopTool={<DeleteTool onClick={deleteProposal} />}
      >
        <SingleColumn onClick={handleEditig}>
          <ListItem id={String(proposal.id)}>
            {proposal.data.job === 'script' && (
              <>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <Typography variant="body1">カスタムスクリプト</Typography>
              </>
            )}
            {proposal.data.job === 'formPush' && (
              <>
                <ListItemIcon>
                  <FlashOn />
                </ListItemIcon>
                <Typography variant="body1">フォーム送信</Typography>
              </>
            )}
          </ListItem>
        </SingleColumn>
      </SingleColumnRow>
      <ProposalDrawer open={editing} onClose={handleCloseEditig} padding>
        {proposal.data.job === 'script' && (
          <CustomScriptEditForm proposal={proposal} submitter={submitter} />
        )}
        {proposal.data.job === 'formPush' && (
          <FormPushEditForm proposal={proposal} submitter={submitter} />
        )}
      </ProposalDrawer>
    </>
  )
}
