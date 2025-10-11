import React from 'react';
import { Box, Typography, Divider, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

function renderSiNo(val, t) {
  if (typeof val === 'boolean') return val ? t('quote.yes', 'Sí') : t('quote.no', 'No');
  return val || '-';
}

const labelsCondicion = {
  enciende: 'quote.condicion.enciende',
  neumaticos_aire: 'quote.condicion.neumaticos_aire',
  todos_neumaticos: 'quote.condicion.todos_neumaticos',
  catalizadores: 'quote.condicion.catalizadores',
  titulo: 'quote.condicion.titulo',
  llave: 'quote.condicion.llave',
};
const labelsCorporal = {
  danos_frente: 'quote.corporal.danos_frente',
  danos_trasera: 'quote.corporal.danos_trasera',
  danos_lado_izq: 'quote.corporal.danos_lado_izq',
  danos_lado_der: 'quote.corporal.danos_lado_der',
  danos_motor: 'quote.corporal.danos_motor',
  inundacion: 'quote.corporal.inundacion',
  fuego: 'quote.corporal.fuego',
  bolsas_aire: 'quote.corporal.bolsas_aire',
};

export default function PasoVerificacion({ data, onBack, onSubmit }) {
  const { t } = useTranslation();
  const { vin, marca, modelo, ano, motor_litraje, motor_cilindros, transmision_atmt, transmision_tipo, traccion, year, make, model, manual } = data || {};
  const condicion = data?.condicion || {};
  const corporal = data?.corporal || {};
  const vendedor = data?.vendedor || {};
  const direccion = data?.direccion || {};

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t('quote.verificationTitle', 'Verificación de datos ingresados')}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Stack spacing={2}>
        <Typography variant="subtitle1">{t('quote.vehicleData', 'Datos del vehículo')}</Typography>
        {manual ? (
          <>
            <div>{t('quote.year', 'Año')}: {year}</div>
            <div>{t('quote.brand', 'Marca')}: {make}</div>
            <div>{t('quote.model', 'Modelo')}: {model}</div>
          </>
        ) : (
          <>
            <div>VIN: {vin}</div>
            <div>{t('quote.year', 'Año')}: {ano}</div>
            <div>{t('quote.brand', 'Marca')}: {marca}</div>
            <div>{t('quote.model', 'Modelo')}: {modelo}</div>
            <div>{t('quote.engine', 'Motor')}: {motor_litraje}L, {motor_cilindros} {t('quote.cylinders', 'cilindros')}</div>
            <div>{t('quote.transmission', 'Transmisión')}: {transmision_atmt} ({transmision_tipo})</div>
            <div>{t('quote.traction', 'Tracción')}: {traccion}</div>
          </>
        )}
        <Divider />
        <Typography variant="subtitle1">{t('quote.condicionTitle', 'Condiciones del vehículo')}</Typography>
        {Object.entries(condicion).map(([k, v]) => (
          <div key={k}>{t(labelsCondicion[k] || k.replace(/_/g, ' '))}: {renderSiNo(v, t)}</div>
        ))}
        <Divider />
        <Typography variant="subtitle1">{t('quote.corporalTitle', 'Condición corporal')}</Typography>
        {Object.entries(corporal).map(([k, v]) => (
          <div key={k}>{t(labelsCorporal[k] || k.replace(/_/g, ' '))}: {renderSiNo(v, t)}</div>
        ))}
        <Divider />
        <Typography variant="subtitle1">{t('quote.sellerTitle', 'Datos del vendedor')}</Typography>
        <div>{t('quote.sellerName', 'Nombre')}: {vendedor.nombre} {vendedor.apellido}</div>
        <div>{t('quote.sellerPhone', 'Teléfono')}: {vendedor.telefono}</div>
        <div>{t('quote.sellerEmail', 'Correo electrónico')}: {vendedor.email}</div>
        <Divider />
        <Typography variant="subtitle1">{t('quote.addressTitle', 'Dirección')}</Typography>
        <div>{t('quote.zip', 'Código Postal')}: {direccion.zip}</div>
        <div>{t('quote.city', 'Ciudad')}: {direccion.city}</div>
        <div>{t('quote.state', 'Estado')}: {direccion.state}</div>
      </Stack>
      <Stack direction="row" spacing={2} sx={{ mt: 4, justifyContent: 'center' }}>
        <button style={{ padding: '8px 24px', border: '1px solid #1976d2', background: 'white', color: '#1976d2', borderRadius: 4, fontWeight: 600, cursor: 'pointer' }} onClick={onBack}>ATRÁS</button>
        <button style={{ padding: '8px 24px', border: 'none', background: '#1976d2', color: 'white', borderRadius: 4, fontWeight: 600, cursor: 'pointer' }} onClick={() => onSubmit(data)}>SOLICITAR COTIZACIÓN</button>
      </Stack>
    </Box>
  );
}
