import React from 'react';
import { Typography, Stack, Card, CardContent, CardActionArea, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

const posts = [
  {
    titulo: '¿Cómo vender tu auto rápido?',
    resumen: 'Consejos para vender tu auto de forma segura y rápida.',
    url: '#',
    imagen: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&q=80',
    contenido: 'Vender tu auto rápido es posible si sigues estos consejos: prepara la documentación, mantén tu auto limpio, toma buenas fotos y cotiza con nosotros para una oferta inmediata.'
  },
  {
    titulo: 'Documentos necesarios para la venta',
    resumen: 'Lista de documentos que necesitas para vender tu auto.',
    url: '#',
    imagen: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=400&q=80',
    contenido: 'Para vender tu auto necesitas: título de propiedad, identificación oficial, comprobante de domicilio y, si aplica, factura original. ¡Consulta con nosotros si tienes dudas!'
  },
  {
  titulo: 'Ventajas de vender a Rodriguez te lo compra!',
    resumen: 'Por qué elegirnos para vender tu auto.',
    url: '#',
    imagen: 'https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?auto=format&fit=crop&w=400&q=80',
  contenido: 'Con Rodriguez te lo compra! obtienes pago inmediato, proceso seguro y sin regateos. Nos encargamos de todo el papeleo y recogemos tu auto donde estés.'
  },
];

export default function Blog() {
  const { t } = useTranslation();
  return (
    <Stack spacing={3}>
      <Typography variant="h4">{t('blog.title')}</Typography>
      <Grid container spacing={2}>
        {posts.map((p, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card>
              <CardActionArea href={p.url}>
                <img src={p.imagen} alt={p.titulo} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
                <CardContent>
                  <Typography variant="h6">{t(p.titulo)}</Typography>
                  <Typography variant="body2" gutterBottom>{t(p.resumen)}</Typography>
                  <Typography variant="body2" color="text.secondary">{t(p.contenido)}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}