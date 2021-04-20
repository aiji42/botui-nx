import { FC, useState, AllHTMLAttributes, ReactNode, useCallback } from 'react'
import {
  ListItem,
  ListItemIcon,
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

interface FromRowWrapperProps {
  proposal: ProposalMessage
  updateProposal: (arg: ProposalMessage) => void
  overtake: (take: 1 | -1) => void
  editForm: ReactNode
}

const FromRowWrapper: FC<FromRowWrapperProps> = ({
  proposal,
  updateProposal,
  overtake,
  editForm,
  children
}) => {
  const [editing, setEditing] = useState(false)
  const handleEditig = () => setEditing(true)
  const handleCloseEditig = () => setEditing(false)

  const switchSide = useCallback(() => {
    updateProposal({
      ...proposal,
      data: { ...proposal.data, human: !proposal.data.human }
    })
  }, [updateProposal, proposal])

  const {
    data: { human }
  } = proposal

  return (
    <>
      <DoubleColumnRow
        side={human ? 'right' : 'left'}
        topTool={<EdgeTool onClickSwitch={() => overtake(-1)} />}
        bottomTool={<EdgeTool onClickSwitch={() => overtake(1)} />}
      >
        <DoubleColumn
          onClick={handleEditig}
          leftTool={human && <LeftTool onClick={switchSide} />}
          rightTool={!human && <RightTool onClick={switchSide} />}
        >
          {children}
        </DoubleColumn>
      </DoubleColumnRow>
      <ProposalDrawer open={editing} onClose={handleCloseEditig} padding>
        {editForm}
      </ProposalDrawer>
    </>
  )
}

interface FormRowProps {
  proposal: ProposalMessage
  updateProposal: (arg: ProposalMessage) => void
  overtake: (take: 1 | -1) => void
}

export const FormRow: FC<FormRowProps> = ({
  proposal,
  updateProposal,
  overtake
}) => {
  if (proposal.data.content.type !== 'form') return null
  if (proposal.data.content.props.type === 'FormName')
    return (
      <FromRowWrapper
        proposal={proposal}
        updateProposal={updateProposal}
        overtake={overtake}
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
        proposal={proposal}
        updateProposal={updateProposal}
        overtake={overtake}
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
        proposal={proposal}
        updateProposal={updateProposal}
        overtake={overtake}
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
        proposal={proposal}
        updateProposal={updateProposal}
        overtake={overtake}
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
        proposal={proposal}
        updateProposal={updateProposal}
        overtake={overtake}
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
        proposal={proposal}
        updateProposal={updateProposal}
        overtake={overtake}
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
        proposal={proposal}
        updateProposal={updateProposal}
        overtake={overtake}
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
        proposal={proposal}
        updateProposal={updateProposal}
        overtake={overtake}
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
        proposal={proposal}
        updateProposal={updateProposal}
        overtake={overtake}
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
        proposal={proposal}
        updateProposal={updateProposal}
        overtake={overtake}
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

const EdgeTool: FC<
  AllHTMLAttributes<HTMLDivElement> & { onClickSwitch: () => void }
> = ({ onClickSwitch, ...props }) => {
  const [open, setOpen] = useState(false)
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
        <ProposalItemSelectList />
      </ProposalDrawer>
    </>
  )
}

const LeftTool: FC<{ onClick: () => void }> = (props) => {
  return (
    <IconButton {...props} style={{ transform: 'scale(-1, 1)' }} size="small">
      <DoubleArrow />
    </IconButton>
  )
}

const RightTool: FC<{ onClick: () => void }> = (props) => {
  return (
    <IconButton {...props} size="small">
      <DoubleArrow />
    </IconButton>
  )
}
