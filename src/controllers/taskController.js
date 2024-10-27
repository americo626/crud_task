const Task = require('../models/Task');

// Criar nova tarefa
exports.createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Listar todas as tarefas
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Atualizar tarefa
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });

        await task.update(req.body);
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Deletar tarefa
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });

        await task.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
