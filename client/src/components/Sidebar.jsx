import React, { useState, useContext } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper, withStyles } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { makeStyles } from '@material-ui/core/styles';

import { SocketContext } from '../Context';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridContainer: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  container: {
    width: '600px',
    margin: '35px 0',
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  margin: {
    marginTop: 10,
  },
  padding: {
    padding: 8,
  },
  paper: {
    padding: '6px 10px',
    border: '1px solid #51505a',
    backgroundColor: '#1e1c24',
  },
  informationLabel: {
    fontSize: '16px',
    fontFamily: '"Poppins", sans-serif',
    fontWeight: '500',
    color: '#51505a',
  },
  input: {
    fontFamily: '"Poppins", sans-serif',
    '&::placeholder': {
      color: '#51505a',
    },
    color: '#fff',
  },
}));

const StyledButton = withStyles({
  root: {
    background: '#075ebd',
    borderRadius: 5,
    border: 0,
    color: '#fff100',
    height: 48,
    padding: '0 30px',
  },
  label: {
    fontFamily: '"Poppins", sans-serif',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
})(Button);

const ExitButton = withStyles({
  root: {
    background: '#ff305c',
    borderRadius: 5,
    border: 0,
    color: '#fff100',
    height: 48,
    padding: '0 30px',
  },
  label: {
    textTransform: 'uppercase',
    fontWeight: '600',
  },
})(Button);

const Sidebar = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6" className={classes.informationLabel}>Informações do contato</Typography>
              <TextField
                placeholder="Nome"
                value={name}
                className={classes.input}
                InputProps={{
                  className: classes.input,
                }}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              <CopyToClipboard text={me} className={classes.margin}>
                <StyledButton variant="contained" color="primary" fullWidth className={classes.button}>
                  Copiar ID
                </StyledButton>
              </CopyToClipboard>
            </Grid>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6" className={classes.informationLabel}>Fazer uma chamada</Typography>
              <TextField
                placeholder="ID"
                value={idToCall}
                className={classes.input}
                InputProps={{
                  className: classes.input,
                }}
                onChange={(e) => setIdToCall(e.target.value)}
                fullWidth
              />
              {callAccepted && !callEnded ? (
                <ExitButton variant="contained" color="secondary" fullWidth onClick={leaveCall} className={classes.margin}>
                  Sair
                </ExitButton>
              ) : (
                <StyledButton variant="contained" color="primary" fullWidth onClick={() => callUser(idToCall)} className={classes.margin}>
                  Chamar
                </StyledButton>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
};

export default Sidebar;
