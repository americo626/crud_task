const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Task = require('./task'); 

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users', // Nome da tabela no banco de dados
  timestamps: true, // Adiciona createdAt e updatedAt automaticamente
  freezeTableName: true, 
});

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = User;
