import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { boletaEjemplo } from "../store/store";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  button: {
    margin: '1em',
  },
});

const rows = boletaEjemplo.items;

export default function DenseTable() {
  const classes = useStyles();

  return (

      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell align="center">Detalle</TableCell>
              <TableCell align="center">Referencia</TableCell>
              <TableCell align="right">Vencimiento</TableCell>
              <TableCell align="right">Importe</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.codigo}
                </TableCell>
                <TableCell align="right">{row.descripcion}</TableCell>
                <TableCell align="right">{row.referencia}</TableCell>
                <TableCell align="right">{row.vencimiento}</TableCell>
                <TableCell align="right">{row.importe}</TableCell>
                <TableCell align="right"><EditIcon color="primary"/></TableCell>
                <TableCell align="right"><DeleteIcon color="secondary"/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

  );
}
