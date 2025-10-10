import React from 'react';
import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Rodriguez te lo compra!
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit" component={Link} to="/">Inicio</Button>
          <Button color="inherit" component={Link} to="/cotizar">Cotizar</Button>
          <Button color="inherit" component={Link} to="/testimonios">Testimonios</Button>
          <Button color="inherit" component={Link} to="/blog">Blog</Button>
          <Button color="inherit" component={Link} to="/contacto">Contacto</Button>
          <Button color="inherit" component={Link} to="/faq">FAQ</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}