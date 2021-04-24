import { Proposal, ProposalSkipper } from '@botui/types'
import { FC, Fragment, useCallback, useRef, useState } from 'react'
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

interface SkipperRowProps {
  proposal: ProposalSkipper
  skipTo: Proposal['id']
  updateProposal: (arg: ProposalSkipper) => void
  insertProposal: (proposal: Proposal, arg: 1 | -1) => void
  deleteProposal: () => void
  overtake: (take: 1 | -1) => void
}

export const SkipperRow: FC<SkipperRowProps> = ({
  proposal,
  skipTo,
  updateProposal,
  insertProposal,
  deleteProposal,
  overtake
}) => {
  const theme = useTheme()
  const [editing, setEditing] = useState(false)
  const handleEditig = () => setEditing(true)
  const handleCloseEditig = useCallback(() => setEditing(false), [])
  const submitter = useCallback(
    (proposal: ProposalSkipper) => {
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
        {({ active }) => (
          <SingleColumn onClick={handleEditig} active={active}>
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
      <ProposalDrawer open={editing} onClose={handleCloseEditig} padding>
        <SkipperEditForm proposal={proposal} submitter={submitter} />
      </ProposalDrawer>
    </>
  )
}
