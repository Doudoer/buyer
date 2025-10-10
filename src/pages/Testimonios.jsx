import React from 'react';
import { Typography, Stack, Card, CardContent, Avatar, Grid } from '@mui/material';

const testimonios = [
  {
    nombre: 'Juan Pérez',
    texto: 'Vendí mi auto en un día, ¡excelente servicio! El proceso fue muy sencillo y el pago inmediato.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    nombre: 'Ana Gómez',
    texto: 'Muy fácil y rápido, lo recomiendo. Me ayudaron con todo el papeleo y fueron muy amables.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    nombre: 'Carlos Ruiz',
    texto: 'Me pagaron al instante y sin complicaciones. Sin duda volvería a venderles otro auto.',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg'
  },
];

export default function Testimonios() {
  return (
    <Stack spacing={3}>
      <Typography variant="h4">Testimonios de Clientes</Typography>
      <Grid container spacing={2}>
        {testimonios.map((t, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card>
              <CardContent>
                <Stack spacing={1} alignItems="center">
                  <Avatar src={t.avatar} alt={t.nombre} />
                  <Typography variant="subtitle1">{t.nombre}</Typography>
                  <Typography variant="body2" align="center">"{t.texto}"</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}