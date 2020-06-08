import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaskedInput from "react-text-mask";
import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Input,
  Box,
  Grid,
  InputAdornment,
  InputBase,
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function TextMaskNIB(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
      ]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

function TextMaskCUIT(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
      ]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

export default function Contribuyente({ handleContribuyente }) {
  const [titulo, setTitulo] = useState("Ingrese los datos del Contribuyente");
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2020-05-09")
  );
  const [nib, setNib] = React.useState("");
  const [cuit, setCuit] = React.useState("20-26571132-5");
  const [razonSocial, setRazonSocial] = React.useState("Juan Jose Rodriguez");
  const [distrito, setDistrito] = React.useState("");

  const [errores, setErrores] = React.useState({});

  const handleDateChange = (date) => {
    setSelectedDate(date);
    handleContribuyente("fecha", date);
  };

  const handleChangeDistrito = (event) => {
    setDistrito(event.target.value);
    handleContribuyente("distrito", event.target.value);
  };

  const handleChangeRazonSocial = (event) => {
    setRazonSocial(event.target.value);
    handleContribuyente("razonSocial", event.target.value);
  };

  const handleChangeNib = (event) => {
    setNib(event.target.value);
    handleContribuyente("nib", event.target.value);
  };

  const handleChangeCuit = (event) => {
    setCuit(event.target.value);
    handleContribuyente("cuit", event.target.value);
  };

  const validarFormulario = () => {
    erroresCampos = {};
    if (!nib) return (erroresCampos["nib"] = "Se debe ingresa el NIB");
    setErrores(erroresCampos);
  };

  const validarCampo= (campo)=>{
    return (campo in errores);
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <InputLabel htmlFor="nib">NIB</InputLabel>
        <Input
          value={nib}
          onChange={handleChangeNib}
          name="nib"
          id="nib"
          inputComponent={TextMaskNIB}
          error={validarCampo('nib')}
        />
        <InputLabel error>Debe ingresar el NIB</InputLabel>
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputLabel htmlFor="nib">CUIT</InputLabel>
        <Input
          value={cuit}
          onChange={handleChangeCuit}
          id="cuit"
          name="cuit"
          label="CUIT"
          inputComponent={TextMaskCUIT}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="razonSocial"
          label="Razón Social"
          onChange={handleChangeRazonSocial}
          value={razonSocial}
          required={true}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="fecha"
          label="Fecha"
          type="date"
          defaultValue="2020-05-09"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <InputLabel id="distrito-label">Distrito</InputLabel>
        <Select
          labelId="distrito-label"
          id="distrito"
          value={distrito}
          onChange={handleChangeDistrito}
          width="30"
        >
          <MenuItem value={"USH"}>Ushuaia</MenuItem>
          <MenuItem value={"RGR"}>Rio Grande</MenuItem>
          <MenuItem value={"BUE"}>Buenos Aires</MenuItem>
        </Select>
      </Grid>
    </Grid>
  );
}
