import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  root: {
    marginTop: '32px'
  },
  row: {
    paddingBottom: '20px'
  },
  phoneInput: {
    '& > input': {
      height: '38px',
      fontSize: '20px'
    }
  },
  button: {
    width: '100%'
  }
});
