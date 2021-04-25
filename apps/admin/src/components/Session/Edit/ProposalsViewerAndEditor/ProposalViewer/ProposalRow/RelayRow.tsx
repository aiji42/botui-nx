import { ProposalRelayer } from '@botui/types'
import { FC } from 'react'
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
import { ProposalItemSelectList } from '../PoposalForm/ProposalItemSelectList'
import { useProposalRow, UseProposalRowArgs } from './dependencies'

interface RelayerRowProps extends UseProposalRowArgs<ProposalRelayer> {
  isFirst: boolean
  isLast: boolean
  deleteProposal: () => void
}

export const RelayerRow: FC<RelayerRowProps> = ({
  isFirst,
  isLast,
  proposal,
  insertProposal,
  updateProposal,
  deleteProposal,
  overtake
}) => {
  const [status, helper] = useProposalRow({
    proposal,
    updateProposal,
    insertProposal,
    overtake
  })

  return (
    <>
      <SingleColumnRow
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
        <SingleColumn onClick={helper.startEdit}>
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
      <ProposalDrawer open={status.editing} onClose={helper.complete} padding>
        {proposal.data.job === 'script' && (
          <CustomScriptEditForm
            proposal={proposal}
            submitter={helper.complete}
          />
        )}
        {proposal.data.job === 'formPush' && (
          <FormPushEditForm proposal={proposal} submitter={helper.complete} />
        )}
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
