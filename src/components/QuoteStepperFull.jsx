import React, { useState, useEffect } from 'react';
import {
	Box,
	Button,
	Card,
	CardContent,
	Stepper,
	Step,
	StepLabel,
	TextField,
	MenuItem,
	Typography,
	Stack,
	CircularProgress,
	Paper,
	useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { getMakesForYear, getModelsForMakeYear } from '../utils/nhtsaApi';

const stepHelp = [
	{
		icon: 'https://cdn-icons-png.flaticon.com/512/1256/1256650.png',
		title: 'Año',
		desc: 'Selecciona el año de tu vehículo o proporciona tu VIN.'
	},
	{
		icon: 'https://cdn-icons-png.flaticon.com/512/744/744465.png',
		title: 'Marca',
		desc: 'Elige la marca de tu auto.'
	},
	{
		icon: 'https://cdn-icons-png.flaticon.com/512/747/747376.png',
		title: 'Modelo',
		desc: 'Selecciona el modelo que corresponde.'
	},
	{
		icon: 'https://cdn-icons-png.flaticon.com/512/1256/1256650.png',
		title: 'Detalles',
		desc: 'Proporciona transmisión y detalles adicionales.'
	},
	{
		icon: 'https://cdn-icons-png.flaticon.com/512/747/747376.png',
		title: 'Contacto',
		desc: 'Ingresa tus datos para recibir la cotización.'
	},
	{
		icon: 'https://cdn-icons-png.flaticon.com/512/1256/1256650.png',
		title: 'Resumen',
		desc: 'Revisa tu información antes de enviar.'
	}
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1980 + 1 }, (_, i) => currentYear - i);
const transmissions = [
	{ value: 'automatic', label: 'Automática' },
	{ value: 'manual', label: 'Manual' },
	{ value: 'other', label: 'Otra' }
];
const initialForm = {
	vin: '',
	noVin: false,
	year: '',
	brand: '',
	model: '',
	transmission: '',
	name: '',
	email: '',
	phone: '',
	comments: ''
};
const stepsKeys = [
	'quote.stepVehicle',
	'quote.stepModel',
	'quote.stepYear',
	'quote.stepTransmission',
	'quote.stepContact',
	'quote.stepSummary'
];

export default function QuoteStepperFull() {
	const { t } = useTranslation();
	const theme = useTheme();
	const [activeStep, setActiveStep] = useState(0);
	const [form, setForm] = useState(initialForm);
	const [brands, setBrands] = useState([]);
	const [models, setModels] = useState([]);
	const [loadingBrands, setLoadingBrands] = useState(false);
	const [loadingModels, setLoadingModels] = useState(false);
	const [errorBrands, setErrorBrands] = useState(false);
	const [errorModels, setErrorModels] = useState(false);
	// VIN
	const [vinLoading, setVinLoading] = useState(false);
	const [vinInfo, setVinInfo] = useState(null);
	const [vinError, setVinError] = useState(null);

	useEffect(() => {
		if (!form.year) {
			setBrands([]);
			return;
		}
		setLoadingBrands(true);
		getMakesForYear(form.year)
			.then(data => {
				setBrands(data);
				setLoadingBrands(false);
				setErrorBrands(false);
			})
			.catch(() => {
				setBrands([]);
				setLoadingBrands(false);
				setErrorBrands(true);
			});
	}, [form.year]);

	useEffect(() => {
		if (!form.brand || !form.year) {
			setModels([]);
			return;
		}
		setLoadingModels(true);
		getModelsForMakeYear(form.brand, form.year)
			.then(data => {
				setModels(data);
				setLoadingModels(false);
				setErrorModels(false);
			})
			.catch(() => {
				setModels([]);
				setLoadingModels(false);
				setErrorModels(true);
			});
	}, [form.brand, form.year]);

	// Decodificar VIN
	useEffect(() => {
		const fetchVin = async () => {
			if (form.vin && isVinValid(form.vin)) {
				setVinLoading(true);
				setVinError(null);
				try {
					const url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${form.vin}?format=json`;
					const res = await fetch(url);
					const data = await res.json();
					const results = data.Results || [];
					// Solo campos principales
								const wanted = [
									'Make',
									'Model Year',
									'Model',
									'Vehicle Type',
									'Trim',
									'Gross Vehicle Weight Rating From',
									'Engine Number of Cylinders',
									'Engine Model',
									'Displacement (L)',
									'Fuel Delivery / Fuel Injection Type'
								];
					const filtered = results.filter(item => wanted.includes(item.Variable) && item.Value && item.Value !== 'Not Applicable' && item.Value !== '0')
						.map(item => ({ variable: item.Variable, value: item.Value }));
					setVinInfo(filtered);
				} catch (e) {
					setVinInfo(null);
					setVinError('Error al decodificar VIN');
				} finally {
					setVinLoading(false);
				}
			} else {
				setVinInfo(null);
				setVinError(null);
				setVinLoading(false);
			}
		};
		fetchVin();
	}, [form.vin]);

	const handleChange = e => {
		const { name, value, type, checked } = e.target;
		setForm(prev => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value
		}));
	};

	const handleNext = () => setActiveStep(prev => prev + 1);
	const handleBack = () => setActiveStep(prev => prev - 1);
	const handleSubmit = e => {
		e.preventDefault();
		alert('¡Cotización enviada!');
		setActiveStep(0);
		setForm(initialForm);
	};

	const isVinValid = vin => /^[A-HJ-NPR-Z0-9]{17}$/i.test(vin);
	const isStepValid = () => {
		switch (activeStep) {
			case 0:
				if (form.noVin) return !!form.year;
				return isVinValid(form.vin);
			case 1:
				return !!form.year && !!form.brand;
			case 2:
				return !!form.model;
			case 3:
				return !!form.transmission && (form.transmission !== 'other' || form.vin.length === 17);
			case 4:
				return form.name.length > 1 && /.+@.+\..+/.test(form.email) && form.phone.length > 5;
			default:
				return true;
		}
	};

	const renderStep = () => {
		switch (activeStep) {
			case 0:
				return (
					<Box>
						<Typography mb={2}>Introduce el VIN o selecciona el año</Typography>
						<TextField
							fullWidth
							name="vin"
							label={'VIN (17 caracteres)'}
							value={form.vin}
							onChange={handleChange}
							sx={{ mb: 2 }}
							inputProps={{ maxLength: 17 }}
							disabled={form.noVin}
							error={form.vin.length > 0 && !isVinValid(form.vin)}
							helperText={form.vin.length > 0 && !isVinValid(form.vin) ? 'El VIN debe tener 17 caracteres válidos' : ''}
						/>
						<Box display="flex" alignItems="center" mb={2}>
							<input
								type="checkbox"
								id="noVin"
								name="noVin"
								checked={form.noVin}
								onChange={handleChange}
								style={{ marginRight: 8 }}
							/>
							<label htmlFor="noVin">No tengo el VIN ahora</label>
						</Box>
						{form.noVin && (
							<TextField
								select
								fullWidth
								name="year"
								label={'Año'}
								value={form.year}
								onChange={handleChange}
								sx={{ mb: 2 }}
							>
								{years.map(y => (
									<MenuItem key={y} value={y}>{y}</MenuItem>
								))}
							</TextField>
						)}
					</Box>
				);
			case 1:
				return (
					<Box>
						<Typography mb={2}>Selecciona la marca</Typography>
						{loadingBrands ? (
							<CircularProgress size={24} />
						) : errorBrands ? (
							<Typography color="error">Error al cargar marcas</Typography>
						) : (
							<TextField
								select
								fullWidth
								name="brand"
								label={'Marca'}
								value={form.brand}
								onChange={handleChange}
								sx={{ mb: 2 }}
								disabled={!form.year}
							>
								{brands.map(b => (
									<MenuItem key={b} value={b}>{b}</MenuItem>
								))}
							</TextField>
						)}
					</Box>
				);
			case 2:
				return (
					<Box>
						<Typography mb={2}>Selecciona el modelo</Typography>
						{loadingModels ? (
							<CircularProgress size={24} />
						) : errorModels ? (
							<Typography color="error">Error al cargar modelos</Typography>
						) : (
							<TextField
								select
								fullWidth
								name="model"
								label={'Modelo'}
								value={form.model}
								onChange={handleChange}
								sx={{ mb: 2 }}
								disabled={!form.brand || !form.year}
							>
								{models.map(m => (
									<MenuItem key={m} value={m}>{m}</MenuItem>
								))}
							</TextField>
						)}
					</Box>
				);
			case 3:
				return (
					<Box>
						<Typography mb={2}>Selecciona la transmisión</Typography>
						<TextField
							select
							fullWidth
							name="transmission"
							label={'Transmisión'}
							value={form.transmission}
							onChange={handleChange}
							sx={{ mb: 2 }}
						>
							{transmissions.map(opt => (
								<MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
							))}
						</TextField>
						{form.transmission === 'other' && (
							<TextField
								fullWidth
								name="vin"
								label={'VIN'}
								value={form.vin}
								onChange={handleChange}
								sx={{ mb: 2 }}
								inputProps={{ maxLength: 17 }}
								error={form.vin.length > 0 && form.vin.length !== 17}
								helperText={form.vin.length > 0 && form.vin.length !== 17 ? 'El VIN debe tener 17 caracteres' : ''}
							/>
						)}
					</Box>
				);
			case 4:
				return (
					<Box>
						<Typography mb={2}>Datos de contacto</Typography>
						<TextField
							fullWidth
							name="name"
							label={'Nombre'}
							value={form.name}
							onChange={handleChange}
							sx={{ mb: 2 }}
						/>
						<TextField
							fullWidth
							name="email"
							label={'Correo electrónico'}
							value={form.email}
							onChange={handleChange}
							sx={{ mb: 2 }}
							type="email"
							error={form.email.length > 0 && !/.+@.+\..+/.test(form.email)}
							helperText={form.email.length > 0 && !/.+@.+\..+/.test(form.email) ? 'Correo inválido' : ''}
						/>
						<TextField
							fullWidth
							name="phone"
							label={'Teléfono'}
							value={form.phone}
							onChange={handleChange}
							sx={{ mb: 2 }}
							type="tel"
						/>
						<TextField
							fullWidth
							name="comments"
							label={'Comentarios'}
							value={form.comments}
							onChange={handleChange}
							sx={{ mb: 2 }}
							multiline
							minRows={2}
						/>
					</Box>
				);
			case 5:
				return (
					<Box>
						<Typography mb={2}>Resumen</Typography>
						<Card variant="outlined" sx={{ mb: 2 }}>
							<CardContent>
								<Typography variant="subtitle2">Marca: {form.brand}</Typography>
								<Typography variant="subtitle2">Modelo: {form.model}</Typography>
								<Typography variant="subtitle2">Año: {form.year}</Typography>
								<Typography variant="subtitle2">Transmisión: {transmissions.find(opt => opt.value === form.transmission)?.label || ''}</Typography>
								{form.transmission === 'other' && (
									<Typography variant="subtitle2">VIN: {form.vin}</Typography>
								)}
								<Typography variant="subtitle2">Nombre: {form.name}</Typography>
								<Typography variant="subtitle2">Correo: {form.email}</Typography>
								<Typography variant="subtitle2">Teléfono: {form.phone}</Typography>
								{form.comments && (
									<Typography variant="subtitle2">Comentarios: {form.comments}</Typography>
								)}
							</CardContent>
						</Card>
						<Typography color="text.secondary" sx={{ mb: 2 }}>Verifica que los datos sean correctos antes de enviar.</Typography>
					</Box>
				);
			default:
				return null;
		}
	};

	return (
		<Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto' }}>
			<Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
				{stepsKeys.map(key => (
					<Step key={key}>
						<StepLabel>{t(key)}</StepLabel>
					</Step>
				))}
			</Stepper>
			<Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="stretch">
				{/* Formulario principal */}
				<Box flex={{ xs: '1 1 100%', md: '1 1 50%' }} minWidth={0} sx={{ minWidth: { md: 350 }, maxWidth: { md: 420 } }}>
					<Card elevation={2} sx={{ p: { xs: 2, md: 3 }, height: '100%' }}>
						<CardContent>
							<form onSubmit={handleSubmit} autoComplete="off">
								{renderStep()}
								<Box mt={2} display="flex" justifyContent="space-between">
									<Button
										disabled={activeStep === 0}
										onClick={handleBack}
										variant="outlined"
									>
										Atrás
									</Button>
									{activeStep < stepsKeys.length - 1 ? (
										<Button
											onClick={handleNext}
											variant="contained"
											disabled={!isStepValid()}
										>
											Siguiente
										</Button>
									) : (
										<Button
											type="submit"
											variant="contained"
											disabled={!isStepValid()}
										>
											Enviar
										</Button>
									)}
								</Box>
							</form>
						</CardContent>
					</Card>
				</Box>
				{/* Panel de ayuda visual */}
							<Box flex={{ xs: '1 1 100%', md: '1 1 60%' }} minWidth={0} sx={{ minWidth: { md: 500 }, maxWidth: { md: 700 } }}>
								<Paper elevation={0} sx={{
									p: { xs: 2, md: 4 },
									bgcolor: theme.palette.grey[100],
									height: '100%',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'flex-start',
									minHeight: 500
								}}>
									{activeStep === 0 && form.vin && isVinValid(form.vin) ? (
										vinLoading ? (
											<Typography color="text.secondary">Buscando VIN...</Typography>
										) : vinError ? (
											<Typography color="error">{vinError}</Typography>
										) : vinInfo && vinInfo.length > 0 ? (
											<Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
												{/* Imagen según tipo de vehículo */}
																	{(() => {
																		const type = vinInfo.find(item => item.variable === 'Vehicle Type')?.value?.toLowerCase() || '';
																		let img = 'https://cdn-icons-png.flaticon.com/512/744/744465.png'; // sedán por defecto
																		if (type.includes('suv')) img = 'https://cdn-icons-png.flaticon.com/512/1995/1995476.png';
																		else if (type.includes('pickup') || type.includes('truck')) img = 'https://cdn-icons-png.flaticon.com/512/1995/1995478.png';
																		else if (type.includes('van') || type.includes('minivan')) img = 'https://cdn-icons-png.flaticon.com/512/1995/1995477.png';
																		else if (type.includes('coupe')) img = 'https://cdn-icons-png.flaticon.com/512/744/744465.png';
																		else if (type.includes('convertible')) img = 'https://cdn-icons-png.flaticon.com/512/1995/1995480.png';
																		else if (type.includes('hatchback')) img = 'https://cdn-icons-png.flaticon.com/512/1995/1995479.png';
																		else if (type.includes('wagon')) img = 'https://cdn-icons-png.flaticon.com/512/1995/1995481.png';
																		else if (type.includes('mpv') || type.includes('multi-purpose')) img = 'https://cdn-icons-png.flaticon.com/512/1995/1995476.png';
																		return <img src={img} alt="vehículo" style={{ width: 72, height: 72, marginBottom: 12 }} />;
																	})()}
												<Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Datos del Vehículo</Typography>
												<ul style={{ margin: 0, paddingLeft: 16, fontSize: 16 }}>
													{vinInfo.map((item, idx) => (
														<li key={idx}><b>{item.variable}:</b> {item.value}</li>
													))}
												</ul>
											</Box>
										) : null
									) : (
										<Typography color="text.secondary" align="center">
											{stepHelp[activeStep]?.desc}
										</Typography>
									)}
								</Paper>
							</Box>
			</Stack>
		</Box>
	);
}
