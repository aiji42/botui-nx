import {FC, useEffect} from 'react';
import {BooleanInput, SelectInput, required, TextInput, FormDataConsumer, ArrayInput, SimpleFormIterator} from 'react-admin';
import {FormCustomCheckbox, FormCustomRadioGroup, FormCustomSelect} from '@botui/types';
import {useForm, useFormState, Field} from 'react-final-form';
import {Tooltip, Badge, Typography} from '@material-ui/core';
import {HelpOutline} from '@material-ui/icons';
import JavascriptEditor from '../../ProposalEditDialog/JavascriptEditor';

export const FormNameEditForm: FC = (props) => {
  return (
    <>
      <BooleanInput
        {...props}
        source="data.content.props.status.kana"
        initialValue={true}
        label="ふりがな"
      />
      <SelectInput
        {...props}
        source="data.content.props.status.kanaType"
        label="ふりがな補正"
        initialValue="katakana"
        choices={[
          { id: 'katakana', name: 'カタカナ' },
          { id: 'hiragana', name: 'ひらがな' }
        ]}
      />
    </>
  )
}

export const FormBirthDayEditForm: FC = (props) => {
  return (
    <BooleanInput
      {...props}
      source="data.content.props.status.paddingZero"
      initialValue={false}
      label="値をゼロ詰めする"
      validate={[required()]}
    />
  )
}

export const FormCustomRadioGroupEditForm: FC = (props) => {
  const { change } = useForm()
  const { values } = useFormState<{
    data: { content: { props: FormCustomRadioGroup } }
  }>()
  useEffect(() => {
    if (!values.data.content.props.inputs)
      change('data.content.props.inputs', [])
  }, [values.data.content.props.inputs, change])
  return (
    <>
      <Badge
        badgeContent={
          <Tooltip title="カスタムスクリプトで動的な選択肢の挿入が可能です。こちらで指定した'name'と同じ値のものが適応されます。">
            <HelpOutline />
          </Tooltip>
        }
      >
        <TextInput
          {...props}
          source="data.content.props.name"
          label="値名"
          validate={[required()]}
        />
      </Badge>
      <ArrayInput
        {...props}
        source="data.content.props.inputs"
        label="ラジオボタン"
      >
        <SimpleFormIterator>
          <TextInput source="title" label="タイトル" validate={[required()]} />
          <TextInput source="value" label="値" validate={[required()]} />
        </SimpleFormIterator>
      </ArrayInput>
    </>
  )
}

export const FormCustomCheckboxEditForm: FC = (props) => {
  const { change } = useForm()
  const { values } = useFormState<{
    data: { content: { props: FormCustomCheckbox } }
  }>()
  useEffect(() => {
    if (!values.data.content.props.inputs)
      change('data.content.props.inputs', [])
  }, [values.data.content.props.inputs, change])
  return (
    <>
      <Badge
        badgeContent={
          <Tooltip title="カスタムスクリプトで動的な選択肢の挿入が可能です。こちらで指定した'name'と同じ値のものが適応されます。">
            <HelpOutline />
          </Tooltip>
        }
      >
        <TextInput
          {...props}
          source="data.content.props.name"
          label="値名"
          validate={[required()]}
        />
      </Badge>
      <BooleanInput
        source="data.content.props.required"
        label="入力を必須にする"
      />
      <ArrayInput
        {...props}
        source="data.content.props.inputs"
        label="チェックボックス"
      >
        <SimpleFormIterator>
          <TextInput source="title" label="タイトル" validate={[required()]} />
          <TextInput source="value" label="値" validate={[required()]} />
        </SimpleFormIterator>
      </ArrayInput>
    </>
  )
}

export const FormCustomSelectEditForm: FC = (props) => {
  const { change } = useForm()
  const { values } = useFormState<{
    data: { content: { props: FormCustomSelect } }
  }>()
  useEffect(() => {
    if (!values.data.content.props.selects) return
    values.data.content.props.selects.forEach((select, index) => {
      if (select && !select.options)
        change(`data.content.props.selects.${index}.options`, [])
    })
  }, [values.data.content.props.selects, change])
  return (
    <ArrayInput
      {...props}
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
  )
}

export const FormCustomInputEditForm: FC = (props) => {
  return (
    <ArrayInput
      {...props}
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
  )
}

export const FormCustomTextareaEditForm: FC = (props) => {
  return (
    <>
      <TextInput
        {...props}
        source="data.content.props.name"
        label="値名"
        validate={[required()]}
      />
      <TextInput
        {...props}
        source="data.content.props.title"
        label="タイトル"
      />
      <TextInput
        {...props}
        source="data.content.props.placeholder"
        label="プレースホルダー"
      />
      <BooleanInput
        {...props}
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
    </>
  )
}

const customValidatorInitial = `// JavaScript で記載してください。
// value に入力値が入っています。
// return で、1文字以上の文字列を返却するとエラーメッセージとしてフォーム下部に表示されます。
// 文字列以外を返却すると、ユーザが確定ボタンを押下できるようになります。
`