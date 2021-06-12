import { Box, Typography, makeStyles } from '@material-ui/core'
import { FC } from 'react'

const useStyles = makeStyles(() => ({
  img: {
    maxWidth: 500
  }
}))

const Empty: FC = () => {
  const classes = useStyles()
  return (
    <Box textAlign="center" m={1}>
      <img src="/assets/invite.png" alt="no invite" className={classes.img} />
      <Typography variant="h6" paragraph>
        あなたがコラボレーターとして参加しているシナリオはありません
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        お知り合いのチャチャットの利用者に、コラボレーションをリクエストしてみてください。<br />
        シナリオの共同編集が可能になります。
      </Typography>
    </Box>
  )
}

export default Empty
