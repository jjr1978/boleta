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
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import theme from '../theme';

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

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
  const [expanded, setExpanded] = useState(true);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2020-05-09")
  );
  const [nib, setNib] = React.useState("");
  const [cuit, setCuit] = React.useState("20-26571132-5");
  const [razonSocial, setRazonSocial] = React.useState("Juan Jose Rodriguez");
  const [distrito, setDistrito] = React.useState("");

  const classes = useStyles(theme);

  const handleChange = () => (event, isExpanded) => {
    setExpanded(!expanded);
  };
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
    setExpanded(false);
    setTitulo(cuit + " " + razonSocial + " - " + distrito);
  };

  const handleChangeNib = (event) => {
    setNib(event.target.value);
  };

  const handleChangeCuit = (event) => {
    setCuit(event.target.value);
  };

  return (
    <ExpansionPanel expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography>{titulo}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <form noValidate autoComplete="off">
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
          <TextField id="razonSocial" label="Razón Social"  onChange={handleChangeRazonSocial} value={razonSocial}/>
          <TextField
            id="fecha"
            label="Fecha"
            type="date"
            defaultValue="2020-05-09"
            // onChange={handleChange}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl 
          // className={classes.formControl}
          >
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickSeleccionar}
          >
            Seleccionar
          </Button>
        </form>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
