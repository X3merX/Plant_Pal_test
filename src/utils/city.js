// utils.js

export async function fetchProvinceCityData() {
    try {
      const response = await fetch('input.json');
      if (!response.ok) {
        throw new Error('Gagal mengambil data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching province and city data:', error);
    }
  }
  
  export function mergeCities(data) {
    const allCities = {};
  
    // Iterasi setiap provinsi dan gabungkan data kota
    Object.keys(data.kabupaten).forEach(provinsiCode => {
      const citiesInProvince = data.kabupaten[provinsiCode];
      Object.assign(allCities, citiesInProvince); // Gabungkan dengan allCities
    });
  
    return allCities;
  }
  