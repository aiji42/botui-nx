import { Proposal } from '@botui/types'
import { FC, useCallback, useState, AllHTMLAttributes } from 'react'
import { IconButton, Box } from '@material-ui/core'
import {
  DoubleArrow,
  ImportExport,
  AddCircle,
  Cancel
} from '@material-ui/icons'
import { ProposalDrawer } from '../ProposalDrawer/ProposalDrawer'
import { ProposalItemSelectList } from '../PoposalForm/ProposalItemSelectList'

interface EdgeToolProps extends AllHTMLAttributes<HTMLDivElement> {
  onClickSwitch?: () => void
  onInsert?: (arg: Proposal) => void
}

export const EdgeTool: FC<EdgeToolProps> = ({
  onClickSwitch,
  onInsert,
  ...props
}) => {
  const [open, setOpen] = useState(false)
  const handleInsert = useCallback(
    (proposal: Proposal) => {
      onInsert?.(proposal)
      setOpen(false)
    },
    [onInsert]
  )

  return (
    <>
      <div {...props}>
        {onInsert && (
          <IconButton size="small" onClick={() => setOpen(true)}>
            <AddCircle />
          </IconButton>
        )}
        {onClickSwitch && onInsert && <Box width={32} display="inline-block" />}
        {onClickSwitch && (
          <IconButton size="small" onClick={onClickSwitch}>
            <ImportExport />
          </IconButton>
        )}
      </div>
      <ProposalDrawer open={open} onClose={() => setOpen(false)}>
        <ProposalItemSelectList onInsert={handleInsert} />
      </ProposalDrawer>
    </>
  )
}

interface ToolProps {
  onClick: () => void
}

export const LeftTool: FC<ToolProps> = (props) => {
  return (
    <IconButton {...props} style={{ transform: 'scale(-1, 1)' }} size="small">
      <DoubleArrow />
    </IconButton>
  )
}

export const RightTool: FC<ToolProps> = (props) => {
  return (
    <IconButton {...props} size="small">
      <DoubleArrow />
    </IconButton>
  )
}

export const DeleteTool: FC<ToolProps> = (props) => {
  return (
    <IconButton {...props} size="small">
      <Cancel />
    </IconButton>
  )
}
