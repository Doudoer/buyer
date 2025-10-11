import jsPDF from 'jspdf';

export function generarPDF(data) {
  const doc = new jsPDF();
  let y = 10;
  doc.setFontSize(16);
  doc.text('Resumen de Cotización', 10, y);
  y += 10;
  doc.setFontSize(12);

  // Datos del vehículo
  doc.text('Datos del vehículo:', 10, y); y += 7;
  if (data.manual) {
    doc.text(`Año: ${data.year || ''}`, 12, y); y += 6;
    doc.text(`Marca: ${data.make || ''}`, 12, y); y += 6;
    doc.text(`Modelo: ${data.model || ''}`, 12, y); y += 6;
  } else {
    doc.text(`VIN: ${data.vin || ''}`, 12, y); y += 6;
    doc.text(`Año: ${data.ano || ''}`, 12, y); y += 6;
    doc.text(`Marca: ${data.marca || ''}`, 12, y); y += 6;
    doc.text(`Modelo: ${data.modelo || ''}`, 12, y); y += 6;
    doc.text(`Motor: ${data.motor_litraje || ''}L, ${data.motor_cilindros || ''} cilindros`, 12, y); y += 6;
    doc.text(`Transmisión: ${data.transmision_atmt || ''} (${data.transmision_tipo || ''})`, 12, y); y += 6;
    doc.text(`Tracción: ${data.traccion || ''}`, 12, y); y += 6;
  }
  y += 2;
  doc.text('Condiciones del vehículo:', 10, y); y += 7;
  Object.entries(data.condicion || {}).forEach(([k, v]) => {
    doc.text(`${k.replace(/_/g, ' ')}: ${v ? 'Sí' : 'No'}`, 12, y); y += 6;
  });
  y += 2;
  doc.text('Condición corporal:', 10, y); y += 7;
  Object.entries(data.corporal || {}).forEach(([k, v]) => {
    doc.text(`${k.replace(/_/g, ' ')}: ${v ? 'Sí' : 'No'}`, 12, y); y += 6;
  });
  y += 2;
  doc.text('Datos del vendedor:', 10, y); y += 7;
  doc.text(`Nombre: ${data.vendedor?.nombre || ''} ${data.vendedor?.apellido || ''}`, 12, y); y += 6;
  doc.text(`Teléfono: ${data.vendedor?.telefono || ''}`, 12, y); y += 6;
  doc.text(`Correo electrónico: ${data.vendedor?.email || ''}`, 12, y); y += 6;
  y += 2;
  doc.text('Dirección:', 10, y); y += 7;
  doc.text(`Código Postal: ${data.direccion?.zip || ''}`, 12, y); y += 6;
  doc.text(`Ciudad: ${data.direccion?.city || ''}`, 12, y); y += 6;
  doc.text(`Estado: ${data.direccion?.state || ''}`, 12, y); y += 6;

  // Guardar PDF en carpeta de descargas del navegador
  doc.save('cotizacion_prueba.pdf');
}
