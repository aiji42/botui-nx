import { VFC, useReducer } from 'react'
import { FunctionField, TextInput, useRefresh, regex } from 'react-admin'
import { Session } from '@botui/types'
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
  Grid
} from '@material-ui/core'
import { Form } from 'react-final-form'
import { useEditGoogleAnalyticsId } from './hooks/use-edit-google-analytics-id'

export const PropertyTabInner: VFC = () => {
  return (
    <FunctionField<Session>
      source="googleAnalyticsId"
      label="Google Analytics"
      render={(record) => (
        <Grid container component={Box} p={2}>
          <Grid container item component={Box} pb={1}>
            <Typography variant="subtitle1" color="textSecondary">
              Google Analytics
            </Typography>
          </Grid>
          <Grid container item>
            <Box display="flex">
              <Box pr={2} pt={1}>
                {record?.googleAnalyticsId || 'IDが設定されていません'}
              </Box>
              <GoogleAnalyticsIdEditModalWithButton record={record} />
            </Box>
          </Grid>
        </Grid>
      )}
    />
  )
}

const GoogleAnalyticsIdEditModalWithButton: VFC<{
  record: Session
}> = ({ record }) => {
  const [isOpen, toggle] = useReducer((prev) => !prev, false)
  const refresh = useRefresh()
  const handleSubmit = useEditGoogleAnalyticsId(record, () => {
    refresh()
    toggle()
  })

  return (
    <>
      <Button variant="contained" onClick={toggle}>
        トラッキングIDを設定
      </Button>
      <Dialog onClose={toggle} open={isOpen}>
        <Form
          onSubmit={handleSubmit}
          render={({ invalid, submitting, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <DialogTitle>トラッキングIDを設定</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  トラッキングIDを入力してください。
                  <br />
                  {`「${process.env.NX_PREVIEW_HOST}/session/${record.id}」でのユーザ行動が計測されるようになります。`}
                </DialogContentText>
                <TextInput
                  source="googleAnalyticsId"
                  type="text"
                  label="トラッキングID"
                  placeholder="G- もしくは UA- で始まるID"
                  validate={[
                    regex(
                      /(^(G|UA)-[a-zA-Z0-9-]+$|^$)/,
                      'G- もしくは UA- で始まるIDを入力してください。'
                    )
                  ]}
                  defaultValue={record.googleAnalyticsId}
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
