import React, { FC } from 'react'
import { Grid } from '@material-ui/core'
import { BooleanInput, CheckboxGroupInput } from 'react-admin'
import { Tooltip } from '@material-ui/core'
import { HelpOutline } from '@material-ui/icons'

const scripts = [
  { id: 'https://unpkg.com/dayjs/dayjs.min.js', name: 'dayjs' },
  { id: 'https://unpkg.com/axios/dist/axios.min.js', name: 'axios' }
]

const SessionFormInner: FC = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <BooleanInput
          label={
            <>
              自動即時起動
              <Tooltip title="対象ページへのアクセスと同時にチャットを立ち上げます。">
                <HelpOutline fontSize="small" />
              </Tooltip>
            </>
          }
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
