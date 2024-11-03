const express = require('express');
const db = require('../db');

const router = express.Router();

// Create
router.post('/', (req, res) => {
    const { nama, alamat } = req.body;
    db.query('INSERT INTO anggota (nama, alamat) VALUES (?, ?)', [nama, alamat], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.send('Anggota berhasil ditambahkan');
    });
});

// Read
router.get('/', (req, res) => {
    db.query('SELECT * FROM anggota', (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.json(results);
    });
});

// Update
router.put('/:id', (req, res) => {
    const { nama, alamat } = req.body;
    db.query('UPDATE anggota SET nama = ?, alamat = ? WHERE id = ?', [nama, alamat, req.params.id], (err) => {
        if (err) return res.status(500).send(err.message);
        res.send('Data anggota berhasil diperbarui');
    });
});

// Delete
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM anggota WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err.message);
        res.send('Anggota berhasil dihapus');
    });
});

module.exports = router;
