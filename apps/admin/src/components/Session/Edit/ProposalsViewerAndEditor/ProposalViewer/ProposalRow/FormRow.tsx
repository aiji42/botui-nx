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
  proposal: ProposalMessage
  updateProposal: (arg: ProposalMessage) => void
  insertProposal: (proposal: Proposal, arg: 1 | -1) => void
  deleteProposal: () => void
  overtake: (take: 1 | -1) => void
  editForm: ReactNode
}

const FromRowWrapper: FC<FromRowWrapperProps> = ({
  proposal,
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
            onClickSwitch={() => overtake(-1)}
            onInsert={makeInserter(-1)}
          />
        }
        bottomTool={
          <EdgeTool
            onClickSwitch={() => overtake(1)}
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
  proposal: ProposalMessage
  updateProposal: (arg: ProposalMessage) => void
  insertProposal: (proposal: Proposal, arg: 1 | -1) => void
  deleteProposal: () => void
  overtake: (take: 1 | -1) => void
}

export const FormRow: FC<FormRowProps> = ({
  proposal,
  updateProposal,
  insertProposal,
  deleteProposal,
  overtake
}) => {
  if (proposal.data.content.type !== 'form') return null
  if (proposal.data.content.props.type === 'FormName')
    return (
      <FromRowWrapper
        proposal={proposal}
        updateProposal={updateProposal}
        insertProposal={insertProposal}
        deleteProposal={deleteProposal}
        overtake={overtake}
        editForm={
          <FormNameEditForm proposal={proposal} submitter={updateProposal} />
        }
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
        insertProposal={insertProposal}
        deleteProposal={deleteProposal}
        overtake={overtake}
        editForm={
          <FormNameEditForm proposal={proposal} submitter={updateProposal} />
        }
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
        insertProposal={insertProposal}
        deleteProposal={deleteProposal}
        overtake={overtake}
        editForm={
          <FormBirthDayEditForm
            proposal={proposal}
            submitter={updateProposal}
          />
        }
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
        insertProposal={insertProposal}
        deleteProposal={deleteProposal}
        overtake={overtake}
        editForm={
          <FormNameEditForm proposal={proposal} submitter={updateProposal} />
        }
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
        insertProposal={insertProposal}
        deleteProposal={deleteProposal}
        overtake={overtake}
        editForm={
          <FormNameEditForm proposal={proposal} submitter={updateProposal} />
        }
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
        insertProposal={insertProposal}
        deleteProposal={deleteProposal}
        overtake={overtake}
        editForm={
          <FormCustomRadioGroupEditForm
            proposal={proposal}
            submitter={updateProposal}
          />
        }
      >
        <ListItem>
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
        proposal={proposal}
        updateProposal={updateProposal}
        insertProposal={insertProposal}
        deleteProposal={deleteProposal}
        overtake={overtake}
        editForm={
          <FormCustomCheckboxEditForm
            proposal={proposal}
            submitter={updateProposal}
          />
        }
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
        insertProposal={insertProposal}
        deleteProposal={deleteProposal}
        overtake={overtake}
        editForm={
          <FormCustomSelectEditForm
            proposal={proposal}
            submitter={updateProposal}
          />
        }
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
        insertProposal={insertProposal}
        deleteProposal={deleteProposal}
        overtake={overtake}
        editForm={
          <FormCustomInputEditForm
            proposal={proposal}
            submitter={updateProposal}
          />
        }
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
        insertProposal={insertProposal}
        deleteProposal={deleteProposal}
        overtake={overtake}
        editForm={
          <FormCustomTextareaEditForm
            proposal={proposal}
            submitter={updateProposal}
          />
        }
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
