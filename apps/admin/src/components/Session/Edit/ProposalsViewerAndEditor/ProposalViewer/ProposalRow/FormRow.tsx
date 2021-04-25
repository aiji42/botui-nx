import {
  FC,
  useState,
  ReactNode,
  useCallback,
  isValidElement,
  cloneElement
} from 'react'
import { ListItem, ListItemIcon } from '@material-ui/core'
import {
  Person,
  Home,
  Cake,
  Phone,
  AlternateEmail,
  LibraryAddCheck,
  List as ListIcon,
  ShortText,
  WrapText,
  RadioButtonChecked
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
import { ProposalMessage, Proposal } from '@botui/types'
import { DeleteTool, EdgeTool, LeftTool, RightTool } from './Tools'

interface FromRowWrapperProps {
  isFirst: boolean
  isLast: boolean
  proposal: ProposalMessage
  updateProposal: (arg: ProposalMessage) => void
  insertProposal: (proposal: Proposal, arg: 1 | -1) => void
  deleteProposal: () => void
  overtake: (take: 1 | -1) => void
  editForm: ReactNode
}

const FromRowWrapper: FC<FromRowWrapperProps> = ({
  proposal,
  isFirst,
  isLast,
  updateProposal,
  insertProposal,
  deleteProposal,
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

  const newEditForm = isValidElement(editForm)
    ? cloneElement(editForm, {
        submitter: (proposal: ProposalMessage) => {
          handleCloseEditig()
          editForm.props.submitter?.(proposal)
        }
      })
    : editForm
  const makeInserter = useCallback(
    (nextPrev: -1 | 1) => {
      return (newProposal: Proposal) => insertProposal(newProposal, nextPrev)
    },
    [insertProposal]
  )

  const {
    data: { human }
  } = proposal

  return (
    <>
      <DoubleColumnRow
        side={human ? 'right' : 'left'}
        topTool={
          <EdgeTool
            onClickSwitch={!isFirst ? () => overtake(-1) : undefined}
            onInsert={makeInserter(-1)}
          />
        }
        bottomTool={
          <EdgeTool
            onClickSwitch={!isLast ? () => overtake(1) : undefined}
            onInsert={makeInserter(1)}
          />
        }
        rightTopTool={<DeleteTool onClick={deleteProposal} />}
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
        {newEditForm}
      </ProposalDrawer>
    </>
  )
}

interface FormRowProps {
  isFirst: boolean
  isLast: boolean
  proposal: ProposalMessage
  updateProposal: (arg: ProposalMessage) => void
  insertProposal: (proposal: Proposal, arg: 1 | -1) => void
  deleteProposal: () => void
  overtake: (take: 1 | -1) => void
}

export const FormRow: FC<FormRowProps> = (props) => {
  const { proposal, updateProposal } = props
  if (proposal.data.content.type !== 'form') return null
  if (proposal.data.content.props.type === 'FormName')
    return (
      <FromRowWrapper
        {...props}
        editForm={
          <FormNameEditForm proposal={proposal} submitter={updateProposal} />
        }
      >
        <ListItem id={String(proposal.id)}>
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
        {...props}
        editForm={
          <FormNameEditForm proposal={proposal} submitter={updateProposal} />
        }
      >
        <ListItem id={String(proposal.id)}>
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
        {...props}
        editForm={
          <FormBirthDayEditForm
            proposal={proposal}
            submitter={updateProposal}
          />
        }
      >
        <ListItem id={String(proposal.id)}>
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
        {...props}
        editForm={
          <FormNameEditForm proposal={proposal} submitter={updateProposal} />
        }
      >
        <ListItem id={String(proposal.id)}>
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
        {...props}
        editForm={
          <FormNameEditForm proposal={proposal} submitter={updateProposal} />
        }
      >
        <ListItem id={String(proposal.id)}>
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
        {...props}
        editForm={
          <FormCustomRadioGroupEditForm
            proposal={proposal}
            submitter={updateProposal}
          />
        }
      >
        <ListItem id={String(proposal.id)}>
          <ListItemIcon>
            <RadioButtonChecked />
          </ListItemIcon>
          カスタムラジオボタンフォーム
        </ListItem>
      </FromRowWrapper>
    )
  if (proposal.data.content.props.type === 'FormCustomCheckbox')
    return (
      <FromRowWrapper
        {...props}
        editForm={
          <FormCustomCheckboxEditForm
            proposal={proposal}
            submitter={updateProposal}
          />
        }
      >
        <ListItem id={String(proposal.id)}>
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
        {...props}
        editForm={
          <FormCustomSelectEditForm
            proposal={proposal}
            submitter={updateProposal}
          />
        }
      >
        <ListItem id={String(proposal.id)}>
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
        {...props}
        editForm={
          <FormCustomInputEditForm
            proposal={proposal}
            submitter={updateProposal}
          />
        }
      >
        <ListItem id={String(proposal.id)}>
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
        {...props}
        editForm={
          <FormCustomTextareaEditForm
            proposal={proposal}
            submitter={updateProposal}
          />
        }
      >
        <ListItem id={String(proposal.id)}>
          <ListItemIcon>
            <WrapText />
          </ListItemIcon>
          カスタムテキストエリアフォーム
        </ListItem>
      </FromRowWrapper>
    )
}
