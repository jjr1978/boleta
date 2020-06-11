import React from "react";
import {
  makeStyles,
  Typography,
  Button,
  CardHeader,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

const getTitulo = (contribuyente) => {
  return (
    "CUIT: " +
    contribuyente.cuit +
    " - Razon Social:" +
    contribuyente.razonSocial
  );
};

function ccyFormat(num) {
  return `$ ${parseFloat(num).toFixed(2)}`;
}

export default function BoletaFinalizar({ contribuyente, items, totalItems }) {
  const classes = useStyles();
  console.log(totalItems);
  return (
    <Card>
      <CardHeader title={getTitulo(contribuyente)} />

      <CardContent>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="right">Precio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  {item.descripcion}
                </TableCell>
                <TableCell align="right">{ccyFormat(item.importe)}</TableCell>
              </TableRow>
            ))}
              <TableRow key='total'>
                <TableCell component="th" scope="row" align="right">
                  <strong>Total</strong>
                </TableCell>
                <TableCell align="right">{ccyFormat(totalItems())}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
