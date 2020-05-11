import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Contribuyente from '../components/Contribuyente';
import BoletaDetallePanel from '../components/BoletaDetallePanel';
import theme from '../theme';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

export default function ControlledExpansionPanels() {
  const classes = useStyles(theme);
  const [, setExpanded] = React.useState(false);


  return (
    <div 
    className={classes.root}
    >
      <Contribuyente expanded="true"/>
      <BoletaDetallePanel />
    </div>
  );
}
