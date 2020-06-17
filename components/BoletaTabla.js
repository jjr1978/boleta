import React from "react";
import AltaItem from "../components/AltaItem";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Typography,
  Collapse,
} from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";

function ccyFormat(num) {
  return `$ ${parseFloat(num).toFixed(2)}`;
}

function dateFormat(fecha) {
  return "";
}

export default function BoletaTabla({ items, total, eliminarFila }) {
  const [open, setOpen] = React.useState(false);
  const [openAltaItem, setOpenAltaItem] = React.useState(false);
  const [id, setId] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(false);

  const mostrarAlert = () => {
    if (total() === 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleClickOpen = (id) => {
    setOpen(true);
    setId(id);
  };

  const handleClickEdit = (id) => {
    setOpenAltaItem(true);
  };

  const handleCloseElim = () => {
    if (id) {
      eliminarFila(id);
    }
    setId();
    setOpen(false);
  };

  const handleCloseCanc = () => {
    setOpen(false);
  };

  return (
    <>
      <List dense={true}>
        {items ? (
          <>
            {items.map((row) => (
              <>
                <ListItem>
                  <ListItemText secondary={ccyFormat(row.importe)} key={row.id}>
                    {row.descripcion} - [{row.referencia}]
                  </ListItemText>
                  <ListItemSecondaryAction>
                    {/* <IconButton edge="start" aria-label="edit">
                      <EditIcon onClick={() => handleClickEdit(row.id)} />
                    </IconButton> */}
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon onClick={() => handleClickOpen(row.id)} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            ))}
            <ListItem>
              <Typography align="right" color="textPrimary" variant="h5">
                Total: {ccyFormat(total())}
              </Typography>
            </ListItem>
          </>
        ) : (
          <></>
        )}
      </List>
      <Collapse in={mostrarAlert()}>
        <Alert
          severity="waring"
          // action={
          // <IconButton
          //   aria-label="close"
          //   color="inherit"
          //   onClick={() => {
          //     cerrarAlert();
          //   }}
          // >
          //   <CloseIcon fontSize="inherit" />
          // </IconButton>
          // }
        >
          Se deben cargar items para generar la boleta
        </Alert>
      </Collapse>
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
    </>
  );
}
