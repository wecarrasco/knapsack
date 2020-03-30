import React from 'react';
import { Grid } from '@material-ui/core';

const Package = ({ nombre, valor, cantidad }) => {
  return (
    <Grid item>
      <div className="package">
        <img
          width="80px"
          src="https://i.ibb.co/Nt6hfxf/misc-contraband.png"
          alt="Package"
        />
        <h2>Nombre: {nombre}</h2>
        <h2>Valor: L. {valor}</h2>
        <h2>Cantidad: {cantidad}</h2>
      </div>
    </Grid>
  );
};

export default Package;
