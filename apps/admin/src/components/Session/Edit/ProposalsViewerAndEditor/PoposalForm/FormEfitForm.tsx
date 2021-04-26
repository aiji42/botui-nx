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
import { Typography } from '@material-ui/core'
import arrayMutators from 'final-form-arrays'
import { SaveButton } from './SaveButton'
import JavascriptEditor from '../../../parts/JavascriptEditor'

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
      <BooleanInput
        source="data.content.props.status.kana"
        initialValue={true}
        label="ふりがなの有無"
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
      <Typography variant="subtitle2">
        カスタムスクリプトで動的な選択肢の挿入が可能です。
        <br />
        こちらで指定した値名と同じキーを持つ選択肢のセットが自動挿入されます。
      </Typography>
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
      <Typography variant="subtitle2">
        カスタムスクリプトで動的な選択肢の挿入が可能です。
        <br />
        こちらで指定した値名と同じキーを持つ選択肢のセットが自動挿入されます。
      </Typography>
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
    />
  )
}
export const FormCustomInputEditFormInner: FC = () => {
  return (
    <>
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
          <FormDataConsumer>
            {({ getSource }) => (
              <>
                <Typography variant="subtitle2" color="textSecondary">
                  カスタムバリデーション
                </Typography>
                <Field
                  label="カスタムバリデーション"
                  name={getSource?.('validation') ?? ''}
                  initialValue={customValidatorInitial}
                  component={JavascriptEditor}
                />
              </>
            )}
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
    />
  )
}
export const FormCustomTextareaEditFormInner: FC = () => {
  return (
    <>
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
      <Typography variant="subtitle2" color="textSecondary">
        カスタムバリデーション
      </Typography>
      <Field
        name="data.content.props.validation"
        component={JavascriptEditor}
        initialValue={customValidatorInitial}
      />
      <SaveButton />
    </>
  )
}

const customValidatorInitial = `// JavaScript で記載してください。
// value に入力値が入っています。
// return で、1文字以上の文字列を返却するとエラーメッセージとしてフォーム下部に表示されます。
// 文字列以外を返却すると、ユーザが確定ボタンを押下できるようになります。
`
