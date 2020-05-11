import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { items } from "../store/store";
import {
  TextField,
  Button,
  makeStyles,
  Paper,
} from "@material-ui/core";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
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

export default function AltaItem(props) {
  const [item, setItem] = useState({
    itemCod: "",
    referencia: "",
    importe: "",
    fecha: "",
  });
  const classes = useStyles();

  const handleClickAgregar = () => {
    props.handleAltaItem(item);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  return (
    <Paper variant="outlined" elevation="2">
      <Autocomplete
        id="itemCod"
        options={items}
        size="small"
        getOptionLabel={(option) => option.codigo + " - " + option.descripcion}
        style={{ width: 600 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Item"
            value={item.itemCod}
            onChange={handleChange}
          />
        )}
      />
      <TextField label="Referencia" id="referencia" value={item.referencia} />
      <TextField label="Importe" id="importe" value={item.importe} />
      <TextField
        id="fecha"
        label="Fecha"
        type="date"
        defaultValue="2020-05-09"
        value={item.fecha}
        onChange={handleChange}
        // onChange={handleChange}
      />
      <Button
        variant="contained"
        color="primary"
        // className={classes.button}
        onClick={handleClickAgregar}
        endIcon={<AddBoxOutlinedIcon />}
      >
        Agregar
      </Button>
    </Paper>
  );
}
