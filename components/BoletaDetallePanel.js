import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ExpansionPanel,
  Typography,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Paper,
  Toolbar,
  Button,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import BoletaTabla from "../components/BoletaTabla";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import AltaItem from "../components/AltaItem";
import theme from '../theme';
 
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function BoletaDetallPanel() {
  const [mostrarAltaItem, setMostrarAltaItem] = useState(false);
  const classes = useStyles(theme);
  const handleClickAdd = () => {
    setMostrarAltaItem(true);
  };

  const handleAltaItem = (item) =>{
    setMostrarAltaItem(false);
    console.log(item);
  }

  return (
    <ExpansionPanel expanded={true}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel4bh-content"
        id="panel4bh-header"
      >
        <Typography 
        // className={classes.heading}
        >Boleta de Pago</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Paper>
          {mostrarAltaItem ? (
            <AltaItem handleAltaItem={handleAltaItem} />
          ) : (
            <Toolbar>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<AddBoxOutlinedIcon />}
                onClick={handleClickAdd}
              >
                Agregar
              </Button>
            </Toolbar>
          )}
          <BoletaTabla />
        </Paper>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
