import React, { useState } from "react";
import Contribuyente from "../components/Contribuyente";
import BoletaDetallePanel from "../components/BoletaDetallePanel";
import BoletaFinalizar from '../components/BoletaFinalizar';
import { CssBaseline, AppBar, Typography, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";

const steps = ["Contribuyente", "Items", "Finalizar"];
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function Boleta() {
  const [items, setItems] = useState([]);
  const [contribuyente, setContribuyente] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleEliminarItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleAltaItem = async (item) => {
    const resp = await setItems([...items, item]);
  };

  const handleContribuyente = (campo, valor) => {
    contribuyente[campo] = valor;
    setContribuyente(contribuyente);
  };

  const totalItems = () => {
    return items
      ? items
          .map(({ importe }) => importe)
          .reduce((sum, i) => sum + parseFloat(i), 0)
      : 0;
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Contribuyente handleContribuyente={handleContribuyente} />;
      case 1:
        return (
          <BoletaDetallePanel
            items={items}
            handleAltaItem={handleAltaItem}
            handleEliminarItem={handleEliminarItem}
            totalItems={totalItems}
          />
        );
      case 2:
        return <BoletaFinalizar contribuyente={contribuyente} items={items} totalItems={totalItems} />;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <>
      <CssBaseline />
      <AppBar position="absolute" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Agencia de Recaudación Fueguina - Boleta de Pago
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </>
            ) : (
              <>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Atrás
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1
                      ? "Generar Boleta"
                      : "Siguiente"}
                  </Button>
                </div>
              </>
            )}
          </>
        </Paper>
      </main>
    </>
  );
}
