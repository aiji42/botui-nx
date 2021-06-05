import {Box, Typography, makeStyles} from '@material-ui/core';
import { FC } from 'react'
import { CollaboratorChallengeDialogWithButton } from '.'

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
        コラボレーション中のシナリオがまだありません
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        招待を受けている場合は、招待コードを入力してください。
      </Typography>
      <CollaboratorChallengeDialogWithButton />
    </Box>
  )
}

export default Empty
