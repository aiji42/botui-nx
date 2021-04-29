import { FC, useCallback } from 'react'
import {
  BooleanInput,
  required,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  FormDataConsumer
} from 'react-admin'
import { ProposalCloser } from '@botui/types'
import { Form, Field, useForm } from 'react-final-form'
import { SaveButton } from './SaveButton'
import { Typography, makeStyles, Box } from '@material-ui/core'
import { NameKeySelector } from './NameKeySelector'
import arrayMutators from 'final-form-arrays'
import JavascriptEditor from '../../../parts/JavascriptEditor'
import {
  CustomScriptHelp,
  FormPushCustomValueHelp,
  FormPushResultHelp
} from './CustomScriptHelp'

interface CloserEditFormProps {
  proposal?: ProposalCloser
  submitter: (value: ProposalCloser) => void
}

export const NoJobOnCloseEditForm: FC<CloserEditFormProps> = ({
  proposal,
  submitter
}) => {
  return (
    <Form<ProposalCloser>
      initialValues={proposal}
      onSubmit={submitter}
      render={() => <NoJobEditFormInner />}
    />
  )
}
const NoJobEditFormInner: FC = () => {
  return (
    <>
      <Typography variant="h5">チャットの終了</Typography>
      <Box marginTop={2} marginBottom={4}>
        <Typography variant="body2" color="textSecondary">
          通知をオンにすると、ユーザの入力情報を通知先のメールアドレスに送信できます。メールアドレスは「概要」から変更可能です。
        </Typography>
      </Box>
      <BooleanInput source="data.notify" label="メールで通知する" />
      <SaveButton />
    </>
  )
}

export const StoreOnCloseEditForm: FC<CloserEditFormProps> = ({
  proposal,
  submitter
}) => {
  return (
    <Form<ProposalCloser>
      initialValues={proposal}
      onSubmit={submitter}
      render={() => <StoreEditFormInner />}
    />
  )
}
const StoreEditFormInner: FC = () => {
  return (
    <>
      <Typography variant="h5">チャットの終了: データベースへ保存</Typography>
      <Box marginTop={2} marginBottom={4}>
        <Box marginBottom={0.5}>
          <Typography variant="body1">
            ユーザの入力情報をデータベースに保存します。
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary">
          チャットの終了と同時にユーザの入力情報を保存することが可能です。保存されたデータは管理サイトの「エントリー」から確認ができます。
        </Typography>
        <Typography variant="body2" color="textSecondary">
          通知をオンにすると、ユーザの入力情報を通知先のメールアドレスに送信できます。メールアドレスは「概要」から変更可能です。
        </Typography>
      </Box>
      <BooleanInput source="data.notify" label="メールで通知する" />
      <SaveButton />
    </>
  )
}

export const CustomScriptOnCloseEditForm: FC<CloserEditFormProps> = ({
  proposal,
  submitter
}) => {
  return (
    <Form<ProposalCloser>
      initialValues={proposal}
      onSubmit={submitter}
      render={() => <CustomScriptEditFormInner />}
    />
  )
}
const CustomScriptEditFormInner: FC = () => {
  return (
    <>
      <Typography variant="h5">チャットの終了: カスタムスクリプト</Typography>
      <Box marginTop={2} marginBottom={4}>
        <Box marginBottom={0.5}>
          <Typography variant="body1">
            バックグラウンドでJavascriptを実行できます。
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary">
          通知をオンにすると、ユーザの入力情報を通知先のメールアドレスに送信できます。メールアドレスは「概要」から変更可能です。
        </Typography>
      </Box>
      <BooleanInput source="data.notify" label="メールで通知する" />
      <CustomScriptHelp />
      <Field name="data.script" component={JavascriptEditor} />
      <SaveButton />
    </>
  )
}

export const FormPushOnCloseEditForm: FC<CloserEditFormProps> = ({
  proposal,
  submitter
}) => {
  return (
    <Form<ProposalCloser>
      initialValues={proposal}
      mutators={{ ...arrayMutators }}
      onSubmit={submitter}
      render={() => <FormPushEditFormInner />}
      destroyOnUnregister
    />
  )
}

const useStyle = makeStyles((theme) => ({
  foundationForFab: {
    position: 'relative'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(1)
  }
}))

const FormPushEditFormInner: FC = () => {
  const classes = useStyle()
  const { change } = useForm<ProposalCloser>()
  const makeInsertKey = useCallback(
    (k: string | undefined) => {
      return (val: string) => {
        if (!k) return
        change(k as keyof ProposalCloser, val)
      }
    },
    [change]
  )
  return (
    <>
      <Typography variant="h5">チャットの終了: フォーム送信</Typography>
      <Box marginTop={2} marginBottom={4}>
        <Box marginBottom={0.5}>
          <Typography variant="body1">
            フォームにデータを入力し代理送信することが可能です。
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary">
          ユーザの入力情報を既存のフォームにマッピングして、データを代理送信できます。カスタムスクリプトで事前にデータを加工したり補完できます。ただしフォームが存在しているページでチャットを起動している場合にのみ有効です。
        </Typography>
        <Typography variant="body2" color="textSecondary">
          通知をオンにすると、ユーザの入力情報を通知先のメールアドレスに送信できます。メールアドレスは「概要」から変更可能です。
        </Typography>
      </Box>
      <BooleanInput source="data.notify" label="メールで通知する" />
      <TextInput
        source="data.formSelector"
        label="フォームのDOMセレクタ"
        placeholder="#form"
        validate={[required()]}
        fullWidth
      />
      <BooleanInput
        source="data.ajax"
        label="非同期通信で送信する"
        defaultValue={true}
        helperText="オフにすると強制的にページ遷移されます。フォームの送信先が外部サイトであるなど、cors通信が許可されていない場合にはオフにしてください。"
      />
      <ArrayInput source="data.dataMapper" label="データマッピング">
        <SimpleFormIterator>
          <TextInput
            source="to"
            label="マッピング先フォーム内のキー"
            validate={[required()]}
            fullWidth
          />
          <BooleanInput
            source="custom"
            label="カスタム値を使用"
            defaultValue={false}
          />
          <FormDataConsumer>
            {({ getSource, scopedFormData }) =>
              !scopedFormData?.custom ? (
                <div className={classes.foundationForFab}>
                  <TextInput
                    source={getSource?.('from') ?? ''}
                    label="マッピング元のデータキー"
                    fullWidth
                    validate={[required()]}
                  />
                  <NameKeySelector
                    onSelected={makeInsertKey(getSource?.('from'))}
                    className={classes.fab}
                  />
                </div>
              ) : (
                <>
                  <Typography variant="subtitle2" color="textSecondary">
                    カスタム値
                  </Typography>
                  <FormPushCustomValueHelp />
                  <Field
                    name={getSource?.('customValueScript') ?? ''}
                    component={JavascriptEditor}
                    defaultValue={converterInitialValue}
                    maxLines={10}
                    minLines={5}
                  />
                </>
              )
            }
          </FormDataConsumer>
        </SimpleFormIterator>
      </ArrayInput>
      <FormDataConsumer>
        {({ formData }) =>
          formData?.data?.ajax && (
            <>
              <Typography variant="subtitle2" color="textSecondary">
                フォーム送信後スクリプト
              </Typography>
              <FormPushResultHelp />
              <Field
                name="data.onSubmit"
                component={JavascriptEditor}
                defaultValue={conditionOfCompleteInitialValue}
                minLines={10}
              />
            </>
          )
        }
      </FormDataConsumer>
      <SaveButton />
    </>
  )
}

const converterInitialValue = `// JavaScriptで記載してください。
// values にユーザの入力値が格納されています。
// 値は return で返却してください

// 誕生日を連結する例
return values.birthdayYear + '-' + values.birthdayMonth + '-' + values.birthdayDay
`

const conditionOfCompleteInitialValue = `// JavaScriptで記載してください。
// response にフォームの送信結果レスポンスが格納されています。

// フォーム送信フォのページに遷移する例
window.location.href = response.url
`
