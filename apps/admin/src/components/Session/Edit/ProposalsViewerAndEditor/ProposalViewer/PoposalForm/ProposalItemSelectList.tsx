import { Closer, JobScript, Proposal } from '@botui/types'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@material-ui/core'
import {
  TextFields,
  Image,
  Person,
  Home,
  Phone,
  Cake,
  AlternateEmail,
  LibraryAddCheck,
  RadioButtonChecked,
  List as ListIcon,
  CallSplit,
  Code,
  FlashOn,
  ShortText,
  WrapText,
  CheckCircle
} from '@material-ui/icons'
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
  relayerTemplate,
  skipperTemplate,
  stringMessageTemplate
} from '../../../../Create/proposalTemplates'
import { SkipperEditForm } from './SkipperEditForm'
import { CustomScriptEditForm, FormPushEditForm } from './RelayerEditForm'
import { NoJobOnCloseEditForm } from './CloserEditForm'

interface ProposalItemSelectListProps {
  onInsert: (proposal: Proposal) => void
}

export const ProposalItemSelectList: FC<ProposalItemSelectListProps> = ({
  onInsert
}) => {
  const [selected, setSelected] = useState<null | string>(null)

  useEffect(() => {
    if (selected === 'formAddress') {
      onInsert(formMessageTemplate({ type: 'FormAddress', status: {} }))
      setSelected(null)
    }
    if (selected === 'formTel') {
      onInsert(formMessageTemplate({ type: 'FormTel', status: {} }))
      setSelected(null)
    }
    if (selected === 'formEmail') {
      onInsert(formMessageTemplate({ type: 'FormEmail', status: {} }))
      setSelected(null)
    }
  }, [onInsert, selected])

  return (
    <>
      <List subheader={<ListSubheader>メッセージ</ListSubheader>}>
        <ListItem button onClick={() => setSelected('message')}>
          <ListItemIcon>
            <TextFields />
          </ListItemIcon>
          <ListItemText primary="テキストメッセージ" />
        </ListItem>
        <ListItem button>
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
            submitter={onInsert}
          />
        )}
        {selected === 'formName' && (
          <FormNameEditForm
            proposal={formMessageTemplate({
              type: 'FormName',
              status: { kana: true, kanaType: 'katakana' }
            })}
            submitter={onInsert}
          />
        )}
        {selected === 'formBirthDay' && (
          <FormBirthDayEditForm
            proposal={formMessageTemplate({
              type: 'FormBirthDay',
              status: { paddingZero: false }
            })}
            submitter={onInsert}
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
            submitter={onInsert}
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
            submitter={onInsert}
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
            submitter={onInsert}
          />
        )}
        {selected === 'formCustomInput' && (
          <FormCustomInputEditForm
            proposal={formMessageTemplate({
              type: 'FormCustomInput',
              status: {},
              inputs: [{ name: 'customInput', type: 'text', title: '自由入力' }]
            })}
            submitter={onInsert}
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
            submitter={onInsert}
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
            submitter={onInsert}
          />
        )}
        {selected === 'customScript' && (
          <CustomScriptEditForm
            proposal={relayerTemplate({ job: 'script' } as JobScript)}
            submitter={onInsert}
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
            submitter={onInsert}
          />
        )}
        {selected === 'closeNone' && (
          <NoJobOnCloseEditForm
            proposal={closerTemplate({ job: 'none', notify: true })}
            submitter={onInsert}
          />
        )}
        {selected === 'closeCustomScript' && (
          <NoJobOnCloseEditForm
            proposal={closerTemplate({ job: 'script', notify: true } as Closer)}
            submitter={onInsert}
          />
        )}
        {selected === 'closeStore' && (
          <NoJobOnCloseEditForm
            proposal={closerTemplate({ job: 'store', notify: true })}
            submitter={onInsert}
          />
        )}
        {selected === 'closeFormPush' && (
          <NoJobOnCloseEditForm
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
            submitter={onInsert}
          />
        )}
      </ProposalDrawer>
    </>
  )
}
