const express = require('express');
const bodyParser = require('body-parser');
const koneksi = require ('./config/db.js');
const app = express ();
const PORT = process.env.PORT || 3000;

//set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/api/latihanrestapi', (req, res) => {
    //buat variabel penampung data dan querry sql
    const data = {...req.body};
    const querySql = 'INSERT INTO latihanrestapi SET ?';

    // jalankan querry 
    koneksi.query(querySql, data, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({message: 'Gagal insert data!', error:err});
        }

        // jika request berhasil
        res.status(201).json ({ succes: true, message: 'Berhasil Insert Data!'});
    });
});

//buat servernya
app.listen(PORT, () => console.log('Server Running at port: $ {PORT}'));