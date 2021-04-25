import { FC, AllHTMLAttributes } from 'react'
import { IconButton, Box } from '@material-ui/core'
import {
  DoubleArrow,
  ImportExport,
  AddCircle,
  Cancel
} from '@material-ui/icons'

interface EdgeToolProps extends AllHTMLAttributes<HTMLDivElement> {
  onClickSwitch?: () => void
  onClickInsert?: () => void
}

export const EdgeTool: FC<EdgeToolProps> = ({
  onClickSwitch,
  onClickInsert,
  ...props
}) => {
  return (
    <div {...props}>
      {onClickInsert && (
        <IconButton size="small" onClick={onClickInsert}>
          <AddCircle />
        </IconButton>
      )}
      {onClickSwitch && onClickInsert && (
        <Box width={32} display="inline-block" />
      )}
      {onClickSwitch && (
        <IconButton size="small" onClick={onClickSwitch}>
          <ImportExport />
        </IconButton>
      )}
    </div>
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
