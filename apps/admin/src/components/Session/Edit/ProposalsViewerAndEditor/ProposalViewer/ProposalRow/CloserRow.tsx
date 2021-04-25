import { ProposalCloser } from '@botui/types'
import { FC } from 'react'
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
import { ProposalItemSelectList } from '../PoposalForm/ProposalItemSelectList'
import { useProposalRow, UseProposalRowArgs } from './dependencies'

interface CloserRowProps extends UseProposalRowArgs<ProposalCloser> {
  isFirst: boolean
  isLast: boolean
  deleteProposal?: () => void
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
        rightTopTool={deleteProposal && <DeleteTool onClick={deleteProposal} />}
      >
        <SingleColumn onClick={helper.startEdit}>
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
      <ProposalDrawer open={status.editing} onClose={helper.complete} padding>
        {proposal.data.job === 'none' && (
          <NoJobOnCloseEditForm
            proposal={proposal}
            submitter={helper.complete}
          />
        )}
        {proposal.data.job === 'store' && (
          <StoreOnCloseEditForm
            proposal={proposal}
            submitter={helper.complete}
          />
        )}
        {proposal.data.job === 'script' && (
          <CustomScriptOnCloseEditForm
            proposal={proposal}
            submitter={helper.complete}
          />
        )}
        {proposal.data.job === 'formPush' && (
          <FormPushOnCloseEditForm
            proposal={proposal}
            submitter={helper.complete}
          />
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
