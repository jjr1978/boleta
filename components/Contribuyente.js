import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaskedInput from "react-text-mask";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Input,
  Box,
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

export default function Contribuyente(props) {
  const [titulo, setTitulo] = useState("Ingrese los datos del Contribuyente");
  // const [expanded, setExpanded] = useState(props.expanded);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2020-05-09")
  );
  const [nib, setNib] = React.useState("");
  const [cuit, setCuit] = React.useState("20-26571132-5");
  const [razonSocial, setRazonSocial] = React.useState("Juan Jose Rodriguez");
  const [distrito, setDistrito] = React.useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChangeDistrito = (event) => {
    setDistrito(event.target.value);
  };

  const handleChangeRazonSocial = (event) => {
    setRazonSocial(event.target.value);
  };

  const handleClickSeleccionar = () => {
    setTitulo(cuit + " " + razonSocial + " - " + distrito);
    props.handleExpanded("boleta");
  };

  const handleChangeNib = (event) => {
    setNib(event.target.value);
  };

  const handleChangeCuit = (event) => {
    setCuit(event.target.value);
  };

  return (
    <Box >
      <ExpansionPanel expanded={props.expanded} >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          // aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography>{titulo}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <form noValidate autoComplete="off">
            <Box>
              <FormControl>
                <InputLabel htmlFor="nib">NIB</InputLabel>
                <Input
                  value={nib}
                  onChange={handleChangeNib}
                  name="nib"
                  id="nib"
                  inputComponent={TextMaskNIB}
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="nib">CUIT</InputLabel>
                <Input
                  value={cuit}
                  onChange={handleChangeCuit}
                  id="cuit"
                  name="cuit"
                  label="CUIT"
                  inputComponent={TextMaskCUIT}
                />
              </FormControl>
              <TextField
                id="razonSocial"
                label="Razón Social"
                onChange={handleChangeRazonSocial}
                value={razonSocial}
              />
              <TextField
                id="fecha"
                label="Fecha"
                type="date"
                defaultValue="2020-05-09"
                // onChange={handleChange}

                // InputLabelProps={{
                //   shrink: true,
                // }}
              />
              <FormControl>
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
              </FormControl>
            </Box>
            <Box pt={1}>
              <FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClickSeleccionar}
                >
                  Seleccionar
                </Button>
              </FormControl>
            </Box>
          </form>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Box>
  );
}
