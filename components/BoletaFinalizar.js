import React from 'react';
import { makeStyles, Paper, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

export default function BoletaFinalizar({contribuyente, items, total}){
  const classes = useStyles();

  return (

            <Paper square elevation={0} className={classes.resetContainer}>
              <Typography>
                {contribuyente.cuit} - {contribuyente.razonSocial}
              </Typography>
            </Paper>

  )

} 