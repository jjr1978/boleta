import React from 'react';

export default function BoletaFinalizar({contribuyente, items, total}){

  return (
    <div>
      CUIL: {contribuyente.cuit}
      {total}
    </div>
  )

} 