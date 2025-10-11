import React from 'react';
import { Box, Typography, Divider, Stack } from '@mui/material';

function renderSiNo(val) {
  if (typeof val === 'boolean') return val ? 'Sí' : 'No';
  return val || '-';
}

const labelsCondicion = {
  enciende: 'El vehiculo enciende',
  neumaticos_aire: 'Los neumáticos tienen aire',
  todos_neumaticos: 'El vehiculo tiene todos los neumaticos',
  catalizadores: 'El vehiculo tiene catalizadores',
  titulo: 'El vehiculo tiene titulo',
  llave: 'Dispone de la llave',
};
const labelsCorporal = {
  danos_frente: 'Daños al frente',
  danos_trasera: 'Daños en la parte trasera',
  danos_lado_izq: 'Daños en lateral izquierdo',
  danos_lado_der: 'Daños en lateral derecho',
  danos_motor: 'Daños en el motor',
  inundacion: 'Daños por inundacion',
  fuego: 'Daños por fuego',
  bolsas_aire: 'Bolsas de aire rotas',
};

export default function PasoVerificacion({ data, onBack, onSubmit }) {
  const { vin, marca, modelo, ano, motor_litraje, motor_cilindros, transmision_atmt, transmision_tipo, traccion, year, make, model, manual } = data || {};
  const condicion = data?.condicion || {};
  const corporal = data?.corporal || {};
  const vendedor = data?.vendedor || {};
  const direccion = data?.direccion || {};

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Verificación de datos ingresados
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Stack spacing={2}>
        <Typography variant="subtitle1">Datos del vehículo</Typography>
        {manual ? (
          <>
            <div>Año: {year}</div>
            <div>Marca: {make}</div>
            <div>Modelo: {model}</div>
          </>
        ) : (
          <>
            <div>VIN: {vin}</div>
            <div>Año: {ano}</div>
            <div>Marca: {marca}</div>
            <div>Modelo: {modelo}</div>
            <div>Motor: {motor_litraje}L, {motor_cilindros} cilindros</div>
            <div>Transmisión: {transmision_atmt} ({transmision_tipo})</div>
            <div>Tracción: {traccion}</div>
          </>
        )}
        <Divider />
        <Typography variant="subtitle1">Condiciones del vehículo</Typography>
        {Object.entries(condicion).map(([k, v]) => (
          <div key={k}>{labelsCondicion[k] || k.replace(/_/g, ' ')}: {renderSiNo(v)}</div>
        ))}
        <Divider />
        <Typography variant="subtitle1">Condición corporal</Typography>
        {Object.entries(corporal).map(([k, v]) => (
          <div key={k}>{labelsCorporal[k] || k.replace(/_/g, ' ')}: {renderSiNo(v)}</div>
        ))}
        <Divider />
        <Typography variant="subtitle1">Datos del vendedor</Typography>
        <div>Nombre: {vendedor.nombre} {vendedor.apellido}</div>
        <div>Teléfono: {vendedor.telefono}</div>
        <div>Correo electrónico: {vendedor.email}</div>
        <Divider />
        <Typography variant="subtitle1">Dirección</Typography>
        <div>Código Postal: {direccion.zip}</div>
        <div>Ciudad: {direccion.city}</div>
        <div>Estado: {direccion.state}</div>
      </Stack>
      <Stack direction="row" spacing={2} sx={{ mt: 4, justifyContent: 'center' }}>
        <button style={{ padding: '8px 24px', border: '1px solid #1976d2', background: 'white', color: '#1976d2', borderRadius: 4, fontWeight: 600, cursor: 'pointer' }} onClick={onBack}>ATRÁS</button>
        <button style={{ padding: '8px 24px', border: 'none', background: '#1976d2', color: 'white', borderRadius: 4, fontWeight: 600, cursor: 'pointer' }} onClick={() => onSubmit(data)}>SOLICITAR COTIZACIÓN</button>
      </Stack>
    </Box>
  );
}
