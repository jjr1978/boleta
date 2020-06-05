import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
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
} from "@material-ui/core";

function ccyFormat(num) {
  return `$ ${parseFloat(num).toFixed(2)}`;
}

export default function BoletaTabla({ items, total, eliminarFila }) {
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(0);

  const handleClickOpen = (rowId) => {
    setOpen(true);
    setId(rowId);
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
                  <ListItemText secondary={ccyFormat(row.importe)} key={row.referencia} >
                    {row.descripcion} - Ref:{row.referencia} - Venc.:{" "}
                    {row.vencimiento}
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon onClick={() => handleClickOpen(row.codigo)} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            ))}
            <ListItem >
              <Typography align="right" color="textPrimary" variant="h5">
              Total: {ccyFormat(total())} 
              </Typography> 
              </ListItem>
          </>
        ) : (
          <></>
        )}
      </List>
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
