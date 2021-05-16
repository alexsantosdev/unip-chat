import React, { useContext } from 'react';
import { Button, makeStyles, withStyles } from '@material-ui/core';

import { SocketContext } from '../Context';

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  const useStyles = makeStyles(() => ({
    caller: {
      color: '#fff',
    },
    message: {
      fontWeight: '300 !important',
      color: '#939393',
    },
  }));

  const classes = useStyles();
  const AnswerButton = withStyles({
    root: {
      background: '#31ff31',
      borderRadius: 5,
      border: 0,
      color: '#fff',
      height: 28,
      padding: '0 30px',
    },
    label: {
      fontFamily: '"Poppins", sans-serif',
      textTransform: 'uppercase',
      fontWeight: '600',
    },
  })(Button);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <h3 className={classes.caller}>{call.name} <span className={classes.message}>está ligando para você: </span></h3>
          <AnswerButton variant="contained" color="primary" onClick={answerCall}>
            Atender
          </AnswerButton>
        </div>
      )}
    </>
  );
};

export default Notifications;
