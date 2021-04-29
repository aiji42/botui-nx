import { FC, useCallback } from 'react'
import { ListItem, ListItemIcon, Typography, Box } from '@material-ui/core'
import TextFields from '@material-ui/icons/TextFields'
import ImageIcon from '@material-ui/icons/Image'
import Person from '@material-ui/icons/Person'
import Home from '@material-ui/icons/Home'
import Phone from '@material-ui/icons/Phone'
import Cake from '@material-ui/icons/Cake'
import AlternateEmail from '@material-ui/icons/AlternateEmail'
import LibraryAddCheck from '@material-ui/icons/LibraryAddCheck'
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked'
import ListIcon from '@material-ui/icons/List'
import ShortText from '@material-ui/icons/ShortText'
import WrapText from '@material-ui/icons/WrapText'
import { DoubleColumnRow } from './DoubleColumnRow'
import { DoubleColumn } from './DoubleCulmn'
import { ProposalDrawer } from '../ProposalDrawer/ProposalDrawer'
import {
  FormAddressEditFotm,
  FormBirthDayEditForm,
  FormCustomCheckboxEditForm,
  FormCustomInputEditForm,
  FormCustomRadioGroupEditForm,
  FormCustomSelectEditForm,
  FormCustomTextareaEditForm,
  FormEmailEditFotm,
  FormNameEditForm,
  FormTelEditFotm
} from '../PoposalForm/FormEfitForm'
import { ProposalMessage } from '@botui/types'
import { DeleteTool, EdgeTool, LeftTool, RightTool } from './Tools'
import { useProposalRow } from './dependencies'
import { ProposalItemSelectList } from '../PoposalForm/ProposalItemSelectList'
import { MessageEditForm } from '../PoposalForm/MessageEditForm'
import { useImageUrl } from '@botui/hooks'
import { ImageEditForm } from '../PoposalForm/ImageEditForm'

interface ImageProps {
  imageKey: string
}

const Image: FC<ImageProps> = (props) => {
  const src = useImageUrl(props.imageKey)
  return <img src={src} alt="illustration" width="100%" height="auto" />
}

interface MessageRowProps {
  isFirst: boolean
  isLast: boolean
  proposal: ProposalMessage
}

const MessageRow: FC<MessageRowProps> = ({ isFirst, isLast, proposal }) => {
  const [status, helper] = useProposalRow<ProposalMessage>(proposal)
  const switchSide = useCallback(() => {
    helper.update({
      ...proposal,
      data: { ...proposal.data, human: !proposal.data.human }
    })
  }, [helper, proposal])

  return (
    <>
      <DoubleColumnRow
        side={proposal.data.human ? 'right' : 'left'}
        topTool={
          <EdgeTool
            onClickSwitch={!isFirst ? helper.overtakeWithPrev : undefined}
            onClickInsert={helper.startCreatePrev}
          />
        }
        bottomTool={
          <EdgeTool
            onClickSwitch={!isLast ? helper.overtakeWithNext : undefined}
            onClickInsert={helper.startCreateNext}
          />
        }
        rightTopTool={<DeleteTool onClick={helper.remove} />}
      >
        <DoubleColumn
          onClick={helper.startEdit}
          leftTool={proposal.data.human && <LeftTool onClick={switchSide} />}
          rightTool={!proposal.data.human && <RightTool onClick={switchSide} />}
        >
          {proposal.data.content.type === 'string' && (
            <ListItem id={String(proposal.id)}>
              <ListItemIcon>
                <TextFields />
              </ListItemIcon>
              <Typography variant="body1">
                {proposal.data.content.props.children}
              </Typography>
            </ListItem>
          )}
          {proposal.data.content.type === 'form' &&
            (proposal.data.content.props.type === 'FormName' ? (
              <ListItem id={String(proposal.id)}>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                氏名フォーム
              </ListItem>
            ) : proposal.data.content.props.type === 'FormAddress' ? (
              <ListItem id={String(proposal.id)}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                住所フォーム
              </ListItem>
            ) : proposal.data.content.props.type === 'FormBirthDay' ? (
              <ListItem id={String(proposal.id)}>
                <ListItemIcon>
                  <Cake />
                </ListItemIcon>
                生年月日フォーム
              </ListItem>
            ) : proposal.data.content.props.type === 'FormTel' ? (
              <ListItem id={String(proposal.id)}>
                <ListItemIcon>
                  <Phone />
                </ListItemIcon>
                電話番号フォーム
              </ListItem>
            ) : proposal.data.content.props.type === 'FormEmail' ? (
              <ListItem id={String(proposal.id)}>
                <ListItemIcon>
                  <AlternateEmail />
                </ListItemIcon>
                メールアドレスフォーム
              </ListItem>
            ) : proposal.data.content.props.type === 'FormCustomRadioGroup' ? (
              <ListItem id={String(proposal.id)}>
                <ListItemIcon>
                  <RadioButtonChecked />
                </ListItemIcon>
                カスタムラジオボタンフォーム
              </ListItem>
            ) : proposal.data.content.props.type === 'FormCustomCheckbox' ? (
              <ListItem id={String(proposal.id)}>
                <ListItemIcon>
                  <LibraryAddCheck />
                </ListItemIcon>
                カスタムチェックボックスフォーム
              </ListItem>
            ) : proposal.data.content.props.type === 'FormCustomSelect' ? (
              <ListItem id={String(proposal.id)}>
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                カスタムセレクトボックスフォーム
              </ListItem>
            ) : proposal.data.content.props.type === 'FormCustomInput' ? (
              <ListItem id={String(proposal.id)}>
                <ListItemIcon>
                  <ShortText />
                </ListItemIcon>
                カスタムインプットフォーム
              </ListItem>
            ) : proposal.data.content.props.type === 'FormCustomTextarea' ? (
              <ListItem id={String(proposal.id)}>
                <ListItemIcon>
                  <WrapText />
                </ListItemIcon>
                カスタムテキストエリアフォーム
              </ListItem>
            ) : null)}
          {proposal.data.content.type === 'image' && (
            <ListItem id={String(proposal.id)}>
              <ListItemIcon>
                <ImageIcon />
              </ListItemIcon>
              <Box>
                <Image imageKey={proposal.data.content.props.imgKey} />
              </Box>
            </ListItem>
          )}
        </DoubleColumn>
      </DoubleColumnRow>
      <ProposalDrawer open={status.editing} onClose={helper.complete} padding>
        {proposal.data.content.type === 'string' && (
          <MessageEditForm proposal={proposal} submitter={helper.complete} />
        )}
        {proposal.data.content.type === 'form' &&
          (proposal.data.content.props.type === 'FormName' ? (
            <FormNameEditForm proposal={proposal} submitter={helper.complete} />
          ) : proposal.data.content.props.type === 'FormAddress' ? (
            <FormAddressEditFotm
              proposal={proposal}
              submitter={helper.complete}
            />
          ) : proposal.data.content.props.type === 'FormBirthDay' ? (
            <FormBirthDayEditForm
              proposal={proposal}
              submitter={helper.complete}
            />
          ) : proposal.data.content.props.type === 'FormTel' ? (
            <FormTelEditFotm proposal={proposal} submitter={helper.complete} />
          ) : proposal.data.content.props.type === 'FormEmail' ? (
            <FormEmailEditFotm
              proposal={proposal}
              submitter={helper.complete}
            />
          ) : proposal.data.content.props.type === 'FormCustomRadioGroup' ? (
            <FormCustomRadioGroupEditForm
              proposal={proposal}
              submitter={helper.complete}
            />
          ) : proposal.data.content.props.type === 'FormCustomCheckbox' ? (
            <FormCustomCheckboxEditForm
              proposal={proposal}
              submitter={helper.complete}
            />
          ) : proposal.data.content.props.type === 'FormCustomSelect' ? (
            <FormCustomSelectEditForm
              proposal={proposal}
              submitter={helper.complete}
            />
          ) : proposal.data.content.props.type === 'FormCustomInput' ? (
            <FormCustomInputEditForm
              proposal={proposal}
              submitter={helper.complete}
            />
          ) : proposal.data.content.props.type === 'FormCustomTextarea' ? (
            <FormCustomTextareaEditForm
              proposal={proposal}
              submitter={helper.complete}
            />
          ) : null)}
        {proposal.data.content.type === 'image' && (
          <ImageEditForm proposal={proposal} submitter={helper.complete} />
        )}
      </ProposalDrawer>
      <ProposalDrawer
        open={status.creatingNext || status.creatingPrev}
        onClose={helper.complete}
      >
        <ProposalItemSelectList submitter={helper.complete} />
      </ProposalDrawer>
    </>
  )
}

export default MessageRow
