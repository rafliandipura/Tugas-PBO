const WebSocket = require('ws');
const db = require('./db'); // Memperbaiki sintaksis

// Koneksi ke WebSocket Server
const ws = new WebSocket('ws://localhost:3000'); // Memperbaiki sintaksis

ws.on('open', () => {
    console.log('Terhubung ke WebSocket server');

    // Kirim pesan ke server
    ws.send('Halo Server! Ini dari Client');
});

// Terima data dari WebSocket server
ws.on('message', (data) => {
    console.log('Data diterima dari server:', data);

    // Simpan data ke MySQL
    const jsonData = JSON.parse(data); // Memperbaiki sintaksis

    const query = 'INSERT INTO logs (message, timestamp) VALUES (?, ?)'; // Memperbaiki sintaksis
    const values = [jsonData.message, jsonData.timestamp]; // Memperbaiki sintaksis

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Gagal menyimpan data ke MySQL:', err);
        } else {
            console.log('Data berhasil disimpan ke database, ID:', result.insertId);
        }
    });
});

// Handle error
ws.on('error', (err) => {
    console.error('Error WebSocket:', err);
});

ws.on('close', () => {
    console.log('WebSocket connection closed');
});