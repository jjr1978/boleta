import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";

function ccyFormat(num) {
  return `$ ${parseFloat(num).toFixed(2)}`;
}

export default function BoletaTabla(props) {
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const data = props.datos;
  const handleClickOpen = (rowId) => {
    setOpen(true);
    setId(rowId);
  };

  const totalItems = () => {
    return data
      ? data.map(({ importe }) => importe).reduce((sum, i) => sum + i, 0)
      : 0;
  };
  const handleCloseElim = () => {
    if (id) {
      props.eliminarFila(id);
    }
    setId();
    setOpen(false);
  };

  const handleCloseCanc = () => {
    setOpen(false);
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
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
            {data
              ? data.map((row) => (
                  <TableRow key={row.codigo}>
                    <TableCell component="th" scope="row">
                      {row.codigo}
                    </TableCell>
                    <TableCell align="right">{row.descripcion}</TableCell>
                    <TableCell align="right">{row.referencia}</TableCell>
                    <TableCell align="right">{row.vencimiento}</TableCell>
                    <TableCell align="right">
                      <span
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          width: "150px",
                          display: "block",
                        }}
                      >
                        {ccyFormat(row.importe)}
                      </span>
                    </TableCell>
                    {/* <TableCell align="right">
                    <EditIcon color="primary" />
                  </TableCell> */}
                    <TableCell align="right">
                      <DeleteIcon
                        color="secondary"
                        onClick={() => handleClickOpen(row.codigo)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              : null}
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell align="right">{ccyFormat(totalItems())}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleCloseCanc}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Eliminar Item"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Está Seguro que quiere eliminar el item seleccionado
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseElim} color="secondary">
            Eliminar
          </Button>
          <Button onClick={handleCloseCanc} color="primary" autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
