import { VFC, useState, useReducer } from 'react'
import { FunctionField, TextInput, required, email } from 'react-admin'
import { Session } from '@botui/types'
import {
  Button,
  Typography,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core'
import { Form } from 'react-final-form'

const useStyles = makeStyles(() => ({
  img: {
    width: '100%',
    maxWidth: 600
  }
}))

export const PropertyTabInner: VFC = () => {
  const classes = useStyles()

  return (
    <FunctionField<Session>
      source="googleAnalyticsId"
      label="Google Analytics"
      render={(record) => (
        <>
          <Typography variant="body2" color="textPrimary">
            {record?.googleAnalyticsId}
          </Typography>
          <GoogleAnalyticsIdEditModalWithButton
            value={record?.googleAnalyticsId}
          />
        </>
      )}
    />
  )
}

const GoogleAnalyticsIdEditModalWithButton: VFC<{
  value: string | null | undefined
}> = ({ value: defaultValue }) => {
  const [isOpen, toggle] = useReducer((prev) => !prev, false)

  return (
    <>
      <Button>トラッキングIDを設定</Button>
      <Dialog onClose={toggle} open={isOpen}>
        <Form
          onSubmit={console.log}
          render={({ invalid, submitting, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <DialogTitle>コラボレーターを追加</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  コラボレーションしたいユーザのメールアドレスを入力してください。
                  <br />
                  対象ユーザがチャチャットに未登録でも問題ありません。(登録用の案内がメールで送信されます)
                </DialogContentText>
                <TextInput
                  source="googleAnalyticsId"
                  type="text"
                  label="トラッキングID"
                  validate={[required()]}
                  defaultValue={defaultValue}
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button
                  disabled={invalid || submitting}
                  type="submit"
                  color="primary"
                >
                  設定する
                </Button>
              </DialogActions>
            </form>
          )}
        ></Form>
      </Dialog>
    </>
  )
}
