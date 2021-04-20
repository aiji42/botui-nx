import { FC, useRef, useState, MouseEvent, RefObject } from 'react'
import { required, TextInput } from 'react-admin'
import { DelayNumberSlider } from '../../../../parts'
import { Menu, MenuItem, Fab, FabProps, makeStyles, TextField } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { useField, useFormState, Form } from 'react-final-form'
import { Proposal, ProposalMessage } from '@botui/types'

const useStyle = makeStyles((theme) => ({
  foundationForFab: {
    position: 'relative'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(1)
  }
}))

interface MessageEditFormProps {
  proposal?: ProposalMessage
  submitter: (value: ProposalMessage) => void
}

export const MessageEditForm: FC<MessageEditFormProps> = ({ proposal, submitter }) => {
  return <Form<ProposalMessage> initialValues={proposal} onSubmit={submitter} render={() => (<FormInner />)} />
}

const FormInner = () => {
const ref = useRef<HTMLInputElement>(null)
  const classes = useStyle()
  const field = useField<ProposalMessage>('data.content.props.children')
  return (
    <>
      <DelayNumberSlider
        label="ローディング時間"
        source="data.content.delay"
        fullWidth
      />
      <div className={classes.foundationForFab}>
        <TextField
          label="メッセージ本文"
          variant="filled"
          value={field.input.value}
          error={field.meta.error}
          helperText={field.meta.error}
          onChange={field.input.onChange}
          onBlur={field.input.onBlur}
          required
          fullWidth
          multiline
          rows={5}
          inputRef={ref}
        />
        <InsertKeyMenu targetInput={ref} className={classes.fab} />
      </div>
    </>
  )
}

const makeInsertKey = (ref: RefObject<HTMLInputElement>) => (key: string) => {
  if (document.activeElement !== ref.current) ref.current?.focus()
  document.execCommand('insertText', false, `{{${key}}}`)
}

interface InsertKeyMenuProps extends Partial<FabProps> {
  targetInput: RefObject<HTMLInputElement>
}

const InsertKeyMenu: FC<InsertKeyMenuProps> = ({ targetInput, ...res }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleClickMenu = (e: MouseEvent<HTMLLIElement>) => {
    const insertKey = makeInsertKey(targetInput)
    insertKey(e.currentTarget.dataset.value ?? '')
    handleClose()
  }
  return (
    <>
      <Fab
        {...res}
        color="primary"
        onClick={handleClick}
        size="small"
        variant="extended"
      >
        <>
          <Add />
          ユーザ入力値の挿入
        </>
      </Fab>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        <MenuItem onClick={handleClickMenu} data-value="familyName">
          氏名:姓
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="firstName">
          氏名:名
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="familyNameKana">
          氏名:姓(よみ)
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="firstNameKana">
          氏名:名(よみ)
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="postalCode">
          住所:郵便番号
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="prefecture">
          住所:都道府県
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="city">
          住所:市区町村
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="street">
          住所:番地
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="building">
          住所:建物名・部屋番号
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="tel">
          電話番号
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="email">
          メールアドレス
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="birthdayYear">
          生年月日:年
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="birthdayMonth">
          生年月日:月
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="birthdayDay">
          生年月日:日
        </MenuItem>
        <MenuItem onClick={handleClickMenu} data-value="ここを値名に置換">
          カスタム
        </MenuItem>
      </Menu>
    </>
  )
}
