import React from "react";
import Contribuyente from "../components/Contribuyente";
import BoletaDetallePanel from "../components/BoletaDetallePanel";

export default function ControlledExpansionPanels() {
  const [expanded, setExpanded] = React.useState("contribuyente");

  const handlePanel = (panel)=>{
    setExpanded(panel);
    console.log("expandend",expanded)
  }

  return (
    <div>
      <Contribuyente expanded={expanded==='contribuyente'} handleExpanded={handlePanel}/>
      <BoletaDetallePanel expanded={expanded==='boleta'} handleExpanded={handlePanel}/>
    </div>
  );
}
