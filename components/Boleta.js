import React, { useState } from "react";
import Contribuyente from "../components/Contribuyente";
import BoletaDetallePanel from "../components/BoletaDetallePanel";
import BoletaFinalizar from "../components/BoletaFinalizar";
import {
  CssBaseline,
  AppBar,
  Typography,
  Toolbar,
  StepContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";

const steps = ["Contribuyente", "Items", "Finalizar"];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    margin: theme.spacing(2),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

function getFechaHoy() {
  let d = new Date(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
}

export default function Boleta() {
  const [items, setItems] = useState([]);
  const [contribuyente, setContribuyente] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();
  const [errores, setErrores] = React.useState({});

  const handleNext = () => {
    if (controlarPaso(activeStep)) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
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

  const controlarPaso = (i) => {
    let erroresCampos = {};
    if (i === 0) {
      return true;
      if (!contribuyente.cuit) {
        erroresCampos["cuit"] = "Se debe ingresar el CUIT";
      }
      if (!contribuyente.razonSocial) {
        erroresCampos["razonSocial"] = "Se debe ingresar la Razón Social";
      }
      // if (!contribuyente.distrito) {
      //   erroresCampos["distrito"] = "Se debe ingresar el Distrito";
      // }
      if (!contribuyente.fecha) {
        erroresCampos["fecha"] = "Se debe ingresa la fecha";
      } else if (contribuyente.fecha < getFechaHoy()) {
        erroresCampos["fecha"] = "La fecha debe posterior al día de la fecha";
      }
      setErrores(erroresCampos);
      return isEmpty(erroresCampos);
    } else if (i === 1) {
      if (items.length === 0) {
        erroresCampos["tabla"] = "Se deben cargar items para generar la boleta";
      }
      setErrores(erroresCampos);
      return isEmpty(erroresCampos);
    }
    /*    else {
        if (i === 0) {
      setContribuyente({
        nib: "11-111111-1",
        cuit: "11-111111-1",
        razonSocial: "Juan Jose Rodriguez",
        distrito: "RGR",
      });
    } else if (i === 1) {
      setItems([
        {
          id: 1,
          codigo: "100105025",
          descripcion: "TASA - Trámites Urgentes",
          referencia: "1212",
          importe: "100.00",
          vencimiento: "2020-06-12",
        },
        {
          id: 2,
          codigo: "100105029",
          descripcion: "Certificado de …",
          referencia: "1216",
          importe: "1500.00",
          vencimiento: "2020-06-12",
        },
        {
          id: 3,
          codigo: "102105053",
          descripcion: "TASA - URGENTE",
          referencia: "1218",
          importe: "200.00",
          vencimiento: "2020-06-12",
        },
      ]);
    }
    return true;*/
  };

  const etiquetaPaso = (i) => {
    if (i < activeStep) {
      if (i === 0) {
        return contribuyente.razonSocial + " - CUIT: " + contribuyente.cuit;
      }
      if (i === 1) {
        return "Total: $" + totalItems();
      }
    }
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
        return (
          <Contribuyente
            handleContribuyente={handleContribuyente}
            contribuyente={contribuyente}
            errores={errores}
          />
        );
      case 1:
        return (
          <BoletaDetallePanel
            items={items}
            handleAltaItem={handleAltaItem}
            handleEliminarItem={handleEliminarItem}
            totalItems={totalItems}
            errores={errores}
          />
        );
      case 2:
        return (
          <BoletaFinalizar
            contribuyente={contribuyente}
            items={items}
            totalItems={totalItems}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <div className={classes.root}>
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
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>
                  {index >= activeStep ? label : etiquetaPaso(index)}
                </StepLabel>
                <StepContent>
                  {getStepContent(activeStep)}
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        variant="contained"
                        className={classes.button}
                      >
                        Volver
                      </Button>
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
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>

          {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
            </Paper>
          )}
        </Paper>
      </main>
    </div>
  );
}
