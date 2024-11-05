import { fetchProvinceCityData, mergeCities } from './city.js';

async function getAllCities() {
  const data = await fetchProvinceCityData();
  
  if (data) {
    const allCities = mergeCities(data);
    console.log(allCities); 
    // Output: Semua kota dari berbagai provinsi dalam satu objek
  }
}

getAllCities();
