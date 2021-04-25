import { Proposal, ProposalSkipper } from '@botui/types'
import { FC, Fragment } from 'react'
import { SingleColumnRow } from './SingleColumnRow'
import { SingleColumn } from './SingleCulmn'
import { ProposalDrawer } from '../ProposalDrawer/ProposalDrawer'
import { DeleteTool, EdgeTool } from './Tools'
import { SkipperEditForm } from '../PoposalForm/SkipperEditForm'
import { CallSplitTwoTone } from '@material-ui/icons'
import {
  Typography,
  Box,
  ListItem,
  ListItemIcon,
  useTheme
} from '@material-ui/core'
import Xarrow from 'react-xarrows'
import { ProposalItemSelectList } from '../PoposalForm/ProposalItemSelectList'
import { useProposalRow, UseProposalRowArgs } from './dependencies'

interface SkipperRowProps extends UseProposalRowArgs<ProposalSkipper> {
  isFirst: boolean
  isLast: boolean
  skipTo: Proposal['id']
  deleteProposal: () => void
}

export const SkipperRow: FC<SkipperRowProps> = ({
  isFirst,
  isLast,
  proposal,
  skipTo,
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
  const theme = useTheme()
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
        {({ active }) => (
          <SingleColumn onClick={helper.startEdit} active={active}>
            <ListItem id={String(proposal.id)}>
              <ListItemIcon>
                <CallSplitTwoTone />
              </ListItemIcon>
              <Typography variant="body1">分岐</Typography>
            </ListItem>
            <Box textAlign="center">
              <Typography variant="body2" color="textSecondary">
                {proposal.data.conditions.map(
                  ({ pattern, key, operator, negative }, index) => (
                    <Fragment key={index}>
                      {index > 0 && (
                        <>
                          <br />
                          {proposal.data.logic.toUpperCase()}
                          <br />
                        </>
                      )}
                      {key} {negative ? 'not' : ''} {operator} {pattern}
                    </Fragment>
                  )
                )}
              </Typography>
            </Box>
            {active && (
              <Xarrow
                startAnchor={['left', 'right']}
                endAnchor="top"
                start={String(proposal.id)}
                end={String(skipTo)}
                path="grid"
                color={theme.palette.primary.main}
                SVGcanvasStyle={{ zIndex: 100 }}
              />
            )}
          </SingleColumn>
        )}
      </SingleColumnRow>
      <ProposalDrawer open={status.editing} onClose={helper.complete} padding>
        <SkipperEditForm proposal={proposal} submitter={helper.complete} />
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
