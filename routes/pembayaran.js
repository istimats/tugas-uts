const express = require('express');
const db = require('../db');

const router = express.Router();

// Create Pembayaran
router.post('/', (req, res) => {
    const { pinjaman_id, jumlah, tanggal } = req.body;
    db.query('INSERT INTO pembayaran (pinjaman_id, jumlah, tanggal) VALUES (?, ?, ?)', 
    [pinjaman_id, jumlah, tanggal], (err) => {
        if (err) return res.status(500).send(err.message);
        res.send('Pembayaran berhasil ditambahkan');
    });
});

// Read All Pembayaran
router.get('/', (req, res) => {
    db.query('SELECT * FROM pembayaran', (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.json(results);
    });
});

// Update Pembayaran
router.put('/:id', (req, res) => {
    const { jumlah, tanggal } = req.body;
    db.query('UPDATE pembayaran SET jumlah = ?, tanggal = ? WHERE id = ?', 
    [jumlah, tanggal, req.params.id], (err) => {
        if (err) return res.status(500).send(err.message);
        res.send('Data pembayaran berhasil diperbarui');
    });
});

// Delete Pembayaran
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM pembayaran WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err.message);
        res.send('Pembayaran berhasil dihapus');
    });
});

module.exports = router;
