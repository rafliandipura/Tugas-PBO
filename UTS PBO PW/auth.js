const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('./db');


router.get('/register', (req, res) => res.render('register'));


router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;


    if (!username || !email || !password) {
        return res.send('Please fill all required fields.');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        
        db.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword],
            (err) => {
                if (err) {
                    console.error("Error inserting user:", err);
                    return res.status(500).send('An error occurred while registering your account.');
                }
                res.redirect('/login');
            }
        );
    } catch (err) {
        console.error("Error hashing password:", err);
        res.status(500).send('Server error');
    }
});


router.get('/login', (req, res) => res.render('login'));


router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).send('Server error');
        
        if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
            return res.send('Invalid email or password');
        }

        req.session.user = results[0];
        res.redirect('/profile');
    });
});


router.get('/profile', (req, res) => {
    if (!req.session.user) return res.redirect('/login');

    const userId = req.session.user.id;

    db.query('SELECT * FROM pemain', (err, pemain) => {
        if (err) return res.status(500).send('An error occurred while fetching player data.');

        db.query('SELECT * FROM pelatih', (err, pelatih) => {
            if (err) return res.status(500).send('An error occurred while fetching coach data.');

            db.query('SELECT * FROM statistik_tim', (err, statistik) => {
                if (err) return res.status(500).send('An error occurred while fetching team statistics.');

                db.query('SELECT * FROM trofi', (err, trofi) => { // Fetch trophies
                    if (err) return res.status(500).send('An error occurred while fetching trophies.');

                    res.render('profile', {
                        user: req.session.user,
                        pemain,
                        pelatih,
                        statistik,
                        trofi
                    });
                });
            });
        });
    });
});

router.post('/pemain/add', (req, res) => {
    const { nama_pemain, posisi, nomor_punggung, negara, tanggal_lahir, tinggi_cm, berat_kg, bergabung_tahun } = req.body;

    db.query(
        'INSERT INTO pemain (nama_pemain, posisi, nomor_punggung, negara, tanggal_lahir, tinggi_cm, berat_kg, bergabung_tahun) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [nama_pemain, posisi, nomor_punggung, negara, tanggal_lahir, tinggi_cm, berat_kg, bergabung_tahun],
        (err) => {
            if (err) {
                console.error("Error adding player:", err);
                return res.status(500).send('An error occurred while adding the player.');
            }
            res.redirect('/profile');
        }
    );
});

router.post('/pelatih/add', (req, res) => {
    const { nama_pelatih, posisi, negara, tanggal_lahir, pengalaman_tahun } = req.body;

    db.query(
        'INSERT INTO pelatih (nama_pelatih, posisi, negara, tanggal_lahir, pengalaman_tahun) VALUES (?, ?, ?, ?, ?)',
        [nama_pelatih, posisi, negara, tanggal_lahir, pengalaman_tahun],
        (err) => {
            if (err) {
                console.error("Error adding coach:", err);
                return res.status(500).send('An error occurred while adding the coach.');
            }
            res.redirect('/profile');
        }
    );
});

router.post('/trofi/add', (req, res) => {
    const { nama_trofi, musim, jumlah_trofi, pelatih_id } = req.body;

    db.query(
        'INSERT INTO trofi (nama_trofi, musim, jumlah_trofi, pelatih_id) VALUES (?, ?, ?, ?)',
        [nama_trofi, musim, jumlah_trofi, pelatih_id],
        (err) => {
            if (err) {
                console.error("Error adding trophy:", err);
                return res.status(500).send('An error occurred while adding the trophy.');
            }
            res.redirect('/profile');
        }
    );
});

router.post('/pemain/update/:id', (req, res) => {
    const { nama_pemain, posisi, nomor_punggung, negara, tanggal_lahir, tinggi_cm, berat_kg, bergabung_tahun } = req.body;
    const id_pemain = req.params.id;

    db.query(
        'UPDATE pemain SET nama_pemain = ?, posisi = ?, nomor_punggung = ?, negara = ?, tanggal_lahir = ?, tinggi_cm = ?, berat_kg = ?, bergabung_tahun = ? WHERE id_pemain = ?',
        [nama_pemain, posisi, nomor_punggung, negara, tanggal_lahir, tinggi_cm, berat_kg, bergabung_tahun, id_pemain],
        (err) => {
            if (err) {
                console.error("Error updating player:", err);
                return res.status(500).send('An error occurred while updating the player.');
            }
            res.redirect('/profile');
        }
    );
});


router.post('/pelatih/update/:id', (req, res) => {
    const { nama_pelatih, posisi, negara, tanggal_lahir, pengalaman_tahun } = req.body;
    const id_pelatih = req.params.id;

    db.query(
        'UPDATE pelatih SET nama_pelatih = ?, posisi = ?, negara = ?, tanggal_lahir = ?, pengalaman_tahun = ? WHERE id_pelatih = ?',
        [nama_pelatih, posisi, negara, tanggal_lahir, pengalaman_tahun, id_pelatih],
        (err) => {
            if (err) {
                console.error("Error updating coach:", err);
                return res.status(500).send('An error occurred while updating the coach.');
            }
            res.redirect('/profile');
        }
    );
});


router.post('/trofi/update/:id', (req, res) => {
    const { nama_trofi, musim, jumlah_trofi, pelatih_id } = req.body;
    const id_trofi = req.params.id;

    db.query(
        'UPDATE trofi SET nama_trofi = ?, musim = ?, jumlah_trofi = ?, pelatih_id = ? WHERE id_trofi = ?',
        [nama_trofi, musim, jumlah_trofi, pelatih_id, id_trofi],
        (err) => {
            if (err) {
                console.error("Error updating trophy:", err);
                return res.status(500).send('An error occurred while updating the trophy.');
            }
            res.redirect('/profile');
        }
    );
});

router.post('/pemain/delete/:id', (req, res) => {
    const id_pemain = req.params.id;

    db.query('DELETE FROM pemain WHERE id_pemain = ?', [id_pemain], (err) => {
        if (err) {
            console.error("Error deleting player:", err);
            return res.status(500).send('An error occurred while deleting the player.');
        }
        res.redirect('/profile');
    });
});

router.post('/pelatih/delete/:id', (req, res) => {
    const id_pelatih = req.params.id;

    db.query('DELETE FROM pelatih WHERE id_pelatih = ?', [id_pelatih], (err) => {
        if (err) {
            console.error("Error deleting coach:", err);
            return res.status(500).send('An error occurred while deleting the coach.');
        }
        res.redirect('/profile');
    });
});

router.post('/trofi/add', (req, res) => {
    const { nama_trofi, musim, jumlah_trofi, pelatih_id } = req.body;

    db.query(
        'INSERT INTO trofi (nama_trofi, musim, jumlah_trofi, pelatih_id) VALUES (?, ?, ?, ?)',
        [nama_trofi, musim, jumlah_trofi, pelatih_id],
        (err) => {
            if (err) {
                console.error("Error adding trophy:", err);
                return res.status(500).send('An error occurred while adding the trophy.');
            }
            res.redirect('/profile');
        }
    );
});

router.get('/trofi', (req, res) => {
    db.query('SELECT * FROM trofi', (err, trophies) => {
        if (err) {
            console.error("Error fetching trophies:", err);
            return res.status(500).send('An error occurred while fetching trophies.');
        }
        res.render('trophies', { trophies });
    });
});

router.get('/trofi/:id', (req, res) => {
    const id_trofi = req.params.id;

    db.query('SELECT * FROM trofi WHERE id_trofi = ?', [id_trofi], (err, results) => {
        if (err) {
            console.error("Error fetching trophy:", err);
            return res.status(500).send('An error occurred while fetching the trophy.');
        }

        if (results.length === 0) {
            return res.status(404).send('Trophy not found');
        }

        res.render('trophy', { trophy: results[0] });
    });
});

router.post('/trofi/update/:id', (req, res) => {
    const { nama_trofi, musim, jumlah_trofi, pelatih_id } = req.body;
    const id_trofi = req.params.id;

    db.query(
        'UPDATE trofi SET nama_trofi = ?, musim = ?, jumlah_trofi = ?, pelatih_id = ? WHERE id_trofi = ?',
        [nama_trofi, musim, jumlah_trofi, pelatih_id, id_trofi],
        (err) => {
            if (err) {
                console.error("Error updating trophy:", err);
                return res.status(500).send('An error occurred while updating the trophy.');
            }
            res.redirect('/profile');
        }
    );
});

router.post('/trofi/delete/:id', (req, res) => {
    const id_trofi = req.params.id;

    db.query('DELETE FROM trofi WHERE id_trofi = ?', [id_trofi], (err) => {
        if (err) {
            console.error("Error deleting trophy:", err);
            return res.status(500).send('An error occurred while deleting the trophy.');
        }
        res.redirect('/profile');
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error logging out:", err);
            return res.status(500).send('Error logging out');
        }
        res.redirect('/login');
    });
});

module.exports = router;
