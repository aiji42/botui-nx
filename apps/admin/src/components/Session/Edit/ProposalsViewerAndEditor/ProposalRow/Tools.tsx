import { FC, AllHTMLAttributes } from 'react'
import { IconButton, Box } from '@material-ui/core'
import DoubleArrow from '@material-ui/icons/DoubleArrow'
import ImportExport from '@material-ui/icons/ImportExport'
import AddCircle from '@material-ui/icons/AddCircle'
import Cancel from '@material-ui/icons/Cancel'

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
