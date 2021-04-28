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
import {Typography, makeStyles, Box} from '@material-ui/core';
import { NameKeySelector } from './NameKeySelector'
import arrayMutators from 'final-form-arrays'
import JavascriptEditor from '../../../parts/JavascriptEditor'

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
      <Field
        name="data.script"
        defaultValue={scriptInitialValue}
        component={JavascriptEditor}
      />
      <SaveButton />
    </>
  )
}

const scriptInitialValue = `// Javascript で記載してください。

// このスクリプト以前にユーザが入力した値は values オブジェクトに格納されています。
// 例えばユーザの姓は values.familyName でアクセスできます。

console.log(values.familyName, values.firstName)

// Promise を return することで、サーバ通信などの非同期処理を同期的に取り扱えます。
/**
const timer = (time) =>
  new Promise((resolve) => setTimeout(resolve, time))

return timer(3000) // 3秒待つ
*/

// カスタムチェックボックス・カスタムラジオボタン・カスタムセレクトの選択肢を
// 動的に選択することが可能です。
// 例えば、本日から1ヶ月後までの日付のリストや、
// ユーザが選択した商品で取り扱える支払い方法の選択肢を動的に作り出すなどが可能です。
// 次のように対象フォームで設定した'name' と一致するように配列をセットしてください。
/**
window.botui.customChoice['フォームのname'] = [
  { label: '選択肢1', value: '1' },
  { label: '選択肢2', value: '2' },
  { label: '選択肢3', value: '3' },
]
*/
`

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
            label="カスタム値を採用"
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
