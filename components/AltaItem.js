import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { items } from "../store/store";
import {
  TextField,
  Button,
  makeStyles,
  Box,
  Container,
  Dialog,
  DialogTitle,
} from "@material-ui/core";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles({
  option: {
    fontSize: 12,
    "& > span": {
      marginRight: 10,
      fontSize: 14,
    },
  },
  campos: {
    paddingLeft: "1em",
    paddingRight: "1em",
  },
});

export default function AltaItem(props) {
  const classes = useStyles();

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

  const handleClickCancelar = () => {
    props.handleAltaItem();
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]:/* name === "importe" ? parseInt(value) : */value });
  };

  const setItemValue = (nuevoCodItem) => {
    setItem({
      ...item,
      id: nuevoCodItem.codigo,
      codigo: nuevoCodItem.codigo,
      descripcion: nuevoCodItem.descripcion,
    });
  };

  const setImporte = (nuevoValor) => {
    const valor = parseFloat(nuevoValor).toFixed(2)
    setItem({...item,'importe':valor})
  }

  return (
    <Dialog
      open={props.open}
      aria-labelledby="form-dialog-title"
      maxWidth="lg"
    >
      <DialogTitle id="form-dialog-tiulo">Ingrese Item</DialogTitle>
      <Container>
        <Autocomplete
          name="itemCodAC"
          id="itemCodAC"
          classes={{
            option: classes.option,
          }}
          options={items}
          autoHighlight
          size="small"
          getOptionLabel={(option) =>
            option.codigo + " - " + option.descripcion
          }
          onChange={(event, newValue) => {
            setItemValue(newValue);
          }}
          value={item.itemCod}
          renderInput={(params) => (
            <TextField {...params} label="Item" variant="outlined" />
          )}
        />
        <TextField
          style={{ margin: 24 }}
          name="referencia"
          label="Referencia"
          id="referencia"
          value={item.referencia}
          onChange={handleChange}
          required
        />
        <CurrencyTextField
          style={{ margin: 24 }}
          label="Precio "
          variant="standard"
          //value={item.importe}
          currencySymbol="$"
          // minimumValue="0"
          outputFormat="number"
          decimalCharacter=","
          digitGroupSeparator="."
          onChange={(event,value)=>setImporte(value)}
          id="importe"
          name="importe"
          // classes={{
          //   campos: classes.campos,
          // }}
        />
        {/* <TextField
          name="importe"
          label="Importe"
          id="importe"
          type="number"
          value={item.importe}
          onChange={handleChange}
        /> */}
        <TextField
          style={{ margin: 24 }}
          id="vencimiento"
          name="vencimiento"
          label="Fecha"
          type="date"
          defaultValue="2017-05-24"
          onChange={handleChange}
        />

        <Box mt={2}>
          <Button
            style={{ margin: 24 }}
            variant="contained"
            color="primary"
            onClick={handleClickAgregar}
            endIcon={<AddBoxOutlinedIcon />}
          >
            Agregar
          </Button>
          <Button
            style={{ margin: 24 }}
            variant="contained"
            onClick={handleClickCancelar}
            endIcon={<CancelIcon />}
          >
            Cancelar
          </Button>
        </Box>
      </Container>
    </Dialog>
  );
}
