import React, { useState, useEffect } from 'react';
import { decodeVin } from '../utils/vinDecoder';
import { Box, Card, CardContent, Typography, Button, TextField, List, ListItem, ListItemButton, ListItemText, Tabs, Tab, Stack, Stepper, Step, StepLabel, MenuItem, CircularProgress } from '@mui/material';
import { getMakesForYear, getModelsForMakeYear } from '../utils/nhtsaApi';

const YEARS = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() + 2 - i);
// Marcas dinámicas por año
const MODELOS = {
  Toyota: ['Corolla', 'Camry', 'Hilux', 'Yaris'],
  Honda: ['Civic', 'Accord', 'CR-V'],
  Ford: ['F-150', 'Focus', 'Explorer'],
  Chevrolet: ['Aveo', 'Onix', 'Trailblazer'],
  Nissan: ['Altima', 'Sentra', 'Versa'],
  Volkswagen: ['Jetta', 'Golf', 'Tiguan'],
  Hyundai: ['Elantra', 'Tucson', 'Santa Fe'],
  Kia: ['Rio', 'Sportage', 'Sorento'],
  Mazda: ['3', 'CX-5', '6'],
  BMW: ['320i', 'X5', 'X3'],
};

function HelpPanel({ step }) {
  const help = [
    {
      title: 'Año',
      img: 'https://cdn-icons-png.flaticon.com/512/2921/2921222.png',
      desc: 'Seleccione el año de su vehículo o proporcione su VIN.'
    },
    {
      title: 'Marca',
      img: 'https://cdn-icons-png.flaticon.com/512/616/616554.png',
      desc: 'Seleccione la marca de su auto.'
    },
    {
      title: 'Modelo',
      img: 'https://cdn-icons-png.flaticon.com/512/616/616490.png',
      desc: 'Seleccione el modelo de su auto.'
    },
    {
      title: 'Detalles',
      img: 'https://cdn-icons-png.flaticon.com/512/1256/1256650.png',
      desc: 'Agregue detalles como kilometraje, estado, etc.'
    },
    {
      title: 'Contacto',
      img: 'https://cdn-icons-png.flaticon.com/512/747/747376.png',
      desc: 'Ingrese sus datos para recibir la oferta.'
    },
  ];
  return (
    <Box sx={{ bgcolor: '#e3f6f5', p: 3, borderRadius: 2, minHeight: 350 }}>
      <Stack spacing={2} alignItems="center">
        <img src={help[step].img} alt={help[step].title} width={100} />
        <Typography variant="h6">{help[step].title}</Typography>
        <Typography variant="body2" align="center">{help[step].desc}</Typography>
      </Stack>
    </Box>
  );
}

const steps = ['Año/VIN', 'Marca', 'Modelo', 'Detalles', 'Contacto'];

export default function QuoteStepperFull({ onSubmit }) {
  const [activeStep, setActiveStep] = useState(0);
  const [search, setSearch] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [vin, setVin] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [detalles, setDetalles] = useState({ kilometraje: '', estado: '' });
  const [contacto, setContacto] = useState({ nombre: '', telefono: '', email: '' });
  const [vinInfo, setVinInfo] = useState(null);
  const [vinError, setVinError] = useState(null);
  const [loadingVin, setLoadingVin] = useState(false);

  const filteredYears = YEARS.filter(y => y.toString().includes(search));
  const [marcasDisponibles, setMarcasDisponibles] = useState([]);
  const [loadingMarcas, setLoadingMarcas] = useState(false);
  const [modelosDisponibles, setModelosDisponibles] = useState([]);
  const [loadingModelos, setLoadingModelos] = useState(false);

  // Obtener marcas por año
  useEffect(() => {
    async function fetchMarcas() {
      if (selectedYear || ano) {
        setLoadingMarcas(true);
        try {
          const marcas = await getMakesForYear(selectedYear || ano);
          setMarcasDisponibles(marcas);
        } catch {
          setMarcasDisponibles([]);
        } finally {
          setLoadingMarcas(false);
        }
      } else {
        setMarcasDisponibles([]);
      }
    }
    fetchMarcas();
  }, [selectedYear, ano]);

  // Obtener modelos por marca y año
  useEffect(() => {
    async function fetchModelos() {
      if (marca && (selectedYear || ano)) {
        setLoadingModelos(true);
        try {
          const modelos = await getModelsForMakeYear(marca, selectedYear || ano);
          setModelosDisponibles(modelos);
        } catch {
          setModelosDisponibles([]);
        } finally {
          setLoadingModelos(false);
        }
      } else {
        setModelosDisponibles([]);
      }
    }
    fetchModelos();
  }, [marca, selectedYear, ano]);

  // Buscar VIN en tiempo real
  React.useEffect(() => {
    let cancel = false;
    const buscarVin = async () => {
      if (vin.length === 17) {
        setLoadingVin(true);
        setVinError(null);
        try {
          const info = await decodeVin(vin);
          if (!cancel) {
            setVinInfo(info);
            setMarca(info.marca || '');
            setModelo(info.modelo || '');
            setAno(info.ano || '');
          }
        } catch (e) {
          if (!cancel) {
            setVinError('No se pudo identificar el auto con ese VIN.');
            setVinInfo(null);
            setMarca('');
            setModelo('');
            setAno('');
          }
        } finally {
          if (!cancel) setLoadingVin(false);
        }
      } else {
        setVinInfo(null);
        setVinError(null);
      }
    };
    buscarVin();
    return () => { cancel = true; };
  }, [vin]);

  const handleNext = () => {
    setActiveStep(s => s + 1);
  };
  const handleBack = () => setActiveStep(s => s - 1);

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({
        year: selectedYear || ano,
        vin,
        marca,
        modelo,
        detalles,
        contacto
      });
    }
  };

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
      <Box flex={2}>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 2 }}>
          {steps.map(label => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>
        <Card>
          <CardContent>
            {activeStep === 0 && (
              <>
                <Typography variant="h6" sx={{ mb: 2 }}>Seleccione el Año o ingrese VIN</Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Buscar año..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  sx={{ mb: 2 }}
                  disabled={vin.length === 17}
                />
                <Button
                  variant="text"
                  color="success"
                  sx={{ mb: 1 }}
                  onClick={() => setVin('')}
                >
                  Buscar por Número VIN
                </Button>
                <List sx={{ maxHeight: 200, overflow: 'auto', border: '1px solid #eee', borderRadius: 1 }}>
                  {filteredYears.map(year => (
                    <ListItem key={year} disablePadding>
                      <ListItemButton selected={selectedYear === year} onClick={() => { setSelectedYear(year); setVin(''); setVinInfo(null); setVinError(null); }}>
                        <ListItemText primary={year} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                <TextField
                  fullWidth
                  size="small"
                  label="VIN (opcional, 17 caracteres)"
                  value={vin}
                  onChange={e => { setVin(e.target.value); setSelectedYear(''); setVinInfo(null); setVinError(null); }}
                  sx={{ mt: 2 }}
                  inputProps={{ maxLength: 17 }}
                />
                {vinError && <Typography color="error" sx={{ mt: 1 }}>{vinError}</Typography>}
                {loadingVin && <Typography color="primary" sx={{ mt: 1 }}>Buscando información del VIN...</Typography>}
                {vinInfo && (
                  <Box sx={{ mt: 2, p: 2, bgcolor: '#e3f6f5', borderRadius: 1 }}>
                    <Typography variant="subtitle2">Auto identificado:</Typography>
                    <Typography variant="body2">Marca: <b>{vinInfo.marca}</b></Typography>
                    <Typography variant="body2">Modelo: <b>{vinInfo.modelo}</b></Typography>
                    <Typography variant="body2">Año: <b>{vinInfo.ano}</b></Typography>
                    <Typography variant="body2">Motor: <b>{vinInfo.motor_litraje ? vinInfo.motor_litraje + 'L' : 'No disponible'}{vinInfo.motor_cilindros ? `, ${vinInfo.motor_cilindros} cilindros` : ''}</b></Typography>
                    <Typography variant="body2">Transmisión: <b>{vinInfo.transmision_tipo || 'No disponible'}</b>{vinInfo.transmision_velocidades ? `, ${vinInfo.transmision_velocidades} velocidades` : ''}</Typography>
                    <Typography variant="body2">Tracción: <b>{vinInfo.traccion || 'No disponible'}</b></Typography>
                  </Box>
                )}
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <span />
                  <Button
                    variant="contained"
                    color="success"
                    disabled={!(selectedYear || vin.length === 17)}
                    onClick={handleNext}
                  >
                    Siguiente
                  </Button>
                </Box>
              </>
            )}
            {activeStep === 1 && (
              <>
                <Typography variant="h6" sx={{ mb: 2 }}>Seleccione la Marca</Typography>
                <TextField
                  select
                  fullWidth
                  label="Marca"
                  value={marca}
                  onChange={e => setMarca(e.target.value)}
                  disabled={!!vinInfo && !!vinInfo.marca || loadingMarcas}
                >
                  {vinInfo && vinInfo.marca ? (
                    <MenuItem value={vinInfo.marca}>{vinInfo.marca}</MenuItem>
                  ) : loadingMarcas ? (
                    <MenuItem disabled value="">
                      <CircularProgress size={20} sx={{ mr: 1 }} /> Cargando marcas...
                    </MenuItem>
                  ) : (
                    marcasDisponibles.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)
                  )}
                </TextField>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Button onClick={handleBack}>Atrás</Button>
                  <Button variant="contained" color="success" disabled={!marca} onClick={handleNext}>Siguiente</Button>
                </Box>
              </>
            )}
            {activeStep === 2 && (
              <>
                <Typography variant="h6" sx={{ mb: 2 }}>Seleccione el Modelo</Typography>
                <TextField
                  select
                  fullWidth
                  label="Modelo"
                  value={modelo}
                  onChange={e => setModelo(e.target.value)}
                  disabled={!marca || (!!vinInfo && !!vinInfo.modelo)}
                >
                  {vinInfo && vinInfo.modelo ? (
                    <MenuItem value={vinInfo.modelo}>{vinInfo.modelo}</MenuItem>
                  ) : modelosDisponibles.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                </TextField>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Button onClick={handleBack}>Atrás</Button>
                  <Button variant="contained" color="success" disabled={!modelo} onClick={handleNext}>Siguiente</Button>
                </Box>
              </>
            )}
            {activeStep === 3 && (
              <>
                <Typography variant="h6" sx={{ mb: 2 }}>Detalles del Auto</Typography>
                <TextField
                  fullWidth
                  label="Kilometraje"
                  value={detalles.kilometraje}
                  onChange={e => setDetalles(d => ({ ...d, kilometraje: e.target.value }))}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Estado general (ej: bueno, regular, excelente)"
                  value={detalles.estado}
                  onChange={e => setDetalles(d => ({ ...d, estado: e.target.value }))}
                />
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Button onClick={handleBack}>Atrás</Button>
                  <Button variant="contained" color="success" disabled={!detalles.kilometraje || !detalles.estado} onClick={handleNext}>Siguiente</Button>
                </Box>
              </>
            )}
            {activeStep === 4 && (
              <>
                <Typography variant="h6" sx={{ mb: 2 }}>Datos de Contacto</Typography>
                <TextField
                  fullWidth
                  label="Nombre"
                  value={contacto.nombre}
                  onChange={e => setContacto(c => ({ ...c, nombre: e.target.value }))}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Teléfono"
                  value={contacto.telefono}
                  onChange={e => setContacto(c => ({ ...c, telefono: e.target.value }))}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  value={contacto.email}
                  onChange={e => setContacto(c => ({ ...c, email: e.target.value }))}
                  sx={{ mb: 2 }}
                />
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Button onClick={handleBack}>Atrás</Button>
                  <Button variant="contained" color="success" disabled={!contacto.nombre || !contacto.telefono || !contacto.email} onClick={handleSubmit}>Enviar</Button>
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      </Box>
      <Box flex={1}>
        <Card>
          <Tabs value={activeStep} onChange={(_, v) => setActiveStep(v)}>
            <Tab label="Año" />
            <Tab label="Marca" />
            <Tab label="Modelo" />
            <Tab label="Detalles" />
            <Tab label="Contacto" />
          </Tabs>
          <CardContent>
            <HelpPanel step={activeStep} />
          </CardContent>
        </Card>
      </Box>
    </Stack>
  );
}
