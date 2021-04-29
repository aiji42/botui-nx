import { FC } from 'react'
import {
  BooleanInput,
  SelectInput,
  required,
  TextInput,
  FormDataConsumer,
  ArrayInput,
  SimpleFormIterator
} from 'react-admin'
import { ProposalMessage } from '@botui/types'
import { Field, Form } from 'react-final-form'
import { Typography, Box } from '@material-ui/core'
import arrayMutators from 'final-form-arrays'
import { SaveButton } from './SaveButton'
import JavascriptEditor from '../../../parts/JavascriptEditor'
import { CustomValidationHelp } from './CustomScriptHelp'

interface FormEditFormProps {
  proposal?: ProposalMessage
  submitter: (value: ProposalMessage) => void
}

export const FormNameEditForm: FC<FormEditFormProps> = ({
  proposal,
  submitter
}) => {
  return (
    <Form<ProposalMessage>
      initialValues={proposal}
      onSubmit={submitter}
      render={() => <FormNameEditFormInner />}
    />
  )
}
const FormNameEditFormInner: FC = () => {
  return (
    <>
      <Typography variant="h5">氏名入力フォーム</Typography>
      <Box marginTop={2} marginBottom={4}>
        <Box marginBottom={0.5}>
          <Typography variant="body1">
            ユーザの姓名の入力を促すフォームです。
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary">
          ふりがな補正では、ユーザのふりがなをカタカナもしくはひらがなに自動補正します。
        </Typography>
      </Box>
      <BooleanInput
        source="data.content.props.status.kana"
        initialValue={true}
        label="ふりがなの入力有無"
      />
      <SelectInput
        source="data.content.props.status.kanaType"
        label="ふりがな補正"
        initialValue="katakana"
        choices={[
          { id: 'katakana', name: 'カタカナ' },
          { id: 'hiragana', name: 'ひらがな' }
        ]}
      />
      <SaveButton />
    </>
  )
}

export const FormAddressEditFotm: FC<FormEditFormProps> = () => {
  return (
    <>
      <Typography variant="h5">住所入力フォーム</Typography>
      <Box marginTop={2} marginBottom={4}>
        <Box marginBottom={0.5}>
          <Typography variant="body1">
            ユーザの住所の入力を促すフォームです。
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary">
          郵便番号から自動的に住所を入力補完します。
        </Typography>
        <Typography variant="caption" color="textSecondary">
          こちらのフォームは現在カスタム可能な項目がありません。
        </Typography>
      </Box>
    </>
  )
}

export const FormTelEditFotm: FC<FormEditFormProps> = () => {
  return (
    <>
      <Typography variant="h5">電話番号入力フォーム</Typography>
      <Box marginTop={2} marginBottom={4}>
        <Box marginBottom={0.5}>
          <Typography variant="body1">
            ユーザの電話番号の入力を促すフォームです。
          </Typography>
        </Box>
        <Typography variant="caption" color="textSecondary">
          こちらのフォームは現在カスタム可能な項目がありません。
        </Typography>
      </Box>
    </>
  )
}

export const FormEmailEditFotm: FC<FormEditFormProps> = () => {
  return (
    <>
      <Typography variant="h5">メールアドレス入力フォーム</Typography>
      <Box marginTop={2} marginBottom={4}>
        <Box marginBottom={0.5}>
          <Typography variant="body1">
            ユーザのメールアドレスの入力を促すフォームです。
          </Typography>
        </Box>
        <Typography variant="caption" color="textSecondary">
          こちらのフォームは現在カスタム可能な項目がありません。
        </Typography>
      </Box>
    </>
  )
}

export const FormBirthDayEditForm: FC<FormEditFormProps> = ({
  proposal,
  submitter
}) => {
  return (
    <Form<ProposalMessage>
      initialValues={proposal}
      onSubmit={submitter}
      render={() => <FormBirthDayEditFormInner />}
    />
  )
}
export const FormBirthDayEditFormInner: FC = () => {
  return (
    <>
      <Typography variant="h5">生年月日入力フォーム</Typography>
      <Box marginTop={2} marginBottom={4}>
        <Box marginBottom={0.5}>
          <Typography variant="body1">
            ユーザの誕生日の入力を促すフォームです。
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary">
          ゼロ詰めを選択した場合、一桁の月や日をゼロで埋めて二桁の値に統一できます。(例:
          1月 → 01)
        </Typography>
      </Box>
      <BooleanInput
        source="data.content.props.status.paddingZero"
        initialValue={false}
        label="値をゼロ詰めする"
        validate={[required()]}
      />
      <SaveButton />
    </>
  )
}

export const FormCustomRadioGroupEditForm: FC<FormEditFormProps> = ({
  proposal,
  submitter
}) => {
  return (
    <Form<ProposalMessage>
      initialValues={proposal}
      onSubmit={submitter}
      mutators={{ ...arrayMutators }}
      render={() => <FormCustomRadioGroupEditFormInner />}
    />
  )
}
export const FormCustomRadioGroupEditFormInner: FC = () => {
  return (
    <>
      <Typography variant="h5">ラジオボタン型回答フォーム</Typography>
      <Box marginTop={2} marginBottom={4}>
        <Box marginBottom={0.5}>
          <Typography variant="body1">
            選択肢の中から一つだけ回答を得るフォームです。
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary">
          カスタムスクリプトで事前に動的な選択肢を生成できます。詳しくは中間処理の「カスタムスクリプト」を追加して確認してください。
        </Typography>
      </Box>
      <TextInput
        source="data.content.props.name"
        label="値名"
        validate={[required()]}
      />
      <ArrayInput
        source="data.content.props.inputs"
        label="ラジオボタン"
        validate={[required()]}
      >
        <SimpleFormIterator>
          <TextInput source="title" label="タイトル" validate={[required()]} />
          <TextInput source="value" label="値" validate={[required()]} />
        </SimpleFormIterator>
      </ArrayInput>
      <SaveButton />
    </>
  )
}

export const FormCustomCheckboxEditForm: FC<FormEditFormProps> = ({
  proposal,
  submitter
}) => {
  return (
    <Form<ProposalMessage>
      initialValues={proposal}
      onSubmit={submitter}
      mutators={{ ...arrayMutators }}
      render={() => <FormCustomCheckboxEditFormInner />}
    />
  )
}
export const FormCustomCheckboxEditFormInner: FC = () => {
  return (
    <>
      <Typography variant="h5">チェックボックス型回答フォーム</Typography>
      <Box marginTop={2} marginBottom={4}>
        <Box marginBottom={0.5}>
          <Typography variant="body1">
            選択肢の中から複数の回答を得るフォームです。
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary">
          カスタムスクリプトで事前に動的な選択肢を生成できます。詳しくは中間処理の「カスタムスクリプト」を追加して確認してください。
        </Typography>
      </Box>
      <TextInput
        source="data.content.props.name"
        label="値名"
        validate={[required()]}
      />
      <BooleanInput
        source="data.content.props.required"
        label="入力を必須にする"
      />
      <ArrayInput
        source="data.content.props.inputs"
        label="チェックボックス"
        validate={[required()]}
      >
        <SimpleFormIterator>
          <TextInput source="title" label="タイトル" validate={[required()]} />
          <TextInput source="value" label="値" validate={[required()]} />
        </SimpleFormIterator>
      </ArrayInput>
      <SaveButton />
    </>
  )
}

export const FormCustomSelectEditForm: FC<FormEditFormProps> = ({
  proposal,
  submitter
}) => {
  return (
    <Form<ProposalMessage>
      initialValues={proposal}
      onSubmit={submitter}
      mutators={{ ...arrayMutators }}
      render={() => <FormCustomSelectEditFormInner />}
    />
  )
}
export const FormCustomSelectEditFormInner: FC = () => {
  return (
    <>
      <Typography variant="h5">セレクトボックス型回答フォーム</Typography>
      <Box marginTop={2} marginBottom={4}>
        <Box marginBottom={0.5}>
          <Typography variant="body1">
            プルダウンの選択肢の中から回答を得るフォームです。
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary">
          カスタムスクリプトで事前に動的な選択肢を生成できます。詳しくは中間処理の「カスタムスクリプト」を追加して確認してください。
        </Typography>
      </Box>
      <ArrayInput
        source="data.content.props.selects"
        label="セレクトボックス"
        validate={[required()]}
      >
        <SimpleFormIterator>
          <TextInput source="name" label="値名" validate={[required()]} />
          <TextInput source="title" label="タイトル" />
          <ArrayInput source="options" label="選択肢">
            <SimpleFormIterator>
              <TextInput source="label" label="ラベル" />
              <TextInput source="value" label="値" validate={[required()]} />
            </SimpleFormIterator>
          </ArrayInput>
        </SimpleFormIterator>
      </ArrayInput>
      <SaveButton />
    </>
  )
}

export const FormCustomInputEditForm: FC<FormEditFormProps> = ({
  proposal,
  submitter
}) => {
  return (
    <Form<ProposalMessage>
      initialValues={proposal}
      onSubmit={submitter}
      mutators={{ ...arrayMutators }}
      render={() => <FormCustomInputEditFormInner />}
      destroyOnUnregister
    />
  )
}
export const FormCustomInputEditFormInner: FC = () => {
  return (
    <>
      <Typography variant="h5">インプット型回答フォーム</Typography>
      <Box marginTop={2} marginBottom={4}>
        <Box marginBottom={0.5}>
          <Typography variant="body1">
            ユーザに自由入力を促すフォームです。
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary">
          短い文字列の入力や、数字、パスワードなど入力形式に制限を設ける場合にはこちらのフォームが有効です。
        </Typography>
        <Typography variant="body2" color="textSecondary">
          改行が含まれるような長文での回答を求める場合には、こちらではなくテキストエリアフォームが有効です。
        </Typography>
      </Box>
      <ArrayInput
        source="data.content.props.inputs"
        label="input"
        validate={[required()]}
      >
        <SimpleFormIterator>
          <TextInput source="name" label="値名" validate={[required()]} />
          <SelectInput
            source="type"
            validate={[required()]}
            choices={[
              { id: 'text', name: 'text' },
              { id: 'number', name: 'number' },
              { id: 'tel', name: 'tel' },
              { id: 'email', name: 'email' },
              { id: 'password', name: 'password' }
            ]}
            label="入力タイプ"
          />
          <TextInput source="title" label="タイトル" />
          <TextInput source="placeholder" label="プレースホルダー" />
          <BooleanInput source="required" label="入力を必須にする" />
          <BooleanInput
            source="customValidation"
            label="カスタムバリデーションを使用する"
            fullWidth
          />
          <FormDataConsumer>
            {({ getSource, scopedFormData }) =>
              scopedFormData.customValidation && (
                <>
                  <CustomValidationHelp />
                  <Field
                    name={getSource?.('validation') ?? ''}
                    component={JavascriptEditor}
                  />
                </>
              )
            }
          </FormDataConsumer>
        </SimpleFormIterator>
      </ArrayInput>
      <SaveButton />
    </>
  )
}

export const FormCustomTextareaEditForm: FC<FormEditFormProps> = ({
  proposal,
  submitter
}) => {
  return (
    <Form<ProposalMessage>
      initialValues={proposal}
      onSubmit={submitter}
      mutators={{ ...arrayMutators }}
      render={() => <FormCustomTextareaEditFormInner />}
      destroyOnUnregister
    />
  )
}
export const FormCustomTextareaEditFormInner: FC = () => {
  return (
    <>
      <Typography variant="h5">テキストエリア型回答フォーム</Typography>
      <Box marginTop={2} marginBottom={4}>
        <Box marginBottom={0.5}>
          <Typography variant="body1">
            ユーザに長文での自由入力を促すフォームです。
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary">
          改行が含まれるような長文での入力を求める場合にこちらのフォームが有効です。
        </Typography>
        <Typography variant="body2" color="textSecondary">
          数字のみやパスワードなど入力形式に制限を設ける場合には、こちらではなくカスタムインプットフォームが有効です。
        </Typography>
      </Box>
      <TextInput
        source="data.content.props.name"
        label="値名"
        validate={[required()]}
      />
      <TextInput source="data.content.props.title" label="タイトル" />
      <TextInput
        source="data.content.props.placeholder"
        label="プレースホルダー"
      />
      <BooleanInput
        source="data.content.props.required"
        label="入力を必須にする"
      />
      <BooleanInput
        source="data.content.props.customValidation"
        label="カスタムバリデーションを使用する"
        fullWidth
      />
      <FormDataConsumer>
        {({ formData }) =>
          formData.data.content.props.customValidation && (
            <>
              <CustomValidationHelp />
              <Field
                name="data.content.props.validation"
                component={JavascriptEditor}
              />
            </>
          )
        }
      </FormDataConsumer>
      <SaveButton />
    </>
  )
}
