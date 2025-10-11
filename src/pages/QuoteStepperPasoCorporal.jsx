import React, { useEffect } from 'react';
import { Box, Typography, FormGroup, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const preguntas = [
  { key: 'danos_frente', label: '¿Daños al frente?' },
  { key: 'danos_trasera', label: '¿Daños en la parte trasera?' },
  { key: 'danos_lado_izq', label: '¿Daños en lateral izquierdo?' },
  { key: 'danos_lado_der', label: '¿Daños en lateral derecho?' },
  { key: 'danos_motor', label: '¿Daños en el motor?' },
  { key: 'inundacion', label: '¿Daños por inundacion?' },
  { key: 'fuego', label: '¿Daños por fuego?' },
  { key: 'bolsas_aire', label: '¿Bolsas de aire rotas?' },
];

export default function PasoCorporal({ value = {}, onChange, onValid }) {
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
        Condición corporal del vehículo
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
