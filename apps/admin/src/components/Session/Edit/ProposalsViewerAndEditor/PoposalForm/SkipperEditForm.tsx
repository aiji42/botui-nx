import { FC, useCallback } from 'react'
import { Form } from 'react-final-form'
import { ProposalSkipper } from '@botui/types'
import {makeStyles, Typography, Box} from '@material-ui/core';
import {
  BooleanInput,
  SelectInput,
  required,
  minValue,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  NumberInput,
  FormDataConsumer
} from 'react-admin'
import { SaveButton } from './SaveButton'
import { NameKeySelector } from './NameKeySelector'
import { useForm } from 'react-final-form'
import arrayMutators from 'final-form-arrays'

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

interface SkipperEditFormProps {
  proposal?: ProposalSkipper
  submitter: (value: ProposalSkipper) => void
}

export const SkipperEditForm: FC<SkipperEditFormProps> = ({
  proposal,
  submitter
}) => {
  return (
    <Form<ProposalSkipper>
      initialValues={proposal}
      mutators={{ ...arrayMutators }}
      onSubmit={submitter}
      render={() => <FormInner />}
    />
  )
}

const FormInner: FC = () => {
  const classes = useStyle()
  const { change } = useForm<ProposalSkipper>()
  const makeInsertKey = useCallback(
    (k: string | undefined) => {
      return (val: string) => {
        if (!k) return
        change(k as keyof ProposalSkipper, val)
      }
    },
    [change]
  )

  return (
    <>
      <Typography variant="h5">分岐(メッセージのスキップ)</Typography>
      <Box marginTop={2} marginBottom={4}>
        <Box marginBottom={0.5}>
          <Typography variant="body1">
            チャットをスキップしメッセージの出し分けを実現します。
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary">
          指定した条件に一致すると、スキップ数に応じてメッセージなどの後続の処理をスキップできます。複数のスキップ処理を組み合わせることで複雑なメッセージの出し分けが可能です。
        </Typography>
        <Typography variant="body2" color="textSecondary">
          各条件の評価を OR にした場合にはいずれかの条件に一致した場合、AND を選択した場合にはすべての条件に一致した場合に、スキップが行われます。
        </Typography>
      </Box>
      <NumberInput
        source="data.skipNumber"
        validate={[required(), minValue(1)]}
        label="スキップ数"
      />
      <SelectInput
        source="data.logic"
        choices={logicChoices}
        validate={[required()]}
        label="各種条件の評価"
      />
      <ArrayInput source="data.conditions" label="条件" validate={[required()]}>
        <SimpleFormIterator>
          <FormDataConsumer>
            {({ scopedFormData, getSource }) => (
              <>
                <div className={classes.foundationForFab}>
                  <TextInput
                    source={getSource?.('key') ?? ''}
                    validate={[required()]}
                    label="値名"
                    fullWidth
                  />
                  <NameKeySelector
                    onSelected={makeInsertKey(getSource?.('key'))}
                    className={classes.fab}
                  />
                </div>
                <SelectInput
                  source={getSource?.('operator') ?? ''}
                  choices={operatorChoices}
                  validate={[required()]}
                  label="評価"
                  fullWidth
                />
                {['eq', 'gt', 'lt', 'gteq', 'lteq'].includes(
                  scopedFormData?.operator
                ) && (
                  <NumberInput
                    source={getSource?.('pattern') ?? ''}
                    label="評価値・パターン"
                    validate={[required()]}
                    fullWidth
                  />
                )}
                {['start', 'end', 'cont', 'match', 'regex', 'include'].includes(
                  scopedFormData?.operator
                ) && (
                  <TextInput
                    source={getSource?.('pattern') ?? ''}
                    label="評価値・パターン"
                    validate={[required()]}
                    fullWidth
                  />
                )}
                <BooleanInput
                  source={getSource?.('negative') ?? ''}
                  label="否定(NOT)"
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

const operatorChoices = [
  { id: 'eq', name: '(数値) =' },
  { id: 'gt', name: '(数値) >' },
  { id: 'gteq', name: '(数値) >=' },
  { id: 'lt', name: '(数値) <' },
  { id: 'lteq', name: '(数値) <=' },
  { id: 'start', name: '(文字列) 前方一致' },
  { id: 'end', name: '(文字列) 後方一致' },
  { id: 'cont', name: '(文字列) 部分一致' },
  { id: 'match', name: '(文字列) 完全一致' },
  { id: 'regex', name: '(文字列) 正規表現' },
  { id: 'include', name: '(配列) 内包' },
  { id: 'true', name: 'TRUE' },
  { id: 'false', name: 'FALSE' },
  { id: 'null', name: 'NULL' }
]

const logicChoices = [
  { id: 'and', name: 'AND' },
  { id: 'or', name: 'OR' }
]
