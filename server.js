require('dotenv').config(); // .env faylidagi o'zgaruvchilarni yuklash
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); // CORS xatolarini oldini olish uchun
const rateLimit = require('express-rate-limit'); // Spamdan himoya
const path = require('path'); // Fayl yo'llari bilan ishlash uchun
const fs = require('fs'); // Fayllarni tekshirish uchun

const app = express();
const PORT = process.env.PORT || 5000; // Server porti

// Middleware'lar
app.use(cors()); // Barcha domenlardan so'rovlarni qabul qilish
app.use(express.json()); // JSON formatidagi so'rovlarni tahlil qilish

// DEBUG: Har bir kelayotgan so'rovni logga yozish
app.use((req, res, next) => {
    console.log(`So'rov: ${req.method} ${req.url}`);
    next();
});

// Statik fayllar (Frontend) shu papkaning o'zida (__dirname)
console.log('Server papkasi:', __dirname);

// DEBUG: style.css borligini tekshirish
if (fs.existsSync(path.join(__dirname, 'style.css'))) {
    console.log('style.css fayli topildi ✅');
} else {
    console.error('DIQQAT: style.css TOPILMADI ❌');
}

app.use(express.static(__dirname));

// Asosiy sahifa so'ralganda index.html ni qaytarish
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Nodemailer transporterini sozlash
const transporter = nodemailer.createTransport({
    service: 'gmail', // Gmail xizmatidan foydalanish
    auth: {
        user: process.env.EMAIL_USER, // .env faylidan email
        pass: process.env.EMAIL_PASS  // .env faylidan ilova paroli
    }
});

// Rate limiter: 15 daqiqa ichida bitta IP dan maksimal 5 ta so'rov
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 daqiqa
    max: 5, // har bir IP uchun limit
    message: { msg: 'Juda ko\'p so\'rov yuborildi, iltimos keyinroq urinib ko\'ring.' }
});

// Aloqa formasi uchun API endpoint
app.post('/api/contact', limiter, async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ msg: 'Iltimos, barcha maydonlarni to\'ldiring.' });
    }

    try {
        const mailOptions = {
            from: process.env.EMAIL_USER, // Kimdan
            to: process.env.EMAIL_USER,   // Kimga (o'zingizga)
            subject: `Yangi xabar: ${name} dan`, // Xabar mavzusi
            html: `
                <p><strong>Ism:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Xabar:</strong> ${message}</p>
            `
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ msg: 'Xabaringiz muvaffaqiyatli yuborildi!' });
    } catch (error) {
        console.error('Email yuborishda xato:', error); // Xato haqida terminalga yozish
        res.status(500).json({ msg: 'Xabar yuborishda xato yuz berdi. Iltimos, keyinroq urinib ko\'ring.' });
    }
});

// Serverni ishga tushirish
app.listen(PORT, () => {
    console.log(`VERSIYA 1.1.2 (ROOT SERVER FIX) ISHLADI! Port: ${PORT}`);
    console.log(`Server ishga tushdi.`);
});