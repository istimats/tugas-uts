const express = require('express');
const db = require('../db');

const router = express.Router();

// Create Simpanan
router.post('/', (req, res) => {
    const { anggota_id, jumlah, tanggal } = req.body;
    db.query('INSERT INTO simpanan (anggota_id, jumlah, tanggal) VALUES (?, ?, ?)', 
    [anggota_id, jumlah, tanggal], (err) => {
        if (err) return res.status(500).send(err.message);
        res.send('Simpanan berhasil ditambahkan');
    });
});

// Read All Simpanan
router.get('/', (req, res) => {
    db.query('SELECT * FROM simpanan', (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.json(results);
    });
});

// Update Simpanan
router.put('/:id', (req, res) => {
    const { jumlah, tanggal } = req.body;
    db.query('UPDATE simpanan SET jumlah = ?, tanggal = ? WHERE id = ?', 
    [jumlah, tanggal, req.params.id], (err) => {
        if (err) return res.status(500).send(err.message);
        res.send('Data simpanan berhasil diperbarui');
    });
});

// Delete Simpanan
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM simpanan WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err.message);
        res.send('Simpanan berhasil dihapus');
    });
});

module.exports = router;
