import { FC, useCallback } from 'react'
import {
  BooleanInput,
  required,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  FormDataConsumer
} from 'react-admin'
import { ProposalRelayer } from '@botui/types'
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

interface RelayerEditFormProps {
  proposal?: ProposalRelayer
  submitter: (value: ProposalRelayer) => void
}

export const CustomScriptEditForm: FC<RelayerEditFormProps> = ({
  proposal,
  submitter
}) => {
  return (
    <Form<ProposalRelayer>
      initialValues={proposal}
      onSubmit={submitter}
      render={() => <CustomScriptEditFormInner />}
    />
  )
}
const CustomScriptEditFormInner: FC = () => {
  return (
    <>
      <Typography variant="h5">カスタムスクリプト</Typography>
      <Box marginTop={2} marginBottom={4}>
        <Box marginBottom={0.5}>
          <Typography variant="body1">
            バックグラウンドでJavascriptを実行できます。
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary">
          カスタムチェックボックス・ラジオボタン・セレクトの選択肢を動的に生成したり、サーバとの通信を行うなどのことができます。
        </Typography>
      </Box>
      <CustomScriptHelp />
      <Field name="data.script" component={JavascriptEditor} />
      <SaveButton />
    </>
  )
}

export const FormPushEditForm: FC<RelayerEditFormProps> = ({
  proposal,
  submitter
}) => {
  return (
    <Form<ProposalRelayer>
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
  const { change } = useForm<ProposalRelayer>()
  const makeInsertKey = useCallback(
    (k: string | undefined) => {
      return (val: string) => {
        if (!k) return
        change(k as keyof ProposalRelayer, val)
      }
    },
    [change]
  )
  return (
    <>
      <Typography variant="h5">フォームの送信</Typography>
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
          ページ遷移することなくバックグラウンドでデータ送信することも可能です。フォームが複数ページに渡っていて、一つのチャットで入力を完結させたい場合には効果的です。
        </Typography>
      </Box>
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
        helperText="オフにすると強制的にデータ送信先のページへ遷移します。フォームの送信先が外部サイトであるなど、CORS通信が許可されていない場合にはオフにしてください。"
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
