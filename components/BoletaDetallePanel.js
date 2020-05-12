import React, { useState, useEffect } from "react";
import {
  ExpansionPanel,
  Typography,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Paper,
  Toolbar,
  Button,
  Container,
  Box,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import BoletaTabla from "../components/BoletaTabla";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import AltaItem from "../components/AltaItem";

export default function BoletaDetallePanel(props) {
  const [mostrarAltaItem, setMostrarAltaItem] = useState(false);
  const [data, setData] = useState([]);

  const handleClickAdd = () => {
    setMostrarAltaItem(true);
  };

  const handleAltaItem = (item) => {
    setMostrarAltaItem(false);
    setData([...data, item]);
  };

  const eliminarFila = (id) => {
    setData(data.filter(item=>item.id !== id))
  }

  return (
    <Box>
      <ExpansionPanel expanded={props.expanded}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography>Boleta de Pago</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Box width="90%">
            {mostrarAltaItem ? (
              <AltaItem handleAltaItem={handleAltaItem} />
            ) : (
              <Toolbar>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<AddBoxOutlinedIcon />}
                  onClick={handleClickAdd}
                >
                  Agregar
                </Button>
              </Toolbar>
            )}
            <BoletaTabla datos={data} eliminarFila={eliminarFila} />
          </Box>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Box>
  );
}
