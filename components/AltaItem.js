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
  InputLabel,
} from "@material-ui/core";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import CancelIcon from "@material-ui/icons/Cancel";

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

function getFechaHoy() {
  let d = new Date(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
}

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export default function AltaItem({ open, handleAltaItem }) {
  const classes = useStyles();

  const [item, setItem] = useState({
    id: 5,
    codigo: "",
    descripcion: "",
    referencia: "",
    importe: 0,
    vencimiento: "",
  });

  const [errores, setErrores] = useState({});

  const validarFormulario = () => {
    let erroresCampos = {};
    console.log(item.codigo);
    if (!item.codigo || item.codigo === "") {
      erroresCampos["codigo"] = "Se debe seleccionar un item";
    }
    if (!item.referencia) {
      erroresCampos["referencia"] = "Se debe ingresar una referencia";
    }
    if (!item.importe) {
      erroresCampos["importe"] = "Se debe ingresar un importe";
    } else if (parseFloat(item.importe) <= 0) {
      erroresCampos["importe"] = "El importe debe ser mayor que 0";
    }

    if (!item.vencimiento) {
      erroresCampos["vencimiento"] =
        "Se debe ingresar una fecha de Vencimiento";
    } else if (item.vencimiento < getFechaHoy()) {
      erroresCampos["vencimiento"] =
        "La fecha debe posterior al día de la fecha";
    }
    setErrores(erroresCampos);
    console.log("erroresCampos", erroresCampos);
    return isEmpty(erroresCampos);
  };

  const handleClickAgregar = () => {
    if (validarFormulario()) {
      handleAltaItem(item);
    }
  };

  const handleClickCancelar = () => {
    handleAltaItem();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem({
      ...item,
      [name]: /* name === "importe" ? parseInt(value) : */ value,
    });
  };

  const setItemValue = (nuevoCodItem) => {
    setItem({
      ...item,
      codigo: nuevoCodItem.codigo,
      descripcion: nuevoCodItem.descripcion,
    });
  };

  const setImporte = (nuevoValor) => {
    const valor = parseFloat(nuevoValor).toFixed(2);
    setItem({ ...item, importe: valor });
  };

  const validarCampo = (campo) => {
    return campo in errores;
  };

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="lg">
      <DialogTitle id="form-dialog-tiulo">Ingrese Item</DialogTitle>
      <Container>
        <form noValidate autoComplete="off">
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
              <TextField
                {...params}
                label="Item"
                variant="outlined"
                error={validarCampo("codigo")}
                helperText={errores["codigo"]}
              />
            )}
          />
          <InputLabel error></InputLabel>

          <TextField
            style={{ margin: 24 }}
            name="referencia"
            label="Referencia"
            id="referencia"
            value={item.referencia}
            onChange={handleChange}
            required
            error={validarCampo("referencia")}
            helperText={errores["referencia"]}
            autoComplete="off"
          />

          <CurrencyTextField
            style={{ margin: 24 }}
            label="Importe "
            variant="standard"
            //value={item.importe}
            currencySymbol="$"
            // minimumValue="0"
            outputFormat="number"
            decimalCharacter=","
            digitGroupSeparator="."
            onChange={(event, value) => setImporte(value)}
            id="importe"
            name="importe"
            autoComplete="off"
            error={validarCampo("importe")}
            helperText={errores["importe"]}
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
            autoComplete="off"
            type="date"
            onChange={handleChange}
            error={validarCampo("vencimiento")}
            helperText={errores["vencimiento"]}
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
        </form>
      </Container>
    </Dialog>
  );
}
