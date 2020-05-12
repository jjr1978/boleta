import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { items } from "../store/store";
import { TextField, Button, makeStyles, Paper, Box, Container } from "@material-ui/core";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";

export default function AltaItem(props) {
  const [item, setItem] = useState({
    id: 5,
    codigo: "",
    descripcion: "",
    referencia: "",
    importe: 0,
    vencimiento: "12/05/2020",
  });

  const handleClickAgregar = () => {
    props.handleAltaItem(item);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: name === "importe" ? parseInt(value) : value });
  };

  const setItemValue = (nuevoCodItem) => {
    setItem({
      ...item,
      id: nuevoCodItem.codigo,
      codigo: nuevoCodItem.codigo,
      descripcion: nuevoCodItem.descripcion,
    });
  };

  return (
    <Box  border={1} borderColor="primary.main" borderRadius={10} p={3}>
      <Box>
        <Autocomplete
          name="itemCodAC"
          id="itemCodAC"
          options={items}
          size="small"
          getOptionLabel={(option) =>
            option.codigo + " - " + option.descripcion
          }
          style={{ width: 600 }}
          onChange={(event, newValue) => {
            setItemValue(newValue);
          }}
          value={item.itemCod}
          renderInput={(params) => (
            <TextField {...params} label="Item" variant="outlined" />
          )}
        />
        <TextField
          name="referencia"
          label="Referencia"
          id="referencia"
          value={item.referencia}
          onChange={handleChange}
        />
        <TextField
          name="importe"
          label="Importe"
          id="importe"
          type="number"
          value={item.importe}
          onChange={handleChange}
        />
        <TextField
          id="vencimiento"
          name="vencimiento"
          label="Fecha"
          type="date"
          defaultValue="2017-05-24"
          onChange={handleChange}
        />
      </Box>
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickAgregar}
          endIcon={<AddBoxOutlinedIcon />}
        >
          Agregar
        </Button>
      </Box>
    </Box>
  );
}
