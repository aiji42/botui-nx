import { FC, useState, AllHTMLAttributes, ReactNode } from 'react'
import {
  Box,
  ListItem,
  ListItemIcon,
  makeStyles,
  IconButton
} from '@material-ui/core'
import {
  ImportExport,
  AddCircle,
  DoubleArrow,
  Person,
  Home,
  Cake,
  Phone,
  AlternateEmail,
  LibraryAddCheck,
  List as ListIcon,
  ShortText,
  WrapText
} from '@material-ui/icons'
import { DoubleColumnRow } from './DoubleColumnRow'
import { DoubleColumn } from './DoubleCulmn'
import { ProposalDrawer } from '../ProposalDrawer/ProposalDrawer'
import {
  FormBirthDayEditForm,
  FormCustomCheckboxEditForm,
  FormCustomInputEditForm,
  FormCustomRadioGroupEditForm,
  FormCustomSelectEditForm,
  FormCustomTextareaEditForm,
  FormNameEditForm
} from '../PoposalForm/FormEfitForm'
import { ProposalItemSelectList } from '../PoposalForm/ProposalItemSelectList'
import { ProposalMessage } from '@botui/types'

const useStyle = makeStyles((theme) => ({
  sidePanel: {
    padding: theme.spacing(3),
    paddingTop: theme.spacing(10)
  }
}))

interface FromRowWrapperProps {
  human?: boolean
  editForm: ReactNode
}

const FromRowWrapper: FC<FromRowWrapperProps> = ({
  human = false,
  editForm,
  children
}) => {
  const [editing, setEditing] = useState(false)
  const handleEditig = () => setEditing(true)
  const handleCloseEditig = () => setEditing(false)
  const classes = useStyle()
  return (
    <>
      <DoubleColumnRow
        side={human ? 'right' : 'left'}
        topTool={<EdgeTool />}
        bottomTool={<EdgeTool />}
      >
        <DoubleColumn
          onClick={handleEditig}
          leftTool={human && <LeftTool />}
          rightTool={!human && <RightTool />}
        >
          {children}
        </DoubleColumn>
      </DoubleColumnRow>
      <ProposalDrawer open={editing} onClose={handleCloseEditig}>
        <Box className={classes.sidePanel}>{editForm}</Box>
      </ProposalDrawer>
    </>
  )
}

interface FormRowProps {
  proposal: ProposalMessage
}

export const FormRow: FC<FormRowProps> = ({ proposal }) => {
  if (proposal.data.content.type !== 'form') return null
  if (proposal.data.content.props.type === 'FormName')
    return (
      <FromRowWrapper
        human={proposal.data.human}
        editForm={<FormNameEditForm />}
      >
        <ListItem>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          氏名フォーム
        </ListItem>
      </FromRowWrapper>
    )
  if (proposal.data.content.props.type === 'FormAddress')
    return (
      <FromRowWrapper
        human={proposal.data.human}
        editForm={<FormNameEditForm />}
      >
        <ListItem>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          住所フォーム
        </ListItem>
      </FromRowWrapper>
    )
  if (proposal.data.content.props.type === 'FormBirthDay')
    return (
      <FromRowWrapper
        human={proposal.data.human}
        editForm={<FormBirthDayEditForm />}
      >
        <ListItem>
          <ListItemIcon>
            <Cake />
          </ListItemIcon>
          生年月日フォーム
        </ListItem>
      </FromRowWrapper>
    )
  if (proposal.data.content.props.type === 'FormTel')
    return (
      <FromRowWrapper
        human={proposal.data.human}
        editForm={<FormNameEditForm />}
      >
        <ListItem>
          <ListItemIcon>
            <Phone />
          </ListItemIcon>
          電話番号フォーム
        </ListItem>
      </FromRowWrapper>
    )
  if (proposal.data.content.props.type === 'FormEmail')
    return (
      <FromRowWrapper
        human={proposal.data.human}
        editForm={<FormNameEditForm />}
      >
        <ListItem>
          <ListItemIcon>
            <AlternateEmail />
          </ListItemIcon>
          メールアドレスフォーム
        </ListItem>
      </FromRowWrapper>
    )
  if (proposal.data.content.props.type === 'FormCustomRadioGroup')
    return (
      <FromRowWrapper
        human={proposal.data.human}
        editForm={<FormCustomRadioGroupEditForm />}
      >
        <ListItem>
          <ListItemIcon>
            <AlternateEmail />
          </ListItemIcon>
          カスタムラジオボタンフォーム
        </ListItem>
      </FromRowWrapper>
    )
  if (proposal.data.content.props.type === 'FormCustomCheckbox')
    return (
      <FromRowWrapper
        human={proposal.data.human}
        editForm={<FormCustomCheckboxEditForm />}
      >
        <ListItem>
          <ListItemIcon>
            <LibraryAddCheck />
          </ListItemIcon>
          カスタムチェックボックスフォーム
        </ListItem>
      </FromRowWrapper>
    )
  if (proposal.data.content.props.type === 'FormCustomSelect')
    return (
      <FromRowWrapper
        human={proposal.data.human}
        editForm={<FormCustomSelectEditForm />}
      >
        <ListItem>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          カスタムセレクトボックスフォーム
        </ListItem>
      </FromRowWrapper>
    )
  if (proposal.data.content.props.type === 'FormCustomInput')
    return (
      <FromRowWrapper
        human={proposal.data.human}
        editForm={<FormCustomInputEditForm />}
      >
        <ListItem>
          <ListItemIcon>
            <ShortText />
          </ListItemIcon>
          カスタムインプットフォーム
        </ListItem>
      </FromRowWrapper>
    )
  if (proposal.data.content.props.type === 'FormCustomTextarea')
    return (
      <FromRowWrapper
        human={proposal.data.human}
        editForm={<FormCustomTextareaEditForm />}
      >
        <ListItem>
          <ListItemIcon>
            <WrapText />
          </ListItemIcon>
          カスタムテキストエリアフォーム
        </ListItem>
      </FromRowWrapper>
    )
}

const EdgeTool: FC<AllHTMLAttributes<HTMLDivElement>> = (props) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div {...props}>
        <IconButton size="small" onClick={() => setOpen(true)}>
          <AddCircle />
        </IconButton>
        <IconButton size="small">
          <ImportExport />
        </IconButton>
      </div>
      <ProposalDrawer open={open} onClose={() => setOpen(false)}>
        <ProposalItemSelectList />
      </ProposalDrawer>
    </>
  )
}

const LeftTool: FC = () => {
  return (
    <IconButton style={{ transform: 'scale(-1, 1)' }} size="small">
      <DoubleArrow />
    </IconButton>
  )
}

const RightTool: FC = () => {
  return (
    <IconButton size="small">
      <DoubleArrow />
    </IconButton>
  )
}
