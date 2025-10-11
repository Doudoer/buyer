import React, { useState } from 'react';
import { Stack, Box, Stepper, Step, StepLabel, Button, Typography, Paper } from '@mui/material';
import PasoVin from './QuoteStepperPasoVin';
import PasoCondicion from './QuoteStepperPasoCondicion';
import PasoCorporal from './QuoteStepperPasoCorporal';
import PasoVendedor from './QuoteStepperPasoVendedor';
import PasoDireccion from './QuoteStepperPasoDireccion';
import PasoVerificacion from './QuoteStepperPasoVerificacion';
import { useTranslation } from 'react-i18next';
// import { useState } from 'react'; // Eliminada duplicada
import { Snackbar, Alert } from '@mui/material';
import { generarPDF } from '../utils/generarPDF';

export default function QuoteForm() {
  const { t } = useTranslation();
  const steps = [
    t('quote.steps.yearVin', t('quote.vinStepTitle', 'Datos del vehículo')),
    t('quote.steps.condicion', t('quote.condicionTitle', 'Condiciones del vehículo')),
    t('quote.steps.corporal', t('quote.corporalTitle', 'Condición corporal')),
    t('quote.steps.vendedor', t('quote.sellerTitle', 'Datos del vendedor')),
    t('quote.steps.direccion', t('quote.addressTitle', 'Dirección')),
    t('quote.steps.verificacion', t('quote.verificationTitle', 'Verificación')),
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [stepValid, setStepValid] = useState(false);
  const [alerta, setAlerta] = useState({ open: false, success: true, msg: '' });


  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
    setStepValid(false);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  // Renderizado de cada paso (componentes individuales se implementarán después)
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <PasoVin
            value={formData}
            onChange={(data) => setFormData((prev) => ({ ...prev, ...data }))}
            onValid={setStepValid}
          />
        );
      case 1:
        return (
          <PasoCondicion
            value={formData.condicion || {}}
            onChange={(data) => setFormData((prev) => ({ ...prev, condicion: data }))}
            onValid={setStepValid}
          />
        );
      case 2:
        return (
          <PasoCorporal
            value={formData.corporal || {}}
            onChange={(data) => setFormData((prev) => ({ ...prev, corporal: data }))}
            onValid={setStepValid}
          />
        );
      case 3:
        return (
          <PasoVendedor
            value={formData.vendedor || {}}
            onChange={(data) => setFormData((prev) => ({ ...prev, vendedor: data }))}
            onValid={setStepValid}
          />
        );
      case 4:
        return (
          <PasoDireccion
            value={formData.direccion || {}}
            onChange={(data) => setFormData((prev) => ({ ...prev, direccion: data }))}
            onValid={setStepValid}
          />
        );
      case 5:
        return (
          <>
            <PasoVerificacion
              data={formData}
              onBack={handleBack}
              onSubmit={async (data) => {
                try {
                  generarPDF(data);
                  setAlerta({ open: true, success: true, msg: '¡Cotización solicitada y PDF generado!' });
                } catch (e) {
                  setAlerta({ open: true, success: false, msg: 'Error al generar la cotización.' });
                }
              }}
            />
            <Snackbar open={alerta.open} autoHideDuration={4000} onClose={() => setAlerta(a => ({ ...a, open: false }))} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
              <Alert onClose={() => setAlerta(a => ({ ...a, open: false }))} severity={alerta.success ? 'success' : 'error'} sx={{ width: '100%' }}>
                {alerta.msg}
              </Alert>
            </Snackbar>
          </>
        );
      default:
        return null;
    }
  }

  return (
    <Stack spacing={3} sx={{ minHeight: '70vh', justifyContent: 'center', alignItems: 'center', py: 6 }}>
      <Box sx={{ width: '100%', maxWidth: 600 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ mt: 4, mb: 2 }}>
            {getStepContent(activeStep)}
          </Box>
          {activeStep < steps.length - 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">
                Atrás
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!stepValid}
              >
                Siguiente
              </Button>
            </Box>
          )}
        </Paper>
      </Box>
    </Stack>
  );
}