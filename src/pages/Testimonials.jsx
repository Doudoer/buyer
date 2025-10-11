import React from 'react';
import { Typography, Stack, Card, CardContent, Avatar, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

const testimonios = [
  {
    nombre: 'testimonials.1.name',
    texto: 'testimonials.1.text',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    nombre: 'testimonials.2.name',
    texto: 'testimonials.2.text',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    nombre: 'testimonials.3.name',
    texto: 'testimonials.3.text',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg'
  },
];

export default function Testimonios() {
  const { t } = useTranslation();
  return (
    <Stack spacing={3}>
      <Typography variant="h4">{t('testimonials.title')}</Typography>
      <Grid container spacing={2}>
        {testimonios.map((t, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card>
              <CardContent>
                <Stack spacing={1} alignItems="center">
                  <Avatar src={t.avatar} alt={t(t.nombre)} />
                  <Typography variant="subtitle1">{t(t.nombre)}</Typography>
                  <Typography variant="body2" align="center">"{t(t.texto)}"</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}