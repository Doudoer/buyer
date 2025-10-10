import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { decodeVin } from '../utils/vinDecoder';
import {
  Box, Card, CardContent, Typography, Button, TextField, List, ListItem, ListItemButton, ListItemText, Tabs, Tab, Stack, Stepper, Step, StepLabel, MenuItem
} from '@mui/material';

const YEARS = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() + 2 - i);
const MARCAS = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'Volkswagen', 'Hyundai', 'Kia', 'Mazda', 'BMW'];
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
  const { t } = useTranslation();
  const help = [
    {
      title: t('quote.help.year.title'),
      img: 'https://cdn-icons-png.flaticon.com/512/2921/2921222.png',
      desc: t('quote.help.year.desc')
    },
    {
      title: t('quote.help.brand.title'),
      img: 'https://cdn-icons-png.flaticon.com/512/616/616554.png',
      desc: t('quote.help.brand.desc')
    },
    {
      title: t('quote.help.model.title'),
      img: 'https://cdn-icons-png.flaticon.com/512/616/616490.png',
      desc: t('quote.help.model.desc')
    },
    {
      title: t('quote.help.details.title'),
      img: 'https://cdn-icons-png.flaticon.com/512/1256/1256650.png',
      desc: t('quote.help.details.desc')
    },
    {
      title: t('quote.help.contact.title'),
      img: 'https://cdn-icons-png.flaticon.com/512/747/747376.png',
      desc: t('quote.help.contact.desc')
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

const stepsKeys = [
  'quote.steps.yearVin',
  'quote.steps.brand',
  'quote.steps.model',
  'quote.steps.details',
  'quote.steps.contact',
];

export default function QuoteStepperFull({ onSubmit }) {
  const { t } = useTranslation();
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
  const modelosDisponibles = marca ? MODELOS[marca] : [];

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
          {stepsKeys.map(key => (
            <Step key={key}><StepLabel>{t(key)}</StepLabel></Step>
          ))}
        </Stepper>
        <Card>
          <CardContent>
            {activeStep === 0 && (
              <>
                <Typography variant="h6" sx={{ mb: 2 }}>{t('quote.enterVinTitle')}</Typography>
                {!detalles.noVin && (
                  <TextField
                    fullWidth
                    size="small"
                    label={t('quote.vinLabel')}
                    value={vin}
                    onChange={e => setVin(e.target.value)}
                    sx={{ mb: 2 }}
                    inputProps={{ maxLength: 17 }}
                    required
                    error={vin.length > 0 && vin.length !== 17}
                    helperText={vin.length > 0 && vin.length !== 17 ? t('quote.vinHelper') : ''}
                  />
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <input
                    type="checkbox"
                    id="no-vin"
                    checked={vin === '' && detalles.noVin === true}
                    onChange={e => {
                      setVin('');
                      setVinInfo(null);
                      setVinError(null);
                      setDetalles(d => ({ ...d, noVin: e.target.checked }));
                    }}
                    style={{ marginRight: 8 }}
                  />
                  <label htmlFor="no-vin" style={{ cursor: 'pointer' }}>
                    {t('quote.noVin')}
                  </label>
                </Box>
                {vinError && <Typography color="error" sx={{ mt: 1 }}>{vinError}</Typography>}
                {loadingVin && <Typography color="primary" sx={{ mt: 1 }}>{t('quote.searchingVin')}</Typography>}
                {vinInfo && (
                  <Box sx={{ mt: 2, p: 2, bgcolor: '#e3f6f5', borderRadius: 1 }}>
                    <Typography variant="subtitle2">{t('quote.identified')}</Typography>
                    <Typography variant="body2">{t('quote.brand')}: <b>{vinInfo.marca}</b></Typography>
                    <Typography variant="body2">{t('quote.model')}: <b>{vinInfo.modelo}</b></Typography>
                    <Typography variant="body2">{t('quote.year')}: <b>{vinInfo.ano}</b></Typography>
                    <Typography variant="body2">Motor: <b>{vinInfo.motor_litraje ? vinInfo.motor_litraje + 'L' : t('quote.notAvailable')}{vinInfo.motor_cilindros ? `, ${vinInfo.motor_cilindros} cilindros` : ''}</b></Typography>
                    <Typography variant="body2">Transmisión: <b>{vinInfo.transmision_tipo || t('quote.notAvailable')}</b>{vinInfo.transmision_velocidades ? `, ${vinInfo.transmision_velocidades} velocidades` : ''}</Typography>
                    <Typography variant="body2">Tracción: <b>{vinInfo.traccion || t('quote.notAvailable')}</b></Typography>
                  </Box>
                )}
                {detalles.noVin && (
                  <>
                    <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>{t('quote.manualSelect')}</Typography>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder={t('quote.searchYear')}
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    <List sx={{ maxHeight: 200, overflow: 'auto', border: '1px solid #eee', borderRadius: 1 }}>
                      {filteredYears.map(year => (
                        <ListItem key={year} disablePadding>
                          <ListItemButton selected={selectedYear === year} onClick={() => { setSelectedYear(year); setVin(''); setVinInfo(null); setVinError(null); }}>
                            <ListItemText primary={year} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <span />
                  <Button
                    variant="contained"
                    color="success"
                    disabled={
                      (!vin || vin.length !== 17) && !detalles.noVin
                    }
                    onClick={() => {
                      if (vin && vin.length === 17) {
                        // Si hay VIN válido, saltar a Detalles (omitir pasos manuales)
                        setActiveStep(3);
                      } else {
                        handleNext();
                      }
                    }}
                  >
                    {t('quote.next')}
                  </Button>
                </Box>
              </>
            )}
            {activeStep === 1 && (
              <>
                <Typography variant="h6" sx={{ mb: 2 }}>{t('quote.selectBrand')}</Typography>
                <TextField
                  select
                  fullWidth
                  label={t('quote.brand')}
                  value={marca}
                  onChange={e => setMarca(e.target.value)}
                  disabled={!!vinInfo && !!vinInfo.marca}
                >
                  {vinInfo && vinInfo.marca ? (
                    <MenuItem value={vinInfo.marca}>{vinInfo.marca}</MenuItem>
                  ) : MARCAS.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                </TextField>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Button onClick={handleBack}>{t('quote.back')}</Button>
                  <Button variant="contained" color="success" disabled={!marca} onClick={handleNext}>{t('quote.next')}</Button>
                </Box>
              </>
            )}
            {activeStep === 2 && (
              <>
                <Typography variant="h6" sx={{ mb: 2 }}>{t('quote.selectModel')}</Typography>
                <TextField
                  select
                  fullWidth
                  label={t('quote.model')}
                  value={modelo}
                  onChange={e => setModelo(e.target.value)}
                  disabled={!marca || (!!vinInfo && !!vinInfo.modelo)}
                >
                  {vinInfo && vinInfo.modelo ? (
                    <MenuItem value={vinInfo.modelo}>{vinInfo.modelo}</MenuItem>
                  ) : modelosDisponibles.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                </TextField>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Button onClick={handleBack}>{t('quote.back')}</Button>
                  <Button variant="contained" color="success" disabled={!modelo} onClick={handleNext}>{t('quote.next')}</Button>
                </Box>
              </>
            )}
            {activeStep === 3 && (
              <>
                <Typography variant="h6" sx={{ mb: 2 }}>{t('quote.details')}</Typography>
                <TextField
                  fullWidth
                  label={t('quote.mileage')}
                  value={detalles.kilometraje}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 6 }}
                  onChange={e => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setDetalles(d => ({ ...d, kilometraje: val }));
                  }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label={t('quote.state') + ' (ej: ' + t('quote.good') + ', ' + t('quote.regular') + ', ' + t('quote.excellent') + ')'}
                  value={detalles.estado}
                  onChange={e => setDetalles(d => ({ ...d, estado: e.target.value }))}
                />
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Button onClick={handleBack}>{t('quote.back')}</Button>
                  <Button variant="contained" color="success" disabled={!detalles.kilometraje || !detalles.estado} onClick={handleNext}>{t('quote.next')}</Button>
                </Box>
              </>
            )}
            {activeStep === 4 && (
              <>
                <Typography variant="h6" sx={{ mb: 2 }}>{t('quote.contact')}</Typography>
                <TextField
                  fullWidth
                  label={t('contact.name')}
                  value={contacto.nombre}
                  onChange={e => setContacto(c => ({ ...c, nombre: e.target.value }))}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label={t('contact.phone')}
                  value={contacto.telefono}
                  onChange={e => setContacto(c => ({ ...c, telefono: e.target.value }))}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label={t('contact.email')}
                  value={contacto.email}
                  onChange={e => setContacto(c => ({ ...c, email: e.target.value }))}
                  sx={{ mb: 2 }}
                />
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Button onClick={handleBack}>{t('quote.back')}</Button>
                  <Button variant="contained" color="success" disabled={!contacto.nombre || !contacto.telefono || !contacto.email} onClick={handleSubmit}>{t('quote.send')}</Button>
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
            <Tab label={t('quote.steps.yearVin')} />
            <Tab label={t('quote.steps.brand')} />
            <Tab label={t('quote.steps.model')} />
            <Tab label={t('quote.steps.details')} />
            <Tab label={t('quote.steps.contact')} />
          </Tabs>
          <CardContent>
            <HelpPanel step={activeStep} />
          </CardContent>
        </Card>
      </Box>
    </Stack>
  );
}
