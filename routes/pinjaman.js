const express = require('express');
const db = require('../db');

const router = express.Router();

// Create Pinjaman
router.post('/', (req, res) => {
    const { anggota_id, jumlah, tanggal } = req.body;
    db.query('INSERT INTO pinjaman (anggota_id, jumlah, tanggal) VALUES (?, ?, ?)', 
    [anggota_id, jumlah, tanggal], (err) => {
        if (err) return res.status(500).send(err.message);
        res.send('Pinjaman berhasil ditambahkan');
    });
});

// Read All Pinjaman
router.get('/', (req, res) => {
    db.query('SELECT * FROM pinjaman', (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.json(results);
    });
});

// Update Pinjaman
router.put('/:id', (req, res) => {
    const { jumlah, tanggal } = req.body;
    db.query('UPDATE pinjaman SET jumlah = ?, tanggal = ? WHERE id = ?', 
    [jumlah, tanggal, req.params.id], (err) => {
        if (err) return res.status(500).send(err.message);
        res.send('Data pinjaman berhasil diperbarui');
    });
});

// Delete Pinjaman
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM pinjaman WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err.message);
        res.send('Pinjaman berhasil dihapus');
    });
});

module.exports = router;
