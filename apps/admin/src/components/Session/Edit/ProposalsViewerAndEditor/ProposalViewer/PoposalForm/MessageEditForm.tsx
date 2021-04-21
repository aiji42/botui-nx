import { FC, useRef, useState, MouseEvent, RefObject } from 'react'
import {
  Menu,
  MenuItem,
  Fab,
  FabProps,
  makeStyles,
  TextField,
  Slider,
  Typography,
  Button,
  Box
} from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { useField, useForm, useFormState, Form } from 'react-final-form'
import { ProposalMessage } from '@botui/types'

const useStyle = makeStyles((theme) => ({
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

export const MessageEditForm: FC<MessageEditFormProps> = ({
  proposal,
  submitter
}) => {
  return (
    <Form<ProposalMessage>
      initialValues={proposal}
      onSubmit={submitter}
      render={() => <FormInner />}
    />
  )
}

const FormInner = () => {
  const ref = useRef<HTMLInputElement>(null)
  const classes = useStyle()
  const delayField = useField<number>('data.content.delay')
  const messageField = useField<string | undefined>(
    'data.content.props.children',
    { validate: (val) => (val ? false : '入力してください。') }
  )
  const { submit } = useForm()
  const { hasValidationErrors } = useFormState()

  return (
    <>
      <Typography variant="subtitle2">ローディング時間</Typography>
      <Slider
        valueLabelDisplay="auto"
        valueLabelFormat={(val) => <>{val / 1000}s</>}
        step={100}
        marks={marks}
        min={0}
        max={3000}
        defaultValue={delayField.meta.initial}
        onChange={delayField.input.onChange}
      />
      <Box position="relative" marginTop={3}>
        <TextField
          label="メッセージ本文"
          variant="filled"
          value={messageField.input.value}
          error={!messageField.meta.valid}
          helperText={messageField.meta.error}
          onChange={messageField.input.onChange}
          onBlur={messageField.input.onBlur}
          required
          fullWidth
          multiline
          rows={5}
          inputRef={ref}
        />
        <InsertKeyMenu targetInput={ref} className={classes.fab} />
      </Box>
      <Box textAlign="right" marginTop={3}>
        <Button
          onClick={submit}
          disabled={hasValidationErrors}
          variant="contained"
          color="primary"
        >
          SAVE
        </Button>
      </Box>
    </>
  )
}

const marks = [
  {
    value: 0,
    label: '0s'
  },
  {
    value: 1000,
    label: '1s'
  },
  {
    value: 2000,
    label: '2s'
  },
  {
    value: 3000,
    label: '3s'
  }
]

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
