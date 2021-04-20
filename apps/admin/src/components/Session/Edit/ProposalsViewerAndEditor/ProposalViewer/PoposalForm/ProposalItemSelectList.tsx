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
  WrapText
} from '@material-ui/icons'
import { useState } from 'react'
import { ProposalDrawer } from '../ProposalDrawer/ProposalDrawer'
import { FormBirthDayEditForm, FormCustomCheckboxEditForm, FormCustomInputEditForm, FormCustomRadioGroupEditForm, FormCustomSelectEditForm, FormCustomTextareaEditForm, FormNameEditForm } from './FormEfitForm'
import { MessageEditForm } from './MessageEditForm'

export const ProposalItemSelectList = () => {
  const [selected, setSelected] = useState<null | string>(null)
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
        <ListItem button>
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
        <ListItem button>
          <ListItemIcon>
            <Phone />
          </ListItemIcon>
          <ListItemText primary="電話番号" />
        </ListItem>
        <ListItem button>
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
        <ListItem button>
          <ListItemIcon>
            <CallSplit />
          </ListItemIcon>
          <ListItemText primary="分岐" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Code />
          </ListItemIcon>
          <ListItemText primary="カスタムスクリプト" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <FlashOn />
          </ListItemIcon>
          <ListItemText primary="フォームの送信" />
        </ListItem>
      </List>
      <ProposalDrawer open={!!selected} onClose={() => setSelected(null)} padding>
        {selected === 'message' && <MessageEditForm submitter={console.log} />}
        {selected === 'formName' && <FormNameEditForm />}
        {selected === 'formBirthday' && <FormBirthDayEditForm />}
        {selected === 'formCustomRadioGroup' && <FormCustomRadioGroupEditForm />}
        {selected === 'formCustomCheckbox' && <FormCustomCheckboxEditForm />}
        {selected === 'formCustomSelect' && <FormCustomSelectEditForm />}
        {selected === 'formCustomInput' && <FormCustomInputEditForm />}
        {selected === 'formCustomTextarea' && <FormCustomTextareaEditForm />}
      </ProposalDrawer>
    </>
  )
}
