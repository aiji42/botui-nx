import { Proposal, ProposalRelayer } from '@botui/types'
import { FC, useCallback, useState } from 'react'
import { SingleColumnRow } from './SingleColumnRow'
import { SingleColumn } from './SingleCulmn'
import { ProposalDrawer } from '../ProposalDrawer/ProposalDrawer'
import { DeleteTool, EdgeTool } from './Tools'

interface RelayerRowProps {
  proposal: ProposalRelayer
  updateProposal: (arg: ProposalRelayer) => void
  insertProposal: (proposal: Proposal, arg: 1 | -1) => void
  deleteProposal: () => void
  overtake: (take: 1 | -1) => void
}

export const RelayerRow: FC<RelayerRowProps> = ({
  insertProposal,
  deleteProposal,
  overtake,
  children
}) => {
  const [editing, setEditing] = useState(false)
  const handleEditig = () => setEditing(true)
  const handleCloseEditig = () => setEditing(false)
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
        <SingleColumn onClick={handleEditig}>{children}</SingleColumn>
      </SingleColumnRow>
      <ProposalDrawer open={editing} onClose={handleCloseEditig} padding />
    </>
  )
}
