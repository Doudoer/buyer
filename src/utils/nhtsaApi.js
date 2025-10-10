// Consulta las marcas disponibles para un año usando la API de NHTSA
export async function getMakesForYear(year) {
	// Intentar endpoint por año
	try {
		const url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForModelYear/modelyear/${year}/vehicleType/car?format=json`;
		const res = await fetch(url);
		const data = await res.json();
		let marcas = data.Results.map(item => item.MakeName);
		marcas = Array.from(new Set(marcas)).sort();
		if (marcas.length > 0) return marcas;
	} catch (e) {
		// Si falla, continuar con fallback
	}
	// Fallback: marcas por tipo de vehículo (sin año)
	const fallbackUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json`;
	const fallbackRes = await fetch(fallbackUrl);
	const fallbackData = await fallbackRes.json();
	let marcas = fallbackData.Results.map(item => item.MakeName);
	return Array.from(new Set(marcas)).sort();
}

// Consulta los modelos disponibles para una marca y año usando la API de NHTSA
export async function getModelsForMakeYear(make, year) {
	const url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${encodeURIComponent(make)}/modelyear/${year}?format=json`;
	const res = await fetch(url);
	const data = await res.json();
	// Devuelve solo los nombres de los modelos
	return Array.from(new Set(data.Results.map(item => item.Model_Name))).filter(Boolean).sort();
}
