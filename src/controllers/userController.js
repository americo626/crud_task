const joao = require('../models/user');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({ id: user.id, username: joao.username });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
};
