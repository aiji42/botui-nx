import { FC } from 'react'
import { Grid } from '@material-ui/core'
import { BooleanInput, CheckboxGroupInput } from 'react-admin'

const scripts = [
  { id: 'https://unpkg.com/dayjs/dayjs.min.js', name: 'dayjs' },
  { id: 'https://unpkg.com/axios/dist/axios.min.js', name: 'axios' }
]

const SessionFormInner: FC = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <BooleanInput
          label="自動即時起動"
          helperText="こちらの値を変更した場合には、起動スクリプトの再設定をお願いします。"
          source="launcher.defaultOpen"
          resource="sessions"
          defaultValue={false}
        />
      </Grid>
      <Grid item xs={12}>
        <CheckboxGroupInput
          label="外部スクリプトの読み込み"
          source="launcher.loadScripts"
          resource="sessions"
          choices={scripts}
        />
      </Grid>
    </Grid>
  )
}

export default SessionFormInner
