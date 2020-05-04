import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
// import { Alert as MuiAlert } from '@material-ui/lab';
import MuiAlert from '@material-ui/lab/Alert';
// import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     '& > * + *': {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));

export default function CustomizedSnackbars(props) {
    const {open, duration=6000, severity='success', message='success', setNotification} = props
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(true);

  return (
      //className={classes.root}
    <div >
      <Snackbar open={open} autoHideDuration={duration} onClose={() => setNotification(false)}>
        <Alert severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}