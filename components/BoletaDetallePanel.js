import React, { useState, useEffect } from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import BoletaTabla from "../components/BoletaTabla";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import AltaItem from "../components/AltaItem";

export default function BoletaDetallePanel({
  handleAltaItem,
  handleEliminarItem,
  items,
  totalItems
}) {
  const [mostrarAltaItem, setMostrarAltaItem] = useState(false);

  const handleClickAdd = () => {
    setMostrarAltaItem(true);
  };

  const nuevaFila = (item) => {
    handleAltaItem(item);
    setMostrarAltaItem(false);
  };

  const eliminarFila = (id) => {
    handleEliminarItem(id);
  };

  return (
    <Grid>
      {mostrarAltaItem ? (
        <AltaItem open={true} handleAltaItem={nuevaFila} />
      ) : (
        <Button
          style={{ margin: 12 }}
          variant="contained"
          color="primary"
          endIcon={<AddBoxOutlinedIcon />}
          onClick={handleClickAdd}
        >
          Agregar
        </Button>
      )}
      <BoletaTabla items={items} eliminarFila={eliminarFila} total={totalItems}/>
    </Grid>
  );
}
