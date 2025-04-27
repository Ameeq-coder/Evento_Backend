const { Sequelize } = require('sequelize');
require('dotenv').config({ path: `${process.cwd()}/.env` });

const env = process.env.NODE_ENV || 'development';
const config = require('./config');

let sequelize;

if (process.env.DATABASE_URL) {
  // ✅ If DATABASE_URL is available (like on Vercel or Neon)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true, 
        rejectUnauthorized: false, // Accept self-signed SSL certs (Neon needs this)
      },
    },
  });
} else {
  // ✅ Local connection (localhost database)
  sequelize = new Sequelize(config[env]);
}

module.exports = sequelize;
