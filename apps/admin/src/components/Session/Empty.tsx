import { FC } from 'react'
import { Box, Typography, makeStyles } from '@material-ui/core'
import { CreateButton, useListContext } from 'react-admin'

const useStyles = makeStyles(() => ({
  img: {
    maxWidth: 500
  }
}))

const Empty = () => {
  const { basePath } = useListContext()
  const classes = useStyles()

  return (
    <Box textAlign="center" m={1}>
      <img
        src="/assets/scenario-making.png"
        alt="no scenario"
        className={classes.img}
      />
      <Typography variant="h6" paragraph>
        シナリオがまだありません
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        さっそく、新しいシナリオを登録してみましょう
      </Typography>
      <CreateButton basePath={basePath} size="large" variant="contained" />
    </Box>
  )
}

export default Empty
