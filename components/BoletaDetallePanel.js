import React, { useState } from "react";
import {  Grid, Button } from "@material-ui/core";
import BoletaTabla from "../components/BoletaTabla";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import AltaItem from "../components/AltaItem";

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export default function BoletaDetallePanel({
  handleAltaItem,
  handleEliminarItem,
  items,
  totalItems,
  errores,
}) {
  const [mostrarAltaItem, setMostrarAltaItem] = useState(false);

  const handleClickAdd = () => {
    setMostrarAltaItem(true);
  };

  const nuevaFila = (item) => {
    if (item) {
      let maxId = 0;
      if (!isEmpty(items)) {
        maxId = Math.max.apply(
          null,
          items.map((it) => it.id)
        );
      }
      const nuevoId = maxId + 1;
      item["id"] = nuevoId;
      handleAltaItem(item);
    }
    setMostrarAltaItem(false);
  };

  const eliminarFila = (id) => {
    handleEliminarItem(id);
  };

  const getConceptoBoleta = () => {
    return [...new Set(items.map(item => item.concepto))];
  }

  return (
    <Grid>
      {mostrarAltaItem ? (
        <AltaItem open={true} handleAltaItem={nuevaFila} conceptos={getConceptoBoleta()}/>
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
      <BoletaTabla
        items={items}
        eliminarFila={eliminarFila}
        total={totalItems}
        errores={errores}
      />
    </Grid>
  );
}
