import { ProposalCloser, Proposals } from '@botui/types'
import { FC } from 'react'
import { SingleColumnRow } from './SingleColumnRow'
import { SingleColumn } from './SingleCulmn'
import { ProposalDrawer } from '../ProposalDrawer/ProposalDrawer'
import { DeleteTool, EdgeTool } from './Tools'
import CheckCircle from '@material-ui/icons/CheckCircle'
import { Typography, ListItem, ListItemIcon, Box } from '@material-ui/core'
import {
  CustomScriptOnCloseEditForm,
  FormPushOnCloseEditForm,
  NoJobOnCloseEditForm,
  StoreOnCloseEditForm
} from '../PoposalForm/CloserEditForm'
import { ProposalItemSelectList } from '../PoposalForm/ProposalItemSelectList'
import { useProposalRow } from './dependencies'
import { useProposalsEditor } from '../dependencies'

interface CloserRowProps {
  isFirst: boolean
  isLast: boolean
  proposal: ProposalCloser
}

const CloserRow: FC<CloserRowProps> = ({ proposal, isFirst, isLast }) => {
  const [status, helper] = useProposalRow<ProposalCloser>(proposal)
  const [proposals] = useProposalsEditor()

  return (
    <>
      <SingleColumnRow
        topTool={
          <EdgeTool
            onClickSwitch={!isFirst ? helper.overtakeWithPrev : undefined}
            onClickInsert={helper.startCreatePrev}
          />
        }
        bottomTool={
          <EdgeTool
            onClickSwitch={!isLast ? helper.overtakeWithNext : undefined}
            onClickInsert={helper.startCreateNext}
          />
        }
        rightTopTool={
          !isLastCloser(proposal, proposals) && (
            <DeleteTool onClick={helper.remove} />
          )
        }
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

export default CloserRow

const isLastCloser = (proposal: ProposalCloser, proposals: Proposals) => {
  const index = proposals.findIndex(({ id }) => id === proposal.id)
  return !proposals.slice(index + 1).some(({ type }) => type === 'closer')
}
