import React, { useState } from 'react';
import {
  Stepper, Step, StepLabel, Button, Box, Paper, Typography
} from '@mui/material';
// Aquí irán los imports de los pasos individuales

const steps = [
  'VIN / Año',
  'Marca',
  'Modelo',
  'Condición Mecánica',
  'Daños',
  'Contacto',
  'Resumen'
];

export default function QuoteStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNext = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleEditStep = (step) => {
    setActiveStep(step);
  };

  return (
    <Paper elevation={2} sx={{ maxWidth: 500, mx: 'auto', p: 3 }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
        {steps.map((label, idx) => (
          <Step key={label} completed={activeStep > idx}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box>
        {/* Aquí se renderizarán los pasos individuales */}
        <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
          Paso {activeStep + 1} de {steps.length} (estructura base, falta implementar cada paso)
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button disabled={activeStep === 0} onClick={handleBack} variant="text">Anterior</Button>
          <Button disabled={activeStep === steps.length - 1} onClick={() => handleNext({})} variant="contained">Siguiente</Button>
        </Box>
      </Box>
    </Paper>
  );
}
              </Button>
              <List sx={{ maxHeight: 300, overflow: 'auto', border: '1px solid #eee', borderRadius: 1 }}>
                {filteredYears.map(year => (
                  <ListItem key={year} disablePadding>
                    <ListItemButton selected={selectedYear === year} onClick={() => setSelectedYear(year)}>
                      <ListItemText primary={year} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="success"
                  disabled={!selectedYear}
                  onClick={() => onSubmit && onSubmit({ year: selectedYear })}
                >
                  Siguiente
                </Button>
              </Box>
            </CardContent>
          )}
          {tab === 1 && (
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Buscar por VIN</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Ingrese el VIN..."
                value={vin}
                onChange={e => setVin(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="success"
                  disabled={vin.length !== 17}
                  onClick={() => onSubmit && onSubmit({ vin })}
                >
                  Siguiente
                </Button>
              </Box>
            </CardContent>
          )}
        </Card>
      </Box>
      <Box flex={1}>
        <Card>
          <Tabs value={tab} onChange={(_, v) => setTab(v)}>
            <Tab label="Mi Auto" />
            <Tab label="¿Necesita Ayuda?" />
          </Tabs>
          {tab === 1 && <CardContent><HelpPanel /></CardContent>}
          {tab === 0 && <CardContent><Typography variant="body2">Seleccione el año o busque por VIN para continuar.</Typography></CardContent>}
        </Card>
      </Box>
    </Stack>
  );
}
// Componente eliminado: QuoteStepper (formulario de cotización)
