const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Role = require('./models/Role');
const User = require('./models/User');
const Department = require('./models/Department');
const Task = require('./models/Task');

const connection = new Sequelize(dbConfig);

connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

Role.init(connection);
User.init(connection);
Department.init(connection);
Task.init(connection);

Role.associate(connection.models);
User.associate(connection.models);
Department.associate(connection.models);
Task.associate(connection.models);

module.exports = connection;
