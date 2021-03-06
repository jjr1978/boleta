import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { items } from "../store/store";
import { tipos_tramite } from "../store/store";
import {
  TextField,
  Button,
  makeStyles,
  Box,
  Container,
  Dialog,
  DialogTitle,
  Select,
  MenuItem,
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

export default function AltaItem({ open, handleAltaItem, conceptos }) {
  const classes = useStyles();

  const [item, setItem] = useState({
    id: 5,
    codigo: "",
    descripcion: "",
    referencia: "",
    importe: 0,
    vencimiento: "",
    tramite: 0,
    tramitecantidad: 0,
  });

  const [errores, setErrores] = useState({});

  const validarFormulario = () => {
    let erroresCampos = {};
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
    if (item.multinota === 1) {
      if (!item.tramite || item.tramite === 0) {
        erroresCampos["tramite"] = "Se debe ingresar el trámite";
      }
      if (!item.tramitecantidad) {
        erroresCampos["tramitecantidad"] = "Se debe ingresar la cantidad";
      }
    }
    // if (!item.vencimiento) {
    //   erroresCampos["vencimiento"] =
    //     "Se debe ingresar una fecha de Vencimiento";
    // } else if (item.vencimiento < getFechaHoy()) {
    //   erroresCampos["vencimiento"] =
    //     "La fecha debe posterior al día de la fecha";
    // }
    setErrores(erroresCampos);
    return isEmpty(erroresCampos);
  };

  const filtarItems = () => {};

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
      [name]: name === "cantidad" ? parseInt(value) : value,
    });
  };

  const setItemValue = (nuevoCodItem) => {
    if (nuevoCodItem) {
      setItem({
        ...item,
        codigo: nuevoCodItem.cod_tipo_pago,
        descripcion: nuevoCodItem.tipo_pago,
        multinota: nuevoCodItem.multinota,
        concepto: nuevoCodItem.cod_concepto,
      });
    }
  };

  const setImporte = (nuevoImporte) => {
    const importe = parseFloat(nuevoImporte).toFixed(2);
    setItem({ ...item, importe: importe });
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
            options={
              conceptos && conceptos.length > 0
                ? items.filter((item) => conceptos.includes(item.cod_concepto))
                : items
            }
            autoHighlight
            size="small"
            getOptionLabel={(option) =>
              option.cod_tipo_pago + " - " + option.tipo_pago
            }
            onChange={(event, newValue) => {
              setItemValue(newValue);
            }}
            // value={item.codigo}
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

          {item.multinota === 1 ? (
            <>
              <InputLabel id="tramite-label">Tipo Trámite</InputLabel>
              <Select
                labelId="tramite-label"
                id="tramite"
                name="tramite"
                value={item.tramite}
                onChange={handleChange}
                error={validarCampo("tramite")}
                fullWidth
              >
                <MenuItem value="0">
                  <em>Seleccione Trámite</em>
                </MenuItem>
                {tipos_tramite
                  .filter((tipo) => tipo.cod_tipo_pago === item.codigo)
                  .map((tipo) => (
                    <MenuItem value={tipo.id_tipo_tramite}>
                      {tipo.descripcion}- $ {tipo.importe}
                    </MenuItem>
                  ))}
              </Select>
              <TextField
                id="tramitecantidad"
                label="Cantidad"
                name="tramitecantidad"
                type="Number"
                value={item.tramitecantidad}
                onChange={handleChange}
                error={validarCampo("tramitecantidad")}
              />
            </>
          ) : (
            <></>
          )}

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
          />

          {/* <TextField
            style={{ margin: 24 }}
            id="vencimiento"
            name="vencimiento"
            label="Fecha"
            autoComplete="off"
            type="date"
            onChange={handleChange}
            error={validarCampo("vencimiento")}
            helperText={errores["vencimiento"]}
          /> */}

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
