import { FC } from 'react'
import {Box, Typography, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  img: {
    maxWidth: 500
  }
}))

const Empty: FC = () => {
  const classes = useStyles()
  return (
    <Box textAlign="center" m={1}>
      <img src="/assets/customer-data.png" alt="no entry" className={classes.img} />
      <Typography variant="h6" paragraph>
        お客さ様からの反響がまだありません
      </Typography>
    </Box>
  )
}

export default Empty
