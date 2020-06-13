import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaskedInput from "react-text-mask";
import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Input,
  Grid,
} from "@material-ui/core";

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

function getFechaHoy() {
  let d = new Date(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export default function Contribuyente({ handleContribuyente, contribuyente, errores }) {
  const [titulo, setTitulo] = useState("Ingrese los datos del Contribuyente");
  const [selectedDate, setSelectedDate] = React.useState({});
  // const [nib, setNib] = React.useState("");
  const [cuit, setCuit] = React.useState("");
  const [razonSocial, setRazonSocial] = React.useState("");
 // const [distrito, setDistrito] = React.useState("");

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    handleContribuyente("fecha", event.target.value);
  };

 /* const handleChangeDistrito = (event) => {
    setDistrito(event.target.value);
    handleContribuyente("distrito", event.target.value);
  };
*/
  const handleChangeRazonSocial = (event) => {
    setRazonSocial(event.target.value);
    handleContribuyente("razonSocial", event.target.value);
  };

  // const handleChangeNib = (event) => {
  //   setNib(event.target.value);
  //   handleContribuyente("nib", event.target.value);
  // };

  const handleChangeCuit = (event) => {
    setCuit(event.target.value);
    handleContribuyente("cuit", event.target.value);
  };

  const validarCampo = (campo) => {
    return campo in errores;
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={3}>
        <InputLabel htmlFor="nib">CUIT</InputLabel>
        <Input
          value={contribuyente.cuit}
          onChange={handleChangeCuit}
          id="cuit"
          name="cuit"
          required={true}
          label="CUIT"
          inputComponent={TextMaskCUIT}
          error={validarCampo("cuit")}
        />
        <InputLabel error>{errores["cuit"]}</InputLabel>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="razonSocial"
          label="Razón Social"
          onChange={handleChangeRazonSocial}
          value={contribuyente.razonSocial}
          required={true}
          fullWidth
          error={validarCampo("razonSocial")}
        />
        <InputLabel error>{errores["razonSocial"]}</InputLabel>
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          id="fecha"
          label="Fecha"
          type="date"
          value={contribuyente.fecha}
          onChange={handleDateChange}
          required={true}
          error={validarCampo("fecha")}
        />
        <InputLabel error>{errores["fecha"]}</InputLabel>
      </Grid>

      {/* <Grid item xs={12} sm={6}>
        <InputLabel id="distrito-label">Distrito</InputLabel>
        <Select
          labelId="distrito-label"
          id="distrito"
          value={contribuyente.distrito?contribuyente.distrito:"USH"}
          onChange={handleChangeDistrito}
          width="30"
          error={validarCampo("distrito")}
        >
          <MenuItem value={"USH"}>Ushuaia</MenuItem>
          <MenuItem value={"RGR"}>Rio Grande</MenuItem>
          <MenuItem value={"BUE"}>Buenos Aires</MenuItem>
        </Select>
        <InputLabel error>{errores["distrito"]}</InputLabel> 
  </Grid> */}
    </Grid>
  );
}
