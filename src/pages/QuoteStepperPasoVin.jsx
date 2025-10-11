import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Divider, Switch, FormControlLabel, MenuItem, CircularProgress, Alert } from '@mui/material';
import { decodeVin } from '../utils/vinDecoder';
import { getMakesForYear, getModelsForMakeYear } from '../utils/nhtsaApi';

export default function PasoVin({ value, onChange, onValid }) {
  const [vin, setVin] = useState(value?.vin || '');
  const [vinData, setVinData] = useState(null);
  const [vinError, setVinError] = useState('');
  const [manual, setManual] = useState(value?.manual || false);
  const [manualData, setManualData] = useState({
    year: value?.year || '',
    make: value?.make || '',
    model: value?.model || '',
  });
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);

  // Validar VIN en tiempo real
  const handleVinChange = async (e) => {
    const v = e.target.value.toUpperCase();
    setVin(v);
    setVinError('');
    setVinData(null);
    if (v.length === 17) {
      setLoading(true);
      try {
        const data = await decodeVin(v);
        if (data.marca && data.modelo && data.ano) {
          setVinData(data);
          setVinError('');
          onChange({ vin: v, ...data, manual: false });
          onValid(true);
        } else {
          setVinError('No se pudo obtener información del VIN.');
          onValid(false);
        }
      } catch (err) {
        setVinError('Error al decodificar el VIN.');
        onValid(false);
      }
      setLoading(false);
    } else {
      onValid(false);
    }
  };

  // Cambiar a modo manual
  const handleManualSwitch = (e) => {
    setManual(e.target.checked);
    setVin('');
    setVinData(null);
    setVinError('');
    onChange({ manual: e.target.checked });
    onValid(false);
  };

  // Selección manual: año
  const handleYearChange = async (e) => {
    const year = e.target.value;
    setManualData((d) => ({ ...d, year, make: '', model: '' }));
    setMakes([]);
    setModels([]);
    onChange({ ...manualData, year });
    onValid(false);
    if (year) {
      setLoading(true);
      const ms = await getMakesForYear(year);
      setMakes(ms);
      setLoading(false);
    }
  };

  // Selección manual: marca
  const handleMakeChange = async (e) => {
    const make = e.target.value;
    setManualData((d) => ({ ...d, make, model: '' }));
    setModels([]);
    onChange({ ...manualData, make });
    onValid(false);
    if (manualData.year && make) {
      setLoading(true);
      const mods = await getModelsForMakeYear(make, manualData.year);
      setModels(mods);
      setLoading(false);
    }
  };

  // Selección manual: modelo
  const handleModelChange = (e) => {
    const model = e.target.value;
    setManualData((d) => ({ ...d, model }));
    onChange({ ...manualData, model });
    if (manualData.year && manualData.make && model) {
      onValid(true);
    } else {
      onValid(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Ingresa el VIN del vehículo a cotizar
      </Typography>
      <FormControlLabel
        control={<Switch checked={manual} onChange={handleManualSwitch} />}
        label="No tengo el VIN, ingresar datos manualmente"
      />
      {!manual && (
        <Box sx={{ mt: 2 }}>
          <TextField
            label="VIN"
            value={vin}
            onChange={handleVinChange}
            inputProps={{ maxLength: 17 }}
            fullWidth
            autoFocus
            helperText="Debe tener 17 caracteres"
            error={!!vinError}
          />
          {loading && <CircularProgress size={24} sx={{ mt: 2 }} />}
          {vinError && <Alert severity="error" sx={{ mt: 2 }}>{vinError}</Alert>}
          {vinData && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">Datos detectados:</Typography>
              <ul>
                <li>Año: {vinData.ano}</li>
                <li>Marca: {vinData.marca}</li>
                <li>Modelo: {vinData.modelo}</li>
                <li>Motor: {vinData.motor_litraje}L, {vinData.motor_cilindros} cilindros</li>
                <li>Transmisión: {vinData.transmision_atmt} ({vinData.transmision_tipo})</li>
                <li>Tracción: {vinData.traccion}</li>
              </ul>
            </Box>
          )}
        </Box>
      )}
      {manual && (
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Año"
            value={manualData.year}
            onChange={handleYearChange}
            select
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="">Selecciona año</MenuItem>
            {Array.from({ length: 30 }, (_, i) => {
              const y = new Date().getFullYear() - i;
              return <MenuItem key={y} value={y}>{y}</MenuItem>;
            })}
          </TextField>
          <TextField
            label="Marca"
            value={manualData.make}
            onChange={handleMakeChange}
            select
            fullWidth
            sx={{ mb: 2 }}
            disabled={!manualData.year || makes.length === 0}
          >
            <MenuItem value="">Selecciona marca</MenuItem>
            {makes.map((m) => (
              <MenuItem key={m} value={m}>{m}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Modelo"
            value={manualData.model}
            onChange={handleModelChange}
            select
            fullWidth
            disabled={!manualData.make || models.length === 0}
          >
            <MenuItem value="">Selecciona modelo</MenuItem>
            {models.map((m) => (
              <MenuItem key={m} value={m}>{m}</MenuItem>
            ))}
          </TextField>
          {loading && <CircularProgress size={24} sx={{ mt: 2 }} />}
        </Box>
      )}
    </Box>
  );
}
