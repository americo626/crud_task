const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./src/config/database');
const taskRoutes = require('./src/routes/taskRoutes');
const errorMiddleware = require('./src/middleware/errorMiddleware');
const User = require('./src/models/user');
const Task = require('./src/models/task');
const userRoutes = require('./src/routes/userRoutes');
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.send('API de Gerenciamento de Tarefas');
  });


app.use(errorMiddleware);



// Sincronizar o banco de dados e iniciar o servidor
sequelize.sync({force: true}).then(() => {
  console.log('Banco de dados sincronizado');
  return sequelize.getQueryInterface().showAllTables();
}).then(tables => {
  console.log('Tabelas no banco de dados:', tables);
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
}).catch(error => {
  console.error('Erro ao sincronizar o banco de dados:', error);
});
console.log('DB Name:', process.env.DB_NAME);
console.log('DB User:', process.env.DB_USER);
console.log('DB Password:', process.env.DB_PASSWORD);
console.log('DB Host:', process.env.DB_HOST);
console.log('DB Port:', process.env.DB_PORT);


