import React from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Faq() {
  return (
    <Stack spacing={3}>
      <Typography variant="h4" component="h2">Preguntas Frecuentes</Typography>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          ¿Cómo funciona el proceso de venta?
        </AccordionSummary>
        <AccordionDetails>
          Nos envías los datos de tu auto, te damos una cotización y si aceptas, coordinamos la entrega y pago.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          ¿Cuánto tiempo tarda la venta?
        </AccordionSummary>
        <AccordionDetails>
          El proceso puede completarse en el mismo día si tienes toda la documentación lista.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          ¿Qué documentos necesito?
        </AccordionSummary>
        <AccordionDetails>
          Título de propiedad, identificación oficial y comprobante de domicilio.
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}