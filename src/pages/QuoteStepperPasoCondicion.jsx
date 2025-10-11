import React, { useEffect } from 'react';
import { Box, Typography, FormGroup, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const preguntas = [
  { key: 'enciende', label: '¿El vehiculo enciende?' },
  { key: 'neumaticos_aire', label: '¿Los neumáticos tienen aire?' },
  { key: 'todos_neumaticos', label: '¿El vehiculo tiene todos los neumaticos?' },
  { key: 'catalizadores', label: '¿El vehiculo tiene catalizadores?' },
  { key: 'titulo', label: '¿El vehiculo tiene titulo?' },
  { key: 'llave', label: '¿Dispone de la llave?' },
];

export default function PasoCondicion({ value = {}, onChange, onValid }) {
  useEffect(() => {
    // Validar que todas las preguntas tengan respuesta (true/false)
    const valid = preguntas.every(q => typeof value[q.key] === 'boolean');
    onValid(valid);
  }, [value, onValid]);

  const handleRadio = (key) => (e) => {
    onChange({ ...value, [key]: e.target.value === 'true' });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Condiciones del vehículo
      </Typography>
      <FormGroup>
        {preguntas.map((q) => (
          <Box key={q.key} sx={{ mb: 2 }}>
            <Typography>{q.label}</Typography>
            <RadioGroup
              row
              value={typeof value[q.key] === 'boolean' ? String(value[q.key]) : ''}
              onChange={handleRadio(q.key)}
            >
              <FormControlLabel value="true" control={<Radio color="primary" />} label="Sí" />
              <FormControlLabel value="false" control={<Radio color="primary" />} label="No" />
            </RadioGroup>
          </Box>
        ))}
      </FormGroup>
    </Box>
  );
}
