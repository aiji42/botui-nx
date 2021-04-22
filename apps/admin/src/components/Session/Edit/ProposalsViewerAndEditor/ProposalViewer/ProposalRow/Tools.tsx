import { Proposal } from '@botui/types'
import { FC, useCallback, useState, AllHTMLAttributes } from 'react'
import { IconButton } from '@material-ui/core'
import { DoubleArrow, ImportExport, AddCircle } from '@material-ui/icons'
import { ProposalDrawer } from '../ProposalDrawer/ProposalDrawer'
import { ProposalItemSelectList } from '../PoposalForm/ProposalItemSelectList'

interface EdgeToolProps extends AllHTMLAttributes<HTMLDivElement> {
  onClickSwitch: () => void
  onInsert: (arg: Proposal) => void
}

export const EdgeTool: FC<EdgeToolProps> = ({
  onClickSwitch,
  onInsert,
  ...props
}) => {
  const [open, setOpen] = useState(false)
  const handleInsert = useCallback(
    (proposal: Proposal) => {
      onInsert(proposal)
      setOpen(false)
    },
    [onInsert]
  )
  return (
    <>
      <div {...props}>
        <IconButton size="small" onClick={() => setOpen(true)}>
          <AddCircle />
        </IconButton>
        <IconButton size="small" onClick={onClickSwitch}>
          <ImportExport />
        </IconButton>
      </div>
      <ProposalDrawer open={open} onClose={() => setOpen(false)}>
        <ProposalItemSelectList onInsert={handleInsert} />
      </ProposalDrawer>
    </>
  )
}

interface SideToolProps {
  onClick: () => void
}

export const LeftTool: FC<SideToolProps> = (props) => {
  return (
    <IconButton {...props} style={{ transform: 'scale(-1, 1)' }} size="small">
      <DoubleArrow />
    </IconButton>
  )
}

export const RightTool: FC<SideToolProps> = (props) => {
  return (
    <IconButton {...props} size="small">
      <DoubleArrow />
    </IconButton>
  )
}
