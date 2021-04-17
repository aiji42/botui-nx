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
  FlashOn
} from '@material-ui/icons'

export const ProposalItemSelectList = () => {
  return (
    <>
      <List subheader={<ListSubheader>メッセージ</ListSubheader>}>
        <ListItem>
          <ListItemIcon>
            <TextFields />
          </ListItemIcon>
          <ListItemText primary="テキストメッセージ" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Image />
          </ListItemIcon>
          <ListItemText primary="イメージ" />
        </ListItem>
      </List>
      <List subheader={<ListSubheader>フォーム</ListSubheader>}>
        <ListItem>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="氏名" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="住所" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Cake />
          </ListItemIcon>
          <ListItemText primary="生年月日" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Phone />
          </ListItemIcon>
          <ListItemText primary="電話番号" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AlternateEmail />
          </ListItemIcon>
          <ListItemText primary="メールアドレス" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <RadioButtonChecked />
          </ListItemIcon>
          <ListItemText
            primary="カスタムラジオボタン"
            secondary="選択肢から一つだけ選ばせる"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <LibraryAddCheck />
          </ListItemIcon>
          <ListItemText
            primary="カスタムチェックボックス"
            secondary="選択肢から複数選ばせる"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText
            primary="カスタムセレクト"
            secondary="プルダウン型の選択肢"
          />
        </ListItem>
      </List>
      <List subheader={<ListSubheader>中間処理</ListSubheader>}>
        <ListItem>
          <ListItemIcon>
            <CallSplit />
          </ListItemIcon>
          <ListItemText primary="分岐" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Code />
          </ListItemIcon>
          <ListItemText primary="カスタムスクリプト" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FlashOn />
          </ListItemIcon>
          <ListItemText primary="フォームの送信" />
        </ListItem>
      </List>
    </>
  )
}
