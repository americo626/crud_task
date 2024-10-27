const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Rota para registro de usuários
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Nome de usuário e senha são obrigatórios.' });
    }

    try {
        const user = await User.create({ username, password });
        res.status(201).json(user);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
});

module.exports = router;
