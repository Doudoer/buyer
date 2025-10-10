// Consulta las marcas disponibles para un año usando la API de NHTSA
export async function getMakesForYear(year) {
	const url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json&modelyear=${year}`;
	const res = await fetch(url);
	const data = await res.json();
	// Devuelve solo los nombres de las marcas
	return data.Results.map(item => item.MakeName).sort();
}

// Consulta los modelos disponibles para una marca y año usando la API de NHTSA
export async function getModelsForMakeYear(make, year) {
	const url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${encodeURIComponent(make)}/modelyear/${year}?format=json`;
	const res = await fetch(url);
	const data = await res.json();
	// Devuelve solo los nombres de los modelos
	return data.Results.map(item => item.Model_Name).sort();
}
