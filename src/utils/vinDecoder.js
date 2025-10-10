// Utilidad para decodificar VIN usando la API pública de NHTSA
export async function decodeVin(vin) {
  const url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('No se pudo decodificar el VIN');
  const data = await res.json();
  // Extraer marca, modelo, año, motor (litraje y cilindros), transmisión (tipo y tracción)
  const get = (name) => {
    const found = data.Results.find(r => r.Variable === name);
    return found ? found.Value : '';
  };
  // Normalizar transmisión a AT/MT
  const transmisionRaw = get('Transmission Style');
  let transmisionATMT = '';
  if (transmisionRaw) {
    const val = transmisionRaw.toLowerCase();
    if (val.includes('auto')) transmisionATMT = 'AT';
    else if (val.includes('manual')) transmisionATMT = 'MT';
    else transmisionATMT = transmisionRaw;
  }
  return {
    marca: get('Make'),
    modelo: get('Model'),
    ano: get('Model Year'),
    motor_litraje: get('Displacement (L)'),
    motor_cilindros: get('Engine Cylinders'),
    transmision_tipo: transmisionRaw,
    transmision_atmt: transmisionATMT,
    transmision_velocidades: get('Transmission Speeds'),
    traccion: get('Drive Type') || get('Drive Line'),
    raw: data.Results
  };
}
