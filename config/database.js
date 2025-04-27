const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config');

let sequelize;

if (config[env].use_env_variable) {
  // For Production: use DATABASE_URL
  sequelize = new Sequelize(process.env[config[env].use_env_variable], config[env]);
} else {
  // For Development
  sequelize = new Sequelize(config[env]);
}

module.exports = sequelize;
