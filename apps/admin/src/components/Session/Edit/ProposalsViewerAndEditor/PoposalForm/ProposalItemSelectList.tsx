import { Closer, JobScript, Proposal } from '@botui/types'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@material-ui/core'
import TextFields from '@material-ui/icons/TextFields'
import Image from '@material-ui/icons/Image'
import Person from '@material-ui/icons/Person'
import Home from '@material-ui/icons/Home'
import Phone from '@material-ui/icons/Phone'
import Cake from '@material-ui/icons/Cake'
import AlternateEmail from '@material-ui/icons/AlternateEmail'
import LibraryAddCheck from '@material-ui/icons/LibraryAddCheck'
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked'
import ListIcon from '@material-ui/icons/List'
import CallSplit from '@material-ui/icons/CallSplit'
import Code from '@material-ui/icons/Code'
import FlashOn from '@material-ui/icons/FlashOn'
import ShortText from '@material-ui/icons/ShortText'
import WrapText from '@material-ui/icons/WrapText'
import CheckCircle from '@material-ui/icons/CheckCircle'
import { FC, useEffect, useState } from 'react'
import { ProposalDrawer } from '../ProposalDrawer/ProposalDrawer'
import {
  FormBirthDayEditForm,
  FormCustomCheckboxEditForm,
  FormCustomInputEditForm,
  FormCustomRadioGroupEditForm,
  FormCustomSelectEditForm,
  FormCustomTextareaEditForm,
  FormNameEditForm
} from './FormEfitForm'
import { MessageEditForm } from './MessageEditForm'
import {
  closerTemplate,
  formMessageTemplate,
  imageMessageTemplate,
  relayerTemplate,
  skipperTemplate,
  stringMessageTemplate
} from '../../../Create/proposalTemplates'
import { SkipperEditForm } from './SkipperEditForm'
import { CustomScriptEditForm, FormPushEditForm } from './RelayerEditForm'
import {
  CustomScriptOnCloseEditForm,
  FormPushOnCloseEditForm,
  NoJobOnCloseEditForm,
  StoreOnCloseEditForm
} from './CloserEditForm'
import { ImageEditForm } from './ImageEditForm'

interface ProposalItemSelectListProps {
  submitter: (proposal: Proposal) => void
}

export const ProposalItemSelectList: FC<ProposalItemSelectListProps> = ({
  submitter
}) => {
  const [selected, setSelected] = useState<null | string>(null)

  useEffect(() => {
    if (selected === 'formAddress') {
      submitter(formMessageTemplate({ type: 'FormAddress', status: {} }))
      setSelected(null)
    }
    if (selected === 'formTel') {
      submitter(formMessageTemplate({ type: 'FormTel', status: {} }))
      setSelected(null)
    }
    if (selected === 'formEmail') {
      submitter(formMessageTemplate({ type: 'FormEmail', status: {} }))
      setSelected(null)
    }
  }, [submitter, selected])

  return (
    <>
      <List subheader={<ListSubheader>メッセージ</ListSubheader>}>
        <ListItem button onClick={() => setSelected('message')}>
          <ListItemIcon>
            <TextFields />
          </ListItemIcon>
          <ListItemText primary="テキストメッセージ" />
        </ListItem>
        <ListItem button onClick={() => setSelected('image')}>
          <ListItemIcon>
            <Image />
          </ListItemIcon>
          <ListItemText primary="イメージ" />
        </ListItem>
      </List>
      <List subheader={<ListSubheader>フォーム</ListSubheader>}>
        <ListItem button onClick={() => setSelected('formName')}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="氏名" />
        </ListItem>
        <ListItem button onClick={() => setSelected('formAddress')}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="住所" />
        </ListItem>
        <ListItem button onClick={() => setSelected('formBirthDay')}>
          <ListItemIcon>
            <Cake />
          </ListItemIcon>
          <ListItemText primary="生年月日" />
        </ListItem>
        <ListItem button onClick={() => setSelected('formTel')}>
          <ListItemIcon>
            <Phone />
          </ListItemIcon>
          <ListItemText primary="電話番号" />
        </ListItem>
        <ListItem button onClick={() => setSelected('formEmail')}>
          <ListItemIcon>
            <AlternateEmail />
          </ListItemIcon>
          <ListItemText primary="メールアドレス" />
        </ListItem>
        <ListItem button onClick={() => setSelected('formCustomRadioGroup')}>
          <ListItemIcon>
            <RadioButtonChecked />
          </ListItemIcon>
          <ListItemText
            primary="カスタムラジオボタン"
            secondary="選択肢から一つだけ選ばせる"
          />
        </ListItem>
        <ListItem button onClick={() => setSelected('formCustomCheckbox')}>
          <ListItemIcon>
            <LibraryAddCheck />
          </ListItemIcon>
          <ListItemText
            primary="カスタムチェックボックス"
            secondary="選択肢から複数選ばせる"
          />
        </ListItem>
        <ListItem button onClick={() => setSelected('formCustomSelect')}>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText
            primary="カスタムセレクト"
            secondary="プルダウン型の選択肢"
          />
        </ListItem>
        <ListItem button onClick={() => setSelected('formCustomInput')}>
          <ListItemIcon>
            <ShortText />
          </ListItemIcon>
          <ListItemText
            primary="カスタムインプット"
            secondary="自由入力型フォーム"
          />
        </ListItem>
        <ListItem button onClick={() => setSelected('formCustomTextarea')}>
          <ListItemIcon>
            <WrapText />
          </ListItemIcon>
          <ListItemText
            primary="カスタムテキストエリア"
            secondary="改行可能な自由入力型フォーム"
          />
        </ListItem>
      </List>
      <List subheader={<ListSubheader>中間処理</ListSubheader>}>
        <ListItem button onClick={() => setSelected('skipper')}>
          <ListItemIcon>
            <CallSplit />
          </ListItemIcon>
          <ListItemText primary="分岐" />
        </ListItem>
        <ListItem button onClick={() => setSelected('customScript')}>
          <ListItemIcon>
            <Code />
          </ListItemIcon>
          <ListItemText primary="カスタムスクリプト" />
        </ListItem>
        <ListItem button onClick={() => setSelected('formPush')}>
          <ListItemIcon>
            <FlashOn />
          </ListItemIcon>
          <ListItemText primary="フォームの送信" />
        </ListItem>
      </List>
      <List subheader={<ListSubheader>ゴール</ListSubheader>}>
        <ListItem button onClick={() => setSelected('closeNone')}>
          <ListItemIcon>
            <CheckCircle />
          </ListItemIcon>
          <ListItemText primary="チャットを終了させる" />
        </ListItem>
        <ListItem button onClick={() => setSelected('closeCustomScript')}>
          <ListItemIcon>
            <CheckCircle />
          </ListItemIcon>
          <ListItemText primary="カスタムスクリプトを実行してから終了" />
        </ListItem>
        <ListItem button onClick={() => setSelected('closeStore')}>
          <ListItemIcon>
            <CheckCircle />
          </ListItemIcon>
          <ListItemText primary="データベースに保存して終了" />
        </ListItem>
        <ListItem button onClick={() => setSelected('closeFormPush')}>
          <ListItemIcon>
            <CheckCircle />
          </ListItemIcon>
          <ListItemText primary="フォームの送信をして終了" />
        </ListItem>
      </List>
      <ProposalDrawer
        open={!!selected}
        onClose={() => setSelected(null)}
        padding
      >
        {selected === 'message' && (
          <MessageEditForm
            proposal={stringMessageTemplate('メッセージ本文')}
            submitter={submitter}
          />
        )}
        {selected === 'image' && (
          <ImageEditForm
            proposal={imageMessageTemplate()}
            submitter={submitter}
          />
        )}
        {selected === 'formName' && (
          <FormNameEditForm
            proposal={formMessageTemplate({
              type: 'FormName',
              status: { kana: true, kanaType: 'katakana' }
            })}
            submitter={submitter}
          />
        )}
        {selected === 'formBirthDay' && (
          <FormBirthDayEditForm
            proposal={formMessageTemplate({
              type: 'FormBirthDay',
              status: { paddingZero: false }
            })}
            submitter={submitter}
          />
        )}
        {selected === 'formCustomRadioGroup' && (
          <FormCustomRadioGroupEditForm
            proposal={formMessageTemplate({
              type: 'FormCustomRadioGroup',
              status: {},
              name: 'radioButtonQuestion',
              inputs: [
                { title: '選択肢A', value: 'A' },
                { title: '選択肢B', value: 'B' },
                { title: '選択肢C', value: 'C' }
              ]
            })}
            submitter={submitter}
          />
        )}
        {selected === 'formCustomCheckbox' && (
          <FormCustomCheckboxEditForm
            proposal={formMessageTemplate({
              type: 'FormCustomCheckbox',
              status: {},
              name: 'checkboxQuestion',
              required: true,
              inputs: [
                { title: '選択肢A', value: 'A' },
                { title: '選択肢B', value: 'B' },
                { title: '選択肢C', value: 'C' }
              ]
            })}
            submitter={submitter}
          />
        )}
        {selected === 'formCustomSelect' && (
          <FormCustomSelectEditForm
            proposal={formMessageTemplate({
              type: 'FormCustomSelect',
              status: {},
              selects: [
                {
                  name: 'selectQuestion',
                  title: '設問1',
                  options: [
                    { label: '選択肢A', value: 'A' },
                    { label: '選択肢B', value: 'B' },
                    { label: '選択肢C', value: 'C' }
                  ]
                }
              ]
            })}
            submitter={submitter}
          />
        )}
        {selected === 'formCustomInput' && (
          <FormCustomInputEditForm
            proposal={formMessageTemplate({
              type: 'FormCustomInput',
              status: {},
              inputs: [{ name: 'customInput', type: 'text', title: '自由入力' }]
            })}
            submitter={submitter}
          />
        )}
        {selected === 'formCustomTextarea' && (
          <FormCustomTextareaEditForm
            proposal={formMessageTemplate({
              type: 'FormCustomTextarea',
              status: {},
              name: 'customTextarea',
              required: false
            })}
            submitter={submitter}
          />
        )}
        {selected === 'skipper' && (
          <SkipperEditForm
            proposal={skipperTemplate({
              skipNumber: 1,
              logic: 'and',
              conditions: [
                {
                  key: 'someKey',
                  negative: false,
                  operator: 'match',
                  pattern: 'とある値'
                }
              ]
            })}
            submitter={submitter}
          />
        )}
        {selected === 'customScript' && (
          <CustomScriptEditForm
            proposal={relayerTemplate({ job: 'script' } as JobScript)}
            submitter={submitter}
          />
        )}
        {selected === 'formPush' && (
          <FormPushEditForm
            proposal={relayerTemplate({
              job: 'formPush',
              formSelector: '#form',
              ajax: false,
              dataMapper: [
                { from: 'familyName', to: 'sei', custom: false },
                { from: 'firstName', to: 'mei', custom: false }
              ]
            })}
            submitter={submitter}
          />
        )}
        {selected === 'closeNone' && (
          <NoJobOnCloseEditForm
            proposal={closerTemplate({ job: 'none', notify: true })}
            submitter={submitter}
          />
        )}
        {selected === 'closeCustomScript' && (
          <CustomScriptOnCloseEditForm
            proposal={closerTemplate({ job: 'script', notify: true } as Closer)}
            submitter={submitter}
          />
        )}
        {selected === 'closeStore' && (
          <StoreOnCloseEditForm
            proposal={closerTemplate({ job: 'store', notify: true })}
            submitter={submitter}
          />
        )}
        {selected === 'closeFormPush' && (
          <FormPushOnCloseEditForm
            proposal={closerTemplate({
              job: 'formPush',
              notify: true,
              formSelector: '#form',
              ajax: false,
              dataMapper: [
                { from: 'familyName', to: 'sei', custom: false },
                { from: 'firstName', to: 'mei', custom: false }
              ]
            })}
            submitter={submitter}
          />
        )}
      </ProposalDrawer>
    </>
  )
}
