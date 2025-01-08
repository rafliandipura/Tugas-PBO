const mysql = require('mysql'); // Perbaiki penulisan require

// Buat konfigurasi koneksi
const koneksi = mysql.createConnection({
    host: 'localhost', 
    user: 'root', // Ganti dengan username MySQL Anda
    password: '', // Ganti dengan password MySQL Anda
    database: 'latihanrestapi' 
});

// Koneksi ke database
koneksi.connect((err) => {
    if (err) throw err; // Perbaiki tanda kurung dan penanganan error
    console.log('MySQL Connected...'); // Perbaiki tanda kutip
});

// Ekspor koneksi
module.exports = koneksi; // Perbaiki penulisan ekspor