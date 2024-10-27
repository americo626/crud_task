const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres' 
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados foi bem-sucedida!');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
};

testConnection();

module.exports = sequelize;
