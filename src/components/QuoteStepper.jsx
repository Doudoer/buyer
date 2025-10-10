import React, { useState } from 'react';
import {
  Box, Card, CardContent, Typography, Button, TextField, List, ListItem, ListItemButton, ListItemText, Tabs, Tab, Stack
} from '@mui/material';

const YEARS = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() + 2 - i);

function HelpPanel({ year }) {
  return (
    <Box sx={{ bgcolor: '#e3f6f5', p: 3, borderRadius: 2, minHeight: 350 }}>
      <Stack spacing={2} alignItems="center">
        <img src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png" alt="Año" width={100} />
        <Typography variant="h6">Año</Typography>
        <Typography variant="body2" align="center">
          Comience seleccionando el año de su vehículo o proporcionando su VIN (Número de identificación del vehículo).<br /><br />
          Para una oferta más precisa, proporcione su VIN. No es obligatorio, pero ayuda a procesar una oferta de forma más rápida y precisa. En la mayoría de los casos, el VIN tiene 17 caracteres de longitud.<br /><br />
          <b>¿Dónde puede encontrar el VIN de su vehículo?</b><br />
          Parabrisas del lado del conductor o puerta del conductor<br />
          Tarjeta de seguro<br />
          Título
        </Typography>
      </Stack>
    </Box>
  );
}

export default function QuoteStepper({ onSubmit }) {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState('');
  const [selectedYear, setSelectedYear] = useState(null);
  const [vin, setVin] = useState('');

  const filteredYears = YEARS.filter(y => y.toString().includes(search));

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
      <Box flex={2}>
        <Card>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tab label="Mi Auto" />
            <Tab label="¿Necesita Ayuda?" />
          </Tabs>
          {tab === 0 && (
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Seleccione el Año</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Buscar año..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="text"
                color="success"
                sx={{ mb: 1 }}
                onClick={() => setTab(1)}
              >
                Buscar por Número VIN
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
