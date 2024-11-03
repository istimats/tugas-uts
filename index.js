const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const db = require('./db');

const app = express();
app.set('view engine', 'ejs');  // Tambahkan ini untuk menggunakan EJS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));  // Untuk mengakses file statis (CSS, JS)
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true
}));

// Import Routes
const authRoutes = require('./routes/auth');
const anggotaRoutes = require('./routes/anggota');
const simpananRoutes = require('./routes/simpanan');
const pinjamanRoutes = require('./routes/pinjaman');
const pembayaranRoutes = require('./routes/pembayaran');

app.use((req, res, next) => {
    if (!req.session.user && req.path !== '/auth/login' && req.path !== '/auth/register' && req.path !== '/auth/landing' && req.path !== '/auth/beranda') {
        return res.redirect('/auth/landing');
    } else if (req.session.user && req.path === '/') {
        return res.redirect('/auth/beranda');
    }
    next();
});
// Routing
app.use('/auth', authRoutes);
app.use('/anggota', anggotaRoutes);
app.use('/simpanan', simpananRoutes);
app.use('/pinjaman', pinjamanRoutes);
app.use('/pembayaran', pembayaranRoutes);

app.get('/', (req, res) => {
    res.redirect('/auth/login');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
