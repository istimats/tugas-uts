const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');

const router = express.Router();
router.get('/register', (req, res) => {
    res.render('register');
})

router.post('/register', (req, res) => {
    const {username, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, hashedPassword], (err, result) => {
        if (err) throw err;
        res.redirect('/auth/login');
    });
})
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            const user = result[0];
            if (bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                res.redirect('/auth/beranda');   
            } else {
                res.send('Password yang anda masukkan salah!');
            }
        }else{
            res.send('username tidak ditemukan!');
        }
    });    
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send(err.message);
        res.redirect('/auth/landing');
    });
});
router.get('/anggota', (req, res) => {
    res.render('anggota');
});
router.get('/simpanan', (req, res) => {
    res.render('simpanan');
});
router.get('/pinjaman', (req, res) => {
    res.render('pinjaman');
});

router.get('/pembayaran', (req, res) => {
    res.render('pembayaran');
});

router.get('/landing', (req, res) => {
    res.render('landing');
});

router.get('/beranda', (req, res) => {
    res.render('beranda');
});
module.exports = router;
