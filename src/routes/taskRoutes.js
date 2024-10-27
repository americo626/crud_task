const express = require('express');
const Task = require('../models/task'); 
const User = require('../models/user'); 
const router = express.Router();

// Rota para obter tarefas
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.findAll({ include: User }); 
        res.json(tasks);
    } catch (error) {
        console.error('Erro ao obter tarefas:', error);
        res.status(500).json({ error: 'Erro ao obter tarefas' });
    }
});

// Rota para adicionar uma nova tarefa
router.post('/', async (req, res) => {
    const { title, userId } = req.body;
    try {
        const task = await Task.create({ title, userId }); 
        res.status(201).json(task);
    } catch (error) {
        console.error('Erro ao adicionar tarefa:', error);
        res.status(500).json({ error: 'Erro ao adicionar tarefa' });
    }
});

// Rota para deletar uma tarefa
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Task.destroy({ where: { id } });
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar tarefa:', error);
        res.status(500).json({ error: 'Erro ao deletar tarefa' });
    }
});

module.exports = router;
