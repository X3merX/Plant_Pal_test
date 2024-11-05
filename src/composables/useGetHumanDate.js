function formatDateToHumanReadable(dateString) {
  // Konversi string ke objek Date
  const date = new Date(dateString);

  // Ambil tanggal, bulan, dan tahun
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Bulan dimulai dari 0, jadi ditambah 1
  const year = date.getFullYear();

  // Ambil jam, menit, dan detik
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  // Format menjadi string yang lebih manusiawi
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}


export default (dateString) => formatDateToHumanReadable(dateString);
